import { cn } from "@/lib/utils";
import { GameState } from "@/types";
import { BsJoystick } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { GoCircle } from "react-icons/go";
import Logo from "../Logo";
import ReactConfetti from "react-confetti";
import { useAudioContext } from "@/context/audio-context";

export const GameBoard = ({
  gameState,
  currentUsername,
  handlePlay,
  board,
  wonDrawState,
}: {
  gameState: NonNullable<GameState>;
  currentUsername: string;
  handlePlay: (index: number) => void;
  board: string[];
  wonDrawState: { won: null | "X" | "O"; draw: boolean } | null;
}) => {
  const { playTap } = useAudioContext();
  const me =
    gameState?.p1.username === currentUsername ? gameState.p1 : gameState?.p2;
  const opponent =
    gameState?.p1.username !== currentUsername ? gameState?.p1 : gameState.p2;
  const isMyTurn = gameState.turn === me.value;
  const meWon = wonDrawState?.won === me.value;

  return (
    <>
      {meWon && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="w-full">
        <div className="mx-auto w-fit">
          <Logo straight />
        </div>
        <div className="flex justify-between items-center max-w-screen-lg mx-auto pb-6 px-4">
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-bold">
              You: <span className="text-blue-500">{me?.username}</span>
            </h4>
            <BsJoystick
              size={30}
              className={cn(
                isMyTurn && !(wonDrawState?.won || wonDrawState?.draw)
                  ? ""
                  : "invisible",
                "mt-1 fill-emerald-500"
              )}
            />
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-bold">
              Opponent:{" "}
              <span className="text-blue-500">{opponent?.username}</span>
            </h4>
            <div className="flex gap-x-2 items-center">
              <BsJoystick
                size={30}
                className={cn(
                  isMyTurn || wonDrawState?.won || wonDrawState?.draw
                    ? "invisible"
                    : "",
                  "mt-1 fill-emerald-500"
                )}
              />
              {!isMyTurn && !(wonDrawState?.won || wonDrawState?.draw) && (
                <span className="animate-pulse text-gray-200">Thinking...</span>
              )}
            </div>
          </div>
        </div>
        {wonDrawState?.won ? (
          <>
            <h1 className="text-3xl font-bold text-center my-8">
              {meWon
                ? "Congratulations 🎉! You won!"
                : "Better luck next time 🥲"}{" "}
            </h1>
          </>
        ) : wonDrawState?.draw ? (
          <>
            <h1 className="text-3xl font-bold text-center my-8">
              It&apos;s a <span className="text-emerald-500">draw</span>!
            </h1>
          </>
        ) : (
          <h1 className="text-xl font-bold text-center my-8">
            You&apos;r playing as {me?.value}, it&apos;s{" "}
            <span className="text-emerald-500">
              {isMyTurn ? "your" : "opponent's"}
            </span>{" "}
            turn
          </h1>
        )}
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
              disabled={!!item || !!wonDrawState?.won || wonDrawState?.draw}
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
