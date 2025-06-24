import { TeammateDataType } from "../../api/types/team.types";
import styles from './style.module.scss';

export default function TeammatesLayout({teammates}:{teammates: TeammateDataType[] | undefined}){
    return (
    <main className={styles['layout']}>
        <ul className={styles['layout__list']}>
            {
                teammates?.map((tm) => {
                    if (!tm.user) return null;

                    return (
                    <li className={styles['layout__item']} key={tm.id}>
                        <section className={styles['layout__item-info']}>
                        <img
                            src="/icons/UserIcon.png"
                            alt="ownericon"
                            className={styles['info__ownericon']}
                        />
                        <div className={styles['info__data']}>
                            <h3 className={styles['info__data-teamname']}>
                                {tm.user.username || 'Without name'}
                            </h3>
                            <p className={styles['info__data-owner']}>
                                {tm.user.email}
                            </p>
                        </div>
                        </section>
                    </li>
                    );
                })
            }
        </ul>
        </main>
    )
}