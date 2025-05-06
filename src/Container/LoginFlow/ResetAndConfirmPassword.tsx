import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import useDeviceType from '../../utils/DeviceType'
import { loginPageImage, successTikIcon, verifyIcon, zupotsuLogoFinal } from '../../assets'
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button'
import ZupotsuTextfield from '../../Components/Settings/ZupotsuTextfield'
import { Button, Snackbar, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Apis from '../../services/apis'
import WestIcon from '@mui/icons-material/West';
import {
    FormControl,
    InputAdornment,
    OutlinedInput,
    StepConnector,
    StepConnectorProps,
    Tooltip,
    stepConnectorClasses,
    styled,
    useTheme,
} from '@mui/material';
import CookiesPolicyModal from './CookiesPolicyModal'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import { border } from '@mui/system'
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

const ResetAndConfirmPassword = () => {
    const [activeStep, setActiveStep] = useState(0)
    const deviceType = useDeviceType()
    const [email, setEmail] = useState<any>()
    const [password, setpassword] = useState("")
    const [newPassword, setNewPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [searchParams] = useSearchParams();
    const newemail: any = searchParams.get('email');
    const [isOtp, setIsOtp] = useState<any>(false);
    const [timer, setTimer] = useState(60);
    const [timerStart, setTimerStart] = useState(false)
    const [loader, setLoader] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));
    const apis = new Apis();
    const navigate = useNavigate()
    useEffect(() => {
        setEmail(newemail)
    }, [])

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@$])(?=.*\d)[a-zA-Z!#@$0-9]{8,}$/;
    const isValid = (regex: any) => regex.test(password);
    const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
    const allOtpPositionsFilled = otp?.every(value => value !== '');
    const TimerFunction = () => {
        const timerId = setInterval(() => {

            setTimer(prevTimer => {
                if (isOtp) {
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
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const steps = ['1', '2'];
    const [open, setOpen] = useState(false);
    const [openCookiePolicy, setCookiePolicyOpen] = useState(false);
    const closeModal = useCallback(() => {
        setOpen(false);
    }, []);

    const closeCookiePolicy = () => {
        setCookiePolicyOpen(false);
    };

    const openCookiesPolicyModal = () => {
        // e.preventDefault();
        // e.stopPropagation();
        setCookiePolicyOpen(true);
    };

    useEffect(() => {

        if (isOtp) {
            TimerFunction()
        }

    }, [timerStart]);

    const handleKeyDown = (e: any, index: number) => {
        if (e.key == "Backspace" && index >= 0
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

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const reqOtp = () => {

        
        if (password != newPassword) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: "Password doesn't match!!",
            });
        }
        else {
            if (!passwordRegex.test(password)) {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: "Password doesn't match all requirements!!",
                });
            }
            else {
                const body = {
                    "otpfor": email,
                    "type": "resetpassword"
                }
                apis.getOTP(body)
                    .then((res2: any) => {
                        setIsOtp(true)
                        setSnackbar({
                            open: true,
                            severity: 'success',
                            message: 'OTP Sent successfully',
                        });

                        setTimerStart(!timerStart)
                        setTimer(60)
                        setOtp(Array(4).fill(''))
                        setActiveStep(prevStep => prevStep + 1);
                    })
                    .catch((error) => {
                        setSnackbar({
                            open: true,
                            severity: 'error',
                            message: error?.response?.data?.error || 'something went wrong!!',
                        });
                    });
            }
        }
    }


    const resendOtp = () => {
        const body = {
            "otpfor": email,
            "type": "resetpassword"
        }
        apis.getOTP(body)
            .then((res2: any) => {
                setIsOtp(true)
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'OTP Sent successfully',
                });

                setTimerStart(!timerStart)
                setTimer(60)
                setOtp(Array(4).fill(''))
            })
            .catch((error) => {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: error?.response?.data?.error || 'something went wrong!!',
                });
            });
    }

    const handlesubmitOtp = () => {
        setLoader(true)
        let body = {
            "email": email,
            "password": newPassword,
            "otp": otp?.join('')
        }
        apis.forgotPassword(body)
            .then((response: any) => {

                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Password Updated successfully',
                });
                setLoader(false)
                setActiveStep(prevStep => prevStep + 1);
            })
            .catch((error) => {
                setLoader(false)
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
                });
            });

    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepper = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const [focusedInput, setFocusedInput] = useState(Array(otp.length).fill(false));

    const handleFocus = (index: any) => {
        const newFocusedInput = [...focusedInput];
        newFocusedInput[index] = true;
        setFocusedInput(newFocusedInput);
    };

    const handleBlur = (index: any) => {
        const newFocusedInput = [...focusedInput];
        newFocusedInput[index] = false;
        setFocusedInput(newFocusedInput);
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
            {(deviceType !== "mobile") && (<div style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF", }}>
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
            <div style={{
                width: deviceType == "mobile" ? "100%" : '50%', height: '100vh', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', marginTop: deviceType == "mobile" ? "0px" : '0px', backgroundColor: "#FFF",
                padding: '10px 30px'
            }}>

                <div style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>

                        <img src={zupotsuLogoFinal} alt="cross icon" />


                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: "center" }}>

                        {/* {activeStep > 0 && (
                    <ArrowBack
                        style={{ cursor: 'pointer' }}
                        onClick={() => setActiveStep(prevStep => prevStep - 1)}
                    />
                )} */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: (activeStep === 1 || activeStep === 2) ? 'space-between' : 'center',
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            {(activeStep === 1) && (
                                <WestIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        handleBack();
                                    }}
                                />
                            )}
                            <Stack
                                sx={{
                                    width: deviceType === 'mobile' ? '75%' : '100%',
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

                    </div>
                    {(activeStep == 0) ? (<>
                        <div style={{
                            width: deviceType == "mobile" ? "100%" : '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center', scrollbarWidth: 'none',
                            gap: '10px', marginTop: '20px', overflowX: "scroll", overflowY: 'hidden', marginBottom: '10px'
                        }}>
                            <div style={{
                                alignSelf: "center",
                                color: "rgb(51, 51, 51)",
                                fontFamily: "Inter",
                                fontSize: "22px",
                                fontStyle: "normal",
                                fontWeight: 700,
                            }} >Reset Password</div>


                        </div>


                        <div
                            className="hide-scroll-stepper"
                            style={{
                                height: 'auto',
                                // height: deviceType == "mobile" ? '60vh' : "70vh"
                                overflowY: 'auto',
                                marginTop: '30px',
                            }}
                        >
                            <div style={{ width: '100%' }}>
                                <ZupotsuTextfield
                                    title="Email address"
                                    value={email}
                                    name={"email"}
                                    isRequired={true}
                                    previewMode={true}
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
                                <div style={{ paddingTop: '10px' }}>
                                    <ZupotsuTextfield
                                        title="New Password"
                                        value={password}
                                        name={"password"}
                                        type={'password'}
                                        isRequired={true}
                                        previewMode={false}
                                        isPassword={true}
                                        placeholder={
                                            deviceType === 'mobile' ? "New Password" : "New Password"
                                        }
                                    
                                        handleChange={(e) => setpassword(e.target.value)}
                                    />
                                </div>
                                <div style={{ paddingTop: '10px', textAlign: 'left' }}>
                                    <ZupotsuTextfield
                                        title="Confirm New Password"
                                        value={newPassword}
                                        name={"newpassword"}
                                        type={'password'}
                                        isPassword={true}
                                        isRequired={true}
                                        previewMode={false}
                                        placeholder={
                                            deviceType === 'mobile' ? "Confirm New Password" : "Confirm New Password"
                                        }
                                        errorMessage={
                                            password != newPassword
                                                ? "Password doesn't match!!"
                                                : ''
                                        }
                                        handleChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                {criteria.map((criterion, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            // color: 'grey',
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

                        {/* <div style={{ paddingTop: '30px' }}>

                    <ZupotsuButton
                        disabled={(!password) || (!newPassword)}
                        handleClick={() => { reqOtp() }}
                        name="Request OTP"
                        customBgColor={(!password || !newPassword) ? "rgba(226, 11, 24, 0.3)" : "rgba(226, 11, 24, 1)"}
                        customTextColor="#FFF"
                        customBgColorOnhover="rgba(226, 11, 24, 0.3)"
                        customTextColorOnHover="#FFF"
                        customOutlineColor="1px solid rgba(189, 189, 189, 1)"
                    />
                    <div>
                    </div>

                </div> */}
                    </>
                    ) :
                        (activeStep == 1) ? (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: 'center', width: deviceType == "mobile" ? "100%" : "100%", height: deviceType == "mobile" ? '60vh' : "70vh" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', width: deviceType == "mobile" ? "100%" : "100%", paddingTop: '60px' }}>
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
                                    <div style={{ gap: '10px', width: '300px', display: "flex", flexDirection: 'row', justifyContent: "space-evenly" }}>

                                        {otp?.map((digit, index) => (
                                            <input
                                                className="otp-input"
                                                key={index}
                                                type="number"
                                                maxLength={1}
                                                value={digit}
                                                onFocus={() => handleFocus(index)}
                                                onBlur={() => handleBlur(index)}
                                                style={{
                                                    border: focusedInput[index] ? '1px solid red' : '1px solid gray', // Conditional border style
                                                }}
                                                onChange={(e) => {
                                                    const regex = /^[0-9]+$/;
                                                    if (regex.test(e.target.value)) {
                                                        handleOtpFieldChange(e, index);
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
                                {/* <Typography
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
                                </Typography> */}

                            </div>

                        ) : (
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
                                        // border: '1px solid var(--Green-3, #6FCF97)',
                                        // background: '#ECFFF4',
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
                                            }}
                                        >
                                            You have successfully updated the password.
                                        </Typography>
                                    </div>
                                </div>
                                {/* <div
                        style={{
                            alignSelf: 'center',
                            marginTop: deviceType === 'mobile' ? '28px' : '10px',
                        }}
                    >
                        <Typography
                            style={{
                                color: 'var(--Gray-1, #333)',
                                fontFamily: 'Inter',
                                fontSize: deviceType === 'mobile' ? '16px' : '20px',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                lineHeight: 'normal',
                                textAlign: 'center',
                            }}
                        >
                            Would you like to list an Asset ?
                        </Typography>
                    </div> */}
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'auto auto',
                                        gridGap: '16px',
                                        marginTop: '20px',
                                    }}
                                >
                                    {/* <ZupotsuButton
                            name="Skip to Platform"
                            handleClick={() => { }}
                            isCustomColors={true}
                            variant={'outlined'}
                            customTextColor="#828282"
                            customBgColorOnhover="#fff"
                            customBgColor="#fff"
                            customTextColorOnHover="#E20B18"
                            customOutlineColor={'1px solid #828282'}
                            customOutlineColorOnHover={'1px solid #E20B18'}
                            padding="13px 12px"
                        /> */}

                                    <ZupotsuButton
                                        name="Back to Login"
                                        handleClick={() => {
                                            navigate("/loginregister")
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
                        )}
                    <div style={{ marginTop: '0px' }}>
                        {(activeStep == 0) ? (
                            <ZupotsuButton
                                disabled={(!password) || (!newPassword)}
                                handleClick={() => { reqOtp(); }}
                                name="Request OTP"
                                customBgColor={(!password || !newPassword) ? "rgba(226, 11, 24, 0.3)" : "rgba(226, 11, 24, 1)"}
                                customTextColor="#FFF"
                                customBgColorOnhover="rgba(226, 11, 24, 0.3)"
                                customTextColorOnHover="#FFF"
                                customOutlineColor="1px solid rgba(189, 189, 189, 1)"
                            />
                        ) :
                            (activeStep == 1) ? (

                                <ZupotsuButton
                                    disabled={allOtpPositionsFilled == false}
                                    handleClick={() => {
                                        handlesubmitOtp();
                                        // setActiveStep(prevStep => prevStep + 1);
                                    }}
                                    name={'Submit'}
                                    customBgColor={(allOtpPositionsFilled) ? "rgba(226, 11, 24, 1)" : "rgba(226, 11, 24, 0.3)"}
                                    customTextColor="#FFF"
                                    customBgColorOnhover="rgba(226, 11, 24, 0.3)"
                                    customTextColorOnHover={"1px solid rgba(189, 189, 189, 1)"}
                                    customOutlineColor="1px solid rgba(189, 189, 189, 1)"
                                />
                            ) : (<></>)}
                    </div>
                </div>
                <CookiesPolicyModal
                    open={openCookiePolicy}
                    closeModal={closeCookiePolicy}
                    privacyPolicyLink={"https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/Zupotsu%20-%20PrivacyPolicy%20-%20NJ.docx.pdf"}
                />
                <PrivacyPolicyModal open={open} closeModal={closeModal} />
                <div style={{
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
                </div>
            </div>


        </div >
    )
}

export default ResetAndConfirmPassword
