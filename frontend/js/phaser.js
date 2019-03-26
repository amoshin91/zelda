const config = {
  type: Phaser.AUTO,
  width: 700,
	height: 605,
	parent: "game-container",
  physics: {
		default: 'arcade',
		arcade: {
      gravity: {y: 0},
      debug: true
		}
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let rupeeScore = 0;
let score;
let scoreText;
let gameOver = false
let player;


function preload () {

  this.load.image('walls', 'js/assets/images/walls.png')
  this.load.image('lava', 'js/assets/images/terrain.png')
  this.load.image('floor', 'js/assets/images/tileset.png')
	this.load.tilemapTiledJSON("map", 'js/assets/maps/dungeonnew.json')
	this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png',{ frameWidth: 24, frameHeight: 24});	
  
}

function create () {
  
  const map = this.make.tilemap({ key: "map" });
  const floorTileset = map.addTilesetImage("tileset", "floor");
  const wallsTileset = map.addTilesetImage("walls", "walls");
  // const lavaTileset = map.addTilesetImage("Wallpaper", "lava")
	const GroundLayer = map.createStaticLayer("Floors", floorTileset, 0, 0);
  const BackgroundLayer = map.createStaticLayer("Walls", wallsTileset, 0, 0);
  const spawnPoint = map.findObject("Obj1", obj => obj.name === "SpawnPoint");
	player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 400, 300, 'link');
  enemy = this.physics.add.sprite(300, 200, 'link');
  BackgroundLayer.setCollisionBetween(0, 482);
  this.physics.add.collider(player, BackgroundLayer);
  // BackgroundLayer.setCollision(true)
  BackgroundLayer.setCollisionByProperty({ collides: true });
  // BackgroundLayer.setCollision(player)
  // debugger
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	cursors = this.input.keyboard.createCursorKeys();
  
  this.anims.create({
    key: 'stand',
    frames: this.anims.generateFrameNumbers('link', {start: 0, end: 0}),
  })

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
	const graphics = this.add
      .graphics()
      .setAlpha(0.75)
      .setDepth(20);
  // player.setCollideWorldBounds(true);
  BackgroundLayer.renderDebug(graphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  });
  // this.physics.add.collider(player, BackgroundLayer)

}

function update () {
	let linkSpeed = 3;
  if (cursors.left.isDown) {
    player.x -= linkSpeed;
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.x += linkSpeed;
    player.anims.play('right', true);
  } else if (cursors.down.isDown) {
      player.y += linkSpeed;
      player.anims.play('down', true);
  } else if (cursors.up.isDown) {
      player.y -= linkSpeed;
      player.anims.play('up', true);
  } else {
    player.anims.play('stand', true)
  };
	// this.physics.moveToObject(enemy, player, 100)
   // this.physics.world.collide()
   // else
   // {
   //    player.setVelocityX(0)
   //    player.setVelocityY(0)
   //    player.anims.pause();
   // };

   // if (player.x <= 3) {
   //    // player.x === 5
   //    debugger
   // }

}
