import { Navigate } from '@tanstack/react-router';
import { TaskType } from '../../api/types/tasks.types';
import Difficulty from '../../components/Difficulty/Difficulty.component';
import Responsible from '../../components/Responsible/Responsible.component';
import styles from './styles.module.scss';

export default function TaskViewLayout({data}:{ data: TaskType }){
    
    if(!data) {
        return <Navigate to={'/'} replace={true}/>
    }

    const difficulty = (data.hardLevel ?? 'EASY').toLowerCase() as 'easy' | 'medium' | 'hard';

                    //todo: доделай саб таски 

    return ( 
        <>
            <div className={styles['viewer-layout']}>
                <section className={styles['viewer__details']}>
                    <div className={styles['viewer__details-desc']}>
                        <h3>
                            Task Description
                        </h3>
                        <div className={styles['viewer__details-desc-container']}>
                            <p>
                                {data.description}
                            </p>
                        </div>
                    </div>
                </section>
                <section className={styles['viewer__info']}>
                    <div className={styles['viewer__info-name']}>
                        <h3>
                            Task name
                        </h3>
                        <h4>
                            {data.title}
                        </h4>
                    </div>
                    <div className={styles['viewer__info-deadline']}>
                        <h3>
                            Deadline
                        </h3>
                        <h4>
                            To {new Date(data.deadline).toLocaleString()}
                        </h4>
                    </div>
                    <div className={styles['viewer__info-type']}>
                        <h3>
                            Task type
                        </h3>
                        <h4>
                            {data.type}
                        </h4>
                    </div>
                    <div className={styles['viewer__info-difficulty']}>
                        <h3>
                            Task Difficulty
                        </h3>
                        <Difficulty difficulty={difficulty}/>
                    </div>
                    <div className={styles['viewer__info-responsible']}>
                        <h3>
                            Task responsible
                        </h3>
                        <Responsible name={data.assignedToName || ''}/>
                    </div>
                </section>
            </div>
        </>
    )
}