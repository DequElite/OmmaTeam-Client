import { Link } from '@tanstack/react-router';
import styles from './style.module.scss';
import { useAppSelector } from '../../store/store';

export default function TeamsLayout(){
    const userTeams = useAppSelector(state => state.userTeams.teams);

    return (
        <>
            <main className={styles['layout']}>
                <ul className={styles['layout__list']}>
                    {
                        userTeams.map(team => (
                            <li className={styles['layout__item']} key={team.team.id}>
                                <section className={styles['layout__item-info']}>
                                    <img src="/icons/UserIcon.png" alt="ownericon" className={styles['info__ownericon']} />
                                    <div className={styles['info__data']}>
                                        <h3 className={styles['info__data-teamname']}>
                                            <Link to=''>
                                                {team.team.name}
                                            </Link>
                                        </h3>
                                        <p className={styles['info__data-owner']}>
                                            Owner {team.team.leader.email}
                                        </p>
                                    </div>
                                </section>
                                <section className={styles['layout__item-tasks']}>
                                    <img src="/icons/Attention.png" alt="attention" />
                                    <p>
                                        {team.assigned_tasks.length} tasks
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