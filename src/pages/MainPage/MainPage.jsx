import style from "./MainPage.module.scss";
import Navbar from "../../components/Main/Navbar/Navbar";
import TweetInput from "../../components/Main/TweetInput/TweetInput";
import TweetItem from "../../components/Main/TweetItem/TweetItem";
import MainLayout from "../../components/Main/MainLayout/MainLayout";

const tweetsList = [
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
]

function MainPage() {
    return <MainLayout>
        <Navbar title="首頁" />
        <TweetInput />
        <div className={style.tweetList}>
            {
                tweetsList.map((user) =>
                    <TweetItem user={user} />
                )
            }
        </div>
    </MainLayout>
}

export default MainPage;