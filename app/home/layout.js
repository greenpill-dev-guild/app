"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function ProtectedLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (link, title) => {
    router.push(`${link}?title=` + title);
  };

  const navLinks = [
    {
      title: "Your Voice",
      icon: "/yourvoice.svg",
      link: "/home",
    },
    {
      title: "Your Grants",
      icon: "/yourgrants.svg",
    },
    {
      title: "Your Proposals",
      icon: "/yourproposals.svg",
    },
    {
      title: "Donate",
      icon: "/donate.svg",
    },
    {
      title: "Awarded Grants",
      icon: "/awardedgrants.svg",
    },
    {
      title: "My Cart",
      icon: "/yourcart.svg",
    },
    {
      title: "Message",
      icon: "/messages.svg",
    },
    {
      title: "Learn More",
      icon: "/learnmore.svg",
    },
    {
      title: "Logout",
      icon: "/logout.svg",
    },
  ];

  return (
    <section className={inter.className}>
      <nav
        className={`w-full fixed top-0 bg-[#ffffff90] backdrop-blur-md ${
          isOpen ? "bg-[#fafafa] rounded-b-3xl" : "bg-transparent"
        }`}
      >
        <div className="w-full h-20 flex flex-row items-center justify-between px-4">
          <Image
            src="/logo.png"
            alt="impact stream greenpill africa logo"
            width={35}
            height={35}
            className="w-auto h-auto"
          />
          <div onClick={handleHamburger}>
            <Image
              src={isOpen ? "/close.svg" : "/hamburger.svg"}
              alt="hamburger"
              width={30}
              height={30}
              className="w-auto h-auto"
            />
          </div>
        </div>
        <div
          className={
            isOpen
              ? "flex flex-col gap-4 px-4 text-lg text-[#555] pb-4"
              : "hidden"
          }
        >
          {navLinks.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-3 py-1 w-full"
                onClick={() => handleNavigation(item.link, item.title)}
              >
                {" "}
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={25}
                  height={25}
                  className="w-auto h-auto"
                />{" "}
                {item.title}
              </div>
            );
          })}
        </div>
      </nav>
      {children}
    </section>
  );
}
