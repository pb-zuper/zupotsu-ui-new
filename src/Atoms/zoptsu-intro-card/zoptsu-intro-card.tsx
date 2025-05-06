/* eslint-disable-next-line */
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Button, Typography } from '@mui/material';
// import {
//   ZoptsuLogo,
//   getInTouch,
//   getInTouchWhite,
//   touch,
//   GoLive,
//   Cricket,
//   Facebook,
//   Instagram,
//   Linkedin,
//   facebook,
//   instagram,
//   linkedin,
//   twitter,
//   youTube,
//   global,
// } from '../../assets/index';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './zoptsu-intro-card.css';
import LanguageIcon from '@mui/icons-material/Language';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import useDeviceType from '../../utils/DeviceType';
import React from 'react';


export function ZoptsuIntro({
  carouselData,
  linkDetails,
  highlightedColor,
  hoverColor,
  shouldTitleUpperCase,
  breadCrumbFromTop = '',
  getInTouchMarginTopMobile,
  isAdmin = false,
  status,
  getInTouchButtonClicked,
}: {
  carouselData: any;
  linkDetails: any;
  highlightedColor?: any;
  hoverColor?: any;
  shouldTitleUpperCase?: boolean;
  breadCrumbFromTop?: any;
  getInTouchMarginTopMobile?: any;
  status?: any;
  isAdmin?: boolean;
  getInTouchButtonClicked?: () => void;
}) {
  const deviceType = useDeviceType();
  const [isHoveredOverButton, setIsHoveredOverButton] = useState(false);

  const useStyles = makeStyles((theme) => ({
    button: {
      background: '#fff',
      color: 'red',
      border: 'red',

      '&:hover': {
        color: '#fff',
        backgroundColor: '#E20B18', // Replace this with the hover color code

        // border: 'red',
      },
    },
  }));
  const classes = useStyles();

  // const socialMediaLinks = [
  //   {
  //     key: 'facebook',
  //     value: 'www.facebook.com',
  //     icon: Facebook,
  //   },
  //   {
  //     key: 'instagram',
  //     value: 'www.instagram.com',
  //     icon: Instagram,
  //   },
  //   {
  //     key: 'website',
  //     value: 'www.google.com',
  //     icon: global,
  //   },
  //   {
  //     key: 'blog',
  //     value: 'www.google.com',
  //     icon: global,
  //   },
  //   {
  //     key: 'linkedin',
  //     value: 'www.google.com',
  //     icon: Linkedin,
  //   },
  // ];

  const handleOpenLink = (url: any) => {
    const pathUrl = (url?.startsWith('http://') || url?.startsWith('ftp://') || url?.startsWith('https://'))? 
      url : `https://${url}`
    window.open(pathUrl, '_blank', 'noopener,noreferrer');
  };
  const dynamicImages = (key: any) => {
    // if (key === 'facebook') {
    //   return Facebook;
    // } else if (key === 'instagram') {
    //   return Instagram;
    // } else if (key === 'website') {
    //   return global;
    // } else if (key === 'blog') {
    //   return global;
    // } else if (key === 'linkedin') {
    //   return Linkedin;
    // }
    return global; // Default return if key doesn't match any condition
  };
  const getSocialMediaUrlByKey = (key: any, dynamicData: any) => {
    const match = dynamicData.find((item: any) => item.key === key);
    return match && match.value ? match.value : '';
  };

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

  return (
    <>
      {Array.isArray(carouselData) && carouselData?.length > 0 && (
        <div
          style={{
            marginTop: '0px',
            background: '#25499D',
          }}
        >
          <Carousel
            autoPlay={true}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            showIndicators={carouselData?.length > 1 ? true : false}
          >
            {carouselData?.map((data: any, index: number) => (
              <div style={{ position: 'relative' }}>
                <div
                  className="gradient-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(to right, rgba(0,0,0,1.0), rgba(0,0,0,0))',
                  }}
                ></div>
                <p
                  className="legend"
                  style={{
                    top: breadCrumbFromTop ? breadCrumbFromTop : '25px',
                    padding:
                      deviceType === 'mobile'
                        ? '1px 10px 10px 10px'
                        : '18px 10px 10px 10px',
                  }}
                >
                  <Breadcrumb
                    linkDetails={linkDetails}
                    color={highlightedColor}
                    hoverColor={hoverColor}
                    underline="always"
                    maxItems={3}
                    itemBeforeCollapse={1}
                    itemAfterCollapse={1}
                    iconName="arrow_forward_ios_black_24dp"
                    iconSize={20}
                    iconLabel="Breadcrumb-Arrow-Right"
                    iconStyle="regular"
                  />
                  <div
                    className="intro_desc"
                    style={{
                      width: '100%',
                      marginRight: data.marginRight,
                      paddingTop: '5px',
                      height: 'auto',
                      // marginTop: deviceType === 'mobile' ? '13px' : '50px',
                      marginLeft:
                        deviceType != 'mobile' ? data.marginLeft : '0px',
                    }}
                  >
                    <Typography
                      className={data.subDesc == '' ? 'first_font' : ''}
                      sx={{
                        lineHeight:
                          deviceType === 'mobile' ? 'normal' : data.lineHeight,
                        fontFamily: 'Inter',
                        fontSize: deviceType === 'mobile' ? '24px' : '44px',
                        fontStyle: 'normal',
                        fontWeight: 800,
                        letterSpacing: '0.88px',
                        textAlign: 'left',
                        width: deviceType === 'mobile' ? '100%' : '60%',
                      }}
                    >
                      {shouldTitleUpperCase
                        ? data?.firstTitle?.toUpperCase()
                        : data?.firstTitle}

                      {/* <span
                        className="second_font"
                        style={{ color: '#E20B18' }}
                      >
                        {data.secondTitle}
                      </span> */}
                    </Typography>
                    <Typography
                      className={data.subDesc == '' ? 'first_font' : ''}
                      sx={{
                        lineHeight:
                          deviceType === 'mobile' ? 'normal' : data.lineHeight,
                        fontFamily: 'Inter',
                        fontSize: deviceType === 'mobile' ? '24px' : '44px',
                        fontStyle: 'normal',
                        fontWeight: 800,
                        letterSpacing: '0.88px',
                        textAlign: 'left',
                        width: deviceType === 'mobile' ? '100%' : '50%',
                      }}
                    >
                      {data.secondTitle}
                    </Typography>
                    <Typography
                      className="first_font"
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: {
                          xs: '10px',
                          sm: '16px',
                          md: '18px',
                          lg: '20px',
                        },
                        fontWeight: 500,
                        lineHeight: '24px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                        maxWidth: '85%',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                        hyphens: 'auto',
                        color: '#F2F2F2',
                        width: deviceType === 'mobile' ? '100%' : '40%',
                        marginTop: deviceType === 'mobile' ? '0px' : '16px',
                        textTransform: 'cap',
                      }}
                    >
                      {data.subDesc}
                    </Typography>
                    <Typography
                      className="idesc"
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: {
                          xs: '10px',
                          sm: '16px',
                          md: '18px',
                          lg: '20px',
                        },
                        fontWeight: 500,
                        lineHeight: '24px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                        maxWidth: '85%',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                        hyphens: 'auto',
                        color: '#F2F2F2',
                        width: deviceType === 'mobile' ? '100%' : '50%',
                        marginTop: '8px',
                      }}
                    >
                      {data.subTitle}
                    </Typography>
                    {data.isCricket === true && (
                      <div
                        style={{
                          display: 'flex',
                          gap: deviceType === 'mobile' ? '16px' : '20px',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: deviceType === 'mobile' ? '8px' : '16px',
                            // gap: '16px',
                            // marginTop: deviceType === 'mobile' ? '8px' : '16px',
                            // marginTop: '16px',
                            alignItems: 'center',
                            // marginTop: '-50px',
                            // width: deviceType === 'mobile' ? '50%' : '12%',
                            height: '15%',
                          }}
                        >
                          {/* <img
                            style={{
                              width: deviceType === 'mobile' ? '12px' : '20px',
                              height: deviceType === 'mobile' ? '12px' : '20px',
                              // width: '20px',
                              // height: '20px',
                            }}
                            src={Cricket}
                            alt="ball"
                          /> */}
                          <Typography
                            sx={{
                              color: '#FFF',
                              fontFamily: 'Inter',
                              fontSize:
                                deviceType === 'mobile' ? '10px' : '16px',
                              // fontSize: '16px',
                              fontStyle: 'normal',
                              fontWeight: 500,
                              lineHeight: 'normal',
                              letterSpacing: '0.32px',
                            }}
                          >
                            {data.sport === 'Others'
                              ? data?.otherSport
                              : data.sport}
                          </Typography>
                        </div>
                        {data?.subSport && (
                          <div
                            style={{
                              // marginTop: deviceType === 'mobile' ? '9px' : '16px',
                              alignItems: 'center',
                              height: '15%',
                              fontSize:
                                deviceType === 'mobile' ? '10px' : '16px',
                            }}
                          >
                            |
                          </div>
                        )}
                        {data?.subSport && (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: deviceType === 'mobile' ? '8px' : '16px',
                              // gap: '16px',
                              // marginTop: deviceType === 'mobile' ? '8px' : '16px',
                              // marginTop: '16px',
                              alignItems: 'center',
                              // marginTop: '-50px',
                              // width: deviceType === 'mobile' ? '50%' : '12%',
                              height: '15%',
                            }}
                          >
                            {/* <img
                              style={{
                                width:
                                  deviceType === 'mobile' ? '12px' : '20px',
                                height:
                                  deviceType === 'mobile' ? '12px' : '20px',
                                // width: '20px',
                                // height: '20px',
                              }}
                              src={Cricket}
                              alt="ball"
                            /> */}
                            <Typography
                              sx={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '10px' : '16px',
                                // fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                                letterSpacing: '0.32px',
                              }}
                            >
                              {data?.subSport}
                            </Typography>
                          </div>
                        )}
                        {data?.label && (
                          <div
                            style={{
                              // marginTop: deviceType === 'mobile' ? '9px' : '16px',
                              alignItems: 'center',
                              height: '15%',
                              fontSize:
                                deviceType === 'mobile' ? '10px' : '16px',
                            }}
                          >
                            |
                          </div>
                        )}
                        {data?.label && (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: deviceType === 'mobile' ? '8px' : '16px',
                              // gap: '16px',
                              // marginTop: deviceType === 'mobile' ? '8px' : '16px',
                              // marginTop: '16px',
                              alignItems: 'center',
                              // marginTop: '-50px',
                              // width: deviceType === 'mobile' ? '50%' : '12%',
                              height: '15%',
                            }}
                          >
                            <div
                              style={{
                                // display: 'inline-flex',
                                padding:
                                  deviceType === 'mobile'
                                    ? '4px 8px'
                                    : '6px 8px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                                borderRadius: '100px',
                                minHeight: '20px',
                                background: getBackgroundColor(data?.label),
                                cursor: 'default',
                                textAlign: 'center',
                              }}
                            >
                              <Typography
                                sx={{
                                  color: '#FFF',
                                  fontFamily: 'Inter',
                                  fontSize:
                                    deviceType === 'mobile' ? '10px' : '16px',
                                  fontStyle: 'normal',
                                  fontWeight: 600,
                                  lineHeight: 'normal',
                                  letterSpacing: '0.32px',
                                  textTransform: 'capitalize',
                                }}
                              >
                                {data?.label}
                              </Typography>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      style={{
                        marginTop:
                          deviceType === 'mobile'
                            ? getInTouchMarginTopMobile
                              ? getInTouchMarginTopMobile
                              : '-10px'
                            : '30px',
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom:
                          deviceType === 'mobile' ? '-10px' : '30px',
                      }}
                    >
                      {data.multipleButton === false && (
                        <Button
                          style={{
                            textTransform: 'none',
                            marginTop: deviceType === 'mobile' ? '20px' : '',
                            padding:
                              deviceType === 'mobile' ? '4px 6px' : '8px 12px',
                            borderRadius:
                              deviceType === 'mobile' ? '4px' : '5px',
                          }}
                          className={classes.button}
                          onMouseEnter={() => setIsHoveredOverButton(true)}
                          onMouseLeave={() => setIsHoveredOverButton(false)}
                          onClick={getInTouchButtonClicked}
                        >
                          {/* <img
                            src={
                              isHoveredOverButton ? getInTouchWhite : getInTouch
                            }
                            alt="get in touch"
                            style={{
                              height: deviceType === 'mobile' ? '16px' : '37px',
                              width: deviceType === 'mobile' ? '16px' : '37px',
                            }}
                          /> */}
                          getInTouch
                          <Typography
                            style={{
                              // color: 'var(--Zupotso-Primary, #E20B18)',
                              fontFamily: 'Inter',
                              fontSize:
                                deviceType === 'mobile' ? '10px' : '20px',
                              fontStyle: 'normal',
                              fontWeight:
                                deviceType === 'mobile' ? '500' : '600',
                              marginLeft: '5px',
                            }}
                          >
                            Get in Touch
                          </Typography>
                        </Button>
                      )}
                      {data.multipleButton === true && !isAdmin && (
                        <Button
                          disabled={status === 'draft'} // Conditionally disable the button
                          style={{
                            textTransform: 'none',
                            marginTop: deviceType === 'mobile' ? '20px' : '',
                            padding:
                              deviceType === 'mobile' ? '4px 6px' : '8px 12px',
                            borderRadius:
                              deviceType === 'mobile' ? '4px' : '5px',
                          }}
                          className={classes.button}
                          onMouseEnter={() => setIsHoveredOverButton(true)}
                          onMouseLeave={() => setIsHoveredOverButton(false)}
                          onClick={getInTouchButtonClicked}
                        >
                          {/* <img
                            src={
                              isHoveredOverButton ? getInTouchWhite : getInTouch
                            }
                            alt="get in touch"
                            style={{
                              height: deviceType === 'mobile' ? '16px' : '37px',
                              width: deviceType === 'mobile' ? '16px' : '37px',
                              opacity: status === 'draft' ? 0.5 : 1, // Adjust opacity based on asset status
                              filter: status === 'draft' ? 'grayscale(100%)' : 'none', // Apply grayscale filter if disabled
                            }}
                          /> */}
                          getInTouch
                          <Typography
                            style={{
                              fontFamily: 'Inter',
                              fontSize:
                                deviceType === 'mobile' ? '10px' : '20px',
                              fontStyle: 'normal',
                              fontWeight:
                                deviceType === 'mobile' ? '500' : '600',
                              marginLeft: '5px',
                            }}
                          >
                            Get in Touch
                          </Typography>
                        </Button>
                      )}
                    </div>
                  </div>
                  {data.isCricket === true && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        // width: "90%",
                        gap: '12px',
                        marginTop: '10px',
                      }}
                    >
                      {data.listed_by && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // gap: '16px',
                            // alignItems: 'center',
                            marginTop:
                              deviceType === 'mobile'
                                ? '13px'
                                : isAdmin
                                ? '-72px'
                                : '-50px',
                            // width: deviceType === 'mobile' ? '50%' : '12%',
                            width: 'fit-content',

                            height: '15%',
                            gap: deviceType === 'mobile' ? '20px' : '26px',
                          }}
                        >
                          {/* <div>
                            <Typography
                              sx={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '10px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                letterSpacing: '0.32px',
                                textTransform: 'capitalize',
                                textAlign: 'left',
                              }}
                            >
                              Listed By
                            </Typography>
                            <Typography
                              sx={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize:
                                  deviceType === 'mobile' ? '10px' : '16px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                letterSpacing: '0.32px',
                                textTransform: 'capitalize',
                                textAlign: 'left',
                                marginTop: '16px',
                              }}
                            >
                              {data?.listed_by}
                            </Typography>
                          </div> */}

                          {data?.socialHandles?.length != 0 && (
                            <div>
                              <Typography
                                sx={{
                                  color: '#FFF',
                                  fontFamily: 'Inter',
                                  fontSize:
                                    deviceType === 'mobile' ? '10px' : '16px',
                                  fontStyle: 'normal',
                                  fontWeight: 600,
                                  lineHeight: 'normal',
                                  letterSpacing: '0.32px',
                                  textTransform: 'capitalize',
                                  textAlign: 'left',
                                }}
                              >
                                Social Handles
                              </Typography>
                              <div
                                className="social-icons"
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '16px',
                                  marginTop: '12px',
                                  justifyContent: 'flex-start',
                                }}
                              >
                                {data?.socialHandles
                                  .filter(
                                    (socialMedia: any) =>
                                      socialMedia.value &&
                                      socialMedia.value.trim() !== ''
                                  )
                                  .map((socialMedia: any, index: number) => (
                                    <div
                                      key={index}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleOpenLink(`${socialMedia.value}`);
                                      }}
                                      style={{ cursor: 'pointer' }}
                                      className="social-media-link-hover"
                                    >
                                      {/* <img
                                        style={{
                                          // marginRight: '20px',
                                          width:
                                            deviceType === 'mobile'
                                              ? '24px'
                                              : '32px',
                                          height:
                                            deviceType === 'mobile'
                                              ? '24px'
                                              : '32px',
                                          transition:
                                            'transform 0.3s ease-in-out',
                                          userSelect: 'none',
                                          cursor: 'pointer',
                                        }}
                                        className={`${socialMedia.key} social-media-link-hover`}
                                        src={dynamicImages(socialMedia.key)}
                                        alt={socialMedia.key}
                                        onMouseOver={() => {
                                          // e.currentTarget.src = socialMedia.icon
                                        }}
                                        onMouseOut={() => {
                                          // e.currentTarget.src = socialMedia.icon;
                                        }}
                                      /> */}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                          {/* <img
                      style={{
                        width: deviceType === 'mobile' ? '45px' : '93px',
                        height: '34px',
                        marginTop: '10px',
                      }}
                      src={GoLive}
                      alt="Powered By"
                    /> */}
                        </div>
                      )}
                      {/* Todo: */}
                      {data?.socialHandles.filter(
                        (socialMedia: any) =>
                          socialMedia.value && socialMedia.value.trim() !== ''
                      ).length > 0 && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',

                            marginTop: '-50px',
                          }}
                        >
                          {/* <Typography
                            sx={{
                              color: '#FFF',
                              fontFamily: 'Inter',
                              fontSize:
                                deviceType === 'mobile' ? '10px' : '16px',
                              fontStyle: 'normal',
                              fontWeight: 600,
                              lineHeight: 'normal',
                              letterSpacing: '0.32px',
                              textTransform: 'capitalize',
                              textAlign: 'left',
                            }}
                          >
                            Follow Us
                          </Typography>
                          <div
                            className="social-icons"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '16px',
                              marginTop: '12px',
                              justifyContent: 'flex-end',
                            }}
                          >
                            {data?.socialHandles
                              .filter(
                                (socialMedia: any) =>
                                  socialMedia.value &&
                                  socialMedia.value.trim() !== ''
                              )
                              .map((socialMedia: any, index: number) => (
                                <div
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleOpenLink(
                                      `https://${socialMedia.value}`
                                    );
                                  }}
                                  style={{ cursor: 'pointer' }}
                                  className="social-media-link-hover"
                                >
                                  <img
                                    style={{
                                      // marginRight: '20px',
                                      width: '32px',
                                      height: '32px',
                                      transition: 'transform 0.3s ease-in-out',
                                      userSelect: 'none',
                                      cursor: 'pointer',
                                    }}
                                    className={`${socialMedia.key} social-media-link-hover`}
                                    src={dynamicImages(socialMedia.key)}
                                    alt={socialMedia.key}
                                    onMouseOver={() => {
                                      // e.currentTarget.src = socialMedia.icon
                                    }}
                                    onMouseOut={() => {
                                      // e.currentTarget.src = socialMedia.icon;
                                    }}
                                  />
                                </div>
                              ))}
                          </div> */}
                        </div>
                      )}
                    </div>
                  )}
                </p>

                <img
                  src={data?.compImg?.pathUrl}
                  id={`cor_${index}`}
                  className="zoputsu-intro-card-image-style"
                  // onLoad={(event) => {
                  //   var img: any = event.target;

                  //   // Check if the image source has already been updated
                  //   if (img.getAttribute('data-loaded') !== 'true') {
                  //     // Update the source only once
                  //     img.src = data?.img?.pathUrl;

                  //     // Set the data-loaded attribute to true
                  //     img.setAttribute('data-loaded', 'true');
                  //   }
                  // }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
}

export default ZoptsuIntro;
