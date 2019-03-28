 class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene'})
  }

  preload() {
    this.load.audio('loadmusic', 'js/assets/music/loadingScreenSong.mp3')
  }

  create() {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.68, 'background')
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.39, 'menu')

    let music = this.sound.add('loadmusic')
    music.play()

    let playBtn = this.add.image(this.game.renderer.width / 2.05, this.game.renderer.height * 0.83, 'playbtn')

    playBtn.setInteractive();
    playBtn.on("pointerover", ()=> {
      music.pause()
      this.scene.start('HyruleScene')
    })
  }

  update() {

  }
}
