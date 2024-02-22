import { PropsWithChildren, createContext, useContext, useRef } from "react";
import entered from "@/assets/entered.mp3";
import lose from "@/assets/lose.wav";
import win from "@/assets/win.wav";
import tap from "@/assets/tap.mp3";

export const AudioContext = createContext<{
  audioRef: React.RefObject<HTMLAudioElement> | null;
  playLose: () => void;
  playWin: () => void;
  playTap: () => void;
  playEnter: () => void;
}>({
  audioRef: null,
  playLose: () => {},
  playWin: () => {},
  playTap: () => {},
  playEnter: () => {},
});

export default function AudioContextProvider({ children }: PropsWithChildren) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playWin = async () => {
    if (!audioRef.current) return;
    audioRef.current.src = win;
    await audioRef.current?.play();
  };
  const playLose = async () => {
    if (!audioRef.current) return;
    audioRef.current.src = lose;
    await audioRef.current.play();
  };
  const playEnter = async () => {
    if (!audioRef.current) return;
    audioRef.current.src = entered;
    await audioRef.current.play();
  };

  const playTap = async () => {
    if (!audioRef.current) return;
    audioRef.current.src = tap;
    await audioRef.current.play();
  };

  return (
    <AudioContext.Provider value={{ audioRef, playWin, playLose, playEnter,playTap }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudioContext = () => useContext(AudioContext);
