import { Control, useFormContext } from "react-hook-form";
import styles from './styles.module.scss';
import Button from "../Button/Button.component";
import { useEffect, useRef, useState } from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    onChange?: (value: string) => void;
    name: string;
    title: string;
    isRequired: boolean;
    selectedValue?: string;
}

export default function Select(props:SelectProps){
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [checkedOpt, setCheckedOpt] = useState<Option>(() => {
        const found = props.options.find(opt => opt.value === props.selectedValue);

        return found || props.options[0];
    });

    useEffect(() => {
        const handleClickOutSelect = (event: MouseEvent) => {
            if(selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutSelect);

        return () => document.removeEventListener('mousedown', handleClickOutSelect); 
    }, [])

    const handleOpen = () => {
        setIsOpen(prevState => !prevState);
    }

    const handleCheck = (index: number) => {
        setCheckedOpt(props.options[index]);
        setIsOpen(false);
        props.onChange?.(props.options[index].value);
    }

    return (
        <div className={styles.field} ref={selectRef}>
            <h3 className={styles.title}>
                {props.title}
                {props.isRequired && <strong className={styles.requiredField}>*</strong>}
            </h3>
            <div className={styles.input}>
                <div className={styles['input__container']}>
                    <strong className={styles['input__label']}>
                        {checkedOpt.label}
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
                            props.options.map((opt, index) => (
                                <li
                                    key={index}
                                    onClick={()=>handleCheck(index)}
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