import classNames from "classnames";
import { ElementType, memo, type HTMLAttributes } from "react";
import styles from "./Text.module.css";

interface Props extends HTMLAttributes<HTMLElement> {
  text: string | number;
  // Shown after `text` with a marker-pen highlight, e.g. the punchline of a headline.
  highlight?: string;
  variant?: "primary" | "secondary" | "error" | "muted";
  size?: "display" | "title" | "heading" | "lead" | "body" | "caption";
  align?: "start" | "center" | "end";
  as?: ElementType;
  className?: string;
}

function Text({
  text,
  highlight,
  as = "p",
  variant = "primary",
  size = "body",
  align,
  className,
  ...rest
}: Props) {
  const Element = as;
  return (
    <Element
      className={classNames(
        styles.text,
        styles[variant],
        styles[size],
        align && styles[align],
        className,
      )}
      {...rest}
    >
      {text}
      {highlight !== undefined && (
        <>
          {" "}
          <span className={styles.highlight}>{highlight}</span>
        </>
      )}
    </Element>
  );
}
export default memo(Text);
