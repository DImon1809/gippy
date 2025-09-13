import type { Dispatch, SetStateAction } from "react";
import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppDispatch } from "@/app/store";
import { setWalletState } from "@/features/wallet/walletSlice";
import type { Message } from "@/shared/config/Message";
import type { Transaction } from "@/shared/lib/types";

export const useTransaction = () => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useAppDispatch();

  const messageRef = useRef<string | null>(null);

  const restoreMessage = ({
    status,
    fromAddress,
    baseTx,
    transactionId,
    setAllMessages,
  }: {
    status: "pending" | "processing" | "success" | "failed";
    fromAddress: string;
    baseTx: ethers.TransactionRequest;
    transactionId?: string;
    setAllMessages: Dispatch<SetStateAction<Message[]>>;
  }) => {
    setAllMessages(prev => [
      ...prev.filter(message => message.id !== messageRef.current),
      {
        id: messageRef.current || String(Date.now()),
        type: "transaction",
        content: JSON.stringify({
          from: hrefSlicer(fromAddress),
          to: hrefSlicer(String(baseTx?.to ?? "")),
        }),
        timestamp: new Date(),
        transaction: {
          transactionId,
          status,
        },
      },
    ]);

    setTimeout(() => {
      messageRef.current = String(Date.now());
    });
  };

  const hrefSlicer = (href: string) => {
    if (!href?.length || href?.length < 2) return href;

    const chars = href.split("");

    return `${chars.slice(0, 6).join("")}. . .${chars.slice(chars.length - 6, chars.length).join("")}`;
  };

  const getProvider = () => {
    if (typeof window !== "undefined" && window.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    }

    const RPC_URL =
      process?.env?.NEXT_PUBLIC_RPC_URL || "https://polygon-mainnet.infura.io/v3/f59db73bdb3a446f85634589dc29ebbf";
    return new ethers.JsonRpcProvider(RPC_URL);
  };

  const prepareAndSendTransaction = async (
    transaction: Transaction,
    setAllMessages: Dispatch<SetStateAction<Message[]>>,
  ) => {
    try {
      if (!window?.ethereum) {
        return dispatch(
          setWalletState({
            error: "MetaMask не установлен",
          }),
        );
      }

      const provider = getProvider();

      const browserProvider = provider as ethers.BrowserProvider;

      const signer = await browserProvider.getSigner();

      const to = transaction.to;
      const data = transaction.data
        ? transaction.data.startsWith("0x")
          ? transaction.data
          : `0x${transaction.data}`
        : undefined;
      const value = transaction.value ? BigInt(transaction.value) : undefined;

      const network = await browserProvider.getNetwork();

      if (transaction.chainId && Number(transaction.chainId) !== Number(network.chainId)) {
        toast.warning(
          `В транзакции указана цепочка: ${transaction.chainId}. Пожалуйста, переключите сеть в кошельке и повторите запрос, либо верните корректный chainId.`,
          {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme === "dark" ? "dark" : "light",
          },
        );
      }

      const fromAddress = transaction.from || (await signer.getAddress());

      const nonce = transaction.nonce
        ? Number(transaction.nonce)
        : await browserProvider.getTransactionCount(fromAddress);

      const feeData = await browserProvider.getFeeData();
      const userGasPrice = transaction.gasPrice
        ? typeof transaction.gasPrice === "string"
          ? BigInt(transaction.gasPrice)
          : BigInt(transaction.gasPrice)
        : undefined;

      const baseTx: ethers.TransactionRequest = {
        to,
        data,
        value,
        nonce,
        chainId: transaction.chainId ? Number(transaction.chainId) : Number(network.chainId),
        gasLimit: undefined,
      };

      if (network.chainId !== baseTx.chainId) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${baseTx?.chainId?.toString(16)}` }],
        });

        toast.info(`Сеть автоматически переключена`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme === "dark" ? "dark" : "light",
        });
      }

      if (userGasPrice) {
        baseTx.gasPrice = userGasPrice;
      } else if (feeData.gasPrice) {
        baseTx.gasPrice = feeData.gasPrice;
      } else if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
        baseTx.maxFeePerGas = feeData.maxFeePerGas;
        baseTx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
      }

      let gasLimit: bigint | undefined;

      if (transaction.gas) {
        gasLimit = typeof transaction.gas === "string" ? BigInt(transaction.gas) : BigInt(transaction.gas);
      } else {
        try {
          gasLimit = await browserProvider.estimateGas({
            ...baseTx,
            from: fromAddress,
          });
        } catch (estErr) {
          console.warn("estimateGas не удалось, продолжаем без явного gasLimit:", estErr);

          gasLimit = BigInt(200000);
        }
      }

      const finalTx: ethers.TransactionRequest = {
        ...baseTx,
        ...(gasLimit ? { gasLimit } : {}),
      };

      console.log("finalTx", finalTx);

      restoreMessage({ status: "pending", fromAddress, baseTx, setAllMessages });

      const txResponse = await signer.sendTransaction(finalTx);
      console.log("Транзакция отправлена:", txResponse);

      restoreMessage({
        status: "processing",
        fromAddress,
        baseTx,
        setAllMessages,
      });

      const receipt = await txResponse.wait();

      restoreMessage({
        status: "success",
        fromAddress,
        baseTx,
        setAllMessages,
        transactionId: txResponse.hash,
      });

      console.log("receipt", receipt);
    } catch (err) {
      console.error(err);

      setAllMessages(prev => prev.filter(message => message.id !== messageRef.current));

      toast.error("Произошла ошибка при создании транзакции", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === "dark" ? "dark" : "light",
      });
    }
  };

  return { prepareAndSendTransaction };
};
