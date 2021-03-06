const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
      'Результат удара [playerWins]: [playerLose] - труп',
      '[playerLose] погиб от удара бойца [playerWins]',
      'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
      '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
      '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
      '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
      '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
      '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
      '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
      '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
      '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
      '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
      '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
      '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
      '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
      '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
      '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
      '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
      '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
      '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
      '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
      '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
      '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
      '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
      '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
      '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
      '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: [
    'Ничья - это тоже победа!',
    'Оба соперника решили слиться...',
    'Соперники оказались на столько ловкие, что уложили друг друга! lol)',
    'Легким движением правой ноги, один из противников уложил другого, после чего лёг рядом'
  ]
};

const player2 = {
  player: 2,
  name: 'SCORPION',
  hp: 100,
  img: 'assets/pers/scorpion/scorpion-p.gif',
  weapon: ['qwe', 'ewq'],
  elHP, 
  renderHP,
  changeHp,
  attack,
};

const player1 = {
  player: 1,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'assets/pers/sub-zero/subzero-project.gif',
  weapon: ['qwe', 'ewq'],
  attack,
  elHP,
  renderHP,
  changeHp,
};

const getRandom = (num) => {
  return Math.ceil(Math.random() * num);
};

function attack(item) {
  return {
    value: getRandom(HIT[item.value]),
    hit: item.value
  }
  
};

const createEl = (tag, className) => {
  const el = document.createElement(tag);

  if(className) {
    el.classList.add(className);
  }

  return el;
};

const playerWins = (name) => {
  const winsTitle = createEl('div', 'loseTitle');
  
  if (name) {
    winsTitle.innerText = `${name} Wins`;
  } else {
    winsTitle.innerText = 'Draw!';
  }
  return winsTitle;
};

function elHP() {
  return document.querySelector('.player'+ this.player +' .life')
};

function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
};

function changeHp(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
};

const createReloadButton = () => {
  const reloadBtn = createEl('button', 'button');
  const reloadDiv = createEl('div', 'reloadWrap');
  reloadBtn.innerText = 'Restart';
  reloadDiv.appendChild(reloadBtn);

  reloadBtn.addEventListener('click', function() {
      window.location.reload();
    });

  arenas.appendChild(reloadDiv);
};


const createPlayer = (pers) => {

  const player = createEl('div', `player${pers.player}`);
  const progressbar = createEl('div', 'progressbar');
  const character = createEl('div', 'character');
  const life = createEl('div', 'life');
  const name = createEl('div', 'name');
  const img = createEl('img');
  img.src = pers.img;
  life.style.width = `${pers.hp}%`;
  name.innerText = pers.name;
  
  character.appendChild(img);
  progressbar.appendChild(life);
  progressbar.appendChild(name);
  player.appendChild(progressbar);
  player.appendChild(character);
  
  return player;
};

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

arenas.classList.add(`arena${getRandom(6)}`);

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
};

const playerAttack = () => {
  const attack = {};

  for(let item of formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = player1.attack(item).value;
      attack.hit = player1.attack(item).hit;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value; 
    }
    item.checked = false;
    
  };
  return attack
};

const timeGenerate = () => {
  const data = new Date();
  const time = data.toLocaleTimeString();

  return time;
}

const generateLogs = (type = '', player1 = {}, player2 = {}, dmg = 0) => {
  let txt = '';
  switch(type) {
    case 'hit':
      text = logs[type][getRandom(logs[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
      break;
    case 'defence':
      text = logs[type][getRandom(logs[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
      break;
    case 'start':
      text = logs[type].replace('[time]', timeGenerate()).replace('[player1]', player1.name).replace('[player2]', player2.name);
      break;
    case 'end':
      text = logs[type][getRandom(logs[type].length -1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
      break;
    case 'draw':
      text = logs[type][getRandom(logs[type].length -1)];
      break;
    default:
      text = 'Кажется что то пошло не так...';
  };

  const el = `
            <p>
              <span class="chat__text">
                <span class="chat__time">${timeGenerate()}</span> | 
                ${text}
                <span class="${dmg > 0 ? 'damage': 'damage--miss'}">${dmg > 0 ? `-${dmg}` : ''}</span>
              </span> 
              ${dmg ? `<span class="chat__hp">${player2.hp}/100</span>` : ''}
            </p>`;
  chat.insertAdjacentHTML('afterbegin', el);

};

generateLogs('start', player1, player2);

const showResult = () => {
  if (player2.hp === 0 || player1.hp === 0) {
    createReloadButton();
    for(let item of formFight) {
      item.disabled = true;
    }
  }

  if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(playerWins(player1.name));
    generateLogs('end', player1, player2);
    document.querySelector('.player2 img').src = 'assets/pers/scorpion/scorpion-die.gif';
  } else if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
    document.querySelector('.player1 img').src = 'assets/pers/sub-zero/subzero-die.gif';
    generateLogs('end', player2, player1);
  } else if (player2.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
    document.querySelector('.player2 img').src = 'assets/pers/scorpion/scorpion-die.gif';
    document.querySelector('.player1 img').src = 'assets/pers/sub-zero/subzero-die.gif';
    generateLogs('draw');
  }
};

formFight.addEventListener('submit', function(e) {
  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();
  
  if (player.defence !== enemy.hit) {
    player1.changeHp(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2, player1, enemy.value);
  } else if (player.defence === enemy.hit) {
    generateLogs('defence', player2, player1);
  };

  if (enemy.defence !== player.hit) {
    player2.changeHp(player.value);
    player2.renderHP();
    generateLogs('hit', player1, player2, player.value);
  } else if (enemy.defence === player.hit) {
    generateLogs('defence', player1, player2);
  };
  
  showResult();
  
});
