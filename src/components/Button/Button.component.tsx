import { ButtonProps } from "../../api/types/props.types";
import styles from "./style.module.scss";

export default function Button(props: ButtonProps) {
    const {
        children,
        variant,
        width,
        height,
        size_type = '%-vh',
        className,
        animation,
        onClick,
        type = 'button',
        disabled,
        form,
        ...rest
    } = props;

    return (
        <button
            type={type}
            disabled={disabled}
            style={{
                width: `${width}%`,
                height: size_type === '%-vh' ? `${height}vh` : `${height}%`,
            }}
            className={`
                ${styles.button} 
                ${styles[variant]} 
                ${className ?? ''} 
                ${animation ? styles['animated'] : ''}
            `}
            onClick={onClick}
            form={form}
            {...rest}
        >
            {children}
        </button>
    );
}
