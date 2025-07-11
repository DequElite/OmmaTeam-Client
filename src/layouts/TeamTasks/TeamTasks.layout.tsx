import { useNavigate } from "@tanstack/react-router";
import { TaskType } from "../../api/types/tasks.types";
import Task from "../../components/Task/Task.component";
import styles from './style.module.scss';

export default function TeamTasksLayout({ tasks }:{ tasks: TaskType[] }) {
    const navigate = useNavigate();

    const handleNavigateToTaskView = (taskId: string) => {
        navigate({ to:`view/${taskId}` })
    }

    return (
        <>
            <div className={styles['layout']}>
                <ul className={styles['task-list']}>
                    {tasks.map((task, index) => (
                        <li className={styles['task']} key={index} onClick={() => handleNavigateToTaskView(task.id)}>
                            <Task task={task} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}