"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Brand, Leaf, LeafBright } from "../Svg";
import { TbLogout } from "react-icons/tb";
import { SiGoogledocs } from "react-icons/si";
import { useClerk, useUser } from "@clerk/nextjs";
import axiosInstance from "@/utils/axiosInstance";
import { useUserContext } from "@/app/context/ContextProvider";
import CheckOutModal from "../CheckOutModal";
import CheckoutForm from "../CheckrouForm";
import PricingModal from "./Projects/PricingModal";
import { Toaster } from "react-hot-toast";

const DashboardAppBar: React.FC = () => {
  const { signOut } = useClerk();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const {
    currentUser,
    loading,
    refetch: refetchUser,
    setIsPricingModalOpen,
    isPricingModalOpen,
    isPaymentModalOpen,
    selectedPrice,
    handleSubscriptionPayment,
    setSelectedPriceId,
    setIsPaymentModalOpen,
  } = useUserContext();
  const { isLoaded, user } = useUser();

  const handleSignOut = () => {
    signOut();

    const logout = async () => {
      try {
        const res = await axiosInstance.post("/api/auth/logout");
        // Redirect to the home page
        window.location.href = "/";
      } catch (error) {
        console.error(error);
      }
    };

    logout();
  };

  // Save user and role in db if user is not exist in db
  useEffect(() => {
    if (!isLoaded || !user) return;

    const newUser = {
      name: user.fullName,
      email: user.emailAddresses[0].emailAddress,
      image: user.imageUrl,
    };

    const signUpUser = async () => {
      try {
        const res = await axiosInstance.post("/api/auth/signup", newUser);
      } catch (error) {
        console.error(error);
      }
    };

    signUpUser();
  }, [isLoaded, user]);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const modalOpen = () => {
    setIsPricingModalOpen(true);
  };
  const closeModal = () => {
    setIsPricingModalOpen(false);
  };
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  return (
    <div
      className={`fixed w-full md:z-20 z-20 top-0 ${
        isScrolled ? "bg-bg-gradient" : ""
      }`}
    >
      <Toaster />
      <div className="px-5">
        <div className="flex justify-between items-center py-5">
          <Link href={"/app"} className="flex justify-center gap-2">
            <Brand />
            <p className="md:text-2xl text-xl text-white hidden lg:flex">
              pixzun
            </p>
          </Link>
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center space-x-3">
              <div className="text-base space-x-2 px-5 py-3 flex text-white">
                <Leaf />
                <p>Credit : {currentUser?.cradit}</p>
              </div>
              <button
                onClick={modalOpen}
                className="text-base text-white p-3 bg-button-gradient rounded-full transition-all"
              >
                Get Credits
              </button>
              <div className="relative group" ref={profileRef}>
                <button
                  className="text-base text-white flex justify-center items-center rounded-full transition-all "
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <img
                    src={user?.imageUrl}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </button>
                {currentUser && isProfileOpen && (
                  <div className="absolute right-4 top-[4rem] text-white bg-[#2B2E3C] border-2 border-gray-400 rounded-md transition-transform duration-300 ease-in-out transform block w-[20rem] pb-3">
                    <div className="pl-5">
                      <Link
                        href={"/app/profile"}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 hover:bg-gray-50/5 py-3"
                      >
                        {/* Profile Image */}
                        <div className="text-base text-white flex-shrink-0 rounded-full">
                          <img
                            src={user?.imageUrl}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>

                        {/* Username and Email Container */}
                        <div className="flex flex-col flex-1 min-w-0">
                          <p className="truncate">{user?.fullName}</p>
                          {user?.emailAddresses.map((email, index) => (
                            <p key={index} className="text-sm truncate">
                              {email.emailAddress}
                            </p>
                          ))}
                        </div>
                      </Link>

                      <div className=" mt-3 text-sm">
                        <div className="my-5">
                          {/* Credit Section */}
                          <p className="mb-3 flex items-center gap-3">
                            <Leaf />
                            {/* Make sure Leaf icon is aligned */}
                            <span>Credit: {currentUser?.credit}</span>
                          </p>
                        </div>
                        <div className="space-y-2 mb-7">
                          {/* Project Link */}
                          <Link
                            href={"/app"}
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3"
                          >
                            <SiGoogledocs
                              size={22}
                              className="flex-shrink-0"
                              color="white"
                            />{" "}
                            {/* Align Project Icon */}
                            <span>Project</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-400 border" />

                    <button
                      className="flex items-center text-sm ml-5 gap-3 mt-2"
                      onClick={() => handleSignOut()}
                    >
                      <TbLogout
                        size={25}
                        className="flex-shrink-0"
                        color="white"
                      />{" "}
                      {/* Align Logout Icon */}
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
          {/* appbar for small devices */}
          <div className="flex gap-2 lg:hidden items-center">
            <LeafBright />
            <p className="text-white">{currentUser?.cradit}</p>
          </div>
        </div>
        <PricingModal isOpen={isPricingModalOpen} onClose={closeModal} />

        {isPaymentModalOpen && (
          <CheckOutModal
            isOpen={isPaymentModalOpen}
            onClose={closePaymentModal}
          >
            <CheckoutForm
              onPayment={handleSubscriptionPayment}
              selectedPrice={selectedPrice}
            />
          </CheckOutModal>
        )}
      </div>
    </div>
  );
};

export default DashboardAppBar;
