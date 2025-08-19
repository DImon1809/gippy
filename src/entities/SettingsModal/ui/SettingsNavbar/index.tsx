import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect, useRef, useState } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import type { NavItems } from "../..";

import styles from "./style.module.scss";

type Props = {
  navItems: readonly NavItems[];
  setDirection: Dispatch<SetStateAction<NavItems>>;
};

export const SettingsNavbar = ({ navItems, setDirection }: Props) => {
  const { theme } = useContext(ThemeContext);

  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateIndicator = (itemRef: HTMLElement | null, index: number) => {
    if (itemRef) {
      const { offsetLeft, offsetWidth } = itemRef;
      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });

      setActiveIndex(index);
      setDirection(navItems[index]);
    }
  };

  useEffect(() => {
    if (itemsRef.current[0]) {
      updateIndicator(itemsRef.current[0], 0);
    }
  }, []);

  return (
    <nav className={styles.settings__navbar}>
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`${styles.navbar__item} ${
            activeIndex === index ? styles.active : ""
          } ${theme === "dark" ? styles.dark : ""}`}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          onClick={() => {
            updateIndicator(itemsRef.current[index], index);
          }}
        >
          <p>{item}</p>
        </div>
      ))}

      <div className={styles.indicator} style={indicatorStyle}></div>
    </nav>
  );
};
