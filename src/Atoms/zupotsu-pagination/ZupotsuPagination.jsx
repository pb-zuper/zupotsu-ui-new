import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { KeyboardArrowDownOutlined, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUpOutlined } from '@mui/icons-material';
const ZupotsuPagination = ({ currentPage, totalPages, itemsPerPage, setCurrentPage, setItemsPerPage, totalItems }) => {
    return (
        <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#FFF', border: "0px solid #000", borderTop: "1px solid rgba(224, 224, 224, 1)", borderBottom: "1px solid rgba(224, 224, 224, 1)", marginTop: "10px" }}>
            <p style={{
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: "21px",
                fontStyle: 'normal',
                fontWeight: '400',
            }}>{itemsPerPage * (currentPage - 1) + 1} to {itemsPerPage * (currentPage - 1) + itemsPerPage} of {totalItems} items  </p>
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
                        border: "0.5px solid rgba(243, 243, 243, 1)",
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
                        border: "0.5px solid rgba(243, 243, 243, 1)"
                    }}
                >
                    <KeyboardArrowRight />
                </button>
                {/* <Select
                    id="items-per-page"
                    style={{
                        display: "flex",
                        border: "0.5px solid rgba(243, 243, 243, 1)",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "60px",
                        height: "30px",
                        borderRadius: '6px',
                        fontSize: '10px',
                    }}
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(e.target.value);
                    }}
                >
                    {[5, 10, 20].map((option, index) => (
                        <MenuItem sx={{zIndex:5}} key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select> */}
                <select
                    style={{
                        display: 'flex',
                        border: '0.5px solid rgba(243, 243, 243, 1)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        height: '30px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        color: 'grey',
                        paddingLeft: "10px"
                    }}
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                >
                    {[5, 10, 20].map((option, index) => (
                        <option
                            key={index}
                            value={option}
                            style={{
                                backgroundColor: 'rgba(243, 243, 243, 1)', // Background color of options
                                color: 'black' // Text color of options
                            }}
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ZupotsuPagination;
