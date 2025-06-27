import { Box, Button, ContentLayout, Grid, Header, Modal, SpaceBetween } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { type Section, type Question as QuestionType, type Section as SectionType } from "../file/quiz";
import Question from "./question";
import SectionForm from "./section-form";

export default function Section(props: { editMode: boolean, addSection: (section: SectionType) => void, removeCurrentSection: () => void, sectionIndex: number, section?: Section, save: () => void }) {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [showSectionForm, setShowSectionForm] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    // Reset to zero when section changes
    setQuestionIndex(0);
  }, [props.sectionIndex])

  const addQuestions = (questions: QuestionType[]) => {
    if (props.section) {
      const lastItem = props.section.questions.length - 1;
      props.section.questions.push(...questions);
      props.save();
      setQuestionIndex(lastItem + 1);
      setTimeout(() => {
        // Force rerender
        setKey(key + 1);
      })
    }
  }

  const removeCurrentQuestion = () => {
    if (props.section) {
      const newIndex = props.section.questions.length - 1 >= questionIndex ? questionIndex - 1 : questionIndex;
      props.section.questions.splice(questionIndex, 1);
      props.save()
      setQuestionIndex(newIndex);
    }
  }

  return (
    <ContentLayout defaultPadding header={
        <Grid gridDefinition={[{ colspan: 10 }, { colspan: 2 }]}>
          <Header variant="h1">{props.section?.name}</Header>
          <Button 
            variant='normal' 
            iconName={props.editMode ? 'delete-marker' : 'add-plus'}
            onClick={() => props.editMode ? confirm("Remove?") && props.removeCurrentSection() : setShowSectionForm(true) }
            >
            Section
        </Button>
        </Grid>
    }>
      <SpaceBetween direction="vertical" size="l">
        <Grid gridDefinition={[{ colspan: 10 }, { colspan: 2 }]}>
          <Button disabled={questionIndex === 0} onClick={() => setQuestionIndex(questionIndex - 1)}>&lt;</Button>
          <Button disabled={questionIndex === (props.section?.questions.length || 0) - 1} onClick={() => setQuestionIndex(questionIndex + 1)}>&gt;</Button>
        </Grid>
        <Box>
          {props.section ? 
            <Question 
              editMode={props.editMode} 
              removeCurrentQuestion={removeCurrentQuestion} 
              addQuestions={addQuestions} 
              questionIndex={questionIndex} 
              question={props.section.questions.length - 1 >= questionIndex ? props.section.questions[questionIndex] : props.section.questions[props.section.questions.length - 1]} 
            />
          : null }
        </Box>
      </SpaceBetween>
      <Modal
        onDismiss={() => setShowSectionForm(false)}
        visible={showSectionForm}
        header="Section"
      >
        <SectionForm 
          section={props.editMode ? props.section : undefined} 
          saveSection={(section: Section) => { props.addSection(section); setShowSectionForm(false); }} 
          cancel={() => setShowSectionForm(false)} 
        />
      </Modal>
    </ContentLayout>
  )
}