import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
);


const ProgressChart = ({ dates, percentages }) => {
    const labels = dates;

    const data = {
        labels,
        datasets: [
            {
                label: 'Percentages',
                data: percentages,
                backgroundColor: 'black',
                borderColor: 'black',
            },
        ],
    };

    const options={
        borderWidth: 1,
        responsive: true,
      scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value) {
                        return value + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'Percentages',
                    align: 'center',
                    color: 'black'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Dates',
                    align: 'center',
                    color: 'black'
                }
            }
        },
    }

    return (
        <div style={{ 
            height: '80vh', 
            width: '80vw', 
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        }}>
           <Line options={options} data={data} />
        </div>
    );
};

export default ProgressChart;
