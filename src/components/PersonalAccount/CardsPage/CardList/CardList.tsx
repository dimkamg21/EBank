import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from '../../CardContext/CardContext';
import { CardTemplate } from '../CardTemplate/CardTempate';
import { Card } from '../../../../types/Card';
import './CardList.scss';

export const CardList: React.FC = () => {
  const cardContext = useContext(CardContext);
  const { userCards, setUserCards } = cardContext;


  const [currentCard, setCurrentCard] = useState(0);
  const [showCVV, setShowCVV] = useState(false);

  const card1: Card = {
    cardNumber: '1234567890123456',
    holderName: 'John Doe',
    monthExpire: '12',
    yearExpire: '25',
    cvv: '123',
  };

  const card2: Card = {
    cardNumber: '9876543210987654',
    holderName: 'Jane Smith',
    monthExpire: '03',
    yearExpire: '24',
    cvv: '456',
  };

  const card3: Card = {
    cardNumber: '1111222233334444',
    holderName: 'Alice Johnson',
    monthExpire: '07',
    yearExpire: '23',
    cvv: '789',
  };

  useEffect(() => {
    setUserCards([card1, card2, card3]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="container-l">
      <button className="prev-button" onClick={prevSlide}>{'<'}</button>

      <div
        id="cards-trans"
        onDoubleClick={() => setShowCVV(!showCVV)}
        className="cards-container"
      >
        {userCards && userCards.length > 0 && <CardTemplate isHovered={showCVV} cardData={userCards[currentCard]} />}

        {/* Додайте інші дані, які ви хочете відобразити на кожній картці */}
      </div>
      {/* ))} */}

      <button className="next-button" onClick={nextSlide}>{'>'}</button>
      {/* <button className=''>Add Card</button> */}
    </div>
  );
};