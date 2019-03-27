class Dungeon extends Phaser.Scene {
  constructor() {
    super({ key: 'Dungeon' })
  }

  preload() {
    // console.log('hello')
    this.load.image('walls', 'js/assets/images/walls.png')
    this.load.image('lava', 'js/assets/images/terrain.png')
    this.load.image('floor', 'js/assets/images/tileset.png')
    this.load.tilemapTiledJSON("map", 'js/assets/maps/dungeonnew.json')
    this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png',{ frameWidth: 30, frameHeight: 36});
    this.load.spritesheet('gano', 'js/assets/images/sprites/zelda/ganondorf-move-sheet.png',{ frameWidth: 42, frameHeight: 42});
  }

  create() {

    const map = this.make.tilemap({ key: "map" });
    const floorTileset = map.addTilesetImage("tileset", "floor");
    const wallsTileset = map.addTilesetImage("walls", "walls");
    const GroundLayer = map.createStaticLayer("Floors", floorTileset, 0, 0);
    const BackgroundLayer = map.createStaticLayer("Walls", wallsTileset, 0, 0);

    // const spawnPoint = map.findObject("Obj1", obj => obj.name === "SpawnPoint");
    this.player = this.physics.add.sprite(400, 300, 'link');
    this.enemy = this.physics.add.sprite(300, 200, 'gano');


    BackgroundLayer.setCollisionBetween(0, 482);
    this.physics.add.collider(this.player, BackgroundLayer);
   // BackgroundLayer.setCollision(true)
    BackgroundLayer.setCollisionByProperty({ collides: true });
   // BackgroundLayer.setCollision(player)
   // debugger
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('link', {start: 0, end: 0}),
    });
  
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('link', {start: 1, end: 6}),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('link', {start: 7, end: 12}),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('link', {start: 21, end: 28}),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('link', {start: 13, end: 20}),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'ganLeft',
      frames: this.anims.generateFrameNumbers('gano', {start: 2, end: 8}),
      frameRate: 10,
      repeat: -1,
    })
  // Ganon's 
    this.anims.create({
      key: 'ganRight',
      frames: this.anims.generateFrameNumbers('gano', {start: 9, end: 15}),
      frameRate: 10,
      repeat: -1,
    })
  
    this.anims.create({
      key: 'ganDown',
      frames: this.anims.generateFrameNumbers('gano', {start: 0, end: 0}),
      frameRate: 10,
      repeat: -1,
    })
  
    this.anims.create({
      key: 'ganUp',
      frames: this.anims.generateFrameNumbers('gano', {start: 1, end: 1}),
      frameRate: 10,
      repeat: -1,
    })
  
    this.anims.create({
      key: 'ganStand',
      frames: this.anims.generateFrameNumbers('gano', {start: 0, end: 0}),
      repeat: -1,
    })
  
    this.anims.create({
      key: 'coin',
      frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 9}),
      frameRate: 10,
      repeat: -1
    });
  
    // this.player.setCollideWorldBounds(true);
  
    this.physics.add.collider(this.player, this.enemy, this);
    this.physics.add.collider(this.player, BackgroundLayer);
  }


  update() {
    let cursors = this.input.keyboard.createCursorKeys();
    let linkSpeed = 3;


    if (cursors.left.isDown) {
      this.player.x -= linkSpeed;
      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        this.player.x += linkSpeed;
        this.player.anims.play('right', true);
    } else if (cursors.down.isDown) {
        this.player.y += linkSpeed;
        this.player.anims.play('down', true);
    } else if (cursors.up.isDown) {
        this.player.y -= linkSpeed;
        this.player.anims.play('up', true);
    } else {
        this.player.anims.play('stand', true)
    };

    if (this.enemy.body.velocity.x > 0) {
        this.enemy.anims.play('ganRight', true);
    } else if (this.enemy.body.velocity.x < 0){
        this.enemy.anims.play('ganLeft', true);
    } else if (this.enemy.body.velocity.y > 0) {
        this.enemy.anims.play('ganUp', true);
    } else if (this.enemy.body.velocity.y < 0){
        this.enemy.anims.play('ganDown', true);
    } else {
        this.enemy.anims.play('ganStand', true);
    }
    this.physics.moveToObject(this.enemy, this.player, 85)
  }
}