import Link from "next/link";
import Image from "next/image";

import { userMetadataAtom } from "@/utils/atoms";
import { useAtomValue } from "jotai";

interface LogoProps {
  onClick?: () => void;
  withIcon?: boolean;
}

const Logo: React.FC<LogoProps> = ({ onClick, withIcon }) => {
  return (
    <Link href={"/"} onClick={onClick} className="flex items-center">
      <Image src="/favicon.png" alt="Favicon" width={50} height={50} />
    </Link>
  );
};

export default Logo;
