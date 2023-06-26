import axios from "axios";
import closeIcon from "../../assets/icons/close-icon.png";
import { deleteUsersWatchlistEndpoint } from "../../utils/api";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: (isDeleted: boolean) => void;
  userId: string | undefined;
  movieId: string;
  title: string;
}

const Modal = ({ isOpen, onClose, userId, movieId, title }: ModalProps) => {
  const handleDelete = () => {
    if (userId) {
      axios
        .delete(deleteUsersWatchlistEndpoint(userId, movieId))
        .then(() => {
          onClose(true); // Close the modal after successful deletion
          toast.success("Successfully deleted the movie");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__container">
        <div>
          <img
            src={closeIcon}
            alt="X"
            className="modal__x"
            onClick={() => {
              onClose(false);
            }}
          />
          <h2 className="modal__title">Delete {title}?</h2>
          <p className="modal__text">
            Please confirm that you'd like to delete the "{title}" from your
            watchlist. You won't be able to undo this action.
          </p>
        </div>
        <div className="modal__button-container">
          <button
            className="modal__cancel"
            onClick={() => {
              onClose(false);
            }}
          >
            Cancel
          </button>
          <button className="modal__delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
