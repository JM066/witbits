import { memo, useId } from "react";
import { useController } from "react-hook-form";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import useFormMethods from "@/shared/components/FormGroup/useFormMethods";
import { ProfileValues } from "./types";

export const SALARY_MIN = 0;
export const SALARY_MAX = 100000;

const SALARY_RULES = {
  required: true,
  min: SALARY_MIN,
  max: SALARY_MAX,
};

const SalaryInput = ({ className }: { className?: string }) => {
  const { control } = useFormMethods<ProfileValues>();
  const labelId = useId();
  const {
    field: { ref, value, onChange, onBlur, name },
  } = useController({ control, name: "salary", rules: SALARY_RULES });

  return (
    <div className={className}>
      <Typography id={labelId} gutterBottom>
        {`Salary (£${value})`}
      </Typography>
      <Slider
        ref={ref}
        name={name}
        value={value}
        min={SALARY_MIN}
        max={SALARY_MAX}
        onChange={(_, next) => onChange(next as number)}
        onBlur={onBlur}
        aria-labelledby={labelId}
      />
    </div>
  );
};

export default memo(SalaryInput);
