'use client'
import { useParams } from "next/navigation";
import {doc, getDoc} from 'firebase/firestore';
import { db } from "@/firebase/firebase";
import { useEffect } from "react";

export const QuizPlayer = () => {
    const params = useParams();

    const getQuiz = async () => {
        const docRef = doc(db, "quizzes", params.quizId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getQuiz();
    })

    return(
        <section>
            <h1>Hello</h1>
        </section>
    )
}