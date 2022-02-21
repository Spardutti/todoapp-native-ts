import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserHome } from "../User/UserHome";

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("todoToken");
    if (token) navigate("/home");
  }, [navigate]);

  return (
    <div>
      <p>welcome</p>
      <Button onClick={() => setShowLogin(true)}> Get started</Button>
      {showLogin && <UserHome />}
    </div>
  );
};

export default WelcomeScreen;
