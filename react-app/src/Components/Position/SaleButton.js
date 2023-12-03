import React, {useState} from "react";
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
        <Card>
            <div className="w-full h-full flex items-center justify-around">
                {showInput ? (
                    <div>
                        <form className="max-w-sm mx-auto">
                            <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Desired Shares:</label>
                            <input 
                                id="desiredShares"
                                type="number" 
                                aria-describedby="helper-text-explanation" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={input}
                                onChange={handleInputChange}
                            />
                        </form>
                        <button onClick={() => handleSale(input, 'buy')} style={{marginRight: '5px'}}>
                             Confirm Purchase? 
                        </button>
                        <button onClick={() => setShowInput(false)}> Cancel </button>
                    </div>
                ) : (
                    <button onClick={RevealBuy}>
                        Open New Position
                    </button>
                )}
                {position && (
                    <div>
                        <button onClick={confirmSale}>
                            Sell Current Position for ${currentValue}
                        </button>
                        {showSaleConfirm && (
                            <div>
                                <button onClick={() => handleSale(null, 'sell')} style={{marginRight: '5px'}}>
                                    Confirm Sale?
                                </button>
                                <button onClick={() => setShowSaleConfirm(false)}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default SaleButton;
