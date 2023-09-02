///本Context旨在確認全域環境下資料有無變動，觸發重新渲染。
import { createContext, useState, useContext } from "react";

const defaultDataContext = {
  ///Default Context
  isDataChange: false,
};

//export 
const DataChangeContext = createContext(defaultDataContext);
export const useDataChange = () => useContext(DataChangeContext);

export function DataChangeProvider({ children }) {
  const [ isDataChange, setIsDataChange ] = useState(false);

  return (
    <DataChangeContext.Provider
      value={{
        isDataChange,
        setIsDataChange,
      }}
    >
      {children}
    </DataChangeContext.Provider>
  );
}
