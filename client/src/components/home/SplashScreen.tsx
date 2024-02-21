import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="flex items-center justify-center h-screen w-full fixed top-0 left-0 z-50 bg-[url(/splash.svg)] bg-no-repeat bg-cover" />
  );
};

export default SplashScreen;
