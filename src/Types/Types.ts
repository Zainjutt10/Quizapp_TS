import React from 'react';
export type Quiz = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type filteredQ={
    question: string
    answer: string
    option: string[]
}

export type questiontype={
    question: string
    option: string[]
    answer: string
    submit:(e:React.FormEvent<EventTarget>,option:string)=>void
}

