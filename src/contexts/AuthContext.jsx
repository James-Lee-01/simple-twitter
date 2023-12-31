import * as jwt from "jsonwebtoken";
import { userLogin, adminLogin } from "../api/auth.js";
import { useState, useEffect, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

//先設定default狀態
const defaultAuthContext = {
  login: null,
  logout: null,
  currentUser: null,
  isAuthenticated: false,
  identified: false,
  role: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(false);
  const [identified, setIdentified] = useState(false);
  const [role, setRole] = useState(null);


  const { pathname } = useLocation();

  //換路由時驗證token攜帶正確與否
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("authToken");

      //確認是否有token
      //若沒有
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        setIdentified(true);
        setRole(null);
        return;
      }

      //若有，確認攜帶的token是否許可
      if (authToken) {
        const tempPayload = jwt.decode(authToken);
        //解碼token檢查
        //若不許可，返回設定值
        if (!tempPayload) {
          setIsAuthenticated(false);
          setPayload(null);
          setIdentified(true);
          setRole(null);
          return;
        }
        //若許可，認證
        if (tempPayload) {
          setIsAuthenticated(true);
          setPayload(tempPayload);
          setIdentified(true);
          setRole(tempPayload.role);
        }
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  //針對登出的狀態
  function logout() {
    //remove token
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    //reset state
    setIsAuthenticated(false);
    setPayload(null);
    setIdentified(false);
    setRole(null);
  }

  //針對登入的驗證（判斷是否為前台或後台人員）
  async function login({ account, password, role }) {
    const loginRole = role === "admin" ? adminLogin : userLogin;

    const { success, authToken } = await loginRole({
      account,
      password,
    });

    const tempPayload = jwt.decode(authToken);
    if (tempPayload) {
      setIsAuthenticated(true);
      setPayload(tempPayload);
      setIdentified(true);
      setRole(tempPayload.role);
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("userRole", tempPayload.role);
      return success;
    } else {
      setIsAuthenticated(false);
      setPayload(null);
      setIdentified(true);
      setRole(null);
    }
  }

  //畫面輸出相關
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload,
        login,
        logout,
        identified,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
