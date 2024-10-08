import react, {useEffect, useRef} from "react";
import { Line } from "react-chartjs-2";
import { FlightGraph } from "../utils/FlightGraph";
import { Chart } from 'chart.js';

function LineChart({ chartData }) {
  const chartRef = useRef(null);
  useEffect(() => {
    const canvas = chartRef.current.getContext('2d');

    const customCanvasBackgroundColor = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };

    const myChart = new Chart(canvas, {
      type: 'line',
      data: chartData,
      width: 1000,
      height:40,
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: 'white',
          },
          title: {
            display: true,
            text: "30-Day Overview of Flight Price Trends"
          },
          legend: {
            display: false
          },
        },
      },
      plugins: [customCanvasBackgroundColor],
    });
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return (
    <div className="canvas-wrapper">
      <div className="chart-container">
      <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
export default LineChart;