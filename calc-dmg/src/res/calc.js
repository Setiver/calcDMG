import { useState } from 'react';
import human from './img/human.png';

const CalcDMG = () => {
  // ---------------------------------- //
  const [barierValue, setBarierValue] = useState('');
  const [armorValue, setArmorValue] = useState('');
  const [hpValue, setHpValue] = useState('');
  const [damageValue, setDamageValue] = useState('');
  const [resistValue, setResistValue] = useState('');

  // buttons for barier,armor,hp
  const [buttonValueBarier, setButtonValueBarier] = useState('');
  const [buttonValueArmor, setButtonValueArmor] = useState('');
  const [buttonValueHP, setButtonValueHP] = useState('');

  // set useState with value
  function onChangeHandler(event, seter) {
    seter(Number(event.target.value));
    // console.log(Number(event.target.value));
  }

  // change color of input whene hit Enter and give button a value
  function handlerKeyDown(event, selector, color, setValueButton, valueButton) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (valueButton > 0) {
        document.querySelector(selector).style.backgroundColor = color;
        setValueButton(valueButton);
      }
    }
  }

  const damageReduct = () => {
    if (resistValue > 0) {
      setDamageValue(Math.trunc(damageValue * (resistValue / 100)));
    }
    if (resistValue <= 0) {
      setDamageValue(damageValue);
    }
  };

  const damageOnClick = event => {
    const clickOfButton = event.target;
    const barierButton = document.querySelector('.barier-button');
    const armorButton = document.querySelector('.armor-button');
    const hpButton = document.querySelector('.hp-button');

    if (clickOfButton === barierButton) {
      setButtonValueBarier(buttonValueBarier - damageValue);
    }
    if (clickOfButton === armorButton) {
      setButtonValueArmor(buttonValueArmor - damageValue);
    }
    if (clickOfButton === hpButton) {
      setButtonValueHP(buttonValueHP - damageValue);
    }
  };

  // ---------------------------------- //

  return (
    <>
      <img src={human} alt="something" className="human-img" />
      {/* -----------------BARIER----------------- */}
      <div className="barrier-container">
        <p className="barrier-text">Barrier</p>
        <input
          type="number"
          className="barrier-input input-look"
          onChange={event => onChangeHandler(event, setBarierValue)}
          onKeyDown={event =>
            handlerKeyDown(
              event,
              '.barrier-input',
              'rgb(0, 103, 141)',
              setButtonValueBarier,
              barierValue
            )
          }
          value={barierValue}
        />
      </div>
      {buttonValueBarier && ( // wyświetla przycisk, gdy wartość jest ustawiona
        <div>
          <button
            className="button-look barier-button"
            value={buttonValueBarier}
            onClick={damageOnClick}>
            {buttonValueBarier}
          </button>
        </div>
      )}

      {/* -----------------ARMOR----------------- */}
      <div className="armor-container">
        <p className="armor-text">Armor</p>
        <input
          type="number"
          className="armor-input input-look"
          onChange={event => onChangeHandler(event, setArmorValue)}
          onKeyDown={event =>
            handlerKeyDown(
              event,
              '.armor-input',
              'rgb(136, 136, 136)',
              setButtonValueArmor,
              armorValue
            )
          }
          value={armorValue}
        />
      </div>
      {buttonValueArmor && (
        <div>
          <button
            className="button-look armor-button"
            value={buttonValueArmor}
            onClick={damageOnClick}>
            {buttonValueArmor}
          </button>
        </div>
      )}
      {/* -----------------HP----------------- */}
      <div className="hp-container">
        <p className="hp-text">HP</p>
        <input
          type="number"
          className="hp-input input-look"
          onChange={event => onChangeHandler(event, setHpValue)}
          onKeyDown={event =>
            handlerKeyDown(event, '.hp-input', 'rgb(163, 0, 0)', setButtonValueHP, hpValue)
          }
          value={hpValue}
        />
      </div>
      {buttonValueHP && (
        <div>
          <button className="button-look hp-button" value={buttonValueHP} onClick={damageOnClick}>
            {buttonValueHP}
          </button>
        </div>
      )}

      {/* -----------------Damage----------------- */}
      <div className="damage-container">
        <p className="damage-text">Damage</p>
        <input
          type="number"
          className="damage-input input-look"
          onChange={event => onChangeHandler(event, setDamageValue)}
          value={damageValue}
        />
      </div>

      {/* -----------------Resistance----------------- */}
      <div className="resist-container">
        <p className="resist-text">Resist.%</p>
        <input
          type="number"
          className="resist-input input-look"
          onChange={event => onChangeHandler(event, setResistValue)}
          onClick={damageReduct}
          placeholder="%"
          value={resistValue}
        />
      </div>
    </>
  );
};

export default CalcDMG;
