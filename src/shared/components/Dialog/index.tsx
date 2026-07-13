import { useEffect, useId, useRef, type ReactNode } from "react";
import styles from "./Dialog.module.css";

interface Props {
  onClose: () => void;
  title: string;
  children: ReactNode;
}

// Rendered conditionally by the parent: mounting opens it, unmounting closes it.
function Dialog({ onClose, title, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    // Close before React removes the node so the browser runs its closing steps
    // (returning focus to the element that opened the dialog).
    return () => dialog?.close();
  }, []);

  // Escape fires the native cancel event; onClose tells the parent to unmount us.
  // Synced via cancel rather than close because the cleanup's close() above also
  // fires a (queued) close event, which would re-trigger onClose after StrictMode
  // remounts and close the dialog as soon as it opens.
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
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}

export default Dialog;
