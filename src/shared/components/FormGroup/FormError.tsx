import classNames from "classnames";
import { memo } from "react";
import { useFormState } from "react-hook-form";
import Text from "../Text";
import useFormMethods from "./useFormMethods";
import styles from "./FormError.module.css";

type Props = {
  name: string;
  message: string;
  className?: string;
};

function FormError({ name, message, className }: Props) {
  const { control } = useFormMethods();
  const { errors } = useFormState({ control, name });

  return (
    <Text
      as="p"
      role="alert"
      caption
      text={errors[name] ? message : ""}
      className={classNames(styles.error, className)}
      variant="error"
      align="end"
    />
  );
}

export default memo(FormError);
