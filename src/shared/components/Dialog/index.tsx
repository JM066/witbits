import { memo, useEffect, useId, useRef, type ReactNode } from "react";
import Button from "@/shared/components/Button";
import styles from "./Dialog.module.css";

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
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
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

export default memo(Dialog);
