import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "./Auth.scss";

enum Login {
  auth = "auth",
  reg = "reg",
}

export const Auth: React.FC = () => {
  const [logProcess, setLogProcess] = useState<Login>(Login.auth);

  const { setId, setAuthorized, setUserName } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  function handleSubmitLogin(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");

    if (!username) return setUsernameError(true);
    if (!password) return setPasswordError(true);

    const data = {
      login: username,
      password: password,
    };

    axios
      .post("http://localhost:3001/api/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        const data = response.data;

        console.log(data.id);
        setIsRegistered(true);
        setId(data.id);

        setAuthorized(true);
        setUserName(username);
        navigate("/program");
      })
      .catch(function (err) {
        console.error(err.response.data);
        setPassword("");
        setErrorMessage(err.message);
      });
  }

  const handleSubmitRegister = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email) return setEmailError(true);
    if (!username) return setUsernameError(true);
    if (!password) return setPasswordError(true);

    const data = {
      login: username,
      password: password,
      email: email,
    };

    axios
      .post("http://localhost:3001/api/users/registration", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data);
        console.debug()
        setIsRegistered(true);

        setPassword("");
        setUsername("");
      })
      .catch(function (err) {
        console.error(err.response.data);
      });
  };

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
              <form className="p-3 mt-3" onSubmit={handleSubmitLogin}>
                <div
                  className={`form-field d-flex align-items-center ${
                    usernameError ? "input-error" : ""
                  }`}
                >
                  <span className="far fa-user">
                    <img src="src/img/icons/user.png" alt="" />
                  </span>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Username"
                    className="input-error"
                    onChange={(event) => {
                      setUsername(event.target.value),
                        setErrorMessage(""),
                        setUsernameError(false);
                    }}
                  />
                </div>
                <p></p>
                <div
                  className={`form-field d-flex align-items-center ${
                    passwordError ? "input-error" : ""
                  }`}
                >
                  <span className="far fa-user">
                    <img src="src/img/icons/padlock.png" alt="" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    id="pwd"
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(event.target.value),
                        setErrorMessage(""),
                        setPasswordError(false);
                    }}
                  />
                </div>
                <button className="btn mt-3">Login</button>
              </form>
              <div className="text-center fs-6">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Забороняє перехід за посиланням
                    setLogProcess(Login.reg); // Ваш код для зміни стану
                  }}
                >
                  Don't have an account?
                </a>
              </div>
            </div>
          ) : (
            <div>
              <form className="p-3 mt-3" onSubmit={handleSubmitRegister}>
                <div
                  className={`form-field d-flex align-items-center ${
                    emailError ? "input-error" : ""
                  }`}
                >
                  <span className="far fa-user">
                    <img src="src/img/icons/mail.png" alt="" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Gmail"
                    onChange={(event) => {
                      setEmail(event.target.value),
                        setErrorMessage(""),
                        setEmailError(false);
                    }}
                  />
                </div>
                <div
                  className={`form-field d-flex align-items-center ${
                    usernameError ? "input-error" : ""
                  }`}
                >
                  <span className="far fa-user">
                    <img src="src/img/icons/user.png" alt="" />
                  </span>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Username"
                    onChange={(event) => {
                      setUsername(event.target.value),
                        setErrorMessage(""),
                        setUsernameError(false);
                    }}
                  />
                </div>
                <div
                  className={`form-field d-flex align-items-center ${
                    passwordError ? "input-error" : ""
                  }`}
                >
                  <span className="far fa-user">
                    <img src="src/img/icons/padlock.png" alt="" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    id="pwd"
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(event.target.value),
                        setErrorMessage(""),
                        setPasswordError(false);
                    }}
                  />
                </div>

                {!isRegistered ? (
                  <button className="btn mt-3">Register</button>
                ) : (
                  <button
                    type="button"
                    className="btn mt-3"
                    onClick={() => setLogProcess(Login.auth)}
                  >
                    Back to login
                  </button>
                )}
              </form>

              {!isRegistered && (
                <div className="text-center fs-6">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // Забороняє перехід за посиланням
                      setLogProcess(Login.auth);
                      setIsRegistered(false);
                    }}
                  >
                    Already have an account?
                  </a>
                </div>
              )}
            </div>
          )}

          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
};
