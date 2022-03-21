export const checkSelectedDate = (selectedDate, currentDate) => {
    const selectedDateArray = selectedDate.split('-');
    const currentDateArray = currentDate.split('-');

    const selectedYear = parseFloat(selectedDateArray[2]);
    const selectedMonth = parseFloat(selectedDateArray[1]);
    const selectedDay = parseFloat(selectedDateArray[0]);

    const currentYear = parseFloat(currentDateArray[2]);
    const currentMonth = parseFloat(currentDateArray[1]);
    const currentDay = parseFloat(currentDateArray[0]);

    if (selectedYear < currentYear) {
        return true;
    } else if (selectedMonth < currentMonth && selectedYear === currentYear) {
        return true;
    } else if (selectedDay < currentDay && selectedMonth === currentMonth && selectedYear === currentYear) {
        return true;
    }

    return false;
}