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
// let score = 0;
let score;
let scoreText;
let gameOver = false
let player;

////////////////////////////////////////////
///////////////// PRELOAD //////////////////
////////////////////////////////////////////

function preload () {

  this.load.image('walls', 'js/assets/images/walls.png')
  this.load.image('lava', 'js/assets/images/terrain.png')
  this.load.image('floor', 'js/assets/images/tileset.png')
	this.load.tilemapTiledJSON("map", 'js/assets/maps/dungeonnew.json')
	this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png',{ frameWidth: 30, frameHeight: 36});
   this.load.spritesheet('gano', 'js/assets/images/sprites/zelda/ganondorf-move-sheet.png',{ frameWidth: 42, frameHeight: 42});

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
      repeate: -1,
   })

   this.anims.create({
      key: 'ganRight',
      frames: this.anims.generateFrameNumbers('gano', {start: 9, end: 15}),
      frameRate: 10,
      repeate: -1,
   })

   this.anims.create({
      key: 'ganDown',
      frames: this.anims.generateFrameNumbers('gano', {start: 0, end: 0}),
      frameRate: 10,
      repeate: -1,
   })

   this.anims.create({
      key: 'ganUp',
      frames: this.anims.generateFrameNumbers('gano', {start: 1, end: 1}),
      frameRate: 10,
      repeate: -1,
   })

   this.anims.create({
      key: 'ganStand',
      frames: this.anims.generateFrameNumbers('gano', {start: 0, end: 0}),
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





  //  player.setCollideWorldBounds(true);

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

  if (enemy.body.velocity.x > 0) {
     enemy.anims.play('ganRight', true);
  } else if (enemy.body.velocity.x < 0){
     enemy.anims.play('ganLeft', true);
  } else if (enemy.body.velocity.y > 0) {
     enemy.anims.play('ganUp', true);
  } else if (enemy.body.velocity.y < 0){
     enemy.anims.play('ganDown', true);
  } else {
     enemy.anims.play('ganStand', true);
  }


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
