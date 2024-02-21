import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "./GenericModal";

const DrawModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "Draw";

  return (
    <GenericModal
      title="It was a draw!"
      onClose={onClose}
      isModalOpen={isModalOpen}
    />
  );
};

export default DrawModal;
