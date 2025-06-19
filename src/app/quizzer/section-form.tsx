import { Button, Container, Form, FormField, Input, SpaceBetween } from "@cloudscape-design/components";
import type { Section } from "../file/quiz";
import { useState } from "react";


export default function SectionForm(props: { saveSection: (section: Section) => void, section?: Section, cancel: () => void }) {
  const [sectionName, setSectionName] = useState<string>(props.section?.name || '')
  const [sectionDescription, setSectionDescription] = useState<string>(props.section?.description || '')

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Form actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link" onClick={props.cancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => props.saveSection({ name: sectionName, description: sectionDescription, questions: props.section?.questions || [] })}>Submit</Button>
          </SpaceBetween>
        }>
        <Container>
          <SpaceBetween direction="vertical" size="l">
                <FormField label="Name">
                  <Input value={sectionName} onChange={(e) => setSectionName(e.detail.value) } />
                </FormField>
                <FormField label="Description">
                  <Input value={sectionDescription} onChange={(e) => setSectionDescription(e.detail.value) } />
                </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}