import { ReactElement } from "react";

export interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon ?: ReactElement;
    endIcon ?: ReactElement;
    onClick ?: () => void;
    fullWidth ?: boolean;
    loading ?: boolean;
}

export const Button = ( props : ButtonProps ) => {
    return (
    <button className={`
        font-medium m-2
        ${(props.variant == 'primary') ? 'bg-emerald-400 text-white' : 'bg-emerald-100 text-emerald-600'} 
        ${(props.size == "sm") && 'text-[12px] px-4 min-w-20 p-1 rounded-lg' || (props.size == "lg") &&'text-lg px-6 min-w-28 p-2 rounded-xl' || (props.size == "md") && 'text-md px-6 min-w-28 p-1 rounded-xl'}
        flex justify-center items-center ${props.fullWidth ? "w-full" : ""}
        ${props.loading ? "opacity-45" : ""}
    `}
        onClick={props.onClick}
        disabled={props.loading}
    >
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
        {props.text}
        {props.endIcon ? <div className="pl-2">{props.endIcon}</div> : null}
    </button>
    )
}
