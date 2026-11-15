import { type ReactNode, createContext } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

//  FormGroup owns the single useForm instance and its children need access
//  to it. Sharing it through context avoids passing form props down through
//  every layer, so children stay reusable and self-contained

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
