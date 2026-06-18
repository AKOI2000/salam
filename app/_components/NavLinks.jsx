import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

function NavLinks({ setResponsive, onNavigate }) {
  const pathname = usePathname();

  const handleClick = (e, path) => {
    if (pathname === path) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onNavigate(); // flag navigation start
    setResponsive(false);
  };

  const linkVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },

    closed: {
      opacity: 0,
    },
  };

  const links = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "About",
      path: "/about",
    },

    {
      name: "Portfolio",
      path: "/portfolio",
    },
  ];

  return (
    <>
      {links.map((link) => (
        <motion.div key={link.path} variants={linkVariants}>
          <Link
            href={link.path}
            prefetch={true}
            onClick={(e) => handleClick(e, link.path)}
            className={`nav-links ${pathname === link.path ? "active" : ""}`}
          >
            {link.name}
          </Link>
        </motion.div>
      ))}
    </>
  );
}

export default NavLinks;
