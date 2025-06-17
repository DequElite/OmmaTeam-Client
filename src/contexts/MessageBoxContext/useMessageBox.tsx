'use client'

import { useContext } from "react";
import { MessageBoxContext } from "./MessageBox.provider";
import { MessageBoxData } from "../../api/types/messageBox.types";

export function useMessageBox() {
    const { messageBoxState, setMSGBoxState } = useContext(MessageBoxContext);

    const updateState = (data: Required<Pick<MessageBoxData, 'isOpened'>> & Partial<Omit<MessageBoxData, 'isOpened'>>) => {
        setMSGBoxState(prevState => ({
            ...prevState,
            ...data
        }));
    }

    return {
        messageBoxState,
        updateState,
    }
}