import React, { createContext, useState } from 'react';
import { TransactionType } from '../../../types/Transactions';

type TransactionContextType = {
  userTransactions: TransactionType[];
  setUserTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
};

const initialValue: TransactionContextType = {
  userTransactions: [],
  setUserTransactions: () => {}
};

export const TransactionsContext = createContext<TransactionContextType>(initialValue);


type Props = {
  children: React.ReactNode;
};

export const TransactionsProvider: React.FC<Props> = ({ children }) => {
  const [userTransactions, setUserTransactions] = useState<TransactionType[]>([]);

  return (
    <TransactionsContext.Provider value={{ userTransactions, setUserTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};