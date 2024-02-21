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
  title,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogFooter>
            <Button onClick={onClose} className="mt-8">
              Okay!
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GenericModal;
