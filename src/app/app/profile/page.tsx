"use client";
import { useUserContext } from "@/app/context/ContextProvider";
import axiosInstance from "@/utils/axiosInstance";
import { useClerk, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { TbLogout } from "react-icons/tb";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const { currentUser, loading, refetch } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || "");
  const { user } = useUser();
  const { signOut } = useClerk();

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

  const updateName = async (update: any) => {
    try {
      const response = await axiosInstance.put(`/api/users/update/me`, update);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error during get request:", error);
    }
  };
  const userId = user?.id;
  // const updateEmail = async () => {
  //   const update = {
  //     newEmail: "jasminchakma@gmail",
  //     userId,
  //   };
  //   try {
  //     const response = await axiosInstance.put(
  //       `/api/users/update/email`,
  //       update
  //     );
  //     console.log(response.data.data);
  //     return response.data.data;
  //   } catch (error) {
  //     console.error("Error during get request:", error);
  //   }
  // };

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
          <div className="bg-[#292B3A] px-10 md:py-20 py-10">
            <h2 className="md:text-2xl text-base font-bold mb-10 text-white">
              Personal Info
            </h2>
            <div className="space-y-10">
              <div className="">
                <p className="text-gray-300 text-sm md:text-base">User Name</p>
                <div className="md:flex justify-between items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      className="text-white bg-transparent border-b border-gray-400 focus:outline-none"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  ) : (
                    <p className="text-white text-sm md:text-base">{`${currentUser?.name}`}</p>
                  )}
                  <button
                    className="py-2 text-sm md:text-base mt-3 md:mt-0 rounded-md px-4 border border-gray-400"
                    onClick={handleEditClick}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>
              </div>
              <div>
                <div>
                  <p className="text-gray-300 text-sm md:text-base">
                    User Email
                  </p>
                  <div className="md:flex justify-between">
                    <p className="text-white text-sm md:text-base">{`${currentUser?.email}`}</p>
                    {/* <button
                      onClick={updateEmail}
                      className="py-2 mt-3 md:mt-0 rounded-md px-4 border border-gray-400"
                    >
                      Modify email addrerss
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="md:flex justify-between">
                <p className="text-gray-300 font-bold text-sm md:text-base">
                  Disable Account
                </p>
                <button className="py-2 md:text-base text-sm mt-3 md:mt-0 rounded-md px-4 border border-gray-400">
                  Apply
                </button>
              </div>
              <button
                className="flex md:text-base text-sm items-center gap-3 lg:hidden border border-gray-400 p-2 rounded-md"
                onClick={() => handleSignOut()}
              >
                <TbLogout size={25} color="white" />
                Logout
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center p-6 lg:mt-[10rem] mt-[5rem] text-white">
      <div className="flex justify-center items-center space-x-5">
        <div className="text-base text-white lg:size-14 size-11 flex justify-center items-center rounded-full transition-all">
          <div
            className="relative inline-block p-[2px] bg-gradient-to-b from-[#bb25d8] to-[#3444d8] rounded-full"
          >
            <img
              src={user?.imageUrl}
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
        </div>
        <div>
          <h1 className="md:text-xl font-bold text-sm">{currentUser?.name}</h1>
          <p className="md:text-lg text-sm">{currentUser?.email}</p>
        </div>
      </div>
      <div className="w-full mt-10">
        <div className="flex justify-center mb-4 space-x-5 border-b border-gray-600">
          <button
            className={`p-2 md:text-lg text-base font-bold ${
              activeTab === "personalInfo"
                ? "border-b-2 border-white"
                : "border-b-2 border-[#242735]"
            }`}
            onClick={() => setActiveTab("personalInfo")}
          >
            Personal Info
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
