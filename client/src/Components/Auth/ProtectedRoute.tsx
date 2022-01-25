import { useState, useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import jwt_decode from "jwt-decode";
import { useGetuser } from "../../api/User/get_user";

export const ProtectedRoute = () => {
  const { user, setUser } = useContext(userContext);
  const [loading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const { isLoading, data, refetch } = useGetuser(userId);

  useEffect(() => {
    const token = localStorage.getItem("todoToken");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      setUserId(decodedToken.id);
      return;
    }
    setIsLoading(false);
  }, [user]);

  /* WAIT FOR USERID BEFORE FETCHING */
  useEffect(() => {
    userId && refetch();
  }, [userId]);

  /* WAIT FOR DATA AND SET IT TO USER */
  useEffect(() => {
    data && setUser(data.data);
  }, [data]);

  if (isLoading) return <div>Loading</div>;

  if (data) {
    return <Outlet />;
  }

  return !loading ? <Navigate to="/" /> : null;
};
