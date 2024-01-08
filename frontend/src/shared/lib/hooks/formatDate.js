export const format = (date, lastDay) => {
  if (lastDay) {
    date.setMonth(date.getMonth() + 1, 0);
    date.setHours(20, 59, 59, 999);
  } else {
    date.setDate(date.getDate() - 1);
    date.setHours(21, 0, 0, 0);
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let formattedDate = '';

  if (lastDay) {
    formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.999`;
    return formattedDate;

  } else
    formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.00`;
    return formattedDate;
};

export const formatDate = (startDate, lastDay) => {
  const date = new Date(startDate);
  return format(date, lastDay);
};


