class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene'})
  }

  preload() {
    this.load.image('js/assets/images/Scenes/Menu.jpg')
    console.log('hello')
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });


    this.load.on("progress", (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
      console.log(percent)
    })

    
  }

  create() {
    this.scene.start('Dungeon')
  }

  update() {

  }
}