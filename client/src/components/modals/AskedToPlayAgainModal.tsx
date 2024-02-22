import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "../GenericModal";

const AskedToPlayAgainModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "Asked To Play Again";

  return (
    <GenericModal
      onClose={onClose}
      isModalOpen={isModalOpen}
      title="Play agian request sent!"
    >
      <p className="text-slate-500 text-lg">
        Your opponent has been asked to play again. Please wait until he accepts
      </p>
    </GenericModal>
  );
};

export default AskedToPlayAgainModal;
