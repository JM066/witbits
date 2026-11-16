import { useEffect, useId, useRef, type ReactNode } from "react";
import Button from "@/shared/components/Button";
import styles from "./Dialog.module.css";
import Text from "../Text";

interface Props {
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function Dialog({ onClose, title, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    // Close before React removes the node so the browser runs its closing steps
    // (returning focus to the element that opened the dialog).
    return () => {
      dialog?.close();
    };
  }, []);

  // Escape fires the native cancel event
  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    // Backdrop click is a mouse-only shortcut; keyboard users close via Escape (onCancel) or the close button.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <Text
            as="h2"
            id={titleId}
            size="title"
            text={title}
            className={styles.title}
          />
          <Button
            variant="secondary"
            onClick={onClose}
            aria-label="Close dialog"
          >
            &times;
          </Button>
        </header>
        {children}
      </div>
    </dialog>
  );
}

export default Dialog;
