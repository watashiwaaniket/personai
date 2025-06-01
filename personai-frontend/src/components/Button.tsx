import { ReactElement } from "react";

export interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon ?: ReactElement;
    endIcon ?: ReactElement;
    onClick ?: () => void;
}

export const Button = ( props : ButtonProps ) => {
    return (
    <button className={`
        p-2 px-6 min-w-28 rounded-xl font-medium m-2
        ${(props.variant == 'primary') ? 'bg-emerald-400 text-white' : 'bg-emerald-100 text-emerald-600'} 
        ${(props.size == "sm") && 'text-sm' || (props.size == "lg") &&'text-lg' || (props.size == "md") && 'text-md'}
        flex justify-center items-center
    `}
        onClick={props.onClick}
    >
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
        {props.text}
        {props.endIcon ? <div className="pl-2">{props.endIcon}</div> : null}
    </button>
    )
}
