import FormGroup from "@/shared/components/FormGroup";
import SalaryInput, { SALARY_MIN } from "./SalaryInput";
import { ProfileValues } from "./types";
import styles from "./Profile.module.css";

const REQUIRED_RULES = { required: true };
const EMAIL_RULES = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

const Profile = () => (
  <FormGroup<ProfileValues>
    className={styles.form}
    onSubmit={(data) => console.log({ data })}
    options={{
      defaultValues: {
        name: "",
        email: "",
        dateOfBirth: "",
        favouriteColour: "",
        salary: SALARY_MIN,
      },
    }}
    resetOnSubmit
  >
    <FormGroup.Input
      name="name"
      label="Name"
      rules={REQUIRED_RULES}
      errorMessage="Name is required"
    />

    <FormGroup.Input
      name="email"
      label="Email"
      type="email"
      rules={EMAIL_RULES}
      errorMessage="A valid email is required"
    />

    <FormGroup.Input
      name="dateOfBirth"
      label="Date of birth"
      type="date"
      rules={REQUIRED_RULES}
      errorMessage="Date of birth is required"
    />

    <FormGroup.Input
      name="favouriteColour"
      label="Favourite colour"
      rules={REQUIRED_RULES}
      errorMessage="Favourite colour is required"
    />

    <SalaryInput />

    <FormGroup.Submit>Save profile</FormGroup.Submit>
  </FormGroup>
);

export default Profile;
