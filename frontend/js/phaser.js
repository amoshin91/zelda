var config = {
   type: Phaser.AUTO,
   width: 700,
   height: 605,
   physics: {
      default: 'arcade',
   },
   scene: {
      preload: preload,
      create: create,
      update: update
   }
};

var game = new Phaser.Game(config);

function preload ()
{
   this.load.image('floor', 'js/assets/images/sprites/zelda/floor.jpg')
   this.load.spritesheet('link',
   'js/assets/images/sprites/zelda/link-move-long-sheet.png',
   { frameWidth: 24, frameHeight: 24
   });
}

function create ()
{
   this.add.image(400, 300, 'floor');

   player = this.physics.add.sprite(400, 300, 'link');
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

   player.setCollideWorldBounds(true);

}

function update ()
{
   let linkSpeed = 5;
   if (cursors.left.isDown)
   {
      player.x -= linkSpeed;
      player.anims.play('left', true);
   }
   else if (cursors.right.isDown)
   {
      player.x += linkSpeed;
      player.anims.play('right', true);
   } else if (cursors.down.isDown)
   {
      player.y += linkSpeed;
      player.anims.play('down', true);
   } else if (cursors.up.isDown)
   {
      player.y -= linkSpeed;
      player.anims.play('up', true);
   } else {
      player.anims.play('stand', true)
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
