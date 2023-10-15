import React, { createContext, useState } from 'react';
import { Card } from '../../../types/Card';

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
  const [userCards, setUserCards] = useState<Card[]>([]);

  return (
    <CardContext.Provider value={{ userCards, setUserCards }}>
      {children}
    </CardContext.Provider>
  );
};
