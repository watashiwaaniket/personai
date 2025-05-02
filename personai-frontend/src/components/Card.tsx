import { DeleteIcon } from "../icons/DeleteIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";

export interface CardButtonProps {
    dateAdded: string;
    tags: string[];
    shareHandler: () => void;
    deleteHandler: () => void;
}

export function Card(props: CardButtonProps) {
    return (
    <>
        <div className="p-2 bg-white border shadow-sm rounded-lg max-w-64 h-80 m-4 flex flex-col">
            <div className="flex justify-between w-full h-12 items-center">
                <div className="flex items-center">
                    <PlusIcon size="md" color="text-slate-800"/>
                    <p className="font-semibold text-lg text-gray-700">Content Title</p>
                </div>
                <div className="flex justify-between">
                    <button onClick={props.shareHandler}><ShareIcon size="md" color="text-slate-400"/></button>
                    <button onClick={props.deleteHandler}><DeleteIcon size="md" color="text-slate-400"/></button>
                </div>
            </div>
            <div className="p-2">
                <iframe className="w-full rounded-md" src="https://www.youtube.com/embed/ftYmXoH0V5I?si=VOSaioXDM-yE_28f" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="p-2 text-emerald-600 flex text-sm">
                {props.tags.map((tag, idx) => (
                    <p key={idx} className="bg-emerald-100 px-2 rounded-xl mr-1">
                        {tag}
                    </p>
                ))}
            </div>
            <div className="p-2 text-gray-400 text-sm">
                Added on {props.dateAdded}
            </div>
        </div>
    </>
    )
}