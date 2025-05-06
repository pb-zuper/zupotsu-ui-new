import {
    Checkbox, CheckboxProps, FormControl, FormControlLabel, InputAdornment, InputLabel, ListItemIcon, ListItemText, MenuItem, Modal, OutlinedInput, Select, Stack, Step, StepConnector, StepConnectorProps, StepLabel, Stepper, Tooltip, Typography, stepConnectorClasses, styled, useTheme,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import ZupotsuTextfield from '../Components/Settings/ZupotsuTextfield';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/system';
import {
    arrowRightBanner, facebookIcon, infoCircle, Instag, instagramIcon, successTikIcon, twitter, TwitterIcon, verifyIcon, youtube, YoutubeIcon
} from '../assets';
import ZupotsuButton from '../Atoms/zupotsu-button/zupotsu-button';
import WestIcon from '@mui/icons-material/West';
import Button from '@mui/material/Button';
import ZupotsuRadioButton from '../Atoms/zupotsu-signup-login-screen/zupotsu-radio-button/zupotsu-radio-button';
import useDeviceType from '../utils/DeviceType';
import ZupotsuMultiSelect from '../Atoms/zupotsu-multiselect/zupotsu-multiselect';
import Apis from '../services/apis';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { ZupotsuAutoComplete } from '../Atoms/zupotsu-textfields/zupotsu-autocomplete';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateFacebookUrl, validateInstagramUrl, validateTwitterUrl, validateXUrl, validateYouTubeUrl } from '../utils/validateTextfieldValue';
import ZupotsuDropdown from '../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import twitterx from '../assets/twitterx.png'
import CookiesPolicyModal from '../Molecules/zoptsu-footer/CookiesPolicyModal';
import Termsandservices from './Termsandservices';
import { Close } from '@mui/icons-material';
import WarningIcon from '@mui/icons-material/Warning';
import ZoptsuUnderlineTitle from '../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';

