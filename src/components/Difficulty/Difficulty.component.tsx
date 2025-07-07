import styles from './styles.module.scss';

export default function Difficulty({difficulty}:{difficulty: 'easy' | 'medium' | 'hard'}){
    return (
        <div className={`${styles['diff']} ${styles[difficulty]}`}>
            {difficulty}
        </div>
    )
}