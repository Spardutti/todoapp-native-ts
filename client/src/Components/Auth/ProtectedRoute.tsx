import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useGetuser } from "../../api/User/get_user";
import { getUserInfo } from "../../store/Reducers/User/userReducer";
import { useAppDispatch } from "../../hooks";
import { getToken } from "../../store/Reducers/Token/tokenReducer";

export const ProtectedRoute = () => {
  const [loading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const dispatch = useAppDispatch();

  const { isLoading, data, refetch } = useGetuser(userId);

  useEffect(() => {
    const token = localStorage.getItem("todoToken");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const expiresAt = new Date(decodedToken.exp * 1000);
      if (expiresAt < new Date(Date.now())) return localStorage.clear();
      dispatch(getToken(token));
      setUserId(decodedToken.id);
      return;
    }

    setIsLoading(false);
  }, []);

  /* WAIT FOR USERID BEFORE FETCHING */
  useEffect(() => {
    userId && refetch();
  }, [userId]);

  /* WAIT FOR DATA AND SET IT TO USER */
  useEffect(() => {
    data && dispatch(getUserInfo(data.data));
  }, [data]);

  if (isLoading) return <div>Loading</div>;

  if (data) {
    return <Outlet />;
  }

  return !loading ? <Navigate to="/" /> : null;
};
