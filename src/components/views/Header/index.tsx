import { type ReactNode } from "react";
import classNames from "classnames";
import styles from "./Header.module.css";

interface Props {
  children: ReactNode;
  className?: string;
}

function Header({ children, className }: Props) {
  return (
    <header className={classNames(styles.header, className)}>{children}</header>
  );
}

export default Header;
