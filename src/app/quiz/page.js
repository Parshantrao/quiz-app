import Questions from "@/components/question"
import "./page.css"
import { isValidCategory, isValidOption } from "@/constants"
import { redirect } from "next/navigation"

export default async function QuizPage({ searchParams }) {
    const {category,limit,difficulty} = searchParams
    console.log(category,limit,difficulty)
    const apiResponse = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${limit}&type=multiple&difficulty=${difficulty}`)

    const apiData = await apiResponse.json()
    
   if(!(isValidOption(difficulty) && isValidCategory(category))){
    redirect("/")
   }


    return (
        <div
            className={`min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600`}
        >
            <div className="bg-white rounded-md p-6 min-w-[600px] w-full md:w-4/5 lg:w-2/3">
               <Questions category={category} limit={limit} difficulty={difficulty} apiData={apiData} />
            </div>
        </div>
    )
}