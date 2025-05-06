import * as React from 'react';
import TextField from '@mui/material/TextField';
// import { DateRangePicker as MuiDateRangePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { styled } from '@mui/system';
// import { CalenderAdmin } from 'libs/component-lib/src/Assets';
import { useEffect } from 'react';
import Close from '@mui/icons-material/Close';
import { CalenderAdmin } from '../../assets';

export interface DateRangePickerProps {
  value: Array<any | Date | number | string>;
  onChangeFunc?: (selectedValues: string[]) => void;
  showToolbar?: boolean;
  startText?: string;
  endText?: string;
  disablePast?: boolean;
  open?: boolean;
  maxDate? : Date;
  isDateRangePickerOpen?: (isOpen: boolean) => void;
}

const StyledNoBorderInput = styled('div')(({}) => {
    return {
      '& .MuiOutlinedInput-notchedOutline': {
        'border': 'none',
        'outline': 'none',
      },
      '&':{
        // width:'100%', 
        display:'flex', 
        flexDirection: 'row',
        'border': '1px solid  #E0E0E0',
        'border-radius': '5px',
        'align-items': 'center',
        'padding': '0 12px',
        'cursor': 'pointer',
        'height': '48px'
      },
      '&:hover':{
        'border': '1px solid  #000',
      },
      '& .MuiInputBase-input':{
        'border': 'none',
        'outline': 'none',
        // 'height': '1.4375em',
        'font-size':'inherit',
        // 'width': '90px',
        'padding':'8.5px 4px 8.5px 0px',
        'color': '#333',
        '-webkit-text-fill-color': '#333 !important',
        'cursor': 'pointer !important',
        'pointer-events': 'auto',
        'caret-color': 'transparent'
      },
    };
});

export function DateRangePicker(props: DateRangePickerProps) {

  const [values, setValue]: [any, any] = React.useState(
    props.value || [null, null]
  );
  const [openPicker, setOpenPicker] = React.useState<boolean>(props?.open || false);

  useEffect(() => {
    setValue(props.value || [null, null]);
  }, [props.value]);

  const handleChangeValue = (val: any[]) => {
    setValue(val);
    props.onChangeFunc?.(val);
    if(val.every(v=> v))
    setOpenPicker(false);
  };

  const showCloseIcon = React.useMemo(()=> !Boolean(values.every((val:any) => !val)),[values]);
  const textValue = React.useMemo(()=> {
    let dateStr = '';
    if(values?.length > 0){
      if(values?.[0]) dateStr += new Date(values[0]).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      if(values?.[1]) dateStr += '- '+ new Date(values[1]).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
    return dateStr;
  },[values]);

  useEffect(() => {
    setOpenPicker(props?.open || false);
  }, [props?.open]);

  useEffect(()=>{
    props?.isDateRangePickerOpen && props?.isDateRangePickerOpen(openPicker)
  },[openPicker]);

  const toggleDatePickerCalender = () =>{
    setOpenPicker(prev => {return !prev});
  };

  return (
    <>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiDateRangePicker
            open={openPicker}
            startText={props.startText}
            endText={props.endText}
            value={values}
            showToolbar={props.showToolbar}
            disablePast={props.disablePast}
            onChange={handleChangeValue}
            maxDate={props.maxDate || null} renderInput={()=>
              <StyledNoBorderInput onClick={toggleDatePickerCalender} >
                <TextField fullWidth placeholder='Date' label='' value={textValue} aria-readonly></TextField>
                {showCloseIcon ?
                  <Close  width={16} height={16} onClick={()=>handleChangeValue([null, null])} style={{
                    cursor: 'pointer',
                    color: '#111'
                   }}/> : 
                   <img src={CalenderAdmin} width={16} height={16}/>}
              </StyledNoBorderInput>
            }  
          />
      </LocalizationProvider> */}
    </>
   
  );
}

export default React.memo(DateRangePicker);
