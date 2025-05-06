import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import { Circle } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { memo } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
import Close from '@mui/icons-material/Close';
import useDeviceType from '../../utils/DeviceType';
// const useStyles = makeStyles(() => ({
//   closeButton: {
//     borderRadius: '20px',
//     backgroundColor: '#e20b18',
//     '&:hover': {
//       backgroundColor: '#b00711', // Change this to the desired hover color
//     },
//   },
//   modalHeader: {
//     fontFamily: 'Bebas Neue',
//   },
//   modalContent: {

//   },
// }));

const PrivacyPolicyPage = ({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
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
        margin: deviceType === 'mobile' ? '0 16px' : '',
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
              fontFamily: 'Inter',
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
                Privacy Policy
              </Typography>
              <Close
                sx={{
                  cursor: 'pointer',
                }}
                onClick={closeModal}
              />
            </div>

            <Typography
              paragraph
              gutterBottom
              sx={{
                overflow: 'auto',
                height: deviceType === 'mobile' ? '70vh' : '70vh',
                fontFamily: 'Inter',
                paddingBottom:'50px'
              }}
            >
              We deeply value your trust in our website. Below, we outline our
              privacy policy. By using our site, you consent to the terms
              described herein.
              <br />
              <br />
              Our goal is to facilitate advertisers in discovering global
              marketing assets easily. We showcase various marketing
              opportunities and media owner details, primarily through official
              tie-ups. At times, we also list media owner details based on
              publicly available information from their sites. This aims to
              assist them in attracting more sales from the numerous advertisers
              visiting our platform. We strive for noble intentions and seek
              partners who appreciate the value we bring to advertisers and
              media owners. To enhance our business decisions, we utilize Google
              Analytics for aggregated data insights. This data includes visitor
              count, unique visits, page views, browsing duration, user
              locations, viewed pages, and browser details, ensuring individual
              anonymity.
              <br />
              <br />
              For users subscribing to our newsletters, we request their email
              addresses solely for sending new media updates or relevant
              notifications. We do not indulge in excessive alerts and
              prioritize meaningful communication. We maintain strict
              confidentiality and refrain from selling or sharing any personal
              contact information for commercial purposes. Our website employs
              cookies to enhance browsing experiences without storing personally
              identifiable data. Both temporary and permanent cookies are used,
              promoting a fruitful browsing journey without posing any harm or
              risk.
              <br />
              <br />
              IP Infringement:
              <br />
              If you suspect a violation of your intellectual property rights or
              misrepresentation of information on Zupotsu, please report it to
              Care@Zupotsu.com. Kindly allow us 3 working days to address the
              concern. To expedite resolution, please include the following in
              your email:
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Circle fontSize="small" />
                  </ListItemIcon>
                  <Typography>
                    Identification or description of the infringed copyrighted
                    work/trademark
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Circle fontSize="small" />
                  </ListItemIcon>
                  <Typography>Details of misrepresented data</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Circle fontSize="small" />
                  </ListItemIcon>
                  <Typography>Desired changes</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Circle fontSize="small" />
                  </ListItemIcon>
                  <Typography>Contact name and number</Typography>
                </ListItem>
              </List>
            </Typography>
            {/* <div
              style={{
                textAlign: 'center',
                width: '100%',
              }}
            >
              <Button
                variant="contained"
                onClick={closeModal}
                sx={{
                  borderRadius: '20px',
                  backgroundColor: '#e20b18',
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: '#b00711', // Change this to the desired hover color
                  },
                }}
                // className={classes.closeButton}
              >
                Close
              </Button>
            </div> */}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default memo(PrivacyPolicyPage);
