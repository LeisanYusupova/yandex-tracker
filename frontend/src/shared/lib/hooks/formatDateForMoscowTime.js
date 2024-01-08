export function formatDateForMoscowTime(dateTime) {
    const date = new Date(dateTime);
    const hours = date.getUTCHours();
    console.log(hours);

    // Если время после 21:00, добавляем месяц
    if (hours >= 21) {
        date.setUTC(date.getUTCMonth() + 1);

    }
    console.log(date);
    return date.toISOString();

}