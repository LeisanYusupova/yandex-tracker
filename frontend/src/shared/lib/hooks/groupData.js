import { format, addDays, parseISO } from 'date-fns';

export const groupData = (data) => {
  const transformedData = data.map((item) => {
    const originalDate = parseISO(item.start);
    const formattedDate = format(originalDate, 'yyyy-MM-dd');
    return { ...item, start: formattedDate };
  });



  const groupedData = {};
  transformedData.forEach((item) => {
    //const date = item.start.split('T')[0]; // Извлекаем дату без времени
    if (!groupedData[item.start]) {
      groupedData[item.start] = [];
    }
    groupedData[item.start].push(item);
  });
  return groupedData;
}

