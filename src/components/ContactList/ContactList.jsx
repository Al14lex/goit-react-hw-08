import Contacts from "../Contact/Contact";
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react";
import { deleteContact } from "../../redux/contacts/operations";
import Modal from "../Modal/Modal";
import { selectFilteredContacts } from '../../redux/contacts/selectors';

export default function ContactList() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const filteredContacts = useSelector(selectFilteredContacts);

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(contactToDelete.id));
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  return (
    <>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Contacts
              id={contact.id}
              name={contact.name}
              phone={contact.number} />
            <button onClick={() => handleDeleteClick(contact)}>Delete</button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}