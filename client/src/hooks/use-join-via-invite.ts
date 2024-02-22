import { useSocketContext } from "@/context/socket-context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useModal } from "./use-modal-store";
import { SOCKET_EVENTS } from "@/utils";
import { useEffect } from "react";

export default function useJoinViaInvite({
  joining,
  username,
  setUsername,
  setJoining,
}: {
  joining: boolean;
  setJoining: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();
  const { onOpen } = useModal();
  const [URLSearchParams] = useSearchParams();
  const player = URLSearchParams.get("player");
  const uName = URLSearchParams.get("username");
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!player || !uName) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleInviteLeftEvent = () => {
      onOpen("Invitee Left", {
        error: "Invitee left the game.",
      });
    };
    socket.on(SOCKET_EVENTS.INVITEE_LEFT, handleInviteLeftEvent);
  }, [socket]);

  const joinNow = () => {
    if (!socket) return;
    if (!username || username.length < 3) {
      onOpen("Username Wrong", {
        error: "Username should be atleast 3 characters long.",
      });
      return;
    }

    socket.emit(SOCKET_EVENTS.PLAY_VIA_INVITE, {
      from: {
        socketId: player,
        username: uName,
      },
      to: {
        socketId: socket.id,
        username,
      },
    });
    setJoining(true);
  };

  return { joinNow };
}
