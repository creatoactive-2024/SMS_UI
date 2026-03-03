// import React, { createContext, useContext, useState } from "react";

// export const AccountContext = createContext();

// export const AccountProvider = ({ children }) => {
//   const [step1Data, setStep1Data] = useState(null);
//   const [step2Data, setStep2Data] = useState(null);

//   return (
//     <AccountContext.Provider value={{ step1Data, setStep1Data, step2Data, setStep2Data }}>
//       {children}
//     </AccountContext.Provider>
//   );
// };

// export const useAccountContext = () => useContext(AccountContext);


import React, { createContext, useContext, useState } from "react";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accData, setAccData] = useState(null);

  const [step1Data, setStep1Data] = useState(null);
  const [step2Data, setStep2Data] = useState(null);
  const [imageData, setImageData] = useState(null); // Add imageData state

  return (
    <AccountContext.Provider value={{ step1Data, setStep1Data, step2Data, setStep2Data, imageData, setImageData,accData,setAccData }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);
