import React from "react";
import "./index.css"; // 애니메이션 CSS가 포함된 파일을 가져옵니다.

const LoadingAnimationTest: React.FC = () => {
  return (
    <div
      className="eclipse"
      style={{
        backgroundColor: "var(--bg)",
        "--bg": "#FFFFFF",
        "--primary": "#000000",
      }}
    ></div>
  );
};

export default LoadingAnimationTest;
