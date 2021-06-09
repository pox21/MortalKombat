const arenas = document.querySelector('.arenas');
// const randomBtn = document.querySelector('.button');
const formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const scorpion = {
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

const subZero = {
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
    winsTitle.innerText = name + ' Wins';
  } else {
    winsTitle.innerText = 'Draw!';
  }
  return winsTitle;
};

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

function elHP() {
  return document.querySelector('.player'+ this.player +' .life')
}

function renderHP() {
  this.elHP().style.width = this.hp + '%';
}

function changeHp(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
};

function defenceRender(defValue, enemyAttackVal, attackVal) {
  if (defValue === enemyAttackVal) {
    if (attackVal - HIT[defValue] <= 0) {
      attackVal = 0;
    }
    return attackVal
  } else {
    return attackVal
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
}

// randomBtn.addEventListener('click', () => {
//   subZero.changeHp(getRandom(20));
//   subZero.renderHP();
//   scorpion.changeHp(getRandom(20));
//   scorpion.renderHP();

//   if (subZero.hp === 0 || scorpion.hp === 0) {
//     randomBtn.disabled = true;
//     createReloadButton();
//   }

//   if (subZero.hp === 0 && subZero.hp < scorpion.hp) {
//     arenas.appendChild(playerWins(scorpion.name));
//   } else if (scorpion.hp === 0 && scorpion.hp < subZero.hp) {
//     arenas.appendChild(playerWins(subZero.name));
//   } else if (subZero.hp === 0 && subZero.hp === 0) {
//     arenas.appendChild(playerWins());
//   }
// });


function createPlayer(pers) {

  const player = createEl('div', 'player' + pers.player);
  const progressbar = createEl('div', 'progressbar');
  const character = createEl('div', 'character');
  const life = createEl('div', 'life');
  const name = createEl('div', 'name');
  const img = createEl('img');
  img.src = pers.img;
  life.style.width = pers.hp + "%";
  name.innerText = pers.name;
  
  character.appendChild(img);
  progressbar.appendChild(life);
  progressbar.appendChild(name);
  player.appendChild(progressbar);
  player.appendChild(character);
  
  return player;
}

arenas.appendChild(createPlayer(scorpion));
arenas.appendChild(createPlayer(subZero));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}

formFight.addEventListener('submit', function(e) {
  e.preventDefault();

  const enemy = enemyAttack();
  let attack = {};

  for(let item of formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = scorpion.attack(item).value;
      attack.hit = scorpion.attack(item).hit;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value; 
    }
    item.checked = false;
  };

  subZero.changeHp(defenceRender(enemy.defence, attack.hit, attack.value));
  subZero.renderHP();
  scorpion.changeHp(defenceRender(attack.defence, enemy.hit, enemy.value));
  scorpion.renderHP();

  if (subZero.hp === 0 || scorpion.hp === 0) {
    createReloadButton();
  }

  if (subZero.hp === 0 && subZero.hp < scorpion.hp) {
    arenas.appendChild(playerWins(scorpion.name));
  } else if (scorpion.hp === 0 && scorpion.hp < subZero.hp) {
    arenas.appendChild(playerWins(subZero.name));
  } else if (subZero.hp === 0 && subZero.hp === 0) {
    arenas.appendChild(playerWins());
  }

});