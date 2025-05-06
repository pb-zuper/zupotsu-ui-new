import React, { useState } from 'react'
import { Box, Button, Grid, InputAdornment, MenuItem, Paper, Select, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Table, FormControl, InputLabel } from '@mui/material';
import { BackgroundTennis, DeleteIcon, EditIconn, facebookIcon, fb1, GlobalB, globalEarth, instagramI, LinkedIn, ln, NoDataImage, SearchNormal, twitterx } from '../../assets';
import { KeyboardArrowDownOutlined, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUpOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import useDeviceType from '../../utils/DeviceType';
import VisibilityButton from '../../Atoms/Visibility/VisibilityButton';
import { useNavigate } from 'react-router';
import Tiktok from '../../assets/tiktok.svg'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useLocation } from 'react-router-dom';
const Eventscreentable = ({ tableData, setTableData, headers, columns, handleChange, isSearch }) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredRow, setHoveredRow] = useState(null);
    const deviceType = useDeviceType()
    const [isLoad, setIsload] = useState(false)
    const [data, setData] = useState(tableData)
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        let sortedData = [...tableData].sort((a, b) => {
            let aValue = !isSearch ? a.asset?.asset_detail?.[0]?.[key] : a._source?.[key];
            let bValue = !isSearch ? b.asset?.asset_detail?.[0]?.[key] : b._source?.[key];
            if (typeof aValue === 'string') {
                aValue = aValue?.toLowerCase();
            }
            if (typeof bValue === 'string') {
                bValue = bValue?.toLowerCase();
            }

            if (aValue < bValue) {
                return direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData)
    };

    const handleSortAssetClassCategory = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        let sortedData = [...tableData].sort((a, b) => {
            let aValue = !isSearch ? a.asset?.name : a._source?.name;
            let bValue = !isSearch ? b.asset?.name : b._source?.name;

            if (typeof aValue === 'string') {
                aValue = aValue?.toLowerCase();
            }
            if (typeof bValue === 'string') {
                bValue = bValue?.toLowerCase();
            }

            if (aValue < bValue) {
                return direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setData(sortedData)
    };

    const handleSortSports = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        let sortedData = [...tableData].sort((a, b) => {
            let aValue = !isSearch ? a?.asset?.sport[0] : a._source?.sport;
            let bValue = !isSearch ? b?.asset?.sport[0] : b._source?.sport;

            if (typeof aValue === 'string') {
                aValue = aValue?.toLowerCase();
            }
            if (typeof bValue === 'string') {
                bValue = bValue?.toLowerCase();
            }

            if (aValue < bValue) {
                return direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setData(sortedData)
    };


    const getFollowerCount = (item) => {
        // Define the correct item structure based on whether it is a search or not
        const formattedItem = !isSearch ? item.asset : item._source;

        // Parse asset_social_media if it's a string and if isSearch is true
        if (isSearch && formattedItem?.asset_social_media) {
            formattedItem.asset_social_media = typeof formattedItem.asset_social_media === 'string'
                ? JSON.parse(formattedItem.asset_social_media)
                : formattedItem.asset_social_media;
        }

        // Determine the follower count based on the current path
        return currentPath !== "tray"
            ? formattedItem?.asset_social_media?.find(
                (entry) => entry?.social_media_platform === "instagram"
            )?.asset_social_media_details?.slice(-1)[0]?.followers_count
            : item?._source?.asset_social_media?.find(
                (entry) => entry?.social_media_platform === "instagram"
            )?.asset_social_media_details?.slice(-1)[0]?.followers_count;
    };


    const handleSortFollowers = (key) => {
        let direction = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });

        let sortedData = [...tableData].sort((a, b) => {
            let aValue = getFollowerCount(a);
            let bValue = getFollowerCount(b);

            // Handle string comparison in case of non-numeric data
            if (typeof aValue === 'string') aValue = aValue.toLowerCase();
            if (typeof bValue === 'string') bValue = bValue.toLowerCase();

            // Sort `null`, `undefined`, or `NaN` values to the bottom
            if (aValue == null || isNaN(aValue)) return 1; // Push aValue to the bottom
            if (bValue == null || isNaN(bValue)) return -1; // Push bValue to the bottom

            if (aValue < bValue) {
                return direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setData(sortedData);
    };


    const handleMouseLeave = () => { }
    const headStyles = {
        fontFamily: 'Inter',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '21px',
        letterSpacing: '-0.3333333432674408px',
        textAlign: 'left',
        borderStyle: 'none',
        justifyContent: 'center',
        marginLeft: 0,
        paddingLeft: '18px',
        textTransform: 'capitalize',
        backgroundColor: 'rgba(224, 224, 224, 1)',
    };

    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const paginatedData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' })
    const getIcon = (assetTypeName) => {
        switch (assetTypeName?.toLowerCase()) {
            case "facebook":
                return facebookIcon;
            case "instagram":
                return instagramI;
            case "linkedin":
                return LinkedIn;
            case "website":
                return GlobalB;
            case "blog":
                return GlobalB;
            case "x":
                return twitterx;
            case "tiktok":
                return Tiktok;
            default:
                return "";
        }
    };
    const navigate = useNavigate();




    function formatCurrency2(value) {
        if (value) {
            let currencyCode = localStorage.getItem("preferred_currency") || 'INR';
            let locale = 'en-US';

            if (currencyCode === 'INR') {
                locale = 'en-IN';
            }
            const formatWithNoTrailingZeros = (num) => {
                return parseFloat(num.toFixed(1)); // Format to one decimal and remove trailing zeros
            };

            if (value >= 1_000_000) {
                // Convert to millions and append 'M'
                return formatWithNoTrailingZeros(value / 1_000_000) + 'M';
            } else if (value >= 1_000) {
                // Convert to thousands and append 'K'
                return formatWithNoTrailingZeros(value / 1_000) + 'K';
            }

            return new Intl.NumberFormat(locale, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                useGrouping: true
            }).format(value);
        } else {
            return "NA";
        }
    }



    if (!isLoad) {
        return (
            <>
                <TableContainer style={{ borderStyle: 'none', boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)", backgroundColor: '#FFF', width: '100%', borderRadius: "10px", }}>
                    <Table style={{ borderStyle: 'none', width: '100%', boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)", }}>

                        <TableHead style={{
                            backgroundColor: 'rgba(240, 239, 239, 0.6)', paddingTop: '5px', paddingBottom: '5px',
                            boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)",

                        }}>
                            <TableRow
                                sx={{
                                    borderRadius: "10px",
                                }}
                            >
                                {headers.map((header, index) => (
                                    <TableCell
                                        key={index}
                                        style={{
                                            ...headStyles,
                                            letterSpacing: '-0.3333333432674408px',
                                            textAlign: 'left',
                                            borderStyle: 'none',
                                            justifyContent: 'center',
                                            marginLeft: 0,
                                            paddingLeft: '15px',
                                            textTransform: 'capitalize',
                                            borderTopRightRadius: index === headers.length - 1 ? "10px" : "0px",
                                            borderTopLeftRadius: index === 0 ? "10px" : "0px",
                                            borderBottomRightRadius: index === headers.length - 1 ? "10px" : "0px",
                                            borderBottomLeftRadius: index === 0 ? "10px" : "0px",
                                            backgroundColor: '#EFEFEF',
                                            color: '#111',
                                            fontFamily: 'Inter',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: 'normal',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => {
                                            if (index == 1) { handleSortAssetClassCategory("assetclasscategory") }
                                            else if (index == 2) { handleSort("name") }
                                            else if (index == 4) {
                                                handleSortSports("sports")
                                            } else if (index == 5) {
                                                handleSortFollowers("followers")
                                            }
                                        }
                                        }
                                    >
                                        <div
                                            style={{
                                                display: 'flex', alignItems: 'center',
                                                backgroundColor: '#EFEFEF',
                                                color: '#111',
                                                fontFamily: 'Inter',
                                                fontSize: '14px',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                cursor: (index == 1 || index == 2 || index == 4 || index == 5) ? 'pointer' : 'default',

                                            }}
                                        >
                                            {header}
                                            {index == 2 && (
                                                sortConfig.key === "name" ? (
                                                    sortConfig.direction === 'asc' ?
                                                        <KeyboardArrowUpOutlined style={{ marginLeft: '8px' }} /> :
                                                        <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                                                ) : (
                                                    <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                                )
                                            )}
                                            {index == 1 && (
                                                sortConfig.key === "assetclasscategory" ? (
                                                    sortConfig.direction === 'asc' ?
                                                        <KeyboardArrowUpOutlined style={{ marginLeft: '8px' }} /> :
                                                        <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                                                ) : (
                                                    <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                                )
                                            )}
                                            {(index == 4) && (
                                                sortConfig.key === "sports" ? (
                                                    sortConfig.direction === 'asc' ?
                                                        <KeyboardArrowUpOutlined style={{ marginLeft: '8px' }} /> :
                                                        <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                                                ) : (
                                                    <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                                )
                                            )}
                                            {(index == 5) && (
                                                sortConfig.key === "followers" ? (
                                                    sortConfig.direction === 'asc' ?
                                                        <KeyboardArrowUpOutlined style={{ marginLeft: '8px' }} /> :
                                                        <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                                                ) : (
                                                    <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody style={{ gap: '10px', width: '100%' }}>


                            {data.map((item, index) => {
                                // item = item.asset;
                                item = !isSearch ? item.asset : item._source
                                if (isSearch && item.asset_social_media) {
                                    item.asset_social_media = typeof item.asset_social_media === 'string' ? JSON.parse(item.asset_social_media) : item.asset_social_media;
                                }
                                return (
                                    <TableRow
                                        key={index}
                                        // onDoubleClick={() => { onRowDoubleClick(item) }}
                                        onMouseEnter={() => setHoveredRow(index)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            background: hoveredRow === index ? '#F7F9FF' : index % 2 === 1 ? "rgba(249, 248, 248, 1)" : 'transparent',
                                            border: "0px solid transparent",
                                            fontSize: "14px",
                                            lineHeight: "21px",
                                            fontFamily: 'Inter',
                                            fontWeight: "500",
                                            marginTop: '15px',
                                            padding: "10px",
                                            height: "50px",
                                            boxShadow: index % 2 === 1 ? "rgb(0 0 0 / 15%) 0px 0px 28px 0px" : ""

                                        }}
                                    >

                                        <TableCell sx={{
                                            border: "0px solid transparent",
                                            padding: '5px',
                                            height: "50px",
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'start',
                                            alignItems: 'start'
                                        }}>
                                            <img
                                                src={
                                                    (() => {
                                                        const thumbnail = item?.asset_media?.find((asset) => asset?.tags?.includes("Thumbnail"));
                                                        return isSearch ? item.asset_media_url : (thumbnail && (thumbnail.media_url)) || NoDataImage;
                                                    })()
                                                }
                                                style={{
                                                    width: "80px",
                                                    height: "40px",
                                                    padding: "0px",
                                                    gap: "10.11px",
                                                    border: "0.51px 0px 0px 0px",
                                                    objectFit: 'contain'
                                                }}
                                            />

                                        </TableCell>
                                        <TableCell sx={{

                                            border: "0px solid transparent",
                                            padding: '5px',
                                            height: "50px",

                                        }}>
                                            <p
                                                style={{

                                                    padding: 0,
                                                    margin: 0,
                                                    textAlign: 'left',
                                                    paddingLeft: '10px'
                                                }}
                                            >
                                                {isSearch ? (item.asset_type) : (item?.asset_type?.name)}
                                            </p>
                                        </TableCell>
                                        <TableCell sx={{

                                            border: "0px solid transparent",
                                            padding: '5px',
                                            height: "50px",

                                        }}>
                                            <p
                                                style={{

                                                    padding: 0,
                                                    margin: 0,
                                                    textAlign: 'left',
                                                    paddingLeft: '10px'

                                                }}
                                            >
                                                {isSearch ? item.name : (item?.asset_detail[0]?.name)}
                                            </p>

                                        </TableCell>
                                        <TableCell sx={{
                                            height: "50px",
                                            border: "0px solid transparent",
                                            padding: '5px',
                                        }}>
                                            <p
                                                style={{

                                                    padding: 0,
                                                    margin: 0,
                                                    textAlign: 'left',
                                                    paddingLeft: '10px'

                                                }}
                                            >
                                                {isSearch ? item.headline : (item?.asset_detail[0]?.headline)}
                                            </p>

                                        </TableCell>
                                        <TableCell sx={{
                                            height: "50px",
                                            border: "0px solid transparent",
                                            // padding: '5px',
                                            // textAlign: 'left',
                                        }}>
                                            {item?.sport || "---"}

                                        </TableCell>
                                        <TableCell sx={{
                                            height: "50px",
                                            border: "0px solid transparent",
                                            padding: '5px',
                                        }}>
                                            <div style={{ width: '100%', display: 'flex', gap: "4px", flexDirection: "row", alignItems: 'flex-start', justifyContent: "flex-start", flexWrap: 'wrap', paddingLeft: '20px' }}>
                                                {
                                                    // item?.asset_social_media?.slice(0, 2)?.map((item, index) => ( key={index} 
                                                    <div style={{
                                                        gap: "2px",
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: "flex-start",
                                                    }}>
                                                        <img src={getIcon("instagram")} style={{
                                                            width: "18px",
                                                            height: "18px",
                                                        }} />
                                                        {formatCurrency2((item?.asset_social_media?.find((entry) => entry.social_media_platform === "instagram")?.asset_social_media_details?.[0]?.followers_count))}
                                                    </div>
                                                    // ))
                                                }

                                            </div >

                                        </TableCell>


                                        <TableCell sx={{
                                            padding: '5px',
                                            border: "0px solid transparent",
                                            borderTopRightRadius: "10px",
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'start',
                                            justifyContent: "start",
                                            borderBottomRightRadius: "10px",
                                            height: "50px",
                                            paddingLeft: '15px',
                                            cursor: 'pointer'

                                        }}>
                                            <div onClick={() => { navigate(`/assetDetails?id=${item.id}`) }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", padding: 0, border: "0px solid transparent", backgroundColor: "rgba(226, 11, 24, 1)", width: '32px', height: '32px', borderRadius: '8px' }}>
                                                <VisibilityOutlined sx={{ color: '#FFF' }} />
                                            </div>
                                        </TableCell>


                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>
            </>

        )
    }
    else { return <></> }
}

export default Eventscreentable
