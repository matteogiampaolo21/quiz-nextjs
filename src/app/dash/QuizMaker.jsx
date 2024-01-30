'use client'
import { useState } from "react"

export const QuizMaker = () => {
    const [questionObj,setQuestions] = useState([]);
    const [questionInput, setInput] = useState("")
    console.log(questions)

    const addQuestion = (e) => {
        e.preventDefault();
        setQuestions(prev => ([...prev,questionInput]))
        setInput("")
    }

    return(
        <main className="grid grid-cols-10 gap-10">
            <aside className="flex flex-col gap-3 border-black border-2">
                {questions.length == 0 ? <p>No questions here.</p> : <></>}
                {questions.map((question,index) => <button key={index}>{question}</button>)}
            </aside>
            <form className="col-span-9 border-black border-2 h-max p-2">
                <input className="p-0" value={questionInput} onChange={(e) => setInput(e.target.value)} type="text" />
                <button onClick={(e) => addQuestion(e)} className="border-black ml-5 border-2 px-3">Add Question</button>
            </form>
        </main>
    )
}