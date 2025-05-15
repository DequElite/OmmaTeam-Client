import { useState } from "react";
import { InputProps } from "../../api/types/props.types";
import InputField from "./Input.component";
import styles from "./style.module.scss";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export default function PasswordInput({
  title,
  isRequired,
  errorText,
  isError,
  ...rest
}: InputProps) {
    const [isHoveredPassword, setIsHoveredPassword] = useState(true);

    const toggleVisiblePassword = () => setIsHoveredPassword(prevState => !prevState);

    return (
        <>
            <div className={styles['password-field']}>
                <InputField 
                    title={title}
                    isRequired={isRequired}
                    errorText={errorText}
                    isError={isError}
                    type={isHoveredPassword ? "password" : "text"}
                    {...rest}
                />
                <button type="button" className={styles['eye']} onClick={toggleVisiblePassword}>
                    { isHoveredPassword ? <IoIosEye /> :  <IoIosEyeOff /> }
                </button>
            </div>
        </>
    );
}