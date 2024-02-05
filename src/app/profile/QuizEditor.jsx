'use client'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useEffect, useState } from "react";
export const QuizEditor = () => {

    const [quizzes,setQuizzes] = useState([]);
    const [counter, setCounter] = useState(0);
    const [editedQuiz, setEdit] = useState({})

    const getQuizzes = async () => {
        const q = query(collection(db, "quizzes"));
        const querySnapshot = await getDocs(q);
        let tempArr = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            tempArr.push(doc.data().questions);
        });
        setQuizzes(tempArr);
    }
    
    useEffect(()=> {
        getQuizzes();
    },[])

    const handleClick = (option) => {
        if (option && counter !== questions.length -1) {
            setCounter(counter+1);
        }else if (option){
            console.log("last question")
        }else{
            console.log("wrong answer")
        }
    }

    const handleEditQuestion = (e,index,field) => {
        e.preventDefault();
        console.log(editedQuiz);
        let tempArr = [...editedQuiz]; 
        tempArr[index][field] = e.target.value; 

        setEdit(tempArr);
        console.log(tempArr)
    }

    return (
        <>
            {quizzes.length > 0 ?
          
                <>
                    {quizzes.map((quiz, index) => 
                        <section key={index} className="border-2 border-black flex flex-col px-3  h-max">
                            <h3 className="text-2xl">{quiz[0].question}</h3>
                            <button onClick={() => {setEdit(quiz)}} className="my-1 ml-auto">Edit</button>
                        </section>
                    )}
                </>
            :
                <section>
                </section>
            }
            
            {Object.keys(editedQuiz).length == 0 ?
                <></>
            :
                <form className="col-span-4 flex flex-col gap-3 border-black border-2 w-max p-2">
                    {editedQuiz.map((question,index) => 
                        <div className="flex flex-col gap-3" key={index}>
                            <p>Question {index+1}</p>
                            <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Question" value={question.question} onChange={(e) => handleEditQuestion(e,index,"question")} type="text" />
                            <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Answer 1" value={question.correctAnswer} onChange={(e) => handleEditQuestion(e,index,"correctAnswer")} type="text" />
                            <button onClick={(e) => handleEdit(e)} className="border-black w-full border-2 px-3">Edit Question</button>
                        </div>
                    )}
                </form>  
            }

        </>
    )
}

