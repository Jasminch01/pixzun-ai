"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";

interface LinkItem {
  name: string;
  href: string;
}

const Appbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const links: LinkItem[] = [
    { name: "Home", href: "/" },
    { name: "Service", href: "/service" },
    { name: "Pricing", href: "/pricing" },
    { name: "Login", href: "/login" },
    { name: "Signup", href: "/signup" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed w-full z-50 top-0 ${
        isScrolled && "bg-white/10 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4">
          <div>
            <p className="md:text-2xl text-white">pixaura</p>
          </div>
          <div className="hidden md:flex items-center">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-base text-white ${
                  link.name === "Login"
                    ? "px-6 py-2 gradient text-white transition-all"
                    : ""
                } ${link.name !== "Signup" && index !== 0 ? "ml-10" : "ml-6"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="relative md:hidden">
            <div className="btn btn-ghost btn-circle">
              <IoMenu size={25} onClick={() => setIsOpen(!isOpen)} />
            </div>
            <ul
              tabIndex={0}
              className={`absolute right-0 z-[1] bg-white text-black px-5 rounded transition-transform duration-300 ease-in-out transform ${
                isOpen
                  ? "block scale-100 opacity-100"
                  : "hidden scale-95 opacity-0"
              }`}
            >
              {links.map((link, index) => (
                <li
                  key={index}
                  className="text-right my-2 text-sm hover:bg-secondary hover:text-white w-full"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
