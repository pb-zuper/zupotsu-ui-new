import { Typography } from '@mui/material';
import useDeviceType from '../utils/DeviceType';
import { Touch } from '../assets';
import React, { useState } from 'react';
// import ZoputsuGetInTouchPopup from 'libs/component-lib/src/lib/Molecules/zoputsu-get-in-touch/zoputsu-get-in-touch';

function NoData({ ErrorData }: any) {
  const deviceType = useDeviceType();
  const [showZoputsuGetInTouchPopup, setShowZoputsuGetInTouchPopup] =
    useState<boolean>(false);
  const getInTouchPopupButtonClicked = (buttonKey: string, data?: any) => {
    switch (buttonKey) {
      case 'submit':
        //call api
        break;
      case 'cancel':
        setShowZoputsuGetInTouchPopup(false);
        break;
    }
  };
  return (
    <>
      <div
        style={{
          marginTop: deviceType === 'mobile' ? ' 24px' : '35px',
          marginBottom: '60px',
          display: 'flex',
          height: 'fit-content',
          padding: deviceType === 'mobile' ? '40px 0px' : '60px 0px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          alignSelf: 'stretch',
          background: '#FFF',
          // boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.10)',
        }}
      >
        <img
          src={ErrorData.img}
          alt=""
          style={{
            width: deviceType === 'mobile' ? '148.99px' : '',
            height: deviceType === 'mobile' ? '109.736px' : '',
          }}
        />
        {ErrorData.message === '' ? (
          <>
            <Typography
              sx={{
                color: '#333',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: deviceType === 'mobile' ? '0.85rem' : '1.25rem',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '28px',
                width: deviceType === 'mobile' ? '90%' : '60%',
              }}
            >
              We are in the early build phase of our journey and therefore don’t
              have any active openings currently. We will be listing various
              opportunities to work with us very soon.
            </Typography>
            <Typography
              sx={{
                color: '#333',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: deviceType === 'mobile' ? '0.85rem' : '1.25rem',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '28px',
                width: deviceType === 'mobile' ? '90%' : '45%',
              }}
            >
              If you are interested and want to know more about us, do share
              your resume at{' '}
              <span
                style={{
                  color: '#2F80ED',
                  fontFamily: 'Inter',
                  fontSize: deviceType === 'mobile' ? '0.85rem' : '1.25rem',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '28px',
                  textDecorationLine: 'underline',
                }}
              >
                <a
                  style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    color: 'inherit',
                  }}
                  href='mailto:careers@zupotsu.com?subject=""&body=""'
                >
                  careers@zupotsu.com
                </a>
              </span>{' '}
              and we will get in touch with you very soon.
            </Typography>
          </>
        ) : (
          <>
            <Typography
              sx={{
                color: '#333',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: deviceType === 'mobile' ? '0.85rem' : '1.25rem',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '28px',
                width: deviceType === 'mobile' ? '90%' : '60%',
                whiteSpace: 'pre-line',
              }}
            >
              {/* {ErrorData?.message?.map((paragraph: any, index: number) => (
              <React.Fragment key={index}>
                {paragraph}
              
                {index < ErrorData?.message?.length - 1 && <br />}
              </React.Fragment>
            ))} */}

              {ErrorData?.message}
            </Typography>
            {ErrorData.button && (
              <div
                style={{
                  display: 'flex',
                  width: 'fit-content',
                  padding: '4px 12px',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '5px',
                  background: '#E20B18',
                  cursor: 'pointer',
                }}
                // onClick={() => setShowZoputsuGetInTouchPopup(true)}
              >
                <img src={Touch} alt="GetInTouch" />
                <Typography
                  sx={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '140%',
                  }}
                >
                  Get in Touch
                </Typography>
              </div>
            )}
          </>
        )}
      </div>
      {/* <ZoputsuGetInTouchPopup
        buttonClicked={getInTouchPopupButtonClicked}
        showPopup={showZoputsuGetInTouchPopup}
        closePopup={() => {
          setShowZoputsuGetInTouchPopup(false);
        }}
      /> */}
    </>
  );
}

export default NoData;
