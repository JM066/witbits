import { forwardRef, type InputHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

type Props = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, name, className, ...rest }, ref) => (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={classNames(styles.input, className)}
        id={name}
        name={name}
        ref={ref}
        {...rest}
      />
    </div>
  ),
);

export default Input;
