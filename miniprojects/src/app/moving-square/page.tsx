"use client"
import React, { useRef, useState, useEffect } from 'react'
import styles from '../styles/moving-square.css'

const SQUARE_SIZE = 60

export default function MovingSquarePage() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState({ x: 20, y: 20 })

  useEffect(() => {
    const c = containerRef.current
    if (!c) return
    const { clientWidth, clientHeight } = c
    setPos((p) => ({
      x: Math.min(p.x, clientWidth - SQUARE_SIZE - 10),
      y: Math.min(p.y, clientHeight - SQUARE_SIZE - 10)
    }))
  }, [])

  function handleClick(e: React.MouseEvent) {
    const rect = containerRef.current!.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    const newX = Math.max(10, Math.min(clickX - SQUARE_SIZE / 2, rect.width - SQUARE_SIZE - 10))
    const newY = Math.max(10, Math.min(clickY - SQUARE_SIZE / 2, rect.height - SQUARE_SIZE - 10))
    setPos({ x: newX, y: newY })
  }

  function handleRandom() {
    const c = containerRef.current
    if (!c) return
    const { clientWidth, clientHeight } = c
    const newX = Math.floor(Math.random() * (clientWidth - SQUARE_SIZE - 20)) + 10
    const newY = Math.floor(Math.random() * (clientHeight - SQUARE_SIZE - 20)) + 10
    setPos({ x: newX, y: newY })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Moving Square</h1>

      <div
        className={styles.container}
        ref={containerRef}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'r') handleRandom() }}
        aria-label="Click to move square; press R for random"
      >
        <div
          className={styles.square}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        />
      </div>

      <div className={styles.controls}>
        <button className={styles.btn} onClick={handleRandom}>Random</button>
        <button className={styles.btn} onClick={() => setPos({ x: 20, y: 20 })}>Reset</button>
      </div>
    </div>
  )
}
