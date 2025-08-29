import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

import { SIGN_MESSAGE } from "../../config";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  showNameModal: boolean;
  userName: string | null;
}

// TODO Переделать
const getUserNames = (): { [address: string]: string } => {
  try {
    const stored = localStorage.getItem("userNames");
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Ошибка при загрузке имен пользователей:", error);
    return {};
  }
};

const saveUserName = (address: string, name: string): void => {
  try {
    const userNames = getUserNames();
    userNames[address.toLowerCase()] = name;
    localStorage.setItem("userNames", JSON.stringify(userNames));
  } catch (error) {
    console.error("Ошибка при сохранении имени пользователя:", error);
  }
};

const getUserName = (address: string): string | null => {
  const userNames = getUserNames();
  return userNames[address.toLowerCase()] || null;
};

// Функция миграции со старого формата хранения
const migrateOldUserName = (address: string): void => {
  try {
    const oldUserName = localStorage.getItem("userName");
    if (oldUserName && address) {
      // Переносим старое имя к текущему адресу
      saveUserName(address, oldUserName);
      // Удаляем старый ключ
      localStorage.removeItem("userName");
    }
  } catch (error) {
    console.error("Ошибка при миграции имени пользователя:", error);
  }
};

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    showNameModal: false,
    userName: null,
  });

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setWalletState(prev => ({
          ...prev,
          error: "MetaMask не установлен",
        }));
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        const address = accounts[0];
        // Мигрируем старое имя, если оно есть
        migrateOldUserName(address);
        const storedName = getUserName(address);
        setWalletState(prev => ({
          ...prev,
          address: address,
          isConnected: true,
          error: null,
          userName: storedName,
        }));
      }
    } catch (error) {
      console.error("Ошибка при проверке подключения:", error);
      setWalletState(prev => ({
        ...prev,
        error: "Ошибка при проверке подключения",
      }));
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      if (!window?.ethereum) {
        setWalletState(prev => ({
          ...prev,
          error: "MetaMask не установлен",
        }));
        return;
      }

      setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

      // Запрашиваем подключение к кошельку
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Запрашиваем подпись сообщения
        const signature = await signer.signMessage(SIGN_MESSAGE);

        // Проверяем подпись
        const recoveredAddress = ethers.verifyMessage(SIGN_MESSAGE, signature);

        if (recoveredAddress.toLowerCase() === accounts[0].toLowerCase()) {
          const address = accounts[0];

          // Мигрируем старое имя, если оно есть
          migrateOldUserName(address);

          // Проверяем, есть ли сохраненное имя для этого адреса
          const storedName = getUserName(address);

          // Сохраняем информацию о входе в localStorage
          localStorage.setItem("walletAddress", address);
          localStorage.setItem("walletSignature", signature);
          localStorage.setItem("loginTimestamp", Date.now().toString());

          setWalletState({
            address: address,
            isConnected: true,
            isConnecting: false,
            error: null,
            showNameModal: !storedName, // Показываем модальное окно только если имя не сохранено для этого адреса
            userName: storedName,
          });

          return { address: address, signature, needsName: !storedName };
        } else {
          throw new Error("Подпись не совпадает с адресом");
        }
      }
    } catch (error: any) {
      console.error("Ошибка при подключении кошелька:", error);
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || "Ошибка при подключении кошелька",
      }));
    }
  }, []);

  const submitUserName = useCallback(
    (name: string) => {
      const currentAddress = walletState.address;
      if (!currentAddress) return;

      // Сохраняем имя для текущего адреса
      saveUserName(currentAddress, name);

      setWalletState(prev => ({
        ...prev,
        showNameModal: false,
        userName: name,
      }));
    },
    [walletState.address],
  );

  const closeNameModal = useCallback(() => {
    setWalletState(prev => ({
      ...prev,
      showNameModal: false,
    }));
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      showNameModal: false,
      userName: null,
    });

    // Очищаем localStorage от информации о сессии, но НЕ удаляем имена пользователей
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletSignature");
    localStorage.removeItem("loginTimestamp");
  }, []);

  const verifyStoredLogin = useCallback(async () => {
    try {
      const storedAddress = localStorage.getItem("walletAddress");
      const storedSignature = localStorage.getItem("walletSignature");
      const loginTimestamp = localStorage.getItem("loginTimestamp");

      if (!storedAddress || !storedSignature || !loginTimestamp) {
        return false;
      }

      // Проверяем, что логин не старше 24 часов
      const now = Date.now();
      const loginTime = parseInt(loginTimestamp);
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - loginTime > twentyFourHours) {
        disconnectWallet();
        return false;
      }

      // Проверяем подпись
      const recoveredAddress = ethers.verifyMessage(SIGN_MESSAGE, storedSignature);

      if (recoveredAddress.toLowerCase() === storedAddress.toLowerCase()) {
        // Мигрируем старое имя, если оно есть
        migrateOldUserName(storedAddress);

        const storedName = getUserName(storedAddress);
        setWalletState({
          address: storedAddress,
          isConnected: true,
          isConnecting: false,
          error: null,
          showNameModal: false,
          userName: storedName,
        });
        return true;
      } else {
        disconnectWallet();
        return false;
      }
    } catch (error) {
      console.error("Ошибка при проверке сохраненного логина:", error);
      disconnectWallet();
      return false;
    }
  }, [disconnectWallet]);

  useEffect(() => {}, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    checkIfWalletIsConnected,
    verifyStoredLogin,
    submitUserName,
    closeNameModal,
  };
};
