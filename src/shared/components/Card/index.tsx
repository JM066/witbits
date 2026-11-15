import { type ReactNode } from "react";
import classNames from "classnames";
import MuiCard from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";
import styles from "./Card.module.css";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  onSelect?: (id: string) => void;
  // Accessible name for the trigger
  selectLabel?: string;
}

function Card({ children, className, id, onSelect, selectLabel }: Props) {
  return (
    <MuiCard component="li" className={classNames(styles.card, className)}>
      {children}
      {id !== undefined && onSelect !== undefined && (
        // Overlay button rather than wrapping the content, so headings stay outside a <button>.
        <ButtonBase
          className={styles.trigger}
          aria-label={selectLabel}
          onClick={() => onSelect(id)}
        />
      )}
    </MuiCard>
  );
}

export default Card;
