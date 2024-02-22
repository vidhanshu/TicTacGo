import { cn } from "@/lib/utils";
import { GameState } from "@/types";
import { MdClose } from "react-icons/md";
import { GoCircle } from "react-icons/go";
import ReactConfetti from "react-confetti";
import { useAudioContext } from "@/context/audio-context";
import GameBoardHeader from "./GameBoardHeader";

export const GameBoard = ({
  reacting,
  gameState,
  currentUsername,
  handlePlay,
  handleReact,
  board,
  wonDrawLeftState,
  askToPlayAgain,
}: {
  reacting: string;
  gameState: NonNullable<GameState>;
  currentUsername: string;
  handlePlay: (index: number) => void;
  askToPlayAgain: () => void;
  handleReact: (reaction: string) => void;
  board: string[];
  wonDrawLeftState: {
    left: boolean | null;
    won: null | "X" | "O";
    draw: boolean | null;
  };
}) => {
  const { playTap } = useAudioContext();
  const me =
    gameState.p1.username === currentUsername ? gameState.p1 : gameState.p2;
  const opponent =
    gameState.p1.username !== currentUsername ? gameState.p1 : gameState.p2;
  const isMyTurn = gameState.turn === me.value;
  const meWon = wonDrawLeftState.won === me.value;

  return (
    <>
      {meWon && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="w-full">
        <GameBoardHeader
          me={me}
          meWon={meWon}
          isMyTurn={isMyTurn}
          opponent={opponent}
          reacting={reacting}
          handleReact={handleReact}
          wonDrawLeftState={wonDrawLeftState}
          askToPlayAgain={askToPlayAgain}
        />
        <div className="grid grid-cols-3 grid-rows-3 gap-2 max-w-[320px] mx-auto">
          {board.map((item, index) => (
            <button
              key={index}
              onClick={
                isMyTurn
                  ? () => {
                      handlePlay(index);
                      playTap();
                    }
                  : undefined
              }
              disabled={
                !!item ||
                !!wonDrawLeftState.won ||
                !!wonDrawLeftState.draw ||
                !!wonDrawLeftState.left ||
                !isMyTurn
              }
              className={cn(
                !isMyTurn && !item && "cursor-default",
                "w-[100px] h-[100px] border border-slate-700 text-xl rounded-lg hover:bg-slate-900 flex items-center justify-center",
                item === "X"
                  ? "border-red-500"
                  : item === "O"
                  ? "border-blue-500"
                  : ""
              )}
            >
              {item === "X" ? (
                <MdClose size={60} className="text-red-500" />
              ) : item === "O" ? (
                <GoCircle size={60} className="text-blue-500" />
              ) : (
                ""
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
