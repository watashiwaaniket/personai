import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface ModelProps {
    open: boolean;
    onClose: () => void;
}

enum ContentType{
    Youtube = 'youtube',
    Twitter = 'twitter',
}

export function Modal({open, onClose} : ModelProps){
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const date = new Date()
    
    function today(){
        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    }

    //console.log(today())


    async function addContent(){
        const title = titleRef.current?.value ?? "";
        const link = linkRef.current?.value;
        

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type,
            dateAdded : today()
        }, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        
    }

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
                        <Input ref={titleRef} placeholder="Title" inputType="short"/>
                        <Input ref={linkRef} placeholder="Link / Notes" inputType="long"/>
                        <p className="w-full px-14 pt-2 text-slate-500">Type:</p>
                        <div className="flex flex-row">
                            <Button text="Youtube" size="md" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => { setType(ContentType.Youtube) }}/>
                            <Button text="Twitter" size="md" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => { setType(ContentType.Twitter) }}/>
                        </div>
                        <Button onClick={addContent} text="Submit" variant="primary" size="md" />
                    </div>
                </div>
            </div>
            </>
            }
        </div>
        
    )       
}
