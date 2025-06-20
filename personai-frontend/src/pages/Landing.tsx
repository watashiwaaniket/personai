import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { PersonaIcon } from "../icons/PersonaIcon";
import { RightArrowIcon } from "../icons/RightArrowIcon";
import { Accordian } from "../components/Accordian";
import { XIcon } from "../icons/XIcon";
import { LinkedInIcon } from "../icons/LinkedInIcon";

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
                    <div className="w-full h-80 border rounded-xl drop-shadow-lg mt-8 bg-white lg:max-w-[920px]">

                    </div>
                    <div className="w-full grid grid-cols-3 lg:max-w-[920px]">
                        <div className="mr-4 col-span-2 h-80 border rounded-xl drop-shadow-lg my-8 bg-white">

                        </div>
                        <div className="ml-4 h-80 border rounded-xl drop-shadow-lg my-8 bg-white">

                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center px-8 mt-8 flex flex-col items-center">
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">Questions & answers</h1>
                <div className="lg:max-w-[920px] my-8">
                    <Accordian 
                        question="1. What makes PersonAi different from a regular notes app?" 
                        answer="Unlike basic note-taking tools, PersonAi uses AI to summarize content, understand your notes, and help you recall key information — it&apos;s like having a second brain that thinks with you."
                    />
                    <Accordian
                        question="2. Can I save links like YouTube videos, tweets, or articles?"
                        answer="Absolutely! Just drop in a link — PersonAi will extract the core insights and summarize the content so you don&apos;t have to revisit it every time."
                    />
                    <Accordian
                        question="3. Is my data secure and private?"
                        answer="Yes. Your notes and content are stored securely and are only accessible to you. We prioritize privacy and never share your data with third parties."
                    />
                    <Accordian
                        question="4. Can I share my second brain with others?"
                        answer="Definitely! You can share your entire second brain with friends, teammates, or the public with a button toggle — your knowledge, your rules."
                    />
                </div>
            </div>
            <div className="mt-8 p-8 flex items-center justify-center">
                <div className="max-w-[920px]">
                    <hr className="w-96 md:w-[720px] lg:w-[920px] border" />
                    <div className="grid grid-cols-3 mt-14">
                        <div className="col-span-2 h-60">
                            <p className="text-green-400 text-xl lg:text-2xl p-2 flex items-center"><PersonaIcon/>PersonAI</p>
                            <p className="px-2 text-lg font-semibold mt-2">Made in Pune 🇮🇳</p>
                            <p className="px-2 text-md text-slate-600 font-light mb-2">&copy; 2025 PersonAI</p>
                            <div className="flex items-center">
                                <Link to={'https://x.com/AniketDhak6470'}><XIcon size="md"/></Link>
                                <Link to={'https://www.linkedin.com/in/aniket-dhakane-9b06a125b/'}><LinkedInIcon/></Link>
                            </div>    
                        </div>
                        <div className="col-span-1 h-60">
                            <div className="flex flex-col p-6 text-slate-600">
                                <p className="text-lg font-semibold text-black">We are open source!</p>
                                <Link to={'https://www.aniketdhakane.xyz/'}>About us</Link>
                                <Link to={'https://github.com/watashiwaaniket/personai'}>Contribute</Link>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}