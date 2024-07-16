"use client";

import React, { createContext, useState, useEffect } from "react";

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch("/api/load-avatar");
        if (response.ok) {
          const data = await response.json();
          setImage(data.avatar);
        }
      } catch (error) {
        console.error("An error occurred while loading avatar:", error);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <AvatarContext.Provider value={{ image, setImage }}>
      {children}
    </AvatarContext.Provider>
  );
};
