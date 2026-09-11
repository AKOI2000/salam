"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const services = [
  {
    label: ["MOTION DESIGN"],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80",
  },
  {
    label: ["GRAPHIC DESIGN"],
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80",
  },
  {
    label: ["WEB DESIGN"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
  },
];

// map index → vertical offset so card tracks which item is hovered
// index 0 = top → card high (negative), index 4 = bottom → card low (positive)
const total = services.length;
function getCardTop(index) {
  // spread from -160px (top item) to +160px (bottom item)
  const min = -110;
  const max = 110;
  return min + (index / (total - 1)) * (max - min);
}

function ServicesList() {
  const [active, setActive] = useState(null);

  const cardTop = active !== null ? getCardTop(active) : 0;
  const previewOffset = 110;
  // odd index = tilt left (-), even index = tilt right (+)
  const rotation = active !== null ? (active % 2 === 0 ? 6 : -6) : 0;
  return (
    <div className="services">
      {/* Card — absolutely centered horizontally, top tracks active item */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="card-stage"
            style={{ top: "42%" }}
            animate={{ y: cardTop - previewOffset }}
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
    </div>
  );
}

export default ServicesList;
