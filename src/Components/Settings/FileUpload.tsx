import React, { useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import { infoCircle } from 'libs/component-lib/src/Assets';
import { infoCircle } from '../../assets';
// import ZupotsuTooltip from 'libs/component-lib/src/lib/Atoms/zupotsu-tooltip/zupotsu-tooltip';
// import { UploadIcon } from 'apps/admin/src/assets';
import ZupotsuTooltip from '../../Atoms/zupotsu-tooltip/zupotsu-tooltip';
import { UploadIcon } from '../../assets';

const useStyles = makeStyles({
  fileUploadContainer: {
    width: '200px',
    height: '112px',
    border: '2px dashed red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    // gap: '14px',
    gap:"5px",
    borderRadius:'5px',
    backgroundColor: '#FEF5F6',
  },
  fileInput: {
    display: 'none',
  },
});

interface FileUploadProps {
  title: string;
  isRequired: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ title, isRequired }) => {
  const classes = useStyles();
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
    }
  };

  return (
    <div style={{ width: '100%' }} >
      <Typography
        style={{
          marginBottom: '10px',
          color: 'var(--Gray-1, #333)',
          fontFamily: 'Inter',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '140%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <span style={{ textTransform: 'capitalize' }}>{title}</span>
            {isRequired && (
              <span
                style={{
                  color: 'var(--Zupotso-Primary, #E20B18)',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '140%',
                }}
              >
                *
              </span>
            )}
            <span style={{ paddingLeft: '8px' }}>
              <ZupotsuTooltip tooltipMessage="Tooltip message here" icon={infoCircle} />
            </span>
          </div>
          <span style={{ color: 'rgba(130, 130, 130, 1)', fontSize: '10px' }}>
            Upload size ratio is 1:1 (500x500px)
          </span>
        </div>
      </Typography>
      <div className={classes.fileUploadContainer} onClick={handleClick}>
        <input
          type="file"
          id="file-upload-input"
          accept="image/*, .pdf, .doc, .docx"
          className={classes.fileInput}
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <img src={UploadIcon} alt="Upload Icon" width={30} height={30} />
        {fileName && (
          <Typography
            style={{
              textAlign: 'center',
              // marginTop: '10px',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight:'700',
              margin:0,
              padding:0,
              // color: 'var(--Gray-2, #555)',
              color: 'red'
            }}
          >
            {fileName}
          </Typography>
        )}
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            marginTop: '10px',
            fontFamily: 'Inter',
            fontSize: '12px',
            color: 'var(--Gray-2, #555)',
            wordWrap: 'break-word',
          }}
          htmlFor="file-upload-input"
        >
          Click to upload or Drag & Drop png/jpg here
        </label>
      </div>

    </div>
  );
};

export default FileUpload;
