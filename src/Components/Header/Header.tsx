import { Badge, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { ArrowrightRed, NotificationIcon, ZupotsuColuredLogo, nonotifications, Athlete, editIcon, DocumentIcon, SmsIcon, SMSTracking, successTikIcon, SandClock } from '../../assets';
import { memo, useCallback, useEffect, useState } from 'react';
import useDeviceType from '../../utils/DeviceType';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '../../Atoms/logout/Logout';
import MyProposals from './MyProposals';
import { Dispatch, SetStateAction } from 'react';
import { Close } from '@mui/icons-material';
import { Modal, Typography } from '@mui/material';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { Box } from '@mui/system';
import Apis from '../../services/apis';

export interface HeaderProps {
    sidebarOpen?: boolean;
    toggleSidebar?: () => void;
    isUserLogin: boolean;
    loginButtonClicked?: () => void;
    showNotificationIcon: boolean;
    onNotificationIconClicked: () => void;
    logoutButtonClicked?: () => void;
    profileShow: boolean;
    setShowProfile: Dispatch<SetStateAction<any>>;
}

export function Header(props: HeaderProps) {
    const deviceType = useDeviceType();
    const navigate = useNavigate();
    const location: any = useLocation();
    const name: any = localStorage.getItem("name") || "";
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [logoutpop, setLogoutPopup] = useState(false)
    const [sel, setSel] = useState("catalog")
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = (event: any) => { setAnchorEl(event.currentTarget) };
    const userFromLocal = localStorage.getItem("role")?.toLowerCase();
    const isSeller = (userFromLocal === "seller") ? true : false;
    const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
    const isBuyer = (userFromLocal === "buyer") ? true : false;
    const isQuickUser = (userFromLocal === "quick-reg") ? true : false;
    const handleClose = () => { setAnchorEl(null); };
    const ZupotsuUsers = (userFromLocal === "admin" || userFromLocal === "publisher" || userFromLocal === "approver") ? true : false;
    const [searchParams] = useSearchParams();
    const isCatalogue = searchParams.get('screen') == "catalogue" ? true : false;
    const queryParams = new URLSearchParams(location.search);
    const screenParam = queryParams.get('screen');
    const apis = new Apis();
    const [sortedNotifications, setsortedNotifications] = useState([])


    useEffect(() => {
        if (location.pathname == "/catalogue") {
            setSel("catalog")
        } else if (location.pathname == "/catalogue-management") {
            setSel("myassets")
        } else if (location.pathname == "/newrequests" || location.pathname == "/allforms") {
            setSel('myproposals');
        } else if (location.pathname == "/campaigns") {
            setSel('mycampaigns');
        }

        getNotifications()
    }, [location])

    const getNotifications = () => {
        apis.getNotificationsById()
            .then((res2: any) => {
                let notifications: any = [];
                res2.data.data?.map((msg: any, index: any) => {
                    notifications.push({
                        id: msg.id,
                        category: msg.type,
                        message: msg.body,
                        timestamp: msg.created_at,
                        read: msg.read,
                        cta: msg.call_to_action,
                        is_newtab: msg.is_newtab
                    })
                })

                let sortMsg = notifications.sort((a: any, b: any) => {
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);
                    return dateB.getTime() - dateA.getTime();
                });
                setsortedNotifications(sortMsg)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const style: any = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "#FFF",
        border: '0px solid #000',
        borderRadius: '8px',
        divShadow: 24,
        fontFamily: 'Inter'
    };

    const [anchorEl2, setAnchorEl2] = useState(null);
    const open2 = Boolean(anchorEl2);

    const handleClick2 = (event: any) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const formatTimestamp = (timestamp: any) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', options);
    };


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: deviceType == "mobile" ? '5px 20px' : '5px 40px',
                borderBottom: '1px solid #E0E0E0',
                backgroundColor: '#FFF',
                height: "9vh"
            }}
        >

            {(!props.sidebarOpen) && (<div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '-10px'
            }}>

                {!(ZupotsuUsers && (location.pathname == "/catalogue" || location.pathname == "/catalogue/tray" || (location.pathname == "/assetDetails" && screenParam === "catalogue"))) && (<button onClick={props.toggleSidebar} style={{ border: "0px solid rgba(0,0,0,0.2)", backgroundColor: "rgba(0,0,0,0.01)", borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", height: '30px', }}>
                    <MenuIcon sx={{ color: "red", fontSize: "30px" }} />
                </button>)}

                <img src={ZupotsuColuredLogo} style={{
                    width: "100px",
                    height: "80px",
                    paddingTop: "5px"
                }} />
            </div>)}

            {(props.sidebarOpen && (location.pathname == "/catalogue" || location.pathname.includes("/catalogue/tray") || isSeller || isSellerAdmin || isBuyer || isCatalogue || isQuickUser)) && (<div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '-5px'
            }}>

                {deviceType == "mobile" && (<button onClick={props.toggleSidebar} style={{ border: "0px solid rgba(0,0,0,0.2)", backgroundColor: "rgba(0,0,0,0.01)", borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", height: '30px', }}>
                    <MenuIcon sx={{ color: "red", fontSize: "30px" }} />
                </button>)}

                <img src={ZupotsuColuredLogo} style={{
                    width: "100px",
                    height: "80px",
                    paddingTop: "5px"
                }} />
            </div>)}

            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                alignItems: 'center',
            }}>

                <div
                    onClick={() => window.open("https://www.zupotsu.com/how-to", "_blank", "noopener,noreferrer")}
                    style={{
                        width: '200px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                        backgroundColor: 'transparent',
                        marginRight: '10px',

                    }}>
                    <div
                        style={{
                            display: 'inline-block',
                            paddingLeft: '100%',
                            animation: 'marquee 10s linear infinite',
                            color: "#e22b16",
                            fontFamily: "16px",
                            cursor: "pointer"
                        }}>
                        whats new: Check our how to videos
                    </div>
                    <style>
                        {`
                         @keyframes marquee {
                           from { transform: translateX(0%); }
                           to { transform: translateX(-100%); }
                             }
                        `}
                    </style>
                </div>

                {((deviceType != "mobile" && !isBuyer && !ZupotsuUsers)) && (
                    <div onClick={() => {
                        if (localStorage.getItem("role") == "quick-reg") {
                            setIsOpen(true)
                        } else {
                            setSel('myassets');
                            navigate("/catalogue-management")
                        }
                    }}
                        style={{ paddingBottom: '10px', borderBottom: sel == "myassets" ? '2px solid rgba(226, 11, 24, 1)' : 'none', height: '30px', fontFamily: "Inter", fontSize: "16px", fontWeight: 500, lineHeight: "28px", textAlign: "left", color: sel == "myassets" ? 'rgba(226, 11, 24, 1)' : '#333333', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', cursor: 'pointer', marginTop: '10px', }}
                    >
                        My Assets
                    </div>)}

                {((deviceType !== "mobile" && !ZupotsuUsers)) && (
                    <div
                        onClick={() => {
                            // if(location.pathname !== "/catalogue" ) {
                            //     setSel('myproposals');
                            // }
                            // else{
                            if (localStorage.getItem("role") == "quick-reg") {
                                setIsOpen(true)
                            } else {
                                setSel('myproposals');

                                navigate("/newrequests");
                            }
                            // }
                            // alert("Coming Soon!!")
                        }}
                        style={{
                            paddingBottom: '10px',
                            borderBottom: sel === "myproposals" ? '2px solid rgba(226, 11, 24, 1)' : 'none',
                            height: '30px',
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "28px",
                            textAlign: "left",
                            color: sel === "myproposals" ? 'rgba(226, 11, 24, 1)' : '#333333',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginLeft: '30px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        My Proposals
                    </div>
                )}

                {((!ZupotsuUsers) || (ZupotsuUsers && location.pathname == "/catalogue")) && (
                    <div onClick={() => {
                        setSel('catalog');
                        if (location.pathname == "/catalogue") { }
                        else if (isCatalogue) { navigate("/catalogue") }
                        else if (isBuyer || isSeller || isSellerAdmin) { navigate("/catalogue") }
                        else { window.open("/catalogue", "_blank") }
                    }}
                        style={{ paddingBottom: '10px', borderBottom: sel == "catalog" ? '2px solid rgba(226, 11, 24, 1)' : 'none', height: '30px', fontFamily: "Inter", fontSize: "16px", fontWeight: 500, lineHeight: "28px", textAlign: "left", color: sel == "catalog" ? 'rgba(226, 11, 24, 1)' : '#333333', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '30px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Catalogue
                    </div>
                )}

                {(!ZupotsuUsers) && (
                    <div onClick={() => {
                        setSel("mycampaigns")
                        navigate("/campaigns")
                    }}
                        style={{
                            padding: "3px 0px", width: "130px",
                            borderBottom: sel == "mycampaigns" ? '1px solid rgb(226, 11, 24)' : '',  
                            fontFamily: "Inter", fontSize: "16px", fontWeight: 500, lineHeight: "28px", textAlign: "left", color: sel == "mycampaigns" ? 'rgba(226, 11, 24, 1)' : '#333333', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '30px', cursor: 'pointer',
                        }}
                    >
                        My Campaigns
                    </div>
                )}

                {((ZupotsuUsers && location.pathname != "/catalogue")) && (<div
                    onClick={() => {
                        if (localStorage.getItem("role") == "quick-reg") {
                            setIsOpen(true)
                        } else {
                            if (location.pathname == "/catalogue") { }
                            else if (isCatalogue) { navigate("/catalogue") }
                            else { window.open("/catalogue", "_blank") }
                        }
                    }}
                    style={{
                        padding: "16px 14px", borderRadius: "5px", backgroundColor: '#fff', border: '1px solid rgba(226, 11, 24, 1)', gap: '4px', height: '30px', fontFamily: "Inter", fontSize: deviceType == "mobile" ? "12px" : "16px", fontWeight: 500, lineHeight: "28px", textAlign: "left", color: 'rgba(226, 11, 24, 1)', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '10px', cursor: 'pointer'
                    }}
                >
                    {(isCatalogue && location.pathname.includes("assetDetails")) ? "Back to Catalogue" : "Catalogue"}
                    <img src={ArrowrightRed} style={{ width: '24px', height: "24px", transform: (isCatalogue && location.pathname.includes("assetDetails")) ? 'rotate(220deg)' : '' }} />

                </div>)}

                {/* < NotificationsNoneOutlinedIcon  style={{margin:'10px',fontSize:'23px'}} onClick={handleClick2}>
                    
                </NotificationsNoneOutlinedIcon>  */}

                <IconButton
                    color="inherit"
                    onClick={handleClick2}
                    style={{ marginLeft: '10px', marginTop: '3px' }}
                >
                    <Badge badgeContent={sortedNotifications.filter((n: any) => !n.read).length} color="error">
                        <NotificationsNoneOutlinedIcon style={{ margin: '5px', fontSize: '25px' }} />
                    </Badge>
                </IconButton>
                <Menu
                    anchorEl={anchorEl2}
                    open={open2}
                    onClose={handleClose2}
                    sx={{
                        boxShadow: "4px 4px 12px 0px rgba(0, 0, 0, 0.07)",
                        borderRadius: '10px',
                        // maxWidth: '500px', // Set max width for the menu
                        width: '100%', // Ensure it stretches within the max width
                        flexWrap: 'wrap',
                        marginTop: '20px'
                    }}
                >
                    <MenuList sx={{ outline: 'none', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    fontSize: '25px',
                                    fontWeight: 700,
                                    color: '#333',
                                    fontFamily: "Inter",
                                    textAlign: "left",
                                    margin: '10px',
                                    marginLeft: sortedNotifications.length > 0 ? '10px' : '20px'
                                }}
                            >
                                Notifications
                            </Box>
                            {sortedNotifications.some((msg: any) => !msg.read) && (
                                <Box
                                    onClick={() => {
                                        let arr: any = [];
                                        sortedNotifications.map((msg: any) => {
                                            if (msg.read === false) {
                                                arr.push(msg.id);
                                            }
                                        });
                                        if (arr.length) {
                                            apis
                                                .markAllReadNotifications(arr)
                                                .then((res2: any) => {
                                                    getNotifications();
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        }
                                    }}
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        color: '#e22b16',
                                        fontFamily: 'Inter',
                                        textAlign: 'left',
                                        margin: '10px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Mark all read
                                </Box>
                            )}
                        </div>
                        <Divider sx={{ margin: '8px 0' }} />
                        {sortedNotifications.length > 0 && (<div>
                            {sortedNotifications.map((notification: any) => (
                                <div key={notification.id}>
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            let body = {
                                                "id": notification.id,
                                                "read": true
                                            }
                                            apis.updateNotificationsById(body)
                                                .then((res2: any) => {
                                                    getNotifications()
                                                    if (notification.cta) {
                                                        if (notification.is_newtab) { window.open(notification.cta, '_blank'); }
                                                        else { window.open(notification.cta, '_self'); }
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.log(error)
                                                });
                                        }}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column', // Stack message and date vertically
                                            alignItems: 'flex-start', // Align items to the start
                                            justifyContent: 'flex-start', // Align to top
                                            backgroundColor: notification.read ? 'inherit' : 'rgba(226, 11, 24, 0.1)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(226, 11, 24, 0.2)',
                                            },
                                            padding: '8px 16px',
                                            maxWidth: '100%', // Ensure the menu item doesn't exceed the max width of the menu
                                        }}
                                    >
                                        {/* Notification Header (Category and Message) */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            {/* Category */}
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                {!notification.read && (
                                                    <Box
                                                        sx={{
                                                            width: '8px',
                                                            height: '8px',
                                                            backgroundColor: 'red',
                                                            borderRadius: '50%',
                                                            marginRight: '10px'
                                                        }}
                                                    />
                                                )}
                                                <Box
                                                    sx={{
                                                        fontSize: '14px',
                                                        fontWeight: 700,
                                                        color: '#333',
                                                        fontFamily: "Inter",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {notification.category}
                                                    {notification.cta && (<img src={ArrowrightRed} style={{ width: '24px', height: "24px", transform: (isCatalogue && location.pathname.includes("assetDetails")) ? 'rotate(220deg)' : '' }} />)}
                                                </Box>
                                            </div>
                                            <ListItemText
                                                primary={notification.message}
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: notification.read ? 400 : 500,
                                                    color: '#333',
                                                    fontFamily: "Inter",
                                                    textAlign: "left",
                                                    display: '-webkit-box', // Use -webkit-box for truncation
                                                    WebkitBoxOrient: 'vertical', // Ensure content flows vertically
                                                    overflow: 'hidden', // Hide overflowing text
                                                    WebkitLineClamp: 2, // Limit to 2 lines
                                                    whiteSpace: 'normal', // Allow wrapping
                                                    wordWrap: 'break-word', // Break long words if necessary
                                                    maxWidth: '500px' // Limit max width of the text box
                                                }}
                                            />
                                        </div>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '12px',
                                                color: '#777',
                                                marginTop: '4px', // Space between message and date
                                                fontFamily: 'Inter',
                                            }}
                                        >
                                            {formatTimestamp(notification.timestamp)}
                                        </Typography>
                                    </MenuItem>

                                    <Divider sx={{ margin: '8px 0' }} />
                                </div>
                            ))}
                        </div>)}
                        {sortedNotifications.length == 0 && (
                            <img src={nonotifications} style={{
                                width: "100%",
                                height: "50%",
                                padding: '20px',
                                paddingBottom: "30px",
                                maxWidth: '1000px',
                                maxHeight: '500px',
                            }} />
                        )}

                    </MenuList>
                </Menu>
                {/* < NotificationsActiveOutlinedIcon  style={{margin:'10px',fontSize:'24px',color:'#e22b16'}} /> */}
                {/* {deviceType != "mobile" && ( */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        onClick={handleClick}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // border:'2px solid #E10B17',
                            borderRadius: 100,
                            marginLeft: '10px',
                            background: '#F2F2F2',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer'
                        }}
                    >
                        {/* <img
                            src={Athlete}
                            width={25}
                            height={25}
                            onClick={()=>{}}
                        /> */}
                        <span style={{
                            fontFamily: "Inter",
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "28px",
                            // marginLeft: '5px'
                        }}>{name.charAt(0).toUpperCase()}</span>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{
                            boxShadow: "4px 4px 12px 0px rgba(0, 0, 0, 0.07)",
                            borderRadius: '10px',
                        }}
                    >
                        <MenuList
                            sx={{
                                outline: 'none',
                                borderRadius: '10px'
                            }}
                        >
                            {
                                [
                                    {
                                        key: 1,
                                        name: "Profile",
                                        disabled: false,
                                    },

                                    {
                                        key: 2,
                                        name: "Logout",
                                        disabled: false,
                                    }
                                ].map((menudata) => !menudata.disabled && (
                                    <MenuItem
                                        key={menudata.key}
                                        onClick={() => {
                                            if (menudata.name == "Logout") {
                                                setLogoutPopup(true)
                                            }
                                            else if (menudata.name == "Profile") {
                                                // setShowProfile(true)
                                                setSel("profile")
                                                navigate('/profile')
                                            }
                                            handleClose();
                                        }}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            '&:hover': {
                                                background: 'rgba(226, 11, 24, 0.2)',
                                            },
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >

                                            <ListItemText
                                                sx={{
                                                    fontSize: '10px',
                                                    fontWeight: 500,
                                                    color: '#333',
                                                    fontFamily: "Inter",
                                                    lineHeight: "21px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                {menudata.name}
                                            </ListItemText>
                                        </div>
                                    </MenuItem>
                                ))
                            }
                        </MenuList>
                    </Menu>
                    {deviceType != "mobile" && (<span onClick={handleClick} style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 500, lineHeight: "28px", marginLeft: '8px', cursor: 'pointer' }}>
                        {(name?.length < 12) ? (name) : (name?.slice(0, 12) + "...")}
                    </span>)}
                </div>
            </div>
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


                            Complete Registration
                        </Typography>

                        <button onClick={() => { setIsOpen(false) }} style={{ backgroundColor: 'transparent', border: '0px solid transparent', fontSize: '16px', cursor: 'pointer' }} ><Close /></button>
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
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img src={SandClock} style={{ width: '50px' }} />
                                <Typography
                                    style={{
                                        color: 'var(--Gray-1, #333)',
                                        fontFamily: 'Inter',
                                        fontSize: deviceType === 'mobile' ? '14px' : '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: '130%',
                                        textAlign: 'center',
                                        margin: '10px'
                                    }}
                                >
                                    Please complete your registration to access this feature.
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

                        }}
                    >
                        <Button onClick={() => {
                            navigate('/completeregistration')
                            setIsOpen(false)
                        }} sx={{
                            color: "#FFF",
                            padding: '12px, 16px, 12px, 16px', backgroundColor: "rgba(226, 11, 24, 1)",
                            border: "0px solid rgba(189, 189, 189, 1)",
                            fontSize: "14px",
                            fontWeight: 600,
                            ':hover': {
                                backgroundColor: "#ff352e",
                            }
                        }}>
                            Complete
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Logout logoutpop={logoutpop} setLogoutPopup={setLogoutPopup} />
        </div>
    );
}

export default memo(Header);