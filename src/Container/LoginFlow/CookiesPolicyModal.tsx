import { Modal, Fade, Typography, Box } from '@mui/material';

import { memo } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
import Close from '@mui/icons-material/Close';
import useDeviceType from '../../utils/DeviceType';

// Component for the main Cookie Policy content
const CookiePolicy = () => {
  return (
    <div style={{fontFamily:'Inter'}}>
      {/* <h2>Cookie Policy</h2> */}
      <p>
        This Cookie Policy details the purpose and usage of the cookies on our
        website. The policy may be amended from time to time, as published on
        our website.
      </p>
      {/* Include other sections as necessary */}
    </div>
  );
};

// Component for the section explaining what a cookie is
const WhatIsCookie = () => {
  return (
    <div style={{fontFamily:'Inter'}}>
      <h3>What is a cookie?</h3>
      <p>
        A cookie is a small file stored on your device when you visit our
        websites. We use cookies to ensure proper functioning of the website,
        provide you with personalized browsing experience, improve the
        efficiency of the website, and gather information about you and/or the
        devices you use for the purposes mentioned in this Cookie Policy.
      </p>
    </div>
  );
};

// Component for the section explaining types of cookies
const TypesOfCookies = () => {
  return (
    <div style={{fontFamily:'Inter'}}>
      <h3>Types of Cookies</h3>

      <p>
        Cookies can be broadly classified into first-party cookies and
        third-party cookies. First-party cookies are placed by us on your
        device, whereas third-party cookies are not set by us, rather the
        third-parties that provide indispensable features and functionalities on
        our websites to improve your browsing experience and for other purposes
        mentioned in this Cookie Policy. We use the following types of cookies:
      </p>
      {/* Include other subsections as necessary */}
    </div>
  );
};

// Component for the section explaining types of cookies
const NecessaryCookies = () => {
  return (
    <div style={{fontFamily:'Inter'}}>
      <h3>Necessary cookies</h3>

      <p>
        Necessary cookies are placed on our website by default. We cannot turn
        off the use of these cookies in our systems because these cookies are
        essential for the functioning of our website and detecting issues
        related to our website. If you choose to turn off these cookies, our
        website may not function properly.
      </p>
      {/* Include other subsections as necessary */}
    </div>
  );
};

// Component for the section explaining setting cookie preferences
const CookiePreferences = () => {
  return (
    <div style={{fontFamily:'Inter'}}>
      <h3>Preference Cookies:</h3>
      <p>
        We use preference cookies to (i) remember your choices/preferences while
        you are browsing our website, its pages, links and subdomains; (ii)
        track your cookie privacy preferences, which helps us avoid storing
        those cookies (other than necessary cookies) that you do not want us to
        use, including analytics and advertising cookies (where applicable).
      </p>
      <p>
        These preference cookies will remain on your device after you close your
        browsing session.
      </p>
    </div>
  );
};

const AnalyticsCookie = () => {
  return (
    <div style={{fontFamily:'Inter'}}>
      <h3>Analytics and advertising cookies</h3>
      <p>
        These cookies allow us to (i) recognize and count the number of visitors
        to our website, and see how visitors browse our site, so we can
        understand how the content on our website is performing and improve it
        where necessary; (ii) monitor the webpages, links, and sub-domains
        visitors have visited to provide them with personalized ads.
      </p>
      <p>
        We may share this information with other organizations, such as Google,
        Facebook, and LinkedIn, for the purposes stated in this section.
      </p>
    </div>
  );
};

const styles = {
  cell: {
    border: '1px solid black',
    padding: '10px',
  },
  head: {
    border: '1px solid black',
    padding: '10px',
    fontFamily:'Inter',
    fontWeight: 'bold',
  },
};

