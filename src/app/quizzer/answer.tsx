import { Box } from "@cloudscape-design/components";
import { type Answer } from "../file/quiz";

export default function Answer(props: { answer: Answer, label: string, selected?: boolean, submitAnswer: (answer: Answer) => void }) {
  let className = '';
  if (props.selected) {
    className += ' answered';
    if (props.answer.correct) {
      className += ' correct';
    } else {
      className += ' incorrect';
    }
  }
  return (
    <Box key={props.label} className={className} textAlign="left">
      <input id={props.label} name="question-answer" type="radio" onClick={() => props.submitAnswer(props.answer)} />
      <label htmlFor={props.label} style={{ cursor: 'pointer' }}>
        <span>{props.label}:</span>&nbsp;<span>{props.answer.text}</span>
      </label>
    </Box>
  )
}