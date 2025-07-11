import styles from './styles.module.scss';

export default function Difficulty({difficulty, height=5, fontSize=1.05}:{difficulty: 'easy' | 'medium' | 'hard', height?: number, fontSize?: number}){
    return (
        <div className={`${styles['diff']} ${styles[difficulty]}`} style={{height:`${height}vh`, fontSize:`${fontSize}rem`}}>
            {difficulty}
        </div>
    )
}