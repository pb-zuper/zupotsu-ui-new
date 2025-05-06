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
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { UP, YellowTouch, arrowTopRight, editAsset, editAssetRed, Mirroring, people, User, Dotsgroup, Exclusivity, CricketBackgroundBall, fb1, instagramI, FootballBackground, basketBallBackground, BackgroundTennis, ln, globalEarth, greenEdit, TickCircleGreen, CloseCircle, DocumentIcon, editIcon, Closed, HistoryIcon, Eyeslash, FlipView, TeamImage, facebookIcon, LinkedIn, GlobalB, NewInstagram, twitterx, YoutubeIcon, placeholder } from '../../assets';
import ShareIcon from '@mui/icons-material/Share';
import useDeviceType from '../../utils/DeviceType';
import './card.css';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tiktok from '../../assets/tiktok.svg'
import { GlouseGames } from '../../assets';
import NoImage from '../../assets/NoImage.png'
import styled from '@emotion/styled';
import Apis from '../../services/apis';
import ReactCardFlip from 'react-card-flip';

export interface ChooseCardProps {
  flipable?: boolean;
  index?: Number;
  selected?: String;
  sportType?: String;
  filteredSports: any;
}

export function ChooseCard({
  flipable,
  index,
  selected,
  sportType,
  filteredSports
}: ChooseCardProps,
) {


  const deviceType = useDeviceType();

  const [menuanchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);



  const getBackgroundColor = () => {
    switch (selected?.toLowerCase()) {

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
    switch (selected?.toLowerCase()) {
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
      // case "linkedin":
      //   return LinkedIn;
      case "website":
        return GlobalB;
      case "blog":
        return GlobalB;
      case "x":
        return twitterx;
      case "website":
        return GlobalB;
      case "youtube":
        return YoutubeIcon;
      case "tiktok":
        return Tiktok;
      default:
        return "";
    }
  };

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
  }
  const openMenu = Boolean(menuanchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };


  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);



  const StyledButton = styled('div')(({ }) => {
    return {
      '& .MuiButton-root': {
        'box-shadow': 'none',
        // width: '220px',
      },
    };
  });


  const [isFlipped, setIsFlipped] = useState<any>(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };




  return (
    <div
      onMouseEnter={() => {
        if (flipable) {
          setIsFlipped(true);
        }
      }}
      onMouseLeave={() => {
        if (flipable) {
          setIsFlipped(false);
        }
      }}
      className='asset-card'
      style={{
        width: "305px",
        height: deviceType === 'mobile' ? '340px' : '340px',
        paddingLeft: deviceType === 'mobile' ? '0 !important' : '20px !important',
        borderRadius: "20px",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
        backgroundColor: '#FFF',
        boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.001)",
      }}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          className="flip-box-front"

          style={{
            width: "100%",
            height: deviceType === 'mobile' ? '340px' : '340px',
            borderRadius: "20px",
            boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(224, 224, 224, 1)",
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}
        >
          <div style={{ zIndex: 2, top: 0, left: 0, position: 'absolute' }}>
            <img src={Exclusivity} style={{ zIndex: 1, top: 0, left: 0, }} />
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
                  marginRight: "35px",
                  cursor: 'default',
                  textAlign: 'center',
                  zIndex: 1,
                  backgroundColor: '#FFF',
                  marginLeft: '35px'
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
                    marginLeft:'10px'
                  }}
                >
                  {sportType}
                </Typography>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: 'flex-end', justifyContent: 'flex-end', gap: '5px', height: '40px', }}>
              {(selected) && (<div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '100px',
                  height: '24px',
                  marginRight: flipable == false ? "10px" : "0px",
                  cursor: 'default',
                  textAlign: 'center',
                  zIndex: 1,
                  backgroundColor: '#FFF'
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

                  {selected || ""}
                </Typography>
              </div>)}



              {
                flipable
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
                        marginRight: '2px'
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
                            icon: editIcon
                          }, {
                            key: 2,
                            name: "Close",
                            icon: Closed
                          },
                          {
                            key: 3,
                            name: "Disable Flip View",
                            icon: FlipView
                          },
                          {
                            key: 4,
                            name: "Disable “Listed By",
                            icon: Eyeslash
                          },
                          {
                            key: 4,
                            name: "History",
                            icon: HistoryIcon
                          }
                          ]
                            ?.map((menudata) => (
                              <MenuItem
                                key={menudata.key}
                                onClick={() => {

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

          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '-16px' }}>
            <div style={{
              width: "255px",
              height: "140px",
              gap: "0px",
              borderRadius: "8px",
              border:"0.5px solid #DDDDDD",
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center"
            }}>
              <img src={placeholder} style={{
                width: "255px",
                height: "135px",
                objectFit: 'contain'
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
              marginTop: '10px'
            }}

          >
            Name
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

          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Mi litora auctor nec proin varius habitasse lacinia montes.
          </Typography>


          {(selected?.toLowerCase() == "team") && (

            <div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", }}>

              <div style={{
                width: "100%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-evenly",

              }}>

                {index!=2&&([
                  {
                    name: "Country",
                    value: 'India'
                  },
                  {
                    name: "State",
                    value: 'Karnataka',
                  },
                  {
                    name: 'City',
                    value: "Bangalore"
                  }
                ].map((item, index, array) => (
                  <>
                    <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "16.8px",
                            textAlign: "center",
                            color: 'rgba(226, 11, 24, 1)',
                            margin: 0
                          }}
                        >
                          {item.value}
                        </p>
                      </div>

                    </div>
                    {
                      index < array.length - 1 && (
                        <><span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span></>
                      )
                    }
                  </>
                )))}

                {index==2&&(
                  <div style={{minHeight: '100px',display:'flex',justifyContent:'space-evenly',alignItems:'center',width:'100%'}}>
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
                      >{"3.5M"}</p>

                  </div>


                  <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
                  <div
                    // key={index}
                    style={{
                      width: "50%",
                      gap: "2px",
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',

                    }}>
                    <img src={getIcon("x"
                    )}
                      // onClick={() => {
                      //   if (window.location.href == item?.url) {
                      //     window.location.href = item?.url
                      //   }

                      // }}
                      style={{
                        width: "18px",
                        height: "18px",
                        top: "18px",
                        left: "18px",
                        cursor: 'pointer'
                      }} />
                    <p

                      style={valuestyle}
                    >{"3.5M"}</p>

                  </div>
                  </div>
                )}

              </div>
            </div>

          )}

          {(selected?.toLowerCase() == "tournament") && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", }}>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: (selected?.toLowerCase() == "tournament" && index == 1) ? 'space-evenly' : "center", alignItems: 'center', width: '100%', marginTop: '10px' }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center", }}>
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
                  Date From 
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  July 23, 2024
                </p>
              </div>
              {/* {(selected?.toLowerCase() == "tournament" && index == 1) && ( */}
                <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
                {/* )} */}
              {/* {(selected?.toLowerCase() == "tournament" && index == 1) && ( */}
                <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center", marginTop: '10px' }}>
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
                  {/* Edition */}
                  Date To
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}

                >
                  July 30, 2024
                </p>
              </div>
              {/* )} */}
            </div>

          </div>)}

          {(selected?.toLowerCase() == "tournament") && (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: (selected?.toLowerCase() == "tournament" && index == 1) ? 'space-evenly' : "center", alignItems: 'center', width: '100%', marginTop: '10px' }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center", }}>
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
                  Host Countries
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  India, Australia
                </p>
              </div>
              <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
              <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center", }}>
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
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "14.8px",
                    textAlign: "center",
                    color: 'rgba(226, 11, 24, 1)',
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}

                >
                  Bangalore, Sydney
                </p>
              </div>
            </div>
          )}

          {((selected?.toLowerCase() == "athlete" && (index == 3))) && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '15px' }}>

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
              >{"3.5M"}</p>

            </div>

          </div>)}

          {((selected?.toLowerCase() == "athlete" && (index == 1 ||index == 0 || index == 2)) || selected?.toLowerCase() == "content" && (index == 2||index == 3)) && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '15px' }}>
           
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
              >{"3.5M"}</p>

            </div>
            <span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>
            
            <div
              // key={index}
              style={{
                width: "50%",
                gap: "2px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

              }}>
              <img src={getIcon("x"
              )}
                // onClick={() => {
                //   if (window.location.href == item?.url) {
                //     window.location.href = item?.url
                //   }

                // }}
                style={{
                  width: "18px",
                  height: "18px",
                  top: "18px",
                  left: "18px",
                  cursor: 'pointer'
                }} />
              <p

                style={valuestyle}
              >{"3.5M"}</p>

            </div>
            {(index == 2)&&(<span style={{ color: "rgba(224, 224, 224, 1)" }}>|</span>)}

            {(index == 2 && selected?.toLowerCase() != "content")&&(<div
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

                style={valuestyle}
              >{"3.5M"}</p>

            </div>)}
            {((index == 2||index == 3)&& selected?.toLowerCase() == "content" )&&(<div
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
              >{"3.5M"}</p>

            </div>)}

          </div>)}
          {(selected?.toLowerCase() == "content") && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '10px' }}>

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
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "14.8px",
                  textAlign: "center",
                  color: 'rgba(226, 11, 24, 1)',
                  margin: 0,
                  letterSpacing: "0.02em",
                }}
              >
                July 23, 2024
              </p>

            </div>

          </div>)}
          {(selected?.toLowerCase() == "content" && index == 0) && (<div style={{ width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: '10px' }}>

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
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "14.8px",
                  textAlign: "center",
                  // color: 'rgba(51, 51, 51, 1)',
                  color: 'rgba(226, 11, 24, 1)',
                  margin: 0,
                  letterSpacing: "0.02em",
                }}
              >
                Indian Publishers
              </p>

            </div>

          </div>)}

          <div style={{ width: "100%", zIndex: 1, display: 'flex', flexDirection: 'row', height: '110px', justifyContent: 'space-between', bottom: 0, marginTop: '-90px', position: 'absolute' }}>
            {(filteredSports[0]?.front_media) && (<img src={
              filteredSports[0]?.front_media
            } style={{ zIndex: 1, top: 0, left: 0, height: '100px', width: '100px', opacity: 0.5 }} />)}
          </div>

        </div>
        <div
          className="flip-box-back"
          style={{
            width: "100%",
            height: deviceType === 'mobile' ? '350px' : '350px',
            padding: '10px',
            backgroundColor: getBackgroundColor(),
            borderRadius: "20px",
            boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(224, 224, 224, 1)",
            display: "flex",
            flexDirection: 'column',
            overflow: 'hidden',
            justifyContent: "flex-start"
          }}
        >
          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "19.6px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0
            }}

          >
            {(((selected?.toLowerCase() == "athlete") && index == 3) || (selected?.toLowerCase() == "athlete" && index == 0) || (selected?.toLowerCase() == "content" && index == 0) || (selected?.toLowerCase() == "team" && index == 0) || (selected?.toLowerCase() == "tournament" && index == 0)) ? "About" : (selected?.toLowerCase() == "team" && index == 1) ? "Highlights" : ""}
          </p>
          {(((selected?.toLowerCase() == "athlete") && index == 3) || (selected?.toLowerCase() == "athlete" && index == 0) || (selected?.toLowerCase() == "content" && index == 0) || (selected?.toLowerCase() == "team" && index == 0) || (selected?.toLowerCase() == "team" && index == 1) || (selected?.toLowerCase() == "tournament" && index == 0)) && (<p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22.4px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: '5px'
            }}

          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Mi litora auctor nec proin varius habitasse lacinia montes. Maximus aliquet velit conubia luctus mauris sed sollicitudin. Vitae massa ornare molestie conubia morbi ut sollicitudin facilisi. Nunc aliquam diam ipsum viverra mattis ex. Finibus lorem per efficitur, nunc hac penatibus parturient. Vehicula sit massa fusce amet sit interdum nostra ultrices. Aliquet aliquet molestie ullamcorper vel placerat nunc laoreet primis tincidunt. Vivamus laoreet quam imperdiet orci sit.
          </p>)}

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "19.6px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0
            }}

          >
            {((selected?.toLowerCase() == "athlete" && (index == 1 )) && "Highlights")}
          </p>
          {((selected?.toLowerCase() == "athlete" && (index == 1))) && (<p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22.4px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: '5px'
            }}

          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Mi litora auctor nec proin varius habitasse lacinia montes. Maximus aliquet velit conubia luctus mauris sed sollicitudin. Vitae massa ornare molestie conubia morbi ut sollicitudin facilisi. Nunc aliquam diam ipsum viverra mattis ex. Finibus lorem per efficitur, nunc hac penatibus parturient. Vehicula sit massa fusce amet sit interdum nostra ultrices. Aliquet aliquet molestie ullamcorper vel placerat nunc laoreet primis tincidunt. Vivamus laoreet quam imperdiet orci sit.
          </p>)}

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "19.6px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0
            }}

          >
            {((selected?.toLowerCase() == "tournament" && index == 1) && "Organised By")}
          </p>
          {((selected?.toLowerCase() == "tournament" && index == 1)) && (<p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22.4px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: '5px'
            }}

          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Mi litora auctor nec proin varius habitasse lacinia montes. Maximus aliquet velit conubia luctus mauris sed sollicitudin. Vitae massa ornare molestie conubia morbi ut sollicitudin facilisi. Nunc aliquam diam ipsum viverra mattis ex. Finibus lorem per efficitur, nunc hac penatibus parturient. Vehicula sit massa fusce amet sit interdum nostra ultrices. Aliquet aliquet molestie ullamcorper vel placerat nunc laoreet primis tincidunt. Vivamus laoreet quam imperdiet orci sit.
          </p>)}

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "19.6px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0
            }}

          >
            {((selected?.toLowerCase() == "content" && index == 0) && "Primary Languages")}
          </p>
          {((selected?.toLowerCase() == "content" && index == 0)) && (<p
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
            Kannada , Telugu
          </p>)}

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "19.6px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
              marginTop: '5px'
            }}

          >
            {(selected?.toLowerCase() == "tournament" && index == 1) ? "Affiliation" : ((selected?.toLowerCase() == "tournament" && index == 0) || (selected?.toLowerCase() == "content" && (index == 0 || index == 1 || index == 3))) ? "Platform(s)" : (selected?.toLowerCase() == "team" && index == 0) ? "Participation In"  : ""}
          </p>
          {((selected?.toLowerCase() == "tournament" && (index == 0 || index == 1)) || ((selected?.toLowerCase() == "team" && index == 0) || (selected?.toLowerCase() == "content" && (index == 0 || index == 1 || index == 3)))) && (<p
            style={{

              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22.4px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: '5px'
            }}

          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Mi litora auctor nec proin varius habitasse lacinia montes. Maximus aliquet velit conubia luctus mauris sed sollicitudin. Vitae massa ornare molestie conubia morbi ut sollicitudin facilisi. Nunc aliquam diam ipsum viverra mattis ex. Finibus lorem per efficitur, nunc hac penatibus parturient. Vehicula sit massa fusce amet sit interdum nostra ultrices. Aliquet aliquet molestie ullamcorper vel placerat nunc laoreet primis tincidunt. Vivamus laoreet quam imperdiet orci sit.
          </p>)}


          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "19.6px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
              marginTop: '5px'
            }}

          >
            {(selected?.toLowerCase() == "content" && index == 1) && "Highlights"}
          </p>
          {((selected?.toLowerCase() == "content" && index == 1)) && (<p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22.4px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: '5px'
            }}

          >
            Lorem ipsum odor amet, consectetuer adipiscing elit. Mi litora auctor nec proin varius habitasse lacinia montes. Maximus aliquet velit conubia luctus mauris sed sollicitudin. Vitae massa ornare molestie conubia morbi ut sollicitudin facilisi. Nunc aliquam diam ipsum viverra mattis ex. Finibus lorem per efficitur, nunc hac penatibus parturient. Vehicula sit massa fusce amet sit interdum nostra ultrices. Aliquet aliquet molestie ullamcorper vel placerat nunc laoreet primis tincidunt. Vivamus laoreet quam imperdiet orci sit.
          </p>)}

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "19.6px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
              marginTop: '5px'
            }}

          >
            {(selected?.toLowerCase() == "content" && (index == 3)) && "Live Content Plan"}
          </p>
          {((selected?.toLowerCase() == "content" && (index == 3))) && (<p
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
            content plan
          </p>)}





          {((selected?.toLowerCase() == "team" || selected?.toLowerCase() == "athlete" || selected?.toLowerCase() == "tournament" || selected?.toLowerCase() == "content" )&& index == 2) && (
          <>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "19.6px",
              textAlign: "left",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
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
            13-17, 18-24, 25-34 
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
              marginTop: '5px'
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
            Male, Female
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
              marginTop: '5px'
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
            High-A, Upper Middle-B
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
              marginTop: '5px'
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
            Maharashtra, UP, Delhi & Gujarat
          </p>
          </>         
          
          )}


          <Button

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
              width: '100%',
              bottom: 10,
              zIndex: 1,
            }}
          >
            View More Details
            <span style={{
              fontSize: "12px",
              marginLeft: '2px'
            }}>&gt;</span>
          </Button>

          <div style={{ width: "100%", zIndex: 1, display: 'flex', flexDirection: 'row', height: '110px', justifyContent: 'space-between', bottom: 0, marginTop: '-90px', position: 'absolute' }}>
            {(filteredSports[0]?.flip_media) && (<img src={
              // getImageSource("cricket")
              filteredSports[0]?.flip_media
            } style={{ zIndex: 1, top: 0, left: 0, height: '100px', width: '100px', opacity: 0.7, color: '#FFF' }} />)}
          </div>
        </div>
      </ReactCardFlip >

    </div >

  )
}

export default ChooseCard;


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
      }}
    >
      <span
        style={{
          fontWeight: 600,
          color: '#333333',
        }}
      >
        {/* Rejection */}
        Reason:{' '}
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
