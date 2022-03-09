export const checkSelectedDate = (selectedDate, currentDate) => {
    console.log('selectedDate: ', selectedDate);
    console.log('checking if past date');
    const selectedDateArray = selectedDate.split('-');
    const currentDateArray = currentDate.split('-');

    const selectedYear = parseFloat(selectedDateArray[2]);
    const selectedMonth = parseFloat(selectedDateArray[1]);
    const selectedDay = parseFloat(selectedDateArray[0]);

    const currentYear = parseFloat(currentDateArray[2]);
    const currentMonth = parseFloat(currentDateArray[1]);
    const currentDay = parseFloat(currentDateArray[0]);

    if (selectedYear < currentYear) {
        console.log('is a past date (past year)');
        return true;
    } else if (selectedMonth < currentMonth && selectedYear === currentYear) {
        console.log('is a past date (past month same year)');
        return true;
    } else if (selectedDay < currentDay && selectedMonth === currentMonth && selectedYear === currentYear) {
        console.log('is a past date (past day, same month and year)');
        return true;
    }

    console.log('not a past date');
    return false;
}