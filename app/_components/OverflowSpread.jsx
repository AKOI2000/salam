import Image from "next/image";

const logos = [
  { src: "/argentil.png", alt: "Argentil" },
  { src: "/cocacola.png", alt: "Cocacola" },
  { src: "/fidelity.png", alt: "Fidelity Bank" },
  { src: "/happyTreat.png", alt: "Happy Treat" },
  { src: "/Hennessy.png", alt: "Hennessy" },
  { src: "/hook.png", alt: "Hook" },
  { src: "/indomie.png", alt: "Indomie" },
  { src: "/leadwayy.png", alt: "Leadway" },
  { src: "/lushHair.png", alt: "Lush Hair" },
  { src: "/maltaGuiness.png", alt: "Malta Guinness" },
  { src: "/orijin.png", alt: "Orijin Bitters" },
  { src: "/visa.png", alt: "Visa" },
];

const repeat = 4;

// One full pass of all logos
const logoList = Array.from({ length: repeat }).flatMap((_, r) =>
  logos.map((logo, i) => (
    <span className="marquee__item" key={`${r}-${i}`}>
      <Image src={logo.src} alt={logo.alt} className="marquee__logo" width={4} height={3} sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw" />
    </span>
  )),
);

function Overflowspread() {
  return (
    <div className="quality-spread">
      <div className="white-gradient" />
      <div className="marquee">
        <div className="marquee__inner">
          <div className="marquee__group">{logoList}</div>
          <div className="marquee__group" aria-hidden="true">
            {logoList}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overflowspread;
