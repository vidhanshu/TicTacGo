import { create } from "zustand";

export type ModalType = "You Won" | "You Lost" | "Draw" | "Username Wrong" | "User Left" | "Play Again?";

interface ModalData {
  username?: string;
  handlePlayAgain?: () => void;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
