import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { PersonaIcon } from "../icons/PersonaIcon";
import { RightArrowIcon } from "../icons/RightArrowIcon";

export function Landing(){
    const navigate = useNavigate();
    return(
        <div className="h-screen w-screen bg-white">
            <div className="flex justify-between items-center px-4 py-3">
                <h2 className="text-green-400 text-xl lg:text-2xl p-2 flex items-center"><PersonaIcon /> personAI</h2>
                <div className="flex">
                    <Button variant="primary" size="sm" text="Login" onClick={() => navigate('/signin')}/>
                    <Button variant="secondary" size="sm" text="Signup" onClick={() => navigate('/signup')}/>
                </div>
            </div>
            <div className="lg:px-[360px]">
            <div className="flex flex-col items-center justify-center mt-4 md:mt-12">
                <img src="/hero-banner.png" alt="hero-banner" />
                <h1 className="text-2xl md:text-3xl lg:text-7xl font-bold mt-2">Your Personal Second Brain</h1>
                <p className="max-w-[420px] text-sm md:text-base md:max-w-[520px] lg:text-xl lg:max-w-[720px] text-center my-4 text-slate-700 font-medium">Ditch the dull notes. Meet PersonAi — your smart, free second brain that remembers, summarizes, and thinks with you.</p>
                <Button variant="primary" size="md" text="Get Started" onClick={() => navigate('/signin')} endIcon={<RightArrowIcon />}/>
                <p className="font-light text-slate-600 text-sm -mt-1">uses gemini</p>
            </div>
            <div className="flex items-center justify-center py-16">
                <img src="/placeholder-banner2.png" alt="banner2" className="max-w-96 md:max-w-[780px] lg:max-w-[920px] rounded-xl border drop-shadow-md"/>
            </div>
            <div className="px-8">
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">A second brain like no other</h1>
                <p className="mt-4 text-base lg:text-xl max-w-[640px] text-slate-700 font-medium">
                    PersonAi makes it super easy to store your thoughts. Just copy the link of the content you want to store and the AI would summarize it for you along with past lookups for in-depth knowledge network.
                </p>
                <div>
                    <div className="w-full h-80 border rounded-xl drop-shadow-lg my-8 bg-white">

                    </div>
                    <div>d</div>
                </div>
            </div>
            </div>
        </div>
    )
}