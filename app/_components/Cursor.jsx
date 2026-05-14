// components/Cursor.jsx
"use client"

import { useEffect, useRef, useState } from "react"

export default function Cursor() {
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let curX = 0,   curY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      curX = curX + (mouseX - curX) * 1
      curY = curY + (mouseY - curY) * 1
      if (cursorRef.current) {
        cursorRef.current.style.left = curX + "px"
        cursorRef.current.style.top  = curY + "px"
      }
      requestAnimationFrame(animate)
    }

    const targets = document.querySelectorAll("[data-cursor-grow]")
    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => setIsHovering(true))
      el.addEventListener("mouseleave", () => setIsHovering(false))
    })

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`cursor ${isHovering ? "big" : ""}`}
    />
  )
}