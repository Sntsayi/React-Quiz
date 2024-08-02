import { useQuestionContext } from "../contexts/QuestionContext";
import Options from "./options";

function Questions() {
  const { questions, index } = useQuestionContext();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Questions;
