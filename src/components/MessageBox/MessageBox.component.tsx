import { useEffect } from "react";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox"
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.util";
import styles from './style.module.scss'

export function MessageBox() {
    const { messageBoxState, updateState } = useMessageBox();

    useEffect(()=>{
        if(messageBoxState.isOpened) {
            const timer = setInterval(()=>{
                updateState({
                    isOpened: false
                });
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [messageBoxState.isOpened, updateState]);

    return (
        <>
            <div className={`
                ${styles.box}
                ${styles[messageBoxState.type]}
                ${messageBoxState.isOpened ? styles.opened : styles.closed}
            `}>

                <h1 className={styles['box__title']}>
                    {
                        capitalizeFirstLetter(messageBoxState.type)
                    }
                </h1>
                <p className={styles['box__desc']}>
                    {
                        messageBoxState.desc
                    }
                </p>
            </div>
        </>
    )
}