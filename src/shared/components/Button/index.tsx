import classNames from "classnames";
import { memo, type ButtonHTMLAttributes, type MouseEvent } from "react";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  margin?: boolean;
}

function Button({
  variant = "primary",
  loading = false,
  type = "button",
  className,
  disabled = false,
  margin,
  onClick,
  children,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;
  // aria-disabled (rather than the disabled attribute) so keyboard and screen-reader users can still discover it and
  // understand why it's unavailable. Activation is blocked in the click handler instead.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={classNames(
        styles.button,
        styles[variant],
        margin && styles.margin,
        { [styles.disabled]: isDisabled },
        className,
      )}
      aria-disabled={isDisabled || undefined}
      onClick={handleClick}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}

export default memo(Button);
