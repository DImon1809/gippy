import type { Dispatch, SetStateAction } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { ethers, parseUnits } from "ethers";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppDispatch } from "@/app/store";
import { setWalletState } from "@/features/wallet/walletSlice";
import type { Message } from "@/shared/config/Message";
import type { ResponseSendMessage } from "@/shared/lib/types";

type EthereumError = {
  code?: number | string;
  message?: string;
  reason?: string;
};

const ERC20_APPROVE_ABI = [
  "function approve(address spender, uint256 value) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
];

export const useTransaction = () => {
  const { theme } = useContext(ThemeContext);
  const { closeModal } = useContext(ModalContext);

  const dispatch = useAppDispatch();

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

  const getAmount = (response: string) => {
    return response
      .split("\n")
      .find(arr => arr.includes("Сумма:"))
      ?.split(": ")
      .at(-1);
  };

  const getTokenDecimals = (tokenName: string) => {
    switch (tokenName) {
      case "gpyt":
        return 18;
      case "usdt":
        return 6;
      case "dai":
        return 18;
      case "pyusd":
        return 6;
      case "a7a5":
        return 6;
      case "eurc":
        return 6;
      case "brz":
        return 4;
      case "eurs":
        return 2;
      default:
        return 18;
    }
  };

  const prepareAndSendTransaction = async (
    { response, transaction, tokenAddress }: ResponseSendMessage,
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

      if (!transaction) {
        return dispatch(
          setWalletState({
            error: "Транзакция не была совершена",
          }),
        );
      }

      if (!tokenAddress) {
        return dispatch(
          setWalletState({
            error: "Адрес токена не указан",
          }),
        );
      }

      const provider = getProvider();
      const browserProvider = provider as ethers.BrowserProvider;
      const signer = await browserProvider.getSigner();

      const fromAddress = transaction.from || (await signer.getAddress());

      const tokenContract = new ethers.Contract(tokenAddress, ERC20_APPROVE_ABI, signer);

      const tempAmount = getAmount(response)?.split(" ");

      if (!tempAmount?.[0] && !tempAmount?.[1]) {
        return dispatch(
          setWalletState({
            error: "Сумма не указана",
          }),
        );
      }

      const amount = parseUnits(tempAmount[0], getTokenDecimals(tempAmount[1]));
      const to = transaction.to;
      const currentAllownce: bigint = await tokenContract.allowance(fromAddress, transaction.to);

      // if (currentAllownce < amount) {
      setAllMessages(prev => [
        ...prev,
        {
          id: Number(Date.now()),
          role: "transaction",
          isHidden: true,
          content: "",
          sent_at: new Date(),
          transaction: {
            status: "approve",
          },
        },
      ]);

      const tx = await tokenContract.approve(to, amount);
      const receipt = await tx.wait();

      if (receipt?.status !== 1) {
        return dispatch(
          setWalletState({
            error: "Транзакция не прошла",
          }),
        );
      }
      // }

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

      setAllMessages(prev => [
        ...prev,
        {
          id: Number(Date.now()),
          role: "transaction",
          content: JSON.stringify({
            from: hrefSlicer(fromAddress),
            to: hrefSlicer(String(baseTx?.to ?? "")),
          }),
          sent_at: new Date(),
          transaction: {
            status: "pending",
          },
        },
      ]);

      // setTimeout(() => {
      //   setAllMessages(prev => [
      //     ...prev,
      //     {
      //       id: Number(Date.now()),
      //       role: "transaction",
      //       isHidden: true,
      //       content: JSON.stringify({
      //         from: hrefSlicer(fromAddress),
      //         to: hrefSlicer(String(baseTx?.to ?? "")),
      //       }),
      //       sent_at: new Date(),
      //       transaction: {
      //         status: "processing",
      //       },
      //     },
      //   ]);
      // }, 2000);

      const txResponse = await signer.sendTransaction(finalTx);

      setAllMessages(prev => {
        return [
          ...prev.slice(0, prev.length - 1),
          {
            id: Number(Date.now()),
            role: "transaction",
            content: JSON.stringify({
              from: hrefSlicer(fromAddress),
              to: hrefSlicer(String(baseTx?.to ?? "")),
            }),
            sent_at: new Date(),
            transaction: {
              status: "processing",
            },
          },
        ];
      });

      setAllMessages(prev => {
        return [
          ...prev.slice(0, prev.length - 1),
          {
            id: Number(Date.now()),
            role: "transaction",
            content: JSON.stringify({
              from: hrefSlicer(fromAddress),
              to: hrefSlicer(String(baseTx?.to ?? "")),
            }),
            sent_at: new Date(),
            transaction: {
              status: "success",
              transactionId: txResponse.hash,
            },
          },
        ];
      });
    } catch (err) {
      console.error(err);

      const error = err as EthereumError;

      closeModal();

      if (error?.code === 4001 || error?.code === "ACTION_REJECTED" || error?.message?.includes("user rejected")) {
        toast.info("Транзакция отклонена пользователем", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme === "dark" ? "dark" : "light",
        });

        return;
      }

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
