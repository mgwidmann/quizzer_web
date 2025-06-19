import { useState } from 'react';
import {
  AppLayout,
  Button,
  ContentLayout,
} from '@cloudscape-design/components';
import Quizzer from './quizzer';
import { loadLocalStorageData, saveLocalStorageData } from './data/localStorage';


export default function Quiz() {
  const [data, setData] = useState(loadLocalStorageData());
  const [editMode, setEditMode] = useState<boolean>(false);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quizzer-data.json';
    document.body.appendChild(a); // Append to the DOM temporarily
    a.click();
    document.body.removeChild(a); // Clean up
  }

  return (
    <AppLayout
      navigationHide={true}
      toolsHide={true}
      content={
        <ContentLayout>
          <Button onClick={exportData}>Export</Button>
          <Quizzer quiz={data} editMode={editMode} setEditMode={setEditMode} setQuiz={(quiz) => { saveLocalStorageData(quiz); setData(quiz) }} />
        </ContentLayout>
      }
    />
  );
}