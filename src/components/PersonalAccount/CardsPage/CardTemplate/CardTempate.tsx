import React from 'react';
import classnames from 'classnames';
import { Card } from '../../../../types/Card';
import '../AddCardForm/AddCardForm.scss'
import './CardTemplate.scss'

type Props = {
  isHovered: boolean,
  cardData: Card,
};

export const CardTemplate: React.FC<Props> = ({ isHovered, cardData }) => {
  // const [isHovered, setIsHovered] = useState(false);

  const frontClass = classnames('front', {
    'is-inactive': isHovered,
  });

  const backClass = classnames('back', {
    'is-active': isHovered,
  });

  return (
    <div className="card-container">

        <div className={frontClass}>
          <div className="image">
            <img src="../src/img/chip-logo.png" alt="chip" />
            <img src="../src/img/master2.png" alt="" />
          </div>
          <div className="card-number-box">
          {cardData && cardData.cardNumber ? cardData.cardNumber : '################'}
          </div>
          <div className="flexbox">
            <div className="box">
              <span>Card Holder</span>
              <div className="card-holder-name">{cardData.holderName || 'Full Name'}</div>
            </div>
            <div className="box">
              <span>Expires</span>
              <div className="expiration">
                <span className="exp-month">{cardData.monthExpire || 'MM'}</span>
                <span className="exp-month">/</span>
                <span className="exp-year">{cardData.yearExpire || 'YY'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={backClass}>
          <div className="stripe"></div>
          <div className="box">
            <span>{cardData.cvv || 'CVV'}</span>
            <div className="cvv-box">
              {/* cvv */}
            </div>
            <img src="image/visa.png" alt="" />
          </div>
        </div>
      </div>
  );
};