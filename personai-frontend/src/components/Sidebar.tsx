import { PersonaIcon } from "../icons/PersonaIcon";
import { XIcon } from "../icons/XIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return(
        <div className="h-screen bg-white broder-r w-64 fixed left-0 top-0 border-2 flex flex-col items-center">
            <h2 className="text-green-400 text-2xl mt-4 p-6 flex items-center gap-2"><PersonaIcon /> personAI</h2>
            <SidebarItem icon={<XIcon size="md"/>} text="Tweets"/>
            <SidebarItem icon={<YoutubeIcon size="lg"/>} text="Youtube" />
        </div>
    )
} 