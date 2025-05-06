import React, { useEffect, useRef, useState } from "react";
import './month.css';
import { styled } from "@material-ui/core";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
const MultiPicker = ({
    // value,
    // preview,
    // name,
    // placeholder,
    // handleInputChange,
    // is_mandatory
}) => {
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [anchor, setAnchor] = React.useState(null);
    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };
    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;
    const minDate = new Date(2023, 2);
    const months = [
        { shortName: "Jan", value: "01" },
        { shortName: "Feb", value: "02" },
        { shortName: "Mar", value: "03" },
        { shortName: "Apr", value: "04" },
        { shortName: "May", value: "05" },
        { shortName: "Jun", value: "06" },
        { shortName: "Jul", value: "07" },
        { shortName: "Aug", value: "08" },
        { shortName: "Sep", value: "09" },
        { shortName: "Oct", value: "10" },
        { shortName: "Nov", value: "11" },
        { shortName: "Dec", value: "12" },
    ];

    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };
    const handleMonthSelect = (monthValue) => {
        const selectedMonth = `${monthValue}/${year}`;
        setSelectedMonths((prev) => {
            if (prev.includes(selectedMonth)) {
                return prev.filter((m) => m !== selectedMonth);
            } else {
                return [...prev, selectedMonth];
            }
        });
    };

    const handleYearChange = (offset) => {
        setYear(year + offset);
    };

    const isMonthBeforeMinDate = (monthValue) => {
        const selectedDate = new Date(year, parseInt(monthValue) - 1);
        return selectedDate < minDate;
    };
    
    return (
        <div style={{ padding: 0, margin: 0, marginTop: "10px", width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
            <input
                type="text"
                value={selectedMonths.join(", ")}
                onClick={togglePopover}
                readOnly
                style={{
                    width: '100%',
                    height: "40px",
                    boxSizing: 'border-box',
                    border: '1px solid rgba(0,0,0,0.4)',
                    display: 'block',
                    borderRadius: '4px',
                    paddingLeft: '10px',
                    marginTop: "100px",
                    fontFamily: "Inter"
                }}
                onFocus={(e) => { e.target.style.border = '2px solid red'; handleClick(e); }}
                onBlur={(e) => e.target.style.border = '1px solid rgba(0,0,0,0.4)'}
                className="custom-input"
            />

            <BasePopup id={id} open={open} anchor={anchor}>
                <PopupBody >
                    <div className="popover">
                        <div className="popover-header">
                            <button onClick={() => handleYearChange(-1)} style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: '5px' }}>{"<"}</button>
                            <span>{year}</span>
                            <button onClick={() => handleYearChange(1)} style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: '5px' }}>{">"}</button>
                        </div>
                        <div className="popover-body">
                            {months.map((month) => (
                                <button
                                    key={month.value}
                                    onClick={() => !isMonthBeforeMinDate(month.value) && handleMonthSelect(month.value)}
                                    className={`month-btn ${selectedMonths.includes(`${month.value}/${year}`) ? "selected" : ""}`}
                                    disabled={isMonthBeforeMinDate(month.value)}
                                >
                                    {month.shortName}
                                </button>
                            ))}
                        </div>
                    </div>
                </PopupBody>
            </BasePopup>
        </div>
    );
};

export default MultiPicker;


const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const PopupBody = styled('div')(
    ({ theme }) => `
    width: 250px;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: ${theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
        };
    font-family: 'Inter';
    font-weight: 500;
    font-size: 0.875rem;
    z-index: 1;
  `,
);

