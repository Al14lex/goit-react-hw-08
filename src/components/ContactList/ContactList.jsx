import Contacts from "../Contact/Contact";
import { useSelector } from "react-redux"
import { selectFilteredContacts} from "../../redux/contactsSlice";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          <Contacts id={contact.id} name={contact.name} phone={contact.number} />
        </li>
      ))}
    </ul>
  );
}