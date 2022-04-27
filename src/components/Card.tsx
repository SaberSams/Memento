import React, { MouseEventHandler } from 'react'

export const Card = ({image, selected, onClick}:{image:string, selected: boolean, onClick:MouseEventHandler<HTMLImageElement>}) => {
  return (
    <div className={"card"}>
      <div className={selected ? "selected" : ""}>
        <img alt="" src={image} className="card-face" />
        <img alt="" src={`/assets/cardback.png`} className="card-back" onClick={onClick} />
      </div>
    </div>
  )
}
