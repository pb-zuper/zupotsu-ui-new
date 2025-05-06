import { Typography } from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export interface ZupotsuImgUploadProps {
  uploadedImage: any;
  name: string;
  imgCardLabel?: string;
  uploadTitle?: string;
  fileType?: string;
  fileSize?: string;
  isRequired?: boolean;
  setUploadedImage: (name: string, imageUrl: any, file: any) => void;
  previewMode?: boolean;
  showToastMessage?: boolean;
  showDownloadIcon?: boolean;
  downloadFile?: (filedata: any) => void;
}

export function ZupotsuImgUpload({
  uploadedImage,
  uploadTitle,
  imgCardLabel,
  name,
  fileType,
  fileSize,
  isRequired = false,
  setUploadedImage,
  previewMode = false,
  showToastMessage = true,
  showDownloadIcon = false,
  downloadFile = (fileData: any) => { },
}: ZupotsuImgUploadProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const imageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '4px',
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (fileType === 'pdf') {
      // Handle PDF file
    } else {
      // Handle image file
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as AlertColor}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
      <div>
        <>
          {imgCardLabel && (
            <Typography
              style={{
                marginBottom: '2px',
                color: 'var(--Gray-1, #333)',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: '140%',
              }}
            >
              {imgCardLabel}{' '}
              {isRequired && (
                <span
                  style={{
                    color: 'var(--Zupotso-Primary, #E20B18)',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '140%',
                  }}
                >
                  *
                </span>
              )}
            </Typography>
          )}
          {fileSize && (
            <Typography
              style={{
                marginBottom: '10px',
                color: 'var(--Gray-1, #656565)',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '140%',
              }}
            >
              <i>{fileSize}</i>
            </Typography>
          )}
        </>
        <div style={{ maxWidth: '200px' }}>
          {fileType !== 'pdf' ? (
            <>
              {!previewMode && (
                <div
                  style={{
                    maxWidth: '200px',
                    height: '100%',
                    cursor: 'pointer',
                    background: '#f7eeee',
                    border: '1px solid #000',

                  }}
                >
                  {!uploadedImage && (
                    <div>
                      <input type="file" onChange={onFileChange} accept="image/*" />
                      <div
                        style={{
                          padding: '20px',
                          border: '2px dashed red',
                          borderRadius: '4px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                      >
                        <DriveFolderUploadIcon />
                        <Typography
                          style={{
                            textAlign: 'center',
                            marginTop: '10px',
                            color: 'var(--Gray-1, #333)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: '140%',
                          }}
                        >
                          {uploadTitle}
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Display uploaded image */}
            </>
          ) : (
            <>
              <div>
                <input type="file" onChange={onFileChange} accept=".pdf" />
                {/* Display uploaded PDF */}
              </div>
            </>
          )}
          <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>
        </div>
      </div>
    </>
  );
}

export default ZupotsuImgUpload;
