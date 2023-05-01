import { useState, useEffect } from 'react';
import human from './img/human.png';

const CalcDMG = () => {
  // ---------------------------------- //
  // buttons for barier,armor,hp
  const [buttonValueBarier, setButtonValueBarier] = useState('');
  const [buttonValueArmor, setButtonValueArmor] = useState('');
  const [buttonValueHP, setButtonValueHP] = useState('');

  // storing values of inputs left and right
  const [barierValue, setBarierValue] = useState('');
  const [armorValue, setArmorValue] = useState('');
  const [hpValue, setHpValue] = useState('');
  const [damageValue, setDamageValue] = useState('');
  const [resistValue, setResistValue] = useState('');

  // storing values of addicional damage

  const [burnDamageValue, setBurnDamageValue] = useState('');

  // ---------------------------------- //

  // set useState with value
  const onChangeHandler = (event, seter) => {
    seter(Number(event.target.value));
  };

  // reset button set all to be empty
  const resetOnClick = () => {
    setBarierValue('');
    setArmorValue('');
    setHpValue('');
    setDamageValue('');
    setResistValue('');
    setButtonValueBarier('');
    setButtonValueArmor('');
    setButtonValueHP('');
  };
  // on Reset clear colors of all inputs
  useEffect(() => {
    const inputElems = document.querySelectorAll('.input-look');
    inputElems.forEach(elem => {
      elem.style.backgroundColor = 'white';
    });
  }, [(barierValue || armorValue || hpValue) === '' ? 'buttonValueBarier' : '']);

  // change color of input whene hit Enter and give button a value
  const handlerKeyDown = (event, selector, color, setValueButton, valueButton) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (valueButton > 0) {
        document.querySelector(selector).style.backgroundColor = color;
        setValueButton(valueButton);
      }
    }
  };

  // damage reduction
  const damageReduct = () => {
    if (resistValue > 0) {
      setDamageValue(Math.trunc(damageValue - damageValue * (resistValue * 0.01)));
    }
    if (resistValue <= 0) {
      setDamageValue(damageValue);
    }
  };

  // damage
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
          placeholder="Enter"
          value={barierValue}
        />
      </div>
      {buttonValueBarier > 0 ? ( // show buttons with value only when >0
        <div>
          <button
            className="button-look barier-button"
            value={buttonValueBarier}
            onClick={damageOnClick}>
            {buttonValueBarier}
          </button>
        </div>
      ) : (
        ''
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
          placeholder="Enter"
          value={armorValue}
        />
      </div>
      {buttonValueArmor > 0 ? (
        <div>
          <button
            className="button-look armor-button"
            value={buttonValueArmor}
            onClick={damageOnClick}>
            {buttonValueArmor}
          </button>
        </div>
      ) : (
        ''
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
          placeholder="Enter"
          value={hpValue}
        />
      </div>
      {buttonValueHP > 0 ? (
        <div>
          <button className="button-look hp-button" value={buttonValueHP} onClick={damageOnClick}>
            {buttonValueHP}
          </button>
        </div>
      ) : (
        ''
      )}

      {/* -----------------Damage----------------- */}
      <div className="damage-container">
        <p className="damage-text">Damage</p>
        <input
          type="number"
          className="damage-input input-look"
          onChange={event => onChangeHandler(event, setDamageValue)}
          placeholder="Click on buttons"
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
          onDoubleClick={damageReduct}
          placeholder="% Double click"
          value={resistValue}
        />
      </div>
      {/* -----------------ButtonReset----------------- */}
      <button className="button-look reset-button" onClick={resetOnClick}>
        RESET ALL
      </button>
      {/* -----------------DamageList----------------- */}
      <div className="full-damage-list-div">
        <ul className="list-group">
          <li>
            <p className="full-damage-text-up">DAMAGE</p>
          </li>
          {damageValue != '' ? <li className="list-group-item">⚔ Damage: {damageValue}</li> : ''}

          {resistValue != '' ? (
            <li className="list-group-item">🛡 Resistance: {resistValue}%</li>
          ) : (
            ''
          )}
          <button className="button-list-damage button-look">FULL</button>
        </ul>
      </div>
      {/* -----------------Burn----------------- */}
      <div className="burn-container">
        <p className="burn-text">🔥</p>
        <input
          type="number"
          className="burn-input input-look"
          onChange={event => onChangeHandler(event, setBurnDamageValue)}
          placeholder="Click"
          value={burnDamageValue}
        />
      </div>
    </>
  );
};

export default CalcDMG;
