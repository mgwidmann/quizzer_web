import chapter1 from '../../chapter1.json';
import type { Quiz } from '../file/quiz';


export function loadLocalStorageData() {
  return () => {
    const savedData = localStorage.getItem('quizzerData');
    return savedData ? JSON.parse(savedData) : { chapters: [
      chapter1, 
      { name: 'Розділ 2. Історія і теорія психології та соціології', sections: []}, 
      { name: 'Розділ 3', sections: []}, 
      { name: 'Розділ 4. Прикладні аспекти психології та соціології', sections: []}, 
      { name: 'Розділ 5. Психологічні та соціологічні виміри суспільства.', sections: []}] 
    };
  }
}

export function saveLocalStorageData(quiz: Quiz) {
  localStorage.setItem('quizzerData', JSON.stringify(quiz));
}