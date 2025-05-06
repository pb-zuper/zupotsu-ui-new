import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ZupotsuColuredLogo, ArrowrightRed, CricketBall, TouchingHand, GlouseGames, SearchNormal, NoDataImage, LinearGrid, List, Sort, BackgroundTennis, ZopotsuLogo, globalEarth, ln, instagramI, fb1, arrowLeft, arrowRight, fball2, fball1 } from '../assets'
import sports from "../assets/sports.svg"
import { Box, Button, FormControl, Grid, InputAdornment, MenuItem, Modal, Paper, Select, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import useDeviceType from '../utils/DeviceType'
import Breadcrumb from '../Atoms/breadcrumb/breadcrumb'
import ZoptsuUnderlineTitle from '../Atoms/zoputsu-underline-title-text/zoptsu-underline-title'
import Apis from '../services/apis'
import AssetCard1 from '../Molecules/cards/AssetCard1'
import NoData from '../error/NoData'
import { useNavigate } from 'react-router-dom'
import Eventscreentable from '../Molecules/table-management/Eventscreentable'
import VisibilityButton from '../Atoms/Visibility/VisibilityButton'
import Gradient from '../assets/gradient.png';
import { Carousel } from 'react-responsive-carousel'
import { Container, Row, Col } from 'react-bootstrap';
import ZoptsuFooter from '../Molecules/zoptsu-footer/zoptsu-footer'
import AssetCard2 from '../Molecules/cards/AssetCard2'
import Slider from '@mui/material/Slider';
import Fab from '@mui/material/Fab';
import { touch2 } from '../assets';
import { uploadFile } from '../Atoms/file-upload/FileUpload'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ZupotsuAutocomplete from '../Atoms/zupotsu-textfields/zupotsu-autocomplete'
import ZupotsuMultiSelect from '../Atoms/zupotsu-multiselect/zupotsu-multiselect'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import ZoputsuGetInTouch1 from '../Atoms/zoputsugetintouch/zoputsugetintouch1'
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import mixpanelEvents from '../mixpanel/mixpanelEvents'

const CatalogueIframe: any = () => {
    const deviceType = useDeviceType()
    const [acceptDialog, setAcceptDialog] = useState(false);
    const [statusFilter, setStatusFiltering] = useState<any>("published")
    const [showRejectedAssetData, setShowRejectAssetData] = useState<boolean>(false);
    const [rejectedAssetData, setRejectAssetData] = useState<{
        assetId: string;
        assetTitle: string;
    }>({ assetId: '', assetTitle: '' });
    const [selectedCategory, setSelectedCategory] = useState<string>('underReview');
    const [buttonType, setButtonType] = useState<string>("");
    const [requestActionObject, setRequestActionObject] = useState({});
    const [showZoputsuGetInTouchPopup, setShowZoputsuGetInTouchPopup] = useState<boolean>(false);
    const [openAssetDetailDialog, setOpenAssetDetailsDialog] = useState(false);
    const [onGetInTouch, setOnGetInTouch] = useState('#333');
    const [city, setcity] = useState("")
    const headers = ['Thumbnail', 'Asset Class Category', 'Name', "Headline", "Sport", 'Social handles', "Reach", "View"];
    const [reason, setReason] = useState<string>('');
    const [typeofSort, setTypeofSort] = useState<boolean>(true)
    const [currentItems, setCurrentItems] = useState([])
    const [tableData, setTableData] = useState(currentItems);
    const [type, setType] = useState<any>("")
    const [sport, setSport] = useState<any>("")
    const [atype, setAtype] = useState<any>("")
    const [country, setCountry] = useState<any>("")
    const [state, setstate] = useState<any>("")
    const [exclusivity, setExcluivity] = useState<any>("")
    const [bannerData, setbannerData] = useState<any>([]);
    const [trayData, setTraydata] = useState<any>([]);
    const [timing, setTiming] = useState<any>()
    const apis = new Apis();
    const navigate = useNavigate();
    const [filterData, setfilterData] = useState<any>({})
    const [sortData, setSortData] = useState<any>([])
    const [allAsset, setAllAsset] = useState<any>()
    const [load, setLoad] = useState<any>(false)
    const [loader, setLoader] = useState<any>(false)
    const scrollContainerRefs: any = useRef([]);
    const [search, setSearch] = useState<any>("");
    const [sortBy, SetSortBy] = useState<any>();
    const [isSearch, setisSearch] = useState(false);
    const [budget, setBudget] = useState<any>([0, 0]);
    const [isOpen, setIsOpen] = useState(false);
    const [allData, SetallData] = useState<any>([])
    const [allcountry, SetallCountry] = useState<any>([])
    const [allState, SetallState] = useState<any>([])
    const [isOpenFilter, SetisOpenfilter] = useState<any>(false)
    const [allcities, Setallcities] = useState<any>([])
    const isSeller = (localStorage.getItem("role")?.toLowerCase() === "seller") ? true : false;
    const isAdmin = (localStorage.getItem("role")?.toLowerCase() === "admin" || localStorage.getItem("role")?.toLowerCase() === "publisher" || localStorage.getItem("role")?.toLowerCase() === "approver") ? true : false;
    const isBuyer = (localStorage.getItem("role")?.toLowerCase() === "buyer") ? true : false;
    const [sportmedia, setSportsMedia] = useState([])
    const columns: any = [

        {
            field: 'thumbnail',
            render: (value: any) => <img src={value} style={{
                width: "104px",
                height: "30px",
                padding: "4px 0px 4px 0px",
                gap: "10.11px",
                borderRadius: "4.04px 0px 0px 0px",
                border: "0.51px 0px 0px 0px",
            }} />,
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" }
        },
        {
            field: 'assetclasscategory',
            render: (value: any) => <p>{value}</p>,
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" }
        },
        {
            field: 'name',
            render: (value: any) => <p>{value}</p>,
            cellStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '40px' }
        },
        {
            field: 'headline',
            render: (value: any) => <p>{value}</p>,
            cellStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '40px' }
        },
        {
            field: 'sport',
            render: (value: any) => <p>{value}</p>,
            cellStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '40px' }
        },
        {
            field: 'socialhandles',
            render: (value: any) => <p>{value}</p>,
            cellStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '40px' }
        },
        {
            field: 'audiencetype',
            render: (value: any) => <p>{value}</p>,
            cellStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '40px' }
        },
        {
            field: 'reach',
            render: (value: any) => <p>{value}</p>,
            cellStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '40px' }
        },

        {
            field: 'actions',
            render: (_: any, item: any) => (
                <VisibilityButton onVisibility={false} />
            ),
            cellStyle: { padding: 0, border: "0px solid transparent" }
        }

    ];

    const linkDetails = useMemo(() => {
        return [
            {
                label: 'Home',
                url: '',
            },
            {
                label: 'Catalog',
                url: '',
            }
        ];
    }, []);

    const openAssetDetailsDialog = (isOpen: boolean, data: any) => {
        setOpenAssetDetailsDialog(true);
    };

    const onPrivacyPolicyButtonClicked = () => {
        window.open("https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/Zupotsu%20-%20PrivacyPolicy%20-%20NJ.docx.pdf", '_blank');
    };

    const handleTOS = () => {
        window.open("https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/TOS.pdf", '_blank');
    };

    const getAllBannerApiCall = () => {
        setLoad(true)
        apis.getAllBannerIF()
            .then((response: any) => {
                response.data.data.sort((a: any, b: any) => a.priority - b.priority);
                let arr: any = []
                response.data.data.map((item: any) => {
                    if (item.asset_id && (item.asset_status == "published" || item.asset_status == "edited")) {
                        arr.push(item)
                    }
                    else if (!item.asset_id) {
                        arr.push(item)
                    }
                })
                setbannerData(arr)
                apis.getAllTraysIF()
                    .then((response: any) => {
                        response.data.data.sort((a: any, b: any) => a.priority - b.priority);
                        let arr2: any = []
                        response.data.data.map((item: any) => {
                            let filarr = item.tray_assets.filter((asset: any) => { return ((asset.asset_status == "published" || asset.asset_status == "edited") && (asset.asset_status != "private")) })
                            item.tray_assets = filarr;
                            arr2.push(item)
                        })
                        const fetchData = async () => {
                            try {
                                const mediaResponse: any = await apis.getSportsMedia();
                                const arrmedia: any = mediaResponse?.data?.data || [];
                                setSportsMedia(mediaResponse?.data?.data || [])
                                if (arr2?.length > 0) {
                                    const updatedAssets = arr2.map((item: any) => {
                                        return {
                                            ...item,
                                            tray_assets: item.tray_assets?.map((item3: any) => {
                                                const media = arrmedia?.find(
                                                    (item1: any) =>
                                                        item3?.sport[0]?.trim()?.toLowerCase() ===
                                                        item1?.name?.trim()?.toLowerCase()
                                                );
                                                return {
                                                    ...item3,
                                                    sportmedia: media || {},
                                                };
                                            }),
                                        };
                                    });
                                    setTraydata(updatedAssets);
                                }
                            } catch (error: any) {
                                console.error("Error fetching media data:", error);
                                mixpanelEvents.errorHandling({
                                    name: 'Catalogue Screen',
                                    msg: error?.response?.data?.error || error?.message
                                })
                            }
                        };

                        fetchData();

                    })
                    .catch((error) => {
                        setLoad(false)
                        mixpanelEvents.errorHandling({
                            name: 'Catalogue Screen',
                            msg: error?.response?.data?.error || error?.message
                        })
                    });
            })
            .catch((error) => {
                setLoad(false)
                mixpanelEvents.errorHandling({
                    name: 'Catalogue Screen',
                    msg: error?.response?.data?.error || error?.message
                })
            })
            .finally(() => {
                setLoad(false)
            })
    }


    useEffect(() => {
        const startTime = performance.now();

        const fetchAndTrack = async () => {
            await getAllBannerApiCall();
            const loadTime = performance.now() - startTime;
            mixpanelEvents.onLoad(loadTime, 'Catalogue Screen');
        };
        fetchAndTrack();

        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Catalogue Screen', timeSpent);
        };
    }, []);

    const handleChangeTable = (event: any, item: any) => {
        const newRole = event.target.value;
        const newData: any = tableData.map((dataItem: any) =>
            dataItem.name === item.name ? { ...dataItem, role: newRole } : dataItem
        );
        setTableData(newData);
    };

    const functionSort = () => {
        setTypeofSort(!typeofSort)
    };

    const handleChangeBudget = (event: any, newValue: any) => {
        setBudget(newValue);
    };

    const ErrorData = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message: 'No assets found',
        }),
        []
    );

    const scrollLeft: any = (index: any) => {
        scrollContainerRefs.current[index].scrollBy({ left: -350, behavior: 'smooth' });  // Adjust the value as needed
    };

    const scrollRight: any = (index: any) => {
        scrollContainerRefs.current[index].scrollBy({ left: 350, behavior: 'smooth' });  // Adjust the value as needed
    };

    const fabStyle: any = {
        position: 'fixed',
        bottom: '30px',
        right: deviceType == "mobile" ? '20px' : '50px',
    };

    const submitQuery = async (data: any, fileData: any) => {
        setLoader(true);
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

    const [showGetInTouchSuccess, setShowGetInTouchSuccess] =
        useState<boolean>(false);

    const getInTouchPopupButtonClicked = (buttonKey: string, data?: any) => {
        switch (buttonKey) {
            case 'submit':
                if (data?.file) {
                    uploadFileInTouchPopup(data);
                } else {
                    submitQuery(data, null);
                }
                break;
            case 'cancel':
                setShowZoputsuGetInTouchPopup(false);
                break;
        }
    };

    const uploadFileInTouchPopup = async (data: any) => {
        setLoader(true)
        const response: any = await uploadFile(data?.file);
        if (response?.data?.statusCode === 200) {
            const fileData = response?.data?.result;
            submitQuery(data, fileData);
        } else {
            setLoader(false)
        }
    };

    const [forceUpdate, setForceUpdate] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setForceUpdate((prev) => !prev);
        }, 100);
    }, []);

    const [isFixed, setIsFixed] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [CurrencyData, setCurrencyData] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            if (divRef.current && containerRef.current) {
                const offsetTop = divRef.current.offsetTop - 200;
                const scrollPosition = containerRef.current.scrollTop;

                if (scrollPosition >= offsetTop) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const fabStyle2: any = {
        position: 'fixed',
        bottom: '110px',
        right: deviceType == "mobile" ? '20px' : '50px',
    };



    if (load && !bannerData) {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }

    else {
        return (
            <div ref={containerRef} style={{ width: '100%', backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                {/* {!isAdmin && (<Fab onClick={() => {
                    window.open("https://www.zupotsu.com/faqs", "_blank");
                }} style={fabStyle2} color="primary" aria-label="add">
                    <ContactSupportOutlinedIcon sx={{ color: '#FFF', width: '30px', height: '30px' }} />
                </Fab>)}
                <Fab onClick={() => { setShowZoputsuGetInTouchPopup(true) }} style={fabStyle} color="primary" aria-label="add">
                    <img src={touch2} />
                </Fab> */}
                <div style={{}}>
                    {Array.isArray(bannerData) && bannerData?.length > 0 && (
                        <Box className={"ecarouselContainer"} >
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
                                {bannerData?.map((item: any, index: any) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            if (item.asset_id) {
                                                window.open(process.env.REACT_APP_ZUPOTSU_BASE_URL + `/assetDetails?id=${item.asset_id}`, "_blank")
                                            }
                                        }}
                                        style={{ width: '100%', display: 'flex' }}
                                    >
                                        {deviceType != "mobile" && (<div style={{ width: '25%' }}></div>)}
                                        {deviceType == "mobile" && (<div style={{ width: '5%' }}></div>)}
                                        <div className={"ecarouselItem"} style={{ width: deviceType === "mobile" ? "95%" : '75%' }}>
                                            <img src={item.banner_image} className={"eslideImage"} />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    left: '0px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    background: deviceType === "mobile" ? 'linear-gradient(90deg, #231C1C 6.34%, rgba(69, 1, 0, 0) 93.83%)' : 'linear-gradient(90deg, #231C1C 26.34%, rgba(69, 1, 0, 0) 74.83%)',
                                                    width: '100%',
                                                    alignItems: 'flex-start',
                                                    gap: '5px',
                                                    height: '100%',
                                                    padding: deviceType === "mobile" ? '20px' : '40px'
                                                }}
                                            >
                                                <div style={{ width: '100%' }}>
                                                    <Box sx={{
                                                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: deviceType === 'mobile' ? '10px' : '20px', width: deviceType === 'mobile' ? '100%' : '60%'
                                                    }} >
                                                        <Typography
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
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                color: '#FFF',
                                                                fontFamily: 'Inter',
                                                                fontSize: deviceType === "mobile" ? "14px" : "16px",
                                                                fontWeight: 500,
                                                                textAlign: "left",
                                                                wordBreak: 'break-word',
                                                                paddingTop: deviceType === 'mobile' ? '10px' : '20px',
                                                                whiteSpace: 'wrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitBoxOrient: 'vertical',
                                                                WebkitLineClamp: 2,
                                                            }}
                                                            variant="h6"
                                                        >
                                                            {item.description}
                                                        </Typography>
                                                    </Box>
                                                </div>

                                                {/* <Button
                                                    onClick={(event) => {
                                                        event.stopPropagation(); // Prevent the click event from propagating to the outer div
                                                        setShowZoputsuGetInTouchPopup(true);
                                                    }}
                                                    sx={{
                                                        backgroundColor: '#FFF',
                                                        borderRadius: '2px',
                                                        gap: "4px",
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-evenly',
                                                        border: '0px solid transparent',
                                                        ':hover': {
                                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                                        },
                                                    }}
                                                >
                                                    <img src={TouchingHand} alt='Touchinghand' style={{ width: '24px', height: '24px' }} />
                                                    <p style={{
                                                        color: "rgba(226, 11, 24, 1)",
                                                        fontWeight: '600',
                                                        margin: 0,
                                                        fontSize: deviceType === "mobile" ? '12px' : '16px'
                                                    }}>Get in Touch</p>
                                                </Button> */}
                                            </Box>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </Box>
                    )}
                </div>
                <div style={{
                    width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: deviceType == 'mobile' ? '10px' : '20px'
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            backgroundColor: 'transparent',
                            padding: "15px",
                            width: '100%',
                            alignItems: 'flex-start',
                            gap: '0px'
                        }}
                    >


                        {trayData?.map((tray: any, index: any) => {
                            return (
                                <div key={index} style={{ width: '100%', marginTop: index == 0 ? "10px" : '60px' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%'
                                        }}>

                                        <ZoptsuUnderlineTitle
                                            fontSizeOnLargeScreen="48px"
                                            fontSizeOnMediumScreen="46px"
                                            fontSizeOnSmallScreen="44px"
                                            fontSizeOnExtraSmallScreen="37px"
                                            titleText={tray?.name}
                                            letterSpacing="1.92px"
                                            lineHeight="40.2px"
                                            textAlign="start"
                                            underlineWidthForDesktop="100%"
                                            underlineWidthForSmallTablet="100%"
                                            underlineWidthForMobile="100%"
                                            underlineBottomForDesktop="18%"
                                            underlineBottomForSmallTablet="21%"
                                            underlineBottomForMobile="24%"
                                            // linearGradientPresent={true}
                                            paddingLeft="0px"
                                            underlineHeight="9px"
                                        />
                                        {tray.tray_assets?.length > tray.limit_assets && (<button
                                            style={{
                                                padding: '12px 16px',
                                                textTransform: 'none',
                                                color: 'rgba(201, 52, 49)',
                                                fontFamily: 'Inter',
                                                fontSize: '14px',
                                                fontStyle: 'normal',
                                                fontWeight: '600',
                                                lineHeight: '140%',
                                                border: "0px solid transparent",
                                                backgroundColor: "transparent"

                                            }}
                                            onClick={() => { window.open(process.env.REACT_APP_ZUPOTSU_BASE_URL + `/catalogue/tray?id=${tray.id}`, "_blank") }}
                                        >
                                            View All
                                        </button>)}
                                    </Box>
                                    <Typography
                                        style={{
                                            textAlign: 'left',
                                            paddingTop: deviceType == 'mobile' ? '5px' : '15px',
                                            color: 'rgba(51, 51, 51, 1)',
                                            fontFamily: 'Inter',
                                            fontSize: deviceType == 'mobile' ? '18px' : '20px',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            lineHeight: '30px',

                                        }}
                                    >
                                        {tray.description}
                                    </Typography>


                                    {tray.tray_assets?.length > 0
                                        ? (
                                            typeofSort == true ? (
                                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: '15px', marginLeft: "-15px" }}>
                                                    {((deviceType == 'mobile' && (tray.tray_assets?.length > 1 && tray.limit_assets > 1)) || (tray.tray_assets?.length > 4 && tray.limit_assets > 4)) && (<button onClick={() => scrollLeft(index)} style={{ position: 'absolute', left: 0, zIndex: 1, padding: '10px 4px', color: '#FFF', fontFamily: 'Inter', fontSize: '16px', fontStyle: 'normal', fontWeight: '600', textTransform: 'capitalize', background: '#E22B16', border: 'none', borderRadius: 8 }}>
                                                        <img style={{ filter: 'brightness(0) invert(1)' }} src={arrowLeft} />
                                                    </button>)}
                                                    <div
                                                        ref={el => scrollContainerRefs.current[index] = el}
                                                        style={{
                                                            display: 'flex',
                                                            flexWrap: 'nowrap',
                                                            justifyContent: "flex-start",
                                                            overflowX: 'scroll',
                                                            overflowY: 'hidden',
                                                            scrollbarWidth: 'none',
                                                            alignItems: "center",
                                                            gap: '0px',
                                                            padding: '0px',
                                                            margin: 0,
                                                            marginTop: deviceType === 'mobile' ? '0px' : '0px',
                                                            width: '100%'
                                                        }}
                                                    >
                                                        {(tray?.tray_assets?.sort((a: any, b: any) => a.priority - b.priority).slice(0, tray.limit_assets))?.map((assetDetail: any, index: any) => {
                                                            const detail: any = assetDetail
                                                            assetDetail = assetDetail;
                                                            return (
                                                                <div style={{ padding: '15px' }} key={index}>
                                                                    <Grid
                                                                        sx={{
                                                                            // margin: '15px'
                                                                        }}
                                                                        item
                                                                    >
                                                                        <AssetCard2
                                                                            key={index}
                                                                            isIframe={true}
                                                                            eventscreen={false}
                                                                            statusFilter={statusFilter}
                                                                            comesFrom={'admin'}
                                                                            {...assetDetail}
                                                                            index={index}
                                                                            isAdmin={true}
                                                                            onEdit={() => { }}
                                                                            isEdit={true}
                                                                            getInTouchButtonClicked={() =>
                                                                                setShowZoputsuGetInTouchPopup(true)
                                                                            }
                                                                            setRequestActionObject={setRequestActionObject}
                                                                            reason={reason}
                                                                            id={assetDetail.asset_id}
                                                                            buttonType={buttonType}
                                                                            setButtonType={setButtonType}
                                                                            setShowRejectAssetData={setShowRejectAssetData}
                                                                            setAcceptDialog={setAcceptDialog}
                                                                            selectedCategory={selectedCategory}
                                                                            detail={detail?.sportmedia}
                                                                            assetDetail={assetDetail}
                                                                            rejectionData={rejectedAssetData?.assetTitle}
                                                                            openAssetDetailsDialog={(isOpen, data) => {
                                                                                openAssetDetailsDialog(isOpen, data);
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    {((deviceType == 'mobile' && (tray.tray_assets?.length > 1 && tray.limit_assets > 1)) || (tray.tray_assets?.length > 4 && tray.limit_assets > 4)) && (<button onClick={() => scrollRight(index)} style={{ position: 'absolute', right: 0, zIndex: 1, padding: '10px 4px', color: '#FFF', fontFamily: 'Inter', fontSize: '16px', fontStyle: 'normal', fontWeight: '600', textTransform: 'capitalize', background: '#E22B16', border: 'none', borderRadius: 8 }}>
                                                        <img style={{ filter: 'brightness(0) invert(1)' }} src={arrowRight} />
                                                    </button>)}
                                                </div>
                                            ) : (
                                                <div style={{ gap: '10px', overflowX: 'scroll', marginTop: '15px', marginLeft: "0px", width: '100%' }} >
                                                    <Paper elevation={3} sx={{ border: '2px solid rgba(0,0,0,0.001)', fontFamily: "Inter", padding: "10px", boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(255, 255, 255, 1)", width: '100%', }}>
                                                        <Eventscreentable
                                                            columns={columns}
                                                            // tableData={tableData}
                                                            tableData={tray.tray_assets}
                                                            setTableData={setTableData}
                                                            headers={headers}
                                                            handleChange={handleChangeTable}
                                                            isSearch={false}
                                                        />
                                                    </Paper>
                                                </div>
                                            )
                                        ) : (
                                            <NoData ErrorData={ErrorData} />
                                        )
                                    }
                                </div>
                            )
                        })}


                    </Box>
                </div >
                {/* <Row style={{ width: '100%', marginBottom: '50px', marginTop: '20px' }}>

                    <Col xs={12} sm={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'flex-start' }} style={{ marginTop: '20px' }}>
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
                                        List Your Asset <br />Reach More Buyers
                                    </Typography>
                                </div>
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography
                                    onClick={() => {
                                        setShowZoputsuGetInTouchPopup(true)
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
                    </Col>

                    <Col xs={12} sm={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'flex-start' }} style={{ marginTop: '20px' }}>
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
                                    onClick={() => { setShowZoputsuGetInTouchPopup(true) }}
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

                </Row> */}
                {/* <ZoputsuGetInTouchPopup
                    showPopup={showZoputsuGetInTouchPopup}
                    closePopup={() => {
                        setShowZoputsuGetInTouchPopup(false);
                    }}
                    buttonClicked={getInTouchPopupButtonClicked}
                    showDetailsSavedView={showGetInTouchSuccess}
                    showLoader={loader}
                /> */}
                <ZoputsuGetInTouch1 showZoputsuGetInTouchPopup={showZoputsuGetInTouchPopup} pg={"Website Catalogue"} closePopup={() => {
                    setShowZoputsuGetInTouchPopup(false);
                }} />
                {/* <ZoputsuGetInTouch2 showZoputsuGetInTouchPopup={showZoputsuGetInTouchPopup} closePopup={() => {
                    setShowZoputsuGetInTouchPopup(false);
                }}  /> */}
            </div >
        )
    }
}

export default CatalogueIframe
