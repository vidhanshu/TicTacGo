import { useEffect, useState } from "react";
import YouWonModal from "./YouWonModal";
import YouLostModal from "./YouLostModal";
import DrawModal from "./DrawModal";
import UsernameWrongModal from "./UsernameWrongModal";

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
      <UsernameWrongModal/>
    </>
  );
};
