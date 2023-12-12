import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from '../../CardContext/CardContext';
import { CardTemplate } from '../CardTemplate/CardTempate';
// import { Card } from '../../../../types/Card';
import './CardList.scss';

type Props = {
  currentCard: number,
  setCurrentCard: (currentCard: number) => void,
};

export const CardList: React.FC<Props> = ({ currentCard, setCurrentCard}) => {
  const { userCards, dataLoaded } = useContext(CardContext);

  const [showCVV, setShowCVV] = useState(false);
  
  const nextSlide = () => {
    const newSlideIndex = currentCard === userCards.length - 1 ? 0 : currentCard + 1;
    setCurrentCard(newSlideIndex);
  };
  
  const prevSlide = () => {
    const newSlideIndex = currentCard === 0 ? userCards.length - 1 : currentCard - 1;
    setCurrentCard(newSlideIndex);
  };

  // const formatedData = (card: Card) => {
  //   return {
  //     balance: card.balance,
  //     cardholder: card.cardholder,
  //     cvv: card.cvv,
  //     date: card.data,
  //     number: card.number,
  //   }
  // };

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
      {userCards && userCards.length > 0 && <button className="prev-button" onClick={prevSlide}>{'<'}</button>}

      <div
        id="cards-trans"
        onDoubleClick={() => setShowCVV(!showCVV)}
        className="cards-container"
      >
        {dataLoaded && userCards && userCards.length > 0 ? <CardTemplate isHovered={showCVV} cardData={userCards[currentCard]} /> : (
          <div className="add-info__balance-container no-cards">You dont have any cards yet</div>
        )}
      </div>

      {userCards && userCards.length > 0 && <button className="next-button" onClick={nextSlide}>{'>'}</button>}
    </div>
  );
};