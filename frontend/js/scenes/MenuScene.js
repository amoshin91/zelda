 class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene'})
  }

  preload() {
    this.load.audio('loadmusic', 'js/assets/music/loadingScreenSong.mp3')
    // this.load.video('loadvideo', 'js/assets/videos/loadingVideo.mp4')
    this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png', { frameWidth: 30, frameHeight: 36 })
    this.load.spritesheet('gano', 'js/assets/images/sprites/zelda/ganondorf-move-sheet.png', { frameWidth: 42, frameHeight: 42 })
  }

  create() {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.68, 'background')
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.39, 'menu')

    // let video = this.video.add('loadvideo')
    // video.play(true)
    // video.addToWorld()


    let music = this.sound.add('loadmusic')
    music.play()

    let playBtn = this.add.image(this.game.renderer.width / 2.05, this.game.renderer.height * 0.83, 'playbtn')

    playBtn.setInteractive();
    playBtn.on("pointerover", ()=> {
      music.stop()
      player.body.velocity.x = 0;
      this.scene.start('HyruleScene')
    })


    player = this.physics.add.sprite(200, 560, 'link')
    this.enemy = this.physics.add.sprite(10, 560, 'gano')
    // this.enemy = this.physics.add.sprite(100, 560, 'gano')

    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('link', { start: 0, end: 0 })
    })
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('link', { start: 1, end: 6 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('link', { start: 7, end: 12 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'ganLeft',
      frames: this.anims.generateFrameNumbers('gano', { start: 2, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })
  // Ganon's
    this.anims.create({
      key: 'ganRight',
      frames: this.anims.generateFrameNumbers('gano', { start: 9, end: 15 }),
      frameRate: 10,
      repeat: -1,
    })
  }

  update() {


    // if (player.body.velocity.x === 0) {
    //   player.anims.play('stand', true)
    // } else if (player.body.velocity.x <= 0) {
    //   player.anims.play('left', true)
    // } else if (player.body.velocity.x >= 0) {
    //   player.anims.play('right', true)
    // }
    //
    // if (this.enemy.body.velocity.x <= 0) {
    //   this.enemy.anims.play('ganLeft', true)
    // } else if (this.enemy.body.velocity.x >= 0) {
    //   this.enemy.anims.play('ganRight', true)
    // }
    //
    // setInterval(function() {
    //   // player.anims.play('right', true)
    //   player.body.velocity.x = 50;
    //   // debugger
    // }, 1000)
    // this.physics.moveToObject(this.enemy, player, 60)
    //
    // setTimeout(function() {
    //   // player.anims.play('right', true)
    //   player.body.velocity.x = 0;
    // }, 4000)

    // setInterval(function() {
    //   // player.body.velocoty.x = 0;
    //   player.body.velocity.x = -100;
    //   // player.anims.play('left', true)
    // }, 4000)





  }
}
