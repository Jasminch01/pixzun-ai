"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoImageOutline, IoMenu } from "react-icons/io5";
import { Brand, Leaf } from "../Svg";
import { TbLogout } from "react-icons/tb";
import { SiGoogledocs } from "react-icons/si";
import { useClerk, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface LinkItem {
  name: string;
  href: string;
}

const DehsboardAppbar: React.FC = () => {
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const links: LinkItem[] = [
    { name: "Cradit", href: "/cradit" },
    { name: "Get Cradits", href: "/getcradit" },
    // { name: "Profile", href: "" },
  ];
  const { isLoaded, user } = useUser();
  const newUser = {
    name : user?.fullName,
    email : user?.emailAddresses,
    image : user?.imageUrl,
  }
  console.log(newUser)
  const handleSignOut = () => {
    signOut();
    redirect("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed w-full z-50 top-0 ${isScrolled && "bg-bg-gradient"}`}
    >
      <div className="px-5">
        <div className="flex justify-between items-center py-5">
          <div className="flex justify-center gap-2">
            <Brand />
            <Link href={"/app"} className="md:text-2xl text-xl text-white">
              pixzun
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <nav className="flex items-center space-x-3">
              <Link
                href="/cradit"
                className="text-base space-x-2 px-5 py-3 gradient transition-colors text-white"
              >
                <Leaf />
                <p>Cradit : 1</p>
              </Link>
              <Link
                href="/get-cradits"
                className="text-base text-white p-3 bg-button-gradient rounded-full transition-all"
              >
                Get Cradits
              </Link>
              <div className="relative group">
                <button
                  className="text-base text-white flex justify-center items-center rounded-full transition-all "
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  {/* <p>ST</p> */}
                  <img
                    src={`${user?.imageUrl}`}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-4 top-[4rem] z-[1] text-white bg-[#2B2E3C] border-2 border-gray-400 rounded-md transition-transform duration-300 ease-in-out transform block w-[20rem] py-3">
                    <Link
                      href={"app/profile"}
                      className="flex items-center justify-center gap-5"
                    >
                      <div className="text-base text-white  flex justify-center items-center rounded-full transition-all ">
                        <img
                          src={`${user?.imageUrl}`}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p>{user?.fullName}</p>
                        <p className="text-sm">{`${user?.emailAddresses}`}</p>
                      </div>
                    </Link>
                    <div className="ml-8 mt-3 text-sm">
                      <div className="my-5">
                        <p className="mb-3 flex gap-3">
                          <Leaf /> Cradit : 1
                        </p>
                        <p className="text-gray-400">Clude project</p>
                      </div>
                      <div className="space-y-2 mb-3">
                        <p className="flex items-center gap-3">
                          <IoImageOutline size={22} color="white" />
                          My Gallery
                        </p>
                        <p className="flex items-center gap-3">
                          <SiGoogledocs size={22} color="white" />
                          Project
                        </p>
                      </div>
                    </div>
                    <hr className="border-gray-400 border" />
                    <button
                      className="flex text-sm ml-8 items-center gap-3 my-2"
                      onClick={() => handleSignOut()}
                    >
                      <TbLogout size={25} color="white" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
