import {
  Checkbox,
  CheckboxProps,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Step,
  StepConnector,
  StepConnectorProps,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
  stepConnectorClasses,
  styled,
  useTheme,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import ZupotsuTextfield from '../../Atoms/zupotsu-textfields/zupotsu-textfields';
import CheckIcon from '@mui/icons-material/Check';
import Backdrop from '@mui/material/Backdrop';
import { Box } from '@mui/system';
import {
  arrowRightBanner,
  facebookIcon,
  infoCircle,
  Instag,
  instagramIcon,
  successTikIcon,
  twitter,
  TwitterIcon,
  verifyIcon,
  youtube,
  YoutubeIcon
} from '../../assets';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import './zupotsu-login.css';
import WestIcon from '@mui/icons-material/West';
import ZupotsuRadioButton from './zupotsu-radio-button/zupotsu-radio-button';
import useDeviceType from '../../utils/DeviceType';
import ZupotsuMultiSelect from '../zupotsu-multiselect/zupotsu-multiselect';
import Apis from '../../services/apis';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { ZupotsuAutoComplete } from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateFacebookUrl, validateInstagramUrl, validateTwitterUrl, validateXUrl, validateYouTubeUrl } from '../../utils/validateTextfieldValue';
import ZupotsuDropdown from '../zupotsu-dropdown/zupotsu-dropdown';
import twitterx from '../../assets/twitterx.png'
import CookiesPolicyModal from '../../Molecules/zoptsu-footer/CookiesPolicyModal';
import Termsandservices from '../../Container/Termsandservices';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import mixpanel from 'mixpanel-browser';
import Loader from '../../loader/Loader';
import CountryRules from '../countryRules'


interface CustomStepConnectorProps extends StepConnectorProps {
  deviceType: string;
}

const ColorlibConnector = styled((props: CustomStepConnectorProps) => {
  const { deviceType, ...rest } = props;
  const theme = useTheme();

  return <StepConnector {...rest} />;
})(({ theme, deviceType }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: deviceType === 'mobile' ? 19 : 19,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: 'red',
      height: 2,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: 'red',
      height: 2,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    width: deviceType === 'mobile' ? '100%' : '100%',
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean; deviceType: string };
}>(({ theme, ownerState }) => ({
  // backgroundColor:
  //   theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  border: '2px solid #ccc',
  color: 'black',
  width: ownerState?.deviceType === 'mobile' ? 38 : 40,
  height: ownerState?.deviceType === 'mobile' ? 38 : 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Inter',
  fontSize: ownerState?.deviceType === 'mobile' ? '14px' : '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  ...(ownerState.active && {
    color: 'red',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#FFF',

    border: '2px solid red',
  }),
  ...(ownerState.completed && {
    backgroundColor: 'red',
    border: '2px solid red',
  }),
}));

