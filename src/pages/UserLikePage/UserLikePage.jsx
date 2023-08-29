// import style from "./UserLikePage.module.scss";
// import Navbar from "../../components/Main/Navbar/Navbar";
// import MainLayout from "../../components/Main/MainLayout/MainLayout";
// import UserInfo from "../../components/Main/Navbar/UserInfo/UserInfo";
// import CurrentUser from "../../components/Main/CurrentUser/CurrentUser";
// import TweetItem from "../../components/Main/TweetItem/TweetItem";
// import UserToggleMenu from "../../components/Main/UserToggleMenu/UserToggleMenu";
// import { useParams } from "react-router-dom";
// const userInfo = {
//   "name": "John Doe",
//   "account": "heyJohn",
//   "following": "34",
//   "follower": "59",
// }

// const tweetsList = [
//   {
//     "name": "John Doe",
//     "account": "heyJohn",
//     "time": "3 小時",
//     "replyCount": "13",
//     "likeCount": "76"
//   },
// ]

// const UserLikePage = () => {
//   const { userId } = useParams();

//   const linkList = [
//     { title: "推文", link: `/user/${userId}/tweet` },
//     { title: "推文與回覆", link: `/user/${userId}/reply` },
//     { title: "喜歡的內容", link: `/user/${userId}/like` },
//   ];

//   return <MainLayout>
//     <Navbar hasBack={true} >
//       <UserInfo />
//     </Navbar>
//     <CurrentUser user={userInfo} />
//     <UserToggleMenu linkList={linkList} />
//     <div className={style.tweetList}>
//       {
//         Array.from(Array(16)).map((_, index) => <TweetItem user={likeTweetList[0]} />)
//       }
//     </div>
//   </MainLayout>
// }

// export default UserLikePage;