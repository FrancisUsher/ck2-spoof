let scrollingBGs = [
  {
    name: 'sky',
    path: 'image/glacial-mountain/sky.png',
    velocity: 0,
  },
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
  {
    name: 'mountains',
    path: 'image/glacial-mountain/mountains.png',
    velocity: 0,
  },
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

const loadBG = game => {
  scrollingBGs.map(bg => {
    game.load.image(bg.name, bg.path)
  })
}

const renderBG = game => {
  const initFullBG = (bgObj, secondary) => {
    const bg = game.add.image(
      secondary ? (bgObj.velocity > 0 ? -399 : 1199) : 400,
      300,
      bgObj.name
    )
    bg.displayWidth = 800
    bg.displayHeight = 600
    return bg
  }
  const initScrollingBG = bg => {
    return [initFullBG(bg), initFullBG(bg, true)]
  }
  scrollingBGs = scrollingBGs.map(bg => ({
    ...bg,
    refs: initScrollingBG(bg),
  }))
}

const scrollWrapBG = (bg1, bg2, velocity) => {
  if (bg1.x < 1200 && bg1.x > -400) {
    bg1.x = bg1.x + velocity
    bg2.x = bg2.x + velocity
  } else {
    bg1.x = 400
    bg2.x = velocity > 0 ? -399 : 1199
  }
}

const updateBG = () => {
  scrollingBGs.map(bg => {
    scrollWrapBG(bg.refs[0], bg.refs[1], bg.velocity)
  })
}

export { loadBG, renderBG, updateBG }
