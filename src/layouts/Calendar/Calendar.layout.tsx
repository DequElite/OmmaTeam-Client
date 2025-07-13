import Calendar from '../../components/Calendar/Calendar.component'
import styles from './styles.module.scss'

export default function CalendarLayout(){
    return (
        <>
            <main className={styles['layout']}>
                <Calendar />
            </main>
        </>
    )
}