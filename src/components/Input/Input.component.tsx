import { InputProps } from "../../api/types/props.types";
import styles from "./style.module.scss";

export default function InputField({
  title,
  isRequired,
  errorText,
  isError,
  isTitle = true,
  ...rest
}: InputProps) {
  return (
    <div className={styles.field}>
      {isTitle && <h3 className={styles.title}>
        {title}
        {isRequired && <strong className={styles.requiredField}>*</strong>}
      </h3>}
      <input
        className={`${styles.input} ${isError ? styles.errorInput : ""}`}
        {...rest} 
      />
      {isError && errorText !== '' && <p className={styles.error}>*{errorText}</p>}
    </div>
  );
}
