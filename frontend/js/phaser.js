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
// let score = 0;
let score;
let scoreText;
let groundLayer;
let gameOver = false;



////////////////////////////////////////////
///////////////// PRELOAD //////////////////
////////////////////////////////////////////

function preload () {
	// this.load.image('floor', 'js/assets/images/sprites/zelda/floor.jpg')
   // this.load.image('tiles', 'js/assets/images/mountains.png')
   this.load.image('walls', 'js/assets/images/walls.png')
   this.load.image('floor', 'js/assets/images/tileset.png')
	this.load.tilemapTiledJSON("map", 'js/assets/maps/dungeonnew.json')
	this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png', {frameWidth: 36, frameHeight: 36});
   this.load.spritesheet('gano', 'js/assets/images/sprites/zelda/ganondorf-move-sheet.png', {frameWidth: 36, frameHeight: 36});
   this.load.spritesheet('coin', 'js/assets/images/sprites/zelda/rupee.png', {frameWidth: 28, frameHeight: 28});
};

////////////////////////////////////////////
///////////////// CREATE ///////////////////
////////////////////////////////////////////

function create () {
   // let scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })
   const map = this.make.tilemap({ key: "map" });
   // const backgroundTileset = map.addTilesetImage("Wallpaper", 'walls')
   const floorTileset = map.addTilesetImage("tileset", "floor");
   const wallsTileset = map.addTilesetImage("walls", "walls");
	const GroundLayer = map.createStaticLayer("Floors", floorTileset, 0, 0);
   const BackgroundLayer = map.createStaticLayer("Walls", wallsTileset, 0, 0);

	player = this.physics.add.sprite(400, 300, 'gano');
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
      key: 'ganLeft',
      frames: this.anims.generateFrameNumbers('gan', {start: 2, end: 2}),
      repeate: -1,
   })

   this.anims.create({
      key: 'ganRight',
      frames: this.anims.generateFrameNumbers('gan', {start: 3, end: 3}),
      repeate: -1,
   })

   this.anims.create({
      key: 'ganDown',
      frames: this.anims.generateFrameNumbers('gan', {start: 0, end: 0}),
      repeate: -1,
   })

   this.anims.create({
      key: 'ganUp',
      frames: this.anims.generateFrameNumbers('gan', {start: 1, end: 1}),
      repeate: -1,
   })

   this.anims.create({
      key: 'ganStand',
      frames: this.anims.generateFrameNumbers('gan', {start: 0, end: 0}),
      repeate: -1,
   })

   this.anims.create({
      key: 'coin',
      frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 9}),
      frameRate: 10,
      repeat: -1
   });

   player.setCollideWorldBounds(true);
   this.physics.add.collider(player, enemy, this);
   this.physics.add.collider(player, BackgroundLayer);

   // let coins = this.add.sprite(300, 300, 'coin');

   ///////////////// COINS ///////////////////

   // const coinTiles = map.addTilesetImage('coin')
   // const coinLayer = map.createDynamicLayer('coin', coinTiles, 0, 0);


   // coinLayer.setTileIndexCallback(26, collectcoin, this);
   // this.physics.add.overlap(player, coinLayer);

   // this.physics.add.collider(groundLayer, player);





   player.setCollideWorldBounds(true);

   // this.physics.add.overlap(player, coins, collectCoin, null, this);
};



////////////////////////////////////////////
///////////////// UPDATE ///////////////////
////////////////////////////////////////////

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

  // if (enemy.body.velocity.x > 0) {
  //    enemy.anims.play('right', true);
  // } else if (enemy.body.velocity.x < 0){
  //    enemy.anims.play('left', true);
  // } else if (enemy.body.velocity.y > 0) {
  //    enemy.anims.play('up', true);
  // } else if (enemy.body.velocity.y < 0){
  //    enemy.anims.play('down', true);
  // } else {
  //    enemy.anims.play('stand', true);
  // }


	this.physics.moveToObject(enemy, player, 85)
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

};

function collectCoin(sprite, tile) {
   // coin.disableBody(true, true);
   coinLayer.removeTileAt(tile.x, tile.y);
   score += 10;
   console.log('hi');
   return false;
};
