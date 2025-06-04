import { InputProps } from "./Modal"

export function Input({ onChange, placeholder, inputType } : InputProps){
    let inputStyle = "px-4 py-2 border mx-2 mb-2 rounded-lg focus:border-emerald-400 w-64"
    return <>
        {
            (inputType == 'short') && <input placeholder={placeholder} type={"text"} className={inputStyle} onChange={onChange} /> ||
            (inputType == 'long') && <textarea placeholder={placeholder} className={inputStyle + ' h-48'} onChange={onChange}/>        
        }
    </>
}