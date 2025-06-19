export interface Quiz {
    chapters: {
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
    }[]
}

export type Chapter = Quiz['chapters'][number];
export type Section = Quiz['chapters'][number]['sections'][number];
export type Question = Section['questions'][number];
export type Answer = Question['answers'][number];