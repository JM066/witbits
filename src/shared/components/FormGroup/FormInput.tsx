import { memo } from "react";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import useFormMethods from "./useFormMethods";

type Props = {
  name: string;
  label: string;
  rules?: UseControllerProps<FieldValues>["rules"];
  // Shown under the field when validation fails.
  errorMessage?: string;
} & Pick<TextFieldProps, "type" | "className">;

function FormInput({
  label,
  name,
  type,
  rules,
  errorMessage,
  className,
}: Props) {
  const { control } = useFormMethods();
  // Controlled via useController so each field subscribes to form state itself.
  const {
    field: { ref, ...field },
    fieldState: { invalid },
  } = useController({ control, name, rules });

  return (
    <TextField
      id={name}
      name={field.name}
      inputRef={ref}
      label={label}
      type={type}
      value={field.value ?? ""}
      onBlur={field.onBlur}
      onChange={(e) =>
        field.onChange(
          type === "number"
            ? (e.target as HTMLInputElement).valueAsNumber
            : e.target.value,
        )
      }
      error={invalid}
      // A single space keeps the row height stable so the form doesn't jump when an error appears.
      helperText={invalid ? errorMessage : " "}
      fullWidth
      className={className}
      slotProps={{
        // Date inputs always render a placeholder, so the label must sit above it.
        inputLabel: type === "date" ? { shrink: true } : undefined,
        formHelperText: invalid ? { role: "alert" } : undefined,
      }}
    />
  );
}

export default memo(FormInput);
