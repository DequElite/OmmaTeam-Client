import { TaskType, TinyTaskType } from '../../api/types/tasks.types'
import Calendar from '../../components/Calendar/Calendar.component'
import Difficulty from '../../components/Difficulty/Difficulty.component';
import TinyTask from '../../components/TinyTask/TinyTask.component';
import styles from './styles.module.scss'

export default function CalendarLayout({tasks}:{tasks:TinyTaskType[]}){

    const tasksComponents = tasks.map((task) => ({
        date: new Date(task.deadline),
        element: <TinyTask task={task} key={task.id} />
    }));

    return (
        <>
            <main className={styles['layout']}>
                <Calendar childrens={tasksComponents}/>
            </main>
        </>
    )
}