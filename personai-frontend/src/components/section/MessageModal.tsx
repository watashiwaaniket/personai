export interface MessageModalProps{
    message: string;
    open: boolean
}

export function MessageModal({message, open} : MessageModalProps){
    return(
        <>
        {open &&
            <div className="fixed z-50 w-screen h-screen flex justify-center items-baseline pt-4">
                <p className="border rounded-xl px-4 py-2 bg-emerald-200 text-emerald-600">
                    {message}
                </p>
            </div>
        }
        </>
    )
}