import { createContext, useState, useContext } from "react";

const defaultDataStatusContext = {
  isDataUpdate: false,
};

//export useAuth
const DataStatusContext = createContext(defaultDataStatusContext);
export const useDataStatus = () => useContext(DataStatusContext);


export function DataStatusProvider({ children }) {
  const [isDataUpdate, setIsDataUpdate] = useState(false);


  return (
    <DataStatusContext.Provider
      value={{
        isDataUpdate,
        setIsDataUpdate,
      }}
    >
      {children}
    </DataStatusContext.Provider>
  );
};
