import style from "./AdminTweetPage.module.scss";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import Navbar from "../../components/Main/Navbar/Navbar";
import TweetItem from "../../components/Main/TweetItem/TweetItem";
import AdminContainer from "./AdminContainer/AdminContainer";
import tweetCancelImage from "../../assets/icons/tweet/tweet_cancel.png";
import AdminTweetItem from "../../components/AdminTweetItem/AdminTweetItem.jsx";
import { useState } from "react";

function AdminUserPage() {
  const initialTweetList = [
    {
      "name": "test1",
      "account": "test1",
      "time": "3 小時",
      "replyCount": "5",
      "likeCount": "10"
    },
    {
      "name": "test2",
      "account": "test2",
      "time": "10 小時",
      "replyCount": "15",
      "likeCount": "30"
    },
    {
      "name": "test3",
      "account": "test3",
      "time": "6月23日",
      "replyCount": "100",
      "likeCount": "140"
    },
    {
      "name": "test4",
      "account": "test4",
      "time": "6月21日",
      "replyCount": "0",
      "likeCount": "1"
    },
    {
      "name": "test5",
      "account": "test5",
      "time": "6月18日",
      "replyCount": "120",
      "likeCount": "200"
    },
    {
      "name": "test6",
      "account": "test6",
      "time": "6月27日",
      "replyCount": "5",
      "likeCount": "30"
    },
    {
      "name": "test7",
      "account": "test7",
      "time": "6月24日",
      "replyCount": "5",
      "likeCount": "120"
    },
    {
      "name": "test8",
      "account": "test8",
      "time": "6月10日",
      "replyCount": "10",
      "likeCount": "110"
    },
    {
      "name": "test9",
      "account": "test9",
      "time": "6月11日",
      "replyCount": "20",
      "likeCount": "14"
    },
    {
      "name": "test10",
      "account": "test10",
      "time": "6月13日",
      "replyCount": "1",
      "likeCount": "5"
    },
  ];

  const [tweetList, setTweetList] = useState(initialTweetList);

  const handleDeleteTweet = (tweetIndex) => {
    const updatedTweetList = tweetList.filter((_, index) => index !== tweetIndex);
    setTweetList(updatedTweetList);
  };

  return (
    <MainLayout extendMainContainer={true} isAdmin={true}>
      <Navbar title="推文清單" />
      <AdminContainer>
        <div className={style.tweetList}>


          {tweetList.map((user, index) => (
            <div className={style.tweetItem} key={index}>
              <div className={style.tweetContent}>
                <TweetItem user={user} />
                <button className={style.deleteButton} onClick={() => handleDeleteTweet(index)}>
                  <img src={tweetCancelImage} alt="Delete" style={{ width: '24px', height: '24px' }} />
                </button>
              </div>
            </div>
          ))}

        </div>
      </AdminContainer>
    </MainLayout>
  );
}

export default AdminUserPage;



// import Button from "../../components/Button/Button";
// import AdminUserCard from "../../components/AdminUserCard/AdminUserCard.jsx";
// import AdminTweetItem from "../../components/AdminTweetItem/AdminTweetItem.jsx";

// export default function AdminTweetPage() {
//   return (
//     <>
//       <AdminTweetItem
//         tweetId = '1'
//         // avatar = 
//         name='John Doe'
//         account = 'heyJohn'
//         createAt = "2023-08-26T03:59:31.000Z"
//         description = 'test test'
//         // onClick = {handleDelete}

//       />
//       <AdminUserCard
//         // coverPhoto = {coverPhoto}
//         // avatar = {avatar}
//         name='John Doe'
//         account='heyJohn'
//         tweetCount='20'
//         likeCount='30'
//         followingNum='40'
//         followerNum='50'
//       />
//     </>
//   );
// }

