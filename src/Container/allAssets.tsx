import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ZupotsuColuredLogo, ArrowrightRed, CricketBall, TouchingHand, GlouseGames, SearchNormal, NoDataImage, LinearGrid, List, Sort, BackgroundTennis, ZopotsuLogo, globalEarth, ln, instagramI, fb1, arrowLeft, arrowRight, fball2, fball1 } from '../assets'
import sports from "../assets/sports.svg"
import { Box, Button, FormControl, Grid, InputAdornment, MenuItem, Paper, Select, TableCell, TableHead, TableRow, TextField, Typography, Modal } from '@mui/material'
import ZupotsuButton from '../Atoms/zupotsu-button/zupotsu-button'
import useDeviceType from '../utils/DeviceType'
import { KeyboardArrowDownOutlined, KeyboardArrowRight, SportsBarOutlined } from '@mui/icons-material'
import Breadcrumb from '../Atoms/breadcrumb/breadcrumb'
import ZupotsuDropdown from '../Atoms/zupotsu-dropdown/zupotsu-dropdown'
import ZoptsuUnderlineTitle from '../Atoms/zoputsu-underline-title-text/zoptsu-underline-title'
import Apis from '../services/apis'
import NoData from '../error/NoData'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ZupotsuAutocomplete from '../Atoms/zupotsu-textfields/zupotsu-autocomplete'
import ZupotsuMultiSelect from '../Atoms/zupotsu-multiselect/zupotsu-multiselect'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import ZoputsuGetInTouch1 from '../Atoms/zoputsugetintouch/zoputsugetintouch1'
import mixpanelEvents from '../mixpanel/mixpanelEvents'
import BackspaceIcon from '@mui/icons-material/Backspace';


