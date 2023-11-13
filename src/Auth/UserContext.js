// // UserContext.js
// import { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState();



//   // Assuming user.isAdmin is a boolean indicating admin status
//   const isAdmin = user?.isAdmin || false;

//   const enhancedSetUser = (newUser) => {
//     // Merge existing user properties with new user properties
//     setUser({
//       ...user,
//       ...newUser,
//       isAdmin,
//     });
//   };

//   return <UserContext.Provider value={{ user, setUser: enhancedSetUser }}>{children}</UserContext.Provider>;
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };

// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  // Fetch user details from local storage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
