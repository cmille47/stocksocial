import React, { useContext, useEffect, useState } from "react";
import Overview from "./Overview";
import Details from "./Details";
import Chart from "./Chart";
import Header from "./Header";
import { fetchStockDetails, fetchQuote } from "../../Common/Services/GetStockInfo";
import {useNavigate, useParams} from 'react-router-dom';

const Position2 = () => {
  const { stockSymbol } = useParams();
  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});
  const navigate = useNavigate();
  const position = JSON.parse(localStorage.getItem('position'));
  const portfolio = JSON.parse(localStorage.getItem('portfolio'));

  useEffect(() => {
    if (!portfolio){
      navigate('/dashboard'); // go to dashboard if no portfolio (hard coded in)
    }
  }, [navigate, portfolio]);

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

  return (
    <div
      className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand bg-gray-900 text-gray-300"
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails.name} />
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
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
      {/* <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div> */}
    </div>
  );
};

export default Position2;