import {
  Autocomplete,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import './zupotsu-multiselect.css';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ZupotsuTooltip from '../zupotsu-tooltip/zupotsu-tooltip';
import { infoCircle } from '../../assets';

export interface ZupotsuMultiSelectProps {
  title: string;
  placeholder: string;
  dropdownData: string[];
  value: any;
  name?: any;
  info?: any;
  isRequired?: boolean;
  handleChange?: (selectedValues: any) => void;
  previewMode?: boolean;
  toolTipMessage?:any
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ZupotsuMultiSelect = ({
  title,
  dropdownData,
  value,
  name,
  placeholder,
  info,
  isRequired,
  handleChange,
  previewMode,
  toolTipMessage
}: ZupotsuMultiSelectProps) => {
  const handleAutocompleteChange = (event: any, selectedOptions: any[]) => {
    handleChange &&
      handleChange(selectedOptions); // Pass selected values to parent component
  };

  return (
    <div style={{width:'100%'}}>
      <Typography
        style={{
          marginBottom: title ? '10px' : '',
          color: 'var(--Gray-1, #333)',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: "21px",
          fontStyle: 'Inter',
          alignSelf:'flex-start',
          display:'flex',
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
      </Typography>
      <Autocomplete
        className="autocomplete-pointer" 
        size="small"
        fullWidth
        multiple
        limitTags={1}
        id="multiple-limit-tags"
        disabled={previewMode}
        options={dropdownData || []}
        disableCloseOnSelect
        getOptionLabel={(option: any) => option}
        value={value || []}
        defaultValue={[]}
        onChange={(e, selectedOptions) =>
          handleAutocompleteChange(e, selectedOptions)
        }
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField
          sx={{ 
            cursor: 'pointer', 
            '& .MuiInputBase-root': {
              cursor: 'pointer'
            }
          }} 
            {...params}
            name={name}
            
            label=""
            placeholder={value?.length > 0 ? '' : placeholder}
          />
        )}
        sx={{ 
          cursor: 'pointer',
          '& .MuiAutocomplete-inputRoot': {
            cursor: 'pointer'
          },
          '& .MuiAutocomplete-clearIndicator': {
            cursor: 'pointer'
          },
          '& .MuiAutocomplete-popupIndicator': {
            cursor: 'pointer'
          }
        }}       />
    </div>
  );
};

export default ZupotsuMultiSelect;
