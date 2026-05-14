import { motion } from "motion/react";

function MenuButton({ isOpen }) {
  return (
    <>
      <motion.span
        animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.span animate={isOpen ? { x: -9, y: -9 } : { x: -10, y: -10 }} />

      <motion.span animate={isOpen ? { x: 9, y: -9 } : { x: 10, y: -10 }} />

      <motion.span animate={isOpen ? { x: -9, y: 9 } : { x: -10, y: 10 }} />

      <motion.span animate={isOpen ? { x: 9, y: 9 } : { x: 10, y: 10 }} />
    </>
  );
}

export default MenuButton;
