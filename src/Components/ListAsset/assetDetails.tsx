import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Modal, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import Apis from '../../services/apis';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.css';
import { Container, Row, Col } from 'react-bootstrap';
import sports from "../../assets/sports.svg"
import { OppTextUnderlineUtil } from '../../utils/constantComponents';
import useDeviceType from '../../utils/DeviceType';
import Gradient from '../../assets/gradient.png';
import { down, arrowUp, facebookIcon, NewInstagram, twitterx, GlobalB, YoutubeIcon, zup, istats, xstats, ystats, growth, fall, fb, tiktok, blog, fbred, instared, xred, ytred, tiktokred, wbred, blogred, presentationDeckIcon, ArrowrightRed, SandClock, fball1, fball2 } from '../../assets';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { documentUpload } from "../../assets";
import Fab from '@mui/material/Fab';
import { touch2 } from '../../assets';
import ZoptsuFooter from '../../Molecules/zoptsu-footer/zoptsu-footer';
import { ArrowBack, Close } from '@mui/icons-material';
import bgImage from '../../assets/bg4.png';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ZoputsuGetInTouch2 from '../../Atoms/zoputsugetintouch/zoputsugetintouch2';
import ZoputsuGetInTouch1 from '../../Atoms/zoputsugetintouch/zoputsugetintouch1';
import ZupotsuLinks from '../../Atoms/zupotsu-links/zupotsu-links';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';


// Define interfaces for type safety
interface AssetData {
    Media?: Array<{ media_url: string }>;
    [key: string]: any; // This allows for additional properties
}

interface OpportunityData {
    opportunity_media?: Array<{ media_url: string }>;
    [key: string]: any; // This allows for additional properties
}

