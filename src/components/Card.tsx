import React, { MouseEventHandler } from 'react'
import css from "./Card.module.css"

export const Card = ({ image, selected, onClick }: { image: string, selected: boolean, onClick: MouseEventHandler<HTMLImageElement> }) => {
  return (
    <div className={css.card}>
      <div className={selected ? css.selected : ""}>
        <img alt="" src={image} className={css.cardFace} />
        <img alt="" src={`/assets/cardback.png`} className={css.cardBack} onClick={onClick} />
      </div>
    </div>
  )
}
