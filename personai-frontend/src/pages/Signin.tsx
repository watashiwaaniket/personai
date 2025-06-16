import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signin(){
    return(
        <div className="h-screen w-screen flex justify-center items-center" style={{backgroundImage: "URL('./signin-bg.jpg')", backgroundPosition:"center", backgroundSize:'cover'}}>
            <div className="bg-[linear-gradient(to_right,rgba(248,250,252,0.6),rgba(226,232,240,0.9))] flex flex-col rounded-xl border min-w-48 p-8">
                <Input placeholder="Username" inputType="short"/>
                <Input placeholder="Password" inputType="short" />
                <div className="flex justify-center pt-4">
                    <Button variant="primary" text="Signin" size="md" fullWidth={true} loading={false} />
                </div>
                <p className="text-slate-700 text-center">Dont have an acc? <Link to={'/signup'} className="text-green-800">Signup</Link></p>
            </div>
        </div>
    )
}