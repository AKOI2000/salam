import Image from "next/image";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

function LogoLink() {
  const pathname = usePathname();
  return (
    <Link
      prefetch={true}
      href="/"
      className="logo"
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <Image
        alt="Salam's Logo"
        src="/MO SALAM-01.png"
        width={117}
        height={70}
        priority
        sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </Link>
  );
}

export default LogoLink;
