"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

interface LinkItem {
  name: string;
  href: string;
}

const Appbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links: LinkItem[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Service",
      href: "/service",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "Login",
      href: "/login",
    },
    {
      name: "Signup",
      href: "/signup",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto md:px-10 px-5 text-white">
      <div className="flex justify-between mt-6">
        <div>
          <p className="text-xl">pixaura</p>
        </div>
        <div className={`md:flex space-x-10 hidden`}>
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden relative">
          <div className="btn btn-ghost btn-circle">
            <IoMenu size={25} onClick={() => setIsOpen(!isOpen)} />
          </div>
          <ul
            tabIndex={0}
            className={`absolute right-0 z-[1] bg-white text-black px-5 rounded transition-transform duration-300 ease-in-out transform  ${
              isOpen ? "block scale-100 opacity-100" : "hidden scale-95 opacity-0"
            }`}
          >
            {links.map((link, index) => (
              <li className="text-right my-2 text-sm hover:bg-secondary hover:text-white w-full">
                <Link key={index} href={link.href}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
