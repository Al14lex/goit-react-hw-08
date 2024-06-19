import css from "./Modal.module.css";

export default function Modal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this contact?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
}