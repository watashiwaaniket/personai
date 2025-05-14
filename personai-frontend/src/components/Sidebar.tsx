import { PersonaIcon } from "../icons/PersonaIcon";

export function Sidebar() {
    return(
        <div className="h-screen bg-white broder-r w-64 fixed left-0 top-0 border-2 flex flex-col items-center">
            <h2 className="text-green-400 text-2xl p-6 flex justify-center items-center gap-2"><PersonaIcon /> personAI</h2>
            <code className='px-6'>
                Your second brain utilizing the power <br/>of AI
            </code>
        </div>
    )
}