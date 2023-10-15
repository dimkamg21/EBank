// import { Navigate, useNavigate } from 'react-router-dom';

import { Outlet } from 'react-router-dom'
import { Header } from "../Header/Header";
import './AccountApp.scss'
// import { CardProvider } from '../CardContext/CardContext';

export const AccountApp = () => {
  console.log(document.URL);

  // const navigate = useNavigate();

  // Приклад використання з параметром replace:
  // const handleButtonClick = () => {
  //   navigate('/новий-маршрут', { replace: true });
  // }; // Це зробить так, що при перезавантаженні сторінки користувач залишиться на сторінці Header, а не повернеться назад на сторінку авторизації.

  return (
    // <CardProvider>
      <div className="html">
        <Header />

        <Outlet />
      </div>
    // </CardProvider>
  );
};