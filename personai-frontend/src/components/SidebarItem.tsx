import { ReactElement } from "react";

export interface SidebarItemProps{
    text: string;
    icon: ReactElement;
}

export function SidebarItem({ text, icon } : SidebarItemProps){
    return(
        <div className="flex items-center">
            {icon}{text}
        </div>
    )
}