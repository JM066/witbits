import classNames from "classnames";
import { ElementType, memo, type HTMLAttributes } from "react";
import styles from "./Text.module.css";

interface Props extends HTMLAttributes<HTMLElement> {
  text: string | number;
  variant?: "primary" | "secondary" | "error" | "muted";
  align?: "start" | "center" | "end";
  caption?: boolean;
  as?: ElementType;
  className?: string;
}

function Text({
  text,
  as = "p",
  variant = "primary",
  align,
  caption = false,
  className,
  ...rest
}: Props) {
  const Element = as;
  return (
    <Element
      className={classNames(
        styles.text,
        styles[variant],
        caption && styles.caption,
        align && styles[align],
        className,
      )}
      {...rest}
    >
      {text}
    </Element>
  );
}
export default memo(Text);
