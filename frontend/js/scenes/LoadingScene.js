class LoadingScene extends Phaser.Scene {
  constructor () {
    super({ key: 'LoadingScene' })
  }

  preload () {
    this.load.image('playbtn', 'js/assets/images/Scenes/playbutton2.png')
    this.load.image('menu', 'js/assets/images/Scenes/zeldaLogo.png')
    this.load.image('background', 'js/assets/images/Scenes/background.gif')

    

    console.log('hello')
    let loadingBar = this.add.graphics({
      fillStyle: {
        text: 'Loading...',
        color: 0xffffff,
        font: '20px MonoSpace'
      }
    })
    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
      console.log(percent)
    })
  }

  create () {
    this.scene.start('MenuScene')
  }

  update () {

  }
}
