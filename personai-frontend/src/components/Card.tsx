import { DeleteIcon } from "../icons/DeleteIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Tweet } from 'react-tweet';

export interface CardButtonProps {
    title: string;
    dateAdded: string;
    link?: string;
    type: string;
    tags: string[];
    shareHandler: () => void;
    deleteHandler: () => void;
}

export function Card(props: CardButtonProps) {
    return (
    <>
        <div className="p-2 bg-white border shadow-sm rounded-lg w-80 h-96 m-4 flex flex-col">
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
                    (props.link) && (props.type == "tweet") && <Tweet id={props.link} />
                    ||
                    (props.link) && (props.type == "youtube") &&
                    <iframe className="w-full rounded-md" src={props.link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }
                
                

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