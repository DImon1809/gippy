import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Headphones, MessageCircle, Receipt, Settings, TrendingUp, Users, Wallet } from "lucide-react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { UserCard } from "@/entities/UserCard";
import { GippyLogo } from "@/shared/assets/GippyLogo";

import { SidebarItem } from "./ui/SidebarItem";

import styles from "./style.module.scss";

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isDisabled: boolean;
  description: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "chat",
    name: "AI Chat",
    icon: MessageCircle,
    href: "/",
    isDisabled: false,
    description: "Chat with Gippy for crypto",
  },
  {
    id: "wallet",
    name: "Wallet",
    icon: Wallet,
    href: "/wallet",
    isDisabled: true,
    description: "Tottal crypto asset balance",
  },
  {
    id: "transactions",
    name: "Transactions",
    icon: Receipt,
    href: "/transactions",
    isDisabled: true,
    description: "All wallet transactions",
  },
  {
    id: "contacts",
    name: "Contacts",
    icon: Users,
    href: "/contacts",
    isDisabled: true,
    description: "Contact graph with name",
  },
  {
    id: "positions",
    name: "Positions",
    icon: TrendingUp,
    href: "/positions",
    isDisabled: true,
    description: "Open lending positions",
  },
  {
    id: "support",
    name: "Support",
    icon: Headphones,
    href: "/support",
    isDisabled: true,
    description: "Contact options",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    href: "/settings",
    isDisabled: false,
    description: "System appearance",
  },
];

export const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  const [isDecrease, setIsDecrease] = useState<boolean>(false);

  const navItemsRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const navigateForPage = (name: string) => {
    const href = navigationItems.find(item => item.name === name)?.href || null;

    if (!href) return;

    navigate(href);
  };

  useEffect(() => {
    const updateChatHeight = () => {
      if (navItemsRef.current) {
        const height = window.innerHeight - 238;
        navItemsRef.current.style.height = `${height < 70 ? 70 : height}px`;

        if (height < 540) {
          navItemsRef.current.style.overflowY = "scroll";
        }
      }
    };

    updateChatHeight();
    window.addEventListener("resize", updateChatHeight);

    return () => {
      window.removeEventListener("resize", updateChatHeight);
    };
  }, []);

  return (
    <nav className={`${styles.sidebar} ${theme === "dark" ? styles.dark : ""} ${isDecrease ? styles.decrease : ""}`}>
      <div className={`${styles.logo__container}  ${theme === "dark" ? styles.dark : ""}`}>
        <div className={styles.logo}>
          <GippyLogo />
          <div className={`${styles.logo__context} ${isDecrease ? styles.decrease : ""}`}>
            <div>
              <h1 className={`${styles.app__name} ${theme === "dark" ? styles.dark : ""}`}>Gippy</h1>
            </div>
            <div>
              <p className={`${styles.text} ${theme === "dark" ? styles.dark : ""}`}>AI Assistant</p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.chevron}  ${theme === "dark" ? styles.dark : ""} ${isDecrease ? styles.decrease : ""}`}
          onClick={() => {
            setIsDecrease(prev => !prev);
          }}
        >
          <ChevronLeft size={22} />
        </div>
      </div>
      <div className={styles.items__wrapper} ref={navItemsRef}>
        {navigationItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <SidebarItem
              key={index}
              Icon={Icon}
              name={item.name}
              description={item.description}
              isActive={item.href === location.pathname}
              isDecrease={isDecrease}
              isDisabled={item.isDisabled}
              navigateForPage={navigateForPage}
            />
          );
        })}
      </div>
      <div className={styles.user__card__wrapper}>
        <UserCard isDecrease={isDecrease} />
      </div>
    </nav>
  );
};
