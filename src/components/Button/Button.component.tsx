import styles from "./style.module.scss";

type ButtonVariant = 'branded' | 'dark' | 'branded-reverese';

interface ButtonProps {
    children: React.ReactNode;
    variant: ButtonVariant;
    width: number;
    height: number;
    className?: any;
    animation?: boolean;
    onClick: () => void;
}

export default function Button(props: ButtonProps){
    return (
        <button 
            style={{
                width: `${props.width}%`,
                height: `${props.height}vh`
            }}
            className= {`
                ${styles.button} 
                ${styles[props.variant]} 
                ${props.className} 
                ${props.animation && styles['animated']}`}
            
                onClick={props.onClick}
        >
            { props.children }
        </button>
    )
}