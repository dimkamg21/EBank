import React, { useContext } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { AuthContext } from '../../Auth/AuthContext';
import './Header.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames({
    'is-active': isActive,
  });
};

export const Header: React.FC = () => {
  const { userName } = useContext(AuthContext);
  
  return (
    <div className="html">
      <header className="header">
        <nav className="header__navbar">
          <Link className="header__logo" to="">EBank</Link>
          <ul className="nav__links ">
            <li className="nav__link underline"><NavLink className={getLinkClass} to="cards">CARDS</NavLink></li>
            <li className="nav__link underline"><NavLink className={getLinkClass} to="transfer">TRANSFER</NavLink></li>
            <li className="nav__link underline"><NavLink className={getLinkClass} to="mobile-top-up">CASHBACK</NavLink></li>
          </ul>
          <div className="header__personal-info">
            <div className="header__personal-info__user">
              <p className="header__username">{userName}</p>
              <span className="far fa-user">
                <img src="src/img/icons/user.png" alt="" />
              </span>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>

    // const navigate = useNavigate();

  // Приклад використання з параметром replace:
  // const handleButtonClick = () => {
  //   navigate('/новий-маршрут', { replace: true });
  // }; // Це зробить так, що при перезавантаженні сторінки користувач залишиться на сторінці Header, а не повернеться назад на сторінку авторизації.

  );
};