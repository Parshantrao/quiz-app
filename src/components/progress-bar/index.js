import { Progress } from "@/components/ui/progress"


export default function ProgressBarComp({progress}){
    

    return (
        <div className="w-full">
            <Progress value={progress} className="w-full" />
        </div>
    )
}