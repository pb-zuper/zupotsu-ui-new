import { Close } from '@mui/icons-material';
import { Box, Button, Modal, TextField, Typography, InputAdornment } from '@mui/material';
import React, { useRef, useState } from 'react'
import ZupotsuButton from '../../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuTextfield from '../../Settings/ZupotsuTextfield';
import { Edit, forward } from '../../../assets';
import ZupotsuDropdown from '../../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import Apis from '../../../services/apis';
import { useSearchParams } from 'react-router-dom';
import { documentUpload } from '../../../assets';
const InvoiceCompletion = ({ open, close }: any) => {

    const [step, setStep] = useState(false)
    const [uploadDocument, setUploadDocument] = React.useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [load, setLoad] = useState(false)
    const [fileData, setFileData] = React.useState<any>([]);
    const [documentSize, setDocumentSize] = React.useState<any>("");
    const handleFileChange = async (e: any) => {
        setLoad(true)
        if (e.target.files && e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            const file = e.target.files[0]
            const fileSizeInKB = file.size / 1024;
            const fileSizeInMB = file.size / 1024 / 1024;
            const fileSize = fileSizeInMB > 1
                ? `${fileSizeInMB.toFixed(2)} MB`
                : `${fileSizeInKB.toFixed(2)} KB`;
            // if (file.type === 'application/pdf') {
            try {
                setLoad(true)
                const res = await apis.getS3URL(file);
                setFileData(res.data.data[0])
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'File uploaded successfully',
                });
                setLoad(false)
            } catch (error) {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong!',
                });
                setLoad(false)
            }
            // } else {
            //   setSnackbar({
            //     open: true,
            //     severity: 'error',
            //     message: 'Please upload a valid PDF file',
            //   });
            // }
            setDocumentSize(fileSize)
            setUploadDocument(fileName);
            setLoad(false)
        }
    };


    const handleBrowseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "40%",
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
        // "chat_box_id": selectedRole == "Buyer" ? sellerChatBoxId : selectedRole == "Seller" ? buyerChatBoxId : "",
        // "text": forwardingChat?.text,
        // "doc": forwardingChat?.doc,
        // "doc_name": forwardingChat?.doc_name,
        // "doc_size": forwardingChat?.doc_size,
        // "doc_type": forwardingChat?.doc_type,
        // "caption": forwardingChat?.caption,
        // "accepted_by": forwardingChat?.accepted_by,
        // "pinned_by": forwardingChat?.pinned_by,
        // "reply_message_id": forwardingChat?.reply_message_id,
        // "forwarded": true,
        // "forwarded_from": id,
    }

    // const AddChatBoxApi = async (individualid: any, individualorgid: any) => {
    //     setLoader(true)
    //     try {
    //         const chatboxbody = {
    //             "proposal_id": parseInt(proposalid),
    //             "chat_type": "individual",
    //             "chat_name": "individual",
    //             "chat_participants": [
    //                 {
    //                     "participant_id": individualid,
    //                     "participant_org_id": individualorgid
    //                 }
    //             ]
    //         }
    //         const response = await apis.addChatBox(chatboxbody);
    //         chatUpdations()
    //         return response


    //     } catch (error) {
    //         console.error("Error fetching proposals:", error);
    //         setSnackbar({
    //             open: true,
    //             severity: 'error',
    //             message: 'something went wrong!!'
    //         });
    //         setLoader(false)
    //     }
    // };


    // const handleForwarding = async () => {
    //     setLoader(true)
    //     try {
    //         const response = await apis.addChat(ForwardBody);
    //         if (response?.data?.status == "success") {
    //             setLoader(false)
    //             chatUpdations()
    //             setforwardClose(false)
    //             setForwardingChat({})
    //         }
    //     } catch (addChatError) {
    //         console.error("Error adding chat box:", addChatError);
    //         setSnackbar({
    //             open: true,
    //             severity: 'error',
    //             message: 'something went wrong!!'
    //         });
    //         setLoader(false)
    //         setforwardClose(false)
    //     }
    // };

    return (
        <Modal
            open={open}
            onClose={() => { close() }}
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
                        {step == false ? "Confirmation" : "Upload"}
                    </p>

                    <Close
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={() => { close() }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '10px' }}>

                    <Box sx={{
                        width: "100%",
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "8px 16px",
                        marginTop: '0px',
                        paddingTop: '0px',
                        paddingBottom: '0px'
                    }}>
                        {(step == false) ? (
                            <p style={{
                                fontFamily: "Inter",
                                fontSize: "20px",
                                fontWeight: 600,
                                lineHeight: "30px",
                                textAlign: "center",
                                color: "rgba(51, 51, 51, 1)"
                            }}>
                                Are you sure you want to complete this milestone?
                            </p>
                        ) : (
                            <Box sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                padding: "8px",

                            }} >

                                <Typography
                                    style={{
                                        marginBottom: '0px',
                                        color: 'var(--Gray-1, #333)',
                                        fontFamily: 'Inter',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        lineHeight: '140%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        fontWeight: '600'
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center',
                                                fontStyle: 'Inter',
                                                fontWeight: '600',
                                                marginBottom: '10px'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: '14px',
                                                    lineHeight: "21px",
                                                    fontStyle: 'Inter',
                                                    fontWeight: '700',
                                                }}
                                            >{"Please upload a supporting document"}</span>
                                           
                                        </div>

                                    </div>

                                </Typography>

                                <TextField
                                    rows={1}
                                    size="small"
                                    placeholder={"Browse"}
                                    fullWidth
                                    value={uploadDocument}
                                    disabled={false}
                                    name={'uploaddocument'}
                                    id="fullWidth"
                                    onClick={handleBrowseClick}
                                    sx={{
                                        color: "#000",
                                        background: 'transparent',
                                        cursor: 'pointer',
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <img
                                                    src={documentUpload}
                                                    alt=""
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                        readOnly: true,
                                    }}
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />

                            </Box>
                        )}
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

                    {(step == false) ? (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-evenly", gap: "10px" }}>
                            <ZupotsuButton
                                name={"No"}
                                variant={'outlined'}
                                padding={"8px 25px"}
                                isCustomColors={true}
                                customOutlineColor="1px solid rgba(189, 189, 189, 1)"
                                customOutlineColorOnHover="1px solid rgba(189, 189, 189, 1)"
                                customBgColorOnhover="#FFF"
                                customBgColor={"#FFF"}
                                customTextColorOnHover="rgba(189, 189, 189, 1)"
                                customTextColor="rgba(189, 189, 189, 1)"
                                handleClick={
                                    () => { }
                                }
                            />
                            <ZupotsuButton
                                name={"Yes"}
                                variant={'contained'}
                                padding={"8px 25px"}
                                isCustomColors={true}
                                customOutlineColor="1px solid transparent"
                                customOutlineColorOnHover="1px solid transparent"
                                customBgColorOnhover="#E20B18"
                                customBgColor={"#E20B18"}
                                customTextColorOnHover="#FFF"
                                customTextColor="#FFF"
                                handleClick={
                                    () => { 
                                        // setStep(!step)
                                     }
                                }
                            />
                        </div>

                    ) : (<ZupotsuButton
                        name={"Submit"}
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
                    />)}
                </Box>
            </Box>
        </Modal >
    )
}

export default InvoiceCompletion
