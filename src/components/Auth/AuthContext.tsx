import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  authorized: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (username: string, password: string) => Promise.resolve(),
  userName: '',
});

type Props = {
  children: React.ReactNode,
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [userName, setUserName] = useState('');

  async function login(username: string, password: string) {
    if (username !== 'Dima' || password !== '1234') {
      throw new Error('Username or password is wrong');
    }

    setAuthorized(true);
    setUserName(username)
  }

  return (
    <AuthContext.Provider value={{ authorized, login, userName }}>
      {children}
    </AuthContext.Provider>
  );
};
