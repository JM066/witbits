import { memo } from "react";
import classNames from "classnames";
import styles from "./Skeleton.module.css";

interface Props {
  className?: string;
}

function Skeleton({ className }: Props) {
  return (
    <div
      className={classNames(styles.skeleton, className)}
      aria-hidden="true"
    />
  );
}

export default memo(Skeleton);
