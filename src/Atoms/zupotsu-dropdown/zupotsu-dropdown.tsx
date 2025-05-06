import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './zupotsu-dropdown.css';
import { useState } from 'react';
import ZupotsuTooltip from '../zupotsu-tooltip/zupotsu-tooltip';
import { infoCircle } from '../../assets';

export interface ZupotsuDropdownProps {
  title: string;
  placeholder: string;
  dropdownData: any;
  value: any;
  name?: any;
  isRequired?: boolean;
  padding?: any;
  isHoverPresentOverPlaceholder?: boolean;
  handleChange?: (e: any) => void;
  previewMode?: boolean;
  staticWidth?: any;
  presentOnDialog?: boolean;
  toolTipMessage?: string;
  item?:any
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  },
};

const ZupotsuDropdown = ({
  title,
  dropdownData,
  value,
  name,
  placeholder,
  isRequired,
  padding,
  toolTipMessage,
  presentOnDialog = false,
  isHoverPresentOverPlaceholder,
  staticWidth,
  handleChange,
  previewMode,
  item
}: ZupotsuDropdownProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    !presentOnDialog && document.body.classList.add('dropdown-open');
  };

  const handleClose = () => {
    setIsOpen(false);
    !presentOnDialog && document.body.classList.remove('dropdown-open');
  };

  return (
    <Box sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%' }}>
      <Typography
        style={{
          marginBottom: title ? '10px' : '',
          color: 'var(--Gray-1, #333)',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: "21px",
          fontStyle: 'Inter',
          textAlign: 'left',
          display: 'flex',
          flexDirection:"row",
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap:'5px'
        }}
      >
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
        
        {toolTipMessage && (
          <ZupotsuTooltip
            tooltipMessage={toolTipMessage}
            icon={infoCircle}
          />
        )}
        {/* {bracketText && (
          <span style={{ fontWeight: '400' }}>
            <i>{bracketText}</i>
          </span>
        )} */}
        {/* <span
          style={{
            paddingLeft: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        > */}

        {/* </span> */}
      </Typography>

      <FormControl fullWidth>
        <Select
          sx={{
            padding: padding || '',
            borderRadius: '5px',
            width: staticWidth ? staticWidth : 'auto',
            textAlign:'left',
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          name={name}
          disabled={previewMode}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            if (!value) {
              return (
                <Typography
                  style={{
                    // color: 'var(--Gray-4, #BDBDBD)',
                    // fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: isHoverPresentOverPlaceholder ? 600 : 500,
                    // lineHeight: '140%' /* 19.6px */,
                    // letterSpacing: '0.14px',
                    textAlign: "left",
                    color: isHovered
                      ? '#333'
                      : isHoverPresentOverPlaceholder
                        ? 'var(--Gray-4, #828282)'
                        : 'rgb(167 167 167)',
                  }}
                >
                  {placeholder}
                </Typography>
              );
            }

            return value;
          }}
          displayEmpty
          inputProps={{
            'aria-label': 'Without label',
          }}
          // label="Age"

          size="small"
          onMouseEnter={() =>
            isHoverPresentOverPlaceholder ? setIsHovered(true) : ''
          }
          onMouseLeave={() =>
            isHoverPresentOverPlaceholder ? setIsHovered(false) : ''
          }
          onChange={(e) => handleChange && handleChange(e)}
          onOpen={handleOpen}
          onClose={handleClose}
          IconComponent={() => (
            <KeyboardArrowDownIcon
              sx={{
                cursor: 'pointer',
                color: isHovered
                  ? '#333'
                  : isHoverPresentOverPlaceholder
                    ? '#828282'
                    : '#333',
                pointerEvents: 'none',
                position: 'absolute',
                right: '10px',
              }}
            />
          )}
        >
          <MenuItem selected value="">
            <span
              style={{
                color: 'var(--Gray-3, #828282)',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '140%',
              }}
            >
              {placeholder}
            </span>
          </MenuItem>
          {dropdownData?.map((data: any) => (
            <MenuItem
              sx={{
                display:'flex',
                flexWrap:'wrap',
                whiteSpace: 'normal',
                width:'100%',
                '&:hover': {
                  background:"pink",
                  color: '#E20B18',
                 
                },
              }}
              key={data}
              value={data}
            >
              {data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ZupotsuDropdown;
