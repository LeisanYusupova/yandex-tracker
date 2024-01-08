import { formatDuration } from './formatDuration';
import { groupData } from './groupData';
import { createTable } from './createTable';
export const testFetch = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error; // выбросим ошибку дальше, если нужно
  }

}
export const fetchData = async (url,orgId, token) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `OAuth ${token}`,
        'Content-Type': 'application/json',
        'X-Org-ID': `${orgId}`,
        'credentials': 'include',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error; // выбросим ошибку дальше, если нужно
  }
}
export const fillTable = (data) => {
  data.map(item => {
    const hours = formatDuration(item.duration);
    item.duration = hours;
  });

  const groupedData= groupData(data);

  const sortedObject = Object.keys(groupedData)
    .sort((a, b) => new Date(a) - new Date(b))
    .reduce((obj, key) => {
      obj[key] = groupedData[key];
      return obj;
    }, {});

  createTable(sortedObject)
}



