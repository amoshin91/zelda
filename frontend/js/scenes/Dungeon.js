class Dungeon extends Phaser.Scene {
  constructor () {
    super({ key: 'Dungeon' })
  }

  preload () {

    console.log('im here')
    this.load.image('rupee', 'js/assets/images/sprites/zelda/rupee-single.png')
    this.load.image('heart', 'js/assets/images/sprites/zelda/PixelArt.png')
    this.load.image('walls', 'js/assets/images/walls.png')
    // this.load.image('lava', 'js/assets/images/terrain.png')
    this.load.image('objects', 'js/assets/images/terrain.png')
    this.load.image('floor', 'js/assets/images/tileset.png')
    this.load.tilemapTiledJSON('dungeon', 'js/assets/maps/dungeonnew.json')
    this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png', { frameWidth: 30, frameHeight: 36 })
    this.load.spritesheet('gano', 'js/assets/images/sprites/zelda/ganondorf-move-sheet.png', { frameWidth: 42, frameHeight: 42 })
  }

  create () {
    let score = 0
    this.add.text(100, 100, 'Score:' + score)
    const map = this.make.tilemap({ key: 'dungeon' })
    const objectsTileSet = map.addTilesetImage('terrain', 'objects')
    const floorTileset = map.addTilesetImage('tileset', 'floor')
    const wallsTileset = map.addTilesetImage('walls', 'walls')
    // debugger

    const backgroundLayer = map.createStaticLayer('Walls', wallsTileset, 0, 0)
    const groundLayer = map.createStaticLayer('Floors', floorTileset, 0, 0)
    const objectsLayer = map.createStaticLayer('Objects', objectsTileSet, 0, 0)
    
    const spawnPoint = map.findObject('Obj1', obj => obj.name === 'SpawnPoint')
    const enemySpawnPoint = map.findObject('Obj2', obj => obj.name === 'EnemySpawnPoint')
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 400, 300, 'link')
    player.health = 8
    this.enemy = this.physics.add.sprite(enemySpawnPoint.x, enemySpawnPoint.y, 300, 200, 'gano')
    this.enemy.health = 10

    this.physics.add.sprite(745, 597, 'rupee')
    backgroundLayer.setCollisionBetween(1, 39)
    backgroundLayer.setCollisionByProperty({ collides: true })
    // this.physics.add.collider(player, backgroundLayer, )
    const camera = this.cameras.main
    camera.startFollow(player)
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

    this.physics.add.collider(player, this.enemy, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.enemy, backgroundLayer, this.something, null, this)
  }


  update () {
    let cursors = this.input.keyboard.createCursorKeys()
    let linkSpeed = 3

    if (cursors.left.isDown) {
      player.x -= linkSpeed
      player.anims.play('left', true)
    } else if (cursors.right.isDown) {
      player.x += linkSpeed
      player.anims.play('right', true)
    } else if (cursors.down.isDown) {
      player.y += linkSpeed
      player.anims.play('down', true)
    } else if (cursors.up.isDown) {
      player.y -= linkSpeed
      player.anims.play('up', true)
    } else {
      player.anims.play('stand', true)
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
    this.physics.moveToObject(this.enemy, player, 85)
  }


  collisionHandler () {
    if (!player.invincible) {
      player.health = player.health - 0.5
      console.log(player.health)
      console.log("you've been hit!!")
    }
    if (player.health <= 0) {
      this.scene.start('GameOverScene')
      console.log('Gameover')
    }
  }

  timeScore () {
    let now = Date.now()
    if (timer > now) {
      let score_factor = (now - startTime) / timerLength
      score = score_factor
    }
  }
}
