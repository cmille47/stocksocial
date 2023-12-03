import React from "react";

const Header = ({ name, portfolioName, RemainingCash }) => {
  return (
    <>
      <div className="xl:px-32">
        <h1 className="text-5xl">{name}</h1>
        <p> {portfolioName} </p>
        <p> Cash: ${RemainingCash} </p>
      </div>
    </>
  );
};

export default Header;