class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene'})
  }

  preload() {

  }

  create() {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'menu')
    let playBtn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'playbtn')

    playBtn.setInteractive();
    playBtn.on("pointerover", ()=> {
      this.scene.start('Dungeon')
    })
  } 

  update() {

  }
}