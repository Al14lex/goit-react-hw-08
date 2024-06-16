
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import * as Yup from "yup";
import toast from "react-hot-toast";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
  try {
    await RegistrationSchema.validate(values, { abortEarly: false });
    await dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("You have successfully registered!");
        actions.resetForm();
      })
      .catch((error) => {
        toast.error(error);
        console.error("Registration error:", error);
      });
  } catch (validationError) {
    const errors = {};
    validationError.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    actions.setErrors(errors);
  }
};

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Username
          <Field type="text" name="name" />
           <ErrorMessage name="name" component="div" className={css.error} />
        </label>
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={css.error} />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className={css.error} />
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
