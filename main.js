const arenas = document.querySelector('.arenas');
const randomBtn = document.querySelector('.button');

const scorpion = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'assets/pers/scorpion/scorpion.gif',
  weapon: ['qwe', 'ewq'],
  attack() {
    console.log(this.name + ' Fight...');
  },
  elHP: elHP,
  renderHP: renderHP,
  changeHp: changeHp,
};

const subZero = {
  player: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'assets/pers/sub-zero/subzero.gif',
  weapon: ['qwe', 'ewq'],
  attack() {
    console.log(this.name + ' Fight...');
  },
  elHP: elHP,
  renderHP: renderHP,
  changeHp: changeHp,
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

function createReloadButton() {
  const reloadBtn = createEl('button', 'button');
  const div = createEl('div', 'reloadWrap');
  reloadBtn.innerText = 'Restart';
  div.appendChild(reloadBtn);
  return div
}

randomBtn.addEventListener('click', () => {
  subZero.changeHp(getRandom(20));
  subZero.renderHP();
  scorpion.changeHp(getRandom(20));
  scorpion.renderHP();

  if (subZero.hp === 0 || scorpion.hp === 0) {
    randomBtn.disabled = true;
    arenas.appendChild(createReloadButton());
    
    document.querySelector('.reloadWrap .button').addEventListener('click', function() {
      window.location.reload()
    });
  }

  if (subZero.hp === 0 && subZero.hp < scorpion.hp) {
    arenas.appendChild(playerWins(scorpion.name));
  } else if (scorpion.hp === 0 && scorpion.hp < subZero.hp) {
    arenas.appendChild(playerWins(subZero.name));
  } else if (subZero.hp === 0 && subZero.hp === 0) {
    arenas.appendChild(playerWins());
  }
});


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

