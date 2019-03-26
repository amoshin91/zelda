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
let coinScore = 0;
let coinLayer;
let coins;

function preload () {
	// this.load.image('floor', 'js/assets/images/sprites/zelda/floor.jpg')
	this.load.image('tiles', 'js/assets/images/mountains.png')
	this.load.tilemapTiledJSON("map", 'js/assets/maps/zelda-map.json')
	this.load.spritesheet('link', 'js/assets/images/sprites/zelda/link-move-long-sheet.png',{ frameWidth: 36, frameHeight: 36});
   this.load.spritesheet('coin', 'js/assets/images/sprites/zelda/rupee.png', {
      frameWidth: 28, frameHeight: 28
   })

}

function create () {


	const map = this.make.tilemap({ key: "map" });
	const tileset = map.addTilesetImage("mountain_landscape", "tiles");
	const BackgroundLayer = map.createStaticLayer("ground", tileset, 35, 0);
	const GroundLayer = map.createStaticLayer("top", tileset, 0, 0);


	player = this.physics.add.sprite(400, 300, 'link');
	enemy = this.physics.add.sprite(300, 200, 'link')

	cursors = this.input.keyboard.createCursorKeys();

	this.physics.add.collider(player, GroundLayer);

   // coin = this.physics.add.sprite(500, 500, 'coin');
   // console.log(coin);
   // const coinTiles = map.addTilesetImage('coinTileName', 'tiles');
   // const coinLayer = map.createDynamicLayer('coin', coinTiles, 0, 0);

   this.coins = this.add.group();

   let coins = this.add.sprite(300, 300, 'coin');
   // this.coins.add(coin);


   // coinLayer.setTileIndexCallback(26, collectcoin, this);
   // this.physics.add.overlap(player, coinLayer);


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
      key: 'coin',
      frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 9}),
      frameRate: 10,
      repeat: -1
   })

   // coinCollectText = this.add.text(20,570,'0', {
   //    fontSize: '20px',
   //    fill:'#fff'
   // });

   // coinCollectText.setScrollFactor(0)

   // let takeCoin = function(player, coin) {
   //    coin.kill();
   // }
   //
   // this.physics.overlap(player, coin);


   // takeCoin: function(player, coin) {
   //    // coin.kill();
   // };



   player.setCollideWorldBounds(true);

   this.physics.add.overlap(player, coins, collectCoin, null, this);
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



   // this.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);



   // let coinAnimation = coin.anims.play('coin', true)

   this.physics.moveToObject(enemy, player, 100)



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

function collectCoin(player, coin) {
   // coin.disableBody(true, true);
   console.log('hi');
}
