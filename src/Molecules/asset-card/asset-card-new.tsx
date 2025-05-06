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
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { UP, YellowTouch, arrowTopRight, editAsset, editAssetRed, Mirroring, people, User, Dotsgroup } from '../../assets';
import ShareIcon from '@mui/icons-material/Share';
import useDeviceType from '../../utils/DeviceType';
import './asset-card.css';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssetCardFooter, { AssetCardFooterProps } from './asset-card-footer';
import ClearIcon from '@mui/icons-material/Clear';
export interface AssetCardProps {
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
  onEdit: (index: number, label?: string,id?:any) => void;
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
  assetCardFooterData?: AssetCardFooterProps;
  isAdmin?: boolean;
  created_by?: any;
  isFlipView?: any;
  highlights?: any;
  openAssetDetailsDialog?: (isOpen: boolean, data: any) => void;
  hideGetInTouch?: boolean;
  status: string;
  assetDetail: any;
  statusFilter: any;
  setShowRejectAssetData:any
  // selectedCategory: any;
}

export function AssetCard({
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
  assetCardFooterData,
  // openAssetDetailsDialog,
  // selectedCategory,
  setShowRejectAssetData,
  statusFilter,
  isAdmin,
  created_by,
  isFlipView = true,
  hideGetInTouch = false,
}: AssetCardProps) {
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
  // const userInfo = getLocalStorage(isAdmin ? 'userInfoAdmin':'userInfo');
  const userInfo = { email: 'nav' }
  const [menuanchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [onMouseHover, setOnMouseHover] = useState(false);
  const handleDelete = (e: any) => {
    // e.preventDefault();
    // e.preventDefault();
    onDelete(index);
    setOpen(false);
  };

  // const handleDeleteIcon = (e: any) => {
  //   // e.preventDefault();
  //   e.preventDefault();
  //   onDelete(index);
  //   setOpen(false);
  // };
  const getBackgroundColor = (label: string) => {
    switch (label?.toLowerCase()) {
      case 'esports':
        return 'var(--Blue-1, #2F80ED)';
      case 'athlete':
        return '#C93431';
      case 'team':
        return '#219653';
      case 'tournament':
        return '#AE43C3';
      default:
        return 'var(--Blue-1, #2F80ED)'; // Default to esport color
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

  const openMenu = Boolean(menuanchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const showMoreMenu = menuOptions && menuOptions?.length > 0;
  const handleMenuItemClicked = (menuKey: string, isFlipView?: boolean) => {
    handleMenuClose();
    if (menuOptionClicked) menuOptionClicked(menuKey, isFlipView);
  };

  const assetCardFooterDataFixed = {
    ...assetCardFooterData,
    showButtonView: assetCardFooterData?.showButtonView ?? false,
    statusFilter:statusFilter,
    setShowRejectAssetData:setShowRejectAssetData
  };

  return (
    <>
      <Grid
        item
        xs={32}
        sm={6}
        md={4}
        lg={4}
        xl={4}
        sx={{
          // backgroundColor: 'red',
          display: 'flex',
          flexDirection: 'column',
          // maxWidth:'100px',
          // maxHeight:'100px',
          paddingLeft:
            deviceType === 'mobile' ? '0 !important' : '20px !important',
          marginBottom: '20px'
        }}
      >
        <div
          className="asset-card"
          id="navigationButton"
          onClick={(e: any) => userInfo?.email != undefined && handleClick(e)}
          style={{
            // width: '22vw',
            cursor: 'pointer',
            height: deviceType === 'mobile' ? '263px' : '304px',
            borderRadius: '10px',
            position: 'relative',
            background:
              image === '' || image === 'string'
                ? '#225A93'
                :
                `url(${image}) no-repeat center/cover`,
            // background: `url(${image}) no-repeat center/cover`,
            // background: '#225A93',
            padding: deviceType === 'mobile' ? '12px 20px 0px 20px' : '10px',
            // background:
            //   'linear-gradient(0deg, rgba(16, 98, 167, 0.70) 0%, rgba(16, 98, 167, 0.70) 100%), url(<path-to-image>) lightgray 50% / cover no-repeat',
          }}
       
        >
         

          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'start',
                marginBottom: '12px',
                width: '100%',
              }}
            >
              {/* <Tooltip
                title={title}
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'white',
                      color: 'black',
                      fontSize: '15px',
                      '& .MuiTooltip-arrow': {
                        color: 'common.black',
                      },
                    },
                  },
                }}
              > */}
              <Typography
                sx={{
                  color: '#FDC101',
                  fontFamily: 'Inter',
                  fontSize: deviceType === 'mobile' ? '20px' : '23px',
                  fontStyle: 'italic',
                  fontWeight: 800,
                  lineHeight: 'normal',
                  letterSpacing: '0.56px',
                  textTransform: 'uppercase',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2, // Limit to two lines
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal', // Allow wrapping within the specified number of lines
                  width: '100%', // Adjust this value based on your layout
                  textAlign: 'start'
                }}
              >
                {assetDetail.asset_detail[0].headline}
              </Typography>
              {/* </Tooltip> */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  justifyContent: 'start',
                  alignItems: 'self-start',
                  // justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    // display: 'inline-flex',
                    padding: deviceType === 'mobile' ? '4px 8px' : '6px 8px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '100px',
                    minHeight: '20px',
                    background: getBackgroundColor(label),
                    cursor: 'default',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#FFF',
                      fontFamily: 'Inter',
                      fontSize: deviceType === 'mobile' ? '14px' : '16px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: 'normal',
                      letterSpacing: '0.32px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {/* {label} */}
                    {assetDetail.asset_type.name}
                  </Typography>
                </div>
                {
                  !showMoreMenu && isEdit
                  // false
                  && (
                    <>
                      {/* REPLACE this code with image icon */}
                      <div
                        style={{
                          display: 'flex',
                          height: '28px',
                          width: '28px',
                          // height: '28px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '10px',
                          border: '1px solid var(--Gray-5, #E0E0E0)',
                          background: '#FFF',
                          padding: '5px'


                        }}
                      >
                        {/* <ModeEditOutlinedIcon
                        onClick={() => onEdit(index)}
                        sx={{
                          color: '#292D32',
                          margin: '0',
                          width: '20px',
                          height: '20px',
                          ':hover': {
                            color: '#AF020C',
                          },
                          // border: '1px solid green  ',
                        }}
                      /> */}
                        <img
                          src={Dotsgroup}
                          style={{
                            width: deviceType === 'mobile' ? '26px' : '30px',
                            cursor: 'pointer',
                            marginTop: deviceType === 'mobile' ? '1.2px' : '2px',
                          }}
                          alt="edit"
                          // onClick={() => onEdit(index, label)}
                          onMouseEnter={() => {
                            setOnMouseHover(true);
                          }}
                          onMouseLeave={() => {
                            setOnMouseHover(false);
                          }}
                        />
                      </div>
                      {/* <img
                      // src={onMouseHover ? editAssetRed : editAsset}
                      src={Dotsgroup}
                      style={{
                        width: deviceType === 'mobile' ? '26px' : '30px',
                        cursor: 'pointer',
                        marginTop: deviceType === 'mobile' ? '1.2px' : '2px',
                      }}
                      alt="edit"
                      onClick={() => onEdit(index, label,assetDetail.id)}
                      onMouseEnter={() => {
                        setOnMouseHover(true);
                      }}
                      onMouseLeave={() => {
                        setOnMouseHover(false);
                      }}
                    /> */}
                    </>
                  )}
                {showMoreMenu && (
                  <>
                    <div
                      style={{
                        background: '#FFF',
                        borderRadius: '10px',
                        border: '1px solid #BDBDBD',
                        width: '30px',
                        height: '30px',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                    >
                      <MenuList
                        sx={{
                          outline: 'none',
                        }}
                      >
                        {menuOptions?.map((menudata) => (
                          <MenuItem
                            key={menudata.key}
                            onClick={() => {
                              handleMenuItemClicked(menudata.key, isFlipView);
                              // line n0 450
                              menudata &&
                                menudata.name === 'Edit' &&
                                onEdit(index, label,assetDetail.id);
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
                                // 'hover': {
                                //   background: 'rgba(226, 11, 24, 0.2)',
                                // },
                              }}
                            // line n0 427 updated there
                            // onClick={() => {
                            //   menudata &&
                            //     menudata.name === 'Edit' &&
                            //     onEdit(index, label);
                            // }}
                            >
                              {menudata && menudata.icon && (
                                <ListItemIcon
                                  sx={{
                                    width: '16px',
                                    height: '16px',
                                    minHeight: '16px',
                                    minWidth: '16px !important',
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
            <Tooltip
              title={subTitle}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'white',
                    color: 'black',
                    fontSize: '15px',
                    '& .MuiTooltip-arrow': {
                      color: 'common.black',
                    },
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: deviceType === 'mobile' ? '16px' : '18px',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  lineHeight: '26px', // 130%
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  width: '80%',
                  marginBottom: '12px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2, // Limit to two lines
                  textAlign: 'start'
                }}
              >
                {assetDetail.asset_detail[0].about}
              </Typography>
            </Tooltip>
            {/* {content?.map((item: any, index: number) => {
              return ( */}
            <div
              key={index}
              style={{
                flexDirection: 'row',
                display: 'flex',
                marginBottom: deviceType === 'mobile' ? '10px' : '10.5px',
              }}
            >
              {/* {item.desc !== '' ? ( */}
              <>
                <img
                  style={{
                    width: '18px',
                    height: '18px',
                  }}
                  // src={item.icon}
                  src={"data:image/jpeg;base64,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"}
                  alt=""
                />
                <Typography
                  sx={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: deviceType === 'mobile' ? '14px' : '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '0.32px',
                    marginLeft: '8px',
                  }}
                >
                  {/* {item.desc} */}
                  hello
                </Typography>
              </>
              {/* ) : (
                    ''
                  )} */}
            </div>
            {/* );
            })} */}
            {/* </div> */}

            {userInfo.email && (
              <div
                style={{
                  width: deviceType === 'mobile' ? '96%' : '100%',
                  display: 'flex',
                  gap: '4px',
                  alignItems: deviceType === 'mobile' ? 'center' : 'flex-end',
                  justifyContent: 'center',
                  bottom: 10,
                  position: 'absolute',
                  marginLeft: '-17px'
                }}
              >

                <>
                  <img
                    style={{ cursor: 'pointer' }}
                    src={YellowTouch}
                    alt=""
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      getInTouchButtonClicked && getInTouchButtonClicked();
                    }}
                  />
                  <Typography
                    // sx={{ fontSize: linkStyle }}
                    sx={{
                      color: '#FDC101',
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      lineHeight: '140%',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      getInTouchButtonClicked && getInTouchButtonClicked();
                    }}
                  >
                    Get in Touch
                  </Typography>
                  <div
                    style={{
                      color: '#FFF',
                      cursor: 'pointer', // Set the color to white
                    }}
                  >
                    &nbsp; | &nbsp;
                  </div>
                </>

                <Typography
                  sx={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '140%',
                    cursor: 'pointer',
                  }}
                  onClick={(e: any) =>
                    userInfo?.email != undefined && handleNavigation(e, label)
                  }
                // onClick={() => {
                //   navigate(`./${data?.athleteData?.category}`);
                // }}
                // sx={{ fontSize: linkStyle }}
                >
                  View Details
                </Typography>
                <KeyboardArrowRightIcon
                  style={{
                    color: 'white',
                    cursor: 'pointer',
                  }}
                // onClick={() => {
                //   navigate(`./${props.athleteData.category}`);
                // }}
                />
              </div>
            )}
          </div>

          <div>
            {!userInfo.email && (
              <div
                style={{
                  width: deviceType === 'mobile' ? '96%' : '100%',
                  display: 'flex',
                  gap: '4px',
                  alignItems: deviceType === 'mobile' ? 'center' : 'flex-end',
                  justifyContent: 'center',
                  bottom: 10,
                  position: 'absolute',
                }}
                onClick={() => {
                  // handleLoginDialog;
                  // setSignUpLoginMenuOpen(true);
                }}
              >
                <Typography
                  // sx={{ fontSize: linkStyle }}
                  style={{
                    color: '#FDC101',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '140%',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  Register
                </Typography>

                <Typography
                  sx={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '140%',
                    cursor: 'pointer',
                  }}
                // onClick={() => {
                //   navigate(`./${data?.athleteData?.category}`);
                // }}
                // sx={{ fontSize: linkStyle }}
                >
                  to know more
                </Typography>
                <KeyboardArrowRightIcon
                  style={{
                    color: 'white',
                    cursor: 'pointer',
                  }}
                // onClick={() => {
                //   navigate(`./${props.athleteData.category}`);
                // }}
                />
              </div>
            )}

            {userInfo.email && (
              <>
                {/* {eventProps?.flipThumbnail && comesFrom !== 'myAssets' && ( */}
                {eventProps?.flipThumbnail && comesFrom === 'home' && (
                  <div
                    className="asset-hover-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        padding:
                          deviceType === 'mobile'
                            ? '20px 20px 14px 20px'
                            : '20px',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          padding: '6px 8px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '10px',

                          borderRadius: '100px',
                          background: getBackgroundColor(label),
                        }}
                      >
                        <Typography
                          sx={{
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: deviceType === 'mobile' ? '14px' : '16px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                            letterSpacing: '0.32px',
                            textTransform: 'capitalize',
                          }}
                        >
                          {label}
                        </Typography>
                      </div>
                      <ShareIcon
                        sx={{
                          color: 'white',
                          width: deviceType === 'mobile' ? '24px' : '28px',
                          height: deviceType === 'mobile' ? '24px' : '28px',
                          cursor: 'pointer',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        padding: '0px 20px',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#FDC101',
                          fontFamily: 'Inter',
                          fontSize: deviceType === 'mobile' ? '24px' : '28px',
                          fontStyle: 'italic',
                          fontWeight: 800,
                          lineHeight: 'normal',
                          letterSpacing: '0.56px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {deviceType === 'mobile'
                          ? `${subContent?.title?.substring(0, 30)}...`
                          : subContent?.title}
                      </Typography>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginTop: '16px',
                        }}
                      >
                        {!isNewlinePresent ? (
                          <Typography
                            sx={{
                              color: 'rgba(255, 255, 255, 0.70)',
                              fontFamily: 'Inter',
                              fontSize:
                                deviceType === 'mobile' ? '10px' : '16px',
                              fontStyle: 'normal',
                              fontWeight: 600,
                              lineHeight: 'normal',
                              letterSpacing: '0.32px',
                            }}
                          >
                            {highlights}
                          </Typography>
                        ) : (
                          <ul style={{ paddingLeft: '20px', marginTop: '0' }}>
                            {lines.map((line: any, index: any) => (
                              <li>
                                <Typography
                                  sx={{
                                    color: 'rgba(255, 255, 255, 0.70)',
                                    fontFamily: 'Inter',
                                    fontSize:
                                      deviceType === 'mobile' ? '10px' : '16px',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    letterSpacing: '0.32px',
                                  }}
                                  key={index}
                                >
                                  {line}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                        )}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '16px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <img
                              style={{
                                width:
                                  deviceType === 'mobile' ? '16px' : '19px',
                                height:
                                  deviceType === 'mobile' ? '16px' : '19px',
                              }}
                              src={UP}
                              alt=""
                            />
                            <Typography
                              sx={{
                                color: 'rgba(255, 255, 255, 0.70)',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '10px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                letterSpacing: '0.32px',
                              }}
                            >
                              Reach
                            </Typography>
                            <Typography
                              sx={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '12px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                              }}
                            >
                              {subContent?.reach}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <img
                              style={{
                                width:
                                  deviceType === 'mobile' ? '16px' : '19px',
                                height:
                                  deviceType === 'mobile' ? '16px' : '19px',
                              }}
                              src={Mirroring}
                              alt=""
                            />
                            <Typography
                              sx={{
                                color: 'rgba(255, 255, 255, 0.70)',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '10px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                letterSpacing: '0.32px',
                              }}
                            >
                              Platform
                            </Typography>
                            <Typography
                              sx={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '12px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                              }}
                            >
                              {subContent?.platform}
                            </Typography>
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '16px',
                            marginTop: '12px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: '6px',
                              width: '31.5%',
                            }}
                          >
                            <img
                              style={{
                                width:
                                  deviceType === 'mobile' ? '16px' : '19px',
                                height:
                                  deviceType === 'mobile' ? '16px' : '19px',
                              }}
                              src={User}
                              alt=""
                            />
                            <Typography
                              sx={{
                                color: 'rgba(255, 255, 255, 0.70)',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '10px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                letterSpacing: '0.32px',
                              }}
                            >
                              MAU
                            </Typography>
                            <Typography
                              sx={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '12px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                              }}
                            >
                              {subContent?.mau}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <img
                              style={{
                                width:
                                  deviceType === 'mobile' ? '16px' : '19px',
                                height:
                                  deviceType === 'mobile' ? '16px' : '19px',
                              }}
                              src={people}
                              alt=""
                            />
                            <Typography
                              sx={{
                                color: 'rgba(255, 255, 255, 0.70)',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '10px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                letterSpacing: '0.32px',
                              }}
                            >
                              Influencer Interaction
                            </Typography>
                            <Typography
                              sx={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '12px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                              }}
                            >
                              {subContent?.influencer}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          gap: '4px',
                          alignItems: 'flex-end',
                          // justifyContent: 'center',
                          bottom: 0,
                          position: 'absolute',
                          //  left: 50%;
                          transform: !isAdmin
                            ? deviceType === 'tablet'
                              ? 'translate(16%, -10px)'
                              : deviceType === 'desktop'
                                ? 'translate(18%, -10px)'
                                : deviceType === 'small-tablet'
                                  ? 'translate(10%, -10px)'
                                  : deviceType === 'mobile'
                                    ? 'translate(8%, -10px)'
                                    : 'translate(19%, -10px)'
                            : 'translate(35%, -10px)',
                        }}
                      >
                        {(!isAdmin && !hideGetInTouch) && (
                          <>
                            <img
                              style={{ cursor: 'pointer' }}
                              src={YellowTouch}
                              alt=""
                              onClick={getInTouchButtonClicked}
                            />
                            <Typography
                              // sx={{ fontSize: linkStyle }}
                              style={{
                                color: '#FDC101',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '600',
                                lineHeight: '140%',
                                cursor: 'pointer',
                              }}
                              onClick={getInTouchButtonClicked}
                            >
                              Get in Touch
                            </Typography>
                            <div
                              style={{
                                color: '#FFF', // Set the color to white
                              }}
                            >
                              &nbsp; | &nbsp;
                            </div>
                          </>
                        )}
                        <Typography
                          sx={{
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: '140%',
                            cursor: 'pointer',
                          }}
                          // onClick={() => {
                          //   navigate(`/${label}`);
                          // }}

                          onClick={(e: any) =>
                            userInfo?.email != undefined &&
                            handleNavigation(e, label)
                          }
                        // sx={{ fontSize: linkStyle }}
                        >
                          View Details
                        </Typography>
                        <KeyboardArrowRightIcon
                          style={{
                            color: 'white',
                            cursor: 'pointer',
                          }}
                        // onClick={() => {
                        //   navigate(`./${props.athleteData.category}`);
                        // }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {!userInfo.email && (
              <div className="asset-hover-card">
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
                      color: '#FFF',
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
                    handleClick={handleLoginDialog}
                    imageHeight="24px"
                    imageWidth="24px"
                    trailingIcon={arrowTopRight}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {

          true && <AssetCardFooter {...assetCardFooterDataFixed} />
        }
        {/* {
          true

          && <AssetCardFooter selectedCategory={selectedCategory} />} */}
        {/* <ZupotsuSignUpLogIn
          open={signUpLoginMenuOpen}
          handleClick={() => {
            setSignUpLoginMenuOpen(false);
          }}
        />

        <ZupotsuSignUpLogIn
          open={signUpLoginMenuOpen}
          handleClick={() => {
            setSignUpLoginMenuOpen(false);
          }}
        /> */}
      </Grid>
    </>
  );
}

export default AssetCard;
