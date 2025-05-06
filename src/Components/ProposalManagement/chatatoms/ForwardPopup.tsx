import { Close } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import ZupotsuButton from '../../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuTextfield from '../../Settings/ZupotsuTextfield';
import { Edit, forward } from '../../../assets';
import ZupotsuDropdown from '../../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import View from './View';
import Apis from '../../../services/apis';
import { useSearchParams } from 'react-router-dom';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
const ForwardPopup = ({ forwardOpen, setforwardClose, selectedRole, id, forwardingChat, sellerChatBoxId, buyerChatBoxId, chatUpdations, isBuyerChatExist, isSellerChatExist, buyerid, buyerorgid, sellerid, sellerorgid, setForwardingChat, name }: any) => {
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
    const [searchParams] = useSearchParams();
    const proposalid = searchParams.get('id') ?? '';
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const [loader, setLoader] = useState(false);
    const apis = new Apis();


    const ForwardBody: any = {
        "chat_box_id": selectedRole == "Buyer" ? sellerChatBoxId : selectedRole == "Seller" ? buyerChatBoxId : "",
        "text": forwardingChat?.text,
        "doc": forwardingChat?.doc,
        "doc_name": forwardingChat?.doc_name,
        "doc_size": forwardingChat?.doc_size,
        "doc_type": forwardingChat?.doc_type,
        "caption": forwardingChat?.caption,
        "accepted_by": forwardingChat?.accepted_by,
        "pinned_by": forwardingChat?.pinned_by,
        "reply_message_id": forwardingChat?.reply_message_id,
        "forwarded": true,
        "forwarded_from": id,
    }

    const AddChatBoxApi = async (individualid: any, individualorgid: any) => {
        setLoader(true)
        try {
            const chatboxbody = {
                "proposal_id": parseInt(proposalid),
                "chat_type": "individual",
                "chat_name": "individual",
                "chat_participants": [
                    {
                        "participant_id": individualid,
                        "participant_org_id": individualorgid
                    }
                ]
            }
            const response = await apis.addChatBox(chatboxbody);
            chatUpdations()
            return response


        } catch (error: any) {
            console.error("Error fetching proposals:", error);
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
            });
            setLoader(false)
        }
    };


    const handleForwarding = async () => {
        setLoader(true)
        try {
            const response = await apis.addChat(ForwardBody);
            if (response?.data?.status == "success") {
                setLoader(false)
                chatUpdations()
                setforwardClose(false)
                setForwardingChat({})
            }
        } catch (error: any) {
            console.log("Error adding chat box:", error);
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
            });
            setLoader(false)
            setforwardClose(false)
        }
    };

    return (
        <>
            <Modal
                open={forwardOpen}
                onClose={() => { setforwardClose(false) }}
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
                            Forward Message
                        </p>

                        <Close
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => { setforwardClose(false) }}
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
                            <View type={"Forwarding"} item={forwardingChat} />

                        </Box>

                        {(isSellerChatExist && isBuyerChatExist) ? (<Box sx={{
                            width: "100%",
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: "8px 16px",
                            marginTop: '0px',
                            paddingTop: '5px',
                            paddingBottom: '0px'
                        }}>
                            {/* <ZupotsuDropdown
                                title={selectedRole?.toLowerCase() == "buyer" ? "Seller" : selectedRole?.toLowerCase() == "seller" ? "Buyer" : ""}
                                placeholder={selectedRole?.toLowerCase() == "buyer" ? "Seller" : selectedRole?.toLowerCase() == "seller" ? "Buyer" : ""}
                                isRequired={true}
                                value={id}
                                previewMode={true}
                                dropdownData={[id]}
                                name={selectedRole?.toLowerCase() == "buyer" ? "Seller" : selectedRole?.toLowerCase() == "seller" ? "Buyer" : ""}
                                handleChange={(event: any) => {

                                }}
                            /> */}
                            <ZupotsuTextfield
                                title={selectedRole?.toLowerCase() == "buyer" ? "To Seller" : selectedRole?.toLowerCase() == "seller" ? "To Buyer" : ""}
                                placeholder={selectedRole?.toLowerCase() == "buyer" ? "Seller" : selectedRole?.toLowerCase() == "seller" ? "Buyer" : ""}
                                isRequired={true}
                                value={name}
                                previewMode={true}
                                // dropdownData={[name]}
                                name={selectedRole?.toLowerCase() == "buyer" ? "Seller" : selectedRole?.toLowerCase() == "seller" ? "Buyer" : ""}
                                handleChange={(event: any) => {

                                }}
                            />
                        </Box>) : (<Button sx={{ border: '1px solid #e22b16', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: "center", gap: '5px' }}
                            onClick={() => {
                                if (isSellerChatExist && selectedRole == "Seller") {
                                    AddChatBoxApi(buyerid, buyerorgid)
                                } else if (isBuyerChatExist && selectedRole == "Buyer") {
                                    AddChatBoxApi(sellerid, sellerorgid)
                                }
                            }}
                        >
                            <MarkUnreadChatAltIcon sx={{ color: '#e22b16', width: '20px', height: '20px' }} /> <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500' }}>Initiate Chat</span>
                        </Button>)}


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
                            name={"Forward"}
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
                                () => { handleForwarding() }
                            }
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ForwardPopup
