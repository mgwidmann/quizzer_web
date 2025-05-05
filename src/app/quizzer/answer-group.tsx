import { SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";
import { type Answer as AnswerType } from "../file/quiz";
import Answer from "./answer";

const ASCII_A_START = 65;

function intToLabel(i: number) {
  return String.fromCharCode(i + ASCII_A_START);
}

export default function AnswerGroup(props: { answers: AnswerType[] }) {
  const [answer, setAnswer] = useState<AnswerType | undefined>(undefined);

  return (
    <SpaceBetween direction="vertical" size="m">
      {props.answers.map((a, i) => <Answer key={a.text} answer={a} label={intToLabel(i)} selected={a.text === answer?.text} submitAnswer={(a) => setAnswer(a)} />)}
    </SpaceBetween>
  )
}