import { useEffect, useMemo, useRef, useState } from 'react';
import ZupotsuTextfield from '../../Atoms/zupotsu-textfields/zupotsu-textfields';
import {
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { editIcon, deleteIcon, IndianFlag, UploadIcon } from '../../assets';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import {
  validateEmailV2,
  validateMobile,
  validateStringOnly,
} from '../../utils/validateTextfieldValue';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import useDeviceType from '../../utils/DeviceType';

const StyledNoBorderInput = styled('div')(({ }) => {
  return {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      outline: 'none',
    },
    '&': {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      border: '1px solid  #E0E0E0',
      'border-radius': '5px',
      'align-items': 'center',
      gap: '12px',
    },
    '&:hover': {
      border: '1px solid  #000',
    },
    '& .MuiInputBase-input': {
      padding: '8.5px 14px',
      border: 'none',
      outline: 'none',
      height: '1.4375em',
      'font-size': 'inherit',
    },
  };
});

const GetInTouchForm = ({
  buttonClicked,
}: {
  buttonClicked: (buttonKey: string, data?: any) => void;
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNo, setMobileNo] = useState<string>('');
  const [aboutYourself, setAboutYourself] = useState<string>('');
  const [countryCode, setCountryCode] = useState<{
    value: string;
    icon?: string;
    key: string;
  }>({
    value: '+91',
    icon: '',
    key: 'IND',
  });
  const [emailErrorMessages, setEmailErrorMessages] = useState<string>('');
  const [nameErrorMessages, setNameErrorMessages] = useState<string>('');
  const [mobileNoErrorMessages, setMobileNoErrorMessages] =
    useState<string>('');
  const [aboutYourselfErrorMessages, setAboutYourselfErrorMessages] =
    useState<string>('');

  const fileInputRef = useRef<any>(null);
  const [fileName, setFileName] = useState('');

  const counteryCodeList = useMemo(
    () => [{ value: '+91', icon: '', key: 'IND' }],
    []
  );

  const allowedFileTypes = useMemo(
    () => ['doc', 'ppt', 'pdf', 'xls', 'xlsx', 'docx', 'pptx'],
    []
  );
  const maxFileSize = 1024 * 1024 * 30; /* 30MB */
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertProps['severity'];
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const deviceType = useDeviceType();

  const [uploadFileData, setUploadFileData] = useState<File | null>(null);

  const getFileExtension = (fileName: string | any) => {
    if (fileName) {
      const fileNameArray = fileName.split('.');
      return fileNameArray[fileNameArray.length - 1];
    }
    return '';
  };

  const handleFileChange = (event: any) => {
    const uploadedFile = event?.target?.files?.[0];
    if (allowedFileTypes.includes(getFileExtension(uploadedFile?.name))) {
      if (uploadedFile?.size <= maxFileSize) {
        setUploadFileData(uploadedFile);
        setFileName(uploadedFile?.name);
      } else {
        setSnackbar({
          open: true,
          message: 'File limit exceeded',
          severity: 'error',
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: 'Invalid File Type',
        severity: 'error',
      });
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const validateData = (name: string, value: any) => {
    switch (name) {
      case 'name':
        if (value)
          setNameErrorMessages(
            validateStringOnly(value) ? '' : 'Please enter valid Name'
          );
        else setNameErrorMessages('Please enter name');
        break;
      case 'email':
        if (value)
          setEmailErrorMessages(
            validateEmailV2(value)
              ? ''
              : 'Please use your official business email'
          );
        else setEmailErrorMessages('Please enter email');
        break;
      // case 'mobileNo':
      //   if (value)
      //     countryCode?.key === 'IND'
      //       ? setMobileNoErrorMessages(
      //         validateMobile(value)
      //           ? '' : 'Please enter correct mobile number'
      //       ) : '';
      //   else setMobileNoErrorMessages('Please enter mobile number');
      case 'mobileNo':
        if (value) {
          if (countryCode?.key === 'IND') {
            setMobileNoErrorMessages(
              validateMobile(value) ? '' : 'Please enter a correct mobile number'
            );
          } else {
            setMobileNoErrorMessages('');
          }
        } else {
          setMobileNoErrorMessages('Please enter a mobile number');
        }
        break;
      case 'tell_us_about_yourself':
        if (value)
          setAboutYourselfErrorMessages(
            value.split(/\s+/).length > 3000 ? 'Word limit exceeded' : ''
          );
        else setAboutYourselfErrorMessages('Please enter about yourself');
        break;
    }
  };
  const handleInputChange = (event: any) => {
    const { name, value } = event?.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'mobileNo':
        setMobileNo(value);
        break;
      case 'tell_us_about_yourself':
        setAboutYourself(value);
        break;
      case 'countryCode':
        const countrycodedata: any =
          counteryCodeList.find(
            (code: { value: string; icon: any; key: string }) =>
              code.value === value
          ) || null;
        setCountryCode(countrycodedata);
        break;
      default:
        break;
    }
    validateData(name, value);
  };

  const isSubmitButtonEnabled = useMemo(
    () =>
      Boolean(
        nameErrorMessages.length === 0 &&
        emailErrorMessages.length === 0 &&
        mobileNoErrorMessages.length === 0 &&
        aboutYourselfErrorMessages.length === 0
      ) &&
      Boolean(
        name.length > 0 &&
        email.length > 0 &&
        mobileNo.length > 0 &&
        aboutYourself.length > 0
        //&&  fileName?.length > 0
      ),
    [
      nameErrorMessages,
      emailErrorMessages,
      mobileNoErrorMessages,
      aboutYourselfErrorMessages,
      name,
      email,
      mobileNo,
      aboutYourself,
      fileName,
    ]
  );

  const onCloseSnackbar = () => {
    setSnackbar({
      open: false,
      message: '',
      severity: 'success',
    });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxHeight: deviceType === 'mobile' ? '300px' : 'auto',
            overflowY: deviceType === 'mobile' ? 'auto' : 'hidden',
            overflowX: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                deviceType !== 'mobile' ? 'repeat(2, 1fr)' : '',
              gap: '28px',
            }}
          >
            <div style={{ width: '100%' }}>
              <ZupotsuTextfield
                title="Name"
                value={name}
                placeholder="Name"
                isRequired={true}
                name="name"
                errorMessage={nameErrorMessages}
                handleChange={handleInputChange}
              />
            </div>
            <div style={{ width: '100%' }}>
              <ZupotsuTextfield
                title="Email"
                value={email}
                isRequired={true}
                placeholder={'Email'}
                errorMessage={emailErrorMessages}
                name="email"
                handleChange={handleInputChange}
              />
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                deviceType !== 'mobile' ? 'repeat(2, 1fr)' : '',
              gap: '28px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                style={{
                  marginBottom: '10px',
                  color: 'var(--Gray-1, #333)',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '140%',
                  display: 'flex',
                  gap: '10px',
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
                  <span>{'Mobile No'}</span>
                  <span
                    style={{
                      color: 'var(--Zupotso-Primary, #E20B18)',
                      fontFamily: 'Inter',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: '700',
                      lineHeight: '140%',
                    }}
                  >
                    *
                  </span>
                </div>
              </Typography>

              <StyledNoBorderInput>
                <Select
                  value={countryCode}
                  name="countryCode"
                  onChange={handleInputChange}
                  label=""
                  sx={{
                    width: 'fit-content',
                    height: '32px',
                    borderRadius: '4px',
                    color: '#101425',
                  }}
                  renderValue={() => {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        {countryCode && <img src={countryCode.icon} />}
                        {countryCode.value}
                      </div>
                    );
                  }}
                >
                  {counteryCodeList.map((code) => (
                    <MenuItem
                      sx={{
                        color: '#101425',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                      }}
                      value={code.value}
                      key={code.key}
                    >
                      {code.icon && <img src={code.icon} />}
                      {code.value}
                    </MenuItem>
                  ))}
                </Select>
                <Typography
                  style={{
                    color: '#bdbdbd',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '19.6px',
                  }}
                >
                  |
                </Typography>
                <TextField
                  title="Mobile No"
                  value={mobileNo}
                  type={'number'}
                  placeholder="Mobile No"
                  // errorMessage={mobileNoErrorMessages}
                  required={true}
                  name="mobileNo"
                  fullWidth
                  onChange={handleInputChange}
                />
              </StyledNoBorderInput>
              {mobileNoErrorMessages && (
                <Typography
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    marginTop: '4px',
                  }}
                >
                  {mobileNoErrorMessages}
                </Typography>
              )}
            </div>

            <div style={{ width: '100%' }}>
              <Typography
                style={{
                  marginBottom: '10px',
                  color: 'var(--Gray-1, #333)',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '140%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Upload Brief
                {/* <span
                  style={{
                    color: 'var(--Zupotso-Primary, #E20B18)',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '140%',
                  }}
                >
                  *
                </span> */}
              </Typography>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  value={fileName}
                  fullWidth
                  placeholder="Upload Brief"
                  onClick={(event) => event.stopPropagation()}
                  InputProps={{
                    style: { fontSize: '16.5px' },
                    readOnly: true,
                    endAdornment: (
                      <IconButton
                        onClick={handleUploadClick}
                        sx={{
                          marginRight: '0',
                          paddingRight: '0 !important',
                        }}
                      >
                        <img src={UploadIcon} alt="upload" />
                      </IconButton>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <ZupotsuTextfield
              title="Tell us about yourself"
              name="tell_us_about_yourself"
              value={aboutYourself}
              isRequired={true}
              placeholder={'Tell us about yourself'}
              handleChange={handleInputChange}
              rows={4}
              multiline={true}
              description=""
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          <div style={{ maxWidth: '200px' }}>
            <ZupotsuButton
              name="Cancel"
              handleClick={() => {
                buttonClicked('cancel');
              }}
              isCustomColors={true}
              variant={'outlined'}
              customTextColor="#828282"
              customBgColorOnhover="#f2f2f2"
              customBgColor="#F2F2F2"
              customTextColorOnHover="#E20B18"
              customOutlineColor={'1px solid #E0E0E0'}
              customOutlineColorOnHover={'1px solid #E20B18'}
              padding="11px 33px"
            />
          </div>
          <div style={{ maxWidth: '200px' }}>
            <ZupotsuButton
              name={'Submit'}
              isCustomColors={true}
              variant={'contained'}
              customTextColor="#FFF"
              customBgColorOnhover="#E20B18"
              // customBgColor="#F2F2F2"
              customBgColor='#E20B18'
              customTextColorOnHover="#FFF"
              customOutlineColor={'1px solid #E20B18'}
              customOutlineColorOnHover={'1px solid #E20B18'}
              padding="11px 33px"
              handleClick={() => {
                buttonClicked('submit', {
                  name,
                  email,
                  mobileNo,
                  fileName,
                  aboutYourself,
                  countryCode,
                  file: uploadFileData,
                });
              }}
              disabled={!isSubmitButtonEnabled}
            />
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={onCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};
export default GetInTouchForm;
