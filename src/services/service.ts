import {Quiz,filteredQ} from '../Types/Types';

export const quizquestion= async(num:number,category: number,level:string)=>{
    const res=await fetch(`https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${level}&type=multiple`);
    let result=await res.json();
    const renderquiz:filteredQ[]=result.results.map((questionobj:Quiz)=>{
        return{
            question:questionobj.question,
            answer:questionobj.correct_answer,
            option:(questionobj.incorrect_answers.concat(questionobj.correct_answer)).sort(() => Math.random() - 0.5)
        }
    })
    return renderquiz;
}