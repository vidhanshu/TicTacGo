import { BsJoystick } from "react-icons/bs";

import { cn } from "@/lib/utils";
import { GameState } from "@/types";
import Logo from "@/components/Logo";
import { Button } from "@/components";

const GameBoardHeader = ({
  reacting,
  handleReact,
  wonDrawLeftState,
  me,
  opponent,
  isMyTurn,
  askToPlayAgain,
  meWon,
}: {
  reacting: string;
  handleReact: (reaction: string) => void;
  askToPlayAgain: () => void;
  wonDrawLeftState: {
    left: boolean | null;
    won: null | "X" | "O";
    draw: boolean | null;
  };
  me: NonNullable<GameState>["p1"];
  opponent: NonNullable<GameState>["p2"];
  isMyTurn: boolean;
  meWon: boolean;
}) => {
  return (
    <>
      <div className="mx-auto w-fit">
        <Logo straight />
      </div>
      <div className="flex justify-between items-center max-w-screen-lg mx-auto pb-6 px-4">
        <div className="flex flex-col items-center gap-2">
          <h4 className="text-xl font-bold">
            You: <span className="text-blue-500">{me?.username}</span>
          </h4>
          <div className="border rounded-md p-2 text-xl">
            {["😂", "🥲", "😶", "😎", "🤔"].map((emote) => (
              <button key={emote} onClick={() => handleReact(emote)}>
                {emote}
              </button>
            ))}
          </div>
          <BsJoystick
            size={30}
            className={cn(
              isMyTurn && !(wonDrawLeftState.won || wonDrawLeftState.draw)
                ? ""
                : "invisible",
              "fill-emerald-500"
            )}
          />
        </div>
        <div className="flex flex-col items-center relative">
          {reacting && (
            <div className="text-4xl absolute -top-10 rounded-full animate-bounce">
              {reacting}
            </div>
          )}
          {wonDrawLeftState.left ? (
            <h4 className="text-xl font-bold">
              <span className="text-blue-500">
                {opponent?.username || "opponent"}
              </span>{" "}
              left the game
            </h4>
          ) : (
            <>
              <h4 className="text-xl font-bold">
                Opponent:{" "}
                <span className="text-blue-500">{opponent?.username}</span>
              </h4>
              <div className="flex gap-x-2 items-center">
                <BsJoystick
                  size={30}
                  className={cn(
                    isMyTurn || wonDrawLeftState.won || wonDrawLeftState.draw
                      ? "invisible"
                      : "",
                    "mt-1 fill-emerald-500"
                  )}
                />
                {!isMyTurn &&
                  !(wonDrawLeftState.won || wonDrawLeftState.draw) && (
                    <span className="animate-pulse text-gray-200">
                      Thinking...
                    </span>
                  )}
              </div>
            </>
          )}
        </div>
      </div>
      {wonDrawLeftState.won ? (
        <>
          <h1 className="text-3xl font-bold text-center my-4">
            {meWon
              ? "Congratulations 🎉! You won!"
              : "Better luck next time 🥲"}{" "}
          </h1>
        </>
      ) : wonDrawLeftState.draw ? (
        <>
          <h1 className="text-3xl font-bold text-center my-4">
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
      {(wonDrawLeftState.won || wonDrawLeftState.draw) &&
      !wonDrawLeftState.left ? (
        <Button onClick={askToPlayAgain} className="mx-auto my-6">
          Ask Play Again!
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default GameBoardHeader;
