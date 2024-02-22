import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from ".";
import { PropsWithChildren } from "react";

const GenericModal = ({
  isModalOpen,
  onClose,
  handleOk,
  title,
  showCancel,
  children,
  hideFooter = false,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  handleOk?: () => void;
  title: React.ReactNode;
  showCancel?: boolean;
  hideFooter?: boolean;
} & PropsWithChildren) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
          {!hideFooter && (
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
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GenericModal;
