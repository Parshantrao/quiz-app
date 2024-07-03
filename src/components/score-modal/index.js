'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import {  useRouter } from "next/navigation"


export default function ShowScore({ showDialog, score, category,limit,setShowScoreDialog}) {
    const router = useRouter()

    return (
        <Dialog open={showDialog} onOpenChange={setShowScoreDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className="text-center bordered border-b-2 pb-4 text-2xl"
                    >
                        {category} Quiz Result
                    </DialogTitle>
                    <DialogDescription 
                    className="text-center pt-5 pb-3 text-xl text-indigo-600 font-semibold"
                    >
                        Score: {score}/{limit}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-center flex-row sm:justify-center ">
                    <Button onClick={()=>router.push("/")} className="bg-indigo-800 hover:bg-indigo-900">Take Quiz Again</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}