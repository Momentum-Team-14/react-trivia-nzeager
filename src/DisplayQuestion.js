import _ from 'lodash'
import { useState } from 'react'
import { DisplayFeedback } from './DisplayFeeback'

export const DisplayQuestion = ({setCatID, questIndex, setQuestIndex, score, setScore, questions, category}) => {

    // tracks whether question has been answered to display feedback
    const [feedback, setFeedback] = useState(false)

    // Fixes questions text output
    const htmlDecode = input => new DOMParser()
        .parseFromString(input, "text/html")
        .documentElement.textContent

    let question = htmlDecode(questions[questIndex].question)
    let correctAnswer = questions[questIndex].correct_answer

    let options=[]
    options=[...questions[questIndex].incorrect_answers,questions[questIndex].correct_answer]
    let shuffleOptions = _.shuffle(options)

    // tracks whether user answers question correctly
    let status = ''

    // Determines what happens to states when clicking a correct/incorrect answer option
    const handleClick = (answer) => {
        if (answer === 'correct') {
            setScore(score+1)
        }
        // setQuestIndex(questIndex+1)
    }

    return(
        <>
            <div className='title'> 
                {category} Quiz 
            </div>
            <div className='score'>
                Score: {score}
            </div>
            <div className='question'> 
                Question {questIndex+1}: {question}
            </div>
            {shuffleOptions.map((option) => (
                // <div onClick={(option === correctAnswer) ? handleClick('correct') : handleClick('incorrect')}>
                <div onClick={() => {
                    // setQuestIndex(questIndex+1);
                    (option === correctAnswer) ? setScore(score + 1) : setScore(score);
                    (option === correctAnswer) ? status='C' : status='I';
                    setFeedback(true)
                }}>
                    {htmlDecode(option)}
                </div>
            ))}
            {(feedback === true) && <DisplayFeedback status={status} correctAnswer={correctAnswer} questIndex={questIndex} setQuestIndex={setQuestIndex} setFeedback={setFeedback} />}
            <div>
                <button onClick={() => {setCatID(null)}}> Return to Categories </button>
            </div>
        </>
    )
}