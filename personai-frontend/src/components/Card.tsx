import { DeleteIcon } from "../icons/DeleteIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Tweet } from 'react-tweet';
import { Button } from "./Button";

export interface CardButtonProps {
    title: string;
    dateAdded: string;
    link?: string;
    type: string;
    tags?: string[];
    shareHandler?: () => void;
    deleteHandler?: () => void;
    contextHandler?: () => void;
    context: string;
    onContextClick?: () => void;
}


export function extractCodeFromUrl(url : string) {
    const parts = url.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2];
}
    

export function Card(props: CardButtonProps) {
    if (!props.link) {
        console.error("Link is undefined or empty.");
        return;
    }
    const code = extractCodeFromUrl(props.link)

    return (
        <div className="bg-white border shadow-sm rounded-lg w-80 h-96 m-4">
            <div className="w-80 h-80 flex flex-col p-2">
                <div className="flex justify-between w-full h-12 items-center">
                    <div className="flex items-center">
                        <PlusIcon size="md" color="text-slate-800"/>
                        <p className="font-semibold text-lg text-gray-700">{props.title}</p>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={props.shareHandler}><ShareIcon size="md" color="text-slate-400"/></button>
                        <button onClick={props.deleteHandler}><DeleteIcon size="md" color="text-slate-400"/></button>
                    </div>
                </div>
                <div className="p-2 overflow-scroll z-0" data-theme="light">
                    {
                        (props.link) && (props.type == "twitter") && <Tweet id={code} />
                        ||
                        (props.link) && (props.type == "youtube") &&
                        <iframe className="w-full rounded-md" src={props.link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    }
                </div>
                <div className="p-2 text-emerald-600 flex text-sm">
                    {props.tags?.map((tag, idx) => (
                        <p key={idx} className="bg-emerald-100 px-2 rounded-xl mr-1">
                            {tag}
                        </p>
                    ))}
                    
                </div>
                <div className="p-2 text-gray-400 text-sm">
                    Added on {props.dateAdded}
                </div>
            </div>
            <div className="flex w-full justify-center items-center">
                <Button text="get context" variant="secondary" size="sm" onClick={props.onContextClick}/>
            </div>
        </div>
    )
}