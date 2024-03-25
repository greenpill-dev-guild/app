import React from "react";
import Link from "next/link";

interface NavbarLinkProps {
  children: React.ReactNode;
  path: string;
  setOverlay: Function;
  target?: string;
}
const NavbarLink = ({
  children,
  setOverlay,
  path,
  target,
}: NavbarLinkProps) => {
  return (
    <Link target={target} onClick={() => setOverlay(false)} href={path}>
      {children}
    </Link>
  );
};

export default NavbarLink;
