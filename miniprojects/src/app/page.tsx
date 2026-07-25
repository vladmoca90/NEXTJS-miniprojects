"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/square-animation.module.css";

const SQUARE_SIZE = 60;
const CONTAINER_PADDING = 10;
const INITIAL_POSITION = { x: 20, y: 20 };

export default function SquareAnimationPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(INITIAL_POSITION);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const container = containerRef.current;

    if (!container) return;

    const rect = container.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const maximumX = rect.width - SQUARE_SIZE - CONTAINER_PADDING;
    const maximumY = rect.height - SQUARE_SIZE - CONTAINER_PADDING;

    const newX = Math.max(
      CONTAINER_PADDING,
      Math.min(clickX - SQUARE_SIZE / 2, maximumX),
    );

    const newY = Math.max(
      CONTAINER_PADDING,
      Math.min(clickY - SQUARE_SIZE / 2, maximumY),
    );

    setPos({
      x: newX,
      y: newY,
    });
  }

  function handleRandom() {
    const container = containerRef.current;

    if (!container) return;

    const maximumX =
      container.clientWidth - SQUARE_SIZE - CONTAINER_PADDING * 2;

    const maximumY =
      container.clientHeight - SQUARE_SIZE - CONTAINER_PADDING * 2;

    const newX =
      Math.floor(Math.random() * Math.max(maximumX, 0)) + CONTAINER_PADDING;

    const newY =
      Math.floor(Math.random() * Math.max(maximumY, 0)) + CONTAINER_PADDING;

    setPos({
      x: newX,
      y: newY,
    });
  }

  function handleReset() {
    setPos(INITIAL_POSITION);
  }

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const maximumX = container.clientWidth - SQUARE_SIZE - CONTAINER_PADDING;

    const maximumY = container.clientHeight - SQUARE_SIZE - CONTAINER_PADDING;

    setPos((currentPosition) => ({
      x: Math.max(CONTAINER_PADDING, Math.min(currentPosition.x, maximumX)),
      y: Math.max(CONTAINER_PADDING, Math.min(currentPosition.y, maximumY)),
    }));
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Square Animation</h1>
      <div
        ref={containerRef}
        className={styles.container}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key.toLowerCase() === "r") {
            handleRandom();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Click inside the area to move the square. Press R to move it randomly."
      >
        <div
          className={styles.square}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
          }}
        />
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.btn} onClick={handleRandom}>
          Start
        </button>

        <button type="button" className={styles.btn} onClick={handleReset}>
          Reset
        </button>
      </div>
    </main>
  );
}
