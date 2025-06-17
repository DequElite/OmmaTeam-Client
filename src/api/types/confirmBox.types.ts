export interface ConfirmBoxData {
    message: string;
}

export type ConfirmBoxContextType = {
    isOpened?: boolean;
    message: string;
    handleConfirm: (result: boolean) => void;
    confirm?: (message: string) => Promise<boolean>;
};