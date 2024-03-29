'use client'
import { useParams } from "next/navigation";
import {count, doc, getDoc} from 'firebase/firestore';
import { db } from "@/firebase/firebase";
import { useEffect, useState } from "react";

export const QuizPlayer = () => {
    // Get Parameters
    const params = useParams();

    // Set the requested Quiz
    const [quiz,setQuiz] = useState(null);

    // Set the shuffled questions
    const [shuffledQuestions, setShuffle] = useState([])

    // Keep track of which question user is on
    const [counter,setCounter] = useState(0);

    // Keep track if user is able to continue to next question
    const [isNextBtnDisalbled,setNextBtnDisabled] = useState(true)

    //Keep track of users score 
    const [score,setScore] = useState(0);

    
    // Get quiz from database
    const getQuiz = async () => {
        const docRef = doc(db, "quizzes", params.quizId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setQuiz(docSnap.data());
            setShuffle(shuffleArray(docSnap.data().questions[counter].answers))
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    useEffect(() => {
        getQuiz();
    },[])


    // Check if the clicked option is correct, last question, and increase score.
    const checkAnswer = (e,isCorrect) => {

        if(!isCorrect){
            Array.from(document.getElementsByClassName("option-btn")).forEach((btn) => {
                btn.disabled = true;
                setNextBtnDisabled(false)
            })
        }
        else if (counter < quiz.questions.length -1 && isCorrect) {
            // setCounter(counter+1);
            setNextBtnDisabled(false);
            e.currentTarget.disabled = true

        }else if (counter === quiz.questions.length -1 && isCorrect){
            console.log("Last question and Correct");
        }
    }

    const nextQuestion = () => {
        console.log("fe")
        for (const btn of document.getElementsByTagName("button")){
            console.log(btn.disabled = false)
        }
        setShuffle(shuffleArray(quiz.questions[counter +1].answers))
        setCounter(counter+1);
        setNextBtnDisabled(true)
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        };
        return array
    }
    
    // const handleWrongAnswer = (e) => {
    //     checkAnswer(false);
    //     e.currentTarget.disabled = true;
    // }


    return(
        <section>
            {quiz ?
                <main className="mt-10">
                    <h2 className="font-bold text-3xl mb-5">{quiz.title}</h2>
                    <article className="border-black border-2 w-max p-5 grid grid-cols-2 ">
                        <p className="text-xl mb-3">{quiz.questions[counter].question}</p>
                        <p className="text-xl mb-3 text-right">Question {counter+1}</p>
                        <div className="grid grid-cols-2 gap-1 col-span-2">
                            {shuffledQuestions.map((answer,index) => 
                                <button key={index} onClick={(e) => {checkAnswer(e,answer.isCorrect)}} className={`option-btn border-black border-2 p-2 ${answer.isCorrect ? "disabled:bg-green-500" : "disabled:bg-red-500"} hover:bg-neutral-200`}>{answer.text}</button>
                            )}
                        </div>
                        <button id="Next-btn" disabled={isNextBtnDisalbled} onClick={nextQuestion} className="border-black disabled:border-neutral-500 disabled:text-neutral-600 disabled:bg-neutral-300 mt-1 w-max col-span-2 ml-auto border-2 p-2 hover:bg-neutral-200">Next Question</button>
                    </article>
                </main>
            :
                <></>
            }
        </section>
    )
}