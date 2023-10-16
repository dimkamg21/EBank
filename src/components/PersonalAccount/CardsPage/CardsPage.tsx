import React, {  useState } from 'react';
import './CardsPage.scss';
// import { Card } from '../../../types/Card';
import { AddCardForm } from './AddCardForm/AddCardForm';
import { CardList } from './CardList/CardList';
// import { CardContext } from '../CardContext/CardContext';


export const CardsPage: React.FC = () => {
  console.log(document.URL);
  // const [userCards, setUserCards] = useState<Card[]>([]);
  const [isAddForm, setIsAddForm] = useState(false);

  // const cardContext = useContext(CardContext);
  // const { userCards, setUserCards } = cardContext;

  // const 

  return (
    <div className="container-page">
      <div className="container-page__top">
        <CardList />
        <div className="add-info">
          <div className="add-info__balance-container">
            <h3>Balance: <strong>0.00</strong></h3>
          </div>

          <button className="add-info__transaction-history">Show Transaction History</button>
          <button className="add-info__new-card-form" onClick={() => setIsAddForm(true)}>Add a new Card</button>
        </div>
      </div>

      {isAddForm && (
        <div className="add-form-modal">
          <button className="turn-back" onClick={() => setIsAddForm(false)}>Cancel</button>
          <AddCardForm />
        </div>
      )}
    </div>
  );
};