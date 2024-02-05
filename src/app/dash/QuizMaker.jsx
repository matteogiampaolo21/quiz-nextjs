'use client'
import { useState } from "react"
import { auth, db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export const QuizMaker = () => {
    const [questions,setQuestions] = useState([]);
    const [questionInput, setInput] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [editedQuestion, setEdit] = useState({})
    // console.log(questions)

    const addQuestion = (e) => {
        e.preventDefault();


        const fullQuestion = {
            question:questionInput,
            correctAnswer:answer1,
        }
        setQuestions((prev) => ([...prev,fullQuestion]))

        setInput("")
        setAnswer1("")
    }

    const handleEdit = (e) => {
        e.preventDefault();
        console.log("edited:",editedQuestion)
        console.log("index:", editedQuestion.currentIndex);
        let tempArr = [...questions];
        tempArr[editedQuestion.currentIndex] = editedQuestion;
        setQuestions(tempArr)

    }

    const completeQuiz = async () => {
        console.log(questions,auth.currentUser.uid)
        const docRef = await addDoc(collection(db, "quizzes"), {
            // Add the quiz
            questions:questions,
            creator:auth.currentUser.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        setQuestions([]);
        setEdit({})
    }

    return(
        
        <section className="flex flex-row w-max justify-start gap-9">
            <aside className="flex flex-col h-max border-black border-2">
                {questions.map((question,index) => 
                    <button 
                        onClick={() => {question.currentIndex = index; setEdit(question); console.log(question)}} 
                        className="hover:bg-neutral-300 w-36 border-b" 
                        key={index}>
                        {index+1}
                    </button>
                )}
                {questions.length == 0 ? <p>No questions here.</p> :
                    <button onClick={completeQuiz} className="bg-emerald-300 hover:bg-emerald-400 border-t-2 border-black">Complete Quiz</button>
                }
            </aside>
            <form className="col-span-4 flex flex-col h-max gap-3 border-black border-2 w-max p-2">
                <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Question" value={questionInput} onChange={(e) => setInput(e.target.value)} type="text" />
                <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Answer 1" value={answer1} onChange={(e) => setAnswer1(e.target.value)} type="text" />
                <button onClick={(e) => addQuestion(e)} className="border-black w-full border-2 px-3">Add Question</button>
            </form>


            {Object.keys(editedQuestion).length == 0 ?
                <></>
            :
                <form className="col-span-4 flex flex-col gap-3 border-black border-2 w-max p-2">
                    <button className="ml-auto " onClick={() => {setEdit({})}}>Hide</button>
                    <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Question" value={editedQuestion.question} onChange={(e) => setEdit(prev => ({...prev, question: e.target.value}))} type="text" />
                    <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Answer 1" value={editedQuestion.correctAnswer} onChange={(e) => setEdit(prev => ({...prev, correctAnswer: e.target.value}))} type="text" />
                    <button onClick={(e) => handleEdit(e)} className="border-black w-full border-2 px-3">Edit Question</button>
                </form>  
            }

        </section>
    )
}