import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Headphones,
  MessageCircle,
  Receipt,
  Settings,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import { UserCard } from "@/entities/UserCard";
import { GippyLogo } from "@/shared/assets/GippyLogo";

import { SidebarItem } from "./ui/SidebarItem";

import styles from "./style.module.scss";

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  description: string;
}

export const Sidebar = () => {
  const [isBarItemActive, setIsBarItemActive] = useState<boolean>(false);

  const navigationItems: NavigationItem[] = [
    {
      id: "chat",
      name: "AI Chat",
      icon: MessageCircle,
      href: "/chat",
      description: "Chat with Gippy for crypto",
    },
    {
      id: "wallet",
      name: "Wallet",
      icon: Wallet,
      href: "/wallet",
      description: "Tottal crypto asset balance",
    },
    {
      id: "transactions",
      name: "Transactions",
      icon: Receipt,
      href: "/transactions",
      description: "All wallet transactions",
    },
    {
      id: "contacts",
      name: "Contacts",
      icon: Users,
      href: "/contacts",
      description: "Contact graph with name",
    },
    {
      id: "positions",
      name: "Positions",
      icon: TrendingUp,
      href: "/positions",
      description: "Open lending positions",
    },
    {
      id: "support",
      name: "Support",
      icon: Headphones,
      href: "/support",
      description: "Contact options",
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      href: "/settings",
      description: "System appearance",
    },
  ];

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo__container}>
        <div className={styles.logo}>
          <GippyLogo />
          <div className={styles.logo__context}>
            <div>
              <h1>Gippy</h1>
            </div>
            <div>
              <p>AI Assistant</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.items__wrapper}>
        {navigationItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <SidebarItem
              key={index}
              Icon={Icon}
              name={item.name}
              description={item.description}
            />
          );
        })}
      </div>
      <div className={styles.user__card__wrapper}>
        <UserCard />
      </div>
    </nav>
  );
};
