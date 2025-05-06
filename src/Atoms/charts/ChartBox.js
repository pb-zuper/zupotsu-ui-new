import React, { useEffect, useRef } from "react";

const ChartBox = ({ labels,
  startDate,
  endDate,
  datasets }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const loadChart = () => {
      if (!window.Chart || !chartRef.current) return; // Ensure Chart.js is loaded and ref exists

      const ctx = chartRef.current.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context!");
        return;
      }

      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Function to generate a random color (if needed)
      const getRandomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      };

      // Assign unique colors to each dataset
      const assignedColors = new Set(); // Track used colors
      const updatedDatasets = datasets?.map((dataset) => {
        let color = dataset.backgroundColor || getRandomColor();
        // Ensure color uniqueness
        while (assignedColors.has(color)) {
          color = getRandomColor();
        }
        assignedColors.add(color);

        return {
          ...dataset,
          // label: "",
          backgroundColor: color,
          borderColor: color,
          borderWidth: dataset.borderWidth || 1,
        };
      });

      chartInstance.current = new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: updatedDatasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          tooltips: { enabled: false },
          scales: {
            xAxes: [
              {
                gridLines: { display: false },
              },
            ],
            yAxes: [
              {
                gridLines: { display: false },
              },
            ],
          },
        },
      });
    };

    // Load Chart.js dynamically
    if (!window.Chart) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"; // Updated version
      script.async = true;
      script.onload = loadChart;

      document.body.appendChild(script);

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        document.body.removeChild(script);
      };
    } else {
      loadChart();
    }
  }, [labels, datasets]);

  return (
    <div style={{ width: "100%", maxWidth: "600px", height: "250px" }}>

      <canvas ref={chartRef} ></canvas>
    </div>
  );
};

export default ChartBox;
