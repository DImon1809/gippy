import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Mic, Send } from "lucide-react";

import { useSendMyMessageMutation } from "@/features/message/messageApi";
import { GippyLogo } from "@/shared/assets/GippyLogo";
import { UserLogo } from "@/shared/assets/UserLogo";
import type { Message } from "@/shared/config/Message";
import { useWallet } from "@/shared/lib/hooks/useWallet";

import { TypingMessage } from "./ui/TypingMessage";

import styles from "./style.module.scss";

export const AIMessenger = () => {
  const { address } = useWallet();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isAnimateSendButton, setIsAnimateSendButton] = useState<boolean>(false);
  const [isSendButton, setIsSendButton] = useState<boolean>(false);
  const [myMessage, setMyMessage] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [allMessages, setAllMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "🤗 Привет! Я Gippy — твой дружелюбный помощник по финансам и криптовалютам. Вот несколько вещей, которыми могу помочь: 💰 **Финансы и инвестиции:** консультации по криптовалютам, советы по трейдингу и инвестированию. 📊 **Технический анализ:** помощь в понимании графиков и рыночных трендов. 🔮 **Блокчейн и DeFi:** объяснение технологий блокчейна, токенов и DeFi-приложений. 🛠️ **Программирование и разработка:** подсказки по созданию смарт-контрактов и DApps. 📌 **Общий совет и обучение:** финансовые стратегии, экономическая аналитика и многое другое! Что именно тебя интересует сейчас? 😊",
      timestamp: new Date(),
    },
  ]);

  const [sendMyMessage, { data }] = useSendMyMessageMutation();

  const initialTextareaHeight = useRef<number>(0);

  const handleSendMessage = async () => {
    try {
      if (!myMessage.trim()) return;

      if (!address) {
        return toast.warning("Пожалуйста, подключите крипто-кошелёк", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      const copyMessage = JSON.parse(JSON.stringify(myMessage));
      setMyMessage("");
      setIsDone(false);

      setAllMessages(prev => [
        ...prev,
        {
          id: String(Date.now()),
          type: "user",
          content: copyMessage,
          timestamp: new Date(),
        },
      ]);

      await sendMyMessage({ query: copyMessage, session_id: address }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDone = (text: string) => {
    setAllMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        type: "ai",
        content: text,
        timestamp: new Date(),
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
    scrollToBottom();
  }, [displayedText]);

  useEffect(() => {
    if (isSendButton && !isAnimateSendButton) {
      const timer = setTimeout(() => {
        console.log("send1");
        setIsAnimateSendButton(true);
        console.log("send2");
      }, 200);

      console.log("work2");

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

  console.log("isSendButton", isSendButton);
  console.log("isAnimateSendButton", isAnimateSendButton);

  useEffect(() => {
    if (textareaRef.current) {
      if (!initialTextareaHeight.current) {
        initialTextareaHeight.current = textareaRef.current.offsetHeight;
      }

      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;

      if (wrapperRef.current) {
        const heightDiff = newHeight - initialTextareaHeight.current;
        wrapperRef.current.style.transform = `translateY(-${heightDiff}px)`;
      }
    }
  }, [myMessage]);

  return (
    <section className={styles.AIMessenger}>
      <div className={styles.chat} ref={chatRef}>
        <div>
          {allMessages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message__wrapper} ${
                message.type === "ai" ? styles.ai : styles.user
              }`}
            >
              <div
                className={`${styles.message}
                ${message.type === "ai" ? styles.ai : styles.user}
                `}
              >
                <span>{message.content}</span>
                <div
                  className={`${styles.sender}
                ${message.type === "ai" ? styles.ai : styles.user}
                `}
                >
                  {message.type === "ai" ? <GippyLogo size={32} /> : <UserLogo />}
                </div>

                <div
                  className={`${styles.time}
                ${message.type === "ai" ? styles.ai : styles.user}
                `}
                >
                  <span>{new Date(message.timestamp).toTimeString().slice(0, 5)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.message__wrapper} ${styles.ai}`}>
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
      <div ref={wrapperRef} className={styles.input__message__wrapper}>
        <div className={styles.input__message}>
          <textarea
            ref={textareaRef}
            value={myMessage}
            onChange={e => setMyMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напишите сообщение..."
            className={styles.textarea}
            rows={1}
          />

          {!!isSendButton && (
            <div
              className={`${styles.send__button__wrapper} ${isAnimateSendButton && styles.visible}`}
            >
              <Send color="#fff" size={19} />
            </div>
          )}

          <div className={styles.microphone__wrapper}>
            <Mic />
          </div>
        </div>
      </div>
    </section>
  );
};
