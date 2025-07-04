import { Control } from "react-hook-form";
import styles from './styles.module.scss';
import Button from "../Button/Button.component";
import { useState } from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    control?: Control<any>;
    name: string;
    title: string;
    isRequired: boolean;
}

export default function Select(props:SelectProps){
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(prevState => !prevState);
    }

    return (
        <div className={styles.field}>
            <h3 className={styles.title}>
                {props.title}
                {props.isRequired && <strong className={styles.requiredField}>*</strong>}
            </h3>
            <div className={styles.input}>
                <div className={styles['input__container']}>
                    <strong className={styles['input__label']}>
                        babel
                    </strong>
                    <Button
                        variant='branded'
                        width={15}
                        height={5}
                        onClick={handleOpen}
                    >
                        <span style={{fontSize:'1.1rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                            <img src="/svg/ArrowDownCircle.svg" alt="" width={20} /> 
                        </span>
                    </Button>
                </div>

                { 
                    isOpen && <ul>
                        {
                            props.options.map(opt => (
                                <li
                                    key={opt.value}
                                >
                                    {opt.label}
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
        </div>
    )
}