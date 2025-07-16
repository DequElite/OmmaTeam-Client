import { useNavigate } from '@tanstack/react-router';
import { TinyTaskType } from '../../api/types/tasks.types';
import styles from './styles.module.scss';

export default function TinyTask({task}:{task:TinyTaskType}){
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate({ to: `/team/${task.teamId}/tasks/view/${task.id}` });
    }

    return (
        <div className={`${styles['task']} ${!task.isCompleted && styles[task.hardLevel.toString().toLocaleLowerCase()]}`} onClick={handleNavigate}>
            {task.title}
        </div>
    )
}