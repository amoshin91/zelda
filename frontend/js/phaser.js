const config = {
  type: Phaser.AUTO,
  width: 700,
	height: 605,
	parent: "game-container",
  physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0}
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


function preload () {
	// this.load.image('floor', 'js/assets/images/sprites/zelda/floor.jpg')
  // this.load.image('tiles', 'js/assets/images/mountains.png')
  this.load.image('walls', 'js/assets/images/walls.png')
  this.load.image('floor', 'js/assets/images/tileset.png')
	this.load.tilemapTiledJSON("map", 'js/assets/maps/dungeonnew.json')

	// this.load.image('tiles', 'js/assets/maps2/dungeon_tiles_0.png');
	// this.load.tilemapTiledJSON('map', 'js/assets/maps2/dungeon.json');

	this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png', {frameWidth: 30, frameHeight: 36});
	this.load.spritesheet('gano', 'js/assets/images/sprites/zelda/ganondorf-move-sheet.png', {frameWidth: 42, frameHeight: 42});
	this.load.spritesheet('gano', 'js/assets/images/sprites/zelda/ganondorf-move-horizontal-sheet.png', {frameWidth: 30, frameHeigh: 42});


}

function create () {


  // let scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

  const map = this.make.tilemap({ key: "map" });
  // const backgroundTileset = map.addTilesetImage("Wallpaper", 'walls')
  const floorTileset = map.addTilesetImage("tileset", "floor");
  const wallsTileset = map.addTilesetImage("walls", "walls");

	const tileset = map.addTilesetImage('walls', 'tiles')

	const GroundLayer = map.createStaticLayer("Floors", floorTileset, 0, 0);
  const BackgroundLayer = map.createStaticLayer("Walls", wallsTileset, 0, 0);

	BackgroundLayer.setCollisionBetween(170)


	// const tileset = map.addTilesetImage('dungeon_tiles_0', 'tiles')
	//
	// const belowLayer = map.createStaticLayer('Below Player', tileset, 0, 0);
	// const worldLayer = map.createStaticLayer('World', tileset, 0, 0);


	player = this.physics.add.sprite(400, 300, 'link');
  enemy = this.physics.add.sprite(300, 200, 'gano');

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

	this.anims.create({
		key: 'ganleft',
		frames: this.anims.generateFrameNumbers('gano', {start: 2, end: 8}),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
	  key: 'ganright',
	  frames: this.anims.generateFrameNumbers('gano', {start: 9, end: 15}),
	  frameRate: 10,
	  repeat: -1
	});

  // player.setCollideWorldBounds(true);
  this.physics.add.collider(player, enemy, this);
  // this.physics.add.collider(player, BackgroundLayer);


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

	this.physics.moveToObject(enemy, player, 100)

	if (enemy.body.velocity.x < 0) {
		enemy.anims.play('ganleft', true)
	} else {
		enemy.anims.play('ganright', true)
	}
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
