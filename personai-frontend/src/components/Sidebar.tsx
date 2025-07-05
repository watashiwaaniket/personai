import { PersonaIcon } from "../icons/PersonaIcon";
import { XIcon } from "../icons/XIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return(
        <div className="h-44 md:h-screen bg-white broder-r w-screen md:w-64 sm:fixed left-0 top-0 border-2 flex flex-col sm:items-center z-100">
            <h2 className="text-green-400 text-xl sm:text-2xl sm:mt-4 p-6 flex items-center gap-2"><PersonaIcon /> personAI</h2>
            <div className="flex sm:flex-col justify-center gap-4">
                <SidebarItem icon={<XIcon size="md"/>} text="Tweets"/>
                <SidebarItem icon={<YoutubeIcon size="lg"/>} text="Youtube" />
            </div>
        </div>
    )
}