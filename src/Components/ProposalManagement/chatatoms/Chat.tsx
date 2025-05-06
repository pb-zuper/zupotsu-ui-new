import { Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Modal, Typography, Box, Snackbar, } from '@mui/material';
import React, { useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Closed, DocumentDownloadIcon, editIcon, FlipView, forward, Pinned, pin } from '../../../assets';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import pdfIcon from '../../../assets/pdf.svg'
import { useNavigate, useSearchParams } from 'react-router-dom';
import Apis from '../../../services/apis';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import mixpanelEvents from '../../../mixpanel/mixpanelEvents';
import ZupotsuButton from '../../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuTextfield from '../../Settings/ZupotsuTextfield';
const Chat = ({ pre, prop, item, setForwardOpen, setReplyOpen, setForwardingChat, chatUpdations }: any) => {
    const [loader, setLoader] = useState(false);
    const [isPopUp, setIsPopup] = useState(false)
    const [popuptype, setPopuptype] = useState<any>("")
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const [reason, setReason] = useState("")
    const [menuanchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const currentUser = localStorage.getItem("userID") || null
    const openMenu = Boolean(menuanchorEl);
    const userFromLocal = localStorage.getItem("role")?.toLowerCase();
    const isItAdmin = (userFromLocal === "admin") ? true : false;
    const isApprover = (userFromLocal === "approver") ? true : false;
    const isPublisher = (userFromLocal === "publisher") ? true : false;
    const isBuyer = (userFromLocal === "buyer") ? true : false;
    const [documentAccepted, setDocumentAccepted] = useState(item?.doc_accept)
    const [isSent, setIsSent] = useState(item?.sent_by == currentUser ? false : true)
    const userId: any = localStorage.getItem('userID');
    const [isPinned, setIsPinned] = useState(item?.pinned)
    const deviceType: any = useNavigate()
    const apis = new Apis();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') ?? '';
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "400px",
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 8,
        borderRadius: 5,
        p: 0,
    };


    const AddProposalLeadStatus = async (label: any) => {
        setLoader(true)
        try {
            const body = {
                "proposal_id": parseInt(id),
                "name": label
            }
            const response = await apis.addProposalLeadStatus(body);
            if (response?.data?.status == "success") {
                let oppr: any = [];
                prop.opportunities.map((item: any) => {
                    oppr.push(item.opportunity)
                })
                const rfpUpdatedData = {
                    SellerName: prop.seller.name,
                    RFPID: prop.id,
                    BuyerName: prop.buyer.name,
                    AssetName: prop.asset.asset_detail[0].name,
                    OpportunityName: oppr,
                    AssetType: prop.asset_type,
                    DateInitiated: prop.created_at,
                    CurrentStage: "Proposal",
                    PreviousStage: pre,
                    ZupotsuUserName: localStorage.getItem("name"),
                    DocumentStatus: label,
                    LastUpdated: prop.updated_at
                };
                mixpanelEvents.onRFPUpdated(rfpUpdatedData);
                setLoader(false)
            }

        } catch (error) {
            console.error("Error fetching proposals:", error);
            setLoader(false)
        }
    };

    const deleteChat = async (id: any) => {
        setLoader(true)
        try {

            const response = await apis.deleteChat(id);
            if (response?.data?.status == "success") {
                chatUpdations()
                setLoader(false)
            }

        } catch (error) {
            console.log("Error fetching proposals:", error);
            setSnackbar({
                open: true,
                severity: "error",
                message: "Something went wrong",
            });
            setLoader(false)
        }
    };

    const menuOptions = [
        { key: 1, name: 'Reply' },
        ...(isItAdmin || isPublisher || isApprover ? [{ key: 2, name: 'Forward' }] : []),
        // { key: 3, name: isPinned ? "Unpin Message" : 'Pin Message' },
        ...(isPinned && (isItAdmin || parseInt(item?.pinned_by) === parseInt(userId))
            ? [{ key: 3, name: 'Unpin Message' }]
            : (!isPinned) ? [{ key: 3, name: 'Pin Message' }] : []
        ),
        ...(!isSent) ? [{ key: 4, name: 'Delete' }] : [],
    ];

    const updateDocumentstatus = async (status: any) => {
        setLoader(true)
        try {
            const DocBody: any = {
                "id": item.id,
                "doc_accept": status,
            }

            if (status == "accepted") {
                DocBody.accepted_by = currentUser && parseInt(currentUser)
                AddProposalLeadStatus("Proposal Accepted")
            }
            else {
                DocBody.rejected_by = currentUser && parseInt(currentUser)
                DocBody.rejection_reason = reason
                AddProposalLeadStatus("Proposal Rejected")
            }
            const response = await apis.updateChat(item.id, DocBody);
            if (response?.data?.status == "success") {
                setDocumentAccepted(status)
                setIsPopup(false)
                setPopuptype("")
                setLoader(false)
            }
        } catch (addChatError) {
            setSnackbar({
                open: true,
                severity: "error",
                message: "Something went wrong",
            });
            setLoader(false)
        }
    };

    const pinnedBody: any = {
        "id": item?.id,
        "pinned": isPinned ? false : true,
        "pinned_by": isPinned ? null : parseInt(userId),
    }


    const Updatechat = async () => {
        try {
            const response = await apis.updateChat(item?.id, pinnedBody);
            if (response?.data?.status == "success") {
                setLoader(false)
                setIsPinned(true)
                chatUpdations()

            }
        } catch (addChatError) {
            // console.error("Error adding chat box:", addChatError);
            setSnackbar({
                open: true,
                severity: "error",
                message: "Something went wrong",
            });
            setLoader(false)
        }
    };

    const formatDateString = (dateString: any) => {
        if (!dateString) return 'NA';

        const date = new Date(dateString);

        const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
        const formattedDate = date.toLocaleDateString('en-US', options);
        const [month, day, year] = formattedDate.split(' ');
        const formattedMonth = month.slice(0, 3);
        return `${formattedMonth}\n${day} ${year}`;
    };

    if (loader) {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    } else {
        return (
            <div style={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: isSent ? 'space-between' : "flex-end", alignItems: 'flex-start' }}>
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
                <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', minWidth: '20%', maxWidth: '70%', gap: '5px', alignItems: 'flex-start' }}>
                    {(isSent) ? (<div style={{ width: deviceType == "mobile" ? "15%" : 'auto', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'flex-end', }}>
                        <div
                            onClick={() => { }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 100,
                                width: '32px',
                                height: '32px',
                                cursor: 'pointer',
                                border: '2px solid var(--Theme-colors-border-2, rgba(229, 229, 229, 1))',
                                backgroundColor: '#D2EAF4',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: '20px',
                                    fontWeight: 500,
                                    lineHeight: '28px',
                                }}
                            >
                                {item?.sent_by_user?.name?.charAt(0)}
                            </span>
                        </div>
                    </div>) : (<></>)}

                    {(!item?.doc) ? (<div style={{ width: deviceType == "mobile" ? "85%" : '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: !isSent ? "flex-end" : 'space-between', width: '100%' }}>
                            {(isSent) ? (<p
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    lineHeight: '16.94px',
                                    margin: 0,
                                    paddingRight: '10px'
                                }}
                            >
                                {item?.sent_by_user?.name}
                            </p>) : (<></>)}

                            <p
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    lineHeight: '16.94px',
                                    margin: 0,
                                }}
                            >
                                {item?.sent_at &&
                                    new Date(item.sent_at).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    }).replace(' ', '').toUpperCase()
                                    // formatDateString(item.sent_at)
                                }

                            </p>
                        </div>
                        <div style={{
                            width: '100%',
                            borderRadius: '10px',
                            background: 'transparent',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>

                            {(item?.reply_message_id && !item?.forwarded) && (<div style={{
                                width: '100%',
                                borderRadius: '10px',
                                borderBottomLeftRadius: "0px",
                                borderBottomRightRadius: "0px",
                                borderTopRightRadius: isSent ? '10px' : "0px",
                                borderTopLeftRadius: isSent ? '0px' : "10px",
                                // height: !item?.reply_message?.doc ? "40px" : '30px',
                                background: 'rgba(50,50,50,0.2)',
                                display: 'flex',
                                paddingTop: "3px",
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: "flex-start",
                                marginBottom: '-8px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: "flex-start",
                                    gap: '5px',
                                    paddingTop: '5px'
                                }}>
                                    <img src={forward} style={{ width: '15px', height: "12px", marginLeft: '5px', transform: "rotate(0deg)" }} />
                                    <p style={{
                                        fontSize: '10px', fontFamily: 'Inter', fontWeight: '500', textAlign: "left",
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: item?.reply_message?.doc ? 1 : 2,
                                        overflow: 'hidden',
                                        marginRight: '5px',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {(item?.reply_message?.doc) && (<img
                                            src={pdfIcon}
                                            style={
                                                {
                                                    width: "14px",
                                                    margin: 0,
                                                    fontSize: '12px',

                                                }}
                                        />)}{item?.reply_message?.doc ? item?.reply_message?.doc_name : item?.reply_message?.text}</p>
                                </div>

                            </div>)}
                            <div style={{
                                width: '100%',
                                borderRadius: '10px',
                                borderTopRightRadius: isSent ? '10px' : "0px",
                                borderTopLeftRadius: isSent ? '0px' : "10px",
                                background: !isSent ? "rgba(225,241,248)" : 'rgba(242, 242, 242, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                {(item?.forwarded
                                    // && !item?.reply_message_id
                                ) && (
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            height: "15px",
                                            margin: 0, padding: 0,
                                            paddingTop: '5px',
                                            width: '100%',
                                        }}>
                                            <img src={forward} style={{ width: '15px', height: "9px", marginLeft: '10px', transform: "scaleX(-1)" }} />
                                            <p style={{ width: '100%', margin: 0, padding: 0, fontFamily: 'Inter', fontSize: '10px', textAlign: "left", paddingLeft: '5px', }}>Forwarded</p>
                                        </div>
                                    )}

                                <div
                                    style={{
                                        width: '100%',
                                        borderRadius: '10px',
                                        borderTopRightRadius: isSent ? '10px' : "0px",
                                        borderTopLeftRadius: isSent ? '0px' : "10px",
                                        background: 'transparent',
                                        padding: "10px",
                                        paddingLeft: '10px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        alignItems: 'center'
                                    }}
                                >
                                    <div style={{
                                        width: isPinned ? '95%' : '100%',
                                        background: 'transparent',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "flex-start",
                                        alignItems: 'center'
                                    }}>
                                        <p
                                            style={{
                                                fontFamily: 'Inter',
                                                fontSize: '14px',
                                                fontWeight: 400,
                                                lineHeight: '16.94px',
                                                margin: 0,
                                                textAlign: 'start',
                                            }}
                                        >
                                            {item?.text}
                                        </p>
                                    </div>
                                    {isPinned && (<div style={{
                                        width: '5%',
                                        background: 'transparent',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '10px',
                                        margin: 0,
                                        height: '18px'
                                    }}>
                                        {(isPinned) ? (
                                            <img src={pin} alt="Pinned" style={{ width: '14px', height: '14px' }} />
                                        ) : (
                                            <div style={{ width: '14px', height: '14px' }} > </div>
                                        )}
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>) : (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                            <div style={{ display: 'flex', flexDirection: "row", justifyContent: !isSent ? "flex-end" : 'space-between', width: '100%' }}>
                                {(isSent) ? (<p
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        lineHeight: '16.94px',
                                        margin: 0,
                                        paddingRight: '10px'
                                    }}
                                >
                                    {item?.sent_by_user?.name}
                                </p>) : (<></>)}
                                <p
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        lineHeight: '16.94px',
                                        margin: 0,
                                    }}
                                >
                                    {item?.sent_at &&
                                        new Date(item.sent_at).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true
                                        }).replace(' ', '').toUpperCase()
                                        // formatDateString(item.sent_at)
                                    }
                                </p>
                            </div>
                            <div style={{
                                width: '100%',
                                borderRadius: '10px',
                                background: 'transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                                {(item?.reply_message_id && !item?.forwarded) && (<div style={{
                                    width: '100%',
                                    borderRadius: '10px',
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    background: 'rgba(50,50,50,0.2)',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: "flex-start",
                                    paddingTop: "5px",
                                    marginBottom: '-10px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: "flex-start",
                                        gap: '5px',
                                        paddingRight: '15px'
                                    }}>
                                        <img src={forward} style={{ width: '15px', height: "12px", marginLeft: '5px', transform: "rotate(0deg)" }} />
                                        <p style={{
                                            fontSize: '11px',
                                            fontFamily: 'Inter',
                                            fontWeight: '500',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: item?.reply_message?.doc ? 1 : 2,
                                            overflow: 'hidden',
                                            marginRight: '5px',
                                            textOverflow: 'ellipsis',
                                        }}>
                                            {(item?.reply_message?.doc) && (<img
                                                src={pdfIcon}
                                                style={{
                                                    width: "17px",
                                                    height: '17px',
                                                    marginRight: '5px'
                                                }}
                                            />)}
                                            {item?.reply_message?.doc ? item?.reply_message?.doc_name : item?.reply_message?.text}
                                        </p>
                                    </div>
                                </div>)}

                                <div style={{
                                    width: '100%',
                                    borderRadius: '15px',
                                    background: !isSent ? "rgba(225,241,248)" : 'rgba(242, 242, 242, 1)',
                                    // height: item?.forwarded ? '70px' : "60px",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
                                }}>
                                    {(item?.forwarded && !item?.reply_message_id) && (
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            height: "15px",
                                            margin: 0, padding: 0,
                                            paddingTop: '5px',
                                            width: '100%',
                                        }}>
                                            <img src={forward} style={{ width: '15px', height: "12px", marginLeft: '10px', transform: "scaleX(-1)" }} />
                                            <p style={{ width: '100%', margin: 0, padding: 0, fontFamily: 'Inter', fontSize: '10px', textAlign: "left", paddingLeft: '5px' }}>Forwarded</p>
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            width: '100%',
                                            borderRadius: '15px',
                                            background: 'transparent',
                                            padding: '10px',
                                            height: '60px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div style={{
                                            width: '90%',
                                            background: 'transparent',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: "flex-start",
                                                alignItems: 'center',
                                                width: '90%'
                                            }}>
                                                <img
                                                    src={pdfIcon}
                                                    style={{
                                                        width: "32px",
                                                        height: '32px'
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start',
                                                        gap: '5px',
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontFamily: 'Inter',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            lineHeight: '16.94px',
                                                            margin: 0,
                                                            padding: 0,
                                                            textAlign: 'left',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            marginRight: '5px',
                                                            maxWidth: '150px', // Set maxWidth or width for ellipsis to take effect
                                                        }}
                                                    >
                                                        {item?.doc_name}
                                                    </div>
                                                    <p
                                                        style={{
                                                            fontFamily: 'Inter',
                                                            fontSize: '12px',
                                                            fontWeight: 400,
                                                            lineHeight: '16.94px',
                                                            margin: 0,
                                                            padding: 0,
                                                        }}
                                                    >
                                                        {item?.doc_size}
                                                    </p>
                                                </div>

                                            </div>
                                            <a href={item?.doc} target='_blank' download={item.doc}>
                                                <button
                                                    onClick={() => { }}
                                                    style={{
                                                        width: "24px",
                                                        height: '24px',
                                                        color: 'rgba(41, 45, 50, 1)',
                                                        cursor: 'pointer',
                                                        backgroundColor: 'transparent',
                                                        border: '0px solid transparent',
                                                        padding: 0,
                                                        margin: 0
                                                    }}>
                                                    <img
                                                        src={DocumentDownloadIcon}
                                                        style={{
                                                            width: "24px",
                                                            height: '24px',
                                                            color: 'rgba(41, 45, 50, 1)',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                </button>
                                            </a>
                                        </div>
                                        {(<div style={{
                                            width: '7%',
                                            background: 'transparent',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '10px',
                                        }}>
                                            {(isPinned) ? (
                                                <img src={pin} alt="Pinned" style={{ width: '14px', height: '14px' }} />
                                            ) : (
                                                <div style={{ width: '14px', height: '14px' }} > </div>
                                            )}
                                        </div>)}


                                    </div>

                                </div>
                            </div>
                            {(item?.doc_type) && (<p style={{ width: '100%', margin: 0, paddingLeft: "30px", padding: 0, fontFamily: 'Inter', fontSize: '12px', textAlign: "left" }}>{item?.doc_type}</p>)}
                            {(item?.doc_type?.toLowerCase() == "proposal document") && (<div style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'flex-start', gap: "12px" }}>
                                {(!documentAccepted) ? (<>
                                    {(isSent && isBuyer) ? (<>
                                        <Button
                                            onClick={() => { updateDocumentstatus("accepted") }}
                                            sx={{
                                                width: "74px",
                                                height: "32px",
                                                gap: "8px",
                                                borderRadius: "5px",
                                                color: '#FFF',
                                                background: "rgba(33, 150, 83, 1)",
                                                border: '0px solid #FFF',
                                                fontFamily: "Inter",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                lineHeight: "16.8px",
                                                '&:hover': {
                                                    background: "rgba(33, 150, 83,0.8)",
                                                }
                                            }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={() => { setIsPopup(true); setReason(""); setPopuptype("rejected") }}
                                            sx={{
                                                width: "74px",
                                                height: "32px",
                                                gap: "8px",
                                                color: '#FFF',
                                                borderRadius: "5px",
                                                background: "rgba(226, 11, 24, 1)",
                                                border: '0px solid #FFF',
                                                fontFamily: "Inter",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                lineHeight: "16.8px",
                                                '&:hover': {
                                                    background: "rgba(226, 11, 24, 0.8)",
                                                }
                                            }}>
                                            Reject
                                        </Button>
                                    </>) : (
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: 'center', gap: "5px" }}>
                                            <AccessTimeIcon sx={{ width: '18px', height: '18px' }} />
                                            <p style={{
                                                fontFamily: "Inter",
                                                fontSize: "12px",
                                                fontWeight: 500,
                                                color: 'rgba(0,0,0,0.8)',
                                                margin: 0,
                                                padding: 0
                                            }}>Waiting for acceptance</p>

                                        </div>
                                    )}
                                </>) : (
                                    <div style={{
                                        width: "89px",
                                        height: "32px",
                                        borderRadius: "5px",
                                        backgroundColor: documentAccepted?.toLowerCase() == "accepted" ? 'rgba(33, 150, 83, 0.15)' : "rgba(226, 11, 24, 0.15)",
                                        color: documentAccepted?.toLowerCase() == "accepted" ? 'rgba(33, 150, 83, 1)' : "rgba(226, 11, 24)",
                                        fontFamily: "Inter",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: 'center',
                                    }}>
                                        {documentAccepted?.toLowerCase() == "accepted" ? "Accepted" : "Rejected"}
                                    </div>
                                )}
                            </div>
                            )}
                        </div>
                    )}


                </div>

                <div
                    style={{
                        background: '#FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={handleMenuClick}
                >
                    <MoreVertIcon style={{ color: '#333', width: '24px', height: '24px' }} />
                </div>

                <Menu
                    anchorEl={menuanchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    sx={{
                        boxShadow: '4px 4px 12px 0px rgba(0, 0, 0, 0.07)',
                        borderRadius: '10px',
                        mt: '8px',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '-10px',
                            left: '-50px',
                            width: '0',
                            height: '0',
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderBottom: '6px solid white',
                            boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.1)',
                        },
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuList sx={{ outline: 'none', borderRadius: '10px', padding: 0, margin: 0 }}>
                        {menuOptions.map((menudata) => (
                            <MenuItem
                                key={menudata.key}
                                onClick={() => {
                                    if (menudata?.name == "Forward") {
                                        setForwardOpen(true)
                                        setForwardingChat(item)
                                        handleMenuClose()
                                    } else if (menudata?.name == "Reply") {
                                        setReplyOpen(true)
                                        setForwardingChat(item)
                                        handleMenuClose()
                                    } else if (menudata?.name == "Pin Message") {
                                        Updatechat()
                                        handleMenuClose()
                                    } else if (menudata?.name == "Unpin Message") {
                                        if (isPinned && (isItAdmin || (parseInt(item?.pinned_by) == parseInt(userId)))) {
                                            Updatechat()
                                        }
                                        handleMenuClose()
                                    } else if (menudata?.name == "Delete") {
                                        deleteChat(item?.id)
                                        handleMenuClose()
                                    }
                                }}
                                sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    '&:hover': {
                                        background: 'rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: '#333',
                                        fontFamily: 'Inter',
                                        lineHeight: '21px',
                                        textAlign: 'left',
                                        padding: 0,
                                        margin: 0
                                    }}
                                >
                                    {menudata.name}
                                </p>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>


                <Modal
                    open={isPopUp}
                    onClose={() => { setIsPopup(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "flex-start", gap: '15px', borderRadius: '8px', paddingTop: '10px' }}>
                        <div onClick={() => { setIsPopup(false) }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '20px', paddingLeft: '20px', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>

                            <Typography sx={{
                                fontFamily: "Inter",
                                fontSize: "16px",
                                fontWeight: 600,
                                lineHeight: "30px",
                                textAlign: "center",

                            }}>{"Document Rejection "}</Typography>
                            <ClearRoundedIcon />
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'flex-start', padding: '20px', paddingTop: '5px' }}>
                            <ZupotsuTextfield
                                title={`Rejection Reason`}
                                placeholder={`Enter Rejection Reason`}
                                value={reason}
                                isRequired={true}
                                type={"text"}
                                name={"remark"}
                                multiline={true}
                                rows={3}
                                handleChange={(event: any) => {
                                    setReason(event.target.value)
                                }}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: "space-evenly",
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: '16px',
                                width: '100%',
                                padding: '10px',
                                borderTop: '1px solid rgba(224, 224, 224, 1)'

                            }}
                        >
                            <ZupotsuButton
                                name="Cancel"
                                variant={'outlined'}
                                padding={"12px, 50px, 12px, 50px"}
                                isCustomColors={true}
                                customOutlineColor="1px solid rgb(130, 130, 130)"
                                customOutlineColorOnHover="1px solid rgb(130, 130, 130)"
                                customBgColorOnhover="#FFF"
                                customBgColor="#FFF"
                                customTextColorOnHover="rgb(130, 130, 130)"
                                customTextColor="rgb(130, 130, 130)"
                                handleClick={() => {
                                    setIsPopup(false)
                                }}
                            />
                            <ZupotsuButton
                                name="Submit"
                                variant={'contained'}
                                padding={"12px, 50px, 12px, 50px"}
                                isCustomColors={true}
                                customOutlineColor="1px solid #E20B18"
                                customOutlineColorOnHover="1px solid #E20B18"
                                customBgColorOnhover="rgba(226, 11, 24, 1)"
                                customBgColor="rgba(226, 11, 24, 1)"
                                customTextColorOnHover="#FFF"
                                customTextColor="#FFF"
                                handleClick={() => {
                                    if (reason) {
                                        updateDocumentstatus("rejected")
                                    } else {
                                    }

                                }}
                            />
                        </div>
                    </Box>

                </Modal>
            </div >
        );
    }
};

export default Chat;
