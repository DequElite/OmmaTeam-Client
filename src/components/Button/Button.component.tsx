import { ButtonProps } from "../../api/types/props.types";
import useIsScreenWidth from "../../hooks/useIsScreenWidth";
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
        width_on_mobile,
        ...rest
    } = props;

    const { isSmallScreen } = useIsScreenWidth({ minScreenWidth: 600 });

    return (
        <button
            type={type}
            disabled={disabled}
            style={{
                width: `${!isSmallScreen ? `${width}%` : `${width_on_mobile}%`}`,
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
