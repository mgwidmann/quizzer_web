import {
  AppLayout,
  ContentLayout,
} from '@cloudscape-design/components';
import Quizzer from './quizzer';
import chapter1 from '../chapter1.json';


export default function Quiz() {
  return (
    <AppLayout
      navigationHide={true}
      toolsHide={true}
      content={
        <ContentLayout>
          <Quizzer quiz={chapter1} />
        </ContentLayout>
      }
    />
  );
}