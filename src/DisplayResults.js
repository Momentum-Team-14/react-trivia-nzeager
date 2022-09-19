export const DisplayResults = ({score, questions}) => {
    let questCount = 1;

    // Fixes questions text output
    const htmlDecode = input => new DOMParser()
    .parseFromString(input, "text/html")
    .documentElement.textContent

    return(
        <>
            <div className='results-score'>
                Final Score: {score}
            </div>
            <div className='recap-label'>Question Recap</div>
            <div>
                {questions.map((question) => (
                    <div className='quest-ans'>
                        <div><span className='question-label'>Question {questCount}:</span> {htmlDecode(question.question)}</div>
                        <div><span className='answer-label'>Answer:</span> {htmlDecode(question.correct_answer)} </div>
                    </div>
                ))}
            </div>
        </>
    )
}