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
    }
  },
  scene: [LoadingScene, Dungeon]
};

const game = new Phaser.Game(config);
