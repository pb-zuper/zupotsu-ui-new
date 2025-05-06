import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Modal,
  TextField,
  Typography,
  InputAdornment,
  Snackbar
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ZupotsuTextfield from '../Components/Settings/ZupotsuTextfield';
import ZupotsuDropdown from '../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import { documentUpload, TickCircleGreen } from '../assets'
import ZupotsuButton from '../Atoms/zupotsu-button/zupotsu-button';
import Apis from '../services/apis';
import useDeviceType from '../utils/DeviceType';
import ZoptsuUnderlineTitle from '../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
import { validateEmail } from '../utils/validateTextfieldValue';
import MuiAlert, { AlertColor } from '@mui/material/Alert';



export function Contactus({ showZoputsuGetInTouchPopup, closePopup }: any) {
  const [uploadDocument, setUploadDocument] = React.useState<any>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [firstName, setFirstName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [organisationName, setOrganisationName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [aboutYourself, setAboutYourSelf] = useState('')
  // const [fileData, setFileData] = React.useState<any>([]);
  const [typeofhelp, setTypeofHelp] = useState("")
  const [load, setLoad] = useState<any>(false)
  const [allsports, setAllSports] = useState([])
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com$|yahoo\.com$|hotmail\.com$|outlook\.com$|live\.com$|aol\.com$|icloud\.com$)/;
  const emailRegexx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showpopup, setshowPopup] = useState<any>(false)
  const [otherOrg, setotherOrg] = useState(false)

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const deviceType = useDeviceType()
  const apis = new Apis();
  const [isMobileValid, setIsMobileValid] = useState(true);
  const phoneNumberRegex = /^\d{10}$/;


  useEffect(() => {
    apis.getAllPrimaryAttributesSports()
      .then((response: any) => {
        if (response?.data?.status === "success") {
          const fetchedArray = response.data.data || [];
          const sports = fetchedArray.filter((item: any) => item?.toLowerCase() !== "all")
          setAllSports(sports || [])
        }
      })
      .catch((error: any) => {

      });
  }, []);

  // const handleFileChange = async (e: any) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const fileName = e.target.files[0].name;
  //     const file = e.target.files[0]
  //     if (file.type === 'application/pdf') {
  //       try {
  //         const res = await apis.getS3URL(file);
  //         setFileData(res.data.data[0])
  //         setSnackbar({
  //           open: true,
  //           severity: 'success',
  //           message: 'File uploaded successfully',
  //         });
  //       } catch (error: any) {
  //         setSnackbar({
  //           open: true,
  //           severity: 'error',
  //           message: (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
  //         });
  //       }
  //     } else {
  //       setSnackbar({
  //         open: true,
  //         severity: 'error',
  //         message: 'Please upload a valid PDF file',
  //       });
  //       setLoad(false)
  //     }
  //     setUploadDocument(fileName);

  //   }
  // };

  // const handleBrowseClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  // const userId: any = localStorage.getItem("userID")
  const login: boolean = localStorage.getItem("accessToken") ? true : false

  function isPopularEmail(email: any) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com$|yahoo\.com$|hotmail\.com$|outlook\.com$|live\.com$|aol\.com$|icloud\.com$)/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    setotherOrg(isPopularEmail(emailAddress))
  }, [emailAddress])

  const handleEnquiry = async () => {
    setLoad(true);
    const body: any = {
      "requirement": aboutYourself,
      // "requirement_doc": fileData?.length > 0 ? fileData : null,
      // "user_id": parseInt(userId) || null,
      "name": firstName,
      "email": emailAddress,
      "mobile": phoneNumber,
      "organization": organisationName,
      "help_type": typeofhelp,
      "source": "website",
      "other_org": otherOrg,
    };

    try {
      const response = await apis.postEnquiry(body);
      if (response.data?.status === "success") {
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'Sent successfully',
        });
        setFirstName('');
        setEmailAddress('');
        setOrganisationName('');
        setPhoneNumber('');
        setTypeofHelp('');
        setAboutYourSelf('');
        setshowPopup(true)
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        severity: 'error',
      });
    } finally {
      setLoad(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbar.severity as AlertColor}
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
        <Box sx={{
          width: "100%",
          height: "auto",
          display: 'flex',
          flexDirection: "row",
          padding: "16px",
          marginTop: "20px",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
          justifyContent: "space-between",
        }} >
          {/* <p style={{
              fontFamily: "Inter",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "21px",
              textAlign: "left",
              padding: 0,
              margin: 0,
              color: "rgba(51, 51, 51, 1)"
            }}>
              Request For Help
            </p> */}
          <ZoptsuUnderlineTitle
            fontSizeOnLargeScreen="48px"
            fontSizeOnMediumScreen="46px"
            fontSizeOnSmallScreen="44px"
            fontSizeOnExtraSmallScreen="37px"
            titleText={"Request For Help"}
            letterSpacing="1.92px"
            lineHeight="40.2px"
            textAlign="start"
            underlineWidthForDesktop="100%"
            underlineWidthForSmallTablet="100%"
            underlineWidthForMobile="100%"
            underlineBottomForDesktop="18%"
            underlineBottomForSmallTablet="21%"
            underlineBottomForMobile="24%"
            // linearGradientPresent={true}
            paddingLeft="0px"
            underlineHeight="9px"
          />
        </Box>
        {!showpopup && (<Box sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
          width: '100%',
          height: '100%',
          overflowY: 'scroll',
          // overflowX: 'hidden',
          scrollbarWidth: 0,
          padding: '10px'
        }} >



          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: deviceType == "mobile" ? "column" : "row",
            justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
            gap: '10px',
            padding: "8px 16px 8px 16px",
            marginTop: '0px'
          }} >
            <ZupotsuTextfield
              title="Full Name"
              isRequired={true}
              placeholder={"Enter your Name"}
              value={firstName}
              type={"text"}
              name={"firstname"}
              multiline={false}
              handleChange={(event: any) => {
                setFirstName(event.target.value)
              }}
            />

            <ZupotsuTextfield
              title="Email Address"
              isRequired={true}
              placeholder={"Enter your email"}
              value={emailAddress}
              errorMessage={
                emailAddress ? (
                  // !emailRegex.test(email)
                  !validateEmail(emailAddress)
                    ? 'Please enter a valid mail. E.g. name@company.com'
                    : '') : ""
              }
              type={"text"}
              name={"email"}
              multiline={false}
              handleChange={(event: any) => {
                setEmailAddress(event.target.value)
              }}
            />
          </Box>

          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: deviceType == "mobile" ? "column" : "row",
            justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
            gap: '10px',
            padding: "8px 16px 8px 16px",
            marginTop: '0px'
          }} >
            <ZupotsuTextfield
              title="Organisation Name"
              isRequired={true}
              placeholder={"Enter Organisation name"}
              value={organisationName}
              type={"text"}
              name={"organisationname"}
              handleChange={(event: any) => {
                setOrganisationName(event.target.value)
              }}
            />
            <ZupotsuTextfield
              title="Phone"
              isRequired={true}
              placeholder={"Enter Phone Number"}
              value={phoneNumber}
              errorMessage={
                !isMobileValid ? 'Mobile number should be 10 digits long' : ''
              }
              type={"tel"}
              maxLength={10}
              name={"phone"}
              handleChange={(event: any) => {
                setPhoneNumber(event.target.value)
                setIsMobileValid(phoneNumberRegex.test(event.target.value));
              }}
            />
          </Box>
          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: deviceType == "mobile" ? "column" : "row",
            justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
            gap: '10px',
            padding: "8px 16px 8px 16px",
            marginTop: '0px'
          }} >
            <ZupotsuDropdown
              title="Select nature of request"
              placeholder={"Nature of request"}
              value={typeofhelp}
              name={"typeofhelp"}
              isRequired={true}
              dropdownData={["I want help to list my asset on the platform", "I have a general question", "I have listed an asset but don't see it on the catalogue", "I need some technical support	", "I am interested in a specific asset/ opportunity", "An asset/ opportunity that I am interested in is not listed", "I would like a recommendation from Zupotsu for my marketing needs"]}
              handleChange={(event: any) => {
                setTypeofHelp(event.target.value)
              }}
            />
          </Box>

          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: "row",
            justifyContent: "space-between",
            gap: '10px',
            padding: "8px 16px 8px 16px",
            marginTop: '0px'
          }} >
            <ZupotsuTextfield
              title="Tell us about your requirement"
              placeholder={"Enter your Requirements"}
              value={aboutYourself}
              type={"text"}
              name={"Tell us about your requirement"}
              multiline={true}
              rows={5}
              handleChange={(event: any) => {
                setAboutYourSelf(event.target.value)
              }}
            />
          </Box>


        </Box>)}

        {showpopup && (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '30px', gap: '20px', marginTop: '50px' }}>
            <img src={TickCircleGreen} style={{ width: '50px', height: '50px', color: "green" }} />
            <p style={{
              fontSize: '18px',
              lineHeight: "21px",
              fontStyle: 'Inter',
              fontWeight: '700',
              textAlign: "center"
            }}>Thank you for reaching out. You will hear back from us within the next two working days.</p>
          </Box>
        )}

        {showpopup && (<Box sx={{
          width: "100%",
          height: "auto",
          display: 'flex',
          flexDirection: "row",
          alignItems: 'center',
          padding: "8px 16px 8px 16px",
          // borderTop: "1px solid rgba(224, 224, 224, 1)",
          justifyContent: "center",
          marginTop: '0px',
          // boxShadow: " 0px 0px 14px 0px rgba(0, 0, 0, 0.07)"
        }} >
          <ZupotsuButton
            name={"Okay"}
            variant={'contained'}
            padding={"10px 40px"}
            isCustomColors={true}
            customOutlineColor="1px solid transparent"
            customOutlineColorOnHover="1px solid transparent"
            customBgColorOnhover="#E20B18"
            customBgColor={"#E20B18"}
            customTextColorOnHover="#FFF"
            customTextColor="#FFF"
            handleClick={
              () => {
                setshowPopup(false)
              }
            }
          />
        </Box>)}

        {!showpopup && (<Box sx={{
          width: "100%",
          height: "auto",
          display: 'flex',
          flexDirection: "row",
          alignItems: 'center',
          padding: "8px 16px 8px 16px",
          // borderTop: "1px solid rgba(224, 224, 224, 1)",
          justifyContent: "center",
          marginTop: '0px',
          // boxShadow: " 0px 0px 14px 0px rgba(0, 0, 0, 0.07)"
        }} >
          <ZupotsuButton
            name={"Submit"}
            variant={'contained'}
            padding={"10px 40px"}
            isCustomColors={true}
            customOutlineColor="1px solid transparent"
            customOutlineColorOnHover="1px solid transparent"
            customBgColorOnhover="#E20B18"
            customBgColor={(firstName && emailAddress && organisationName && phoneNumber && typeofhelp) ? "#E20B18" : "rgba(255,1,1,0.4)"}
            customTextColorOnHover="#FFF"
            customTextColor="#FFF"
            handleClick={
              () => {
                if (firstName && emailAddress && organisationName && phoneNumber && typeofhelp) {
                  handleEnquiry()
                } else {
                  setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Please fill all mandatory fields',
                  });
                }
              }
            }
          />
        </Box>)}

      </Box>
    </div>

  );
};
export default Contactus;
