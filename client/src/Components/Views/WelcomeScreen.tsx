import React from "react";
import Welcome from "../WelcomeScreen/Welcome";

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  return (
    <div>
      <Welcome />
    </div>
  );
};

export default WelcomeScreen;
