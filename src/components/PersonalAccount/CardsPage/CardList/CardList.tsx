import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from '../../CardContext/CardContext';
import { CardTemplate } from '../CardTemplate/CardTempate';
import { Card } from '../../../../types/Card';
import './CardList.scss';

type Props = {
  currentCard: number,
  setCurrentCard: (currentCard: number) => void,
};

export const CardList: React.FC<Props> = ({ currentCard, setCurrentCard}) => {
  const cardContext = useContext(CardContext);
  const { userCards, setUserCards } = cardContext;


  // const [currentCard, setCurrentCard] = useState(0);
  const [showCVV, setShowCVV] = useState(false);

  const card1: Card = {
    cardNumber: '1234567890123456',
    holderName: 'John Doe',
    monthExpire: '12',
    yearExpire: '25',
    cvv: '123',
    balance: 132,
  };

  const card2: Card = {
    cardNumber: '9876543210987654',
    holderName: 'Jane Smith',
    monthExpire: '03',
    yearExpire: '24',
    cvv: '456',
    balance: 432,
  };

  const card3: Card = {
    cardNumber: '1111222233334444',
    holderName: 'Alice Johnson',
    monthExpire: '07',
    yearExpire: '23',
    cvv: '789',
    balance: 932,
  };

  useEffect(() => {
    setUserCards([card1, card2, card3]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSlide = () => {
    const newSlideIndex = currentCard === userCards.length - 1 ? 0 : currentCard + 1;
    setCurrentCard(newSlideIndex);
  };
  
  const prevSlide = () => {
    const newSlideIndex = currentCard === 0 ? userCards.length - 1 : currentCard - 1;
    setCurrentCard(newSlideIndex);
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