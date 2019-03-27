class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene'})
  }

  preload() {

  }

  create() {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.68, 'background')
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.39, 'gameOver')
    let playBtn = this.add.image(this.game.renderer.width / 2.05, this.game.renderer.height * 0.83, 'menuBtn')

    menuBtn.setInteractive();
    menuBtn.on("pointerover", ()=> {
      this.scene.start('MenuScene')
    })
  }

  update() {

  }
}
