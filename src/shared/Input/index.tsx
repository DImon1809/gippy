import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useContext, useState } from "react";
import { Search } from "lucide-react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  id?: string;
  className?: string;
  isSearch?: boolean;
  placeholder?: string;
  value?: string | null;
  setValue?: Dispatch<SetStateAction<string | null>>;
};

export const Input = ({ id, className, isSearch, placeholder, value, setValue }: Props) => {
  const { theme } = useContext(ThemeContext);

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
        className={`${styles.input} ${isSearch ? styles.set_search : ""} ${theme === "dark" ? styles.dark : ""}`}
        value={current}
        onChange={handleChange}
      />
    </div>
  );
};
