import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Close } from '@mui/icons-material';
import './zupotsu-img-upload.css';
import { useState } from 'react';
import useDeviceType from '../../utils/DeviceType';
import { deleteIcon1, editIcon, infoCircle } from '../../assets';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Apis from '../../services/apis';
import ZupotsuTooltip from '../../Atoms/zupotsu-tooltip/zupotsu-tooltip';


export interface ZupotsuImgUploadProps {
  uploadedImage: any;
  name: string;
  imgCardLabel?: string;
  uploadTitle?: string;
  fileType?: string;
  fileSize?: string;
  isRequired?: boolean;
  isTooltip?: any
  setUploadedImage: (name: string, imageUrl: any, file: any, type: any) => void;
  previewMode?: boolean;
  showToastMessage?: boolean;
  showDownloadIcon?: boolean;
  downloadFile?: (filedata: any) => void;
  index?: any;
  handleDelete?: any
}

export function ZupotsuImg({
  uploadedImage,
  uploadTitle,
  imgCardLabel,
  name,
  fileType,
  fileSize,
  handleDelete,
  isRequired = false,
  setUploadedImage,
  index,
  previewMode = false,
  showToastMessage = true,
  showDownloadIcon = false,
  isTooltip,
  downloadFile = (fileData: any) => { },
}: ZupotsuImgUploadProps) {

  const [errorMessage, setErrorMessage] = useState('');
  const deviceType = useDeviceType();
  const apis = new Apis();
  // Split the name and extension
  const namePart = uploadedImage?.split("__").pop() || ""; // Gets "sample.pdf"
  const [getfileName, extension] = namePart.split(".");
  const [loader, setLoader] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const imageStyle = {
    maxWidth: '200px',
    height: "80%",
    borderRadius: '4px',

  };
  const onDrop = async (acceptedFiles: any) => {
    setLoader(true)
    const file = acceptedFiles[0];
    const maxSize = 5 * 1024 * 1024; // 10 MB

    if (fileType === 'pdf' || file.type.startsWith('image/')) {
      if (file.size > maxSize) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'File size exceeded',
        });
        setLoader(false)
        return;
      }

      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        apis.getS3URL(file)
          .then((res2: any) => {
            setUploadedImage(name, res2.data.data[0], file, file.type);
            setErrorMessage('');
            if (showToastMessage) {
              setSnackbar({
                open: true,
                severity: 'success',
                message: 'File uploaded successfully',
              });
            }
            setLoader(false)
          })
          .catch((error) => {
            setSnackbar({
              open: true,
              severity: 'error',
              message: error?.response?.data?.error || 'something went wrong!!',
            });
            setLoader(false)
          });


      } else {
        setLoader(false)
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Please Upload Valid PDF File',
        });
      }
    }
    else {
      if (file.type.startsWith('image/')) {
        const maxImageSize = 10 * 1024 * 1024; // 10 MB
        if (file.size > maxImageSize) {
          setSnackbar({
            open: true,
            severity: 'error',
            message: 'Image size exceeded',
          });
          return;
        }
        apis.getS3URL(file)
          .then((res2: any) => {
            setUploadedImage(name, res2.data.data[0], file, file.type);
            setErrorMessage('');
            if (showToastMessage) {
              setSnackbar({
                open: true,
                severity: 'success',
                message: 'Image uploaded successfully',
              });
              setLoader(false)
            }
          })
          .catch((error) => {
            setSnackbar({
              open: true,
              severity: 'error',
              message: error?.response?.data?.error || 'something went wrong!!',
            });
            setLoader(false)
          });

      } else {
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Please Upload JPG/PNG Image',
        });
        setLoader(false)
      }
    }
  };

  function isImageUrl(url: any) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
    return imageExtensions.some(ext => url?.toLowerCase().endsWith(ext));
  }


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>

      {(loader) && (
        <div className="centered-container">
          <div className="loader"></div>
        </div>
      )}
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

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        {/* {!previewMode && ( */}
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
              {isTooltip && (<ZupotsuTooltip
                tooltipMessage={isTooltip}
                icon={infoCircle}
              />)}
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
                textAlign: "left"
              }}
            >
              <i>{fileSize}</i>
            </Typography>
          )}
        </>
        {/* )} */}
        {(!isImageUrl(uploadedImage)) ? (
          <div style={{ width: '100%', height: '100px' }}>
            {fileType !== 'pdf' ? (
              <>
                {!previewMode && (
                  <div
                    style={{
                      // width: '330px',
                      cursor: 'pointer',
                      background: '#f7eeee',
                    }}
                  >
                    {!uploadedImage && (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} accept=".png, .jpg, .jpeg, .pdf" />
                        <div
                          style={{
                            padding:
                              deviceType === 'mobile' ? '12px 8px' : '20px',
                            border: '1.5px dashed rgba(226, 11, 24, 1)',
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
                            {uploadedImage ? `${getfileName}.${extension}` : uploadTitle}
                          </Typography>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {uploadedImage && (
                  <div
                    style={{
                      position: 'relative',
                      textAlign: 'center',
                      color: 'white',
                      height: '112px',
                      border: "1px solid #dfd2d2",
                      borderRadius: '4px',
                    }}
                  >
                    <div
                      style={{
                        // marginTop: '10px',
                        height: '100%',
                        width: '100%',
                        objectFit: 'fill',
                        position: 'relative',
                        textAlign: 'center',
                        color: 'white',
                      }}
                    >
                      <img
                        id={'test-' + uploadedImage}
                        src={
                          uploadedImage?.startsWith('data:image')
                            ? uploadedImage
                            : uploadedImage?.startsWith('https://')
                              ? uploadedImage
                              : `data:image/png;base64,${uploadedImage}`
                        }
                        alt="Uploaded"
                        style={imageStyle}
                      />
                      {!previewMode && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            display: 'flex',
                            gap: '10px',
                          }}
                        >
                          <div>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} accept=".png, .jpg, .jpeg, .pdf" />
                              <img
                                src={editIcon}
                                style={{ cursor: 'pointer' }}
                                alt="edit-icon"
                              />
                            </div>
                          </div>

                          <div>
                            <img
                              src={deleteIcon1}
                              alt="delete-icon"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                handleDelete(name)

                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  {...getRootProps()}
                  style={{
                    pointerEvents: showDownloadIcon ? 'none' : 'auto',
                  }}
                >
                  <input {...getInputProps()} accept=".png, .jpg, .jpeg, .pdf" />
                  <>
                    {fileType === 'pdf' && (
                      <>
                        {!previewMode && (
                          <div
                            style={{
                              cursor: 'pointer',
                              background: '#f7eeee',
                            }}
                          >
                            <div
                              className="dashed-border"
                              style={{
                                padding:
                                  deviceType === 'mobile' ? '12px 8px' : '20px',
                                border: '2px dashed rgba(226, 11, 24, 1)',
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
                                {uploadedImage ? `${getfileName}.${extension}` : uploadTitle}
                              </Typography>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                </div>

              </>
            )}
            <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>
          </div>
        ) : (
          <div {...getRootProps()} style={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: 'center', width: '100%', height: '100px', cursor: "pointer" }}>
            <input {...getInputProps()} accept=".png, .jpg, .jpeg, .pdf" />
            <img
              id={'test-' + uploadedImage}
              src={
                uploadedImage
              }
              alt="Uploaded"
              style={imageStyle}
            />

            <Typography
              style={{
                textAlign: 'center',
                color: 'var(--Gray-1, #333)',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '140%',
              }}
            >
              {uploadedImage ? `${getfileName}.${extension}` : uploadTitle}
            </Typography>


          </div>
        )}
      </div>

    </>
  );
}

export default ZupotsuImg;
