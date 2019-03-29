class HyruleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'HyruleScene' })
  }

  preload () {
    this.load.tilemapTiledJSON('hyrule', 'js/assets/maps/hyrule.json')
    this.load.image('terrain', 'js/assets/images/terrain.png')
    this.load.image('tiles', 'js/assets/maps/32x32_map_tile v3.1 [MARGINLESS].png')
    this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png', { frameWidth: 30, frameHeight: 36 })
    this.load.audio('hyulemusic', 'js/assets/music/hyruleThemeSong.mp3')
  }
  create () {
    let music = this.sound.add('hyulemusic')
    music.play()

    this.add
      .text(16, 16, "hello", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 30, y: 10 }
      })
      .setScrollFactor(0)
      .setDepth(30);
    let hyrule = this.make.tilemap({ key: 'hyrule' })
    const hyruleTileSet = hyrule.addTilesetImage('32x32_map_tile v3.1 [MARGINLESS]', 'tiles')
    const terrainTileSet = hyrule.addTilesetImage('terrain', 'terrain')
    const innerGrass = hyrule.createStaticLayer('InnerGrass', [terrainTileSet], 0, 0).setDepth(-1)
    const waterTiles = hyrule.createStaticLayer('Water', [terrainTileSet], 0, 0)
    const mountainsTileSet = hyrule.createStaticLayer('Mountains', [terrainTileSet], 0, 0)
    const upperMountainsTileSet = hyrule.createStaticLayer('UpperMountain', [terrainTileSet], 0, 0)
    const outerGrass = hyrule.createStaticLayer('OuterGrass', [terrainTileSet], 0, 0)
    const entranceTileset = hyrule.createStaticLayer('Entrance', [terrainTileSet], 0, 0)
    const spawnPoint = hyrule.findObject('Object Layer 2', obj => obj.name === 'Spawn')
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 400, 300, 'link').setDepth(0)
    const trees = hyrule.createStaticLayer('Trees', [hyruleTileSet], 0, 0).setDepth(0)
    // entranceTileset.setCollision([683])
    // waterTiles.setTileLocationCallback([770, 688, 750, 793, 687, 771, 772], () => {
    //   console.log('water')
    // })
    this.physics.add.collider(player, entranceTileset)
    this.physics.add.collider(player, waterTiles)
    this.physics.add.collider(player, trees)
    this.physics.add.collider(player, mountainsTileSet)
    this.physics.add.collider(player, outerGrass)
    this.physics.add.collider(player, upperMountainsTileSet)

    entranceTileset.setTileLocationCallback(33, 9, 1, 1, () => {
      music.pause()
      this.scene.start('Dungeon')
    })

    trees.setTileIndexCallback(8, () => alert('supppp'), this);

    const debugGraphics = this.add.graphics().setAlpha(0.75)
    trees.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    })
    outerGrass.setCollisionByProperty({ collides: true })
    this.physics.add.collider(player, trees)
    const camera = this.cameras.main
    camera.startFollow(player)
    camera.setBounds(0, 0, hyrule.widthInPixels, hyrule.heightInPixels)
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

    let entranceToDungeon = hyrule.findObject('EntranceObj', obj => obj.name === 'Enter')
    this.physics.add.collider(player, entranceTileset)

    // this.physics.add.collider(player, this.wall, this.stopMoving, null, this)

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

  }

  // stopMoving () {
  //   console.log('hi')
  //   this.player.body.velocity === 0
  // }

}
