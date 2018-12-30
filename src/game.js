import Phaser from 'phaser'
import { loadBG, renderBG, updateBG } from './Parallax'

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

new Phaser.Game(config)

function preload() {
  loadBG(this)
  this.load.image('title', 'image/CRUSADER.png')

  this.load.audio('beat', 'audio/african-drum-jam.mp3')
  this.load.audio('grunts', 'audio/grunts.mp3')
}

let titleLogoImage

function initializeBackground() {
  renderBG(this)
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
  // beat.play('drumLoop', {
  //   delay: 0,
  // })
  // grunts.play('gruntLoop', {
  //   delay: 5,
  //   volume: 0.1,
  // })
}

function update() {
  if (titleLogoImage.x < 403) {
    titleLogoImage.x = titleLogoImage.x + 4
  }
  updateBG()
}
