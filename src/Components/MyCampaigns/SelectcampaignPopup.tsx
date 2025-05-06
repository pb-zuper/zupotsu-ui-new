import { Close } from '@mui/icons-material';
import { Box, Modal, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import { blog, kohli, NoDataImage } from '../../assets';
import Apis from '../../services/apis';
import NoData from '../../error/NoData';
import useDeviceType from '../../utils/DeviceType';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

const SelectCampaignPopup = ({ open, setOpen, allcampaigns, selectedPost, setSelectedPost, campaignDataId, selectCampaignPeriod }: any) => {
    const [loader, setLoader] = useState(false);
    const deviceType = useDeviceType()

    const camfromDate: any = dayjs(selectCampaignPeriod?.[0]).isValid()
        ? dayjs(selectCampaignPeriod[0]).toISOString()
        : null;

    const camtoDate: any = dayjs(selectCampaignPeriod?.[1]).isValid()
        ? dayjs(selectCampaignPeriod[1]).toISOString()
        : null;

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleCampaignSelect = (campaign: any) => {
        setSelectedPost((prevSelected: any) =>
            prevSelected.some((c: any) => c.id === campaign?.post_id && c?.type === campaign?.type)
                ? prevSelected?.filter((c: any) => !(c?.id === campaign?.post_id && c?.type === campaign?.type))
                : [...prevSelected, { id: campaign?.post_id, type: campaign?.type, caption: campaign?.caption, taken_at: campaign?.taken_at }]
        );
    };

    const ErrorData = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message:
                'No assets found',
        }),
        []
    );


    return (
        <Modal open={open} onClose={() => setOpen(false)}>

            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: "75%",height:"75%", bgcolor: 'background.paper', boxShadow: 8, borderRadius: 3, p: 0,
                display: 'flex', flexDirection: 'column'
            }}>
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
                <Box sx={{ display: 'flex', justifyContent: "space-between", p: 3, pb: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                        Select Campaign Posts  <span style={{ color: '#E20B18' }}>*</span>
                    </Typography>
                    <Close sx={{ cursor: 'pointer' }} onClick={() => setOpen(false)} />
                </Box>

                {(!loader) ? (<Box sx={{ display: 'flex', flexDirection: 'column', p: 2, height: '73%' ,width:'100%'}}>
                    {(allcampaigns?.length > 0) ? (<Box sx={{
                        display: "flex", flexDirection: 'row', justifyContent: "space-evenly",
                        gap: 2, overflowY: "scroll", scrollbarWidth: "none", flexWrap: "wrap"
                    }}>
                        {allcampaigns.map((campaign: any) => (
                            <div
                                onClick={() => {
                                    const takenAt = new Date(campaign?.taken_at);
                                    const startDate = new Date(camfromDate);
                                    const endDate = new Date(camtoDate);
                                    if (takenAt >= startDate && takenAt <= endDate) {
                                        handleCampaignSelect(campaign)
                                    } else if (!camtoDate || !camfromDate ||
                                        !selectCampaignPeriod[0] || !selectCampaignPeriod[1]
                                    ) {
                                        setSnackbar({
                                            open: true,
                                            severity: 'error',
                                            message: 'Please select Campaign Period',
                                        })
                                    } else if (takenAt < startDate || takenAt > endDate) {
                                        setSnackbar({
                                            open: true,
                                            severity: 'error',
                                            message: 'Please select Posts in Campaign Period',
                                        })
                                    } else if (!startDate || !endDate) {
                                        setSnackbar({
                                            open: true,
                                            severity: 'error',
                                            message: 'Please select Campaign Period',
                                        })
                                    }


                                }}
                                key={campaign?.id}
                                style={{
                                    display: "flex",
                                    width: '280px',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    justifyContent: 'space-evenly',
                                    backgroundColor: 'rgb(255,253,253)',
                                    opacity: selectedPost?.some((c: any) => c?.id === campaign?.post_id && c?.type === campaign?.type) ? '1' : '0.8',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    display: "flex",
                                    width: '20px',
                                    paddingTop: '10px',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: '30px',
                                        border: selectedPost.some((c: any) => c?.id === campaign?.post_id && c?.type === campaign?.type)
                                            ? "4px solid #E20B18"
                                            : '1.5px solid rgba(231, 231, 231, 1)',

                                    }}>
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    width: '250px',
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly',
                                    borderRadius: '18px',
                                    backgroundColor: 'rgb(255,253,253)',
                                    border: "1px solid rgba(224, 224, 224, 1)",
                                }}>
                                    {(campaign?.image) && (<img
                                        style={{
                                            width: '100%',
                                            height: "80%",
                                            marginBottom: "12px",
                                            border: '1px solid red',
                                            borderRadius: '18px'
                                        }}
                                        crossOrigin="anonymous"
                                        src={campaign?.image}
                                    />)}
                                    {(campaign.type == "brand") && (<Typography sx={{
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        paddingLeft: '10px'
                                    }}>
                                        <span style={{ color: '#4F4F4F' }}>Brand:</span>
                                        <span style={{ color: '#E20B18' }}>{campaign?.asset}</span>
                                    </Typography>)}
                                    {(campaign.type == "asset") && (<Typography sx={{
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        paddingLeft: '10px',
                                        marginBottom: '10px'
                                    }}>
                                        <span style={{ color: '#4F4F4F' }}>Asset:</span>
                                        <span style={{ color: '#E20B18' }}>{campaign?.asset}</span>
                                    </Typography>)}
                                    {(campaign.caption) && (<Typography sx={{
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        paddingLeft: '10px',
                                        marginBottom: '10px'
                                    }}>
                                        <span style={{ color: '#4F4F4F' }}>{campaign?.caption}</span>
                                    </Typography>)}
                                    {(campaign.taken_at) && (<Typography sx={{
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        paddingLeft: '10px',
                                        marginBottom: '10px'
                                    }}>
                                        <span style={{ color: '#4F4F4F' }}>Taken At:</span>
                                        <span style={{ color: '#E20B18' }}>{campaign?.taken_at ? campaign?.taken_at?.split("T")[0] : "N/A"}</span>
                                    </Typography>)}
                                </div>
                            </div>
                        ))}


                    </Box>) : (
                        <Box sx={{
                            display: "flex", flexDirection: 'row', justifyContent: "space-evenly",
                            gap: 2, overflowY: "scroll", scrollbarWidth: "none",
                        }}>
                            <div
                                style={{
                                    display: 'flex',
                                    height: 'fit-content',
                                    flexDirection: 'column',
                                    justifyContent: "flex-start",
                                    alignItems: 'center',
                                    gap: '32px',
                                    alignSelf: 'stretch',
                                    background: '#FFF',
                                }}
                            >
                                <img
                                    src={ErrorData.img}
                                    alt=""
                                    style={{
                                        width: deviceType === 'mobile' ? '148.99px' : '',
                                        height: deviceType === 'mobile' ? '109.736px' : '',
                                    }}
                                />
                            </div>

                        </Box>
                    )}
                </Box>) : (
                    <Box sx={{ display: 'flex', flexDirection: 'center', justifyContent: "center", p: 2, height: '300px' }}>
                        <div className="loader"></div>
                    </Box>
                )}

                <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    p: 2,
                    height:'20%',
                    boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.07)"
                }}>
                    <ZupotsuButton
                        name="Save"
                        handleClick={() => { setOpen(!open) }}
                        padding='10px 40px'
                        isCustomColors
                        customBgColor={'#E20B18'}
                        customTextColor={'white'}
                        customBgColorOnhover={'#E20B18'}
                        customTextColorOnHover={'red'}
                        variant={'outlined'}
                        disabled={selectedPost?.length === 0}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default SelectCampaignPopup;
