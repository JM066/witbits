import { useContext } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormContext } from "./FormContext";

function useFormMethods<T extends FieldValues>(): UseFormReturn<T> {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(
      "Form compound components must be rendered inside <FormGroup>",
    );
  }

  return context as UseFormReturn<T>;
}

export default useFormMethods;
