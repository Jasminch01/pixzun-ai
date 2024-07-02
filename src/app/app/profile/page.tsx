"use client";
import { useUserContext } from "@/app/context/ContextProvider";
import React, { useState } from "react";


const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const {currentUser, loading} = useUserContext()

  const renderContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return (
          <div className="bg-[#292B3A] px-10 py-20">
            <h2 className="text-2xl mb-10 text-white">Personal Info</h2>
            <div className="space-y-10">
              <div className="">
                <p className="text-gray-300">User Name</p>
                <div className="flex justify-between">
                  <p className="text-white">Name: {`${currentUser?.name}`}</p>
                  <div className="">
                    <button className="py-2 rounded-md px-4 border border-gray-400">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p className="text-gray-300">User Email</p>
                  <div className="flex justify-between">
                    <p className="text-white">Email: {`${currentUser?.email}`}</p>
                    <button className="py-2 rounded-md px-4 border border-gray-400">
                      Modify email addrerss
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-300 font-bold">Delete Account</p>
                <button className="py-2 rounded-md px-4 border border-gray-400">
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      case "credits":
        return (
          <div className="text-center">
            <h2 className="text-2xl mb-4 text-white">Credits</h2>
            <div className="bg-[#292B3A] p-4 rounded">
              <p className="text-white">Available Credits: 10</p>
              <p className="text-white">Credits Used: 5</p>
            </div>
          </div>
        );
      case "subscription":
        return (
          <div className="text-center">
            <h2 className="text-2xl mb-4 text-white">Subscription</h2>
            <div className="bg-[#292B3A] p-4 rounded">
              <p className="text-white">Plan: Premium</p>
              <p className="text-white">Next Billing Date: 01/01/2024</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center p-6 mt-[10rem] text-white">
      <div className="flex justify-center items-center space-x-5">
        <div className="text-base text-white size-11 flex justify-center items-center bg-purple-500 rounded-full transition-all px-3 py-2">
          <p>ST</p>
        </div>
        <div>
          <h1 className="text-2xl">{currentUser?.name}</h1>
          <p className="text-lg">{currentUser?.email}</p>
        </div>
      </div>
      <div className="w-full mt-10">
        <div className="flex justify-center mb-4 border-b border-gray-600">
          <button
            className={`p-2 ${
              activeTab === "personalInfo" ? "border-b-2 border-white" : ""
            }`}
            onClick={() => setActiveTab("personalInfo")}
          >
            Personal Info
          </button>
          <button
            className={`p-2 ${
              activeTab === "credits" ? "border-b-2 border-white" : ""
            }`}
            onClick={() => setActiveTab("credits")}
          >
            Credits
          </button>
          <button
            className={`p-2 ${
              activeTab === "subscription" ? "border-b-2 border-white" : ""
            }`}
            onClick={() => setActiveTab("subscription")}
          >
            Subscription
          </button>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="mt-10">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
