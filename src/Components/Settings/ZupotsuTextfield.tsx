// ZupotsuTextfield.tsx
import React, { memo, useState } from 'react';
import { TextField, InputAdornment, Typography, Box } from '@mui/material';
// import { NumericFormat, NumericFormatProps } from 'react-number-format';
// import ZupotsuTooltip from 'libs/component-lib/src/lib/Atoms/zupotsu-tooltip/zupotsu-tooltip'; // Ensure correct path
import ZupotsuTooltip from '../../Atoms/zupotsu-tooltip/zupotsu-tooltip';
import { infoCircle } from '../../assets';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export interface ZupotsuTextfieldProps {
  title: string;
  placeholder: string;
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  type?: string;
  name?: string;
  multiline?: boolean;
  rows?: any;
  trailingIcon?: any;
  toolTipMessage?: string;
  bracketText?: any;
  trailImageHeight?: string;
  trailImageWidth?: string;
  handleChange?: (e: any) => void;
  previewMode?: boolean;
  description?: string;
  currencyFormat?: boolean;
  maxLength?: number;
  hideLabel?: any;
  isPassword?: any;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

// const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
//   function NumericFormatCustom(props, ref) {
//     const { onChange, ...other } = props;

//     return (
// <NumericFormat
//   {...other}
//   getInputRef={ref}
//   onValueChange={(values) => {
//     onChange({
//       target: {
//         name: props.name,
//         value: values.value,
//       },
//     });
//   }}
//   thousandSeparator
//   valueIsNumericString
// />
//     );
//   }
// );

const ZupotsuTextfield: React.FC<ZupotsuTextfieldProps> = ({
  title,
  placeholder,
  value,
  isRequired,
  errorMessage,
  type,
  name,
  multiline,
  rows,
  trailingIcon,
  toolTipMessage,
  bracketText,
  trailImageHeight,
  trailImageWidth,
  handleChange,
  previewMode,
  description,
  currencyFormat = false,
  maxLength,
  hideLabel,
  isPassword
}) => {
  const formatDate = (date: any) => {
    if (date) {
      const d = new Date(date);
      return d.toISOString().substring(0, 10);
    }
    else {
      return ""
    }
  };
  const [isClick, setIsclick] = useState<any>(false)

  return (
    <Box sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%' }}>
      <Typography
        style={{
          marginBottom: '10px',
          color: 'var(--Gray-1, #333)',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontStyle: 'normal',
          lineHeight: '140%',
          display: 'flex',
          flexDirection: 'column',
          fontWeight: '600'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              fontStyle: 'Inter',
              fontWeight: '600',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                lineHeight: "21px",
                fontStyle: 'Inter',
                fontWeight: '700',
              }}
            >{hideLabel ? "" : title}</span>
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
            {bracketText && (
              <span style={{ fontWeight: '400' }}>
                <i>{bracketText}</i>
              </span>
            )}
            <span
              style={{
                paddingLeft: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {toolTipMessage && (
                <ZupotsuTooltip
                  tooltipMessage={toolTipMessage}
                  icon={infoCircle}
                />
              )}
            </span>
          </div>
          {/* {name && maxLength && (type !== "date") && (
            <div
              style={{
                textAlign: 'end',
                fontWeight: 'normal',
                fontSize: '12px',
                margin: '2px 0 0 0',
                color: '#817d7d',
              }}
            >
              {!value ? 0 : value?.length}/{maxLength || 140}
            </div>
          )} */}
        </div>
        {description && (
          <div
            style={{
              color: 'var(--Gray-1, #828282)',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '400',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {description}
          </div>
        )}
      </Typography>

      {/* <TextField
        multiline={multiline || false}
        rows={rows ? rows : 0}
        size="small"
        placeholder={placeholder}
        fullWidth
        value={type === "date" ? formatDate(value) : value}
        disabled={previewMode}
        name={name || ''}
        id="fullWidth"
        type={type=="password"?(!isClick ? "password":"text") : type}
        sx={{
          color: previewMode ? "rgba(0,0,0)" : "#000",
          background: previewMode ? '#F1F1F1' : ''
        }}
        onChange={(e) => handleChange && handleChange(e)}
        onKeyDown={(e) => {
          if (type === "date") {
            e.preventDefault();
          }
        }}
        inputProps={
          (name && maxLength) ? { maxLength: maxLength } : {}
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {type === "password" && (
                <>
                  {!isClick ? (
                    <RemoveRedEyeIcon
                      style={{ fontSize: '18px', cursor: 'pointer' }}
                      onClick={() => setIsclick(!isClick)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ fontSize: '18px', cursor: 'pointer' }}
                      onClick={() => setIsclick(!isClick)}
                    />
                  )}
                </>
              )}
              {trailingIcon && (
                <img
                  src={trailingIcon}
                  alt=""
                  style={{
                    width: trailImageHeight ? trailImageHeight : '',
                    height: trailImageWidth ? trailImageWidth : '',
                  }}
                />
              )}
            </InputAdornment>
          ),
        }}
      /> */}


      <TextField
        multiline={multiline || false}
        rows={rows ? rows : 0}
        size="small"
        placeholder={placeholder}
        fullWidth
        value={type === "date" ? formatDate(value) : value}
        disabled={previewMode}
        name={name || ''}
        id="fullWidth"
        type={type === "password" ? (!isClick ? "password" : "text") : type}
        sx={{
          color: previewMode ? "rgba(0,0,0)" : "#000",
          // background: previewMode ? '#F1F1F1' : '',
          padding:0,
          margin:0,
          // '.css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input':{
          //   height:'auto',
          // }
        }}
        onChange={(e) => {
          if (type !== "tel") {
            handleChange && handleChange(e);
          } else {
            const regex = /^[0-9]*$/;
            if (regex.test(e.target.value)) {
              handleChange && handleChange(e); 
            }
          }
        }}
        onKeyDown={(e) => {
          if (type === "date") {
            e.preventDefault();
          }
        }}
        inputProps={
          (name && maxLength) ? { maxLength: maxLength } : {}
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {type === "password" && (
                <>
                  {isClick ? (
                    <RemoveRedEyeIcon
                      style={{ fontSize: '18px', cursor: 'pointer' }}
                      onClick={() => setIsclick(!isClick)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ fontSize: '18px', cursor: 'pointer' }}
                      onClick={() => setIsclick(!isClick)}
                    />
                  )}
                </>
              )}
              {trailingIcon && (
                <img
                  src={trailingIcon}
                  alt=""
                  style={{
                    width: trailImageHeight ? trailImageHeight : '',
                    height: trailImageWidth ? trailImageWidth : '',
                  }}
                />
              )}
            </InputAdornment>
          ),
        }}
      />


      {errorMessage && (
        <Typography
          style={{
            color: 'red',
            fontSize: '12px',
            marginTop: '4px',
            textAlign:"left"
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default memo(ZupotsuTextfield);
