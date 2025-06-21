import { Link } from '@tanstack/react-router';
import styles from './style.module.scss';
import { useAppSelector } from '../../store/store';
import { useTranslation } from 'react-i18next';

export default function TeamsLayout(){
    const userTeams = useAppSelector(state => state.userTeams.teams);

    const { t } = useTranslation(); 

    return (
        <>
            <main className={styles['layout']}>
                <ul className={styles['layout__list']}>
                    {
                        userTeams &&
                        userTeams.map(team => (
                            <li className={styles['layout__item']} key={team.team.id}>
                                <section className={styles['layout__item-info']}>
                                    <img src="/icons/UserIcon.png" alt="ownericon" className={styles['info__ownericon']} />
                                    <div className={styles['info__data']}>
                                        <h3 className={styles['info__data-teamname']}>
                                            <Link to={`/team/${team.team.id}/tasks`}>
                                                {team.team.name}
                                            </Link>
                                        </h3>
                                        <p className={styles['info__data-owner']}>
                                            {t('other.owner')} {team.team.leader.email}
                                        </p>
                                    </div>
                                </section>
                                <section className={styles['layout__item-tasks']}>
                                    <img src="/icons/Attention.png" alt="attention" />
                                    <p>
                                        {team.assigned_tasks.length} {t('other.tasks')}
                                    </p>
                                </section>
                            </li>
                        ))
                    }
                </ul>
            </main>
        </>
    )
}