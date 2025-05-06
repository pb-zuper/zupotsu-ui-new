import {
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    Modal,
    TextField,
    Typography,
    InputAdornment
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Close, ArrowBack, } from '@mui/icons-material';
import ZupotsuTextfield from '../../Components/Settings/ZupotsuTextfield';
import ZupotsuDropdown from '../zupotsu-dropdown/zupotsu-dropdown';
import { documentUpload, whatsapp } from '../../assets';
import ZupotsuButton from '../zupotsu-button/zupotsu-button';
import Apis from '../../services/apis';
import useDeviceType from '../../utils/DeviceType';
import QRCode from 'qrcode.react';
import GetInTouchForm from '../zoputsu-get-in-touch/get-in-touch-form';



export function ContactUs(
    // {  closePopup }: any
) {

    const showZoputsuGetInTouchPopup = true

    const deviceType = useDeviceType()
    const apis = new Apis();

    const phoneNumber = '919987831843';
    const whatsappLink = `https://wa.me/${phoneNumber}`;

    const closePopup = () => { }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        maxHeight: '80%',
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 8,
        borderRadius: "8px",
        p: 0,
    };

    return (
        <Modal
            open={showZoputsuGetInTouchPopup}
            onClose={() => { }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Box sx={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                    width: '100%',
                    height: '100%',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    scrollbarWidth: 0,
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
                            Contact Us
                        </p>

                        <Close
                            sx={{
                                cursor: 'pointer',
                            }}
                        onClick={() => { closePopup() }}
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

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "flex-start",
                                alignItems: 'center',
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '18px',
                                    fontWeight: 500,
                                    lineHeight: '24px',
                                    letterSpacing: '0em',
                                    textAlign: 'left',
                                }}
                            >
                                Scan the bar code and start chatting with us
                            </Typography>
                            <div
                                style={{
                                    width: 'fit-content',
                                    height: 'fit-content',
                                    padding: '8px',
                                    borderRadius: '5px',
                                    border: '1px solid #E0E0E0',
                                    alignSelf: 'center',
                                    margin: '30px',
                                }}
                            >
                                <div
                                    style={{
                                        width: 'fit-content',
                                        height: 'fit-content',
                                        padding: '8px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <QRCode
                                        style={{
                                            cursor: 'pointer',
                                            width: '250px',
                                            height: '250px',
                                        }}
                                        value={whatsappLink}
                                        onClick={() => {
                                            window.open(
                                                whatsappLink,
                                                '_blank',
                                                'noopener,noreferrer'
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>



                    </Box>
                </Box>
            </Box>
        </Modal>

    );
};
export default ContactUs;
