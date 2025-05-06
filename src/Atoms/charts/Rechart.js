import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from 'chartjs-plugin-annotation';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin,
    annotationPlugin
);

const ZoomableBarChart = ({ isPopup = false, title,
    xtitle,
    ytitle,
    hashselDates,
    minIndex, maxIndex, datasets, labelData, disablezoom = false }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isZoomed, setIsZoomed] = useState(false);
    const [clickedDate, setClickedDate] = useState("");
    const chartRef = useRef(null);
    const prevZoomState = useRef(null);
    useEffect(() => {
        if (chartRef.current) {
            prevZoomState.current = chartRef.current.chartInstance?.getZoomLevel?.();
        }
    }, [datasets, labelData]);

    useEffect(() => {
        if (chartRef.current && prevZoomState.current) {
            chartRef.current.chartInstance?.zoom?.(prevZoomState.current);
        }
    }, [datasets, labelData]);


    useEffect(() => {
        if (labelData?.length > 0 && datasets?.length > 0) {
            setIsLoading(false);
        }
    }, [labelData, datasets]);

    const highlightIndexes = useMemo(() => {
        if (!Array.isArray(hashselDates) || !Array.isArray(labelData)) return [];

        return labelData
            .map((date, index) =>
                hashselDates.some(highlightDate =>
                    typeof date === "string" && typeof highlightDate?.taken_at === "string"
                        ? date.trim() === (highlightDate?.taken_at).trim()
                        : date === highlightDate?.taken_at
                ) ? index : -1
            )
            .filter(index => index !== -1);


    }, [hashselDates, labelData]);
    const safeMinIndex = Math.max(0, minIndex);
    const safeMaxIndex = Math.min(labelData.length - 1, maxIndex + 1);

    const chartData = useMemo(() => {
        if (!labelData || !datasets || datasets.length === 0 || minIndex === null || maxIndex === null) return null;

        const safeMinIndex = Math.max(0, minIndex);
        const safeMaxIndex = Math.min(labelData.length - 1, maxIndex + 1);

        return {
            labels: labelData.slice(safeMinIndex, safeMaxIndex + 1)?.map(date =>
                new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "2-digit"
                })
            ),
            datasets: datasets.map(dataset => ({
                data: dataset?.data?.slice(safeMinIndex, safeMaxIndex + 1),
                backgroundColor: dataset?.backgroundColor?.slice(safeMinIndex, safeMaxIndex + 1),
            }))
        };
    }, [labelData, datasets, minIndex, maxIndex]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        onHover: (event, elements, chart) => {
            const xScale = chart.scales['x'];
            const xValue = xScale.getValueForPixel(event.x);
            const index = Math.round(xValue);

            const match = hashselDates?.find((item) => {
                const targetDate = item?.taken_at?.split("T")[0];
                const itemDate = labelData?.slice(safeMinIndex, safeMaxIndex + 1)?.[index]?.split("T")[0];
                return targetDate === itemDate;
            });

            if (match) {
                setClickedDate(match?.taken_at)
                console.log('Clicked Annotation Date:', match?.taken_at);
            } else {
                setClickedDate("")
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: true
        },
        plugins: {
            legend: { display: false },
            zoom: {
                pan: {
                    enabled: disablezoom,
                    mode: 'x',
                    rangeMin: {
                        x: 0
                    },
                    rangeMax: {
                        x: labelData.length - 1
                    }
                },
                zoom: {
                    wheel: {
                        enabled: disablezoom,
                        speed: 0.1
                    },
                    pinch: {
                        enabled: disablezoom
                    },
                    mode: 'x',
                    limits: {
                        x: { min: 0, max: labelData.length - 1 }
                    }
                }
            },

            annotation: {

                annotations: labelData?.slice(safeMinIndex, safeMaxIndex + 1)?.reduce((acc, item, index) => {
                    const itemDate = item?.split("T")[0];
                    const colorPalette = ['green', 'blue', 'orange', 'purple', 'teal'];

                    let overlapCount = 0;
                    const matchingItems = hashselDates?.filter(d => d?.taken_at?.split("T")[0] === itemDate);

                    if (!matchingItems?.length) return acc;

                    const total = matchingItems.length;
                    const spacing = 0.08;
                    hashselDates?.forEach((hashItem, matchIndex) => {
                        const targetDate = hashItem?.taken_at?.split("T")[0];

                        if (itemDate === targetDate) {
                            const existingAtX = acc.filter(a => a.xValue === index).length;
                            overlapCount = existingAtX;

                            const baseValue = datasets[0]?.data?.[index] ?? 0;
                            const offset = overlapCount * 6;
                            const yValue = baseValue;
                            // const xOffset = existingAtX * 0.1;
                            const color = colorPalette[matchIndex % colorPalette.length];
                            const mid = (total - 1) / 2;
                            const xOffset = (matchIndex - mid) * spacing;

                            acc.push({
                                type: 'point',
                                xValue: index + xOffset,
                                yValue: parseFloat(yValue || ''),
                                backgroundColor: color,
                                radius: 4,
                                borderWidth: 1,
                                zIndex: 999,
                                label: {
                                    enabled: true,
                                    content: [
                                        hashItem?.id ? `id: ${hashItem?.id}` : null,
                                        hashItem?.type ? `type: ${hashItem?.type}` : null,
                                        hashItem?.tag ? `tag: ${hashItem?.tag}` : null
                                    ].filter(Boolean).join(' || '),
                                    display: true,
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    color,
                                    font: { size: 12 },
                                    position: 'center',
                                    padding: { top: 6, right: 6, bottom: 6, left: 6 }
                                },
                                tooltip: {
                                    enabled: true,
                                    display: true,
                                    content: [
                                        hashItem?.id ? `id: ${hashItem?.id}` : null,
                                        hashItem?.type ? `type: ${hashItem?.type}` : null,
                                        hashItem?.tag ? `tag: ${hashItem?.tag}` : null
                                    ].filter(Boolean).join(' || ') || "Pavan",
                                }
                            });
                        }
                    });

                    return acc;
                }, [])

            }

        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                title: xtitle

            },
            y: {
                stacked: true,
                grid: { display: false },
                title: ytitle,
                ticks: {
                    callback: function (value) {

                        if (value >= 1_000_000_000) {
                            return (value / 1_000_000_000).toFixed(1) + 'B';
                        }
                        if (value >= 1_000_000) {
                            return (value / 1_000_000).toFixed(1) + 'M';
                        }
                        if (value >= 1_000) {
                            return (value / 1_000).toFixed(1) + 'K';
                        }
                        return value;
                    }
                }
            }
        }
    }), [highlightIndexes, datasets, labelData]);

    const resetZoom = () => {
        if (chartRef.current) {
            chartRef.current.resetZoom();
            setIsZoomed(false);
        }
    };

    const increaseZoom = () => {
        if (chartRef.current) {
            const chartInstance = chartRef.current;
            const scaleFactor = 1.5;

            chartRef.current.zoom(1.2);
            setIsZoomed(true);
        }
    };

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = chartRef.current;
            const { min, max } = chartInstance.scales.x;

            if (Math.abs(max - min) < 2) {
                setIsZoomed(false);
            } else {
                setIsZoomed(true);
            }
        }
    }, [chartRef]);


    if (isLoading || !chartData) {
        return <div style={{ textAlign: "center", padding: "20px", fontSize: "14px", fontWeight: "bold", color: "#555" }}>Loading chart...</div>;
    }

    const groupedByDate = hashselDates.reduce((acc, item) => {
        const date = item?.taken_at?.split("T")[0];
        if (date) {
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
        }
        return acc;
    }, {});

    return (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: "space-between",
            background: "white",
            padding: "16px",
            borderRadius: "5px",
            boxShadow: isPopup ? "0px 0px 0px transparent" : "0px 0px 28px 0px #00000014",
            width: "100%",
            height: '100%',
            gap: '2px'
        }}>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", fontSize: "16px", fontWeight: "bold", width: "100%", height: '20%', gap: '20px' }}>
                <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, lineHeight: "30px", textAlign: "left", color: "#000", padding: 0, margin: 0 }}>{title}</p>
                {/* <button style={{ ...styles.button(isZoomed), border: '0px solid transparent' }} onClick={increaseZoom} disabled={isZoomed}>
                    <ZoomOutMapIcon sx={{ width: '18px', height: '18px' }} />
                </button>

                <button style={{ ...styles.button(!isZoomed), border: '0px solid transparent' }} onClick={resetZoom} disabled={!isZoomed}>
                    <ZoomInMapIcon sx={{ width: '18px', height: '18px' }} />
                </button> */}

            </div>

            {(hashselDates && hashselDates.length > 0) ? (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        overflowX: 'auto', 
                        scrollbarWidth: "none",
                        fontSize: '12px',
                        gap: '5px',
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        fontFamily: "OpenSans",
                        textTransform: "capitalize",
                        position: 'relative',
                        height: "50px", 
                        whiteSpace: 'nowrap' 
                    }}
                >
                    {Object.entries(groupedByDate).map(([date, items], idx) => {
                        const isClicked = clickedDate.split("T")[0] === date.split("T")[0];

                        return (
                            <div key={idx} style={{
                                display: 'flex',
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                whiteSpace: 'nowrap'
                            }}>
                                {isClicked && items.map((item, index) => (
                                    <div key={index} style={{
                                        fontSize: '12px',
                                        background: '#f9f9f9',
                                        border: '1px solid #ddd',
                                        borderRadius: '6px',
                                        minWidth: '400px', 
                                        padding: '2px',
                                        marginRight: '8px',
                                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                                        whiteSpace: 'normal'
                                    }}>
                                        {[
                                            item.caption && `Caption: ${item.caption}`,
                                            item.type && `Type: ${item.type}`,
                                            item.tag && `Tag: ${item.tag}`
                                        ].filter(Boolean).join(', ')}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>

            ) : (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        overflow: 'scroll',
                        scrollbarWidth: "none",
                        fontSize: '12px',
                        gap: '5px',
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        fontFamily: "OpenSans",
                        textTransform: "capitalize",
                        position: 'relative',
                        height: "40px"
                    }}
                >
                </div>
            )}



            {(!(!labelData || !datasets || datasets.length === 0)) ? (
                <Bar ref={chartRef} data={chartData} options={chartOptions} width={800} height={400} />
            ) : (
                <div style={{ width: '100%', height: "100%", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    NO DATA AVAILABLE
                </div>
            )}
        </div>
    );
};

// export default ZoomableBarChart;

export default React.memo(ZoomableBarChart, (prevProps, nextProps) => {
    return (
        JSON.stringify(prevProps.datasets) === JSON.stringify(nextProps.datasets) &&
        JSON.stringify(prevProps.labelData) === JSON.stringify(nextProps.labelData) &&
        prevProps.minIndex === nextProps.minIndex &&
        prevProps.maxIndex === nextProps.maxIndex
    );
});

