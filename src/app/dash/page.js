import { QuizMaker } from "./QuizMaker";
const Page = () => {
    return(
        <>
            <h1 className="text-3xl">Dash</h1>
            <div className="flex flex-row gap-5">
                <QuizMaker/>
            </div>
        </>
    )
}
export default Page;