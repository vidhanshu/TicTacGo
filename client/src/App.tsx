import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { ModalProvider } from "./components/ModalProvider";
import { useAudioContext } from "./context/audio-context";

const App = () => {
  const { audioRef } = useAudioContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ModalProvider />
      <audio className="hidden" autoPlay={true} ref={audioRef} id="audio" />
    </>
  );
};

export default App;
