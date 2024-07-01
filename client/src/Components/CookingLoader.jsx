import React from 'react'
import "./CookingLoader.css"
const CookingLoader = () => {
  return (
    <>
            <div id="cooking">
      <h2>Cooking in progress..</h2>
      <div>
        {[...Array(5)].map((_, i) => (
          <div className="bubble" key={i} />
        ))}
      </div>
      <div id="area">
        <div id="sides">
          <div id="pan" />
          <div id="handle" />
        </div>
        <div id="pancake">
          <div id="pastry" />
        </div>
      </div>
    </div>
    </>
  )
}

export default CookingLoader