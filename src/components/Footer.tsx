import React from "react";
import Container from "./Container";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <Container>
      <div className=" text-white">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="">
            <div className="mb-5">
              <p className="text-xl font-bold">pixaura</p>
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
          </div>

          <div className="">
            <div className="mb-5">
              <p className="text-lg font-semibold">
                Subscribe to Our Newsletter
              </p>
              <p className="text-white">
                Receive updates on the latest news and offers
              </p>
            </div>
            <div className="flex justify-end">
              <form className="">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="relative w-full">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-[352px] p-3 border bg-transparent rounded-full text-white pl-5 focus:border-white"
                    />
                    <button
                      type="submit"
                      className="absolute -right-0 top-0 h-full px-10 p-3 bg-join-button text-white rounded-full hover:bg-blue-700 transition-colors"
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
