// import Button from "../../components/Button/Button";
import AdminUserCard from "../../components/AdminUserCard/AdminUserCard.jsx";

export default function AdminTweetPage() {
  return (
    <>
    <AdminUserCard
      // coverPhoto = {coverPhoto}
      // avatar = {avatar}
      name = "John Doe"
      account = "heyJohn"
      tweetCount = "20"
      likeCount = "30"
      followingNum = "40"
      followerNum = "50"
    />
    </>
  );
}