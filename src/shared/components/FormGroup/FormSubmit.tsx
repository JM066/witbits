import { memo, type ButtonHTMLAttributes } from "react";
import Button from "../Button";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

function FormSubmit({ children, ...rest }: Props) {
  return (
    <Button type="submit" {...rest} margin>
      {children}
    </Button>
  );
}

export default memo(FormSubmit);
