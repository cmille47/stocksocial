import React from "react";

const Header = ({ name, portfolioName, RemainingCash }) => {
  return (
    <>
      <div className="xl:tw-px-32">
        <h1 className="tw-text-5xl">{name}</h1>
        <p> {portfolioName} </p>
        <p> Cash: ${RemainingCash.toFixed(2)} </p>
      </div>
    </>
  );
};

export default Header;