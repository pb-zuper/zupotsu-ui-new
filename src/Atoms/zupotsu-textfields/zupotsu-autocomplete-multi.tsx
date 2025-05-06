// import {
//   Autocomplete,
//   Button,
//   InputAdornment,
//   TextField,
//   Tooltip,
//   Typography,
// } from '@mui/material';
// import './zupotsu-textfields.css';
// // import { addCircle, infoCircle } from 'libs/component-lib/src/Assets';
// import { infoCircle } from '../../assets';
// import ZupotsuTooltip from '../zupotsu-tooltip/zupotsu-tooltip';
// // import { createStyles, makeStyles } from '@material-ui/core';
// import { memo, useEffect, useMemo, useState } from 'react';
// import ZupotsuTextfields from './zupotsu-textfields';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// export interface ZupotsuAutoCompleteProps {
//   title: string;
//   placeholder: string;
//   value?: string;
//   isRequired?: boolean;
//   errorMessage?: string;
//   type?: string;
//   name?: string;
//   multiline?: boolean;
//   rows?: any;
//   trailingIcon?: any;
//   toolTipMessage?: string;
//   bracketText?: any;
//   handleChange?: (e: any) => void;
//   previewMode?: boolean;
//   dropdownData: string[];
//   freeSolo: boolean;
//   onChangefun?:any
// }

// const AutoTextfield = ({
//   title,
//   placeholder,
//   value,
//   isRequired,
//   errorMessage,
//   type,
//   name,
//   multiline,
//   rows,
//   trailingIcon,
//   toolTipMessage,
//   bracketText,
//   handleChange,
//   previewMode,
//   ...param
// }: any) => {
//   return (
//     <>
//       <Typography
//         style={{
//           marginBottom: '10px',
//           color: 'var(--Gray-1, #333)',
//           fontFamily: 'Inter',
//           fontSize: '16px',
//           fontStyle: 'normal',
//           fontWeight: '600',
//           lineHeight: '140%',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '10px',
//         }}
//       >
//         <div style={{
//           fontSize: '14px',
//           fontStyle: 'normal',
//           fontWeight: '600',
//         }}>
//           {title}
//           {isRequired && (
//             <span
//               style={{
//                 color: 'var(--Zupotso-Primary, #E20B18)',
//                 fontFamily: 'Inter',
//                 fontSize: '16px',
//                 fontStyle: 'normal',
//                 fontWeight: '700',
//                 lineHeight: '140%',
//               }}
//             >
//               *
//             </span>
//           )}
//           {bracketText && (
//             <span style={{ fontWeight: '400' }}>
//               <i>{bracketText}</i>
//             </span>
//           )}
//         </div>

//         {toolTipMessage && (
//           <ZupotsuTooltip tooltipMessage={toolTipMessage} icon={infoCircle} />
//         )}
//       </Typography>

//       <TextField
//         multiline={multiline || false}
//         rows={rows ? rows : 0}
//         placeholder={placeholder}
//         fullWidth
//         name={name || ''}
//         id="fullWidth"
//         type={type || 'text'}
//         {...param}
//         InputProps={{
//           ...param.InputProps,
//           // classes: { input: classes.input },
//           endAdornment: (
//             <InputAdornment position="end">
//               <KeyboardArrowDownIcon
//                 sx={{
//                   cursor: 'pointer',
//                   color: '#828282',
//                   pointerEvents: 'none',
//                   position: 'absolute',
//                   right: '10px',
//                 }}
//               />
//             </InputAdornment>
//           ),
//         }}
//         size="small"
//         disabled={previewMode}
//       // value={value}
//       />
//       {errorMessage && (
//         <Typography
//           style={{
//             color: 'red',
//             fontSize: '12px',
//             marginTop: '4px',
//           }}
//         >
//           {errorMessage}
//         </Typography>
//       )}
//     </>
//   );
// };

// export const ZupotsuAutoCompleteMulti = ({
//   title,
//   placeholder,
//   value: parentInput,
//   isRequired,
//   errorMessage,
//   type,
//   name,
//   multiline,
//   rows,
//   trailingIcon,
//   toolTipMessage,
//   bracketText,
//   handleChange,
//   previewMode,
//   dropdownData,
//   freeSolo,
//   onChangefun,
// }: ZupotsuAutoCompleteProps) => {
//   const [value, setValue] = useState<string | null>(parentInput || '');

//   useEffect(() => {
//     if (undefined !== parentInput && parentInput !== value) {
//       setValue(parentInput);
//     }
//   }, [parentInput]);

//   const dropdown = useMemo(() => {
//     return Array.isArray(dropdownData) ? dropdownData : [];
//   }, [dropdownData]);

