import React, { createContext, useState } from 'react';
import { Transaction } from '../../../types/Transactions';

type TransactionContextType = {
  userTransactions: Transaction[];
  setUserTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
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
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);

  return (
    <TransactionsContext.Provider value={{ userTransactions, setUserTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
