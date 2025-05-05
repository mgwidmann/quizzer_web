import { Box, Button, ContentLayout, Grid, Header, SpaceBetween } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { type Section } from "../file/quiz";
import Question from "./question";

export default function Section(props: { sectionIndex: number, section: Section }) {
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  useEffect(() => {
    console.log('Section:', props.sectionIndex);
    // Reset to zero when section changes
    setQuestionIndex(0);
  }, [props.sectionIndex])

  return (
    <ContentLayout defaultPadding header={<Header variant="h1">{props.section.name}</Header>}>
      <SpaceBetween direction="vertical" size="l">
        <Box>
          <Question questionIndex={questionIndex} question={props.section.questions.length - 1 >= questionIndex ? props.section.questions[questionIndex] : props.section.questions[props.section.questions.length - 1]} />
        </Box>
        <Grid gridDefinition={[{ colspan: 10 }, { colspan: 2 }]}>
          <Button disabled={questionIndex === 0} onClick={() => setQuestionIndex(questionIndex - 1)}>&lt;</Button>
          <Button disabled={questionIndex === props.section.questions.length - 1} onClick={() => setQuestionIndex(questionIndex + 1)}>&gt;</Button>
        </Grid>
      </SpaceBetween>
    </ContentLayout>
  )
}