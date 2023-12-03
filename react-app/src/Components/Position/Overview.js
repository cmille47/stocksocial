import React from "react";
import Card from "./Card";

const Overview = ({ symbol, price, change, changePercent }) => {
    return (
        <Card>
            <div className="w-full h-full flex items-center justify-around">
                <span className="text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">
                    ${symbol}
                </span>
                <span className="text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
                    ${price}
                </span>
                <span
                    className={`text-lg xl:text-xl 2xl:text-2xl ${change > 0 ? "text-lime-500" : "text-red-500"
                        }`}
                >
                    {change} <span>({changePercent}%)</span>
                </span>
            </div>
        </Card>
    );
};

export default Overview;