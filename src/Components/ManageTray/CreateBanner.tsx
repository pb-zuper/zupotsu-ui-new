import { Box, Button, FormControl, Grid, InputAdornment, MenuItem, OutlinedInput, Select, Snackbar, TextField, Typography, Drawer } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AddButton, arrowLeft, copy, deleteIcon1, eastWhiteArrow, SearchNormal, TouchingHand, ZupotsuColuredLogo } from '../../assets'
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb'
import ZupotsuTextfield from '../Settings/ZupotsuTextfield'
import ZupotsuSearchBar from '../../Atoms/zupotsu-search-bar/zupotsu-search-bar'
import ZupotsuAutocomplete, { ZupotsuAutoComplete } from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete'
import ZupotsuAutocompletewithsearch from '../../Atoms/zupotsu-textfields/zupotsu-autocompletewithsearch'
import ZupotsuImgUpload from '../../Molecules/zupotsu-img-upload/zupotsu-img-upload'
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button'
import useDeviceType from '../../utils/DeviceType'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Apis from '../../services/apis'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown'
import { Col, Row } from 'react-bootstrap'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import mixpanelEvents from '../../mixpanel/mixpanelEvents'
const CreateBanner = ({ sidebarOpen }: { sidebarOpen: boolean }) => {

    const apis = new Apis();
    const [loader, setLoader] = useState(false);
    const [bannerTitle, setBannerTitle] = useState<any>('');
    const [bannerHeading, setBannerHeading] = useState<any>('');
    const [assetId, setAssetId] = useState<any>('');
    const [assetData, setAssetData] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<any>('');
    const [searchedObject, setSearchObject] = useState<any>();
    const [isFocused, setIsFocused] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 1000)

    };


    const deviceType = useDeviceType()
    const linkDetails = useMemo(() => [
        {
            label: 'Catalogue Management',
            url: '/catalogue_management',
        },
        {
            label: 'Manage Banner',
            url: '/manage_banner',
        },
        {
            label: 'Create New Banner',
            url: '',
        },
    ], []);

    const linkDetailsPreview = useMemo(() => [
        {
            label: 'Home',
            url: '/home',
        },
        {
            label: 'Catalog',
            url: '',
        },

    ], []);

    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    };
    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');


    useEffect(() => {
        const startTime = performance.now();

        const fetchAndTrack = async () => {
            if (id) {
                await getBannerApi()
            }
            await getAllAssetsApi()
            const loadTime = performance.now() - startTime;
            mixpanelEvents.onLoad(loadTime, 'Create Banner Page');
        };
        fetchAndTrack();
        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Create Banner Page', timeSpent);
        };
    }, [])



    const getBannerApi = () => {
        setLoader(true)
        if (id) {
            apis.getBanner(id)
                .then((response: any) => {
                    const res = response?.data?.data
                    if (res) {
                        setBannerTitle(res.name)
                        setBannerHeading(res.description)
                        setBannerImage(res.banner_image)
                        setAssetId(res.asset_id)
                    }
                    setLoader(false)
                })
                .catch((error) => {
                    setLoader(false)
                    setSnackbar({
                        open: true,
                        severity: 'error',
                        message: error?.response?.data?.error || 'something went wrong!!',
                    })
                    mixpanelEvents.errorHandling({
                        name: 'Create Banner Page',
                        msg: error?.response?.data?.error || error?.message
                    })
                });
        }
    }

    const getAllAssetsApi = () => {
        setLoader(true)
        apis.getAllAssets()
            .then((response: any) => {
                let arr: any = [];
                response?.data?.data.map((asset: any) => {
                    if (asset?.asset_detail[0]?.asset_status == "published") {
                        asset["isSel"] = false
                        arr.push(asset)
                    }
                })
                setAssetData(arr)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
            });
    }



    const [bannerImage, setBannerImage] = useState<any>()


    useEffect(() => {
        const coverPhoto = searchedObject?.asset_media?.find((asset: any) => asset.tags.includes("Cover Picture 1"))?.media_url
        setBannerImage(coverPhoto)
    }, [searchedObject])

    useEffect(() => {
        if (!searchQuery) {
            setBannerImage(null);
            setSearchObject(null);
        }
    }, [searchQuery]);

    // const filteredData = assetData?.filter((item: any) =>
    //     item.asset_detail[0]?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
    // );

    const handleFileChange = useCallback(
        (name: string, imageUrl: string, file: File | null) => {
            setBannerImage(imageUrl)
            // console.error('No file selected');

        },
        []
    );

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };


    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setCursorPosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);





    const [open, setOpen] = useState(false)
    const handleToggleDrawer = () => {
        setOpen(!open)
    }

    const addBanner = () => {

        let body: any = {
            "name": bannerTitle,
            "description": bannerHeading,
            "banner_image": bannerImage,
            "asset_id": assetId || null,
        }
        setLoader(true)
        apis.addBanner(body)
            .then((response: any) => {
                setLoader(false)
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Banner successfully!',
                });
                setTimeout(() => {
                    navigate("/manage_banner");
                }, 1000);
            })
            .catch((error) => {

                setLoader(false)
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: error?.response?.data?.error || 'something went wrong!!',
                })
            });
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    const updateBanner = () => {

        let body: any = {
            "id": id,
            "name": bannerTitle,
            "description": bannerHeading,
            "banner_image": bannerImage,
            "asset_id": assetId || null,
        }
        setLoader(true)
        apis.updateBanner(body)
            .then((response: any) => {
                setLoader(false)
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Banner updated successfully!',
                });
                setTimeout(() => {
                    navigate("/manage_banner");
                }, 1000);
            })
            .catch((error) => {

                setLoader(false)
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: error?.response?.data?.error || 'something went wrong!!',
                })
            });
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
                        marginBottom: "30px"
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
                    <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", paddingBottom: 10, marginBottom: "50px" }}>
                        <div style={{ width: '98%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '5px', marginTop: '10px', marginBottom: '10px', backgroundColor: '#FFF' }}>
                            <Typography
                                sx={{
                                    fontFamily: 'BebasNeue',
                                    fontWeight: '400',
                                    fontSize: '20px',
                                    lineHeight: '30px',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {id ? "Update Banner" : "Create Banner"}
                            </Typography>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    gap: '20px',
                                }}
                            >


                            </div>
                        </div>




                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', borderStyle: 'solid', borderWidth: '0px', width: '95%', gap: '20px', marginBottom: "20px" }}>
                            <ZupotsuTextfield
                                title="Banner Title"
                                value={bannerTitle}
                                placeholder="Enter Tray title"
                                name="bannerTitle"
                                isRequired={false}
                                multiline={false}
                                rows={4}
                                handleChange={(e: any) => {
                                    setBannerTitle(e.target.value)
                                }}
                            />
                            <ZupotsuTextfield
                                title="Sub Heading Description "
                                value={bannerHeading}
                                placeholder="Enter sub heading not more than 30 words"
                                name="bannerTitle"
                                isRequired={false}
                                multiline={false}
                                rows={4}
                                handleChange={(e: any) => {
                                    setBannerHeading(e.target.value)
                                }}
                            />
                            {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", width: '100%', justifyContent: "flex-start" }}>
                            <Button onClick={() => {

                            }} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', color: 'red', fontSize: '16px', backgroundColor: 'transparent', fontWeight: '700', fontFamily: 'Inter', border: '0px solid transparent', textAlign: "center", textTransform: 'capitalize', lineHeight: '24px', }}>
                                <img src={AddButton} width={15} height={15} style={{ marginRight: "8px", color: 'rgba(226, 11, 24, 1)' }} /> Add New Field
                            </Button>
                        </div> */}



                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                width: '100%',

                            }}>

                                <Typography
                                    style={{
                                        color: 'var(--Gray-1, #333)',
                                        fontFamily: 'Inter',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        marginBottom: '10px',
                                        width: '100%'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                    }}>
                                        Add banner image from assets

                                    </div>


                                </Typography>

                                <Box sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%' }}>



                                    <FormControl fullWidth>
                                        <Select

                                            id="demo-multiple-name"

                                            sx={{
                                                height: '40px',
                                                '& .MuiFormControl-root': {
                                                    height: '40px',

                                                },
                                                '& .MuiTextField-root': {
                                                    height: '40px',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'

                                                },
                                                '& .MuiInputBase-root': {
                                                    height: '40px',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'

                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    height: '40px',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    width: '100%',

                                                },

                                                '& .MuiSelect-select': {
                                                    padding: '10px 30px',
                                                    borderRadius: '5px',
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                },

                                                '& .MuiSelect-icon': {
                                                    right: '10px',
                                                    color: '#333',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                },

                                                backgroundColor: 'transparent',
                                                border: "0.2px solid #ddd",
                                                borderRadius: '4px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center'
                                            }}
                                            labelId="Add Assets"
                                            MenuProps={MenuProps}
                                            value={searchQuery}
                                            disabled={false}
                                            displayEmpty
                                            inputProps={{
                                                'aria-label': 'Without label',
                                            }}

                                            size="small"

                                            renderValue={(searchQuery) => {
                                                if (!searchQuery) {
                                                    return (
                                                        <Typography
                                                            style={{
                                                                color: 'var(--Gray-4, #BDBDBD)',
                                                                fontFamily: 'Inter',
                                                                fontSize: '16px',
                                                                fontStyle: 'normal',
                                                                fontWeight: 500,
                                                                lineHeight: '140%' /* 19.6px */,
                                                                letterSpacing: '0.14px',
                                                                textAlign: "left",
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            Add Assets
                                                        </Typography>
                                                    );
                                                }

                                                return searchQuery;
                                            }}
                                            IconComponent={() => (
                                                <KeyboardArrowDownIcon
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color:
                                                            isFocused
                                                                ? '#828282' :
                                                                '#333',
                                                        pointerEvents: 'none',
                                                        position: 'absolute',
                                                        right: '10px',
                                                    }}
                                                />
                                            )}
                                        >


                                            {assetData?.map((data: any, index: any) => (
                                                <MenuItem
                                                    sx={{
                                                        padding: '8px',
                                                        fontFamily: 'Inter',
                                                        fontSize: '14px',
                                                        '&:hover': {
                                                            color: '#E20B18',
                                                        },
                                                    }}
                                                    onClick={() => { setSearchObject(data); setSearchQuery(data?.asset_detail[0].name); setAssetId(data?.id) }}
                                                    key={data}
                                                    value={data.asset_detail[0].name}
                                                >
                                                    {data.asset_detail[0].name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </Box>

                            </div>

                            {
                                (bannerImage) && (
                                    <div style={{
                                        width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',

                                    }}>

                                        <img src={bannerImage} style={{
                                            width: "216px",
                                            height: "121.5px",
                                            borderRadius: '8px',
                                            background: "linear-gradient(0deg, #D9D9D9, #D9D9D9),linear-gradient(0deg, rgba(16, 98, 167, 0.7), rgba(16, 98, 167, 0.7))",

                                        }}

                                        />

                                        <div
                                            style={{
                                                top: '8px',
                                                right: '8px',
                                                display: 'flex',
                                                gap: '10px',
                                                marginLeft: '-30px',
                                                marginTop: '5px'
                                            }}
                                        >
                                            <div>
                                                <img
                                                    src={deleteIcon1}
                                                    alt="delete-icon"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setBannerImage(null);
                                                        setSearchObject(null);
                                                        setSearchQuery(null)
                                                        setAssetId(null)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                )
                            }



                            {!(bannerImage) && (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center", width: '100%', fontFamily: 'Inter' }}>
                                <ZupotsuImgUpload
                                    fileSize={'Upload size 1050x425px '}
                                    uploadedImage={bannerImage}
                                    imgCardLabel={
                                        'Upload Banner Image'
                                    }
                                    fileType={'jpg'}
                                    name={'Cover Picture 1'}
                                    uploadTitle={
                                        'Click to upload or Drag & Drop png/jpg here'
                                    }
                                    setUploadedImage={(name, imageUrl, file) => {
                                        handleFileChange(name, imageUrl, file);
                                    }}

                                    showToastMessage={false}
                                />
                            </div>)}

                        </div>

                        <div
                            style={{
                                padding: deviceType == "mobile" ? "0px" : '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent:
                                    deviceType === 'mobile' ? 'center' : 'space-between',
                                flexWrap: 'wrap',
                                gap: deviceType === 'mobile' ? '20px' : '0',
                                width: sidebarOpen == false ? "100%" : deviceType === 'mobile' ? '100%' : '83%',
                                border: deviceType === 'mobile' ? "" : "1px solid #ff00000d",
                                boxShadow: deviceType === 'mobile' ? "" : "3px 0px 6px #91919b54",
                                position: deviceType === "mobile" ? "relative" : "absolute",
                                bottom: "0px",
                                right: "0px",
                                zIndex: 5,
                                backgroundColor: '#FFF',
                                paddingLeft: deviceType === ("small-tablet" || 'tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%',
                                paddingRight: deviceType === ("small-tablet" || 'tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%'

                            }}
                        >

                            <ZupotsuButton
                                name={"  Cancel  "}
                                padding={"10px"}
                                handleClick={handleBack}
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
                                leadingIcon={copy}
                                name="View Preview"
                                handleClick={() => {
                                    if (bannerHeading && bannerTitle && bannerImage) {
                                        handleToggleDrawer()
                                    }
                                    else {
                                        setSnackbar(
                                            {
                                                open: true,
                                                severity: 'error',
                                                message: 'Fill all details to see banner preview',
                                            }
                                        )
                                    }
                                }

                                }
                                padding={"10px"}
                                isCustomColors={true}
                                customBgColor={'rgba(226, 11, 24, 0.05)'}
                                customTextColor={'red'}
                                customBgColorOnhover={'#ffd7d7'}
                                customTextColorOnHover={'red'}
                                variant={'outlined'}
                                disabled={false}
                            />




                            <ZupotsuButton
                                trailingIcon={eastWhiteArrow}
                                customBgColor={"rgba(226, 11, 24, 1)"}
                                name={id ? "Update" : "Submit"}
                                disabled={!(bannerTitle && bannerImage) ? true : false}
                                padding={"10px"}
                                customOutlineColor={'0px solid transparent'}
                                handleClick={
                                    () => {
                                        if (bannerTitle && bannerImage) {
                                            if (id) {
                                                updateBanner()
                                            } else {
                                                addBanner()
                                            }
                                        } else {
                                            setSnackbar({
                                                open: true,
                                                severity: 'error',
                                                message: 'Please fill all the fields',
                                            })
                                        }
                                    }
                                }
                            />

                        </div>
                    </div>
                </Box>


                <Drawer
                    open={open}
                    onClose={handleToggleDrawer}
                    anchor="bottom"
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: deviceType === 'mobile' ? '80%' : '100%',
                            height: '80%',
                            paddingTop: '20px',
                            display: 'flex',
                            overflow: 'hidden',
                            border: "0px",
                            borderTopRightRadius: '10px',
                            borderTopLeftRadius: '10px',
                            backgroundColor: 'transparent',
                            marginLeft: deviceType === 'mobile' ? '5%' : '0%',
                            marginRight: deviceType === 'mobile' ? '5%' : '',
                            marginTop: deviceType === 'mobile' ? '24px' : '5%',
                        },
                    }}
                >
                    <button
                        onClick={() => { handleToggleDrawer() }}
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '50px',
                            height: '50px',
                            borderRadius: "50px",
                            border: "0px solid transparent",
                            backgroundColor: "transparent",
                            padding: "0px",
                            marginTop: '-20px'
                        }}>

                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="24" fill="#E0E0E0" />
                            <path d="M24 37.3327C31.3334 37.3327 37.3334 31.3327 37.3334 23.9993C37.3334 16.666 31.3334 10.666 24 10.666C16.6667 10.666 10.6667 16.666 10.6667 23.9993C10.6667 31.3327 16.6667 37.3327 24 37.3327Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M20.2267 27.7732L27.7734 20.2266" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M27.7734 27.7732L20.2267 20.2266" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </button>
                    <div style={{ overflowY: 'scroll', background: '#fff', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', width: '100%', backgroundColor: '#FFF' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                // marginTop: '-10px',
                                // zIndex: 9999,
                            }}
                        >

                            <img src={ZupotsuColuredLogo} alt='ZupotsuColuredLogo' style={{ width: '184px', height: '100px', marginLeft: "20px" }} />

                        </div>






                        <div style={{}}>
                            <Box className={"ecarouselContainer"} >
                                <Carousel
                                    autoPlay
                                    interval={3000}
                                    infiniteLoop
                                    showThumbs={false}
                                    showStatus={false}
                                    dynamicHeight={false}
                                    showArrows={true}
                                    showIndicators={true}
                                >
                                    {
                                        [
                                            {
                                                "bannerTitle": bannerTitle,
                                                "bannerHeading": bannerHeading,
                                                "bannerImage": bannerImage
                                            },
                                            {
                                                "bannerTitle": bannerTitle,
                                                "bannerHeading": bannerHeading,
                                                "bannerImage": bannerImage
                                            }
                                        ]?.map((item: any, index: any) => (
                                            <div key={index} style={{ width: '100%', display: 'flex' }}>
                                                <div style={{ width: '25%' }}></div>
                                                <div key={index} className={"ecarouselItem"} style={{ width: '75%' }}>
                                                    <img src={item.bannerImage} className={"eslideImage"} />
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            left: '0px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            background: 'linear-gradient(90deg, #003B8A 26.34%, rgba(69, 1, 0, 0) 74.83%)',
                                                            width: '100%',
                                                            alignItems: 'flex-start',
                                                            gap: '5px',
                                                            height: '100%',
                                                            // top:"-10px",
                                                            padding: deviceType == "mobile" ? '20px' : '40px'

                                                        }}
                                                    >
                                                        <div>
                                                            <div>
                                                                <Breadcrumb
                                                                    linkDetails={linkDetailsPreview}
                                                                    underline="always"
                                                                    maxItems={3}
                                                                    itemBeforeCollapse={1}
                                                                    itemAfterCollapse={1}
                                                                    iconName="arrow_forward_ios_black_24dp"
                                                                    iconSize={20}
                                                                    iconLabel="Breadcrumb-Arrow-Right"
                                                                    iconStyle="regular"
                                                                    color="#FFF"
                                                                    textColor="#FFF"
                                                                />
                                                            </div>
                                                            <Box sx={{
                                                                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: deviceType == 'mobile' ? '10px' : '20px', width: deviceType == 'mobile' ? '100%' : '60%'
                                                            }} >
                                                                <Typography
                                                                    style={{
                                                                        fontFamily: "Inter",
                                                                        fontSize: deviceType == "mobile" ? "24px" : "44px",
                                                                        fontWeight: 800,
                                                                        lineHeight: deviceType == 'mobile' ? "30px" : "50px",
                                                                        textAlign: "left",
                                                                        color: "rgba(255, 255, 255, 1)",
                                                                        whiteSpace: 'wrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        display: '-webkit-box',
                                                                        WebkitBoxOrient: 'vertical',
                                                                        WebkitLineClamp: 2,
                                                                    }}
                                                                >
                                                                    {item.bannerTitle || "Enter Title "}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        color: '#FFF',
                                                                        fontFamily: 'Inter',
                                                                        fontSize: deviceType == "mobile" ? "14px" : "16px",
                                                                        fontWeight: 500,
                                                                        // lineHeight: "25.6px",
                                                                        textAlign: "left",
                                                                        wordBreak: 'break-word',
                                                                        paddingTop: deviceType == 'mobile' ? '10px' : '20px',
                                                                        whiteSpace: 'wrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        display: '-webkit-box',
                                                                        WebkitBoxOrient: 'vertical',
                                                                        WebkitLineClamp: 2,
                                                                    }}
                                                                    variant="h6"
                                                                >
                                                                    {item.bannerHeading || "Enter Title "}
                                                                </Typography>
                                                            </Box>
                                                        </div>


                                                        <Button sx={{
                                                            backgroundColor: '#FFF',
                                                            borderRadius: '2px',
                                                            gap: "4px",
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-evenly',
                                                            border: '0px solid transparent',
                                                            ':hover': {
                                                                backgroundColor: 'rgba(255,255,255,0.8)',
                                                            }
                                                        }}
                                                        >
                                                            <img src={TouchingHand} alt='Touchinghand' style={{ width: '24px', height: '24px' }} />
                                                            <p style={{
                                                                color: "rgba(226, 11, 24, 1)",
                                                                fontWeight: '600',
                                                                margin: 0,
                                                                fontSize: deviceType == "mobile" ? '12px' : '16px'
                                                            }}>Get in Touch</p>

                                                        </Button>


                                                    </Box>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </Carousel>
                            </Box>
                        </div>

                        <div style={{ width: '100%', backgroundColor: '#FFF', height: "200px" }}>

                        </div>

                    </div>
                </Drawer>
            </Grid>

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

export default CreateBanner