//   return (
//     <Autocomplete
//       fullWidth
//       id={name}
//       freeSolo={freeSolo}
//       value={value || ''}
//       options={dropdown}
//       disabled={previewMode}
//       onChange={(event: any, newValue: string | null) => {
//         setValue(newValue);
//         // handleChange?.({ target: { name, value: newValue } });
//         onChangefun?.({ target: { name, value: newValue } });
//       }}
//       inputValue={parentInput}
//       onInputChange={(event: any, newValue: any) => {
//         if (freeSolo) handleChange?.({ target: { name, value: newValue } });
//       }}
//       renderInput={(params) => (
//         <AutoTextfield
//           title={title}
//           placeholder={placeholder}
//           value={value}
//           isRequired={isRequired}
//           errorMessage={errorMessage}
//           type={type}
//           name={name}
//           multiline={multiline}
//           rows={rows}
//           trailingIcon={trailingIcon}
//           toolTipMessage={toolTipMessage}
//           bracketText={bracketText}
//           // handleChange={handleChange}
//           previewMode={previewMode}
//           {...params}
//         />
//       )}
//     />
//   );
// };

// export default memo(ZupotsuAutoCompleteMulti);





import {
  Autocomplete,
  Button,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import './zupotsu-textfields.css';
import { infoCircle } from '../../assets';
import ZupotsuTooltip from '../zupotsu-tooltip/zupotsu-tooltip';
import { memo, useEffect, useMemo, useState } from 'react';
import ZupotsuTextfields from './zupotsu-textfields';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

export interface ZupotsuAutoCompleteProps {
  title: string;
  placeholder: string;
  value?: string[];
  isRequired?: boolean;
  errorMessage?: string;
  type?: string;
  name?: string;
  multiline?: boolean;
  rows?: any;
  trailingIcon?: any;
  toolTipMessage?: string;
  bracketText?: any;
  handleChange?: (e: any) => void;
  previewMode?: boolean;
  dropdownData: string[];
  freeSolo: boolean;
  onChangefun?: (e: any) => void;
}

const AutoTextfield = ({
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
  handleChange,
  previewMode,
  ...param
}: any) => {
  return (
    <>
      <Typography
        style={{
          marginBottom: '10px',
          color: 'var(--Gray-1, #333)',
          fontFamily: 'Inter',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '140%',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: '600',
        }}>
          {title}
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
        </div>

        {toolTipMessage && (
          <ZupotsuTooltip tooltipMessage={toolTipMessage} icon={infoCircle} />
        )}
      </Typography>

      <TextField
        multiline={multiline || false}
        rows={rows ? rows : 0}
        placeholder={placeholder}
        fullWidth
        name={name || ''}
        id="fullWidth"
        type={type || 'text'}
        {...param}
        InputProps={{
          ...param.InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <KeyboardArrowDownIcon
                sx={{
                  cursor: 'pointer',
                  color: '#828282',
                  pointerEvents: 'none',
                  position: 'absolute',
                  right: '10px',
                }}
              />
            </InputAdornment>
          ),
        }}
        size="small"
        disabled={previewMode}
      />
      {errorMessage && (
        <Typography
          style={{
            color: 'red',
            fontSize: '12px',
            marginTop: '4px',
             textAlign:'left'
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export const ZupotsuAutoCompleteMulti = ({
  title,
  placeholder,
  value: parentInput = [],
  isRequired,
  errorMessage,
  type,
  name,
  multiline,
  rows,
  trailingIcon,
  toolTipMessage,
  bracketText,
  handleChange,
  previewMode,
  dropdownData,
  freeSolo,
  onChangefun,
}: ZupotsuAutoCompleteProps) => {
  const [value, setValue] = useState<string[]>(parentInput);

  useEffect(() => {
    if (parentInput && JSON.stringify(parentInput) !== JSON.stringify(value)) {
      setValue(parentInput);
    }
  }, [parentInput]);

  const dropdown = useMemo(() => {
    return Array.isArray(dropdownData) ? dropdownData : [];
  }, [dropdownData]);

  return (
    <Autocomplete
      multiple
      fullWidth
      id={name}
      freeSolo={freeSolo}
      value={value || ""}
      options={dropdown}
      disabled={previewMode}
      onChange={(event: any, newValue: string[]) => {
        // handleChange(newValue);
        handleChange?.(newValue);
        setValue(newValue);
        onChangefun?.({ target: { name, value: newValue } });
      }}
      inputValue={parentInput.join(', ')}
      onInputChange={(event: any, newInputValue: string) => {
        if (freeSolo) handleChange?.({ target: { name, value: newInputValue.split(', ') } });
      }}
      renderInput={(params) => (
        <AutoTextfield
          title={title}
          placeholder={placeholder}
          value={value}
          isRequired={isRequired}
          errorMessage={errorMessage}
          type={type}
          name={name}
          multiline={multiline}
          rows={rows}
          trailingIcon={trailingIcon}
          toolTipMessage={toolTipMessage}
          bracketText={bracketText}
          previewMode={previewMode}
          {...params}
        />
      )}
    />
  );
};

export default memo(ZupotsuAutoCompleteMulti);