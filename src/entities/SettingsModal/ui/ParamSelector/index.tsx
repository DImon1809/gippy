import { type ChangeEvent, useContext, useState } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  options: string[];
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const ParamSelector = ({ options, handleChange }: Props) => {
  const { theme } = useContext(ThemeContext);

  const [value, setValue] = useState<string>();

  return (
    <div className={styles.param__selector}>
      <select
        onChange={(event) => {
          if (handleChange) handleChange(event);

          setValue(event.target.value);
        }}
        value={value}
        className={`${styles.select} ${theme === "dark" ? styles.dark : ""}`}
      >
        {options.map((option, i) => (
          <option value={option} key={i}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
