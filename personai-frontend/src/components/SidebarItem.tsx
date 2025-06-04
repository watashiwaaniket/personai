import { ReactElement } from "react";

export interface SidebarItemProps{
    text: string;
    icon: ReactElement;
}

export function SidebarItem({ text, icon } : SidebarItemProps){
    return(
        <div className="flex py-2 text-gray-700 cursor-pointer hover:bg-gray-200 rounded w-48 pl-4 transition-all duration-150 items-center">
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}