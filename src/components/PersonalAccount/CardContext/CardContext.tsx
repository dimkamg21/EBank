import React, { createContext, useState } from 'react';
import { Card } from '../../../types/Card';

const card1: Card = {
  cardNumber: '1234567890123456',
  holderName: 'John Doe',
  monthExpire: '12',
  yearExpire: '25',
  cvv: '123',
  balance: 7687,
};

const card2: Card = {
  cardNumber: '9876543210987654',
  holderName: 'Jane Smith',
  monthExpire: '03',
  yearExpire: '24',
  cvv: '456',
  balance: 975,
};

const card3: Card = {
  cardNumber: '1111222233334444',
  holderName: 'Alice Johnson',
  monthExpire: '07',
  yearExpire: '23',
  cvv: '789',
  balance: 6666,
};

// Оголошуємо тип для контексту
type CardContextType = {
  userCards: Card[];
  setUserCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

const initialValue: CardContextType = {
  userCards: [], 
  setUserCards: () => {}
};

export const CardContext = createContext<CardContextType>(initialValue);


type Props = {
  children: React.ReactNode;
};

export const CardProvider: React.FC<Props> = ({ children }) => {
  const [userCards, setUserCards] = useState<Card[]>([card1, card2, card3]);

  return (
    <CardContext.Provider value={{ userCards, setUserCards }}>
      {children}
    </CardContext.Provider>
  );
};
