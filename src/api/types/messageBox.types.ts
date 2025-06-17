export interface MessageBoxData {
    isOpened: boolean;
    type: 'success' | 'warning' | 'info' | 'error';
    desc: string;   
}

export type MessageBoxContextType = {
  messageBoxState: MessageBoxData;
  setMSGBoxState: React.Dispatch<React.SetStateAction<MessageBoxData>>;
};