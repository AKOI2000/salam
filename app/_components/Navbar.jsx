"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import MenuButton from "./MenuButton";
import NavLinks from "./NavLinks";
import LogoLink from "./LogoLink";

function Navbar() {
  const [responsive, setResponsive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isNavigating = useRef(false);
  const pathname = usePathname();

  // reset on every new page
  useEffect(() => {
    isNavigating.current = false;
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigating.current) return; // pause during navigation

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
        setResponsive(false);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <motion.header
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <LogoLink />

      <div className="text-box">
        <motion.nav
          variants={navVariants}
          initial={false}
          animate={responsive ? "open" : "closed"}
          className={responsive ? "show" : ""}
        >
          <NavLinks
            setResponsive={setResponsive}
            onNavigate={() => (isNavigating.current = true)}
          />
        </motion.nav>

        <div className="test" onClick={() => setResponsive((prev) => !prev)}>
          <MenuButton isOpen={responsive} />
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;