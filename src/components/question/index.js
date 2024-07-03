'use client';
import ProgressBarComp from "@/components/progress-bar";
import { categoryOptions } from "@/constants";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Button } from "../ui/button";
import ShowScore from "../score-modal";
import { useRouter } from "next/navigation";
export default function Questions({ category, limit, difficulty, apiData }) {

    const router = useRouter()

    const [progress, setProgress] = useState(0)
    const [score, setScore] = useState(0)
    const [key, setKey] = useState(0);

    const [questionNumber, setQuestionNumber] = useState(1)
    const [question, setQuestion] = useState(apiData[0])

    const [correctAnswer, setCorrectAnswer] = useState("")
    const [selectedAnwser, setSelectedAnswer] = useState("")

    const [shuffledArray, setShuffledArray] = useState([])

    const [showScoreDialog, setShowScoreDialog] = useState(false)
    const [showExitBtn, setShowExitBtn] = useState(false)

    const optionsPrefixArray = ["A", "B", "C", "D"]

    const shuffleArray = (question) => {

        const { incorrectAnswers, correctAnswer } = question
        setCorrectAnswer(correctAnswer)
        const shuffledAnwsers = [...incorrectAnswers]
        shuffledAnwsers.sort(() => Math.random() - 0.5)
        const randomIndex = Math.floor(
            Math.random() * (shuffledAnwsers.length + 1)
        )
        shuffledAnwsers.splice(randomIndex, 0, correctAnswer)
        setShuffledArray([...shuffledAnwsers])
    }

    function handleSelectedAnswer(answer) {
        if (selectedAnwser === answer && selectedAnwser === correctAnswer) {
            return 'correct'
        }
        else if (selectedAnwser === answer && selectedAnwser !== correctAnswer) {
            return 'incorrect'
        }
        else if (answer === correctAnswer) return 'correct'
        return ""
    }

    function handleOptionClick(item) {
        setSelectedAnswer(item)
        if (item === correctAnswer) setScore(score + 1)
        if (questionNumber < limit) {
            setTimeout(() => {
                getNextQuestion(questionNumber + 1)
                setQuestionNumber(questionNumber + 1)
            }, 1000);
        }
        else if (questionNumber == limit) {
            setShowScoreDialog(true)
            setShowExitBtn(true)
        } 


    }

    function handleProgressBar(questionNumber) {
        setProgress((100 / limit) * questionNumber)
    }

    function handleTimeComplete() {
        if (limit > questionNumber) {
            getNextQuestion(questionNumber + 1)
            setQuestionNumber(questionNumber + 1)
        }
        else if (questionNumber === limit) {
            setShowScoreDialog(true)
            setShowExitBtn(true)
        }
    }

    function getNextQuestion(questionNumber) {
        setSelectedAnswer("")
        setCorrectAnswer("")
        handleProgressBar(questionNumber)
        setQuestion(apiData[questionNumber - 1])
        shuffleArray(apiData[questionNumber - 1])
        setKey(key + 1)
    }

    function handleShowScore() {
        let categoryString = categoryOptions.filter(elem => elem.value === category)[0].option
        return (
            <ShowScore category={categoryString} score={score} />
        )
    }

    useEffect(() => {
        shuffleArray(apiData[questionNumber - 1])
    }, [])

    useEffect(() => {

    }, [questionNumber])



    return (
        <div>
            <ProgressBarComp progress={progress} />
            <div className="flex justify-between items-center py-6 bprderd border-b ">
                <div className="md:text-xl font-semibold">
                    {
                        categoryOptions.filter(elem => elem.value === category)[0]?.option
                    }
                </div>
                <div>
                    <span className="md:text-xl font-semibold">Score: {score}</span>
                </div>
                <div className="md:text-xl">
                    <CountdownCircleTimer
                        isPlaying={!selectedAnwser}
                        duration={15}
                        key={key}
                        colors={['#004777', '#03ad20', '#9fad03', '#ad5303', '#A30000']}
                        colorsTime={[15, 10, 7, 4, 0]}
                        size={70}
                        strokeWidth={8}
                        onComplete={handleTimeComplete}
                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center flex-col">
                    <span className="md:text-2xl font-semibold">{`Q${questionNumber}. ${question?.question}`}</span>
                    <div className="w-full py-4 md:py-5 xl:py-7 flex flex-col gap-y-3 md:gap-y-5">
                        {
                            shuffledArray.map((item, idx) => (
                                // <div
                                // key={idx}
                                //     onClick={() => setSelectedAnswer(item)}
                                //     className={`bordered border-2 rounded text-center p-3 cursor-pointer ${selectedAnwser?item === selectedAnwser ? selectedAnwser === correctAnswer ? "bg-green-700":"bg-red-700":item===correctAnswer?"bg-green-700":"" :""}`}
                                // >
                                //     {`${optionsPrefixArray[idx]}. ${item}`}
                                // </div>
                                <button
                                    key={idx}
                                    className={`option ${selectedAnwser && handleSelectedAnswer(item)} md:text-xl`}
                                    disabled={!!selectedAnwser}
                                    onClick={() => handleOptionClick(item)}
                                >
                                    {`${optionsPrefixArray[idx]}. ${item}`}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="text-center ">
                {showExitBtn && <Button onClick={() => { router.push("/") }} className="md:text-xl px-6 py-6 font-semibold">Exit</Button>}
            </div>
            <ShowScore showDialog={showScoreDialog} setShowScoreDialog={setShowScoreDialog} limit={limit} score={score} category={categoryOptions.filter(elem => elem.value === category)[0]?.option} />
        </div>
    )
}