import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarWrapperProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: AlertProps['severity'];
  autoHideDuration?: number;
}

const SnackbarWrapper: React.FC<SnackbarWrapperProps> = ({
  open,
  onClose,
  message,
  severity,
  autoHideDuration = 5000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarWrapper;