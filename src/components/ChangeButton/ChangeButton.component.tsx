import { useState } from 'react';
import styles from './styles.module.scss';

export interface OptionType {
    value: string;
    label: string;
}

interface ChangeButtonProps {
    options: OptionType[];
    width: number;
    height: number;
    size_type: {
        width: '%' | 'vh';
        height: '%' | 'vh';
    };
    className?: any;
    onSelect?: ({label, value}: OptionType, type:'right' | 'left') => void;
}

export default function ChangeButton(props: ChangeButtonProps){
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selected = props.options[selectedIndex];

    const handleChange = (type: 'right' | 'left') => {
        let newIndex = selectedIndex;

        if (type === 'left') {
            newIndex = selectedIndex === 0 ? props.options.length - 1 : selectedIndex - 1;
        } else {
            newIndex = selectedIndex === props.options.length - 1 ? 0 : selectedIndex + 1;
        }

        setSelectedIndex(newIndex);
        props.onSelect?.(props.options[newIndex], type);
    };


    return (
        <>
            <div className={styles['container']} style={{width: `${props.width}${props.size_type.width}`,height: `${props.height}${props.size_type.height}`}}>
                <button 
                    className={styles['container__btn-left']}
                    onClick={() => handleChange('left')}
                >
                    <img src="/svg/Dark/ArrowLeft.svg" alt="" />
                </button>
                <div className={styles['container__text']}>
                    {selected.label}
                </div>
                <button 
                    className={styles['container__btn-right']}
                    onClick={() => handleChange('right')}
                >
                    <img src="/svg/Dark/ArrowRight.svg" alt="" />
                </button>
            </div>
        </>
    )
}