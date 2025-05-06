import React, { useCallback, useState } from 'react'
import useDeviceType from '../../utils/DeviceType'
import { loginPageImage, zupotsuLogoFinal } from '../../assets'
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button'
import ZupotsuTextfield from '../../Components/Settings/ZupotsuTextfield'
import { Button, Snackbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/validateTextfieldValue'
import Apis from '../../services/apis'
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Loader from '../../loader/Loader'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import CookiesPolicyModal from './CookiesPolicyModal'
import mixpanelEvents from '../../mixpanel/mixpanelEvents'

const ForgotPassword = () => {
    const deviceType = useDeviceType()
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const [isEmailValid, setIsEmailValid] = useState(true);
    const apis = new Apis();
    const [loader, setLoader] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
        // navigate("/loginregister");
    };

    const [open, setOpen] = useState(false);
    const [openCookiePolicy, setCookiePolicyOpen] = useState(false);
    const closeModal = useCallback(() => {
        setOpen(false);
    }, []);

    const closeCookiePolicy = () => {
        setCookiePolicyOpen(false);
    };


    const forgetPwd = () => {
        if (!loader) {
            if (!validateEmail(email)) {
                setIsEmailValid(validateEmail(email));
                return;
            }
            else {
                setLoader(true)
                let body = {
                    "email": email.toLowerCase(),
                }
                apis.resetPassword(body)
                    .then((response: any) => {
                        navigator.clipboard.writeText(response.data.data).then(() => {
                            mixpanelEvents.onForgotPassword(email.toLowerCase());
                            // alert("Url Copied to clipboard!! : "+response.data.data)
                            setSnackbar({
                                open: true,
                                message: 'Reset password link sent to registered email!!',
                                severity: 'success',
                            });
                            setEmail("")
                            // setTimeout(() => {
                            //     navigate("/loginregister");
                            // }, 2000)
                        });
                        setLoader(false)
                    })
                    .catch((error) => {
                        // setLoad(false)
                        setLoader(false)
                        // mixpanelEvents.errorHandling({
                        //     name: 'Forgot Password',
                        //     msg: error.response.data.message
                        // })
                        setSnackbar({
                            open: true,
                            severity: 'error',
                            message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
                        });
                    });
            }
        }
    };


    const openCookiesPolicyModal = () => {
        // e.preventDefault();
        // e.stopPropagation();
        setCookiePolicyOpen(true);
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
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

            {!(deviceType == "mobile" || deviceType == "small-tablet") && (<div style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF", }}>
                <img
                    src={loginPageImage}
                    alt=""
                    style={{
                        width: '100%',
                        height: '100vh',
                        objectFit: 'cover',
                    }}
                />
            </div>)}
            <div style={{ width: (deviceType == "mobile" || deviceType == "small-tablet") ? "100%" : '50%', height: '100vh', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', marginTop: deviceType == "mobile" ? "0px" : '0px', backgroundColor: "#FFF", padding: '20px' }}>
                <div style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>

                        <img src={zupotsuLogoFinal} alt="cross icon" />
                        {/* <CloseIcon
                            style={{ cursor: 'pointer' }}
                            onClick={props.handleClick}
                        /> */}

                    </div>
                    <div style={{
                        width: deviceType == "mobile" ? "100%" : '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center', scrollbarWidth: 'none',
                        // borderBottom: '2px solid rgba(224, 224, 224, 1)',
                        gap: '10px', marginTop: '20px', overflowX: "scroll", overflowY: 'hidden', marginBottom: '10px'
                    }}>
                        <div style={{
                            alignSelf: "center",
                            color: "rgb(51, 51, 51)",
                            fontFamily: "Inter",
                            fontSize: "22px",
                            fontStyle: "normal",
                            fontWeight: 700,
                        }} >Forgot Password</div>


                    </div>
                    <>

                        <div
                            className="hide-scroll-stepper"
                            style={{
                                height: 'auto',
                                overflowY: 'auto',
                                marginTop: '40px',
                            }}
                        >
                            <div style={{ width: '100%' }}>
                                <ZupotsuTextfield
                                    title="Enter your registered email address"
                                    value={email}
                                    name={"email"}
                                    isRequired={true}
                                    placeholder={
                                        deviceType === 'mobile' ? 'Email' : 'Official Email'
                                    }
                                    errorMessage={
                                        !isEmailValid
                                            ? 'Please enter a valid email. E.g. example@email.com'
                                            : ''
                                    }
                                    handleChange={(e) => setEmail(e.target.value)}
                                />
                            </div>


                        </div>

                        <div style={{ paddingTop: '10px' }}>
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    lineHeight: "19.6px",
                                    textAlign: "left",
                                    marginTop: '10px',
                                    marginBottom: '20px',
                                }}
                            >

                                <Button
                                    onClick={() => { navigate("/loginregister") }}
                                    sx={{
                                        fontFamily: "Inter",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        lineHeight: "19.6px",
                                        textAlign: "left",
                                        color: '#e20b18',
                                        textTransform: 'capitalize',
                                        padding: 0,
                                        backgroundColor: "transparent"
                                    }}
                                >« Back to Login</Button>
                            </Typography>
                            <ZupotsuButton
                                // disabled={}
                                handleClick={() => { forgetPwd() }}
                                name="Send reset password link"
                                customBgColor={(!email) ? "rgba(226, 11, 24, 0.3)" : "rgba(226, 11, 24, 1)"}
                                customTextColor={"#FFF"}
                                customBgColorOnhover={"rgba(226, 11, 24, 0.3)"}
                                customTextColorOnHover={"1px solid rgba(189, 189, 189, 1)"}
                                customOutlineColor={"0px solid rgba(189, 189, 189, 1)"}
                                load={loader ? true : false}
                            />
                        </div>
                    </>
                </div>
                <CookiesPolicyModal
                    open={openCookiePolicy}
                    closeModal={closeCookiePolicy}
                    privacyPolicyLink={"https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/Zupotsu%20-%20PrivacyPolicy%20-%20NJ.docx.pdf"}
                />
                <PrivacyPolicyModal open={open} closeModal={closeModal} />
                {/* <div style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "1.2",
                    textAlign: "center",
                    marginBottom: '1rem',
                    // position: 'absolute',
                    bottom: '1rem',
                    width: '100%',
                    maxWidth: '600px',
                    flexWrap: 'wrap'
                }}>
                    By continuing you agree to Zupotsu’s,
                    <span onClick={() => { openCookiesPolicyModal() }} style={{ cursor: 'pointer', color: "rgba(47, 128, 237, 1)" }}>Terms & Conditions</span> and
                    <span onClick={() => { setOpen(true) }} style={{ cursor: 'pointer', color: "rgba(47, 128, 237, 1)", paddingLeft: '5px' }}>Privacy Policy</span>
                </div> */}
            </div>
        </div>
    )
}

export default ForgotPassword
