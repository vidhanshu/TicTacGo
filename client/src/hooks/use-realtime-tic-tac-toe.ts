import { useEffect, useState } from "react";
import { useSocketContext } from "../context/socket-context";
import { GameState, PlayingPayload } from "../types";
import { SOCKET_EVENTS } from "../utils";
import { useModal } from "./use-modal-store";
import { useAudioContext } from "@/context/audio-context";

export const useRealtimeTicTacToe = ({
  username,
  setFinding,
}: {
  username: string;
  setFinding: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { playEnter, playLose, playWin } = useAudioContext();
  const { onOpen } = useModal();
  const [wonDrawState, setWonDrawState] = useState<{
    won: null | "X" | "O";
    draw: boolean;
  } | null>(null);
  const [reacting, setReacting] = useState<string>("");
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameState>(null);
  const [allPlayersUsername, setAllPlayersUsername] = useState<string[]>([]);
  const { socket, isConnected } = useSocketContext();

  useEffect(() => {
    if (!isConnected || !socket) return;

    const handleAllUsernameEvent = (usernames: string[]) => {
      setAllPlayersUsername(usernames);
    };
    const handleFoundMatchEvent = (playersObj: GameState) => {
      setGameState(playersObj);
      playEnter();
      setFinding(false);
    };
    const handlePlayingEvent = (payload: Omit<PlayingPayload, "to">) => {
      const { index, currentTurn } = payload;
      setBoard((prev) => {
        const newGameState = prev.map((item, i) =>
          i === index ? currentTurn : item
        );
        if (handleWinCheck(newGameState)) {
          onOpen("You Lost");
          playLose();
          setWonDrawState({ won: currentTurn, draw: false });
        } else if (handleDrawCheck(newGameState)) {
          setWonDrawState({ won: null, draw: true });
          onOpen("Draw");
        }

        return newGameState;
      });
      setGameState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          turn: prev.turn === "X" ? "O" : "X",
        };
      });
    };
    const handleReactEvent = (payload: string) => {
      setReacting(payload);
      setTimeout(() => {
        setReacting("");
      }, 5000);
    };

    socket.on(SOCKET_EVENTS.ALL_USERNAMES, handleAllUsernameEvent);
    socket.on(SOCKET_EVENTS.FIND_MATCH, handleFoundMatchEvent);
    socket.on(SOCKET_EVENTS.PLAYING, handlePlayingEvent);
    socket.on(SOCKET_EVENTS.REACT, handleReactEvent);

    () => {
      socket.off(SOCKET_EVENTS.FIND_MATCH, handleFoundMatchEvent);
      socket.off(SOCKET_EVENTS.ALL_USERNAMES, handleAllUsernameEvent);
      socket.off(SOCKET_EVENTS.PLAYING, handlePlayingEvent);
      socket.off(SOCKET_EVENTS.REACT, handleReactEvent);
    };
  }, [socket, isConnected]);

  const findMatch = () => {
    if (!socket) return;
    if (!username || allPlayersUsername.find((u) => u === username)) {
      onOpen("Username Wrong");
      return;
    }
    socket.emit(SOCKET_EVENTS.FIND_MATCH, { username });
    setFinding(true);
  };

  const handlePlay = (index: number) => {
    if (!socket || !gameState) return;

    const opponent =
      gameState.p1.username !== username ? gameState.p1 : gameState.p2;

    socket.emit(SOCKET_EVENTS.PLAYING, {
      index,
      to: opponent.socketId,
      currentTurn: gameState.turn,
    });
    setGameState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        turn: prev.turn === "X" ? "O" : "X",
      };
    });
    setBoard((prev) => {
      const newGameState = prev.map((item, i) =>
        i === index ? gameState.turn : item
      );

      if (handleWinCheck(newGameState)) {
        onOpen("You Won");
        playWin();
        setWonDrawState({ won: gameState.turn, draw: false });
      } else if (handleDrawCheck(newGameState)) {
        setWonDrawState({ won: null, draw: true });
        onOpen("Draw");
      }

      return newGameState;
    });
  };

  const handleWinCheck = (boardState: string[]) =>
    (boardState[0] === boardState[1] &&
      boardState[1] === boardState[2] &&
      boardState[0] !== null) ||
    (boardState[3] === boardState[4] &&
      boardState[4] === boardState[5] &&
      boardState[3] !== null) ||
    (boardState[6] === boardState[7] &&
      boardState[7] === boardState[8] &&
      boardState[6] !== null) ||
    (boardState[0] === boardState[3] &&
      boardState[3] === boardState[6] &&
      boardState[0] !== null) ||
    (boardState[1] === boardState[4] &&
      boardState[4] === boardState[7] &&
      boardState[1] !== null) ||
    (boardState[2] === boardState[5] &&
      boardState[5] === boardState[8] &&
      boardState[2] !== null) ||
    (boardState[0] === boardState[4] &&
      boardState[4] === boardState[8] &&
      boardState[0] !== null) ||
    (boardState[2] === boardState[4] &&
      boardState[4] === boardState[6] &&
      boardState[2] !== null);

  const handleDrawCheck = (boardState: string[]) =>
    boardState.every((item) => item !== null);

  const handleReact = (payload: string) => {
    if (!socket || !gameState) return;
    socket.emit(SOCKET_EVENTS.REACT, {
      emote: payload,
      to:
        gameState.p1.username === username
          ? gameState.p2.socketId
          : gameState.p1.socketId,
    });
  };

  return {
    findMatch,
    handlePlay,
    board,
    gameState,
    allPlayersUsername,
    isConnected,
    wonDrawState,
    reacting,
    handleReact,
  };
};

export default useRealtimeTicTacToe;
