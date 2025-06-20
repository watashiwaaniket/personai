import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { RightArrowIcon } from "../../icons/RightArrowIcon";

export function HeroSection(){
    const navigate = useNavigate();
    return(
        <>
            <div className="flex flex-col items-center justify-center mt-4 md:mt-12">
                <img src="/personai-hero.png" alt="hero-banner" />
                <h1 className="text-2xl md:text-3xl lg:text-7xl font-bold mt-2">Your Personal Second Brain</h1>
                <p className="max-w-[420px] text-sm md:text-base md:max-w-[520px] lg:text-xl lg:max-w-[720px] text-center my-4 text-slate-700 font-medium">Ditch the dull notes. Meet PersonAi — your smart, free second brain that remembers, summarizes, and thinks with you.</p>
                <Button variant="primary" size="md" text="Get Started" onClick={() => navigate('/signin')} endIcon={<RightArrowIcon />}/>
                <p className="font-light text-slate-600 text-sm -mt-1">uses gemini</p>
            </div>
            <div className="flex items-center justify-center py-16">
                <img src="/placeholder-banner2.png" alt="banner2" className="max-w-96 md:max-w-[780px] lg:max-w-[920px] rounded-xl border drop-shadow-md"/>
            </div>
            <div className="px-8 text-center">
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">A second brain like no other</h1>
                <p className="mt-4 text-base lg:text-xl text-slate-700 font-medium">
                    PersonAi makes it super easy to store your thoughts. Just copy the link of the content you want to store <br/> and the AI would summarize it for you along with past lookups for in-depth knowledge network.
                </p>
                <div className="flex flex-col items-center">
                    <div className="w-full h-80 border rounded-xl drop-shadow-lg mt-8 bg-white lg:max-w-[920px] p-8 overflow-hidden">
                        <h1 className="text-xl font-bold text-left">✨ Capture Anything, Instantly</h1>
                        <p className="text-lg font-normal text-slate-600 text-left max-w-[520px] mt-4">Just start typing or drop a link — PersonAi transforms your notes, tweets, videos, and articles into clean, AI-powered summaries. No clutter, no distractions.</p>
                        <img src="/features-bg-1.png" alt="noise" className="-mt-32"/>
                    </div>
                    <div className="w-full grid grid-cols-3 lg:max-w-[920px]">
                        <div className="mr-4 col-span-2 h-80 border rounded-xl drop-shadow-lg my-8 bg-white p-8">
                            <h1 className="text-xl font-bold text-left">🧠 AI That Thinks With You</h1>
                            <p className="text-lg font-normal text-slate-600 text-left max-w-[520px] mt-4">Let PersonAi do the heavy lifting. It reads your content, extracts key points, and helps you remember better — making your knowledge searchable, summarized, and smart.</p>
                        </div>
                        <div className="ml-4 h-80 border rounded-xl drop-shadow-lg my-8 bg-white p-8">
                            <h1 className="text-xl font-bold text-left">🔒 Built for Privacy</h1>
                            <p className="text-lg font-normal text-slate-600 text-left max-w-[520px] mt-4">Your thoughts are yours. PersonAi is built with privacy in mind: encrypted storage, zero tracking, and no data sharing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}