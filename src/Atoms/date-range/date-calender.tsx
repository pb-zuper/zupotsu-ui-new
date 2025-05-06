// import { DateCalendar } from "@mui/x-date-pickers";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from "react";
import { Typography } from "@mui/material";

export function DateCalender(){
    const [currentMonth, setCurrentMonth] = useState<string>('February');
    const [currentYear, setCurrentYear] = useState<string>('2024');
    return (
        <div>
            <div style={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{
                    display:'flex',
                    flexDirection: 'row',
                    gap: '15px'
                }}>
                    <ArrowBackIosNewIcon style={{color:'#707070'}}></ArrowBackIosNewIcon>
                    <Typography
                        sx={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '16.94px',
                            textAlign: 'center',
                            color: '#000'
                        }}
                    >
                        {currentMonth}
                    </Typography>
                    <ArrowForwardIosIcon style={{color:'#707070'}}></ArrowForwardIosIcon>
                </div>
                
            </div>
            {/* <DateCalendar/> */}
        </div>
    );
};
export default DateCalender;