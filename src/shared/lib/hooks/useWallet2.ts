import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

import { useAppDispatch } from "@/app/store";
import { resetWalletState, setWalletState } from "@/features/wallet/walletSlice";

const SIGN_MESSAGE = `You: Do you Think We Can Improve this World, Make It pure and Bring Love for it?
Gippy: Behind me, my reader, and only after me, and I will show you such love!
[WELCOME]`;

export const useWallet2 = () => {
  const dispatch = useAppDispatch();

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);

  const restoreConnection = async () => {
    const savedAddress = localStorage.getItem("walletAddress");
    const savedSignature = localStorage.getItem("walletSignature");

    if (!savedAddress || !savedSignature || !window?.ethereum) {
      dispatch(resetWalletState());
      setIsConnect(false);

      console.log("Подключение разорвано");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0 || accounts[0].toLowerCase() !== savedAddress.toLowerCase()) {
        dispatch(resetWalletState());
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("walletSignature");
        localStorage.removeItem("loginTimestamp");
        setIsConnect(false);
        console.log("Пользователь отключился");

        return;
      }

      const recovered = ethers.verifyMessage(SIGN_MESSAGE, savedSignature);
      if (recovered.toLowerCase() !== savedAddress.toLowerCase()) {
        dispatch(resetWalletState());
        localStorage.clear();
        console.log("Подпись не валидна");
        return;
      }

      const userNames = JSON.parse(localStorage.getItem("userNames") || "{}");
      const storedName = userNames?.[savedAddress.toLowerCase()] || null;

      dispatch(
        setWalletState({
          address: savedAddress,
          error: null,
          showNameModal: !storedName,
          userName: storedName,
        }),
      );
      setIsConnect(true);

      setAddress(savedAddress);

      console.log("Подключение восстановлено");
    } catch (error) {
      console.error("Ошибка восстановления подключения:", error);
      dispatch(resetWalletState());
      localStorage.clear();
      setIsConnect(false);
    }
  };

  const connectWallet = useCallback(async () => {
    try {
      if (!window?.ethereum) {
        return dispatch(
          setWalletState({
            error: "MetaMask не установлен",
          }),
        );
      }

      setIsConnecting(true);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const signature = await signer.signMessage(SIGN_MESSAGE);

      const recoveredAddress = ethers.verifyMessage(SIGN_MESSAGE, signature);

      if (recoveredAddress.toLowerCase() === accounts[0].toLowerCase()) {
        const address = accounts[0];

        const userNames = JSON.parse(localStorage.getItem("userNames") || "{}");
        const storedName = userNames?.[address.toLowerCase()] || null;

        localStorage.setItem("walletAddress", address);
        localStorage.setItem("walletSignature", signature);
        localStorage.setItem("loginTimestamp", Date.now().toString());

        dispatch(
          setWalletState({
            address: address,
            error: null,
            showNameModal: !storedName,
            userName: storedName,
          }),
        );

        setAddress(address);

        setIsConnecting(false);
        setIsConnect(true);
      }
    } catch (err) {
      setIsConnecting(false);

      console.error(err);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    dispatch(resetWalletState());

    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletSignature");
    localStorage.removeItem("loginTimestamp");

    setAddress(null);
    setIsConnect(false);
  }, []);

  useEffect(() => {
    restoreConnection();
  }, []);

  return { connectWallet, disconnectWallet, isConnecting, isConnect, address };
};
