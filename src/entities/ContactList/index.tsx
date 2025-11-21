import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect, useState } from "react";
import { Copy, User } from "lucide-react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { Button, Input } from "@/shared";
import type { Contact } from "@/shared/lib/types";

import styles from "./style.module.scss";

type Props = {
  contacts: Contact[];
  initinalContacts: Contact[];
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  setCurrentContact: Dispatch<SetStateAction<Contact | undefined>>;
};

export const ContactList = ({ contacts, initinalContacts, setContacts, setCurrentContact }: Props) => {
  const { theme } = useContext(ThemeContext);

  const { openModal } = useContext(ModalContext);

  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    if (search) {
      setContacts(contacts => {
        return contacts.filter(contact => {
          return (
            contact.name.includes(search) ||
            contact.description.includes(search) ||
            contact.dateAdded.includes(search) ||
            contact.address.includes(search)
          );
        });
      });

      return;
    }

    setContacts(initinalContacts);
  }, [search]);

  return (
    <section>
      <header className={styles.contact__list__header}>
        <Input isSearch={true} placeholder="Search contacts" setValue={setSearch} />
        <Button isAdd={true} handleClick={() => openModal("contact", { isEdit: false, setContacts: setContacts })}>
          Add contact
        </Button>
      </header>
      <div className={styles.contacts}>
        <header className={`${styles.contacts__header} ${theme === "dark" ? styles.dark : ""}`}>
          <User size={16} />
          <div>
            <span>{`Contacts (${contacts.length})`}</span>
          </div>
        </header>
        <div className={styles.list}>
          {contacts.map((contact, index) => (
            <div
              className={`${styles.contact__wrapper} ${theme === "dark" ? styles.dark : ""}`}
              key={index}
              onClick={() => setCurrentContact(contacts?.find(c => c.id === contact.id))}
            >
              <div>
                <h4 className={`${styles.contact__name} ${theme === "dark" ? styles.dark : ""}`}>{contact.name}</h4>
              </div>
              <div className={styles.address}>
                <p className={`${styles.address__text} ${theme === "dark" ? styles.dark : ""}`}>
                  {`${contact.address.split("").slice(0, 8).join("")} . . . ${contact.address
                    .split("")
                    .slice(contact.address.length - 8, contact.address.length)
                    .join("")}`}
                </p>
              </div>
              <div>
                <p className={`${styles.description} ${theme === "dark" ? styles.dark : ""}`}>{contact.description}</p>
              </div>
              <div className={`${styles.wrapper} ${theme === "dark" ? styles.dark : ""}`}>
                <span>{contact.dateAdded}</span>
                <div className={styles.copy__wrapper}>
                  <Copy size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
