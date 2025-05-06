// ZupotsuTextfield.tsx
import React, { memo } from 'react';
import { TextField, InputAdornment, Typography } from '@mui/material';
// import { NumericFormat, NumericFormatProps } from 'react-number-format';
// import ZupotsuTooltip from 'libs/component-lib/src/lib/Atoms/zupotsu-tooltip/zupotsu-tooltip'; // Ensure correct path
// import { infoCircle } from 'libs/component-lib/src/Assets';
import { infoCircle } from '../../../assets';
import ZupotsuTooltip from '../../../Atoms/zupotsu-tooltip/zupotsu-tooltip';

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
//       <></>
//     );
//   }
// );

const ZupotsuCustomTextfield: React.FC<ZupotsuTextfieldProps> = ({
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
}) => {
  return (
    <>
      <Typography
        style={{
          marginBottom: '10px',
          color: 'var(--Gray-1, #333)',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '140%',
          display: 'flex',
          flexDirection: 'column',
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
            }}
          >
            <span>{title}</span>
            {isRequired && (
              <span
                style={{
                  color: 'var(--Zupotso-Primary, #E20B18)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '140%',
                }}
              >
                *
              </span>
            )}
            {/* {bracketText && (
              <span style={{ fontWeight: '400' }}>
                <i>{bracketText}</i>
              </span>
            )} */}
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
          {/* {name && (
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
        {/* {description && (
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
        )} */}
      </Typography>

      <TextField
        multiline={multiline || false}
        rows={rows ? rows : 0}
        size="small"
        placeholder={placeholder}
        fullWidth
        value={value}
        disabled={previewMode}
        name={name || ''}
        id="fullWidth"
        type={type || 'text'}
        onChange={(e) => handleChange && handleChange(e)}
        // inputProps={
        //   name ? { maxLength: maxLength || 140 } : {}
        // }
        InputProps={{
          // inputComponent: currencyFormat ? (NumericFormatCustom as any) : undefined,
          endAdornment: (
            <InputAdornment position="end">
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
      {/* {errorMessage && (
        <Typography
          style={{
            color: 'red',
            fontSize: '12px',
            marginTop: '4px',
          }}
        >
          {errorMessage}
        </Typography>
      )} */}
    </>
  );
};

export default memo(ZupotsuCustomTextfield);
