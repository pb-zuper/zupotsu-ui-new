import { Box, Button, Checkbox, FormControl, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { AddButton, arrowLeft, eastWhiteArrow, instagramI, instagramIcon, instared, SearchNormal, YoutubeIcon, youtubeRed, ytred } from '../../assets'
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb'
import ZupotsuTextfield from '../Settings/ZupotsuTextfield'
import useDeviceType from '../../utils/DeviceType';
import Apis from '../../services/apis';
import { NoDataImage, rearrange } from '../../assets/index';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import mixpanelEvents from '../../mixpanel/mixpanelEvents'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './report.css'
import SelectcampaignPopup from './SelectcampaignPopup'
import ZupotsuDatePicker from '../../Atoms/zupotsu-date-picker/zupotsu-date-picker'
import SelectOption from '../../Atoms/option-selection/SelectOption'
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import BackspaceIcon from '@mui/icons-material/Backspace';
dayjs.extend(utc);
dayjs.extend(timezone);

const CreateReport = () => {
    const deviceType = useDeviceType();
    const [loader, setLoader] = useState(false);
    const [load, setLoad] = useState(false);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const apis = new Apis();
    const linkDetails = useMemo(() => [
        {
            label: 'My Campaigns',
            url: '/campaigns',
        },
        {
            label: id ? "Edit Report" : 'Create New Report',
            url: '',
        },
    ], []);

    const [reportName, setReportName] = useState("")
    const [proposalId, setProposalId] = useState<any>(null)
    const [socialPlatform, setSocialPlatform] = useState("instagram")
    const [brandaccount, setBrandaccount] = useState("")
    const [assetAccount, setAssetAccount] = useState("")
    const [tagstoTrace, setTagstoTrace] = useState("")
    const [isTraceOpen, setIsTraceOpen] = useState(false)
    const [selectPreCampaignPeriod, setSelectPreCampaignPeriod] = useState<any>([])
    const [selectCampaignPeriod, setSelectCampaignPeriod] = useState<any>([])
    const [selectPostCampaignPeriod, setSelectPostCampaignPeriod] = useState<any>([])
    const [selectReportPeriod, setSelectReportPeriod] = useState<any>([])
    const [campaignPopupOpen, setCampaignPopupOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState<any>([]);
    const [allproposals, setAllProposals] = useState<any>([]);
    const [allcampaigns, setAllCampaigns] = useState<any>([]);
    const [campaignData, setCampaignData] = useState<any>([]);
    const [campaignDataId, setCampaignDataId] = useState<any>("");
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        },
    };
    const navigation = useNavigate()
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const navigate = useNavigate();
    const fetchProposals = async () => {
        try {
            setLoader(true)
            const response = await apis.getAllProposals();
            const proposalsData = response?.data?.data || [];

            proposalsData.sort(function (a: any, b: any) {
                return b.id - a.id;
            });
            setAllProposals(proposalsData);
            // setLoader(false)
        } catch (error: any) {
            // setLoader(false)
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : (error?.response?.data?.error || 'something went wrong!!')),
            });
            console.error("Error fetching proposals:", error);
        }
    };

    const fetchCampaignById = async () => {
        try {
            setLoader(true)
            const response = await apis.getMyCampaignById(id);
            const campaignData = response?.data?.data || [];
            setCampaignData(campaignData)
            setCampaignDataId(campaignData?.id)
            setReportName(campaignData?.campaign_name)
            setProposalId(campaignData?.proposal_id)
            setSocialPlatform(campaignData?.platform)
            setBrandaccount(campaignData?.brand_acc)
            setAssetAccount(campaignData?.asset_acc)
            setSelectedPost(campaignData?.posts)
            setTagstoTrace(campaignData?.tags?.map((item: any) => item?.tag).join(", ") || "");
            if (campaignData?.id) {
                if (campaignData?.tags?.length > 0 || campaignData?.posts?.length > 0) {
                    setIsTraceOpen(true)
                }
            }
            const fromDate = dayjs(campaignData?.pre_camp_from).tz("Asia/Kolkata");
            const toDate = dayjs(campaignData?.pre_camp_to).tz("Asia/Kolkata");
            const camfromDate = dayjs(campaignData?.camp_from).tz("Asia/Kolkata");
            const camtoDate = dayjs(campaignData?.camp_to).tz("Asia/Kolkata");
            const postcampfromDate = dayjs(campaignData?.post_camp_from).tz("Asia/Kolkata");
            const postcampToDate = dayjs(campaignData?.post_camp_to).tz("Asia/Kolkata");
            const reportcampfromDate = dayjs(campaignData?.camp_report_from).tz("Asia/Kolkata");
            const reportcampToDate = dayjs(campaignData?.camp_report_to).tz("Asia/Kolkata");
            setSelectPreCampaignPeriod([fromDate, toDate])
            setSelectCampaignPeriod([camfromDate, camtoDate])
            setSelectPostCampaignPeriod([postcampfromDate, postcampToDate])
            setSelectReportPeriod([reportcampfromDate, reportcampToDate])
            // setLoader(false)
        } catch (error: any) {
            console.error("Error fetching proposals:", error);
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : (error?.response?.data?.error || 'something went wrong!!')),
            });
            // setLoader(false)
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            const startTime = performance.now();
            try {
                await fetchCampaignPosts();
                const timeSpent = performance.now() - startTime;

            } catch (error: any) {
                setLoad(false)
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : (error?.response?.data?.error || 'something went wrong!!')),
                });
            } finally {
                setLoader(false)
                setLoad(false)
            }

        };
        if (campaignDataId) {
            fetchData();
        }
    }, [campaignDataId]);

    const fetchCampaignPosts = async () => {
        try {
            setLoad(true)
            const response = await apis.getCampaignPosts(campaignDataId);
            const campaignData = response?.data?.data || [];
            setAllCampaigns(campaignData);
            setLoad(false)
        } catch (error: any) {
            setLoad(false)
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : (error?.response?.data?.error || 'something went wrong!!')),
            });
        }
    };



    useEffect(() => {
        setLoader(true)
        const startTime = performance.now();

        const fetchAndTrack = async () => {
            if (id) {
                await fetchCampaignById()
            }
            await fetchProposals()
            setLoader(false)
            const loadTime = performance.now() - startTime;
            // mixpanelEvents.onLoad(loadTime, 'Create Tray Page');
        };
        fetchAndTrack();
        return () => {
            const timeSpent = performance.now() - startTime;
            // mixpanelEvents.onUnload('Create Tray Page', timeSpent);
            setLoader(false)
        };
    }, [])


    const addCampaign = async (body: any) => {
        try {
            setLoader(true)

            const response = await apis.postMyCampaign(body);
            const campaignData = response?.data?.data || [];
            setCampaignData(campaignData)
            setCampaignDataId(campaignData?.id)
            if (campaignData?.id) {
                setIsTraceOpen(true)
            }

            setSnackbar({
                open: true,
                severity: 'success',
                message: "Campaign Initiated Successfully",
            });
            setTimeout(() => {
                navigate(-1)
            }, 500)
            setLoader(false)
        } catch (error: any) {
            setLoader(false)
            console.error("Error fetching proposals:", error);
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : (error?.response?.data?.error || 'something went wrong!!')),
            });
        }
    };


    const addCampaignById = async () => {
        try {
            setLoader(true)
            const extractInstagramAccount = (input: string): string => {
                try {
                    const url = new URL(input);
                    if (url?.hostname?.includes("instagram.com")) {
                        const paths = url.pathname.split("/").filter(Boolean);
                        console.log("pathspaths", paths)
                        return paths[0];

                    }
                } catch (e) {
                }
                return input;
            };

            const body = {
                "id": campaignDataId || campaignData?.id,
                "campaign_name": reportName,
                "platform": socialPlatform,
                "proposal_id": proposalId ? proposalId : null,
                "brand_acc": extractInstagramAccount(brandaccount),
                "asset_acc": extractInstagramAccount(assetAccount),
                "pre_camp_from": selectPreCampaignPeriod?.[0] && dayjs(selectPreCampaignPeriod[0]).isValid()
                    ? (selectPreCampaignPeriod[0]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                    : null,

                "pre_camp_to": selectPreCampaignPeriod?.[1] && dayjs(selectPreCampaignPeriod[1]).isValid()
                    ? (selectPreCampaignPeriod[1]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                    : null,

                "camp_from": selectCampaignPeriod?.[0] && dayjs(selectCampaignPeriod[0]).isValid()
                    ? (selectCampaignPeriod[0]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                    : null,

                "camp_to": selectCampaignPeriod?.[1] && dayjs(selectCampaignPeriod[1]).isValid()
                    ? (selectCampaignPeriod[1]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                    : null,

                "post_camp_from": selectPostCampaignPeriod?.[0] && dayjs(selectPostCampaignPeriod[0]).isValid()
                    ? (selectPostCampaignPeriod[0]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                    : null,

                "post_camp_to": selectPostCampaignPeriod?.[1] && dayjs(selectPostCampaignPeriod[1]).isValid()
                    ? (selectPostCampaignPeriod[1]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                    : null,
                "camp_report_from": selectReportPeriod?.[1] && dayjs(selectReportPeriod[0]).isValid()
                    ? (selectReportPeriod[0]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                    : null,
                "camp_report_to": selectReportPeriod?.[1] && dayjs(selectReportPeriod[1]).isValid()
                    ? (selectReportPeriod[1]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                    : null,
                "tags": tagstoTrace ? tagstoTrace?.split(/\s*,\s*/).map(tag => tag.replace(/^#/, '')) : [],
                "posts": selectedPost
            }

            const response = await apis.updateMyCampaign(campaignDataId, body);
            const responseData = response?.data?.data || [];
            if (responseData) {
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: "Report Updated Successfully",
                });
                setTimeout(() => {
                    navigate(-1)
                }, 500)
            }
            setLoader(false)
        } catch (error: any) {
            setLoader(false)
            setSnackbar({
                open: true,
                severity: 'success',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : (error?.response?.data?.error || 'something went wrong!!')),
            });
            console.error("Error fetching proposals:", error);
        }
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

    console.log("selectPreCampaignPeriod", dayjs(selectPreCampaignPeriod[0]).format('YYYY-MM-DDTHH:mm:ss'))


    if (!loader && !load) {
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
                    <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", paddingBottom: 10 }}>


                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', borderStyle: 'solid', borderWidth: '0px', width: '95%', height: '80%', gap: '10px' }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '5px', marginTop: '10px', marginBottom: '10px', backgroundColor: '#FFF' }}>
                                <Typography
                                    sx={{
                                        fontFamily: 'BebasNeue',
                                        fontWeight: '400',
                                        fontSize: '20px',
                                        lineHeight: '30px',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {id ? "Edit Report" : "Add New Report"}
                                </Typography>


                            </div>

                            <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '10px', }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        backgroundColor: '#FFF',
                                        width: '50%',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <ZupotsuTextfield
                                        title="Report Name"
                                        value={reportName}
                                        placeholder="Enter Report Name"
                                        name="ReportName"
                                        isRequired={true}
                                        multiline={false}
                                        rows={4}
                                        previewMode={id ? true : false}
                                        handleChange={(e: any) => {
                                            setReportName(e.target.value)
                                        }}
                                    />
                                </Box>
                                {/* <ZupotsuDropdown
                                    title="Proposal Id"
                                    previewMode={false}
                                    placeholder="Enter Proposal Id"
                                    name="ProposalId"
                                    isRequired={true}
                                    dropdownData={[]}
                                    value={proposalId}
                                    presentOnDialog={true}
                                    handleChange={(e) => {
                                        setProposalId(e.target.value)
                                    }}
                                /> */}

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        backgroundColor: '#FFF',
                                        width: '50%',
                                        alignItems: 'flex-start',
                                    }}
                                >


                                    <Typography
                                        style={{
                                            marginBottom: '10px',
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
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: '14px',
                                                        lineHeight: "21px",
                                                        fontStyle: 'Inter',
                                                        fontWeight: '700',
                                                    }}
                                                >{"Select Proposal"}</span>

                                                {/* <span
                                                    style={{
                                                        color: 'var(--Zupotso-Primary, #E20B18)',
                                                        fontFamily: 'Inter',
                                                        fontSize: '16px',
                                                        fontStyle: 'normal',
                                                        fontWeight: '700',
                                                        lineHeight: '140%',
                                                    }}
                                                >
                                                    *
                                                </span> */}



                                            </div>

                                        </div>

                                    </Typography>

                                    <FormControl fullWidth>
                                        <Select
                                            sx={{
                                                borderRadius: '5px',
                                                width: 'auto',
                                                textAlign: 'left',
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={proposalId || ""}
                                            // disabled={!!id}
                                            MenuProps={MenuProps}
                                            displayEmpty
                                            inputProps={{
                                                'aria-label': 'Without label',
                                            }}
                                            size="small"
                                            onChange={(event) => {
                                                setLoader(true);
                                                // setProposals("");
                                                setProposalId(event.target.value)
                                                // setTimeout(() => {
                                                //   const selectedValue: any = event.target.value;
                                                //   setProposals(selectedValue);
                                                setLoader(false);
                                                // }, 1000);
                                            }}
                                            IconComponent={() => (
                                                <KeyboardArrowDownIcon
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: '#333',
                                                        pointerEvents: 'none',
                                                        position: 'absolute',
                                                        right: '10px',
                                                    }}
                                                />
                                            )}
                                        >
                                            <MenuItem value=""
                                                onClick={() => {
                                                    setTimeout(() => {
                                                        setLoader(false);
                                                    }, 1000);

                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: 'var(--Gray-3, #828282)',
                                                        fontFamily: 'Inter',
                                                        fontSize: '14px',
                                                        fontStyle: 'normal',
                                                        fontWeight: 500,
                                                        lineHeight: '140%',
                                                    }}
                                                >
                                                    {"Select Proposal"}
                                                </span>
                                            </MenuItem>
                                            {allproposals?.map((data: any) => (
                                                <MenuItem
                                                    // onClick={() => {
                                                    //     setLoader(true);
                                                    //     setTimeout(() => {
                                                    //         setSelectedProposal(data);
                                                    //         setLoader(false);
                                                    //     }, 1000);

                                                    // }}
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        whiteSpace: 'normal',
                                                        width: '90%',
                                                        '&:hover': {
                                                            background: "pink",
                                                            color: '#E20B18',
                                                        },
                                                    }}
                                                    key={data?.id}
                                                    value={data?.id}
                                                >
                                                    {data?.id} - {data.asset.asset_detail[0].name} - {data.buyer.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </Box>
                            </div>
                            <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '10px', }}>
                                <Box sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%' }}>
                                    <Typography
                                        style={{
                                            marginBottom: '10px',
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
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: '14px',
                                                        lineHeight: "21px",
                                                        fontStyle: 'Inter',
                                                        fontWeight: '700',
                                                    }}
                                                >{"Social Platform"}</span>
                                                {true && (
                                                    <span
                                                        style={{
                                                            color: 'var(--Zupotso-Primary, #E20B18)',
                                                            fontFamily: 'Inter',
                                                            fontSize: '16px',
                                                            fontStyle: 'normal',
                                                            fontWeight: '700',
                                                            lineHeight: '140%',
                                                        }}
                                                    >
                                                        *
                                                    </span>
                                                )}


                                            </div>

                                        </div>

                                    </Typography>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '15px' }}>
                                        {[{ id: "1", img: instagramI, imgactive: instared, label: "Instagram", value: "instagram", disabled: false }, { id: "2", img: YoutubeIcon, imgactive: ytred, label: "YouTube", value: "youtube", disabled: false }].map((data) => (
                                            <SelectOption data={data} platform={socialPlatform} setPlatform={(e: any) => {
                                                if (!id) setSocialPlatform(e);
                                            }}
                                            />
                                        ))}

                                    </div>

                                </Box>
                            </div>


                            <ZupotsuTextfield
                                title="Brand Account"
                                value={brandaccount}
                                placeholder="Enter Brand Account"
                                name="brandaccount"
                                isRequired={true}
                                multiline={false}
                                rows={4}
                                previewMode={id ? true : false}
                                handleChange={(e: any) => {
                                    setBrandaccount(e.target.value)
                                }}
                                errorMessage={((brandaccount === assetAccount) && (brandaccount && assetAccount)) ? 'Brand Account should not be the same as Asset Account' : ''}
                            />
                            <ZupotsuTextfield
                                title="Asset Account"
                                value={assetAccount}
                                placeholder="Enter asset account"
                                name="assetaccount"
                                isRequired={true}
                                previewMode={id ? true : false}
                                handleChange={(e: any) => {
                                    setAssetAccount(e.target.value)
                                }}
                                errorMessage={((brandaccount === assetAccount) && (brandaccount && assetAccount)) ? 'Asset Account should not be the same as Brand Account' : ''}
                            />


                            <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '10px', }}>
                                <div style={{ width: "49%", display: 'flex', flexDirection: 'row', gap: "10px" }}>
                                    <div style={{ width: "84%", }}>
                                        <ZupotsuDatePicker
                                            label={"Select Report Period"}
                                            value={selectReportPeriod}
                                            name={"Select Report Period"}
                                            isRequired={true}
                                            previewMode={id ? true : false}
                                            minDate={dayjs()}
                                            maxDate={dayjs().add(60, 'day')}
                                            handleDateSelection={(e: any) => {
                                                setSelectReportPeriod(e.target.value);
                                                setSelectPreCampaignPeriod([]);
                                                setSelectCampaignPeriod([]);
                                                setSelectPostCampaignPeriod([]);
                                            }}
                                        />
                                    </div>
                                    <div style={{ width: "10%", display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                        <BackspaceIcon

                                            onClick={() => { if (!id) { setSelectReportPeriod([]) } }}
                                            sx={{ color: "rgba(226, 11, 24, 1)", width: '20px', height: '20px', cursor: id ? "not-allowed" : "pointer" }}
                                        />

                                    </div>
                                </div>
                                <div style={{ width: "49%", display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "10px" }}>
                                    <div style={{ width: "84%", }}>
                                        <ZupotsuDatePicker
                                            label={"Select Pre Campaign Period"}
                                            value={selectPreCampaignPeriod}
                                            name={"Select Pre Campaign Period"}
                                            handleDateSelection={(e) => {
                                                setSelectPreCampaignPeriod(e.target.value)
                                            }}
                                            previewMode={!selectReportPeriod}

                                            minDate={selectReportPeriod?.[0] || dayjs()}
                                            maxDate={
                                                selectCampaignPeriod?.[0]?.subtract(1, 'day') ||
                                                selectReportPeriod?.[1] ||
                                                dayjs().add(30, 'day')
                                            }
                                        />
                                    </div>
                                    <div style={{ width: "10%", display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                        <BackspaceIcon onClick={() => { setSelectPreCampaignPeriod([]); }} sx={{ color: "rgba(226, 11, 24, 1)", width: '20px', height: '20px', cursor: "pointer" }} />
                                    </div>
                                </div>

                            </div>

                            <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", borderStyle: 'solid', width: '100%', gap: '20px', }}>
                                <div style={{ width: "49%", display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "10px" }}>
                                    <div style={{ width: "84%", }}>
                                        <ZupotsuDatePicker
                                            label={"Select Campaign Period"}
                                            value={selectCampaignPeriod}
                                            name={"Select Campaign Period"}
                                            handleDateSelection={(e: any) => {
                                                setSelectCampaignPeriod(e.target.value);
                                            }}
                                            previewMode={!selectReportPeriod}

                                            minDate={
                                                selectPreCampaignPeriod?.[1]?.add(1, 'day') ||
                                                selectReportPeriod?.[0] ||
                                                dayjs()
                                            }
                                            maxDate={
                                                selectPostCampaignPeriod?.[0]?.subtract(1, 'day') ||
                                                selectReportPeriod?.[1] ||
                                                dayjs().add(30, 'day')
                                            }
                                        />
                                    </div>
                                    <div style={{ width: "10%", display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <BackspaceIcon onClick={() => { setSelectCampaignPeriod([]); }} sx={{ color: "rgba(226, 11, 24, 1)", width: '20px', height: '20px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div style={{ width: "49%", display: 'flex', flexDirection: 'row', gap: "10px" }}>
                                    <div style={{ width: "84%", }}>
                                        <ZupotsuDatePicker
                                            label={"Select Post Campaign Period"}
                                            value={selectPostCampaignPeriod}
                                            name={"Select Post Campaign Period"}
                                            handleDateSelection={(e: any) => {
                                                setSelectPostCampaignPeriod(e.target.value);

                                            }}
                                            previewMode={!selectReportPeriod}

                                            minDate={
                                                selectCampaignPeriod?.[1]?.add(1, 'day') ||
                                                selectReportPeriod?.[0] ||
                                                dayjs()
                                            }
                                            maxDate={selectReportPeriod?.[1] || dayjs().add(30, 'day')}
                                        />
                                    </div>
                                    <div style={{ width: "10%", display: 'flex', flexDirection: 'row', alignItems: 'center', }}>

                                        <BackspaceIcon onClick={() => { setSelectPostCampaignPeriod([]); }} sx={{ color: "rgba(226, 11, 24, 1)", width: '20px', height: '20px', cursor: "pointer" }} />
                                    </div>
                                </div>

                            </div>


                            {(campaignDataId && !tagstoTrace) && (<div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '100%', }}>


                                <ZupotsuButton
                                    customBgColor={"rgba(226, 11, 24, 1)"}
                                    name={"Add Campaign"}
                                    disabled={false}
                                    customOutlineColor={'0px solid transparent'}
                                    handleClick={() => {
                                       
                                        setIsTraceOpen(!isTraceOpen)
                                       
                                    }}
                                />
                            </div>)}

                            {(isTraceOpen) && (<div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: "flex-start", justifyContent: "flex-start", borderStyle: 'solid', width: '100%', gap: '10px' }}>
                                <ZupotsuTextfield
                                    title="Tags to Trace"
                                    value={tagstoTrace}
                                    placeholder="#Tags"
                                    name="Tagstotrace"
                                    multiline={false}
                                    handleChange={(e: any) => {
                                        setTagstoTrace(e.target.value)
                                    }}
                                />
                                <div onClick={() => { setCampaignPopupOpen(true) }} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "flex-end" }}>
                                    <div style={{ width: '75%' }}>
                                        <ZupotsuTextfield
                                            title="Select Posts"
                                            value={selectedPost?.length + " Posts Selected"}
                                            placeholder="Posts"
                                            name="posts"
                                            multiline={false}
                                            handleChange={(e: any) => {
                                                setCampaignPopupOpen(true)
                                            }}
                                        />
                                    </div>
                                    <div style={{ width: '20%', display: 'flex', flexDirection: 'column', justifyContent: "flex-end" }}>
                                        <ZupotsuButton
                                            customBgColor={"rgba(226, 11, 24, 1)"}
                                            name={"Add Posts"}
                                            disabled={false}
                                            customOutlineColor={'0px solid transparent'}
                                            handleClick={() => {

                                                setCampaignPopupOpen(true)

                                            }}
                                        />
                                    </div>
                                </div>



                            </div>)}
                        </div>


                    </div>

                    {(campaignPopupOpen && campaignDataId) && (<SelectcampaignPopup
                        open={campaignPopupOpen}
                        setOpen={setCampaignPopupOpen}
                        allcampaigns={allcampaigns}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                        campaignDataId={campaignDataId}
                        selectCampaignPeriod={selectCampaignPeriod}
                    />)}
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>

                        <ZupotsuButton
                            customBgColor={"rgba(226, 11, 24, 1)"}
                            name={"Save Collection"}
                            disabled={brandaccount === assetAccount || !reportName || !socialPlatform || !brandaccount || !assetAccount || !(selectReportPeriod?.length > 0)}
                            customOutlineColor={'0px solid transparent'}
                            handleClick={() => {
                                const extractInstagramAccount = (input: string): string => {
                                    try {
                                        const url = new URL(input);
                                        if (url?.hostname?.includes("instagram.com")) {
                                            const paths = url.pathname.split("/").filter(Boolean);
                                            console.log("pathspaths", paths)
                                            return paths[0];

                                        }
                                    } catch (e) {
                                    }
                                    return input;
                                };

                                const body = {
                                    "campaign_name": reportName,
                                    "platform": socialPlatform,
                                    "proposal_id": proposalId ? proposalId : null,
                                    "brand_acc": extractInstagramAccount(brandaccount),
                                    "asset_acc": extractInstagramAccount(assetAccount),
                                    "pre_camp_from": selectPreCampaignPeriod?.[0] && dayjs(selectPreCampaignPeriod[0]).isValid()
                                        ? (selectPreCampaignPeriod[0]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                                        : null,

                                    "pre_camp_to": selectPreCampaignPeriod?.[1] && dayjs(selectPreCampaignPeriod[1]).isValid()
                                        ? (selectPreCampaignPeriod[1]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                                        : null,

                                    "camp_from": selectCampaignPeriod?.[0] && dayjs(selectCampaignPeriod[0]).isValid()
                                        ? (selectCampaignPeriod[0]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                                        : null,

                                    "camp_to": selectCampaignPeriod?.[1] && dayjs(selectCampaignPeriod[1]).isValid()
                                        ? (selectCampaignPeriod[1]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                                        : null,

                                    "post_camp_from": selectPostCampaignPeriod?.[0] && dayjs(selectPostCampaignPeriod[0]).isValid()
                                        ? (selectPostCampaignPeriod[0]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                                        : null,

                                    "post_camp_to": selectPostCampaignPeriod?.[1] && dayjs(selectPostCampaignPeriod[1]).isValid()
                                        ? (selectPostCampaignPeriod[1]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                                        : null,
                                    "camp_report_from": selectReportPeriod?.[1] && dayjs(selectReportPeriod[0]).isValid()
                                        ? (selectReportPeriod[0]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                                        : null,
                                    "camp_report_to": selectReportPeriod?.[1] && dayjs(selectReportPeriod[1]).isValid()
                                        ? (selectReportPeriod[1]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
                                        : null,

                                    "tags": tagstoTrace ? tagstoTrace?.split(/\s*,\s*/).map(tag => tag.replace(/^#/, '')) : [],
                                    "posts": selectedPost
                                }
                                if ((brandaccount !== assetAccount) && reportName && socialPlatform && brandaccount && assetAccount && selectReportPeriod?.length > 0
                                    // && selectedPost && tagstoTrace
                                ) {
                                    if (id) {
                                        addCampaignById()
                                    } else {
                                        addCampaign(body)
                                    }
                                } else if (brandaccount == assetAccount) {
                                    setSnackbar({
                                        open: true,
                                        severity: 'error',
                                        message: "Brand Account shound not be same as asset Account",
                                    });
                                }
                                else {
                                    setSnackbar({
                                        open: true,
                                        severity: 'error',
                                        message: "Enter all fields",
                                    });
                                }
                            }}
                        />

                    </div>
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

export default CreateReport
