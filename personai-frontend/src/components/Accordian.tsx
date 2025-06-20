import { useState } from "react";
import { DownArrowIcon } from "../icons/DownArrowIcon";
import { RightArrowIcon } from "../icons/RightArrowIcon";

export interface AccordianProps{
    question : string;
    answer : string;
}

export function Accordian({question, answer} : AccordianProps){
    const [isOpen,isOpened] = useState(false);
    return(
        <div className=" lg:w-[820px] p-2 border-y-2 m-1">
            <button onClick={() => isOpened(!isOpen)} className="flex flex-col">
                <h1 className="w-96 sm:w-[520px] md:w-[720px] lg:w-[800px] flex justify-between items-center">
                    {question} {isOpen ? <DownArrowIcon /> : <RightArrowIcon />}
                </h1>
                {isOpen ? 
                    <p className="text-slate-600 text-left p-4">
                        {answer} 
                    </p>
                    : null
                }
            </button>
        </div>
    )
}