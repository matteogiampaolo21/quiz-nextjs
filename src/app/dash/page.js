import { QuizMaker } from "./QuizMaker";
import { QuizFinder } from "./QuizFinder";
const Page = () => {
    return(
        <>
            <div className="my-5 border-black border-2 p-5 w-max">
                <h1 className="text-3xl">Dash</h1>
                <p>Create Quizzes and complete them!</p>

            </div>
            <div className="flex flex-row gap-5 mb-20 border-neutral-400 w-max border-t-2 pt-5">
                <aside className="border-r-2 border-neutral-400  pr-5">
                    <h2 className="text-2xl mb-5">Create Quiz</h2>
                    <QuizMaker />
                </aside>
                <QuizFinder />
            </div>
        </>
    )
}
export default Page;