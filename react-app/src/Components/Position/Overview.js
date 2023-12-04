import React from "react";
import Card from "./Card";

const Overview = ({ symbol, price, change, changePercent }) => {
    return (
        <Card>
            <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-around">
                <span className="tw-text-neutral-400 tw-text-lg xl:tw-text-xl 2xl:tw-text-2xl">
                    ${symbol}
                </span>
                <span className="tw-text-2xl xl:tw-text-4xl 2xl:tw-text-5xl tw-flex tw-items-center">
                    ${price}
                </span>
                <span
                    className={`tw-text-lg xl:tw-text-xl 2xl:tw-text-2xl ${change > 0 ? "tw-text-lime-500" : "tw-text-red-500"
                        }`}
                >
                    {change} <span>({changePercent}%)</span>
                </span>
            </div>
        </Card>
    );
};

export default Overview;