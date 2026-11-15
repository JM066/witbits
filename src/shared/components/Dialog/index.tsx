import { useId, type ReactNode } from "react";
import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Dialog.module.css";

interface Props {
  onClose: () => void;
  title: string;
  children: ReactNode;
}

// Rendered conditionally by the parent: mounting opens it, unmounting closes it.
// MUI handles the focus trap, Escape, backdrop clicks and returning focus.
function Dialog({ onClose, title, children }: Props) {
  const titleId = useId();

  return (
    <MuiDialog
      open
      onClose={onClose}
      aria-labelledby={titleId}
      maxWidth="md"
      fullWidth
    >
      <div className={styles.header}>
        <DialogTitle id={titleId} className={styles.title}>
          {title}
        </DialogTitle>
        <IconButton onClick={onClose} aria-label="Close dialog">
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
}

export default Dialog;
