import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { CardContext } from "../CardContext/CardContext";
import { CardTemplate } from "../CardsPage/CardTemplate/CardTempate";
import "../CardsPage/CardList/CardList.scss";
import "./Transaction.scss";
import { Transaction, TransactionType } from "../../../types/Transactions";
import { AuthContext } from "../../Auth/AuthContext";

export const TransactionPage: React.FC = () => {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    []
  );

    

  const [transactionType, setTransactionType] =
    useState<TransactionType>("withdrawal");

    console.log(transactionType);

  const cardContext = useContext(CardContext);
  const { userCards, setUserCards } = cardContext;
  const { id } = useContext(AuthContext);

  const [currentCard, setCurrentCard] = useState(0);
  const [showCVV, setShowCVV] = useState(false);

  const handleMakePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recipientCardElement =
      e.currentTarget.querySelector<HTMLInputElement>('[name="cardNumber"]');

    const amountElement = e.currentTarget.querySelector<HTMLInputElement>(
      '[placeholder="Amount"]'
    );

    const paymentPurposeElement =
      e.currentTarget.querySelector<HTMLInputElement>(
        '[placeholder="Payment Purpose"]'
      );

    const phoneNumber = e.currentTarget.querySelector<HTMLInputElement>(
      '[name="phoneNumber"]'
    )?.value;

    // if (recipientCardElement && amountElement && paymentPurposeElement) {
    if (amountElement) {

      const recipientCard = recipientCardElement?.value;
      const amount = amountElement?.value;
      const paymentPurpose = paymentPurposeElement?.value;

      // Знайдіть поточну карту, з якої надсилається переказ
      const senderCard = userCards[currentCard];

      // Оновіть баланс кожної карти
      const updatedUserCards = userCards.map((card, index) => {
        if (index === currentCard) {
          const newBalance = card.balance - parseFloat(amount);
          return { ...card, balance: newBalance };
        }

        return card;
      });
      
      // if (transactionType)

      const data = {
        user_id: id,
        senderCard: senderCard.number,
        // recipientCard: recipientCard,
        type: transactionType,
        amount: parseFloat(amount),

        // balance: senderCard.balance - parseFloat(amount),
        details: paymentPurpose || 'none',
        [transactionType === "withdrawal" ? "recipientCard" : "phoneNumber"]:
          transactionType === "withdrawal" ? recipientCard : phoneNumber,
      };

      axios
        .post("http://localhost:3001/api/history/add", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (err) {
          console.error(err.response.data);
        });

      // Оновіть стан користувача та історію переказів
      setUserCards(updatedUserCards);
      setTransactionHistory([
        {
          user_id: id,
          senderCard: senderCard.number,
          type: transactionType,
          amount: parseFloat(amount),
          details: paymentPurpose,
          [transactionType === "withdrawal" ? "recipientCard" : "phoneNumber"]:
            transactionType === "mob-up" ? recipientCard : phoneNumber,
        },
        ...transactionHistory,
      ]);

      // Очистіть поля вводу
      e.currentTarget.reset();
    }
  };

  const nextSlide = () => {
    setCurrentCard((prevSlide) =>
      prevSlide === userCards.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentCard((prevSlide) =>
      prevSlide === 0 ? userCards.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const cardElement = document.getElementById("cards-trans");
    if (cardElement) {
      cardElement.classList.add("fade-out");
      setTimeout(() => {
        cardElement.classList.remove("fade-out");
      }, 500);
    }
  }, [currentCard]);

  return (
    <div className="container-page">
      <div className="container-page__top">
        <div className="container-l">
          <button className="prev-button" onClick={prevSlide}>
            {"<"}
          </button>

          <div
            id="cards-trans"
            onDoubleClick={() => setShowCVV(!showCVV)}
            className="cards-container"
          >
            {userCards && (
              <CardTemplate
                isHovered={showCVV}
                cardData={userCards[currentCard]}
              />
            )}
          </div>

          <button className="next-button" onClick={nextSlide}>
            {">"}
          </button>
        </div>

        {transactionType === "withdrawal" && (
          <form
            action=""
            className="input-container"
            onSubmit={handleMakePayment}
          >
            <input
              type="text"
              placeholder="Recipient's card"
              name="cardNumber"
              maxLength={16}
              className="card-number-input"
              minLength={16}
            />
            <input
              type="text"
              placeholder="Amount"
              className="card-number-input"
            />
            <input
              type="text"
              placeholder="Payment Purpose"
              name="paymentPurpose"
              className="card-number-input"
            />

            <button type="submit">Make payment</button>
          </form>
        )}

        {transactionType === "mob-up" && (
          <form
            action=""
            className="input-container"
            onSubmit={handleMakePayment}
          >
            <input
              type="text"
              placeholder="Recipient's phone number"
              name="phoneNumber"
              maxLength={10} // Максимальна довжина номера телефону
              className="card-number-input"
              minLength={10} // Мінімальна довжина номера телефону
            />
            <input
              type="text"
              placeholder="Amount"
              className="card-number-input"
            />
            <button type="submit">Make payment</button>
          </form>
        )}
      </div>

      <div className="transaction-type-toggle">
        <label>
          <input
            type="radio"
            value="withdrawal"
            checked={transactionType === "withdrawal"}
            onChange={() => setTransactionType("withdrawal")}
          />
          Withdrawal
        </label>
        <label>
          <input
            type="radio"
            value="mobile-top-up"
            checked={transactionType === "mob-up"}
            onChange={() => setTransactionType("mob-up")}
            // onClick={() => setTransactionType("mobile-top-up")}
          />
          Mobile Top-Up
        </label>
      </div>

      {/* {transactionHistory.length > 0 && (
        <div className="transaction-history">
          <h2>Transaction History</h2>
          <ul>
            {transactionHistory.map((transaction, index) => (
              <li key={index} className="transaction-item">
                {` Sender Card: ${transaction.senderCard}   
                Recipient Card: ${transaction.recipientCard}   
                Balance: ${transaction.balance}    
                Amount: ${transaction.amount}
                Payment Purpose: ${transaction.paymentPurpose}`}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};
