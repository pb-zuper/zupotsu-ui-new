import { Box, Divider, Drawer, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import React, { useEffect, useState } from 'react';
import './assetPreview.css';
import {
  BackgroundTennis,
  CricketBackgroundBall,
  CricketBall,
  FootballBackground,
  TouchingHand,
  ZopotsuLogo,
  ZupotsuColuredLogo,
  addCircle,
  arrowUp,
  basketBallBackground,
  blogred,
  collapse,
  deleteIcon,
  down,
  expand,
  fall,
  fbred,
  growth,
  infoCircle,
  instared,
  istats,
  tiktokred,
  wbred,
  xred,
  xstats,
  ystats,
  ytred
} from '../../assets';
import Gradient from '../../assets/gradient.png';
import { FieldsData, assetPrevAddMoreParentStyle, assetPrevAddMoreStyle, oppAccordionTitleStyle } from '../../utils/constants';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import { Col, Row } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import sports from "../../assets/sports.svg"
import { OppTextUnderlineUtil } from '../../utils/constantComponents';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { documentUpload } from "../../assets"
import bgImage from '../../assets/bg3.png';
import { useSearchParams } from 'react-router-dom';

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



const AssetPreview = ({
  open,
  handleToggleDrawer,
  activeStep,
  handleInputChange,
  deviceType,
  formData,
  errors = {},
  handleFileChange,
  previewMode,
  setaAddOpportunities,
  addOpportunities,
  accordionData,
  metaData,
  fields,
  onEditSave,
  socialLinks,
  onChangeSocial,
  fileData,
  formData2,
  duration,
  prevfileData,
  assetData,
  selectSport,
  name,
}: any) => {
  const [activeItems, setActiveItems] = useState<any>([0]);

  // console.log("formData2formData2", formData2)
  // console.log("formDataformData", formData, "assetdata", assetData)
  const toggleAccordion = (index: any) => {
    const updatedItems = [...activeItems];
    updatedItems[index] = !updatedItems[index];
    setActiveItems(updatedItems);
  };
  useEffect(() => {
    toggleAccordion(0);
  }, []);
  const headers = ["Deliverables", "Specs of Deliverables"]
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredId, setIsHoveredId] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [more, setMore] = useState(false)
  // const team: any = ["Sport", "Sports Format", "Participation In", "Geographical Span", "Country", "City", "State", "Sec"]
  // const teamMore: any = ["Affiliation", "Promotional Plan", "Achievements", "Performance Highlights", "Recent Highlights", "Notable Players", "Other Information"]
  // const athelete: any = ["Age", "Gender", "Sport", "Sports Format", "Playing Status", "Geographical Span", "Country", "City", "State", "Sec", "Teams Represented"]
  // const atheleteMore: any = ["Achievements", "Career Highlights", "Recent Highlights", "Teams Represented", "Hobbies And Interests", "Other Information"]
  // const tournament: any = ["Sport", "Sports Format", "On Ground Viewership", "Online Viewership", "Represented By", "Dates From", "Dates To", "Last Date Of Confirmation", "Geographical Distribution", "Platform(s)", ""]
  // const tournamentMore: any = ["Live Content Plan", "Content Plan", "Promotional Plan", "Organised By", "Affiliation", "Other Information"]
  // const content: any = ["Reach Estimate", "Distribution", "Sec", "Sport", "Sports Format", "Start Date", "City", "State", "Primary Languages", "Subtitle Languages", "Platform(s)"]
  // const contentMore: any = [ "Live Content Plan", "Content Plan", "Promotional Plan", "Produced By", "Affiliation", "Other Information"]
  const team: any = ["Sports Format", "Country", "State", "City", "Participation In", "Affiliation", "Notable Players", "Availability/Timeline", "Exclusivity", "Last Date Of Confirmation"]
  const teamMore: any = ["Audience Age", "Audience Gender", "Audience Class", "Promotional Plan", "Geographical Span"]

  const athelete: any = ["Age", "Gender", "Sports Format", "Playing Status", "Country", "State", "City", "Teams Represented", "Exclusivity", "Availability/Timeline"]
  const atheleteMore: any = ["Audience Age", "Audience Gender", "Audience Class", "Geographical Span"]

  const tournament: any = ["Dates From", "Dates To", "Dates Confirmation", "Sports Format", "Edition", "Affiliation", "Organised By", "Host Countries", "Host Cities", "Exclusivity", "Represented By", "Last Date Of Confirmation"]
  const tournamentMore: any = ["Audience Age", "Audience Gender", "Audience Class", "Geographical Span", "Live Content Plan", "Plan Details", "Promotional Plan", "Platform(s)", "On Ground Viewership", "Reach Estimate", "Online Viewership"]

  const content: any = ["Start Date", "Produced By", "Sports Format", "Affiliation", "Country", "State", "City", "Primary Languages", "Subtitle Languages", "Additional Languages", "Exclusivity", "Represented By", "Last Date Of Confirmation"]
  const contentMore: any = ["Audience Age", "Audience Gender", "Audience Class", "Geographical Span", "Live Content Plan", "Plan Details", "Promotional Plan", "Platform(s)", "Reach Estimate",]
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText: string = formData?.About?.split(" ")?.slice(0, 50)?.join(" ");;
  const fullText: string = formData?.About || "";
  const [selId, setSelId] = useState(0);
  const [selType, setSelectedType] = useState('deliverables');
  const isSeller = (localStorage.getItem("role")?.toLowerCase() === "seller") ? true : false;

  const radioButtonTextStyle = {
    color: 'var(--Gray-1, #333)',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '140%' /* 19.6px */,
    letterSpacing: '0.14px',
    marginLeft: '12px',
  };

  const getDataFromArray = (array: any[], key: string) => {
    return array.find((item: any) => Object.keys(item)?.includes(key))?.[key];
  };

  const coverPictures = fileData.filter((item: any) => { return (item.tags[0].includes("Cover")) }) || []

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


  const getImageSource = (assetTypeName: any) => {
    switch (assetTypeName?.toLowerCase()) {
      case "cricket":
        return CricketBackgroundBall;
      case "football":
        return FootballBackground;
      case "basketball":
        return basketBallBackground;
      case "tennis":
        return BackgroundTennis;

      default:
        return "";
    }
  };

  function trimURL(url: string): string {
    const specificDomains = /^(https?:\/\/)?(www\.)?((facebook|instagram|twitter|linkedin|x)\.com\/|linkedin\.com\/in\/)/i;
    const genericParts = /^(https?:\/\/)?(www\.)?/i;
    const cleanedURL = url.replace(specificDomains, '');
    return cleanedURL.replace(genericParts, '');
  }
  const handleMouseOver = (id: any) => {
    setIsHovered(true)
    setIsHoveredId(id)
  };
  const handleMouseOut = () => setIsHovered(false);


  const handleDownload = async (url: string, filename: string) => {

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
  const [searchParams] = useSearchParams();
  const [dialog, setDialog] = useState<any>(false)
  const [showZoputsuGetInTouchPopup, setShowZoputsuGetInTouchPopup] = useState<boolean>(false);
  const [showZoputsuGetInTouchPopup2, setShowZoputsuGetInTouchPopup2] = useState<boolean>(false);
  const [head, setHead] = useState<any>()
  const [desc, setDesc] = useState<any>()
  const isCatalogue = searchParams.get('screen') == "catalogue" ? true : false;
  const [selGT, setselGT] = useState('');
  const [selOppr, setselOppr] = useState('');

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


  const platformOrder = ["INSTAGRAM", "X", "YOUTUBE"];
  const calculatePercentageDifference = (current: number, previous: number) => {
    if (previous === 0 || !current || !previous) return "NA";
    const difference = ((current - previous) / previous) * 100;
    return difference.toFixed(2) + "%";
  }
  if (isLoad) {
    return (
      <div className="centered-container">
        <div className="loader"></div>
      </div>
    )
  }
  else {
    return (
      <Drawer
        open={open}
        onClose={handleToggleDrawer}
        anchor="bottom"
        sx={{
          '& .MuiDrawer-paper': {
            width: deviceType === 'mobile' ? '80%' : '100%',
            height: '80%',
            paddingTop: '20px',
            display: 'flex',
            overflow: 'hidden',
            border: "0px",
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            backgroundColor: 'transparent',
            marginLeft: deviceType === 'mobile' ? '5%' : '0%',
            marginRight: deviceType === 'mobile' ? '5%' : '',
            marginTop: deviceType === 'mobile' ? '24px' : '5%',
          },
        }}
      >
        {/* <div style={{ height: '100px' }}></div> */}
        <button
          onClick={() => { handleToggleDrawer() }}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: "50px",
            border: "0px solid transparent",
            backgroundColor: "transparent",
            padding: "0px",
            marginTop: '-20px',
            zIndex: 2
          }}>

          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="24" fill="#E0E0E0" />
            <path d="M24 37.3327C31.3334 37.3327 37.3334 31.3327 37.3334 23.9993C37.3334 16.666 31.3334 10.666 24 10.666C16.6667 10.666 10.6667 16.666 10.6667 23.9993C10.6667 31.3327 16.6667 37.3327 24 37.3327Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.2267 27.7732L27.7734 20.2266" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M27.7734 27.7732L20.2267 20.2266" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </button>
        <div style={{ overflowY: 'scroll', background: '#fff', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              // marginTop: '-10px',
              zIndex: 9999,
            }}
          >

            <img src={ZupotsuColuredLogo} alt='ZupotsuColuredLogo' style={{ width: '184px', height: '100px', marginLeft: "20px" }} />

          </div>

          <div style={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
                // height: '50vh'
              }}
            >
              <Grid container xs={12} md={12} lg={12} spacing={2} marginTop={"10px"} sx={{}}>
                <Grid item xs={12}>
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
                        {coverPictures?.map((item: any, index: any) => (
                          <div
                            key={index}
                            style={{ width: '100%', display: 'flex' }}
                          >
                            <div style={{ width: '60%' }}></div>
                            <div className={"newcarouselItem"} style={{ width: '40%' }}>
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
                                  zIndex: 3,
                                }}
                              >

                                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '50%' }}>
                                  <div>
                                    <div style={{ display: 'flex', color: '#fff', alignItems: 'center' }}>
                                      <div style={{ color: '#1447CA', fontSize: deviceType === "mobile" ? "12px" : "14px", fontWeight: '700', background: "#E7EDFA", paddingBottom: '5px', paddingTop: '5px', paddingLeft: '10px', paddingRight: '10px', borderRadius: 100 }}>
                                        {selectSport || assetData?.sport?.[0] || ""}
                                      </div>
                                      <span style={{ padding: '10px', fontSize: '20px', marginLeft: '5px', marginRight: '5px' }}>|</span>
                                      <div style={{ display: 'flex', color: '#fff', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', color: '#fff', background: '#FF3E3E', width: '26px', height: '26px', borderRadius: 100, justifyContent: 'center', alignItems: 'center', padding: '3px' }}>
                                          <img src={sports} style={{ width: '85%' }} />
                                        </div>
                                        <div style={{ color: '#fff', fontSize: deviceType === "mobile" ? "13px" : "16px", fontWeight: '500', marginLeft: '5px' }}>
                                          {name || assetData?.asset_type?.name || ""}
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
                                      {formData["Name"] || assetData?.asset_detail?.[0].name}
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
                                      {formData["Headline"] || assetData?.asset_detail?.[0]?.headline}
                                    </div>
                                  </div>
                                </div>
                              </Box>
                            </div>
                          </div>
                        ))}
                      </Carousel>
                    </Box>
                  </div>


                </Grid>
              </Grid>
            </Box>
          </div>


          <div style={{ padding: '30px', paddingTop: '-10px' }}>


            <div style={{ width: '100%' }}>
              <Row style={{ width: '100%' }}>


                {/* ))}  */}
                {formData?.assetType?.toLowerCase() == "team" && (
                  team?.map((item: any, index: any) => (
                    <Col key={index} xs={6} md={4} lg={3} style={{ marginBottom: '20px', borderRight: '1px solid #E7E7E7', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                          {Array.isArray(formData[item]) ? (
                            formData[item].join(', ') || 'NA'
                          ) : formData[item] instanceof Date ? (
                            formData[item].toLocaleDateString() || 'NA'
                          ) : typeof formData[item] === "string" && formData[item].includes(".000Z") ? (
                            formData[item].split("T")[0] || 'NA'
                          ) : formData[item] ? (
                            formData[item]
                          ) : 'NA'}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#828282', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item == "Sec" ? "SEC" : item}
                        </div>
                      </div>
                    </Col>
                  ))
                )}

                {formData?.assetType?.toLowerCase() == "tournament" && (
                  tournament?.map((item: any, index: any) => (
                    <Col key={index} xs={6} md={4} lg={3} style={{ marginBottom: '20px', borderRight: '1px solid #E7E7E7', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                      <div style={{}}>
                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                          {/* {Array.isArray(formData[item]) ?
                            (formData[item].join(', ') || 'NA') :
                            formData[item]?.toString().includes(".000Z") ?
                              (formData[item].split("T")[0] || 'NA') :
                              formData[item] ?
                                formData[item] : 'NA'} */}

                          {Array.isArray(formData[item]) ? (
                            formData[item].join(', ') || 'NA'
                          ) : formData[item] instanceof Date ? (
                            formData[item].toLocaleDateString() || 'NA'
                          ) : typeof formData[item] === "string" && formData[item].includes(".000Z") ? (
                            formData[item].split("T")[0] || 'NA'
                          ) : formData[item] ? (
                            formData[item]
                          ) : 'NA'}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#828282', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item == "Sec" ? "SEC" : item}
                        </div>
                      </div>
                    </Col>
                  ))
                )}
                {formData?.assetType?.toLowerCase() == "content" && (
                  content?.map((item: any, index: any) => (
                    <Col key={index} xs={6} md={4} lg={3} style={{ marginBottom: '20px', borderRight: '1px solid #E7E7E7', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                      <div style={{}}>
                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                          {/* {Array.isArray(formData[item]) ?
                            (formData[item].join(', ') || 'NA') :
                            formData[item]?.toString().includes(".000Z") ?
                              (formData[item].split("T")[0] || 'NA') :
                              formData[item] ?
                                formData[item] : 'NA'} */}
                          {Array.isArray(formData[item]) ? (
                            formData[item].join(', ') || 'NA'
                          ) : formData[item] instanceof Date ? (
                            formData[item].toLocaleDateString() || 'NA'
                          ) : typeof formData[item] === "string" && formData[item].includes(".000Z") ? (
                            formData[item].split("T")[0] || 'NA'
                          ) : formData[item] ? (
                            formData[item]
                          ) : 'NA'}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#828282', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item == "Sec" ? "SEC" : item}
                        </div>
                      </div>
                    </Col>
                  ))
                )}
                {formData?.assetType?.toLowerCase() == "athlete" && (
                  athelete?.map((item: any, index: any) => (
                    <Col key={index} xs={6} md={4} lg={3} style={{ marginBottom: '20px', borderRight: '1px solid #E7E7E7', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                      <div style={{}}>
                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                          {/* {Array.isArray(formData[item]) ?
                            (formData[item].join(', ') || 'NA') :
                            formData[item]?.toString().includes(".000Z") ?
                              (formData[item].split("T")[0] || 'NA') :
                              formData[item] ?
                                formData[item] : 'NA'} */}
                          {Array.isArray(formData[item]) ? (
                            formData[item].join(', ') || 'NA'
                          ) : formData[item] instanceof Date ? (
                            formData[item].toLocaleDateString() || 'NA'
                          ) : typeof formData[item] === "string" && formData[item].includes(".000Z") ? (
                            formData[item].split("T")[0] || 'NA'
                          ) : formData[item] ? (
                            formData[item]
                          ) : 'NA'}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#828282', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item == "Sec" ? "SEC" : item}
                        </div>
                      </div>
                    </Col>
                  ))
                )}

              </Row>
            </div>


            {assetData?.asset_social_media?.length > 0 && (<div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', marginTop: '20px' }}>
              Social Profiles
            </div>)}

            <div style={{ cursor: 'pointer', display: 'flex', gap: '20px', fontFamily: 'Inter', flexWrap: 'wrap', alignItems: 'center', justifyContent: (deviceType == "mobile" || deviceType == "small-tablet") ? 'center' : '' }}>
              {(assetData?.asset_social_media?.length > 0) ? (assetData?.asset_social_media?.map((item: any, index: any) => {
                return (
                  <div key={index} onClick={() => { window.open(item?.url, '_blank') }} style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.08)', marginTop: '20px', borderRadius: '16px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: '#fff' }}>
                    <div style={{ height: "45px", width: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={getStatIcon(item?.social_media_platform?.toLowerCase())} style={{ objectFit: 'cover', height: item?.social_media_platform?.toLowerCase() == "x" ? "35px" : '45px' }} />
                    </div>
                  </div>
                );
              })) : (
                <></>
              )}
            </div>









            {(assetData?.asset_social_media?.length > 0) ?
              (
                <div style={{ display: "flex", flexDirection: 'column', justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', marginTop: '20px' }}>
                    Social Media Stats
                  </div>
                  <div style={{ display: 'flex', gap: '20px', fontFamily: 'Inter', flexWrap: 'wrap', alignItems: 'center', justifyContent: (deviceType == "mobile" || deviceType == "small-tablet") ? 'center' : '', marginTop: '10px' }}>
                    {(assetData?.asset_social_media?.length > 0 && assetData?.asset_social_media)?.sort((a: any, b: any) => {
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
                                >
                                  <div>
                                    <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{formatCurrency2(currentDetails?.posts_count)}</div>
                                    <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Posts</div>
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
                                >
                                  <div>
                                    <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{formatCurrency2(currentDetails?.likes_count)}</div>
                                    <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Likes</div>
                                  </div>
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
                                >
                                  {(item?.social_media_platform?.toUpperCase() == "INSTAGRAM") && (<div>
                                    <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{formatCurrency2(currentDetails?.comments_count)}</div>
                                    <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Comments</div>
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
                </div>

              ) : (
                <div style={{ display: "flex", flexDirection: 'column', justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
                  {formData?.["Social Handles"] && (<div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', marginTop: '20px' }}>
                    Social Media Stats
                  </div>)}
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'flex-start', gap: "10px", flexWrap: "wrap" }}>

                    {(formData?.["Social Handles"]?.x) && (<div
                      onClick={() => {
                        window.open(formData?.["Social Handles"]?.x)
                      }}
                      style={{ minHeight: '260px', minWidth: '360px', maxHeight: '260px', maxWidth: '360px', boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.08)', marginTop: '20px', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <div>
                        <img src={getStatIcon("X")} style={{ objectFit: 'cover', marginRight: '20px', height: '35px' }} />
                        <span style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{"X"}</span>
                      </div>
                      <div style={{ height: "2px", width: "100%", background: "linear-gradient(90deg, #FFFFFF 0%, #E20B18 49.5%, #FFFFFF 100%)", margin: '20px' }}></div>
                      <div style={{ background: "rgba(255, 249, 249, 1)", height: '100%', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ width: '45px' }}></div>
                          <div>
                            <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                            <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Followers</div>
                          </div>
                          <div style={{ width: '45px' }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>

                          <div
                          // style={{display:'flex'}}
                          >
                            <div>
                              <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                              <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Posts</div>
                            </div>
                          </div>

                          <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>


                          <div
                          // style={{display:'flex'}}
                          >
                            <div>
                              <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                              <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Likes</div>
                            </div>
                          </div>



                          <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
                          <div
                          // style={{display:'flex'}}
                          >
                            <div>
                              <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                              <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Comments</div>
                            </div>



                          </div>
                        </div>
                      </div>
                    </div>)}
                    {(formData?.["Social Handles"]?.instagram) && (
                      <div
                        onClick={() => {
                          window.open(formData?.["Social Handles"]?.instagram)
                        }}
                        style={{ minHeight: '260px', minWidth: '360px', maxHeight: '260px', maxWidth: '360px', boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.08)', marginTop: '20px', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div>
                          <img src={getStatIcon("INSTAGRAM")} style={{ objectFit: 'cover', marginRight: '20px', height: '45px' }} />
                          <span style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{"INSTAGRAM"}</span>
                        </div>
                        <div style={{ height: "2px", width: "100%", background: "linear-gradient(90deg, #FFFFFF 0%, #E20B18 49.5%, #FFFFFF 100%)", margin: '20px' }}></div>
                        <div style={{ background: "rgba(255, 249, 249, 1)", height: '100%', width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '45px' }}></div>
                            <div>
                              <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                              <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Followers</div>
                            </div>
                            <div style={{ width: '45px' }}></div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>

                            <div
                            // style={{display:'flex'}}
                            >
                              <div>
                                <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                                <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Posts</div>
                              </div>
                            </div>

                            <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>


                            <div
                            // style={{display:'flex'}}
                            >
                              <div>
                                <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                                <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Likes</div>
                              </div>
                            </div>



                            <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
                            <div
                            // style={{display:'flex'}}
                            >
                              <div>
                                <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                                <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Comments</div>
                              </div>



                            </div>
                          </div>
                        </div>
                      </div>)}
                    {(formData?.["Social Handles"]?.youtube) && (
                      <div onClick={() => {
                        window.open(formData?.["Social Handles"]?.youtube)
                      }} style={{ minHeight: '260px', minWidth: '360px', maxHeight: '260px', maxWidth: '360px', boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.08)', marginTop: '20px', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div>
                          <img src={getStatIcon("YOUTUBE")} style={{ objectFit: 'cover', marginRight: '20px', height: '45px' }} />
                          <span style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>{"YOUTUBE"}</span>
                        </div>
                        <div style={{ height: "2px", width: "100%", background: "linear-gradient(90deg, #FFFFFF 0%, #E20B18 49.5%, #FFFFFF 100%)", margin: '20px' }}></div>
                        <div style={{ background: "rgba(255, 249, 249, 1)", height: '100%', width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '45px' }}></div>
                            <div>
                              <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                              <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Followers</div>
                            </div>
                            <div style={{ width: '45px' }}></div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>

                            <div
                            // style={{display:'flex'}}
                            >
                              <div>
                                <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                                <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Posts</div>
                              </div>
                            </div>

                            <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>


                            <div
                            // style={{display:'flex'}}
                            >
                              <div>
                                <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                                <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Likes</div>
                              </div>
                            </div>



                            <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
                            <div
                            // style={{display:'flex'}}
                            >
                              <div>
                                <div style={{ color: "#333", fontWeight: 600, fontSize: '16px' }}>NA</div>
                                <div style={{ color: "#828282", fontWeight: 500, fontSize: '14px' }}>Comments</div>
                              </div>



                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}



            <div style={{ paddingTop: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                About
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>


                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "25.6px",
                    textAlign: "left",
                    padding: 0,
                    margin: 0
                  }}
                >{fullText || "NA"} </p>

              </div>
            </div>


            {formData?.assetType?.toLowerCase() != "tournament" && (<div style={{ paddingTop: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                Highlights
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                {/* {formData?.Highlights || "NA"} */}
                {formData?.Highlights
                  ? (

                    formData?.Highlights?.split('\n')?.map((sentence: string, sentenceIndex: number) => (
                      <p key={sentenceIndex} style={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Inter', margin: 0, padding: 0, minHeight: sentence?.trim() === '' ? '1em' : 'auto', }}>
                        {sentence?.trim() === '' ? '\u00A0' : sentence}
                      </p>
                    ))
                  )
                  : "NA"
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


                {formData?.assetType?.toLowerCase() == "team" && (
                  teamMore?.map((item: any, index: any) => (
                    <Col key={index} xs={6} md={4} lg={4} style={{ marginBottom: '20px', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                      <div style={{}}>
                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                          {item == "Sec" ? "SEC" : item}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                          {Array.isArray(formData[item]) ?
                            formData[item].length === 0
                              ? "NA" :
                              formData[item].join(', ') :
                            formData[item]?.toString().includes(".000Z") ?
                              formData[item].split("T")[0] :
                              formData[item] ?
                                formData[item] : 'NA'}
                        </div>

                      </div>
                    </Col>
                  ))
                )}
                {formData?.assetType?.toLowerCase() == "tournament" && (
                  tournamentMore?.map((item: any, index: any) => (
                    <Col key={index} xs={6} md={4} lg={4} style={{ marginBottom: '20px', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                      <div style={{}}>
                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                          {item == "Sec" ? "SEC" : item}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {Array.isArray(formData[item]) ?
                            formData[item].length === 0
                              ? "NA" :
                              formData[item].join(', ') :
                            formData[item]?.toString().includes(".000Z") ?
                              formData[item].split("T")[0] :
                              formData[item] ?
                                formData[item] : 'NA'}
                        </div>

                      </div>
                    </Col>
                  ))
                )}
                {formData?.assetType?.toLowerCase() == "content" && (
                  contentMore?.map((item: any, index: any) => (
                    <Col key={index} xs={6} md={4} lg={4} style={{ marginBottom: '20px', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                        {item == "Sec" ? "SEC" : item}
                      </div>

                      <div style={{}}>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {Array.isArray(formData[item]) ?
                            formData[item].length === 0
                              ? "NA" :
                              formData[item].join(', ') :
                            formData[item]?.toString().includes(".000Z") ?
                              formData[item].split("T")[0] :
                              formData[item] ?
                                formData[item] : 'NA'}
                        </div>

                      </div>
                    </Col>
                  ))
                )}
                {formData?.assetType?.toLowerCase() == "athlete" && (
                  atheleteMore?.map((item: any,index:any) => (
                    <Col key={index} xs={6} md={4} lg={4} style={{ marginBottom: '20px', padding: '0px', paddingLeft: '15px', paddingTop: '10px' }}>
                      <div style={{}}>
                        <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                          {item == "Sec" ? "SEC" : item}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {Array.isArray(formData[item]) ?
                            formData[item].length === 0
                              ? "NA" :
                              formData[item].join(', ') :
                            formData[item]?.toString().includes(".000Z") ?
                              formData[item].split("T")[0] :
                              formData[item] ?
                                formData[item] : 'NA'}
                        </div>

                      </div>
                    </Col>
                  ))
                )}

              </Row>
              <div style={{ paddingTop: '30px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                  Other Audience Information
                </div>
                <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                  {formData?.["Other Audience Information"] || "NA"}

                </div>
              </div>
              <div style={{ paddingTop: '30px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                  Other Information
                </div>
                <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                  {formData?.['Other Information'] || "NA"}

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
            {(formData2?.length > 0) && (<div style={{ paddingTop: '20px' }}>
              <OppTextUnderlineUtil />
              <div style={{ marginTop: '10px', marginBottom: '30px', borderRight: '1px solid #E7E7E7', border: '1px solid #DEDEDE', zIndex: '1', borderRadius: '5px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '0px', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                  {formData2?.map((item: any, index: any) => (
                    <div key={index} onClick={() => setSelId(index)} style={{ padding: '20px', color: selId == index ? '#E20B18' : 'grey', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', border: '1px solid rgb(222, 222, 222)', borderBottom: selId == index ? 'none' : '1px solid rgb(222, 222, 222)' }}>
                      {item["Opportunity Type"]}
                    </div>
                  ))}
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: deviceType == 'mobile' ? 'column' : 'row' }}>
                    <Box className={"carouselContainer2"} >
                      <Carousel
                        autoPlay
                        interval={3000}
                        infiniteLoop
                        showThumbs={false}
                        showStatus={false}
                        dynamicHeight={false}
                        showArrows={false}
                        showIndicators={formData2[selId ? selId : 0]?.opportunity_media?.length > 1 ? true : false}
                      >
                        {
                          // formData2[selId ? selId : 0]?.opportunity_media?.map((item: any, index: any) => (
                          formData2[selId ? selId : 0]?.["Opportunity Media"]?.map((item: any, index: any) => (
                            <div key={index} className={"carouselItem"}>
                              <img src={item.media_url} alt={`Media ${index}`} className={"slideImage2"} />
                            </div>
                          ))
                        }
                      </Carousel>
                    </Box>
                    <div style={{ width: deviceType == 'mobile' ? '100%' : '70%', padding: deviceType == 'mobile' ? '0px' : '20px', paddingTop: '20px' }}>
                      <div style={{ paddingTop: '10px', paddingBottom: '15px', color: '#333333', fontSize: deviceType == 'mobile' ? '20px' : '24px', fontWeight: '600', cursor: 'pointer', borderBottom: '1px solid rgb(222, 222, 222)', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                        {formData2[+selId] && formData2[+selId]["Opportunity Type"] || 'NA'}
                      </div>
                      <div style={{ display: 'flex', borderBottom: '1px solid rgb(222, 222, 222)', paddingTop: '10px', paddingBottom: '10px', marginTop: '10px' }}>
                        <div style={{ width: '48%' }}>
                          <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            {formData2[+selId] && formData2[+selId]["Minimum Commitment Value"] || 'NA'}
                          </div>
                          <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            Minimum commitment value
                          </div>
                        </div>
                        <div style={{ borderLeft: '1px solid rgb(222, 222, 222)', paddingLeft: '20px', width: '50%' }}>
                          <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            {formData2[+selId] && formData2[+selId]["Minimum Commitment Period"] || 'NA'}
                          </div>
                          <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            Minimum commitment period
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', borderBottom: '1px solid rgb(222, 222, 222)', paddingTop: '10px', paddingBottom: '10px' }}>
                        <div style={{ width: '48%' }}>
                          <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            ₹{formData2[+selId] && formData2[+selId]["Rate"] || 'NA'}
                          </div>
                          <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            Rate
                          </div>
                        </div>
                        <div style={{ borderLeft: '1px solid rgb(222, 222, 222)', paddingLeft: '20px', width: '50%' }}>
                          <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            {formData2[+selId] && formData2[+selId]["Unit Of Measurement"] || 'NA'}
                          </div>
                          <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            Unit of Measurement
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', paddingTop: '15px', paddingBottom: '15px' }}>
                        <div style={{ width: '98%' }}>
                          <div style={{ paddingBottom: '5px', color: '#333333', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            {formData2[+selId] && formData2[+selId]["Opportunities"] || 'NA'}
                          </div>
                          <div style={{ color: '#828282', fontSize: deviceType == 'mobile' ? '14px' : '16px', fontWeight: '600', cursor: 'pointer', alignItems: 'start', justifyContent: 'flex-start', textAlign: 'start', paddingLeft: '10px' }}>
                            Opportunities
                          </div>
                        </div>

                      </div>
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

                  {selType == "deliverables" && (
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
                            {formData2[+selId] && formData2[+selId]["deliverables"]?.map((item: any, index: any) => (
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
                  {selType == "t&c" && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '20px', background: '#f9f9f9', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333' }}>
                        Terms and Conditions
                      </div>
                      {(formData2[+selId] && formData2[+selId]["Tc Type"]) == "Text" && (<div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4f4f4f', paddingTop: '10px' }}>
                        {formData2[+selId] && formData2[+selId]["Tc Text"] || 'NA'}
                      </div>)}
                      {(formData2[+selId] && formData2[+selId]["Tc Type"]) == "File" && (<div onClick={() => handleDownload(formData2[+selId]["Tc File"], "Terms&Conditions.pdf")} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', display: 'flex', marginTop: '20px', cursor: 'pointer' }}>
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
                      {formData2[+selId] && formData2[+selId]["Other Information"] || 'NA'}
                    </div>
                  </div>)}
                </div>
              </div>
              {isSeller && (<Col xs={12} sm={5} md={4} lg={4} xl={3} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'flex-start' }}>
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

                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
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
            </div>)}
          </div>
          <div style={{ height: '60px' }}></div>









        </div>
      </Drawer >
    );
  }
};

export default AssetPreview;
