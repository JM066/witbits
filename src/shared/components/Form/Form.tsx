import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onSubmit: () => void;
  className?: string;
}

function Form({ children, onSubmit, className }: Props) {
  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
}

export default Form;
