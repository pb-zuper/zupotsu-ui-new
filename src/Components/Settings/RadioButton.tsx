import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Typography } from '@mui/material';

interface RadioButtonsGroupProps {
  selectedValue: string;
  title: string;
  isRequired: boolean;
  options: { label: string, value: string }[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtonsGroup: React.FC<RadioButtonsGroupProps> = ({ selectedValue, title, isRequired, options, handleChange }) => {
  return (
    <FormControl>
      <Typography
        style={{
          marginBottom: '10px',
          color: 'var(--Gray-1, #333)',
          fontFamily: 'Inter',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '700',
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
        </div>
      </Typography>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        value={selectedValue}
        name={title}
        onChange={handleChange}
        row
      >
        {options?.map(option => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
