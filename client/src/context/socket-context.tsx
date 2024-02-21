import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { type Socket } from "socket.io-client";

const SocketContext = createContext<{
  socket: Socket | null;
  isConnected: Boolean;
}>({
  socket: null,
  isConnected: false,
});

export const SocketContextProvider = ({ children }: PropsWithChildren) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<Boolean>(false);

  useEffect(() => {
    setSocketInstance(io("https://tic-tac-go-backend.onrender.com"));
  }, []);

  useEffect(() => {
    if (!socketInstance) return;
    socketInstance.on("connect", () => {
      setIsConnected(true);
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.close();
    };
  }, [socketInstance]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketInstance,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
