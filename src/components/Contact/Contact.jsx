import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

export default function Contacts({ id, name, phone }) {
  const dispatch = useDispatch();
    
  const handleDelete = () => {
    dispatch(deleteContact(id));
};
  
return (
  <div>
      <p>{name}</p>
      <p>{phone}</p>
    <button onClick={handleDelete}>Delete</button>
  </div>
);
}