let rundenAnzahl = 4;
let aktuelleRunde = 0;
let customRunden = 0;

const runden = document.getElementsByName('runden');
const rundenAktuell = document.getElementById('runden-anzahl');
const customRadioBtn = document.getElementById('custom');
const customRounds = document.getElementById('custom-rounds');
const introScreen = document.querySelector('.restart');

// Zufallszahl von 1 bis 100  -> Computer
const zufallsZahl = () => Math.floor(Math.random() * 100);
let computerNummer = zufallsZahl();

//  Alles auf Reset
const reset = () => {
  aktuelleRunde = 0;
  customRunden = 0;
  rundenAktuell.innerHTML = `Rounds ${aktuelleRunde}/${rundenAnzahl}`;
  const hundredBoxes = document.querySelectorAll('.hundred');
  for (const box of hundredBoxes) {
    box.style.backgroundColor = '';
    box.style.color = '';
    box.classList.remove('gewinnZahlTog');
    box.classList.remove('lastNumberTog');
    box.style.pointerEvents = 'all';
    if (box.innerHTML.includes('WIN')) {
      box.innerHTML = computerNummer;
    }
  }
  computerNummer = zufallsZahl();
  introScreen.classList.remove('fadeIn');
  introScreen.classList.add('fadeOut');
};

// Restart Button
const restart = document.querySelector('#replay');
restart.addEventListener('click', function () {
  reset();
  introScreen.classList.remove('fadeIn');
  introScreen.classList.add('fadeOut');
});

// Erstellung von hundert Boxen mit Nummern
const create = function () {
  for (let i = 1; i <= 100; i++) {
    const section = document.getElementById('beam');
    const introDiv = document.createElement('div');
    // const introH3 = document.createElement('h3');
    const pIntroDiv = document.createTextNode(`${i}`);
    introDiv.append(pIntroDiv);
    introDiv.className = `hundred number${i}`;
    section.append(introDiv);
  }
};
create();

// Wie viele Runden?
const rundenModi = function (e) {
  rundenAnzahl = e.target.value;
  rundenAktuell.innerHTML = `Rounds ${aktuelleRunde}/${rundenAnzahl}`;
  customRounds.classList.remove('fadeIn');
  customRounds.classList.add('fadeOut');
  reset();
};

for (const singleRunde of runden) {
  singleRunde.addEventListener('click', rundenModi);
}

// Klick auf Custom RadioButton
customRadioBtn.addEventListener('click', function () {
  //   console.log('custom geklickt');
  customRounds.classList.add('fadeIn');
  customRounds.classList.remove('fadeOut');
  customRounds.value = 1;
  customRunden = customRounds.value;
  rundenAnzahl = customRounds.value;
  rundenAktuell.innerHTML = `Rounds ${aktuelleRunde}/${customRunden}`;
});

// CustomNummer Inputfeld onChange
const numberChange = function () {
  const tempRound = customRounds.value;
  rundenAnzahl = tempRound;
  customRunden = tempRound;
  rundenAktuell.innerHTML = `Rounds ${aktuelleRunde}/${customRunden}`;
};

customRounds.addEventListener('change', numberChange);
const hundert = document.querySelectorAll('.hundred');

// Farbe Lower Number / Higher Number
const nummerCheckFarbe = (e) => {
  const lowerColor = `blue  `;
  const higherColor = `yellow`;
  const jackpotColor = `lightgreen`;
  aktuelleRunde += 1;
  rundenAktuell.innerHTML = `Rounds ${aktuelleRunde}/${rundenAnzahl}`;
  const auswahlNummer = e.target.innerHTML;

  if (Number(auswahlNummer) === computerNummer) {
    console.log('yeah');
    e.target.innerHTML += ` WIN`;
    e.target.style.backgroundColor = jackpotColor;
    e.target.classList.add('gewinnZahlTog');
    introScreen.classList.remove('fadeOut');
    introScreen.classList.add('fadeIn');
  } else if (auswahlNummer > computerNummer && auswahlNummer !== computerNummer) {
    e.target.style.backgroundColor = higherColor;
    for (let i = 1; i < 100; i++) {
      if (auswahlNummer <= i) {
        hundert[i].style.backgroundColor = higherColor;
        hundert[i].style.pointerEvents = 'none';
      }
    }
  } else {
    e.target.style.backgroundColor = lowerColor;
    e.target.style.color = 'snow';
    for (let i = 0; i < 100; i++) {
      if (auswahlNummer > i && auswahlNummer !== computerNummer) {
        hundert[i].style.backgroundColor = lowerColor;
        hundert[i].style.color = 'snow';
        hundert[i].style.pointerEvents = 'none';
      }
    }
  }
};

// Spiel gameover?
const gameOverCheck = (e) => {
  console.log(e.target.innerHTML);
  console.log(`${computerNummer} NUMBERCOPM`);
  const gesuchteNummer = e.target.parentNode.childNodes[computerNummer - 1];

  if (aktuelleRunde >= rundenAnzahl) {
    console.log('akt Runde >= RundenAnzahl GAMEOVVER');
    e.target.classList.add('lastNumberTog');
    gesuchteNummer.classList.add('gewinnZahlTog');
    introScreen.classList.remove('fadeOut');
    introScreen.classList.add('fadeIn');
  }
};

const clickNumber = (e) => {
  // console.log(e.target.parentNode.childElementCount);
  nummerCheckFarbe(e);
  gameOverCheck(e);
};

// eventListener Loop auf hundert Boxen
for (const number of hundert) {
  number.addEventListener('click', clickNumber);
}
