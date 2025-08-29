import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Search } from "lucide-react";

import styles from "./style.module.scss";

type Props = {
  id?: string;
  className?: string;
  isSearch?: boolean;
  placeholder?: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
};

export const Input = ({ id, className, isSearch, placeholder, value, setValue }: Props) => {
  const [current, setCurrent] = useState<string>(value ?? "");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (setValue) setValue(event.target.value);

    setCurrent(event.target.value);
  };

  return (
    <div id={id} className={`${styles.input__wrapper} ${className}`}>
      {isSearch && <Search className={styles.search} size={16} />}
      <input
        placeholder={placeholder}
        className={`${styles.input} ${isSearch ? styles.set_search : ""}`}
        value={current}
        onChange={handleChange}
      />
    </div>
  );
};
