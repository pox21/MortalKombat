const arenas = document.querySelector('.arenas');
const randomBtn = document.querySelector('.button');

const scorpion = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'assets/pers/scorpion/scorpion.gif',
  weapon: ['qwe', 'ewq'],
  attack() {
    console.log(scorpion.name + ' Fight...');
  }
};

const subZero = {
  player: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'assets/pers/sub-zero/subzero.gif',
  weapon: ['qwe', 'ewq'],
  attack() {
    console.log(subZero.name + ' Fight...');
  }
};

function createEl(tag, className) {
  const el = document.createElement(tag);

  if(className) {
    el.classList.add(className);
  }

  return el;
};

function playerWins(name, draw) {
  const winsTitle = createEl('div', 'loseTitle');
  
  if (draw) {
    winsTitle.innerText = draw;
  } else {
    winsTitle.innerText = name + ' Wins';
  }
  return winsTitle;
};

function changeHp(player) {
  const playerLife = document.querySelector('.player'+ player.player +' .life')
  player.hp -= Math.ceil(Math.random() * 20);
  playerLife.style.width = player.hp + '%';

  if (player.hp <= 0) {
    player.hp = 0;
    playerLife.style.width = player.hp + '%';
  }
  return player.hp
};

randomBtn.addEventListener('click', () => {
  const sbz = changeHp(subZero);
  const scp = changeHp(scorpion);

  if (sbz === 0 || scp === 0) {
    randomBtn.disabled = true;
    
    if (sbz === 0 && scp === 0) {
      arenas.appendChild(playerWins(subZero.name, 'Draw'));
    } 
    if (sbz > scp) {
      arenas.appendChild(playerWins(subZero.name));
    } 
    if (sbz < scp) {
      arenas.appendChild(playerWins(scorpion.name));
    } 
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

