import React, { useEffect, useState } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import dayjs from "dayjs";

const Charts = ({ data, title }) => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        document.querySelectorAll(".canvasjs-chart-credit").forEach(el => el.remove());
    }, [chartData]);
    

    useEffect(() => {
        if (!data) return;

        const chart = data?.map((item) => ({
            label: new Date(item.label?.slice(0, 10)).toLocaleDateString("en-US", { month: "long", day: "numeric" }),
            y: item.y,
            color: item.color
        }));

        setChartData(chart);

        setTimeout(() => {
            document.querySelectorAll(".canvasjs-chart-credit").forEach(el => el.remove());
        }, 0);

    }, [data]); 


    const styles = {
        barChartContainer: {
            display: 'flex',
            flexDirection: "column",
            justifyContent: "space-between",
            background: "white",
            padding: "16px",
            borderRadius: "20px",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
            width: "100%",
            height: '100%'
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: "bold",
            width: "100%",
            height: '20%'
        },
        title: {
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "30px",
            letterSpacing: "0%",
            textAlign: "left",
            width: "100%",
            color: "#000",
            padding: 0,
            margin: 0
        },
        legendContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "8px",
            padding: "10px"
        },
        legendItem: {
            display: "flex",
            alignItems: "center",
            gap: "10px"
        },
        legendColorBox: {
            width: "15px",
            height: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc"
        },
        legendText: {
            fontSize: "10px",
            fontWeight: "500"
        },
        chart: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            height: "auto",
            width: "100%"
        },
        modalContainer: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            borderRadius: 3,
            padding: 0,
            backgroundColor: "#FFF",
            display: "flex",
            flexDirection: "column"
        }
    };
    const minLikes = Math.min(...chartData.map((item) => item.y));
    const maxLikes = Math.max(...chartData.map((item) => item.y));
    const interval = Math.ceil((maxLikes - minLikes) / 5);
    const options = {
        zoomEnabled: true,
        axisX: {
            gridThickness: 0,
            // labelFormatter: () => "", 
            lineThickness: 0
        },
        height: 300,
        axisY: {
            // labelFormatter: () => "",
            lineThickness: 0,
            gridThickness: 0,
            minimum: minLikes * 0.9811,
            maximum: maxLikes,
            interval: 1000
        },
        subtitles: [],
        creditText: "",
        // title: { text: "Sample Chart" },
        data: [
            {
                type: "column",
                dataPoints: chartData || [],
            },
        ],
    };

    return (
        <div style={styles.barChartContainer}>
            <div style={styles.header}>
                <p style={styles.title}>{title}</p>
            </div>

            <CanvasJSChart options={options} />
            
        </div>
    );
};

export default Charts;
