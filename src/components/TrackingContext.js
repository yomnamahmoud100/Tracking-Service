import React, { createContext, useState } from "react";

export const TrackingContext = createContext();

export const TrackingProvider = ({ children }) => {
  const [trackingNumber, setTrackingNumber] = useState(localStorage.getItem('trackingNum'));

  const updateTrackingNumber = (newTrackingNumber) => {
    setTrackingNumber(newTrackingNumber);
    localStorage.setItem('trackingNum',newTrackingNumber)
  };

  return (
    <TrackingContext.Provider value={{ trackingNumber, updateTrackingNumber }}>
      {children}
    </TrackingContext.Provider>
  );
};
