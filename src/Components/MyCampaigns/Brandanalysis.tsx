import { Box, Grid, } from '@mui/material'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { chat, collapse, eastWhiteArrow, EditIconn, engagementrate, engageRate, expand, favoriteLike, folloers, HandEye, infoCircle, instagramI, instagramIcon, instared, posts, report, SearchNormal, share, visibility, YoutubeIcon, youtubeRed, ytred, fall, growth } from '../../assets'
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb'
import useDeviceType from '../../utils/DeviceType';
import Apis from '../../services/apis';
import { NoDataImage } from '../../assets/index';
import NoData from '../../error/NoData'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import './report.css'
import CampaignInsights from '../../Molecules/insights/CampaignInsights';
import BrandInsights from '../../Molecules/insights/BrandInsights';
import dayjs from 'dayjs'
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
import { Col } from 'react-bootstrap';
import ZupotsuTooltip from '../../Atoms/zupotsu-tooltip/zupotsu-tooltip';
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


dayjs.extend(utc);
dayjs.extend(timezone);


const Brandanalysis = () => {
    const deviceType = useDeviceType();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [data, setData] = useState<any>([]);
    const [selectRange, setSelectRange] = useState<any>([])
    const [selectDate, setSelectDate] = React.useState<any>("");
    const [loader, setLoader] = useState(true);
    const [selectedPost, setSelectedPost] = useState("all")
    const [selectedPostDetail, setSelectedPostDetail] = useState<any>([])
    const [selectedIndex, setSelectedIndex] = useState<any>(0)
    const [selectedType, setSelectedType] = useState("post")
    const [selectedInsights, setSelectedInsights] = useState("Brand Insights")
    const [allPosts, setAllPosts] = useState<any>([]);
    const [allHashtags, setAllHashtags] = useState<any>([]);
    const [allbrandInsights, setAllBrandSights] = useState<any>([]);
    const [campaignData, setCampaignData] = useState<any>({})
    const [openChartPopup, setOpenChartPopup] = useState(false);
    const [openCampaignDetails, setOpenCampaignDetails] = useState(false);
    const [chartname, setChartName] = useState("");
    const [allPostsData, setAllPostsData] = useState<any>([]);
    const [allHashtagsData, setAllHashtagsData] = useState<any>([]);
    const [allbrandInsightsData, setAllBrandSightsData] = useState<any>([]);
    const userFromLocal = localStorage.getItem("role")?.toLowerCase();
    const isItAdmin = (userFromLocal === "admin") ? true : false;
    const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
    const isApprover = (userFromLocal === "approver") ? true : false;
    const isPublisher = (userFromLocal === "publisher") ? true : false;
    const campaign = isItAdmin || isSellerAdmin || isApprover || isPublisher

    const contentRef = useRef<any>(null)

    const reactToPrintFn = async () => {

        setSnackbar({
            open: true,
            severity: 'error',
            message: "Downloading Please Wait!!",
        });


        setLoader(true)
        const element = contentRef.current;

        const originalHeight = element.style.height;
        const originalOverflow = element.style.overflow;

        element.style.height = "auto";
        element.style.overflow = "visible";

        const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2,
        });

        element.style.height = originalHeight;
        element.style.overflow = originalOverflow;

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save("campaign.pdf");

        setLoader(false)
        setSnackbar({
            open: true,
            severity: 'success',
            message: "Downloaded Successfully!!",
        });


        setLoader(true)

    };



    const apis = new Apis();
    const linkDetails = useMemo(() => [
        {
            label: campaign ? "Campaign" : 'My Campaigns',
            url: '/campaigns',
        },
        {
            label: 'Analysis',
            url: '',
        },
    ], []);


    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectDate(event.target.value);
    };


    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const navigate = useNavigate();

    const ErrorData = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message:
                'No assets found',
        }),
        []
    );



    useEffect(() => {
        setLoader(true)
        const startTime = performance.now();

        const fetchAndTrack = async () => {
            await onLoad()
            // const loadTime = performance.now() - startTime;
            // mixpanelEvents.onLoad(loadTime, 'Manage Tray');
        };
        if (id) {
            fetchAndTrack();
        }
        return () => {
            // const timeSpent = performance.now() - startTime;
            // mixpanelEvents.onUnload('Manage Tray', timeSpent);
        };
    }, [])



    const [postDatess, setPostDates] = useState<any>([])
    const [postColors, setPostColors] = useState<any>([])
    const [postLikess, setPostlikes] = useState<any>([])
    const [postComments, setPostComments] = useState<any>([])
    const [postShares, setPostShares] = useState<any>([])
    const [postMedia, setPostMedia] = useState<any>([])
    const [postView, setPostView] = useState<any>([])
    const [postEngagement, setPostEngagement] = useState<any>([])
    const [postbasicEng, setPostbasicEng] = useState<any>([])
    const [postimpressEng, setPostimpressEng] = useState<any>([])
    const [postweightEng, setPostWeightEng] = useState<any>([])
    const [postSData, setPostsData] = useState<any>([])
    const [postselDates, setPostSeldates] = useState<any>([])

    const [hashtagDates, setHashtagDates] = useState<any>([])
    const [hashtagColors, setHashtagColors] = useState<any>([])
    const [hashtagLikess, setHashtaglikes] = useState<any>([])
    const [hashtagComments, setHashtagComments] = useState<any>([])
    const [hashtagShares, setHashtagShares] = useState<any>([])
    const [hashtagMedia, setHashtagMedia] = useState<any>([])
    const [hashtagView, setHashtagView] = useState<any>([])
    const [hashtagEngagement, setHashtagEngagement] = useState<any>([])
    const [hashtagbasicEng, setHashtagbasicEng] = useState<any>([])
    const [hashtagimpressEng, setHashtagimpressEng] = useState<any>([])
    const [hashtagweightEng, setHashtagWeightEng] = useState<any>([])
    const [hashselDates, setHashSeldates] = useState<any>([])

    const [brandDates, setBrandDates] = useState<any>([])
    const [brandColors, setBrandColors] = useState<any>([])
    const [brandLikess, setBrandlikes] = useState<any>([])
    const [brandComments, setBrandComments] = useState<any>([])
    const [brandShares, setBrandShares] = useState<any>([])
    const [brandPosts, setBrandPosts] = useState<any>([])
    const [brandView, setBrandView] = useState<any>([])
    const [brandFollowers, setBrandFollowers] = useState<any>([])
    const [brandFollowing, setBrandFollowing] = useState<any>([])
    const [multiGraphData, setMultiGraphData] = useState<any>([])

    const [brandbasicEngagementRate, setBrandBasicEngagementRate] = useState<any>([])
    const [brandimpressionEngagementRate, setBrandimpressionEngagementRate] = useState<any>([])
    const [brandweightedEngagementRate, setBrandweightedEngagementRate] = useState<any>([])


    let fromDate: any = null;
    let toDate: any = null;
    if (data?.campaign?.post_camp_to && data?.campaign?.post_camp_from && data?.campaign?.camp_from && data?.campaign?.camp_to && data?.campaign?.pre_camp_from && data?.campaign?.pre_camp_to) {
        fromDate = data?.campaign?.pre_camp_from ? new Date(data?.campaign?.pre_camp_from) : null;
        toDate = data?.campaign?.post_camp_to ? new Date(data?.campaign?.post_camp_to) : null;
    }

    else if (data?.campaign?.post_camp_from && data?.campaign?.post_camp_to && data?.campaign?.pre_camp_from && data?.campaign?.pre_camp_to) {
        fromDate = data?.campaign?.pre_camp_from ? new Date(data?.campaign?.pre_camp_from) : null;
        toDate = data?.campaign?.post_camp_to ? new Date(data?.campaign?.post_camp_to) : null;
    }

    else if (data?.campaign?.camp_from && data?.campaign?.camp_to && data?.campaign?.pre_camp_from && data?.campaign?.pre_camp_to) {
        fromDate = data?.campaign?.pre_camp_from ? new Date(data?.campaign?.pre_camp_from) : null;
        toDate = data?.campaign?.camp_to ? new Date(data?.campaign?.camp_to) : null;
    }

    else if (data?.campaign?.post_camp_to && data?.campaign?.post_camp_from && data?.campaign?.camp_from && data?.campaign?.camp_to) {
        fromDate = data?.campaign?.camp_from ? new Date(data?.campaign?.camp_from) : null;
        toDate = data?.campaign?.post_camp_to ? new Date(data?.campaign?.post_camp_to) : null;
    }

    else if (data?.campaign?.post_camp_to && data?.campaign?.post_camp_from) {
        fromDate = data?.campaign?.post_camp_from ? new Date(data?.campaign?.post_camp_from) : null;
        toDate = data?.campaign?.post_camp_to ? new Date(data?.campaign?.post_camp_to) : null;
    }

    else if (data?.campaign?.camp_to && data?.campaign?.camp_from) {
        fromDate = data?.campaign?.camp_from ? new Date(data?.campaign?.camp_from) : null;
        toDate = data?.campaign?.camp_to ? new Date(data?.campaign?.camp_to) : null;
    }

    else if (data?.campaign?.pre_camp_to && data?.campaign?.pre_camp_from) {
        fromDate = data?.campaign?.pre_camp_from ? new Date(data?.campaign?.pre_camp_from) : null;
        toDate = data?.campaign?.pre_camp_to ? new Date(data?.campaign?.pre_camp_to) : null;
    }

    const minDate = fromDate instanceof Date && !isNaN(fromDate.getTime()) ? fromDate.toISOString().split("T")[0] : "";
    const maxDate = toDate instanceof Date && !isNaN(toDate.getTime()) ? toDate.toISOString().split("T")[0] : "";

    const minDat =
        fromDate instanceof Date && !isNaN(fromDate.getTime())
            ? dayjs(fromDate).tz("Asia/Kolkata")
            : null;

    const maxDat =
        toDate instanceof Date && !isNaN(toDate.getTime())
            ? dayjs(toDate).tz("Asia/Kolkata")
            : null;

    const onLoad = () => {
        setLoader(true)
        apis.getCampaignSocialStatus(id)
            .then((response: any) => {
                setLoader(true)
                const res = response
                setData(response?.data?.data)
                response?.data?.data?.campaign?.posts?.forEach((item: any) => {
                    item["acc_id"] = item.type == "asset" ? response?.data?.data?.campaign.asset_acc_id : response?.data?.data?.campaign.brand_acc_id;
                })

                setCampaignData(response?.data?.data?.campaign)
                if (!response?.data?.data || !Array.isArray(response?.data?.data?.data) || response?.data?.data?.data.length === 0) {
                    setSnackbar({
                        open: true,
                        severity: 'error',
                        message: "No Data found",
                    });
                    return;
                }


                const firstDate = response?.data?.data?.data[0]?.date;
                const lastDate = response?.data?.data?.data?.[response?.data?.data?.data?.length - 1]?.date;


                let fromDate: any = null;
                let toDate: any = null;
                if (data?.campaign?.post_camp_to && data?.campaign?.post_camp_from && data?.campaign?.camp_from && data?.campaign?.camp_to && data?.campaign?.pre_camp_from && data?.campaign?.pre_camp_to) {
                    fromDate = data?.campaign?.pre_camp_from ? dayjs(data?.campaign?.pre_camp_from).tz("Asia/Kolkata") : null;
                    toDate = data?.campaign?.post_camp_to ? dayjs(data?.campaign?.post_camp_to).tz("Asia/Kolkata") : null;
                }

                else if (data?.campaign?.post_camp_from && data?.campaign?.post_camp_to && data?.campaign?.pre_camp_from && data?.campaign?.pre_camp_to) {
                    fromDate = data?.campaign?.pre_camp_from ? dayjs(data?.campaign?.pre_camp_from).tz("Asia/Kolkata") : null;
                    toDate = data?.campaign?.post_camp_to ? dayjs(data?.campaign?.post_camp_to).tz("Asia/Kolkata") : null;
                }

                else if (data?.campaign?.camp_from && data?.campaign?.camp_to && data?.campaign?.pre_camp_from && data?.campaign?.pre_camp_to) {
                    fromDate = data?.campaign?.pre_camp_from ? dayjs(data?.campaign?.pre_camp_from).tz("Asia/Kolkata") : null;
                    toDate = data?.campaign?.camp_to ? dayjs(data?.campaign?.camp_to).tz("Asia/Kolkata") : null;
                }

                else if (data?.campaign?.post_camp_to && data?.campaign?.post_camp_from && data?.campaign?.camp_from && data?.campaign?.camp_to) {
                    fromDate = data?.campaign?.camp_from ? dayjs(data?.campaign?.camp_from).tz("Asia/Kolkata") : null;
                    toDate = data?.campaign?.post_camp_to ? dayjs(data?.campaign?.post_camp_to).tz("Asia/Kolkata") : null;
                }

                else if (data?.campaign?.post_camp_to && data?.campaign?.post_camp_from) {
                    fromDate = data?.campaign?.post_camp_from ? dayjs(data?.campaign?.post_camp_from).tz("Asia/Kolkata") : null;
                    toDate = data?.campaign?.post_camp_to ? dayjs(data?.campaign?.post_camp_to).tz("Asia/Kolkata") : null;
                }

                else if (data?.campaign?.camp_to && data?.campaign?.camp_from) {
                    fromDate = data?.campaign?.camp_from ? dayjs(data?.campaign?.camp_from).tz("Asia/Kolkata") : null;
                    toDate = data?.campaign?.camp_to ? dayjs(data?.campaign?.camp_to).tz("Asia/Kolkata") : null;
                }

                else if (data?.campaign?.pre_camp_to && data?.campaign?.pre_camp_from) {
                    fromDate = data?.campaign?.pre_camp_from ? dayjs(data?.campaign?.pre_camp_from).tz("Asia/Kolkata") : null;
                    toDate = data?.campaign?.pre_camp_to ? dayjs(data?.campaign?.pre_camp_to).tz("Asia/Kolkata") : null;
                }


                setSelectRange([fromDate, toDate])

                var selectDate = lastDate.split("T")[0]
                if (selectDate) {
                    setSelectDate(selectDate)
                } else {
                    setSelectDate(new Date().toISOString().split("T")[0])
                }
                if (selectDate) {
                    const posts = response?.data?.data?.data
                        .filter((i: any) => i.date === selectDate)
                        ?.flatMap((item: any) => item.insights?.campaignInsights || [])
                        .filter((insight: any) => insight.campaign_type === "post") || [];
                    setAllPosts(posts || [])

                    const hashtag = response?.data?.data?.data
                        .filter((i: any) => i.date === selectDate)
                        ?.flatMap((item: any) => item.insights?.campaignInsights || [])
                        .filter((item: any) => item.campaign_type === "hashtag") || [];
                    setAllHashtags(hashtag || [])

                    const brandSights = response?.data?.data?.data
                        .filter((i: any) => i.date === selectDate)
                        ?.flatMap((item: any) => item.insights?.brandInsights || []) || [];
                    setAllBrandSights(brandSights || [])

                    if (selectedInsights == "Campaign Insights") {
                        if (selectedType == "post") {
                            setSelectedPost("all")
                        } else if (selectedType == "hashtag") {
                            setSelectedPostDetail(hashtag[0])
                            setSelectedPost("all")
                        }
                    }
                    if (selectedInsights == "Brand Insights") {
                        setSelectedPostDetail(brandSights[0])
                        setSelectedPost("all")
                    }
                }

            })
            .catch((error: any) => {
                const rawError = error?.response?.data?.error;
                const errorMessage =
                    typeof rawError === 'string'
                        ? rawError
                        : rawError?.message ||
                        rawError?.code ||
                        error?.message ||
                        'Something went wrong!';
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: errorMessage,
                });
                // mixpanelEvents.errorHandling({
                //   name: 'Manage Tray',
                //   msg: error?.response?.data?.error || error?.message
                // })
            })
            .finally(() => {
                setLoader(false)

            })
    }


    useEffect(() => {

        if ((data) && (data?.data?.length > 0)) {
            setLoader(true)

            let alltagdat: any = []
            let allpostdat: any = []
            let allbranddat: any = []
            if (data?.campaign) {
                data?.campaign?.tags?.forEach((item: any) => {
                    if (item?.date) alltagdat.push(item);
                });

                data?.campaign?.posts?.forEach((item: any) => {
                    if (item?.date) allpostdat.push(item);
                });
                // data?.posts.map((item: any) => allbranddat.push(item?.date))
            }
            setPostSeldates(allpostdat)
            setHashSeldates(alltagdat)
            const posts = data?.data
                ?.filter((i: any) => i.date === selectDate)
                ?.flatMap((item: any) => item.insights?.campaignInsights || [])
                .filter((insight: any) => insight.campaign_type === "post") || [];
            setAllPosts(posts || [])
            const previousDateData = data?.data
                ?.filter((item: any) => item.date < selectDate)
                ?.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

            const previousPosts = previousDateData?.insights?.campaignInsights
                ?.filter((insight: any) => insight.campaign_type === "post") || [];

            const hashtag = data?.data
                ?.filter((i: any) => i.date === selectDate)
                ?.flatMap((item: any) => item.insights?.campaignInsights || [])
                .filter((item: any) => item.campaign_type === "hashtag") || [];
            setAllHashtags(hashtag || [])
            const previousHashtagData = data?.data
                ?.filter((item: any) => item.date < selectDate)
                ?.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

            const previousHashtags = previousHashtagData?.insights?.campaignInsights
                ?.filter((insight: any) => insight.campaign_type === "hashtag") || [];

            const brandSights = data?.data
                ?.filter((i: any) => i.date === selectDate)
                ?.flatMap((item: any) => item.insights?.brandInsights || []) || [];
            setAllBrandSights(brandSights || [])

            const previousBrandData = data?.data
                ?.filter((item: any) => item.date < selectDate)
                ?.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

            const previousBrandSights = previousBrandData?.insights?.brandInsights || [];


            if (selectedInsights == "Campaign Insights") {
                if (selectedType == "post") {
                    if (selectedPost == "all") {
                        const uniquePosts = new Map();

                        posts?.forEach((obj: any) => {
                            if (obj?.post_id && !uniquePosts.has(obj.post_id)) {
                                uniquePosts.set(obj.post_id, obj);
                            }
                        });

                        const count = uniquePosts.size
                        const summedObject = Array.from(uniquePosts.values()).reduce((acc: any, obj: any) => {
                            Object.keys(obj).forEach((key) => {
                                const value = obj[key];
                                if (typeof value === "number" || value === null) {
                                    acc[key] = (acc[key] || 0) + (value || 0);
                                }
                            });
                            return acc;
                        }, {});

                        



                        // const totalInteractions = summedObject.likes_count + summedObject.comments_count;
                        // const totalWeightedInteractions = summedObject.likes_count + (summedObject.comments_count * 2);

                        // summedObject.basicEngagementRate = ((totalInteractions / summedObject.posts_count) / summedObject.followers_count);
                        // summedObject.impressionEngagementRate = (summedObject.views_count && summedObject.posts_count) > 0
                        //     ? ((totalInteractions / summedObject.posts_count) / summedObject.views_count)
                        //     : 0;
                        // summedObject.weightedEngagementRate = ((totalWeightedInteractions / summedObject.posts_count) / summedObject.followers_count);

                        const previousSummed = previousPosts.reduce((acc: any, obj: any) => {
                            Object.keys(obj).forEach((key) => {
                                const value = obj[key];
                                if (typeof value === "number" || value === null) {
                                    acc[key] = (acc[key] || 0) + (value || 0);
                                }
                            });
                            return acc;
                        }, {});

                      

                        let followers_count = brandSights.reduce((acc: any, obj: any) => {
                            if (obj?.followers_count) {
                                acc += obj?.followers_count;
                            }
                            return acc;
                        }
                            , 0);

                        let pre_followers_count = previousBrandSights.reduce((acc: any, obj: any) => {
                            if (obj?.followers_count) {
                                acc += obj?.followers_count;
                            }
                            return acc;
                        }
                            , 0);


                        summedObject.basicEngagementRate = (((summedObject.likes_count) + (summedObject.comments_count)) / followers_count);
                        summedObject.impressionEngagementRate = (summedObject.views_count) > 0
                            ? ((((summedObject.likes_count) + (summedObject.comments_count))) / summedObject.views_count)
                            : "NA";
                        summedObject.weightedEngagementRate = (((summedObject.likes_count) + (summedObject.comments_count * 3)) / followers_count)


                        previousSummed.basicEngagementRate = (((previousSummed.likes_count) + (previousSummed.comments_count)) / pre_followers_count);
                        previousSummed.impressionEngagementRate = (previousSummed.views_count) > 0
                            ? ((((previousSummed.likes_count) + (previousSummed.comments_count))) / previousSummed.views_count)
                            : "NA";
                        previousSummed.weightedEngagementRate = (((previousSummed.likes_count) + (previousSummed.comments_count * 3)) / pre_followers_count)






                        const calcPercentChange = (current: number, previous: number): string => {
                            if (!previous || previous === 0) return "N/A";
                            const change = ((current - previous) / previous) * 100;
                            return change.toFixed(2);
                        };

                        const postChanges = {
                            likeChange: Number(summedObject?.likes_count ?? 0) - Number(previousSummed?.likes_count ?? 0),
                            likeChangePercent: calcPercentChange(Number(summedObject?.likes_count ?? 0), Number(previousSummed?.likes_count ?? 0)),

                            commentChange: Number(summedObject?.comments_count ?? 0) - Number(previousSummed?.comments_count ?? 0),
                            commentChangePercent: calcPercentChange(Number(summedObject?.comments_count ?? 0), Number(previousSummed?.comments_count ?? 0)),

                            viewChange: Number(summedObject?.views_count ?? 0) - Number(previousSummed?.views_count ?? 0),
                            viewChangePercent: calcPercentChange(Number(summedObject?.views_count ?? 0), Number(previousSummed?.views_count ?? 0)),

                            shareChange: Number(summedObject?.shares_count ?? 0) - Number(previousSummed?.shares_count ?? 0),
                            shareChangePercent: calcPercentChange(Number(summedObject?.shares_count ?? 0), Number(previousSummed?.shares_count ?? 0)),

                            repostChange: Number(summedObject?.reposts_count ?? 0) - Number(previousSummed?.reposts_count ?? 0),
                            repostChangePercent: calcPercentChange(Number(summedObject?.reposts_count ?? 0), Number(previousSummed?.reposts_count ?? 0)),

                            basicEngagementRateChange: Number(summedObject?.basicEngagementRate ?? 0) - Number(previousSummed?.basicEngagementRate ?? 0),
                            basicEngagementRateChangePercent: (
                                Number(summedObject?.basicEngagementRate ?? 0) - Number(previousSummed?.basicEngagementRate ?? 0)
                            ).toFixed(2),

                            impressionEngagementRateChange: (summedObject?.impressionEngagementRate && previousSummed?.impressionEngagementRate) ? (Number(summedObject?.impressionEngagementRate ?? 0) - Number(previousSummed?.impressionEngagementRate ?? 0)) : "NA",
                            impressionEngagementRateChangePercent:
                                (summedObject?.impressionEngagementRate && previousSummed?.impressionEngagementRate) ?
                                    (
                                        ((Number(summedObject.impressionEngagementRate) - Number(previousSummed.impressionEngagementRate))
                                            / Number(previousSummed.impressionEngagementRate))
                                    ).toFixed(2)
                                    : "",

                            weightedEngagementRateChange: Number(summedObject?.weightedEngagementRate ?? 0) - Number(previousSummed?.weightedEngagementRate ?? 0),
                            weightedEngagementRateChangePercent: (
                                Number(summedObject?.weightedEngagementRate ?? 0) - Number(previousSummed?.weightedEngagementRate ?? 0)
                            ).toFixed(2),
                        };


                        setSelectedPostDetail({
                            ...summedObject,
                            ...postChanges,
                        });

                        // setSelectedPostDetail(summedObject);

                    } else {
                        const prevPost = previousPosts[selectedIndex];
                        const currentPost = posts[selectedIndex];

                        const calcPercentChange = (current: number, prev: number): number | "NA" => {
                            if (!prev || prev === 0) return "NA";
                            const change = ((current - prev) / prev) * 100;
                            return parseFloat(change.toFixed(2));
                        };

                        const postChanges = {
                            likeChange: Number(currentPost?.likes_count ?? 0) - Number(prevPost?.likes_count ?? 0),
                            likeChangePercent: calcPercentChange(Number(currentPost?.likes_count ?? 0), Number(prevPost?.likes_count ?? 0)),

                            commentChange: Number(currentPost?.comments_count ?? 0) - Number(prevPost?.comments_count ?? 0),
                            commentChangePercent: calcPercentChange(Number(currentPost?.comments_count ?? 0), Number(prevPost?.comments_count ?? 0)),

                            viewChange: Number(currentPost?.views_count ?? 0) - Number(prevPost?.views_count ?? 0),
                            viewChangePercent: calcPercentChange(Number(currentPost?.views_count ?? 0), Number(prevPost?.views_count ?? 0)),

                            shareChange: Number(currentPost?.shares_count ?? 0) - Number(prevPost?.shares_count ?? 0),
                            shareChangePercent: calcPercentChange(Number(currentPost?.shares_count ?? 0), Number(prevPost?.shares_count ?? 0)),

                            repostChange: Number(currentPost?.reposts_count ?? 0) - Number(prevPost?.reposts_count ?? 0),
                            repostChangePercent: calcPercentChange(Number(currentPost?.reposts_count ?? 0), Number(prevPost?.reposts_count ?? 0)),

                            basicEngagementRateChange:
                                Number(currentPost?.basicEngagementRate ?? 0) - Number(prevPost?.basicEngagementRate ?? 0),
                            basicEngagementRateChangePercent: (
                                Number(currentPost?.basicEngagementRate ?? 0) - Number(prevPost?.basicEngagementRate ?? 0)
                            ).toFixed(2),

                            impressionEngagementRateChange:
                                Number(currentPost?.impressionEngagementRate ?? 0) - Number(prevPost?.impressionEngagementRate ?? 0),
                            impressionEngagementRateChangePercent: (
                                Number(currentPost?.impressionEngagementRate ?? 0) - Number(prevPost?.impressionEngagementRate ?? 0)
                            ).toFixed(2),

                            weightedEngagementRateChange:
                                Number(currentPost?.weightedEngagementRate ?? 0) - Number(prevPost?.weightedEngagementRate ?? 0),
                            weightedEngagementRateChangePercent: (
                                Number(currentPost?.weightedEngagementRate ?? 0) - Number(prevPost?.weightedEngagementRate ?? 0)
                            ).toFixed(2),
                        };


                        setSelectedPostDetail({
                            ...currentPost,
                            ...postChanges,
                        });
                        // setSelectedPostDetail(posts[selectedIndex])
                    }

                } else if (selectedType == "hashtag") {
                    if (selectedPost == "all") {
                        const uniqueHashtags = new Map();

                        hashtag?.forEach((obj: any) => {
                            let parsedTag = obj?.hashtag;

                            if (typeof parsedTag === "string") {
                                try {
                                    parsedTag = JSON.parse(parsedTag)?.tag ?? parsedTag;
                                } catch {
                                }
                            }

                            if (parsedTag && !uniqueHashtags.has(parsedTag)) {
                                uniqueHashtags.set(parsedTag, obj);
                            }
                        });


                        const summedObject = Array.from(uniqueHashtags.values()).reduce((acc: any, obj: any) => {
                            Object.keys(obj).forEach((key) => {
                                const value = obj[key];
                                if (typeof value === "number" || value === null) {
                                    acc[key] = (acc[key] || 0) + (value || 0);
                                }
                            });
                            return acc;
                        }, {});


                        const uniquePrevHashtags = new Map();

                        previousHashtags.forEach((obj: any) => {
                            let parsedTag = obj?.hashtag;

                            if (typeof parsedTag === "string") {
                                try {
                                    parsedTag = JSON.parse(parsedTag)?.tag ?? parsedTag;
                                } catch { }
                            }

                            if (parsedTag && !uniquePrevHashtags.has(parsedTag)) {
                                uniquePrevHashtags.set(parsedTag, obj);
                            }
                        });

                        const previousSummed = Array.from(uniquePrevHashtags.values()).reduce((acc: any, obj: any) => {
                            Object.keys(obj).forEach((key) => {
                                const value = obj[key];
                                if (typeof value === "number" || value === null) {
                                    acc[key] = (acc[key] || 0) + (value || 0);
                                }
                            });
                            return acc;
                        }, {});
                        const calcPercentChange = (current: number, previous: number): string => {
                            if (!previous || previous === 0) return "N/A";
                            const change = ((current - previous) / previous) * 100;
                            return change.toFixed(2);
                        };


                        const hashtagChanges = {


                            mediaChange: summedObject?.media_count - (previousSummed?.media_count || 0),
                            mediaChangePercent: calcPercentChange(summedObject?.media_count, previousSummed?.media_count || 0),


                        };

                        setSelectedPostDetail({
                            ...summedObject,
                            ...hashtagChanges,
                        });

                        // setSelectedPostDetail(summedObject);

                    } else {
                        // setSelectedPostDetail(hashtag[selectedIndex])
                        const prevPost = previousHashtags[selectedIndex];
                        const currentPost = hashtag[selectedIndex];

                        const calcPercentChange = (current: number, prev: number): number | "NA" => {
                            if (!prev || prev === 0) return "NA";
                            const change = ((current - prev) / prev) * 100;
                            return parseFloat(change.toFixed(2));
                        };

                        const postChanges = {
                            likeChange: (currentPost?.likes_count ?? 0) - (prevPost?.likes_count ?? 0),
                            likeChangePercent: calcPercentChange((currentPost?.likes_count ?? 0), (prevPost?.likes_count ?? 0)),

                            commentChange: (currentPost?.comments_count ?? 0) - (prevPost?.comments_count ?? 0),
                            commentChangePercent: calcPercentChange((currentPost?.comments_count ?? 0), (prevPost?.comments_count ?? 0)),

                            viewChange: (currentPost?.views_count ?? 0) - (prevPost?.views_count ?? 0),
                            viewChangePercent: calcPercentChange((currentPost?.views_count ?? 0), (prevPost?.views_count ?? 0)),

                            mediaChange: (currentPost?.media_count ?? 0) - (prevPost?.media_count ?? 0),
                            mediaChangePercent: calcPercentChange(currentPost?.media_count ?? 0, prevPost?.media_count ?? 0),

                            shareChange: (currentPost?.shares_count ?? 0) - (prevPost?.shares_count ?? 0),
                            shareChangePercent: calcPercentChange(currentPost?.shares_count ?? 0, prevPost?.shares_count ?? 0),

                            repostChange: (currentPost?.reposts_count ?? 0) - (prevPost?.reposts_count ?? 0),
                            repostChangePercent: calcPercentChange(currentPost?.reposts_count ?? 0, prevPost?.reposts_count ?? 0),

                            basicEngagementRateChange:
                                currentPost?.basicEngagementRate - prevPost?.basicEngagementRate,
                            basicEngagementRateChangePercent: calcPercentChange(
                                currentPost?.basicEngagementRate,
                                prevPost?.basicEngagementRate
                            ),

                            impressionEngagementRateChange:
                                currentPost?.impressionEngagementRate - prevPost?.impressionEngagementRate,
                            impressionEngagementRateChangePercent: calcPercentChange(
                                currentPost?.impressionEngagementRate,
                                prevPost?.impressionEngagementRate
                            ),

                            weightedEngagementRateChange:
                                currentPost?.weightedEngagementRate - prevPost?.weightedEngagementRate,
                            weightedEngagementRateChangePercent: calcPercentChange(
                                currentPost?.weightedEngagementRate,
                                prevPost?.weightedEngagementRate
                            ),
                        };

                        setSelectedPostDetail({
                            ...currentPost,
                            ...postChanges,
                        });
                    }
                }
            }
            if (selectedInsights == "Brand Insights") {
                if (selectedPost == "all") {
                    const mergedArray = brandSights?.map((current: any, index: any) => {
                        const previous = previousBrandSights[index] || {};

                        const calcPercentChange = (curr: number, prev: number): number | "NA" => {
                            if (!prev || prev === 0) return "NA";
                            const change = ((curr - prev) / prev) * 100;
                            return parseFloat(change.toFixed(2));
                        };

                        const changes = {
                            likeChange: (current?.likes_count ?? 0) - (previous?.likes_count ?? 0),
                            likeChangePercent: calcPercentChange(current?.likes_count ?? 0, previous?.likes_count ?? 0),

                            commentChange: (current?.comments_count ?? 0) - (previous?.comments_count ?? 0),
                            commentChangePercent: calcPercentChange(current?.comments_count ?? 0, previous?.comments_count ?? 0),

                            viewChange: (current?.views_count ?? 0) - (previous?.views_count ?? 0),
                            viewChangePercent: calcPercentChange(current?.views_count ?? 0, previous?.views_count ?? 0),

                            shareChange: (current?.shares_count ?? 0) - (previous?.shares_count ?? 0),
                            shareChangePercent: calcPercentChange(current?.shares_count ?? 0, previous?.shares_count ?? 0),

                            followerChange: (current?.followers_count ?? 0) - (previous?.followers_count ?? 0),
                            followerChangePercent: calcPercentChange(current?.followers_count ?? 0, previous?.followers_count ?? 0),

                            followingChange: (current?.following_count ?? 0) - (previous?.following_count ?? 0),
                            followingChangePercent: calcPercentChange(current?.following_count ?? 0, previous?.following_count ?? 0),

                            postCountChange: (current?.posts_count ?? 0) - (previous?.posts_count ?? 0),
                            postCountChangePercent: calcPercentChange(current?.posts_count ?? 0, previous?.posts_count ?? 0),

                            avgLikeChange: (current?.avg_likes_count ?? 0) - (previous?.avg_likes_count ?? 0),
                            avgLikeChangePercent: calcPercentChange(current?.avg_likes_count ?? 0, previous?.avg_likes_count ?? 0),

                            avgCommentChange: (current?.avg_comments_count ?? 0) - (previous?.avg_comments_count ?? 0),
                            avgCommentChangePercent: calcPercentChange(current?.avg_comments_count ?? 0, previous?.avg_comments_count ?? 0),

                            avgViewChange: (current?.avg_views_count ?? 0) - (previous?.avg_views_count ?? 0),
                            avgViewChangePercent: calcPercentChange(current?.avg_views_count ?? 0, previous?.avg_views_count ?? 0),

                            avgShareChange: (current?.avg_shares_count ?? 0) - (previous?.avg_shares_count ?? 0),
                            avgShareChangePercent: calcPercentChange(current?.avg_shares_count ?? 0, previous?.avg_shares_count ?? 0),

                            basicEngagementRateChange:
                                (current?.basicEngagementRate ?? 0) - (previous?.basicEngagementRate ?? 0),
                            basicEngagementRateChangePercent: calcPercentChange(current?.basicEngagementRate ?? 0, previous?.basicEngagementRate ?? 0),

                            impressionEngagementRateChange:
                                (current?.impressionEngagementRate ?? 0) - (previous?.impressionEngagementRate ?? 0),
                            impressionEngagementRateChangePercent: calcPercentChange(current?.impressionEngagementRate ?? 0, previous?.impressionEngagementRate ?? 0),

                            weightedEngagementRateChange:
                                (current?.weightedEngagementRate ?? 0) - (previous?.weightedEngagementRate ?? 0),
                            weightedEngagementRateChangePercent: calcPercentChange(current?.weightedEngagementRate ?? 0, previous?.weightedEngagementRate ?? 0),
                        };

                        return {
                            ...current,
                            prevData: previous,
                            changes,
                        };
                    });

                    setSelectedPostDetail(mergedArray);

                    // setSelectedPostDetail(brandSights)
                } else {
                    const prevPost = previousBrandSights[selectedIndex];
                    const currentPost = brandSights[selectedIndex];

                    const calcPercentChange = (current: number, prev: number): number | "NA" => {
                        if (!prev || prev === 0) return "NA";
                        const change = ((current - prev) / prev) * 100;
                        return parseFloat(change.toFixed(2));
                    };

                    const changes = {
                        likeChange: (currentPost?.likes_count ?? 0) - (prevPost?.likes_count ?? 0),
                        likeChangePercent: calcPercentChange(currentPost?.likes_count ?? 0, prevPost?.likes_count ?? 0),

                        commentChange: (currentPost?.comments_count ?? 0) - (prevPost?.comments_count ?? 0),
                        commentChangePercent: calcPercentChange(currentPost?.comments_count ?? 0, prevPost?.comments_count ?? 0),

                        viewChange: (currentPost?.views_count ?? 0) - (prevPost?.views_count ?? 0),
                        viewChangePercent: calcPercentChange(currentPost?.views_count ?? 0, prevPost?.views_count ?? 0),

                        shareChange: (currentPost?.shares_count ?? 0) - (prevPost?.shares_count ?? 0),
                        shareChangePercent: calcPercentChange(currentPost?.shares_count ?? 0, prevPost?.shares_count ?? 0),

                        followerChange: (currentPost?.followers_count ?? 0) - (prevPost?.followers_count ?? 0),
                        followerChangePercent: calcPercentChange(currentPost?.followers_count ?? 0, prevPost?.followers_count ?? 0),

                        followingChange: (currentPost?.following_count ?? 0) - (prevPost?.following_count ?? 0),
                        followingChangePercent: calcPercentChange(currentPost?.following_count ?? 0, prevPost?.following_count ?? 0),

                        postCountChange: (currentPost?.posts_count ?? 0) - (prevPost?.posts_count ?? 0),
                        postCountChangePercent: calcPercentChange(currentPost?.posts_count ?? 0, prevPost?.posts_count ?? 0),

                        avgLikeChange: (currentPost?.avg_likes_count ?? 0) - (prevPost?.avg_likes_count ?? 0),
                        avgLikeChangePercent: calcPercentChange(currentPost?.avg_likes_count ?? 0, prevPost?.avg_likes_count ?? 0),

                        avgCommentChange: (currentPost?.avg_comments_count ?? 0) - (prevPost?.avg_comments_count ?? 0),
                        avgCommentChangePercent: calcPercentChange(currentPost?.avg_comments_count ?? 0, prevPost?.avg_comments_count ?? 0),

                        avgViewChange: (currentPost?.avg_views_count ?? 0) - (prevPost?.avg_views_count ?? 0),
                        avgViewChangePercent: calcPercentChange(currentPost?.avg_views_count ?? 0, prevPost?.avg_views_count ?? 0),

                        avgShareChange: (currentPost?.avg_shares_count ?? 0) - (prevPost?.avg_shares_count ?? 0),
                        avgShareChangePercent: calcPercentChange(currentPost?.avg_shares_count ?? 0, prevPost?.avg_shares_count ?? 0),

                        basicEngagementRateChange:
                            (currentPost?.basicEngagementRate ?? 0) - (prevPost?.basicEngagementRate ?? 0),
                        basicEngagementRateChangePercent: (
                            currentPost?.basicEngagementRate -
                            prevPost?.basicEngagementRate
                        )?.toFixed(2),

                        impressionEngagementRateChange:
                            (currentPost?.impressionEngagementRate ?? 0) - (prevPost?.impressionEngagementRate ?? 0),
                        impressionEngagementRateChangePercent: (
                            currentPost?.impressionEngagementRate -
                            prevPost?.impressionEngagementRate
                        )?.toFixed(2),

                        weightedEngagementRateChange:
                            (currentPost?.weightedEngagementRate ?? 0) - (prevPost?.weightedEngagementRate ?? 0),
                        weightedEngagementRateChangePercent: (
                            currentPost?.weightedEngagementRate -
                            prevPost?.weightedEngagementRate
                        )?.toFixed(2),
                    };

                    setSelectedPostDetail({
                        ...currentPost,
                        ...changes,
                    });
                }
            }

            let postdates: any = []
            let postcol: any = []
            let postlikes: any = []
            let postComm: any = []
            let postengagement: any = []
            let postmedia: any = []
            let postshare: any = []
            let postview: any = []
            let postBasicEngg: any = []
            let postImpressEngg: any = []
            let postWeightEngg: any = []
            let postssData: any = []

            let hashtagdates: any = []
            let hashtagcol: any = []
            let hashtaglikes: any = []
            let hashtagengagement: any = []
            let hashtagmediaa: any = []
            let hashtagshare: any = []
            let hashtagComm: any = []
            let hashtagview: any = []
            let hashtagBasicEngg: any = []
            let hashtagImpressEngg: any = []
            let hashtagWeightEngg: any = []

            let branddates: any = []
            let brandcol: any = []
            let brandlikes: any = []
            let brandfollowers: any = []
            let brandfollowing: any = []
            let brandengagement: any = []
            let brandbasicEng: any = []
            let brandimpressEng: any = []
            let brandWeightEng: any = []
            let brandPostcount: any = []

            let avgdates: any = []
            let avglikes: any = []
            let avgfollowers: any = []
            let avgshares: any = []
            let avgfollowing: any = []
            let avgviews: any = []
            let avgcomment: any = []

            let allPostDat: any = []
            let allHashDat: any = []
            let allBrandInsightDat: any = []


            data?.data?.forEach((item: any) => {
                const date = new Date(item?.date).toISOString();
                const insights = item?.insights?.campaignInsights;

                if (!insights || insights?.length === 0) {
                    postdates.push(date);
                    postcol.push(null);
                    postlikes.push(0);
                    postComm.push(0);
                    postengagement.push(0);
                    postview.push(0);
                    postmedia.push(0);
                    postshare.push(0);
                    postBasicEngg.push(0);
                    postImpressEngg.push(0);
                    postWeightEngg.push(0);
                    return;
                }
                item?.insights?.campaignInsights.forEach((insight: any) => {
                    if (insight?.campaign_type === "post" && (selectedPost === "all" || insight?.post_id === selectedPostDetail?.post_id)) {
                        const dateIndex = postdates.indexOf(insight.date);
                        const addedIds = new Set();

                        if (dateIndex !== -1 && !addedIds.has(insight.post_id)) {
                            addedIds.add(insight.post_id);
                            allPostDat.push(insight)
                            postlikes[dateIndex] += insight.likes_count || 0;
                            postComm[dateIndex] += insight.comments_count || 0;
                            postengagement[dateIndex] += insight.engagement_score || 0;
                            postview[dateIndex] += insight.views_count || 0;
                            postmedia[dateIndex] += insight.media_count || 0;
                            postshare[dateIndex] += insight.shares_count || 0;
                            postBasicEngg[dateIndex] += insight.basicEngagementRate || 0;
                            postImpressEngg[dateIndex] += insight.impressionEngagementRate || 0;
                            postWeightEngg[dateIndex] += insight.weightedEngagementRate || 0;
                        } else {
                            allPostDat.push(insight)
                            postdates.push(insight.date);
                            postcol.push(insight.type);
                            postlikes.push(insight.likes_count || 0);
                            postComm.push(insight.comments_count || 0);
                            postengagement.push(insight.engagement_score || 0);
                            postview.push(insight.views_count || 0);
                            postmedia.push(insight.media_count || 0);
                            postshare.push(insight.shares_count || 0);
                            postBasicEngg.push(insight.basicEngagementRate || 0);
                            postImpressEngg.push(insight.impressionEngagementRate || 0);
                            postWeightEngg.push(insight.weightedEngagementRate || 0);
                        }
                    }
                });
            });

            setAllPostsData(allPostDat)
            setPostsData(postssData)
            setPostDates(postdates);
            setPostColors(postcol)
            setPostComments(postComm)
            setPostlikes(postlikes);
            setPostShares(postshare)
            setPostEngagement(postengagement)
            setPostMedia(postmedia)
            setPostView(postview)
            setPostbasicEng(postBasicEngg)
            setPostimpressEng(postImpressEngg)
            setPostWeightEng(postWeightEngg)


            data?.data?.forEach((item: any) => {
                const date = new Date(item?.date).toISOString();
                const insights = item?.insights?.campaignInsights;

                if (!insights || insights?.length === 0) {
                    hashtagdates.push(date);
                    hashtagcol.push(null);
                    hashtaglikes.push(0);
                    hashtagComm.push(0);
                    hashtagengagement.push(0);
                    hashtagmediaa.push(0);
                    hashtagshare.push(0);
                    hashtagview.push(0);
                    hashtagBasicEngg.push(0);
                    hashtagImpressEngg.push(0);
                    hashtagWeightEngg.push(0);
                    return;
                }
                item?.insights?.campaignInsights?.forEach((insight: any) => {
                    const isHashtagMatching = () => {
                        try {
                            const insightHashtag = typeof insight?.hashtag === "string" && insight?.hashtag.trim().startsWith("{")
                                ? JSON.parse(insight?.hashtag)?.tag ?? insight?.hashtag
                                : insight?.hashtag;

                            const selectedHashtag = typeof selectedPostDetail?.hashtag === "string" && selectedPostDetail?.hashtag.trim().startsWith("{")
                                ? JSON.parse(selectedPostDetail?.hashtag)?.tag ?? selectedPostDetail?.hashtag
                                : selectedPostDetail?.hashtag;

                            return JSON.stringify(insightHashtag) === JSON.stringify(selectedHashtag);
                        } catch (error) {
                            console.error("Error parsing hashtag JSON:", error);
                            return false;
                        }
                    };

                    if (insight?.campaign_type === "hashtag" && (selectedPost === "all" || (isHashtagMatching()))) {
                        const dateIndex = hashtagdates.indexOf(insight.date);

                        const addedIds = new Set();

                        if (dateIndex !== -1 && !addedIds.has(insight.hashtag)) {
                            // if (dateIndex !== -1) {
                            addedIds.add(insight.hashatg);
                            allHashDat.push(insight)
                            hashtaglikes[dateIndex] += insight.likes_count || 0;
                            hashtagComm[dateIndex] += insight.comments_count || 0;
                            hashtagengagement[dateIndex] += insight.engagement_score || 0;
                            hashtagmediaa[dateIndex] += insight.media_count || 0;
                            hashtagshare[dateIndex] += insight.shares_count || 0;
                            hashtagview[dateIndex] += insight.view_count || 0;
                            hashtagBasicEngg[dateIndex] += insight.basicEngagementRate || 0;
                            hashtagImpressEngg[dateIndex] += insight.impressionEngagementRate || 0;
                            hashtagWeightEngg[dateIndex] += insight.weightedEngagementRate || 0;
                        } else {
                            hashtagdates.push(insight.date || "Unknown");
                            allHashDat.push(insight);
                            hashtagcol.push(insight.type);
                            hashtaglikes.push(insight.likes_count || 0);
                            hashtagComm.push(insight.comments_count || 0);
                            hashtagengagement.push(insight.engagement_score || 0);
                            hashtagmediaa.push(insight.media_count || 0);
                            hashtagshare.push(insight.shares_count || 0);
                            hashtagview.push(insight.view_count || 0);
                            hashtagBasicEngg.push(insight.basicEngagementRate || 0);
                            hashtagImpressEngg.push(insight.impressionEngagementRate || 0);
                            hashtagWeightEngg.push(insight.weightedEngagementRate || 0);
                        }
                    }
                });
            });

            setAllHashtagsData(allHashDat)
            setHashtagDates(hashtagdates);
            setHashtagColors(hashtagcol)
            setHashtagComments(hashtagComm)
            setHashtaglikes(hashtaglikes);
            setHashtagShares(hashtagshare)
            setHashtagEngagement(hashtagengagement)
            setHashtagMedia(hashtagmediaa)
            setHashtagView(hashtagview)
            setHashtagbasicEng(hashtagBasicEngg)
            setHashtagimpressEng(hashtagImpressEngg)
            setHashtagWeightEng(hashtagWeightEngg)

            const insightMap: { [acc_id: string]: any[] } = {};

            data?.data?.forEach((item: any) => {
                item?.insights?.brandInsights?.forEach((insight: any) => {
                    const accId = insight?.acc_id;
                    if (selectedPost === "all" || accId === selectedPostDetail?.acc_id) {
                        if (!insightMap[accId]) {
                            insightMap[accId] = [];
                        }
                        insightMap[accId]?.push(insight);
                    }
                });
            });

            const multiGraphData = Object.entries(insightMap).map(([accId, insights]) => {
                const defaultDate = new Date(insights[0]?.date).toISOString();

                if (!insights || insights?.length === 0) {
                    return {
                        acc_id: null,
                        dates: [defaultDate],
                        likes: [0],
                        engagement: [0],
                        followers: [0],
                        following: [0],
                        basicEng: [0],
                        impressEng: [0],
                        weightEng: [0],
                        postCount: [0],
                        avgLikes: [0],
                        avgFollowers: [0],
                        avgFollowing: [0],
                        avgComments: [0],
                        avgViews: [0],
                        avgShares: [0],
                        type: [null]
                    };
                }
                const graphData = {
                    acc_id: accId,
                    dates: insights?.map(i => i.date || 0),
                    likes: insights?.map(i => i.likes_count || 0),
                    engagement: insights?.map(i => i.engagement_score || 0),
                    followers: insights?.map(i => i.followers_count || 0),
                    following: insights?.map(i => i.following_count || 0),
                    basicEng: insights?.map(i => i.basicEngagementRate || 0),
                    impressEng: insights?.map(i => i.impressionEngagementRate || 0),
                    weightEng: insights?.map(i => i.weightedEngagementRate || 0),
                    postCount: insights?.map(i => i.posts_count || 0),
                    avgLikes: insights?.map(i => i.avg_likes_count || 0),
                    avgFollowers: insights?.map(i => i.followers_count || 0),
                    avgFollowing: insights?.map(i => i.following_count || 0),
                    avgComments: insights?.map(i => i.avg_comments_count || 0),
                    avgViews: insights?.map(i => i.avg_views_count || 0),
                    avgShares: insights?.map(i => i.avg_shares_count || 0),
                    type: insights.map(i => i.type),
                };

                return graphData;
            });
            setMultiGraphData(multiGraphData);

            data?.data?.map((item: any, index: any) => {
                const date = new Date(item?.date).toISOString();
                const insights = item?.insights?.brandInsights;

                if (!insights || insights?.length === 0) {
                    branddates.push(date);
                    allBrandInsightDat.push({ date });
                    brandcol.push(null);
                    brandlikes.push(0);
                    brandengagement.push(0);
                    brandfollowers.push(0);
                    brandfollowing.push(0);
                    brandbasicEng.push(0);
                    brandimpressEng.push(0);
                    brandWeightEng.push(0);
                    brandPostcount.push(0);

                    avgdates.push(date);
                    avglikes.push(0);
                    avgfollowers.push(0);
                    avgfollowing.push(0);
                    avgcomment.push(0);
                    avgviews.push(0);
                    avgshares.push(0);
                    return;
                }
                item?.insights?.brandInsights.map((item: any, index: any) => {
                    if (selectedPost === "all" || (item?.acc_id === selectedPostDetail?.acc_id)) {
                        branddates.push(item.date || 0)
                        const valueToPush = data?.campaign?.asset_acc_id === item?.acc_id
                            ? campaignData?.asset_acc?.toUpperCase()
                            : data?.campaign?.brand_acc_id === item?.acc_id ? campaignData?.brand_acc?.toUpperCase() : "NA";
                        allBrandInsightDat.push({ ...item, 'brandasset': valueToPush })
                        const existingIndex = branddates.indexOf(item.date);
                        brandcol.push(item.type)
                        brandlikes.push(item.likes_count || 0)
                        brandengagement.push(item.engagement_score || 0)
                        brandfollowers.push(item.followers_count || 0)
                        brandfollowing.push(item.following_count || 0)
                        brandbasicEng.push(item.basicEngagementRate || 0)
                        brandimpressEng.push(item.impressionEngagementRate || 0)
                        brandWeightEng.push(item.weightedEngagementRate || 0)
                        brandPostcount.push(item.posts_count || 0)
                        avgdates.push(item.date || 0)
                        avglikes.push(item.avg_likes_count || 0)
                        avgfollowers.push(item.followers_count || 0)
                        avgfollowing.push(item.following_count || 0)
                        avgcomment.push(item.avg_comments_count || 0)
                        avgviews.push(item.avg_views_count || 0)
                        avgshares.push(item.avg_shares_count || 0)
                    }
                })
            })
            setAllBrandSightsData(allBrandInsightDat)
            setBrandDates(avgdates);
            setBrandColors(brandcol)
            setBrandComments(avgcomment)
            setBrandlikes(avglikes);
            setBrandShares(avgshares)
            setBrandPosts(brandPostcount)
            setBrandView(avgviews)
            setBrandFollowers(avgfollowers)
            setBrandFollowing(avgfollowing)
            setBrandBasicEngagementRate(brandbasicEng)
            setBrandimpressionEngagementRate(brandimpressEng)
            setBrandweightedEngagementRate(brandWeightEng)
            setLoader(false)
        }

    }, [[JSON.stringify(data)], selectedPostDetail, selectedPost, selectDate])

    const divstyle: any = {
        margin: 0, display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "flex-start",
        width: deviceType == "mobile" ? "100%" : '32%',
        padding: "10px",
        borderRadius: "20px",
        border: "1px solid rgba(224, 224, 224, 1)",
        height: "140px",
        cursor: 'pointer',
    };

    const spanStyle: any = {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "30px",
        letterSpacing: "0%",
        textAlign: "center",
    }

    const span1Style: any = {
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "30px",
        letterSpacing: "0%",
        textAlign: "center",
    }

    const selectionstyle: any = {
        fontFamily: "Inter",
        width: 'auto',
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "25px",
        letterSpacing: "0%",
        textAlign: "left",
        borderRadius: "10px",
        padding: "0px 10px",
        cursor: "pointer",
        display: "inline-block",
        marginRight: "4px",
    }

    // const brandposts: any = [...Array.from({ length: allPosts?.length }, (_, i) => `Post ${i + 1}`)];
    // const tagposts: any = [...Array.from({ length: allHashtags?.length }, (_, i) => `Post ${i + 1}`)];
    const brandposts: any = allPosts?.length > 0 ? Array.from(new Set(allPosts?.map((post: any) => post.post_id))).map((post_id, i) => `Post ${i + 1}`) : Array.from(new Set(campaignData?.posts?.map((post: any) => post?.id))).map((post_id, i) => `Post ${i + 1}`);
    const tagposts: any = allHashtags?.length > 0 ? Array.from(new Set(allHashtags?.map((post: any) => post.post_id))).map((post_id, i) => `Post ${i + 1}`) : Array.from(new Set(campaignData?.tags?.map((post: any) => post.tag)));

    let brandInsightsposts: any = []

    if (allbrandInsights?.length > 0) {
        allbrandInsights?.forEach((item: any) => {
            const valueToPush = campaignData?.asset_acc_id === item?.acc_id
                ? campaignData?.asset_acc?.toUpperCase()
                : campaignData?.brand_acc?.toUpperCase();

            if (valueToPush && !brandInsightsposts?.includes(valueToPush)) {
                brandInsightsposts?.push(valueToPush);
            }
        });
    } else {
        brandInsightsposts.push(campaignData?.asset_acc?.toUpperCase())
        brandInsightsposts.push(campaignData?.brand_acc?.toUpperCase())
    }



    const formatNumber = (num: any) => {
        if (num === null || num === undefined) return "0";
        const isNegative = num < 0;
        const absNum = Math.abs(num);
        let formatted;
        if (absNum >= 1_000_000_000) {
            formatted = (absNum / 1_000_000_000).toFixed(2) + "B";
        } else if (absNum >= 1_000_000) {
            formatted = (absNum / 1_000_000).toFixed(2) + "M";
        } else if (absNum >= 1_000) {
            formatted = (absNum / 1_000).toFixed(2) + "K";
        } else if (absNum < 1_000 && absNum >= 1) {
            formatted = absNum % 1 === 0 ? absNum.toString() : absNum.toFixed(2);
        } else {
            formatted = absNum.toFixed(2);
        }
        return isNegative ? `-${formatted}` : formatted;
    };
    // console.log("seel", selectedPostDetail)

    if (!loader) {
        return (
            <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: 'rgb(250,250,250)', height: '90vh', overflowY: "scroll", overflowX: 'hidden' }}>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={5000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity as AlertColor}
                    >
                        {snackbar.message}
                    </MuiAlert>
                </Snackbar>
                <div
                    ref={contentRef}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'center',
                        padding: '5px',
                        backgroundColor: 'rgb(250,250,250)',
                        height: '90vh',
                        overflowX: 'hidden',
                        overflowY: 'scroll'
                    }}
                >
                    <Grid xs={12} md={12} lg={12} width={"98%"} spacing={2} marginTop={"10px"}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                backgroundColor: '#FFF',
                                paddingTop: "15px",
                                paddingBottom: "15px",
                                padding: "15px",
                                alignItems: 'center',
                            }}
                        >
                            <Breadcrumb
                                linkDetails={linkDetails}
                                underline="always"
                                maxItems={3}
                                itemBeforeCollapse={1}
                                itemAfterCollapse={1}
                                iconName="arrow_forward_ios_black_24dp"
                                iconSize={20}
                                iconLabel="Breadcrumb-Arrow-Right"
                                iconStyle="regular"
                                color="#333"
                                textColor="#333"
                            />
                        </Box>
                    </Grid>
                    <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", padding: 20 }}>
                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', borderStyle: 'solid', borderWidth: '0px', width: '100%', gap: '10px', border: "1px solid #F2F2F2", padding: 20, borderRadius: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: "space-between", width: '100%' }}>
                                <ZoptsuUnderlineTitle
                                    fontSizeOnLargeScreen="35px"
                                    fontSizeOnMediumScreen="33px"
                                    fontSizeOnSmallScreen="33px"
                                    fontSizeOnExtraSmallScreen="33px"
                                    titleText={'Campaign Details'}
                                    letterSpacing="1.92px"
                                    lineHeight="40.2px"
                                    textAlign="start"
                                    underlineWidthForDesktop="100%"
                                    underlineWidthForSmallTablet="100%"
                                    underlineWidthForMobile="100%"
                                    underlineBottomForDesktop="18%"
                                    underlineBottomForSmallTablet="21%"
                                    underlineBottomForMobile="24%"
                                    paddingLeft="0px"
                                    underlineHeight="9px"
                                />
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: '10px' }}>
                                    <div
                                        onClick={() => { reactToPrintFn() }}
                                        style={{
                                            width: '32px', height: '32px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: "rgba(226, 11, 24, 1)",
                                            borderRadius: '8px',
                                        }}>
                                        <PictureAsPdfIcon sx={{ color: '#FFF', cursor: "pointer", }} />
                                    </div>


                                    <button onClick={() => { setOpenCampaignDetails(!openCampaignDetails) }} style={{
                                        width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000", display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>

                                        <img
                                            src={openCampaignDetails ? collapse : expand}
                                            alt=""
                                        />
                                    </button>
                                    <button onClick={() => { navigate(`/createreport?id=${id}`); }} style={{
                                        width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000", display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                        <img src={EditIconn} alt="Edit Icon" width={32} height={32} />
                                    </button>
                                </div>
                            </div>
                            {(openCampaignDetails) && (<div style={{ display: 'flex', flexWrap: "wrap", marginTop: '20px', width: "100%" }}>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.campaign_name}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Campaign Name'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.brand_acc}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Brand Account Id'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.asset_acc}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Asset Account Id'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.platform}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Platform'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.pre_camp_from?.split("T")?.[0] || "NA"}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Pre Campaign From'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.pre_camp_to?.split("T")?.[0] || "NA"}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Pre Campaign To'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.camp_from?.split("T")?.[0] || "NA"}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Campaign From'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.camp_to?.split("T")?.[0] || "NA"}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Campaign To'}
                                        </div>
                                    </div>
                                </Col>  <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.post_camp_from?.split("T")?.[0] || "NA"}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Post Campaign From'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.post_camp_to?.split("T")?.[0] || "NA"}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Post Campaign To'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.camp_report_from?.split("T")?.[0] || "NA"}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Report From'}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                                    <div style={{}}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                            {campaignData?.camp_report_to?.split("T")?.[0] || "NA"}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                                            {'Report To'}
                                        </div>
                                    </div>
                                </Col>
                            </div>)}
                            <div style={{ width: '100%', display: 'flex', flexDirection: deviceType == "mobile" ? "column" : 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '20px', padding: '5px', marginBottom: '10px', backgroundColor: '#FFF', borderTop: "1px solid #E0E0E0" }}>
                                <div style={{ width: deviceType == "mobile" ? "100%" : '70%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', gap: '15px', marginTop: '20px' }}>
                                    {["Brand Insights", "Campaign Insights"].map((item: any, index: any) => (
                                        <span
                                            key={index}
                                            onClick={() => {
                                                setSelectedInsights(item)
                                                setSelectedIndex(0)
                                                setSelectedPost("all")
                                            }}
                                            style={{
                                                fontFamily: "BebasNeue",
                                                fontWeight: 400,
                                                fontSize: deviceType == "mobile" ? "22px" : "28px",
                                                lineHeight: "42px",
                                                letterSpacing: "0%",
                                                textDecoration: item == selectedInsights ? "underline" : "none",
                                                color: item == selectedInsights ? "#E20B18" : "#484949",
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div style={{ width: deviceType == "mobile" ? "100%" : '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#FFF', }}>

                                </div>
                            </div>
                            {(selectedInsights == "Campaign Insights") ? (
                                <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', borderStyle: 'solid', borderWidth: '0px', width: '100%', gap: '20px', borderRadius: '16px' }}>

                                    {(campaignData?.posts?.length > 0) && (<div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '20px', borderBottom: "1px solid #E0E0E0", paddingBottom: '10px' }}>
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '50%', gap: '20px', }}>
                                            {[{ label: "Posts", value: "post" }, { label: "Hashtags", value: "hashtag" }].map((item: any, index: any) => (
                                                <span key={index} onClick={() => {
                                                    setSelectedIndex(0)
                                                    setSelectedPost("all")
                                                    setSelectedType(item?.value)

                                                }} style={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 600,
                                                    fontSize: "14px",
                                                    lineHeight: "30px",
                                                    letterSpacing: "0%",
                                                    textAlign: "left",
                                                    cursor: 'pointer',
                                                    color: selectedType == item?.value ? "#E20B18" : '#828282',
                                                    borderBottom: selectedType == item?.value ? "2px solid #E20B18" : ""
                                                }}>
                                                    {item?.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>)}

                                    {(selectedType == "post" && campaignData?.posts?.length > 0) && (
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '20px', overflowX: "scroll", scrollbarWidth: "none" }}>
                                            <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '80%', gap: '20px', overflowX: "scroll", scrollbarWidth: "none" }}>
                                                {(campaignData?.posts?.length > 0) && (<span
                                                    onClick={() => {
                                                        setSelectedPost("all");
                                                        // setSelectedPostDetail(allPosts[index])
                                                        // setSelectedIndex(index)
                                                    }}
                                                    style={{
                                                        ...selectionstyle,
                                                        color: selectedPost === "all" ? "#E20B18" : "#828282",
                                                        border: selectedPost === "all" ? "1px solid #E20B18" : "1px solid #828282",
                                                    }}
                                                >
                                                    {"All"}
                                                </span>)}
                                                {
                                                    (campaignData?.posts?.filter((item: any) => item?.is_active)).map((item: any, index: any) => (
                                                        <span
                                                            key={index}
                                                            onClick={() => {
                                                                setSelectedPost(item.id);
                                                                let post = allPosts?.filter((item: any) => item?.post_id == item?.id)
                                                                setSelectedPostDetail(post[0])
                                                                setSelectedIndex(index)
                                                            }}
                                                            style={{
                                                                ...selectionstyle,
                                                                color: selectedPost === item.id ? "#E20B18" : "#828282",
                                                                border: selectedPost === item.id ? "1px solid #E20B18" : "1px solid #828282",
                                                            }}
                                                        >
                                                            Post {index + 1}
                                                        </span>
                                                    ))}
                                            </div>
                                            <input
                                                style={{
                                                    width: deviceType == "mobile" ? "100%" : '150px',
                                                    padding: '10px',
                                                    fontFamily: 'Inter',
                                                    fontSize: '15px',
                                                    height: "40px",
                                                    border: "1px solid rgba(0,0,0,0.5)",
                                                    borderRadius: "5px"
                                                }}
                                                type="date"
                                                id="date"
                                                value={selectDate}
                                                onChange={handleDateChange}
                                                min={minDate}
                                                max={maxDate}
                                            />

                                        </div>)}
                                    {(selectedType == "hashtag" && campaignData?.tags?.length > 0) && (<div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '20px', overflowX: "scroll", scrollbarWidth: "none" }}>
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '80%', gap: '20px', overflowX: "scroll", scrollbarWidth: "none" }}>
                                            {campaignData?.tags?.length > 0 && (<span
                                                onClick={() => {
                                                    setSelectedPost("all");
                                                    // setSelectedPostDetail(allPosts[index])
                                                    // setSelectedIndex(index)
                                                }}
                                                style={{
                                                    ...selectionstyle,
                                                    color: selectedPost === "all" ? "#E20B18" : "#828282",
                                                    border: selectedPost === "all" ? "1px solid #E20B18" : "1px solid #828282",
                                                }}
                                            >
                                                {"All"}
                                            </span>)}
                                            {(
                                                (campaignData.tags.filter((item: any) => item.is_active)).map((item: any, index: any) => (
                                                    <span
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedPost(item.tag);
                                                            setSelectedIndex(index)
                                                        }}
                                                        style={{
                                                            ...selectionstyle,
                                                            color: selectedPost === item.tag ? "#E20B18" : "#828282",
                                                            border: selectedPost === item.tag ? "1px solid #E20B18" : "1px solid #828282",
                                                        }}
                                                    >
                                                        {item.tag}
                                                    </span>
                                                ))
                                            )
                                            }
                                        </div>
                                        <input
                                            style={{
                                                width: deviceType == "mobile" ? "100%" : '150px',
                                                padding: '10px',
                                                fontFamily: 'Inter',
                                                fontSize: '15px',
                                                height: "40px",
                                                border: "1px solid rgba(0,0,0,0.5)",
                                                borderRadius: "5px"
                                            }}
                                            type="date"
                                            id="date"
                                            value={selectDate}
                                            onChange={handleDateChange}
                                            min={minDate}
                                            max={maxDate}
                                        />
                                    </div>)}
                                    {(selectedType == "post" && campaignData?.posts?.length > 0) && (<div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '100%', gap: '10px', flexWrap: "wrap" }}>
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: deviceType == "mobile" ? "flex-start" : "space-between", borderStyle: 'solid', width: '100%', gap: '10px', flexWrap: "wrap" }}>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("PILC");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "49%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>

                                                </div>
                                                <img src={favoriteLike} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                <span style={spanStyle}>{selectedPostDetail?.likes_count ? formatNumber(selectedPostDetail?.likes_count) : "NA"}</span>
                                                {(selectedPost) && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.likeChange || selectedPostDetail?.likeChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.likeChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.likeChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.likeChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {formatNumber(selectedPostDetail?.likeChange) || 0}

                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}

                                                <span style={span1Style}> Likes</span>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("PISC");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "49%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>
                                                    {/* <ZupotsuTooltip
                                                    tooltipMessage={""}
                                                    icon={infoCircle}
                                                /> */}
                                                </div>
                                                <img src={share} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                <span style={spanStyle}>{selectedPostDetail?.shares_count ? formatNumber(selectedPostDetail?.shares_count) : "NA"}</span>
                                                {(selectedPost) && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(!isNaN(Number(selectedPostDetail?.shareChange)) || selectedPostDetail?.shareChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.shareChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.shareChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.shareChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {!isNaN(Number(selectedPostDetail?.shareChange))
                                                                    ? `${formatNumber(Number(selectedPostDetail?.shareChange))}`
                                                                    : 'NA'}
                                                            </>

                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}> Shares</span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: deviceType == "mobile" ? "flex-start" : "space-between", borderStyle: 'solid', width: '100%', gap: '10px', flexWrap: "wrap" }}>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("PICE");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "49%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>
                                                    {/* <ZupotsuTooltip
                                                    tooltipMessage={""}
                                                    icon={infoCircle}
                                                /> */}
                                                </div>
                                                <img src={chat} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                <span style={spanStyle}>{selectedPostDetail?.comments_count ? formatNumber(selectedPostDetail?.comments_count) : 'NA'}</span>
                                                {(selectedPost) && (
                                                    <span style={{ ...spanStyle, lineHeight: "19px", fontSize: "10px" }}>
                                                        {(selectedPostDetail?.commentChange || selectedPostDetail?.commentChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.commentChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.commentChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.commentChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {!isNaN(Number(selectedPostDetail?.commentChange))
                                                                    ? `${formatNumber(Number(selectedPostDetail.commentChange))}`
                                                                    : 'NA'}
                                                            </>

                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}> Comments</span>
                                            </div>

                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("PITV");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "49%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", marginBottom: "-15px" }}>
                                                    <ZupotsuTooltip
                                                        tooltipMessage={"The overall number of times a video has been played, including repeat views by the same user"}
                                                        icon={infoCircle}
                                                    />
                                                </div>
                                                <img src={visibility} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                <span style={spanStyle}>{selectedPostDetail?.views_count ? formatNumber(selectedPostDetail?.views_count) : "NA"}</span>
                                                {(selectedPost) && (
                                                    <span style={{ ...spanStyle, lineHeight: "19px", fontSize: "10px", }}>
                                                        {(selectedPostDetail?.viewChange || selectedPostDetail?.viewChange == 0) ? (

                                                            <>
                                                                {selectedPostDetail?.viewChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.viewChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.viewChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {!isNaN(Number(selectedPostDetail?.viewChange))
                                                                    ? `${formatNumber(Number(selectedPostDetail.viewChange))}`
                                                                    : 'NA'}
                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Total Views</span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: deviceType == "mobile" ? "flex-start" : "space-between", borderStyle: 'solid', width: '100%', gap: '10px', flexWrap: "wrap" }}>

                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("PIBE");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "32%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", marginBottom: "-15px" }}>
                                                    <ZupotsuTooltip
                                                        tooltipMessage={"The engagement rate is calculated as the total number of interactions your content receives divided by your total number of followers, multiplied by 100%"}
                                                        icon={infoCircle}
                                                    />
                                                </div>
                                                <img src={engageRate} style={{
                                                    width: 30,
                                                    height: 30,
                                                }} />
                                                <span style={spanStyle}>
                                                    {selectedPostDetail?.basicEngagementRate !== null &&
                                                        Number(selectedPostDetail?.basicEngagementRate) !== 0 &&
                                                        selectedPostDetail?.basicEngagementRate !== undefined && !isNaN(Number(selectedPostDetail?.basicEngagementRate))
                                                        ? `${selectedPostDetail.basicEngagementRate?.toFixed(2)}%`
                                                        : 'NA'}
                                                </span>

                                                {(selectedPost) && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.basicEngagementRateChangePercent || selectedPostDetail?.basicEngagementRateChangePercent == 0) ? (
                                                            <>
                                                                {Number(selectedPostDetail?.basicEngagementRateChangePercent) == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : Number(selectedPostDetail?.basicEngagementRateChangePercent) < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : Number(selectedPostDetail?.basicEngagementRateChangePercent) > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}

                                                                {!isNaN(Number(selectedPostDetail?.basicEngagementRateChangePercent))
                                                                    ? `${(Number(selectedPostDetail?.basicEngagementRateChangePercent)?.toFixed(2))}%`
                                                                    : 'NA'}
                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Basic Engagement Rate</span>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("PIWE");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "32%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", marginBottom: "-15px" }}>
                                                    <ZupotsuTooltip
                                                        tooltipMessage={"A weighted engagement rate assigns different values to various interactions (likes, comments, shares, etc.) to provide a more nuanced understanding of audience engagement, rather than simply counting each interaction equally"}
                                                        icon={infoCircle}
                                                    />
                                                </div>
                                                <img src={engageRate} style={{
                                                    width: 30,
                                                    height: 30,
                                                }} />
                                                <span style={spanStyle}>

                                                    {selectedPostDetail?.weightedEngagementRate !== null &&
                                                        Number(selectedPostDetail?.weightedEngagementRate) !== 0 &&
                                                        selectedPostDetail?.weightedEngagementRate !== undefined && !isNaN(Number(selectedPostDetail?.weightedEngagementRate))
                                                        ? `${Number(selectedPostDetail?.weightedEngagementRate)?.toFixed(2)}%`
                                                        : 'NA'}
                                                </span>
                                                {(selectedPost) && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.weightedEngagementRateChangePercent || selectedPostDetail?.weightedEngagementRateChangePercent == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.weightedEngagementRateChangePercent == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.weightedEngagementRateChangePercent < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.weightedEngagementRateChangePercent > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {!isNaN(Number(selectedPostDetail?.weightedEngagementRateChangePercent)) ? selectedPostDetail?.weightedEngagementRateChangePercent : "NA"}
                                                                {!isNaN(Number(selectedPostDetail?.weightedEngagementRateChangePercent)) && "%"}

                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Weighted Engagement Rate</span>
                                            </div>
                                            <div onClick={() => {
                                                setOpenChartPopup(true);
                                                setChartName("PIIE");
                                            }} style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "32%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", marginBottom: "-15px" }}>
                                                    <ZupotsuTooltip
                                                        tooltipMessage={"Impressions engagement rate refers to the percentage of users who engaged with a single post during its lifetime, divided by its number of impressions"}
                                                        icon={infoCircle}
                                                    />
                                                </div>
                                                <img src={engageRate} style={{
                                                    width: 30,
                                                    height: 30,
                                                }} />
                                                <span style={spanStyle}>

                                                    {selectedPostDetail?.impressionEngagementRate !== null &&
                                                        Number(selectedPostDetail?.impressionEngagementRate) !== 0 &&
                                                        selectedPostDetail?.impressionEngagementRate !== undefined && !isNaN(Number(selectedPostDetail?.impressionEngagementRate))
                                                        ? `${Number(selectedPostDetail?.impressionEngagementRate)?.toFixed(2)}%`
                                                        : 'NA'}

                                                </span>
                                                {(selectedPost) && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.impressionEngagementRateChangePercent || selectedPostDetail?.impressionEngagementRateChangePercent == 0) ? (

                                                            <>
                                                                {selectedPostDetail?.impressionEngagementRateChangePercent == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.impressionEngagementRateChangePercent < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.impressionEngagementRateChangePercent > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {/* {selectedPostDetail?.impressionEngagementRateChangePercent}
                                                                {!isNaN(Number(selectedPostDetail?.impressionEngagementRateChangePercent)) && "%"} */}
                                                                {
                                                                    Number.isFinite(Number(selectedPostDetail?.impressionEngagementRate))
                                                                        ? `${Number(selectedPostDetail.impressionEngagementRate).toFixed(2)}%`
                                                                        : 'NA'
                                                                }
                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Impression Engagement Rate</span>
                                            </div>
                                        </div>
                                    </div>)}
                                    {(selectedType == "hashtag" && campaignData?.tags?.length > 0) && (<div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '100%', gap: '10px', flexWrap: "wrap" }}>


                                        <div
                                            onClick={() => {
                                                setOpenChartPopup(true);
                                                setChartName("HIMC");
                                            }}
                                            style={{ ...divstyle, }}>
                                            <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>

                                            </div>
                                            <img src={visibility} style={{
                                                width: 25.5,
                                                height: 28.5,
                                            }} />
                                            <span style={spanStyle}>{selectedPostDetail?.media_count ? formatNumber(selectedPostDetail?.media_count) : "NA"}</span>
                                            {(selectedPost) && (
                                                <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                    {(selectedPostDetail?.mediaChange || selectedPostDetail?.mediaChange == 0) ? (
                                                        <>
                                                            {selectedPostDetail?.mediaChange == 0 ? (
                                                                <img
                                                                    src={growth}
                                                                    alt="growth"
                                                                    style={{
                                                                        filter: "grayscale(100%)",
                                                                        transform: "rotate(20deg)",
                                                                        marginRight: "5px",
                                                                    }}
                                                                />
                                                            ) : selectedPostDetail?.mediaChange < 0 ? (
                                                                <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                            ) : selectedPostDetail?.mediaChange > 0 ? (
                                                                <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                            ) : (
                                                                <></>
                                                            )}
                                                            {formatNumber(selectedPostDetail?.mediaChange)}
                                                        </>
                                                    ) : (
                                                        "NA"
                                                    )}
                                                </span>
                                            )}
                                            <span style={span1Style}>Media Count</span>
                                        </div>


                                    </div>)}

                                    {/* {(selectedType == "post" && campaignData?.posts?.length == 0) && <NoData ErrorData={ErrorData} />} */}
                                    {/* {(selectedType == "hashtag" && campaignData?.tags?.length == 0) && <NoData ErrorData={ErrorData} />} */}
                                </div>
                            ) : (
                                (campaignData && campaignData?.brand_acc && campaignData?.asset_acc) && (<div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', borderStyle: 'solid', borderWidth: '0px', width: '100%', gap: '20px', borderRadius: '16px' }}>

                                    <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '20px', }}>

                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '20px', overflowX: "scroll", scrollbarWidth: "none" }}>
                                            <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '80%', gap: '20px', overflowX: "scroll", scrollbarWidth: "none" }}>
                                                <span
                                                    onClick={() => {
                                                        setSelectedPost("all");
                                                    }}
                                                    style={{
                                                        ...selectionstyle,
                                                        color: selectedPost === "all" ? "#E20B18" : "#828282",
                                                        border: selectedPost === "all" ? "1px solid #E20B18" : "1px solid #828282",
                                                    }}
                                                >
                                                    {"All"}
                                                </span>
                                                {brandInsightsposts.map((item: any, index: any) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedPost(item);
                                                            setSelectedPostDetail(allbrandInsights[index])
                                                            setSelectedIndex(index)
                                                        }}
                                                        style={{
                                                            ...selectionstyle,
                                                            color: selectedPost === item ? "#E20B18" : "#828282",
                                                            border: selectedPost === item ? "1px solid #E20B18" : "1px solid #828282",
                                                        }}
                                                    >
                                                        {item}
                                                    </div>
                                                ))}

                                            </div>
                                            <input
                                                style={{
                                                    width: deviceType == "mobile" ? "100%" : '150px',
                                                    padding: '10px',
                                                    fontFamily: 'Inter',
                                                    fontSize: '15px',
                                                    height: "40px",
                                                    border: "1px solid rgba(0,0,0,0.5)",
                                                    borderRadius: "5px"
                                                }}
                                                type="date"
                                                id="date"
                                                value={selectDate}
                                                onChange={handleDateChange}
                                                min={minDate}
                                                max={maxDate}
                                            />
                                        </div>

                                    </div>
                                    <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '100%', gap: '10px', flexWrap: "wrap" }}>
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: deviceType == "mobile" ? "flex-start" : "space-between", borderStyle: 'solid', width: '100%', gap: '10px', flexWrap: "wrap" }}>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIALC");
                                                }}

                                                style={{ ...divstyle, }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>

                                                </div>
                                                <img src={favoriteLike} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                {(selectedPost == "all") ? (
                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[0]?.avg_likes_count
                                                                    ? formatNumber(selectedPostDetail[0]?.avg_likes_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.avgLikeChange || selectedPostDetail[0]?.changes?.avgLikeChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.avgLikeChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.avgLikeChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.avgLikeChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.avgLikeChange)}

                                                                    </>
                                                                ) : (
                                                                    "NA"
                                                                )}
                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[1]?.avg_likes_count
                                                                    ? formatNumber(selectedPostDetail[1]?.avg_likes_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.avgLikeChange || selectedPostDetail[1]?.changes?.avgLikeChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.avgLikeChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.avgLikeChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.avgLikeChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.avgLikeChange)}

                                                                    </>
                                                                ) : (
                                                                    "NA"
                                                                )}
                                                            </span>)}
                                                        </div>
                                                    </div>

                                                ) : (<span style={spanStyle}>{selectedPostDetail?.avg_likes_count ? formatNumber(selectedPostDetail?.avg_likes_count) : "NA"}</span>)}
                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.avgLikeChange || selectedPostDetail?.avgLikeChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.avgLikeChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.avgLikeChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.avgLikeChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {/* {selectedPostDetail?.avgLikeChangePercent}{selectedPostDetail?.avgLikeChangePercent && ("%")}
                                                                 */}
                                                                {formatNumber(selectedPostDetail?.avgLikeChange)}

                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Average Likes</span>
                                            </div>

                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIACC");
                                                }}
                                                style={{ ...divstyle, }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>

                                                </div>
                                                <img src={chat} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                {(selectedPost == "all") ? (
                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[0]?.avg_comments_count
                                                                    ? formatNumber(selectedPostDetail[0]?.avg_comments_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.avgCommentChange || selectedPostDetail[0]?.changes?.avgCommentChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.avgCommentChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.avgCommentChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.avgCommentChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.avgCommentChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[1]?.avg_comments_count
                                                                    ? formatNumber(selectedPostDetail[1]?.avg_comments_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.avgCommentChange || selectedPostDetail[1]?.changes?.avgCommentChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.avgCommentChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.avgCommentChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.avgCommentChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.avgCommentChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>
                                                    </div>


                                                ) : (
                                                    <span style={spanStyle}>{selectedPostDetail?.avg_comments_count ? formatNumber(selectedPostDetail?.avg_comments_count) : "NA"}</span>)}

                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.avgCommentChange || selectedPostDetail?.avgCommentChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.avgCommentChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.avgCommentChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.avgCommentChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {formatNumber(selectedPostDetail?.avgCommentChange)}                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}

                                                    </span>
                                                )}
                                                <span style={span1Style}>Average Comments</span>
                                            </div>

                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIASC");
                                                }}
                                                style={{ ...divstyle, }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>

                                                </div>
                                                <img src={share} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                {(selectedPost == "all") ? (
                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[0]?.avg_shares_count
                                                                    ? formatNumber(selectedPostDetail[0]?.avg_shares_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.avgShareChange || selectedPostDetail[0]?.changes?.avgShareChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.avgShareChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.avgShareChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.avgShareChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.avgShareChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[1]?.avg_shares_count
                                                                    ? formatNumber(selectedPostDetail[1]?.avg_shares_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.avgShareChange || selectedPostDetail[1]?.changes?.avgShareChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.avgShareChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.avgShareChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.avgShareChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.avgShareChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>
                                                    </div>

                                                ) : (
                                                    <span style={spanStyle}>{selectedPostDetail?.avg_shares_count ? formatNumber(selectedPostDetail?.avg_shares_count) : "NA"}</span>
                                                )}

                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.avgShareChange || selectedPostDetail?.avgShareChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.avgShareChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.avgShareChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.avgShareChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}

                                                                {!isNaN(Number(selectedPostDetail?.avgShareChange))
                                                                    ? `${formatNumber(Number(selectedPostDetail?.avgShareChange))}`
                                                                    : 'NA'}
                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Average Shares</span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: deviceType == "mobile" ? "column" : 'row', alignItems: "flex-start", justifyContent: deviceType == "mobile" ? "flex-start" : "space-between", borderStyle: 'solid', width: '100%', gap: '10px', }}>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIAVC");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "49%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>

                                                </div>
                                                <img src={visibility} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                {(selectedPost == "all") ? (


                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px", }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[0]?.avg_views_count
                                                                    ? formatNumber(selectedPostDetail[0]?.avg_views_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.avgViewChange || selectedPostDetail[0]?.changes?.avgViewChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.avgViewChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.avgViewChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.avgViewChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.avgViewChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[1]?.avg_views_count
                                                                    ? formatNumber(selectedPostDetail[1]?.avg_views_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.avgViewChange || selectedPostDetail[1]?.changes?.avgViewChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.avgViewChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.avgViewChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.avgViewChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.avgViewChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span style={spanStyle}>{selectedPostDetail?.avg_views_count ? formatNumber(selectedPostDetail?.avg_views_count) : "NA"}</span>
                                                )}

                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.avgViewChange || selectedPostDetail?.avgViewChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.avgViewChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.avgViewChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.avgViewChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}

                                                                {!isNaN(Number(selectedPostDetail?.avgViewChange))
                                                                    ? `${formatNumber(Number(selectedPostDetail?.avgViewChange))}`
                                                                    : 'NA'}
                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Average Views</span>
                                            </div>

                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIPC");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "49%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>

                                                </div>
                                                <img src={folloers} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                {(selectedPost == "all") ? (

                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[0]?.posts_count
                                                                    ? formatNumber(selectedPostDetail[0]?.posts_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.postCountChange || selectedPostDetail[0]?.changes?.postCountChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.postCountChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.postCountChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.postCountChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.postCountChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[1]?.posts_count
                                                                    ? formatNumber(selectedPostDetail[1]?.posts_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.postCountChange || selectedPostDetail[1]?.changes?.postCountChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.postCountChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.postCountChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.postCountChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.postCountChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span style={spanStyle}>{selectedPostDetail?.posts_count ? formatNumber(selectedPostDetail?.posts_count) : "NA"}</span>
                                                )}
                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.postCountChange || selectedPostDetail?.postCountChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.postCountChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.postCountChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.postCountChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}

                                                                {!isNaN(Number(selectedPostDetail?.postCountChange))
                                                                    ? `${formatNumber(Number(selectedPostDetail?.postCountChange))}`
                                                                    : 'NA'}
                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Posts</span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: deviceType == "mobile" ? "column" : 'row', alignItems: "flex-start", justifyContent: deviceType == "mobile" ? "flex-start" : "space-between", borderStyle: 'solid', width: '100%', gap: '10px', }}>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIFC");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "49%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>

                                                </div>
                                                <img src={folloers} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                {(selectedPost == "all") ? (

                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[0]?.followers_count
                                                                    ? formatNumber(selectedPostDetail[0]?.followers_count)
                                                                    : "NA"}
                                                            </span>
                                                            {((selectedPostDetail && Array.isArray(selectedPostDetail))) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.followerChange || selectedPostDetail[0]?.changes?.followerChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.followerChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.followerChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.followerChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.followerChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[1]?.followers_count
                                                                    ? formatNumber(selectedPostDetail[1]?.followers_count)
                                                                    : "NA"}
                                                            </span>
                                                            {((selectedPostDetail && Array.isArray(selectedPostDetail))) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.followerChange || selectedPostDetail[1]?.changes?.followerChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.followerChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.followerChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.followerChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.followerChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>
                                                    </div>

                                                ) : (
                                                    <span style={spanStyle}>{selectedPostDetail?.followers_count ? formatNumber(selectedPostDetail?.followers_count) : "NA"}</span>
                                                )}
                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.followerChange || selectedPostDetail?.followerChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.followerChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.followerChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.followerChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}

                                                                {!isNaN(Number(selectedPostDetail?.followerChange))
                                                                    ? `${formatNumber(Number(selectedPostDetail?.followerChange))}`
                                                                    : 'NA'}
                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Followers</span>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIFGC");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "49%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", }}>

                                                </div>
                                                <img src={folloers} style={{
                                                    width: 25.5,
                                                    height: 28.5,
                                                }} />
                                                {(selectedPost == "all") ? (
                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[0]?.following_count
                                                                    ? formatNumber(selectedPostDetail[0]?.following_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.followingChange || selectedPostDetail[0]?.changes?.followingChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.followingChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.followingChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.followingChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.followingChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[1]?.following_count
                                                                    ? formatNumber(selectedPostDetail[1]?.following_count)
                                                                    : "NA"}
                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.followingChange || selectedPostDetail[1]?.changes?.followingChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.followingChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.followingChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.followingChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.followingChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>
                                                    </div>

                                                ) : (
                                                    <span style={spanStyle}>{selectedPostDetail?.following_count ? formatNumber(selectedPostDetail?.following_count) : "NA"}</span>
                                                )}

                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.followingChange || selectedPostDetail?.followingChange == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.followingChange == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.followingChange < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.followingChange > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {formatNumber(selectedPostDetail?.followingChange)}
                                                            </>
                                                        ) : (
                                                            // "NA"
                                                            <>
                                                                {formatNumber(selectedPostDetail?.followingChange)}
                                                            </>
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Following</span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: deviceType == "mobile" ? "column" : 'row', alignItems: "flex-start", justifyContent: deviceType == "mobile" ? "flex-start" : "space-between", borderStyle: 'solid', width: '100%', gap: '10px', }}>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIBER");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "32%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", marginBottom: "-15px" }}>
                                                    <ZupotsuTooltip
                                                        tooltipMessage={"The engagement rate is calculated as the total number of interactions your content receives divided by your total number of followers, multiplied by 100%"}
                                                        icon={infoCircle}
                                                    />
                                                </div>
                                                <img src={engageRate} style={{
                                                    width: 30,
                                                    height: 30,
                                                }} />
                                                {(selectedPost == "all") ? (
                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>

                                                                {
                                                                    Array.isArray(selectedPostDetail) &&
                                                                        !isNaN(Number(selectedPostDetail[0]?.basicEngagementRate))
                                                                        ? `${Number(selectedPostDetail[0].basicEngagementRate).toFixed(2)}%`
                                                                        : "NA"
                                                                }

                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.basicEngagementRateChange || selectedPostDetail[0]?.changes?.basicEngagementRateChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.basicEngagementRateChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.basicEngagementRateChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.basicEngagementRateChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.basicEngagementRateChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {
                                                                    Array.isArray(selectedPostDetail) &&
                                                                        !isNaN(Number(selectedPostDetail[1]?.basicEngagementRate))
                                                                        ? `${Number(selectedPostDetail[1].basicEngagementRate).toFixed(2)}%`
                                                                        : "NA"
                                                                }

                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.basicEngagementRateChange || selectedPostDetail[1]?.changes?.basicEngagementRateChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.basicEngagementRateChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.basicEngagementRateChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.basicEngagementRateChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.basicEngagementRateChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>
                                                    </div>

                                                ) : (
                                                    <span style={spanStyle}>

                                                        {
                                                            !isNaN(Number(selectedPostDetail?.basicEngagementRate))
                                                                ? `${Number(selectedPostDetail.basicEngagementRate).toFixed(2)}%`
                                                                : 'NA'
                                                        }

                                                    </span>
                                                )}
                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.basicEngagementRateChangePercent || selectedPostDetail?.basicEngagementRateChangePercent == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.basicEngagementRateChangePercent == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.basicEngagementRateChangePercent < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.basicEngagementRateChangePercent > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}

                                                                {!isNaN(Number(selectedPostDetail?.basicEngagementRateChangePercent))
                                                                    ? `${Number(selectedPostDetail?.basicEngagementRateChangePercent)}%`
                                                                    : 'NA'}
                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Basic Engagement Rate</span>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIWER");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "32%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", marginBottom: "-15px" }}>
                                                    <ZupotsuTooltip
                                                        tooltipMessage={"A weighted engagement rate assigns different values to various interactions (likes, comments, shares, etc.) to provide a more nuanced understanding of audience engagement, rather than simply counting each interaction equally"}
                                                        icon={infoCircle}
                                                    />
                                                </div>
                                                <img src={engageRate} style={{
                                                    width: 30,
                                                    height: 30,
                                                }} />
                                                {(selectedPost == "all") ? (


                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {
                                                                    Array.isArray(selectedPostDetail) &&
                                                                        !isNaN(Number(selectedPostDetail[0]?.weightedEngagementRate))
                                                                        ? `${Number(selectedPostDetail[0].weightedEngagementRate).toFixed(2)}%`
                                                                        : "NA"
                                                                }

                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.weightedEngagementRateChange || selectedPostDetail[0]?.changes?.weightedEngagementRateChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.weightedEngagementRateChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.weightedEngagementRateChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.weightedEngagementRateChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.weightedEngagementRateChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[1]?.weightedEngagementRate
                                                                    ? `${selectedPostDetail[1]?.weightedEngagementRate?.toFixed(2)}%`
                                                                    : "NA"}
                                                            </span>
                                                            {(selectedPostDetail && Array.isArray(selectedPostDetail)) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.weightedEngagementRateChange || selectedPostDetail[1]?.changes?.weightedEngagementRateChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.weightedEngagementRateChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.weightedEngagementRateChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.weightedEngagementRateChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.weightedEngagementRateChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}

                                                            </span>)}
                                                        </div>
                                                    </div>

                                                ) : (
                                                    <span style={spanStyle}>

                                                        {
                                                            !isNaN(Number(selectedPostDetail?.weightedEngagementRate))
                                                                ? `${Number(selectedPostDetail.weightedEngagementRate).toFixed(2)}%`
                                                                : 'NA'
                                                        }


                                                    </span>
                                                )}
                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.weightedEngagementRateChangePercent || selectedPostDetail?.weightedEngagementRateChangePercent == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.weightedEngagementRateChangePercent == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.weightedEngagementRateChangePercent < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.weightedEngagementRateChangePercent > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {!isNaN(Number(selectedPostDetail?.weightedEngagementRateChangePercent))
                                                                    ? `${Number(selectedPostDetail?.weightedEngagementRateChangePercent)}%`
                                                                    : 'NA'}
                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Weighted Engagement Rate</span>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setOpenChartPopup(true);
                                                    setChartName("BIIER");
                                                }}
                                                style={{ ...divstyle, width: deviceType == "mobile" ? "100%" : "32%" }}>
                                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "flex-end", marginBottom: "-15px" }}>
                                                    <ZupotsuTooltip
                                                        tooltipMessage={"Impressions engagement rate refers to the percentage of users who engaged with a single post during its lifetime, divided by its number of impressions"}
                                                        icon={infoCircle}
                                                    />
                                                </div>
                                                <img src={engageRate} style={{
                                                    width: 30,
                                                    height: 30,
                                                }} />
                                                {(selectedPost == "all") ? (

                                                    <div style={{ ...spanStyle, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", fontSize: '14px', width: "80%" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[0] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {
                                                                    Array.isArray(selectedPostDetail) &&
                                                                        !isNaN(Number(selectedPostDetail[0]?.impressionEngagementRate))
                                                                        ? `${Number(selectedPostDetail[0]?.impressionEngagementRate).toFixed(2)}%`
                                                                        : "NA"
                                                                }

                                                            </span>
                                                            {((selectedPostDetail && Array.isArray(selectedPostDetail))) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[0]?.changes?.impressionEngagementRateChange || selectedPostDetail[0]?.changes?.impressionEngagementRateChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[0]?.changes?.impressionEngagementRateChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[0]?.changes?.impressionEngagementRateChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[0]?.changes?.impressionEngagementRateChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[0]?.changes?.impressionEngagementRateChange)}                                                            </>
                                                                ) : (
                                                                    "NA"
                                                                )}
                                                            </span>)}
                                                        </div>

                                                        <span>|</span>

                                                        <div style={{ display: "flex", flexDirection: "column", width: '50%', overflow: "scroll", scrollbarWidth: "none" }}>
                                                            <span style={{ ...span1Style, margin: 0, padding: 0, lineHeight: "21px", fontSize: "10px" }}>{brandInsightsposts[1] || "NA"}</span>
                                                            <span style={{ margin: 0, padding: 0, lineHeight: "21px", fontSize: "15px" }}>
                                                                {Array.isArray(selectedPostDetail) && selectedPostDetail[1]?.impressionEngagementRate
                                                                    ? `${selectedPostDetail[1]?.impressionEngagementRate?.toFixed(2)}%`
                                                                    : "NA"}
                                                            </span>
                                                            {((selectedPostDetail && Array.isArray(selectedPostDetail))) && (<span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                                {(selectedPostDetail[1]?.changes?.impressionEngagementRateChange || selectedPostDetail[1]?.changes?.EngagementRateChange == 0) ? (
                                                                    <>
                                                                        {selectedPostDetail[1]?.changes?.impressionEngagementRateChange == 0 ? (
                                                                            <img
                                                                                src={growth}
                                                                                alt="growth"
                                                                                style={{
                                                                                    filter: "grayscale(100%)",
                                                                                    transform: "rotate(20deg)",
                                                                                    marginRight: "5px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPostDetail[1]?.changes?.impressionEngagementRateChange < 0 ? (
                                                                            <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                        ) : selectedPostDetail[1]?.changes?.impressionEngagementRateChange > 0 ? (
                                                                            <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                        {formatNumber(selectedPostDetail[1]?.changes?.impressionEngagementRateChange)}
                                                                    </>
                                                                ) : (
                                                                    "NA"
                                                                )}
                                                            </span>)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span style={spanStyle}>

                                                        {
                                                            !isNaN(Number(selectedPostDetail?.impressionEngagementRate))
                                                                ? `${Number(selectedPostDetail.impressionEngagementRate).toFixed(2)}%`
                                                                : 'NA'
                                                        }

                                                    </span>
                                                )}
                                                {(selectedPost !== "all") && (
                                                    <span style={{ ...spanStyle, fontSize: "10px", lineHeight: "19px" }}>
                                                        {(selectedPostDetail?.impressionEngagementRateChangePercent || selectedPostDetail?.impressionEngagementRateChangePercent == 0) ? (
                                                            <>
                                                                {selectedPostDetail?.impressionEngagementRateChangePercent == 0 ? (
                                                                    <img
                                                                        src={growth}
                                                                        alt="growth"
                                                                        style={{
                                                                            filter: "grayscale(100%)",
                                                                            transform: "rotate(20deg)",
                                                                            marginRight: "5px",
                                                                        }}
                                                                    />
                                                                ) : selectedPostDetail?.impressionEngagementRateChangePercent < 0 ? (
                                                                    <img src={fall} alt="fall" style={{ marginRight: "5px" }} />
                                                                ) : selectedPostDetail?.impressionEngagementRateChangePercent > 0 ? (
                                                                    <img src={growth} alt="growth" style={{ marginRight: "5px" }} />
                                                                ) : (
                                                                    <></>
                                                                )}

                                                                {/* {
                                                                    !isNaN(Number(selectedPostDetail?.impressionEngagementRate))
                                                                        ? `${Number(selectedPostDetail.impressionEngagementRate).toFixed(2)}%`
                                                                        : 'NA'
                                                                } */}

                                                                {
                                                                    Number.isFinite(Number(selectedPostDetail?.impressionEngagementRate))
                                                                        ? `${Number(selectedPostDetail.impressionEngagementRate).toFixed(2)}%`
                                                                        : 'NA'
                                                                }

                                                            </>
                                                        ) : (
                                                            "NA"
                                                        )}
                                                    </span>
                                                )}
                                                <span style={span1Style}>Impression Engagement Rate</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            )}
                        </div>
                    </div>



                    {(selectedInsights == "Campaign Insights") && (
                        (campaignData?.posts?.length > 0 || campaignData?.tags?.length > 0) ? (
                            <CampaignInsights
                                selectedPostDetail={selectedPostDetail}
                                postdates={postDatess}
                                postColors={postColors}
                                postlikes={postLikess}
                                postComments={postComments}
                                postShares={postShares}
                                postengagement={postEngagement}
                                postmedia={postMedia}
                                postshare={postShares}
                                postView={postView}
                                postbasicEng={postbasicEng}
                                postimpressEng={postimpressEng}
                                postweightEng={postweightEng}
                                postSData={postSData}

                                selectedType={selectedType}
                                hashtagDates={hashtagDates}
                                hashtagColors={hashtagColors}
                                hashtagLikess={hashtagLikess}
                                hashtagComments={hashtagComments}
                                hashtagShares={hashtagShares}
                                hashtagMedia={hashtagMedia}
                                hashtagView={hashtagView}
                                hashtagEngagement={hashtagEngagement}
                                hashtagbasicEng={hashtagbasicEng}
                                hashtagimpressEng={hashtagimpressEng}
                                hashtagweightEng={hashtagweightEng}

                                postselDates={postselDates}
                                hashselDates={hashselDates}
                                minDat={minDat}
                                maxDat={maxDat}

                                allPostsData={allPostsData}
                                allHashtagsData={allHashtagsData}

                                openChartPopup={openChartPopup}
                                setOpenChartPopup={setOpenChartPopup}
                                chartname={chartname}
                                selectedPost={selectedPost}
                                // handleDownloadPDF={handleDownloadPDF}
                                handleDownloadPDF={() => { }}
                            />) : (<NoData ErrorData={ErrorData} />)
                    )}

                    {(selectedInsights == "Brand Insights") && (
                        (campaignData && campaignData?.brand_acc && campaignData?.asset_acc) ? (<BrandInsights
                            selectedPostDetail={selectedPostDetail}
                            brandDates={selectedPost == "all" ? multiGraphData[0]?.dates : brandDates}
                            brandColors={brandColors}
                            brandLikess={brandLikess}
                            brandComments={brandComments}
                            brandShares={brandShares}
                            brandPosts={brandPosts}
                            brandView={brandView}
                            brandFollowers={brandFollowers}
                            brandFollowing={brandFollowing}
                            brandbasicEngagementRate={brandbasicEngagementRate}
                            brandimpressionEngagementRate={brandimpressionEngagementRate}
                            brandweightedEngagementRate={brandweightedEngagementRate}
                            openChartPopup={openChartPopup}
                            setOpenChartPopup={setOpenChartPopup}
                            postselDates={postselDates}
                            chartname={chartname}
                            allbrandInsightsData={allbrandInsightsData}
                            minDat={minDat}
                            maxDat={maxDat}
                            multiGraphData={multiGraphData}
                            selectedPost={selectedPost}
                            selectedIndex={selectedIndex}
                            brandInsightsposts={brandInsightsposts}
                            // handleDownloadPDF={handleDownloadPDF}
                            handleDownloadPDF={() => { }}
                        />) : (<NoData ErrorData={ErrorData} />)
                    )}

                </div>

            </Grid >

        )
    }
    else {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }

}

export default Brandanalysis
