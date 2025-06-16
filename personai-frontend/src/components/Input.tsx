export interface InputProps {
    placeholder: string;
    inputType: 'short' | 'long' | 'password';
    ref?: any;
}

export function Input({ ref, placeholder, inputType } : InputProps){
    let inputStyle = "px-4 py-2 mx-2 my-2 border rounded-lg focus:border-emerald-400 w-64"
    return <>
        {
            (inputType == 'short') && <input placeholder={placeholder} type={"text"} className={inputStyle}  ref={ref} /> ||
            (inputType == 'long') && <textarea placeholder={placeholder} className={inputStyle + ' h-48'} ref={ref} /> ||
            (inputType == 'password') && <input placeholder={placeholder} type="password" className={inputStyle} ref={ref} />
        }
    </>
}