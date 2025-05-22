import { useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Intro from "./components/Intro";
import FadeContent from "./components/animation/FadeContent";

function App() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLDivElement | null>(null);

  const scrollToMain = () =>
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToLanguages = () =>
    languageRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToHome = () =>
    homeRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <div className="overflow-x-hidden">
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
        <Navbar
          scrollToHome={scrollToHome}
          scrollToMain={scrollToMain}
          scrollToLanguages={scrollToLanguages}
        />
      </FadeContent>

      <Intro ref={homeRef} scrollToMain={scrollToMain} />

      <Main ref={mainRef} languageRef={languageRef} />
      


      </div>
    </>
  );
}

export default App;
