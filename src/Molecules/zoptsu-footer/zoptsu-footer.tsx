import { Typography } from '@mui/material';

import useDeviceType from '../../utils/DeviceType';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import { useCallback, useState } from 'react';
import CookiesPolicyModal from './CookiesPolicyModal';
import { facebookIcon, instagramI, instagramIcon, LinkedIn, youtube, ZopotsuLogo, twitterRed, twitter, youtubeRed, linkedInn, fb1, Instag, Instared, linkedinred, facebookrounded, facebbookroundedred } from '../../assets';
import xicon from '../../assets/xicon.png'
import xiconred from '../../assets/xiconred.png'
import Termsandservices from '../../Container/Termsandservices';
interface ZupotsuFooterProps {
  onPrivacyPolicyButtonClicked: () => void;
  onTOSCLick: () => void;
}

export function ZoptsuFooter({
  onPrivacyPolicyButtonClicked,
  onTOSCLick,
}: ZupotsuFooterProps) {
  const deviceType = useDeviceType();
  const [shown, setShown] = useState(false)
  const [open, setOpen] = useState(false);
  const [openCookiePolicy, setCookiePolicyOpen] = useState(false);
  const [openPrivacyPolicy, setPrivacyPolicyOpen] = useState(false);
  const linkStyle = {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '21px',
    letterSpacing: '0em',
    textAlign: 'right',
    alignItems: 'center',
    color: '#BDBDBD',
    fontFamily: 'Inter, sans-serif',
    paddingRight: '1.5rem',
    transition: 'color 0.3s ease-in-out',
    ':hover': {
      color: 'white',
    },
    cursor: 'pointer',
  }

  const linkStyleMobileView: any = {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '115%',
    textAlign: 'left',
    color: '#BDBDBD',
    fontFamily: 'Inter',
  };

  const openModal = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const openCookiesPolicyModal = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setCookiePolicyOpen(true);
  };
  const closeCookiePolicy = () => {
    setCookiePolicyOpen(false);
  };

  if (deviceType === 'mobile') {
    return (
      <div
        className="table-container"
        style={{
          backgroundColor: 'black',
          padding: '20px 20px',
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            className="zoptsu_logo"
            src={ZopotsuLogo}
            alt="ZoptsuLogo"
            style={{
              width: '117.6px',
              height: '84px',
              marginBottom: '-10px',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 'fit-content',
            marginTop: '1rem',
            // justifyContent: 'center',
            justifyContent: 'space-around',
            // padding: '0px 2rem',
            marginBottom: '1.25rem',
            marginLeft:'-25px'
          }}
        >
          <Typography
            onClick={() => {
              // onTOSCLick();
              setShown(true)
            }}
            style={linkStyleMobileView}
          >
            Terms and Conditions
          </Typography>
          <Typography
            onClick={() => {
              // onPrivacyPolicyButtonClicked();
              setPrivacyPolicyOpen(true)
            }}
            style={linkStyleMobileView}
          >
            Privacy Policy
          </Typography>
          <Typography
            style={linkStyleMobileView}
            onClick={openCookiesPolicyModal}
          >
            Cookie Policy
          </Typography>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',

            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              style={{
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '150%',
                textAlign: 'center',
                fontFamily: 'Inter',
                width: '100%',
                color: '#F2F2F2',
              }}
            >
              Follow Us
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '8px',
              justifyContent: 'center', // Space between elements
            }}
          >
            <img
              style={{ marginRight: '16px' }}
              className="facebook"
              onClick={() => {
                window.open(
                  'https://facebook.com/zupotsu',
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
              src={facebookrounded}
              alt="Facebook"
            />

            <img
              style={{
                marginRight: '20px',
                width: '32px', height: '32px',
                borderRadius: '20px',
                transition: 'transform 0.3s ease-in-out',
                cursor: 'pointer',
                border: '1px solid #FFF',
                marginTop: "3px",
              }}
              className="facebook"
              src={xicon}
              alt="x"
              onClick={() => {
                window.open(
                  'https://x.com/zupotsu',
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
              onMouseOver={(e) => {
                e.currentTarget.src = xiconred;
                e.currentTarget.style.borderColor = 'red'; 
              }}
              onMouseOut={(e) => {
                e.currentTarget.src = xicon;
                e.currentTarget.style.borderColor = '#FFF'; 
              }}
            />
            <img
              style={{ marginRight: '16px' }}
              className="facebook"
              src={Instag}
              alt="Instagram"
              onClick={() => {
                window.open(
                  ' https://www.instagram.com/zupotsu?igsh=OGQ5ZDc2ODk2ZA==',
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
            />
            <img
              style={{ marginRight: '16px' }}
              className="facebook"
              src={linkedInn}
              alt="Linkedin"
              onClick={() => {
                window.open(
                  'https://www.linkedin.com/company/zupotsu/about/',
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
            />
            <img
              className="facebook"
              src={youtube}
              alt="Youtube"
              onClick={() => {
                window.open(
                  'https://www.youtube.com/@zupotsu',
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
            />
          </div>
        </div>
        <hr
          className="separator"
          style={{
            border: '1px solid #828282',
            opacity: 0.5,
            margin: '16px 0 1.25rem 0px',
            width: '100%',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            style={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '21px',
              letterSpacing: '0em',
              textAlign: 'left',
              color: '#828282',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Copyright &#169; {new Date().getFullYear()} Amaltas Haat Pvt. Ltd.
          </Typography>
        </div>
        <CookiesPolicyModal
          open={openCookiePolicy}
          closeModal={closeCookiePolicy}
          privacyPolicyLink={"https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/Zupotsu%20-%20PrivacyPolicy%20-%20NJ.docx.pdf"}
        />
        <PrivacyPolicyModal open={open} closeModal={closeModal} />
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'black',
        // padding: '25px 5rem 20px 5rem',
        padding:'25px',
        fontFamily: 'Inter'
      }}
    >
      <div style={{ display: 'flex', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            width: '33.33%',
            height: '100%',
            alignItems: 'center',
            marginTop: '50px',
          }}
        >
          <Typography
            sx={{ ...linkStyle, cursor: 'pointer' }}
            onClick={() => { setShown(true) }}
          >

            <span

            >
              Terms and Conditions
            </span>
          </Typography>
          <Typography
            sx={{ ...linkStyle, cursor: 'pointer' }}
            onClick={() => {
              setPrivacyPolicyOpen(true)
            }}
          >
            <span
            >
              Privacy Policy
            </span>
          </Typography>
          <Typography
            onClick={openCookiesPolicyModal}
            sx={{ ...linkStyle, cursor: 'pointer' }}
          // onClick={}
          >
            Cookie Policy
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end', // Align to the bottom
            width: '33.33%',
            maxHeight: 'fit-content',
            padding: '0px',
            bottom: 0,
          }}
        >
          <img
            src={ZopotsuLogo}
            alt="ZoptsuLogo"
            style={{
              width: '117.6px',
              height: '84px',
              padding: '0px',
              marginBottom: '-10px',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '10px',
            width: '33.33%',
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            <Typography
              style={{
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '21px',
                letterSpacing: '0em',
                textAlign: 'right',
                alignItems: 'center',
                color: '#F2F2F2',
                fontFamily: 'Inter, sans-serif',
                paddingRight: '7.9rem',
                // paddingTop: '2px',
              }}
            >
              Follow Us
            </Typography>
            <div
              className="social-icons"
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '12px',
                justifyContent: 'flex-end',
              }}
            >
              <img
                style={{
                  marginRight: '20px',
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',
                  padding: "5px",

                }}
                onClick={() => {
                  window.open(
                    'https://facebook.com/zupotsu',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                className="facebook"
                src={facebookrounded}
                alt="Facebook"
                onMouseOver={(e) => (e.currentTarget.src = facebbookroundedred)}
                onMouseOut={(e) => (e.currentTarget.src = facebookrounded)}
              />
              <img
                style={{
                  marginRight: '20px',
                  width: '32px', height: '32px',
                  borderRadius: '20px',
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',
                  border: '1px solid #FFF',
                  marginTop: "5px",
                }}
                className="facebook"
                src={xicon}
                alt="x"
                onClick={() => {
                  window.open(
                    'https://x.com/zupotsu',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                onMouseOver={(e) => {
                  e.currentTarget.src = xiconred;
                  e.currentTarget.style.borderColor = 'red'; 
                }}
                onMouseOut={(e) => {
                  e.currentTarget.src = xicon;
                  e.currentTarget.style.borderColor = '#FFF'; 
                }}
              />
              <img
                style={{
                  marginRight: '20px',
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',
                  padding: "5px",

                }}
                className="facebook"
                src={Instag}
                alt="Instagram"
                onClick={() => {
                  window.open(
                    ' https://www.instagram.com/zupotsu?igsh=OGQ5ZDc2ODk2ZA==',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                onMouseOver={(e) => (e.currentTarget.src = Instared)}
                onMouseOut={(e) => (e.currentTarget.src = Instag)}
              />
              <img
                style={{
                  marginRight: '20px',
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',
                }}
                className="facebook"
                src={linkedInn}
                alt="Linkedin"
                onClick={() => {
                  window.open(
                    'https://www.linkedin.com/company/zupotsu/about/',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                onMouseOver={(e) => (e.currentTarget.src = linkedinred)}
                onMouseOut={(e) => (e.currentTarget.src = linkedInn)}
              />
              <img
                style={{
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',

                }}
                className="facebook"
                src={youtube}
                alt="Youtube"
                onClick={() => {
                  window.open(
                    'https://www.youtube.com/@zupotsu',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                // youtubeRed
                onMouseOver={(e) => (e.currentTarget.src = youtubeRed)}
                onMouseOut={(e) => (e.currentTarget.src = youtube)}
              />
            </div>
          </div>
        </div>
      </div>
      <hr
        className="separator"
        style={{
          border: '1px solid white',
          margin: '16px 0 0 0',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '21px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: '#828282',
            fontFamily: 'Inter',
          }}
        >
          Copyright &#169; {new Date().getFullYear()} Amaltas Haat Pvt. Ltd.
        </Typography>
      </div>
      <CookiesPolicyModal
        open={openCookiePolicy}
        closeModal={closeCookiePolicy}
        privacyPolicyLink={"https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/Zupotsu%20-%20PrivacyPolicy%20-%20NJ.docx.pdf"}
      />
      <PrivacyPolicyModal open={openPrivacyPolicy} closeModal={() => { setPrivacyPolicyOpen(false) }} />
      <Termsandservices shown={shown} setShown={setShown} />
    </div>
  );
}

export default ZoptsuFooter;
