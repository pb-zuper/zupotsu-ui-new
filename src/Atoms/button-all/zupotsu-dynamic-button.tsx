import React from 'react';
import { SxProps } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import './zupotsu-dynamic-button.css';
// import useDeviceType from 'libs/component-lib/src/utils/DeviceType';
import useDeviceType from '../../utils/DeviceType';
// import { makeStyles } from '@material-ui/core';

export interface ZupotsuDynamicButtonProps {
    onClick: () => void;
    disabled: boolean;
    fullWidth?: boolean;
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    border?: string;
    width?: string;
    height?: string;
    sx?: SxProps;
    text?:string;
}

const ZupotsuDynamicButton: React.FC<ZupotsuDynamicButtonProps> = ({
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