const TableCookie = () => {
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tr>
        <td style={styles.head}>Name</td>
        <td style={styles.head}>Purpose</td>
        <td style={styles.head}>Cookie Type</td>
        <td style={styles.head}>Duration</td>
      </tr>
      <tr>
        <td style={styles.cell}>Session cookies</td>
        <td style={styles.cell}>
          These cookies are necessary to maintain our services and cannot be
          switched off. They are usually only set in response to actions made by
          you, such as creating an account. These cookies do not store any
          personally identifiable information.
        </td>
        <td style={styles.cell}>Necessary cookies</td>
        <td style={styles.cell}></td>
      </tr>
      <tr>
        <td style={styles.cell}>Local storage cookies </td>
        <td style={styles.cell}>
          These cookies are necessary to maintain our services and cannot be
          switched off. They are usually only set in response to actions made by
          you, such as creating an account. These cookies do not store any
          personally identifiable information.
        </td>
        <td style={styles.cell}>Necessary cookies</td>
        <td style={styles.cell}></td>
      </tr>
    </table>
  );
};

const SettingCookiePreference = () => {
  return (
    <div>
      <h3>Setting your Cookie preferences:</h3>
      <p>
        You can configure your settings related to cookies (other than necessary
        cookies) by accessing the “Manage Cookies Preference” option at the top
        of this Cookie Policy. You may also be able to configure your browser
        settings to manage our use of cookies.
      </p>
    </div>
  );
};

const ThirdPartyCookie = () => {
  return (
    <div>
      <h3>Third-party use of Cookies</h3>
      <p>
        Each third party has its own privacy and cookie policy that will be
        applicable to any information gathered via the use of third-party
        cookies. Please read the cookie policies of the respective third-parties
        before you agree to the use of their cookies embedded on our website.
        Weare not responsible or liable for any third party’s privacy/cookies
        practices or cookies.
      </p>
    </div>
  );
};

// Component for the section explaining third-party use of cookies
const MoreInfo = ({privacyPolicyLink}:{privacyPolicyLink: string}) => {
  return (
    <div style={{fontFamily:'Inter'}}>
      <h3>More information</h3>
      <p>
        More about your privacy{' '}
        <a
          href={
            'https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/TOS.pdf'
          }
          target="_blank"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href={
            privacyPolicyLink
          }
          target="_blank"
        >
          Privacy policy
        </a>
      </p>
    </div>
  );
};

// Component for the section explaining retention of cookies
const RetentionOfCookies = () => {
  return (
    <div style={{fontFamily:'Inter'}}>
      <h3>Retention of Cookies</h3>
      <p>
        Cookies may remain on your devices until the end of your browsing
        session (“session cookies”) or until they expire unless you delete them
        manually (“persistent cookies”). For information on specific retention
        timeframes, please check the tables under section 3 of this Cookie
        Policy.
      </p>
    </div>
  );
};

const CookiesPolicyModal = ({
  open,
  closeModal,
  privacyPolicyLink
}: {
  open: boolean;
  closeModal: () => void;
  privacyPolicyLink: string;
}) => {
  const deviceType = useDeviceType();
  // const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={closeModal}
      closeAfterTransition
      sx={{
        fontFamily: 'Inter',
        overflow: 'hidden',
      }}
      // className={classes.modalContent}
    >
      <Fade in={open}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            fontFamily:'Inter'
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              width: 1200,
              maxWidth: '100%',
              padding: '20px',
              maxHeight: '80%',
              overflow: 'hidden',
              borderRadius: 4,
              margin: deviceType === 'mobile' ? '0 16px' : '',
              // fontFamily: 'Bebas Neue',
            }}
          >
            <div
              style={{
                width: 1200,
                maxWidth: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {' '}
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontFamily: 'Inter',
                }}
              >
                Cookie Policy
              </Typography>
              <Close
                sx={{
                  cursor: 'pointer',
                }}
                onClick={closeModal}
              />
            </div>

            <div
              style={{
                overflow: 'auto',
                height: '72vh',
                paddingBottom:'100px'
              }}
            >
              <CookiePolicy />
              <WhatIsCookie />
              <TypesOfCookies />
              <NecessaryCookies />
              <CookiePreferences />
              <AnalyticsCookie />
              <TableCookie />
              <SettingCookiePreference />
              <ThirdPartyCookie />
              <RetentionOfCookies />
              <MoreInfo privacyPolicyLink={privacyPolicyLink}/>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default memo(CookiesPolicyModal);
