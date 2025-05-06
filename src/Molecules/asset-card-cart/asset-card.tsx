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
// import {
//   YellowTouch,
//   Mirroring,
//   UP,
//   people,
//   User,
//   arrowTopRight,
//   editAsset,
//   editAssetRed,
// } from '../../../Assets/index';
import { YellowTouch, arrowTopRight, editAsset, editAssetRed } from '../../assets';
import ShareIcon from '@mui/icons-material/Share';
import useDeviceType from '../../utils/DeviceType';
// import ZupotsuSignUpLogIn from '../../Organisms/zupotsu-signup-login-screen/zupotsu-signup-login';
import { Global, Calendar, Dollar } from '../../assets';
import './asset-card.css';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
// import { getLocalStorage } from '../../../utils/LocalStorageService';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssetCardFooter, { AssetCardFooterProps } from './asset-card-footer';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
export interface AssetCardProps {
  label: string;
  index: number;
  onEdit: (index: number, label: string) => Promise<void>;
  isEdit: boolean;
  menuOptionClicked?: (key: string, isFlipView?: boolean) => void;
  assetCardFooterData?: AssetCardFooterProps;
  isAdmin?: boolean;
  isFlipView?: any;
}
interface SubContent {
  influencer: string;
  title: string;
}

export function AssetCardCart({
  label,
  index,
  onEdit,
  isEdit,
  menuOptionClicked,
  isFlipView = true,
}: AssetCardProps) {
  const title: any = "Cricket Stars"
  const subTitle: any = "India’s defining cricket Web3 gaming event"
  const sport: any = "Cricket"
  const menuOptions: Array<{ name: string; icon?: any; key: string }> = [
    { name: 'Edit', icon: editAssetRed, key: 'Edit' },
    { name: 'Close', icon: YellowTouch, key: 'Close' },
    { name: 'Disable Flip View', icon: arrowTopRight, key: 'Disable Flip View' },
    { name: 'Disable "Listed By"', icon: editAsset, key: 'Disable "Listed By"' }
  ];


  const [isAuthenticated, setAuthenticated] = useState(true);
  const [open, setOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const isAdmin: boolean = true
  const content: any = [{
    icon: Global,
    desc: "India (Nationality)"

  }, {
    icon: Calendar,
    desc: "May-June 2024"

  }, {
    icon: Dollar,
    desc: "Title Sponsorship & Lots More"

  }]
  const subContent: SubContent = {
    influencer: "",
    title: ""
  };
  const hideGetInTouch: any = true
  // const userInfo = getLocalStorage(isAdmin ? 'userInfoAdmin':'userInfo');
  const userInfo = { email: 'pvnkumarps@gmail.com' }
  const [menuanchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [onMouseHover, setOnMouseHover] = useState(false);

  const getBackgroundColor = (
    label: string
  ) => {
    switch (
    // 'athlete'
    label?.toLowerCase()
    ) {
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
  return (
    <>
      <Grid
        item
        xs={32}
        sm={6}
        md={4}
        lg={5}
        xl={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '5px',

        }}
      >
        <div
          className="asset-card"
          id="navigationButton"
          style={{
            cursor: 'pointer',
            width: deviceType === 'mobile' ? "263px" : '364px',
            height: deviceType === 'mobile' ? '263px' : '304px',
            borderRadius: '20px',
            position: 'relative',
            padding: deviceType === 'mobile' ? '12px 20px 0px 20px' : '10px',
            background:
              'linear-gradient(0deg, rgba(16, 98, 167, 0.70) 0%, rgba(16, 98, 167, 0.70) 100%), url(https://s3-alpha-sig.figma.com/img/9cca/468d/b26fc770e2b5e3ef5706889f63b9ba72?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=poBHZxtPXKntblUxfIsVRgyu6X5uPv1ebaGq00WuDsJkks63NBkH0jt9~5QWmaPP~znK~TJU7WS8Z~BMMPfSElMGz~f-1szE7TBoce1dRVIUDWABitl611j~F8bnpUogadsVBQiAk2H2koTzQVAZcg-v1No7jw~lDgQJLIVNtRKw74A3hvZiIr-xSyiZ3bmWeIsGrSrE1dbsJn84uN2yaEeHTtfeevAldQpTrJBTbQtBb2XlY55JR8SdMH9QDnTO7DW2wGZWHttjxTRH3AsAi-kMUYmoTNCxi9icx3Riv9cQxyfrvrknLlGzjvc8G2eYpJGM7e8TH6z~7R6~rYnC0w__) lightgray 50% / cover no-repeat',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '12px',
                width: '100%',
              }}
            >
              <Tooltip
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
              >
                <Typography
                  sx={{
                    color: '#FDC101',
                    fontFamily: 'Inter',
                    fontSize: deviceType === 'mobile' ? '20px' : '28px',
                    fontStyle: 'italic',
                    fontWeight: 800,
                    lineHeight: 'normal',
                    letterSpacing: '0.56px',
                    textTransform: 'uppercase',
                    textAlign: 'left',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2, // Limit to two lines
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal', // Allow wrapping within the specified number of lines
                    width: '100%', // Adjust this value based on your layout
                  }}
                >
                  {title}
                  {/* {"Card"} */}
                </Typography>
              </Tooltip>
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
                    background: getBackgroundColor(
                      // label
                      'athlete'
                    ),
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
                    {sport}

                  </Typography>
                </div>
                {
                  !showMoreMenu && isEdit
                  // true
                  && (
                    <>
                      <img
                        src={onMouseHover ? editAssetRed : editAsset}
                        style={{
                          width: deviceType === 'mobile' ? '26px' : '30px',
                          cursor: 'pointer',
                          marginTop: deviceType === 'mobile' ? '1.2px' : '2px',
                        }}
                        alt="edit"
                        onClick={() =>
                        // onEdit(index, label)
                        { }
                        }
                        onMouseEnter={() => {
                          setOnMouseHover(true);
                        }}
                        onMouseLeave={() => {
                          setOnMouseHover(false);
                        }}
                      />
                    </>
                  )}
                {
                  showMoreMenu 
                  // true
                  && (
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
                                menudata &&
                                menudata.name === 'Edit' 
                                &&
                                onEdit(index, label);
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
                                  alignItems: 'center'
                                }}
                                onClick={() => {
                                  menudata 
                                  &&
                                  menudata.name === 'Edit'
                                   &&
                                  onEdit(index, label);
                                }}
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
                  fontSize: deviceType === 'mobile' ? '16px' : '20px',
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
                  textAlign: "left"
                }}
              >
                {subTitle}
              </Typography>
            </Tooltip>
            {content?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    marginBottom: deviceType === 'mobile' ? '10px' : '10.5px',
                  }}
                >
                  {item.desc !== '' ? (
                    <>
                      <img
                        style={{
                          width: '18px',
                          height: '18px',
                        }}
                        src={item.icon}
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
                        {item.desc}
                      </Typography>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
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
                }}
              >
                {(
                  // !isAdmin && !hideGetInTouch
                  true
                ) && (
                    <>
                      <img
                        style={{ cursor: 'pointer' }}
                        src={YellowTouch}
                        alt=""
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // getInTouchButtonClicked && getInTouchButtonClicked();
                        }}
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
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // getInTouchButtonClicked && getInTouchButtonClicked();
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
                  onClick={(e: any) => {
                    // userInfo?.email != undefined
                    // && handleNavigation(e, label)
                  }
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
                {
                  // eventProps?.flipThumbnail && comesFrom === 'home'
                  false
                  && (
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
                        {/* <ShareIcon
                        sx={{
                          color: 'white',
                          width: deviceType === 'mobile' ? '24px' : '28px',
                          height: deviceType === 'mobile' ? '24px' : '28px',
                          cursor: 'pointer',
                        }}
                      /> */}
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
                          {/* {!isNewlinePresent ? (
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
                          )} */}

                          {/* <div
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
                        </div> */}
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
                                alt="yellowtouch"
                              // onClick={getInTouchButtonClicked}
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
                              // onClick={getInTouchButtonClicked}
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
                              userInfo?.email != undefined
                              // &&
                              // handleNavigation(e, label)
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
        {/* {assetCardFooterData && <AssetCardFooter {...assetCardFooterData} />} */}
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

export default AssetCardCart;
