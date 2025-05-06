import {
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Close, ArrowBack } from '@mui/icons-material';
import GetInTouchForm from './get-in-touch-form';
import { whatsapp } from '../../assets';
import DetailsSavedSuccessfullyView from './details-saved-successfully-view';
export interface ZoputsuGetInTouchProps {
  showPopup: boolean;
  closePopup: () => void;
  buttonClicked: (buttonKey: string, data?: any) => void;
  showDetailsSavedView?: boolean;
  showLoader?: boolean;
  showOnlyWhatsAppScreen?: boolean;
}

export function ZoputsuGetInTouchPopup({
  showPopup = false,
  closePopup,
  buttonClicked,
  showDetailsSavedView,
  showLoader = false,
  showOnlyWhatsAppScreen = false,
}: ZoputsuGetInTouchProps){
  const phoneNumber = '919987831843';
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  const [displayPopup, setDisplayPopup] = useState<boolean>(showPopup);
  const [showFormView, setShowFormView] = useState<boolean>(
    !showOnlyWhatsAppScreen
  );

  useEffect(() => {
    setDisplayPopup(showPopup);
    if (!showPopup) {
      setShowFormView(!showOnlyWhatsAppScreen);
    }
  }, [showPopup]);

  useEffect(() => {
    if (showOnlyWhatsAppScreen) {
      setShowFormView(false);
    }
  }, [showOnlyWhatsAppScreen]);

  return (
    <Dialog
      open={displayPopup}
      PaperProps={{
        sx: {
          borderRadius: '4px',
          width: showDetailsSavedView ? '525px' : '840px',
          maxWidth: '100%',
        },
      }}
      disableScrollLock
    >
      {showPopup && (
        <DialogContent
          style={{
            padding: '20px',
            pointerEvents: showLoader ? 'none' : 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {!showDetailsSavedView && (
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    lineHeight: '24px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  Get in Touch
                </Typography>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'end',
                  width: '100%',
                }}
              >
                <Close
                  style={{ alignSelf: 'end', cursor: 'pointer' }}
                  onClick={closePopup}
                />
              </div>
            </div>
            <div style={{ marginTop: '24px' }}>
              {!showDetailsSavedView && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                  }}
                >
                  {showFormView && (
                    <Typography
                      sx={{
                        color: '#333',
                        fontFamily: 'Inter',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: '25.2px',
                      }}
                    >
                      Fill up the form or to connect via
                    </Typography>
                  )}
                  {!showFormView && !showOnlyWhatsAppScreen && (
                    <ArrowBack
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        !showOnlyWhatsAppScreen && setShowFormView(true)
                      }
                    />
                  )}
                  <img src={whatsapp} alt="whatsapp" width={20} height={20} />
                  <Typography
                    sx={{
                      color: '#333',
                      fontFamily: 'Inter',
                      fontSize: '18px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: '25.2px',
                    }}
                  >
                    {!showFormView && 'Connect Via '}Whatsapp
                  </Typography>
                  {showFormView && (
                    <Typography
                      sx={{
                        color: '#2F80ED',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: '22.4px',
                        cursor: 'pointer',
                      }}
                      onClick={() => setShowFormView(false)}
                    >
                      Click Here
                    </Typography>
                  )}
                </div>
              )}
              <div
                style={{
                  display:
                    showFormView && !showDetailsSavedView ? 'block' : 'none',
                }}
              >
                <GetInTouchForm buttonClicked={buttonClicked} />
              </div>
              {!showFormView && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '24px',
                      letterSpacing: '0em',
                      textAlign: 'left',
                    }}
                  >
                    Scan the bar code and start chatting with us
                  </Typography>
                  <div
                    style={{
                      width: 'fit-content',
                      height: 'fit-content',
                      marginTop: '52px',
                      padding: '8px',
                      borderRadius: '5px',
                      border: '1px solid #E0E0E0',
                      alignSelf: 'center',
                      marginBottom: '106px',
                    }}
                  >
                    <div
                      style={{
                        width: 'fit-content',
                        height: 'fit-content',
                        padding: '8px',
                        borderRadius: '5px',
                      }}
                    >
                      <QRCode
                        style={{
                          cursor: 'pointer',
                          width: '250px',
                          height: '250px',
                        }}
                        value={whatsappLink}
                        onClick={() => {
                          window.open(
                            whatsappLink,
                            '_blank',
                            'noopener,noreferrer'
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {showFormView && showDetailsSavedView && (
                <DetailsSavedSuccessfullyView />
              )}
            </div>
          </div>
          {showLoader && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                left: '50%',
                top: '50%',
                zIndex: 1000,
                position: 'absolute',
              }}
            >
              <CircularProgress />
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};
export default ZoputsuGetInTouchPopup;
