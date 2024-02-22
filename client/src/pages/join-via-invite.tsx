import { DetailsForm, GameBoard } from "@/components";
import useJoinViaInvite from "@/hooks/use-join-via-invite";
import useRealtimeTicTacToe from "@/hooks/use-realtime-tic-tac-toe";
import { useState } from "react";

const JoinViaInvite = () => {
  const [joining, setJoining] = useState(false);

  const [username, setUsername] = useState("");
  const { joinNow } = useJoinViaInvite({
    joining,
    setJoining,
    username,
    setUsername,
  });
  const {
    handlePlay,
    board,
    gameState,
    isConnected,
    wonDrawLeftState,
    reacting,
    askToPlayAgain,
    handleReact,
  } = useRealtimeTicTacToe({
    username,
    setFinding: setJoining,
  });

  return (
    <main className="dark min-h-screen w-full flex flex-col items-center justify-center">
      <div className="fixed top-0 right-0 m-4 p-2 rounded-md text-white text-sm font-bold">
        {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
      </div>
      {gameState ? (
        <GameBoard
          askToPlayAgain={askToPlayAgain}
          reacting={reacting}
          board={board}
          handlePlay={handlePlay}
          handleReact={handleReact}
          currentUsername={username}
          gameState={gameState}
          wonDrawLeftState={wonDrawLeftState}
        />
      ) : (
        <DetailsForm
          findMatchButtonTitle="Join Game"
          title="Welcome, Join Now!"
          findMatch={joinNow}
          loading={false}
          setUsername={setUsername}
          username={username}
        />
      )}
    </main>
  );
};

export default JoinViaInvite;
