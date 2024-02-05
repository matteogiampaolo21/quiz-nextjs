import { QuizEditor } from "./QuizEditor";

const Page = () => {
    return(
        <>
            <h1 className="text-4xl mb-5 mt-3">Profile</h1>
            <section className="flex flex-row gap-5">
                <QuizEditor/>
            </section>
        </>
    )
}

export default Page;