'use client'

import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import Link from "next/link"
import { useState } from "react"

export const QuizFinder = () => {

    const [tags,setTags] = useState("");
    const [quizzes,setQuizzes] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault();

        const quizRef = collection(db, "quizzes");
        const q = query(quizRef, where('tags', 'array-contains-any', tags.split(",")));

        const querySnapshot = await getDocs(q);
        const tempArr = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let tempObj = doc.data();
            tempObj.id = doc.id;
            console.log(doc.id, " => ", doc.data());
            tempArr.push(tempObj);
        });

        setQuizzes(tempArr)


    }
    return(
        <main className="flex flex-col border-black border-2 p-2 w-max">
            <h3 className=" text-xl">Search for a quiz:</h3>
            <form className="grid grid-cols-12 mb-5 w-max justify-around">
                <input value={tags} onChange={(e) => {setTags(e.target.value)}} type="text" className="placeholder:text-neutral-600 col-span-10 text-neutral-600 px-2" placeholder="Search with Tags!" />
                <button onClick={(e) => {handleSearch(e)}} className="border-black hover:bg-neutral-300 col-span-2 w-max px-2 ml-auto border-2">O</button>
            </form>
            {quizzes.length > 0 ?
                <>
                    {quizzes.map((quiz,index) => 
                    <article className="border-black border-2 p-2" key={index}>
                        <Link href={`/${quiz.id}`} className="text-lg hover:ml-2 duration-200 cursor-pointer">{quiz.title}</Link>
                        <p className="text-sm text-neutral-600">{quiz.tags.toString()}</p>
                    </article>        
                    )}
                </>
            :
                <>
                </>
            }
        </main>
    )
}
