import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, InputAdornment, MenuItem, Paper, Select, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Table, FormControl, InputLabel } from '@mui/material';
import { DeleteIcon, EditIconn, NoDataImage, SearchNormal } from '../../assets';
import { KeyboardArrowDownOutlined, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUpOutlined } from '@mui/icons-material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useLocation } from 'react-router-dom';

const ReusableTable = ({ tableData, setTableData, headers, columns, handleChange, search, sortingColumn }) => {

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredRow, setHoveredRow] = useState(null);
    const location = useLocation()
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        const sortedData = [...tableData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setTableData(sortedData);
    };
    useEffect(() => {
        if (sortingColumn) {
            handleSort(headers[sortingColumn || 0]?.toLowerCase().replace(/ /g, ''))
        }
    }, [])
    const handleMouseLeave = () => { }
    const headStyles = {
        fontFamily: 'Inter',
        fontSize: '12px',
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
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });


    return (
        <>
            <TableContainer style={{ borderStyle: 'none', boxShadow: "none" }}>
                <Table style={{ borderStyle: 'none' }}>

                    <TableHead style={{ backgroundColor: 'rgba(240, 239, 239, 0.6)', padding: '10px', paddingTop: '5px', paddingBottom: '5px' }}>
                        <TableRow>
                            {headers.map((header, index) => {
                                return (
                                    <TableCell
                                        key={index}
                                        style={{
                                            ...headStyles,
                                            letterSpacing: '-0.3333333432674408px',
                                            textAlign: 'left',
                                            borderStyle: 'none',
                                            justifyContent: 'center',
                                            marginLeft: 0,
                                            paddingLeft: '18px',
                                            textTransform: 'capitalize',
                                            borderTopRightRadius: index === headers.length - 1 ? "3px" : "0px",
                                            borderTopLeftRadius: index === 0 ? "3px" : "0px",
                                            backgroundColor: '#EFEFEF',
                                            color: '#111',
                                            fontFamily: 'Inter',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: 'normal',
                                            borderRight: index !== headers.length - 1 ? '1px solid #E0E0E0' : 'none',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => {
                                            // if (header?.toLowerCase() !== "view" && header?.toLowerCase() !== "action" && header?.toLowerCase() !== "actions") { handleSort(header?.toLowerCase().replace(/ /g, '')) }
                                            const headerKey = header?.toLowerCase().replace(/ /g, '');
                                            if (
                                                location.pathname == "/alert_notification") {
                                                if (header?.toLowerCase() == "event" || header?.toLowerCase() == "feature") {
                                                    handleSort(headerKey);
                                                }
                                            } else if (!["view", "action", "actions"].includes(headerKey)) {
                                                handleSort(headerKey);
                                            }
                                        }}
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
                                            }}
                                        >
                                            {header}
                                            {/* {(index >= 0 && header?.toLowerCase() !== "view" && header?.toLowerCase() !== "action" && header?.toLowerCase() !== "actions") && (
                                                sortConfig?.key?.toLowerCase() === header?.toLowerCase().replace(/ /g, '') ? (
                                                    sortConfig.direction === 'asc' ?
                                                        <KeyboardArrowUpOutlined style={{ marginLeft: '8px' }} /> :
                                                        <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                                                ) : (
                                                    <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                                )
                                            )} */}

                                            {(location.pathname == "/alert_notification") ? ((header?.toLowerCase() == "event" || header?.toLowerCase() == "feature") ? (
                                                sortConfig?.key?.toLowerCase() === header?.toLowerCase().replace(/ /g, '') ? (
                                                    sortConfig.direction === 'asc' ? (
                                                        <KeyboardArrowUpOutlined style={{ marginLeft: '8px' }} />
                                                    ) : (
                                                        <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                                                    )
                                                ) : (
                                                    <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                                )) : (<></>)
                                            ) : (
                                                !["view", "action", "actions"].includes(header?.toLowerCase()) && (
                                                    sortConfig?.key?.toLowerCase() === header?.toLowerCase().replace(/ /g, '') ? (
                                                        sortConfig.direction === 'asc' ? (
                                                            <KeyboardArrowUpOutlined style={{ marginLeft: '8px' }} />
                                                        ) : (
                                                            <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                                                        )
                                                    ) : (
                                                        <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                                    )
                                                )
                                            )}

                                        </div>
                                    </TableCell>
                                )
                            }
                            )}
                        </TableRow>
                    </TableHead>



                    <TableBody>
                        {paginatedData
                            ?.filter((item) => {
                                const searchTerm = search?.toLowerCase() || '';
                                return Object.values(item).some((value) =>
                                    value?.toString()?.toLowerCase()?.includes(searchTerm)
                                );
                            })
                            ?.map((item, index) => (
                                <TableRow
                                    key={index}
                                    // onDoubleClick={() => { onRowDoubleClick(item) }}
                                    onMouseEnter={() => setHoveredRow(index)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        background: hoveredRow === index ? '#F7F9FF' : index % 2 === 1 ? "rgba(249, 248, 248, 0.5)" : 'transparent',
                                        height: "30px",
                                        border: "0px solid transparent",
                                        fontSize: "14px",
                                        lineHeight: "21px",
                                        fontFamily: 'Inter',
                                        fontWeight: "500"
                                    }}
                                >


                                    {columns.map((col, colIndex) => (
                                        <TableCell key={colIndex} style={{
                                            ...col.cellStyle, border: "0px solid transparent",
                                        }}>
                                            {col.render ? col.render(item[col.field], item, handleChange) : item[col.field]}
                                        </TableCell>
                                    ))}

                                </TableRow>
                            ))}


                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#FFF', border: "0px solid #000", borderTop: "1px solid rgba(224, 224, 224, 1)", borderBottom: "1px solid rgba(224, 224, 224, 1)", marginTop: "10px" }}>
                <p style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    lineHeight: "21px",
                    fontStyle: 'normal',
                    fontWeight: '400',
                }}>{itemsPerPage * (currentPage - 1) + 1} to {Math.min(itemsPerPage * currentPage, tableData.length)} of {tableData.length} items</p>
                <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-evenly', alignItems: "center", gap: "10px" }}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => { setCurrentPage(currentPage - 1) }}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: '6px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center",
                            backgroundColor: '#FFF',
                            color: 'grey',
                            cursor: "pointer",
                            border: "1px solid rgba(243, 243, 243, 1)",
                        }}
                    >
                        <KeyboardArrowLeft />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: '6px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: "center",
                                cursor: "pointer",
                                backgroundColor: '#FFF',
                                color: currentPage === index + 1 ? '#000' : 'grey',
                                border: "0px solid #000"
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => { setCurrentPage(currentPage + 1) }}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: '6px',
                            backgroundColor: '#FFF',
                            color: 'grey',
                            display: 'flex',
                            cursor: "pointer",
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center",
                            border: "1px solid rgba(243, 243, 243, 1)"
                        }}
                    >
                        <KeyboardArrowRight />
                    </button>
                    <Select
                        style={{
                            display: 'flex',
                            border: "0.5px solid rgba(243, 243, 243, 1)",
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '70px',
                            height: '30px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: 'grey',
                            // paddingLeft: "10px"
                        }}
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {[5, 10, 20].map((option, index) => (
                            <MenuItem
                                key={index}
                                value={option}
                                style={{
                                    // backgroundColor: 'rgba(243, 243, 243, 1)', // Background color of options
                                    color: 'black' // Text color of options
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>



        </>

    )
}

export default ReusableTable
