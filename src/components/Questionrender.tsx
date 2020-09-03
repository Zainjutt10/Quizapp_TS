import React, { useState } from 'react';
import { questiontype } from '../Types/Types';
import Button from '@material-ui/core/Button';


const Questionrender: React.FC<questiontype> = ({ question, option, answer, submit }) => {
    let [opt, setopt] = useState("");
    let [flag, setflag] = useState(false);
    const onchange = (e: any) => {
        setopt(e.target.value);
        if (answer !== e.target.value) {
            setflag(true);
        }
    }
    return (<div className="question">
        <h1>Quiz App</h1>
        <h2>{question}</h2>
        <form onSubmit={(e) => submit(e, opt)} className="form">
            {option.map((option: string, ind: number) => {
                return (
                    <div className="control" key={ind}>
                        <label className="radio" >
                            <input onChange={onchange} type="radio" required checked={opt === option} name="option" value={option} />
                            {option}
                        </label>
                    </div>
                )
            })}
            {flag ?
                <div><h3>Correct Answer is {answer}</h3>
                </div> : null}

            <Button type="submit" variant="outlined" color="secondary" style={{ margin: '20px 0' }}
                onClick={() => { setflag(false) }}
            >
                Submit
          </Button>
        </form>
    </div>)
}

export default Questionrender;