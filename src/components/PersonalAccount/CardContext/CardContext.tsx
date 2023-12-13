import React, { createContext, useContext, useEffect, useState } from "react";
import { Card } from "../../../types/Card";
import { AuthContext } from "../../Auth/AuthContext";
import axios from "axios";

async function fetchDataGET(url: string, params = {}) {
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

// Оголошуємо тип для контексту
type CardContextType = {
  userCards: Card[];
  setUserCards: React.Dispatch<React.SetStateAction<Card[]>>;
  dataLoaded: boolean,
};

const initialValue: CardContextType = {
  userCards: [],
  setUserCards: () => {},
  dataLoaded: false,
};

export const CardContext = createContext<CardContextType>(initialValue);

type Props = {
  children: React.ReactNode;
};

export const CardProvider: React.FC<Props> = ({ children }) => {
  const [userCards, setUserCards] = useState<Card[]>([]);
  const { id } = useContext(AuthContext);
  const [dataLoaded, setDataLoaded] = useState(false);


  const fetchData = async () => {
    const response = await fetchDataGET("http://localhost:3001/api/cards/", {
      user_id: id,
    });

    if (response.success && !response.empty) {
      setUserCards(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchData()
      .then(() => setDataLoaded(true))
      .catch(() => setDataLoaded(false))
  }, [id]);

  return (
    <CardContext.Provider value={{ userCards, setUserCards, dataLoaded }}>
      {children}
    </CardContext.Provider>
  );
};
