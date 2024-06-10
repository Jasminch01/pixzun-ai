import React from "react";
import Container from "./Container";
import Link from "next/link";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { Brand } from "./Svg";

const Footer: React.FC = () => {
  return (
    <Container>
      <div className=" text-white xl:px-0 px-5">
        <div className="flex md:flex-row flex-col-reverse justify-between">
          <div className="">
            <div className="mb-5">
              <p className="text-xl">pixaura</p>
            </div>
            <div className="">
              <div className="space-x-10">
                <Link href="/" className="text-sm">
                  Home
                </Link>
                <Link href="/privacy-policy" className="text-sm">
                  Privacy Policy
                </Link>
              </div>
              <div className="mt-3 space-x-10">
                <Link href="/pricing" className="text-sm">
                  Pricing
                </Link>

                <Link href="/services" className="text-sm">
                  Services
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <p className="font-bold">Follow us on</p>
              <div className="mt-4 flex items-center space-x-5">
                <Link href={""}>
                  <IoLogoLinkedin size={30} />
                </Link>
                <Link href={""}>
                  <FaInstagram size={30} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-0 mb-10 md:mb-0">
            <div className="mb-5">
              <p className="md:text-xl font-bold text-lg">
                Subscribe to Our Newsletter
              </p>
              <p className="text-white md:text-base text-sm">
                Receive updates on the latest news and offers
              </p>
            </div>
            <div className="flex md:justify-end justify-start">
              <form className="">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="relative w-full">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="md:w-[352px] md:p-3 p-2 border bg-transparent rounded-full text-white pl-5 focus:border-white"
                    />
                    <button
                      type="submit"
                      className="absolute -right-0 top-0 h-full md:px-10 px-5 bg-join-button text-white rounded-full transition-colors"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-white mt-10 text-sm">
        All rights reserved. © Smol AI 2024.
      </p>
    </Container>
  );
};

export default Footer;
