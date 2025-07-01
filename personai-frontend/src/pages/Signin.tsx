import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BackArrowIcon } from "../icons/BackArrowIcon";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signin(){
    const passwordRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    async function signin(){
        const email = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
            email,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate('/dashboard')
    }

    return(
        <div className="h-screen w-screen flex justify-center items-center" style={{backgroundImage: "URL('./signin-bg.jpg')", backgroundPosition:"center", backgroundSize:'cover'}}>
            <div className="bg-[linear-gradient(to_right,rgba(248,250,252,0.6),rgba(226,232,240,0.9))] flex flex-col rounded-xl border min-w-48 p-8">
                <Link to={'/'} className="text-slate-700 font-bold -mt-6 -ml-6"><BackArrowIcon /></Link>
                <Input ref={usernameRef} placeholder="Username" inputType="short"/>
                <Input ref={passwordRef} placeholder="Password" inputType="short" />
                <div className="flex justify-center pt-4">
                    <Button variant="primary" text="Signin" size="md" fullWidth={true} loading={false} onClick={signin}/>
                </div>
                <p className="text-slate-700 text-center">Dont have an acc? <Link to={'/signup'} className="text-green-800">Signup</Link></p>
            </div>
        </div>
    )
}