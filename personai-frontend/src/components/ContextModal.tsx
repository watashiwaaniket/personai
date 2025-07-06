import { CrossIcon } from "../icons/CrossIcon";

export interface ContextModelProps {
    open: boolean;
    onClose: () => void;
    context: string;
}

export function ContextModal({open, onClose, context} : ContextModelProps){
    return (
        <div>
            {open && <><div className="w-screen h-screen bg-white fixed top-0 left-0 z-40 flex flex-col text-justify p-8 overflow-auto">
                <div className="w-screen flex justify-end pr-20 p-6">
                    <button onClick={onClose}>
                        <CrossIcon size="lg" />
                    </button> 
                </div>
                <div>
                    {context}
                </div>
            </div>
            </>
            }
        </div>
        
    )       
}
