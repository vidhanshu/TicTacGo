import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "./GenericModal";

const YouLostModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "You Lost";

  return (
    <GenericModal
      title="Better luck next time 🥲!"
      onClose={onClose}
      isModalOpen={isModalOpen}
    />
  );
};

export default YouLostModal;
