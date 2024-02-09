import { QuizMaker } from "./QuizMaker";
import { QuizFinder } from "./QuizFinder";
const Page = () => {
    return(
        <>
            <div className="my-5">
                <h1 className="text-3xl">Dash</h1>
                <p>Create Quizzes and complete them!</p>

            </div>
            <div className="flex flex-row gap-5">
                <QuizMaker />
                <QuizFinder />
            </div>
        </>
    )
}
export default Page;