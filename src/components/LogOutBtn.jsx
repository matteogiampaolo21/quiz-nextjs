'use client'
import { auth } from "@/firebase/firebase"
import { signOut } from "firebase/auth"
import { useEffect } from "react"

export const LogOutButton = () => {

      const handleLogOut = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
            console.log("Successful sign out")
        }).catch((error) => {
        // An error happened.
            console.log("error:",error)
        });
    }

    return (
        <>
            <button onClick={handleLogOut} className="border-2 border-black px-3 hover:bg-neutral-300">Log Out</button>
        </>
    )
}
