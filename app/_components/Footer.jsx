// import Link from "next/link";
import { Link } from "next-view-transitions";
// import { IconsManifest } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaBehance } from "react-icons/fa6";
import FooterCTA from "@/app/_components/FooterCTA";

function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <FooterCTA />

        <div className="footer-footer">
          <div className="footer-link-list">
            <p className="footer-copyright">©MoSalam, {currentYear}.</p>
            <div className="footer-socials">
              <a
                data-cursor-grow
                href="https://www.instagram.com/og.salam/"
                target="_blank"
              >
                <FaInstagram />
              </a>
              <a
                data-cursor-grow
                href="https://x.com/mo_abdulsalam1"
                target="_blank"
              >
                <FaXTwitter />
              </a>
              <a
                data-cursor-grow
                href="https://www.linkedin.com/in/abdulsalam-mohammed-06084a174/"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
              <a
                data-cursor-grow
                href="https://www.behance.net/abdulsamohamme2"
                target="_blank"
              >
                <FaBehance />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
