// import Button from "../../components/Button/Button";
import AdminUserCard from "../../components/AdminUserCard/AdminUserCard.jsx";
import AdminTweetItem from "../../components/AdminTweetItem/AdminTweetItem.jsx";

export default function AdminTweetPage() {
  return (
    <>
      <AdminTweetItem
        tweetId = '1'
        // avatar = 
        name='John Doe'
        account = 'heyJohn'
        createAt = "2023-08-26T03:59:31.000Z"
        description = 'test test'
        // onClick = {handleDelete}

      />
      <AdminUserCard
        // coverPhoto = {coverPhoto}
        // avatar = {avatar}
        name='John Doe'
        account='heyJohn'
        tweetCount='20'
        likeCount='30'
        followingNum='40'
        followerNum='50'
      />
    </>
  );
}