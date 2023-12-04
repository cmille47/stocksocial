import React, { useEffect, useState } from "react";
import Overview from "./Overview";
import Details from "./Details";
import Chart from "./Chart";
import Header from "./Header";
import { fetchStockDetails, fetchQuote } from "../../Common/Services/GetStockInfo";
import { useNavigate, useParams } from 'react-router-dom';
import { createPosition, updatePosition } from "../../Common/Services/PositionService";
import SaleButton from "./SaleButton";
import { updatePortfolio } from "../../Common/Services/PortfolioService";
import Navbar from "../NavBar/NavBar";

const Position = () => {
  const { stockSymbol } = useParams();
  const [stockDetails, setStockDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [quote, setQuote] = useState({});
  const navigate = useNavigate();
  const [position, setPosition] = useState(JSON.parse(localStorage.getItem('position')));
  const [portfolio, setPortfolio] = useState(JSON.parse(localStorage.getItem('portfolio')));
  const positionExists = position ? true : false;
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    if (!portfolio) {
      navigate('/dashboard'); // go to dashboard if no portfolio (url typed in)
    }
  }, [navigate, portfolio]);

  useEffect(() => {
    if (positionExists) {
      const user_result = {
        sharesOwned: position.Shares,
        purchasePrice: position.StartPrice,
        datePurchased: position.createdAt.slice(0, 10),
      };
      setUserDetails(user_result);
    };
  }, [positionExists, position.Shares, position.StartPrice, position.createdAt]);

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
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
      if (quote && positionExists) {
        const updated_position = (await updatePosition(position.objectId, [{ key: 'EndPrice', value: quote.pc }])).toJSON();
        setPosition(updated_position);
        const curr = (updated_position.EndPrice * updated_position.Shares).toFixed(2);
        setCurrentValue(curr);
        console.log("Infinite loop 1");
      };
    };
    updateCurrentValue();
  }, [quote, positionExists, position.objectId]);

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
      const updated_position = (await updatePosition(position.objectId, positionUpdates)).toJSON();
      const updated_portfolio = (await updatePortfolio(portfolio.objectId, portfolioUpdates)).toJSON();
      setPosition(updated_position);
      setPortfolio(updated_portfolio);
    }
    else if (type === 'buy') {
      const newCash = await portfolio.RemainingCash - (inputvalue * quote.pc);
      if (newCash < 0) {
        alert('Not enough funds to purchase this position.');
        return;
      }
      const updated_position = (await createPosition(portfolio.objectId, stockDetails.name, stockSymbol, inputvalue, quote.pc, quote.pc)).toJSON();
      const updated_portfolio = (await updatePortfolio(portfolio.objectId, [{ key: 'RemainingCash', value: newCash }])).toJSON();
      setPosition(updated_position);
      setPortfolio(updated_portfolio);
    }
    navigate(`/portfolio/${portfolio.PortfolioName}/${portfolio.objectId}`);
    localStorage.removeItem('position');
  }

  return (
    <div>
      <Navbar />
      <div className="tw-h-screen tw-grid tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-grid-rows-8 md:tw-grid-rows-7 xl:tw-grid-rows-5 tw-auto-rows-fr tw-gap-6 tw-p-10 tw-font-quicksand tw-bg-gray-900 tw-text-gray-300">
        <div className="tw-col-span-1 md:tw-col-span-2 xl:tw-col-span-3 tw-row-span-1 tw-flex tw-justify-start tw-items-center">
          <Header
            name={stockDetails.name}
            portfolioName={portfolio.PortfolioName}
            RemainingCash={portfolio.RemainingCash}
          />
        </div>
        <div className="md:tw-col-span-2 tw-row-span-4">
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
        <div className="tw-row-span-2">
          <Details details={stockDetails} userDetails={userDetails} />
        </div>
        <div className="tw-row-span-1">
          <SaleButton
            position={position}
            currentValue={currentValue}
            handleSale={handleSale}
          />
        </div>
      </div>

    </div>
  );
};

export default Position;