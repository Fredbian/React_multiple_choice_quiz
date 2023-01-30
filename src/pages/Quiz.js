import React from 'react'
import { useState, useEffect } from 'react'
// import Question from '../components/Question'

export default function Quiz() {

    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentQuestionText, setCurrentQuestionText] = useState('')
    const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState('')
    const [options, setOptions] = useState([])


    // get a random number
    const getRandomNum = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    // fetch questions from API
    async function getQuestions() {
        setLoading(true)
        await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getQuestions()
    }, [])

    useEffect(() => {
        if (questions?.length) {
            const currentQuestion = questions[currentQuestionIndex]
            let answers = [...currentQuestion.incorrect_answers]
            answers.splice(getRandomNum(currentQuestion.incorrect_answers.length), 0, currentQuestion.correct_answer)
            setOptions(answers)
            setCurrentQuestionText(currentQuestion.question)
            setCurrentCorrectAnswer(currentQuestion.correct_answer)
        }
    }, [questions, currentQuestionIndex])

    // handle answer click
    function handleAnswer(e) {
        if (e.target.textContent === currentCorrectAnswer) {
            setScore(prevScore => prevScore += 1)
            console.log(score);
        }

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            setShowResult(true)
        }
    }

    // show score
    // useEffect(() => {
    //     if (currentQuestionIndex + 1 === questions.length) {
    //         setShowResult(true)
    //     }
    // }, [currentQuestionIndex, questions])

    // handle restart
    function handleRestart() {
        setScore(0)
        setCurrentQuestionIndex(0)
        setShowResult(false)
    }

    // console.log(questions)

    // get current question
    // const currentQuestion = questions[currentQuestionIndex]

    // if (currentQuestion) {   
    //     const questionText = currentQuestion.question
    //     const correct = currentQuestion.correct_answer
    //     const incorrect = currentQuestion.incorrect_answers
    //     const options = [...incorrect]
    //     const getRandomNum = (max) => {
    //         return Math.floor(Math.random() * Math.floor(max))
    //     }
    //     options.splice(getRandomNum(incorrect.length), 0, correct)

    //     setQuestion({
    //         questionText: questionText,
    //         correct: correct,
    //         incorrect: incorrect,
    //         options: options
    //     })
    // }

    // function log() {
    //     const currentQuestion = questions[currentQuestionIndex]
    //     console.log(currentQuestion)
    // }

    // useEffect(() => {
    //     log()
    // }, [questions])



    if (loading) {
        return (
            <h1 className='loading'>loading...</h1>
        )
    }

    return (
        <div className='main-container'>
            {showResult ?
                <div className='score'>
                    <h3>Game Over</h3>
                    <div>Score : {score} / {questions.length}</div>
                    <button onClick={handleRestart}>Restart Game</button>
                </div>
                :
                <>
                    <div className='quiz-btn-container'>
                        <button className='quiz-btn'>Previous</button>
                        <button className='quiz-btn'>Next</button>
                    </div>
                    <div className='question-container'>
                        <div>
                            <p>Question {currentQuestionIndex + 1} out of 5</p>
                            <h5>{currentQuestionText}</h5>
                            {options.map((option, index) => (
                                <div key={index}>
                                    <button onClick={handleAnswer} className='option-btn'>{option}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>Score : {score} / {questions.length}</div>
                </>
            }
        </div>
    )
}