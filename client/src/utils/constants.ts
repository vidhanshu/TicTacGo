export const SOCKET_EVENTS = {
  FIND_MATCH: "find-match",
  PLAYER_LEFT: "player-left",
  PLAYING: "playing",
  REACT: "react",
  PLAY_AGAIN: "play-again",
  OK_PLAY_AGAIN: "ok-play-again",
  PLAY_VIA_INVITE: "play-via-invite",
  OK_PLAY_VIA_INVITE: "ok-play-via-invite",
  INVITE_JOIN: "invite-join",
  INVITEE_LEFT: "invitee-left",
};

export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://tic-tac-go-backend.onrender.com"
    : "http://localhost:8000";

export const RANDOM_AVATAR_API = "https://robohash.org";

export const EMOTES = ["😂", "🥲", "😶", "😎", "🤔"];
