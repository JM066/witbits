import { ReactNode } from "react";
import {
  useForm,
  UseFormProps,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import Form from "../Form";
import { FormProvider } from "./FormContext";
import FormInput from "./FormInput";
import FormError from "./FormError";
import FormSubmit from "./FormSubmit";

interface Props<TFormValues extends FieldValues> {
  children: ReactNode;
  onSubmit: SubmitHandler<TFormValues>;
  options?: UseFormProps<TFormValues>;
  className?: string;
}

function FormGroup<TFormValues extends FieldValues>({
  children,
  onSubmit,
  options,
  className,
}: Props<TFormValues>) {
  const methods = useForm<TFormValues>(options);

  return (
    <FormProvider value={methods}>
      <Form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}

FormGroup.Input = FormInput;
FormGroup.Error = FormError;
FormGroup.Submit = FormSubmit;

export default FormGroup;
