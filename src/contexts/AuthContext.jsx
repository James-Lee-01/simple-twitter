import { createContext } from "react";
import { userLogin } from "../api/auth.js";
import * as jwt from 'jsonwebtoken'

//先設定default狀態
const defaultAuthContext = {
  login: null,
  logout: null,
  currentUser: null,
  isAuthenticated: false,
}

const AuthContext = createContext(defaultAuthContext)





export { AuthContext, AuthProvider }