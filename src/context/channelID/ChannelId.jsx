import React, { createContext, useState, useContext } from 'react';

const ChannelIdContext = createContext();

export const ChannelIdProvider = ({ children }) => {
  const [channelId, setChannelId] = useState("");

  return (
    <ChannelIdContext.Provider value={{ channelId, setChannelId }}>
      {children}
    </ChannelIdContext.Provider>
  );
};

export const useChannelId = () => useContext(ChannelIdContext);
