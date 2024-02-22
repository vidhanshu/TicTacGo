import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "../GenericModal";

const InviteeLeftModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { error },
  } = useModal();
  const isModalOpen = isOpen && type === "Invitee Left";

  return (
    <GenericModal
      onClose={onClose}
      title="Invitee Left"
      isModalOpen={isModalOpen}
    >
      <p className="text-red-500">{error}</p>
    </GenericModal>
  );
};

export default InviteeLeftModal;
