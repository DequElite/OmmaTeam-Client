'use client'

import { useContext } from "react";
import { ConfirmBoxContext } from "./ConfirmBox.provider";

// export default function useConfirmBox() {
//     const context = useContext(ConfirmBoxContext);
//     if (!context) throw new Error("useConfirmBox must be used inside <ConfirmBoxProvider>");
//     return {
//         confirm: context.confirm,
//         isOpened: context.isOpened,
//         message: context.message,
//         handleConfirm: context.handleConfirm
//     };
// }
