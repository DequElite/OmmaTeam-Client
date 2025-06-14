import Button from "../Button/Button.component";
import styles from "./style.module.scss";

interface ConfirmBoxProps {
    title?: string;
    desc?: string;
    onConfirm?: (result: boolean) => boolean;
}

export default function ConfirmBox(props: ConfirmBoxProps) {
    return (
        <div className={styles['layout']}>
            <div className={styles['box']}>
                <div className={styles['content']}>
                    <h3>
                        Are you sure about that?
                    </h3>
                    <p>
                        You wanted to delete a command, are you sure about your actions?
                    </p>
                    <div className={styles['content__buttons']}>
                        <Button
                            variant='branded'
                            width={43}
                            height={5}
                        >
                            <span style={{fontSize:'1rem'}}>
                                Yes
                            </span>
                        </Button>
                        <Button
                            variant='dark'
                            width={43}
                            height={5}
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