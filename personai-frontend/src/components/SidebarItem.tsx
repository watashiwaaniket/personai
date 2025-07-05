import { ReactElement } from "react";

export interface SidebarItemProps{
    text: string;
    icon: ReactElement;
}

export function SidebarItem({ text, icon } : SidebarItemProps){
    return(
        <div className="flex py-2 text-gray-700 border cursor-pointer hover:bg-gray-200 rounded-xl pr-4 w-36 sm:w-56 transition-all duration-150 items-center justify-center gap-1">
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}