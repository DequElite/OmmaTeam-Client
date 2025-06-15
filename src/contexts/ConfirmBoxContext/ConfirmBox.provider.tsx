import { createContext, useState } from "react";
import { ConfirmBoxContextType } from "../../api/types/confirmBox.types";
import { ReactNode } from "@tanstack/react-router";

export const ConfirmBoxContext = createContext<ConfirmBoxContextType | undefined>(undefined);

export default function ConfirmBoxProvider({
    children
}: {children: ReactNode}) {
    const [isOpened, setIsOpened] = useState(false);
    const [message, setMessage] = useState('');
    const [resolver, setResolver] = useState<(result: boolean) => void>(() => ()=>{})

    const confirm = (message: string): Promise<boolean> => {
        setIsOpened(true);
        setMessage(message);
        console.log(isOpened)

        return new Promise((resolve) => {
            setResolver(() => resolve)
        })
    }

    const handleConfirm = (result: boolean) => {
        resolver(result);
        setIsOpened(false);
    }

    return (
        <ConfirmBoxContext.Provider value={{ handleConfirm, message, isOpened, confirm }}>
            {children}
        </ConfirmBoxContext.Provider>
    )
}