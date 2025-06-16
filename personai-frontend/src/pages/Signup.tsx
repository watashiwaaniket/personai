import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    async function signup(){
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
            username,
            email,
            password
        })
        alert("You have successfully signed up!")
    }

    return(
        <div className="h-screen w-screen flex justify-center items-center" style={{backgroundImage: "URL('./signup-bg.jpg')", backgroundPosition:"center", backgroundSize:'cover'}}>
            <div className="bg-[linear-gradient(to_right,rgba(248,250,252,0.6),rgba(226,232,240,0.9))] flex flex-col rounded-xl border min-w-48 p-8">
                <Input placeholder="Username" inputType="short" ref={usernameRef}/>
                <Input placeholder="Email" inputType="short" ref={emailRef} />
                <Input placeholder="Password" inputType="password" ref={passwordRef}/>
                <div className="flex justify-center pt-4">
                    <Button variant="primary" text="Signup" size="md" fullWidth={true} loading={false} onClick={signup} />
                </div>
                <p className="text-slate-700 text-center">Already have an acc? <Link to={'/signin'} className="text-green-800">Login</Link></p>
            </div>
        </div>
    )
}