const AllAssetScreen = () => {
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
    const [city, setcity] = useState("")
    const headers = ['Image', 'Asset Type', 'Name', "Headline", "Sport", 'Followers', "View"];
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
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') ?? '';
    const [isOpen, setIsOpen] = useState(false);
    const [allData, SetallData] = useState<any>([])
    const [allcountry, SetallCountry] = useState<any>([])
    const [allState, SetallState] = useState<any>([])
    const [allcities, Setallcities] = useState<any>([])
    const isAdmin = (localStorage.getItem("role")?.toLowerCase() === "admin" || localStorage.getItem("role")?.toLowerCase() === "publisher" || localStorage.getItem("role")?.toLowerCase() === "approver") ? true : false;
    const isBuyer = (localStorage.getItem("role")?.toLowerCase() === "buyer") ? true : false;
    const isSeller = (localStorage.getItem("role")?.toLowerCase() === "seller") ? true : false;
    const isSellerAdmin = (localStorage.getItem("role")?.toLowerCase() === "seller-admin") ? true : false;
    const [isOpenFilter, SetisOpenfilter] = useState<any>(false)
    const currency: any = localStorage.getItem("preferred_currency");
    const [CurrencyData, setCurrencyData] = useState([]);


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
            field: 'actions',
            render: (_: any, item: any) => (
                <VisibilityButton onVisibility={false} />
            ),
            cellStyle: { padding: 0, border: "0px solid transparent" }
        }

    ];


    const openAssetDetailsDialog = (isOpen: boolean, data: any) => {
        setOpenAssetDetailsDialog(true);
    };

    const onPrivacyPolicyButtonClicked = () => {
        window.open("https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/Zupotsu%20-%20PrivacyPolicy%20-%20NJ.docx.pdf", '_blank');
    };

    const handleTOS = () => {
        window.open("https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/TOS.pdf", '_blank');
    };

    const fetchCurrency = async () => {
        try {
            const assetsResponse = await apis.getCurrency();
            const curr: any = []
            if (assetsResponse?.data?.status?.toLowerCase() == "success") {
                const exchangeRates: any = {}
                assetsResponse?.data?.data.map((item: any) => {
                    exchangeRates[item.name] = item.value
                })
                setCurrencyData(exchangeRates)
                setBudget([0, (Math.round((1000000 / exchangeRates[currency]) / 1000) * 1000) + 100])
            }

        } catch (error) {
            console.error("Error fetching assets or media:", error);
        }
    };

    useEffect(() => {
        const startTime = performance.now();
        const fetchAndTrack = async () => {
            await getAllBannersApi()
            const loadTime = performance.now() - startTime;
            mixpanelEvents.onLoad(loadTime, 'Tray Assets Listing Page');
        };
        fetchAndTrack();
        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Tray Assets Listing Page', timeSpent);
        };
    }, [])

    const getAllBannersApi = () => {
        setLoad(true)
        fetchCurrency()
        apis.getAllBanner()
            .then((response: any) => {
                response.data.data.sort((a: any, b: any) => a.priority - b.priority);
                let arr: any = []
                response.data.data.map((item: any) => {
                    if (item.is_active == true && item.is_deleted == false) {
                        arr.push(item)
                    }
                })
                setbannerData(arr)
                apis.getTray(id)
                    .then((trayResponse: any) => {
                        const trayData = trayResponse.data.data;
                        setTraydata(trayData)
                        apis.filters()
                            .then((response: any) => {
                                setfilterData(response.data.data.filters)
                                // setSortData(response.data.data.sort)
                                setSortData([{
                                    "name": "Sort By",
                                    "sort": null,
                                    "sortorder": null
                                },...response.data.data.sort])
                                SetallCountry(response.data.data.filters.country)
                                SetallState(response.data.data.filters.state);
                                Setallcities(response.data.data.filters.city);
                                setLoad(false)
                                // apis.getCountries()
                                //     .then((response: any) => {
                                //         SetallData(response.data.data)
                                //         let arr: any = []
                                //         response.data.data.map((item: any) => {
                                //             arr.push(item.country)
                                //         })
                                //         SetallCountry(arr)
                                //         setLoad(false)
                                //     })
                                //     .catch((error) => {
                                //         setLoad(false)
                                //     });

                            })
                            .catch((error) => {
                                mixpanelEvents.errorHandling({
                                    name: 'Tray Assets Listing Page',
                                    msg: error?.response?.data?.error || error?.message
                                })
                                setLoad(false)
                            });
                    })
                    .catch((error) => {
                        mixpanelEvents.errorHandling({
                            name: 'Tray Assets Listing Page',
                            msg: error?.response?.data?.error || error?.message
                        })
                        setLoad(false)
                    });
            })
            .catch((error) => {
                setLoad(false)
                mixpanelEvents.errorHandling({
                    name: 'Tray Assets Listing Page',
                    msg: error?.response?.data?.error || error?.message
                })
            });
    }

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

    const filterFun = useCallback((body: any) => {
        console.log(body)
        setLoader(true);
        if (
            (search && search.length > 0) ||
            (atype && atype.length > 0) ||
            (type && type.length > 0) ||
            (sport && sport.length > 0) ||
            (country && country.length > 0) ||
            (exclusivity && exclusivity !== null) ||
            (city && city.length > 0) ||
            (state && state.length > 0) ||
            (timing && timing.length > 0) ||
            (sortBy && sortBy !== null) ||
            (budget && (budget[1] !== 0))
        ) {
            setisSearch(true);
        } else {
            setisSearch(false);
        }
        if (budget[1] == (Math.round((1000000 / CurrencyData[currency]) / 1000) * 1000) + 100) {
            body.budget.max = 0
        }
        if (
            JSON.stringify(body) != JSON.stringify({ "searchterm": null, "asset_type": [], "opportunity_type": [], "sport": [], "country": [], "exclusivity": null, "city": [], "state": [], "timing": [], "sortname": null, "sortorder": null, "budget": { "min": 0, "max": 0 }, trayid: parseInt(id) })
            &&
            JSON.stringify(body) != JSON.stringify({ "searchterm": null, "asset_type": [], "opportunity_type": [], "sport": [], "country": [], "exclusivity": null, "city": [], "state": [], "timing": [], "sortname": null, "sortorder": null, "budget": { "min": NaN, "max": NaN }, trayid: parseInt(id) })
        ) {
            const searchPageLoadData = {
                TrayName: trayData.name || null,
                FilterValue: body
            };
            mixpanelEvents.onTraySearchPageLoad(searchPageLoadData);
        }
        apis.searchAsset(body)
            .then((response) => {
                let filarr = response.data.data.filter((asset: any) => { return ((asset["_source"].asset_status == "published" || asset["_source"].asset_status == "edited") && (asset["_source"].asset_status != "private")) })
                setAllAsset(filarr);
                setLoader(false);
                if (response.data.data.length == 0 && budget[1] == (Math.round((1000000 / CurrencyData[currency]) / 1000) * 1000) + 100) {
                    setisSearch(false)
                }
            })
            .catch((error) => {
                setLoader(false);
            });
    }, [search, atype, type, sport, country, exclusivity, city, state, timing, budget]);


    useEffect(() => {
        let body = {
            searchterm: search || null,
            asset_type: atype || [],
            opportunity_type: type || [],
            sport: sport || [],
            country: country || [],
            exclusivity: (exclusivity == "All" ? null : exclusivity) || null,
            city: city || [],
            state: state || [],
            timing: timing || [],
            sortname: sortBy?.sort || null,
            sortorder: sortBy?.sortorder || null,
            budget: {
                min: budget[0],
                max: budget[1]
            },
            trayid: parseInt(id)
        }
        filterFun(body)
    }, [atype, type, sport, country, exclusivity, city, state, timing, budget]);

    useEffect(() => {
        if (search?.length > 2 || search?.length == 0) {
            let body = {
                searchterm: search || null,
                asset_type: atype || [],
                opportunity_type: type || [],
                sport: sport || [],
                country: country || [],
                exclusivity: (exclusivity == "All" ? null : exclusivity) || null,
                city: city || [],
                state: state || [],
                timing: timing || [],
                sortname: sortBy?.sort || null,
                sortorder: sortBy?.sortorder || null,
                budget: {
                    min: budget[0],
                    max: budget[1]
                },
                trayid: parseInt(id)
            };
            filterFun(body)
        }
    }, [search])

    const clearAllFun = () => {
        setAtype("")
        setType("")
        setSport("")
        setCountry("")
        setExcluivity("")
        setcity("")
        setstate("")
        setTiming("")
        SetSortBy("")
        setSearch("")
        // setBudget([0, 0])
        setBudget([0, (Math.round((1000000 / CurrencyData[currency]) / 1000) * 1000) + 100])
        setAllAsset([])
    }

    const fabStyle: any = {
        position: 'fixed',
        bottom: '30px',
        right: deviceType == "mobile" ? '20px' : '50px',
    };

    const formatToRupees = (amount: any) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    function formatINR(amount: number): string {
        const [integer, decimal] = amount.toFixed(2).split('.');
        const lastThree = integer.slice(-3);
        const otherNumbers = integer.slice(0, -3);
        const formattedNumber = amount == 0 ? 0 : (otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',').concat(',' + lastThree))
        return `₹${formattedNumber}`;
    }

    function formatCurrency(amount: number, currency: string): string {
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
    }

    const [isFixed, setIsFixed] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

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



    if (load) {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }

    else {
        return (
            <div ref={containerRef} style={{ width: '100%', height: '91vh', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                {!isAdmin && (<Fab style={fabStyle} color="primary" aria-label="add" onClick={() => { setShowZoputsuGetInTouchPopup(true) }}>
                    <img src={touch2} />
                </Fab>)}
                <div style={{}}>
                    {Array.isArray(bannerData) && bannerData?.length > 0 && (
                        <Box className={"ecarouselContainer"} >
                            <Carousel
                                autoPlay
                                interval={3000}
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
                                                // console.log("itemitemitemitemitem",item)
                                                navigate(`/assetDetails?id=${item.asset_id}&screen=catalogue&type=banner&priority=${item?.priority}`)
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
                                                                fontSize: deviceType === "mobile" ? "24px" : deviceType === 'small-tablet' ? "32px" : "44px",
                                                                lineHeight: deviceType === "mobile" ? "30px" : deviceType === 'small-tablet' ? "40px" : "50px", fontWeight: 800,
                                                                textAlign: "left",
                                                                color: "rgba(255, 255, 255, 1)",
                                                                whiteSpace: 'wrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitBoxOrient: 'vertical',
                                                                WebkitLineClamp: 2,
                                                                width: '100%'
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

                                                {isBuyer && (<Button
                                                    onClick={(event) => {
                                                        // event.stopPropagation(); 
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
                                                </Button>)}
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
                            gap: '0px',
                        }}
                    >
                        {(deviceType != 'mobile') && (<div ref={divRef}
                            style={
                                isFixed
                                    ? {
                                        position: "sticky",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        zIndex: 1000,
                                        backgroundColor: "white",
                                        width: '104%', padding: '20px 35px', paddingTop: '20px', marginLeft: '-30px', borderBottom: '1px solid rgba(0,0,0,0.2)'
                                    }
                                    : { width: '104%', marginLeft: '-30px', padding: '20px 35px', paddingTop: '0px', borderBottom: '1px solid rgba(0,0,0,0.2)' }
                            } >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}>
                                {/* <Typography sx={{
                                    fontFamily: "Inter",
                                    fontSize: "20px",
                                    fontWeight: 600,
                                    lineHeight: "30px",
                                    textAlign: "left",
                                    cursor: 'pointer',
                                    color: '#E22B16'

                                }} onClick={() => SetisOpenfilter(!isOpenFilter)}
                                >
                                    Filters
                                    {!isOpenFilter && (<span><KeyboardArrowDownIcon style={{ fontSize: "30px" }} /></span>)}
                                    {isOpenFilter && (<span><KeyboardArrowUpIcon style={{ fontSize: "30px" }} /></span>)}
                                </Typography> */}
                                <Typography
                                    sx={{ color: '#fff', fontFamily: "Inter", fontSize: "18px", fontWeight: 600, lineHeight: "30px", cursor: 'pointer', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: '#E22B16', }}
                                    onClick={() => SetisOpenfilter(!isOpenFilter)}
                                >
                                    Filters
                                    <FilterAltIcon style={{ marginTop: '-3px', marginLeft: '3px', color: '#fff', fontSize: '20px' }} />
                                </Typography>

                                <div style={{
                                    padding: 0, margin: 0,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    gap: "8px",
                                    flexWrap: "wrap",

                                }}>

                                    <TextField
                                        placeholder="Search..."
                                        sx={{
                                            height: '40px',
                                            '& .MuiFormControl-root': {
                                                height: '40px',
                                                border: "0px solid transparent",
                                            },
                                            '& .MuiTextField-root': {
                                                height: '40px',
                                                border: "0px solid transparent",
                                            },
                                            '& .MuiInputBase-root': {
                                                height: '40px',
                                                border: "0px solid transparent",
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                height: '40px',
                                                border: "0px solid transparent"
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: "0px solid transparent"
                                            },

                                            '& .MuiOutlinedInput': {
                                                border: "0px solid transparent"
                                            },
                                            width: '200px',
                                            backgroundColor: 'rgba(242, 242, 242, 1)',
                                            border: "0px solid transparent",
                                            borderRadius: '4px'
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <img
                                                        src={SearchNormal}
                                                        alt="Search"
                                                        style={{

                                                            marginRight: '10px',
                                                            height: '20px',
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
                                    />


                                    <FormControl>
                                        <Select
                                            sx={{
                                                borderRadius: '5px',
                                                width: '200px',
                                                height: '44px'
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sortBy?.name || ""}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return (
                                                        <Typography
                                                            style={{
                                                                fontSize: '16px',
                                                                fontWeight: 500,
                                                                textAlign: 'left',
                                                                color: 'rgb(167, 167, 167)'
                                                            }}
                                                        >
                                                            Sort
                                                        </Typography>
                                                    );
                                                }
                                                return selected;
                                            }}
                                            displayEmpty
                                            inputProps={{
                                                'aria-label': 'Without label',
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <img
                                                            src={Sort}
                                                            alt="Sort"
                                                            style={{
                                                                marginRight: '5px',
                                                                height: '20px',
                                                                cursor: 'pointer',
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size="small"
                                            IconComponent={(props) => (
                                                <img
                                                    src={Sort}
                                                    alt="Sort"
                                                    style={{
                                                        marginRight: '5px',
                                                        height: '14px',
                                                        cursor: 'pointer',
                                                        pointerEvents: 'none',
                                                        position: 'absolute',
                                                        right: '10px',
                                                    }}
                                                />
                                            )}
                                        >

                                            {
                                                sortData.map((data: any, index: any) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={data}
                                                        sx={{
                                                            '&:hover': {
                                                                color: '#E20B18',
                                                            },
                                                        }}
                                                        onClick={() => {
                                                            SetSortBy(data)

                                                            let body = {
                                                                searchterm: search || null,
                                                                asset_type: atype || [],
                                                                opportunity_type: type || [],
                                                                sport: sport || [],
                                                                country: country || [],
                                                                exclusivity: (exclusivity == "All" ? null : exclusivity) || null,
                                                                city: city || [],
                                                                state: state || [],
                                                                timing: timing || [],
                                                                sortname: data?.sort || null,
                                                                sortorder: data?.sortorder || null,
                                                                budget: {
                                                                    min: Math.round(budget[0] * CurrencyData[currency]),
                                                                    max: Math.round(budget[1] * CurrencyData[currency])
                                                                },
                                                                trayid: parseInt(id)
                                                            };

                                                            filterFun(body)
                                                        }}
                                                    >
                                                        {data.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>

                                    <Button
                                        sx={{
                                            padding: '6px 8px',
                                            color: '#FFF',
                                            fontFamily: 'Inter',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '600',
                                            textTransform: 'capitalize',
                                            background: '#E20B18',
                                            width: '40px',
                                            border: "none",
                                            height: '40px',

                                            '&:hover': {
                                                backgroundColor: '#a9141d',
                                                color: '#fff',
                                            },
                                        }}
                                        onClick={functionSort}
                                    >

                                        {typeofSort && (<MenuIcon sx={{ color: "white", fontSize: "25px" }} />)}
                                        {!typeofSort && (<img src={LinearGrid} style={{ width: '20px', height: '20px' }} />)}                                    
                                    </Button>
                                    <Button
                                        onClick={() => { clearAllFun() }}
                                        sx={{
                                            backgroundColor: 'rgba(226, 11, 24, 0.1)',
                                            color: 'rgba(226, 11, 24, 1)',
                                            fontFamily: "Inter",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            lineHeight: "16.8px",
                                            textAlign: "center",
                                            borderRadius: '5px',
                                            height: '43px',
                                            border: '0px solid transparent',
                                            padding: "12px, 16px, 12px, 16px",
                                            textTransform:'none',
                                            cursor: 'pointer',
                                            ':hover': {
                                                backgroundColor: 'rgba(226, 11, 24,0.05)',
                                            }
                                        }}>
                                        <BackspaceIcon sx={{ color: "#e22b16", fontSize: "25px",marginRight:'10px' }} /> <span>Reset</span>
                                    </Button>
                                </div>
                            </Box>
                            {isOpenFilter && (<Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                gap: '12px', marginTop: '20px',
                                alignItems: 'flex-end'
                            }}>
                                <ZupotsuMultiSelect
                                    title={''}
                                    dropdownData={filterData['Opportunity Type'] ? filterData['Opportunity Type'] : []}
                                    value={type}
                                    name={'type'}
                                    placeholder={`Opportunity Type`}
                                    isRequired={false}
                                    handleChange={(e) => { setType(e) }}
                                    previewMode={false}

                                />

                                <ZupotsuMultiSelect
                                    title={''}
                                    dropdownData={(filterData?.Sport) ? filterData.Sport.filter((sport: any) => sport.toLowerCase() !== "all") : []}
                                    value={sport}
                                    name={'sports'}
                                    placeholder={`Sports`}
                                    isRequired={false}
                                    handleChange={(e) => { setSport(e) }}
                                    previewMode={false}

                                />

                                <ZupotsuMultiSelect
                                    title={''}
                                    dropdownData={(filterData?.asset_types) ? filterData?.asset_types : []}
                                    value={atype}
                                    name={'atype'}
                                    placeholder={`Asset Type`}
                                    isRequired={false}
                                    handleChange={(e) => { setAtype(e) }}
                                    previewMode={false}
                                // freeSolo={false}
                                // padding={"0px 18px 0px 0px"}
                                />

                                <ZupotsuAutocomplete
                                    title={''}
                                    dropdownData={(filterData?.Exclusivity) ? ["All", ...filterData?.Exclusivity] : []}
                                    value={exclusivity || ""}
                                    name={'exclusivity'}
                                    placeholder={`Exclusivity`}
                                    isRequired={false}
                                    handleChange={(e) => { setExcluivity(e.target.value || "") }}
                                    previewMode={false}
                                    freeSolo={true}
                                // padding={"0px 18px 0px 0px"}
                                />

                            </Box>)}
                            {isOpenFilter && (<Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                gap: '12px', marginTop: '10px',
                                alignItems: 'flex-end'


                            }}>

                                <ZupotsuMultiSelect title={''} dropdownData={allcountry ? allcountry : []} value={country} name={'country'} placeholder={`Country`} handleChange={(e) => {
                                    setCountry(e);
                                    // setstate("")
                                    // setcity("")
                                    // let states: any = []
                                    // let cities: any = []
                                    // e.map((country: any) => {
                                    //     let sel = allData.filter((ctry: any) => ctry.country == country)
                                    //     states = [...states, ...sel[0].states]
                                    //     cities = [...cities, ...sel[0].cities]
                                    // })
                                    // SetallState(states);
                                    // Setallcities(cities);
                                }} />

                                <ZupotsuMultiSelect
                                    title={''}
                                    dropdownData={allState ? allState : []}
                                    value={state}
                                    name={'State'}
                                    placeholder={`State`}
                                    isRequired={false}
                                    handleChange={(e) => { setstate(e) }}
                                    previewMode={false}
                                // freeSolo={false}
                                // padding={"0px 18px 0px 0px"}
                                />
                                <ZupotsuMultiSelect
                                    title={''}
                                    dropdownData={allcities ? allcities : []}
                                    value={city}
                                    name={'city'}
                                    placeholder={`City`}
                                    isRequired={false}
                                    handleChange={(e) => { setcity(e) }}
                                    previewMode={false}
                                // freeSolo={false}
                                // padding={"0px 24px 0px 0px"}
                                />
                                <ZupotsuMultiSelect
                                    title={''}
                                    dropdownData={(filterData?.timing) ? filterData?.timing : []}
                                    value={timing}
                                    name={'timing'}
                                    placeholder={`Timing`}
                                    isRequired={false}
                                    handleChange={(e) => { setTiming(e) }}
                                    previewMode={false}
                                // freeSolo={false}
                                // padding={"0px 24px 0px 0px"}
                                />

                            </Box>)}
                            {isOpenFilter && (<Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                gap: '12px',
                                marginTop: '20px'

                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>

                                    <Button
                                        onClick={() => { clearAllFun() }}
                                        sx={{
                                            backgroundColor: 'rgba(226, 11, 24, 0.1)',
                                            color: 'rgba(226, 11, 24, 1)',
                                            fontFamily: "Inter",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            lineHeight: "16.8px",
                                            textAlign: "center",
                                            borderRadius: '5px',
                                            width: "130px",
                                            height: '35px',
                                            border: '0px solid transparent',
                                            padding: "12px, 16px, 12px, 16px",
                                            cursor: 'pointer',
                                            ':hover': {
                                                backgroundColor: 'rgba(226, 11, 24,0.05)',
                                            }
                                        }}>
                                        Clear All
                                    </Button>
                                </Box>
                                <Box sx={{
                                    width: 300,
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}>
                                    <Typography
                                        sx={{
                                            fontFamily: "Inter",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            lineHeight: "15.4px",
                                            letterSpacing: "0.02em",
                                            textAlign: "center",
                                            marginBottom: '10px'
                                        }}
                                    >
                                        Budget
                                    </Typography>

                                    <Slider
                                        value={budget}
                                        onChange={handleChangeBudget}
                                        onChangeCommitted={() => {
                                            let body = {
                                                searchterm: search || null,
                                                asset_type: atype || [],
                                                opportunity_type: type || [],
                                                sport: sport || [],
                                                country: country || [],
                                                exclusivity: exclusivity || null,
                                                city: city || [],
                                                state: state || [],
                                                timing: timing || [],
                                                sortname: sortBy?.sort || null,
                                                sortorder: sortBy?.sortorder || null,
                                                budget: {
                                                    min: Math.round(budget[0] * CurrencyData[currency]),
                                                    max: Math.round(budget[1] * CurrencyData[currency])
                                                },
                                                trayid: parseInt(id)
                                            };

                                            filterFun(body)
                                        }}
                                        valueLabelDisplay="auto"
                                        step={Math.round(10000 / CurrencyData[currency])}
                                        marks
                                        min={0}
                                        max={Math.round((1000000 / CurrencyData[currency]) / 1000) * 1000}
                                        sx={{
                                            '& .MuiSlider-thumb': {
                                                color: '#E22B16',
                                                backgroundColor: '#E22B16',
                                                border: '1px solid #FFF',
                                                boxShadow: 'none',
                                            },
                                            '& .MuiSlider-rail': {
                                                color: '#E22B16',
                                                backgroundColor: '#E22B16',
                                                height: '8px',
                                            },
                                            '& .MuiSlider-mark': {
                                                display: 'none',
                                            },
                                            '& .MuiSlider-track': {
                                                color: '#E22B16',
                                                backgroundColor: '#E22B16',
                                                height: '8px',
                                            },
                                            '& .MuiSlider-valueLabelOpen': {
                                                color: '#000',
                                                backgroundColor: 'rgba(215, 176, 77, 0.1)',
                                            },
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            // width:'100%',
                                            fontFamily: "Inter",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            lineHeight: "21px",
                                            letterSpacing: "0.02em",
                                            textAlign: "center",
                                            marginTop: '10px'
                                        }}
                                    >
                                        <span style={{ marginRight: '10px' }}>{formatCurrency(budget[0], currency)}</span>   -   <span style={{ marginLeft: '10px' }}>{formatCurrency(budget[1], currency)}</span>

                                    </Typography>
                                </Box>
                            </Box>)}
                        </div>)}


                        {deviceType == "mobile" && (<div style={{ width: '100%' }}>
                            <TextField
                                placeholder="Search..."
                                sx={{
                                    backgroundColor: 'rgba(242, 242, 242, 1)',
                                    borderRadius: '4px',
                                    '& .MuiOutlinedInput-root': {
                                        padding: '0 10px',
                                        height: '40px',
                                    },
                                    width: '100%'

                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img src={SearchNormal} alt="Search" style={{ height: '20px' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>)}

                        {deviceType == "mobile" && (
                            <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Typography
                                    sx={{ color: '#fff', fontFamily: "Inter", fontSize: "14px", marginTop: '20px', fontWeight: 700, lineHeight: "30px", cursor: 'pointer', border: '1px solid #ddd', padding: '2px 10px', borderRadius: '8px', background: '#E22B16', }}
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    Filters
                                    <FilterAltIcon style={{ marginTop: '-3px', marginLeft: '3px', color: '#fff', fontSize: '20px' }} />

                                    {/* <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} /> */}

                                </Typography>
                            </div>
                        )}

                        {(deviceType == "mobile" && isOpen) && (
                            <Modal
                                open={isOpen}
                            >
                                <Box
                                    sx={{
                                        // position: 'absolute',
                                        // top: '60%',
                                        // left: '50%',
                                        // transform: 'translate(-50%, -50%)',
                                        width: '100%',
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        borderRadius: '30px',
                                        overflowY: 'scroll',
                                        marginTop: '40px'
                                    }}
                                >
                                    <div onClick={() => { setIsOpen(false) }} style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '30px', paddingRight: '20px' }}>
                                        <ClearRoundedIcon />
                                    </div>
                                    <Box sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        height: '85vh',
                                        overflow: 'scroll',
                                        marginBottom: '100px',
                                        marginTop: '20px',
                                        padding: '20px'
                                    }}>

                                        <FormControl sx={{ width: '100%' }}>
                                            <Select
                                                value={sortBy?.name || ""}
                                                displayEmpty
                                                renderValue={(selected) => selected || <Typography style={{ fontSize: '16px', fontWeight: 500, color: 'rgb(167, 167, 167)' }}>Sort</Typography>}
                                                sx={{
                                                    borderRadius: '5px',
                                                    height: '44px'
                                                }}
                                                inputProps={{
                                                    'aria-label': 'Without label',
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            <img src={Sort} alt="Sort" style={{ height: '20px' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                onChange={(e) => {
                                                    const data = e.target.value;
                                                    SetSortBy(data);

                                                    let body = {
                                                        searchterm: search || null,
                                                        asset_type: atype || [],
                                                        opportunity_type: type || [],
                                                        sport: sport || [],
                                                        country: country || [],
                                                        exclusivity: (exclusivity == "All" ? null : exclusivity) || null,
                                                        city: city || [],
                                                        state: state || [],
                                                        timing: timing || [],
                                                        sortname: data?.sort || null,
                                                        sortorder: data?.sortorder || null,
                                                        budget: {
                                                            min: Math.round(budget[0] * CurrencyData[currency]),
                                                            max: Math.round(budget[1] * CurrencyData[currency])
                                                        },
                                                        trayid: parseInt(id)
                                                    };

                                                    filterFun(body);
                                                }}
                                            >
                                                {sortData.map((data: any, index: any) => (
                                                    <MenuItem key={index} value={data} sx={{ '&:hover': { color: '#E20B18' } }}>
                                                        {data.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <Box sx={{ width: '100%', marginTop: '20px' }}>
                                            <Typography sx={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, marginBottom: '10px' }}>
                                                Budget
                                            </Typography>
                                            <Slider
                                                value={budget}
                                                onChange={handleChangeBudget}
                                                onChangeCommitted={() => {
                                                    let body = {
                                                        searchterm: search || null,
                                                        asset_type: atype || [],
                                                        opportunity_type: type || [],
                                                        sport: sport || [],
                                                        country: country || [],
                                                        exclusivity: exclusivity || null,
                                                        city: city || [],
                                                        state: state || [],
                                                        timing: timing || [],
                                                        sortname: sortBy?.sort || null,
                                                        sortorder: sortBy?.sortorder || null,
                                                        budget: {
                                                            min: budget[0],
                                                            max: budget[1]
                                                        },
                                                        trayid: parseInt(id)
                                                    };

                                                    filterFun(body)
                                                }}
                                                valueLabelDisplay="auto"
                                                step={10000}
                                                marks
                                                min={0}
                                                max={1000000}
                                                sx={{
                                                    '& .MuiSlider-thumb': {
                                                        color: 'rgba(215, 176, 77, 1)',
                                                        backgroundColor: 'rgba(215, 176, 77, 1)',
                                                        border: '1px solid #FFF',
                                                        boxShadow: 'none',
                                                    },
                                                    '& .MuiSlider-rail': {
                                                        color: 'rgba(224, 224, 224, 1)',
                                                        backgroundColor: 'rgba(224, 224, 224, 1)',
                                                        height: '8px',
                                                    },
                                                    '& .MuiSlider-mark': {
                                                        display: 'none',
                                                    },
                                                    '& .MuiSlider-track': {
                                                        color: 'rgba(215, 176, 77, 1)',
                                                        backgroundColor: 'rgba(215, 176, 77, 1)',
                                                        height: '8px',
                                                    },
                                                    '& .MuiSlider-valueLabelOpen': {
                                                        color: '#000',
                                                        backgroundColor: 'rgba(215, 176, 77, 0.1)',
                                                    },
                                                }}
                                            />
                                            <Typography sx={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 500, textAlign: "center", marginTop: '10px' }}>
                                                {formatToRupees(budget[0])} - {formatToRupees(budget[1])}
                                            </Typography>
                                        </Box>

                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px'
                                        }}>
                                            {/* Dropdowns for filtering */}
                                            <ZupotsuMultiSelect title={''} dropdownData={filterData['Opportunity Type'] || []} value={type} name={'type'} placeholder={`Type`} handleChange={(e) => setType(e)} />
                                            <ZupotsuMultiSelect title={''} dropdownData={filterData.Sport?.filter((sport: any) => sport.toLowerCase() !== "all") || []} value={sport} name={'sports'} placeholder={`Sports`} handleChange={(e) => setSport(e)} />
                                            <ZupotsuMultiSelect title={''} dropdownData={filterData.asset_types || []} value={atype} name={'atype'} placeholder={`Asset Type`} handleChange={(e) => setAtype(e)} />
                                            <ZupotsuAutocomplete freeSolo={false} title={''} dropdownData={(filterData?.Exclusivity) ? ["All", ...filterData?.Exclusivity] : []} value={exclusivity || ""} name={'exclusivity'} placeholder={`Exclusivity`} handleChange={(e) => setExcluivity(e.target.value)} />
                                            <ZupotsuMultiSelect title={''} dropdownData={allcountry ? allcountry : []} value={country} name={'country'} placeholder={`Country`} handleChange={(e) => {
                                                setCountry(e);
                                                // setstate("")
                                                // setcity("")
                                                // let states: any = []
                                                // let cities: any = []
                                                // e.map((country: any) => {
                                                //     let sel = allData.filter((ctry: any) => ctry.country == country)

                                                //     states = [...states, ...sel[0].states]
                                                //     cities = [...cities, ...sel[0].cities]
                                                // })
                                                // SetallState(states);
                                                // Setallcities(cities);
                                            }} />
                                            <ZupotsuMultiSelect title={''} dropdownData={allState ? allState : []} value={state} name={'State'} placeholder={`State`} handleChange={(e) => setstate(e)} />
                                            <ZupotsuMultiSelect title={''} dropdownData={allcities ? allcities : []} value={city} name={'city'} placeholder={`City`} handleChange={(e) => setcity(e)} />
                                            <ZupotsuMultiSelect title={''} dropdownData={filterData.timing || []} value={timing} name={'timing'} placeholder={`Timing`} handleChange={(e) => setTiming(e)} />
                                        </Box>

                                        <div style={{ width: '100%', marginTop: '20px', marginBottom: '20px', height: '1px', backgroundColor: 'rgba(0,0,0,0.2)' }} />

                                        <Button
                                            onClick={clearAllFun}
                                            sx={{
                                                backgroundColor: 'rgba(226, 11, 24, 0.1)',
                                                color: 'rgba(226, 11, 24, 1)',
                                                fontWeight: 600,
                                                height: '35px',
                                                borderRadius: '5px',
                                                width: '100%',
                                                '&:hover': { backgroundColor: 'rgba(226, 11, 24,0.05)' },
                                            }}
                                        >
                                            Clear All
                                        </Button>

                                        <Button
                                            onClick={() => { setIsOpen(false) }}
                                            sx={{
                                                color: '#fff',
                                                fontWeight: 600,
                                                height: '35px',
                                                borderRadius: '5px',
                                                width: '100%',
                                                backgroundColor: '#E22B16'
                                            }}
                                        >
                                            Close
                                            {/* <ClearRoundedIcon style={{color:'#fff',marginLeft:'3px',fontSize:'16px'}}/> */}
                                        </Button>



                                    </Box>
                                </Box>
                            </Modal>
                        )}

                        {!loader && (<div onClick={() => SetisOpenfilter(false)} style={{ width: '100%', marginTop: deviceType == "mobile" ? "10px" : "40px", marginLeft: '10px' }}>

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
                                    titleText={trayData.name}
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
                                {trayData.description}
                            </Typography>

                            {(allAsset?.length > 0) &&
                                (
                                    typeofSort == true ? (
                                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: '15px', marginLeft: "-15px" }}>
                                            {/* {((deviceType == 'mobile' && allAsset?.length > 1) || allAsset?.length > 4) && (<button onClick={() => scrollLeft(9999)} style={{ position: 'absolute', left: 0, zIndex: 1, padding: '10px 4px', color: '#FFF', fontFamily: 'Inter', fontSize: '16px', fontStyle: 'normal', fontWeight: '600', textTransform: 'capitalize', background: '#dfdfdf', border: "1px solid grey", borderRadius: 8, opacity: 0.8 }}>
                                                <img src={arrowLeft} />
                                            </button>)} */}
                                            <div
                                                ref={el => scrollContainerRefs.current[9999] = el}
                                                style={{
                                                    display: 'flex',
                                                    // flexWrap: 'nowrap',
                                                    flexWrap: 'wrap',
                                                    justifyContent: deviceType == "mobile" ? "center" : "flex-start",
                                                    overflowX: 'scroll',
                                                    overflowY: 'hidden',
                                                    scrollbarWidth: 'none',
                                                    alignItems: "center",
                                                    gap: '0px',
                                                    padding: '0px',
                                                    margin: 0,
                                                    marginTop: deviceType === 'mobile' ? '25px' : '0px',
                                                    width: '100%'
                                                }}
                                            >
                                                {allAsset.map((assetDetail: any, index: any) => {
                                                    assetDetail = assetDetail._source;
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
                                                                    trayname={trayData?.name}
                                                                    // priority={detail?.priority}
                                                                    setRequestActionObject={setRequestActionObject}
                                                                    reason={reason}
                                                                    id={assetDetail.id}
                                                                    buttonType={buttonType}
                                                                    setButtonType={setButtonType}
                                                                    setShowRejectAssetData={setShowRejectAssetData}
                                                                    setAcceptDialog={setAcceptDialog}
                                                                    selectedCategory={selectedCategory}
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
                                            {/* {((deviceType == 'mobile' && allAsset?.length > 1) || allAsset?.length > 4) && (<button onClick={() => scrollRight(9999)} style={{ position: 'absolute', right: 0, zIndex: 1, padding: '10px 4px', color: '#FFF', fontFamily: 'Inter', fontSize: '16px', fontStyle: 'normal', fontWeight: '600', textTransform: 'capitalize', background: '#dfdfdf', border: "1px solid grey", borderRadius: 8, opacity: 0.8 }}>
                                                <img src={arrowRight} />
                                            </button>)} */}
                                        </div>
                                    ) : (
                                        <div style={{ gap: '10px', overflowX: 'scroll', marginTop: '15px', marginLeft: "0px", width: '100%' }} >
                                            <Paper elevation={3} sx={{ border: '2px solid rgba(0,0,0,0.001)', fontFamily: "Inter", padding: "10px", boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(255, 255, 255, 1)", width: '100%', }}>
                                                <Eventscreentable
                                                    columns={columns}
                                                    // tableData={tableData}
                                                    tableData={allAsset}
                                                    setTableData={setAllAsset}
                                                    headers={headers}
                                                    handleChange={handleChangeTable}
                                                    isSearch={true}
                                                />
                                            </Paper>
                                        </div>
                                    )
                                )
                            }

                            {(allAsset?.length == 0) &&
                                (
                                    <NoData ErrorData={ErrorData} />
                                )}
                        </div>)}
                        {loader && (
                            <div style={{ width: '100%', marginTop: "40px", display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                                <div className="loader"></div>
                            </div>
                        )}
                    </Box>
                </div >
                {!isAdmin && (<Row style={{ width: '100%', marginBottom: '50px', marginTop: '20px' }}>

                    {(isSeller || isSellerAdmin) && (<Col xs={12} sm={6} lg={6} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'flex-start' }} style={{ marginTop: '20px' }}>
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
                                        {/* List Your Asset <br />Reach More Buyers */}
                                        Do you want to list your asset <br /> or need any other support?
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
                    </Col>)}

                    {(isBuyer) && (<Col xs={12} sm={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'flex-start' }} style={{ marginTop: '20px' }}>
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
                    </Col>)}

                </Row>)}

                {showZoputsuGetInTouchPopup && (<ZoputsuGetInTouch1 showZoputsuGetInTouchPopup={showZoputsuGetInTouchPopup} pg={"Tray Listing "} closePopup={() => {
                    setShowZoputsuGetInTouchPopup(false);
                }} />)}

                <ZoptsuFooter
                    onPrivacyPolicyButtonClicked={onPrivacyPolicyButtonClicked}
                    onTOSCLick={handleTOS}
                />
            </div >
        )
    }
}

export default AllAssetScreen
