import { useState, useEffect } from 'react';

const CalcDMG = () => {
  // ---------------------------------- //
  // buttons for barier,armor,hp, mana
  const [buttonValueBarier, setButtonValueBarier] = useState('');
  const [buttonValueArmor, setButtonValueArmor] = useState('');
  const [buttonValueHP, setButtonValueHP] = useState('');
  const [buttonValueMana, setButtonValueMana] = useState('');

  // storing values of inputs
  const [barierValue, setBarierValue] = useState('');
  const [armorValue, setArmorValue] = useState('');
  const [hpValue, setHpValue] = useState('');
  const [manaValue, setManaValue] = useState('');
  const [damageValue, setDamageValue] = useState('');
  const [healValue, setHealValue] = useState('');

  // storing values of addicional damage
  const [burnDamageValue, setBurnDamageValue] = useState('');
  const [coldDamageValue, setColdDamageValue] = useState('');
  const [poisonDamageValue, setPoisonDamageValue] = useState('');
  const [bleedDamageValue, setBleedDamageValue] = useState('');
  const [voidDamageValue, setVoidDamageValue] = useState('');

  // storing resists of inputs
  const [resistValueDamage, setResistValueDamage] = useState('');
  const [resistValueBurn, setResistValueBurn] = useState('');
  const [resistValueCold, setResistValueCold] = useState('');
  const [resistValuePoison, setResistValuePoison] = useState('');
  const [resistValueBleed, setResistValueBleed] = useState('');
  const [resistValueVoid, setResistValueVoid] = useState('');

  // add all damage to one value
  const [fullValueDamage, setFullValueDamage] = useState(0);

  // history holders values
  const [historyHolderBarrier, setHistoryHolderBarrier] = useState([]);
  const [historyHolderArmor, setHistoryHolderArmor] = useState([]);
  const [historyHolderHP, setHistoryHolderHP] = useState([]);

  // roll number holder
  const [rollValue, setRollValue] = useState('Roll');
  const [trialValue, setTrialValue] = useState('');
  // ---------------------------------- //

  // keep all resists for reset button
  const resistsAllHolder = () => {
    setResistValueDamage('');
    setResistValueBurn('');
    setResistValueCold('');
    setResistValuePoison('');
    setResistValueBleed('');
    setResistValueVoid('');
  };

  // keep all damage for reset button
  const damageAllHolder = () => {
    setDamageValue('');
    setBurnDamageValue('');
    setColdDamageValue('');
    setPoisonDamageValue('');
    setBleedDamageValue('');
    setVoidDamageValue('');
    setHealValue('');
    setRollValue('Roll');
    resistsAllHolder();
  };

  // reset button => set all to be empty
  const resetOnClickAll = () => {
    setBarierValue('');
    setArmorValue('');
    setHpValue('');
    setManaValue('');
    setButtonValueBarier('');
    setButtonValueArmor('');
    setButtonValueHP('');
    setButtonValueMana('');
    setHistoryHolderBarrier([]);
    setHistoryHolderArmor([]);
    setHistoryHolderHP([]);
    setRollValue('Roll');
    setTrialValue('');
    damageAllHolder();
    resistsAllHolder();
  };

  // reset button => set damage to be empty
  const resetOnClickDamage = () => {
    damageAllHolder();
    resistsAllHolder();
  };

  // set useState with value
  const onChangeHandler = (event, seter) => {
    seter(Number(event.target.value));
  };

  useEffect(() => {
    const originalScrollPosition = window.pageYOffset;
    window.scrollTo(0, originalScrollPosition);
  }, []);

  // change color of input whene hit Enter and give button a value
  const handlerKeyDown = (event, selector, color, setValueButton, valueButton) => {
    if (
      event.key === 'Enter' ||
      event.key === 'Done' ||
      event.key === 'Go' ||
      event.key === 'Tab' ||
      event.key === 'Ok' ||
      event.key === 'Return'
    ) {
      event.preventDefault();
      if (valueButton > 0) {
        document.querySelector(selector).style.backgroundColor = color;
        setValueButton(valueButton);
      }
    }
  };

  // on Reset clear colors of all inputs
  const effectBackToWhite =
    (barierValue || armorValue || hpValue || manaValue) === '' ? 'buttonValueBarier' : '';

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
            damageValue * (resistValueDamage <= 100 ? resistValueDamage * 0.01 : '') -
            healValue -
            -(
              burnDamageValue -
              burnDamageValue * (resistValueBurn <= 100 ? resistValueBurn * 0.01 : '')
            ) -
            -(
              coldDamageValue -
              coldDamageValue * (resistValueCold <= 100 ? resistValueCold * 0.01 : '')
            ) -
            -(
              poisonDamageValue -
              poisonDamageValue * (resistValuePoison <= 100 ? resistValuePoison * 0.01 : '')
            ) -
            -(
              bleedDamageValue -
              bleedDamageValue * (resistValueBleed <= 100 ? resistValueBleed * 0.01 : '')
            ) -
            -(
              voidDamageValue -
              voidDamageValue * (resistValueVoid <= 100 ? resistValueVoid * 0.01 : '')
            )
        )
      )
    );
  }, [
    damageValue,
    resistValueDamage,
    healValue,
    burnDamageValue,
    resistValueBurn,
    coldDamageValue,
    resistValueCold,
    poisonDamageValue,
    resistValuePoison,
    bleedDamageValue,
    resistValueBleed,
    voidDamageValue,
    resistValueVoid,
  ]);

  // damage on buttons
  const damageOnClick = event => {
    const clickOfButton = event.target;
    const barierButton = document.querySelector('.barier-button');
    const armorButton = document.querySelector('.armor-button');
    const hpButton = document.querySelector('.hp-button');

    if (clickOfButton === barierButton) {
      setButtonValueBarier(buttonValueBarier - fullValueDamage);
      setHistoryHolderBarrier(historyHolderBarrier => historyHolderBarrier.concat(fullValueDamage));
    }
    if (clickOfButton === armorButton) {
      setButtonValueArmor(buttonValueArmor - fullValueDamage);
      setHistoryHolderArmor(historyHolderArmor => historyHolderArmor.concat(fullValueDamage));
    }
    if (clickOfButton === hpButton) {
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

  const diceRollNumber = () => {
    let numberRoll = Math.trunc(Math.random() * 100) + 1;
    if ([47, 69, 7, 95, 13, 88, 9, 76, 23, 55, 31, 74, 8, 100, 3].includes(numberRoll)) {
      setRollValue(Number(numberRoll));
      document.querySelector('.number-dice-roll').style.backgroundColor = 'green';
    } else {
      setRollValue(Number(numberRoll + trialValue));
      document.querySelector('.number-dice-roll').style.backgroundColor = 'rgb(213, 113, 0)';
    }
  };

  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //
  // -------------------------------------------------------------------- //

  return (
    <div>
      {/* -----------------ResetButtonsUPLeft----------------- */}
      <div className="reset-position">
        <button className="button-look reset-button-all" onDoubleClick={resetOnClickAll}>
          RESET ALL
          <p className="reset-button-all-disclaimer">(double click)</p>
        </button>

        <button className="button-look reset-button-damage" onClick={resetOnClickDamage}>
          RESET DAMAGE
        </button>
      </div>
      {/* ---------------------------------------------------- */}
      {/* -----------------RightSideInputs----------------- */}
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
              'rgb(0, 243, 186)',
              setButtonValueBarier,
              barierValue
            )
          }
          placeholder="Enter"
          value={barierValue > 0 ? barierValue : ''}
        />
      </div>
      <div>
        <button
          className="button-look barier-button"
          value={buttonValueBarier}
          onClick={damageOnClick}>
          {buttonValueBarier}
        </button>
      </div>

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
          value={armorValue > 0 ? armorValue : ''}
        />
      </div>
      <div>
        <button
          className="button-look armor-button"
          value={buttonValueArmor}
          onClick={damageOnClick}>
          {buttonValueArmor}
        </button>
      </div>

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
          value={hpValue > 0 ? hpValue : ''}
        />
      </div>
      <div>
        <button className="button-look hp-button" value={buttonValueHP} onClick={damageOnClick}>
          {buttonValueHP}
        </button>
      </div>

      {/* -----------------Mana----------------- */}
      <div className="mana-container">
        <p className="text-up">Mana</p>
        <input
          type="number"
          className="mana-input input-look"
          onChange={event => onChangeHandler(event, setManaValue)}
          onKeyDown={event =>
            handlerKeyDown(event, '.mana-input', 'rgb(0, 204, 255)', setButtonValueMana, manaValue)
          }
          placeholder="Enter"
          value={manaValue > 0 ? manaValue : ''}
        />
      </div>
      <div>
        <button
          className="button-look mana-button"
          value={buttonValueMana}
          onClick={() => setButtonValueMana(buttonValueMana - 1)}>
          {buttonValueMana}
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* -----------------LeftSideInputs----------------- */}
      {/* -----------------Damage----------------- */}
      <div className="damage-container">
        <p className="text-up">Damage</p>
        <input
          type="number"
          className="damage-input input-look"
          onChange={event => onChangeHandler(event, setDamageValue)}
          placeholder="Click on buttons"
          value={damageValue > 0 ? damageValue : ''}
        />
      </div>
      {/* -----------------ResistanceDamage----------------- */}
      <div className="resist-container-damage">
        <p className="text-up">Resist.%</p>
        <input
          type="number"
          className="resist-input input-look"
          onChange={event => onChangeHandler(event, setResistValueDamage)}
          placeholder="Click on buttons"
          value={resistValueDamage !== 0 && resistValueDamage <= 100 ? resistValueDamage : ''}
        />
      </div>
      {/* -----------------Heal----------------- */}
      <div className="heal-container">
        <p className="text-up">Heal</p>
        <input
          type="number"
          className="heal-input input-look"
          onChange={event => onChangeHandler(event, setHealValue)}
          placeholder="Click on buttons"
          value={healValue > 0 ? healValue : ''}
        />
      </div>
      {/* ---------------------------------------------------- */}
      {/* -----------------DamageList----------------- */}
      <div className="full-damage-list-div">
        <ul className="list-group left">
          <p className="full-damage-text-up">DAMAGE</p>
          {damageValue > 0 ? <li className="list-group-item">⚔ Damage: {damageValue}</li> : ''}
          {resistValueDamage !== 0 && resistValueDamage !== '' && resistValueDamage <= 100 ? (
            <li className="list-group-item">🛡 Resistance: {resistValueDamage}%</li>
          ) : (
            ''
          )}
          {healValue > 0 ? <li className="list-group-item">❤ Heal: {healValue}</li> : ''}
          {burnDamageValue > 0 ? (
            <li className="list-group-item">🔥 Burn: {burnDamageValue}</li>
          ) : (
            ''
          )}
          {resistValueBurn !== 0 &&
          resistValueBurn !== '' &&
          resistValueBurn <= 100 &&
          burnDamageValue !== 0 ? (
            <li className="list-group-item">🚭 Burn Res: {resistValueBurn}%</li>
          ) : (
            ''
          )}
          {coldDamageValue > 0 ? (
            <li className="list-group-item"> ❄️ Cold: {coldDamageValue}</li>
          ) : (
            ''
          )}
          {resistValueCold !== 0 &&
          resistValueCold !== '' &&
          resistValueCold <= 100 &&
          coldDamageValue !== 0 ? (
            <li className="list-group-item">🧥 Cold Res: {resistValueCold}%</li>
          ) : (
            ''
          )}
          {poisonDamageValue > 0 ? (
            <li className="list-group-item">🧪 Poison: {poisonDamageValue}</li>
          ) : (
            ''
          )}
          {resistValuePoison !== 0 &&
          resistValuePoison !== '' &&
          resistValuePoison <= 100 &&
          poisonDamageValue !== 0 ? (
            <li className="list-group-item">💊 Poison Res: {resistValuePoison}%</li>
          ) : (
            ''
          )}
          {bleedDamageValue > 0 ? (
            <li className="list-group-item">🩸 Bleed: {bleedDamageValue}</li>
          ) : (
            ''
          )}
          {resistValueBleed !== 0 &&
          resistValueBleed !== '' &&
          resistValueBleed <= 100 &&
          bleedDamageValue !== 0 ? (
            <li className="list-group-item">🩹 Bleed Res: {resistValueBleed}%</li>
          ) : (
            ''
          )}
          {resistValueVoid > 0 ? (
            <li className="list-group-item"> 👾 Void: {voidDamageValue}</li>
          ) : (
            ''
          )}
          {resistValueVoid !== 0 &&
          resistValueVoid !== '' &&
          resistValueVoid <= 100 &&
          voidDamageValue !== 0 ? (
            <li className="list-group-item">🚫 Void Res: {resistValueVoid}%</li>
          ) : (
            ''
          )}
          {/* -----------------ValueShowButton----------------- */}
        </ul>
        <button className="button-list-damage move button-look ">
          {fullValueDamage ? fullValueDamage : '0'}
        </button>
      </div>
      {/* -----------------HostoryDamageList----------------- */}
      <div className="history-damage-list-div">
        <ul className="list-group right">
          <li>
            <p className="full-damage-text-up">HISTORY</p>
          </li>
          <HistoryHandler type={'Barrier'} holder={historyHolderBarrier} />
          <HistoryHandler type={'Armor'} holder={historyHolderArmor} />
          <HistoryHandler type={'HP'} holder={historyHolderHP} />
        </ul>
      </div>
      {/* -----------------BottomSideInputs----------------- */}
      {/* -----------------Burn----------------- */}
      <div className="burn-container">
        <p className="text-up">🔥</p>
        <input
          type="number"
          className="additional-damage input-look"
          onChange={event => onChangeHandler(event, setBurnDamageValue)}
          placeholder="0"
          value={burnDamageValue > 0 ? burnDamageValue : ''}
        />
      </div>
      <div className={`burn-container-resist ${burnDamageValue > 0 ? 'show' : ''}`}>
        <p className="text-up">🚭</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setResistValueBurn)}
          placeholder="0"
          value={
            resistValueBurn !== 0 && resistValueBurn !== '' && resistValueBurn <= 100
              ? resistValueBurn
              : ''
          }
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
          value={coldDamageValue > 0 ? coldDamageValue : ''}
        />
      </div>
      <div className={`cold-container-resist ${coldDamageValue > 0 ? 'show' : ''}`}>
        <p className="text-up">🧥</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setResistValueCold)}
          placeholder="0"
          value={
            resistValueCold !== 0 && resistValueCold !== '' && resistValueCold <= 100
              ? resistValueCold
              : ''
          }
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
          value={poisonDamageValue > 0 ? poisonDamageValue : ''}
        />
      </div>
      <div className={`poison-container-resist ${poisonDamageValue > 0 ? 'show' : ''}`}>
        <p className="text-up">💊</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setResistValuePoison)}
          placeholder="0"
          value={
            resistValuePoison !== 0 && resistValuePoison !== '' && resistValuePoison <= 100
              ? resistValuePoison
              : ''
          }
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
          value={bleedDamageValue > 0 ? bleedDamageValue : ''}
        />
      </div>
      <div className={`bleed-container-resist ${bleedDamageValue > 0 ? 'show' : ''}`}>
        <p className="text-up">🩹</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setResistValueBleed)}
          placeholder="0"
          value={
            resistValueBleed !== 0 && resistValueBleed !== '' && resistValueBleed <= 100
              ? resistValueBleed
              : ''
          }
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
          value={voidDamageValue > 0 ? voidDamageValue : ''}
        />
      </div>
      <div className={`void-container-resist ${voidDamageValue > 0 ? 'show' : ''}`}>
        <p className="text-up">🚫</p>
        <input
          type="number"
          className="additional-damage  input-look"
          onChange={event => onChangeHandler(event, setResistValueVoid)}
          placeholder="0"
          value={
            resistValueVoid !== 0 && resistValueVoid !== '' && resistValueVoid <= 100
              ? resistValueVoid
              : ''
          }
        />
      </div>
      {/* ---------------------------------------------------- */}
      {/* -----------------DiceRoll----------------- */}
      <div className="div-dice-roll">
        <button className="number-dice-roll button-look" onClick={diceRollNumber} value={rollValue}>
          {rollValue}
        </button>
        <input
          type="number"
          className="input-look trial"
          onChange={event => onChangeHandler(event, setTrialValue)}
          value={trialValue !== 0 ? trialValue : ''}
          placeholder="TRIAL"
        />
      </div>
    </div>
  );
};

export default CalcDMG;
