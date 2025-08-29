import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect, useState } from "react";
import { Calendar, Check, Copy, User } from "lucide-react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { Button } from "@/shared";
import type { Contact } from "@/shared/lib/types";

import styles from "./style.module.scss";

type Props = {
  currentContact: Contact | undefined;
  setContacts?: Dispatch<SetStateAction<Contact[]>>;
};

export const ContactDetails = ({ currentContact, setContacts }: Props) => {
  const { openModal } = useContext(ModalContext);

  const [isCopy, setIsCopy] = useState<boolean>(false);

  useEffect(() => {
    if (isCopy) {
      const timer = setTimeout(() => {
        setIsCopy(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isCopy]);

  return (
    <section className={styles.contact__details}>
      <header className={styles.contact__header}>
        <h3>Contact Details</h3>
      </header>
      {!currentContact ? (
        <div className={styles.content__wrapper}>
          <div className={styles.default__message}>
            <User size={54} />
            <span>Select a contact to view details</span>
          </div>
        </div>
      ) : (
        <div className={styles.contact__wrapper}>
          <div>
            <h4 className={styles.field__title}>Name</h4>
            <h4 className={styles.first__name}>{currentContact.name}</h4>
          </div>
          <div>
            <h4 className={styles.field__title}>Wallet Address</h4>
            <div className={styles.address__wrapper}>{currentContact.address}</div>
            {!isCopy ? (
              <div className={styles.copy__button} onClick={() => setIsCopy(true)}>
                <Copy size={16} />
                <span>Copy Address</span>
              </div>
            ) : (
              <div className={styles.coped__button}>
                <Check size={16} />
                <span>Copy Address</span>
              </div>
            )}
          </div>

          <div>
            <h4 className={styles.field__title}>Description</h4>
            <div className={styles.description}>
              <span>{currentContact.description}</span>
            </div>
          </div>

          <div>
            <h4 className={styles.field__title}>Added</h4>
            <div className={styles.calendar}>
              <Calendar size={16} />
              <span>{currentContact.dateAdded}</span>
            </div>
          </div>

          <Button
            isEdit={true}
            className={styles.button}
            handleClick={() => openModal("contact", { isEdit: true, currentContact, setContacts })}
          >
            Edit Contact
          </Button>
        </div>
      )}
    </section>
  );
};
