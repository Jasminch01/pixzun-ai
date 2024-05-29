import Link from "next/link";
import React, { useState } from "react";

interface LinkItem {
  name: string;
  href: string;
}

const Appbar: React.FC = () => {
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
    <div className="max-w-7xl mx-auto md:px-10 text-white">
      <div className="flex justify-between mt-6">
        <div>
          <p className="text-xl">pixaura</p>
        </div>
        <div className={`md:flex space-x-5`}>
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
