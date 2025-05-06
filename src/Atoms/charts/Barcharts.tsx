import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import ZupotsuDatePicker from "../zupotsu-date-picker/zupotsu-date-picker";
import { Modal } from "@mui/material";
import ChartBox from "./ChartBox";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const BarCharts = ({ title, labelData, color, datasets, selectRange }: any) => {
    const legendData = [
        { type: "Pre Campaign Period", color: "#fd7e14" },
        { type: "Campaign Period", color: "#20c997" },
        { type: "Post Campaign Period", color: "#0dcaf0" },
    ];

    const [open, setOpen] = useState(false);
    const [selectBarRange, setSelectBarRange] = useState<[string, string] | []>([]);

    const dates = labelData.map((ts: string) => ts?.split("T")[0]);

    const datasetColors = new Set(datasets?.flatMap((dataset: any) => dataset.backgroundColor) || []);
    const filteredLegendData = legendData?.filter(({ color }) => datasetColors.has(color));
    useEffect(() => {
        let fromDate: any = labelData[0] ? dayjs(labelData[0]).tz("Asia/Kolkata") : null;
        let toDate: any = labelData[labelData?.length - 1] ? dayjs(labelData[labelData?.length - 1]).tz("Asia/Kolkata") : null;
        setSelectBarRange([fromDate, toDate])
    }, [])
    const getMinMaxIndexes = (datesArray: string[], startDate: string, endDate: string) => {
        if (datesArray.length === 0) return { minIndex: null, maxIndex: null };
    
        const sortedDates = datesArray?.map((date, index) => ({ date, index })).sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
    
        // Find the closest minIndex (first date that is >= startDate)
        let minIndex = sortedDates?.find(({ date }) => dayjs(date).isSameOrAfter(dayjs(startDate)))?.index ?? 0;
    
        // Find the closest maxIndex (last date that is <= endDate)
        let maxIndex = sortedDates?.reverse().find(({ date }) => dayjs(date).isSameOrBefore(dayjs(endDate)))?.index ?? datesArray.length - 1;
    
        return { minIndex, maxIndex };
    };
    

    const startDate = selectBarRange[0] ? dayjs(selectBarRange[0]).format("YYYY-MM-DD") : null;
    const endDate = selectBarRange[1] ? dayjs(selectBarRange[1]).format("YYYY-MM-DD") : null;

    const { minIndex, maxIndex } = startDate && endDate ? getMinMaxIndexes(dates, startDate, endDate) : { minIndex: 0, maxIndex: dates?.length };

    return (
        <div style={styles.barChartContainer}>
            <div style={styles.header}>
                <p style={styles.title}>{title}</p>
            </div>

            <ZupotsuDatePicker
                value={selectBarRange}
                name="Bar range"
                handleDateSelection={(e) => setSelectBarRange(e.target.value)}
            />

            <div style={styles.legendContainer}>
                {filteredLegendData?.map(({ type, color }) => (
                    <div key={type} style={styles.legendItem}>
                        <div style={{ ...styles.legendColorBox, backgroundColor: color }}></div>
                        <span style={styles.legendText}>{type}</span>
                    </div>
                ))}
            </div>

            {datasets && minIndex !== null && maxIndex !== null && (
                <div style={styles.chart}>
                    <ChartBox
                        labels={dates?.slice(minIndex, maxIndex + 1)}
                        startDate={startDate}
                        endDate={endDate}
                        datasets={datasets?.slice(minIndex, maxIndex + 1)}
                    />
                </div>
            )}

            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={styles.modalContainer}>
                    <ZupotsuDatePicker
                        label="Bar range"
                        value={selectBarRange}
                        name="Bar range"
                        handleDateSelection={(e) => setSelectBarRange(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default BarCharts;

const styles: Record<string, React.CSSProperties> = {
    barChartContainer: {
        background: "white",
        padding: "16px",
        borderRadius: "20px",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
        width: "100%",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: "bold",
        width: "100%"
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
