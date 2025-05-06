import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { CloseIcon } from '../../assets';
import { Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useDeviceType from '../../utils/DeviceType';
import mixpanel from 'mixpanel-browser';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';

export default function Logout({ setLogoutPopup, logoutpop }: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate()
    const deviceType = useDeviceType();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: deviceType=="mobile"?350:500,
        backgroundColor: "#FFF",
        border: '0px solid #000',
        borderRadius: '8px',
        divShadow: 24,
        padding: "0px",
        fontFamily: 'Inter'
    };


    return (
        <React.Fragment>

            <Modal
                open={logoutpop}
                onClose={() => { setLogoutPopup(false) }}

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
                            Logout
                        </Typography>

                        <button style={{ backgroundColor: 'transparent', border: '0px solid transparent', fontSize: '16px', cursor: 'pointer' }} onClick={() => setLogoutPopup(false)}>X</button>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            height: '100px',
                            padding: "16px ",
                            gap: "0px",
                            border: "0px 0px 1px 0px",
                            borderColor: "rgba(224, 224, 224, 1)",
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography id="modal-description" sx={{
                            mt: 1,
                            fontFamily: "Inter",
                            fontSize: "20px",
                            fontWeight: 700,
                            lineHeight: "30px",
                            textAlign: "center",
                        }}>
                            Are you sure you want to logout?
                        </Typography>

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
                        <Button onClick={() => { setLogoutPopup(false) }} sx={{
                            mr: 1,
                            padding: '12px, 16px, 12px, 16px',
                            width: '200px',
                            border: "1px solid rgba(189, 189, 189, 1)",
                            fontFamily: "Inter",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "21px",
                            color: 'rgba(130, 130, 130, 1)'
                        }}>
                            No
                        </Button>
                        <></>
                        <Button onClick={() => {
                            const sessionData = {
                                // PagesVisited: pagesVisitedArray, 
                                IsSignedIn: true,
                                // SessionCount: sessionCount,
                              };
                              
                            mixpanelEvents.onSessionEnded(sessionData);
                            localStorage.clear()
                            navigate('/loginregister')
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
                            Yes
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment >
    );
}