import { type ChangeEvent, type Dispatch, type SetStateAction, useContext, useState } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string | null;
  setValue?: Dispatch<SetStateAction<string | null>>;
};
export const TextArea = ({ id, className, placeholder, value, setValue }: Props) => {
  const { theme } = useContext(ThemeContext);

  const [current, setCurrent] = useState<string>(value ?? "");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (setValue) setValue(event.target.value);

    setCurrent(event.target.value);
  };

  return (
    <div id={id} className={`${styles.textarea__wrapper} ${className}`}>
      <textarea
        className={`${styles.textarea} ${theme === "dark" ? styles.dark : ""}`}
        placeholder={placeholder}
        value={current}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};
