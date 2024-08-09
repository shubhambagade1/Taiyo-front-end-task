import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';

// Fetch historical COVID-19 data from the API
const fetchHistoricalData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

const isError = (error: unknown): error is Error => error instanceof Error;

const LineChartComponent: React.FC = () => {
    // Use react-query to fetch historical data
    const { data: historicalData, error, isLoading } = useQuery('historicalData', fetchHistoricalData);

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>Error: {isError(error) ? error.message : 'An unknown error occurred'}</p>;

    // Format the data for the chart
    const formatData = () => {
        if (!historicalData) return [];
        const { cases } = historicalData;
        return Object.keys(cases).map(date => ({
            date,
            cases: cases[date]
        }));
    };

    // format of Y axis 
    const formatYAxis = (tick: number) => {
        if (tick >= 1000000) {
            return `${(tick / 1000000).toFixed(1)}M`;
        } else if (tick >= 1000) {
            return `${(tick / 1000).toFixed(1)}K`;
        } else {
            return tick.toString();
        }
    };

    return (
        <div className="lg:w-5/12">
            <h2 className="font-bold text-blue-600 mb-6 text-lg">Case Fluctuations</h2>
            <div className="w-full h-80 sm:h-96 lg:h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={formatYAxis} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cases" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartComponent;
