import { Button, ContentLayout, Grid, Header, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";
import { type Quiz } from "./file/quiz";
import Section from "./quizzer/section";

export default function Quizzer(props: { quiz: Quiz }) {
  const [sectionIndex, setSectionIndex] = useState<number>(0);

  return (
    <ContentLayout defaultPadding header={<Header variant="h1">{props.quiz.name}</Header>}>
      <SpaceBetween direction="vertical" size="l">
        <Section sectionIndex={sectionIndex} section={props.quiz.sections[sectionIndex]} />
        <Grid gridDefinition={[{ colspan: 10 }, { colspan: 2 }]}>
          <Button disabled={sectionIndex === 0} onClick={() => setSectionIndex(sectionIndex - 1)}>&lt;&lt;</Button>
          <Button disabled={sectionIndex === props.quiz.sections.length - 1} onClick={() => setSectionIndex(sectionIndex + 1)}>&gt;&gt;</Button>
        </Grid>
      </SpaceBetween>
    </ContentLayout>
  )
}