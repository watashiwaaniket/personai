import { ReactElement } from "react";

export interface SidebarItemProps{
    text: string;
    icon: ReactElement;
    onClick?: () => void;
}

export function SidebarItem({ text, icon, onClick } : SidebarItemProps){
    return(
        <button className="flex py-2 text-gray-700 border cursor-pointer hover:bg-gray-200 rounded-xl pr-4 w-36 sm:w-56 transition-all duration-150 items-center justify-center gap-1" onClick={onClick}>
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </button>
    )
}