import { Navigate } from '@tanstack/react-router';
import { CheckSubTaskType, SubTasksStatus, TaskType, TaskTypes } from '../../api/types/tasks.types';
import Difficulty from '../../components/Difficulty/Difficulty.component';
import Responsible from '../../components/Responsible/Responsible.component';
import styles from './styles.module.scss';
import Button from '../../components/Button/Button.component';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { TaskService } from '../../api/services/Task.service';
import { useMessageBox } from '../../contexts/MessageBoxContext/useMessageBox';

const taskService = new TaskService();

export default function TaskViewLayout({data}:{ data: TaskType }){
    const { updateState } = useMessageBox();

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    if(!data) {
        return <Navigate to={'/'} replace={true}/>
    }

    const difficulty = (data.hardLevel ?? 'EASY').toLowerCase() as 'easy' | 'medium' | 'hard';

    const { mutate } = useMutation({
        mutationFn: (data: CheckSubTaskType) => taskService.checkSubtask(data),
        onSuccess: () => {
            console.debug('SUCCESS SENDED')
        
            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Checked success'
            });
        
            window.location.reload();
        },
        onError: (err: any) => {
            console.error('error: ', err);
        
            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Team not exists'
                    });
                    break;
                default:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Unknown error'
                    });
                    break;
            }
        }
    })

    const handleCheckSubTask = (subtaskId: string) => {
        mutate({
            teamId: data.teamId,
            taskId: data.id,
            subtaskId
        });
    }

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
                    {
                        data.type === TaskTypes.SUBTASKS && data.subtasks.length > 0 && 
                        <div className={styles['viewer__details-subtasks']}>
                            <h3>
                                Sub Tasks
                            </h3>
                            <div className={styles['subtasks-container']}>
                                <ul className={styles['subtasks-list']}>
                                    {data.subtasks.map((st, index) => (
                                        <li 
                                            key={st.id || index} 
                                            className={`
                                                ${styles["subtask"]} 
                                                ${st.status===SubTasksStatus.IN_THE_PROGRESS 
                                                    ? styles["unchecked"] 
                                                    : styles["checked"]} 
                                                ${styles[hoveredIndex===index ? "hovered" : "unhovered"]}`}
                                        >
                                            <strong>
                                                {st.name}
                                            </strong>
                                            <Button
                                                variant='branded'
                                                width={13}
                                                height={100}
                                                size_type='%-%'
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                                disabled={st.status===SubTasksStatus.COMPLETED}
                                                onClick={() => handleCheckSubTask(st.id)}
                                            >
                                                <span style={{fontSize:'1.1rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                                                    <img src="/svg/ArrowDownCircle.svg" alt="" width={20} /> 
                                                </span>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }
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
                        <Responsible name={data.assignedTo.user.username || ''}/>
                    </div>
                    <div className={styles['viewer__info-status']}>
                        <h3>
                            Task status
                        </h3>
                        <h4>
                            {data.isCompleted ? 'Completed' : 'In the progress'}
                        </h4>
                    </div>
                </section>
            </div>
        </>
    )
}