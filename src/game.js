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

let scrollingBGs = [
  {
    name: 'cloud',
    path: 'image/glacial-mountain/cloud_lonely.png',
    velocity: -0.02,
  },
  {
    name: 'clouds',
    path: 'image/glacial-mountain/clouds_BG.png',
    velocity: 0.04,
  },
]

let scrollingBGs2 = [
  {
    name: 'cloudsMG3',
    path: 'image/glacial-mountain/clouds_MG_3.png',
    velocity: 0.1,
  },
  {
    name: 'cloudsMG2',
    path: 'image/glacial-mountain/clouds_MG_2.png',
    velocity: -0.25,
  },
  {
    name: 'cloudsMG1',
    path: 'image/glacial-mountain/clouds_MG_1.png',
    velocity: 0.5,
  },
]

function preload() {
  this.load.image('sky', 'image/glacial-mountain/sky.png')
  scrollingBGs.map(bg => {
    this.load.image(bg.name, bg.path)
  })
  this.load.image('mountains', 'image/glacial-mountain/mountains.png')
  scrollingBGs2.map(bg => {
    this.load.image(bg.name, bg.path)
  })
  this.load.image('title', 'image/CRUSADER.png')

  this.load.spritesheet('dude', 'image/dude.png', {
    frameWidth: 32,
    frameHeight: 48,
  })

  this.load.audio('beat', 'audio/african-drum-jam.mp3')
  this.load.audio('grunts', 'audio/grunts.mp3')
}

let titleLogoImage

function initializeBackground() {
  const initFullBG = (bgObj, secondary) => {
    const bg = this.add.image(
      secondary ? (bgObj.velocity > 0 ? -399 : 1199) : 400,
      300,
      bgObj.name
    )
    bg.displayWidth = 800
    bg.displayHeight = 600
    return bg
  }
  const initStaticBG = name => {
    const bg = this.add.image(400, 300, name)
    bg.displayWidth = 800
    bg.displayHeight = 600
    return bg
  }
  const initScrollingBG = bg => {
    return [initFullBG(bg), initFullBG(bg, true)]
  }
  initStaticBG('sky')
  scrollingBGs = scrollingBGs.map(bg => ({
    ...bg,
    refs: initScrollingBG(bg),
  }))
  initStaticBG('mountains')
  scrollingBGs2 = scrollingBGs2.map(bg => ({
    ...bg,
    refs: initScrollingBG(bg),
  }))
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
  scrollingBGs.map(bg => {
    scrollWrapBG(bg.refs[0], bg.refs[1], bg.velocity)
  })
  scrollingBGs2.map(bg => {
    scrollWrapBG(bg.refs[0], bg.refs[1], bg.velocity)
  })
}

function scrollWrapBG(bg1, bg2, increment) {
  if (bg1.x < 1200 && bg1.x > -400) {
    bg1.x = bg1.x + increment
    bg2.x = bg2.x + increment
  } else {
    bg1.x = 400
    bg2.x = increment > 0 ? -399 : 1199
  }
}
