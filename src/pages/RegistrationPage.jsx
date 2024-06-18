import { Navigate } from "react-router-dom";
import PageTitle from "../components/PageTitle/PageTitle";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { useSelector } from "react-redux";

export default function RegistionPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }
  
  return (
    <div>
      <PageTitle>Register your account</PageTitle>
      <RegistrationForm />
    </div>
  );
}