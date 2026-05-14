"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import MenuButton from "./MenuButton";
import NavLinks from "./NavLinks";
import LogoLink from "./LogoLink";

function Navbar() {
  const [responsive, setResponsive] = useState(false);

  const navVariants = {
    open: {
      x: 0,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.15,
      },
    },

    closed: {
      x: 20,
    },
  };

  return (
    <header>
      <LogoLink />

      <div className="text-box">
        <motion.nav
          variants={navVariants}
          initial={false}
          animate={responsive ? "open" : "closed"}
          className={responsive ? "show" : ""}
        >
          <NavLinks setResponsive={setResponsive} />
        </motion.nav>

        <div className="test" onClick={() => setResponsive((prev) => !prev)}>
          <MenuButton isOpen={responsive} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
