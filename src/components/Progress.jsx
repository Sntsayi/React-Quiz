import { useQuestionContext } from "../contexts/QuestionContext";

function Progress() {
  const { index, numQuestions, answer, points, maxPossiblePoints } =
    useQuestionContext();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> /{numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
