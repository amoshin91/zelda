// var config = {
//    type: Phaser.AUTO,
//    width: 1000,
//    height: 800,
//    physics: {
//       default: 'arcade',
//       arcade: {
//          gravity: { y: 200 }
//       }
//    },
//    scene: {
//       preload: preload,
//       create: create
//    }
// };
//
// var game = new Phaser.Game(config);
//
// function preload () {
//    // this.load.setBaseURL('http://labs.phaser.io');
//    //
//    // this.load.image('sky', 'assets/skies/space3.png');
//    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
//    // this.load.image('red', 'assets/particles/red.png');
//    this.load.image('floor', 'assets/grey_dirt0.png');
//    this.load.image('redfloor', './assets/images/sprites/dc-dngn/floor/floor_nerves1.png');
// }
//
// // function create() {/Users/amoshinihsoma/Flatiron-School/module-3/week-3/project/zelda/frontend/assets/images/sprites/dc-dngn/floor/floor_nerves1.png
// //    game.add.image(100, 100, 'floor');
// //
// // }
//
// function create () {
//    this.add.image(100, 100, 'redfloor');
//    this.add.image(500, 300, 'floor');
//
//    var particles = this.add.particles('red');
//
//    var emitter = particles.createEmitter({
//       speed: 1000,
//       scale: { start: 1, end: 0 },
//       blendMode: 'ADD'
//    });
//
//    var logo = this.physics.add.image(400, 100, 'logo');
//
//    logo.setVelocity(100, 200);
//    logo.setBounce(1, 1);
//    logo.setCollideWorldBounds(true);
//
//    emitter.startFollow(logo);
// }


////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////


var config = {
   type: Phaser.AUTO,
   width: 800,
   height: 600,
   scene: {
      preload: preload,
      create: create,
      update: update
   }
};

var game = new Phaser.Game(config)

function preload ()
{
   this.load.image('floor', 'js/assets/images/sprites/dc-dngn/floor/grey_dirt0.png')
   this.load.spritesheet('link',
   'js/assets/images/sprites/zelda/link-move-horizontal-sheet.png',
   { frameWidth: 24, frameHeight: 24
   })


}

function create ()
{
   this.add.image(400, 300, 'floor')
   // this.add.sprite(400, 300, 'link')

   // const player = this.physics.add
   //    .sprite(spawnPoint.x, spawnPoint.y)



   player = this.physics.add.sprite(100, 300, 'link');

   this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('link', {start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
   });


}

function update ()
{
   if (cursors.left.isDown)
   {
      player.setVelocityX(-160);
      player.anims.play('left', true);
   }

}
