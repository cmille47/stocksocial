import React, { useState } from "react";
import Card from "./Card";

const SaleButton = ({ position, currentValue, handleSale }) => {
    const [showInput, setShowInput] = useState(false);
    const [input, setInput] = useState(0);
    const [showSaleConfirm, setShowSaleConfirm] = useState(false);

    // reveal hidden fields
    const RevealBuy = () => {
        setShowInput(true);
    };

    const confirmSale = () => {
        setShowSaleConfirm(true);
    };

    // tracks input field
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <Card><div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-around">
            {showInput ? (
                <div>
                    <form className="tw-max-w-sm tw-mx-auto">
                        <label htmlFor="desiredShares" className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Number of Desired Shares:</label>
                        <input
                            id="desiredShares"
                            type="number"
                            aria-describedby="helper-text-explanation"
                            className="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 tw-focus:tw-border-blue-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </form>
                    <button onClick={() => handleSale(input, 'buy')} style={{ marginRight: '5px' }}>
                        Confirm Purchase?
                    </button>
                    <button onClick={() => setShowInput(false)}>Cancel</button>
                </div>
            ) : (
                <button onClick={RevealBuy}>Open New Position</button>
            )}
            {position && (
                <div>
                    <button onClick={confirmSale}>
                        Sell Current Position for ${currentValue}
                    </button>
                    {showSaleConfirm && (
                        <div>
                            <button onClick={() => handleSale(null, 'sell')} style={{ marginRight: '5px' }}>
                                Confirm Sale?
                            </button>
                            <button onClick={() => setShowSaleConfirm(false)}>Cancel</button>
                        </div>
                    )}
                </div>
            )}
        </div>

        </Card>
    );
};

export default SaleButton;
