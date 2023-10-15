import React, { useState } from 'react';
import './CardsPage.scss';
// import { Card } from '../../../types/Card';
import { AddCardForm } from './AddCardForm/AddCardForm';
import { CardList } from './CardList/CardList';

export const CardsPage: React.FC = () => {
  console.log(document.URL);
  // const [userCards, setUserCards] = useState<Card[]>([]);
  const [isAddForm, setIsAddForm] = useState(false);

  return (
    <div className="container-page">
      <div className="container-page__top">
        <CardList />
        <div className="add-info">
          <div className="add-info__balance-container">
            <h3>Balance: <strong>0.00</strong></h3>
          </div>

          <button className="add-info__transaction-history">Show Transaction History</button>
          <button onClick={() => setIsAddForm(true)}>Add a new Card</button>
        </div>
      </div>

      {isAddForm && (
        <div className="add-form-modal">
          <AddCardForm />
        </div>
      )}
    </div>
  );
};