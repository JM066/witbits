import { type ReactNode } from "react";
import classNames from "classnames";
import styles from "./CardList.module.css";

interface Props {
  children: ReactNode;
  className?: string;
}

function CardList({ children, className }: Props) {
  return <ul className={classNames(styles.list, className)}>{children}</ul>;
}

export default CardList;