const AssetDetails: React.FC = () => {
    const deviceType = useDeviceType();
    const [load, setLoad] = useState<boolean>(false);
    const [assetData, setAssetData] = useState<AssetData>({});
    const [opportunityData, setOpportunityData] = useState<any>([]);
    const apis = new Apis();
    const [searchParams] = useSearchParams();
    const [more, setMore] = useState(false)
    const id = searchParams.get('id') ?? '';
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredId, setIsHoveredId] = useState('');
    const [selId, setSelId] = useState(0);
    const navigation = useNavigate()
    const team: any = ["Sports Format", "Country", "State", "City", "Participation In", "Affiliation", "Notable Players", "Availability/Timeline", "Exclusivity", "Last Date Of Confirmation"]
    const teamMore: any = ["Audience Age", "Audience Gender", "Audience Class", "Promotional Plan", "Geographical Span"]

    const athelete: any = ["Age", "Gender", "Sports Format", "Playing Status", "Country", "State", "City", "Teams Represented", "Exclusivity", "Availability/Timeline"]
    const atheleteMore: any = ["Audience Age", "Audience Gender", "Audience Class", "Geographical Span"]

    const tournament: any = ["Dates From", "Dates To", "Dates Confirmation", "Sports Format", "Edition", "Affiliation", "Organised By", "Host Countries", "Host Cities", "Exclusivity", "Represented By", "Last Date Of Confirmation"]
    const tournamentMore: any = ["Audience Age", "Audience Gender", "Audience Class", "Geographical Span", "Live Content Plan", "Plan Details", "Promotional Plan", "Platform(s)", "On Ground Viewership", "Reach Estimate", "Online Viewership"]

    const content: any = ["Start Date", "Produced By", "Sports Format", "Affiliation", "Country", "State", "City", "Primary Languages", "Subtitle Languages", "Additional Languages", "Exclusivity", "Represented By", "Last Date Of Confirmation"]
    const contentMore: any = ["Audience Age", "Audience Gender", "Audience Class", "Geographical Span", "Live Content Plan", "Plan Details", "Promotional Plan", "Platform(s)", "Reach Estimate",]

    const isSeller = (localStorage.getItem("role")?.toLowerCase() === "seller") ? true : false;
    const isSellerAdmin = (localStorage.getItem("role")?.toLowerCase() === "seller-admin") ? true : false;
    const isAdmin = (localStorage.getItem("role")?.toLowerCase() === "admin" || localStorage.getItem("role")?.toLowerCase() === "publisher" || localStorage.getItem("role")?.toLowerCase() === "approver") ? true : false;
    const isBuyer = (localStorage.getItem("role")?.toLowerCase() === "buyer") ? true : false;
    const isQuickReg = (localStorage.getItem("role")?.toLowerCase() === "quick-reg") ? true : false;
    const [CurrencyData, setCurrencyData] = useState([]);
    const [Currency, setCurrency] = useState('');
    const [dialog, setDialog] = useState<any>(false)
    const [showZoputsuGetInTouchPopup, setShowZoputsuGetInTouchPopup] = useState<boolean>(false);
    const [showZoputsuGetInTouchPopup2, setShowZoputsuGetInTouchPopup2] = useState<boolean>(false);
    const [head, setHead] = useState<any>()
    const [desc, setDesc] = useState<any>()
    const isCatalogue = searchParams.get('screen') == "catalogue" ? true : false;
    const isBanner = searchParams.get('type') == "banner" ? true : false;
    const isTray = searchParams.get('type') == "tray" ? true : false;
    const trayname = searchParams.get('trayname');
    const priority = searchParams.get('priority');
    const [selGT, setselGT] = useState('');
    const [selOppr, setselOppr] = useState('');
    const [pitchDeskLink, setPitchDeskLink] = useState<any>();
    const [sellerId, setSellerId] = useState('');
    const [sellerOrgId, setSellerOrgId] = useState('');
    const [assetZohoId, setAssetZohoId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const cat = searchParams.get('cat')
    const formatDate = (dateString: string): string => {
        const monthMap: { [key: string]: string } = {
            "01": "Jan",
            "02": "Feb",
            "03": "Mar",
            "04": "Apr",
            "05": "May",
            "06": "Jun",
            "07": "Jul",
            "08": "Aug",
            "09": "Sep",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec"
        };

        const [month, year] = dateString.split('/');
        const formattedMonth = monthMap[month];

        return `${formattedMonth} ${year}`;
    };

    const style: any = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "#FFF",
        border: '0px solid #000',
        borderRadius: '8px',
        divShadow: 24,
        fontFamily: 'Inter'
    };

    const linkDetails =
        isCatalogue ? [
            {
                label: 'Catalogue',
                url: '/catalogue',
            },
            {
                label: 'Asset Details',
                url: '',
            },
        ] : [
            {
                label: 'Catalogue Management',
                url: '/catalogue-management',
            },
            {
                label: 'Asset Details',
                url: '',
            },
        ];

    function convertKeysToTitleCase(obj: any) {
        const newObj: any = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                // Replace underscores with spaces and convert to Title Case
                const titleCaseKey = key == "availability_timeline" ? 'Availability/Timeline'
                    : key == "platform_s_" ? "Platform(s)"
                        : key
                            .replace(/_/g, ' ')
                            .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before camelCase words
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase())
                            .join(' ');
                if (titleCaseKey === "Opportunity Deliverables") {
                    newObj["deliverables"] = obj[key];
                } else if (titleCaseKey === "Opportunity Media") {
                    newObj["opportunity_media"] = obj[key];
                } else {
                    if (key == "availability_timeline") {

                        newObj[titleCaseKey] = obj[key]?.map(formatDate) || "";
                    } else {
                        newObj[titleCaseKey] = obj[key] || "";
                    }

                }
            }
        }

        return newObj;
    }

    const fetchCurrency = async () => {
        try {
            const assetsResponse = await apis.getCurrency();
            const curr: any = []
            if (assetsResponse?.data?.status?.toLowerCase() == "success") {
                setCurrencyData(assetsResponse?.data?.data)
                let i: any[] = assetsResponse?.data?.data?.filter((item: any) => item.name === localStorage.getItem("preferred_currency"));

                // Check if the filtered array is not empty and log the first item
                if (i && i.length > 0) {
                    setCurrency(i[0].symbol);
                }
            }

        } catch (error) {
            console.log("Error fetching assets or media:", error);
        }
    };

    function convertCurrency(amount: any, fromCurrency: any, toCurrency: any) {

        const exchangeRates: any = {}
        CurrencyData.map((item: any) => {
            exchangeRates[item.name] = item.value
        })


        if (fromCurrency === toCurrency) {
            return formatCurrency(amount, toCurrency);
        }

        const amountInINR = amount * exchangeRates[fromCurrency];
        const convertedAmount = amountInINR / exchangeRates[toCurrency];
        return formatCurrency(convertedAmount, toCurrency);
    }

    const formatCurrency = (amount: any, currency: string): string => {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return "NA";
        }

        if (typeof currency !== 'string' || !/^[A-Z]{3}$/.test(currency)) {
            return "NA";
        }

        try {
            if (currency === 'INR') {
                return formatINR(amount);
            } else {
                const options: Intl.NumberFormatOptions = {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                };
                return new Intl.NumberFormat('en-US', options).format(amount);
            }
        } catch (error) {
            return "NA";
        }
    };

    function formatINR(amount: number): string {
        const [integer, decimal] = amount.toFixed(2).split('.');
        const lastThree = integer.slice(-3);
        const otherNumbers = integer.slice(0, -3);
        const formattedNumber = amount == 0 ? 0 : (otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',').concat(',' + lastThree))
        return `₹${formattedNumber}`;
    }
    function formatNum(amount: number): string {
        if (amount) {
            const [integer, decimal] = amount.toFixed(2).split('.');
            const lastThree = integer.slice(-3);
            const otherNumbers = integer.slice(0, -3);
            const formattedNumber = amount == 0 ? 0 : amount < 999 ? amount : (otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',').concat(',' + lastThree))
            return `${formattedNumber}`;
        }
        else {
            return "NA"
        }
    }
    const [sellerObj, setSellerObj] = useState<any>();

    useEffect(() => {
        const startTime = performance.now();

        const fetchAndTrack = async () => {
            await AssetDetails();
            const loadTime = performance.now() - startTime;
            // console.log(loadTime, 'Asset Details',  "Tray",isTray ,"Banner", isBanner , trayname,priority )
            mixpanelEvents.onLoad(loadTime, 'Asset Details', isTray ? "Tray" : isBanner ? "Banner" : null, isTray ? (trayname || null) : "Banner", priority);
        };
        fetchAndTrack();

        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Asset Details', timeSpent);
        };
    }, []);

    const AssetDetails = () => {
        setLoad(true);
        fetchCurrency()
        apis.getAssetByID(id)
            .then((response: any) => {
                if (response?.data?.data?.asset_detail[0].asset_status !== "draft") {
                    let media: Array<{ media_url: string }> = [];
                    let coverImages: Array<{ media_url: string }> = [];
                    let socialHandles: Array<{ media_url: string }> = [];

                    response?.data?.data.asset_media?.forEach((item: any) => {
                        media.push(item);
                    });
                    response?.data?.data.asset_media?.forEach((item: any) => {
                        if (item.tags[0]?.toLowerCase().includes("cover"))
                            coverImages.push(item);
                    });
                    response?.data?.data.asset_media?.forEach((item: any) => {
                        if (item.tags[0]?.toLowerCase().includes("pitch"))
                            setPitchDeskLink(item)
                    });

                    const convertedData = convertKeysToTitleCase({
                        ...(response?.data?.data?.asset_detail[0] || {}),
                        ...(response?.data?.data[response?.data?.data.asset_type.name?.toLowerCase()][0] || {})
                    });

                    let ca: any = {};
                    response?.data?.data.asset_custom_attributes?.forEach((item: any) => {
                        if (item.attribute_type === "dateRangePicker") {
                            ca[item.attribute_name + " From"] = (item.attribute_value_range1) ? item.attribute_value_range1.split("T")[0] : "";
                            ca[item.attribute_name + " To"] = (item.attribute_value_range2) ? (item.attribute_value_range2.split("T"))[0] : "";
                        } else {
                            ca[item.attribute_name] = item.attribute_value_string ||
                                item.attribute_value_int ||
                                item.attribute_value_date ||
                                item.attribute_value_array || "";
                        }
                    });
                    response?.data?.data.asset_social_media?.map((item: any) => {
                        socialHandles.push(item)
                    })
                    setAssetData({ ...convertedData, ...ca, Media: media, Sport: response?.data?.data.sport[0], AssetType: response?.data?.data.asset_type.name, CoverImages: coverImages, SocialHandles: socialHandles });

                    const convertedData2 = response?.data?.data?.opportunities?.map((oppr: any) => convertKeysToTitleCase(oppr)) || [];
                    const anythingElse = convertedData2.filter((op: any) => op?.["Opportunity Type"] === 'Anything Else');
                    const others = convertedData2.filter((op: any) => op?.["Opportunity Type"] !== 'Anything Else');
                    const result = others.concat(anythingElse);
                    setOpportunityData(result);
                }
                else {
                    let coverImages: any = [];
                    let socialHandles: any = Object.entries(response?.data?.data.asset_detail[0].draft.socialLinks).map(([social_media_platform, url]) => ({
                        social_media_platform,
                        url
                    }));

                    response?.data?.data.asset_detail[0].draft.fileData?.forEach((item: any) => {
                        if (item.tags[0]?.toLowerCase().includes("cover"))
                            coverImages.push(item);
                    });
                    setAssetData(
                        {
                            ...response?.data?.data.asset_detail[0].draft.formdata,
                            Media: response?.data?.data.asset_detail[0].draft.fileData,
                            Sport: response?.data?.data.sport[0],
                            AssetType: response?.data?.data.asset_type.name,
                            CoverImages: coverImages,
                            SocialHandles: socialHandles
                        }
                    );
                    const anythingElse = response?.data?.data.asset_detail[0].draft.formdata2.filter((op: any) => op?.["Opportunity Type"] === 'Anything Else');
                    const others = response?.data?.data.asset_detail[0].draft.formdata2.filter((op: any) => op?.["Opportunity Type"] !== 'Anything Else');
                    const result = others.concat(anythingElse);
                    setOpportunityData(result);
                }
                setSellerObj(response?.data?.data?.seller)
                setSellerId(response?.data?.data?.seller_id)
                setSellerOrgId(response?.data?.data?.seller?.organization?.id)
                setAssetZohoId(response?.data?.data?.zoho_id)
                setLoad(false);
            })
            .catch((error) => {
                setLoad(false);
                mixpanelEvents.errorHandling({
                    name: 'Asset Details',
                    msg: error?.response?.data?.error || error?.message
                })
            });
    };


    function trimURL(url: string): string {
        const specificDomains = /^(https?:\/\/)?(www\.)?((facebook|instagram|twitter|linkedin|x)\.com\/|linkedin\.com\/in\/)/i;
        const genericParts = /^(https?:\/\/)?(www\.)?/i;
        let cleanedURL = url.replace(specificDomains, '').replace(genericParts, '');

        if (/linkedin\.com/i.test(url)) {
            cleanedURL = cleanedURL.replace(/^company\//, '');
        }
        cleanedURL = cleanedURL.split("?")[0]
        return cleanedURL;
    }


    const handleMouseOver = (id: any) => {
        setIsHovered(true)
        setIsHoveredId(id)
    };
    const handleMouseOut = () => setIsHovered(false);

    const [selType, setSelectedType] = useState('deliverables');
    const [sportsmedia, setSportsMedia] = useState<any>([])
    useEffect(() => {
        setLoad(true);
        if (assetData?.Sport) {
            const fetchMedia = async () => {
                try {
                    const mediaResponse = await apis.getSportsMedia();
                    const arrmedia = mediaResponse?.data?.data || [];

                    const media = arrmedia?.filter((item1: any) => {
                        return item1?.name?.trim()?.toLowerCase() === assetData?.Sport?.trim()?.toLowerCase();
                    });
                    setSportsMedia(media || [])

                } catch (error) {
                    console.log('Error fetching media:', error);
                } finally {
                    setLoad(false);
                }
            };

            fetchMedia();
        }
    }, [assetData]);

    const sortingStyles = {
        button: {
            background: '#E20B18',
            color: '#FFF',
            '&:hover': {
                backgroundColor: '#a9141d',
                color: '#fff',
            },
            cursor: "pointer"
        },
        tabButton: {
            padding: '10px',
            color: 'rgba(226, 11, 24, 1)',
            fontSize: '16px',
            borderBottom: ' 2px solid rgba(226, 11, 24, 1)',
            fontFamily: 'Inter',
            fontWeight: 600,
            cursor: "pointer"
        },
        tabButtonInactive: {
            padding: '10px',
            color: 'rgba(130, 130, 130, 1)',
            fontSize: '16px',
            fontFamily: 'Inter',
            fontWeight: 600,
            cursor: "pointer"
        }
    };

    const headers = ["Deliverables", "Specs of Deliverables"]

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const handleDownload = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text(); // Get error details from the response
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Error downloading file',
                });
                return;
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            const blobUrl = window.URL.createObjectURL(blob);

            link.href = blobUrl;
            link.download = filename; // Use a meaningful filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            setSnackbar({
                open: true,
                severity: 'success',
                message: 'File downloaded successfully',
            });
        } catch (error) {

            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error downloading file',
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };


    const fabStyle: any = {
        position: 'fixed',
        bottom: '30px',
        right: deviceType == "mobile" ? '20px' : '50px',
    };

    const onPrivacyPolicyButtonClicked = () => {
        window.open("https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/Zupotsu%20-%20PrivacyPolicy%20-%20NJ.docx.pdf", '_blank');
    };

    const handleTOS = () => {
        window.open("https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/TOS.pdf", '_blank');
    };


    const submitQuery = async (data: any, fileData: any) => {
        // setLoader(true);
        const payload = {
            name: data['name'],
            email: data['email'],
            file: {
                fileName: fileData?.['name'] || '',
                pathUrl: fileData?.['filePath'] || '',
                uploadedAt: '',
            },
            contact: {
                countryCode: data['countryCode']['value'] || '',
                countryFlag: data['countryCode']['icon'] || '',
                phoneNo: data['mobileNo'],
            },
            about: data['aboutYourself'],
            status: 'active',
        };
        // const response: any = await dispatch(addGeneralEnquiry(payload)());
        // if (response?.payload?.data?.statusCode === 200) {
        //     setShowLoader(false);
        //     setShowGetInTouchSuccess(true);
        // } else {
        //     setShowLoader(false);
        //     handleOpenSnackbar('Error in submitting Query', 'error');
        // }
    };



    function formatCurrency2(value: any) {
        if (value) {
            let currencyCode = localStorage.getItem("preferred_currency") || 'INR';
            let locale = 'en-US';

            if (currencyCode === 'INR') {
                locale = 'en-IN';
            }
            const formatWithNoTrailingZeros = (num: any) => {
                return parseFloat(num.toFixed(1)); // Format to one decimal and remove trailing zeros
            };

            if (value >= 1_000_000) {
                // Convert to millions and append 'M'
                return formatWithNoTrailingZeros(value / 1_000_000) + 'M';
            } else if (value >= 1_000) {
                // Convert to thousands and append 'K'
                return formatWithNoTrailingZeros(value / 1_000) + 'K';
            }

            return new Intl.NumberFormat(locale, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                useGrouping: true
            }).format(value);
        } else {
            return "NA";
        }
    }


    const formatDateString = (dateString: any) => {
        if (!dateString) return 'NA';

        const date = new Date(dateString);

        const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
        const formattedDate = date.toLocaleDateString('en-US', options);
        const [month, day, year] = formattedDate.split(' ');
        const formattedMonth = month.slice(0, 3);
        return `${formattedMonth}\n${day} ${year}`;
    };

    const getStatIcon = (assetTypeName: any) => {
        switch (assetTypeName?.toLowerCase()) {
            case "facebook":
                return fbred;
            case "instagram":
                return instared;
            case "linkedin":
                return;
            case "x":
                return xred;
            case "youtube":
                return ytred;
            case "blog":
                return blogred;
            case "tiktok":
                return tiktokred;
            case "website":
                return wbred;
            default:
                return "";
        }
    };

    const platformOrder = ["INSTAGRAM", "X", "YOUTUBE"];

    const calculatePercentageDifference = (current: number, previous: number) => {
        if (previous === 0 || !current || !previous) return "NA";
        const difference = ((current - previous) / previous) * 100;
        return difference.toFixed(2) + "%";
    }

    const handleDownloadPitchDesk = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Error downloading PDF file',
                });
                return;
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            const blobUrl = window.URL.createObjectURL(blob);

            link.href = blobUrl;
            link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`; // Ensure the filename ends with .pdf
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            setSnackbar({
                open: true,
                severity: 'success',
                message: 'PDF downloaded successfully',
            });
        } catch (error) {

            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error downloading PDF file',
            });
        }
    };

    const fabStyle2: any = {
        position: 'fixed',
        bottom: '110px',
        right: deviceType == "mobile" ? '20px' : '50px',
    };


    if (load) {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }

    else {
        return (
            <div style={{ backgroundColor: '#fafafa', width: '100%', height: '91vh', overflowY: 'scroll', overflowX: 'hidden', fontFamily: 'Inter' }}>
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
                {isBuyer && (<Fab onClick={() => {
                    window.open("https://www.zupotsu.com/faqs", "_blank");
                }} style={fabStyle2} color="primary" aria-label="add">
                    {/* <img src={touch2} /> */}
                    <ContactSupportOutlinedIcon sx={{ color: '#FFF', width: '30px', height: '30px' }} />
                </Fab>)}
                {isBuyer && (<Fab onClick={() => {
                    setShowZoputsuGetInTouchPopup2(true)
                    // setShowZoputsuGetInTouchPopup(true); 
                    setselGT("asset")
                }} style={fabStyle} color="primary" aria-label="add">
                    <img src={touch2} />
                </Fab>)}
                {(isCatalogue) && (<Fab onClick={() => { navigation('/catalogue') }} style={{ ...fabStyle, width: 'auto', right: '130px', borderRadius: '8px', padding: '10px' }} color="primary" aria-label="add">
                    <ArrowBack sx={{ width: '24px', paddingRight: '5px' }} /><span style={{ fontSize: '12px' }}>Back to Catalogue</span>
                </Fab>)}

                {(cat) && (<Fab onClick={() => { navigation(`/catalogue-management?type=${cat}`) }} style={{ ...fabStyle, width: 'auto', borderRadius: '8px', padding: '10px' }} color="primary" aria-label="add">
                    <ArrowBack sx={{ width: '24px', paddingRight: '5px' }} /><span style={{ fontSize: '12px' }}>Back to Catalogue Management</span>
                </Fab>)}

                <div style={{}}>
                    <Box className={"newcarouselContainer"} >
                        <Carousel
                            autoPlay
                            // interval={3000}
                            infiniteLoop
                            showThumbs={false}
                            showStatus={false}
                            dynamicHeight={false}
                            showArrows={true}
                            showIndicators={true}
                        >
                            {assetData?.CoverImages?.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    style={{ width: '100%', display: 'flex' }}
                                >
                                    <div style={{ width: '60%' }}></div>
                                    <div className={"newcarouselItem"} style={{
                                        width: '40%'
                                        // ,background: "#95121A"
                                    }}>
                                        <img src={item.media_url} className={"newslideImage"} />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                left: '0px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                backgroundImage: `url(${bgImage})`,
                                                backgroundSize: '69% 100%',
                                                backgroundPosition: 'left',
                                                backgroundRepeat: 'no-repeat',
                                                // backgroundColor: '#96191A'    ,
                                                width: '100%',
                                                alignItems: 'flex-start',
                                                gap: '5px',
                                                height: '100%',
                                                padding: deviceType === "mobile" ? '20px' : '40px',
                                                zIndex: 3
                                            }}
                                        >
                                            <img src={zup} style={{ position: 'absolute', height: '60%', width: '25%', left: "25%", top: '16%' }} />
                                            {/* <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                padding: deviceType === "mobile" ? '0px' : '15px',
                                                alignItems: 'center',
                                                color: '#fff',
                                                marginLeft: '-10px'
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
                                                color="#fff"
                                                textColor="#fff"
                                            />
                                        </Box> */}
                                            <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '56%' }}>
                                                <div>
                                                    <div style={{ display: 'flex', color: '#fff', alignItems: 'center' }}>
                                                        <div style={{ color: '#1447CA', fontSize: deviceType === "mobile" ? "12px" : "14px", fontWeight: '700', background: "#E7EDFA", paddingBottom: '5px', paddingTop: '5px', paddingLeft: '10px', paddingRight: '10px', borderRadius: 100 }}>
                                                            {assetData?.Sport}
                                                        </div>
                                                        <span style={{ padding: '10px', fontSize: '20px', marginLeft: '5px', marginRight: '5px' }}>|</span>
                                                        <div style={{ display: 'flex', color: '#fff', alignItems: 'center' }}>
                                                            <div style={{ display: 'flex', color: '#fff', background: '#FF3E3E', width: '26px', height: '26px', borderRadius: 100, justifyContent: 'center', alignItems: 'center', padding: '3px' }}>
                                                                <img src={sportsmedia[0]?.flip_media || sports} style={{ width: '85%' }} />
                                                            </div>
                                                            <div style={{ color: '#fff', fontSize: deviceType === "mobile" ? "13px" : "16px", fontWeight: '500', marginLeft: '5px' }}>
                                                                {assetData?.AssetType}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontFamily: "Inter",
                                                            fontSize: deviceType === "mobile" ? "24px" : "44px",
                                                            fontWeight: 800,
                                                            lineHeight: deviceType === 'mobile' ? "30px" : "50px",
                                                            textAlign: "left",
                                                            color: "rgba(255, 255, 255, 1)",
                                                            whiteSpace: 'wrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            display: '-webkit-box',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 2,
                                                        }}
                                                    // style={{ color: '#fff', fontSize: deviceType === "mobile" ? "38px" : "44px", fontWeight: '800', marginTop: '10px', textAlign: 'start', lineHeight: deviceType == "mobile" ? '50px' : '60px' }}
                                                    >
                                                        {assetData?.Name}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontFamily: "Inter",
                                                            fontSize: deviceType === "mobile" ? "14px" : "16px",
                                                            fontWeight: 500,
                                                            lineHeight: deviceType === 'mobile' ? "20px" : "28px",
                                                            textAlign: "left",
                                                            color: "rgba(255, 255, 255, 1)",
                                                            whiteSpace: 'wrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            display: '-webkit-box',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 2,
                                                            paddingTop: deviceType === 'mobile' ? '10px' : '20px',
                                                        }}
                                                    // style={{ color: '#fff', fontSize: deviceType === "mobile" ? "14px" : "16px", fontWeight: '500', marginTop: '10px', textAlign: 'start', width: '80%' }}
                                                    >
                                                        {assetData?.Headline}
                                                    </div>
                                                </div>
                                                {/* {assetData['Represented By'] && (<div style={{}}>
                                                <div style={{ fontSize: deviceType === "mobile" ? "12px" : "14px", fontWeight: '500', textAlign: 'start', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '20px' }}>
                                                    Listed By
                                                </div>

                                                <div style={{ color: '#fff', fontSize: deviceType === "mobile" ? "12px" : "14px", fontWeight: '700', background: "#393333", border: '1px solid #fff', marginTop: deviceType == "mobile" ? "10px" : '15px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', borderRadius: 100, textAlign: 'center', marginLeft: '-5px' }}>
                                                    {assetData['Represented By']}
                                                </div>
                                            </div>)} */}
                                            </div>
                                        </Box>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </Box>
                </div>
                <div style={{ padding: '30px', paddingTop: '-10px' }}>
                    <div style={{ width: '100%' }}>
                        <Row style={{ width: '100%' }}>

                            {assetData?.AssetType?.toLowerCase() == "team" && (
                                team?.map((item: any, index: any) => {
                                    if (item) {
                                        return (
                                            <Col key={index} xs={6} md={4} lg={3} style={{ marginBottom: '20px', borderRight: '1px solid #E7E7E7', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                                                <div style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setDialog(true)
                                                        setHead(item?.toLowerCase() === "sec" ? "SEC" : item);
                                                        setDesc(
                                                            Array.isArray(assetData[item])
                                                                ? assetData[item].length === 0
                                                                    ? "NA"
                                                                    : assetData[item].join(", ")
                                                                : assetData[item]?.toString().includes(".000Z")
                                                                    ? formatDateString(assetData[item])
                                                                    : assetData[item]
                                                                        ? assetData[item]
                                                                        : "NA"
                                                        );
                                                    }}>
                                                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                                        {
                                                            Array.isArray(assetData[item]) ?
                                                                assetData[item].length == 0 ? "NA" :
                                                                    assetData[item].join(', ') :
                                                                assetData[item]?.toString().includes(".000Z") ?
                                                                    // assetData[item].split("T")[0] :
                                                                    formatDateString(assetData[item]) :
                                                                    assetData[item] ?
                                                                        assetData[item] : 'NA'
                                                        }
                                                    </div>
                                                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#828282', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.toLowerCase() == "sec" ? "SEC" : item.toLowerCase() == "exclusivity" ? "Zupotsu Exclusive?" : item.toLowerCase() == "sports format" ? "Sports Format(s)" : item}
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    }
                                })
                            )}
                            {assetData?.AssetType?.toLowerCase() == "tournament" && (
                                tournament?.map((item: any, index: any) => {
                                    if (item) {
                                        return (
                                            <Col key={index} xs={6} md={4} lg={3} style={{ marginBottom: '20px', borderRight: '1px solid #E7E7E7', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                                                <div style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setDialog(true)
                                                        setHead(item?.toLowerCase() === "sec" ? "SEC" : item);
                                                        setDesc(
                                                            Array.isArray(assetData[item])
                                                                ? assetData[item].length === 0
                                                                    ? "NA"
                                                                    : assetData[item].join(", ")
                                                                : assetData[item]?.toString().includes(".000Z")
                                                                    ? formatDateString(assetData[item])
                                                                    : assetData[item]
                                                                        ? assetData[item]
                                                                        : "NA"
                                                        );
                                                    }}>
                                                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                                        {Array.isArray(assetData[item]) ?
                                                            assetData[item].length == 0 ? "NA" :
                                                                assetData[item].join(', ') :
                                                            assetData[item]?.toString().includes(".000Z") ?
                                                                // assetData[item].split("T")[0] :
                                                                formatDateString(assetData[item]) :
                                                                assetData[item] ?
                                                                    assetData[item] : 'NA'}
                                                    </div>
                                                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#828282', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.toLowerCase() == "sec" ? "SEC" : item.toLowerCase() == "exclusivity" ? "Zupotsu Exclusive?" : item.toLowerCase() == "sports format" ? "Sports Format(s)" : item}
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    }
                                })
                            )}
                            {assetData?.AssetType?.toLowerCase() == "content" && (
                                content?.map((item: any, index: any) => {
                                    if (item) {
                                        return (
                                            <Col key={index} xs={6} md={4} lg={3} style={{ marginBottom: '20px', borderRight: '1px solid #E7E7E7', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                                                <div style={{ cursor: 'pointer' }} onClick={() => {
                                                    setDialog(true)
                                                    setHead(item?.toLowerCase() === "sec" ? "SEC" : item);
                                                    setDesc(
                                                        Array.isArray(assetData[item])
                                                            ? assetData[item].length === 0
                                                                ? "NA"
                                                                : assetData[item].join(", ")
                                                            : assetData[item]?.toString().includes(".000Z")
                                                                ? formatDateString(assetData[item])
                                                                : assetData[item]
                                                                    ? assetData[item]
                                                                    : "NA"
                                                    );
                                                }}>
                                                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                                        {/* {assetData[item]?assetData[item]:"NA"} */}
                                                        {Array.isArray(assetData[item]) ?
                                                            assetData[item].length == 0 ? "NA" :
                                                                assetData[item].join(', ') :
                                                            assetData[item]?.toString().includes(".000Z") ?
                                                                // assetData[item].split("T")[0] :
                                                                formatDateString(assetData[item]) :
                                                                assetData[item] ?
                                                                    assetData[item] : 'NA'}
                                                    </div>
                                                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#828282', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.toLowerCase() == "sec" ? "SEC" : item.toLowerCase() == "exclusivity" ? "Zupotsu Exclusive?" : item.toLowerCase() == "sports format" ? "Sports Format(s)" : item}
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    }
                                })
                            )}
                            {assetData?.AssetType?.toLowerCase() == "athlete" && (
                                athelete?.map((item: any, index: any) => {
                                    if (item) {
                                        return (
                                            <Col key={index} xs={6} md={4} lg={3} style={{ marginBottom: '20px', borderRight: '1px solid #E7E7E7', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                                                <div style={{ cursor: 'pointer' }} onClick={() => {
                                                    setDialog(true)
                                                    setHead(item?.toLowerCase() === "sec" ? "SEC" : item);
                                                    setDesc(
                                                        Array.isArray(assetData[item])
                                                            ? assetData[item].length === 0
                                                                ? "NA"
                                                                : assetData[item].join(", ")
                                                            : assetData[item]?.toString().includes(".000Z")
                                                                ? formatDateString(assetData[item])
                                                                : assetData[item]
                                                                    ? assetData[item]
                                                                    : "NA"
                                                    );
                                                }}>
                                                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                                        {/* {assetData[item]?assetData[item]:"NA"} */}
                                                        {Array.isArray(assetData[item]) ?
                                                            assetData[item].length == 0 ? "NA" :
                                                                assetData[item].join(', ') :
                                                            assetData[item]?.toString().includes(".000Z") ?
                                                                // assetData[item].split("T")[0] :
                                                                formatDateString(assetData[item]) :
                                                                assetData[item] ?
                                                                    assetData[item] : 'NA'}
                                                    </div>
                                                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#828282', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.toLowerCase() == "sec" ? "SEC" : item.toLowerCase() == "exclusivity" ? "Zupotsu Exclusive?" : item.toLowerCase() == "sports format" ? "Sports Format(s)" : item}
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    }
                                })
                            )}
                            {/* {assetData.SocialHandles?.map((item: any, index: any) => (
                            <Col xs={6} md={4} lg={3} style={{ marginBottom: '20px', borderRight: '1px solid #E7E7E7', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                                <div style={{ cursor: 'pointer' }}>
                                    <div
                                        onClick={() => { window.open(item.url, '_blank') }}
                                        style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', textDecorationLine: (isHovered && index == isHoveredId) ? 'underline' : '', color: (isHovered && index == isHoveredId) ? '#E22B16' : '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}
                                        onMouseOver={() => handleMouseOver(index)}
                                        onMouseOut={handleMouseOut}
                                    >
                                        {item.url ? '@' + trimURL(item.url) : 'NA'}
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#828282', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.social_media_platform}
                                    </div>
                                </div>
                            </Col>
                        ))} */}
                        </Row>
                    </div>

                    {assetData?.SocialHandles?.length > 0 && (<div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', marginTop: '20px' }}>
                        Social Profiles
                    </div>)}

                    <div style={{ cursor: 'pointer', display: 'flex', gap: '20px', fontFamily: 'Inter', flexWrap: 'wrap', alignItems: 'center', justifyContent: (deviceType == "mobile" || deviceType == "small-tablet") ? 'center' : '' }}>
                        {assetData.SocialHandles?.map((item: any, index: any) => {
                            return (
                                <div key={index} onClick={() => { window.open(item?.url, '_blank') }} style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.08)', marginTop: '20px', borderRadius: '16px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: '#fff' }}>
                                    <div style={{ height: "45px", width: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src={getStatIcon(item?.social_media_platform?.toLowerCase())} style={{ objectFit: 'cover', height: item?.social_media_platform?.toLowerCase() == "x" ? "35px" : '45px' }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>



                    {assetData?.SocialHandles?.length > 0 && (<div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', marginTop: '30px' }}>
                        Social Media Stats
                    </div>)}

                    <div style={{ display: 'flex', gap: '20px', fontFamily: 'Inter', flexWrap: 'wrap', alignItems: 'center', justifyContent: (deviceType == "mobile" || deviceType == "small-tablet") ? 'center' : '', marginTop: '10px' }}>
                        {assetData.SocialHandles?.sort((a: any, b: any) => {
                            const platformA = a?.social_media_platform?.toUpperCase();
                            const platformB = b?.social_media_platform?.toUpperCase();
                            return platformOrder.indexOf(platformA) - platformOrder.indexOf(platformB);
                        }).map((item: any, index: any) => {
                            if (["X", "YOUTUBE", "INSTAGRAM"].includes(item?.social_media_platform?.toUpperCase())) {
                                const currentDetails = item?.asset_social_media_details?.[0] !== "NA" ? (item?.asset_social_media_details?.[0]) : null;
                                const previousDetails = item?.asset_social_media_details?.[1] !== "NA" ? item?.asset_social_media_details?.[1] : null;

                                const followerGrowth = previousDetails && currentDetails ? calculatePercentageDifference(currentDetails?.followers_count, previousDetails?.followers_count) : null;
                                const likesGrowth = previousDetails && currentDetails ? calculatePercentageDifference(currentDetails?.likes_count, previousDetails?.likes_count) : null;
                                const postsGrowth = previousDetails && currentDetails ? calculatePercentageDifference(currentDetails?.posts_count, previousDetails?.posts_count) : null;
                                const commentsGrowth = previousDetails && currentDetails ? calculatePercentageDifference(currentDetails?.comments_count, previousDetails?.comments_count) : null;
                                const viewsGrowth = previousDetails && currentDetails ? calculatePercentageDifference(currentDetails?.views_count, previousDetails?.views_count) : null;

                                return (
                                    <div key={index} style={{ minHeight: '260px', minWidth: '360px', maxHeight: '260px', maxWidth: '360px', boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.08)', marginTop: '20px', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <div>
                                            <img src={getStatIcon(item?.social_media_platform?.toLowerCase())} style={{ objectFit: 'cover', marginRight: '20px', height: item?.social_media_platform?.toLowerCase() == "x" ? "35px" : '45px' }} />
                                            <span style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{item?.social_media_platform?.toUpperCase()}</span>
                                        </div>
                                        <div style={{ height: "2px", width: "100%", background: "linear-gradient(90deg, #FFFFFF 0%, #E20B18 49.5%, #FFFFFF 100%)", margin: '20px' }}></div>
                                        <div style={{ background: "rgba(255, 249, 249, 1)", height: '100%', width: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div style={{ width: '45px' }}></div>
                                                <div>
                                                    <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{formatCurrency2(currentDetails?.followers_count)}</div>
                                                    <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Followers</div>
                                                </div>
                                                <div style={{ minWidth: '45px' }}>
                                                    {/* {followerGrowth && followerGrowth !== "NA" && <div style={{ color: followerGrowth.includes("-") ? "#e22b16" : "green", fontWeight: 600, fontSize: '14px' }}>{followerGrowth.includes("-") ? <img src={fall} /> : <img src={growth} />}  {followerGrowth}</div>} */}
                                                    {followerGrowth && followerGrowth !== "NA" && (
                                                        <div
                                                            style={{
                                                                color: followerGrowth.includes("0.00") ? "grey" : followerGrowth.includes("-") ? "#e22b16" : "green",
                                                                fontWeight: 600,
                                                                fontSize: '14px',
                                                            }}
                                                        >
                                                            {followerGrowth.includes("0.00")
                                                                ? <img src={growth} alt="growth" style={{ filter: 'grayscale(100%)', transform: 'rotate(20deg)', marginRight: '5px' }} />
                                                                : followerGrowth.includes("-")
                                                                    ? <img src={fall} alt="fall" style={{ marginRight: '5px' }} />
                                                                    : <img src={growth} alt="growth" style={{ marginRight: '5px' }} />
                                                            }
                                                            {followerGrowth.includes("0.00") ? "0.00%" : followerGrowth}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>

                                                <div
                                                // style={{display:'flex'}}
                                                >
                                                    <div>
                                                        <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{formatCurrency2(currentDetails?.posts_count)}</div>
                                                        <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Posts</div>
                                                        {/* {postsGrowth && postsGrowth !== "NA" && <div style={{ color: postsGrowth.includes("-") ? "#e22b16" : "green", fontWeight: 600, fontSize: '14px' }}>{postsGrowth.includes("-") ? <img src={fall} /> : <img src={growth} />}  {postsGrowth}</div>} */}
                                                        {postsGrowth && postsGrowth !== "NA" && (
                                                            <div
                                                                style={{
                                                                    color: postsGrowth.includes("0.00") ? "grey" : postsGrowth.includes("-") ? "#e22b16" : "green",
                                                                    fontWeight: 600,
                                                                    fontSize: '14px',
                                                                }}
                                                            >
                                                                {postsGrowth.includes("0.00")
                                                                    ? <img src={growth} alt="growth" style={{ filter: 'grayscale(100%)', transform: 'rotate(20deg)', marginRight: '5px' }} />
                                                                    : postsGrowth.includes("-")
                                                                        ? <img src={fall} alt="fall" style={{ marginRight: '5px' }} />
                                                                        : <img src={growth} alt="growth" style={{ marginRight: '5px' }} />
                                                                }
                                                                {postsGrowth.includes("0.00") ? "0.00%" : postsGrowth}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {item?.social_media_platform?.toUpperCase() != "YOUTUBE" && (<span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>)}


                                                {item?.social_media_platform?.toUpperCase() != "YOUTUBE" && (<div
                                                // style={{display:'flex'}}
                                                >
                                                    <div>
                                                        <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{formatCurrency2(currentDetails?.likes_count)}</div>
                                                        <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Likes</div>
                                                    </div>
                                                    {/* {likesGrowth && likesGrowth !== "NA" && <div style={{ color: likesGrowth.includes("-") ? "#e22b16" : "green", fontWeight: 600, fontSize: '14px' }}>{likesGrowth.includes("-") ? <img src={fall} /> : <img src={growth} />}  {likesGrowth}</div>} */}
                                                    {likesGrowth && likesGrowth !== "NA" && (
                                                        <div
                                                            style={{
                                                                color: likesGrowth.includes("0.00") ? "grey" : likesGrowth.includes("-") ? "#e22b16" : "green",
                                                                fontWeight: 600,
                                                                fontSize: '14px',
                                                            }}
                                                        >
                                                            {likesGrowth.includes("0.00")
                                                                ? <img src={growth} alt="growth" style={{ filter: 'grayscale(100%)', transform: 'rotate(20deg)', marginRight: '5px' }} />
                                                                : likesGrowth.includes("-")
                                                                    ? <img src={fall} alt="fall" style={{ marginRight: '5px' }} />
                                                                    : <img src={growth} alt="growth" style={{ marginRight: '5px' }} />
                                                            }
                                                            {likesGrowth.includes("0.00") ? "0.00%" : likesGrowth}
                                                        </div>
                                                    )}
                                                </div>)}



                                                {(item?.social_media_platform?.toUpperCase() != "X") && (<span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>)}
                                                {item?.social_media_platform?.toUpperCase() != "X" && (<div
                                                // style={{display:'flex'}}
                                                >
                                                    {(item?.social_media_platform?.toUpperCase() == "INSTAGRAM") && (<div>
                                                        <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{formatCurrency2(currentDetails?.comments_count)}</div>
                                                        <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Comments</div>
                                                        {/* {commentsGrowth && commentsGrowth !== "NA" && <div style={{ color: commentsGrowth.includes("-") ? "#e22b16" : "green", fontWeight: 600, fontSize: '14px' }}>{commentsGrowth.includes("-") ? <img src={fall} /> : <img src={growth} />}  {commentsGrowth}</div>} */}
                                                        {commentsGrowth && commentsGrowth !== "NA" && (
                                                            <div
                                                                style={{
                                                                    color: commentsGrowth.includes("0.00") ? "grey" : commentsGrowth.includes("-") ? "#e22b16" : "green",
                                                                    fontWeight: 600,
                                                                    fontSize: '14px',
                                                                }}
                                                            >
                                                                {commentsGrowth.includes("0.00")
                                                                    ? <img src={growth} alt="growth" style={{ filter: 'grayscale(100%)', transform: 'rotate(20deg)', marginRight: '5px' }} />
                                                                    : commentsGrowth.includes("-")
                                                                        ? <img src={fall} alt="fall" style={{ marginRight: '5px' }} />
                                                                        : <img src={growth} alt="growth" style={{ marginRight: '5px' }} />
                                                                }
                                                                {commentsGrowth.includes("0.00") ? "0.00%" : commentsGrowth}
                                                            </div>
                                                        )}
                                                    </div>)}

                                                    {item?.social_media_platform?.toUpperCase() == "YOUTUBE" && (<div>
                                                        <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{formatCurrency2(currentDetails?.views_count)}</div>
                                                        <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Views</div>
                                                        {/* {viewsGrowth && viewsGrowth !== "NA" && <div style={{ color: viewsGrowth.includes("-") ? "#e22b16" : "green", fontWeight: 600, fontSize: '14px' }}>{viewsGrowth.includes("-") ? <img src={fall} /> : <img src={growth} />}  {viewsGrowth}</div>} */}
                                                        {viewsGrowth && viewsGrowth !== "NA" && (
                                                            <div
                                                                style={{
                                                                    color: viewsGrowth.includes("0.00") ? "grey" : viewsGrowth.includes("-") ? "#e22b16" : "green",
                                                                    fontWeight: 600,
                                                                    fontSize: '14px',
                                                                }}
                                                            >
                                                                {viewsGrowth.includes("0.00")
                                                                    ? <img src={growth} alt="growth" style={{ filter: 'grayscale(100%)', transform: 'rotate(20deg)', marginRight: '5px' }} />
                                                                    : viewsGrowth.includes("-")
                                                                        ? <img src={fall} alt="fall" style={{ marginRight: '5px' }} />
                                                                        : <img src={growth} alt="growth" style={{ marginRight: '5px' }} />
                                                                }
                                                                {viewsGrowth.includes("0.00") ? "0.00%" : viewsGrowth}
                                                            </div>
                                                        )}
                                                    </div>)}

                                                </div>)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <div style={{ paddingTop: '30px' }}>
                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                            About
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                            {assetData?.About || "NA"}

                        </div>
                    </div>
                    {assetData?.AssetType?.toLowerCase() != "tournament" && (<div style={{ paddingTop: '20px' }}>
                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                            Highlights
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                            {/* {assetData?.Highlights || "NA"} */}
                            {assetData?.Highlights
                                ? (
                                    // assetData?.Highlights?.split('.').map((sentence: string, sentenceIndex: number) => (
                                    //         sentence.includes(',')
                                    //             ? (
                                    //                 <ul key={sentenceIndex}>
                                    //                     {sentence.split(',').map((part: string, index: number) => (
                                    //                         <li key={index} style={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Inter' }}>
                                    //                             {part.trim()}
                                    //                         </li>
                                    //                     ))}
                                    //                 </ul>
                                    //             )
                                    //             : (
                                    //                 <p key={sentenceIndex} style={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Inter' }}>
                                    //                     {sentence.trim()}.
                                    //                 </p>
                                    //             )
                                    //     ))

                                    assetData?.Highlights?.split('\n')?.map((sentence: string, sentenceIndex: number) => (
                                        <p key={sentenceIndex} style={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Inter', margin: 0, padding: 0, minHeight: sentence?.trim() === '' ? '1em' : 'auto', }}>
                                            {sentence?.trim() === '' ? '\u00A0' : sentence}
                                        </p>
                                    ))
                                )
                                : ""
                            }
                        </div>
                    </div>)}
                    {!more && (<div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Typography
                            onClick={() => { setMore(true) }}
                            sx={{ color: "#e20a17", fontFamily: 'Inter', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, backgroundColor: '#fef3f3', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            View More
                            <img src={down} />
                        </Typography>
                    </div>)}
                    {more && (<div style={{ width: '100%', paddingTop: '40px' }}>
                        <Row>
                            {assetData?.AssetType?.toLowerCase() == "team" && (
                                teamMore?.map((item: any, index: any) => {
                                    let colSize = 4;
                                    // let totalItems = teamMore.length;
                                    // if ((totalItems % 3 != 0) && totalItems % 2 === 1 && index === totalItems - 1) { colSize = 12 }
                                    // else if ((totalItems % 3 != 0) && (totalItems % 2 === 0) && (index === totalItems - 2 || index === totalItems - 1)) { colSize = 6 }
                                    return (
                                        <Col key={index} xs={12} md={colSize} style={{ cursor: 'pointer', marginBottom: '20px', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}
                                            onClick={() => {
                                                setDialog(true)
                                                setHead(item?.toLowerCase() === "sec" ? "SEC" : item);
                                                setDesc(
                                                    Array.isArray(assetData[item])
                                                        ? assetData[item].length === 0
                                                            ? "NA"
                                                            : assetData[item].join(", ")
                                                        : assetData[item]?.toString().includes(".000Z")
                                                            ? formatDateString(assetData[item])
                                                            : assetData[item]
                                                                ? assetData[item]
                                                                : "NA"
                                                );
                                            }}>
                                            <div style={{}}>
                                                <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                                    {item}
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '15px', paddingRight: '10px' }}>
                                                    {
                                                        Array.isArray(assetData[item.replace('', "_")])
                                                            ? (assetData[item].length === 0
                                                                ? "NA"
                                                                : assetData[item].join(', '))
                                                            : (typeof assetData[item] === 'string' && assetData[item].includes(".000Z"))
                                                                ? assetData[item].split("T")[0]
                                                                : assetData[item] || 'NA'
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            )}
                            {assetData?.AssetType?.toLowerCase() == "tournament" && (
                                tournamentMore?.map((item: any, index: any) => {
                                    let colSize = 4;
                                    // let totalItems = tournamentMore.length;
                                    // if ((totalItems % 3 != 0) && totalItems % 2 === 1 && index === totalItems - 1) { colSize = 12 }
                                    // else if ((totalItems % 3 != 0) && (totalItems % 2 === 0) && (index === totalItems - 2 || index === totalItems - 1)) { colSize = 6 }
                                    return (
                                        <Col key={index} xs={12} md={colSize} style={{ cursor: 'pointer', marginBottom: '20px', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}
                                            onClick={() => {
                                                setDialog(true)
                                                setHead(item?.toLowerCase() === "sec" ? "SEC" : item);
                                                setDesc(
                                                    Array.isArray(assetData[item])
                                                        ? assetData[item].length === 0
                                                            ? "NA"
                                                            : assetData[item].join(", ")
                                                        : assetData[item]?.toString().includes(".000Z")
                                                            ? formatDateString(assetData[item])
                                                            : assetData[item]
                                                                ? assetData[item]
                                                                : "NA"
                                                );
                                            }}>
                                            <div style={{}}>
                                                <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                                    {item}
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '15px', paddingRight: '10px' }}>
                                                    {
                                                        Array.isArray(assetData[item])
                                                            ? (assetData[item].length === 0
                                                                ? "NA"
                                                                : assetData[item].join(', '))
                                                            : (typeof assetData[item] === 'string' && assetData[item].includes(".000Z"))
                                                                ? assetData[item].split("T")[0]
                                                                : assetData[item] || 'NA'
                                                    }

                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            )}
                            {assetData?.AssetType?.toLowerCase() == "content" && (
                                contentMore?.map((item: any, index: any) => {
                                    let colSize = 4;
                                    // let totalItems = contentMore.length;
                                    // if ((totalItems % 3 != 0) && totalItems % 2 === 1 && index === totalItems - 1) { colSize = 12 }
                                    // else if ((totalItems % 3 != 0) && (totalItems % 2 === 0) && (index === totalItems - 2 || index === totalItems - 1)) { colSize = 6 }
                                    return (
                                        <Col key={index} xs={12} md={colSize} style={{ cursor: 'pointer', marginBottom: '20px', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}
                                            onClick={() => {
                                                setDialog(true)
                                                setHead(item?.toLowerCase() === "sec" ? "SEC" : item);
                                                setDesc(
                                                    Array.isArray(assetData[item])
                                                        ? assetData[item].length === 0
                                                            ? "NA"
                                                            : assetData[item].join(", ")
                                                        : assetData[item]?.toString().includes(".000Z")
                                                            ? formatDateString(assetData[item])
                                                            : assetData[item]
                                                                ? assetData[item]
                                                                : "NA"
                                                );
                                            }}>
                                            <div style={{}}>
                                                <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                                    {item}
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '15px', paddingRight: '10px' }}>
                                                    {
                                                        Array.isArray(assetData[item])
                                                            ? (assetData[item].length === 0
                                                                ? "NA"
                                                                : assetData[item].join(', '))
                                                            : (typeof assetData[item] === 'string' && assetData[item].includes(".000Z"))
                                                                ? assetData[item].split("T")[0]
                                                                : assetData[item] || 'NA'
                                                    }

                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            )}
                            {assetData?.AssetType?.toLowerCase() == "athlete" && (
                                atheleteMore?.map((item: any, index: any) => {
                                    let colSize = 4;
                                    // let totalItems = atheleteMore.length;
                                    // if ((totalItems % 3 != 0) && totalItems % 2 === 1 && index === totalItems - 1) { colSize = 12 }
                                    // else if ((totalItems % 3 != 0) && (totalItems % 2 === 0) && (index === totalItems - 2 || index === totalItems - 1)) { colSize = 6 }
                                    return (
                                        <Col key={index} xs={12} md={colSize} style={{ cursor: 'pointer', marginBottom: '20px', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}
                                            onClick={() => {
                                                setDialog(true)
                                                setHead(item?.toLowerCase() === "sec" ? "SEC" : item);
                                                setDesc(
                                                    Array.isArray(assetData[item])
                                                        ? assetData[item].length === 0
                                                            ? "NA"
                                                            : assetData[item].join(", ")
                                                        : assetData[item]?.toString().includes(".000Z")
                                                            ? formatDateString(assetData[item])
                                                            : assetData[item]
                                                                ? assetData[item]
                                                                : "NA"
                                                );
                                            }}>
                                            <div style={{}}>
                                                <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                                                    {item}
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '15px', paddingRight: '10px' }}>
                                                    {
                                                        Array.isArray(assetData[item])
                                                            ? (assetData[item].length === 0
                                                                ? "NA"
                                                                : assetData[item].join(', '))
                                                            : (typeof assetData[item] === 'string' && assetData[item].includes(".000Z"))
                                                                ? assetData[item].split("T")[0]
                                                                : assetData[item] || 'NA'
                                                    }

                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            )}
                        </Row>

                        <div style={{ paddingTop: '30px' }}>
                            <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                                Other Audience Information
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                                {assetData?.["Other Audience Information"] || "NA"}

                            </div>
                        </div>
                        <div style={{ paddingTop: '30px' }}>
                            <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                                Other Information
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                                {assetData?.['Other Information'] || "NA"}

                            </div>
                        </div>
                    </div>)}
                    {more && (<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Typography
                            onClick={() => { setMore(false) }}
                            sx={{ color: "#e20a17", fontFamily: 'Inter', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, backgroundColor: '#fef3f3', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            View Less
                            <img src={arrowUp} />
                        </Typography>
                    </div>)}
                    <div style={{ paddingTop: '20px' }}>
                        {((opportunityData?.length == 0 && !isAdmin) || (opportunityData?.length > 0)) && (
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "flex-start" }}>
                                {(isBuyer || (opportunityData?.length > 0)) && (<OppTextUnderlineUtil />)}
                                {(pitchDeskLink?.media_url) ? (
                                    <div>
                                        <a href={pitchDeskLink?.media_url} target='_blank' download={"Pitchdesk"}>
                                            <ZupotsuLinks
                                                links={[

                                                    {
                                                        linkTitle: 'Pitch Deck',
                                                        imgIcon: presentationDeckIcon,
                                                        action: 'presentation_deck',
                                                    },
                                                ]}
                                                disabled={false}
                                                handleLinkClick={() => {
                                                    // handleDownloadPitchDesk(pitchDeskLink?.media_url, "Pitchdesk")
                                                }}
                                            />
                                        </a>
                                    </div>
                                ) : (<></>)}
                            </div>
                        )}
                        <div style={{ marginTop: '10px', marginBottom: '30px', borderRight: '1px solid #E7E7E7', border: '1px solid #DEDEDE', zIndex: '1', borderRadius: '5px' }}>
                            {opportunityData?.length > 0 && (<div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '0px', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                                {opportunityData?.map((item: any, index: any) => (
                                    <div key={index} onClick={() => setSelId(index)} style={{ padding: '20px', color: selId == index ? '#E20B18' : 'grey', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', border: '1px solid rgb(222, 222, 222)', borderBottom: selId == index ? 'none' : '1px solid rgb(222, 222, 222)' }}>
                                        {item["Opportunity Type"]}
                                    </div>
                                ))}
                            </div>)}
                            {opportunityData?.length > 0 && (<div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: (deviceType == 'mobile' || deviceType == "small-tablet") ? 'column' : 'row' }}>
                                    {Array.isArray(opportunityData[selId ? selId : 0]?.opportunity_media) && opportunityData[selId ? selId : 0]?.opportunity_media?.length > 0 && (
                                        <Box className={"carouselContainer2"} >
                                            <Carousel
                                                autoPlay
                                                interval={3000}
                                                infiniteLoop
                                                showThumbs={false}
                                                showStatus={false}
                                                dynamicHeight={false}
                                                showArrows={false}
                                                showIndicators={assetData?.CoverImages ? (assetData?.CoverImages?.length > 1 ? true : false) : false}
                                            >
                                                {
                                                    opportunityData[selId ? selId : 0]?.opportunity_media?.map((item: any, index: any) => (
                                                        <div key={index} className={"carouselItem"}>
                                                            <img src={item.media_url} alt={`Media ${index}`} className={"slideImage2"} />
                                                        </div>
                                                    ))
                                                }
                                            </Carousel>
                                        </Box>
                                    )}

                                    <div style={{ width: (deviceType == 'mobile' || deviceType == "small-tablet") ? '100%' : '70%', padding: deviceType == 'mobile' ? '0px' : '20px', paddingTop: '20px' }}>
                                        <div style={{ paddingTop: '10px', paddingBottom: '15px', color: '#333333', fontSize: deviceType == 'mobile' ? '20px' : '24px', fontWeight: '600', cursor: 'pointer', borderBottom: '1px solid rgb(222, 222, 222)', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                            {opportunityData[+selId] && opportunityData[+selId]["Opportunity Type"] || 'NA'}
                                        </div>
                                        <div style={{ display: 'flex', borderBottom: '1px solid rgb(222, 222, 222)', paddingTop: '10px', paddingBottom: '10px', marginTop: '10px' }}>
                                            <div style={{ width: '48%' }}>

                                                {(isAdmin || opportunityData[+selId]["Display Rate On Catalogue"] == "Yes") && (
                                                    <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                        {opportunityData[+selId] && convertCurrency(opportunityData[+selId]["Minimum Commitment Value"], opportunityData[+selId]["Currency"], localStorage.getItem("preferred_currency")) || 'NA'}
                                                    </div>
                                                )}

                                                {!(isAdmin || opportunityData[+selId]["Display Rate On Catalogue"] == "Yes") && (
                                                    <div
                                                        onClick={() => {
                                                            if (!isAdmin) {
                                                                setShowZoputsuGetInTouchPopup(true);
                                                                setselGT("opportunity");
                                                                setselOppr(opportunityData[+selId])
                                                            }
                                                        }} style={{ paddingBottom: '5px', color: '#E22B16', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                        Contact us
                                                    </div>
                                                )}




                                                <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                    Minimum commitment value
                                                </div>
                                            </div>
                                            <div style={{ borderLeft: '1px solid rgb(222, 222, 222)', paddingLeft: '20px', width: '50%' }}>
                                                <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                    {opportunityData[+selId] && opportunityData[+selId]["Minimum Commitment Period"] || 'NA'}
                                                </div>
                                                <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                    Minimum commitment period
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', borderBottom: '1px solid rgb(222, 222, 222)', paddingTop: '10px', paddingBottom: '10px' }}>
                                            <div style={{ width: '48%' }}>

                                                {(isAdmin || opportunityData[+selId]["Display Rate On Catalogue"] == "Yes") && (
                                                    <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                        {opportunityData[+selId] && convertCurrency(opportunityData[+selId]["Rate"], opportunityData[+selId]["Currency"], localStorage.getItem("preferred_currency")) || 'NA'}
                                                    </div>
                                                )}

                                                {!(isAdmin || opportunityData[+selId]["Display Rate On Catalogue"] == "Yes") && (
                                                    <div
                                                        onClick={() => {
                                                            if (!isAdmin) {
                                                                setShowZoputsuGetInTouchPopup(true);
                                                                setselGT("opportunity");
                                                                setselOppr(opportunityData[+selId])
                                                            }
                                                        }} style={{ paddingBottom: '5px', color: '#E22B16', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                        Contact us
                                                    </div>
                                                )}

                                                <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                    Rate
                                                </div>
                                            </div>
                                            <div style={{ borderLeft: '1px solid rgb(222, 222, 222)', paddingLeft: '20px', width: '50%' }}>
                                                <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                    {opportunityData[+selId] && opportunityData[+selId]["Unit Of Measurement"] || 'NA'}
                                                </div>
                                                <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                    Unit of Measurement
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', paddingTop: '15px', paddingBottom: '15px' }}>
                                            <div style={{ width: '98%' }}>
                                                <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                    {opportunityData[+selId] && opportunityData[+selId]["Opportunity Type"] == "Anything Else" ? opportunityData[+selId]["Specify Opportunity"] : opportunityData[+selId]?.["Opportunities"] || 'NA'}
                                                </div>
                                                <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                                                    Opportunities
                                                </div>
                                            </div>

                                        </div>
                                        {(isBuyer||isQuickReg) && (<div 
                                        onClick={() => { 
                                            if(isQuickReg)
                                            {
                                                setIsOpen(true)
                                            }
                                            if(isBuyer)
                                            {
                                                setShowZoputsuGetInTouchPopup(true); 
                                                setselGT("opportunity"); 
                                                setselOppr(opportunityData[+selId]) 
                                            }
                                        }} 
                                        style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography
                                                sx={{
                                                    color: "#fff",
                                                    fontFamily: 'Inter',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    background: '#E20B18',
                                                    padding: '10px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Request for Proposal {'>'}
                                            </Typography>
                                        </div>)}
                                    </div>
                                </div>
                                <div style={{ width: "100%", flexDirection: 'row', display: 'flex', justifyContent: "flex-start", borderBottom: '2px solid rgba(224, 224, 224, 1)', flexWrap: "wrap", marginTop: '20px' }}>
                                    <div style={selType == "deliverables" ?
                                        sortingStyles.tabButton : sortingStyles.tabButtonInactive
                                    } onClick={() => {
                                        setSelectedType('deliverables');

                                    }}>Deliverables</div>
                                    <div style={selType == "t&c" ?
                                        sortingStyles.tabButton : sortingStyles.tabButtonInactive
                                    } onClick={() => {
                                        setSelectedType('t&c');
                                    }}>T&C</div>
                                    <div style={selType == "notes" ?
                                        sortingStyles.tabButton : sortingStyles.tabButtonInactive
                                    } onClick={() => {
                                        setSelectedType('notes');
                                    }}>Notes</div>

                                </div>

                                {(selType == "deliverables" && opportunityData[+selId]["deliverables"].length > 0) && (
                                    <div style={{ width: '100%', display: 'flex', marginTop: '20px', background: '#f9f9f9', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <TableContainer style={{ borderStyle: 'none', boxShadow: "none", padding: 0, }}>
                                            <Table style={{ borderStyle: 'none', padding: 0, }}>
                                                <TableHead style={{ backgroundColor: 'rgba(240, 239, 239, 0.6)', padding: '10px' }}>
                                                    <TableRow>
                                                        {headers.map((header, index) => (
                                                            <TableCell
                                                                key={index}
                                                                style={{
                                                                    fontFamily: 'Inter',
                                                                    fontSize: deviceType == 'mobile' ? '14px' : '16px',
                                                                    fontWeight: 700,
                                                                    lineHeight: '21px',
                                                                    letterSpacing: '-0.3333333432674408px',
                                                                    textAlign: 'left',
                                                                    borderStyle: 'none',
                                                                    justifyContent: 'center',
                                                                    marginLeft: 0,
                                                                    textTransform: 'capitalize',
                                                                    backgroundColor: 'rgba(224, 224, 224, 1)',
                                                                    borderTopRightRadius: index === headers.length - 1 ? "3px" : "0px",
                                                                    borderTopLeftRadius: index === 0 ? "3px" : "0px",
                                                                    cursor: index < 4 ? 'pointer' : 'default',
                                                                    borderRight: index !== headers.length - 1 ? '1px solid #E0E0E0' : 'none',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: 'flex', alignItems: 'center',
                                                                        color: '#111',
                                                                        fontFamily: 'Inter',
                                                                        fontStyle: 'normal',
                                                                        lineHeight: 'normal',
                                                                    }}
                                                                >
                                                                    {header}

                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {opportunityData[+selId] && opportunityData[+selId]["deliverables"]?.map((item: any, index: any) => (
                                                        <TableRow
                                                            key={item.id}
                                                            style={{
                                                                background: index % 2 == 0 ? "#fff" : "#f9f9f9",
                                                                height: "30px",
                                                                border: "0px solid transparent",
                                                                fontSize: deviceType == 'mobile' ? '14px' : '16px',
                                                                lineHeight: "21px",
                                                                paddingLeft: '18px',
                                                            }}
                                                        >
                                                            <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: deviceType == 'mobile' ? '14px' : '16px', lineHeight: "21px" }}>
                                                                {item?.deliverables}
                                                            </TableCell>
                                                            <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: deviceType == 'mobile' ? '14px' : '16px', lineHeight: "21px" }}>
                                                                {item?.specs_of_deliverables}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                )}
                                {(selType == "deliverables" && opportunityData[+selId]["deliverables"].length == 0) && (
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '20px', background: '#f9f9f9', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                                            Deliverables
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                                            {'NA'}
                                        </div>
                                    </div>
                                )}
                                {selType == "t&c" && (
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '20px', background: '#f9f9f9', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                                            Terms and Conditions
                                        </div>
                                        {(opportunityData[+selId] && opportunityData[+selId]["Tc Type"]) == "Text" && (<div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                                            {opportunityData[+selId] && opportunityData[+selId]["Tc Text"] || 'NA'}
                                        </div>)}
                                        {(opportunityData[+selId] && opportunityData[+selId]["Tc Type"]) == "File" && (<div onClick={() => handleDownload(opportunityData[+selId]["Tc File"], "Terms&Conditions.pdf")} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', display: 'flex', marginTop: '20px', cursor: 'pointer' }}>
                                            <img src={documentUpload} />
                                            <div style={{ paddingLeft: '10px', fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#2F80ED' }}>
                                                Terms and Conditions
                                            </div>
                                        </div>)}
                                    </div>
                                )}

                                {selType == "notes" && (<div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '20px', background: '#f9f9f9', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                                        Notes
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                                        {opportunityData[+selId] && opportunityData[+selId]["Other Information"] || 'NA'}
                                    </div>
                                </div>)}
                            </div>)}
                            {(opportunityData?.length == 0 && isBuyer) && (<div onClick={() => { setShowZoputsuGetInTouchPopup(true); setselGT("opportunity"); setselOppr(opportunityData[+selId]) }} style={{ margin: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontFamily: 'Inter',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        background: '#E20B18',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Request for Proposal {'>'}
                                </Typography>
                            </div>)}
                        </div>
                        {isBuyer && (
                            <Col xs={12} sm={5} md={4} lg={4} xl={3} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'flex-start' }}>
                                <div
                                    style={{
                                        background: `url(${Gradient}) no-repeat center/cover`,
                                        borderRadius: '20px',
                                        position: 'relative',
                                        padding: '20px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <div>
                                            <Typography
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: '700',
                                                    fontFamily: 'Inter',
                                                    color: '#ffffff',
                                                    textAlign: 'start'
                                                }}
                                            >
                                                Didn’t find what you are looking for ?
                                            </Typography>
                                            <Typography
                                                style={{
                                                    fontSize: '15px',
                                                    fontWeight: '500',
                                                    fontFamily: 'Inter',
                                                    color: '#ffffff',
                                                    textAlign: 'start',
                                                    marginTop: '5px'
                                                }}
                                            >
                                                Please let us know more about your requirements. We are domain experts, and maybe able to help you.
                                            </Typography>
                                        </div>
                                    </div>

                                    <div onClick={() => { if (isQuickReg) { } else { setShowZoputsuGetInTouchPopup2(true); setselGT("asset") } }} style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography
                                            sx={{
                                                color: "red",
                                                fontFamily: 'Inter',
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                background: 'white',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Get in touch {'>'}
                                        </Typography>

                                        <img
                                            style={{ width: '74px', height: '74px', position: 'absolute', right: '10px', bottom: '3px' }}
                                            className={'rotating-image'}
                                            src={sports}
                                        />
                                    </div>
                                </div>
                            </Col>)}





                        {(isQuickReg) && (<Row style={{ width: '100%', marginBottom: '50px', marginTop: '20px' }}>

                            {(isQuickReg) && (
                                <Col xs={12} sm={isQuickReg ? 12 : 6} md={6} lg={6} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'flex-start' }} style={{ marginTop: '20px' }}>
                                    <div
                                        style={{
                                            // background: "#E20B18 ",
                                            background: `url(${Gradient}) no-repeat center/cover`,
                                            // background: "background: linear-gradient(296.72deg, rgba(113, 7, 7, 0.72) -1.26%, rgba(0, 0, 0, 0) 106.53%),linear-gradient(0deg, #E20B18, #E20B18),linear-gradient(89.16deg, rgba(132, 0, 0, 0.54) -0.95%, rgba(255, 255, 255, 0) 99.42%)",
                                            borderRadius: '20px',
                                            position: 'relative',
                                            padding: deviceType == 'mobile' ? '20px' : '40px 20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            // height: deviceType == 'mobile' ? '25vh' : '30vh'
                                            height: "100%"
                                        }}
                                    >
                                        <img src={fball1} style={{ position: 'absolute', right: 200, top: '-10px' }} />

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                width: '70%'
                                            }}
                                        >
                                            <div>
                                                <Typography
                                                    style={{
                                                        fontSize: deviceType == 'mobile' ? '20px' : '28px',
                                                        fontWeight: '700',
                                                        fontFamily: 'Inter',
                                                        color: '#ffffff',
                                                        textAlign: 'start'
                                                    }}
                                                >
                                                    {/* List Your Asset <br />Reach More Buyers */}
                                                    Do you want to list your asset or need any other support?
                                                </Typography>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography
                                                onClick={() => {
                                                    if (isQuickReg) {
                                                        setIsOpen(true)
                                                    } else {
                                                        setShowZoputsuGetInTouchPopup(true)
                                                    }
                                                }}
                                                sx={{
                                                    color: "red",
                                                    fontFamily: 'Inter',
                                                    fontSize: deviceType == 'mobile' ? "12px" : '16px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    background: 'white',
                                                    padding: '10px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                List Assets Now {'>'}
                                            </Typography>

                                            <img
                                                style={{ width: '74px', height: '74px', position: 'absolute', right: '10px', bottom: '3px' }}
                                                className={'rotating-image'}
                                                src={sports}
                                            />
                                        </div>
                                    </div>
                                </Col>)}

                            {(isQuickReg) && (
                                <Col xs={12} sm={isQuickReg ? 12 : 6} md={isQuickReg ? 6 : 4} lg={isQuickReg ? 6 : 4} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'flex-start' }} style={{ marginTop: '20px' }}>
                                    <div
                                        style={{
                                            background: `url(${Gradient}) no-repeat center/cover`,
                                            borderRadius: '20px',
                                            position: 'relative',
                                            padding: deviceType == 'mobile' ? '20px' : '40px 20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            // height: deviceType == 'mobile' ? '25vh' : '30vh'
                                            height: "100%"
                                        }}
                                    >
                                        <img className={'rotating-image2'} src={fball2} style={{ position: 'absolute', left: 200, bottom: '-10px' }} />

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                width: '70%'
                                            }}
                                        >
                                            <div>
                                                <Typography
                                                    style={{
                                                        fontSize: deviceType == 'mobile' ? '20px' : '28px',
                                                        fontWeight: '700',
                                                        fontFamily: 'Inter',
                                                        color: '#ffffff',
                                                        textAlign: 'start'
                                                    }}
                                                >
                                                    Didn’t find what you are looking for ?
                                                </Typography>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography
                                                onClick={() => {
                                                    if (isQuickReg) {
                                                        setIsOpen(true)
                                                    } else {
                                                        setShowZoputsuGetInTouchPopup(true)
                                                    }
                                                }}
                                                sx={{
                                                    color: "red",
                                                    fontFamily: 'Inter',
                                                    fontSize: deviceType == 'mobile' ? "12px" : '16px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    background: 'white',
                                                    padding: '10px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Get in touch {'>'}
                                            </Typography>

                                            <img
                                                style={{ width: '74px', height: '74px', position: 'absolute', right: '10px', bottom: '3px' }}
                                                className={'rotating-image'}
                                                src={sports}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            )}

                        </Row>)}











                    </div>
                </div>
                <div style={{ height: '60px' }}></div>
                <ZoptsuFooter
                    onPrivacyPolicyButtonClicked={onPrivacyPolicyButtonClicked}
                    onTOSCLick={handleTOS}
                />

                <Modal
                    open={isOpen}
                    onClose={() => { setIsOpen(false) }}
                >
                    <Box sx={style}>
                        <Box
                            sx={{
                                width: "100%",
                                height: '56px',
                                padding: "16px ",
                                gap: "0px",
                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                borderColor: "rgba(224, 224, 224, 1)",
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <Typography id="modal-title" variant="h6" component="h2" sx={{
                                fontFamily: "Inter",
                                fontSize: "16px",
                                fontWeight: 700,
                                lineHeight: "24px",
                                textAlign: "left",
                            }}>


                                Complete Registration
                            </Typography>

                            <button onClick={() => { setIsOpen(false) }} style={{ backgroundColor: 'transparent', border: '0px solid transparent', fontSize: '16px', cursor: 'pointer' }} ><Close /></button>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                gap: "0px",
                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                borderColor: "rgba(224, 224, 224, 1)",
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <div
                                style={{
                                    borderRadius: '4px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: deviceType === 'mobile' ? "60%" : '80%',
                                    padding:
                                        deviceType === 'mobile' ? '12px 16px' : '10px 10px',
                                    gap: deviceType === 'mobile' ? '12px' : '16px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img src={SandClock} style={{ width: '50px' }} />
                                    <Typography
                                        style={{
                                            color: 'var(--Gray-1, #333)',
                                            fontFamily: 'Inter',
                                            fontSize: deviceType === 'mobile' ? '14px' : '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '500',
                                            lineHeight: '130%',
                                            textAlign: 'center',
                                            margin: '10px'
                                        }}
                                    >
                                        Please complete your registration to access this feature.
                                    </Typography>
                                </div>
                            </div>
                        </Box>

                        <Box
                            sx={{
                                width: "100%",
                                padding: "16px ",
                                gap: "0px",
                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                borderColor: "rgba(224, 224, 224, 1)",
                                justifyContent: 'space-evenly',
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'row',
                                boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.07)",

                            }}
                        >
                            <Button onClick={() => {
                                navigate('/completeregistration')
                                setIsOpen(false)
                            }} sx={{
                                color: "#FFF",
                                padding: '12px, 16px, 12px, 16px', backgroundColor: "rgba(226, 11, 24, 1)",
                                border: "0px solid rgba(189, 189, 189, 1)",
                                fontSize: "14px",
                                fontWeight: 600,
                                ':hover': {
                                    backgroundColor: "rgba(226, 11, 24, 0.6)",
                                }
                            }}>
                                Complete
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <Modal
                    open={dialog}
                    onClose={() => { setDialog(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "40%",
                        bgcolor: 'background.paper',
                        border: '0px solid #000',
                        boxShadow: 8,
                        borderRadius: 3,
                        p: 2,
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                        paddingBottom: '30px'
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    style={{
                                        textAlign: 'left',
                                        paddingTop: '16px',
                                        color: 'var(--Gray-1, #333)',
                                        fontFamily: 'Inter',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        lineHeight: '140%',
                                    }}
                                >
                                    {head}
                                </Typography>
                                <Close
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setDialog(false)}
                                />
                            </div>
                            <Typography
                                style={{
                                    textAlign: 'left',
                                    paddingTop: '16px',
                                    color: 'var(--Gray-1, #333)',
                                    fontFamily: 'Inter',
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    lineHeight: '140%',
                                    whiteSpace: 'pre-wrap', // Preserve whitespace if needed
                                }}
                            >
                                {desc}
                            </Typography>
                        </div>
                    </Box>
                </Modal>


                {showZoputsuGetInTouchPopup && (<ZoputsuGetInTouch2
                    assettype={assetData?.AssetType}
                    showZoputsuGetInTouchPopup={showZoputsuGetInTouchPopup}
                    assetName={assetData?.Name}
                    closePopup={() => {
                        setShowZoputsuGetInTouchPopup(false);
                    }}
                    sellerId={sellerId}
                    assetZohoId={assetZohoId}
                    sellerOrgId={sellerOrgId}
                    sellerObj={sellerObj}
                    // opportunity={ selGT=="asset"?opportunityData:[selOppr]}
                    opportunity={opportunityData}
                    oppr={selGT == "asset" ? '' : selOppr}
                    assetData={assetData}
                    selType={selGT}
                />)}

                {showZoputsuGetInTouchPopup2 && (<ZoputsuGetInTouch1 showZoputsuGetInTouchPopup={showZoputsuGetInTouchPopup2} pg={"Asset Details"} closePopup={() => {
                    setShowZoputsuGetInTouchPopup2(false);
                }} />)}

            </div>
        );
    }
}

export default AssetDetails;