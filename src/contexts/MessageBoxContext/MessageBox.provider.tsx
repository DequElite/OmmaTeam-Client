import { createContext, ReactNode, useState } from "react";
import { MessageBoxData, MessageBoxContextType } from "../../api/types/messageBox.types";

const initialMessageBoxState: MessageBoxData  = {
    type: 'info',
    isOpened: false,
    desc: 'Some Desc'
};

export const MessageBoxContext = createContext<MessageBoxContextType>({
  messageBoxState: initialMessageBoxState,
  setMSGBoxState: () => {},
});

export function MessageBoxProvider({
    children
}: { children: ReactNode }) {
    const [messageBoxState, setMSGBoxState] = useState<MessageBoxData>(initialMessageBoxState);

    return (
        <MessageBoxContext.Provider value={{ messageBoxState, setMSGBoxState }}>
            {children}
        </MessageBoxContext.Provider>
    );
}