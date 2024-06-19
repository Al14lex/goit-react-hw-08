import Contacts from "../Contact/Contact";
import {useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { deleteContact } from "../../redux/contacts/operations";
import { selectNameFilter, selectPhoneFilter } from "../../redux/filters/selectors";
import { selectContacts } from "../../redux/contacts/selectors";
import Modal from "../Modal/Modal";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const nameFilter = useSelector(selectNameFilter);
  const phoneFilter = useSelector(selectPhoneFilter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    contact.phone.includes(phoneFilter)
  );

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
            <Contacts id={contact.id} name={contact.name} phone={contact.phone} />
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