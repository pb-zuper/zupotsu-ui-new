import React, { useEffect, useState } from 'react'
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button'
import useDeviceType from '../../utils/DeviceType'
import ZupotsuTextfield from '../Settings/ZupotsuTextfield'
import Apis from '../../services/apis'
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown'
import { Box, Modal, Snackbar } from '@mui/material';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { ArrowBack, Close } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import mixpanelEvents from '../../mixpanel/mixpanelEvents'
import { ZupotsuAutoComplete } from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete';
import CountryRules from '../../Atoms/countryRules'

const rules= CountryRules();
const Profile = () => {
    const deviceType = useDeviceType()
    const [edit, setEdit] = useState(false)
    const [loader, setLoader] = useState(false)
    const userId = localStorage.getItem("userID")
    const name = localStorage.getItem("name")?.charAt(0)
    const [currencies, setCurrencies] = useState([])
    const [resetpopup, setResetPopup] = useState(false)
    const [currencieData, setCurrencieData] = useState([])
    const [isEmailValid, setIsEmailValid] = useState(true)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@$])(?=.*\d)[a-zA-Z!#@$0-9]{8,}$/;
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const [formData, setFormData] = useState<any>({

    });
    const navigate = useNavigate()
    const [CountryRules,setCountryRules] = useState(rules ||[])
    const [CountryCode,setCountryCode] = useState("")
    const [ccmsg,setccmsg] = useState<any>()
    const [max,setMax] = useState<number>(0)
    let arr:any = []  
    rules.map((item:any)=>{
      arr.push(item.label+" (+"+item.phone+")")
    })
    const [ccodes,setccodes] = useState(arr ||[])


    const handleCurrencyChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const apis = new Apis();
    const fetchUser = async () => {
        setLoader(true);
        try {

            const assetsResponse = await apis.getUsersId(userId);
            if (assetsResponse?.data?.data) {
                const data = {
                    "name": assetsResponse?.data?.data?.name,
                    "email": assetsResponse?.data?.data?.email,
                    "mobile": assetsResponse?.data?.data?.mobile,
                    "preferred_currency": assetsResponse?.data?.data?.preferred_currency,
                    "organization": assetsResponse?.data?.data?.organization?.name
                }
                setFormData(data)
                if(assetsResponse?.data?.data?.mobile?.includes(" "))
                {
                    const filteredRules = CountryRules.filter((item: any) =>
                    {return (assetsResponse?.data?.data?.mobile?.split(" ")[0].replace("+","") === (item.phone))}
                    );
                    setCountryCode(filteredRules[0].label+" (+"+filteredRules[0].phone+")")
                    const firstRule:any = filteredRules[0];
                    if (firstRule?.phoneLength) {
                      const phoneLength = firstRule.phoneLength;
                  
                      if (Array.isArray(phoneLength)) {
                        const maxPhoneLength = parseInt(phoneLength[phoneLength.length - 1]); 
                        setMax(maxPhoneLength);
                      } else {
                        setMax(parseInt(phoneLength)); 
                      }
                    } else {
                      setMax(0); 
                    }
                }
                
            }
        } catch (error: any) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
            });
        } finally {
            setLoader(false);
        }
    };

    const fetchCurrency = async () => {
        setLoader(true);
        try {
            const assetsResponse = await apis.getCurrency();
            const curr: any = []
            if (assetsResponse?.data?.status?.toLowerCase() == "success") {
                setCurrencieData(assetsResponse?.data?.data)
                assetsResponse?.data?.data?.map((item: any, index: any) => {
                    curr.push(item?.name)
                })
                setCurrencies(curr)
            }

        } catch (error) {
            console.error("Error fetching assets or media:", error);
        } finally {
            setLoader(false);
        }
    };


    useEffect(() => {
        const startTime = performance.now();

        const fetchAndTrack = async () => {
            await fetchUser()
            await fetchCurrency()
            const loadTime = performance.now() - startTime;
            mixpanelEvents.onLoad(loadTime, 'Profile');
        };
        fetchAndTrack();
        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Profile', timeSpent);
        };
    }, [])


    const validatePhoneNumber = (countryCode:any, phoneNumber:any) => {
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

    const onUserUpdation = () => {
        if (!CountryCode) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Please select Country Code!!',
            });
            return;
        }
    
        if (!formData?.name) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Name is Required!!',
            });
            return;
        }

        if (!formData?.mobile) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Mobile number is Required!!',
            });
            return;
        }
        if (ccmsg?.error) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: ccmsg?.error,
            });
            return;
        }
    
        const filteredRules = CountryRules.filter((item: any) =>
            CountryCode?.includes(item.label)
        );
    
        if (!filteredRules.length || !filteredRules[0].phone) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Invalid Country Code selected!!',
            });
            return;
        }
    
        setLoader(true);
    
        const body = {
            name: formData?.name,
            mobile: `+${filteredRules[0].phone} ${formData?.mobile}`,
            preferred_currency: formData?.preferred_currency,
            id: userId,
        };
    
        apis.updateUsers(userId, body)
            .then((response: any) => {
                if (response?.data?.status === 'success') {
                    localStorage.setItem('name', formData?.name);
                    localStorage.setItem('mobile', formData?.mobile);
                    localStorage.setItem('preferred_currency', formData?.preferred_currency);
    
                    setSnackbar({
                        open: true,
                        severity: 'success',
                        message: "Profile data successfully updated",
                    });
                    
                    setEdit(false);
                }
            })
            .catch((error) => {
                const errorMessage =
                    error?.response?.data?.error?.includes('prisma')
                        ? 'A server error occurred. Please try again!'
                        : 'Something went wrong!';
                // showSnackbar('error', errorMessage);
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
                });
            })
            .finally(() => {
                setLoader(false);
            });
    };
    

    const changePassword = () => {

        setLoader(true)
        const id = userId
        let body = {
            "oldpassword": oldPassword,
            "newpassword": newPassword
        }
        apis.changepassword(id, body)
            .then((response: any) => {
                if (response?.data?.status == "success") {
                    setSnackbar({
                        open: true,
                        message: 'Password has been updated',
                        severity: 'success',
                    });
                    setResetPopup(false)
                    setNewPassword("")
                    setOldPassword("")
                    setConfirmPassword("")
                }
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
                });
            });
    };
    if (loader) {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }
    else {
        return (
            <div style={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'flex-start',
                flex:1,
                alignItems: 'center',
                width: '100%',
                gap: '10px'
            }}>

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
                <div style={{
                    width: '60%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: 'center',
                    marginTop: '50px'
                }}>

                    {(edit == true) ? (<button style={{ width: '30px', backgroundColor: 'transparent', border: "0px solid transparent" }} onClick={() => { setEdit(!edit) }}>
                        <ArrowBack sx={{ width: '24px', height: '24px' }} />
                    </button>) : (<div style={{ width: '30px', }}></div>)}
                    <p
                        style={{
                            fontFamily: "Inter",
                            fontSize: "21px",
                            fontWeight: 700,
                            lineHeight: "22.4px",
                            textAlign: "left",
                            padding: 0,
                            margin: 0
                        }}
                    >Profile</p>

                    {(edit == false) ? (<button style={{ width: '30px', backgroundColor: 'transparent', border: "0px solid transparent" }} onClick={() => { navigate(-1) }}>
                        <Close
                            sx={{
                                cursor: 'pointer',
                            }}
                        />
                    </button>) : (<div style={{ width: '30px', }}></div>)}

                </div>
                {(!edit) ? (
                    <>
                        <div
                            onClick={() => { }}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 100,
                                background: "rgba(242, 242, 242, 1)",
                                cursor: 'pointer',
                                width: "150px",
                                height: "150px",
                                marginTop: '20px',

                            }}
                        >

                            <span style={{
                                fontFamily: "Inter",
                                fontSize: "68.18px",
                                fontWeight: 600,
                                lineHeight: "95.45px",
                                letterSpacing: "0.04em",
                                color: "rgba(130, 130, 130, 1)",
                                textTransform: "capitalize"
                            }}>{name}</span>
                        </div>
                        <div style={{
                            width: '60%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-evenly",
                            alignItems: 'center',
                            marginTop: '10px',
                            flexWrap: 'wrap'

                        }}>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '50%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "15%",
                                gap: "4%",
                                paddingBottom: '5%'
                            }}>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0
                                }}>
                                    Name
                                </p>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0,
                                    marginTop: 10
                                }}>
                                    {formData?.name || "NA"}
                                </p>

                            </div>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '50%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "15%",
                                gap: "4%",
                                paddingBottom: '5%'
                            }}>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0
                                }}>
                                    Mobile No
                                </p>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0,
                                    marginTop: 10
                                }}>
                                    {formData?.mobile || "NA"}
                                </p>

                            </div>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '50%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "15%",
                                gap: "4%",
                                paddingBottom: '5%'
                            }}>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0,
                                }}>
                                    Email
                                </p>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0,
                                    marginTop: 10
                                }}>
                                    {formData?.email || "NA"}
                                </p>

                            </div>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '50%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "15%",
                                gap: "4%",
                                paddingBottom: '5%'
                            }}>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0,
                                }}>
                                    Organisation
                                </p>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0,
                                    marginTop: 10
                                }}>
                                    {formData?.organization || "NA"}
                                </p>

                            </div>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '50%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "15%",
                                gap: "4%",
                                paddingBottom: '5%'
                            }}>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0,
                                }}>
                                    Preferred Currency
                                </p>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0,
                                    marginTop: 10
                                }}>
                                    {formData?.preferred_currency || "NA"}
                                </p>

                            </div>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '50%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingLeft: "15%",
                                gap: "4%",
                                paddingBottom: '5%'
                            }}>


                            </div>

                        </div>

                    </>
                ) : (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 100,
                                background: "rgba(242, 242, 242, 1)",
                                cursor: 'pointer',
                                width: "150px",
                                height: "150px",
                                marginTop: '20px'

                            }}
                        >


                            <span style={{
                                fontFamily: "Inter",
                                fontSize: "68.18px",
                                fontWeight: 600,
                                lineHeight: "95.45px",
                                letterSpacing: "0.04em",
                                color: "rgba(130, 130, 130, 1)"
                            }}>{name}</span>
                        </div>


                        <div style={{
                            width: '60%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            marginTop: '10px',
                            flexWrap: 'wrap',
                            gap: "10px"
                        }}>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '45%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingBottom: '1%'
                            }}>
                                <ZupotsuTextfield
                                    title="Name"
                                    placeholder={"Enter Name"}
                                    value={formData?.name}
                                    isRequired={true}
                                    type={"text"}
                                    name={"name"}
                                    multiline={true}
                                    handleChange={(event: any) => {
                                        handleCurrencyChange(event)
                                    }}
                                />

                            </div>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '45%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingBottom: '20px'
                            }}>
                                <ZupotsuTextfield
                                    title="Email"
                                    placeholder={"Enter Email"}
                                    value={formData?.email}
                                    isRequired={true}
                                    previewMode={true}
                                    type={"text"}
                                    name={"email"}
                                    handleChange={(event: any) => {
                                        handleCurrencyChange(event)
                                    }}
                                />

                            </div>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '45%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingBottom: '1%'}}>
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
                                        const firstRule:any = filteredRules[0];
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

                                        const validationMessage = validatePhoneNumber(
                                          filteredRules[0]?.code,
                                          formData.mobile
                                        );

                                        setccmsg(validationMessage);
                                        setFormData({
                                            ...formData,
                                            ["mobile"]: "",
                                        });
                                    }}
                                    previewMode={false}
                                    freeSolo={true}
                                />                               
                            </div>
                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '45%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingBottom: '20px'
                            }}>
                                 <ZupotsuTextfield
                                    title="Mobile No"
                                    placeholder={"Enter Mobile Number"}
                                    errorMessage={ccmsg ? (ccmsg?.error) : ''}
                                    value={formData?.mobile?.split(" ")[1]?(formData?.mobile?.split(" ")[1]):formData?.mobile}
                                    maxLength={max}
                                    isRequired={true}
                                    type={"text"}
                                    name={"mobile"}
                                    handleChange={(event: any) => {
                                        if(max == 0)
                                        {
                                        setFormData({
                                            ...formData,
                                            ["mobile"]: "",
                                        });
                                        }
                                        else{
                                            handleCurrencyChange(event)
                                        }
                                        const filteredRules = CountryRules.filter((item: any) =>
                                        CountryCode.includes(item.label)
                                        );
                                        const validationMessage = validatePhoneNumber(
                                          filteredRules[0]?.code,
                                          event.target.value
                                        );
                  
                                        setccmsg(validationMessage);                                       
                                    }}
                                />

                            </div>

                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '45%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingBottom: '1%'
                            }}>
                                <ZupotsuTextfield
                                    title="Organisation"
                                    placeholder={"Enter Organisation"}
                                    value={formData?.organization}
                                    isRequired={true}
                                    type={"text"}
                                    previewMode={true}
                                    name={"organization"}
                                    handleChange={(event: any) => {
                                        handleCurrencyChange(event)
                                    }}
                                />

                            </div>

                            <div style={{
                                width: deviceType == "mobile" ? "100%" : '45%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: "column",
                                alignItems: "flex-start",
                                paddingBottom: '1%'
                            }}>

                                <ZupotsuDropdown
                                    title="Currency"
                                    dropdownData={currencies}
                                    value={formData?.preferred_currency}
                                    name={"preferred_currency"}
                                    placeholder={"Enter Currency"}
                                    isRequired={true}
                                    handleChange={(event: any) => { handleCurrencyChange(event) }}
                                    previewMode={false}
                                />

                            </div>

                        </div>
                    </>
                )}

                <div style={{
                    width: edit == false ? "60%" : '60%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-around",
                    alignItems: 'center',
                    marginTop: '10px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    borderTop: "1px solid rgba(224, 224, 224, 1)"
                }}>
                    {(localStorage.getItem("role") == "quick-reg") ? (
                        <ZupotsuButton
                            name={"Complete"}
                            variant={'contained'}
                            padding={"10px 60px"}
                            isCustomColors={true}
                            customOutlineColor="1px solid #E20B18"
                            customOutlineColorOnHover="1px solid #E20B18"
                            customBgColorOnhover="#fff"
                            customBgColor="rgba(226, 11, 24, 1)"
                            customTextColorOnHover="#FFF"
                            customTextColor="#FFF"
                            handleClick={() => {
                                navigate("/completeregistration")
                            }}
                        />) : (
                        <ZupotsuButton
                            name={edit == false ? "Edit Profile" : "Update"}
                            variant={'contained'}
                            padding={"10px 60px"}
                            isCustomColors={true}
                            customOutlineColor="1px solid #E20B18"
                            customOutlineColorOnHover="1px solid #E20B18"
                            customBgColorOnhover="#fff"
                            customBgColor="rgba(226, 11, 24, 1)"
                            customTextColorOnHover="#FFF"
                            customTextColor="#FFF"
                            handleClick={() => {
                                if (edit === true) {
                                    onUserUpdation()
                                }
                                else if (edit === false) {
                                    setEdit(!edit)
                                }

                            }}
                        />)}
                    {(edit == true) && (

                        <ZupotsuButton
                            name={"Reset password"}
                            variant={'outlined'}
                            padding={"10px 60px"}
                            isCustomColors={true}
                            customOutlineColor="1px solid #E20B18"
                            customOutlineColorOnHover="1px solid #E20B18"
                            customBgColorOnhover="#fff"
                            customBgColor="#fff"
                            customTextColorOnHover="#E20B18"
                            customTextColor="#E20B18"
                            handleClick={() => {
                                setResetPopup(true);
                                setNewPassword("")
                                setOldPassword("")
                                setConfirmPassword("")

                            }}
                        />

                    )}

                </div>

                <Modal
                    open={resetpopup}
                    onClose={() => { setResetPopup(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "40%",
                        bgcolor: 'background.paper',
                        border: '0px solid #000',
                        boxShadow: 8,
                        borderRadius: 5,
                        p: 0,
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'
                    }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                            width: '100%',
                            height: '100%',
                            padding: '10px'
                        }} >
                            <Box sx={{
                                width: "100%",
                                height: "auto",
                                display: 'flex',
                                flexDirection: "row",
                                padding: "8px 16px 8px 16px",
                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                justifyContent: "space-between",
                            }} >
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    lineHeight: "21px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0,
                                    color: "rgba(51, 51, 51, 1)"
                                }}>
                                    Reset password
                                </p>

                                <Close
                                    sx={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => { setResetPopup(false) }}
                                />
                            </Box>





                        </Box>

                        <Box sx={{
                            width: "100%",
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            gap: '10px',
                            padding: "8px 16px 8px 16px",
                        }} >
                            <ZupotsuTextfield
                                title="Old Password"
                                placeholder={"Old Password"}
                                value={oldPassword}
                                type={"password"}
                                isRequired={true}
                                name={"oldpassword"}
                                multiline={false}
                                handleChange={(event: any) => {
                                    setOldPassword(event.target.value)
                                }}
                            />
                            <ZupotsuTextfield
                                title="New Password"
                                placeholder={"New Password"}
                                value={newPassword}
                                type={"password"}
                                isRequired={true}
                                name={"newpassword"}
                                multiline={false}
                                handleChange={(event: any) => {
                                    setNewPassword(event.target.value)
                                }}
                            />
                            <ZupotsuTextfield
                                title="Confirm Password"
                                placeholder={"Confirm Password"}
                                value={confirmPassword}
                                type={"password"}
                                isRequired={true}
                                name={"confirmpassword"}
                                multiline={false}
                                handleChange={(event: any) => {
                                    setConfirmPassword(event.target.value)
                                }}
                                errorMessage={
                                    newPassword != confirmPassword
                                        ? "Password doesn't match!!"
                                        : ''
                                }
                            />
                        </Box>

                        <Box sx={{
                            width: "100%",
                            height: "auto",
                            display: 'flex',
                            flexDirection: "row",
                            alignItems: 'center',
                            padding: "8px 16px 8px 16px",
                            borderTop: "1px solid rgba(224, 224, 224, 1)",
                            justifyContent: "center",
                            marginTop: '0px',
                            boxShadow: " 0px 0px 14px 0px rgba(0, 0, 0, 0.07)"
                        }} >
                            <ZupotsuButton
                                name={"Submit"}
                                variant={'contained'}
                                padding={"10px 40px"}
                                disabled={((!passwordRegex.test(newPassword)) || !oldPassword || (newPassword != confirmPassword)) ? true : false}
                                isCustomColors={true}
                                customOutlineColor="1px solid transparent"
                                customOutlineColorOnHover="1px solid transparent"
                                customBgColorOnhover="#E20B18"
                                customBgColor={(!passwordRegex.test(newPassword)) ? "rgba(226, 11, 24, 0.3)" : !oldPassword ? "rgba(226, 11, 24, 0.3)" : newPassword != confirmPassword ? "rgba(226, 11, 24, 0.3)" : "#E20B18"}
                                customTextColorOnHover="#FFF"
                                customTextColor="#FFF"
                                handleClick={
                                    () => {
                                        if (!passwordRegex.test(newPassword)) {
                                            setSnackbar({
                                                open: true,
                                                severity: 'error',
                                                message: "Password doesn't match all requirements!!",
                                            });
                                        } else {
                                            changePassword()
                                        }
                                    }
                                }
                            />
                        </Box>
                    </Box>
                </Modal>

            </div >
        )
    }


}

export default Profile
