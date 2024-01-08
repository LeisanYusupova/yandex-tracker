import header from "../../ui/header/Header";


export const createTable =(groupedData) => {
  //очищение таблицы
  const myTable = document.querySelector('.myTable');

  if (myTable) {
    myTable.parentNode.removeChild(myTable)
  }

  const tableContainer = document.querySelector('.table-container');


  const table = document.createElement('table');
  table.className= 'myTable';
  //table.style.borderCollapse = 'collapse';
  const headerRow = table.insertRow();
  headerRow.style.border = '1px solid #dddddd';
  headerRow.style.padding = '5px';

  headerRow.insertCell(0).textContent ='Очередь';
  headerRow.insertCell(1).textContent = 'Дата';
  headerRow.insertCell(2).textContent = 'Название задачи';
  headerRow.insertCell(3).textContent = 'Длительность';
  headerRow.insertCell(4).textContent = 'Описание';
  headerRow.cells[0].style.width = '18%';
  headerRow.cells[1].style.width = '10%';
  headerRow.cells[2].style.width = '20%';
  headerRow.cells[3].style.width = '2%';
  headerRow.cells[4].style.width = '50%';

  headerRow.style.textAlign = 'center';
  headerRow.style.textAlign = 'center';
  headerRow.style.textAlign = 'center';

  let totalSum = 0;
  Object.keys(groupedData).forEach((date) => {
    const rowsForDate = groupedData[date].length;

    groupedData[date].forEach((item, itemIndex) => {
      const row = table.insertRow();
      row.style.border = '1px solid #dddddd';

      const queueCell = row.insertCell(0);
      const dateCell = row.insertCell(1);
      const keysCell = row.insertCell(2);
      const durationsCell = row.insertCell(3);
      const descriptionCell = row.insertCell(4);

      // Установка паддинга и выравнивания содержимого
      [queueCell, dateCell, keysCell, durationsCell, descriptionCell].forEach(cell => {
        cell.style.padding = '5px';
        cell.style.textAlign = 'center';
        cell.style.verticalAlign = 'middle';
      });

      durationsCell.style.borderBottom = '1px solid #dddddd';
      durationsCell.style.borderRight = '1px solid #dddddd';
      durationsCell.style.borderLeft = '1px solid #dddddd';

      dateCell.style.borderBottom = '1px solid #dddddd';
      dateCell.style.borderRight = '1px solid #dddddd';
      dateCell.style.borderLeft = '1px solid #dddddd';


      const lastIndex = item.issue.key.lastIndexOf("-");
      const queue = item.issue.key !== -1 ? item.issue.key.substring(0, lastIndex) : item.issue.key;

      queueCell.textContent = queue;

      // Используем `date` только для первой строки
      if (itemIndex === 0) {
        dateCell.textContent = date;
        dateCell.style.padding = '5px';
        dateCell.rowSpan = rowsForDate; // Объединение ячеек для общей даты
      } else {
        dateCell.style.display = 'none'; // Скрываем лишние ячейки для даты в других строках
      }

      if (itemIndex === 0) {
        let durations = 0;
        durations = groupedData[date].map((item) => item.duration);
        let sum = 0;
        sum = durations.reduce((acc, val) => acc + val, 0);
        totalSum += sum;
        let formattedSum;
        if (Number.isInteger(sum)) {
          formattedSum = sum.toFixed(0);
        } else if (sum.toFixed(1).endsWith('0')) {
          formattedSum = sum.toFixed(1);
        } else {
          formattedSum = sum.toFixed(2);
        }
        durationsCell.textContent = formattedSum.toString().replace('.', ',');
        durationsCell.style.padding = '5px';
        durationsCell.rowSpan = rowsForDate; // Объединение ячеек для общей даты
      }

      //заполняем третий столбец
      const issue = `<a href="https://tracker.yandex.ru/${item.issue.key}">${item.issue.key}</a>`;
      keysCell.innerHTML = issue;

      //заполняем пятый столбец для каждой задачи
      let formattedDuration = 0;
      if (Number.isInteger(item.duration)) {
        formattedDuration = item.duration.toFixed(0);
      } else if (item.duration.toFixed(1).endsWith('0')) {
        formattedDuration = item.duration.toFixed(1);
      } else {
        formattedDuration = item.duration.toFixed(2);
      }

      item.comment ? descriptionCell.textContent = `${item.issue.display} (${formattedDuration.toString().replace('.', ',')}) ${item.comment}`:
      descriptionCell.textContent = `${item.issue.display} (${formattedDuration.toString().replace('.', ',')})`;

      if (rowsForDate > 1 && itemIndex === 0) {
        keysCell.style.borderBottom = '2px solid #dddddd';
      }

      if (rowsForDate > 1 && itemIndex > 0) {
        row.deleteCell(1);
        row.deleteCell(2);
      }
    });

  });

  let formattedTotalSum;
  if (Number.isInteger(totalSum)) {
    formattedTotalSum = totalSum.toFixed(0);
  } else if (totalSum.toFixed(1).endsWith('0')) {
    formattedTotalSum = totalSum.toFixed(1);
  } else {
    formattedTotalSum = totalSum.toFixed(2);
  }

  const totalRow = table.insertRow();
  totalRow.style.border = '1px solid #dddddd';
  const totalCell = totalRow.insertCell(0);
  totalCell.textContent = 'Общая сумма часов за месяц';
  totalCell.style.padding = '5px';
  totalCell.style.textAlign = 'center';
  const totalSumCell = totalRow.insertCell(1);
  totalSumCell.colSpan = 4;
  totalSumCell.style.textAlign = 'center';
  const formattedNumber = formattedTotalSum.toString().replace('.', ',');
  totalSumCell.textContent = `${formattedNumber}`;
  totalSumCell.style.padding = '5px';



// Вставка таблицы в документ
  tableContainer.appendChild(table);

  totalSum = 0;
}