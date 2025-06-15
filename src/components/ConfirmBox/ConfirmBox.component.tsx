import useConfirmBox from "../../contexts/ConfirmBoxContext/useConfirmBox";
import Button from "../Button/Button.component";
import styles from "./style.module.scss";

export default function ConfirmBox() {
    const { message, handleConfirm } = useConfirmBox();

    return (
        <div className={styles['layout']}>
            <div className={styles['box']}>
                <div className={styles['content']}>
                    <h3>
                        Are you sure about that?
                    </h3>
                    <p>
                        {message}
                    </p>
                    <div className={styles['content__buttons']}>
                        <Button
                            variant='branded'
                            width={43}
                            height={5}
                            onClick={() => handleConfirm(true)}
                        >
                            <span style={{fontSize:'1rem'}}>
                                Yes
                            </span>
                        </Button>
                        <Button
                            variant='dark'
                            width={43}
                            height={5}
                            onClick={() => handleConfirm(false)}
                        >
                            <span style={{fontSize:'1rem'}}>
                                No
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}