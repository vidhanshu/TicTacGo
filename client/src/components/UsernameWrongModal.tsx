import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "./GenericModal";

const UsernameWrongModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "Username Wrong";

  return (
    <GenericModal
      title="Username already taken Or Empty!"
      onClose={onClose}
      isModalOpen={isModalOpen}
    />
  );
};

export default UsernameWrongModal;
