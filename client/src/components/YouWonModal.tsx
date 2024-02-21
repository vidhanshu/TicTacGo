import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "./GenericModal";

const YouWonModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "You Won";

  return (
    <GenericModal
      title="Congratulations 🎉! You won!"
      onClose={onClose}
      isModalOpen={isModalOpen}
    />
  );
};

export default YouWonModal;
