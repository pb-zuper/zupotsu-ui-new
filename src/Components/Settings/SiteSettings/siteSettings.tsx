import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, InputAdornment, MenuItem, Paper, Select, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Table, FormControl, InputLabel, Modal, Dialog } from '@mui/material';
import { DeleteIcon, DotGroup, EditIcon, EditIconn, NoDataImage, SearchNormal, VisibilityEye, rearrange, rearrangeWhite } from '../../../assets';
import Breadcrumb from '../../../Atoms/breadcrumb/breadcrumb';
import { useNavigate } from 'react-router';
import NoData from '../../../error/NoData';
import { KeyboardArrowDownOutlined, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUpOutlined, VisibilityOff } from '@mui/icons-material';
import ActionButton from '../../../Molecules/table-management/ActionButton';
import VisibilityButton from '../../../Atoms/Visibility/VisibilityButton';
import { height, padding } from '@mui/system';
import useDeviceType from '../../../utils/DeviceType';
import Close from '@mui/icons-material/Close';
import ZupotsuButton from '../../../Atoms/zupotsu-button/zupotsu-button';
import Apis from '../../../services/apis';
import CustomSwitch from '../../../Atoms/customSwitch';
import ZupotsuTextfield from '../ZupotsuTextfield';
import Popup from '../../../Atoms/popup/popup';
import mixpanelEvents from '../../../mixpanel/mixpanelEvents';
import ZoptsuUnderlineTitle from '../../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';

const SiteSettings: React.FC = () => {

    const deviceType = useDeviceType();
    const [loader, setLoader] = useState(false);
    const [tableData, setTableData] = useState([]);
    const apis = new Apis();


    useEffect(() => {
        const startTime = performance.now();

        const fetchAndTrack = async () => {
            await onLoad()
            const loadTime = performance.now() - startTime;
            mixpanelEvents.onLoad(loadTime, 'Site Settings');
        };
        fetchAndTrack();
        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Site Settings', timeSpent);
        };
    }, [])
    const [hoveredRow, setHoveredRow] = useState<any>(null);
    const handleMouseLeave = () => {
        setHoveredRow(null);
    };

    const onLoad = () => {
        setLoader(true)
        apis.getCurrency()
            .then((response: any) => {
                let arr: any = [];
                response.data.data.sort((a: any, b: any) => a.priority - b.priority);
                const usdToInr = response.data.data.find((c:any) => c.name === "USD").value;
                const eurToInr = response.data.data.find((c :any)=> c.name === "EUR").value;
                const eurToUsd = eurToInr / usdToInr;
                arr.push({name:`USD to INR`,amt: "₹ "+usdToInr.toFixed(2)});
                arr.push({name:`EUR to INR`,amt: "₹ "+eurToInr.toFixed(2)});
                arr.push({name:`EUR to USD`,amt: "$ "+eurToUsd.toFixed(2)});
                setTableData(arr)
                setLoader(false)
            })
            .catch((error) => {
                // setLoad(false)
                setLoader(false)
                mixpanelEvents.errorHandling({
                    name: 'Manage Banners',
                    msg: error?.response?.data?.error
                })
            });
    }

    const linkDetails = useMemo(() => [
        {
            label: 'Site Settings',
            url: '',
        },
        {
            label: 'Currency Rates',
            url: '',
        },
    ], []);

    const ErrorData = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message: "No Banner listed"
        }),
        [
            // selectedCategory
        ]
    )
    const headers2 = ['Converstion Rates', "Amount"]


    if (!loader) {
        return (
            <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: 'rgb(250,250,250)', height: '90vh', overflowY: "scroll", overflowX: 'hidden' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'center',
                        // padding: '5px',
                        backgroundColor: 'rgb(250,250,250)',
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
                        <div style={{ width: '98%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginTop: '10px', marginBottom: '10px', backgroundColor: '#FFF' }}>
                            <ZoptsuUnderlineTitle
                                fontSizeOnLargeScreen="35px"
                                fontSizeOnMediumScreen="33px"
                                fontSizeOnSmallScreen="33px"
                                fontSizeOnExtraSmallScreen="33px"
                                titleText={'Currency Rates'}
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
                            
                        </div>
                        
                        <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10px', borderRadius: '20px' }}>
                                <div style={{ width: "97%", height: 400, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: '0px', gap: "20px" }}>
                                    <TableContainer style={{ borderStyle: 'none', boxShadow: "none", }}>
                                        <Table style={{ borderStyle: 'none',border:'1px solid rgba(240, 239, 239, 0.6)' }}>
                                            <TableHead style={{ backgroundColor: 'rgba(240, 239, 239, 0.6)', padding: '10px', paddingTop: '5px', paddingBottom: '5px' }}>
                                                <TableRow>
                                                    {headers2.map((header, index) => (
                                                        <TableCell key={index} style={{ textAlign: 'left', border: "0px solid transparent", fontWeight: 'bold' }}>
                                                            {header}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody onMouseLeave={handleMouseLeave} >
                                                {tableData.map((item:any, index:any) => (
                                                    <TableRow
                                                        key={index}
                                                        data-position={index}
                                                        style={{
                                                            background: hoveredRow === index ? '#F7F9FF' : index % 2 === 1 ? "rgba(249, 248, 248, 1)" : 'transparent',
                                                            height: "30px",
                                                            border: "0px solid transparent",
                                                            fontSize: "14px",
                                                            lineHeight: "21px",
                                                            fontFamily: 'Inter',
                                                            fontWeight: "500"
                                                        }}
                                                     
                                                    >
                                                        <TableCell style={{ textAlign: 'left', border: "0px solid transparent", display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                                            {item.name}
                                                        </TableCell>
                                                        <TableCell style={{ textAlign: 'left', border: "0px solid transparent" }}>
                                                            {item.amt}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                              
                            </div>
                    </div>
                </Box>
                

            </Grid >
        );
    }
    else {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }
};

export default SiteSettings;
