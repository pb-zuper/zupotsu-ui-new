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
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import React, { useEffect, useRef, useState } from 'react';
import { Close, ArrowBack, } from '@mui/icons-material';
import ZupotsuTextfield from '../../Components/Settings/ZupotsuTextfield';
import ZupotsuDropdown from '../zupotsu-dropdown/zupotsu-dropdown';
import { documentUpload, TickCircleGreen } from '../../assets';
import ZupotsuButton from '../zupotsu-button/zupotsu-button';
import Apis from '../../services/apis';
import useDeviceType from '../../utils/DeviceType';
import { validateEmail } from '../../utils/validateTextfieldValue';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';




export function ZoputsuGetInTouch1({ showZoputsuGetInTouchPopup, page, closePopup }: any) {
  const [uploadDocument, setUploadDocument] = React.useState<any>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [firstName, setFirstName] = useState(localStorage.getItem("name") || "")
  const [emailAddress, setEmailAddress] = useState(localStorage.getItem("email") || "")
  const [organisationName, setOrganisationName] = useState(localStorage.getItem("org") || "")
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("mobile") || "")
  const [aboutYourself, setAboutYourSelf] = useState('')
  const [allsports, setAllSports] = useState([])
  const [fileData, setFileData] = React.useState<any>([]);
  const userFromLocal = localStorage.getItem("role")?.toLowerCase();
  const isItAdmin = (userFromLocal === "admin") ? true : false;
  const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
  const isApprover = (userFromLocal === "approver") ? true : false;
  const isPublisher = (userFromLocal === "publisher") ? true : false;
  const isSeller = (userFromLocal === "seller") ? true : false;
  const isBuyer = (userFromLocal === "buyer") ? true : false;
  const [typeofhelp, setTypeofHelp] = useState("")
  const [isMobileValid, setIsMobileValid] = useState(true);
  const phoneNumberRegex = /^\d{10}$/;
  const [load, setLoad] = useState<any>(false)
  const [showpopup, setshowPopup] = useState<any>(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const deviceType = useDeviceType()
  const apis = new Apis();
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
  const handleFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      const file = e.target.files[0]
      const fileSizeInMB = file.size / 1024 / 1024;
      // if (file.type === 'application/pdf') {
      if (fileSizeInMB <= 5) {
        try {
          const res = await apis.getS3URL(file);
          setFileData(res.data.data[0])
          setSnackbar({
            open: true,
            severity: 'success',
            message: 'File uploaded successfully',
          });
          setUploadDocument(fileName);
        } catch (error: any) {
          setSnackbar({
            open: true,
            severity: 'error',
            message: (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
          });
        }
      }
      else {
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Please upload file less then 5 MB',
        });
      }
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: deviceType == "mobile" ? "80%" : "60%",
    height: "80%",
    // maxHeight:"80%",
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 8,
    borderRadius: "8px",
    p: 0,
  };


  const userId: any = localStorage.getItem("userID")
  const login: boolean = localStorage.getItem("accessToken") ? true : false

  const handleEnquiry = async () => {
    setLoad(true);
    const body: any = {
      "requirement": aboutYourself,
      "requirement_doc": fileData?.length > 0 ? fileData : null,
      "user_id": parseInt(userId) || null,
      "name": firstName,
      "email": emailAddress,
      "mobile": phoneNumber,
      "organization": organisationName,
      "help_type": typeofhelp,
      "source": "website"
    };

    try {
      const response = await apis.postEnquiry(body);
      if (response.data?.status === "success") {
        const contactFormData = {
          SourcePage: page,
          NatureofRequest: typeofhelp
        };

        mixpanelEvents.onSubmitContactForm(contactFormData);
        setAboutYourSelf('');
        setFileData(null);
        setFirstName('');
        setEmailAddress('');
        setPhoneNumber('');
        setOrganisationName('');
        setTypeofHelp('');
        setshowPopup(true);

      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        severity: 'error',
      });
      mixpanelEvents.errorHandling({
        name: 'SubmitContactForm',
        msg: error?.response?.data?.error || error?.message
      })
    } finally {
      setLoad(false);

    }

  };

  return (
    <Modal
      open={showZoputsuGetInTouchPopup}
      onClose={() => { setshowPopup(false); closePopup() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Box sx={{
          width: "100%",
          height: "90%",
          display: 'flex',
          flexDirection: "column",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
          justifyContent: "space-between",
        }} >
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
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            justifyContent: "space-between",
            alignItems: 'center'
          }} >
            <p style={{
              fontFamily: "Inter",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: "21px",
              textAlign: "left",
              padding: 0,
              margin: 0,
              color: "rgba(51, 51, 51, 1)"
            }}>
              Request For Help
            </p>

            <Close
              sx={{
                cursor: 'pointer',
              }}
              onClick={() => { setshowPopup(false); closePopup() }}
            />
          </Box>




          {(!showpopup) ? (
            <Box sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
              width: '100%',
              height: '90%',
              overflowY: 'scroll',
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
                  placeholder={"First Name"}
                  value={firstName}
                  previewMode={localStorage.getItem("name") ? true : false}
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
                  previewMode={localStorage.getItem("email") ? true : false}
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
                  placeholder={"Organisation name"}
                  value={organisationName}
                  type={"text"}
                  previewMode={localStorage.getItem("org") ? true : false}
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
                  previewMode={localStorage.getItem("mobile") ? true : false}
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

                {(isSeller || isSellerAdmin) ? (<ZupotsuDropdown
                  title="Select nature of request"
                  placeholder={"Nature of request"}
                  value={typeofhelp}
                  name={"typeofhelp"}
                  isRequired={true}
                  dropdownData={["I need help listing an asset", "I have a general question", "I have listed an asset but don't see it on the catalogue", "I need some technical support"]}
                  handleChange={(event: any) => {
                    setTypeofHelp(event.target.value)
                  }}
                />) : (isBuyer) ? (
                  <ZupotsuDropdown
                    title="Select nature of request"
                    placeholder={"Nature of request"}
                    value={typeofhelp}
                    name={"typeofhelp"}
                    isRequired={true}
                    dropdownData={["I am interested in a specific asset/ opportunity", "An asset/ opportunity that I am interested in is not listed", "I would like a recommendation from Zupotsu for my marketing needs", "I have a general question", "I need some technical support"]}
                    handleChange={(event: any) => {
                      setTypeofHelp(event.target.value)
                    }}
                  />) : (
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
                )}
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
                  placeholder={"Enter your requirement"}
                  value={aboutYourself}
                  type={"text"}
                  name={"Tell us about your requirement"}
                  multiline={true}
                  rows={3}
                  handleChange={(event: any) => {
                    setAboutYourSelf(event.target.value)
                  }}
                />
              </Box>

              {(login) && (<Box sx={{
                width: "100%",
                display: 'flex',
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: '10px',
                padding: "8px 16px 8px 16px",
                marginTop: '0px'
              }} >

                <Typography
                  style={{
                    marginBottom: '0px',
                    color: 'var(--Gray-1, #333)',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    lineHeight: '140%',
                    display: 'flex',
                    flexDirection: 'column',
                    fontWeight: '600'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        fontStyle: 'Inter',
                        fontWeight: '600',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          lineHeight: "21px",
                          fontStyle: 'Inter',
                          fontWeight: '700',
                        }}
                      >{"Upload Document"}</span>


                    </div>

                  </div>

                </Typography>

                <TextField
                  rows={1}
                  size="small"
                  placeholder={"Browse"}
                  fullWidth
                  value={uploadDocument}
                  disabled={false}
                  name={'uploaddocument'}
                  id="fullWidth"
                  onClick={handleBrowseClick}
                  sx={{
                    color: "#000",
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <img
                          src={documentUpload}
                          alt=""
                          style={{
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                          }}
                        />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none', cursor: 'pointer', }}
                  onChange={handleFileChange}
                />
              </Box>)}
            </Box>
          ) : (
            <Box sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px', gap: '20px', width: '100%',
              height: '90%',
            }}>
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
        </Box>
        {/* {(load) && (<div className="centered-container" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}>
          <div className="loader"></div>
        </div>)} */}


        <Box sx={{
          width: "100%",
          height: "10%",
          display: 'flex',
          flexDirection: "row",
          alignItems: 'center',
          padding: "8px 16px 8px 16px",
          justifyContent: "center",
          marginTop: '0px',
        }} >
          {(!showpopup) ? (
            <ZupotsuButton
              name={"Submit"}
              disabled={(firstName && emailAddress && organisationName && phoneNumber && typeofhelp) ? false : true}
              variant={'contained'}
              padding={"10px 40px"}
              load={load}
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
          ) : (<ZupotsuButton
            name={"Okay"}
            variant={'contained'}
            load={load}
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
                setshowPopup(false);
                closePopup()

              }
            }
          />
          )}
        </Box>


      </Box>
    </Modal>
  );
};
export default ZoputsuGetInTouch1;
