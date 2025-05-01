export interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon ?: any;
    endIcon ?: any;
    onClick : () => void;
}

export const Button = ( props : ButtonProps ) => {
    return (
    <button className={`
        p-2 w-32 rounded-2xl font-semibold 
        ${(props.variant == 'primary') ? 'bg-emerald-400 text-white' : 'bg-emerald-100 text-emerald-600'} 
        ${(props.size == "sm") && 'text-sm' || (props.size == "lg") &&'text-lg' || (props.size == "md") && 'text-md'}
        flex justify-center items-center
    `}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
        {props.text}
        {props.endIcon ? <div className="pl-2">{props.endIcon}</div> : null}
    </button>
    )
}

<Button variant='secondary' size='md' onClick={() => {}} text={'Start Here'} startIcon={'+'} />