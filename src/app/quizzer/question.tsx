import { ContentLayout, Header, Spinner } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import type { Question, Answer } from "../file/quiz";
import AnswerGroup from './answer-group';

export default function Question(props: { questionIndex: number, question: Question }) {

  const [answers, setAnswers] = useState<Answer[]>(props.question.answers);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    var top = props.question.answers.length
    const ans = props.question.answers;
    while (--top) {
      var current = Math.floor(Math.random() * (top + 1));
      var tmp = ans[current];
      ans[current] = ans[top];
      ans[top] = tmp;
    }

    setAnswers(ans);
    setLoaded(true);
  }, [props.questionIndex, props.question.text]);

  return (
    <ContentLayout defaultPadding header={<Header variant="h1">{props.question.text}</Header>}>
      {loaded ? <AnswerGroup answers={answers} /> : <Spinner />}
    </ContentLayout>
  )
}