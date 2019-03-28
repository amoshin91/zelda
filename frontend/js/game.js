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
let player;
let score;


const game = new Phaser.Game(config);
let playerName = prompt("Please Enter your name: ")
