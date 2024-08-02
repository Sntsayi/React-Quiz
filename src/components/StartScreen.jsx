import { useQuestionContext } from "../contexts/QuestionContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuestionContext();
  return (
    <div className="start">
      <h2>Welcome To The React Quiz!</h2>
      <h3>{numQuestions} Question to test your React Mastery.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
export default StartScreen;
