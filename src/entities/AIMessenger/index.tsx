import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Mic, Send } from "lucide-react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useGetHistoryMessageQuery, useSendMyMessageMutation } from "@/features/message/messageApi";
import { setIsHaveMessages } from "@/features/message/messageSlice";
import { PageLoader } from "@/shared";
import type { Message } from "@/shared/config/Message";
import { useTransaction } from "@/shared/lib/hooks/useTransaction";
import { useWallet2 } from "@/shared/lib/hooks/useWallet2";

import { GippyThink } from "./ui/GippyThink";
import { PendingBlock } from "./ui/PendingBlock";
import { ProcessingTransaction } from "./ui/ProcessingTransaction";
import { SimpleMessage } from "./ui/SimpleMessage";
import { TransactionSuccessful } from "./ui/TransactionSuccessful";
import { TypingMessage } from "./ui/TypingMessage";

import styles from "./style.module.scss";

const defaultMessage: Message = {
  id: 1,
  role: "assistant",
  content:
    "🤗 Привет! Я Gippy — твой дружелюбный помощник по финансам и криптовалютам. Вот несколько вещей, которыми могу помочь: 💰 **Финансы и инвестиции:** консультации по криптовалютам, советы по трейдингу и инвестированию. 📊 **Технический анализ:** помощь в понимании графиков и рыночных трендов. 🔮 **Блокчейн и DeFi:** объяснение технологий блокчейна, токенов и DeFi-приложений. 🛠️ **Программирование и разработка:** подсказки по созданию смарт-контрактов и DApps. 📌 **Общий совет и обучение:** финансовые стратегии, экономическая аналитика и многое другое! Что именно тебя интересует сейчас? 😊",
  sent_at: new Date(),
};

