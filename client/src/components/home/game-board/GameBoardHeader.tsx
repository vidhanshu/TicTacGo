import { BsChat, BsEmojiSmile, BsJoystick } from "react-icons/bs";

import { cn } from "@/lib/utils";
import { GameState } from "@/types";
import { Button, Input } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EMOTES, RANDOM_AVATAR_API } from "@/utils";
import { MdClose } from "react-icons/md";
import { GoCircle } from "react-icons/go";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";

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
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="flex justify-between max-w-screen-lg mx-auto pb-6 px-4">
        {/* me */}
        <div className="w-[180px] relative space-y-2 border border-slate-600 rounded-lg py-4 px-8">
          <div className="relative mx-auto w-fit">
            <Avatar className="bg-slate-700 w-[60px] h-[60px]">
              <AvatarImage
                className="w-[400px]"
                src={`${RANDOM_AVATAR_API}/${me.username}`}
              />
              <AvatarFallback>{me.username[0]}</AvatarFallback>
            </Avatar>
            <BsJoystick
              size={30}
              className={cn(
                "absolute top-0 -right-4 rotate-12",
                isMyTurn && !(wonDrawLeftState.won || wonDrawLeftState.draw)
                  ? ""
                  : "invisible",
                "fill-emerald-500"
              )}
            />
          </div>
          <h1 className="text-center font-bold">{me.username}</h1>
          <h1 className="text-center font-bold">
            {me.value === "X" ? (
              <MdClose size={30} className="text-red-500 mx-auto" />
            ) : (
              <GoCircle size={30} className="text-blue-500 mx-auto" />
            )}
          </h1>
          <div className="flex gap-x-4">
            {!wonDrawLeftState?.left ? (
              <>
                <HoverCard openDelay={0}>
                  <HoverCardTrigger asChild>
                    <button className="p-2 border-[2px] border-slate-700 rounded-full hover:bg-slate-700 group">
                      <BsEmojiSmile
                        className="fill-slate-600 group-hover:fill-white"
                        size={24}
                      />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="max-w-[200px] text-xl flex justify-between items-center">
                    {EMOTES.map((emote) => (
                      <button key={emote} onClick={() => handleReact(emote)}>
                        <span className="hover:translate-y-1">{emote}</span>
                      </button>
                    ))}
                  </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={0}>
                  <HoverCardTrigger asChild>
                    <button className="p-2 border-[2px] border-slate-700 rounded-full hover:bg-slate-700 group">
                      <BsChat
                        className="fill-slate-600 group-hover:fill-white"
                        size={24}
                      />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="max-w-[200px] flex flex-col gap-2">
                    {["Ha ha!", "Oh shit!", "Leme win", "Nope!", "Please"].map(
                      (message) => (
                        <button
                          className="hover:bg-slate-800 px-1 rounded-sm"
                          key={message}
                          onClick={() => handleReact(message)}
                        >
                          {message}
                        </button>
                      )
                    )}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!message || message.length > 20) return;

                        handleReact(message);
                        setMessage("");
                      }}
                      className="gap-x-2 hidden md:flex"
                    >
                      <Input
                        maxLength={20}
                        placeholder="type & enter"
                        className="w-full"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </form>
                  </HoverCardContent>
                </HoverCard>
              </>
            ) : null}
          </div>
        </div>

        {/* opponent */}
        <div className="w-[180px] relative space-y-2 border border-slate-600 rounded-lg py-4 px-8">
          <div className="relative mx-auto w-fit">
            <Avatar className="bg-slate-700 w-[60px] h-[60px]">
              <AvatarImage
                className="w-[400px]"
                src={`${RANDOM_AVATAR_API}/${opponent.username}`}
              />
              <AvatarFallback>{opponent.username[0]}</AvatarFallback>
            </Avatar>
            <BsJoystick
              size={30}
              className={cn(
                "absolute top-0 -right-4 rotate-12",
                !isMyTurn && !(wonDrawLeftState.won || wonDrawLeftState.draw)
                  ? ""
                  : "invisible",
                "fill-emerald-500"
              )}
            />
          </div>
          <h1 className="text-center font-bold">{opponent.username}</h1>
          <h1 className="text-center font-bold">
            {opponent.value === "X" ? (
              <MdClose size={30} className="text-red-500 mx-auto" />
            ) : (
              <GoCircle size={30} className="text-blue-500 mx-auto" />
            )}
          </h1>
          {reacting && (
            <div
              className={cn(
                !EMOTES.includes(reacting)
                  ? "text-blue-500 text-lg font-bold"
                  : "text-4xl",
                "absolute bottom-2 text-center w-full left-0 rounded-full animate-bounce"
              )}
            >
              {reacting}
            </div>
          )}
          {wonDrawLeftState.left ? (
            <h4 className="text-xl font-bold text-rose-500 text-center">
              {opponent?.username || "opponent"} left!
            </h4>
          ) : null}
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
      ) : !!wonDrawLeftState?.left ? (
        <h1 className="text-rose-500 text-xl font-bold text-center my-8">
          {opponent.username} Left!
        </h1>
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
