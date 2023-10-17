import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from '../CardContext/CardContext';
import { CardTemplate } from '../CardsPage/CardTemplate/CardTempate';
import './Transaction.scss';
import { Transaction, TransactionType } from '../../../types/Transactions';

export const TransactionPage: React.FC = () => {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [transactionType, setTransactionType] = useState<TransactionType>('withdrawal');
  const cardContext = useContext(CardContext);
  const { userCards, setUserCards } = cardContext;

  const [currentCard, setCurrentCard] = useState(0);
  const [showCVV, setShowCVV] = useState(false);

  const [withdrawalData, setWithdrawalData] = useState({
    recipientCard: '',
    amount: '',
    paymentPurpose: '',
  });

  const [mobileTopUpData, setMobileTopUpData] = useState({
    phoneNumber: '',
    amount: '',
  });

  const handleMakePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (transactionType === 'withdrawal') {
      const { recipientCard, amount, paymentPurpose } = withdrawalData;

      const senderCard = userCards[currentCard];

      const updatedUserCards = userCards.map((card, index) => {
        if (index === currentCard) {
          const newBalance = card.balance - parseFloat(amount);
          return { ...card, balance: newBalance };
        }
        return card;
      });

      setUserCards(updatedUserCards);
      setTransactionHistory([
        {
          senderCard: senderCard.cardNumber,
          recipientCard,
          type: 'withdrawal',
          amount: parseFloat(amount),
          balance: senderCard.balance - parseFloat(amount),
          paymentPurpose,
        },
        ...transactionHistory,
      ]);

      e.currentTarget.reset();
    } else if (transactionType === 'mobile-top-up') {
      const { phoneNumber, amount } = mobileTopUpData;

      setUserCards(userCards);
      setTransactionHistory([
        {
          senderCard: userCards[currentCard].cardNumber,
          phoneNumber: phoneNumber,
          type: 'mobile-top-up',
          amount: parseFloat(amount),
          balance: userCards[currentCard].balance - parseFloat(amount),
        },
        ...transactionHistory,
      ]);

      e.currentTarget.reset();
    }
  };

  const nextSlide = () => {
    setCurrentCard((prevSlide) => (prevSlide === userCards.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentCard((prevSlide) => (prevSlide === 0 ? userCards.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const cardElement = document.getElementById('cards-trans');
    if (cardElement) {
      cardElement.classList.add('fade-out');
      setTimeout(() => {
        cardElement.classList.remove('fade-out');
      }, 500);
    }
  }, [currentCard]);

  return (
    <div className="container-page">
      <div className="container-page__top">
        <div className="container-l">
          <button className="prev-button" onClick={prevSlide}>
            {'<'}
          </button>
          <div id="cards-trans" onDoubleClick={() => setShowCVV(!showCVV)} className="cards-container">
            {userCards && <CardTemplate isHovered={showCVV} cardData={userCards[currentCard]} />}
          </div>
          <button className="next-button" onClick={nextSlide}>
            {'>'}
          </button>
        </div>
        {transactionType === 'withdrawal' && (
          <form action="" className="input-container" onSubmit={handleMakePayment}>
            <input
              type="text"
              placeholder="Recipient's card"
              name="cardNumber"
              maxLength={16}
              className="card-number-input"
              minLength={16}
              onChange={(e) =>
                setWithdrawalData({
                  ...withdrawalData,
                  recipientCard: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Amount"
              className="card-number-input"
              onChange={(e) =>
                setWithdrawalData({
                  ...withdrawalData,
                  amount: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Payment Purpose"
              name="paymentPurpose"
              className="card-number-input"
              onChange={(e) =>
                setWithdrawalData({
                  ...withdrawalData,
                  paymentPurpose: e.target.value,
                })
              }
            />
            <button type="submit">Make payment</button>
          </form>
        )}

        {transactionType === 'mobile-top-up' && (
          <form action="" className="input-container" onSubmit={handleMakePayment}>
            <input
              type="text"
              placeholder="Recipient's phone number"
              name="phoneNumber"
              maxLength={10}
              className="card-number-input"
              minLength={10}
              onChange={(e) =>
                setMobileTopUpData({
                  ...mobileTopUpData,
                  phoneNumber: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Amount"
              className="card-number-input"
              onChange={(e) =>
                setMobileTopUpData({
                  ...mobileTopUpData,
                  amount: e.target.value,
                })
              }
            />
            <button type="submit">Top-Up</button>
          </form>
        )}
      </div>
        <div className="transaction-type-toggle">
          <label>
            <input
              type="radio"
              value="withdrawal"
              checked={transactionType === 'withdrawal'}
              onChange={() => setTransactionType('withdrawal')}
            />
            Withdrawal
          </label>
          <label>
            <input
              type="radio"
              value="mobile-top-up"
              checked={transactionType === 'mobile-top-up'}
              onChange={() => setTransactionType('mobile-top-up')}
            />
            Mobile Top-Up
          </label>
        </div>
      {transactionHistory.length > 0 && (
        <div className="transaction-history">
          <h2>Transaction History</h2>
          <ul>
            {transactionHistory.map((transaction, index) => (
              <li key={index} className="transaction-item">
                {` Sender Card: ${transaction.senderCard}
                ${
                  transaction.type === 'withdrawal'
                    ? `Recipient Card: ${transaction.recipientCard}`
                    : `Recipient Phone Number: ${transaction.phoneNumber}`
                }
                Balance: ${transaction.balance}
                Amount: ${transaction.amount}
                ${
                  transaction.type === 'withdrawal'
                    ? `Payment Purpose: ${transaction.paymentPurpose}
                       Type: Transfer of funds`
                    : 'Type: Mobile top-up'
                }`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
