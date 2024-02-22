import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from ".";

const GenericModal = ({
  isModalOpen,
  onClose,
  handleOk,
  title,
  showCancel,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  handleOk?: () => void;
  title: React.ReactNode;
  showCancel?: boolean;
}) => {
  return (
    <Dialog open={isModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogFooter>
            {showCancel && (
              <Button color="danger" onClick={onClose} className="mt-8">
                Cancel
              </Button>
            )}
            <Button
              onClick={() => {
                onClose();
                handleOk?.();
              }}
              className="mt-8"
            >
              Okay!
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GenericModal;
