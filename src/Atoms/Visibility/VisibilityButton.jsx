import React, { useState } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

const VisibilityButton = ({ onVisibility }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
    if (onVisibility) onVisibility();
  };

  return (
    <button onClick={handleVisibilityToggle} style={{ width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000" }}>
      {isVisible ? <VisibilityOffOutlined sx={{color:'#FFF'}} /> : <VisibilityOutlined sx={{color:'#FFF'}} />}
    </button>
  );
};

export default VisibilityButton;
