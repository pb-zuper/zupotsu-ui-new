import {
  Grid,
  Typography,
  Tooltip,
  Dialog,
  DialogContent,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { UP, YellowTouch, arrowTopRight, editAsset, editAssetRed, Mirroring, people, User, Dotsgroup, Exclusivity, CricketBackgroundBall, fb1, instagramI, FootballBackground, basketBallBackground, BackgroundTennis, ln, globalEarth, greenEdit, TickCircleGreen, CloseCircle, DocumentIcon, editIcon, Closed, HistoryIcon, Eyeslash, FlipView, TeamImage, details, facebookIcon, instagramIcon, NewInstagram, LinkedIn, GlobalB, twitterx, YoutubeIcon } from '../../assets';
import useDeviceType from '../../utils/DeviceType';
import './card.css';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NoImage from '../../assets/NoImage.png'
import styled from '@emotion/styled';
import ReactCardFlip from 'react-card-flip';
import Tiktok from '../../assets/tiktok.svg'
export interface TeamCardProps {
  title: string;
  subTitle: string;
  label: string;
  content: any;
  image: any;
  subContent: any;
  carouselDataAsset: any;
  eventProps: any;
  sponsorshipData: any;
  index: number;
  onEdit: (index: number, label?: string, id?: any) => void;
  onDelete: (index: number) => void;
  isEdit: boolean;
  id: string;
  pitchDeck: any;
  assetCustomDetails: any;
  sport: string;
  tab: string;
  comesFrom?: string;
  getInTouchButtonClicked?: () => void;
  opportunities: string;
  menuOptions?: Array<{ name: string; icon?: string; key: string }>;
  menuOptionClicked?: (key: string, isFlipView?: boolean) => void;
  teamCardFooterData?: any;
  isAdmin?: boolean;
  created_by?: any;
  isFlipView?: any;
  highlights?: any;
  openAssetDetailsDialog?: (isOpen: boolean, data: any) => void;
  hideGetInTouch?: boolean;
  status: string;
  assetDetail: any;
  statusFilter: any;
  setShowRejectAssetData: any;
  setAcceptDialog: any;
  setRequestActionObject: any;
  reason: any;
  buttonType: any;
  setButtonType: any;
  eventscreen?: any;
  closeAssetDialog?: any;
  setCloseAssetDialog?: any;
  setCloseDialog?: any;
  closeDialog?: any;
  flipObject?: any;
  setflipObject?: any;
  flipDialog?: any;
  setFlipDialog?: any;
  detail: any;
  isIframe?: any;
  trayname?: any;
  priority?: any;
}



export interface AssetCardFooterProps {
  rejectionReasonDescription?: string;
  rejectionReasonDate?: string;
  showButtonView: boolean;
  onFooterButtonClicked?: (buttonKey: string) => void;
  uploadedBriefs?: string;
  statusFilter: any;
  setShowRejectAssetData: any;

}

export function AssetCard2({
  assetDetail,
  title,
  id,
  subTitle,
  label,
  content,
  image,
  subContent,
  carouselDataAsset,
  eventProps,
  sponsorshipData,
  index,
  onEdit,
  onDelete,
  isEdit,
  status,
  pitchDeck,
  sport,
  highlights,
  assetCustomDetails,
  tab,
  comesFrom,
  getInTouchButtonClicked,
  opportunities,
  menuOptions,
  menuOptionClicked,
  setShowRejectAssetData,
  statusFilter,
  isAdmin,
  created_by,
  isFlipView = assetDetail.is_flip,
  hideGetInTouch = false,
  setAcceptDialog,
  setCloseDialog,
  closeDialog,
  setRequestActionObject,
  reason,
  buttonType,
  setButtonType,
  eventscreen = false,
  closeAssetDialog,
  setCloseAssetDialog,
  flipObject,
  setflipObject,
  flipDialog,
  setFlipDialog,
  detail,
  isIframe,
  trayname,
  priority
}: TeamCardProps,
  {
    rejectionReasonDescription,
    rejectionReasonDate,
    showButtonView,
    onFooterButtonClicked,
    uploadedBriefs,
  }: AssetCardFooterProps) {
  const isNewlinePresent = highlights?.includes('\n') || '';
  const lines = highlights?.split('\n') || '';
  const [signUpLoginMenuOpen, setSignUpLoginMenuOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(true);
  const [open, setOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const userInfo = { email: 'nav' }
  const [menuanchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [onMouseHover, setOnMouseHover] = useState(false);
  const assetType: any = assetDetail?.asset_type;
  const openMenu = Boolean(menuanchorEl);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState<any>(false);
  const CardType: any = (assetDetail?.ui_asset_listing_id) ? assetDetail?.ui_asset_listing_id : (assetType + 0);
  const draftObj = statusFilter == "draft" ? (assetDetail?.draft?.formdata) : {}
  const [lineClamp, setLineClamp] = useState(2);
  const text = assetDetail?.about || "NA";
  const country: any = assetDetail?.country || "";
  const assetObj: any = assetDetail || {};
  const achievements: any = assetObj?.achievements || "";
  const location: any = useLocation();


  const handleDelete = (e: any) => {
    onDelete(index);
    setOpen(false);
  };

  const getBackgroundColor = () => {
    switch (assetType?.toLowerCase()) {

      case 'content':
        return 'rgba(231, 237, 250, 1)';
      case 'athlete':
        return 'rgba(233, 244, 238, 1)';
      case 'team':
        return 'rgba(252, 240, 217, 1)';
      case 'tournament':
        return 'rgba(245, 238, 252, 1)';
      default:
        return 'var(--Blue-1, #2F80ED)';
    }
  };

  const getTextColor = () => {
    switch (assetType?.toLowerCase()) {
      case 'content':
        return 'rgba(47, 128, 237)';
      case 'athlete':
        return 'rgba(33, 150, 83, 1)';
      case 'team':
        return 'rgba(232, 155, 0)';
      case 'tournament':
        return 'rgba(155, 81, 224, 1)';
      default:
        return 'var(--Blue-1, #2F80ED)';
    }
  };

  const flipBody = {
    "id": id,
    "asset_detail": {
      "id": assetDetail?.id,
      "is_flip": !assetDetail?.is_flip
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

  const getIcon = (assetTypeName: any) => {
    switch (assetTypeName?.toLowerCase()) {
      case "facebook":
        return facebookIcon;
      case "instagram":
        return NewInstagram;
      case "x":
        return twitterx;
      case "website":
        return GlobalB;
      case "blog":
        return GlobalB;
      case "youtube":
        return YoutubeIcon;
      case "tiktok":
        return Tiktok;
      default:
        return "";
    }
  };

  const handleNavigation = (e: any, label: any) => {
    // setDeleting(false);
    // e.stopPropagation();
    if (isAdmin) {
      // openAssetDetailsDialog &&
      //   openAssetDetailsDialog(true, {
      //     id: id,
      //     pitchDeck: pitchDeck,
      //     customProp: carouselDataAsset,
      //     eventProps: eventProps,
      //     sport: sport,
      //     sponsorshipData: sponsorshipData,
      //     assetCustomDetails: assetCustomDetails,
      //     tab: tab,
      //     comesFrom: comesFrom,
      //     label: label,
      //     createdBy: created_by,
      //     status: status
      //   });
    } else {
      navigate(`/${label}/auth`, {
        state: {
          id: id,
          pitchDeck: pitchDeck,
          customProp: carouselDataAsset,
          eventProps: eventProps,
          sport: sport,
          sponsorshipData: sponsorshipData,
          assetCustomDetails: assetCustomDetails,
          tab,
          comesFrom: comesFrom,
          status: status
        },
      });
      //IMPLEMENTED OTHER SOLUTION FOR SCROLL
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.scrollTo(0, 0);
      }
    }
  };

  const handleClick = (e: any) => {
    if (e.target.id === 'navigationButton') {
      handleNavigation('e', label);
    } else if (e.target.id === 'deleteButton') {
      setOpen(true);
    }
  };

  const handleLoginDialog = () => {
    navigate('/confirmationScreen/auth');
    // setSignUpLoginMenuOpen(true);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    const thumbnail = (assetDetail?.asset_media_url);

    setThumbnailUrl(thumbnail ? thumbnail : null);
  }, [assetDetail]);

  const StyledButton = styled('div')(({ }) => {
    return {
      '& .MuiButton-root': {
        'box-shadow': 'none',
        // width: '220px',
      },
    };
  });

  useEffect(() => {
    if (text && text.length < 50) {
      setLineClamp(1);
    } else {
      setLineClamp(2);
    }
  }, [text]);

  const formatDateString = (dateString: any) => {
    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    const formattedMonth = month.slice(0, 3);

    return `${formattedMonth}\n${day} ${year}`;
  };
  const broadcastPartnersArray: any = assetObj?.broadcast_partners?.split(',').map((partner: any) => partner.trim()) || [];

  function formatCurrency2(value: any) {
    if (value !== null && value !== undefined && !isNaN(value)) {
      let currencyCode = localStorage.getItem("preferred_currency") || 'INR';
      let locale = 'en-US';

      if (currencyCode === 'INR') {
        locale = 'en-IN';
      }

      const formatWithNoTrailingZeros = (num: any) => {
        if (num !== null && num !== undefined && !isNaN(num)) {
          return parseFloat(num.toFixed(1));
        } else {
          return "NA";
        }
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
      }).format(value) || "NA";
    } else {
      return "NA";
    }
  }

  const fieldstyle: any = {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "14.8px",
    textAlign: "center",
    color: 'rgba(51, 51, 51, 1)',
    margin: 0,
    letterSpacing: "0.02em",
  }
  const valuestyle: any = {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "14.8px",
    textAlign: "center",
    color: 'rgba(226, 11, 24, 1)',
    margin: 0,
    letterSpacing: "0.02em",
    marginTop: '5px'
  }




  return (
    <div
      onMouseEnter={() => {
        if (isFlipView || isIframe) {
          setIsFlipped(true);
        }
      }}
      onMouseLeave={() => {
        if (isFlipView || isIframe) {
          setIsFlipped(false);
        }
      }}
      onClick={() => {
        if (location.pathname == "/catalogue" && !eventscreen && !isIframe) { navigate(`/assetDetails?id=${id}&screen=catalogue&type=tray&trayname=${trayname}&priority=${priority}`) }
        else if (!eventscreen && !isIframe) { navigate(`/assetDetails?id=${id}&type=tray&trayname=${trayname}&priority=${priority}`) }
      }}
      className='asset-card'
      style={{
        paddingLeft: deviceType === 'mobile' ? '0 !important' : '20px !important',
        borderRadius: "20px",
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
        backgroundColor: "transparent",
        cursor: 'pointer'
      }}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          className="flip-box-front"
          style={{
            width: "310px",
            height: '370px',
            padding: 0,
            paddingLeft: "5%",
            paddingRight: '5%',
            borderRadius: "20px",
            // boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(224, 224, 224, 1)",
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'flex-start',

          }}
        >
          <div style={{ zIndex: 1, top: 0, left: 0, position: 'absolute' }}>
            {(assetDetail?.exclusivity?.toLowerCase() == "yes") && (<img src={Exclusivity} style={{ zIndex: 1, top: 0, left: 0, }} />)}
          </div>
          <div style={{ width: "100%", zIndex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '-5px', marginRight: '5px' }}>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: 'flex-end', justifyContent: 'flex-end', gap: '5px', height: '40px', }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '100px',
                  height: '24px',
                  marginRight: eventscreen == false ? "10px" : "35px",
                  cursor: 'default',
                  textAlign: 'center',
                  zIndex: 1,
                  backgroundColor: '#FFF',
                  marginLeft: (assetDetail?.exclusivity?.toLowerCase() == "yes") ? '30px' : '15px'
                }}
              >
                <Typography
                  sx={{
                    color: 'rgba(34, 140, 200, 1)',
                    fontFamily: 'Inter',
                    fontSize: deviceType === 'mobile' ? '12px' : '12px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    padding: '5px',
                    borderRadius: '100px',
                    width: 'auto',
                    height: '24px',
                    background: 'rgba(45, 156, 219, 0.1)',
                    lineHeight: '16px',
                    letterSpacing: '0.32px',
                    textTransform: 'capitalize',

                  }}
                >
                  {(assetDetail?.sport.length == 1) ? (assetDetail?.sport[0]) : (assetDetail?.sport?.length > 1 ? "Multi-Sport" : 'SportsType')}
                </Typography>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: 'flex-end', justifyContent: 'flex-end', gap: '5px', height: '40px', }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '100px',
                  height: '24px',
                  marginRight: eventscreen == false ? "10px" : "35px",
                  cursor: 'default',
                  textAlign: 'center',
                  zIndex: 1,
                  backgroundColor: '#FFF',
                }}
              >
                <Typography
                  sx={{
                    color: getTextColor(),
                    fontFamily: 'Inter',
                    fontSize: deviceType === 'mobile' ? '12px' : '12px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    padding: '5px',
                    borderRadius: '100px',
                    width: 'auto',
                    height: '24px',
                    background: getBackgroundColor(),
                    lineHeight: '16px',
                    letterSpacing: '0.32px',
                    textTransform: 'capitalize',

                  }}
                >
                  {assetDetail?.asset_type}
                </Typography>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '-16px' }}>
            <div style={{
              width: "90%",
              height: "150px",
              gap: "0px",
              borderRadius: "8px",
              marginTop: '0px',
              border: "0.5px solid rgba(221, 221, 221, 1)",
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center"
            }}>
              <img src={thumbnailUrl ? thumbnailUrl : NoImage ? NoImage : TeamImage} style={{
                width: "100%",
                height: "100%",
                objectFit: 'contain',
                objectPosition:'bottom'
                // objectFit:"fill"
              }} />
            </div>
          </div>

          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "22.4px",
              textAlign: "center",
              color: "rgba(51, 51, 51, 1)",
              marginTop: '10px',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}

          > {assetDetail?.name || "NA"}
          </Typography>



          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 400,
              textAlign: "center",
              fontStyle: "italic",
              letterSpacing: "0.02em",
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              height: '35px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: '5px'
            }}

          >{assetDetail?.headline || "NA"}</Typography>


          <div style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", paddingTop: '5px' }}>
            {(assetType?.toLowerCase() == "team" && CardType !== "Team2") && (

              <div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '10px' }}>

                <div style={{
                  width: "100%",
                  flexDirection: "row",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: "space-evenly",
                }}>
                  <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "5px" }}>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "14.8px",
                          textAlign: "center",
                          color: 'rgba(51, 51, 51, 1)',
                          margin: 0,
                          letterSpacing: "0.02em",
                        }}
                      >
                        Country
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "16.8px",
                          textAlign: "center",
                          color: 'rgba(226, 11, 24, 1)',
                          margin: 0
                        }}
                      >
                        {(country?.length > 0
                          ? <>
                            {country[0]}
                            {(country?.length > 1) && (<span style={{ color: "red", fontSize: '12px' }}>+[{country?.length - 1}]</span>)}
                          </>
                          : "NA")
                        }
                      </p>
                    </div>

                  </div>
                  <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
                  <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "5px" }}>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "14.8px",
                          textAlign: "center",
                          color: 'rgba(51, 51, 51, 1)',
                          margin: 0,
                          letterSpacing: "0.02em",
                        }}
                      >
                        State
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "16.8px",
                          textAlign: "center",
                          color: 'rgba(226, 11, 24, 1)',
                          margin: 0
                        }}
                      >
                        {(assetObj?.state?.length > 0
                          ? <>
                            {assetObj?.state[0]}
                            {(assetObj?.state?.length > 1) && (<span style={{ color: "red", fontSize: '12px' }}>+[{assetObj?.state?.length - 1}]</span>)}
                          </>
                          : "NA")
                        }
                      </p>
                    </div>

                  </div>
                  <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
                  <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "5px" }}>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "14.8px",
                          textAlign: "center",
                          color: 'rgba(51, 51, 51, 1)',
                          margin: 0,
                          letterSpacing: "0.02em",
                        }}
                      >
                        City
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "16.8px",
                          textAlign: "center",
                          color: 'rgba(226, 11, 24, 1)',
                          margin: 0
                        }}
                      >
                        {(assetObj?.city?.length > 0
                          ? <>
                            {assetObj?.city[0]}
                            {(assetObj?.city?.length > 1) && (<span style={{ color: "red", fontSize: '12px' }}>+[{assetObj?.city?.length - 1}]</span>)}
                          </>
                          : "NA")
                        }
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            )}

            {(assetType?.toLowerCase() == "tournament") && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '10px' }}>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '5px', alignItems: 'center' }}>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "14.8px",
                      textAlign: "center",
                      color: 'rgba(51, 51, 51, 1)',
                      margin: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    Date From
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "14.8px",
                      textAlign: "center",
                      color: 'rgba(226, 11, 24, 1)',
                      margin: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {assetObj?.dates_from ? (formatDateString(assetObj?.dates_from) || "NA") : "NA"}
                  </p>
                </div>
                <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '5px', alignItems: 'center' }}>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "14.8px",
                      textAlign: "center",
                      color: 'rgba(51, 51, 51, 1)',
                      margin: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    Date To
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "14.8px",
                      textAlign: "center",
                      color: 'rgba(226, 11, 24, 1)',
                      margin: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {assetObj?.dates_to ? (formatDateString(assetObj?.dates_to) || "NA") : "NA"}
                  </p>
                </div>

              </div>


            </div>

            )}

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: CardType == "Tournament1" ? 'space-evenly' : "center", alignItems: 'center', width: '100%', marginTop: '10px' }}>
              {(assetType?.toLowerCase() == "tournament") && (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: CardType == "Tournament1" ? 'space-evenly' : "center", alignItems: 'center', width: '100%', marginTop: '10px' }}>
                  <div style={{ width: '50%', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center", gap: '5px' }}>
                    <p
                      style={fieldstyle}
                    >
                      Host Countries
                    </p>
                    <p style={valuestyle}>
                      {
                        assetObj?.host_countries && assetObj?.host_countries?.length > 0 ? (
                          assetObj?.host_countries?.length > 1
                            ? `${assetObj?.host_countries[0]} + [${assetObj?.host_countries?.length - 1}]`
                            : assetObj?.host_countries[0]
                        ) : (
                          "NA"
                        )
                      }
                    </p>


                  </div>
                  <div style={{ width: '50%', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center",  }}>
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "14.8px",
                        textAlign: "center",
                        color: 'rgba(51, 51, 51, 1)',
                        margin: 0,
                        letterSpacing: "0.02em",
                      }}

                    >
                      Host Cities
                    </p>

                    <p
                      style={{
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "14.8px",
                        textAlign: "center",
                        color: 'rgba(226, 11, 24, 1)',
                        margin: 0,
                        marginTop: '5px',
                        letterSpacing: "0.02em",
                      }}
                    >
                      {(
                        assetObj?.host_cities && assetObj?.host_cities?.length > 0 ? (
                          assetObj?.host_cities?.length > 1
                            ? `${assetObj?.host_cities[0]} + [${assetObj?.host_cities?.length - 1}]`
                            : assetObj?.host_cities[0] || "NA"
                        ) : (
                          "NA"
                        )
                      )}
                    </p>
                  </div>
                </div>
              )}
              {/* {(CardType == "Tournament1") && <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>}
              {(assetType?.toLowerCase() == "tournament" && CardType == "Tournament1") && (<div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center", marginTop: '5px' }}>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(51, 51, 51, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}

                >
                  Edition
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                    marginTop: '5px',
                    letterSpacing: "0.02em",
                  }}

                >
                  {assetObj?.edition ? assetObj?.edition : `NA`}
                </p>
              </div>
              )} */}
            </div>


            {(assetType?.toLowerCase() == "athlete" && (CardType == "Athlete3")) && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "center", marginTop: '10px' }}>
              <div
                style={{
                  width: "50%",
                  gap: "2px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                }}>
                <img src={getIcon("instagram"
                )}
                  style={{
                    width: "18px",
                    height: "18px",
                    top: "18px",
                    left: "18px",
                    cursor: 'pointer'
                  }} />
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "19.6px",
                    textAlign: "left",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                  }}
                >
                  {
                    assetDetail?.asset_social_media
                      ? typeof assetDetail.asset_social_media === "string" ?
                        formatCurrency2((JSON.parse(assetDetail.asset_social_media)
                          .find((entry: any) => entry.social_media_platform === "instagram")?.asset_social_media_details?.[0]?.followers_count)) || "NA"
                        :
                        formatCurrency2((assetDetail.asset_social_media)
                          .find((entry: any) => entry.social_media_platform === "instagram")?.asset_social_media_details?.[0]?.followers_count) ?? "NA"
                      : "NA"
                  }

                </p>

              </div>
            </div>
            )}

            {((assetType?.toLowerCase() == "team" && (CardType == "Team2")) || (assetType?.toLowerCase() == "athlete" && (CardType == "Athlete0" || CardType == "Athlete1"))) && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '10px' }}>
              <div
                style={{
                  width: "50%",
                  gap: "2px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <img src={getIcon("instagram"
                )}
                  style={{
                    width: "18px",
                    height: "18px",
                    top: "18px",
                    left: "18px",
                    cursor: 'pointer'
                  }} />
                <p
                  style={valuestyle}
                > {
                    assetDetail?.asset_social_media
                      ? typeof assetDetail.asset_social_media === "string" ?
                        formatCurrency2((JSON.parse(assetDetail.asset_social_media)
                          .find((entry: any) => entry?.social_media_platform === "instagram")?.asset_social_media_details?.[0]?.followers_count || "NA"))
                        :
                        formatCurrency2((assetDetail.asset_social_media)
                          .find((entry: any) => entry?.social_media_platform === "instagram")?.asset_social_media_details?.[0]?.followers_count) ?? "NA"
                      : "NA"
                  }
                </p>
              </div>
              <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
              <div
                style={{
                  width: "50%",
                  gap: "2px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                }}>
                <img src={getIcon("x")}
                  style={{
                    width: "18px",
                    height: "18px",
                    top: "18px",
                    left: "18px",
                    cursor: 'pointer'
                  }} />
                <p

                  style={valuestyle}
                >
                  {
                    assetDetail?.asset_social_media
                      ? typeof assetDetail.asset_social_media === "string" ?
                        formatCurrency2((JSON.parse(assetDetail.asset_social_media)
                          .find((entry: any) => entry?.social_media_platform === "x")?.asset_social_media_details?.[0]?.followers_count || "NA"))
                        :
                        formatCurrency2((assetDetail.asset_social_media)
                          .find((entry: any) => entry?.social_media_platform === "x")?.asset_social_media_details?.[0]?.followers_count) ?? "NA"
                      : "NA"
                  }
                </p>
              </div>

            </div>
            )}


            {((assetType?.toLowerCase() == "athlete" && (CardType == "Athlete2")) || (assetType?.toLowerCase() == "content" && (CardType == "Content3" || CardType == "Content2"))) && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '10px' }}>

              {(!(assetType?.toLowerCase() == "athlete" && CardType == "Athlete2")) && (
                <div
                  style={{
                    width: "50%",
                    gap: "2px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',



                  }}>
                  <img src={getIcon("youtube"
                  )}
                    style={{
                      width: "18px",
                      height: "18px",
                      top: "18px",
                      left: "18px",
                      cursor: 'pointer'
                    }} />
                  <p
                    style={valuestyle}
                  >
                    {
                      assetDetail?.asset_social_media
                        ? typeof assetDetail.asset_social_media === "string" ?
                          formatCurrency2((JSON.parse(assetDetail.asset_social_media)
                            .find((entry: any) => entry?.social_media_platform === "youtube")?.asset_social_media_details?.[0]?.followers_count || "NA"))
                          :
                          formatCurrency2((assetDetail.asset_social_media)
                            .find((entry: any) => entry?.social_media_platform === "youtube")?.asset_social_media_details?.[0]?.followers_count) ?? "NA"
                        : "NA"
                    }
                  </p>

                </div>
              )}
              {(!(assetType?.toLowerCase() == "athlete" && CardType == "Athlete2")) && (<span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>)}

              <div
                style={{
                  width: "50%",
                  gap: "2px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                }}>
                <img src={getIcon("instagram"
                )}

                  style={{
                    width: "18px",
                    height: "18px",
                    top: "18px",
                    left: "18px",
                    cursor: 'pointer'
                  }} />
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "19.6px",
                    textAlign: "left",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                  }}
                >
                  {
                    assetDetail?.asset_social_media
                      ? typeof assetDetail.asset_social_media === "string" ?
                        formatCurrency2((JSON.parse(assetDetail.asset_social_media)
                          .find((entry: any) => entry.social_media_platform === "instagram")?.asset_social_media_details?.[0]?.followers_count)) || "NA"
                        :
                        formatCurrency2((assetDetail?.asset_social_media)
                          .find((entry: any) => entry.social_media_platform === "instagram")?.asset_social_media_details?.[0]?.followers_count) ?? "NA"
                      : "NA"
                  }
                </p>

              </div>


              <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
              <div
                style={{
                  width: "50%",
                  gap: "2px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                }}>
                <img src={twitterx}

                  style={{
                    width: "18px",
                    height: "18px",
                    top: "18px",
                    left: "18px",
                    cursor: 'pointer'
                  }} />
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "19.6px",
                    textAlign: "left",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                  }}
                >
                  {
                    assetDetail?.asset_social_media
                      ? typeof assetDetail.asset_social_media === "string" ?
                        formatCurrency2((JSON.parse(assetDetail?.asset_social_media)
                          .find((entry: any) => entry.social_media_platform === "x")?.asset_social_media_details?.[0]?.followers_count) || "NA")
                        :
                        formatCurrency2((assetDetail?.asset_social_media)
                          .find((entry: any) => entry.social_media_platform === "x")?.asset_social_media_details?.[0]?.followers_count) ?? "NA"
                      : "NA"
                  }
                </p>

              </div>
              {(assetType?.toLowerCase() == "athlete" && CardType == "Athlete2") && (<span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>)}
              {(assetType?.toLowerCase() == "athlete" && CardType == "Athlete2") && (<div
                style={{
                  width: "50%",
                  gap: "2px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <img src={getIcon("facebook"
                )}

                  style={{
                    width: "18px",
                    height: "18px",
                    top: "18px",
                    left: "18px",
                    cursor: 'pointer'
                  }} />
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "19.6px",
                    textAlign: "left",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                  }}
                >{
                    assetDetail?.asset_social_media
                      ? typeof assetDetail.asset_social_media === "string" ?
                        formatCurrency2((JSON.parse(assetDetail.asset_social_media)
                          .find((entry: any) => entry.social_media_platform === "facebook")?.asset_social_media_details?.[0]?.followers_count || "NA"))
                        :
                        formatCurrency2((assetDetail.asset_social_media)
                          .find((entry: any) => entry.social_media_platform === "facebook")?.asset_social_media_details?.[0]?.followers_count) ?? "NA"
                      : "NA"
                  }</p>

              </div>)}

            </div>
            )}


            {(assetType?.toLowerCase() == "content") && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '0px' }}>

              <div style={{

                gap: "2px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

              }}>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(51, 51, 51, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >Start date</p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  {assetObj?.start_date ? formatDateString(assetObj.start_date) : 'NA'}
                </p>

              </div>

            </div>)}


            {(assetType?.toLowerCase() == "content"
              && CardType == "Content0"
            ) && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '10px' }}>

              <div style={{

                gap: "2px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

              }}>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(51, 51, 51, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >Produced By</p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  {assetObj?.produced_by ? assetObj?.produced_by : 'NA'}
                </p>

              </div>

            </div>)}

            {/* {(assetType?.toLowerCase() == "athlete"
              && CardType == "Athlete1"
            ) && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '10px' }}>

              <div style={{

                gap: "2px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

              }}>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(51, 51, 51, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >Achievements</p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    // color: 'rgba(51, 51, 51, 1)',
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  {achievements ? achievements : 'NA'}
                </p>

              </div>

            </div>)} */}


          </div>

          <div style={{ width: "100%", zIndex: -9999, display: 'flex', flexDirection: 'row', height: '110px', justifyContent: 'space-between', bottom: 0, marginTop: '-90px', position: 'absolute', marginLeft: '-5%' }}>
            {(detail?.front_media
            ) && (
                <img src={
                  detail?.front_media
                } style={{ zIndex: -9999, top: 0, left: 0, height: '100px', width: '100px', opacity: 1 }} />
              )}
          </div>

        </div>
        <div

          className="flip-box-back"
          style={{
            width: "310px",
            height: '370px',
            backgroundColor: getBackgroundColor(),
            borderRadius: "20px",
            // boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(224, 224, 224, 1)",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "flex-start",
            zIndex: 2
          }}
        >
          {isIframe && (<div className="asset-hover-card">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                gap: '20px',
              }}
            >
              <Typography
                style={{
                  color: '#333',
                  fontFamily: 'Inter',
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: 'normal',
                  letterSpacing: '0.48px',
                  textTransform: 'capitalize',
                }}
              >
                To view details
              </Typography>
              <ZupotsuButton
                name="Login / Register"
                handleClick={() => { window.open(process.env.REACT_APP_ZUPOTSU_BASE_URL + `/assetDetails?id=${id}&screen=catalogue`, "_blank") }}
                imageHeight="24px"
                imageWidth="24px"
                trailingIcon={arrowTopRight}
                customBgColor="#E22B16"
              />
            </div>
          </div>)}
          {!isIframe && (<div
            style={{
              width: "100%",
              height: deviceType === 'mobile' ? '350px' : '350px',
              padding: '10px',
              borderRadius: "20px",
              display: "flex",
              flexDirection: 'column',
              justifyContent: "flex-start",
              zIndex: 2
            }}
          >

            <div style={{ width: "100%", zIndex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute' }}>

              <div style={{ display: 'flex', flexDirection: "row", alignItems: 'flex-end', justifyContent: 'flex-end', gap: '5px', height: '35px', }}>

                {
                  eventscreen
                  && (
                    <>
                      <div
                        style={{
                          background: '#FFF',
                          borderRadius: '10px',
                          border: '1px solid #BDBDBD',
                          width: '28px',
                          height: '28px',
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: '20px',
                          position: "fixed"
                        }}
                        onClick={handleMenuClick}
                      >
                        <MoreVertIcon
                          style={{ color: '#333', width: '18px', height: '18px' }}
                        />
                      </div>

                      <Menu
                        anchorEl={menuanchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        sx={{
                          boxShadow: "4px 4px 12px 0px rgba(0, 0, 0, 0.07)",
                          borderRadius: '10px',
                          padding: '10px'
                        }}
                      >
                        <MenuList
                          sx={{
                            outline: 'none',
                            borderRadius: '10px'
                          }}
                        >
                          {
                            [{
                              key: 1,
                              name: "Edit",
                              icon: editIcon,
                              disabled: false,
                            }, {
                              key: 2,
                              name: "Close",
                              icon: Closed,
                              disabled: statusFilter == "draft" ? true : false,
                            },
                            {
                              key: 3,
                              name: assetDetail?.is_flip ? "Disable Flip View" : "Enable Flip View",
                              icon: FlipView,
                              disabled: statusFilter == "draft" ? true : false,
                            },
                            // {
                            //   key: 4,
                            //   name: "Disable “Listed By",
                            //   icon: Eyeslash
                            // },
                            // {
                            //   key: 4,
                            //   name: "History",
                            //   icon: HistoryIcon
                            // }
                            {
                              key: 4,
                              name: "Details",
                              icon: details,
                              disabled: false,
                            },
                            ]
                              ?.map((menudata) => !menudata?.disabled && (
                                <MenuItem
                                  key={menudata.key}
                                  onClick={() => {
                                    if (menudata) {
                                      if (menudata.name === 'Edit') {
                                        onEdit(index, label, id);
                                      }
                                      else if (menudata.name === 'Close') {
                                        setCloseDialog(true);
                                        setRequestActionObject(assetDetail);
                                        setCloseAssetDialog({
                                          isOpen: false,
                                        })
                                        setButtonType("close");
                                      }
                                      else if (menudata.name === 'Disable Flip View' || menudata.name === "Enable Flip View") {
                                        setButtonType("flip");
                                        setflipObject(flipBody);
                                        setFlipDialog(true);

                                      }
                                      else if (menudata.name === 'Details') {
                                        navigate(`/assetDetails?id=${id}&type=tray&trayname=${trayname}&priority=${priority}`)
                                      }
                                    }
                                  }}

                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    '&:hover': {
                                      background: 'rgba(226, 11, 24, 0.2)',
                                    },
                                  }}
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      gap: '10px',
                                      alignItems: 'center',

                                    }}

                                  >
                                    {menudata && menudata.icon && (
                                      <ListItemIcon
                                        sx={{
                                          width: '20px',
                                          height: '20px',
                                          minHeight: '20px',
                                          minWidth: '20px !important',
                                        }}
                                      >
                                        <img src={menudata.icon} />
                                      </ListItemIcon>
                                    )}
                                    <ListItemText
                                      sx={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: '#333',
                                        fontFamily: "Inter",
                                        lineHeight: "21px",
                                        textAlign: "left",

                                      }}
                                    >
                                      {menudata && menudata.name}
                                    </ListItemText>
                                  </div>
                                </MenuItem>
                              ))}
                        </MenuList>
                      </Menu>



                    </>
                  )}
              </div>
            </div>
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}
            >
              {((assetType?.toLowerCase() === "athlete" && (CardType === "Athlete0" || CardType == "Athlete3")) ||
                (assetType?.toLowerCase() === "content" && CardType === "Content0") ||
                (assetType?.toLowerCase() === "team" && CardType === "Team0") ||
                (assetType?.toLowerCase() === "tournament" && CardType === "Tournament0")
              )
                ? "About"
                : (assetType?.toLowerCase() === "team" && CardType === "Team1")
                  ? "Highlights"
                  : ""}
            </p>
            {((assetType?.toLowerCase() === "athlete" && (CardType === "Athlete0" || CardType == "Athlete3")) ||
              (assetType?.toLowerCase() === "content" && CardType === "Content0") ||
              (assetType?.toLowerCase() === "team" && CardType === "Team0") ||
              (assetType?.toLowerCase() === "team" && CardType === "Team1") ||
              (assetType?.toLowerCase() === "tournament" && CardType === "Tournament0")) && (
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22.4px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                    textOverflow: 'ellipsis',
                    margin: "0px"
                  }}
                >
                  {((assetType?.toLowerCase() === "athlete" && (CardType === "Athlete0" || CardType == "Athlete3")) ||
                    (assetType?.toLowerCase() === "content" && CardType === "Content0") ||
                    (assetType?.toLowerCase() === "team" && CardType === "Team0") ||
                    (assetType?.toLowerCase() === "tournament" && CardType === "Tournament0"))
                    ?
                    (assetDetail?.about || "NA")
                    : assetType?.toLowerCase() === "team" && CardType === "Team1"
                      ? (assetObj?.highlights || "NA")
                      : 'NA'}
                </p>
              )}


            {(assetType?.toLowerCase() == "athlete" && (CardType == "Athlete1")) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}

            >
              {((assetType?.toLowerCase() == "athlete" && (CardType == "Athlete1")) && "Highlights")}
            </p>)}
            {((assetType?.toLowerCase() == "athlete" && (CardType == "Athlete1"))) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 4,
                textOverflow: 'ellipsis',
              }}

            >
              {(assetObj?.highlights || "NA")}
            </p>)}

            {/* {(assetType?.toLowerCase() == "athlete" && (CardType == "Athlete1" || CardType == "Athlete2" || CardType == "Athlete4")) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}

            >
              {((assetType?.toLowerCase() == "athlete" && (CardType == "Athlete1" || CardType == "Athlete2" || CardType == "Athlete4")) && "Career Highlights")}
            </p>)}
            {((assetType?.toLowerCase() == "athlete" && (CardType == "Athlete1" || CardType == "Athlete2" || CardType == "Athlete4"))) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 4,
                textOverflow: 'ellipsis',
              }}

            >
              {assetObj?.career_highlights || "NA"}
            </p>)} */}


            {/* {((assetType?.toLowerCase() == "athlete" && CardType == "Athlete2"  || CardType == "Athlete4")) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}

            >
              {((assetType?.toLowerCase() == "athlete" && (CardType == "Athlete2" || CardType == "Athlete4")) && "Audience Type")}
            </p>)}
            {((assetType?.toLowerCase() == "athlete" && (CardType == "Athlete2" || CardType == "Athlete4"))) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0
              }}
            >
              {assetDetail?.audience_type || 'NA'}
            </p>)} */}


            {(CardType == "Team2" || CardType == "Content2" || CardType == "Tournament2" || CardType == "Athlete2") && (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: 'flex-start' }}>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "19.6px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                    margin: 0,
                    marginTop: '10px'
                  }}

                >
                  Audience Age
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22.4px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                    margin: 0
                  }}

                >
                  {(assetDetail?.audience_age?.lenth > 1
                    ? assetDetail?.audience_age?.map((classItem: string) => <span key={classItem}>{classItem.trim() || "NA"},  </span>)
                    : (assetDetail?.audience_age[0] || ["NA"]))}
                </p>

                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "19.6px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                    margin: 0,
                    marginTop: '10px'
                  }}

                >
                  Audience Gender
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22.4px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                    margin: 0
                  }}

                >
                  {(assetDetail?.audience_gender?.length > 1
                    ? assetDetail?.audience_gender?.map((classItem: string) => (
                      <span key={classItem}>{classItem},  </span>
                    ))
                    : ["NA"])
                  }

                </p>

                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "19.6px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                    margin: 0,
                    marginTop: '10px'
                  }}

                >
                  Audience Class
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22.4px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                    margin: 0
                  }}

                >
                  {(assetDetail?.audience_class?.lenth > 1
                    ? (assetDetail?.audience_class?.map((classItem: string) => { <span>{classItem}</span> }))
                    : (assetDetail?.audience_class[0] || "NA"))
                  }

                </p>


                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "19.6px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                    margin: 0,
                    marginTop: '10px'
                  }}

                >
                  Geographical Span
                </p>

                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22.4px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                    margin: 0
                  }}

                >
                  {assetObj?.geographical_span || 'NA'}
                </p>

              </div>
            )}



            {((assetType?.toLowerCase() == "tournament" && CardType == "Tournament1")) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}

            >
              {((assetType?.toLowerCase() == "tournament" && CardType == "Tournament1") && "Organised By")}
            </p>)}
            {((assetType?.toLowerCase() == "tournament" && CardType == "Tournament1")) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0
              }}

            >
              {assetDetail?.organised_by || 'NA'}
            </p>)}



            {((assetType?.toLowerCase() == "content"
              &&
              CardType == "Content0"
            )) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}

            >
              {((assetType?.toLowerCase() == "content"
                &&
                CardType == "Content0"
              ) && "Primary Languages")}
            </p>)}
            {((assetType?.toLowerCase() == "content"
              && CardType == "Content0"
            )) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "flex-start",
                alignItems: 'center'
              }}

            >
              {
                assetObj?.primary_languages?.map((item: any, i: any) => (
                  <span key={i}>{item} &nbsp; </span>
                ))
              }
              {(!assetObj?.primary_languages) && ("NA")}
            </p>)}

            {((assetType?.toLowerCase() == "tournament" && CardType == "Tournament1") || ((assetType?.toLowerCase() == "tournament" && CardType == "Tournament0") || (assetType?.toLowerCase() == "content" && (CardType == "Content0" || CardType == "Content1" || CardType == "Content3"))) || (assetType?.toLowerCase() == "team" && CardType == "Team0")) && (
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "19.6px",
                  textAlign: "left",
                  color: "rgba(51, 51, 51, 1)",
                  margin: 0,
                  marginTop: '10px'
                }}

              >
                {/* {(assetType?.toLowerCase() == "tournament" && CardType == "Tournament1") ? "Affiliation" :
                  ((assetType?.toLowerCase() == "tournament" && CardType == "Tournament0") || (assetType?.toLowerCase() == "content" && (CardType == "Content0" || CardType == "Content1" || CardType == "Content2" || CardType == "Content3")))
                    ? "Platform(s)" : (assetType?.toLowerCase() == "team" && CardType == "Team0") ? "Participation In" : assetType?.toLowerCase() == "team" && CardType == "Team2" ? "Promotional Plan" : ""} */}

                {(assetType?.toLowerCase() == "tournament" && CardType == "Tournament1") ? "Affiliation" :
                  ((assetType?.toLowerCase() == "tournament" && CardType == "Tournament0") || (assetType?.toLowerCase() == "content" && (CardType == "Content0" || CardType == "Content1" || CardType == "Content3")))
                    ? "Platform(s)" : (assetType?.toLowerCase() == "team" && CardType == "Team0") ? "Participation In" : ""}
              </p>
            )}
            {((assetType?.toLowerCase() == "tournament" && (CardType == "Tournament0" || CardType == "Tournament1")) || ((assetType?.toLowerCase() == "team" && CardType == "Team0") || (assetType?.toLowerCase() == "content" && (CardType == "Content0" || CardType == "Content1" || CardType == "Content3")))) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '7px'
              }}

            >
              {assetType?.toLowerCase() == "tournament" && CardType == "Tournament1" ? (assetObj?.affiliation || 'NA') : ((assetType?.toLowerCase() == "tournament" && CardType == "Tournament0") || (assetType?.toLowerCase() == "content" && (CardType == "Content0" || CardType == "Content1" || CardType == "Content3"))) ? (
                (assetObj?.broadcast_partners) ? (
                  <div style={{
                    display: 'flex',
                    gap: '3px',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap'
                  }}>
                    {(broadcastPartnersArray.map((partner: any, index: any) => (
                      <span key={index} style={{
                        border: "0.5px solid rgba(79, 79, 79, 1)",
                        padding: "4px 8px",
                        borderRadius: '50px',
                        marginRight: index < broadcastPartnersArray.length - 1 ? '4px' : '0' // Add margin between spans except for the last one
                      }}>
                        {partner?.length > 10 ? `${partner?.slice(0, 10)}...` : `${partner?.slice(0, 10)}`}
                      </span>
                    ))
                    )}
                  </div>
                ) : (<span style={{
                  textAlign: 'left',
                  padding: "4px",

                }}>{'NA'}</span>)
              ) : (assetType?.toLowerCase() == "team" && CardType == "Team0") ? (
                assetObj?.participation_in || 'NA'
              ) : (assetType?.toLowerCase() == "team" && CardType == "Team2") ? (assetObj?.promotional_plan || 'NA') : 'NA'}
            </p>)}
            
            {/* {(
              assetType?.toLowerCase() == "tournament" && CardType == "Tournament2"
            ) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}

            >
              Opportunity
            </p>)}
            {
              (
                assetType?.toLowerCase() === "tournament" && CardType === "Tournament2"
              ) && (
                <div
                  style={{
                    display: 'flex',
                    gap: '3px',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}
                >
                  {assetDetail?.opportunities?.length > 1 ? (
                    assetDetail.opportunities.map((item: any, index: number) => (
                      <span
                        key={index}
                        style={{
                          border: "0.5px solid rgba(79, 79, 79, 1)",
                          padding: "4px 8px",
                          borderRadius: '50px',
                          fontFamily: "Inter",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "22.4px",
                          textAlign: "left",
                          color: "rgba(51, 51, 51, 1)",
                          marginRight: index < assetDetail.opportunities.length - 1 ? '4px' : '0',
                        }}
                      >
                        {item?.opportunity_type?.slice(0, 10)}
                      </span>
                    ))
                  ) : (
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22.4px",
                        textAlign: "left",
                        color: "rgba(51, 51, 51, 1)",
                        margin: 0,
                      }}
                    >
                      NA
                    </p>
                  )}
                </div>
              )
            } */}


            {(assetType?.toLowerCase() == "content" && CardType == "Content1") && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}

            >
              {(assetType?.toLowerCase() == "content" && CardType == "Content1") && "Highlights"}
            </p>)}
            {((assetType?.toLowerCase() == "content" && CardType == "Content1")) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 4,
                textOverflow: 'ellipsis',
              }}

            >
              {assetObj?.highlights || 'NA'}
            </p>)}

            {(assetType?.toLowerCase() == "content" && (CardType == "Content3")) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}

            >
              {(assetType?.toLowerCase() == "content" && ( CardType == "Content3")) && "Live Content Plan"}
            </p>)}
            {((assetType?.toLowerCase() == "content" &&  CardType == "Content3")) && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 4,
                textOverflow: 'ellipsis',
              }}
            >
              {assetObj?.live_content_plan || 'NA'}
            </p>)}

            {/* {(assetType?.toLowerCase() == "team" && CardType == "Team2") && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0,
                marginTop: '10px'
              }}

            >
              {(assetType?.toLowerCase() == "team" && CardType == "Team2") ? "Geographical Span" : ""}
            </p>)} */}

            {/* {(assetType?.toLowerCase() == "team" && CardType == "Team2") && (<p
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "left",
                color: "rgba(51, 51, 51, 1)",
                margin: 0
              }}

            >
              {assetDetail?.geographical_span || 'NA'}
            </p>
            )} */}
          </div>)}
          <div style={{ width: "100%", zIndex: 1, display: 'flex', flexDirection: 'row', height: '110px', justifyContent: 'space-between', bottom: 0, marginTop: '-90px', position: 'absolute' }}>
            {(detail?.flip_media
            ) && (
                <img src={
                  detail?.flip_media
                } style={{ zIndex: 1, top: 0, left: 0, height: '100px', width: '100px', opacity: 1, color: "rgba(255, 255, 255, 0.7)" }} />)}
          </div>
          {!isIframe && (<div style={{
            width: "100%", zIndex: 1, display: 'flex', flexDirection: 'row', paddingTop: '10px',
            paddingBottom: '10px', justifyContent: 'center', bottom: 0, marginTop: '-90px', position: 'absolute', backgroundColor: "transparent",
          }}>
            <Button
              // onClick={() => {
              //   if (location.pathname == "/catalogue") {
              //     navigate(`/assetDetails?id=${id}&screen=catalogue`)
              //   }
              //   else { navigate(`/assetDetails?id=${id}`) }
              // }}
              sx={{
                color: "rgba(32, 129, 226, 1)",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "19.6px",
                textAlign: "center",
                border: "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                flexDirection: 'row',
                alignItems: "center",
                textTransform: 'capitalize',
                position: 'absolute',
                height: '20px',
                bottom: 0,
                zIndex: 1,
                marginBottom: '5px'
              }}
            >
              View More Details
              <span style={{
                fontSize: "12px",
                marginLeft: '2px'
              }}>&gt;</span>
            </Button>
          </div>)}

        </div>
      </ReactCardFlip >
      {


        statusFilter == "created" ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 6.67px',
            }}
          >
            <div
              style={{
                width: '30%',
              }}
            >


              <StyledButton>
                <ZupotsuButton
                  name="Reject"
                  customOutlineColor={"0px solid transparent"}
                  handleClick={() => {
                    setShowRejectAssetData(true)
                    setButtonType("reject")
                    setRequestActionObject(assetDetail)
                  }}
                  isCustomColors={true}
                  customTextColor="#E20B18"
                  customBgColor="rgba(226, 11, 24, 0.05)"
                  padding='12px, 16px, 12px, 16px'
                  leadingIcon={CloseCircle}
                />
              </StyledButton>
            </div>
            <div
              style={{
                width: '30%',
              }}
            >
              <StyledButton>
                <ZupotsuButton
                  name="Accept"
                  handleClick={() => {
                    setButtonType("accept")
                    setRequestActionObject(assetDetail)
                    setAcceptDialog(true)
                  }}
                  customOutlineColor={"0px solid transparent"}
                  isCustomColors={true}
                  customTextColor="#219653"
                  customBgColor="rgba(48, 184, 0, 0.1)"
                  customBgColorOnhover="rgba(48, 184, 0, 0.4)"
                  customTextColorOnHover="#219653"
                  padding='12px, 16px, 12px, 16px'
                  leadingIcon={TickCircleGreen}
                />
              </StyledButton>
            </div>
            <div
              style={{
                width: '30%',
              }}
            >
              <StyledButton>
                <ZupotsuButton
                  name="Edit"
                  handleClick={() => {
                    onEdit(index, label, id)
                  }}
                  customOutlineColor={"0px solid transparent"}
                  isCustomColors={true}
                  customTextColor="#219653"
                  customBgColor="rgba(48, 184, 0, 0.1)"
                  customBgColorOnhover="rgba(48, 184, 0, 0.4)"
                  customTextColorOnHover="#219653"
                  padding='12px, 16px, 12px, 16px'
                  leadingIcon={greenEdit}
                />
              </StyledButton>
            </div>
          </div>
        ) : statusFilter === "closed" ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '5px',
            paddingTop: '5px',
            paddingLeft: '10px'
          }}
            onClick={() => onFooterButtonClicked && onFooterButtonClicked(uploadedBriefs || '')}
          >
            <Typography
              sx={{
                color: '#333333',
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '19.36px',
                fontWeight: 600,
                margin: 0
              }}
            >
              Closed Reason : <span style={{ fontWeight: 400, cursor: 'pointer', color: '#828282', }}>{assetDetail?.closed_reason}</span>
            </Typography>
            <Typography
              sx={{
                color: '#333333',
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '19.36px',
                fontWeight: 600,
                margin: 0
              }}
            >
              Closed By:
              <span style={{ fontWeight: 400, cursor: 'pointer', color: '#828282', }}>{
                assetDetail?.closed_by_user || "NA"
              }</span>
            </Typography>
            <Typography
              sx={{
                color: '#333333',
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '19.36px',
                fontWeight: 600,
                margin: 0
              }}
            >
              Closed At:
              <span style={{ fontWeight: 400, cursor: 'pointer', color: '#828282', }}>
                {
                  formatDateString(assetDetail?.closed_at) || "NA"
                }
              </span>
            </Typography>
            {/* <Typography
              sx={{
                color: '#E20B18',
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '16.94px',
                fontWeight: 500,
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <img src={DocumentIcon} alt='document' width={20} height={20} />
              <div>{uploadedBriefs}</div>
            </Typography> */}
          </div>
        ) : statusFilter == "rejected" ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingTop: '5px',
              gap: '5px',
              paddingLeft: '10px'
            }}
          >
            <ExpandableText text={
              // rejectionReasonDescription
              assetDetail?.rejection_reason
            } />
            <Typography
              sx={{
                color: '#333333',
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '19.36px',
                fontWeight: 600,
                margin: 0
              }}
            >
              Rejected By:
              <span style={{ fontWeight: 400, cursor: 'pointer', color: '#828282', }}>
                {assetDetail?.rejected_by_user || "NA"}
              </span>
            </Typography>

            <Typography
              sx={{
                color: '#333333',
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '19.36px',
                fontWeight: 600,
                margin: 0
              }}
            >
              Rejected At:
              <span style={{ fontWeight: 400, cursor: 'pointer', color: '#828282', }}>
                {
                  (formatDateString(assetDetail?.rejected_at)) || "NA"
                }
              </span>
            </Typography>

            {/* <Typography
              sx={{
                color: '#BDBDBD',
                fontFamily: 'Inter',
                fontSize: '12px',
                lineHeight: '18px',
                fontWeight: 500,
              }}
            >
              {
              // rejectionReasonDate
              assetDetail?.asset_detail[0]?.rejection_reason
              }
            </Typography> */}
          </div>
        ) : (<></>)
      }
    </div >

  )
}

export default AssetCard2;


export const ExpandableText = ({ text }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expansion state
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine if the text should be truncated
  const shouldTruncate = text?.length > 200;
  const displayText =
    isExpanded || !shouldTruncate ? text : `${text?.substring(0, 200)}...`;

  return (
    <Typography
      sx={{
        color: '#828282',
        fontFamily: 'Inter',
        fontSize: '14px',
        lineHeight: '21px',
        margin: 0
      }}
    >
      <span
        style={{
          fontWeight: 600,
          color: '#333333',
        }}
      >
        Rejection Reason:{' '}
      </span>
      {displayText}
      {shouldTruncate && (
        <span
          style={{ fontWeight: 600, color: '#E20B18', cursor: 'pointer' }}
          onClick={toggleExpansion}
        >
          {isExpanded ? ' See Less' : ' See More'}
        </span>
      )}
    </Typography>
  );
};
