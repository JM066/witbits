import { memo, InputHTMLAttributes } from "react";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";
import useFormMethods from "./useFormMethods";
import Input from "@/shared/components/Input";

type Props = {
  name: string;
  label: string;
  rules?: UseControllerProps<FieldValues>["rules"];
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "min" | "max" | "className"
>;

function FormInput({ label, name, type, min, max, rules, className }: Props) {
  const { control } = useFormMethods();
  // Controlled via useController so each field subscribes to form state itself.
  const { field } = useController({ control, name, rules });
  const isNumeric = type === "range" || type === "number";

  return (
    <Input
      label={label}
      type={type}
      min={min}
      max={max}
      className={className}
      name={field.name}
      ref={field.ref}
      value={field.value ?? ""}
      onBlur={field.onBlur}
      onChange={(e) =>
        field.onChange(isNumeric ? e.target.valueAsNumber : e.target.value)
      }
    />
  );
}

export default memo(FormInput);
