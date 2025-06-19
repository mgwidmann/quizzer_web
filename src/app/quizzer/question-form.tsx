import { Button, Container, Form, FormField, Input, SegmentedControl, SpaceBetween, Textarea } from "@cloudscape-design/components";
import type { Question } from "../file/quiz";
import { useState } from "react";

export default function QuestionForm(props: { saveQuestions: (question: Question[]) => void, cancel: () => void }) {
  const [view, setView] = useState<string>('single');
  const [question, setQuestion] = useState<string>('');
  const [answerA, setAnswerA] = useState<string>('');
  const [answerB, setAnswerB] = useState<string>('');
  const [answerC, setAnswerC] = useState<string>('');
  const [answerD, setAnswerD] = useState<string>('');
  const [answerE, setAnswerE] = useState<string>('');
  const [answerF, setAnswerF] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number>(-1);
  const [bulkQuestions, setBulkQuestions] = useState<string>('');

  const clearState = () => {
    setView('single');
    setQuestion('');
    setAnswerA('');
    setAnswerB('');
    setAnswerC('');
    setAnswerD('');
    setAnswerE('');
    setAnswerF('');
    setCorrectAnswer(-1);
    setBulkQuestions('');
  }
  
  const gatherQuestions = (): Question[] => {
    const questions: Question[] = [];
    if (view === 'single') {
      questions.push({
        text: question,
        answers: [answerA, answerB, answerC, answerD, answerE, answerF].map((a, i) => ({ text: a.trim(), correct: correctAnswer === i })).filter((a) => a.text !== ''),
      })
    } else if (view === 'bulk') {
      const lines = bulkQuestions.split('\n');
      let currentQuestion: Question = { text: '', answers: [] };
      for (const line of lines) {
        if (!currentQuestion.text) {
          currentQuestion.text = line;
          continue;
        }
        if (line.trim() === '') {
          questions.push(currentQuestion);
          currentQuestion = { text: '', answers: [] };
        } else {
          const isCorrect = line.trim().startsWith('*');
          let answerText = line.trim();
          if (isCorrect) {
            answerText = answerText.substring(1).trim();
          }
          currentQuestion.answers.push({ text: answerText, correct: isCorrect })
        }
      }
      questions.push(currentQuestion);
    } else {
      throw new Error('Unsupported view!');
    }

    return questions;
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Form actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link" onClick={props.cancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => { props.saveQuestions(gatherQuestions()); clearState(); }}>Submit</Button>
          </SpaceBetween>
        }>
        <Container>
          <SpaceBetween direction="vertical" size="l">
          <SegmentedControl
            selectedId={view}
            onChange={({ detail }) =>
              setView(detail.selectedId)
            }
            label="View"
            options={[
              { text: "Single", id: "single" },
              { text: "Bulk", id: "bulk" },
            ]}
          />
            {view === 'single' ? 
              <>
                <FormField label="Question">
                  <Input value={question} onChange={(e) => setQuestion(e.detail.value) } />
                </FormField>
                <FormField>
                  <input id="a" type="radio" name="correct" defaultChecked={correctAnswer === 0} onClick={() => setCorrectAnswer(0)}></input>
                  <label htmlFor="a">A.</label>
                  <Input value={answerA} onChange={(e) => setAnswerA(e.detail.value) } />
                </FormField>
                <FormField>
                  <input id="b" type="radio" name="correct" defaultChecked={correctAnswer === 1} onClick={() => setCorrectAnswer(1)}></input>
                  <label htmlFor="b">B.</label>
                  <Input value={answerB} onChange={(e) => setAnswerB(e.detail.value) } />
                </FormField>
                <FormField>
                  <input id="c" type="radio" name="correct" defaultChecked={correctAnswer === 2} onClick={() => setCorrectAnswer(2)}></input>
                  <label htmlFor="c">C.</label>
                  <Input value={answerC} onChange={(e) => setAnswerC(e.detail.value) } />
                </FormField>
                <FormField>
                  <input id="d" type="radio" name="correct" defaultChecked={correctAnswer === 3} onClick={() => setCorrectAnswer(3)}></input>
                  <label htmlFor="d">D.</label>
                  <Input value={answerD} onChange={(e) => setAnswerD(e.detail.value) } />
                </FormField>
                <FormField>
                  <input id="e" type="radio" name="correct" defaultChecked={correctAnswer === 4} onClick={() => setCorrectAnswer(4)}></input>
                  <label htmlFor="e">E.</label>
                  <Input value={answerE} onChange={(e) => setAnswerE(e.detail.value) } />
                </FormField>
                <FormField>
                  <input id="f" type="radio" name="correct" defaultChecked={correctAnswer === 5} onClick={() => setCorrectAnswer(5)}></input>
                  <label htmlFor="f">F.</label>
                  <Input value={answerF} onChange={(e) => setAnswerF(e.detail.value) } />
                </FormField>
              </>
            : null}
            {view === 'bulk' ? 
            <>
              The following is the expected format for bulk question entry. It should be the question on a single line, followed by answers 
              each on their own line. The correct answer should start with an asterisk (which will be removed). An empty line should be between
              each question. Only add questions for the current section, not for the next section.<br/><br/>
              Question?<br/>
              Answer A<br/>
              *Answer B<br/>
              Answer C<br/>
              Answer D<br/>
              (empty line)<br/>
              Question?<br/>
              ... (repeats) ...<br/><br/>
              <Textarea value={bulkQuestions} onChange={(e) => setBulkQuestions(e.detail.value) } rows={10} />
            </>
            : null}
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}