export const AIMessenger = () => {
  const { theme } = useContext(ThemeContext);
  const { openModal } = useContext(ModalContext);

  const dispatch = useAppDispatch();

  const { prepareAndSendTransaction } = useTransaction();

  const { address, chainId } = useWallet2();

  const { isAuthorized, jwtToken } = useAppSelector(state => state.userSlice);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isAnimateSendButton, setIsAnimateSendButton] = useState<boolean>(false);
  const [isSendButton, setIsSendButton] = useState<boolean>(false);
  const [myMessage, setMyMessage] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [allMessages, setAllMessages] = useState<Message[]>([defaultMessage]);
  const [isGetHistoryError, setIsGetHistoryError] = useState<boolean>(false);

  const initialTextareaHeight = useRef<number>(0);

  const [sendMyMessage, { data, isLoading }] = useSendMyMessageMutation();

  const {
    data: messages,
    isError,
    isLoading: isLoadingMessages,
  } = useGetHistoryMessageQuery(
    { session_id: address! },
    {
      skip: !(!!address && !!isAuthorized && !!jwtToken),
    },
  );

  const handleSendMessage = async () => {
    try {
      if (!myMessage.trim()) return;

      if (!address) {
        return toast.warning("Пожалуйста, подключите крипто-кошелёк", {
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

      if (!isAuthorized) {
        return openModal("register");
      }

      const copyMessage = JSON.parse(JSON.stringify(myMessage));
      setMyMessage("");
      setIsDone(false);

      setAllMessages(prev => [
        ...prev,
        {
          id: Number(Date.now()),
          role: "user",
          content: copyMessage,
          sent_at: new Date(),
        },
      ]);

      await sendMyMessage({ query: copyMessage, session_id: address, chainId }).unwrap();

      dispatch(setIsHaveMessages(true));
    } catch {
      toast.error("Произошла ошибка при отправке сообщения", {
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

  const handleDone = (text: string) => {
    setAllMessages(prev => [
      ...prev,
      {
        id: Number(Date.now()),
        role: "assistant",
        content: text,
        sent_at: new Date(),
      },
    ]);

    setIsDone(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!isGetHistoryError && isError && isAuthorized) {
      setIsGetHistoryError(true);

      toast.error("Произошла ошибка при получении истории сообщений", {
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

    if (!isError && address && messages?.messages && isAuthorized) {
      setAllMessages([defaultMessage, ...messages.messages]);
      setIsGetHistoryError(false);

      if (messages.messages.length) dispatch(setIsHaveMessages(true));

      return;
    }

    dispatch(setIsHaveMessages(false));
  }, [messages, address, isError, isGetHistoryError, theme, isAuthorized]);

  useEffect(() => {
    if (data?.transaction && isDone) {
      prepareAndSendTransaction(data.transaction, setAllMessages);
    }
  }, [data, isDone]);

  useEffect(() => {
    const updateChatHeight = () => {
      if (chatRef.current && wrapperRef.current) {
        const height = window.innerHeight - 98 - wrapperRef.current.scrollHeight;
        chatRef.current.style.height = `${height < 100 ? 100 : height}px`;
      }
    };

    updateChatHeight();
    window.addEventListener("resize", updateChatHeight);

    return () => {
      window.removeEventListener("resize", updateChatHeight);
    };
  }, [allMessages, wrapperRef]);

  useEffect(() => {
    scrollToBottom();
  }, [displayedText, allMessages, isLoading]);

  useEffect(() => {
    if (isSendButton && !isAnimateSendButton) {
      const timer = setTimeout(() => {
        setIsAnimateSendButton(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isSendButton, isAnimateSendButton]);

  useEffect(() => {
    if (!myMessage) {
      setIsAnimateSendButton(false);

      const timer = setTimeout(() => {
        setIsSendButton(false);
      }, 200);

      return () => clearTimeout(timer);
    }

    if (myMessage) setIsSendButton(true);
  }, [myMessage]);

  useEffect(() => {
    if (textareaRef.current && wrapperRef.current) {
      if (!initialTextareaHeight.current) {
        initialTextareaHeight.current = textareaRef.current.offsetHeight;
      }

      textareaRef.current.style.height = "52px";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
      wrapperRef.current.style.height = `${newHeight + 52}px`;
    }
  }, [myMessage]);

  return (
    <section className={`${styles.AIMessenger} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.chat} ref={chatRef}>
        {isLoadingMessages ? (
          <PageLoader />
        ) : (
          <div>
            {allMessages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.message__wrapper} ${message.role === "user" ? styles.user : styles.ai}`}
                >
                  {message.role === "transaction" && message?.transaction?.status === "pending" ? (
                    <PendingBlock message={message} />
                  ) : message.role === "transaction" && message?.transaction?.status === "processing" ? (
                    <ProcessingTransaction message={message} />
                  ) : message.role === "transaction" && message?.transaction?.status === "success" ? (
                    <TransactionSuccessful message={message} />
                  ) : (
                    <SimpleMessage message={message} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className={`${styles.message__wrapper} ${styles.ai}`}>
          {!isDone && isLoading && <GippyThink />}
          {!isDone && data?.response && (
            <TypingMessage
              speed={Math.max(10, Math.min(50, 2000 / data.response.length))}
              text={data.response}
              displayedText={displayedText}
              handleDone={handleDone}
              setDisplayedText={setDisplayedText}
            />
          )}
        </div>
      </div>
      <div ref={wrapperRef} className={`${styles.input__message__wrapper} ${theme === "dark" ? styles.dark : ""}`}>
        <div className={styles.input__message}>
          <textarea
            ref={textareaRef}
            value={myMessage}
            onChange={e => setMyMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напишите сообщение..."
            className={`${styles.textarea} ${theme === "dark" ? styles.dark : ""}`}
            rows={1}
          />

          {!!isSendButton && (
            <div
              className={`${styles.send__button__wrapper} ${isAnimateSendButton && styles.visible}`}
              onClick={handleSendMessage}
            >
              <Send color="#fff" size={19} />
            </div>
          )}

          <div className={`${styles.microphone__wrapper} ${theme === "dark" ? styles.dark : ""}`}>
            <Mic />
          </div>
        </div>
      </div>
    </section>
  );
};
