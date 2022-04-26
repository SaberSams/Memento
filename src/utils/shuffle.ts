import React from 'react'

const shuffle = () => {
  const assets = [
    { image: '/assets/btc.png'},
    { image: '/assets/eth.png'},
    { image: '/assets/link.png'},
    { image: '/assets/doge.png'},
    { image: '/assets/ada.png'},
    { image: '/assets/avax.png'},
    { image: '/assets/xrp.png'},
    { image: '/assets/sol.png'},
  ]
  return [...assets, ...assets]
    .sort(() => 0.5 - Math.random())
    .map((card) => ({ ...card, id: Math.random() }))
}

export default shuffle