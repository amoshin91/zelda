const config = {
  type: Phaser.AUTO,
  width: 700,
  height: 605,
  parent: "game-container",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: true
    },
    audio: {
        disableWebAudio: true
    }
  },
  scene: [LoadingScene, MenuScene, HyruleScene, Dungeon, GameOverScene]
};
let player
let score
let timerLength = 1000
let startTime = Date.now()
let weapon
let fireButton
const game = new Phaser.Game(config);
alert('Welcome to the Legend of Zelda å ')
let name = prompt('Please Enter a name')
  fetch('http://localhost:3000/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      player: {
        name: name

      }
    })
  }).then(res => res.json())
    // .then(console.log)
