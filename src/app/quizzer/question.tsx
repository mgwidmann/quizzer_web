import { Button, ContentLayout, Grid, Header, Modal, Spinner } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import type { Question, Answer } from "../file/quiz";
import AnswerGroup from './answer-group';
import QuestionForm from "./question-form";

export default function Question(props: { editMode: boolean, removeCurrentQuestion: () => void, addQuestions: (questions: Question[]) => void, questionIndex: number, question?: Question }) {
  const [answers, setAnswers] = useState<Answer[]>(props.question?.answers || []);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState<boolean>(false);
  useEffect(() => {
    var top = props.question?.answers.length || 0;
    const ans = props.question?.answers || [];
    if (props.question && props.question.answers.length > 0) {
      while (--top) {
        var current = Math.floor(Math.random() * (top + 1));
        var tmp = ans[current];
        ans[current] = ans[top];
        ans[top] = tmp;
      }
    }
    setAnswers(ans);
    setLoaded(true);

  }, [props.questionIndex, props.question?.text]);

  return (
    <ContentLayout defaultPadding header={
      <Grid gridDefinition={[{ colspan: 10 }, { colspan: 2 }]}>
        <Header variant="h1">{props.question?.text || 'Add a new question...'}</Header>
        <Button 
          variant='normal' 
          iconName={props.editMode ? 'delete-marker' : 'add-plus'}
          onClick={() => props.editMode ? confirm("Remove?") && props.removeCurrentQuestion() : setShowNewQuestionForm(true) }
          >
            Question
        </Button>
      </Grid>
      }>
      {loaded ? <AnswerGroup answers={answers} /> : <Spinner />}
      <Modal
        onDismiss={() => setShowNewQuestionForm(false)}
        visible={showNewQuestionForm}
        header="Question"
      >
        <QuestionForm saveQuestions={(questions: Question[]) => { props.addQuestions(questions); setShowNewQuestionForm(false); }} cancel={() => setShowNewQuestionForm(false)} />
      </Modal>
    </ContentLayout>
  )
}