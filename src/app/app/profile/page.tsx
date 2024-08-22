"use client";
import { useUserContext } from "@/app/context/ContextProvider";
import axiosInstance from "@/utils/axiosInstance";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const { currentUser, loading, refetch } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || "");
  const { user } = useUser();

  const updateName = async (update: any) => {
    try {
      const response = await axiosInstance.put(`/api/users/update/me`, update);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error during get request:", error);
    }
  };

  const handleEditClick = async () => {
    if (isEditing) {
      // Save the new name
      await updateName({ name: newName });
      refetch();
    }
    setIsEditing(!isEditing);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return (
          <div className="bg-[#292B3A] px-10 py-20">
            <h2 className="md:text-2xl text-lg mb-10 text-white">
              Personal Info
            </h2>
            <div className="space-y-10">
              <div className="">
                <p className="text-gray-300">User Name</p>
                <div className="md:flex justify-between items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      className="text-white bg-transparent border-b border-gray-400 focus:outline-none"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  ) : (
                    <p className="text-white">Name: {`${currentUser?.name}`}</p>
                  )}
                  <button
                    className="py-2 mt-3 md:mt-0 rounded-md px-4 border border-gray-400"
                    onClick={handleEditClick}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>
              </div>
              <div>
                <div>
                  <p className="text-gray-300">User Email</p>
                  <div className="md:flex justify-between">
                    <p className="text-white">
                      Email: {`${currentUser?.email}`}
                    </p>
                    <button className="py-2 mt-3 md:mt-0 rounded-md px-4 border border-gray-400">
                      Modify email addrerss
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:flex justify-between">
                <p className="text-gray-300 font-bold">Delete Account</p>
                <button className="py-2 mt-3 md:mt-0 rounded-md px-4 border border-gray-400">
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
              <p className="text-white">
                Available Credits: {currentUser?.cradit}
              </p>
              {/* <p className="text-white">Credits Used: 5</p> */}
            </div>
          </div>
        );
      case "subscription":
        return (
          <div className="text-center">
            <h2 className="text-2xl mb-4 text-white">Subscription</h2>
            <div className="bg-[#292B3A] p-4 rounded">
              <p className="text-white">Plan: {currentUser?.role}</p>
              {/* <p className="text-white">Next Billing Date: 01/01/2024</p> */}
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
        <div className="text-base text-white size-11 flex justify-center items-center rounded-full transition-all">
          <img
            src={user?.imageUrl}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="md:text-2xl text-base">{currentUser?.name}</h1>
          <p className="md:text-lg text-base">{currentUser?.email}</p>
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
