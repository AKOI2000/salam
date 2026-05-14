import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

function NavLinks({ setResponsive }) {
  const pathname = usePathname();

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

    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <>
      {links.map((link) => (
        <motion.div key={link.path} variants={linkVariants}>
          <Link
            href={link.path}
            onClick={(e) => {
              if (pathname !== link.path) setResponsive(false);
              if (pathname === link.path) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
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
