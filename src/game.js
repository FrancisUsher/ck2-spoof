import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#838282',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  pixelArt: true,
  audio: {
    disableWebAudio: true,
  },
}

const game = new Phaser.Game(config)

console.log(game)

function preload() {
  this.load.image('sky', 'image/glacial-mountain/sky.png')
  this.load.image('cloud', 'image/glacial-mountain/cloud_lonely.png')
  this.load.image('clouds', 'image/glacial-mountain/clouds_BG.png')
  this.load.image('cloudsMG3', 'image/glacial-mountain/clouds_MG_3.png')
  this.load.image('cloudsMG2', 'image/glacial-mountain/clouds_MG_2.png')
  this.load.image('cloudsMG1', 'image/glacial-mountain/clouds_MG_1.png')
  this.load.image('mountains', 'image/glacial-mountain/mountains.png')
  this.load.image('title', 'image/CRUSADER.png')

  this.load.spritesheet('dude', 'image/dude.png', {
    frameWidth: 32,
    frameHeight: 48,
  })
  this.load.audio('beat', 'audio/african-drum-jam.wav')
  this.load.audio('grunts', 'audio/grunts.wav')
}

let titleLogoImage
let cloudsMG1_1, cloudsMG1_2
function initializeBackground() {
  const sky = this.add.image(400, 300, 'sky')
  sky.displayHeight = 600
  sky.displayWidth = 800
  const clouds = this.add.image(400, 300, 'clouds')
  clouds.displayHeight = 600
  clouds.displayWidth = 800
  const mountains = this.add.image(400, 300, 'mountains')
  mountains.displayHeight = 600
  mountains.displayWidth = 800
  const cloudsMG3 = this.add.image(400, 300, 'cloudsMG3')
  cloudsMG3.displayHeight = 600
  cloudsMG3.displayWidth = 800
  const cloudsMG2 = this.add.image(400, 300, 'cloudsMG2')
  cloudsMG2.displayHeight = 600
  cloudsMG2.displayWidth = 800
  cloudsMG1_1 = this.add.image(400, 300, 'cloudsMG1')
  cloudsMG1_1.displayHeight = 600
  cloudsMG1_1.displayWidth = 800
  cloudsMG1_2 = this.add.image(-399, 300, 'cloudsMG1')
  cloudsMG1_2.displayHeight = 600
  cloudsMG1_2.displayWidth = 800

  titleLogoImage = this.add.image(0, 300, 'title')
}

function create() {
  initializeBackground.call(this)
  const beat = this.sound.add('beat')
  const grunts = this.sound.add('grunts')
  const drumLoopMarker = {
    name: 'drumLoop',
    start: 0,
    duration: 230,
    config: {
      loop: true,
    },
  }
  const gruntLoopMarker = {
    name: 'gruntLoop',
    start: 0,
    duration: 10,
    config: {
      loop: true,
    },
  }

  beat.addMarker(drumLoopMarker)
  grunts.addMarker(gruntLoopMarker)
  beat.play('drumLoop', {
    delay: 0,
  })
  grunts.play('gruntLoop', {
    delay: 0.1,
    volume: 0.1,
  })
}

function update() {
  if (titleLogoImage.x < 403) {
    titleLogoImage.x = titleLogoImage.x + 4
  }
  if (cloudsMG1_1.x < 1200) {
    cloudsMG1_1.x = cloudsMG1_1.x + 0.4
    cloudsMG1_2.x = cloudsMG1_2.x + 0.4
  } else {
    cloudsMG1_1.x = 400
    cloudsMG1_2.x = -399
  }
}
