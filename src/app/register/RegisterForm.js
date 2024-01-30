'use client'
import { useState } from "react"
import {auth} from '../../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            router.push('/dash')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
            // ..
        });

        console.log(email,password)
    }
    return(
        <form className='flex flex-row gap-5'>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email"></input>
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password"></input>
            <button onClick={handleSubmit} className="border-black border-2 px-3">Register</button>
        </form>
    )
}