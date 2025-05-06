import { Button, Modal, Typography } from '@mui/material';
import './zupotsu-signup-login.css';
import { Box } from '@mui/system';
import {
  arrowRightBanner,
  loginPageImage,
  successTikIcon,
  zupotsuLogoFinal,
} from '../../assets';
import { useCallback, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useDeviceType from '../../utils/DeviceType';
import PrivacyPolicyModal from '../../Molecules/zoptsu-footer/PrivacyPolicyModal';
import ZupotsuButton from '../zupotsu-button/zupotsu-button';

export interface ZupotsuSignUpLogInProps {
  open: boolean;
  handleClick: () => void;
}

export function ZupotsuSignUpLogIn(props: any) {
  const deviceType = useDeviceType();
  const [afterRegOtpVerificationScreen, setAfterRegOtpVerScreen] =
    useState(true);
  const [timer, setTimer] = useState(180);
  const [open, setOpen] = useState(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    overflow: 'hidden',
    p: 4,
  };

  useEffect(() => {
    let timerInterval: any;

    if (timer > 0) {
      // Decrease the timer by 1 every second
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      // Timer has reached 0, handle verification expiration
      clearInterval(timerInterval);
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timer]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '& MuiBox-root':{
            width:'100%',
            height:'100%'
          }
        }}
      >
        <Box
          sx={style}
          style={{
            display: 'flex',
            // gridTemplateColumns: '50% 50%',
            width:
              deviceType === 'mobile'
                ? '315px'
                : deviceType === 'tablet'
                ? '1000px'
                : deviceType === 'small-tablet'
                ? '600px'
                : '1200px',
            height: deviceType === 'mobile' ? '588px' : '815px',
            padding: '0',
            borderRadius: '10px',
          }}
        >
          {deviceType === 'mobile' || deviceType === 'small-tablet' ? (
            ''
          ) : (
            <img
              src={loginPageImage}
              alt=""
              style={{
                width: deviceType === 'tablet' ? '50%' : '84%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
          <div
            style={{
              width: '100%',
              margin:
                deviceType === 'mobile'
                  ? '10px 20px 20px 20px'
                  : '0 27px 27px 27px',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <img src={zupotsuLogoFinal} alt="cross icon" />
              <CloseIcon
                style={{ cursor: 'pointer' }}
                onClick={props.handleClick}
              />
            </div>

            {afterRegOtpVerificationScreen && (
              <>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      marginTop: '35px',
                      borderRadius: '4px',
                      border: '1px solid var(--Green-3, #6FCF97)',
                      background: '#ECFFF4',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding:
                        deviceType === 'mobile' ? '12px 16px' : '60px 20px',
                      gap: deviceType === 'mobile' ? '12px' : '16px',
                    }}
                  >
                    <img
                      src={successTikIcon}
                      style={{
                        width: deviceType === 'mobile' ? '60px' : '',
                        height: deviceType === 'mobile' ? '60px' : '',
                      }}
                      alt=""
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        style={{
                          color: 'var(--Green-1, #219653)',
                          textAlign: 'center',
                          fontFamily: 'Inter',
                          fontSize: deviceType === 'mobile' ? '18px' : '20px',
                          fontStyle: 'normal',
                          fontWeight: '600',
                          lineHeight: '130%',
                          paddingBottom: '6px',
                        }}
                      >
                        Congratulations !!
                      </Typography>
                      <Typography
                        style={{
                          color: 'var(--Gray-1, #333)',
                          fontFamily: 'Inter',
                          fontSize: deviceType === 'mobile' ? '14px' : '16px',
                          fontStyle: 'normal',
                          fontWeight: '500',
                          lineHeight: '130%',
                          textAlign: 'center',
                        }}
                      >
                        You have successfully registered on Zupotsu.
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      alignSelf: 'center',
                      marginTop: deviceType === 'mobile' ? '28px' : '64px',
                    }}
                  >
                    <Typography
                      style={{
                        color: 'var(--Gray-1, #333)',
                        fontFamily: 'Inter',
                        fontSize: deviceType === 'mobile' ? '16px' : '20px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: 'normal',
                        textAlign: 'center',
                      }}
                    >
                      Would you like to list an Asset ?
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto auto',
                      gridGap: '16px',
                      marginTop: '32px',
                    }}
                  >
                    <ZupotsuButton
                      name="Skip to Platform"
                      handleClick={()=>{}}
                      isCustomColors={true}
                      variant={'outlined'}
                      customTextColor="#828282"
                      customBgColorOnhover="#fff"
                      customBgColor="#fff"
                      customTextColorOnHover="#E20B18"
                      customOutlineColor={'1px solid #828282'}
                      customOutlineColorOnHover={'1px solid #E20B18'}
                      padding="13px 12px"
                    />

                    <ZupotsuButton
                      name="List an Asset"
                      handleClick={() => {
                        // setaAddOpportunities(true);
                      }}
                      isCustomColors={true}
                      variant={'outlined'}
                      customTextColor="#E20B18"
                      customBgColor="#fff"
                      customBgColorOnhover="white"
                      customTextColorOnHover="#E20B18"
                      customOutlineColor={'1px solid #E20B18'}
                      customOutlineColorOnHover={'1px solid #E20B18'}
                      padding="13px 12px"
                    />
                  </div>
                </div>
              </>
            )}
            {afterRegOtpVerificationScreen && (
              <div
                style={{
                  paddingTop: deviceType === 'mobile' ? '40px' : '204px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                }}
                onClick={props.handleClick}
              >
                <Typography
                  style={{
                    color: 'var(--Primary-Neutral-500, #111)',
                    textAlign: 'center',
                    fontFamily: 'Inter',
                    fontSize: deviceType === 'mobile' ? '14px' : '16px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '140%;' /* 22.4px */,
                    letterSpacing: '0.16px',
                  }}
                >
                  Skip to Dashboard
                </Typography>
                <img src={arrowRightBanner} alt="" />
              </div>
            )}
          </div>
        </Box>
      </Modal>
      <PrivacyPolicyModal open={open} closeModal={closeModal} />
    </>
  );
}

export default ZupotsuSignUpLogIn;
