import React from 'react'

export const Card = ({image, selected, onClick}:{image:string, selected: boolean, onClick:Function}) => {
  return (
    <div className={"card"}>
      <div className={selected ? "" : ""}>
        <img alt="" src={image} className="p-4" />
        <img alt="" src={`/assets/back.png`} className="" />
      </div>
    </div>
  )
}
