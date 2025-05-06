import React, { useCallback, useEffect, useState } from 'react'
import ZupotsuSignUpLogIn from '../../Atoms/zupotsu-signup-login-screen/zupotsu-signup-login'
import { ZupotsuLogin } from '../../Atoms/zupotsu-signup-login-screen/zupotsu-Login'
import useDeviceType from '../../utils/DeviceType'
import ZupotsuRegister from '../../Atoms/zupotsu-signup-login-screen/zupotsu-Register'
import { loginPageImage, zupotsuLogoFinal } from '../../assets'
import CookiesPolicyModal from './CookiesPolicyModal'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import { useLocation, useNavigate } from 'react-router-dom';
import ZupotsuQuickRegister from '../../Atoms/zupotsu-signup-login-screen/zupotsu-QuickRegister'

const LoginAndRegister = () => {
    const deviceType = useDeviceType()
    const location: any = useLocation();
    const [sortAssets, setSortAssets] = useState("Login")
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const type = url.searchParams.get('type');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoader(true)
        if (location.pathname.includes("/register") || location.pathname.includes("/quickregister")) {
            setSortAssets("Register")
            setLoader(false)
        }
        // else if (location.pathname.includes("/quickregister")) {
        //     setSortAssets("QuickRegister")
        //     setLoader(false)
        // }
        else if (location.pathname.includes("login")) {
            setSortAssets("Login")
            setLoader(false)
        }

    }, [location.pathname])


    const sortingStyles = {
        button: {
            background: '#E20B18',
            color: '#FFF',
            '&:hover': {
                backgroundColor: '#a9141d',
                color: '#fff',
            },
            cursor: "pointer"
        },
        tabButton: {
            padding: deviceType == "mobile" ? "5px" : '10px',
            color: 'rgba(226, 11, 24, 1)',
            fontSize: deviceType == "mobile" ? "15px" : '16px',
            borderBottom: ' 2px solid rgba(226, 11, 24, 1)',
            fontFamily: 'Inter',
            fontWeight: 600,
            cursor: "pointer",
            width: '50%'
        },
        tabButtonInactive: {
            padding: deviceType == "mobile" ? "5px" : '10px',
            color: 'rgba(130, 130, 130, 1)',
            fontSize: deviceType == "mobile" ? "15px" : '16px',
            fontFamily: 'Inter',
            fontWeight: 600,
            cursor: "pointer",
            width: '50%'
        }
    };
    const [open, setOpen] = useState(false);
    const [openCookiePolicy, setCookiePolicyOpen] = useState(false);
    const closeModal = useCallback(() => {
        setOpen(false);
    }, []);

    const closeCookiePolicy = () => {
        setCookiePolicyOpen(false);
    };

    const openCookiesPolicyModal = () => {
        setCookiePolicyOpen(true);
    };
    if (!loader) {
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
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
                <div style={{ width: (deviceType == "mobile" || deviceType == "small-tablet") ? "100%" : '50%', height: '100vh', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', marginTop: deviceType == "mobile" ? "0px" : '0px', backgroundColor: "#FFF", }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', width: '100%', paddingLeft: '15px', paddingRight: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>
                            <img src={zupotsuLogoFinal} alt="cross icon" />
                        </div>
                        <div style={{
                            width: deviceType == "mobile" ? "100%" : '100%', flexDirection: 'row', display: 'flex', justifyContent: deviceType == "mobile" ? 'space-between' : 'space-between', scrollbarWidth: 'none',
                            borderBottom: '2px solid rgba(224, 224, 224, 1)',
                            gap: '0px', overflowX: "scroll", overflowY: 'hidden', marginBottom: '20px'
                        }}>
                            <div style={(sortAssets == "Login" || sortAssets == "QuickRegister") ?
                                sortingStyles.tabButton : sortingStyles.tabButtonInactive
                            } onClick={() => {
                                // navigate("/loginregister/login")
                                setSortAssets("Login")
                            }}>LOGIN / QUICK REGISTER</div>
                            <div style={sortAssets == "Register" ?
                                sortingStyles.tabButton : sortingStyles.tabButtonInactive
                            } onClick={() => {
                                // navigate("/loginregister/register")
                                setSortAssets("Register")
                            }}>REGISTER</div>

                            {/* <div style={sortAssets == "QuickRegister" ?
                                sortingStyles.tabButton : sortingStyles.tabButtonInactive
                            } onClick={() => {
                                setSortAssets("QuickRegister")
                            }}>QUICK REGISTER</div> */}

                        </div>
                        {(sortAssets == "Login") && (<ZupotsuLogin setSortAssets={setSortAssets} />)}
                        {(sortAssets == "Register") && (<ZupotsuRegister setSortAssets={setSortAssets} />)
                            //  : (<ZupotsuQuickRegister setSortAssets={setSortAssets} />)
                        }
                        <CookiesPolicyModal
                            open={openCookiePolicy}
                            closeModal={closeCookiePolicy}
                            privacyPolicyLink={"https://gessa-fileservice.s3.eu-central-1.amazonaws.com/zupotsu/Zupotsu%20-%20PrivacyPolicy%20-%20NJ.docx.pdf"}
                        />
                        <PrivacyPolicyModal open={open} closeModal={closeModal} />
                    </div>
                    {/* <div style={{
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "1.2",
                        textAlign: "center",
                        marginTop: '5px',
                        marginBottom: '1rem',
                        bottom: '10px',
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
    else {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )

    }
}

export default LoginAndRegister
