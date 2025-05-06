import { Box, Grid, FormControl, MenuItem, Select, Typography, TextField, Snackbar } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Breadcrumb from '../../../Atoms/breadcrumb/breadcrumb';
import ZoptsuUnderlineTitle from '../../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
import useDeviceType from '../../../utils/DeviceType';
import ZupotsuTextfield from '../ZupotsuTextfield';
import ZupotsuButton from '../../../Atoms/zupotsu-button/zupotsu-button';
import Apis from '../../../services/apis';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import ZupotsuDropdown from '../../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const EditAlertandNotification = ({ selected, setOpenPopup }: any) => {
    const [loader, setLoader] = useState(false);
    const deviceType = useDeviceType();
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const [event, setEvent] = useState(selected?.event)

    // State for each user role
    const [alertTypes, setAlertTypes] = useState<any>({
        accountuser: selected?.accountuser?.alert_type || "",
        admin: selected?.admin?.alert_type || "",
        approver: selected?.approver?.alert_type || "",
        seller: selected?.seller?.alert_type || "",
        sellerAdmin: selected?.seller_admin?.alert_type || "",
        buyer: selected?.buyer?.alert_type || "",
    });

    const [emailTemplate, setEmailTemplate] = useState<any>({
        accountuser: selected?.accountuser?.email_template || "",
        admin: selected?.admin?.email_template || "",
        approver: selected?.approver?.email_template || "",
        seller: selected?.seller?.email_template || "",
        sellerAdmin: selected?.seller_admin?.email_template || "",
        buyer: selected?.buyer?.email_template || "",
    });

    const [emailNotificationTime, setEmailNotificationTime] = useState<any>({
        accountuser: selected?.accountuser?.email_notification_time || "",
        admin: selected?.admin?.email_notification_time || "",
        approver: selected?.approver?.email_notification_time || "",
        seller: selected?.seller?.email_notification_time || "",
        sellerAdmin: selected?.seller_admin?.email_notification_time || "",
        buyer: selected?.buyer?.email_notification_time || "",
    });

    const linkDetails = useMemo(() => [
        { label: 'Settings', url: '' },
        { label: 'Alert and Notifications', url: '/alert_notification' },
        { label: 'Edit Alert and Notification', url: '' },
    ], []);

    const options = ["email-app", "email", "app", "disable"];

    const handleAlertTypeChange = (role: string, value: string) => {
        setAlertTypes((prev: any) => ({ ...prev, [role]: value }));
    };


    const apis = new Apis();
    const updateAlertandNotification = async () => {
        setLoader(true)
        if (!selected?.id || !event) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: "Fill all the fields",
            });
            setLoader(false);

        } else {

            try {
                // Validate email template based on alert type
                const validateEmailTemplate = (role: string, alertType: string | null, emailTemplate: string | null) => {
                    if ((alertType === "email" || alertType === "email-app") && !emailTemplate) {
                        throw new Error(`Email template is mandatory for ${role} when alert_type is "${alertType}".`);
                    }
                };

                // Perform validation for each role
                validateEmailTemplate("account_user", alertTypes?.accountuser, emailTemplate?.accountuser);
                validateEmailTemplate("admin", alertTypes?.admin, emailTemplate?.admin);
                validateEmailTemplate("approver", alertTypes?.approver, emailTemplate?.approver);
                validateEmailTemplate("publisher", alertTypes?.publisher, emailTemplate?.publisher);
                validateEmailTemplate("seller_admin", alertTypes?.sellerAdmin, emailTemplate?.sellerAdmin);
                validateEmailTemplate("seller", alertTypes?.seller, emailTemplate?.seller);
                validateEmailTemplate("buyer", alertTypes?.buyer, emailTemplate?.buyer);

                // Construct the request body
                const body = {
                    id: selected?.id,
                    feature: selected?.feature,
                    event: event,
                    account_user: alertTypes?.accountuser
                        ? {
                            alert_type: alertTypes?.accountuser,
                            email_template: emailTemplate?.accountuser,
                            ...(emailNotificationTime?.accountuser && { email_notification_time: emailNotificationTime.accountuser })
                        }
                        : null,
                    admin: alertTypes?.admin
                        ? {
                            alert_type: alertTypes?.admin,
                            email_template: emailTemplate?.admin,
                            ...(emailNotificationTime?.admin && { email_notification_time: emailNotificationTime.admin })
                        }
                        : null,
                    approver: alertTypes?.approver
                        ? {
                            alert_type: alertTypes?.approver,
                            email_template: emailTemplate?.approver,
                            ...(emailNotificationTime?.approver && { email_notification_time: emailNotificationTime.approver })
                        }
                        : null,
                    publisher: alertTypes?.publisher
                        ? {
                            alert_type: alertTypes?.publisher,
                            email_template: emailTemplate?.publisher,
                            ...(emailNotificationTime?.publisher && { email_notification_time: emailNotificationTime.publisher })
                        }
                        : null,
                    seller_admin: alertTypes?.sellerAdmin
                        ? {
                            alert_type: alertTypes?.sellerAdmin,
                            email_template: emailTemplate?.sellerAdmin,
                            ...(emailNotificationTime?.sellerAdmin && { email_notification_time: emailNotificationTime.sellerAdmin })
                        }
                        : null,
                    seller: alertTypes?.seller
                        ? {
                            alert_type: alertTypes?.seller,
                            email_template: emailTemplate?.seller,
                            ...(emailNotificationTime?.seller && { email_notification_time: emailNotificationTime.seller })
                        }
                        : null,
                    buyer: alertTypes?.buyer
                        ? {
                            alert_type: alertTypes?.buyer,
                            email_template: emailTemplate?.buyer,
                            ...(emailNotificationTime?.buyer && { email_notification_time: emailNotificationTime.buyer })
                        }
                        : null,
                };

                // Log the constructed body (for debugging purposes)
                // console.log("Request Body:", body);


                const response = await apis.updatealertandNotification(selected?.id, body);
                if (response?.data?.status == "success") {
                    setSnackbar({
                        open: true,
                        severity: 'success',
                        message: "Updation successfull",
                    });
                }
                setOpenPopup(false)
                setLoader(false);
                // Notify user of success
            } catch (error: any) {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message:  (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
                });
                setLoader(false);
            }
        }
    };



    const userRoles = [
        { role: 'accountuser', label: 'Account User' },
        { role: 'admin', label: 'Admin' },
        { role: 'approver', label: 'Approver' },
        { role: 'seller', label: 'Seller' },
        { role: 'sellerAdmin', label: 'Seller Admin' },
        { role: 'buyer', label: 'Buyer' },
    ];
    if (loader) {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    } else {
        return (
            <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', height: '90vh', overflowY: "scroll", scrollbarWidth: 'none', overflowX: 'hidden' }}>
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

                <Grid xs={12} md={12} lg={12} width={"100%"} spacing={2} sx={{ backgroundColor: 'rgba(250,250,250,1)' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            backgroundColor: '#FFF',
                            margin: "10px",
                            padding: "15px",
                            width: '98%',
                            alignItems: 'center',
                        }}
                    >
                        <Breadcrumb
                            linkDetails={linkDetails}
                            underline="always"
                            maxItems={3}
                            itemBeforeCollapse={1}
                            itemAfterCollapse={1}
                            iconName="arrow_forward_ios_black_24dp"
                            iconSize={20}
                            iconLabel="Breadcrumb-Arrow-Right"
                            iconStyle="regular"
                            color="#333"
                            textColor="#333"
                        />
                    </Box>
                </Grid>

                <div
                    style={{
                        width: '100%',
                        padding: "10px",

                        marginBottom: '10px'
                    }}
                >
                    <Box
                        sx={{
                            padding: '14px',
                            backgroundColor: "#FFF",
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "flex-start",
                                alignItems: 'center',
                                gap: '20px',
                                flexWrap: "wrap"
                            }}
                        >
                            <ZoptsuUnderlineTitle
                                fontSizeOnLargeScreen="35px"
                                fontSizeOnMediumScreen="33px"
                                fontSizeOnSmallScreen="33px"
                                fontSizeOnExtraSmallScreen="33px"
                                titleText="Edit Alert and Notification"
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



                            {(deviceType == "mobile") && (<div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                            </div>)}


                            <div style={{
                                padding: 0, margin: 0,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: deviceType === "mobile" ? "center" : 'flex-end',
                                alignItems: 'center',
                                gap: "8px",
                                flexWrap: "wrap",
                                width: deviceType == "mobile" ? "100%" : '',
                            }}>


                            </div>
                        </div>

                        {loader ? (
                            <div className="centered-container">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: 'column', gap: '10px', height: '70vh', overflowY: "scroll" }}>
                                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', gap: '10px', width: '100%', }}>
                                    <ZupotsuTextfield
                                        title="Feature:"
                                        placeholder={""}
                                        value={selected?.feature || ""}
                                        type={"text"}
                                        name={""}
                                        previewMode={true}
                                        multiline={false}
                                        handleChange={(event: any) => {

                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', gap: '10px', width: '100%', marginBottom: "20px" }}>
                                    {/* <Typography sx={labelStyle}>{""}</Typography> 
                                    <div style={{ width: '50%', display: 'flex', flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', fontSize: '18px', fontWeight: '600' }}>
                                        Alert Types
                                    </div>
                                    <div style={{ width: '50%', display: 'flex', flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', fontSize: '18px', fontWeight: '600', paddingLeft: "5px" }}>
                                        Email Template
                                    </div> */}

                                    <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', gap: '10px', width: '100%' }}>

                                        <ZupotsuTextfield
                                            title="Event:"
                                            placeholder={""}
                                            value={event || ""}
                                            type={"text"}
                                            name={"email"}
                                            multiline={false}
                                            handleChange={(event: any) => {
                                                setEvent(event.target.value)
                                            }}
                                        />
                                    </Box>


                                </Box>

                                {userRoles.map(({ role, label }) => (
                                    alertTypes[role] ? (
                                        <div key={role} style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: alertTypes[role] ? '5px' : "0px", width: '100%', flexWrap: "wrap", paddingBottom: deviceType == "mobile" ? '20px' : "0px" }}>
                                            <div style={{ width: deviceType == "mobile" ? "100%" : '13%' }}>
                                                {(alertTypes[role]) ? (

                                                    <ZupotsuDropdown
                                                        title={label}
                                                        dropdownData={options}
                                                        value={alertTypes[role]}
                                                        name={label}
                                                        placeholder={`Enter ${label || ""}`}
                                                        handleChange={(e) => handleAlertTypeChange(role, e.target.value)}
                                                        previewMode={false}
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div style={{ width: deviceType == "mobile" ? "100%" : '65%', display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>

                                                {(emailTemplate[role] || alertTypes[role]) ? (<ZupotsuTextfield
                                                    title={`${label} Email Template`}
                                                    placeholder={"Enter Email Template"}
                                                    value={emailTemplate[role] || ""}
                                                    type={"text"}
                                                    name={"email"}
                                                    isRequired={((alertTypes[role] == "email-app") || (alertTypes[role] == "email")) ? true : false}
                                                    multiline={false}
                                                    handleChange={(event: any) => {
                                                        setEmailTemplate((prev: any) => ({
                                                            ...prev,
                                                            [role]: event.target.value,
                                                        }))
                                                    }}
                                                />) : (
                                                    <></>)}
                                            </div>
                                            <div style={{ width: deviceType == "mobile" ? "100%" : '20%', display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>

                                                {(emailNotificationTime[role]) ? (<ZupotsuTextfield
                                                    title={`Email Notification Time`}
                                                    placeholder={"Enter Email Template"}
                                                    value={emailNotificationTime[role] || ""}
                                                    type={"text"}
                                                    name={"emailnotification"}
                                                    multiline={false}
                                                    handleChange={(event: any) => {
                                                        setEmailNotificationTime((prev: any) => ({
                                                            ...prev,
                                                            [role]: event.target.value,
                                                        }))
                                                    }}
                                                />) : (
                                                    <></>)}
                                            </div>
                                        </div>
                                    ) : (<></>)
                                ))}

                                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                    <ZupotsuButton
                                        name="Update"
                                        handleClick={() => {
                                            updateAlertandNotification()
                                        }}
                                        isCustomColors={true}
                                        variant={'contained'}
                                        customTextColor="#FFF"
                                        customBgColor="#E20B18"
                                        customBgColorOnhover="white"
                                        customTextColorOnHover="#E20B18"
                                        customOutlineColor={'1px solid #E20B18'}
                                        customOutlineColorOnHover={'1px solid #E20B18'}
                                        padding="10px 35px"
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </div>
            </div>
        );
    }
};

export default EditAlertandNotification;
