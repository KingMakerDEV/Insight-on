import React from "react";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xl">
        {children}
      </div>
    </div>
  );
};

export default Container;