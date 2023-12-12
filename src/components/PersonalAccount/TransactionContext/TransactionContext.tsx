import React, { createContext, useContext, useEffect, useState } from 'react';
import { Transaction } from '../../../types/Transactions';
import axios from "axios";
import { AuthContext } from '../../Auth/AuthContext';

async function fetchHistoryGET(url: string, params = {}) {
  try {
    const response = await axios.get(url, { params });
    if (response.status == 200) {
      return { success: true, empty: false, data: response.data };
    } else {
      return { success: true, empty: true };
    }
  } catch (error: any) {
    if (error.response && error.response.status) {
      return { success: false, error: `Server error: ${error.message}` };
    } else {
      return { success: false, error: `Request failed: ${error.message}` };
    }
  }
}

type TransactionContextType = {
  // userTransactions: TransactionType[];
  // setUserTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  transactionHistory: Transaction[],
  setTransactionHistory: React.Dispatch<React.SetStateAction<Transaction[]>>;
};

const initialValue: TransactionContextType = {
  // userTransactions: [],
  // setUserTransactions: () => {},
  transactionHistory: [],
  setTransactionHistory: () => {},
};

export const TransactionsContext = createContext<TransactionContextType>(initialValue);


type Props = {
  children: React.ReactNode;
};

export const TransactionsProvider: React.FC<Props> = ({ children }) => {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  // const [userTransactions, setUserTransactions] = useState<TransactionType[]>([]);
  const { id } = useContext(AuthContext);


  const fetchHistory = async () => {
    const response = await fetchHistoryGET("http://localhost:3001/api/history/", {
      user_id: id,
    });

    console.log(`Response IS ${response.data.status}`);


    if (response.success && !response.empty) {
      setTransactionHistory(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [id]);

  return (
    <TransactionsContext.Provider value={{ transactionHistory, setTransactionHistory }}>
      {children}
    </TransactionsContext.Provider>
  );
};