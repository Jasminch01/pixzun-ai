"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { Brand, Leaf } from "../Svg";

interface LinkItem {
  name: string;
  href: string;
}

const DehsboardAppbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const links: LinkItem[] = [
    { name: "Cradit", href: "/cradit" },
    { name: "Get Cradits", href: "/getcradit" },
    { name: "Profile", href: "/profile" },
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
        isScrolled && "bg-bg-gradient"
      }`}
    >
      <div className="px-5">
        <div className="flex justify-between items-center py-5">
          <div className="flex justify-center gap-2">
            <Brand />
            <Link href={'/'} className="md:text-2xl text-xl text-white">pixaura</Link>
          </div>
          <div className="hidden md:flex items-center">
            <nav className="flex items-center space-x-3">
              <Link
                href="/cradit"
                className="text-base space-x-2 px-5 py-3 gradient transition-colors text-white"
              >
                {" "}
                <Leaf />
                <p>Cradit : 1</p>
              </Link>
              <Link
                href="/get-cradits"
                className="text-base text-white p-3 bg-button-gradient rounded-full transition-all"
              >
                Get Cradits
              </Link>
              <Link
                href="/profile"
                className="text-base text-white size-11 flex justify-center items-center bg-purple-500 rounded-full transition-all"
              >
                <p>ST</p>
              </Link>
            </nav>
          </div>
          <div className="relative md:hidden">
            <div className="btn btn-ghost btn-circle">
              <IoMenu
                color="white"
                size={25}
                onClick={() => setIsOpen(!isOpen)}
              />
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

export default DehsboardAppbar;
