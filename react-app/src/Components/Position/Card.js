import React from "react";

const Card = ({ children }) => {
  return (
    <div
    className="tw-w-full tw-h-full tw-rounded-md tw-relative tw-p-8 tw-border-2 tw-overflow-auto custom-scrollbar custom-scrollbar-dark tw-bg-gray-900 tw-border-gray-800"
    >
      {children}
    </div>
  );
};

export default Card;