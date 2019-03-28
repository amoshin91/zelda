class Dungeon extends Phaser.Scene {
  constructor () {
    super({ key: 'Dungeon' })
  }

  preload () {
    // console.log('im here')
    this.load.image('rupee', 'js/assets/images/sprites/zelda/rupee-single.png')
    this.load.image('heart', 'js/assets/images/sprites/zelda/PixelArt.png')
    this.load.image('walls', 'js/assets/images/walls.png')
    this.load.image('lava', 'js/assets/images/terrain.png')
    this.load.image('floor', 'js/assets/images/tileset.png')
    this.load.tilemapTiledJSON('map', 'js/assets/maps/dungeonnew.json')
    this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png', { frameWidth: 30, frameHeight: 36 })
    this.load.spritesheet('gano', 'js/assets/images/sprites/zelda/ganondorf-move-sheet.png', { frameWidth: 42, frameHeight: 42 })
  }

  create () {
    let score = 0
    const text = this.add.text(100, 100, 'Score:' + score)
    const map = this.make.tilemap({ key: 'map' })
    const floorTileset = map.addTilesetImage('tileset', 'floor')
    const wallsTileset = map.addTilesetImage('walls', 'walls')
    const groundLayer = map.createStaticLayer('Floors', floorTileset, 0, 0)
    const backgroundLayer = map.createStaticLayer('Walls', wallsTileset, 0, 0)
    // let healthBar = this.add.sprite(100, 100, 'heart')
    // this.player.addChild(healthBar)
    const spawnPoint = map.findObject('Obj1', obj => obj.name === 'SpawnPoint')
    const enemySpawnPoint = map.findObject('Obj2', obj => obj.name === 'EnemySpawnPoint')
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 400, 300, 'link')
    this.enemy = this.physics.add.sprite(enemySpawnPoint.x, enemySpawnPoint.y, 300, 200, 'gano')
    this.player.health = 8
    backgroundLayer.setCollisionBetween(0, 482)
    this.physics.add.collider(this.player, backgroundLayer)
    backgroundLayer.setCollisionByProperty({ collides: true })
    const camera = this.cameras.main
    camera.startFollow(this.player)
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    // ========== Link's Animation Frame ===========================
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
      key: 'down',
      frames: this.anims.generateFrameNumbers('link', { start: 21, end: 28 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('link', { start: 13, end: 20 }),
      frameRate: 10,
      repeat: -1
    });
    // ======================== Ganon's Animation ========================
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

    this.anims.create({
      key: 'ganDown',
      frames: this.anims.generateFrameNumbers('gano', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'ganUp',
      frames: this.anims.generateFrameNumbers('gano', { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'ganStand',
      frames: this.anims.generateFrameNumbers('gano', { start: 0, end: 0 }),
      repeat: -1,
    })

    this.anims.create({
      key: 'coin',
      frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    })
  
    // this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.enemy, this.collisionHandler, null, this)
    this.physics.add.collider(this.player, this.enemy, backgroundLayer)
  }


  update () {
    let cursors = this.input.keyboard.createCursorKeys()
    let linkSpeed = 3
    
    if (cursors.left.isDown) {
      this.player.x -= linkSpeed
      this.player.anims.play('left', true)
    } else if (cursors.right.isDown) {
      this.player.x += linkSpeed
      this.player.anims.play('right', true)
    } else if (cursors.down.isDown) {
      this.player.y += linkSpeed
      this.player.anims.play('down', true)
    } else if (cursors.up.isDown) {
      this.player.y -= linkSpeed
      this.player.anims.play('up', true)
    } else {
      this.player.anims.play('stand', true)
    };

    if (this.enemy.body.velocity.x > 0) {
      this.enemy.anims.play('ganRight', true)
    } else if (this.enemy.body.velocity.x < 0) {
      this.enemy.anims.play('ganLeft', true)
    } else if (this.enemy.body.velocity.y > 0) {
      this.enemy.anims.play('ganUp', true)
    } else if (this.enemy.body.velocity.y < 0) {
      this.enemy.anims.play('ganDown', true)
    } else {
      this.enemy.anims.play('ganStand', true)
    }
    this.physics.moveToObject(this.enemy, this.player, 85)
  }


  collisionHandler () {
    if (!this.player.invincible) {
      this.player.health = this.player.health - 0.5
      console.log(this.player.health)
      console.log("you've been hit!!")
    }
    if (this.player.health <= 0) {
      this.scene.start('GameOverScene')
      console.log('Gameover')
    }
  }
}
