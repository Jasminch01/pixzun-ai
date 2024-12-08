"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Brand } from "./Svg";
import { CgMenuRight } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

interface LinkItem {
  name: string;
  href: string;
}

const Appbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const links: LinkItem[] = [
    { name: "Pricing", href: "#pricing" },
    { name: "Login", href: "/sign-in" },
    { name: "Signup", href: "/sign-up" },
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
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      className={`fixed w-full z-50 top-0 px-5 lg:px-5 xl:px-0 md:px-5 ${
        isScrolled && "bg-bg-gradient"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-center items-center gap-2">
            <Image
              src={"/logo.png"}
              width={500}
              height={500}
              alt="pixzun_brand"
              className="size-10"
            ></Image>
            <p className="md:text-2xl uppercase text-xl text-white">
              pixzun
            </p>
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
              {isOpen ? (
                <MdOutlineClose
                  color="white"
                  size={30}
                  onClick={() => setIsOpen(false)}
                />
              ) : (
                <CgMenuRight
                  color="white"
                  size={30}
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
            {isOpen && (
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                tabIndex={0}
                className={`fixed md:hidden inset-x-0 h-full right-0 z-50 bg-bg-gradient text-white px-5 rounded transition-transform duration-300 ease-in-out text-center transform `}
              >
                <div className="mt-20">
                  {links.map((link, index) => (
                    <p
                      key={index}
                      className="my-2 text-lg hover:bg-secondary hover:text-white w-full"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
