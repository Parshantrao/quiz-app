'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { SliderRange, Slider, SliderThumb, SliderTrack } from "@radix-ui/react-slider";
import { categoryOptions, difficultyOptions } from "@/constants";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function QuizSetting() {
    let [noOfQuestions, setnoOfQuestions] = useState(10)
    let [category,setCategory] = useState("")
    let [difficultyLevel,setDifficultyLevel]=useState("")
    const router = useRouter()
    return (
        <div className="flex items-center flex-col gap-y-6 my-auto">
            <div className="w-full">
                <Select onValueChange={(val)=>setCategory(val)}>
                    <SelectTrigger className="ring-0 focus:ring-2 focus:ring-blue-300 md:text-xl">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                categoryOptions.map((category, idx) => {
                                    return (
                                        <SelectItem key={idx} className="md:text-xl" value={category.value}>{category.option}</SelectItem>
                                    )
                                })
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full">
                <Select onValueChange={(val)=>setDifficultyLevel(val)}>
                    <SelectTrigger className="ring-0 focus:ring-2 focus:ring-blue-300 md:text-xl">
                        <SelectValue placeholder="Select Difficulty Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                difficultyOptions.map((category, idx) => {
                                    return (
                                        <SelectItem key={idx} className="md:text-xl" value={category.value}>{category.option}</SelectItem>
                                    )
                                })
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col w-full gap-y-5">
                <div className="flex justify-center">
                    <span className="text-xl"><b>Total number of Questions:</b> {noOfQuestions}</span>
                </div>
                <Slider
                    defaultValue={[noOfQuestions]}
                    orientation="horizontal"
                    max={100}
                    step={5}
                    value={[noOfQuestions]}
                    onValueChange={(e) => setnoOfQuestions(e)}
                    className="relative flex items-center w-full h-4"
                >
                    <SliderTrack className="relative flex-1 h-2 bg-gray-300 rounded">
                        <SliderRange className="absolute h-full bg-blue-500 rounded" />
                    </SliderTrack>
                    <SliderThumb className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />

                </Slider>
            </div>
            <div>
                <Button onClick={()=>{
                    router.push(`/quiz?category=${category}&difficulty=${difficultyLevel}&limit=${noOfQuestions}`)
                }} disabled={category && difficultyLevel ? false : true} className="text-xl bg-blue-500 font-semibold disabled:opacity-55 hover:bg-blue-700">Start Quiz</Button>
            </div>
        </div>
    )
} 