export type GameState = null | {
  p1: { username: string; socketId: string; value: "X" | "O" };
  p2: { username: string; socketId: string; value: "X" | "O" };
  turn: "X" | "O"; // O for p1 and X for p2
};

export type PlayingPayload = {
  index: number;
  to: string;
  currentTurn: "X" | "O";
};
