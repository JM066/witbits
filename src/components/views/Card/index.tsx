import { memo, type ReactNode } from "react";
import classNames from "classnames";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return <li className={classNames(styles.card, className)}>{children}</li>;
}

export default memo(Card);
