import { useState } from "react";

export function useMessageModal(){
    const [messageModalOpen, setMessageModalOpen] = useState(false);

    const trigger = () => {
        setMessageModalOpen(true);
        setTimeout(() => setMessageModalOpen(false), 1000)
    }

    return {messageModalOpen, trigger}
}