import type { Dispatch, SetStateAction } from "react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { ModalContext } from "@/app/providers/ModalProvider";
import { Button, Input, TextArea, XButton } from "@/shared";
import type { Contact } from "@/shared/lib/types";

import styles from "./style.module.scss";

type Props = {
  currentContact?: Contact;
  isEdit?: boolean;
  setContacts?: Dispatch<SetStateAction<Contact[]>>;
};

export const ContactModal = ({ currentContact, isEdit = false, setContacts }: Props) => {
  const { closeModal } = useContext(ModalContext);

  const [firstName, setFirstName] = useState<string>(currentContact?.name ?? "");
  const [walletAddress, setWalletAddress] = useState<string>(currentContact?.address ?? "");
  const [description, setDescription] = useState<string>(currentContact?.description ?? "");

  const handleSubmit = () => {
    if (!firstName || !walletAddress || !description) {
      return toast.warning("Пожалуйста, заполните все поля", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (!isEdit && setContacts) {
      setContacts(contacts => [
        ...contacts,
        {
          id: String(new Date().getTime() + 1),
          name: firstName,
          address: walletAddress,
          dateAdded: new Date().toLocaleDateString(),
          description: description,
        },
      ]);
    }

    if (isEdit && setContacts) {
      setContacts(prev => {
        return prev.map(contact =>
          contact.id === currentContact?.id
            ? {
                ...currentContact,
                name: firstName,
                address: walletAddress,
                description,
              }
            : contact,
        );
      });
    }

    closeModal();
  };

  return (
    <section className={styles.contact__modal}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.contact__title}>{isEdit ? "Edit Contact" : "Add New Contact"}</h2>
        </div>
        <XButton handler={closeModal} />
      </header>

      <form className={styles.form}>
        <div>
          <label htmlFor="firstName">Name</label>
          <Input
            id="firstName"
            placeholder="Enter contact name"
            className={styles.input}
            value={firstName}
            setValue={setFirstName}
          />
        </div>

        <div>
          <label htmlFor="walletAddress">Wallet Address</label>
          <Input
            id="walletAddress"
            placeholder="Enter wallet address"
            className={styles.input}
            value={walletAddress}
            setValue={setWalletAddress}
          />
        </div>

        <div>
          <label htmlFor="description">Wallet Address</label>
          <TextArea
            id="description"
            placeholder="Enter description (optional)"
            className={styles.input}
            value={description}
            setValue={setDescription}
          />
        </div>

        <div className={styles.buttons__wrapper}>
          <Button className={styles.button} handleClick={handleSubmit}>
            {isEdit ? "Save Changes" : "Add Contact"}
          </Button>

          <Button isOutline={true} className={styles.button} handleClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};
