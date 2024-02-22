import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "./GenericModal";

const PlayerLeftModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "User Left";

  return (
    <GenericModal
      title={`${data.username} left the game!`}
      onClose={onClose}
      isModalOpen={isModalOpen}
    />
  );
};

export default PlayerLeftModal;
