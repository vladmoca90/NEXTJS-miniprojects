import React, { useRef, useState, useEffect } from 'react'

export default function App() {
  const containerRef = useRef(null)
  const squareSize = 60
  const [pos, setPos] = useState({ x: 20, y: 20 })

  useEffect(() => {
    // ensure it starts within bounds
    const c = containerRef.current
    if (!c) return
    const { clientWidth, clientHeight } = c
    setPos((p) => ({
      x: Math.min(p.x, clientWidth - squareSize - 10),
      y: Math.min(p.y, clientHeight - squareSize - 10)
    }))
  }, [])

  function handleClick(e) {
    const rect = containerRef.current.getBoundingClientRect()
    // position square centered where the user clicked
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    const newX = Math.max(10, Math.min(clickX - squareSize / 2, rect.width - squareSize - 10))
    const newY = Math.max(10, Math.min(clickY - squareSize / 2, rect.height - squareSize - 10))
    setPos({ x: newX, y: newY })
  }

  function handleRandom() {
    const c = containerRef.current
    if (!c) return
    const { clientWidth, clientHeight } = c
    const newX = Math.floor(Math.random() * (clientWidth - squareSize - 20)) + 10
    const newY = Math.floor(Math.random() * (clientHeight - squareSize - 20)) + 10
    setPos({ x: newX, y: newY })
  }

  return (
    <div className="page">
      <h1>Click inside the box to move the dark-red square</h1>
      <div
        className="container"
        ref={containerRef}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'r') handleRandom() }}
        aria-label="Click to move square; press R for random"
      >
        <div
          className="square"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        />
      </div>

      <div className="controls">
        <button onClick={handleRandom}>Random</button>
        <button onClick={() => setPos({ x: 20, y: 20 })}>Reset</button>
      </div>
    </div>
  )
}
