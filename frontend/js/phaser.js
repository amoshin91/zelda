const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
    	preload: preload,
    	create: create,
    	update: update
	}
};

const game = new Phaser.Game(config);
let cursors;
let player;
let showDebug = false;
// debugger

function preload () {
//    this.load.image('floor', 'js/assets/images/sprites/dc-dngn/floor/grey_dirt0.png')
// debugger
	this.load.image("tiles", "./js/assets/images/sheet.png");
	this.load.tilemapTiledJSON("map", "js/zeldanew.json");
}

function create () {
	this.map = game.make.tilemap({key: "map"})
	debugger
	let tiles = map.addTilesetImage('dungeon', 'tiles');
	
	// debugger
	// this.backgroundLayer = this.map.createStaticLayer("tiles", tileset)
	// debugger
}

function update () {

}
