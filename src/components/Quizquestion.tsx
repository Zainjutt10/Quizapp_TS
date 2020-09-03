import React, { useState } from 'react';
import { quizquestion } from '../services/service';
import { filteredQ } from '../Types/Types';
import Questionrender from './Questionrender';
import Button from '@material-ui/core/Button';
import Quiz from './Quizquestion';
import {motion} from 'framer-motion';
import "../App.css";
function Quizquestion() {
    let [quiz, setquiz] = useState<filteredQ[]>([]);
    let [counter, setcounter] = useState(0);
    let [quesno, setquesno] = useState(1);
    let [category, setcategory] = useState(21);
    let [difficult, setdifficulty] = useState('easy');
    let [btnclick, setclick] = useState(false);
    let [score, setscore] = useState(0);
    let [result, showresult] = useState(false);
    let [success, setsuccess] = useState(false);
    let [render, setrender] = useState(false);

    async function fetchdata(quesno: number, category: number, difficult: string) {

        const result = await quizquestion(quesno, category, difficult);
        // console.log(result);
        setquiz(result);

    }

    function onsubmit(e: React.FormEvent<EventTarget>, submittedanswer: string) {
        e.preventDefault();
        const correctanswer = quiz[counter].answer;
        if (correctanswer === submittedanswer) {
            setscore(++score);
        }
        
        if (quiz.length - 1 === counter) {
            showresult(true);
            setcounter(0);
            //  setscore(0);
            return;
        }
        setcounter(++counter);
    }

    if (result) {

        if ((score / quesno) * 100 > 80) {
            setsuccess(true);
        }

        return (

            <div className="result">
                {success ? <h1>Congratulations!!</h1> : <h1>Next Time Better Luck</h1>}
                <h4>Your Score is {score}  out of: {quesno} </h4>
                <Button variant="contained" color="secondary"
                    onClick={() => {
                        setrender(true);
                        showresult(false);
                        setscore(0);
                        setclick(false);
                        setquesno(1);
                        setcounter(0);
                    }}>Try Again</Button>
                {render ? <div>{setrender(false)} <Quiz /></div> : null}
            </div>)

    }
    const objectcategory = [{
        name: 'Sports',
        id: 21
    }, {
        name: 'History',
        id: 23
    }, {
        name: 'Arts',
        id: 25
    }, {
        name: 'Poltics',
        id: 24
    }, {
        name: 'Celebrities',
        id: 26
    }]
    const difficategory: string[] = ["easy", "medium", "hard"]
    if (!btnclick) {
        return (
            <div className="front">
                <h1>Quiz App</h1>

                <div className="inputtag">
                    <input onChange={(e: any) => {
                        if (e.target.value > 1) {
                            setquesno(e.target.value)
                        }
                        else if(e.target.value<=0){
                            setquesno(1);
                        }
                        
                    }} type="number" 
                    placeholder="1"
                    
                     />

                    <div> <select onChange={(e) => {
                        const name = e.target.value;
                        objectcategory.map((opt) => {
                            if (opt.name === name) {
                                setcategory(opt.id);
                            }
                        })
                    }}> {objectcategory.map((opt, ind: number) => {
                        return <option key={ind}>{opt.name}</option>
                    })}
                    </select></div>
                    <div><select onChange={(e) => {
                        setdifficulty(e.target.value);
                    }}>
                        {difficategory.map((opt: string, ind: number) => {
                            return <option key={ind}>{opt}</option>
                        })}
                    </select></div>

                    <Button variant="contained" type="submit" onClick={() => {
                        setclick(true);
                        fetchdata(quesno, category, difficult);
                    }}>Get Quiz</Button>

                </div>
            </div>
        )
    }
    return (
        <div className="App">
            {quiz.length !== 0 ? <Questionrender
                question={quiz[counter].question}
                option={quiz[counter].option}
                answer={quiz[counter].answer}
                submit={onsubmit}
            /> : <svg height="100" width="100">
                    <motion.circle 
                     cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"
                        initial={{y:'20vw'}}
                        animate={{y:0}}
                        transition={{rotate:Infinity,repeatDelay:1}}
                    />            </svg>}
        </div>
    );
}

export default Quizquestion;
