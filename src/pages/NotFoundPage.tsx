import React from "react";
import notFoundImage from "../assets/images/404.svg";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img src={notFoundImage} alt="404 Not Found" className="w-full h-full object-cover" />
    </div>
  );
};

export default NotFoundPage;
