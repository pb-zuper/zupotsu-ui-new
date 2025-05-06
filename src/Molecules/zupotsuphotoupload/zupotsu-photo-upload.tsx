import { Typography, Snackbar, Alert, AlertColor, TextField } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import './zupotsu-img-upload.css';
import Apis from '../../services/apis';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { deleteIcon } from '../../assets';


export interface ZupotsuImgUploadProps {
  uploadedImage: any;
  name: string;
  placeholder?: string;
  imgCardLabel?: string;
  fileType?: string;
  isRequired?: boolean;
  onDelete: (name: string, imageUrl: string | null, file: File | null) => void;
  setUploadedImage: (name: string, imageUrl: any, file: any, type: any) => void;
  previewMode?: boolean;
  showToastMessage?: boolean;
  handleDelete?: (name: string) => void;
}

export function ZupotsuPhotoUpload({
  uploadedImage,
  imgCardLabel,
  placeholder,
  name,
  fileType,
  isRequired = false,
  setUploadedImage,
  onDelete,
  previewMode = false,
  showToastMessage = true,
  handleDelete,
}: ZupotsuImgUploadProps) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success' as AlertColor,
    message: '',
  });

  const [fileName, setFileName] = useState("")
  const [loader, setLoader] = useState(false)

  const handleSnackbar = (severity: AlertColor, message: string) => {
    setSnackbar({ open: true, severity, message });
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      handleSnackbar('error', 'File size exceeded');
      return;
    }

    const isImage = file.type.startsWith('image/');
    const isPdf = fileType === 'pdf' && file.type === 'application/pdf';
    // setFileName(file?.name)
    setLoader(true)
    if (isImage
      // || isPdf
    ) {
      try {
        const response = await new Apis().getS3URL(file);
        setUploadedImage(name, response.data.data[0], file, isImage ? 'image' : 'document');
        setLoader(false)
        if (showToastMessage) handleSnackbar('success', 'File uploaded successfully');
      } catch (error) {
        setLoader(false)
        handleSnackbar('error', 'Upload failed');
      }
    } else {
      handleSnackbar('error', `Please upload a valid ${fileType === 'pdf' ? 'PDF' : 'image'} file`);
      setLoader(false)
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
      <div className="upload-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        {imgCardLabel && (
          <div style={{ display: 'flex' }}>
            <DriveFolderUploadIcon />
            <Typography variant="subtitle2" color="textPrimary"
              sx={{
                // marginTop: '10px',
                marginBottom: '10px',
                color: 'var(--Gray-1, #333)',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                lineHeight: '140%',
                display: 'flex',
                flexDirection: 'column',
                fontWeight: '600',
                marginLeft: '5px'
              }}
            >
              {imgCardLabel} {isRequired && <span style={{ color: '#E20B18' }}>*</span>}
            </Typography>
          </div>
        )}
        <div className="upload-area"  {...getRootProps()} style={{ width: '100%' }}>
          <input {...getInputProps()} />
          <div className="preview-container" style={{ width: '100%' }}>
            {(!uploadedImage) ? (
              <input
                placeholder={placeholder}
                value={uploadedImage}
                disabled={previewMode}
                name={name || ''}
                id="fullWidth"
                type={"text"}
                accept=".png, .jpg, .jpeg"
                style={{
                  width: '100%',
                  color: "#CFCFCF",
                  border: "2px dashed rgb(226, 11, 24)",
                  background: previewMode ? '#F1F1F1' : '#F7EEEE',
                  padding: 0,
                  margin: 0,
                  height: '40px',
                  paddingLeft: '10px',
                  borderRadius: "5px",
                  outline: "none"
                }}
                onClick={() => {
                  getInputProps()
                }}
              />) : (
              <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "flex-start", gap: '10px', width: '80%', border: "1px solid #ddd", borderRadius: "5px", }}>
                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "flex-start", gap: '10px', width: '80%', border: "0px solid #ddd", borderRadius: "5px", }}>
                  <img
                    id={'test-' + uploadedImage}
                    src={uploadedImage}
                    alt="Uploaded"
                    style={{ height: '40px', }}
                  />
                </div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onDelete(name, uploadedImage, null);
                  }}
                  style={{
                    width: '15px',
                    height: '15px',
                    fontSize: '15px',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    backgroundColor: '#e12619',
                    color: '#FFF',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label="Delete"
                >
                  <span style={{ fontSize: '10px', margin: 0, padding: 0 }}>✘</span>
                </button>

              </div>
            )}

          </div>

        </div>
      </div >

      {(loader) && (<div className="centered-container">
        <div className="loader"></div>
      </div>)
      }
    </>
  );
}

export default ZupotsuPhotoUpload;
