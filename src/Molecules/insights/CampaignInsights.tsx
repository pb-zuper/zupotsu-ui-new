import React, { useEffect, useMemo, useState } from 'react'
import useDeviceType from '../../utils/DeviceType'
import { Box, Modal } from '@mui/material'
import { Close } from '@mui/icons-material'
import "react-datepicker/dist/react-datepicker.css";
import ZoomableBarChart from '../../Atoms/charts/Rechart'
import ZupotsuDatePicker from '../../Atoms/zupotsu-date-picker/zupotsu-date-picker'
import dayjs from 'dayjs'
import ReorderableReusableTable from '../table-management/ReorderablereusableTable'
import NoData from '../../error/NoData'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { NoDataImage } from '../../assets'
import Apis from '../../services/apis'
import { useSearchParams } from 'react-router-dom'

const CampaignInsights = ({
    selectedPostDetail,
    postdates,
    postlikes,
    postColors,
    postComments,
    postShares,
    postrepost,
    postmedia,
    postView,
    postbasicEng,
    postimpressEng,
    postweightEng,
    postSData,
    selectedType,
    hashtagDates,
    hashtagColors,
    hashtagLikess,
    hashtagComments,
    hashtagShares,
    hashtagMedia,
    hashtagView,
    hashtagEngagement,
    hashtagbasicEng,
    hashtagimpressEng,
    hashtagweightEng,

    hashselDates,
    postselDates,
    minDat,
    maxDat,
    openChartPopup,
    setOpenChartPopup,
    chartname,
    allPostsData,
    allHashtagsData,
    selectedPost,
    handleDownloadPDF
}: any) => {
    const deviceType = useDeviceType()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const apis = new Apis();
    const [loader, setLoader] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
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
                return "rgb(128,128,128,0.4)";
            default:
                return "rgba(147, 145, 145, 0.1)";
        }
    };

    postColors = postColors.map((type: any) => getTypeColor(type));
    hashtagColors = hashtagColors.map((type: any) => getTypeColor(type));

    const likedatasets = [
        {
            data: postlikes,
            backgroundColor: postColors || "red"
        },
    ]

    const sharedatasets = [
        {
            data: postShares,
            backgroundColor: postColors || "red"
        },
    ]

    const viewdatasets = [
        {
            data: postView,
            backgroundColor: postColors || "red"
        },
    ]


    const commentsdatasets: any = [
        {
            data: postComments,
            backgroundColor: postColors || "red"
        },
    ]


    const basicEngagementRatedatasets = [
        {
            data: postbasicEng,
            backgroundColor: postColors || "red"
        },
    ]


    const impressionEngagementRatedatasets = [
        {
            data: postimpressEng,
            backgroundColor: postColors || "red"
        },
    ]

    const weightedEngagementRatedatasets = [
        {
            data: postweightEng,
            backgroundColor: postColors || "red"
        },
    ]


    const hashmediadatasets = [
        {
            data: hashtagMedia,
            backgroundColor: hashtagColors || "red"
        },
    ]

    const hashrepostsdatasets = [
        {
            data: hashtagMedia,
            backgroundColor: hashtagColors || "red"
        },
    ]

    const postchartData = [
        { dataset: [{ data: postlikes, backgroundColor: postColors || "red" }], title: "Likes", name: "PILC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: postComments, backgroundColor: postColors || "red" }], title: "Comments", name: "PICE", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: postShares, backgroundColor: postColors || "red" }], title: "Shares", name: "PISC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: postView, backgroundColor: postColors || "red" }], title: "Views", name: "PITV", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: postbasicEng, backgroundColor: postColors || "red" }], title: "Basic Engagement Rate", name: "PIBE", xtitle: "Dates", ytitle: "%" },
        { dataset: [{ data: postimpressEng, backgroundColor: postColors || "red" }], title: "Impression Engagement Rate", name: "PIIE", xtitle: "Dates", ytitle: "%" },
        { dataset: [{ data: postweightEng, backgroundColor: postColors || "red" }], title: "Weighted Engagement Rate", name: "PIWE", xtitle: "Dates", ytitle: "%" }
    ];
    const postselectedChart = postchartData.find(chart => chart.name === chartname);

    const hashtagchartData = [
        { dataset: [{ data: hashtagMedia, backgroundColor: hashtagColors || "red" }], title: "Media Count", name: "HIMC", xtitle: "Dates", ytitle: "" },
        { dataset: [{ data: hashtagbasicEng, backgroundColor: hashtagColors || "red" }], title: "Basic Engagement Rate", name: "HIBE", xtitle: "Dates", ytitle: "%" },
        { dataset: [{ data: hashtagimpressEng, backgroundColor: hashtagColors || "red" }], title: "Impression Engagement Rate", name: "HIIE", xtitle: "Dates", ytitle: "%" },
        { dataset: [{ data: hashtagweightEng, backgroundColor: hashtagColors || "red" }], title: "Weighted Engagement Rate", name: "HIWE", xtitle: "Dates", ytitle: "%" }
    ];

    const hashtagselectedChart = hashtagchartData.find(chart => chart.name === chartname);


    const legendData = [
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
            paddingTop: '0px',
            paddingBottom: '0px',
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
    const spanStyle: any = {
        fontFamily: "Inter",
        fontWeight: 800,
        fontSize: "17px",
        lineHeight: "30px",
        letterSpacing: "0%",
        textAlign: "center",
    }

    const [selectBarRange, setSelectBarRange] = useState<[any, any] | []>((minDat && maxDat) ? [minDat, maxDat] : []);
    const [minMaxIndexes, setMinMaxIndexes] = useState({ minIndex: 0, maxIndex: selectedType == "post" ? postdates?.length : hashtagDates?.length });

    const getMinMaxIndexes = (datesArray: string[], startDate: string, endDate: string) => {
        if (datesArray?.length === 0) return { minIndex: 0, maxIndex: datesArray?.length - 1 };

        const sortedDates = datesArray
            ?.map((date, index) => ({ date, index }))
            .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

        let minIndex = sortedDates?.find(({ date }) => dayjs(date).isSameOrAfter(dayjs(startDate)))?.index ?? 0;
        let maxIndex = sortedDates?.reverse().find(({ date }) => dayjs(date).isSameOrBefore(dayjs(endDate)))?.index ?? datesArray?.length;

        return { minIndex, maxIndex };
    };

    useEffect(() => {
        // if (selectBarRange.length === 2) {

        const startDate = dayjs(selectBarRange[0]).format("YYYY-MM-DD");
        const endDate = dayjs(selectBarRange[1]).format("YYYY-MM-DD");

        const minMax = getMinMaxIndexes(
            selectedType === "post" ? postdates : hashtagDates,
            startDate,
            endDate
        );

        setMinMaxIndexes(minMax);
    }, [selectBarRange, selectedType, postdates, hashtagDates]);

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
    const headers = ['Date', 'Type', 'Likes', 'Comments', "Shares", "Views", "Basic Engagement Rate", "Impression Engagement Rate", "Weighted Engagement Rate"];
    const headerhash = ['Date', 'Type', 'Media Count',];
    const [tableData, setTableData] = useState(allPostsData || allHashtagsData || []);
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
            field: 'Type',
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
        }
        ,


        {
            field: 'likes_count',
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
                    >{item?.likes_count ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2, }).format(item?.likes_count) : "N/A"}</p>
                </div >
            ),

            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
        },
        {
            field: 'comments_count',
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
                    >{item?.comments_count ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2, }).format(item?.comments_count) : "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },
        {
            field: 'shares_count',
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
                    >{item?.shares_count ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2, }).format(item?.shares_count) : "N/A"}</p>
                </div >
            ),
            cellStyle: cellstyle
        },

        {
            field: 'views_count',
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
                    >{item?.views_count ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2, }).format(item?.views_count) : "N/A"}</p>
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

    const columnHash: any = [
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
        },
        {
            field: 'Type',
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
        }
        ,

        {
            field: 'media_count',
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
                    >{item?.media_count ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2, }).format(item?.media_count) : "N/A"}</p>
                </div >
            ),

            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
        },

    ]

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
            setSnackbar({
                open: true,
                severity: "error",
                message: error?.response?.data?.error || "Something went wrong!!",
            });
        } finally {
            setLoader(false);
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

    const mergedPostData = Object.values(
        allPostsData.reduce((acc: any, item: any) => {
            if (!acc[item.date]) {
                acc[item.date] = { ...item };
            } else {
                Object.keys(item).forEach((key) => {
                    if (typeof item[key] === "number") {
                        acc[item.date][key] += item[key];
                    }
                });
            }
            return acc;
        }, {} as Record<string, any>)
    );

    const mergedHashData = Object.values(
        allHashtagsData.reduce((acc: any, item: any) => {
            if (!acc[item.date]) {
                acc[item.date] = { ...item };
            } else {
                Object.keys(item).forEach((key) => {
                    if (typeof item[key] === "number") {
                        acc[item.date][key] += item[key];
                    }
                });
            }
            return acc;
        }, {} as Record<string, any>)
    );



    if (!loader) {
        return (
            <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", boxShadow: "0px 0px 4px 0px #0000000D", }}>
                <div style={{ width: '98%', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', backgroundColor: "#FFF", paddingTop: '20px', paddingLeft: '10px' }}>
                    <p style={{
                        ...spanStyle,
                        fontFamily: "BebasNeue",
                        fontWeight: 400,
                        fontSize: "28px",
                        textAlign: 'left',
                        width: '100%'
                    }}>CAMPAIGN INSIGHT ANALYSIS</p>
                    <ZupotsuDatePicker
                        value={selectBarRange}
                        name="Bar range"
                        handleDateSelection={(e: any) => setSelectBarRange(e.target.value)}
                        minDate={minDat}
                        maxDate={maxDat}
                    />
                </div>
                <div style={{ ...styles.legendContainer, width: '98%' }}>
                    {legendData?.map(({ type, color }) => (
                        <div key={type} style={styles.legendItem}>
                            <div style={{ ...styles.legendColorBox, backgroundColor: color }}></div>
                            <span style={styles.legendText}>{type}</span>
                        </div>
                    ))}

                </div>

                {
                    (selectedType == "post" && (postdates?.length > 0) && (postlikes?.length > 0 || postComments?.length > 0 || postShares?.length > 0 || postView?.length > 0 || postbasicEng?.length > 0 || postimpressEng?.length > 0 || postweightEng?.length > 0)) ? (
                        <>
                            {(likedatasets || commentsdatasets) && (
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", padding: 20, }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: deviceType == "mobile" ? "column" : "row",
                                        alignItems: "center",
                                        justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
                                        width: '100%', gap: '20px'
                                    }}>
                                        { postdates?.length > 0 && selectBarRange && (
                                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start", width: '48%' }}>


                                                {(postdates?.length > 0) && (<ZoomableBarChart
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        text: "",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={selectedPost == "all" ? postselDates : postselDates?.filter((item: any) => item?.id == selectedPostDetail?.post_id)}
                                                    title="Likes" minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={likedatasets} labelData={postdates || []} />)}

                                            </div>

                                        )}
                                        {commentsdatasets && postdates && selectBarRange && (
                                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start", width: '48%' }}>

                                                {(postdates?.length > 0) && (<ZoomableBarChart
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        text: "",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={selectedPost == "all" ? postselDates : postselDates?.filter((item: any) => item?.id == selectedPostDetail?.post_id)}
                                                    title="Comments" minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={commentsdatasets} labelData={postdates || []} />)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {(sharedatasets || viewdatasets) && (
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", padding: 20, }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: deviceType == "mobile" ? "column" : "row",
                                        alignItems: "center",
                                        justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
                                        width: '100%', gap: '10px'
                                    }}>
                                        {sharedatasets && postdates && selectBarRange && (
                                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start", width: '48%' }}>

                                                {(postdates?.length > 0) && (<ZoomableBarChart title="Shares"
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        text: "",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={selectedPost == "all" ? postselDates : postselDates?.filter((item: any) => item?.id == selectedPostDetail?.post_id)}
                                                    minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={sharedatasets} labelData={postdates || []} />)}
                                            </div>
                                        )}
                                        {viewdatasets && postdates && selectBarRange && (
                                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start", width: '48%' }}>

                                                {(postdates?.length > 0) && (<ZoomableBarChart
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        text: "",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={selectedPost == "all" ? postselDates : postselDates?.filter((item: any) => item?.id == selectedPostDetail?.post_id)}
                                                    title="Views" minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={viewdatasets} labelData={postdates || []} />)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {(basicEngagementRatedatasets || impressionEngagementRatedatasets) && (
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", padding: 20, }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: deviceType == "mobile" ? "column" : "row",
                                        alignItems: "center",
                                        justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
                                        width: '100%', gap: '10px'
                                    }}>
                                        {basicEngagementRatedatasets && postdates && selectBarRange && (

                                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start", width: '48%' }}>
                                                {(postdates?.length > 0) && (<ZoomableBarChart
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        text: "Percentage %",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={selectedPost == "all" ? postselDates : postselDates?.filter((item: any) => item?.id == selectedPostDetail?.post_id)}
                                                    title="Basic Engagement Rate" minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={basicEngagementRatedatasets} labelData={postdates || []} />)}
                                            </div>
                                        )}
                                        {impressionEngagementRatedatasets && postdates && selectBarRange && (

                                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start", width: '48%' }}>
                                                {(postdates?.length > 0) && (<ZoomableBarChart
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        text: "Percentage %",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={selectedPost == "all" ? postselDates : postselDates?.filter((item: any) => item?.id == selectedPostDetail?.post_id)}
                                                    title="Impression Engagement Rate" minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={impressionEngagementRatedatasets} labelData={postdates || []} />)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}


                            {(weightedEngagementRatedatasets) && (
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: "flex-start", backgroundColor: "#FFF", padding: 20, }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: deviceType == "mobile" ? "column" : "row",
                                        alignItems: "center",
                                        justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
                                        width: '100%', gap: '20px'
                                    }}>
                                        {weightedEngagementRatedatasets && postdates && selectBarRange && (

                                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start", width: '48%' }}>
                                                {(postdates?.length > 0) && (<ZoomableBarChart
                                                    xtitle={{
                                                        display: true,
                                                        text: "Date",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        text: "Percentage %",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    hashselDates={selectedPost == "all" ? postselDates : postselDates?.filter((item: any) => item?.id == selectedPostDetail?.post_id)}
                                                    title="Weighted Engagement Rate" minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={weightedEngagementRatedatasets} labelData={postdates || []} />)}
                                            </div>
                                        )}

                                    </div>
                                </div>
                            )}


                        </>
                    ) : (
                        (selectedType == "post") && (<NoData ErrorData={ErrorData} />)
                    )
                }

                {
                    (selectedType == "hashtag" && hashtagDates?.length > 0) ? (
                        <>
                            {(hashmediadatasets || hashrepostsdatasets) && (
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: "flex-start", backgroundColor: "#FFF", padding: 20, }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: deviceType == "mobile" ? "column" : "row",
                                        alignItems: "center",
                                        justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
                                        width: '48%', gap: '20px'
                                    }}>
                                        {hashmediadatasets && hashtagDates && (
                                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start", width: '100%' }}>
                                                {(hashtagDates?.length > 0) && (<ZoomableBarChart
                                                    xtitle={{
                                                        display: true,
                                                        text: "Dates",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    ytitle={{
                                                        display: true,
                                                        text: "",
                                                        font: { size: 14, weight: "bold" }
                                                    }}
                                                    // hashselDates={hashselDates}
                                                    hashselDates={selectedPost == "all" ? hashselDates : hashselDates?.filter((item: any) => item?.hashtag == selectedPostDetail?.hashtag)}
                                                    title="Media Count" minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={hashmediadatasets} labelData={hashtagDates || []} />)}
                                            </div>
                                        )}

                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        (selectedType == "hashtag") && (<NoData ErrorData={ErrorData} />)
                    )
                }

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
                    {(selectedType == "post" ? mergedPostData : mergedHashData)?.length > 0 ? (
                        <div style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
                            <ReorderableReusableTable
                                columns={selectedType == "post" ? columns : columnHash}
                                tableData={selectedType == "post" ? mergedPostData : mergedHashData
                                    // ?.filter((search: any) => (
                                    //     search?.campaign_name?.toLowerCase().includes(query?.toLowerCase()))
                                    // )
                                }
                                setTableData={setTableData}
                                headers={selectedType == "post" ? headers : headerhash}
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
                        width: deviceType == "mobile" ? "95%" : "50%", bgcolor: 'background.paper', boxShadow: 8, borderRadius: 3, p: 0,
                        display: 'flex', flexDirection: 'column',
                        overflowX: "scroll",
                        scrollbarWidth: "none"
                    }}>
                        <Close
                            style={{
                                alignSelf: 'end', cursor: 'pointer',
                                top: "40px",
                                right: '20px',
                                position: "relative",
                            }}
                            onClick={() => { setOpenChartPopup(false) }}
                        />
                        {(postselectedChart && selectedType == "post") && (

                            (postdates?.length > 0) && (<ZoomableBarChart
                                xtitle={{
                                    display: true,
                                    text: postselectedChart?.xtitle,
                                    font: { size: 14, weight: "bold" }
                                }}
                                ytitle={{
                                    display: true,
                                    text: postselectedChart?.ytitle,
                                    font: { size: 14, weight: "bold" }
                                }}
                                hashselDates={selectedPost == "all" ? postselDates : postselDates?.filter((item: any) => item?.id == selectedPostDetail?.post_id)}
                                title={postselectedChart.title} minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={postselectedChart.dataset} labelData={postdates} disablezoom={true} />)
                        )}
                        {(hashtagselectedChart && selectedType == "hashtag") && (

                            (hashtagDates?.length > 0) && (<ZoomableBarChart
                                xtitle={{
                                    display: true,
                                    text: hashtagselectedChart?.xtitle,
                                    font: { size: 14, weight: "bold" }
                                }}
                                ytitle={{
                                    display: true,
                                    text: hashtagselectedChart?.ytitle,
                                    font: { size: 14, weight: "bold" }
                                }}
                                hashselDates={selectedPost == "all" ? hashselDates : hashselDates?.filter((item: any) => item?.hashtag == selectedPostDetail?.hashtag)}
                                isPopup={true} title={hashtagselectedChart.title} minIndex={minMaxIndexes?.minIndex} maxIndex={minMaxIndexes?.maxIndex} datasets={hashtagselectedChart.dataset} labelData={hashtagDates} disablezoom={true} />)
                        )}
                    </Box>
                </Modal>
            </div >

        )
    } else {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }
}

export default CampaignInsights
