import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "./GenericModal";

const PlayAgainModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { username, handlePlayAgain },
  } = useModal();
  const isModalOpen = isOpen && type === "Play Again?";

  return (
    <GenericModal
      showCancel
      title={`${username} asking to play again!`}
      onClose={onClose}
      handleOk={handlePlayAgain}
      isModalOpen={isModalOpen}
    />
  );
};

export default PlayAgainModal;
