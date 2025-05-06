import { Close } from '@mui/icons-material';
import { Box, Modal, Typography } from '@mui/material';
import React from 'react'
import ZupotsuButton from '../../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuTextfield from '../../Settings/ZupotsuTextfield';
import { Edit, forward } from '../../../assets';
import ZupotsuDropdown from '../../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import View from './View';

const ReplyPopup = ({ replyOpen, setReplyClose }: any) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 8,
        borderRadius: 5,
        p: 0,
    };
    return (
        <>
            <Modal
                open={replyOpen}
                onClose={() => { setReplyClose(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
                    <Box sx={{
                        width: "100%",
                        height: "auto",
                        display: 'flex',
                        flexDirection: "row",
                        padding: "10px 16px 10px 16px",
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
                            Reply Message
                        </p>

                        <Close
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => { setReplyClose(false) }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '10px' }}>
                        <Box sx={{
                            width: "100%",
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: '10px',
                        }} >
                            <View type={"Replying"} />

                        </Box>

                        <Box sx={{
                            width: "100%",
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: "8px 16px",
                            marginTop: '0px',
                            paddingTop:'0px',
                            paddingBottom:'0px'
                        }}>
                           
                        </Box>


                    </Box>

                    <Box sx={{
                        width: "100%",
                        height: "auto",
                        display: 'flex',
                        flexDirection: "row",
                        alignItems: 'center',
                        padding: "8px 16px 8px 16px",
                        borderTop: "0px solid rgba(224, 224, 224, 1)",
                        justifyContent: "center",
                        marginTop: '0px',
                        boxShadow: " 0px 0px 14px 0px rgba(0, 0, 0, 0.07)"
                    }} >
                        <ZupotsuButton
                            name={"Reply"}
                            variant={'contained'}
                            padding={"10px 40px"}
                            isCustomColors={true}
                            customOutlineColor="1px solid transparent"
                            customOutlineColorOnHover="1px solid transparent"
                            customBgColorOnhover="#E20B18"
                            customBgColor={"#E20B18"}
                            customTextColorOnHover="#FFF"
                            customTextColor="#FFF"
                            handleClick={
                                () => { }
                            }
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ReplyPopup
