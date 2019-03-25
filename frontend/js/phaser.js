var config = {
   type: Phaser.AUTO,
   width: 1000,
   height: 800,
   physics: {
      default: 'arcade',
      arcade: {
         gravity: { y: 200 }
      }
   },
   scene: {
      preload: preload,
      create: create
   }
};

var game = new Phaser.Game(config);

function preload () {
   // this.load.setBaseURL('http://labs.phaser.io');

   // this.load.image('sky', 'assets/skies/space3.png');
   // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
   // this.load.image('red', 'assets/particles/red.png');
   this.load.image('floor', '../frontend/assets/images/sprites/dc-dngn/floor/grey_dirt0.png')
}

function create() {
   this.add.image(100,100,'floor');

}

// function create () {
//    this.add.image(500, 300, 'sky');
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
