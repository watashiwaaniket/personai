import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

export interface ModelProps {
    open: boolean;
    onClose: () => void;
}

export interface InputProps {
    placeholder: string;
    inputType: 'short' | 'long';
    onChange: () => void;
}

export function Modal({open, onClose} : ModelProps){
    return (
        <div>
            {open && <><div className="w-screen h-screen bg-slate-900 fixed top-0 left-0 z-40 opacity-60 flex justify-center items-center"></div>
            <div className="fixed z-50 w-screen h-screen flex justify-center items-center">
                <div className="bg-white min-h-60 w-96 rounded-lg">
                    <div className="p-4 flex justify-end">
                        <button onClick={onClose}>
                            <CrossIcon size="lg" />
                        </button>                        
                    </div>
                    <div className="flex flex-col px-4 justify-center items-center w-full my-4">
                        <Input placeholder="Title" inputType="short"/>
                        <Input placeholder="Link / Notes" inputType="long"/>
                        <Button text="Submit" variant="primary" size="md" />
                    </div>
                </div>
            </div>
            </>
            }
        </div>
        
    )       
}

function Input({ onChange, placeholder, inputType } : InputProps){
    let inputStyle = "px-4 py-2 border mx-2 mb-2 rounded-lg focus:border-emerald-400 w-64"
    return <>
        {
            (inputType == 'short') && <input placeholder={placeholder} type={"text"} className={inputStyle} onChange={onChange} /> ||
            (inputType == 'long') && <textarea placeholder={placeholder} className={inputStyle + ' h-48'} onChange={onChange}/>        
        }
    </>
}