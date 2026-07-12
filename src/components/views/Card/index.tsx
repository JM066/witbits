import { memo, type ReactNode } from "react";
import classNames from "classnames";
import styles from "./Card.module.css";

interface Props {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: Props) {
  return <li className={classNames(styles.card, className)}>{children}</li>;
}

export default memo(Card);
