
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import { toast, Toaster } from 'react-hot-toast';

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(logIn(values)).unwrap();
      toast.success("Successfully logged in!");
    } catch (error) {
      if (error.message === 'User not registered') {
        toast.error("User not registered!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
    actions.resetForm();
  };

  return (
    <>
    <Toaster />
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit">Log In</button>
      </Form>
      </Formik>
      </>
  );
}
