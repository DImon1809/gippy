import { useCallback, useEffect, useState } from "react";
import { ethers, getAddress } from "ethers";

import { useAppDispatch } from "@/app/store";
import { useLazyGetCodeQuery, useLoginMutation } from "@/features/user/userApi";
import { resetWalletState, setWalletState } from "@/features/wallet/walletSlice";

const SIGN_MESSAGE = `You: Do you Think We Can Improve this World, Make It pure and Bring Love for it?
Gippy: Behind me, my reader, and only after me, and I will show you such love!
[WELCOME]`;

export const useWallet2 = () => {
  const dispatch = useAppDispatch();

  const [getCode] = useLazyGetCodeQuery();
  const [login] = useLoginMutation();

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState<boolean>(true);

  const buildSiweTypedData = (params: {
    appName: string;
    chainId: number;
    address: string;
    domainHost: string;
    originUrl: string;
    nonce: string;
    statement?: string;
    expirationTime?: string;
    issuedAt?: string;
  }) => {
    const issuedAt = params.issuedAt ?? new Date().toISOString();
    return {
      domain: { name: params.appName, version: "1", chainId: params.chainId },
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
        ],
        SiweMessage: [
          { name: "domain", type: "string" },
          { name: "address", type: "adress" },
          { name: "statement", type: "string" },
          { name: "url", type: "string" },
          { name: "version", type: "string" },
          { chainId: "chainId", type: "uint256" },
          { name: "nonce", type: "string" },
          { name: "issuedAt", type: "string" },
          { name: "expirationTime", type: "string" },
        ],
        primaryType: "SiweMessage" as const,
        message: {
          domain: params.domainHost,
          address: params.address,
          statement: params.statement ?? "Sign in to Gippy",
          url: params.originUrl,
          version: "1",
          chainId: params.chainId,
          nonce: params.nonce,
          issuedAt,
          expirationTime: params.expirationTime ?? new Date(Date.now() + 5 * 60_000).toISOString(),
        },
      },
    };
  };

  const restoreConnection = async () => {
    const savedAddress = localStorage.getItem("walletAddress");
    const savedSignature = localStorage.getItem("walletSignature");

    try {
      // Если нет данных или MetaMask недоступен — сбрасываем
      if (!savedAddress || !savedSignature || !window?.ethereum) {
        dispatch(resetWalletState());
        setIsConnect(false);
        setIsRestoring(false); // ✅ Восстановление завершено (ничего восстанавливать не надо)
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0 || accounts[0].toLowerCase() !== savedAddress.toLowerCase()) {
        dispatch(resetWalletState());
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("walletSignature");
        localStorage.removeItem("loginTimestamp");
        setIsConnect(false);
        setIsRestoring(false); // ✅ Завершаем восстановление
        return;
      }

      const recovered = ethers.verifyMessage(SIGN_MESSAGE, savedSignature);
      if (recovered.toLowerCase() !== savedAddress.toLowerCase()) {
        dispatch(resetWalletState());
        localStorage.clear();
        setIsConnect(false);
        setIsRestoring(false); // ✅
        return;
      }

      const userNames = JSON.parse(localStorage.getItem("userNames") || "{}");
      const storedName = userNames?.[savedAddress.toLowerCase()] || null;

      dispatch(
        setWalletState({
          address: getAddress(savedAddress),
          error: null,
          showNameModal: !storedName,
          userName: storedName,
        }),
      );
      setIsConnect(true);
      setAddress(savedAddress);
    } catch (error) {
      console.error("Ошибка восстановления подключения:", error);
      dispatch(resetWalletState());
      localStorage.clear();
      setIsConnect(false);
      // всё равно устанавливаем, что восстановление завершено
    } finally {
      // ✅ В любом случае — восстановление закончено
      setIsRestoring(false);
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

      const code = await getCode().unwrap();

      const signature = await signer.signMessage(SIGN_MESSAGE);

      const recoveredAddress = ethers.verifyMessage(SIGN_MESSAGE, signature);

      if (recoveredAddress.toLowerCase() === accounts[0].toLowerCase()) {
        const address = accounts[0];

        const userNames = JSON.parse(localStorage.getItem("userNames") || "{}");
        const storedName = userNames?.[address.toLowerCase()] || null;

        await login({ address, signature, nonce: String(Date.now() + 1) });

        localStorage.setItem("code", code);
        localStorage.setItem("walletAddress", address);
        localStorage.setItem("walletSignature", signature);
        localStorage.setItem("loginTimestamp", Date.now().toString());

        dispatch(
          setWalletState({
            address: getAddress(address),
            error: null,
            showNameModal: !storedName,
            userName: storedName,
          }),
        );

        setAddress(address);
        setIsConnect(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsConnecting(false);
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
    restoreConnection(); // запускается при монтировании
  }, []);

  return {
    connectWallet,
    disconnectWallet,
    isConnecting,
    isConnect,
    address,
    isRestoring,
  };
};