const CompleteRegister = () => {
    const [name, setName] = useState('');
    const [isTermsChecked, setIsTermsChecked] = useState<any>(false);
    const handleTermsChange = (event: any) => {
        setIsTermsChecked(event.target.checked);
    };
    const [email, setEmail] = useState(localStorage.getItem("email") || '');
    const [mobileNo, setMobileNo] = useState('');
    const [organisation, setOrganisation] = useState('');
    const deviceType = useDeviceType()
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
    const [isMobileValid, setIsMobileValid] = useState(true);
    const [isNameValid, setNameValid] = useState(true);
    const [isOrganisationValid, setOrganisationValid] = useState(true);
    const [isFbLinkValid, setFbLinkValid] = useState(true);
    const [isInstaLinkValid, setInstaLinkValid] = useState(true);
    const [timer, setTimer] = useState(60);
    const [loader, setLoader] = useState(false)
    const [timerStart, setTimerStart] = useState(false)
    const [allSports, setAllSports] = useState([])
    const [isEmailDisabled, setIsEmailDisabled] = useState(true)
    const [countryData, setCountryData] = useState([])
    const [countries, setCountries] = useState([])
    const [isOtp, setIsOtp] = useState<any>(false);
    const [isOpen, setIsOpen] = useState<any>(false);
    const [currencies, setCurrencies] = useState([])
    const [preferredCurrency, setPreferredCurrency] = useState("INR");
    const [shown, setShown] = useState(false);
    const [cities, setCities] = useState([])
    const [screenState, setScreenState] = useState(false)
    const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
    const [selectedUser, setSelectedUser] = useState('buyer');
    const isDeviceType = useDeviceType()
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
    const apis = new Apis();
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));
    const optstyle: any = {
        width: "50px",
        height: "55px",
        borderRadius: "6px",
        border: " 0.8px",
        borderStyle: 'solid',
        textAlign: 'center',
    }
    useEffect(() => {
        const citiesData: any = countryData?.filter((country: any) => country.country?.toLowerCase() === selectedCountry?.toLowerCase());
        setCities(citiesData[0]?.cities)
    }, [selectedCountry])
    useEffect(() => {
        if (!screenState || timer <= 0) return; // Stop the timer if screenState is false or timer is 0

        const timerId = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1; // Decrement the timer by 1
                } else {
                    clearInterval(timerId); // Stop the timer when it reaches 0
                    return 0;
                }
            });
        }, 1000);

        // Cleanup function to clear the interval
        return () => clearInterval(timerId);
    }, [screenState, timerStart, timer]);
    const navigate = useNavigate()
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

    const fetchPrimaryAttributes = async () => {
        // setLoader(true);
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
    }



    const fetchCountries = async () => {
        // setLoader(true);
        apis.getCountries()
            .then((response: any) => {
                const countriesArray: any = response?.data?.data || [];
                setCountryData(countriesArray);

                const countryarr = countriesArray.map((country: any) => country?.country);
                setCountries(countryarr)


                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
                console.log(error);
            });
    }

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
        fetchPrimaryAttributes()
        fetchCountries()
    }, [])


    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        backgroundColor: "#FFF",
        border: '0px solid #000',
        borderRadius: '8px',
        divShadow: 24,
        padding: "0px",
        fontFamily: 'Inter'
    };


    const userId: any = localStorage.getItem('userID')

    const registerObject = {
        "id": parseInt(userId),
        "name": name,
        "email": email,
        "mobile": mobileNo,
        "otp": otp?.join(''),
        "usertype": "seller",
        "user_org": organisation,
        "sports_interested": selectedSport?.filter((item: any, index: any) => item?.toLowerCase() !== "all"),
        "country": selectedCountry,
        "city": selectedCity,
        "preferred_currency": preferredCurrency,
        "social_media": [
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

        ],
    }

    const handlesubmitOtp = () => {
        setLoader(true)

        apis.updatequickregister(registerObject, parseInt(userId))
            .then((response: any) => {
                if (response?.data) {
                    localStorage.setItem("userID", response.data.data.id)
                    localStorage.setItem("orgID", response.data.data.organization_id)
                    localStorage.setItem("org", response.data.data.organization.name)
                    localStorage.setItem("role", response.data.data.userroles[0].role.name)
                    localStorage.setItem("name", response.data.data.name)
                    localStorage.setItem("mobile", response.data.data.mobile)
                    localStorage.setItem("email", response.data.data.email)
                    localStorage.setItem("sessionStartTime", performance.now().toString())
                    localStorage.setItem("preferred_currency", response.data.data.preferred_currency)
                    localStorage.setItem("zohoId", response.data.data.zoho_id)
                    localStorage.setItem("zohoOrgId", response.data.data.organization.zoho_id)
                }
                setIsOpen(true)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)

                setSnackbar({
                    open: true,
                    message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
                    severity: 'error',
                });
            });
    }


    const handleOTPRequest = () => {
        setLoader(true)
        const body = {
            "name": name,
            "otpfor": email,
            "type": "complete-reg"
        }
        apis.getOTP(body)
            .then((response: any) => {
                if (response.data) {
                    if (response.data?.status == "success") {
                        setTimer(60)
                        setOtp(Array(4).fill(''))
                        setSnackbar({
                            open: true,
                            message: 'OTP Sent Successfully',
                            severity: 'success',
                        });
                        setScreenState(!screenState)
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


    const resendOtp = () => {
        setLoader(true)
        const body = {
            "name": name,
            "otpfor": email,
            "type": "complete-reg"
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
                setTimerStart(true)
                setTimer(60)
                setOtp(Array(4).fill(''))
            })
            .catch((error: any) => {
                setLoader(false)
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: error?.response?.data?.error || 'something went wrong!!',
                });
            });
    }

    if (!loader) {
        return (
            <div style={{ width: '100%', padding: "10px", height: "90vh", overflowY: "scroll" }}>
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
                <div style={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: "flex-start", padding: "10px" }}>
                    <div style={{ width: isDeviceType == "mobile" ? "80%" : '40%', display: 'flex', flexDirection: "row", justifyContent: "flex-start", padding: "10px" }}>
                        <ZoptsuUnderlineTitle
                            fontSizeOnLargeScreen="40px"
                            fontSizeOnMediumScreen="38px"
                            fontSizeOnSmallScreen="36px"
                            fontSizeOnExtraSmallScreen="37px"
                            titleText={"Complete Registration"}
                            letterSpacing="1.92px"
                            lineHeight="40.2px"
                            textAlign="start"
                            underlineWidthForDesktop="100%"
                            underlineWidthForSmallTablet="100%"
                            underlineWidthForMobile="100%"
                            underlineBottomForDesktop="18%"
                            underlineBottomForSmallTablet="21%"
                            underlineBottomForMobile="24%"
                            paddingLeft="0px"
                            underlineHeight="9px"
                        />
                    </div>
                </div>
                {(screenState == false) ? (
                    <div style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "flex-start", padding: "10px" }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: '10px', padding: "10px" }}>



                            <div style={{ width: deviceType == "mobile" ? "100%" : '100%', display: 'flex', flexDirection: "column", justifyContent: "flex-start", }}>
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
                                        marginTop: '10px'
                                    }}
                                >
                                    Would you like to register as?
                                </Typography>)}
                                <div style={{ width: deviceType == "mobile" ? "100%" : '99%', display: 'flex', flexDirection: "row", justifyContent: "flex-start", alignItems: 'center', }}>
                                    {!email?.toLowerCase().includes("zupotsu.com") && (<div
                                        style={{
                                            display: deviceType == "mobile" ? "flex" : 'flex',
                                            width: '100%',
                                            gridGap: deviceType == "mobile" ? "0px" : '0px',
                                            marginBottom: deviceType == "mobile" ? "0px" : '10px',
                                            flexDirection:
                                                deviceType == "mobile" ? "column" : 'row',
                                            alignItems: 'center',
                                            gap: '10px',
                                            justifyContent: 'space-evenly'
                                        }}
                                    >

                                        {radioButtonsData.map((data) => (

                                            <ZupotsuRadioButton
                                                key={data.id}
                                                data={data}
                                                selected={selectedUser}
                                                isHintAvailable={true}
                                                isfullwidth={true}
                                                handleChange={(event) => {
                                                    setSelectedUser(event);
                                                }}

                                            />


                                        ))}

                                    </div>)}
                                </div>
                            </div>
                            <div style={{ width: deviceType == "mobile" ? "100%" : '49%' }}>
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

                            <div style={{ width: deviceType == "mobile" ? "100%" : '49%' }}>
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
                            <div style={{ width: deviceType == "mobile" ? "100%" : '49%' }}>
                                <ZupotsuTextfield
                                    title="Mobile No"
                                    value={mobileNo}
                                    type={'number'}
                                    name='mobileno'
                                    isRequired={true}
                                    placeholder="Mobile No"
                                    errorMessage={
                                        !isMobileValid ? 'Mobile number should be 10 digits long' : ''
                                    }
                                    maxLength={10}
                                    handleChange={(e) => {
                                        setMobileNo(e.target.value)
                                        setIsMobileValid(phoneNumberRegex.test(e.target.value));
                                    }}
                                />
                            </div>

                            <div style={{ width: deviceType == "mobile" ? "100%" : '49%' }}>
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


                            <div style={{ width: deviceType == "mobile" ? "100%" : '49%' }}>
                                <ZupotsuMultiSelect
                                    title={'Which sports are you interested in?'}
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
                            </div>




                            <div style={{ width: deviceType == "mobile" ? "100%" : '49%' }}>



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


                            {(selectedCountry) && (<div style={{ width: deviceType == "mobile" ? "100%" : '49%' }}>
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
                            <div style={{ width: deviceType == "mobile" ? "100%" : '49%' }}>
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
                                    <Box sx={{ width: '49%' }}>
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
                                    <Box sx={{ width: '49%' }}>
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
                                    <Box sx={{ width: '49%' }}>
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
                                    <Box sx={{ width: '49%' }}>
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
                                        textDecorationColor: "rgba(0,0,0,0.7)",
                                        textDecorationThickness: "1px",
                                        textAlign: "left"
                                    }}
                                >

                                    By checking this box you agree to Zupotsu's
                                    <span style={{ textDecoration: "underline", paddingLeft: '3px', color: "#e22b16" }}>Terms and Conditions</span>
                                </Typography>
                                <Termsandservices shown={shown} setShown={setShown} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "center",
                                    width: '100%',
                                }}
                            >
                                <ZupotsuButton
                                    name="Continue"
                                    handleClick={() => {
                                        if (((!emailRegexx.test(email)) || !name?.trim() || !email?.trim() || (!organisation?.trim() && !email?.toLowerCase().includes("zupotsu.com")) ||
                                            (!validateYouTubeUrl(youtubeLink) && youtubeLink) || (!validateTwitterUrl(twitterLink) && twitterLink) || (!validateInstagramUrl(instaLink) && instaLink) || (!validateFacebookUrl(fbLink) && fbLink) || (!isTermsChecked)
                                            || mobileNo?.length !== 10 || !selectedSport || !selectedCountry || !selectedCity)) {
                                            setSnackbar({
                                                open: true,
                                                message: "Please fill all the fields",
                                                severity: 'error',
                                            });
                                        } else {
                                            handleOTPRequest()
                                        }
                                    }}
                                    disabled={false}
                                    isCustomColors={true}
                                    variant={'contained'}
                                    customTextColor="#FFF"
                                    customBgColor={
                                        ((!emailRegexx.test(email)) || !name?.trim() || !email?.trim() || (!organisation?.trim() && !email?.toLowerCase().includes("zupotsu.com")) ||
                                            (!validateYouTubeUrl(youtubeLink) && youtubeLink) || (!validateTwitterUrl(twitterLink) && twitterLink) || (!validateInstagramUrl(instaLink) && instaLink) || (!validateFacebookUrl(fbLink) && fbLink) || (!isTermsChecked)
                                            || mobileNo?.length !== 10 || !selectedSport || !selectedCountry || !selectedCity) ? "rgba(226, 11, 24, 0.5)" :
                                            "rgba(226, 11, 24, 1)"}
                                    customBgColorOnhover="#E20B18"
                                    customTextColorOnHover="#E20B18"
                                    padding="10px 35px"
                                />
                            </div>

                        </div>
                    </div>
                ) :
                    (
                        <div style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "flex-start", padding: "10px" }}>
                            <div style={{ paddingTop: '28px', display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: 'center', width: "100%", }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', width: deviceType == "mobile" ? "100%" : "60%" }}>
                                    <div style={{ gap: '10px', width: '100%', display: "flex", flexDirection: 'row', justifyContent: "center" }}>

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
                                    </div>
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
                                        {`Please enter the OTP sent to your email <b>${email}</b> in order to complete the verification process. `}
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
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: "space-evenly",
                                            width: "100%",
                                            marginTop: '30px',
                                            gap: "10px"
                                        }}
                                    >
                                        <ZupotsuButton
                                            name="Back"
                                            handleClick={() => {
                                                setScreenState(false)

                                            }}
                                            isCustomColors={true}
                                            variant={'outlined'}
                                            customTextColor="#E20B18"
                                            customBgColor="#FFF"
                                            customBgColorOnhover="#FFF"
                                            customTextColorOnHover="#E20B18"
                                            customOutlineColor={'1px solid #E20B18'}
                                            customOutlineColorOnHover={'1px solid #E20B18'}
                                            padding="10px 35px"
                                        />
                                        <ZupotsuButton
                                            name="Submit OTP"
                                            handleClick={() => {
                                                if (otp?.join('')?.length == 4) {
                                                    handlesubmitOtp()
                                                } else {
                                                    setSnackbar({
                                                        open: true,
                                                        message: "Please fill otp correctly",
                                                        severity: 'error',
                                                    });
                                                }
                                            }}
                                            isCustomColors={true}
                                            variant={'contained'}
                                            customTextColor="#FFF"
                                            customBgColor={
                                                (otp?.join('')?.length == 4) ? "rgba(226, 11, 24, 1)" :
                                                    "rgba(226, 11, 24, 0.3)"}
                                            customBgColorOnhover="#E20B18"
                                            customTextColorOnHover="#E20B18"
                                            customOutlineColor={(otp?.join('')?.length == 4) ? '1px solid #E20B18' : '0px solid #E20B18'}
                                            customOutlineColorOnHover={'1px solid #E20B18'}
                                            padding="10px 35px"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                <Modal
                    open={isOpen}
                    onClose={() => { setIsOpen(false) }}
                >
                    <Box sx={style}>
                        <Box
                            sx={{
                                width: "100%",
                                height: '56px',
                                padding: "16px ",
                                gap: "0px",
                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                borderColor: "rgba(224, 224, 224, 1)",
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <Typography id="modal-title" variant="h6" component="h2" sx={{
                                fontFamily: "Inter",
                                fontSize: "16px",
                                fontWeight: 700,
                                lineHeight: "24px",
                                textAlign: "left",
                            }}>


                                Success
                            </Typography>

                            <button style={{ backgroundColor: 'transparent', border: '0px solid transparent', fontSize: '16px', cursor: 'pointer' }} ></button>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                gap: "0px",
                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                borderColor: "rgba(224, 224, 224, 1)",
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <div
                                style={{
                                    marginTop: '20px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: deviceType === 'mobile' ? "60%" : '80%',
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
                                        You have successfully completed registration on Zupotsu.
                                    </Typography>
                                </div>
                            </div>
                        </Box>

                        <Box
                            sx={{
                                width: "100%",
                                padding: "16px ",
                                gap: "0px",
                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                borderColor: "rgba(224, 224, 224, 1)",
                                justifyContent: 'space-evenly',
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'row',
                                boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.07)",
                                marginTop: "10px"
                            }}
                        >
                            <Button onClick={() => {
                                if (localStorage.getItem("role") !== "buyer") {
                                    navigate('/catalogue-management')
                                }
                                else {
                                    navigate('/catalogue')
                                }
                            }} sx={{
                                color: "#FFF",
                                padding: '12px, 16px, 12px, 16px', width: '200px', backgroundColor: "rgba(226, 11, 24, 1)",
                                border: "0px solid rgba(189, 189, 189, 1)",
                                fontSize: "14px",
                                fontWeight: 600,
                                ':hover': {
                                    backgroundColor: "rgba(226, 11, 24, 0.6)",
                                }
                            }}>
                                Continue
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }
    else {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }
}

export default CompleteRegister
