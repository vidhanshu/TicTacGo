import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { ModalProvider } from "./components/ModalProvider";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ModalProvider />
    </>
  );
};

export default App;
