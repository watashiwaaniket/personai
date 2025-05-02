import { DeleteIcon } from "../icons/DeleteIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";

export function Card() {
    return <div className="p-4 bg-white border shadow-sm rounded-md max-w-72 h-96 m-4 flex">
        <div className="flex justify-between w-full h-12 items-center">
            <div className="flex items-center">
                <PlusIcon size="lg" color="text-slate-800"/>
                <p className="pl-4 font-semibold text-lg ">Content Title</p>
            </div>
            <div className="flex justify-between">
                <ShareIcon size="lg" color="text-slate-400"/>
                <DeleteIcon size="lg" color="text-slate-400"/>
            </div>
        </div>
    </div>
}