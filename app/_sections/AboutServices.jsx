"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #fff; min-height: 100vh; }

  .services {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
    overflow: hidden;
  }

  /* ── card stage: full overlay, pointer-events off ── */
  .card-stage {
    position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
    pointer-events: none;
    z-index: 2;
  }

  .image-card {
    width: 400px;
    height: 560px;
    // border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.18);
  }

  .image-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── list ── */
  .list {
    position: relative;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .list-item {
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-weight: 900;
    font-size: clamp(36px, 6vw, 80px);
    line-height: 1.05;
    text-transform: uppercase;
    cursor: default;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 0.15em;
    position: relative;
    /* default: in front of card */
    z-index: 3;
    transition: color 0.3s ease, z-index 0s;
    color: #111;
  }

  /* when list has an active hover, dim non-active and push them behind card */
  .list.has-hover .list-item {
    color: #d8d8d8;
    z-index: 1; /* behind card (z-index: 2) */
  }

  /* the hovered one stays on top and black */
  .list.has-hover .list-item.active {
    color: #111;
    z-index: 3;
  }

  .dot {
    display: inline-block;
    width: 0.18em;
    height: 0.18em;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
    margin-bottom: 0.05em;
  }
`;

const services = [
  {
    label: ["BRAND DESIGN"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80",
  },
  {
    label: ["WEBSITE DESIGN"],
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&q=80",
  },
  {
    label: ["GRAPHIC DESIGN"],
    img: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?w=700&q=80",
  },
  {
    label: ["ILLUSTRATIONS"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  },
  {
    label: ["FRAMER DESIGN"],
    img: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=700&q=80",
  },
];

// map index → vertical offset so card tracks which item is hovered
// index 0 = top → card high (negative), index 4 = bottom → card low (positive)
const total = services.length;
function getCardTop(index) {
  // spread from -160px (top item) to +160px (bottom item)
  const min = -180;
  const max = 180;
  return min + (index / (total - 1)) * (max - min);
}

export default function ServicesHover() {
  const [active, setActive] = useState(null);

  const cardTop = active !== null ? getCardTop(active) : 0;
  // odd index = tilt left (-), even index = tilt right (+)
  const rotation = active !== null ? (active % 2 === 0 ? 6 : -6) : 0;

  return (
    <>
      {/* <style>{css}</style> */}
      <div className="container">
        <div className="section-heading">
          <p>Hover..</p>
          <h3>Services.</h3>
        </div>
        <section className="services">
          {/* Card — absolutely centered horizontally, top tracks active item */}
          <AnimatePresence>
            {active !== null && (
              <motion.div
                className="card-stage"
                style={{ top: "40%" }}
                animate={{ y: cardTop - 180 }} // offset so card center aligns nicely
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="image-card"
                    initial={{
                      opacity: 0,
                      scale: 0.88,
                      rotate: rotation * 1.5,
                    }}
                    animate={{ opacity: 1, scale: 1, rotate: rotation }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Image
                      src={services[active].img}
                      alt={services[active].label.join(" ")}
                      fill
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text list */}
          <ul className={`list${active !== null ? " has-hover" : ""}`}>
            {services.map((s, i) => (
              <li
                data-cursor-grow
                key={i}
                className={`list-item${active === i ? " active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {s.label}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
