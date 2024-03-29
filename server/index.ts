import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { SOCKET_EVENTS } from "./utils/constants";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // allow all
  },
});

app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

let inviteQueue: { username: string; socketId: string }[] = [];
let queue: { username: string; socketId: string }[] = [];
let playing: {
  p1: {
    value: string;
    username: string;
    socketId: string;
  };
  p2: {
    value: string;
    username: string;
    socketId: string;
  };
  turn: "X" | "O"; // O for p1 and X for p2
}[] = [];

io.on("connection", (socket) => {
  socket.on(SOCKET_EVENTS.FIND_MATCH, ({ username }: { username: string }) => {
    const existsAleady = queue.find((user) => user.username === username);
    if (!username || existsAleady) return;

    queue.push({
      username,
      socketId: socket.id,
    });

    if (queue.length > 1) {
      const player1 = queue.shift()!;
      const player2 = queue.shift()!;
      const playersObj = {
        p1: {
          ...player1,
          value: "X",
        },
        p2: {
          ...player2,
          value: "O",
        },
        turn: "X" as "X" | "O",
      };
      playing.push(playersObj);

      /**
       * KEEP NOTE: (Was stucked for 1/2 hour in figuring out why only the user to whom the current socket belongs recieving the event and other not 🥲)
       * don't use socket to send message to particular id use io instead, since socket is specific to currently joined user
       * Wrong ❌
       * socket.to(player1.socketId).emit(SOCKET_EVENTS.FIND_MATCH, playersObj);
       * socket.to(player2.socketId).emit(SOCKET_EVENTS.FIND_MATCH, playersObj);
       *
       * Correct ✅
       */
      io.to(player1.socketId).emit(SOCKET_EVENTS.FIND_MATCH, playersObj);
      io.to(player2.socketId).emit(SOCKET_EVENTS.FIND_MATCH, playersObj);
    }
  });

  socket.on(
    SOCKET_EVENTS.PLAYING,
    ({
      index,
      to,
      currentTurn,
    }: {
      index: number;
      to: string;
      currentTurn: "X" | "O";
    }) => {
      io.to(to).emit(SOCKET_EVENTS.PLAYING, {
        index,
        currentTurn,
      });
    }
  );

  socket.on(
    SOCKET_EVENTS.REACT,
    ({ emote, to }: { emote: string; to: string }) => {
      io.to(to).emit(SOCKET_EVENTS.REACT, emote);
    }
  );

  socket.on(SOCKET_EVENTS.PLAY_AGAIN, ({ to }: { to: string }) => {
    io.to(to).emit(SOCKET_EVENTS.PLAY_AGAIN);
  });

  socket.on(SOCKET_EVENTS.OK_PLAY_AGAIN, ({ to }: { to: string }) => {
    io.to(to).emit(SOCKET_EVENTS.OK_PLAY_AGAIN);
  });

  socket.on(SOCKET_EVENTS.INVITE_JOIN, (username: string) => {
    if (inviteQueue.find((user) => user.username === username)) return;
    inviteQueue.push({
      username,
      socketId: socket.id,
    });
  });

  socket.on(
    SOCKET_EVENTS.PLAY_VIA_INVITE,
    ({
      from,
      to,
    }: {
      from: { socketId: string; username: string };
      to: { socketId: string; username: string };
    }) => {
      // check if the one who invited is still in invite queue
      const exists = inviteQueue.find(
        (user) => user.socketId === from.socketId
      );
      const ifAleadyPlaying = playing.find(
        (game) =>
          game.p1.socketId === from.socketId ||
          game.p2.socketId === from.socketId
      );
      if (!exists || ifAleadyPlaying) {
        io.to(to.socketId).emit(SOCKET_EVENTS.INVITEE_LEFT);
        return;
      }
      inviteQueue = inviteQueue.filter(
        (user) => user.socketId !== from.socketId
      );

      const player1 = from;
      const player2 = to;
      const playersObj = {
        p1: {
          ...player1,
          value: "X",
        },
        p2: {
          ...player2,
          value: "O",
        },
        turn: "X" as "X" | "O",
      };
      playing.push(playersObj);

      /**
       * KEEP NOTE: (Was stucked for 1/2 hour in figuring out why only the user to whom the current socket belongs recieving the event and other not 🥲)
       * don't use socket to send message to particular id use io instead, since socket is specific to currently joined user
       * Wrong ❌
       * socket.to(player1.socketId).emit(SOCKET_EVENTS.FIND_MATCH, playersObj);
       * socket.to(player2.socketId).emit(SOCKET_EVENTS.FIND_MATCH, playersObj);
       *
       * Correct ✅
       */
      io.to(player1.socketId).emit(SOCKET_EVENTS.FIND_MATCH, playersObj);
      io.to(player2.socketId).emit(SOCKET_EVENTS.FIND_MATCH, playersObj);
    }
  );

  socket.on("disconnect", () => {
    // Remove from invite queue if there
    inviteQueue = inviteQueue.filter((user) => user.socketId !== socket.id);
    // Remove from queue if there
    queue = queue.filter((user) => user.socketId !== socket.id);
    // Remove from playing if there
    const existsInPlaying = playing.find(
      (player) =>
        player.p1.socketId === socket.id || player.p2.socketId === socket.id
    );
    if (existsInPlaying) {
      playing = playing.filter(
        (games) =>
          games.p1.socketId !== socket.id && games.p2.socketId !== socket.id
      );
      if (existsInPlaying.p1.socketId !== socket.id) {
        io.to(existsInPlaying.p1.socketId).emit(
          SOCKET_EVENTS.PLAYER_LEFT,
          existsInPlaying.p2.username
        );
      } else {
        io.to(existsInPlaying.p2.socketId).emit(
          SOCKET_EVENTS.PLAYER_LEFT,
          existsInPlaying.p1.username
        );
      }
    }
  });
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