function ColorlibStepIcon(props: any) {
  const { active, completed, className, deviceType } = props;

  const icons: { [key: string]: React.ReactNode } = {
    1: 1,
    2: 2,
    3: 3,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active, deviceType }}
      className={className}
    >
      {completed ? <img src={verifyIcon} alt="" /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
const rules = CountryRules();

export function ZupotsuLogin({ setSortAssets }: any) {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const deviceType = useDeviceType()
  const [selectedValue, setSelectedValue] = useState('buyer');
  const [afterRegOtpVerificationScreen, setAfterRegOtpVerScreen] = useState(true);
  const [fbLink, setFbLink] = useState('');
  const [instaLink, setInstaLink] = useState('');
  const [youtubeLink, setYoutube] = useState('');
  const [twitterLink, setTwitter] = useState('');
  const [selectedSport, setSelectedSport] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const phoneNumberRegex = /^\d{10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com$|yahoo\.com$|hotmail\.com$|outlook\.com$|live\.com$|aol\.com$|icloud\.com$)/;
  const emailRegexx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isNameValid, setNameValid] = useState(true);
  const [isOrganisationValid, setOrganisationValid] = useState(true);
  const [isFbLinkValid, setFbLinkValid] = useState(true);
  const [isInstaLinkValid, setInstaLinkValid] = useState(true);
  const [timer, setTimer] = useState(60);
  const [loader, setLoader] = useState(true)
  const [timerStart, setTimerStart] = useState(false)
  const [allSports, setAllSports] = useState([])
  const [isEmailDisabled, setIsEmailDisabled] = useState(false)
  const [countryData, setCountryData] = useState([])
  const [countries, setCountries] = useState([])
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@$])(?=.*\d)[a-zA-Z!#@$0-9]{8,}$/;
  const [isOtp, setIsOtp] = useState<any>(false);
  const [currencies, setCurrencies] = useState([])
  const [preferredCurrency, setPreferredCurrency] = useState("INR");
  const [otherOrg, setotherOrg] = useState(false)
  const [attemptsTaken, setAttemptsTaken] = useState(0);
  const [shown, setShown] = useState(false);
  const [CountryRules, setCountryRules] = useState(rules || [])
  const [CountryCode, setCountryCode] = useState("")
  const [ccmsg, setccmsg] = useState<any>()
  const [max, setMax] = useState<number>(0)
  let arr: any = []
  rules.map((item: any) => {
    arr.push(item.label + " (+" + item.phone + ")")
  })
  const [ccodes, setccodes] = useState(arr || [])



  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const apis = new Apis();
  const [openCookiePolicy, setCookiePolicyOpen] = useState(false);
  const closeCookiePolicy = () => {
    setCookiePolicyOpen(false);
  };
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const emailfromUrl: any = url.searchParams.get('email');
  useEffect(() => {
    setLoader(true)
    // setEmail(emailfromUrl)
    if (emailfromUrl) {
      setEmail(emailfromUrl)
      setIsEmailDisabled(true)
    }
    // setLoader(false)
  }, [])

  const TimerFunction = () => {
    const timerId = setInterval(() => {

      setTimer(prevTimer => {
        if (activeStep == 2) {
          if (prevTimer <= 1) {
            clearInterval(timerId);
            return 0;
          }
        }
        return prevTimer - 1;

      });

    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }

  useEffect(() => {

    if (activeStep == 2) {
      TimerFunction()
    }

  }, [timerStart, activeStep]);

  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));
  const navigate = useNavigate()

  const msg = `<span>Seller<br/>- Verify that the location matches the address specified<br/>-  Reference street signs, phone app to confirm correct location</span>`;
  const optstyle: any = {
    width: "50px",
    height: "55px",
    borderRadius: "6px",
    border: " 0.8px",
    borderStyle: 'solid',
    textAlign: 'center',

  }
  const radioButtonsData = [
    {
      id: 'buyer',
      label: 'Buyer (Brands / Marketers / Agencies)',
      hintTitle: 'Buyer',
      hintSubtitle:
        'Any Brand, Agency or Individual who are looking to associate with anything related to sports for their business',
    },
    {
      id: 'seller',
      label: 'Seller (Athletes / Organizers / Agents)',
      hintTitle: 'Seller',
      hintSubtitle:
        'Anyone (institution or individual) managing sporting activities, teams or players, and seeking monetization opportunities',
    },
  ];

  const steps = ['1', '2', '3'];

  const validatePhoneNumber = (countryCode: any, phoneNumber: any) => {
    if (!countryCode && !phoneNumber) {
      return { valid: false, error: "" };
    }

    if (!countryCode) {
      return { valid: false, error: "Please Select the Country Code" };
    }

    if (!phoneNumber) {
      return { valid: false, error: "" };
    }
    const country = CountryRules.find(c => c.code === countryCode);

    if (!country) {
      return { valid: false, error: "Invalid country code." };
    }

    const { phoneLength, min, max } = country;

    const phoneLen = phoneNumber.length;

    // Check against phoneLength (if array or single value)
    if (Array.isArray(phoneLength) && !phoneLength.includes(phoneLen)) {
      return { valid: false, error: "Invalid mobile number for this country." };
    }
    if (!Array.isArray(phoneLength) && phoneLength && phoneLen !== phoneLength) {
      return { valid: false, error: "Invalid mobile number for this country." };
    }

    // Check against min and max (if defined)
    if (min && phoneLen < min) {
      return { valid: false, error: `Phone number too short (min ${min}).` };
    }
    if (max && phoneLen > max) {
      return { valid: false, error: `Phone number too long (max ${max}).` };
    }

    return { valid: true };
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const fetchCurrency = async () => {
    setLoader(true);
    try {
      const assetsResponse = await apis.getCurrency();
      const curr: any = []
      if (assetsResponse?.data?.status?.toLowerCase() == "success") {
        assetsResponse?.data?.data?.map((item: any, index: any) => {
          curr.push(item?.name)
        })
        setCurrencies(curr)
      }

    } catch (error) {
      console.log("Error fetching assets or media:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCurrency()
  }, [])

  const handleStepper = () => {

    if (activeStep == 0) {
      if (emailRegexx.test(email)) {
        //   setIsEmailValid(emailRegex.test(email));
        //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // }
        // if (!validateEmail(email)) {
        // setIsEmailValid(validateEmail(email));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      else {
        setIsEmailValid(false)
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

  }


  const handleKeyDown = (e: any, index: number) => {
    if (e.key == "Backspace" && index >= 0
      // && !otp[index]
    ) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        if (
          // !otp[index] &&
          index >= 0) {
          inputRefs.current[index - 1]?.focus();
        }
        newOtp[index] = "";
        return newOtp;
      });
    }
  };



  const handleOtpFieldChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]!.focus();
    }
  };


  useEffect(() => {
    setLoader(true);
    apis.getAllPrimaryAttributesSports()
      .then((response: any) => {
        if (response?.data?.status === "success") {
          const fetchedArray = response.data.data || [];
          // const sortedArray = [...fetchedArray].sort((a, b) => a.priority - b.priority);
          // const sports = sortedArray.filter(item => item?.attribute_name?.toLowerCase() == "sport")
          const sports = fetchedArray.filter((item: any) => item?.toLowerCase() !== "all")
          setAllSports(sports || [])
        }


      })
      .catch((error: any) => {
        setLoader(false);
        // setSnackbar({
        //   open: true,
        //   severity: 'error',
        //   message: ((error?.response?.data?.error?.includes('prisma')) ? 'something went wrong!!' : error?.response?.data?.error),
        // });
      });
  }, []);



  useEffect(() => {
    setLoader(true);
    apis.getCountries()
      .then((response: any) => {
        const countriesArray: any = response?.data?.data || [];
        setCountryData(countriesArray);

        const countryarr = countriesArray.map((country: any) => country?.country);
        setCountries(countryarr)


        // setLoader(false);
      })
      .catch((error) => {
        // setLoader(false);
        console.log(error);
      });
  }, []);

  const [cities, setCities] = useState([])

  useEffect(() => {
    const citiesData: any = countryData?.filter((country: any) => country.country?.toLowerCase() === selectedCountry?.toLowerCase());
    setCities(citiesData[0]?.cities)
  }, [selectedCountry])





  const allOtpPositionsFilled = otp?.every(value => value !== '');

  const criteria = [
    {
      label: 'Password length must be minimum 8 characters.',
      regex: /.{8,}/,
    },
    {
      label: 'At least one lowercase letter (a-z) is required.',
      regex: /(?=.*[a-z])/,
    },
    {
      label: 'At least one uppercase letter (A-Z) is required.',
      regex: /(?=.*[A-Z])/,
    },
    {
      label: 'At least one special character (!#@$) is required.',
      regex: /(?=.*[!#@$])/,
    },
    {
      label: 'At least one number (0-9) is required.',
      regex: /(?=.*\d)/,
    },
  ];




  const isValid: any = (regex: any) => regex.test(password);
  const isAllSelected =
    allSports.length > 0 && selectedSport.length === allSports.length;

  const handleOTPRequest = () => {
    setLoader(true)
    const body = {
      "name": name,
      "otpfor": email,
      "type": "register"
    }
    apis.getOTP(body)
      .then((response: any) => {
        if (response.data) {
          if (response.data?.status == "success") {
            setActiveStep(activeStep + 1)
            setTimer(60)
            setSnackbar({
              open: true,
              message: 'OTP Sent Successfully',
              severity: 'success',
            });
          }
        }
        setLoader(false)



      })
      .catch((error) => {

        setLoader(false)
        setSnackbar({
          open: true,
          message: error.response ? (error.response.data.error) : 'something went wrong',
          severity: 'error',
        });
      });
  }

  const handlesubmitOtp = () => {
    setLoader(true)
    let aTaken = attemptsTaken + 1
    setAttemptsTaken(prev => prev + 1);
    const filteredRules: any = CountryRules.filter((item: any) =>
      CountryCode?.includes(item.label)
    );

    const registerObject = {
      "usertype": selectedValue,
      "name": name,
      "email": email,
      "mobile": `+${filteredRules[0].phone} ${mobileNo}`,
      "password": password,
      "user_org": organisation,
      "preferred_currency": preferredCurrency,
      "sports_interested": selectedSport?.filter((item: any, index: any) => item?.toLowerCase() !== "all"),
      // "location": selectedLocation,
      "other_org": otherOrg,
      "city": selectedCity,
      "country": selectedCountry,
      "otp": otp?.join(''),
      "social_media":
        [
          {
            "social_media_platform": "facebook",
            "url": fbLink
          },
          {
            "social_media_platform": "instagram",
            "url": instaLink
          },
          {
            "social_media_platform": "youtube",
            "url": youtubeLink
          },
          {
            "social_media_platform": "x",
            "url": twitterLink
          },

        ]
    }

    apis.doRegister(registerObject)
      .then((response: any) => {
        if (response?.data) {
          if (response?.data?.status == "success") {
            setActiveStep(activeStep + 1)
          }
          // localStorage.setItem('timer', response?.data?.access_token);
          localStorage.clear()
          localStorage.setItem("userID", response.data.data.id)
          localStorage.setItem("orgID", response.data.data.organization_id)
          localStorage.setItem("org", response.data.data.organization.name)
          localStorage.setItem("accessToken", response.data.data.access_token)
          localStorage.setItem("role", response.data.data.userroles[0].role.name)
          localStorage.setItem("name", response.data.data.name)
          localStorage.setItem("mobile", response.data.data.mobile)
          localStorage.setItem("email", response.data.data.email)
          localStorage.setItem("preferred_currency", response.data.data.preferred_currency)
          localStorage.setItem("zohoId", response.data.data.zoho_id)
          localStorage.setItem("zohoOrgId", response.data.data.organization.zoho_id)
        }
        let userData = {
          phone: response.data.data.mobile,
          sportInterest: selectedSport?.filter((item: any, index: any) => item?.toLowerCase() !== "all"),
          type: response.data.data.userroles[0].role.name,
          attempts: aTaken,
        };
        // mixpanel.identify(response.data.data.email);
        mixpanel.reset();
        mixpanelEvents.setUserSuperProperties()
        mixpanelEvents.onRegComplete(userData);
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
        mixpanelEvents.errorHandling({
          name: 'RegComplete',
          msg: error?.response?.data?.error || error?.message
        })
        setSnackbar({
          open: true,
          message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
          severity: 'error',
        });
      });
  }


  const resendOtp = () => {
    setLoader(true)
    const body = {
      "name": name,
      "otpfor": email,
      "type": "register"
    }
    apis.getOTP(body)
      .then((res2: any) => {
        setIsOtp(true)
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'OTP Sent successfully',
        });
        setLoader(false)
        setTimerStart(!timerStart)
        setTimer(60)
        setOtp(Array(4).fill(''))
      })
      .catch((error) => {
        setLoader(false)
        setSnackbar({
          open: true,
          severity: 'error',
          message: error?.response?.data?.error || 'something went wrong!!',
        });
      });
  }

  function isPopularEmail(email: any) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com$|yahoo\.com$|hotmail\.com$|outlook\.com$|live\.com$|aol\.com$|icloud\.com$)/;
    return emailRegex.test(email);
  }


  useEffect(() => {
    setotherOrg(isPopularEmail(email))
  }, [email])




  const [open, setOpen] = useState(false);


  function getDomainName(email: any) {
    const domain = email.substring(email.lastIndexOf("@") + 1);
    const domainName = domain.split('.')[0];
    return domainName;
  }
  const [isTermsChecked, setIsTermsChecked] = useState<any>(false);
  const handleTermsChange = (event: any) => {
    setIsTermsChecked(event.target.checked);

  };




  return (
    <div style={{ width: '100%', display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
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

      {(loader) ? (<div style={{
        height: deviceType === 'mobile' ? '65vh' : '70vh',
        overflowY: 'auto',
        marginTop: '0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
      }}>

        <CircularProgress size="lg" sx={{ color: "#E12619", width: "100px" }}
          thickness={4}
          value={100}
        />
      </div>) : (<div style={{ width: '100%', display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
        <div
          style={{
            display: 'flex',
            justifyContent: (activeStep === 1 || activeStep === 2) ? 'space-between' : 'center',
            alignItems: 'center',
            marginTop: '0px',
            width: "100%"
          }}
        >
          {(activeStep === 1 || activeStep === 2) && (
            <WestIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                handleBack();
              }}
            />
          )}
          <Stack
            sx={{
              width: deviceType === 'mobile' ? '75%' : '50%',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              // alignItems: 'center',
            }}
            spacing={1}
          >
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector deviceType={deviceType} />}
            >
              {steps.map((label) => (
                <Step key={label} sx={{ width: '50%' }}>
                  <StepLabel
                    style={{
                      color: 'var(--Zupotso-Primary, #E20B18)',
                      textAlign: 'center',
                      fontFamily: 'Inter',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      lineHeight: 'normal',
                    }}
                    StepIconComponent={(stepIconProps) => (
                      <ColorlibStepIcon
                        {...stepIconProps}
                        deviceType={deviceType}
                      />
                    )}
                  ></StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
          {(activeStep === 1 || activeStep === 2) && <div style={{ color: 'white' }}></div>}
        </div>
        <div
          style={{
            height: deviceType === 'mobile' ? '65vh' : '70vh',
            overflowY: 'auto',
            marginTop: '0px',
            width: "100%"
          }}
        >
          {activeStep === 0 && (
            <div style={{ width: '100%' }}>


              <div style={{ paddingTop: '10px' }}>
                <ZupotsuTextfield
                  title="Email"
                  value={email?.toLowerCase()}
                  isRequired={true}
                  placeholder={
                    deviceType === 'mobile' ? 'Email' : 'Official Email'
                  }
                  previewMode={isEmailDisabled}
                  errorMessage={
                    email ? (
                      // !emailRegex.test(email)
                      !validateEmail(email)
                        ? 'Please enter a valid mail. E.g. name@company.com'
                        : '') : ""
                  }
                  handleChange={(e) => {
                    setEmail(e.target.value?.toLowerCase())
                  }}
                />
              </div>

              {!email?.toLowerCase().includes("zupotsu.com") && (<Typography
                style={{
                  marginBottom: '10px',
                  color: 'var(--Gray-1, #333)',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '140%',
                  textAlign: "left",
                  marginTop: '20px'
                }}
              >
                Would you like to register as?
              </Typography>)}
              {!email?.toLowerCase().includes("zupotsu.com") && (<div
                style={{
                  display: deviceType == "mobile" ? "flex" : 'flex',
                  // gridTemplateColumns: 'auto auto',
                  width: '100%',
                  gridGap: deviceType == "mobile" ? "0px" : '0px',
                  marginBottom: deviceType == "mobile" ? "0px" : '10px',
                  flexDirection:
                    // deviceType == "mobile" ? "column" :
                    'column',
                  alignItems: 'center',
                  gap: '10px',
                  justifyContent: 'space-evenly'
                }}
              >

                {radioButtonsData.map((data) => (

                  <ZupotsuRadioButton
                    key={data.id}
                    data={data}
                    selected={selectedValue}
                    isHintAvailable={true}
                    isfullwidth={true}
                    handleChange={(event) => {
                      setSelectedValue(event);
                    }}

                  />


                ))}

              </div>)}
              <div style={{ paddingTop: deviceType == "mobile" ? "20px" : '10px' }}>
                <ZupotsuTextfield
                  title="Name"
                  value={name}
                  placeholder="Name"
                  isRequired={true}
                  errorMessage={
                    !isNameValid
                      ? 'Name should contain only character value. E.g. Amit patil'
                      : ''
                  }
                  handleChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ paddingTop: '20px', display: 'flex', gap: '10px' }}>
                <div style={{ width: '40%' }}>
                  <ZupotsuAutoComplete
                    title="Country Code"
                    placeholder="Select Country Code"
                    name="country"
                    isRequired={true}
                    dropdownData={ccodes || []}
                    value={CountryCode || ""}
                    handleChange={(event: any) => {
                      setCountryCode(event.target.value || "");
                      const filteredRules = CountryRules.filter((item: any) =>
                        event.target.value?.includes(item.label)
                      );
                      const firstRule: any = filteredRules[0];
                      if (firstRule?.phoneLength) {
                        const phoneLength = firstRule.phoneLength;

                        if (Array.isArray(phoneLength)) {
                          const maxPhoneLength = parseInt(phoneLength[phoneLength.length - 1]);
                          setMax(maxPhoneLength);
                        } else {
                          setMax(parseInt(phoneLength));
                        }
                      } else {
                        setMax(0); // Default value
                      }

                      // const validationMessage = validatePhoneNumber(
                      //   filteredRules[0]?.code,
                      //   mobileNo
                      // );

                      // setccmsg(validationMessage);
                      setMobileNo('')
                    }}
                    previewMode={false}
                    freeSolo={true}
                  />
                </div>
                <ZupotsuTextfield
                  title="Mobile No"
                  value={mobileNo}
                  type="number"
                  name="mobileno"
                  isRequired={true}
                  placeholder="Mobile No"
                  errorMessage={ccmsg ? (ccmsg?.error) : ''}
                  maxLength={max}
                  handleChange={(e) => {
                    if (max == 0) {
                      setMobileNo('');
                    }
                    else {
                      setMobileNo(e.target.value);
                    }
                    const filteredRules = CountryRules.filter((item: any) =>
                      CountryCode.includes(item.label)
                    );
                    const validationMessage = validatePhoneNumber(
                      filteredRules[0]?.code,
                      e.target.value
                    );

                    setccmsg(validationMessage);
                  }}
                />
              </div>

              <div style={{ paddingTop: '20px' }}>
                <ZupotsuTextfield
                  title="Organisation"
                  value={email?.toLowerCase().includes("zupotsu.com") ? "Zupotsu" : organisation}
                  placeholder="Organisation"
                  isRequired={true}
                  errorMessage={
                    !isOrganisationValid
                      ? 'Organisation should contain only character value.'
                      : ''
                  }
                  handleChange={(e) => setOrganisation(e.target.value)}
                />
              </div>
              <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <ZupotsuTextfield
                  title="Password"
                  isRequired={true}
                  value={password}
                  placeholder="Password"
                  type={'password'}
                  isPassword={true}
                  handleChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <ZupotsuTextfield
                  title="Confirm Password"
                  isRequired={true}
                  value={newpassword}
                  placeholder="Confirm Password"
                  type={'password'}
                  isPassword={true}
                  handleChange={(e) => setNewPassword(e.target.value)}
                  errorMessage={
                    password != newpassword
                      ? "Password doesn't match!!"
                      : ''
                  }
                />
              </div>
              <div style={{ marginTop: '0px', marginBottom: '20px' }}>
                {criteria.map((criterion, index) => (
                  <div
                    key={index}
                    style={{
                      margin: '3px',
                      borderRadius: '5px',
                      textAlign: 'left',
                      fontSize: '12px',
                      color: isValid(criterion.regex) ? 'green' : 'grey',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >

                    <span style={{ marginRight: '6px' }}>
                      {isValid(criterion.regex) && (<CheckIcon
                        style={{ cursor: 'pointer', fontSize: 14, color: 'green' }}
                      />)}
                    </span>
                    {!isValid(criterion.regex) && (
                      <span style={{ fontSize: '1.5em', lineHeight: 1, marginRight: '6px' }}>
                        •
                      </span>
                    )}
                    {criterion.label}
                  </div>
                ))}
              </div>

            </div>
          )}
          {activeStep === 1 && (
            <div style={{ paddingTop: '28px', paddingBottom: '15px' }}>


              <Typography
                style={{
                  marginBottom: '10px',
                  color: 'var(--Gray-1, #333)',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: '140%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                }}>
                  Which sports are you interested in?
                </div>


              </Typography>


              <ZupotsuMultiSelect
                title={''}
                dropdownData={allSports ? ["All", ...allSports] : []}
                value={selectedSport}
                name={'sports'}
                placeholder={`Select sports`}
                isRequired={false}
                handleChange={(e) => {
                  const value = e;

                  if (value.includes("All")) {
                    if (selectedSport.length !== allSports.length) {
                      setSelectedSport(allSports);
                    } else {
                      setSelectedSport([]);
                    }
                  } else if (selectedSport.includes("All") && !value.includes("All")) {
                    setSelectedSport([]);
                  } else {
                    setSelectedSport(value);
                  }
                }}
                previewMode={false}
              />




              <div style={{ paddingTop: '20px' }}>



                <ZupotsuAutoComplete
                  title="Country"
                  placeholder="Select Country"
                  name="country"
                  isRequired={true}
                  dropdownData={countries || []}
                  value={selectedCountry || ""}
                  handleChange={(event: any) => {
                    setSelectedCountry(event.target.value);
                  }}
                  previewMode={false}
                  freeSolo={true}
                />
              </div>


              {(selectedCountry) && (<div style={{ paddingTop: '20px' }}>



                <ZupotsuAutoComplete
                  title="City"
                  placeholder="Select City"
                  name="city"
                  dropdownData={cities || []}
                  value={selectedCity || ""}
                  handleChange={(event: any) => {
                    setSelectedCity(event.target.value);
                  }}
                  previewMode={false}
                  freeSolo={true}
                />
              </div>)}
              <div style={{ paddingTop: '20px' }}>
                <ZupotsuDropdown
                  title="Currency"
                  isRequired={true}
                  dropdownData={currencies}
                  value={preferredCurrency}
                  name={"preferred_currency"}
                  placeholder={""}
                  handleChange={(event: any) => {
                    setPreferredCurrency(event?.target.value)
                  }}
                  previewMode={false}
                />
              </div>
              <div
                style={{
                  paddingTop: '20px',
                  width: '100%',
                }}
              >
                <Typography
                  style={{
                    textAlign: 'left',
                    marginBottom: '10px',
                    color: 'var(--Gray-1, #333)',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    lineHeight: '140%',
                    display: 'flex',
                    flexDirection: 'column',
                    fontWeight: '600',
                  }}
                >
                  Organisation Social Handles
                </Typography>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Box sx={{ width: '50%' }}>
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        size="small"
                        fullWidth
                        value={fbLink}
                        placeholder="Facebook"
                        onChange={(e) => setFbLink(e.target.value)}
                        id="outlined-adornment-weight"
                        endAdornment={
                          <InputAdornment position="end">
                            <img src={facebookIcon} alt="facebook" />
                          </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      // error={Boolean(validateFacebook)}
                      />
                    </FormControl>
                    {(!validateFacebookUrl(fbLink) && fbLink) && <Typography style={{
                      color: 'red',
                      fontSize: '12px',
                      marginTop: '4px',
                      fontFamily: 'Inter', fontWeight: 400,
                      textAlign: 'left'
                    }}>Please enter valid facebook url</Typography>}
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        size="small"
                        placeholder="Instagram"
                        fullWidth
                        value={instaLink}
                        onChange={(e) => setInstaLink(e.target.value)}
                        id="outlined-adornment-weight"
                        endAdornment={
                          <InputAdornment position="end">
                            <img src={instagramIcon} alt="instagram" />
                          </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                      {(!validateInstagramUrl(instaLink) && instaLink) && <Typography
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          marginTop: '4px',
                          textAlign: 'left',
                          fontFamily: 'Inter', fontWeight: 400
                        }}>Please enter valid instagaram url</Typography>}
                    </FormControl>
                  </Box>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <Box sx={{ width: '50%' }}>
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        size="small"
                        fullWidth
                        value={twitterLink}
                        placeholder="X"
                        onChange={(e) => setTwitter(e.target.value)}
                        id="outlined-adornment-weight"
                        endAdornment={
                          <InputAdornment position="end">
                            <img src={twitterx} alt="twitter" />
                          </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}

                      />
                      {(!validateXUrl(twitterLink) && twitterLink) && <Typography style={{
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '4px',
                        fontFamily: 'Inter', fontWeight: 400, textAlign: 'left'
                      }}>Please enter valid X url</Typography>}
                    </FormControl>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        size="small"
                        placeholder="youtube"
                        fullWidth
                        value={youtubeLink}
                        onChange={(e) => setYoutube(e.target.value)}
                        id="outlined-adornment-weight"
                        endAdornment={
                          <InputAdornment position="end">
                            <img src={YoutubeIcon} alt="youtube" />
                          </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}

                      />
                      {(!validateYouTubeUrl(youtubeLink) && youtubeLink) && <Typography style={{
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '4px',
                        fontFamily: 'Inter', fontWeight: 400, textAlign: 'left'
                      }}>Please enter valid youtube url</Typography>}
                    </FormControl>
                  </Box>
                </div>

                {(!isFbLinkValid || !isInstaLinkValid) && (
                  <p style={{ color: 'red' }}>
                    Please enter a valid link. Make sure it starts with 'http://'
                    or 'https://'."
                  </p>
                )}
              </div>
              <div
                style={{
                  paddingTop: '20px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >

                <Checkbox
                  sx={{
                    backgroundColor: "#FFF",
                    color: 'red',
                    '& .Mui-checked': {
                      fill: "red",
                      margin: 0,
                    },
                    '& .MuiSvgIcon-root': {
                      fill: "red",
                      margin: 0,
                      width: '20px',
                      height: '20px',
                    }
                  }}
                  checked={isTermsChecked}
                  onChange={(e) => {
                    handleTermsChange(e)
                  }}
                  name="termsandconditions"
                  color="primary"
                  required={true}
                />
                <Typography
                  onClick={() => { setShown(true) }}
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '140%',
                    margin: 0,
                    padding: 0,
                    cursor: 'pointer',
                    // ,
                    textDecorationColor: "rgba(0,0,0,0.7)",
                    textDecorationThickness: "1px",
                  }}
                >

                  By checking this box you agree to Zupotsu's
                  <span style={{ textDecoration: "underline", paddingLeft: '3px', color: "#e22b16" }}>Terms and Conditions</span>
                </Typography>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ paddingTop: '28px', display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: 'center', width: "100%", }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', width: deviceType == "mobile" ? "100%" : "60%" }}>
                <Typography
                  style={{
                    color: 'rgba(51, 51, 51, 1)',
                    fontFamily: 'Inter',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '30px',
                    marginBottom: '20px',
                    textAlign: "left"
                  }}
                >
                  Verify OTP
                </Typography>
                <Typography
                  style={{
                    color: 'rgba(51, 51, 51, 1)',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '140%',
                    marginBottom: '20px',


                  }}
                >
                  {`Please enter the OTP sent to your email ${email} in order to complete the verification process. `}
                </Typography>
                <div style={{ gap: '10px', width: '280px', display: "flex", flexDirection: 'row', justifyContent: "space-evenly" }}>

                  {otp?.map((digit, index) => (
                    <input
                      style={optstyle}
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        if (digit?.length != 1) {
                          const regex = /^[0-9]+$/;
                          if (regex.test(e.target.value)) {
                            handleOtpFieldChange(e, index);
                          }
                        }
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => inputRefs.current[index] = el}
                    />
                  ))}
                </div>

                <Typography
                  style={{
                    color: 'rgba(130, 130, 130, 1)',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '19.36px',
                    marginTop: '20px',
                    textAlign: "left"
                  }}
                >
                  {(timer !== 0) && (<>You can request for OTP again in <span style={{ color: 'rgba(226, 11, 24, 0.5' }}>
                    00:{timer.toString().padStart(2, "0")}
                  </span></>)} {(timer == 0) && (<>Didn’t receive OTP yet? <span style={{ cursor: 'pointer', color: 'rgba(226, 11, 24' }} onClick={() => { resendOtp() }}>Resend Code</span></>)}
                </Typography>
              </div>

            </div>
          )}

          {activeStep === 3 && (
            <>
              {afterRegOtpVerificationScreen && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginTop: '35px',
                        borderRadius: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: deviceType === 'mobile' ? "60%" : '50%',
                        padding:
                          deviceType === 'mobile' ? '12px 16px' : '10px 10px',
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
                            marginTop: '10px'
                          }}
                        >
                          You have successfully registered on Zupotsu.
                        </Typography>
                      </div>
                    </div>
                    <div
                      style={{
                        alignSelf: 'center',
                        marginTop: deviceType === 'mobile' ? '28px' : '10px',
                      }}
                    >

                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection:'row',
                        justifyContent:'center',
                        marginTop: '20px',
                        width: '100%'
                      }}
                    >


                      <ZupotsuButton
                        name="Continue"
                        handleClick={() => {
                          localStorage.setItem("sessionStartTime", performance.now().toString())
                          if (localStorage.getItem("role") !== "buyer") {
                            navigate('/catalogue-management')
                          }
                          else {
                            navigate('/catalogue')
                          }
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

            </>
          )}
        </div >

        <div style={{ paddingTop: deviceType == "mobile" ? "0px" : '0px', width: '100%' }}>
          {activeStep === 2 &&
            (
              <ZupotsuButton
                handleClick={() =>
                  handlesubmitOtp()
                }
                load={loader}
                disabled={allOtpPositionsFilled == false}
                name={'Submit'}
                customBgColor={
                  (allOtpPositionsFilled) ? "rgba(226, 11, 24, 1)" :
                    "rgba(226, 11, 24, 0.3)"}
                customTextColor={"#FFF"}
                customBgColorOnhover={"rgba(226, 11, 24, 0.3)"}
                customTextColorOnHover={"1px solid rgba(189, 189, 189, 1)"}
                customOutlineColor={"1px solid rgba(189, 189, 189, 1)"}
              />
            )
          }
          {activeStep === 0 && (
            <ZupotsuButton
              disabled={!name?.trim() || !email?.trim() || !password?.trim() || (!organisation?.trim() && !email?.toLowerCase().includes("zupotsu.com")) ||
                (!emailRegexx.test(email)) ||
                ((mobileNo?.length === 0) || (mobileNo?.length !== max)) || (password?.trim() !== newpassword?.trim())
              }
              load={loader}
              handleClick={() => handleStepper()}
              name="Continue"
              customBgColor={
                (!name?.trim() || !email?.trim() || !password?.trim() || (!organisation?.trim() && !email?.toLowerCase().includes("zupotsu.com")) ||
                  !validateEmail(email)
                  || !isValid || (password?.trim() !== newpassword?.trim()) || ((mobileNo?.length === 0) && (mobileNo?.length !== max))) ? "rgba(226, 11, 24, 0.3)" :
                  "rgba(226, 11, 24, 1)"}
              customTextColor={"#FFF"}
              customBgColorOnhover={"rgba(226, 11, 24, 0.3)"}
              customTextColorOnHover={"1px solid rgba(189, 189, 189, 1)"}
              customOutlineColor={"1px solid rgba(189, 189, 189, 1)"}
            />
          )}
          {activeStep === 1 && (
            <ZupotsuButton
              disabled={(!preferredCurrency || !selectedCountry || (!validateYouTubeUrl(youtubeLink) && youtubeLink) || (!validateTwitterUrl(twitterLink) && twitterLink) || (!validateInstagramUrl(instaLink) && instaLink) || (!validateFacebookUrl(fbLink) && fbLink) || (!isTermsChecked)) ? true : false}
              customBgColor={
                (!preferredCurrency || !selectedCountry || (!validateYouTubeUrl(youtubeLink) && youtubeLink) || (!validateTwitterUrl(twitterLink) && twitterLink) || (!validateInstagramUrl(instaLink) && instaLink) || (!validateFacebookUrl(fbLink) && fbLink) || (!isTermsChecked)) ? "rgba(226, 11, 24, 0.3)" :
                  "rgba(226, 11, 24, 1)"}
              load={loader}
              customTextColor={"#FFF"}
              customBgColorOnhover={"rgba(226, 11, 24, 0.3)"}
              customTextColorOnHover={"1px solid rgba(189, 189, 189, 1)"}
              customOutlineColor={"1px solid rgba(189, 189, 189, 1)"}
              handleClick={() => {
                setOtp(Array(4).fill(''))
                handleOTPRequest()

              }}
              name="Request OTP"
            />
          )}
          <CookiesPolicyModal
            open={openCookiePolicy}
            closeModal={closeCookiePolicy}
            privacyPolicyLink={"https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/Zupotsu%20-%20PrivacyPolicy%20-%20NJ.docx.pdf"}
          />
        </div>
        <Termsandservices shown={shown} setShown={setShown} />
      </div>)}
    </div>

  );

}

export default ZupotsuLogin;
