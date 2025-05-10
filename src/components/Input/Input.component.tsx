import React, { InputHTMLAttributes } from "react";
import styles from "./style.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  isRequired: boolean;
  errorText: string;
  isError: boolean;
}

export default function InputField({
  title,
  isRequired,
  errorText,
  isError,
  ...rest
}: InputProps) {
  return (
    <div className={styles.field}>
      <h3 className={styles.title}>
        {title}
        {isRequired && <strong className={styles.requiredField}>*</strong>}
      </h3>
      <input
        className={`${styles.input} ${isError ? styles.errorInput : ""}`}
        {...rest} 
      />
      {isError && <p className={styles.error}>*{errorText}</p>}
    </div>
  );
}
