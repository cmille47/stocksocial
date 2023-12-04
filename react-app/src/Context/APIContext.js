// creating a context sto give every component the api flag
// this will restrict the number of api calls we make allowing
// us to stay under usage limits most of the time
import React, { createContext, useContext, useState } from 'react';

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [useAPI, setUseAPI] = useState(true); //change as needed

  return (
    <APIContext.Provider value={{ useAPI, setUseAPI }}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPIFlag = () => useContext(APIContext);