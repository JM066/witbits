import { type ReactNode, createContext } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

const FormContext = createContext<UseFormReturn<FieldValues> | null>(null);

interface FormProviderProps<T extends FieldValues> {
  children: ReactNode;
  value: UseFormReturn<T>;
}

function FormProvider<T extends FieldValues>({
  children,
  value,
}: FormProviderProps<T>) {
  return (
    <FormContext.Provider value={value as UseFormReturn<FieldValues>}>
      {children}
    </FormContext.Provider>
  );
}

export { FormContext, FormProvider };
