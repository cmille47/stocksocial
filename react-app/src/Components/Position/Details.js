import React from "react";
import Card from "./Card";

const Details = ({ details, userDetails }) => {

    const detailsList = {
        name: "Name",
        country: "Country",
        currency: "Currency",
        exchange: "Exchange",
        ipo: "IPO Date",
        marketCapitalization: "Market Capitalization",
        finnhubIndustry: "Industry",
    };

    const userDetailsList = {
        sharesOwned: "Shares Owned",
        purchasePrice: "Purchase Price",
        datePurchased: "Date Purchased",
    };

    const convertMillionToBillion = (number) => {
        return (number / 1000).toFixed(2);
    };

    return (
        <Card>
            <div className="tw-flex tw-flex-col">
                <ul
                    className="tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-between tw-divide-y-1 tw-divide-gray-800"
                >
                    <h5> Company Information </h5>
                    {Object.keys(detailsList).map((item) => {
                        return (
                            <li key={item} className="tw-flex-1 tw-flex tw-justify-between tw-items-center">
                                <span>{detailsList[item]}</span>
                                <span className="tw-font-bold">
                                    {item === "marketCapitalization"
                                        ? `${convertMillionToBillion(details[item])}B`
                                        : details[item]}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                {userDetails && (
                    <ul
                        className="tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-between tw-divide-y-1 tw-divide-gray-800"
                    >
                        <h5> User Position Information </h5>
                        {Object.keys(userDetailsList).map((item) => {
                            return (
                                <li key={item} className="tw-flex-1 tw-flex tw-justify-between tw-items-center">
                                    <span>{userDetailsList[item]}</span>
                                    <span className="tw-font-bold">
                                        {item === "purchasePrice"
                                            ? `$${userDetails[item]}`
                                            : userDetails[item]}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </Card >
    );
};

export default Details;