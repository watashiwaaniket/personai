import { Link } from "react-router-dom";
import { XIcon } from "../../icons/XIcon";
import { PersonaIcon } from "../../icons/PersonaIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";

export function Footer(){
    return(
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
    )
}