import FormGroup from "@/shared/components/FormGroup";
import SalaryInput, { SALARY_MIN } from "./SalaryInput";
import { ProfileValues } from "./types";
import styles from "./Profile.module.css";

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
    <FormGroup.Input name="name" label="Name" rules={{ required: true }} />
    <FormGroup.Error name="name" message="Name is required" />

    <FormGroup.Input
      name="email"
      label="Email"
      type="email"
      rules={{
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      }}
    />
    <FormGroup.Error name="email" message="A valid email is required" />

    <FormGroup.Input
      name="dateOfBirth"
      label="Date of birth"
      type="date"
      rules={{ required: true }}
    />
    <FormGroup.Error name="dateOfBirth" message="Date of birth is required" />

    <FormGroup.Input
      name="favouriteColour"
      label="Favourite colour"
      rules={{ required: true }}
    />
    <FormGroup.Error
      name="favouriteColour"
      message="Favourite colour is required"
    />

    <SalaryInput className={styles.range} />

    <FormGroup.Submit>Save profile</FormGroup.Submit>
  </FormGroup>
);

export default Profile;
