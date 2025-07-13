export default function generateMonthGrid(year: number, month: number) {
    const result: { date: Date, isCurrentMonth: boolean }[] = [];

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekDay = firstDayOfMonth.getDay() || 7;
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = firstWeekDay - 1; i > 0; i--) {
        result.push({
            date: new Date(year, month - 1, prevMonthLastDay - i + 1),
            isCurrentMonth: false
        });
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
        result.push({
            date: new Date(year, month, i),
            isCurrentMonth: true
        });
    }

    let nextMonthDay = 1;
    while(result.length < 42) {
        result.push({
            date: new Date(year, month + 1, nextMonthDay++),
            isCurrentMonth: false
        })
    }

    return result;
}