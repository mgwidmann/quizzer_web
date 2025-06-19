import { Button, ContentLayout, Grid, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";
import { type Quiz, type Chapter as ChapterType } from "./file/quiz";
import { Chapter } from "./quizzer/chapter";

export default function Quizzer(props: { quiz: Quiz, setQuiz: (quiz: Quiz) => void, editMode: boolean, setEditMode: (on: boolean) => void }) {
  const [chapterIndex, setChapterIndex] = useState<number>(0);

  const chapter = props.quiz.chapters[chapterIndex];

  const setChapter = (chapter: ChapterType) => {
    props.quiz.chapters[chapterIndex] = chapter;
    props.setQuiz(props.quiz);
  }

  return (
    <ContentLayout defaultPadding 
    // header={
        // <Grid gridDefinition={[{ colspan: 8 }, { colspan: 2 }, { colspan: 2 }]}>
        //   <Header variant="h1">{chapter.name}</Header>
        //   <Button iconName={props.editMode ? 'check' : 'edit'} onClick={() => props.setEditMode(!props.editMode)}>{props.editMode ? 'Done' : 'Edit Mode'}</Button>
        //   <SpaceBetween size={"xxs"} direction="horizontal" alignItems="end">
        //     <Button variant='normal' iconName={props.editMode ? 'delete-marker' : 'add-plus'}>Chapter</Button>
        //   </SpaceBetween>
        // </Grid>
      // }
      >
      <SpaceBetween direction="vertical" size="l">
        <Grid gridDefinition={[{ colspan: 10 }, { colspan: 2 }]}>
          <Button disabled={chapterIndex === 0} onClick={() => setChapterIndex(chapterIndex - 1)}>&lt;&lt;</Button>
          <Button disabled={chapterIndex === props.quiz.chapters.length - 1} onClick={() => setChapterIndex(chapterIndex + 1)}>&gt;&gt;</Button>
        </Grid>
        <Chapter chapter={chapter} editMode={props.editMode} setEditMode={props.setEditMode} setChapter={setChapter} />
      </SpaceBetween>
    </ContentLayout>
  )
}