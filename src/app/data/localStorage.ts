import chapter1 from '../../chapter1.json';
import type { Quiz } from '../file/quiz';


export function loadLocalStorageData() {
  return () => {
    const savedData = localStorage.getItem('quizzerData');
    return savedData ? JSON.parse(savedData) : { chapters: [chapter1] };
  }
}

export function saveLocalStorageData(quiz: Quiz) {
  localStorage.setItem('quizzerData', JSON.stringify(quiz));
}