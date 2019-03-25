var config = {
   type: Phaser.AUTO,
   width: 800,
   height: 600,
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
   'js/assets/images/sprites/zelda/link-move-horizontal-sheet.png',
   { frameWidth: 24, frameHeight: 24
   });
}

function create ()
{
   this.add.image(400, 300, 'floor');

   player = this.physics.add.sprite(400, 300, 'link');
   cursors = this.input.keyboard.createCursorKeys();

   this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('link', {start: 0, end: 5}),
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
      frames: this.anims.generateFrameNumbers('link', {start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
   });

   this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('link', {start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
   });


}

function update ()
{
   if (cursors.left.isDown)
   {
      player.setVelocityX(-80);
      player.anims.play('left', true);
   } else if (cursors.right.isDown)
   {
      player.setVelocityX(80);
      player.anims.play('right', true);
   } else if (cursors.down.isDown)
   {
      player.setVelocityY(80);
      player.anims.play('down', true);
   } else if (cursors.up.isDown)
   {
      player.setVelocityY(-80);
      player.anims.play('up', true);
   } else {
      player.setVelocityX(0)
      player.setVelocityY(0)
      player.anims.play('left',false);
   };


}
