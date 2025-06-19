import { useState } from "react";
import { type Section as SectionType, type Chapter as ChapterType } from '../file/quiz';
import { Button, ContentLayout, Grid, Header, SpaceBetween } from "@cloudscape-design/components";
import Section from "./section";


export function Chapter(props: { chapter: ChapterType, editMode: boolean; setEditMode: (edit: boolean) => void; setChapter: (chapter: ChapterType) => void }) {
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [key, setKey] = useState<number>(0);

  const addSection = (section: SectionType) => {
    props.chapter.sections.push(section);
    props.setChapter(props.chapter);
    setSectionIndex(props.chapter.sections.length - 1);
  }

  const removeCurrentSection = () => {
    props.chapter.sections.splice(sectionIndex, 1);
    props.setChapter(props.chapter);
    setTimeout(() => {
      // Force rerender
      setKey(key + 1);
    })
  }

    return (
    <ContentLayout defaultPadding header={
        <Grid gridDefinition={[{ colspan: 8 }, { colspan: 2 }, { colspan: 2 }]}>
          <Header variant="h1">{props.chapter.name}</Header>
          <Button iconName={props.editMode ? 'check' : 'edit'} onClick={() => props.setEditMode(!props.editMode)}>{props.editMode ? 'Done' : 'Edit Mode'}</Button>
          <SpaceBetween size={"xxs"} direction="horizontal" alignItems="end">
            <Button variant='normal' iconName={props.editMode ? 'delete-marker' : 'add-plus'}>Chapter</Button>
          </SpaceBetween>
        </Grid>
      }>
      <SpaceBetween direction="vertical" size="l">
        <Grid gridDefinition={[{ colspan: 10 }, { colspan: 2 }]}>
          <Button disabled={sectionIndex === 0} onClick={() => setSectionIndex(sectionIndex - 1)}>&lt;&lt;</Button>
          <Button disabled={sectionIndex === props.chapter.sections.length - 1} onClick={() => setSectionIndex(sectionIndex + 1)}>&gt;&gt;</Button>
        </Grid>
          <Section 
            editMode={props.editMode} 
            addSection={addSection}
            removeCurrentSection={removeCurrentSection}
            save={() => { props.setChapter(props.chapter)} } 
            sectionIndex={sectionIndex} 
            section={props.chapter.sections[sectionIndex]} 
          />
      </SpaceBetween>
    </ContentLayout>
  );
}