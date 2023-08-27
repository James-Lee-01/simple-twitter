import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import SettingPage from "./pages/SettingPage/SettingPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import TweetPage from "./pages/TweetPage/TweetPage.jsx";
import UserFollowerPage from "./pages/UserFollowerPage/UserFollowerPage.jsx";
import UserFollowingPage from "./pages/UserFollowingPage/UserFollowingPage.jsx";
import UserLikePage from "./pages/UserLikePage/UserLikePage.jsx";
import UserReplyPage from "./pages/UserReplyPage/UserReplyPage.jsx";
import UserTweetPage from "./pages/UserTweetPage/UserTweetPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage.jsx";
import AdminTweetPage from "./pages/AdminTweetPage/AdminTweetPage.jsx";
import AdminUserPage from "./pages/AdminUserPage/AdminUserPage.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='*' element={<HomePage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='main' element={<MainPage />} />
            <Route path='setting' element={<SettingPage />} />
            <Route path='signup' element={<SignUpPage />} />
            {/* <Route path='tweet/:tweetId' element={<TweetPage />} /> */}
            {/* <Route
              path='user/:userId/follower'
              element={<UserFollowerPage />}
            /> */}
            {/* <Route
              path='user/:userId/following'
              element={<UserFollowingPage />}
            /> */}
            {/* <Route path='user/:userId/like' element={<UserLikePage />} /> */}
            {/* <Route path='user/:userId/reply' element={<UserReplyPage />} /> */}
            {/* <Route path='user/:userId/tweet' element={<UserTweetPage />} /> */}
            <Route path='admin/login' element={<AdminLoginPage />} />
            <Route path='admin/tweet' element={<AdminTweetPage />} />
            {/* <Route path='admin/user' element={<AdminUserPage />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
