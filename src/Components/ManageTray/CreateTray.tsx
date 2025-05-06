import { Box, Button, Checkbox, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { AddButton, arrowLeft, eastWhiteArrow, SearchNormal } from '../../assets'
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb'
import ZupotsuTextfield from '../Settings/ZupotsuTextfield'
import ZupotsuSearchBar from '../../Atoms/zupotsu-search-bar/zupotsu-search-bar'
import ZupotsuAutocomplete, { ZupotsuAutoComplete } from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete'
import ZupotsuAutocompletewithsearch from '../../Atoms/zupotsu-textfields/zupotsu-autocompletewithsearch'
import { Container, Row, Col } from 'react-bootstrap';
import useDeviceType from '../../utils/DeviceType';
import Apis from '../../services/apis';
import NoData from '../../error/NoData'
import { NoDataImage, rearrange } from '../../assets/index';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import mixpanelEvents from '../../mixpanel/mixpanelEvents'

const CreateTray = () => {
    const deviceType = useDeviceType();
    const [loader, setLoader] = useState(false);
    const apis = new Apis();
    const linkDetails = useMemo(() => [
        {
            label: 'Catalogue Management',
            url: '/catalogue_management',
        },
        {
            label: 'Manage Tray',
            url: '/manage_tray',
        },
        {
            label: 'Create New Tray',
            url: '',
        },
    ], []);
    const [assetData, setAssetData] = useState<any>([]);
    const [allassetData, setallAssetData] = useState<any>([]);
    const [draggedFrom, setDraggedFrom] = useState<number | null>(null);
    const [draggedTo, setDraggedTo] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [updatedOrder, setUpdatedOrder] = useState<any>([]);
    const [search, setsearch] = useState<any>('');
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [headline, setheadline] = useState<any>('');
    const [description, setdescription] = useState<any>('');
    const [limit, setlimit] = useState<any>(10);
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const [tdata, setTData] = useState<any>()
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const navigate = useNavigate();

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, position: number) => {
        setDraggedFrom(position);
        setIsDragging(true);
        event.dataTransfer.setData("text/html", '');
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>, position: number) => {
        event.preventDefault();
        setDraggedTo(position);
    };

    const handleDrop = () => {
        const newOrder = [...updatedOrder];
        const draggedItem = newOrder.splice(draggedFrom!, 1)[0];
        newOrder.splice(draggedTo!, 0, draggedItem);
        setUpdatedOrder(newOrder);
        setIsDragging(false);
        setDraggedFrom(null);
        setDraggedTo(null);
    };

    useEffect(() => {
        const startTime = performance.now();

        const fetchAndTrack = async () => {

            await getAllAssetsApi()
            const loadTime = performance.now() - startTime;
            mixpanelEvents.onLoad(loadTime, 'Create Tray Page');
        };
        fetchAndTrack();
        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Create Tray Page', timeSpent);
        };
    }, [])

    const getAllAssetsApi = () => {
        setLoader(true)
        apis.getAllAssets()
            .then((response: any) => {
                let arr: any[] = [];

                arr = response.data.data
                    .filter((asset: any) => asset.asset_detail[0].asset_status === "published")
                    .map((asset: any) => ({
                        ...asset,
                        isSel: false
                    }));

                const updateTrayAssets = (trayData: any) => {
                    const { name, description, tray_assets } = trayData;
                    setheadline(name);
                    setdescription(description);
                    setlimit(trayData.limit_assets)
                    arr = arr.map((main: any) => {
                        const trayAsset = tray_assets.find((sec: any) => main.id === sec.asset_id);
                        if (trayAsset) {
                            return { ...main, isSel: true, genId: trayAsset.id, priority: trayAsset.priority };
                        }
                        return { ...main, priority: Infinity };
                    });

                    // Sort the array based on priority
                    arr.sort((a: any, b: any) => a.priority - b.priority);
                    setUpdatedOrder(arr);

                    setAssetData(arr);
                    setallAssetData(arr);
                    setLoader(false);
                };

                if (id) {
                    apis.getTray(id)
                        .then((trayResponse: any) => {
                            const trayData = trayResponse.data.data;
                            setTData(trayData)
                            updateTrayAssets(trayData);
                        })
                        .catch((error) => {
                            console.error("Error fetching tray:", error);
                            setLoader(false);
                        });
                } else {
                    setAssetData(arr);
                    setUpdatedOrder(arr);
                    setallAssetData(arr);
                    setLoader(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching assets:", error);
                mixpanelEvents.errorHandling({
                    name: 'Create Tray Page',
                    msg: error?.response?.data?.error || error?.message
                })
                setLoader(false);
            });
    }

    const clearAll = () => {
        setLoader(true)
        let arr: any = [];
        assetData.map((asset: any) => {
            asset["isSel"] = false
            arr.push(asset)
        })
        setAssetData(arr)
        setUpdatedOrder(arr)
        setLoader(false)
    };

    const updateFun = (asset: any) => {
        asset["isSel"] = !asset["isSel"];
        const updatedAssetData = assetData.map((item: any) =>
            item.id === asset.id ? asset : item
        );
        const updatedorderAssetData = updatedOrder.map((item: any) =>
            item.id === asset.id ? asset : item
        );
        setAssetData(updatedAssetData);
        setUpdatedOrder(updatedorderAssetData)
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

    const ErrorData2 = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message:
                'No assets Selected!!',
        }),
        []
    );

    const noSelectedAssets = updatedOrder.every((item: any) => !item.isSel);

    const handleInputChangeFun = (event: any) => {
        const value = event.target.value;
        setsearch(value);
        handleSearch(value);
    };

    const handleSearch = (value: any) => {
        const fdata = allassetData.filter((item: any) => {
            return item.asset_detail[0].name?.toLowerCase().includes(value?.toLowerCase());
        });
        setAssetData(fdata);
    };

    const addTray = () => {
        if (!headline || !limit) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Please fill all the mandatory fields for Tray!!',
            })
        }
        else {
            if (limit > 0) {
                let arr: any = [];
                updatedOrder.map((item: any, index: any) => {
                    if (item.isSel) {
                        let obj: any = { "asset_id": item.id }
                        if (item.genId) {
                            obj['id'] = item.genId;
                        }
                        arr.push(obj)
                    }
                })
                arr.map((item: any, index: any) => {
                    item["priority"] = index + 1
                })
                let body: any = {
                    "name": headline,
                    "description": description,
                    "tray_assets": arr,
                    "limit_assets": parseInt(limit)
                }
                let anames: any = []

                updatedOrder.map((item: any) => {
                    if (item.isSel) { anames.push(item.asset_detail[0].name); }
                })

                if (id) {
                    body["id"] = id;
                    setLoader(true)
                    apis.updateTray(body)
                        .then((response: any) => {
                            const trayUpdateData = {
                                TrayName: headline,
                                NumberOfAssets: anames.length,
                                IsNew: false,
                                AssetNames: anames,
                                CreatedBy: tdata.created_by_user.name,
                                PublishedBy: tdata.published_by_user.name,
                                PublishedAt: tdata.published_at,
                                PagePosition: response.data.data.priority,
                                TrayStatus: tdata.is_active
                            };

                            mixpanelEvents.onTrayUpdated(trayUpdateData);
                            setLoader(false)
                            setSnackbar({
                                open: true,
                                severity: 'success',
                                message: ' Tray Updated successfully!',
                            });
                            setTimeout(() => {
                                navigate('/manage_tray');
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
                else {
                    if (!(headline?.toLowerCase() == "team" || headline?.toLowerCase() == "tournament" || headline?.toLowerCase() == "content" || headline?.toLowerCase() == "athlete")) {
                        setLoader(true)
                        apis.addTray(body)
                            .then((response: any) => {
                                const trayUpdateData = {
                                    TrayName: headline,
                                    NumberOfAssets: anames.length,
                                    IsNew: false,
                                    AssetNames: anames,
                                    CreatedBy: localStorage.getItem("name"),
                                    PublishedBy: null,
                                    PublishedAt: null,
                                    PagePosition: response.data.data.priority,
                                    TrayStatus: false
                                };

                                mixpanelEvents.onTrayUpdated(trayUpdateData);
                                setLoader(false)
                                setSnackbar({
                                    open: true,
                                    severity: 'success',
                                    message: ' Tray Created successfully!',
                                });
                                setTimeout(() => {
                                    navigate('/manage_tray');
                                }, 1000);
                            })
                            .catch((error) => {
                                // setLoad(false)
                                setLoader(false)
                                setSnackbar({
                                    open: true,
                                    severity: 'error',
                                    message:  (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
                                })
                            });
                    }
                    else {
                        setSnackbar({
                            open: true,
                            severity: 'error',
                            message: 'Please enter a different Tray Name!!',
                        })
                    }
                }
            }
            else {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Asset Limit should be greater then Zero!!',
                })
            }
        }
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
                        height: '82vh',
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
                                Create Tray
                            </Typography>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    gap: '20px',
                                    // width: '70%',
                                }}
                            >


                            </div>
                        </div>


                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', borderStyle: 'solid', borderWidth: '0px', width: '95%', gap: '10px' }}>
                            <ZupotsuTextfield
                                title="Heading Title"
                                value={headline}
                                placeholder="Enter Tray title"
                                name="bannerTitle"
                                isRequired={true}
                                multiline={false}
                                rows={4}
                                handleChange={(e: any) => {
                                    setheadline(e.target.value)
                                }}
                                previewMode={
                                    id
                                        ? (
                                            headline?.toLowerCase() === "team" ||
                                            headline?.toLowerCase() === "tournament" ||
                                            headline?.toLowerCase() === "content" ||
                                            headline?.toLowerCase() === "athlete"
                                        )
                                            ? true
                                            : false
                                        : false
                                } />
                            <ZupotsuTextfield
                                title="Sub Heading Description "
                                value={description}
                                placeholder="Enter sub heading not more than 30 words"
                                name="bannerTitle"
                                isRequired={false}
                                multiline={true}
                                rows={4}
                                handleChange={(e: any) => {
                                    setdescription(e.target.value)
                                }}
                            />
                            <ZupotsuTextfield
                                title="Asset Limit on Catalogue"
                                type="tel"
                                value={limit}
                                placeholder="Enter Asset Limit to display on Catalogue"
                                name="assetLimit"
                                isRequired={true}
                                multiline={false}
                                rows={4}
                                handleChange={(e: any) => {
                                    setlimit(e.target.value)
                                }}
                            />
                        </div>

                        <div style={{ borderColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '25px', borderStyle: 'solid', borderWidth: '0px', width: '95%', gap: '10px' }}>
                            <Typography
                                sx={{
                                    color: 'var(--Gray-1, #333)',
                                    fontFamily: 'Inter',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    lineHeight: "21px",
                                    fontStyle: 'Inter',
                                    display: 'flex',
                                    //   alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                Add Assets
                            </Typography>
                        </div>
                        <div style={{ padding: deviceType == 'mobile' ? '10px' : '30px', paddingRight: deviceType == 'mobile' ? '0px' : '10px', paddingTop: '0px', width: '100%' }}>
                            <div style={{ width: '100%', padding: '15px' }}>
                                <Row style={{}}>
                                    <Col xs={12} md={6} style={{ marginBottom: '20px', paddingLeft: '0px' }}>
                                        <div style={{
                                            border: '1px solid #E7E7E7', borderRadius: '8px', padding: '0px', height: '50vh'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '15px', }}>
                                                <Typography sx={{ color: 'var(--Gray-1, #333)', fontFamily: 'Inter', fontWeight: '600', fontSize: '16px', lineHeight: "21px", fontStyle: 'Inter', display: 'flex', alignItems: 'center', gap: '10px', }}>
                                                    Assets
                                                </Typography>

                                            </div>
                                            <div style={{ cursor: 'pointer', padding: '10px' }}>
                                                <ZupotsuTextfield
                                                    title=""
                                                    placeholder="Search by asset name"
                                                    isRequired={false}
                                                    name="addassets"
                                                    type="text"
                                                    value={search}
                                                    handleChange={(event: any) => {
                                                        handleInputChangeFun(event)
                                                    }}
                                                    previewMode={false}
                                                />
                                            </div>
                                            <div style={{ height: deviceType === 'mobile' ? '32vh' : '34vh', overflowX: 'hidden', overflowY: 'scroll' }}>
                                                {assetData.length > 0 && assetData.map((item: any, index: number) => (
                                                    (!item.isSel) && (
                                                        <div key={index} style={{ display: 'flex', borderBottom: '1px solid #ddd', padding: '15px', flexDirection: 'row' }}>
                                                            <Checkbox
                                                                checked={item.isSel}
                                                                onChange={() => { updateFun(item) }}
                                                                name={''}
                                                                color="primary"
                                                                sx={{ borderRadius: '5px' }}
                                                            />
                                                            <div style={{ paddingLeft: '10px' }}>
                                                                <Typography sx={{ color: 'var(--Gray-1, #333)', fontFamily: 'Inter', fontWeight: '600', fontSize: '16px', lineHeight: "21px", fontStyle: 'Inter', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    {item.asset_detail[0].name}
                                                                </Typography>
                                                                <Typography sx={{ color: 'var(--Gray-1, #333)', fontFamily: 'Inter', fontWeight: '400', fontSize: '16px', lineHeight: "21px", fontStyle: 'Inter', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    {item.asset_detail[0].headline}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    )
                                                ))}
                                                {(assetData.length == 0) && (<NoData ErrorData={ErrorData} />)}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} style={{ marginBottom: '20px', paddingLeft: '0px' }}>
                                        <div style={{ border: '1px solid #E7E7E7', borderRadius: '8px', padding: '0px', height: '50vh' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '15px', }}>
                                                <Typography sx={{ color: 'var(--Gray-1, #333)', fontFamily: 'Inter', fontWeight: '600', fontSize: '16px', lineHeight: "21px", fontStyle: 'Inter', display: 'flex', alignItems: 'center', gap: '10px', }}>
                                                    Added Assets
                                                </Typography>
                                                <Typography onClick={() => { clearAll() }} sx={{ color: 'var(--Gray-1, #333)', fontFamily: 'Inter', fontWeight: '400', fontSize: '14px', lineHeight: "21px", fontStyle: 'Inter', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} >
                                                    Clear Selection
                                                </Typography>
                                            </div>
                                            {(!noSelectedAssets) ? (

                                                <div style={{ height: deviceType === 'mobile' ? '40vh' : '40vh', overflowX: 'hidden', overflowY: 'scroll' }}>
                                                    {updatedOrder.map((item: any, index: number) => (
                                                        item.isSel && (
                                                            <div
                                                                key={index}
                                                                style={{ display: 'flex', borderBottom: '1px solid #ddd', padding: '15px', flexDirection: 'row' }}
                                                                draggable
                                                                onDragStart={(event) => handleDragStart(event, index)}
                                                                onDragOver={(event) => handleDragOver(event, index)}
                                                                onDrop={handleDrop}
                                                            >
                                                                <img src={rearrange} style={{ paddingLeft: '10px' }} />
                                                                <Checkbox
                                                                    checked={item.isSel}
                                                                    onChange={() => { updateFun(item) }}
                                                                    name={''}
                                                                    color="primary"
                                                                    sx={{ borderRadius: '5px' }}
                                                                />
                                                                <div style={{ paddingLeft: '10px' }}>
                                                                    <Typography sx={{ color: 'var(--Gray-1, #333)', fontFamily: 'Inter', fontWeight: '600', fontSize: '16px', lineHeight: "21px", fontStyle: 'Inter', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                        {item.asset_detail[0].name}
                                                                    </Typography>
                                                                    <Typography sx={{ color: 'var(--Gray-1, #333)', fontFamily: 'Inter', fontWeight: '400', fontSize: '16px', lineHeight: "21px", fontStyle: 'Inter', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                        {item.asset_detail[0].headline}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        )
                                                    ))}

                                                </div>) : (
                                                <div style={{ height: deviceType === 'mobile' ? '32vh' : '40vh', overflowX: 'hidden', overflowY: 'scroll' }}>
                                                    <NoData ErrorData={ErrorData2} />
                                                </div>
                                            )}

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Box>
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
                        //   position: deviceType === "mobile" ? "relative" : "absolute",
                        bottom: "0px",
                        right: "0px",
                        zIndex: 5,
                        backgroundColor: '#FFF',
                        paddingLeft: deviceType === ("small-tablet" || 'tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%',
                        paddingRight: deviceType === ("small-tablet" || 'tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%'

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
                    <ZupotsuButton
                        trailingIcon={eastWhiteArrow}
                        customBgColor={"rgba(226, 11, 24, 1)"}
                        name={"Submit"}
                        disabled={!headline || !limit ? true : false}
                        customOutlineColor={'0px solid transparent'}
                        handleClick={() => { addTray() }}
                    />


                </div>
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

export default CreateTray
