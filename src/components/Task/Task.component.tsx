import { TaskType } from "../../api/types/tasks.types";
import Difficulty from "../Difficulty/Difficulty.component";
import Responsible from "../Responsible/Responsible.component";
import styles from "./style.module.scss";

export default function Task({task}:{task: TaskType}){

    const difficulty = (task.hardLevel ?? 'EASY').toLowerCase() as 'easy' | 'medium' | 'hard';

    return (
        <div className={styles['task']}>
            <Difficulty difficulty={difficulty} height={4} fontSize={1}/>
            <header className={styles['task__header']}>
                <h3>
                    {task.title}
                </h3>
                <p>
                    To {new Date(task.deadline).toLocaleDateString()}
                </p>
            </header>
            <article className={styles['task__desc']}>
                <p>
                    {task.description}
                </p>
            </article>
            <Responsible name={task.assignedTo.user.username || 'You'}/>
        </div>
    )
}