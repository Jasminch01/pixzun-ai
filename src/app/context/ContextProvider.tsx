"use client"
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import axiosInstance from "@/utils/axiosInstance";

interface UserContextType {
  currentUser: any;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const { isLoaded, user } = useUser();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoaded || !user) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(
          //users
          `/api/users/me?email=${user.emailAddresses[0].emailAddress}`,
        );
        setCurrentUser(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isLoaded, user]);

  return (
    <UserContext.Provider value={{ currentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
