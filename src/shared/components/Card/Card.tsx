import { type ReactNode } from "react";
import classNames from "classnames";
import styles from "./Card.module.css";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  onSelect?: (id: string) => void;
  selectLabel?: string;
}

function Card({ children, className, id, onSelect, selectLabel }: Props) {
  return (
    <li className={classNames(styles.card, className)}>
      {children}
      {id !== undefined && onSelect !== undefined && (
        <button
          type="button"
          className={styles.trigger}
          aria-label={selectLabel}
          onClick={() => onSelect(id)}
        />
      )}
    </li>
  );
}

export default Card;
