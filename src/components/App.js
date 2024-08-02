import { act, useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuestionContext } from "../contexts/QuestionContext";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

export default function App() {
  // for dark or light mode
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { status } = useQuestionContext();

  // for handle the dark or light mode
  function toggleDarkOrLight() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }
  useEffect(
    function () {
      localStorage.setItem("theme", theme);
      document.body.classList = theme;
    },
    [theme]
  );

  return (
    <div className={`app ${theme} `}>
      <button className="darkOrLight" onClick={toggleDarkOrLight}>
        {theme === "light" ? <MdDarkMode /> : <CiLight />}
      </button>

      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />

            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
