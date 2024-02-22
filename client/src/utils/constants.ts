export const SOCKET_EVENTS = {
  FIND_MATCH: "find-match",
  ALL_USERNAMES: "all-usernames",
  PLAYER_LEFT: "player-left",
  PLAYING: "playing",
  REACT: "react",
  PLAY_AGAIN: "play-again",
  OK_PLAY_AGAIN: "ok-play-again",
};

export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://tic-tac-go-backend.onrender.com"
    : "http://localhost:8000";
