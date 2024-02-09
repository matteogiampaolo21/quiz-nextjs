import { QuizEditor } from "./QuizEditor";

const Page = () => {
    return(
        <>
            <div className="mb-5 mt-3">
                <h1 className="text-4xl">Profile</h1>
                <p>Here you can edit your quizzes!</p>
            </div>
            <section className="flex flex-row gap-5">
                <QuizEditor/>
            </section>
        </>
    )
}

export default Page;