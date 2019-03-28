class HyruleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'HyruleScene' })
  }

  preload () {
    this.load.image('terrain', 'js/assets/images/terrain.png')
    this.load.image('ground', 'js/assets/images/32x32_map_tile v3.1 [MARGINLESS].png')
    this.load.tilemapTiledJSON('map', 'js/assets/maps/hyrule.json')
    this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png', { frameWidth: 30, frameHeight: 36 })
  }

  create () {
  this.add
  .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
    font: "18px monospace",
    fill: "#000000",
    padding: { x: 30, y: 10 },
    })
.setScrollFactor(0)
.setDepth(30);
    let hyrule = this.make.tilemap({ key: 'map' })
    const hyruleTileSet = hyrule.addTilesetImage('32x32_map_tile v3.1 [MARGINLESS]', 'ground')
    const terrainTileSet = hyrule.addTilesetImage('terrain', 'terrain')
    const ground = hyrule.createStaticLayer('InnerGrass', terrainTileSet, 0, 0)
    const outerGrass = hyrule.createStaticLayer('OuterGrass', terrainTileSet, 0, 0)
    const waterTiles = hyrule.createStaticLayer('Water', terrainTileSet, 0, 0)
    const mountainsTileSet = hyrule.createStaticLayer('Mountains', terrainTileSet, 0, 0)
    const entranceTileset = hyrule.createStaticLayer('Entrance', terrainTileSet, 0, 0)
    entranceTileset.setCollisionByProperty({ collides: true })
    this.player = this.physics.add.sprite(400, 300, 'link')
    
    const camera = this.cameras.main
    camera.startFollow(this.player)
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
    this.physics.add.collider(this.player, entranceTileset, this.startDungeon, null, this)
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

  }

  startDungeon() {
    this.scene.start('Dungeon')
  }
}