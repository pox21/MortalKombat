const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
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
  draw: 'Ничья - это тоже победа!'
};

const player1 = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'assets/pers/scorpion/scorpion.gif',
  weapon: ['qwe', 'ewq'],
  elHP, 
  renderHP,
  changeHp,
  attack,
};

const player2 = {
  player: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'assets/pers/sub-zero/subzero.gif',
  weapon: ['qwe', 'ewq'],
  attack,
  elHP,
  renderHP,
  changeHp,
};

function attack(item) {
  return {
    value: getRandom(HIT[item.value]),
    hit: item.value
  }
  
};

function createEl(tag, className) {
  const el = document.createElement(tag);

  if(className) {
    el.classList.add(className);
  }

  return el;
};

function playerWins(name) {
  const winsTitle = createEl('div', 'loseTitle');
  
  if (name) {
    winsTitle.innerText = `${name} Wins`;
  } else {
    winsTitle.innerText = 'Draw!';
  }
  return winsTitle;
};

function getRandom(num) {
  return Math.ceil(Math.random() * num);
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

function createReloadButton() {
  const reloadBtn = createEl('button', 'button');
  const reloadDiv = createEl('div', 'reloadWrap');
  reloadBtn.innerText = 'Restart';
  reloadDiv.appendChild(reloadBtn);

  reloadBtn.addEventListener('click', function() {
      window.location.reload();
    });

  arenas.appendChild(reloadDiv);
};


function createPlayer(pers) {

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

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
};

function playerAttack() {
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

function showResult() {
  if (player2.hp === 0 || player1.hp === 0) {
    createReloadButton();
    for(let item of formFight) {
      item.disabled = true;
    }
  }

  if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(playerWins(player1.name));
    endGame(player1.name, player2.name);
  } else if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
    endGame(player2.name, player1.name);
  } else if (player2.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
    endGame();
  }
};

function timeGenerate() {
  const data = new Date();
  // let hours = data.getHours();
  // let mins = data.getMinutes();
  // let sec = data.getSeconds();
  // if (mins < 10) {
  //   mins = `0${mins}`;
  // }
  // if (sec < 10) {
  //   sec = `0${sec} `${hours}:${mins}:${sec}``;
  //}
  const time = data.toLocaleTimeString();

  return time;
}

function startGame(player1, player2) {
  const text = logs.start.replace('[time]', timeGenerate()).replace('[player1]', player1).replace('[player2]', player2);
  const el = `<p>${text}</p>`
  chat.insertAdjacentHTML('afterbegin', el);
}

function endGame(player1 = '', player2 = '') {
  let text
  if (player1 && player2) {
     text = logs.end[getRandom(logs.end.length)].replace('[playerWins]', player1).replace('[playerLose]', player2);
  } else {
    text = `Результат боя: соперники гордо сложили ласты одновременно`;
  }
  
  const el = `<p>${text}</p>`;
  chat.insertAdjacentHTML('afterbegin', el)
};

startGame(player1.name, player2.name);

function generateLogs(type, player1, player2, dmg = 0) {

  const text = logs[type][getRandom(logs[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);

  const el = `
            <p>
              <span class="chat__text">
                <span class="chat__time">${timeGenerate()}</span> | 
                ${text}
                <span class="${dmg > 0 ? 'damage': 'damage--miss'}">${dmg > 0 ? `-${dmg}` : ''}</span>
              </span> 
              <span class="chat__hp">${player2.hp}/100</span>
            </p>`;
  chat.insertAdjacentHTML('afterbegin', el);
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
