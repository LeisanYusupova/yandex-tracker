import { Datepicker } from '../../shared/ui/datepicker/Datepicker';
import { useState, useEffect} from 'react';
import {formatDate} from '../../shared/lib/hooks/formatDate';
import Header from '../../shared/ui/header/Header';
import {fetchData} from '../../shared/lib/hooks/makeReport';
import {fillTable} from '../../shared/lib/hooks/makeReport';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import {Button} from "@mantine/core";

export const TimeCalculation = () => {
  const [inputValues, setInputValues] = useState([
    { login: '', tracker: '', id: null, isActive: false, date: null }]);
  const [startDate, setDate] = useState(null);
  const [trackers, setTrackers] = useState([]);
  const [recievedData, setRecievedData] = useState([]);
  const [users, setUsers] = useState([]);



  useEffect(() => {
    fetch('https://tracker.seven-group.pro/api/v1/trackers')
        .then((response) => response.json())
        .then((data) => setTrackers(data.trackers));
  }, []);

  useEffect(() => {
    const storedInputValuesString = window.localStorage.getItem('form');
    const storedInputValues = JSON.parse(storedInputValuesString);
    setInputValues(storedInputValues);
  }, []);

  useEffect(() => {
    const storedInputValuesString = window.localStorage.getItem('form');
    const storedInputValues = JSON.parse(storedInputValuesString);
    if (storedInputValues && storedInputValues.length > 0) {
      const date = new Date(storedInputValues[0].date);
      setDate(date);
    }else {
      const newInputValues = [{ login: '', tracker: '', id: null, isActive: false, date: null }];
      setInputValues(newInputValues);
    }
  }, []);


  const handleButtonClick = async () => {
    const test = typeof(startDate);
    console.log(test);
    const dateFrom = formatDate(startDate, false);
    const dateTo = formatDate(startDate, true);
    const storedData = JSON.parse(window.localStorage.getItem('storedData')) || [];
    let updatedData = [];
    const promises = [];
    try {
      for (const item of inputValues) {
        let url = `https://tracker.seven-group.pro/api/v2/worklog?createdBy=${item.login}&start=from:${dateFrom}&start=to:${dateTo}&perPage=1000`;
        console.log(url);
        const filteredData = storedData.find(data => data.name === item.tracker );
        const token = filteredData.token;
        const id = filteredData.idOrg;
        const promise = fetchData(url, id, token);
        promises.push(promise);
      }
      const results = await Promise.all(promises);
      updatedData = results.flat();
      setRecievedData(updatedData);
    } catch {
      console.log('error');
    }
    const newInputValues = [...inputValues];
    newInputValues[0].date = startDate;
    setInputValues(newInputValues);
    const inputValuesString = JSON.stringify(inputValues);
    window.localStorage.setItem('form', inputValuesString);

  };

  useEffect(() => {
    if (recievedData) {
      fillTable(recievedData);
    }
  }, [recievedData]);


  const handleInputChange = async (index, field, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index][field] = value;
    setInputValues(newInputValues);
  };


  const handleInputClick = async (index, value) => {
    if (inputValues[index].tracker !== '') {
      const newInputValues = [...inputValues];
      newInputValues[index].isActive = true;
      console.log(newInputValues[index].isActive);
      setInputValues(newInputValues);
      console.log(newInputValues);
      const url = `https://tracker.seven-group.pro/api/v2/users?&perPage=1000`;
      const storedData = JSON.parse(window.localStorage.getItem('storedData')) || [];
      const filteredData = storedData.find(data => data.name === inputValues[index].tracker);

      if (filteredData) {
        const token = filteredData.token;
        const id = filteredData.idOrg;
        try {
          const data = await fetchData(url, id, token);
          setUsers(data);
        }
        catch {
          console.log('Fetch error');
        }
      } else {
        console.log('Tracker data not found');
      }
    } else {
      console.log('Empty tracker or input value');
    }
  }
  const handleAddInput = () => {
    setInputValues((prevInputValues) => {
      const newInput = {
        id: Date.now(),
        login: '',
        tracker: ''
      };
      setTimeout(() => {
        const block = document.querySelector(".input-box");
        block.scrollTop = block.scrollHeight;
      }, 250);
      return [...prevInputValues, newInput];

    });
  };

  const handleDeleteInput = (id) => {
    setInputValues((prevInputValues) => {
      const newInputValues = prevInputValues.filter((_, i) => i !== id);
      return newInputValues;
    });
  };



  const itemClickHandler = (index, field, login) => {
    handleInputChange(index, field, login);
    const newInputValues = [...inputValues];
    newInputValues[index].isActive = false;
    setInputValues(newInputValues);
  }

  const filterUsers = (text) => {
    const lowerCaseText = text.toLowerCase();
    return users.filter((user) => user.display.toLowerCase().includes(lowerCaseText) || user.login.toLowerCase().includes(lowerCaseText));
  };


  return (
    <div>
      <Header />
      <div className="container">
        <Datepicker className = 'datepicker' startDate={startDate} setDate={setDate} defaultValue={startDate} />
        <div className='input-box'>
          {inputValues.map((input, id) => (
              <div className="wrapper" key = {input.id}>
                <div className='input-container'>
                  <div className="input-wrapper">
                    <label className='label' htmlFor="tracker">Выберите организацию</label>
                    <select className='input'
                            value={input.tracker}
                            onChange={(e) => handleInputChange(id, 'tracker', e.target.value)}
                            id = 'tracker'
                    >
                      <option value = '' disabled>
                        -- Select Tracker --
                      </option>
                      {trackers.map((tracker) => (
                          <option key={tracker.id} value={tracker.name}>
                            {tracker.name}
                          </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-wrapper">
                    <label className='label' htmlFor="login">Введите логин</label>
                    <input
                        className="input"
                        autoComplete='off'
                        id="login"
                        value = {inputValues[id].login}
                        onChange={(e) => handleInputChange(id, 'login', e.target.value)}
                        onClick={(e) => handleInputClick(id, 'login', e.target.value)}
                    />
                  </div>
                  <ul className='input-autocomplete'>
                    {inputValues[id].isActive &&
                        filterUsers(inputValues[id].login).map(({uid, login, display}) => {
                          return (
                              <li
                                  className='autocomplete-item'
                                  key={uid}
                                  onClick={(e)=> itemClickHandler(id, 'login', login)}>
                                <span style={{ fontWeight: 'bold' }}>{login}</span> {display}
                              </li>
                          )
                        })}
                  </ul>
                  <button className='remove-button' onClick={() => handleDeleteInput(id)}><IoIosRemoveCircleOutline size='28' color='red'/> </button>
                </div>
              </div>
          ))}
        </div>
        <div className="button-wrapper">
          <Button fullWidth size="xs" onClick={handleAddInput}>
            Добавить логин
          </Button>
          <Button fullWidth size="xs" onClick={handleButtonClick}>
            Отчет
          </Button>
        </div>
      </div>
      <div className="table-container"></div>
    </div>
  );
};
