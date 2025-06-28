import chapter1 from '../../chapter1.json';
import chapter2 from '../../chapter2.json';
import chapter3 from '../../chapter3.json';
import chapter4 from '../../chapter4.json';
import chapter5 from '../../chapter5.json';
import type { Quiz } from '../file/quiz';


export function loadLocalStorageData() {
  return () => {
    const savedData = localStorage.getItem('quizzerData');
    return savedData ? JSON.parse(savedData) : { chapters: [
        chapter1, 
        chapter2,
        chapter3,
        chapter4,
        chapter5, 
      ] 
    };
  }
}

export function saveLocalStorageData(quiz: Quiz) {
  localStorage.setItem('quizzerData', JSON.stringify(quiz));
}

export function eraseLocalStorageData() {
  localStorage.removeItem('quizzerData');
}