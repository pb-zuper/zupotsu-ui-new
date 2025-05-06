import React from 'react';
import { Button } from '@mui/material';
import './zupotsu-dynamic-button.css';

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
                backgroundColor,
                color,
                fontFamily,
                fontSize,
                border,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width,
                height,
                ...sx
            }}
        >
            {text}
        </Button>
    );
};

export default ZupotsuDynamicButton;
