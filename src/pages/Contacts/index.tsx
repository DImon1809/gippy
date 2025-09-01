import { useContext, useState } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { ContactDetails } from "@/entities/ContactDetails";
import { ContactList } from "@/entities/ContactList";
import type { Contact } from "@/shared/lib/types";

import styles from "./style.module.scss";

const initinalContacts = [
  {
    id: "1",
    name: "Alice Johnson",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    description: "Бизнес-партнер по DeFi проектам. Надежный и опытный в смарт-контрактах.",
    dateAdded: "1/15/2024",
  },
  {
    id: "2",
    name: "Bob Smith",
    address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    description: "Друг с крипто-встреч. Интересуется NFT и игровыми токенами.",
    dateAdded: "2/10/2024",
  },
  {
    id: "3",
    name: "Carol Davis",
    address: "bc1qxy2k95ufjh6owl1",
    description: "Инвестиционный консультант, специализирующийся на криптовалютных портфелях.",
    dateAdded: "3/5/2024",
  },
  {
    id: "4",
    name: "Дима",
    address: "вывыдвадывадывадвыв",
    description: "Брат",
    dateAdded: "11/07/2025",
  },
];

export const Contacts = () => {
  const { theme } = useContext(ThemeContext);

  const [contacts, setContacts] = useState<Contact[]>(initinalContacts);
  const [currentContact, setCurrentContact] = useState<Contact | undefined>(undefined);

  return (
    <section className={`${styles.contacts} ${theme === "dark" ? styles.dark : ""}`}>
      <div>
        <header className={styles.contacts__header}>
          <div>
            <h3 className={`${styles.contacts__title} ${theme === "dark" ? styles.dark : ""}`}>
              Crypto Contact Book
            </h3>
          </div>
          <div>
            <p className={`${styles.contacts__description} ${theme === "dark" ? styles.dark : ""}`}>
              Manage contacts and wallet addresses
            </p>
          </div>
        </header>
        <ContactList
          contacts={contacts}
          initinalContacts={initinalContacts}
          setContacts={setContacts}
          setCurrentContact={setCurrentContact}
        />
      </div>
      <div>
        <ContactDetails currentContact={currentContact} setContacts={setContacts} />
      </div>
    </section>
  );
};
