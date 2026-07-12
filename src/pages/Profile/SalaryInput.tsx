import { useWatch } from "react-hook-form";
import FormGroup from "@/shared/components/FormGroup";
import useFormMethods from "@/shared/components/FormGroup/useFormMethods";
import { ProfileValues } from "./types";

export const SALARY_MIN = 0;
export const SALARY_MAX = 100000;

const SalaryInput = ({ className }: { className?: string }) => {
  const { control } = useFormMethods<ProfileValues>();
  const salary = useWatch({ control, name: "salary" });

  return (
    <FormGroup.Input
      name="salary"
      label={`Salary (£${salary})`}
      type="range"
      min={SALARY_MIN}
      max={SALARY_MAX}
      rules={{
        required: true,
        min: SALARY_MIN,
        max: SALARY_MAX,
        valueAsNumber: true,
      }}
      className={className}
    />
  );
};

export default SalaryInput;
