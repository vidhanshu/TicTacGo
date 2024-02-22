import { useState } from "react";
import { DetailsForm, GameBoard } from "@/components";
import useRealtimeTicTacToe from "@/hooks/use-realtime-tic-tac-toe";

const Home = () => {
  const [username, setUsername] = useState("");
  const [finding, setFinding] = useState(false);
  const {
    findMatch,
    handlePlay,
    board,
    gameState,
    isConnected,
    wonDrawLeftState,
    allPlayersUsername,
    reacting,
    askToPlayAgain,
    handleReact,
  } = useRealtimeTicTacToe({
    username,
    setFinding,
  });

  return (
    <main className="dark min-h-screen w-full flex flex-col items-center justify-center">
      <div className="fixed top-0 right-0 m-4 p-2 rounded-md text-white text-sm font-bold">
        {allPlayersUsername.length} Active playing,{" "}
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
          findMatch={findMatch}
          loading={finding}
          username={username}
          setUsername={setUsername}
        />
      )}
    </main>
  );
};

export default Home;
