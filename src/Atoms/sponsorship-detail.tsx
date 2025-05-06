import { Tab, Tabs, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
// import useDeviceType from 'libs/component-lib/src/utils/DeviceType';
// import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useDeviceType from '../utils/DeviceType';
// import parse from 'html-react-parser';

export interface SponsorshipDetailProps {
  name: string;
  investment: string;
  termsAndCondition: string;
  coverImages: any;
  deliverables: any;
  opportunityCustomDetails: any;
  investmentVisibility: boolean;
  getInTouchButtonClicked?: () => void;
  isTermsAndConditionFile?: boolean;
}
export const CarouselComponent = ({ images }: any) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const deviceType = useDeviceType();

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [images]);
  return (
    <div
      id="shortCoro"
      style={{
        width: '100%',
        height: '100%',
        // border: '1px solid red',
        // height: '300px',
      }}
    >
      <Carousel
        showArrows={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={images?.length > 1}
        selectedItem={selectedImageIndex}
        onChange={(index: any) => {
          setSelectedImageIndex(index);
        }}
      >
        {images?.map((image: any, index: any) => (
          <div
            key={index}
            style={{
              height: deviceType === 'mobile' ? '70%' : '42%',
              width: '100%',
            }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'fill',
                // height: '300px',
                // marginBottom: '10%', // Adjust the margin as needed
              }}
              src={image.pathUrl}
              alt={`Sponsor ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export function SponsorshipDetail({
  name,
  investment,
  coverImages,
  deliverables,
  termsAndCondition,
  opportunityCustomDetails,
  investmentVisibility,
  getInTouchButtonClicked,
  status,
  isAdmin = false,
  isTermsAndConditionFile = false,
}: any) {
  let filteredData = coverImages?.filter((item: any) => item.pathUrl !== '');
  useEffect(() => {
    filteredData = coverImages?.filter((item: any) => item.pathUrl !== '');
  }, [coverImages]);

  const navigate = useNavigate();
  const deviceType = useDeviceType();
  const [value, setValue] = useState(
    deviceType === 'mobile' ? 'deliverables' : 'highlights'
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const sponsorDetail = [
    'Influencer + In-game branding',
    'Offline tournament in a resort with real Cricketers as Mentors and Jury',
    '1000 Cricket Bats, 1Massive PR push around the brand collaboration with the game000 T-shirts with your Brand',
    'Up to 100 Mil Impressions',
    'In-game branding',
    'Engage with the Online gamer community',
  ];
  // const opportunityCustomDetails = [
  //   {
  //     key: 'highlights',
  //     value: 'value1',
  //   },
  //   {
  //     key: 'customKey2',
  //     value: 'value2',
  //   },
  //   // ... other objects
  // ];

  // Function to fetch the value for a key named "highlights"
  const fetchHighlightedValue = (details: any) => {
    for (const detail of details) {
      if (detail.key === 'highlights') {
        // Return the value associated with the "highlights" key
        return detail.value;
      }
    }
    // Return a default value or handle the case when "highlights" key is not found
    return null;
  };
  const [showAll, setShowAll] = useState(false);
  const [showAllForHighlighted, setShowAllForHighlighted] = useState(false);

  // opportunityCustomDetails.some((detail: any) => detail.key === 'highlights');
  const highlightsDetail = opportunityCustomDetails?.find(
    (detail: any) => detail?.key === 'highlights'
  );

  const highlightTabData = showAllForHighlighted
    ? highlightsDetail?.value
    : highlightsDetail?.value?.substring(0, 300);

  // const visibleDetails = showAll ? termsAndCondition : termsAndCondition.slice(0, 4);

  const termsAndConditionShowHide = showAll
    ? termsAndCondition
    : termsAndCondition?.substring(0, 200);

  const handleSeeMoreClick = (action: string) => {
    if (action === 'highlights') {
      setShowAllForHighlighted(!showAllForHighlighted);
    } else {
      setShowAll(!showAll); // Toggle the value of showAll
    }
  };

  const showHighlightsAndTCTabs: boolean = useMemo(
    () =>
      Boolean(
        opportunityCustomDetails?.some(
          (detail: any) => detail.key === 'highlights' || termsAndCondition
        )
      ),
    [opportunityCustomDetails, termsAndCondition]
  );

  //show terms and condition, deliverables, highlights tab only when its data is present, chnages for prod
  const showTermsandCondTabs: boolean = useMemo(
    () => Boolean(termsAndCondition),
    [termsAndCondition]
  );
  const showDeliverablesTabs: boolean = useMemo(
    () => Boolean(deliverables),
    [deliverables]
  );
  const showHighlightsTabs: boolean = useMemo(
    () =>
      Boolean(
        opportunityCustomDetails?.some(
          (detail: any) => detail.key === 'highlights'
        )
      ),
    [opportunityCustomDetails]
  );
  const showTabs = useMemo(
    () => showDeliverablesTabs || showHighlightsTabs || showTermsandCondTabs,
    [showDeliverablesTabs, showHighlightsTabs, showTermsandCondTabs]
  );

  useEffect(() => {
    if (deviceType === 'mobile') {
      if (showDeliverablesTabs) {
        setValue('deliverables');
      } else if (showHighlightsTabs) {
        setValue('highlights');
      } else if (showTermsandCondTabs) {
        setValue('t&c');
      } else {
        setValue('');
      }
    } else {
      if (showDeliverablesTabs) {
        setValue('deliverables');
      } else if (showHighlightsTabs) {
        setValue('highlights');
      } else if (showTermsandCondTabs) {
        setValue('t&c');
      } else {
        setValue('');
      }
    }
  }, [showHighlightsTabs, showDeliverablesTabs, showTermsandCondTabs, name]);

  return (
    <>
      {deviceType !== 'mobile' && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {filteredData?.length > 0 && (
            <div
              style={{
                width: '330px',
                height:
                  deviceType === 'tablet'
                    ? '175px'
                    : deviceType === 'desktop'
                    ? '190px'
                    : deviceType === 'small-tablet'
                    ? '130px'
                    : '192px',
                // height: '300px',
                // border: '1px solid green',
                background: '#051A31',
                // padding: '23px 0px 10px 0px',
              }}
            >
              <CarouselComponent images={filteredData}>
                <div
                  style={{
                    display: 'flex',
                    maxWidth: '100px',

                    // width: '50%',
                    // height: '40%',
                    // padding: '123px 0px 10px 0px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    background: '#051A31',
                    border: '1px solid green',
                  }}
                >
                  <img
                    style={{
                      // maxWidth: '100px',
                      // width: '50%',
                      height: '100%',
                      marginBottom: '30%',
                      border: '1px solid green',
                    }}
                    src={
                      filteredData?.length > 0 ? filteredData?.[0]?.pathUrl : ''
                    }
                    alt="Sponsor"
                  />
                </div>
              </CarouselComponent>
            </div>
          )}

          <div
            style={{
              paddingLeft: filteredData?.length > 0 ? '20px' : '0px',
              width: '100%',
              // Fixed width for the details container
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '25px',
                flexGrow: 1,
              }}
            >
              <Typography
                sx={{
                  color: 'var(--Gray-1, #333)',
                  fontFamily: 'Inter',
                  fontSize: '28px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '140%',
                  textTransform: 'capitalize',
                }}
              >
                {name}
              </Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  alignItems: 'start',
                }}
              >
                {investmentVisibility && (
                  <>
                    {investment?.slice(-3) && (
                      <Typography
                        sx={{
                          color: 'var(--Zupotso-Primary, #E20B18)',
                          fontFamily: 'Inter',
                          fontSize: '24px',
                          fontStyle: 'normal',
                          fontWeight: 600,
                          lineHeight: '140%',
                          alignSelf: 'center',
                        }}
                      >
                        {investment.endsWith('INR')
                          ? '₹'
                          : investment.endsWith('USD')
                          ? '$'
                          : ''}
                        {/* { */}
                        {investment?.slice(0, -3)}
                      </Typography>
                    )}
                  </>
                )}
                {!isAdmin && (
                  <div style={{ width: '136px' }}>
                    {/* <ZupotsuButton
                      name={'Get in Touch'}
                      disabled={status === 'draft'}
                      isCustomColors={true}
                      variant={'outlined'}
                      customBgColor="#E20B18"
                      customTextColor="#ffffff"
                      customBgColorOnhover="#b92a33"
                      customTextColorOnHover="#ffffff"
                      handleClick={getInTouchButtonClicked}
                    /> */}
                  </div>
                )}
              </div>
            </div>
            {showTabs && (
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#E20B18',
                  },
                }}
                sx={{
                  '.Mui-selected': {
                    color: `var(--Gray-1, #333) !important`,
                  },
                }}
                aria-label="secondary tabs example"
              >
                {showHighlightsTabs && (
                  <Tab
                    style={{
                      borderBottom: '2px solid #BDBDBD',
                      marginRight: '24px',
                      fontFamily: 'Inter',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: '140%' /* 28px */,
                      letterSpacing: '0.2px',
                      width: 'fit-content', // Set width to fit content
                    }}
                    value="highlights"
                    label="Highlights"
                    sx={{
                      textTransform: 'capitalize', // Ensures sentence case
                    }}
                  />
                )}
                {showDeliverablesTabs && (
                  <Tab
                    style={{
                      borderBottom: '2px solid #BDBDBD',
                      marginRight: '24px',
                      fontFamily: 'Inter',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: '140%' /* 28px */,
                      letterSpacing: '0.2px',
                      width: 'fit-content', // Set width to fit content
                    }}
                    value="deliverables"
                    label="Deliverables"
                    sx={{
                      textTransform: 'capitalize', // Ensures sentence case
                    }}
                  />
                )}
                {showTermsandCondTabs && (
                  <Tab
                    value="t&c"
                    style={{
                      borderBottom: '2px solid #BDBDBD',
                      fontFamily: 'Inter',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: '140%',
                      letterSpacing: '0.2px',
                    }}
                    label="T&C"
                  />
                )}
              </Tabs>
            )}

            {value === 'highlights' && (
              <div
                style={{
                  // marginTop: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                }}
              >
                {opportunityCustomDetails?.some(
                  (detail: any) => detail.key === 'highlights'
                ) && (
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'grid',
                      gridTemplateColumns: 'auto auto',
                      gridColumnGap: '30px',
                    }}
                  >
                    <div
                      style={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#4F4F4F',
                      }}
                    >
                      {/* {parse(JSON.parse(highlightTabData))} */}
                      {highlightTabData}
                    </div>
                  </div>
                )}

                {highlightsDetail &&
                  highlightsDetail?.value &&
                  highlightsDetail?.value?.length > 0 && (
                    <Typography
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'var(--Zupotso-Primary, #E20B18)',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '21px',
                        letterSpacing: '0.32px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleSeeMoreClick('highlights')}
                    >
                      {showAllForHighlighted ? 'See Less' : 'See More'}
                    </Typography>
                  )}
              </div>
            )}
            {value === 't&c' && (
              <div
                style={{
                  marginTop: '30px',
                }}
              >
                {termsAndCondition &&
                  (isTermsAndConditionFile ? (
                    <a
                      download={true}
                      href={termsAndCondition}
                      target="_blank"
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      {decodeURIComponent(
                        termsAndCondition?.substring(
                          termsAndCondition?.lastIndexOf('/') + 1
                        )
                      )}
                    </a>
                  ) : (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                        gridColumnGap: '30px',
                      }}
                    >
                      <div
                        style={{
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#4F4F4F',
                        }}
                      >
                        {/* {parse(
                          JSON.parse(JSON.stringify(termsAndConditionShowHide))
                        )} */}
                      </div>
                    </div>
                  ))}

                {!isTermsAndConditionFile && termsAndCondition.length > 200 && (
                  <Typography
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'var(--Zupotso-Primary, #E20B18)',
                      fontFamily: 'Inter',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '21px',
                      letterSpacing: '0.32px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleSeeMoreClick('tc')}
                  >
                    {showAll ? 'See Less' : 'See More'}
                  </Typography>
                )}
              </div>
            )}
            {value === 'deliverables' && (
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#4F4F4F',
                  marginTop: '30px',
                }}
              >
                {/* {parse(JSON.parse(deliverables))} */}
                {deliverables}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Deleverables added in tabs as per prod fixes
      {deviceType !== 'mobile' && (
        <>
          <Typography
            sx={{
              color: 'var(--Gray-1, #333)',
              fontFamily: 'Inter',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '140%',
              textTransform: 'capitalize',
              margin: '24px 0 12px 0',
            }}
          >
            Deliverables
          </Typography>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: '500',
              color: '#4F4F4F',
            }}
          >
            {parse(JSON.parse(deliverables))}
          </div>
        </>
      )} */}
      {/* <Table tableHeader={tableHeader} tableRowData={tableRowData} /> */}
      {deviceType === 'mobile' && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {filteredData?.length > 0 && (
            <div style={{ background: '#051A31' }}>
              <CarouselComponent images={filteredData}>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    // height: '165px',
                    padding: '123px 0px 10px 0px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    background: '#051A31',
                  }}
                >
                  <img
                    style={{
                      width: '50%',
                      height: '100%',
                      marginBottom: '30%',
                      objectFit: 'fill',
                    }}
                    src={
                      filteredData?.length > 0 ? filteredData?.[0]?.pathUrl : ''
                    }
                    alt="Sponsor"
                  />
                </div>
              </CarouselComponent>
            </div>
          )}

          <div
            style={
              {
                // paddingLeft: '20px',
                // Fixed width for the details container
              }
            }
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                }}
              >
                <Typography
                  sx={{
                    color: 'var(--Gray-1, #333)',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '140%',
                  }}
                >
                  {name}
                </Typography>
                {investmentVisibility && (
                  <>
                    {investment?.slice(-3) && (
                      <Typography
                        sx={{
                          color: 'var(--Zupotso-Primary, #E20B18)',
                          fontFamily: 'Inter',
                          fontSize: '20px',
                          fontStyle: 'normal',
                          fontWeight: 600,
                          lineHeight: '140%',
                          alignSelf: 'center',
                        }}
                      >
                        {investment.endsWith('INR')
                          ? '₹'
                          : investment.endsWith('USD')
                          ? '$'
                          : ''}
                        {investment?.slice(0, -3)}
                      </Typography>
                    )}
                  </>
                )}
              </div>

              {/* {!isAdmin && (
                <ZupotsuButton
                  name={'Get in Touch'}
                  disabled={status === 'draft'}
                  isCustomColors={true}
                  variant={'outlined'}
                  customBgColor="#E20B18"
                  customTextColor="#ffffff"
                  customBgColorOnhover="#b92a33"
                  customTextColorOnHover="#ffffff"
                  handleClick={getInTouchButtonClicked}
                />
              )} */}
            </div>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#E20B18',
                },
              }}
              sx={{
                '.Mui-selected': {
                  color: `var(--Gray-1, #333) !important`,
                },
                padding: '15px 0 20px 0',
              }}
              aria-label="secondary tabs example"
            >
              <Tab
                style={{
                  borderBottom: '2px solid #BDBDBD',
                  marginRight: '24px',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '140%' /* 28px */,
                  letterSpacing: '0.2px',
                  width: 'fit-content', // Set width to fit content
                }}
                value="deliverables"
                label="Deliverables"
                sx={{
                  padding: '4px',
                  textTransform: 'capitalize', // Ensures sentence case
                }}
              />
              {/* Client change commenting for now  */}
              {/* {showHighlightsAndTCTabs && (
                <Tab
                  style={{
                    borderBottom: '2px solid #BDBDBD',
                    marginRight: '24px',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '140%',
                    letterSpacing: '0.2px',
                    width: 'fit-content',
                  }}
                  value="highlights"
                  label="Highlights"
                  sx={{
                    padding: '4px',
                    textTransform: 'capitalize', // Ensures sentence case
                  }}
                />
              )} */}
              {showHighlightsAndTCTabs && (
                <Tab
                  value="t&c"
                  style={{
                    padding: '4px',
                    borderBottom: '2px solid #BDBDBD',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    lineHeight: '140%',
                    letterSpacing: '0.2px',
                    fontWeight: 600,
                  }}
                  label="T&C"
                />
              )}
            </Tabs>
            {value === 'highlights' && (
              <div
                style={{
                  // marginTop: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                }}
              >
                {opportunityCustomDetails?.some(
                  (detail: any) => detail.key === 'highlights'
                ) && (
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'grid',
                      gridTemplateColumns: 'auto auto',
                      gridColumnGap: '30px',
                    }}
                  >
                    <div
                      style={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#4F4F4F',
                      }}
                    >
                      {/* {parse(JSON.parse(highlightTabData))} */}
                      {highlightTabData}
                    </div>
                  </div>
                )}

                {highlightsDetail &&
                  highlightsDetail?.value &&
                  highlightsDetail?.value?.length > 0 && (
                    <Typography
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'var(--Zupotso-Primary, #E20B18)',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '21px',
                        letterSpacing: '0.32px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleSeeMoreClick('highlights')}
                    >
                      {showAllForHighlighted ? 'See Less' : 'See More'}
                    </Typography>
                  )}
              </div>
            )}
            {value === 't&c' &&
              (isTermsAndConditionFile ? (
                <div
                  style={{
                    // marginTop: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                  }}
                >
                  <a
                    download={true}
                    href={termsAndCondition}
                    target="_blank"
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    {decodeURIComponent(
                      termsAndCondition?.substring(
                        termsAndCondition?.lastIndexOf('/') + 1
                      )
                    )}
                  </a>
                </div>
              ) : (
                <div
                  style={{
                    // marginTop: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                  }}
                >
                  {termsAndCondition && (
                    <div
                      style={{
                        marginTop: deviceType === 'mobile' ? '0' : '30px',
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                        gridColumnGap: '30px',
                      }}
                    >
                      <div
                        style={{
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#4F4F4F',
                        }}
                      >
                        {/* {parse(
                          JSON.parse(JSON.stringify(termsAndConditionShowHide))
                        )} */}
                      </div>
                      {/* {visibleDetails?.map((detail: any, index: any) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '12px',
                  // width: '45%', // Display two elements in a line
                  boxSizing: 'border-box',
                  // marginRight: '30px',
                  marginBottom: '12px', // Add 12px margin between pairs
                }}
              >
                <CheckCircleOutlinedIcon
                  sx={{
                    color: '#E20B18',
                    height: '16px',
                    width: '16px',
                  }}
                />
                <Typography
                  sx={{
                    color: 'var(--Gray-2, #4F4F4F)',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '0.32px',
                  }}
                >
                  {detail}
                </Typography>
              </div>
            ))} */}
                    </div>
                  )}

                  {!isTermsAndConditionFile &&
                    termsAndCondition.length > 200 && (
                      <Typography
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'var(--Zupotso-Primary, #E20B18)',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '21px',
                          letterSpacing: '0.32px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleSeeMoreClick('tc')}
                      >
                        {showAll ? 'See Less' : 'See More'}
                      </Typography>
                    )}
                </div>
              ))}
            {value === 'deliverables' && (
              <div style={{ overflowY: 'auto' }}>
                {deliverables && (
                  <div
                    style={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'Inter',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#4F4F4F',
                    }}
                  >
                    {/* {parse(JSON.parse(deliverables))} */}
                    {deliverables}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SponsorshipDetail;
