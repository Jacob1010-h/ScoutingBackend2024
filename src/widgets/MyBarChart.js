import React, { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function MyBarChart({ width, height, data, margin, barConfigs, teamList }) {
    const [max, setMax] = useState(0);

    const findMax = (data) => {
        return data.flat().reduce((max, obj) => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (key === "key") continue;
                    if (isNaN(obj[key])) continue;
                    if (parseFloat(obj[key]) > max) {
                        max = parseFloat(obj[key]);
                    }
                }
            }
            return max;
        }, 0);
    }

    useEffect(() => {
        let myMax;
        // find the max value in the array of objects and ignore any values that are not numbers or could be a number
        myMax = findMax(data);
        
        setMax(myMax);
    }, [data]);

    const CustomizedAxisTick = (props) => {
        const { x, y, payload } = props;
        let label = payload.value;
        if (label.length > 7) {
            // Change this value to adjust the maximum length
            label = label.slice(0, 10) + '...'; // Truncate and add ellipsis
        }

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    transform="rotate(-35)"
                >
                    {label}
                </text>
            </g>
        );
    };

    return (
        <BarChart width={width} height={height} data={data} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" tick={<CustomizedAxisTick />} />
            <YAxis domain={[0, max]} tickCount={10} tickFormatter={(value) => `${Math.min(100, ((value/max)*100)).toFixed(0)}%`}/>
            <Tooltip cursor={false} />
            <Legend verticalAlign='top' height={36} />
            {teamList.map((team, index) => {
                return (
                    <Bar
                        key={index}
                        dataKey={team}
                        fill={barConfigs[index].fill}
                        // activeBar={barConfigs[index].activeBar}
                    />
                );
            })}
        </BarChart>
    );
}

export default MyBarChart;


