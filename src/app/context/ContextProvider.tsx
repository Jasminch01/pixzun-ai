// "use client"
// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
// } from "react";
// import { useUser } from "@clerk/nextjs";
// import axiosInstance from "@/utils/axiosInstance";
// import {
//   QueryObserverResult,
//   useQuery,
// } from "@tanstack/react-query";

// interface UserContextType {
//   currentUser: any;
//   loading: boolean;
//   refetch: () => Promise<QueryObserverResult>;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

// interface ContextProviderProps {
//   children: ReactNode;
// }

// export const ContextProvider: React.FC<ContextProviderProps> = ({
//   children,
// }) => {
//   const { isLoaded, user } = useUser();
//   // const [currentUser, setCurrentUser] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   //do with tanstack query
//   // useEffect(() => {
//   //   if (!isLoaded || !user) {
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   const fetchUser = async () => {
//   //     try {
//   //       const res = await axiosInstance.get(
//   //         //users
//   //         `/api/users/me?email=${user.emailAddresses[0].emailAddress}`
//   //       );
//   //       setCurrentUser(res.data.data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchUser();
//   // }, [isLoaded, user]);

//   if (!isLoaded || !user) {
//     setLoading(false);
//     return;
//   }
//   const fetchUser = async () => {
//     try {
//       const res = await axiosInstance.get(
//         //users
//         `/api/users/me?email=${user.emailAddresses[0].emailAddress}`
//       );
//       // setCurrentUser(res.data.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { data: currentUser = [], refetch } = useQuery({
//     queryFn: async () => await fetchUser(),
//     queryKey: ["user"],
//     enabled: !!isLoaded && !!user,
//   });
// console.log(currentUser)
//   return (
//     <UserContext.Provider value={{ currentUser, loading, refetch }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import axiosInstance from "@/utils/axiosInstance";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";

interface UserContextType {
  currentUser: any;
  loading: boolean;
  refetch: () => Promise<QueryObserverResult>;
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

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const { isLoaded, user } = useUser();

  const fetchUser = async () => {
    const res = await axiosInstance.get(
      `/api/users/me?email=${user?.emailAddresses[0].emailAddress}`
    );
    return res.data.data;
  };

  const {
    data: currentUser = null,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: fetchUser,
    queryKey: ["user", user?.emailAddresses[0].emailAddress],
    enabled: !!isLoaded && !!user,
  });

  // Set loading based on the query's loading state
  const loading = isLoading || !isLoaded;

  return (
    <UserContext.Provider value={{ currentUser, loading, refetch }}>
      {children}
    </UserContext.Provider>
  );
};
