import { forwardRef } from 'react';
import { TextAreaProps } from '../../api/types/props.types';
import styles from './style.module.scss';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({
  title,
  isRequired,
  errorText,
  isError,
  ...rest
}, ref) {
  return (
    <div className={styles['field']}>
      <h3 className={styles.title}>
        {title}
        {isRequired && <strong className={styles.requiredField}>*</strong>}
      </h3>
      <textarea
        className={`${styles.input} ${isError ? styles.errorInput : ""}`}
        ref={ref} // ВАЖНО!
        {...rest}
      />
      {isError && errorText !== '' && <p className={styles.error}>*{errorText}</p>}
    </div>
  );
});

export default TextArea;
