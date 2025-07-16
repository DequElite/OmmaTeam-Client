import { useState } from 'react';
import ChangeButton, { OptionType } from '../ChangeButton/ChangeButton.component'
import styles from './styles.module.scss'
import generateMonthGrid from '../../utils/generateMonthGrid.util';
import isSameDay from '../../utils/isSameDay.util';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface CalendarProps {
  childrens: {
    element: React.ReactNode;
    date: Date;
  }[];
}

export default function Calendar({ childrens }: CalendarProps) {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    const monthOptions = monthNames.map((m, index) => ({
        label: m,
        value: m.toLowerCase().slice(0, 3),
    }));

    const dates = generateMonthGrid(year, month);

    const handleChangeMonth = ({ value, label }: OptionType, type: 'right' | 'left') => {
        const selectedIndex = monthNames.findIndex(month => month === label);
        let newMonth = selectedIndex;
        let newYear = year;
        console.log(type)

        if (type === 'left' && selectedIndex === 11 && month === 0) {
            newYear -= 1;
        }

        if (type === 'right' && selectedIndex === 0 && month === 11) {
            newYear += 1;
        }

        setMonth(newMonth);
        setYear(newYear);
    };

    const rows = [];
    for (let i = 0; i < dates.length; i += 7) {
        rows.push(dates.slice(i, i + 7));
    }
    console.debug(rows)
    
    return (
        <>
            <div className={styles['calendar']}>
                <header className={styles['calendar__header']}>
                    <ChangeButton 
                        options={monthOptions}
                        width={15}
                        height={5}
                        size_type={{
                            width: '%',
                            height: 'vh'
                        }}
                        onSelect={handleChangeMonth}
                    />
                    <h3>{monthNames[month]} {year}</h3>
                </header>
                <section className={styles['calendar__table']}>
                    <table className={styles['calendar__grid']}>
                        <thead>
                            <tr>
                                {daysOfWeek.map(day => (
                                    <th key={day} className={styles['calendar__cell-header']}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((week, i) => (
                                <tr key={i}>
                                    {week.map((day, j) => {
                                        const isToday = isSameDay(day.date, today);
                                        return (
                                            <td
                                                key={j}
                                                className={`${styles['calendar__cell']} ${
                                                    !day.isCurrentMonth ? styles['calendar__cell--other'] : ''
                                                } ${isToday ? styles['today'] : ''}`}
                                            >
                                                <strong>{isToday && 'Today'} {day.date.getDate()}</strong>
                                                <div className={styles['calendar__cell-inner']}>
                                                    {
                                                        childrens.filter(child => isSameDay(child.date, day.date)).map((child, index) => <div key={index}>{child.element}</div>)
                                                    }
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}