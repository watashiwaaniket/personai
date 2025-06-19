import { useState } from "react";

export interface AccordianProps{
    question : string;
    answer : string;
}

export function Accordian({question, answer} : AccordianProps){
    const isOpen = useState(false);
    return(
        <button>
            {question}
            {isOpen ? answer : ''}
        </button>
    )
}