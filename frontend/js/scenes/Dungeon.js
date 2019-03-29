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
    this.load.tilemapTiledJSON('dungeon', 'js/assets/maps/dungeonarena.json')
    this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png', { frameWidth: 30, frameHeight: 36 })
    this.load.spritesheet('gano', 'js/assets/images/sprites/zelda/ganondorf-move-sheet.png', { frameWidth: 42, frameHeight: 42 })

    this.load.audio('dungeonmusic', 'js/assets/music/dungeonSong.mp3')

    this.load.spritesheet('ghost', 'js/assets/images/sprites/zelda/ghost-sprite.png', { frameWidth: 28, frameHeight: 46 })

    this.load.spritesheet('chicken', 'js/assets/images/sprites/zelda/chicken-sheet.png', { frameWidth: 26, frameHeight: 25 })

////////////////////////////////////////////////////////////////////

    this.load.image('collideLeft', 'js/assets/images/sprites/zelda/invisibleLeft.png')
    this.load.image('collideRight', 'js/assets/images/sprites/zelda/invisibleRight.png')
    this.load.image('collideTop', 'js/assets/images/sprites/zelda/invisibleTop.png')
    this.load.image('collideBottom', 'js/assets/images/sprites/zelda/invisibleBottom.png')


////////////////////////////////////////////////////////////////////
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

    let music = this.sound.add('dungeonmusic')

    music.play()

    // this.physics.add.collider(this.player, this.wall)
////////////////////////////////////////////////////////////////////

    this.collideLeft = this.physics.add.image(55, 640, 'collideLeft')
    this.collideRight = this.physics.add.image(55, 640, 'collideRight')
    this.collideTop = this.physics.add.image(700, 120, 'collideTop')
    this.collideBottom = this.physics.add.image(0, 0, 'collideRight')

