import React, { useEffect, useMemo, useState } from 'react'
import {
    Box,
    Button,
    Grid,
    Typography,
    MenuItem,
    InputAdornment,
    TextField,
    Modal
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Breadcrumb from '../../../Atoms/breadcrumb/breadcrumb';
import useDeviceType from '../../../utils/DeviceType';
import { DeleteIcon, NoDataImage, SearchNormal } from '../../../assets'
import ReusableTable from '../../../Molecules/table-management/ReusableTable';
import { Close, VisibilityOutlined } from '@mui/icons-material';
import NoData from '../../../error/NoData';
import Loader from '../../../loader/Loader';
import { useNavigate } from 'react-router-dom';
import mixpanelEvents from '../../../mixpanel/mixpanelEvents';
import Apis from '../../../services/apis';
import ZoptsuUnderlineTitle from '../../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
import EditAlertandNotification from './EditAlertandNotification';

const AlertandNotification = () => {
    const [loader, setLoader] = useState(false);
    const [sortAssets, setSortedAssets] = useState('All');
    const [search, setSearch] = useState('');
    const [assetFiltering, setAssetFiltering] = useState('All');
    const [selected, setSelected] = useState<any>();
    const [openPopup, setOpenPopup] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const apis = new Apis();
    const navigation = useNavigate()
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const headers1 = [
        "Feature",
        "Event",
        "Account User",
        "Admin",
        "Approver",
        "Publisher",
        "Seller Admin",
        "Seller",
        "Buyer",
        "Actions"
    ];

    const [tableData, setTableData] = useState([]);
    const linkDetails = useMemo(() => {
        return [
            {
                label: 'Settings',
                url: '',
            },
            {
                label: 'Alert and Notifications',
                url: '/alert_notification',
            }
        ];
    }, []);

    const handleChangeTable = (event: any, item: any) => {
        const newRole = event.target.value;
        const newData: any = tableData.map((dataItem: any) =>
            dataItem.name === item.name ? { ...dataItem, role: newRole } : dataItem
        );
        setTableData(newData);
    };



    const columns: any = [

        {
            field: 'feature', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: 'capitalize' }}>
                    {item?.feature || '✘'}
                </div>
            )
        },

        {
            field: 'event', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', }}>
                    {item?.event || '✘'}
                </div>
            )
        },
        {
            field: 'accountuser',
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: "capitalize" }}>
                    {item?.accountuser ? (
                        item?.accountuser?.alert_type || "✘"
                    ) : "X"}
                </div>
            )
        },
        {
            field: 'admin',
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: "capitalize" }}>
                    {item?.admin ? (item?.admin?.alert_type || "✘") : "✘"}
                </div>
            )
        },
        {
            field: 'approver',
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: "capitalize" }}>
                    {item?.approver ? (item?.approver?.alert_type || "✘") : "✘"}
                </div>
            )
        },
        {
            field: 'publisher',
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: "capitalize" }}>
                    {item?.publisher ? (item?.publisher?.alert_type || "✘") : "✘"}
                </div>
            )
        },
        {
            field: 'seller_admin',
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: "capitalize", }}>
                    {item?.seller_admin ? (item?.seller_admin?.alert_type || "✘") : "✘"}
                </div>
            )
        },
        {
            field: 'seller',
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: "capitalize" }}>
                    {item?.seller ? (item?.seller?.alert_type || "✘") : "✘"}
                </div>
            )
        },
        {
            field: 'buyer',
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: "capitalize" }}>
                    {item?.buyer ? (item?.buyer?.alert_type || "✘") : "✘"}
                </div>
            )
        },
        {
            field: 'actions',
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
            render: (_: any, item: any) => (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", padding: 0, border: "0px solid transparent", borderRadius: '8px', }}>
                    <div
                        onClick={() => { setOpenPopup(!openPopup); setSelected(item) }}
                        style={{
                            width: '32px', height: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: "rgba(226, 11, 24, 1)",
                            borderRadius: '8px',
                        }}>
                        <VisibilityOutlined sx={{ color: '#FFF', cursor: "pointer", }} />
                    </div>
                </div>
            )
        },


    ];
    const deviceType = useDeviceType();
    const ErrorData = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message: 'No assets found',
        }),
        []
    );



    useEffect(() => {
        const startTime = performance.now();
        const fetchAndTrack = async () => {
            await fetchAlertandNotification()
            const loadTime = performance.now() - startTime;
            mixpanelEvents.onLoad(loadTime, 'Alert and Notification');
        };
        fetchAndTrack();
        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Alert and Notification', timeSpent);
        };
    }, [openPopup])



    const fetchAlertandNotification = async () => {
        setLoader(true)
        try {
            const response = await apis.alertandNotification();
            let arr: any = [];

            response?.data?.data.map((item: any, index: any) => {
                arr.push(
                    {
                        "id": item?.id,
                        "feature": item?.feature || 'NA',
                        "accountuser": item?.account_user || 'NA',
                        "event": item?.event || 'NA',
                        "admin": item?.admin || 'NA',
                        "approver": item?.approver || 'NA',
                        "buyer": item?.buyer || 'NA',
                        "publisher": item?.publisher || 'NA',
                        "seller": item?.seller || 'NA',
                        "seller_admin": item?.seller_admin || 'NA',
                    }
                )
                setLoader(false)
            })
            setTableData(arr)

        } catch (error: any) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Something went wrong...!',
            });
            mixpanelEvents.errorHandling({
                name: 'Alert and Notification',
                msg: error?.response?.data?.error || error?.message
            })
            setLoader(false)
        }
    };

    const sortingStyles: any = {
        button: {
            background: '#E20B18',
            color: '#FFF',
            '&:hover': {
                backgroundColor: '#a9141d',
                color: '#fff',
            },
            cursor: "pointer",
            textAlign: "left"
        },
        tabButton: {
            padding: deviceType == "mobile" ? "5px" : '10px',
            color: 'rgba(226, 11, 24, 1)',
            fontSize: deviceType == "mobile" ? "15px" : '16px',
            borderBottom: ' 2px solid rgba(226, 11, 24, 1)',
            fontFamily: 'Inter',
            fontWeight: 600,
            cursor: "pointer",
            textAlign: "left"
        },
        tabButtonInactive: {
            padding: deviceType == "mobile" ? "5px" : '10px',
            color: '#828282',
            fontSize: deviceType == "mobile" ? "15px" : '16px',
            fontFamily: 'Inter',
            fontWeight: 600,
            cursor: "pointer",
            textAlign: "left"
        }
    };



  

    if (loader) {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    } else {
        return (
            <div style={{ height: '100%', width: '100%', }}>

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
                {(!openPopup) ? (<div style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', height: '90vh', overflowY: "scroll", scrollbarWidth: 'none', overflowX: 'hidden' }}>
                    <Grid xs={12} md={12} lg={12} width={"100%"} spacing={2} sx={{ backgroundColor: 'rgba(250,250,250,1)' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                backgroundColor: '#FFF',
                                margin: "10px",
                                padding: "15px",
                                width: '98%',
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

                    <div
                        style={{
                            width: '100%',
                            padding: "10px",

                            marginBottom: '10px'
                        }}
                    >

                        <div
                            style={{
                                padding: '14px 10px 14px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: "#FFF",
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '20px',
                                    flexWrap: "wrap"
                                }}
                            >
                                <ZoptsuUnderlineTitle
                                    fontSizeOnLargeScreen="35px"
                                    fontSizeOnMediumScreen="33px"
                                    fontSizeOnSmallScreen="33px"
                                    fontSizeOnExtraSmallScreen="33px"
                                    titleText={'Alert and Notification'}
                                    letterSpacing="1.92px"
                                    lineHeight="40.2px"
                                    textAlign="start"
                                    underlineWidthForDesktop="100%"
                                    underlineWidthForSmallTablet="100%"
                                    underlineWidthForMobile="100%"
                                    underlineBottomForDesktop="18%"
                                    underlineBottomForSmallTablet="21%"
                                    underlineBottomForMobile="24%"
                                    // linearGradientPresent={true}
                                    paddingLeft="0px"
                                    underlineHeight="9px"
                                />



                                {(deviceType == "mobile") && (<div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                </div>)}


                                <div style={{
                                    padding: 0, margin: 0,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: deviceType === "mobile" ? "center" : 'flex-end',
                                    alignItems: 'center',
                                    gap: "8px",
                                    flexWrap: "wrap",
                                    width: deviceType == "mobile" ? "100%" : '',
                                }}>
                                    <TextField
                                        value={search}
                                        placeholder="Search..."
                                        sx={{
                                            height: '40px',
                                            '& .MuiFormControl-root': {
                                                height: '40px',
                                            },
                                            '& .MuiTextField-root': {
                                                height: '40px',
                                            },
                                            '& .MuiInputBase-root': {
                                                height: '40px',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                height: '40px',
                                                border: "0px solid none"
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: "0px solid none"
                                            },

                                            '& .MuiOutlinedInput': {
                                                border: "0px solid none"
                                            },
                                            width: '200px',
                                            backgroundColor: 'rgba(242, 242, 242, 1)',
                                            border: "0px solid none",
                                            borderRadius: '4px'

                                        }}
                                        onChange={(e) => { setSearch(e.target.value) }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <img
                                                        src={SearchNormal}
                                                        alt="Search"
                                                        style={{
                                                            // paddingBottom: '5px',
                                                            marginRight: '10px',
                                                            height: '20px',
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                </div>
                            </div>

                            <div style={{ width: deviceType == "mobile" ? "100%" : "auto", flexDirection: 'row', display: 'flex', justifyContent: deviceType == "mobile" ? 'flex-start' : "flex-start", scrollbarWidth: 'none', borderBottom: '2px solid rgba(224, 224, 224, 1)', gap: '10px', marginTop: '10px', marginBottom: '20px', overflowX: "scroll", overflowY: 'hidden', }}>
                                <div style={sortAssets == "All" ?
                                    sortingStyles.tabButton : sortingStyles.tabButtonInactive
                                } onClick={() => {
                                    setSortedAssets("All")
                                    setAssetFiltering("")
                                }}>All</div>
                                <div style={sortAssets == "User Management" ?
                                    sortingStyles.tabButton : sortingStyles.tabButtonInactive
                                } onClick={() => {
                                    setSortedAssets("User Management")
                                    setAssetFiltering("User Management")

                                }}>User Management</div>
                                <div style={sortAssets == "Proposal Management" ?
                                    sortingStyles.tabButton : sortingStyles.tabButtonInactive
                                } onClick={() => {
                                    setSortedAssets("Proposal Management")
                                    setAssetFiltering("Proposal Management")
                                }}>Proposal Management</div>
                                <div style={sortAssets == "User Registration" ?
                                    sortingStyles.tabButton : sortingStyles.tabButtonInactive
                                } onClick={() => {
                                    setSortedAssets("User Registration")
                                    setAssetFiltering("User Registration")
                                }}>User Registration</div>
                                <div style={sortAssets == "User Login" ?
                                    sortingStyles.tabButton : sortingStyles.tabButtonInactive
                                } onClick={() => {
                                    setSortedAssets("User Login")
                                    setAssetFiltering("User Login")
                                }}>User Login</div>

                                <div style={sortAssets == "Catalogue" ?
                                    sortingStyles.tabButton : sortingStyles.tabButtonInactive
                                } onClick={() => {
                                    setSortedAssets("Catalogue")
                                    setAssetFiltering("Catalogue")
                                }}>Catalogue</div>



                            </div>

                            {loader && (
                                <div className="centered-container">
                                    <div className="loader"></div>
                                </div>
                            )}

                        </div>
                        {
                            !loader && (
                                <>
                                    {
                                        tableData?.length > 0 ? (
                                            <>

                                                <ReusableTable
                                                    columns={columns}
                                                    tableData={sortAssets == "All" ? tableData : tableData?.filter((item: any, index) => (item?.feature?.toLowerCase() == assetFiltering?.toLowerCase() || item?.event?.toLowerCase() == assetFiltering?.toLowerCase()))}
                                                    setTableData={setTableData}
                                                    headers={headers1}
                                                    search={search}
                                                    sortingColumn={0}
                                                    handleChange={handleChangeTable}
                                                />
                                            </>
                                        ) : (
                                            <NoData ErrorData={ErrorData} />

                                        )}
                                </>
                            )}
                    </div>
                </div>
                ) : (
                    <EditAlertandNotification selected={selected} setOpenPopup={setOpenPopup} />
                )}

            </div>
        )
    }
}

export default AlertandNotification

