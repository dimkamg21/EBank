import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  authorized: false,
  userName: '',
  id: '',
  setId: (_id: string) => {},
  setAuthorized: (_bool: boolean) => {},
  setUserName:(_username: string) => {},
});

type Props = {
  children: React.ReactNode,
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [userName, setUserName] = useState('');

  const [id, setId] = useState('');

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized, userName, setUserName, id, setId }}>
      {children}
    </AuthContext.Provider>
  );
};
