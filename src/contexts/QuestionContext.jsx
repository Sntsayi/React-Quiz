import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  //'loading' , 'error' , 'ready' , 'active' ,'finished'
  status: "loading",
  // for current inedx
  index: 0,
  // for our answer
  answer: null,
  //for point of question
  points: 0,
  //for save the highScore
  highScore: 0,
  // for timer
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,

        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        // ...state,
        // status: "ready",
        // index: 0,
        // // highScore : 0,
        // answer: null,
        // points: 0,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action Unknown!");
  }
}

function QuestionContextProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  //   to fetch questions from fake api
  useEffect(function () {
    async function fetchDataQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      } finally {
      }
    }
    fetchDataQuestions();
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        dispatch,
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

// custoom hool to use this context api
function useQuestionContext() {
  const context = useContext(QuestionContext);
  if (context === undefined)
    throw new Error("the context is outside of the context provider !");

  return context;
}

export { QuestionContextProvider, useQuestionContext };
