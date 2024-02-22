import { useEffect, useState } from "react";
import YouWonModal from "./modals/YouWonModal";
import YouLostModal from "./modals/YouLostModal";
import DrawModal from "./modals/DrawModal";
import UsernameWrongModal from "./modals/UsernameWrongModal";
import PlayerLeftModal from "./modals/PlayerLeftModal";
import PlayAgainModal from "./modals/PlayAgainModal";
import CopyLinkModal from "./modals/CopyLinkModal";
import InviteeLeftModal from "./modals/InviteeLeftModal";
import AskedToPlayAgainModal from "./modals/AskedToPlayAgainModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <YouWonModal />
      <YouLostModal />
      <DrawModal />
      <UsernameWrongModal />
      <PlayerLeftModal />
      <PlayAgainModal />
      <CopyLinkModal/>
      <InviteeLeftModal/>
      <AskedToPlayAgainModal/>
    </>
  );
};
