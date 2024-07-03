import { Loader2 } from "lucide-react";


export default function Loading() {

    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="size-20 text-indigo-500 animate-spin " />

        </div>
        // <div className="text-5xl">Loading</div>
    )
}