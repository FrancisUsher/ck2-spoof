import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
}

const game = new Phaser.Game(config)

console.log(game)

function preload() {
  this.load.image('sky', './static/sky.png')
  this.load.image('ground', './static/platform.png')
  this.load.image('star', './static/star.png')
  this.load.image('bomb', './static/bomb.png')
  this.load.spritesheet('dude', './static/dude.png', {
    frameWidth: 32,
    frameHeight: 48,
  })
}

function create() {
  this.add.image(400, 300, 'sky')
  this.add.image(400, 300, 'star')
}

function update() {}
