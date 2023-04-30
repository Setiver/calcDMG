// import { useState, useEffect } from 'react';
import human from './img/human.png';

const CalcDMG = () => {
  return (
    <>
      <img src={human} alt="something" className="human-img" />
      <div className="barrier-container">
        <p className="barrier-text">Barrier</p>
        <input type="number" className=" barrier-input input-look" />
      </div>
      <div className="armor-container">
        <p className="armor-text">Armor</p>
        <input type="number" className="armor-input input-look" />
      </div>
      <div className="hp-container">
        <p className="hp-text">HP</p>
        <input type="number" className="hp-input input-look" />
      </div>
    </>
  );
};

export default CalcDMG;
