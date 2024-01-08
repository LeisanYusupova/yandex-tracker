
import { createBrowserRouter } from 'react-router-dom';
import { YandexAuthorization } from '../pages/yandexAutorization/YandexAuthorization';
import { TimeCalculation } from '../pages/timeCalculation/TimeCalculation';
import { Authorization } from '../pages/authorization/Authorization';

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <TimeCalculation />,
    },
    {
      path: '/authorization',
      element: <Authorization />,
    }
  ]);
};
