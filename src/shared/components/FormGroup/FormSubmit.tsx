import { memo } from "react";
import Button, { type ButtonProps } from "@mui/material/Button";

type Props = Omit<ButtonProps, "type">;

function FormSubmit({ children, ...rest }: Props) {
  return (
    <Button type="submit" variant="contained" size="large" {...rest}>
      {children}
    </Button>
  );
}

export default memo(FormSubmit);
