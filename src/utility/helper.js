import axios from 'axios';
import Swal from 'sweetalert2';
export const baseURL = 'http://simple-twitter-api-env.eba-pzdjrmrq.ap-northeast-2.elasticbeanstalk.com/api';

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // If the token exists, bring in headers.
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export const apiHelper = axiosInstance;

// pop up notification
export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});


// get relative time
export const getRelativeTime = (createdAt) => {
  if (!createdAt) return;

  const createdTime = new Date(createdAt).getTime();
  const currentTime = new Date().getTime();
  const relativeTime = currentTime - createdTime;

  if (relativeTime < 0) {
    console.log('推文創建時間有誤');
    return;
  }

  const seconds = Math.floor(relativeTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  let formattedTimeDiff = '';
  if (years > 0) {
    return (formattedTimeDiff += years + '年前');
  } else if (months > 0) {
    return (formattedTimeDiff += months + '月前');
  } else if (days > 0) {
    return (formattedTimeDiff += days + '天前');
  } else if (hours > 0) {
    return (formattedTimeDiff += hours + '小時前');
  } else if (minutes > 0) {
    return (formattedTimeDiff += minutes + '分鐘前');
  } else {
    return (formattedTimeDiff += seconds + '秒前');
  }
};

export const getFullTime = (createdAt) => {
  if (!createdAt) return;
  const dateObj = new Date(createdAt);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  return (
    <div>
      {hour}:{minute}&#xb7;{year}年{month}月{day}日
    </div>
  );
};