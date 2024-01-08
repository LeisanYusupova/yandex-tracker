import {useState, useEffect} from 'react';
import {Button} from "@mantine/core";

export const Authorization = () => {
  const [trackers, setTrackers] = useState([]);
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {

    fetch('https://tracker.seven-group.pro/api/v1/trackers')
      .then((response) => response.json())
      .then((data) => setTrackers(data.trackers));

    const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
    setStoredData(storedData);
  }, []);
  const navigateToAuthPage = () => {
    window.location.href = '/auth.html';
  }

  const removeAccount = (login) => {
    const updatedData = storedData.filter((item) => item.login !== login);
    setStoredData(updatedData);
    window.localStorage.setItem('storedData', JSON.stringify(updatedData));
  };

  const handleSelectChange = (e, login) => {
    const selectedValue = e.target.value;
    const updatedStoredData = storedData.map((item) => {
      if (item.login === login) {
        const selectedTracker = trackers.find((item) => item.name === selectedValue);
        return {
          ...item,
          idOrg: selectedTracker ? selectedTracker.id : null,
          name: selectedTracker ? selectedTracker.name : null,
        };
      }
      return item;
    });

    setStoredData(updatedStoredData);
    localStorage.setItem('storedData', JSON.stringify(updatedStoredData));
  };


  return (
    <div>
      <div className ='column'>
        <h2 className='auth-title'>Авторизация</h2>
        <div className='wrapper-button'>
          {storedData.length > 0 && (
            storedData.map((item) => (
              <div className='button-container' key={item.login}>
                <Button >{item.login}</Button>
                <select
                  value={item.name || ''} //
                  onChange={(e) => handleSelectChange(e, item.login)}
                >
                  <option value='' disabled>
                    -- Select Tracker --
                  </option>
                  {trackers.map((tracker) => (
                    <option key={tracker.id} value={tracker.name}>
                      {tracker.name}
                    </option>
                  ))}
                </select>
                <button className='delete-button' onClick={() => removeAccount(item.login)}>
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" width="16px" height="16px"><path fill="#f78f8f" d="M21 24.15L8.857 36.293 4.707 32.143 16.85 20 4.707 7.857 8.857 3.707 21 15.85 33.143 3.707 37.293 7.857 25.15 20 37.293 32.143 33.143 36.293z"/><path fill="#c74343" d="M33.143,4.414l3.443,3.443L25.15,19.293L24.443,20l0.707,0.707l11.436,11.436l-3.443,3.443 L21.707,24.15L21,23.443l-0.707,0.707L8.857,35.586l-3.443-3.443L16.85,20.707L17.557,20l-0.707-0.707L5.414,7.857l3.443-3.443 L20.293,15.85L21,16.557l0.707-0.707L33.143,4.414 M33.143,3L21,15.143L8.857,3L4,7.857L16.143,20L4,32.143L8.857,37L21,24.857 L33.143,37L38,32.143L25.857,20L38,7.857L33.143,3L33.143,3z"/></svg>
                </button>
              </div>
            ))
          )}
        </div>
        <Button  onClick={navigateToAuthPage}>
          Добавить  аккаунт
        </Button>
      </div>
    </div>
  );
};