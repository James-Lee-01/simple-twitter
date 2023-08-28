//本頁目的是導向用途，非指定路由外重新導回登入頁
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate()
    useEffect(() => {
      //導向登入頁
        navigate('/login');
    }, [navigate]);
}