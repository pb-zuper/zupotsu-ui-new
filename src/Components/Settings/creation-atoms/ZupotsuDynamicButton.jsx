import React from 'react';
import { Button } from '@mui/material';

const ZupotsuDynamicButton = ({
    onClick,
    disabled,
    fullWidth = true,
    backgroundColor = 'red',
    color = '#FFF',
    fontFamily = 'Inter',
    fontSize = '14px',
    border = '1px solid #FFF',
    width = '200px',
    height = '45px',
    sx = {},
    text
}) => {
    return (
        <Button
            autoFocus
            onClick={onClick}
            disabled={disabled}
            fullWidth={fullWidth}
            sx={{
                backgroundColor: 
                // disabled ? "#E4E4E4" :
                 backgroundColor,
                color:  "rgba(255,255,255,1)",
                fontFamily,
                fontSize,
                border,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width,
                height,
                ...sx,
                '&:hover': {
                    backgroundColor: "rgba(255,0,0,0.7)"
                }
            }}
        >
            <span style={{ color: disabled ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,1)", }}>{text}</span>
        </Button>
    );
};

export default ZupotsuDynamicButton;
