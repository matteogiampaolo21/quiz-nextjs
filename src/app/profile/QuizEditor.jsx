'use client'
import { collection, query, where, getDocs,doc,updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
export const QuizEditor = () => {

    const [quizzes,setQuizzes] = useState([]);
    const [counter, setCounter] = useState(0);
    const [editedQuiz, setEdit] = useState({})

    const getQuizzes = async (userID) => {
        const q = query(collection(db, "quizzes"), where("creator", "==", userID));
        const querySnapshot = await getDocs(q);
        let tempArr = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let tempObj = doc.data();
            tempObj.id = doc.id;
            tempArr.push(tempObj);
        });
        setQuizzes(tempArr);
    }
    
    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getQuizzes(user.uid);
            } else {
                console.log("User is not signed in.")
            }
            });
    },[])

    
    const handleEditQuestion = (e,quesIndex,ansIndex,field) => {
        e.preventDefault();
        let tempObj = {...editedQuiz}; 
        if (field == "answer") {
            // Edit Answers
            tempObj.questions[quesIndex].answers[ansIndex].text = e.target.value; 
        }else{
            // Edit Questions
            tempObj.questions[quesIndex].question = e.target.value; 
        }
        
        setEdit(tempObj);
        console.log(tempObj)
    }
    
    const handleEditQuiz = async (e,quizID) => {
        e.preventDefault()
        console.log(quizID,auth.currentUser.uid)
        const quizRef = doc(db, "quizzes", quizID);
        // Set the "capital" field of the city 'DC'
        try{
            await updateDoc(quizRef, {
                questions:editedQuiz.questions,
            }); 

        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            {quizzes.length > 0 ?
          
                <>
                    {quizzes.map((quiz, index) => 
                        <section key={index} className="border-2 border-black gap-3 flex flex-row px-3  h-max">
                            <h3 className="text-2xl">{quiz.title}</h3>
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
                    {editedQuiz.questions.map((question,index) => 
                        <div className="flex flex-col gap-3 mb-5" key={index}>
                            <p>Question {index+1}</p>
                            <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Question" value={question.question} onChange={(e) => handleEditQuestion(e,index,null,"question")} type="text" />
                            <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Correct Answer" value={question.answers[0].text} onChange={(e) => handleEditQuestion(e,index,0,"answer")} type="text" />
                            <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Incorrect Answer 2" value={question.answers[1].text} onChange={(e) => handleEditQuestion(e,index,1,"answer")} type="text" />
                            <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Incorrect Answer 3" value={question.answers[2].text} onChange={(e) => handleEditQuestion(e,index,2,"answer")} type="text" />
                            <input className="p-0 placeholder:text-neutral-600 px-2" placeholder="Incorrect Answer 4" value={question.answers[3].text} onChange={(e) => handleEditQuestion(e,index,3,"answer")} type="text" />
                        </div>
                    )}
                    <button onClick={(e) => {handleEditQuiz(e,editedQuiz.id)}} className="border-black border-2 hover:bg-neutral-300">Edit Quiz</button>
                </form>  
            }

        </>
    )
}

