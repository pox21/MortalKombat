const arenas = document.querySelector('.arenas');

const scorpion = {
  name: 'SCORPION',
  hp: 80,
  img: 'assets/pers/scorpion.gif',
  weapon: ['qwe', 'ewq'],
  attack() {
    console.log(scorpion.name + ' Fight...');
  }
};

const subZero = {
  name: 'SUB-ZERO',
  hp: 90,
  img: 'assets/pers/subzero.gif',
  weapon: ['qwe', 'ewq'],
  attack() {
    console.log(subZero.name + ' Fight...');
  }
};

function createPlayer(playerClass, pers) {

  function createEl(className) {
    const el = document.createElement('div');
    el.classList.add(className);

    return el;
  }

  const player = createEl(playerClass);
  const progressbar = createEl('progressbar');
  const character = createEl('character');
  const life = createEl('life');
  const name = createEl('name');
  // const player = document.createElement('div');
  // player.classList.add(playerClass);

  // const progressbar = document.createElement('div');
  // progressbar.classList.add('progressbar');

  // const character = document.createElement('div');
  // character.classList.add('character');
  const img = document.createElement('img');
  img.src = pers.img;

  // const life = document.createElement('div');
  // life.classList.add('life');
  life.style.width = pers.hp + "%";

  // const name = document.createElement('div');
  // name.classList.add('name');
  name.innerText = pers.name;
  
  character.appendChild(img);
  progressbar.appendChild(life);
  progressbar.appendChild(name);
  player.appendChild(progressbar);
  player.appendChild(character);
  
  arenas.appendChild(player);
}

createPlayer('player1', scorpion);
createPlayer('player2', subZero);

