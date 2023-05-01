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

  // storing resists of inputs
  const [resistValueDamage, setResistValueDamage] = useState('');
  const [resistValueBurn, setResistValueBurn] = useState('');

  // storing values of addicional damage

  const [burnDamageValue, setBurnDamageValue] = useState('');
  const [coldDamageValue, setColdDamageValue] = useState('');
  const [poisonDamageValue, setPoisonDamageValue] = useState('');
  const [bleedDamageValue, setBleedDamageValue] = useState('');
  const [voidDamageValue, setVoidDamageValue] = useState('');

  // add all damage to one value
  const [fullValueDamage, setFullValueDamage] = useState(0);

  // history holders values
  const [historyHolderBarrier, setHistoryHolderBarrier] = useState([]);
  const [historyHolderArmor, setHistoryHolderArmor] = useState([]);
  const [historyHolderHP, setHistoryHolderHP] = useState([]);
  // ---------------------------------- //

  // keep all damage for reset button
  const damageAllHolder = () => {
    setDamageValue('');
    setResistValueDamage('');
    setBurnDamageValue('');
    setColdDamageValue('');
    setPoisonDamageValue('');
    setBleedDamageValue('');
    setVoidDamageValue('');
    setResistValueBurn('');
  };

  // reset button => set all to be empty
  const resetOnClickAll = () => {
    setBarierValue('');
    setArmorValue('');
    setHpValue('');
    setButtonValueBarier('');
    setButtonValueArmor('');
    setButtonValueHP('');
    setHistoryHolderBarrier([]);
    setHistoryHolderArmor([]);
    setHistoryHolderHP([]);
    damageAllHolder();
  };

  // set useState with value
  const onChangeHandler = (event, seter) => {
    seter(Number(event.target.value));
  };

  // reset button => set damage to be empty

  const resetOnClickDamage = () => {
    damageAllHolder();
  };

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

  // on Reset clear colors of all inputs
  const effectBackToWhite =
    (barierValue || armorValue || hpValue) === '' ? 'buttonValueBarier' : '';

  useEffect(() => {
    const inputElems = document.querySelectorAll('.input-look');
    inputElems.forEach(elem => {
      elem.style.backgroundColor = 'white';
    });
  }, [effectBackToWhite]);

  useEffect(() => {
    setFullValueDamage(
      Number(
        Math.trunc(
          damageValue -
            damageValue * (resistValueDamage * 0.01) -
            -(burnDamageValue - burnDamageValue * (resistValueBurn * 0.01)) -
            -coldDamageValue -
            -poisonDamageValue -
            -bleedDamageValue -
            -voidDamageValue
        )
      )
    );
  }, [
    damageValue,
    resistValueDamage,
    burnDamageValue,
    resistValueBurn,
    coldDamageValue,
    poisonDamageValue,
    bleedDamageValue,
    voidDamageValue,
  ]);

  // damage on buttons
  const damageOnClick = event => {
    const clickOfButton = event.target;
    const barierButton = document.querySelector('.barier-button');
    const armorButton = document.querySelector('.armor-button');
    const hpButton = document.querySelector('.hp-button');

    if (clickOfButton === barierButton && fullValueDamage > 0) {
      setButtonValueBarier(buttonValueBarier - fullValueDamage);
      setHistoryHolderBarrier(historyHolderBarrier => historyHolderBarrier.concat(fullValueDamage));
    }
    if (clickOfButton === armorButton && fullValueDamage > 0) {
      setButtonValueArmor(buttonValueArmor - fullValueDamage);
      setHistoryHolderArmor(historyHolderArmor => historyHolderArmor.concat(fullValueDamage));
    }
    if (clickOfButton === hpButton && fullValueDamage > 0) {
      setButtonValueHP(buttonValueHP - fullValueDamage);
      setHistoryHolderHP(historyHolderHP => historyHolderHP.concat(fullValueDamage));
    }
  };

  // history List
  const HistoryHandler = ({ type, holder }) => {
    const historia = holder.map((obj, i) => (
      <li key={i}>
        {type}: {obj}
      </li>
    ));
    return <div>{historia}</div>;
  };

  // ---------------------------------- //

  return (
    <>
      <img src={human} alt="something" className="human-img" />
      {/* -----------------BARIER----------------- */}
      <div className="barrier-container">
        <p className="text-up">Barrier</p>
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
      {buttonValueBarier > 0 ? (
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
        <p className="text-up">Armor</p>
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
        <p className="text-up">HP</p>
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
        <p className="text-up">Damage</p>
        <input
          type="number"
          className="damage-input input-look"
          onChange={event => onChangeHandler(event, setDamageValue)}
          placeholder="Click on buttons"
          value={damageValue}
        />
      </div>

      {/* -----------------Resistance----------------- */}
      <div className="resist-container-damage">
        <p className="text-up">Resist.%</p>
        <input
          type="number"
          className="resist-input input-look"
          onChange={event => onChangeHandler(event, setResistValueDamage)}
          placeholder="Click on buttons"
          value={resistValueDamage}
        />
      </div>
      {/* -----------------ButtonReset----------------- */}
      <button className="button-look reset-button-all" onDoubleClick={resetOnClickAll}>
        RESET ALL
        <p className="reset-button-all-disclaimer">(double click)</p>
      </button>
      <button className="button-look reset-button-damage" onClick={resetOnClickDamage}>
        RESET DAMAGE
      </button>
      {/* -----------------DamageList----------------- */}
      <div className="full-damage-list-div">
        <ul className="list-group">
          <li>
            <p className="full-damage-text-up">DAMAGE</p>
          </li>
          {damageValue > 0 ? <li className="list-group-item">⚔ Damage: {damageValue}</li> : ''}
          {resistValueDamage > 0 ? (
            <li className="list-group-item">🛡 Resistance: {resistValueDamage}%</li>
          ) : (
            ''
          )}
          {burnDamageValue > 0 ? (
            <li className="list-group-item">🔥 Burn: {burnDamageValue}</li>
          ) : (
            ''
          )}
          {resistValueBurn > 0 ? (
            <li className="list-group-item">🚭 Burn Res: {resistValueBurn}%</li>
          ) : (
            ''
          )}
          {coldDamageValue > 0 ? (
            <li className="list-group-item"> ❄️ Cold: {coldDamageValue}</li>
          ) : (
            ''
          )}
          {poisonDamageValue > 0 ? (
            <li className="list-group-item">🧪 Poison: {poisonDamageValue}</li>
          ) : (
            ''
          )}
          {bleedDamageValue > 0 ? (
            <li className="list-group-item">🩸 Bleed: {bleedDamageValue}</li>
          ) : (
            ''
          )}
          {voidDamageValue > 0 ? (
            <li className="list-group-item"> 👾 Void: {voidDamageValue}</li>
          ) : (
            ''
          )}
          {/* -----------------ValueShowButton----------------- */}
          <button className="button-list-damage button-look">
            {fullValueDamage ? fullValueDamage : '0'}
          </button>
        </ul>
      </div>

      {/* -----------------HostoryDamageList----------------- */}
      <div className="history-damage-list-div">
        <ul className="list-group list-group-history">
          <li>
            <p className="full-damage-text-up">HISTORY</p>
          </li>
          <HistoryHandler type={'Barrier'} holder={historyHolderBarrier} />
          <HistoryHandler type={'Armor'} holder={historyHolderArmor} />
          <HistoryHandler type={'HP'} holder={historyHolderHP} />
        </ul>
      </div>

      {/* -----------------Burn----------------- */}
      <div className="burn-container">
        <p className="text-up">🔥</p>
        <input
          type="number"
          className="additional-damage input-look"
          onChange={event => onChangeHandler(event, setBurnDamageValue)}
          placeholder="0"
          value={burnDamageValue}
        />
      </div>
      <div className={`burn-container-resist ${burnDamageValue > 0 ? 'show' : ''}`}>
        <p className="text-up">🚭</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setResistValueBurn)}
          placeholder="0"
          value={resistValueBurn}
        />
      </div>

      {/* -----------------Cold----------------- */}
      <div className="cold-container">
        <p className="text-up">❄️</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setColdDamageValue)}
          placeholder="0"
          value={coldDamageValue}
        />
      </div>
      {/* -----------------Poison----------------- */}
      <div className="poison-container">
        <p className="text-up">🧪</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setPoisonDamageValue)}
          placeholder="0"
          value={poisonDamageValue}
        />
      </div>
      {/* -----------------Bleed----------------- */}
      <div className="bleed-container">
        <p className="text-up">🩸</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setBleedDamageValue)}
          placeholder="0"
          value={bleedDamageValue}
        />
      </div>
      {/* -----------------Void----------------- */}
      <div className="void-container">
        <p className="text-up">👾</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setVoidDamageValue)}
          placeholder="0"
          value={voidDamageValue}
        />
      </div>
    </>
  );
};

export default CalcDMG;