////////////////////////////////////////////////////////////////////

    const spawnPoint = map.findObject('Obj1', obj => obj.name === 'SpawnPoint')
    const enemySpawnPoint = map.findObject('Obj2', obj => obj.name === 'EnemySpawnPoint')
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 400, 300, 'link')
    this.enemy = this.physics.add.sprite(enemySpawnPoint.x, enemySpawnPoint.y, 300, 200, 'gano')


    this.ghost = this.physics.add.sprite(1500, 200, 'ghost')
    this.chicken = this.physics.add.sprite(200, 1200, 'chicken')

    this.secondChicken = this.physics.add.sprite(100, 1200, 'secondChicken')
    this.thirdChicken = this.physics.add.sprite(150, 1200, 'thirdChicken')
    this.fourthChicken = this.physics.add.sprite(250, 1200, 'fourthChicken')
    this.fifthChicken = this.physics.add.sprite(300, 1200, 'fifthChicken')
    this.sixthChicken = this.physics.add.sprite(350, 1200, 'sixthChicken')
    this.seventhChicken = this.physics.add.sprite(400, 1200, 'seventhChicken')
    this.eighthChicken = this.physics.add.sprite(450, 1200, 'eighthChicken')
    this.ninthChicken = this.physics.add.sprite(500, 1200, 'ninthChicken')
    this.tenthChicken = this.physics.add.sprite(550, 1200, 'tenthChicken')

    this.eleven = this.physics.add.sprite(1200, 100, 'eleven')
    this.twelve = this.physics.add.sprite(1200, 150, 'twelve')
    this.thirteen = this.physics.add.sprite(1200, 200, 'thirteen')
    this.fourteen = this.physics.add.sprite(1200, 250, 'fourteen')
    this.fifteen = this.physics.add.sprite(1200, 300, 'fifteen')
    this.sixteen = this.physics.add.sprite(1200, 350, 'sixteen')
    this.seventeen = this.physics.add.sprite(1200, 400, 'seventeen')
    this.eighteen = this.physics.add.sprite(1200, 450, 'eighteen')
    this.nineteen = this.physics.add.sprite(1200, 500, 'nineteen')
    this.twenty = this.physics.add.sprite(1200, 550, 'twenty')

    this.twone = this.physics.add.sprite(800, 800, 'twone')
    this.twtwo = this.physics.add.sprite(800, 850, 'twtwo')
    this.twthree = this.physics.add.sprite(800, 900, 'twthree')
    this.twfour = this.physics.add.sprite(800, 950, 'twfour')
    this.twfive = this.physics.add.sprite(800, 1000, 'twfive')
    this.twsix = this.physics.add.sprite(850, 800, 'twsix')
    this.twseven = this.physics.add.sprite(900, 800, 'twseven')
    this.tweight = this.physics.add.sprite(950, 800, 'tweight')
    this.twnine = this.physics.add.sprite(1000, 800, 'twnine')
    this.twten = this.physics.add.sprite(750, 800, 'twten')



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

    this.anims.create({
      key: 'ghostAnim',
      frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'chickLeft',
      frames: this.anims.generateFrameNumbers('chicken', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'chickRight',
      frames: this.anims.generateFrameNumbers('chicken', { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    // this.player.setCollideWorldBounds(true);

    this.physics.add.collider(player, this.enemy, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.enemy, backgroundLayer)

    this.physics.add.collider(player, this.ghost, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.ghost, backgroundLayer)

    this.physics.add.collider(player, this.chicken, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.chicken, backgroundLayer)

    this.physics.add.collider(player, this.secondChicken, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.secondChicken, backgroundLayer)

    this.physics.add.collider(player, this.thirdChicken , this.collisionHandler, null, this)
    this.physics.add.collider(player, this.thirdChicken , backgroundLayer)

    this.physics.add.collider(player, this.fourthChicken, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.fourthChicken, backgroundLayer)

    this.physics.add.collider(player, this.fifthChicken, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.fifthChicken, backgroundLayer)

    this.physics.add.collider(player, this.sixthChicken, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.sixthChicken, backgroundLayer)

    this.physics.add.collider(player, this.seventhChicken, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.seventhChicken, backgroundLayer)

    this.physics.add.collider(player, this.eighthChicken, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.eighthChicken, backgroundLayer)

    this.physics.add.collider(player, this.ninthChicken, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.ninthChicken, backgroundLayer)

    this.physics.add.collider(player, this.tenthChicken, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.tenthChicken, backgroundLayer)

    this.physics.add.collider(player, this.eleven, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.eleven, backgroundLayer)

    this.physics.add.collider(player, this.twelve, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twelve, backgroundLayer)

    this.physics.add.collider(player, this.thirteen, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.thirteen, backgroundLayer)

    this.physics.add.collider(player, this.fourteen, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.fourteen, backgroundLayer)

    this.physics.add.collider(player, this.fifteen, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.fifteen, backgroundLayer)

    this.physics.add.collider(player, this.sixteen, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.sixteen, backgroundLayer)

    this.physics.add.collider(player, this.seventeen, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.seventeen, backgroundLayer)

    this.physics.add.collider(player, this.eighteen, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.eighteen, backgroundLayer)

    this.physics.add.collider(player, this.nineteen, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.nineteen, backgroundLayer)

    this.physics.add.collider(player, this.twenty, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twenty, backgroundLayer)

    this.physics.add.collider(player, this.twone, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twone, backgroundLayer)

    this.physics.add.collider(player, this.twtwo, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twtwo, backgroundLayer)

    this.physics.add.collider(player, this.twthree, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twthree, backgroundLayer)

    this.physics.add.collider(player, this.twfour, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twfour, backgroundLayer)

    this.physics.add.collider(player, this.twfive, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twfive, backgroundLayer)

    this.physics.add.collider(player, this.twsix, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twsix, backgroundLayer)

    this.physics.add.collider(player, this.twseven, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twseven, backgroundLayer)

    this.physics.add.collider(player, this.tweight, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.tweight, backgroundLayer)

    this.physics.add.collider(player, this.twnine, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twnine, backgroundLayer)

    this.physics.add.collider(player, this.twten, this.collisionHandler, null, this)
    this.physics.add.collider(player, this.twten, backgroundLayer)

    this.physics.add.collider(this.enemy, this.ghost, null, null, this)
    this.physics.add.collider(this.enemy, this.chicken, null, null, this)
    this.physics.add.collider(this.enemy, this.secondChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.thirdChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.fourthChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.fifthChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.sixthChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.seventhChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.eighthChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.enemy, this.eleven, null, null, this)
    this.physics.add.collider(this.enemy, this.twelve, null, null, this)
    this.physics.add.collider(this.enemy, this.thirteen, null, null, this)
    this.physics.add.collider(this.enemy, this.fourteen, null, null, this)
    this.physics.add.collider(this.enemy, this.fifteen, null, null, this)
    this.physics.add.collider(this.enemy, this.sixteen, null, null, this)
    this.physics.add.collider(this.enemy, this.seventeen, null, null, this)
    this.physics.add.collider(this.enemy, this.eighteen, null, null, this)
    this.physics.add.collider(this.enemy, this.nineteen, null, null, this)
    this.physics.add.collider(this.enemy, this.twenty, null, null, this)
    this.physics.add.collider(this.enemy, this.twone, null, null, this)
    this.physics.add.collider(this.enemy, this.twtwo, null, null, this)
    this.physics.add.collider(this.enemy, this.twthree, null, null, this)
    this.physics.add.collider(this.enemy, this.twfour, null, null, this)
    this.physics.add.collider(this.enemy, this.twfive, null, null, this)
    this.physics.add.collider(this.enemy, this.twsix, null, null, this)
    this.physics.add.collider(this.enemy, this.twseven, null, null, this)
    this.physics.add.collider(this.enemy, this.tweight, null, null, this)
    this.physics.add.collider(this.enemy, this.twnine, null, null, this)
    this.physics.add.collider(this.enemy, this.twten, null, null, this)

    this.physics.add.collider(this.ghost, this.chicken, null, null, this)
    this.physics.add.collider(this.ghost, this.secondChicken, null, null, this)
    this.physics.add.collider(this.ghost, this.thirdChicken, null, null, this)
    this.physics.add.collider(this.ghost, this.fourthChicken, null, null, this)
    this.physics.add.collider(this.ghost, this.fifthChicken, null, null, this)
    this.physics.add.collider(this.ghost, this.sixthChicken, null, null, this)
    this.physics.add.collider(this.ghost, this.seventhChicken, null, null, this)
    this.physics.add.collider(this.ghost, this.eighthChicken, null, null, this)
    this.physics.add.collider(this.ghost, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.ghost, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.ghost, this.eleven, null, null, this)
    this.physics.add.collider(this.ghost, this.twelve, null, null, this)
    this.physics.add.collider(this.ghost, this.thirteen, null, null, this)
    this.physics.add.collider(this.ghost, this.fourteen, null, null, this)
    this.physics.add.collider(this.ghost, this.fifteen, null, null, this)
    this.physics.add.collider(this.ghost, this.sixteen, null, null, this)
    this.physics.add.collider(this.ghost, this.seventeen, null, null, this)
    this.physics.add.collider(this.ghost, this.eighteen, null, null, this)
    this.physics.add.collider(this.ghost, this.nineteen, null, null, this)
    this.physics.add.collider(this.ghost, this.twenty, null, null, this)
    this.physics.add.collider(this.ghost, this.twone, null, null, this)
    this.physics.add.collider(this.ghost, this.twtwo, null, null, this)
    this.physics.add.collider(this.ghost, this.twthree, null, null, this)
    this.physics.add.collider(this.ghost, this.twfour, null, null, this)
    this.physics.add.collider(this.ghost, this.twfive, null, null, this)
    this.physics.add.collider(this.ghost, this.twsix, null, null, this)
    this.physics.add.collider(this.ghost, this.twseven, null, null, this)
    this.physics.add.collider(this.ghost, this.tweight, null, null, this)
    this.physics.add.collider(this.ghost, this.twnine, null, null, this)
    this.physics.add.collider(this.ghost, this.twten, null, null, this)

    this.physics.add.collider(this.chicken, this.secondChicken, null, null, this)
    this.physics.add.collider(this.chicken, this.thirdChicken, null, null, this)
    this.physics.add.collider(this.chicken, this.fourthChicken, null, null, this)
    this.physics.add.collider(this.chicken, this.fifthChicken, null, null, this)
    this.physics.add.collider(this.chicken, this.sixthChicken, null, null, this)
    this.physics.add.collider(this.chicken, this.seventhChicken, null, null, this)
    this.physics.add.collider(this.chicken, this.eighthChicken, null, null, this)
    this.physics.add.collider(this.chicken, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.chicken, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.chicken, this.eleven, null, null, this)
    this.physics.add.collider(this.chicken, this.twelve, null, null, this)
    this.physics.add.collider(this.chicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.chicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.chicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.chicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.chicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.chicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.chicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.chicken, this.twenty, null, null, this)
    this.physics.add.collider(this.chicken, this.twone, null, null, this)
    this.physics.add.collider(this.chicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.chicken, this.twthree, null, null, this)
    this.physics.add.collider(this.chicken, this.twfour, null, null, this)
    this.physics.add.collider(this.chicken, this.twfive, null, null, this)
    this.physics.add.collider(this.chicken, this.twsix, null, null, this)
    this.physics.add.collider(this.chicken, this.twseven, null, null, this)
    this.physics.add.collider(this.chicken, this.tweight, null, null, this)
    this.physics.add.collider(this.chicken, this.twnine, null, null, this)
    this.physics.add.collider(this.chicken, this.twten, null, null, this)

    this.physics.add.collider(this.secondChicken, this.thirdChicken, null, null, this)
    this.physics.add.collider(this.secondChicken, this.fourthChicken, null, null, this)
    this.physics.add.collider(this.secondChicken, this.fifthChicken, null, null, this)
    this.physics.add.collider(this.secondChicken, this.sixthChicken, null, null, this)
    this.physics.add.collider(this.secondChicken, this.seventhChicken, null, null, this)
    this.physics.add.collider(this.secondChicken, this.eighthChicken, null, null, this)
    this.physics.add.collider(this.secondChicken, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.secondChicken, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.secondChicken, this.eleven, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twelve, null, null, this)
    this.physics.add.collider(this.secondChicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.secondChicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.secondChicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.secondChicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.secondChicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.secondChicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.secondChicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twenty, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twone, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twthree, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twfour, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twfive, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twsix, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twseven, null, null, this)
    this.physics.add.collider(this.secondChicken, this.tweight, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twnine, null, null, this)
    this.physics.add.collider(this.secondChicken, this.twten, null, null, this)

    this.physics.add.collider(this.thirdChicken, this.fourthChicken, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.fifthChicken, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.sixthChicken, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.seventhChicken, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.eighthChicken, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.eleven, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twelve, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twenty, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twone, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twthree, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twfour, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twfive, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twsix, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twseven, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.tweight, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twnine, null, null, this)
    this.physics.add.collider(this.thirdChicken, this.twten, null, null, this)

    this.physics.add.collider(this.fourthChicken, this.fifthChicken, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.sixthChicken, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.seventhChicken, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.eighthChicken, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.eleven, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twelve, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twenty, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twone, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twthree, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twfour, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twfive, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twsix, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twseven, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.tweight, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twnine, null, null, this)
    this.physics.add.collider(this.fourthChicken, this.twten, null, null, this)

    this.physics.add.collider(this.fifthChicken, this.sixthChicken, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.seventhChicken, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.eighthChicken, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.eleven, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twelve, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twenty, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twone, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twthree, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twfour, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twfive, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twsix, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twseven, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.tweight, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twnine, null, null, this)
    this.physics.add.collider(this.fifthChicken, this.twten, null, null, this)

    this.physics.add.collider(this.sixthChicken, this.seventhChicken, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.eighthChicken, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.eleven, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twelve, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twenty, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twone, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twthree, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twfour, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twfive, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twsix, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twseven, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.tweight, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twnine, null, null, this)
    this.physics.add.collider(this.sixthChicken, this.twten, null, null, this)

    this.physics.add.collider(this.seventhChicken, this.eighthChicken, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.eleven, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twelve, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twenty, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twone, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twthree, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twfour, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twfive, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twsix, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twseven, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.tweight, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twnine, null, null, this)
    this.physics.add.collider(this.seventhChicken, this.twten, null, null, this)

    this.physics.add.collider(this.eighthChicken, this.ninthChicken, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.eleven, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twelve, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twenty, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twone, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twthree, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twfour, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twfive, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twsix, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twseven, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.tweight, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twnine, null, null, this)
    this.physics.add.collider(this.eighthChicken, this.twten, null, null, this)

    this.physics.add.collider(this.ninthChicken, this.tenthChicken, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.eleven, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twelve, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twenty, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twone, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twthree, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twfour, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twfive, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twsix, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twseven, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.tweight, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twnine, null, null, this)
    this.physics.add.collider(this.ninthChicken, this.twten, null, null, this)

    this.physics.add.collider(this.tenthChicken, this.eleven, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twelve, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.thirteen, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.fourteen, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.fifteen, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.sixteen, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.seventeen, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.eighteen, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.nineteen, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twenty, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twone, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twtwo, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twthree, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twfour, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twfive, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twsix, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twseven, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.tweight, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twnine, null, null, this)
    this.physics.add.collider(this.tenthChicken, this.twten, null, null, this)

    this.physics.add.collider(this.eleven, this.twelve, null, null, this)
    this.physics.add.collider(this.eleven, this.thirteen, null, null, this)
    this.physics.add.collider(this.eleven, this.fourteen, null, null, this)
    this.physics.add.collider(this.eleven, this.fifteen, null, null, this)
    this.physics.add.collider(this.eleven, this.sixteen, null, null, this)
    this.physics.add.collider(this.eleven, this.seventeen, null, null, this)
    this.physics.add.collider(this.eleven, this.eighteen, null, null, this)
    this.physics.add.collider(this.eleven, this.nineteen, null, null, this)
    this.physics.add.collider(this.eleven, this.twenty, null, null, this)
    this.physics.add.collider(this.eleven, this.twone, null, null, this)
    this.physics.add.collider(this.eleven, this.twtwo, null, null, this)
    this.physics.add.collider(this.eleven, this.twthree, null, null, this)
    this.physics.add.collider(this.eleven, this.twfour, null, null, this)
    this.physics.add.collider(this.eleven, this.twfive, null, null, this)
    this.physics.add.collider(this.eleven, this.twsix, null, null, this)
    this.physics.add.collider(this.eleven, this.twseven, null, null, this)
    this.physics.add.collider(this.eleven, this.tweight, null, null, this)
    this.physics.add.collider(this.eleven, this.twnine, null, null, this)
    this.physics.add.collider(this.eleven, this.twten, null, null, this)

    this.physics.add.collider(this.twelve, this.thirteen, null, null, this)
    this.physics.add.collider(this.twelve, this.fourteen, null, null, this)
    this.physics.add.collider(this.twelve, this.fifteen, null, null, this)
    this.physics.add.collider(this.twelve, this.sixteen, null, null, this)
    this.physics.add.collider(this.twelve, this.seventeen, null, null, this)
    this.physics.add.collider(this.twelve, this.eighteen, null, null, this)
    this.physics.add.collider(this.twelve, this.nineteen, null, null, this)
    this.physics.add.collider(this.twelve, this.twenty, null, null, this)
    this.physics.add.collider(this.twelve, this.twone, null, null, this)
    this.physics.add.collider(this.twelve, this.twtwo, null, null, this)
    this.physics.add.collider(this.twelve, this.twthree, null, null, this)
    this.physics.add.collider(this.twelve, this.twfour, null, null, this)
    this.physics.add.collider(this.twelve, this.twfive, null, null, this)
    this.physics.add.collider(this.twelve, this.twsix, null, null, this)
    this.physics.add.collider(this.twelve, this.twseven, null, null, this)
    this.physics.add.collider(this.twelve, this.tweight, null, null, this)
    this.physics.add.collider(this.twelve, this.twnine, null, null, this)
    this.physics.add.collider(this.twelve, this.twten, null, null, this)

    this.physics.add.collider(this.thirteen, this.fourteen, null, null, this)
    this.physics.add.collider(this.thirteen, this.fifteen, null, null, this)
    this.physics.add.collider(this.thirteen, this.sixteen, null, null, this)
    this.physics.add.collider(this.thirteen, this.seventeen, null, null, this)
    this.physics.add.collider(this.thirteen, this.eighteen, null, null, this)
    this.physics.add.collider(this.thirteen, this.nineteen, null, null, this)
    this.physics.add.collider(this.thirteen, this.twenty, null, null, this)
    this.physics.add.collider(this.thirteen, this.twone, null, null, this)
    this.physics.add.collider(this.thirteen, this.twtwo, null, null, this)
    this.physics.add.collider(this.thirteen, this.twthree, null, null, this)
    this.physics.add.collider(this.thirteen, this.twfour, null, null, this)
    this.physics.add.collider(this.thirteen, this.twfive, null, null, this)
    this.physics.add.collider(this.thirteen, this.twsix, null, null, this)
    this.physics.add.collider(this.thirteen, this.twseven, null, null, this)
    this.physics.add.collider(this.thirteen, this.tweight, null, null, this)
    this.physics.add.collider(this.thirteen, this.twnine, null, null, this)
    this.physics.add.collider(this.thirteen, this.twten, null, null, this)

    this.physics.add.collider(this.fourteen, this.fifteen, null, null, this)
    this.physics.add.collider(this.fourteen, this.sixteen, null, null, this)
    this.physics.add.collider(this.fourteen, this.seventeen, null, null, this)
    this.physics.add.collider(this.fourteen, this.eighteen, null, null, this)
    this.physics.add.collider(this.fourteen, this.nineteen, null, null, this)
    this.physics.add.collider(this.fourteen, this.twenty, null, null, this)
    this.physics.add.collider(this.fourteen, this.twone, null, null, this)
    this.physics.add.collider(this.fourteen, this.twtwo, null, null, this)
    this.physics.add.collider(this.fourteen, this.twthree, null, null, this)
    this.physics.add.collider(this.fourteen, this.twfour, null, null, this)
    this.physics.add.collider(this.fourteen, this.twfive, null, null, this)
    this.physics.add.collider(this.fourteen, this.twsix, null, null, this)
    this.physics.add.collider(this.fourteen, this.twseven, null, null, this)
    this.physics.add.collider(this.fourteen, this.tweight, null, null, this)
    this.physics.add.collider(this.fourteen, this.twnine, null, null, this)
    this.physics.add.collider(this.fourteen, this.twten, null, null, this)

    this.physics.add.collider(this.fifteen, this.sixteen, null, null, this)
    this.physics.add.collider(this.fifteen, this.seventeen, null, null, this)
    this.physics.add.collider(this.fifteen, this.eighteen, null, null, this)
    this.physics.add.collider(this.fifteen, this.nineteen, null, null, this)
    this.physics.add.collider(this.fifteen, this.twenty, null, null, this)
    this.physics.add.collider(this.fifteen, this.twone, null, null, this)
    this.physics.add.collider(this.fifteen, this.twtwo, null, null, this)
    this.physics.add.collider(this.fifteen, this.twthree, null, null, this)
    this.physics.add.collider(this.fifteen, this.twfour, null, null, this)
    this.physics.add.collider(this.fifteen, this.twfive, null, null, this)
    this.physics.add.collider(this.fifteen, this.twsix, null, null, this)
    this.physics.add.collider(this.fifteen, this.twseven, null, null, this)
    this.physics.add.collider(this.fifteen, this.tweight, null, null, this)
    this.physics.add.collider(this.fifteen, this.twnine, null, null, this)
    this.physics.add.collider(this.fifteen, this.twten, null, null, this)

    this.physics.add.collider(this.sixteen, this.seventeen, null, null, this)
    this.physics.add.collider(this.sixteen, this.eighteen, null, null, this)
    this.physics.add.collider(this.sixteen, this.nineteen, null, null, this)
    this.physics.add.collider(this.sixteen, this.twenty, null, null, this)
    this.physics.add.collider(this.sixteen, this.twone, null, null, this)
    this.physics.add.collider(this.sixteen, this.twtwo, null, null, this)
    this.physics.add.collider(this.sixteen, this.twthree, null, null, this)
    this.physics.add.collider(this.sixteen, this.twfour, null, null, this)
    this.physics.add.collider(this.sixteen, this.twfive, null, null, this)
    this.physics.add.collider(this.sixteen, this.twsix, null, null, this)
    this.physics.add.collider(this.sixteen, this.twseven, null, null, this)
    this.physics.add.collider(this.sixteen, this.tweight, null, null, this)
    this.physics.add.collider(this.sixteen, this.twnine, null, null, this)
    this.physics.add.collider(this.sixteen, this.twten, null, null, this)

    this.physics.add.collider(this.seventeen, this.eighteen, null, null, this)
    this.physics.add.collider(this.seventeen, this.nineteen, null, null, this)
    this.physics.add.collider(this.seventeen, this.twenty, null, null, this)
    this.physics.add.collider(this.seventeen, this.twone, null, null, this)
    this.physics.add.collider(this.seventeen, this.twtwo, null, null, this)
    this.physics.add.collider(this.seventeen, this.twthree, null, null, this)
    this.physics.add.collider(this.seventeen, this.twfour, null, null, this)
    this.physics.add.collider(this.seventeen, this.twfive, null, null, this)
    this.physics.add.collider(this.seventeen, this.twsix, null, null, this)
    this.physics.add.collider(this.seventeen, this.twseven, null, null, this)
    this.physics.add.collider(this.seventeen, this.tweight, null, null, this)
    this.physics.add.collider(this.seventeen, this.twnine, null, null, this)
    this.physics.add.collider(this.seventeen, this.twten, null, null, this)

    this.physics.add.collider(this.eighteen, this.nineteen, null, null, this)
    this.physics.add.collider(this.eighteen, this.twenty, null, null, this)
    this.physics.add.collider(this.eighteen, this.twone, null, null, this)
    this.physics.add.collider(this.eighteen, this.twtwo, null, null, this)
    this.physics.add.collider(this.eighteen, this.twthree, null, null, this)
    this.physics.add.collider(this.eighteen, this.twfour, null, null, this)
    this.physics.add.collider(this.eighteen, this.twfive, null, null, this)
    this.physics.add.collider(this.eighteen, this.twsix, null, null, this)
    this.physics.add.collider(this.eighteen, this.twseven, null, null, this)
    this.physics.add.collider(this.eighteen, this.tweight, null, null, this)
    this.physics.add.collider(this.eighteen, this.twnine, null, null, this)
    this.physics.add.collider(this.eighteen, this.twten, null, null, this)

    this.physics.add.collider(this.nineteen, this.twenty, null, null, this)
    this.physics.add.collider(this.nineteen, this.twone, null, null, this)
    this.physics.add.collider(this.nineteen, this.twtwo, null, null, this)
    this.physics.add.collider(this.nineteen, this.twthree, null, null, this)
    this.physics.add.collider(this.nineteen, this.twfour, null, null, this)
    this.physics.add.collider(this.nineteen, this.twfive, null, null, this)
    this.physics.add.collider(this.nineteen, this.twsix, null, null, this)
    this.physics.add.collider(this.nineteen, this.twseven, null, null, this)
    this.physics.add.collider(this.nineteen, this.tweight, null, null, this)
    this.physics.add.collider(this.nineteen, this.twnine, null, null, this)
    this.physics.add.collider(this.nineteen, this.twten, null, null, this)

    this.physics.add.collider(this.twenty, this.twone, null, null, this)
    this.physics.add.collider(this.twenty, this.twtwo, null, null, this)
    this.physics.add.collider(this.twenty, this.twthree, null, null, this)
    this.physics.add.collider(this.twenty, this.twfour, null, null, this)
    this.physics.add.collider(this.twenty, this.twfive, null, null, this)
    this.physics.add.collider(this.twenty, this.twsix, null, null, this)
    this.physics.add.collider(this.twenty, this.twseven, null, null, this)
    this.physics.add.collider(this.twenty, this.tweight, null, null, this)
    this.physics.add.collider(this.twenty, this.twnine, null, null, this)
    this.physics.add.collider(this.twenty, this.twten, null, null, this)

    this.physics.add.collider(this.twone, this.twtwo, null, null, this)
    this.physics.add.collider(this.twone, this.twthree, null, null, this)
    this.physics.add.collider(this.twone, this.twfour, null, null, this)
    this.physics.add.collider(this.twone, this.twfive, null, null, this)
    this.physics.add.collider(this.twone, this.twsix, null, null, this)
    this.physics.add.collider(this.twone, this.twseven, null, null, this)
    this.physics.add.collider(this.twone, this.tweight, null, null, this)
    this.physics.add.collider(this.twone, this.twnine, null, null, this)
    this.physics.add.collider(this.twone, this.twten, null, null, this)

    this.physics.add.collider(this.twtwo, this.twthree, null, null, this)
    this.physics.add.collider(this.twtwo, this.twfour, null, null, this)
    this.physics.add.collider(this.twtwo, this.twfive, null, null, this)
    this.physics.add.collider(this.twtwo, this.twsix, null, null, this)
    this.physics.add.collider(this.twtwo, this.twseven, null, null, this)
    this.physics.add.collider(this.twtwo, this.tweight, null, null, this)
    this.physics.add.collider(this.twtwo, this.twnine, null, null, this)
    this.physics.add.collider(this.twtwo, this.twten, null, null, this)

    this.physics.add.collider(this.twthree, this.twfour, null, null, this)
    this.physics.add.collider(this.twthree, this.twfive, null, null, this)
    this.physics.add.collider(this.twthree, this.twsix, null, null, this)
    this.physics.add.collider(this.twthree, this.twseven, null, null, this)
    this.physics.add.collider(this.twthree, this.tweight, null, null, this)
    this.physics.add.collider(this.twthree, this.twnine, null, null, this)
    this.physics.add.collider(this.twthree, this.twten, null, null, this)

    this.physics.add.collider(this.twfour, this.twfive, null, null, this)
    this.physics.add.collider(this.twfour, this.twsix, null, null, this)
    this.physics.add.collider(this.twfour, this.twseven, null, null, this)
    this.physics.add.collider(this.twfour, this.tweight, null, null, this)
    this.physics.add.collider(this.twfour, this.twnine, null, null, this)
    this.physics.add.collider(this.twfour, this.twten, null, null, this)

    this.physics.add.collider(this.twfive, this.twsix, null, null, this)
    this.physics.add.collider(this.twfive, this.twseven, null, null, this)
    this.physics.add.collider(this.twfive, this.tweight, null, null, this)
    this.physics.add.collider(this.twfive, this.twnine, null, null, this)
    this.physics.add.collider(this.twfive, this.twten, null, null, this)

    this.physics.add.collider(this.twsix, this.twseven, null, null, this)
    this.physics.add.collider(this.twsix, this.tweight, null, null, this)
    this.physics.add.collider(this.twsix, this.twnine, null, null, this)
    this.physics.add.collider(this.twsix, this.twten, null, null, this)

    this.physics.add.collider(this.twseven, this.tweight, null, null, this)
    this.physics.add.collider(this.twseven, this.twnine, null, null, this)
    this.physics.add.collider(this.twseven, this.twten, null, null, this)

    this.physics.add.collider(this.tweight, this.twnine, null, null, this)
    this.physics.add.collider(this.tweight, this.twten, null, null, this)

    this.physics.add.collider(this.twnine, this.twten, null, null, this)

  }



  update () {
    let cursors = this.input.keyboard.createCursorKeys()
    let linkSpeed = 3

////////////////////////////////////////////////////////////////////

    this.physics.add.collider(player, this.collideLeft, this.stopMovingLeft, null, this)
    this.physics.add.collider(player, this.collideRight, this.stopMovingRight, null, this)
    this.physics.add.collider(player, this.collideTop, this.stopMovingTop, null, this)
    this.physics.add.collider(player, this.collideBottom, this.stopMovingBottom, null, this)

////////////////////////////////////////////////////////////////////

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

    if (this.ghost.body.velocity.x != 0) {
      this.ghost.anims.play('ghostAnim', true)
    }

    if (this.chicken.body.velocity.x > 0) {
      this.chicken.anims.play('chickRight', true)
    } else {
      this.chicken.anims.play('chickLeft', true)
    }

    if (this.secondChicken.body.velocity.x > 0) {
      this.secondChicken.anims.play('chickRight', true)
    } else {
      this.secondChicken.anims.play('chickLeft', true)
    }

    if (this.thirdChicken.body.velocity.x > 0) {
      this.thirdChicken.anims.play('chickRight', true)
    } else {
      this.thirdChicken.anims.play('chickLeft', true)
    }

    if (this.fourthChicken.body.velocity.x > 0) {
      this.fourthChicken.anims.play('chickRight', true)
    } else {
      this.fourthChicken.anims.play('chickLeft', true)
    }

    if (this.fifthChicken.body.velocity.x > 0) {
      this.fifthChicken.anims.play('chickRight', true)
    } else {
      this.fifthChicken.anims.play('chickLeft', true)
    }

    if (this.sixthChicken.body.velocity.x > 0) {
      this.sixthChicken.anims.play('chickRight', true)
    } else {
      this.sixthChicken.anims.play('chickLeft', true)
    }

    if (this.seventhChicken.body.velocity.x > 0) {
      this.seventhChicken.anims.play('chickRight', true)
    } else {
      this.seventhChicken.anims.play('chickLeft', true)
    }

    if (this.eighthChicken.body.velocity.x > 0) {
      this.eighthChicken.anims.play('chickRight', true)
    } else {
      this.eighthChicken.anims.play('chickLeft', true)
    }

    if (this.ninthChicken.body.velocity.x > 0) {
      this.ninthChicken.anims.play('chickRight', true)
    } else {
      this.ninthChicken.anims.play('chickLeft', true)
    }

    if (this.tenthChicken.body.velocity.x > 0) {
      this.tenthChicken.anims.play('chickRight', true)
    } else {
      this.tenthChicken.anims.play('chickLeft', true)
    }

    if (this.eleven.body.velocity.x > 0) {
      this.eleven.anims.play('chickRight', true)
    } else {
      this.eleven.anims.play('chickLeft', true)
    }

    if (this.twelve.body.velocity.x > 0) {
      this.twelve.anims.play('chickRight', true)
    } else {
      this.twelve.anims.play('chickLeft', true)
    }

    if (this.thirteen.body.velocity.x > 0) {
      this.thirteen.anims.play('chickRight', true)
    } else {
      this.thirteen.anims.play('chickLeft', true)
    }

    if (this.fourteen.body.velocity.x > 0) {
      this.fourteen.anims.play('chickRight', true)
    } else {
      this.fourteen.anims.play('chickLeft', true)
    }

    if (this.fifteen.body.velocity.x > 0) {
      this.fifteen.anims.play('chickRight', true)
    } else {
      this.fifteen.anims.play('chickLeft', true)
    }

    if (this.sixteen.body.velocity.x > 0) {
      this.sixteen.anims.play('chickRight', true)
    } else {
      this.sixteen.anims.play('chickLeft', true)
    }

    if (this.seventeen.body.velocity.x > 0) {
      this.seventeen.anims.play('chickRight', true)
    } else {
      this.seventeen.anims.play('chickLeft', true)
    }

    if (this.eighteen.body.velocity.x > 0) {
      this.eighteen.anims.play('chickRight', true)
    } else {
      this.eighteen.anims.play('chickLeft', true)
    }

    if (this.nineteen.body.velocity.x > 0) {
      this.nineteen.anims.play('chickRight', true)
    } else {
      this.nineteen.anims.play('chickLeft', true)
    }

    if (this.twenty.body.velocity.x > 0) {
      this.twenty.anims.play('chickRight', true)
    } else {
      this.twenty.anims.play('chickLeft', true)
    }

    if (this.twone.body.velocity.x > 0) {
      this.twone.anims.play('chickRight', true)
    } else {
      this.twone.anims.play('chickLeft', true)
    }

    if (this.twtwo.body.velocity.x > 0) {
      this.twtwo.anims.play('chickRight', true)
    } else {
      this.twtwo.anims.play('chickLeft', true)
    }

    if (this.twthree.body.velocity.x > 0) {
      this.twthree.anims.play('chickRight', true)
    } else {
      this.twthree.anims.play('chickLeft', true)
    }

    if (this.twfour.body.velocity.x > 0) {
      this.twfour.anims.play('chickRight', true)
    } else {
      this.twfour.anims.play('chickLeft', true)
    }

    if (this.twfive.body.velocity.x > 0) {
      this.twfive.anims.play('chickRight', true)
    } else {
      this.twfive.anims.play('chickLeft', true)
    }

    if (this.twsix.body.velocity.x > 0) {
      this.twsix.anims.play('chickRight', true)
    } else {
      this.twsix.anims.play('chickLeft', true)
    }

    if (this.twseven.body.velocity.x > 0) {
      this.twseven.anims.play('chickRight', true)
    } else {
      this.twseven.anims.play('chickLeft', true)
    }

    if (this.tweight.body.velocity.x > 0) {
      this.tweight.anims.play('chickRight', true)
    } else {
      this.tweight.anims.play('chickLeft', true)
    }

    if (this.twnine.body.velocity.x > 0) {
      this.twnine.anims.play('chickRight', true)
    } else {
      this.twnine.anims.play('chickLeft', true)
    }

    if (this.twten.body.velocity.x > 0) {
      this.twten.anims.play('chickRight', true)
    } else {
      this.twten.anims.play('chickLeft', true)
    }

    this.physics.moveToObject(this.enemy, player, 85)
    this.physics.moveToObject(this.ghost, player, 75)
    this.physics.moveToObject(this.chicken, player, 120)
    this.physics.moveToObject(this.secondChicken, player, 105)
    this.physics.moveToObject(this.thirdChicken, player, 105)
    this.physics.moveToObject(this.fourthChicken, player, 95)
    this.physics.moveToObject(this.fifthChicken, player, 110)
    this.physics.moveToObject(this.sixthChicken, player, 115)
    this.physics.moveToObject(this.seventhChicken, player, 85)
    this.physics.moveToObject(this.eighthChicken, player, 110)
    this.physics.moveToObject(this.ninthChicken, player, 100)
    this.physics.moveToObject(this.tenthChicken, player, 90)
    this.physics.moveToObject(this.eleven, player, 100)
    this.physics.moveToObject(this.twelve, player, 95)
    this.physics.moveToObject(this.thirteen, player, 95)
    this.physics.moveToObject(this.fourteen, player, 105)
    this.physics.moveToObject(this.fifteen, player, 110)
    this.physics.moveToObject(this.sixteen, player, 105)
    this.physics.moveToObject(this.seventeen, player, 90)
    this.physics.moveToObject(this.eighteen, player, 90)
    this.physics.moveToObject(this.nineteen, player, 115)
    this.physics.moveToObject(this.twenty, player, 110)

    this.physics.moveToObject(this.twone, player, 100)
    this.physics.moveToObject(this.twtwo, player, 95)
    this.physics.moveToObject(this.twthree, player, 95)
    this.physics.moveToObject(this.twfour, player, 105)
    this.physics.moveToObject(this.twfive, player, 110)
    this.physics.moveToObject(this.twsix, player, 105)
    this.physics.moveToObject(this.twseven, player, 90)
    this.physics.moveToObject(this.tweight, player, 90)
    this.physics.moveToObject(this.twnine, player, 115)
    this.physics.moveToObject(this.twten, player, 110)
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

  ////////////////////////////////////////////////////////////////////
  stopMovingLeft () {

    if (player.x === 75) {
      player.x += 1
    } else if (player.x === 57) {
      player.x += 1
    } else if (player.x === 73) {
      player.x += 1
    } else if (player.x === 72) {
      player.x += 1
    } else if (player.x === 71) {
      player.x += 1
    }
    // debugger
  }

  stopMovingRight () {

    if (player.x === 290) {
      player.x += 1
    } else if (player.x === 299) {
      player.x += 1
    } else if (player.x === 298) {
      player.x += 1
    } else if (player.x === 297) {
      player.x += 1
    } else if (player.x === 296) {
      player.x += 1
    }
    // debugger
  }

  stopMovingTop () {

    if (player.y === 130) {
      player.y += 1
    } else if (player.y === 129) {
      player.y += 1
    } else if (player.y === 128) {
      player.y += 1
    } else if (player.y === 127) {
      player.y += 1
    } else if (player.y === 126) {
      player.y += 1
    }
    // debugger
  }

  stopMovingBottom () {

    if (player.y === 290) {
      player.y += 1
    } else if (player.y === 299) {
      player.y += 1
    } else if (player.y === 298) {
      player.y += 1
    } else if (player.y === 297) {
      player.y += 1
    } else if (player.y === 296) {
      player.y += 1
    }
    // debugger
  }

  ////////////////////////////////////////////////////////////////////


=======
  timeScore () {
    let now = Date.now()
    if (timer > now) {
      let score_factor = (now - startTime) / timerLength
      score = score_factor
    }
  }
>>>>>>> cristian
}
