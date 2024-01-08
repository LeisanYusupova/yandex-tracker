import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Datepicker = ({ startDate, setDate, defaultValue }) => {
    const today = new Date();
    const initialDate = startDate || today;
  return (
    <div className="input-wrapper">
      <label className='label' htmlFor="date">Выберите месяц</label>
      <DatePicker
        id="date"
        className="input datepicker"
        selected={initialDate}
        onChange={(date) => setDate(date)}
        showMonthYearPicker
        dateFormat="MM/yyyy" // Формат даты (месяц и год)

      />
    </div>
  );
};
