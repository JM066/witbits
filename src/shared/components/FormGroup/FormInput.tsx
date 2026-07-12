import { InputHTMLAttributes } from "react";
import { RegisterOptions } from "react-hook-form";
import useFormMethods from "./useFormMethods";
import Input from "@/shared/components/Input";

type Props = {
  name: string;
  label: string;
  rules?: RegisterOptions;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "min" | "max" | "className"
>;

function FormInput({ label, name, type, min, max, rules, className }: Props) {
  const { register } = useFormMethods();
  return (
    <Input
      label={label}
      type={type}
      min={min}
      max={max}
      className={className}
      {...register(name, rules)}
    />
  );
}

export default FormInput;
