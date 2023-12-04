import React, { useContext, useEffect, useState } from "react";
import Overview from "./Overview";
import Details from "./Details";
import Chart from "./Chart";
import Header from "./Header";
import { fetchStockDetails, fetchQuote } from "../../Common/Services/GetStockInfo";
import { useNavigate, useParams } from 'react-router-dom';
import { createPosition, updatePosition } from "../../Common/Services/PositionService";
import SaleButton from "./SaleButton";
import { updatePortfolio } from "../../Common/Services/PortfolioService";


const Position = () => {
  const { stockSymbol } = useParams();
  const [stockDetails, setStockDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [quote, setQuote] = useState({});
  const navigate = useNavigate();
  let position = JSON.parse(localStorage.getItem('position'));
  let portfolio = JSON.parse(localStorage.getItem('portfolio'));
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    if (!portfolio) {
      navigate('/dashboard'); // go to dashboard if no portfolio (url typed in)
    }
  }, [navigate, portfolio]);

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        let user_result = null;
        if (position) {
          user_result = {
            sharesOwned: position.Shares,
            purchasePrice: position.StartPrice,
            datePurchased: position.createdAt.slice(0, 10),
          };
        };
        setUserDetails(user_result);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  useEffect(() => {
    const updateCurrentValue = async () => {
      if (quote && position) {
        const updated_position = await updatePosition(position.objectId, [{ key: 'EndPrice', value: quote.pc }]);
        position = updated_position.toJSON();
        const curr = (position.EndPrice * position.Shares).toFixed(2);
        setCurrentValue(curr);
      };
    };
    updateCurrentValue();
  }, [quote, position]);

  const handleSale = async (inputvalue, type) => {
    if (type === 'sell') {
      const SellDate = new Date();
      const netProfit = await position.Shares * (quote.pc - position.StartPrice);
      const newCash = await portfolio.RemainingCash + quote.pc * position.Shares;

      const positionUpdates = [
        { key: 'DateSold', value: SellDate },
        { key: 'NetProfit', value: netProfit }
      ];

      const portfolioUpdates = [
        { key: 'RemainingCash', value: newCash }
      ];
      position = (await updatePosition(position.objectId, positionUpdates)).toJSON();
      portfolio = (await updatePortfolio(portfolio.objectId, portfolioUpdates)).toJSON();
      console.log(portfolio);
    }
    else if (type === 'buy') {
      const newCash = await portfolio.RemainingCash - (inputvalue * quote.pc);
      if (newCash < 0) {
        alert('Not enough funds to purchase this position.');
        return;
      }
      position = (await createPosition(portfolio.objectId, stockDetails.name, stockSymbol, inputvalue, quote.pc, quote.pc)).toJSON();
      portfolio = (await updatePortfolio(portfolio.objectId, [{ key: 'RemainingCash', value: newCash }])).toJSON();
    }
    navigate(`/portfolio/${portfolio.PortfolioName}/${portfolio.objectId}`);
    localStorage.removeItem('position');
  }

  return (
    <div
      className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand bg-gray-900 text-gray-300"
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header
          name={stockDetails.name}
          portfolioName={portfolio.PortfolioName}
          RemainingCash={portfolio.RemainingCash}
        />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          position={position}
        />
      </div>
      <div className="row-span-2">
        <Details details={stockDetails} userDetails={userDetails} />
      </div>
      <div classame="row-span-1">
        <SaleButton
          position={position}
          currentValue={currentValue}
          handleSale={handleSale}
        />
      </div>
    </div>
  );
};

export default Position;