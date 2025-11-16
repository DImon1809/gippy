import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAddress } from "ethers";
import type { Address } from "viem";
import { verifyTypedData } from "viem";
import { useAccount, useConnect, useDisconnect, useSignMessage, useSignTypedData } from "wagmi";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppDispatch } from "@/app/store";
import { useLazyGetCodeQuery, useLoginMutation } from "@/features/user/userApi";
import { resetWalletState, setWalletState } from "@/features/wallet/walletSlice";
import type { SiweMessage } from "@/shared/lib/types";

type SiweTypedDataDomain = {
  name: string;
  version: string;
  chainId: number;
  verifyingContract?: `0x${string}`;
};

const PLACEHOLDER_NONCE = "98cd232c777ab7b1";

const siweTypes = {
  SiweMessage: [
    { name: "domain", type: "string" },
    { name: "address", type: "address" },
    { name: "statement", type: "string" },
    { name: "uri", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "nonce", type: "string" },
    { name: "issuedAt", type: "string" },
    { name: "expirationTime", type: "string" },
    { name: "notBefore", type: "string" },
    { name: "requestId", type: "string" },
    { name: "resources", type: "string[]" },
  ],
} as const;

const buildSiweDomain = (chainId: number, verifyingContract?: `0x${string}`): SiweTypedDataDomain => {
  return {
    name: "Sign-In with Ethereum",
    version: "1",
    chainId,
    verifyingContract,
  };
};

export const useWallet2 = () => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useAppDispatch();

  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending: isWagmiConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { isPending: isSigning } = useSignMessage();
  const { signTypedDataAsync } = useSignTypedData();

  const [getCode, { isLoading: isCodeLoading }] = useLazyGetCodeQuery();
  const [login] = useLoginMutation();

  const [isRestoring, setIsRestoring] = useState<boolean>(true);

  const isConnecting = isWagmiConnecting || isCodeLoading || isSigning;

  const buildSiweMessage = (params: {
    address: Address;
    code: string;
    chainId: number | bigint;
    domain?: string;
    uri?: string;
    statement?: string;
  }): SiweMessage => {
    const now = new Date();
    const in15m = new Date(now.getTime() + 15 * 60 * 1000);
    return {
      domain: params.domain || (typeof window !== "undefined" ? window.location.host : "localhost"),
      address: params.address,
      statement: params.statement || "Вход на сайт",
      uri: params.uri || (typeof window !== "undefined" ? window.location.origin : "http://localhost"),
      version: "1",
      chainId: typeof params.chainId === "bigint" ? params.chainId : BigInt(params.chainId),
      nonce: params.code || PLACEHOLDER_NONCE,
      issuedAt: now.toISOString(),
      expirationTime: in15m.toISOString(),
      notBefore: now.toISOString(),
      requestId: "request-1",
      resources: [typeof window !== "undefined" ? window.location.href : "http://localhost"] as readonly string[],
    };
  };

  const restoreConnection = useCallback(async () => {
    const savedAddress = localStorage.getItem("walletAddress");
    const savedSignature = localStorage.getItem("walletSignature");

    try {
      if (!savedAddress || !savedSignature) {
        dispatch(resetWalletState());
        setIsRestoring(false);
        return;
      }

      if (!isConnected) {
        dispatch(resetWalletState());
      }

      if (isConnected && address && address.toLowerCase() === savedAddress.toLowerCase()) {
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
      }
    } catch (error) {
      console.error("Ошибка восстановления подключения:", error);
      dispatch(resetWalletState());
      localStorage.clear();

      toast.error("Произошла ошибка при восстановлении подключения", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === "dark" ? "dark" : "light",
      });
    } finally {
      setIsRestoring(false);
    }
  }, [isConnected, address, dispatch, theme]);

  const authenticateWallet = useCallback(
    async (walletAddress: string, chainId: number) => {
      try {
        const { code } = await getCode().unwrap();

        const message = buildSiweMessage({ address: address as `0x${string}`, code, chainId: chainId || 1 });

        const domain = buildSiweDomain(chainId);

        const signature = await signTypedDataAsync({
          domain,
          types: siweTypes,
          primaryType: "SiweMessage",
          message,
        });

        const valid = await verifyTypedData({
          address: walletAddress as `0x${string}`,
          domain,
          types: siweTypes,
          primaryType: "SiweMessage",
          message,
          signature: signature as `0x${string}`,
        });

        if (!valid) throw new Error("Неверная подпись");

        await login({
          address: walletAddress,
          signature,
          nonce: { ...message, chainId: Number(message.chainId) },
          code,
        }).unwrap();

        localStorage.setItem("code", code);
        localStorage.setItem("walletAddress", walletAddress);
        localStorage.setItem("walletSignature", signature);
        localStorage.setItem("loginTimestamp", Date.now().toString());

        const userNames = JSON.parse(localStorage.getItem("userNames") || "{}");
        const storedName = userNames?.[walletAddress.toLowerCase()] || null;

        dispatch(
          setWalletState({
            address: getAddress(walletAddress),
            error: null,
            showNameModal: !storedName,
            userName: storedName,
            signature,
            code,
            nonce: message,
          }),
        );
      } catch (error) {
        console.error("Ошибка аутентификации:", error);

        toast.error("Ошибка аутентификации", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme === "dark" ? "dark" : "light",
        });

        disconnect();
      }
    },
    [address, disconnect, dispatch, getCode, login, signTypedDataAsync, theme],
  );

  const connectWallet = useCallback(async () => {
    try {
      const connectorToUse = connectors.find(c => c.id === "injected" || c.name === "MetaMask");

      if (!connectorToUse) {
        toast.error("MetaMask не найден", {
          theme: theme === "dark" ? "dark" : "light",
        });
        return;
      }

      connect({ connector: connectorToUse });
    } catch (err) {
      console.error("Ошибка подключения:", err);
      toast.error("Ошибка при подключении кошелька", {
        theme: theme === "dark" ? "dark" : "light",
      });
    }
  }, [connectors, connect, theme]);

  const disconnectWallet = useCallback(() => {
    dispatch(resetWalletState());

    disconnect();

    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletSignature");
    localStorage.removeItem("loginTimestamp");
  }, []);

  useEffect(() => {
    if (isConnected && address && chainId && isConnecting) {
      authenticateWallet(address, chainId);
    }
  }, [isConnected, address, chainId, isConnecting]);

  useEffect(() => {
    restoreConnection();
  }, [restoreConnection]);

  return {
    connectWallet,
    disconnectWallet,
    isConnecting,
    isConnected,
    address,
    chainId,
    isRestoring,
  };
};
