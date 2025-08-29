import { type ChangeEvent, type Dispatch, type SetStateAction, useState } from "react";

import styles from "./style.module.scss";

type Props = {
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
};
export const TextArea = ({ id, className, placeholder, value, setValue }: Props) => {
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
        className={styles.textarea}
        placeholder={placeholder}
        value={current}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};
