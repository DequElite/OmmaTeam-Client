import styles from './styles.module.scss';

export default function Responsible({name}:{name:string}) {
    return (
        <div className={styles['resp']}>
            <img src="/icons/UserIcon.png" alt="" />
            <p>For {name}</p>
        </div>
    )
}