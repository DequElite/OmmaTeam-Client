import styles from './style.module.scss';

export default function TeamsLayout(){
    return (
        <>
            <main className={styles['layout']}>
                <ul className={styles['layout__list']}>
                    <li className={styles['layout__item']}>
                        <section className={styles['layout__item-info']}>
                            <img src="/icons/UserIcon.png" alt="ownericon" className={styles['info__ownericon']} />
                            <div className={styles['info__data']}>
                                <h3 className={styles['info__data-teamname']}>
                                    DequElite Team
                                </h3>
                                <p className={styles['info__data-owner']}>
                                    Owner a2024max.studio@gmail.com
                                </p>
                            </div>
                        </section>
                        <section className={styles['layout__item-tasks']}>
                            <img src="/icons/Attention.png" alt="attention" />
                            <p>
                                52 tasks
                            </p>
                        </section>
                    </li>
                </ul>
            </main>
        </>
    )
}