import {
  Autocomplete,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import './zupotsu-search-bar.css';
import { SearchNormal } from '../../assets';
// import useDeviceType from 'libs/component-lib/src/utils/DeviceType';
import useDeviceType from '../../utils/DeviceType';
import ClearIcon from '@mui/icons-material/Clear';
export interface ZupotsuSearchBarProps {
  value: string;
  placeHolder: string;
  searchIcon: any;
  autoSuggestionData: any;
  handleSearchChange: (value: any) => void;
}

export const ZupotsuSearchBar = ({
  value,
  placeHolder,
  searchIcon,
  autoSuggestionData,
  handleSearchChange,
}: ZupotsuSearchBarProps) => {
  const deviceType = useDeviceType();
  const clearInput = () => {
    handleSearchChange('');
  };
  return (
    <div style={{ width: deviceType === 'mobile' ? '' : '387px', display: 'flex', alignItems: "center", flexDirection: "row", justifyContent: 'flex-end', }} >
      {/* <TextField
        placeholder={placeHolder || 'Search...'}
        size="small"
        variant="standard"
        value={value}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src={searchIcon || searchNormal}
                alt="Search"
                style={{
                  paddingBottom: '5px',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              />
            </InputAdornment>
          ),
          disableUnderline: true,

          style: {
            padding: '8px 20px',
            background: 'var(--Gray-6, #F2F2F2)',
            borderRadius: '5px',
            border: '2px solid transparent',
            color: 'var(--Gray-3, #00000)',
            fontFamily: 'Inter',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: 'normal',
          },
        }}
        inputProps={{
          sx: {
            '&::placeholder': {
              color: 'var(--Gray-3, #828282)',
              opacity: 1, // otherwise firefox shows a lighter color
            },
          },
        }}
      /> */}
      <Autocomplete
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: 'flex-end',
          '& .MuiDialogContent-root': {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'flex-end',
          },
          '& .MuiDialogActions-root': {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'flex-end',
          }
        }}
        freeSolo
        id="free-solo-2-demo"
        value={value || ""}
        disableClearable
        options={autoSuggestionData
          ?.filter((option: any) => option?.title)
          .map((option: any) => option.title)}
        // onChange={handleSearchChange}
        onChange={(event, newValue: any) => {
          if (typeof newValue === 'string') {
            handleSearchChange(newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            handleSearchChange(newValue.inputValue);
          } else {
            handleSearchChange(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="standard"
            value={value}
            onChange={(e) => handleSearchChange(e.target.value)}
            // onChange={handleSearchChange}
            placeholder={placeHolder || 'Search...'}
            InputProps={{
              ...params.InputProps,
              // type: 'search',
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={searchIcon || SearchNormal}
                    alt="Search"
                    style={{
                      paddingBottom: '5px',
                      marginRight: '10px',
                      cursor: 'pointer',
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: value && (
                <InputAdornment position="end">
                  <IconButton onClick={clearInput}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true,
              style: {
                padding: '8px 6px 8px 20px',
                background: 'var(--Gray-6, #F2F2F2)',
                borderRadius: '5px',
                border: '3px solid transparent',
                color: 'var(--Gray-3, #00000)',
                fontFamily: 'Inter',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal',
                width: "80%",
                height: "45px"
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default ZupotsuSearchBar;
