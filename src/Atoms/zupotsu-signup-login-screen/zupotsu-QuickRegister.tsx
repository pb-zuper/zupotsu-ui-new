import { Box, Button, Checkbox, Modal, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import ZupotsuTextfield from '../zupotsu-textfields/zupotsu-textfields';
import ZupotsuButton from '../zupotsu-button/zupotsu-button';
import './zupotsu-login.css';
import useDeviceType from '../../utils/DeviceType';
import { validateEmail } from '../../utils/validateTextfieldValue';
import { useNavigate } from 'react-router-dom';
import Apis from '../../services/apis';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { successTikIcon } from '../../assets';
import Termsandservices from '../../Container/Termsandservices';

export function ZupotsuQuickRegister({ setSortAssets }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [isQuickRegistered, setIsQuickRegistered] = useState(false);
  const deviceType = useDeviceType();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const apis = new Apis();
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState<any>(false);
  const [shown, setShown] = useState(false);
  const handleTermsChange = (event: any) => {
    setIsTermsChecked(event.target.checked);
  };
  const isValid: any = (regex: any) => regex.test(password);
  const criteria = [
    {
      label: 'Password length must be minimum 8 characters.',
      regex: /.{8,}/,
    },
    {
      label: 'At least one lowercase letter (a-z) is required.',
      regex: /(?=.*[a-z])/,
    },
    {
      label: 'At least one uppercase letter (A-Z) is required.',
      regex: /(?=.*[A-Z])/,
    },
    {
      label: 'At least one special character (!#@$) is required.',
      regex: /(?=.*[!#@$])/,
    },
    {
      label: 'At least one number (0-9) is required.',
      regex: /(?=.*\d)/,
    },
  ];

  const QuickFun = () => {
    const getNameFromEmail = (email: any) => email.split('@')[0];
    if (email && password && confirmpassword) {
      if (!validateEmail(email)) {
        setIsEmailValid(validateEmail(email));
        return;
      }
      else {
        setLoader(true)
        let body = {
          "email": email?.toLowerCase(),
          "password": password,
          "mobile": "",
          "country": "",
          "preferred_currency": "INR",
          "name": getNameFromEmail(email)
        }
        apis.quickregister(body)
          .then((response: any) => {

            setLoader(true)
            if (response.data.status == "success") {
              localStorage.clear()
              localStorage.setItem("userID", response?.data?.data?.id)
              localStorage.setItem("orgID", response?.data?.data?.organization_id)
              localStorage.setItem("org", response.data?.data?.organization?.name)
              localStorage.setItem("accessToken", response?.data?.data?.access_token)
              localStorage.setItem("role", "quick-reg")
              localStorage.setItem("name", (response?.data?.data?.name))
              localStorage.setItem("mobile", response?.data?.data?.mobile)
              localStorage.setItem("email", response?.data?.data?.email)
              localStorage.setItem("preferred_currency", response?.data?.data?.preferred_currency)
              localStorage.setItem("zohoId", response?.data?.data?.zoho_id)
              localStorage.setItem("zohoOrgId", response?.data?.data?.organization?.zoho_id)
              setSnackbar({
                open: true,
                severity: 'success',
                message: 'Registeration is successfull',
              });
              setIsQuickRegistered(!isQuickRegistered)
            }
            else {
              setSnackbar({
                open: true,
                severity: 'error',
                message: 'Failed to register, please try again!!',
              });
            }

          })
          .catch((error) => {
            setLoader(false)
            console.log("error", error)
            setSnackbar({
              open: true,
              severity: 'error',
              message: error?.response?.data?.error || 'something went wrong!!',
            });
          });
      }
    }
    else {
      if (!email) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Please enter mail id!!',
        });
      } else if (!password) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Password is missing!!',
        });
      }

    }
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: "#FFF",
    border: '0px solid #000',
    borderRadius: '8px',
    divShadow: 24,
    padding: "10px",
    fontFamily: 'Inter'
};


  return (
    <>
      {
        (!isQuickRegistered) ? (
          <>
            <div
              className="hide-scroll-stepper"
              style={{
                height: deviceType === 'mobile' ? '220px' : 'auto',
                overflowY: 'auto',
              }}
            >
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

              <div style={{ width: '100%' }}>

                <div style={{ paddingTop: '20px' }}>
                  <ZupotsuTextfield
                    title="Email"
                    type="email"
                    value={email?.toLowerCase()}
                    isRequired={true}
                    placeholder={
                      deviceType === 'mobile' ? 'Email' : 'Official Email'
                    }
                    errorMessage={
                      email ? (
                        !validateEmail(email)
                          ? 'Please enter a valid mail. E.g. name@company.com'
                          : '') : ""
                    }
                    onKeyDown={(e: any) => {
                      if (e.key == "Enter") {
                        QuickFun()
                      }
                    }}
                    handleChange={(e) => {
                      setEmail(e.target.value?.toLowerCase())
                      setIsEmailValid(true)
                    }}
                  />
                </div>

                <div style={{ paddingTop: '20px' }}>
                  <ZupotsuTextfield
                    title="Password"
                    type="password"

                    value={password}
                    placeholder="Password"
                    isRequired={true}
                    handleChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e: any) => {
                      if (e.key == "Enter") {
                        QuickFun()
                      }
                    }}
                  />
                </div>
                <div style={{ paddingTop: '20px' }}>
                  <ZupotsuTextfield
                    title="Confirm Password"
                    type="password"
                    value={confirmpassword}
                    placeholder="Confirm Password"
                    isRequired={true}
                    handleChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e: any) => {
                      if (e.key == "Enter") {
                        QuickFun()
                      }
                    }}
                    errorMessage={
                      password != confirmpassword
                        ? "Password doesn't match!!"
                        : ''
                    }
                  />
                </div>
                <div style={{ marginTop: '0px', marginBottom: '20px' }}>
                  {criteria.map((criterion, index) => (
                    <div
                      key={index}
                      style={{
                        margin: '3px',
                        borderRadius: '5px',
                        textAlign: 'left',
                        fontSize: '12px',
                        color: isValid(criterion.regex) ? 'green' : 'grey',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >

                      <span style={{ marginRight: '6px' }}>
                        {isValid(criterion.regex) && (<CheckIcon
                          style={{ cursor: 'pointer', fontSize: 14, color: 'green' }}
                        />)}
                      </span>
                      {!isValid(criterion.regex) && (
                        <span style={{ fontSize: '1.5em', lineHeight: 1, marginRight: '6px' }}>
                          •
                        </span>
                      )}
                      {criterion.label}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    paddingTop: '10px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >

                  <Checkbox
                    sx={{
                      backgroundColor: "#FFF",
                      color: 'red',
                      '& .Mui-checked': {
                        fill: "red",
                        margin: 0,
                      },
                      '& .MuiSvgIcon-root': {
                        fill: "red",
                        margin: 0,
                        width: '20px',
                        height: '20px',
                      }
                    }}
                    checked={isTermsChecked}
                    onChange={(e: any) => {
                      handleTermsChange(e)
                    }}
                    name="termsandconditions"
                    color="primary"
                    required={true}
                  />
                  <Typography
                    onClick={() => { setShown(true) }}
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: '140%',
                      margin: 0,
                      padding: 0,
                      cursor: 'pointer',
                      textDecorationColor: "rgba(0,0,0,0.7)",
                      textDecorationThickness: "1px",
                    }}
                  >

                    By checking this box you agree to Zupotsu's
                    <span style={{ textDecoration: "underline", paddingLeft: '3px', color: "#e22b16" }}>Terms and Conditions</span>
                  </Typography>
                </div>
              </div>


            </div>

            <div style={{ paddingTop: '10px' }}>

              <ZupotsuButton
                disabled={!password.trim() || !email.trim() || (!isTermsChecked) || !confirmpassword.trim() || (confirmpassword.trim() !== password.trim())}
                handleClick={() => {
                  QuickFun()
                }}
                name="Register"
                customBgColor={(!password.trim() || !confirmpassword.trim() || (confirmpassword !== password) || !email.trim() || (!isTermsChecked)) ? "rgba(226, 11, 24, 0.3)" : "rgba(226, 11, 24, 1)"}
                customTextColor={"#FFF"}
                customBgColorOnhover={"rgba(226, 11, 24, 0.3)"}
                customTextColorOnHover={"1px solid rgba(189, 189, 189, 1)"}
                customOutlineColor={"1px solid rgba(189, 189, 189, 1)"}
                load={loader ? true : false}
              />


            </div>
          </>
          
        ) : (
          <Modal
            open={isQuickRegistered}
          >
            <Box sx={style}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: deviceType === 'mobile' ? "60%" : '100%',
                    padding:
                      deviceType === 'mobile' ? '12px 16px' : '10px 10px',
                    gap: deviceType === 'mobile' ? '12px' : '16px',
                  }}
                >
                  <img
                    src={successTikIcon}
                    style={{
                      width: deviceType === 'mobile' ? '60px' : '',
                      height: deviceType === 'mobile' ? '60px' : '',
                    }}
                    alt=""
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      style={{
                        color: 'var(--Green-1, #219653)',
                        textAlign: 'center',
                        fontFamily: 'Inter',
                        fontSize: deviceType === 'mobile' ? '18px' : '20px',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        lineHeight: '130%',
                        paddingBottom: '6px',
                      }}
                    >
                      Congratulations !!
                    </Typography>
                    <Typography
                      style={{
                        color: 'var(--Gray-1, #333)',
                        fontFamily: 'Inter',
                        fontSize: deviceType === 'mobile' ? '14px' : '16px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: '130%',
                        textAlign: 'center',
                        marginTop: '10px'
                      }}
                    >
                      You have partially registered on Zupotsu.
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'center',
                    marginTop: deviceType === 'mobile' ? '28px' : '10px',
                  }}
                >

                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    gridGap: '16px',
                    marginTop: '20px',
                  }}
                >


                  <ZupotsuButton
                    name="Continue"
                    handleClick={() => {
                      localStorage.setItem("sessionStartTime", performance.now().toString())
                      navigate('/catalogue')
                    }}
                    isCustomColors={true}
                    variant={'outlined'}
                    customTextColor="#E20B18"
                    customBgColor="#fff"
                    customBgColorOnhover="white"
                    customTextColorOnHover="#E20B18"
                    customOutlineColor={'1px solid #E20B18'}
                    customOutlineColorOnHover={'1px solid #E20B18'}
                    padding="13px 12px"
                  />
                </div>
              </div>
            </Box>
          </Modal>
        )}
        <Termsandservices shown={shown} setShown={setShown} />
    </>
  );
}

export default ZupotsuQuickRegister;
