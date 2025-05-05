import {
  AppLayout,
  ContentLayout,
  Header,
} from '@cloudscape-design/components';
import Quizzer from './quizzer';
import chapter1 from '../chapter1.json';


export default function App() {
  return (
    <AppLayout
      navigationHide={true}
      toolsHide={true}
      content={
        <ContentLayout
          header={
            <Header variant="h1">
              Kateryna's Quizzer
            </Header>
          }
        >
          <Quizzer quiz={chapter1} />
        </ContentLayout>
      }
    />
  );
}