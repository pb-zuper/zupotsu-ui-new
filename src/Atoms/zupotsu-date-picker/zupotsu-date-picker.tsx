import './zupotsu-date-picker.css';
import * as React from 'react';
import Calendar from '@mui/icons-material/Event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';



export interface ZupotsuDatePickerProps {
  label?: string;
  // selectedDate: any;
  name?: any;
  value?: any;
  handleDateSelection: (event: any) => void;
  previewMode?: any;
  isRequired?: boolean;
  minDate?: any;
  maxDate?: any;
}

const ZupotsuDatePicker = ({
  label,
  value,
  name,
  handleDateSelection,
  previewMode,
  isRequired,
  minDate,
  maxDate
}: ZupotsuDatePickerProps) => {
  React.useEffect(() => {

    var elementToRemove = document.querySelector(
      'div[style="position: absolute; pointer-events: none; color: rgba(130, 130, 130, 0.62); z-index: 100000; width: 100%; text-align: center; bottom: 50%; right: 0px; letter-spacing: 5px; font-size: 24px;"]'
    );

    if (elementToRemove) {
      elementToRemove.remove();
    } else {
    }
  });

  const today = new Date().toISOString().slice(0, 10);

  const minDateValidator = (value: string) => {
    const selectedDate = value.slice(0, 10);
    return selectedDate >= today;
  };
  return (
    <div>
      {(label) && <Typography
        style={{
          color: 'var(--Gray-1, #333)',
          fontFamily: 'Inter',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: "21px",
          fontStyle: 'Inter',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div>
          {label}
          {isRequired && (
            <span
              style={{
                color: 'var(--Zupotso-Primary, #E20B18)',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '140%',
              }}
            >
              *
            </span>
          )}
        </div>
      </Typography>}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['SingleInputDateRangeField']}>
          <DateRangePicker
            name={name}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(e: any) =>
              handleDateSelection({ target: { name, value: e } })
            }
            slots={{ field: SingleInputDateRangeField }}
            slotProps={{
              textField: {
                InputProps: {
                  endAdornment: <Calendar style={{ cursor: 'pointer' }} />,
                  size: 'small',
                },
              },
            }}
            disabled={previewMode}
          />

        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default ZupotsuDatePicker;
