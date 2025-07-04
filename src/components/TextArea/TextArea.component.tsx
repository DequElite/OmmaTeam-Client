import { TextAreaProps } from '../../api/types/props.types';
import styles from './style.module.scss';

export default function TextArea({
  title,
  isRequired,
  errorText,
  isError,
  ...rest
}: TextAreaProps){
    return (
        <>
            <div className={styles['field']}>
                <h3 className={styles.title}>
                    {title}
                    {isRequired && <strong className={styles.requiredField}>*</strong>}
                </h3>
                <textarea
                    className={`${styles.input} ${isError ? styles.errorInput : ""}`}
                    {...rest} 
                />
                {isError && errorText !== '' && <p className={styles.error}>*{errorText}</p>}
            </div>
        </>
    )
}