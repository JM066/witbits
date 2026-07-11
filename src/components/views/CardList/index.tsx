import { memo, type ReactNode } from "react";
import classNames from "classnames";
import styles from "./CardList.module.css";

interface Props {
  children: ReactNode;
  className?: string;
}

function CardList({ children, className }: Props) {
  return <ul className={classNames(styles.gallery, className)}>{children}</ul>;
}

export default memo(CardList);
