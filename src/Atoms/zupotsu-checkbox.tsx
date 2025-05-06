import React, { useState, useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';

// Define a type for the dropdown data items
interface DropdownData {
  id: string;
  label: string;
}

// Define the props for the CheckboxList component
interface CheckboxListProps {
  data: DropdownData[];
  label: string;
  checked:any;
  handleInputChange: (checkedValues: string[]) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ data, label,checked, handleInputChange }) => {
  const [checkedValues, setCheckedValues] = useState<string[]>(checked?checked:[]);

  const handleInputChange2 = useCallback((e: React.ChangeEvent<HTMLInputElement>, d: DropdownData) => {
    const value = d.label;

    setCheckedValues((prevCheckedValues) => {
      let newCheckedValues: string[];
      if (e.target.checked) {
        // Add to checked values if not already included
        newCheckedValues = [...prevCheckedValues, value];
      } else {
        // Remove from checked values if present
        newCheckedValues = prevCheckedValues.filter((item) => item !== value);
      }
      
      handleInputChange(newCheckedValues);  // Call the parent function to handle the changes
      return newCheckedValues;
    });
  }, [handleInputChange]);



  return (
    <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
      {data.map((val, subIndex) => (
        <div
          key={subIndex}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '8px 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Checkbox
              checked={checkedValues.includes(val.label)}
              onChange={(e) => handleInputChange2(e, val)}
              name={val.label}
              color="primary"
              sx={{ borderRadius: '5px' }}
            />
            <label style={{ marginLeft: '8px', fontFamily: 'Inter', fontSize: '14px' }}>
              {val.label}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;