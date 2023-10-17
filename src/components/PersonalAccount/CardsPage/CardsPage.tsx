import React, { useContext, useState } from 'react';
import './CardsPage.scss';
// import { Card } from '../../../types/Card';
import { AddCardForm } from './AddCardForm/AddCardForm';
import { CardList } from './CardList/CardList';
import { CardContext } from '../CardContext/CardContext';


export const CardsPage: React.FC = () => {
  console.log(document.URL);
  // const [userCards, setUserCards] = useState<Card[]>([]);
  const [isAddForm, setIsAddForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const cardContext = useContext(CardContext);
  const { userCards } = cardContext;
  console.log(userCards);
  
  return (
    <div className="container-page">
      <div className="container-page__top">
        <CardList currentCard={currentCardIndex} setCurrentCard={setCurrentCardIndex} />
        <div className="add-info">
          <div className="add-info__balance-container">
            <h3>Balance: <strong className="balance-window">{userCards[currentCardIndex]?.balance || 0}</strong></h3>
          </div>

          <button className="add-info__new-card-form" onClick={() => setIsAddForm(true)}>Add a new Card</button>

          <button 
            className="add-info__transaction-history" 
            onClick={() => setShowHistory(!showHistory)}
          >
            Show Transaction History
          </button>
        </div>
      </div>

      {isAddForm && (
        <div className="add-form-modal">
          <button className="turn-back" onClick={() => setIsAddForm(false)}>Cancel</button>
          <AddCardForm />
        </div>
      )}

      {showHistory && (
        <div className="history-transaction">
          <p>No history yet</p>
        </div>
      )}
    </div>
  );
};