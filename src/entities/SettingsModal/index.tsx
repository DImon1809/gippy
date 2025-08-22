import React, { type ChangeEvent, useContext, useState } from "react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { XButton } from "@/shared";
import type { Theme } from "@/shared/lib/types";

import { ParamSelector } from "./ui/ParamSelector";
import { SettingsNavbar } from "./ui/SettingsNavbar";

import styles from "./style.module.scss";

const navItems = ["General", "Profile", "About"] as const;

export type NavItems = (typeof navItems)[number];

export const SettingsModal = () => {
  const { closeModal } = useContext(ModalContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const [direction, setDirection] = useState<NavItems>("General");

  const handleChangeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value.toLocaleLowerCase() as Theme);
  };

  return (
    <section className={`${styles.settings__modal} ${theme === "dark" ? styles.dark : ""}`}>
      <header>
        <div>
          <h2 className={`${styles.settings__title} ${theme === "dark" ? styles.dark : ""}`}>
            Settings
          </h2>
        </div>
        <XButton handler={closeModal} />
      </header>

      <SettingsNavbar navItems={navItems} setDirection={setDirection} />

      <div className={styles.settings__content}>
        {direction === "General" ? (
          <div className={styles.content__wrapper}>
            <div className={styles.content__row}>
              <div>
                <h3
                  className={`${styles.content__row__title} ${theme === "dark" ? styles.dark : ""}`}
                >
                  Language
                </h3>
              </div>
              <ParamSelector options={["English", "Russian"]} />
            </div>
            <div className={styles.content__row}>
              <div>
                <h3
                  className={`${styles.content__row__title} ${theme === "dark" ? styles.dark : ""}`}
                >
                  Theme
                </h3>
              </div>
              <ParamSelector
                options={theme === "dark" ? ["Dark", "Light"] : ["Light", "Dark"]}
                handleChange={handleChangeTheme}
              />
            </div>
          </div>
        ) : (
          <div
            className={`${styles.promising__inscription} ${theme === "dark" ? styles.dark : ""}`}
          >
            <h3>{`${direction === "Profile" ? "Profile" : "About"} settings coming soon...`}</h3>
          </div>
        )}
      </div>
    </section>
  );
};
