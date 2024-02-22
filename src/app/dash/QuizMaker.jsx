'use client'
import { useState } from "react"
import { auth, db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export const QuizMaker = () => {
    const [questions,setQuestions] = useState([]);
    
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("")
    const [questionInput, setInput] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    
    const [editedQuestion, setEdit] = useState({})
    // console.log(questions)

    const addQuestion = (e) => {
        e.preventDefault();


        const fullQuestion = {
            question:questionInput,
            answers:[
                {text:answer1,isCorrect:true},
                {text:answer2,isCorrect:false},
                {text:answer3,isCorrect:false},
                {text:answer4,isCorrect:false}
            ]
        }
        setQuestions((prev) => ([...prev,fullQuestion]))

        setInput("");
        setAnswer1("");
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');

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
            title:title,
            tags:tags.split(","),
            questions:questions,
            creator:auth.currentUser.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        setTitle("");
        setTags("");
        setQuestions([]);
        setEdit({})
    }


    const handleEditAnswer = (e,num) => {
        console.log(e,num)
        const editedAnswer = editedQuestion.answers.map((answer,index) => {
            if ( index !== num) {
                return answer;
            }else{
                // console.log(answer.text, e.target.value)
                answer.text = e.target.value;
                return answer
            }
        })
        console.log(editedAnswer)
        setEdit(prev => ({...prev, answers: editedAnswer}))
    }

    return(
        
        <section className="flex flex-col w-max justify-start gap-9">
            <aside className="flex flex-col h-max border-black border-2">
                <input value={title} className="m-2 px-2 placeholder:text-neutral-600" placeholder="Quiz Title" type="text" onChange={(e) => {setTitle(e.target.value)}} />
                <textarea value={tags} className="m-2 px-2 placeholder:text-neutral-600 bg-neutral-300" onChange={(e) => {setTags(e.target.value)}} placeholder="Separate tags by a coma. ex: Cooking,Food,Pastry"/>
                {questions.map((question,index) => 
                    <button 
                        onClick={() => {question.currentIndex = index; setEdit(question);}} 
                        className="hover:bg-neutral-300 w-full border-b" 
                        key={index}>
                        {index+1}
                    </button>
                )}
                {questions.length == 0 ? <p className="text-center mb-2">No questions here.</p> :
                    <button onClick={completeQuiz} className="bg-emerald-300 hover:bg-emerald-400 border-t-2 border-black">Complete Quiz</button>
                }
            </aside>
            <form className="col-span-4 flex flex-col h-max gap-3 border-black border-2 w-max p-2">
                <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Question" value={questionInput} onChange={(e) => setInput(e.target.value)} type="text" />
                <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Correct Answer" value={answer1} onChange={(e) => setAnswer1(e.target.value)} type="text" />
                <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Incorrect Answer" value={answer2} onChange={(e) => setAnswer2(e.target.value)} type="text" />
                <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Incorrect Answer" value={answer3} onChange={(e) => setAnswer3(e.target.value)} type="text" />
                <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Incorrect Answer" value={answer4} onChange={(e) => setAnswer4(e.target.value)} type="text" />
                <button onClick={(e) => addQuestion(e)} className="border-black w-full border-2 px-3">Add Question</button>
            </form>


            {Object.keys(editedQuestion).length == 0 ?
                <></>
            :
                <form className="col-span-4 flex flex-col gap-3 border-black border-2 w-max p-2">
                    <button className="ml-auto " onClick={() => {setEdit({})}}>Hide</button>
                    <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Question" value={editedQuestion.question} onChange={(e) => setEdit(prev => ({...prev, question: e.target.value}))} type="text" />
                    <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Correct Answer" value={editedQuestion.answers[0].text} onChange={(e) => handleEditAnswer(e,0)} type="text" />
                    <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Incorrect Answer" value={editedQuestion.answers[1].text} onChange={(e) => handleEditAnswer(e,1)} type="text" />
                    <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Incorrect Answer" value={editedQuestion.answers[2].text} onChange={(e) => handleEditAnswer(e,2)} type="text" />
                    <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Incorrect Answer" value={editedQuestion.answers[3].text} onChange={(e) => handleEditAnswer(e,3)} type="text" />
                    <button onClick={(e) => handleEdit(e)} className="border-black w-full border-2 px-3">Edit Question</button>
                </form>  
            }

        </section>
    )
}