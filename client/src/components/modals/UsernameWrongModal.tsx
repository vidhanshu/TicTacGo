import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "../GenericModal";

const UsernameWrongModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { error },
  } = useModal();
  const isModalOpen = isOpen && type === "Username Wrong";
  return (
    <GenericModal
      title="Username Error!"
      onClose={onClose}
      isModalOpen={isModalOpen}
    >
      <p className="text-red-500">{error}</p>
    </GenericModal>
  );
};

export default UsernameWrongModal;
