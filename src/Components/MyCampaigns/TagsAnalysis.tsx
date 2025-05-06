import { Box, Button, Checkbox, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { AddButton, arrowLeft, comment, eastWhiteArrow, favoriteLike, instagramI, instagramIcon, instared, posts, SearchNormal, YoutubeIcon, youtubeRed, ytred } from '../../assets'
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb'
import useDeviceType from '../../utils/DeviceType';
import Apis from '../../services/apis';
import NoData from '../../error/NoData'
import { NoDataImage, rearrange } from '../../assets/index';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import './report.css'
import BarChart from '../../Atoms/charts/Barcharts';

const TagsAnalysis = () => {
    const deviceType = useDeviceType();
    const [loader, setLoader] = useState(false);
    const [selectedPost, setSelectedPost] = useState("Tag 1")

    const linkDetails = useMemo(() => [
        {
            label: 'My Campaigns',
            url: '/my_campaigns',
        },
        {
            label: 'Add Report',
            url: '',
        },
    ], []);

    const datasets = [
        {
            data: [255, 249, 424, 224, 215, 2249, 22224, 7775, 2419, 4242, 2242, 215, 22249, 255, 249, 424, 224, 215, 2249, 22224, 7775, 2419, 4242, 2242, 215, 22249],
            backgroundColor: "red",
        },
    ]

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const navigate = useNavigate();

    const ErrorData = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message:
                'No assets found',
        }),
        []
    );

    const divstyle: any = {
        padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "flex-start", width: '33%',
        borderRadius: "5px",
        borderWidth: "0.8px",
        paddingTop: "10px",
        paddingRight: "20px",
        paddingBottom: "10px",
        paddingLeft: "20px",
        border: "0.8px solid #979797"
    };

    const spanStyle: any = {
        fontFamily: "Inter",
        fontWeight: 800,
        fontSize: "17px",
        lineHeight: "30px",
        letterSpacing: "0%",
        textAlign: "center",
    }

    const span1Style: any = {
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "30px",
        letterSpacing: "0%",
        textAlign: "center",
    }



    if (!loader) {
        return (
            <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: 'rgb(250,250,250)', height: '90vh', overflowY: "scroll", overflowX: 'hidden' }}>
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'center',
                        padding: '5px',
                        backgroundColor: 'rgb(250,250,250)',
                        height: '80vh',
                        overflowX: 'hidden',
                        overflowY: 'scroll'
                    }}
                >
                    <Grid xs={12} md={12} lg={12} width={"98%"} spacing={2} marginTop={"10px"}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                backgroundColor: '#FFF',
                                paddingTop: "15px",
                                paddingBottom: "15px",
                                padding: "15px",
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
                    <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", padding: 20 }}>


                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', borderStyle: 'solid', borderWidth: '0px', width: '100%', gap: '10px', border: "1px solid #F2F2F2", padding: 20, borderRadius: '16px' }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '5px', marginBottom: '10px', paddingBottom: '10px', backgroundColor: '#FFF', borderBottom: "1px solid #E0E0E0" }}>
                                <Typography
                                    sx={{
                                        fontFamily: 'BebasNeue',
                                        fontWeight: '400',
                                        fontSize: '20px',
                                        lineHeight: '30px',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    #TAG
                                </Typography>


                            </div>

                            <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '100%', gap: '20px', }}>
                                {["Tag 1", "Tag 2", "Tag 3"].map((item, index) => (<span key={index} onClick={() => { setSelectedPost(item) }} style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    lineHeight: "30px",
                                    letterSpacing: "0%",
                                    textAlign: "left",
                                    color: selectedPost == item ? "#E20B18" : '#828282',
                                    borderBottom: selectedPost == item ? "2px solid #E20B18" : ""
                                }}>
                                    {item}
                                </span>))}
                            </div>

                            <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '10px', }}>
                                <div style={divstyle}>
                                    <img src={posts} style={{
                                        width: 25.5,
                                        height: 25.5,
                                    }} />
                                    <span style={spanStyle}>03</span>
                                    <span style={span1Style}>Total Posts</span>
                                </div>
                                <div style={divstyle}>
                                    <img src={favoriteLike} style={{
                                        width: 25.5,
                                        height: 25.5,
                                    }} />
                                    <span style={spanStyle}>03</span>
                                    <span style={span1Style}>Total Liked</span>
                                </div>
                                <div style={divstyle}>
                                    <img src={comment} style={{
                                        width: 25.5,
                                        height: 25.5,
                                    }} />
                                    <span style={spanStyle}>03</span>
                                    <span style={span1Style}>Total Comments</span>
                                </div>
                            </div>




                        </div>
                    </div>

                    <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", padding: 20, boxShadow: "0px 0px 4px 0px #0000000D", gap: '20px' }}>


                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", borderStyle: 'solid', borderWidth: '0px', width: '100%', gap: '20px', }}>
                            <div style={{ margin: 0, padding: 0, width: '50%', borderRadius: '20px', boxShadow: "0px 0px 28px 0px #00000014", border: "1px solid #E0E0E0", display: "flex", flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>
                                <BarChart title={"Posts"} color={"#E2C90B"} datasets={datasets} />
                            </div>
                            <div style={{ margin: 0, padding: 0, width: '50%', borderRadius: '20px', boxShadow: "0px 0px 28px 0px #00000014", border: "1px solid #E0E0E0", display: "flex", flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>

                                <BarChart title={"Liked"} color={"#0B90E2"} datasets={datasets} />


                            </div>
                        </div>
                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", borderStyle: 'solid', borderWidth: '0px', width: '100%', gap: '20px', }}>
                            <div style={{ margin: 0, padding: 0, width: '50%', borderRadius: '20px', boxShadow: "0px 0px 28px 0px #00000014", border: "1px solid #E0E0E0", display: "flex", flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>
                                <BarChart title={"Comments"} color={"#E20BCC"} datasets={datasets} />
                            </div>
                            <div style={{ margin: 0, padding: 0, width: '50%', borderRadius: '20px', display: "flex", flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>


                               

                            </div>
                        </div>
                    </div>
                </Box >
                <div
                    style={{
                        marginTop: '5px',
                        padding: deviceType == "mobile" ? "0px" : '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                            deviceType === 'mobile' ? 'center' : 'space-between',
                        flexWrap: 'wrap',
                        gap: deviceType === 'mobile' ? '20px' : '0',
                        width: '100%',
                        border: deviceType === 'mobile' ? "" : "1px solid #ff00000d",
                        boxShadow: deviceType === 'mobile' ? "" : "3px 0px 6px #91919b54",
                        bottom: "0px",
                        right: "0px",
                        zIndex: 5,
                        backgroundColor: '#FFF',
                        paddingLeft: deviceType === ('tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%',
                        paddingRight: deviceType === ('tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%'

                    }}
                >
                    <ZupotsuButton
                        name={"Cancel"}
                        handleClick={() => {
                            navigate(-1)
                        }}
                        padding={"10px 25px"}
                        leadingIcon={arrowLeft}
                        isCustomColors={true}
                        variant={'outlined'}
                        customTextColor="rgba(189, 189, 189, 1)"
                        customBgColor="#fff"
                        customBgColorOnhover="white"
                        customTextColorOnHover="#828282"
                        customOutlineColor={'1px solid rgba(189, 189, 189, 1)'}
                        customOutlineColorOnHover={'1px solid rgba(189, 189, 189, 1)'}
                    />

                    <ZupotsuButton
                        padding={"10px 25px"}
                        customBgColor={"rgba(226, 11, 24, 1)"}
                        name={"Publish"}
                        disabled={false}
                        customOutlineColor={'0px solid transparent'}
                        handleClick={() => { }}
                    />

                </div>
            </Grid >

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

export default TagsAnalysis
