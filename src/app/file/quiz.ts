export interface Quiz {
    name: string;
    description: string;
    sections: {
        name: string,
        description: string,
        questions: {
            text: string,
            answers: {
                text: string,
                correct: boolean;
            }[]
        }[]
    }[]
}

export type Section = Quiz['sections'][number];
export type Question = Section['questions'][number];
export type Answer = Question['answers'][number];