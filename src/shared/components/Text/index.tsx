import classNames from "classnames";
import { ElementType, memo, type HTMLAttributes } from "react";
import styles from "./Text.module.css";

interface Props extends HTMLAttributes<HTMLElement> {
  text: string | number;
  as?: ElementType;
  className?: string;
  muted?: boolean;
}

function Text({ text, as = "p", muted, className, ...rest }: Props) {
  const Element = as;
  return (
    <Element
      className={classNames(styles.text, muted && styles.muted, className)}
      {...rest}
    >
      {text}
    </Element>
  );
}
export default memo(Text);
