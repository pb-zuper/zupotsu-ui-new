
// import React, { useEffect, useState } from "react";
// import DatePicker, { DateObject } from "react-multi-date-picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";
// import './multimonth.css'

// const format = "MMM/YYYY";

// export default function MultiMonthPicker({
//     placeholder,
//     preview,
//     tooltip,
//     name,
//     value,
//     is_mandatory,
//     handleInputChange,
//     minDate = new Date(),
//     maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
// }) {

//     let comingvalue = []

//     const monthMapping = {
//         Jan: 1,
//         Feb: 2,
//         Mar: 3,
//         Apr: 4,
//         May: 5,
//         Jun: 6,
//         Jul: 7,
//         Aug: 8,
//         Sep: 9,
//         Oct: 10,
//         Nov: 11,
//         Dec: 12
//     };



//     const [dates, setDates] = useState([]);
//     const [formattedDates, setFormattedDates] = useState(
//         value || []
//     );

//     useEffect(() => {
//         const newDates = formattedDates?.map(dateString => {
//             const [month, year] = dateString.split('/');
//             return new DateObject().set({ month: monthMapping[month], year: parseInt(year, 10), format });

//         });
//         setDates(newDates);
//         if (value?.length == 0) {
//             setDates([])
//         }
//     }, [formattedDates, format]);


//     const handleDateChange = (newDates) => {
//         setDates(newDates);
//         const formatted = newDates.map(date => date.format(format));
//         setFormattedDates(formatted);
//         handleInputChange(formatted)
//     };

//     return (
//         <div style={{ width: '100%', marginTop: '5px' }}>
//             <DatePicker
//                 onlyMonthPicker={true}
//                 disabled={preview}
//                 value={dates}
//                 onChange={handleDateChange}
//                 multiple
//                 sort
//                 format={format}
//                 minDate={minDate}
//                 maxDate={maxDate}
//                 placeholder={placeholder}
//                 calendarPosition="bottom-center"
//                 plugins={[<DatePanel />]}
//                 style={{
//                     width: '100%',
//                     height: "40px",
//                     boxSizing: 'border-box',
//                     display: 'block',
//                     backgroundColor: preview ? "rgba(0,0,0,0.006)" : "transparent"
//                 }}
//             />

//         </div>
//     );
// }




import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import './multimonth.css'

const format = "MM/YYYY";

export default function MultiMonthPicker({
    placeholder,
    preview,
    tooltip,
    name,
    value,
    is_mandatory,
    handleInputChange,
    minDate = new Date(new Date().setMonth(new Date().getMonth() - 1 )),
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
}) {
    let comingvalue = []
   
    const newDates = value?.map(dateString => new DateObject({ date: dateString, format }));
    
    comingvalue = newDates
    
    const [dates, setDates] = useState(comingvalue || []);
    const [formattedDates, setFormattedDates] = useState(value || []);
    
    useEffect(() => {
        const newDates = formattedDates?.map(dateString => {
            const [month, year] = dateString?.split('/');
            return new DateObject().set({ month: parseInt(month, 10), year: parseInt(year, 10), format });
        });
        setDates(newDates);
    }, [formattedDates, format]);


    const handleDateChange = (newDates) => {
        setDates(newDates);
        const formatted = newDates?.map(date => date.format(format)) || [];
        setFormattedDates(formatted);
        handleInputChange(formatted)
    };

    const handleKeyDown = (event) => {
        event.preventDefault();
    };




    return (
        <div style={{ width: '100%', marginTop: '5px' }}>
            <DatePicker
                onlyMonthPicker={true}
                disabled={preview}
                value={dates}
                onChange={handleDateChange}
                placeholder={"Select Available Months"}
                multiple
                sort
                format={format}
                minDate={minDate}
                maxDate={maxDate}
                calendarPosition="bottom-center"
                plugins={[<DatePanel />]}
                style={{
                    width: '100%',
                    height: "40px",
                    boxSizing: 'border-box',
                    display: 'block',
                }}
                onFocus={(e) => e.target.style.border = '2px solid #E22B16'}
            />
        </div>
    );
}