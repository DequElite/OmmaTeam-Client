import { ButtonProps } from "../../api/types/props.types";
import styles from "./style.module.scss";

export default function Button(props: ButtonProps){
    return (
        <button 
            type={props.type || 'button'}

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