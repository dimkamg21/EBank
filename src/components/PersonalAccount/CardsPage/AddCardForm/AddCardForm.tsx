import React, { useState } from 'react';
// import './AddCardForm.scss';
import { CardTemplate } from '../CardTemplate/CardTempate';

export const AddCardForm: React.FC = () => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    holderName: '',
    monthExpire: '',
    yearExpire: '',
    cvv: '',
  });

  const [isHovered, setIsHovered] = useState(false);

  // зробити перевірку якшо номер карти вже є в списку, то не добавляти її

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = event.charCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Скасовуємо дію для символів, що не є цифрами (ASCII коди від 48 до 57)
    }
  };

  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    
    setCardData({
      ...cardData,
      [name]: value,
    });
  };

  const handleCVV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    if (/^\d*$/.test(value)) {
      setCardData({
        ...cardData,
        [name]: value,
      });
    }
  };

  return (
    <div className="container">

      <CardTemplate isHovered={isHovered} cardData={cardData} />

      <form action="">
        <div className="inputBox">
          <span>Card Number</span>
          <input
            name="cardNumber"
            type="text"
            maxLength={16}
            className="card-number-input"
            minLength={16}
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputBox">
          <span>Card Holder</span>
          <input type="text" className="card-holder-input"
            onChange={handleInputChange}
            name="holderName"
          />
        </div>

        <div className="flexbox">
          <div className="inputBox">
            <span>Expiration mm</span>
            <select
              name="monthExpire"
              className="month-input"
              value={cardData.monthExpire}
              onChange={handleInputChange}
            >
              <option value="" selected disabled>Month</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>

          <div className="inputBox">
            <span>Expiration Year</span>
            <select
              name="yearExpire"
              className="year-input"
              value={cardData.yearExpire}
              onChange={handleInputChange}
            >
              <option value="" selected disabled>Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>

          <div className="inputBox">
            <span>CVV</span>
            <input
              name="cvv"
              type="text"
              minLength={3}
              maxLength={3}
              className="cvv-input"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onKeyPress={handleKeyPress}
              onChange={handleCVV}
            />
          </div>
        </div>

        <button type="submit" value="Submit" className="submit-btn" >Submit</button>
      </form>
    </div>
  );
};