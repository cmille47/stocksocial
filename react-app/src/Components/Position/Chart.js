import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import {
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    AreaChart,
    ReferenceArea,
    Tooltip,
} from "recharts";
import { getDailyChartData } from "../../Common/Services/GetStockInfo";
import { useParams } from "react-router-dom";
import { useAPIFlag } from '../../Context/APIContext';

const mockData = [
    { date: "2021-01-01", value: 100 },
    { date: "2021-01-02", value: 120 },
    { date: "2021-01-03", value: 130 },
    { date: "2021-01-04", value: 140 },
    { date: "2021-01-05", value: 150 },
    { date: "2021-01-06", value: 160 },
    { date: "2021-01-07", value: 170 },
    { date: "2021-01-08", value: 180 },
    { date: "2021-01-09", value: 190 },
    { date: "2021-01-10", value: 150 },
];


const Chart = () => {
    const { stockSymbol } = useParams();
    const {useAPI} = useAPIFlag();
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(mockData);
    }, [mockData]);

    // useEffect(() => {
    //     const updateChartData = async () => {
    //         try {
    //             const result = await getDailyChartData(
    //                 stockSymbol,
    //             );
    //             const extractedData = result.historical.map(item => ({
    //                 value: item.close,
    //                 date: item.date
    //             }));
    //             extractedData.reverse();
    //             setData(extractedData);
    //         } catch (error) {
    //             setData([]);
    //             console.log(error);
    //         }
    //     };
    //     if (useAPI){
        //     updateChartData();
        // };
    // }, [stockSymbol]);

    return (
        <Card>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="#312e81"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#312e81"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <Tooltip
                        contentStyle={{ backgroundColor: "#111827" }}
                        itemStyle={{ color: "#818cf8" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#312e81"
                        fill="url(#chartColor)"
                        fillOpacity={1}
                        strokeWidth={0.5}
                    />
                    <XAxis dataKey="date" />
                    <YAxis domain={["dataMin", "dataMax"]} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default Chart;

