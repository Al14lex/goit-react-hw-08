import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle/PageTitle";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList"
import { fetchContacts } from "../redux/contacts/operations";
import { selectLoading, selectContactsLoaded} from "../redux/contacts/selectors";
import SearchBox from "../components/SearchBox/SearchBox"

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const contactsLoaded = useSelector(selectContactsLoaded);

  useEffect(() => {
    if (!contactsLoaded) {
      dispatch(fetchContacts());
    }
  }, [dispatch, contactsLoaded]);
  
  return (
    <>
      <PageTitle>Your contacts</PageTitle>
      <ContactForm />
      <div>{isLoading && "Request in progress..."}</div>
      <SearchBox/>
      <ContactList />
    </>
  );
}