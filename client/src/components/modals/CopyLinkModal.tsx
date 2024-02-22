import { useModal } from "@/hooks/use-modal-store";
import GenericModal from "../GenericModal";
import { useSocketContext } from "@/context/socket-context";
import { Button, Input } from "..";
import { Clipboard } from "lucide-react";
import { useState } from "react";

const CopyLinkModal = () => {
  const { socket } = useSocketContext();
  const {
    isOpen,
    onClose,
    type,
    data: { username },
  } = useModal();
  const [isCopied, setIsCopied] = useState(false);
  const isModalOpen = isOpen && type === "Copy Link";

  const url = `${window.location.origin}/join-via-invite?player=${socket?.id}&username=${username}`;

  return (
    <GenericModal
      hideFooter
      title="Share the below link to invite other player!"
      onClose={onClose}
      children={
        <div className="space-y-4">
          <Input
            disabled={true}
            className="text-white p-2 flex-1 w-full"
            value={url}
          />
          <div className="flex justify-end">
            <Button
              className="h-fit py-2 text-white"
              onClick={
                isCopied
                  ? undefined
                  : () => {
                      navigator.clipboard.writeText(url);
                      setIsCopied(true);
                      onClose()
                      setTimeout(() => {
                        setIsCopied(false);
                      }, 5000);
                    }
              }
              startContent={isCopied ? <>Copied!</> : <Clipboard size={20} />}
            />
          </div>
        </div>
      }
      isModalOpen={isModalOpen}
    />
  );
};

export default CopyLinkModal;
