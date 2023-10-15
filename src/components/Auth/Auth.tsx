import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext';
import './Auth.scss';

enum Login {
  auth = 'auth',
  reg = 'reg',
}

export const Auth: React.FC = () => {
  const [logProcess, setLogProcess] = useState<Login>(Login.auth);

  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage('');

    if (!username) return setUsernameError(true);
    if (!password) return setPasswordError(true);

    login(username, password)
      .then(() => navigate('/program'))
      .catch((error) => setErrorMessage(error.message));
  }


  console.log(document.URL);

  return (
    <>
      <div className="body">
        <div className="wrapper">
          <div className="logo">
            <img src="src/img/muh-logo.png" alt="Logo" />
          </div>
          <div className="text-center mt-4 name">ЄБанк</div>

          {logProcess === Login.auth ? (
            <div>
              <form className="p-3 mt-3" onSubmit={handleSubmit}>
                <div className={`form-field d-flex align-items-center ${usernameError ? 'input-error' : ''}`}>
                  <span className="far fa-user">
                    <img src="src/img/icons/user.png" alt="" />
                  </span>
                  <input type="text" name="userName"
                    id="userName" placeholder="Username" className="input-error"
                    onChange={(event) => {
                      setUsername(event.target.value),
                        setErrorMessage(''),
                        setUsernameError(false)
                    }}
                  />
                </div>
                <p></p>
                <div className={`form-field d-flex align-items-center ${passwordError ? 'input-error' : ''}`}>
                  <span className="far fa-user">
                    <img src="src/img/icons/padlock.png" alt="" />
                  </span>
                  <input type="password" name="password" id="pwd" placeholder="Password" onChange={(event) => {
                    setPassword(event.target.value),
                      setErrorMessage(''),
                      setPasswordError(false)
                  }}
                  />
                </div>
                <button className="btn mt-3">Login</button>
              </form>
              <div className="text-center fs-6">
                <a href="#" onClick={(e) => {
                  e.preventDefault(); // Забороняє перехід за посиланням
                  setLogProcess(Login.reg); // Ваш код для зміни стану
                }}>
                  Don't have an account?
                </a>
              </div>
            </div>
          ) : (
            <div>
              <form className="p-3 mt-3" onSubmit={handleSubmit}>
                <div className="form-field d-flex align-items-center">
                  <span className="far fa-user">
                    <img src="src/img/icons/mail.png" alt="" />
                  </span>
                  <input type="email" name="gmail" id="gmail" placeholder="Gmail" />
                </div>
                <div className="form-field d-flex align-items-center">
                  <span className="far fa-user">
                    <img src="src/img/icons/user.png" alt="" />
                  </span>
                  <input type="text" name="userName" id="userName" placeholder="Username" />
                </div>
                <div className="form-field d-flex align-items-center">
                  <span className="far fa-user">
                    <img src="src/img/icons/padlock.png" alt="" />
                  </span>
                  <input type="password" name="password" id="pwd" placeholder="Password" />
                </div>
                <button className="btn mt-3">Register</button>
              </form>
              <div className="text-center fs-6">
                <a href="#" onClick={(e) => {
                  e.preventDefault(); // Забороняє перехід за посиланням
                  setLogProcess(Login.auth); // Ваш код для зміни стану
                }}>
                  Already have an account?
                </a>
              </div>
            </div>
          )}

          {errorMessage && (<p className="error">{errorMessage}</p>)}
        </div>
      </div>
    </>
  );
};
