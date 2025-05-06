import React, { useEffect, useMemo, useState } from 'react'
import useDeviceType from '../../utils/DeviceType'
import { Box, Modal } from '@mui/material'
import { Close } from '@mui/icons-material'
import ZoomableBarChart from '../../Atoms/charts/Rechart'
import ZupotsuDatePicker from '../../Atoms/zupotsu-date-picker/zupotsu-date-picker'
import dayjs from 'dayjs'
import ReorderableReusableTable from '../table-management/ReorderablereusableTable'
import NoData from '../../error/NoData'
import { NoDataImage } from '../../assets'
import Apis from '../../services/apis'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useSearchParams } from 'react-router-dom'
const BrandInsights = ({
    selectedPostDetail,
    brandDates,
    brandColors,
    brandLikess,
    brandComments,
    brandShares,
    brandPosts,
    brandView,
    brandFollowers,
    brandFollowing,
    brandbasicEngagementRate,
    brandimpressionEngagementRate,
    brandweightedEngagementRate,
    openChartPopup,
    setOpenChartPopup,
    postselDates,
    chartname,
    minDat,
    maxDat,
    allbrandInsightsData,
    multiGraphData,
    selectedPost,
    selectedIndex,
    brandInsightsposts,
    handleDownloadPDF
}: any) => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [loader, setLoader] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const apis = new Apis();
    const deviceType = useDeviceType()
    const [selectBarRange, setSelectBarRange] = useState<[any, any] | []>((minDat && maxDat) ? [minDat, maxDat] : []);
    // useEffect(() => {
    //     if (minDat && maxDat) {
    //         setSelectBarRange([minDat, maxDat])
    //     }
    // }, [minDat, maxDat])
    const getTypeColor = (type: string) => {
        switch (type) {
            case "campaign-period":
                // return "#20c997";
                return "rgba(226, 11, 24, 1)";
            case "post-campaign-period":
                // return "#0dcaf0";
                return "rgba(226, 11, 24, 0.6)";
            case "pre-campaign-period":
                // return "#fd7e14";
                return "rgba(128,128,128,0.4)";
            default:
                return "rgba(147, 145, 145, 0.1)";
        }
    };
    const ErrorData = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message: "No Stats listed"
        }),
        []
    )
    brandColors = brandColors.map((type: any) => getTypeColor(type));
    const spanStyle: any = {
        fontFamily: "Inter",
        fontWeight: 800,
        fontSize: "17px",
        lineHeight: "30px",
        letterSpacing: "0%",
        textAlign: "center",
    }

    const avglikesdatasets = [
        {
            data: brandLikess,
            backgroundColor: brandColors || "red",
        },
    ]
    const avgcommentsdatasets = [
        {
            data: brandComments,
            backgroundColor: brandColors || "red",
        },
    ]

    const avgviewdatasets = [
        {
            data: brandView,
            backgroundColor: brandColors || "red",
        },
    ]
    const avgsharesdatasets = [
        {
            data: brandShares,
            backgroundColor: brandColors || "red",
        },
    ]

    const brandpostdatasets = [
        {
            data: brandPosts,
            backgroundColor: brandColors || "red",
        },
    ]

    const avgfollowersatasets = [
        {
            data: brandFollowers,
            backgroundColor: brandColors || "red",
        },
    ]
    const avgfollowingdatasets = [
        {
            data: brandFollowing,
            backgroundColor: brandColors || "red",
        },
    ]

    const brandbasicEngagementRatedatasets = [
        {
            data: brandbasicEngagementRate,
            backgroundColor: brandColors || "red",
        },
    ]

    const brandimpressionEngagementRatedatasets = [
        {
            data: brandimpressionEngagementRate,
            backgroundColor: brandColors || "red",
        },
    ]
    const brandweightedEngagementRatedatasets = [
        {
            data: brandweightedEngagementRate,
            backgroundColor: brandColors || "red",
        },
    ]

    const chartData = [
        { dataset: avglikesdatasets, title: "Average Likes", xtitle: "Dates", ytitle: "" },
        { dataset: avgcommentsdatasets, title: "Average Comments", xtitle: "Dates", ytitle: "" },
        { dataset: avgsharesdatasets, title: "Average Shares", xtitle: "Dates", ytitle: "" },
        { dataset: avgviewdatasets, title: "Average Views", xtitle: "Dates", ytitle: "" },
        { dataset: avgfollowersatasets, title: "Followers", xtitle: "Dates", ytitle: "" },
        { dataset: avgfollowingdatasets, title: "Following", xtitle: "Dates", ytitle: "" },
        { dataset: brandpostdatasets, title: "Posts", xtitle: "Dates", ytitle: "" },
        { dataset: brandbasicEngagementRatedatasets, title: "Basic Engagement Rate", xtitle: "Dates", ytitle: "Percentage %" },
        { dataset: brandimpressionEngagementRatedatasets, title: "Impression Engagement Rate", xtitle: "Dates", ytitle: "Percentage %" },
        { dataset: brandweightedEngagementRatedatasets, title: "Weighted Engagement Rate", xtitle: "Dates", ytitle: "Percentage %" }
    ];

    const chartData1 = [
        { dataset: [{ data: brandLikess, backgroundColor: brandColors || "red", }], title: "Average Likes", name: "BIALC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: brandComments, backgroundColor: brandColors || "red", }], title: "Average Comments", name: "BIACC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: brandShares, backgroundColor: brandColors || "red", }], title: "Average Shares", name: "BIASC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: brandView, backgroundColor: brandColors || "red", }], title: "Average Views", name: "BIAVC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: brandFollowers, backgroundColor: brandColors || "red", }], title: "Followers", name: "BIFC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: brandFollowing, backgroundColor: brandColors || "red", }], title: "Following", name: "BIFGC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: brandPosts, backgroundColor: brandColors || "red", }], title: "Posts", name: "BIPC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: brandbasicEngagementRate, backgroundColor: brandColors || "red", }], title: "Basic Engagement Rate", name: "BIBER", xtitle: "Dates", ytitle: "Percentage %" },
        { dataset: [{ data: brandimpressionEngagementRate, backgroundColor: brandColors || "red", }], title: "Impression Engagement Rate", name: "BIIER", xtitle: "Dates", ytitle: "Percentage %" },
        { dataset: [{ data: brandweightedEngagementRate, backgroundColor: brandColors || "red", }], title: "Weighted Engagement Rate", name: "BIWER", xtitle: "Dates", ytitle: "Percentage %" }
    ];

    const selectedChart = chartData1.find(chart => chart.name === chartname);

    const legendData = [
        // { type: "Pre Campaign Period", color: "#fd7e14" },
        // { type: "Campaign Period", color: "#20c997" },
        // { type: "Post Campaign Period", color: "#0dcaf0" },
        { type: "Pre Campaign Period", color: "rgba(128,128,128,0.4)" },
        { type: "Campaign Period", color: "rgba(226, 11, 24, 1)" },
        { type: "Post Campaign Period", color: "rgba(226, 11, 24, 0.6)" },
        { type: "Un Categorized", color: "rgba(147, 145, 145, 0.1)" }
    ];



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
            width: '100%',
            justifyContent: "flex-start",
            gap: "8px",
            padding: "10px",
            backgroundColor: "#FFF"
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
            fontSize: "14px",
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



    const getMinMaxIndexes = (datesArray: string[], startDate: string, endDate: string) => {
        if (datesArray?.length === 0) return { minIndex: null, maxIndex: null };

        const sortedDates = datesArray?.map((date, index) => ({ date, index })).sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

        let minIndex = sortedDates?.find(({ date }) => dayjs(date).isSameOrAfter(dayjs(startDate)))?.index ?? 0;

        let maxIndex = sortedDates?.reverse().find(({ date }) => dayjs(date).isSameOrBefore(dayjs(endDate)))?.index ?? datesArray?.length;

        return { minIndex, maxIndex };
    };



    const startDate = selectBarRange[0] ? selectBarRange[0] : null;
    const endDate = selectBarRange[1] ? selectBarRange[1] : null;
    const { minIndex, maxIndex }: any = startDate && endDate ? getMinMaxIndexes(brandDates, startDate, endDate) : { minIndex: 0, maxIndex: brandDates?.length };

    const headers = ['Date', 'Asset/Brand', 'Type', 'Avg Likes', 'Avg Comments', "Avg Shares", "Avg Views", "Followers", "Following", "Basic Engagement Rate", "Impression Engagement Rate", "Weighted Engagement Rate"];
    const [tableData, setTableData] = useState(allbrandInsightsData || []);
    const stylep: any = {
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "21px",
        padding: 0,
        margin: 0,
        textAlign: "left",
        whiteSpace: 'wrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
    }
    const cellstyle = { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
    const columns: any = [
        {
            field: 'date',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>
                    <p
                        style={{ ...stylep, width: '120px' }}
                    >{item?.date ? dayjs(item?.date).format("MMMM D, YYYY") : "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        }
        ,
        {
            field: 'Asset/Brand',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>
                    <p
                        style={{ ...stylep, width: '120px' }}
                    >{item?.brandasset || "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },
        {
            field: 'type',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>
                    <p
                        style={{ ...stylep, width: '120px' }}
                    >{item?.type || "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },
        {
            field: 'avg_likes_count',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                    maxWidth: '200px'
                }}>

                    <p
                        style={stylep}
                    >{item?.avg_likes_count ? new Intl.NumberFormat("en-US", { notation: "compact" }).format(item?.avg_likes_count) : "N/A"}</p>
                </div >
            ),

            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
        },
        {
            field: 'avg_comments_count',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>

                    <p
                        style={stylep}
                    >{item?.avg_comments_count ? new Intl.NumberFormat("en-US", { notation: "compact" }).format(item?.avg_comments_count) : "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },
        {
            field: 'avg_shares_count',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>

                    <p
                        style={stylep}
                    >{item?.avg_shares_count ? new Intl.NumberFormat("en-US", { notation: "compact" }).format(item?.avg_shares_count) : "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },

        {
            field: 'avg_views_count',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>

                    <p
                        style={stylep}
                    >{item?.avg_views_count ? new Intl.NumberFormat("en-US", { notation: "compact" }).format(item?.avg_views_count) : "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },
        {
            field: 'followers_count',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>

                    <p
                        style={stylep}
                    >{item?.followers_count ? new Intl.NumberFormat("en-US", { notation: "compact" }).format(item?.followers_count) : "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },
        {
            field: 'following_count',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>

                    <p
                        style={stylep}
                    >{item?.following_count ? new Intl.NumberFormat("en-US", { notation: "compact" }).format(item?.following_count) : "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },
        {
            field: 'basicEngagementRate',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>

                    <p
                        style={stylep}
                    >{item?.basicEngagementRate?.toFixed(2) || "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },
        {
            field: 'impressionEngagementRate',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>

                    <p
                        style={stylep}
                    >{item?.impressionEngagementRate?.toFixed(2) || "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },
        {
            field: 'weightedEngagementRate',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    margin: 0,
                    padding: '15px',
                }}>

                    <p
                        style={stylep}
                    >{item?.weightedEngagementRate?.toFixed(2) || "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },

    ];


    const getDownload = async () => {
        setLoader(true);
        const startTime = performance.now();

        try {
            const url = process.env.REACT_APP_ZUPOTSU_API_BASE_URL;
            const link = document.createElement('a');
            link.href = `${url}/api/campaigns/getSocialStats/download-excel/${id}`;
            link.setAttribute('download', 'SocialStats.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


            setSnackbar({
                open: true,
                severity: 'success',
                message: "Downloaded Successfully",
            });
        } catch (error: any) {
            console.error("Download error:", error);
            setSnackbar({
                open: true,
                severity: "error",
                message: error?.response?.data?.error || "Something went wrong!",
            });
        } finally {
            setLoader(false);
        }
    };




    if (!loader) {
        return (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "transparent", gap: '20px' }}>
                <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", padding: 20, boxShadow: "0px 0px 4px 0px #0000000D", gap: '10px' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', backgroundColor: "#FFF", }}>
                        <p style={{
                            ...spanStyle,
                            fontFamily: "BebasNeue",
                            fontWeight: 400,
                            fontSize: "28px",
                            textAlign: 'left',
                            width: '100%'
                        }}>BRAND INSIGHT ANALYSIS</p>
                        <ZupotsuDatePicker
                            value={selectBarRange}
                            name="Bar range"
                            handleDateSelection={(e: any) => setSelectBarRange(e.target.value)}
                            minDate={minDat}
                            maxDate={maxDat}
                        />
                    </div>
                    <div style={{ ...styles.legendContainer, width: '100%', paddingTop: '10px' }}>
                        {legendData?.map(({ type, color }) => (
                            <div key={type} style={styles.legendItem}>
                                <div style={{ ...styles.legendColorBox, backgroundColor: color }}></div>
                                <span style={styles.legendText}>{type}</span>
                            </div>
                        ))}
                    </div>
                    {(selectedPost !== "all") ? (
                        (chartData?.length > 0) ? (
                            <div style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: 'flex-start',
                                alignItems: "center",
                                gap: "20px",
                                flexWrap: 'wrap',
                            }}>
                                {chartData
                                    .filter(item => item.dataset)
                                    .reduce((result: any, item: any, index: any, array: any) => {
                                        if (index % 2 === 0) {
                                            result.push(array.slice(index, index + 2));
                                        }
                                        return result;
                                    }, [])
                                    .map((pair: any, index: any) => (
                                        <div
                                            key={index}
                                            style={{
                                                borderColor: "#FFF",
                                                display: "flex",
                                                flexDirection: deviceType == "mobile" ? "column" : "row",
                                                alignItems: "center",
                                                justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
                                                borderStyle: "solid",
                                                borderWidth: "0px",
                                                width: "100%",
                                                gap: "20px",
                                            }}
                                        >
                                            {pair.map(({ dataset, title, xtitle, ytitle }: any, idx: any) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        margin: 0,
                                                        padding: 0,
                                                        width: deviceType == "mobile" ? "100%" : "48%",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "flex-start",
                                                        alignItems: "center",
                                                        marginTop: "20px"
                                                    }}
                                                >
                                                    {(brandDates?.length > 0) && (<ZoomableBarChart
                                                        title={title}
                                                        xtitle={{
                                                            display: true,
                                                            text: xtitle,
                                                            font: { size: 14, weight: "bold" }
                                                        }}
                                                        ytitle={{
                                                            display: true,
                                                            text: ytitle,
                                                            font: { size: 14, weight: "bold" }
                                                        }}
                                                        // hashselDates={postselDates}
                                                        hashselDates={
                                                            selectedIndex === 0
                                                                ? postselDates.filter((item: any) => item.type === "brand")
                                                                : selectedIndex === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                        }
                                                        minIndex={minIndex} maxIndex={maxIndex} datasets={dataset} labelData={brandDates || []} />)}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>) : (<NoData ErrorData={ErrorData} />)
                    ) : (
                        (multiGraphData?.length > 0) ? (<div style={{
                            width: '100%',
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: 'flex-start',
                            alignItems: "center",
                            gap: "10px",
                            flexWrap: 'wrap',
                        }}>
                            {
                                multiGraphData?.map((graph: any, idx: any) => (
                                    <div key={graph.acc_id}
                                        style={{
                                            margin: 0,
                                            padding: 0,
                                            width: "49%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            marginTop: "10px"
                                        }}
                                    >
                                        <div
                                            style={{
                                                margin: 0,
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                padding: "10px",
                                                gap: "20px"
                                            }}
                                        >

                                            {/* Likes vs Date */}
                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ZoomableBarChart
                                                    title={`Average Likes : ${brandInsightsposts[idx]}`}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Likes",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Likes",
                                                            data: graph.avgLikes,
                                                            // backgroundColor: brandColors || "red"
                                                            backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph?.dates}
                                                />
                                            </div>

                                            {/* Comments vs Date */}
                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ZoomableBarChart
                                                    title={`Average Comments : ${brandInsightsposts[idx]} `}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Comments",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Comments",
                                                            data: graph?.avgComments,
                                                            backgroundColor: graph?.type?.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph.dates}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ZoomableBarChart
                                                    title={`Average Shares : ${brandInsightsposts[idx]} `}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Comments",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Comments",
                                                            data: graph?.avgShares,
                                                            backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph.dates}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ZoomableBarChart
                                                    title={`Average Views : ${brandInsightsposts[idx]}`}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Comments",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Comments",
                                                            data: graph?.avgViews,
                                                            backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph.dates}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ZoomableBarChart
                                                    title={`Posts : ${brandInsightsposts[idx]}`}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Comments",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Comments",
                                                            data: graph?.postCount,
                                                            backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph.dates}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ZoomableBarChart
                                                    title={`Followers : ${brandInsightsposts[idx]}`}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Comments",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Comments",
                                                            data: graph?.followers,
                                                            backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph.dates}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ZoomableBarChart
                                                    title={`Following : ${brandInsightsposts[idx]}`}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Comments",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Comments",
                                                            data: graph?.following,
                                                            backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph.dates}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >

                                                <ZoomableBarChart
                                                    title={`Basic Engagement Rate : ${brandInsightsposts[idx]}`}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Comments",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Comments",
                                                            data: graph?.basicEng,
                                                            backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph.dates}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >

                                                <ZoomableBarChart
                                                    title={`Impression Engagement Rate : ${brandInsightsposts[idx]}`}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Comments",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Comments",
                                                            data: graph?.impressEng,
                                                            backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph.dates}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >

                                                <ZoomableBarChart
                                                    title={`Weighted  Engagement Rate : ${brandInsightsposts[idx]}`}
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        // text: "Comments",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={
                                                        idx === 0
                                                            ? postselDates.filter((item: any) => item.type === "brand")
                                                            : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                    }
                                                    minIndex={minIndex} maxIndex={maxIndex}
                                                    datasets={[
                                                        {
                                                            // label: "Comments",
                                                            data: graph?.weightEng,
                                                            backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                        }
                                                    ]}
                                                    labelData={graph.dates}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>) : (<NoData ErrorData={ErrorData} />)
                    )}
                </div>
                <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", padding: 20, boxShadow: "0px 0px 4px 0px #0000000D", gap: '10px' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontSize: '18px', fontWeight: '600', margin: 0, padding: 0 }}>
                            Historical Stats
                        </p>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}>
                           
                            <div
                                onClick={() => { getDownload() }}
                                style={{
                                    width: '32px', height: '32px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: "rgba(226, 11, 24, 1)",
                                    borderRadius: '8px',
                                }}>
                                <CloudDownloadIcon sx={{ color: '#FFF', cursor: "pointer", }} />
                            </div>
                        </div>
                    </div>
                    {allbrandInsightsData?.length > 0 ? (
                        <div style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
                            <ReorderableReusableTable
                                columns={columns}
                                tableData={allbrandInsightsData
                                    // ?.filter((search: any) => (
                                    //     search?.campaign_name?.toLowerCase().includes(query?.toLowerCase()))
                                    // )
                                }
                                setTableData={setTableData}
                                headers={headers}
                                handleChange={() => { }}
                            />
                        </div>
                    ) : (
                        <NoData ErrorData={ErrorData} />
                    )}

                </div>
                <Modal open={openChartPopup} onClose={() => setOpenChartPopup(false)}>
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: deviceType == "mobile" ? "95%" : (selectedPost != "all" ? "50%" : "60%"), bgcolor: "#FFF", boxShadow: 8, borderRadius: 3, p: 0,
                        display: 'flex', flexDirection: 'column',
                        overflowX: "scroll",
                        scrollbarWidth: "none",
                    }}>
                        <Close
                            style={{
                                alignSelf: 'end', cursor: 'pointer',
                                top: "10px",
                                right: '20px',
                                position: "relative",
                            }}
                            onClick={() => { setOpenChartPopup(false) }}
                        />
                        {(selectedChart && selectedPost != "all") && (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                gap: "10px",
                                flexWrap: 'wrap',
                            }}>
                                {(brandDates?.length > 0) && (<ZoomableBarChart isPopup={true}
                                    xtitle={{
                                        display: true,
                                        text: selectedChart.xtitle,
                                        font: { size: 14, weight: "bold" }
                                    }}
                                    ytitle={{
                                        display: true,
                                        text: selectedChart.ytitle,
                                        font: { size: 14, weight: "bold" }
                                    }}
                                    // hashselDates={postselDates}
                                    hashselDates={
                                        selectedPost == "all" ? postselDates :
                                            selectedIndex === 0
                                                ? postselDates.filter((item: any) => item.type === "brand")
                                                : selectedIndex === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                    }
                                    title={selectedChart.title} minIndex={minIndex} maxIndex={maxIndex} datasets={selectedChart.dataset} labelData={brandDates || []} disablezoom={true} />)}
                            </div>
                        )}
                        {(selectedChart && selectedPost == "all") && (
                            <div style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                gap: "10px",
                                flexWrap: 'wrap',
                            }}>
                                {(brandDates?.length > 0 && multiGraphData?.length > 0) ? (
                                    <>
                                        {
                                            multiGraphData?.map((graph: any, idx: any) => (
                                                <div key={graph.acc_id}
                                                    style={{
                                                        margin: 0,
                                                        padding: 0,
                                                        width: "49%",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "flex-start",
                                                        alignItems: "center",
                                                        marginTop: "10px"
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            margin: 0,
                                                            width: "100%",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "flex-start",
                                                            alignItems: "center",
                                                            padding: "10px",
                                                            gap: "20px"
                                                        }}
                                                    >

                                                        {/* Likes vs Date */}
                                                        {(chartname == "BIALC") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {(graph.avgLikes?.length > 0) ? (<ZoomableBarChart
                                                                title={`Average Likes : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Likes",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Likes",
                                                                        data: graph.avgLikes,
                                                                        backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph?.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}

                                                        {/* Comments vs Date */}
                                                        {(chartname == "BIACC") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {(graph?.avgComments?.length > 0) ? (<ZoomableBarChart
                                                                title={`Average Comments : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Comments",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Comments",
                                                                        data: graph?.avgComments,
                                                                        backgroundColor: graph?.type?.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}

                                                        {(chartname == "BIASC") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {(graph?.avgShares?.length > 0) ? (<ZoomableBarChart
                                                                title={`Average Shares : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Comments",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Comments",
                                                                        data: graph?.avgShares,
                                                                        backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}

                                                        {(chartname == "BIAVC") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {(graph?.avgViews?.length > 0) ? (<ZoomableBarChart
                                                                title={`Average Views : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Comments",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Comments",
                                                                        data: graph?.avgViews,
                                                                        backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}

                                                        {(chartname == "BIPC") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {(graph?.postCount?.length > 0) ? (<ZoomableBarChart
                                                                title={`Posts : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Comments",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Comments",
                                                                        data: graph?.postCount,
                                                                        backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}

                                                        {(chartname == "BIFC") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {(graph?.followers?.length > 0) ? (<ZoomableBarChart
                                                                title={`Followers : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Comments",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Comments",
                                                                        data: graph?.followers,
                                                                        backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}

                                                        {(chartname == "BIFGC") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {(graph?.following?.length > 0) ? (<ZoomableBarChart
                                                                title={`Following : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Comments",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Comments",
                                                                        data: graph?.following,
                                                                        backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}

                                                        {(chartname == "BIBER") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >

                                                            {(graph?.basicEng?.length > 0) ? (<ZoomableBarChart
                                                                title={`Basic Engagement Rate : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Comments",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Comments",
                                                                        data: graph?.basicEng,
                                                                        backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}

                                                        {(chartname == "BIIER") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >

                                                            {(graph?.impressEng?.length > 0) ? (<ZoomableBarChart
                                                                title={`Impression Engagement Rate : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Comments",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Comments",
                                                                        data: graph?.impressEng,
                                                                        backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}

                                                        {(chartname == "BIWER") && (<div
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >

                                                            {(graph?.weightEng?.length > 0) ? (<ZoomableBarChart
                                                                title={`Weighted  Engagement Rate : ${brandInsightsposts[idx]}`}
                                                                xtitle={{
                                                                    display: true,
                                                                    text: "Date",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                ytitle={{
                                                                    display: true,
                                                                    // text: "Comments",
                                                                    font: { size: 14, weight: "bold" }
                                                                }}
                                                                hashselDates={
                                                                    idx === 0
                                                                        ? postselDates.filter((item: any) => item.type === "brand")
                                                                        : idx === 1 ? postselDates.filter((item: any) => item.type === "asset") : postselDates
                                                                }
                                                                minIndex={minIndex} maxIndex={maxIndex}
                                                                datasets={[
                                                                    {
                                                                        // label: "Comments",
                                                                        data: graph?.weightEng,
                                                                        backgroundColor: graph.type.map((item: any) => getTypeColor(item))
                                                                    }
                                                                ]}
                                                                labelData={graph.dates}
                                                            />) : (<NoData ErrorData={ErrorData} />)}
                                                        </div>)}
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </>
                                ) : (<NoData ErrorData={ErrorData} />)}
                            </div>
                        )}
                    </Box>
                </Modal>
            </div>
        )
    } else {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }

}

export default BrandInsights
