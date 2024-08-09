import React from 'react';
import LineChartComponent from './LineChartComponent';
import MapComponent from './MapComponent';

const Graphs: React.FC = () => {
    return (
        <div className="p-2 flex flex-col lg:flex-row justify-around gap-4">
            <LineChartComponent />
            <MapComponent />
        </div>
    );
};

export default Graphs;
