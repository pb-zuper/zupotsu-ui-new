/* eslint-disable-next-line */
import {
  addCircle,
  // f,
  tickCircle,
  untickCircle,
} from '../../assets';
import './zupotsu-add-more.css';
import {
  Box,
  Divider,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useDeviceType from '../../utils/DeviceType';

export interface ZupotsuAddMoreProps {
  socialMediaItems: any;
  maxWidth: string;
  handleClickEvent: (data: any) => void;
  handleTextFieldChange: (formData: any) => void;
  previewMode?: boolean;
  values?: any;
  prevFormData?: any;
}

export function ZupotsuAddMore({
  socialMediaItems,
  maxWidth,
  handleTextFieldChange,
  handleClickEvent,
  previewMode,
  values,
  prevFormData,
}: ZupotsuAddMoreProps) {
  const deviceType = useDeviceType();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [leftDistance, setLeftDistance] = useState('0px');
  const [topDistance, setTopDistance] = useState('0px');

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setTopDistance(
      event.currentTarget.getBoundingClientRect().top + 105 + 'px'
    );
    setLeftDistance(
      event.currentTarget.getBoundingClientRect().left - 500 + 'px'
    );
    document.body.classList.add('dropdown-open');
  };

  useEffect(() => {
    if (values && JSON.stringify(values) !== JSON.stringify(formData)) {
      setFormData(values);
    }
  }, [values]);

  const updatedSocialMediaItems = socialMediaItems.map((item: any) => {
    const matchingHandle = prevFormData?.socialHandles?.find(
      (handle: any) => handle?.key?.toLowerCase() === item?.name?.toLowerCase()
    );
    if (matchingHandle) {
      return { ...item, value: matchingHandle.value };
    } else {
      return item; // Return the original item if no match is found
    }
  });

  // const handleClose = (
  //   event: React.MouseEvent<HTMLElement, MouseEvent>,
  //   value: string
  // ) => {
  //   event.preventDefault();
  //   event.stopPropagation(); // Stop the event from propagating up the DOM tree
  //   setAnchorEl(null);
  //   // handleMenusClick(value);
  // };

  const handleClose = (value: any) => {
    setAnchorEl(null);
    handleClickEvent(value);
    document.body.classList.remove('dropdown-open');
    // Handle the selected value, e.g., trigger an action with the selected value
  };

  const handleInputChange = (e: any, fieldName: any) => {
    setFormData((prevData) => {
      const newFormData = { ...prevData };
      // Find the matching entry in prevFormData and update its value
      // const matchingEntry = prevFormData?.find(
      //   (entry: any) => entry.key === fieldName
      // );
      // if (matchingEntry) {

      // }
      newFormData[fieldName] = e.target.value;

      handleTextFieldChange(newFormData);
      return newFormData;
    });
  };

  // const initializeFormData = (fieldName: string) => {
  //   return () => {
  //     const matchingEntry = prevFormData.find((entry: any) => entry.key === fieldName);
  //     if (matchingEntry) {
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         [fieldName]: matchingEntry.value,
  //       }));
  //     }
  //   };
  // };

  // Initialize prevFormData if fieldName matches
  // useEffect(initializeFormData(fieldName), [fieldName, prevFormData]);
  useEffect(() => {}, []);

  useEffect(() => {
    // Update leftDistance when the window is resized
    const handleResize = () => {
      setLeftDistance(anchorEl?.getBoundingClientRect().left + 'px');
    };

    const handleScroll = () => {
      setTopDistance(anchorEl?.getBoundingClientRect().top + 'px');
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [anchorEl]); // Re-run the effect when anchorEl changes

  return (
    <div
      style={{
        display: 'flex',
        gap: deviceType === 'mobile' ? '16px' : '20px',
        justifyContent: deviceType === 'mobile' ? 'center' : 'space-between',
        flexWrap: 'wrap',
        width:'100%'
      }}
    >
      {socialMediaItems.map((item: any,index:any) => (
        <>
          {(item.showDefault || item?.showInputView) && (
            <Box
              key={index}
              sx={{ minWidth: maxWidth || '250px' }}
              style={{
                display: previewMode && !formData[item.value] ? 'none' : '',
              }}
            >
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  size="small"
                  fullWidth
                  name={item.value}
                  value={formData[item.value] || ''}
                  placeholder={item.placeHolder}
                  onChange={(e) => handleInputChange(e, item.value)}
                  id="outlined-adornment-weight"
                  error={item?.isError || false}
                  endAdornment={
                    <InputAdornment position="end">
                      <img src={item.img} alt="facebook" />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  disabled={previewMode}
                />
                {item?.errorMessage && item?.isError && (
                  <div style={{ color: 'red', paddingTop: '8px' ,fontSize:'14px',fontFamily:'Inter',textAlign:"left"}}>
                    {item?.errorMessage}
                  </div>
                )}
              </FormControl>
            </Box>
          )}
        </>
      ))}
      {!previewMode && (
        <div
          style={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            paddingTop: '9px',
          }}
          onClick={handleClick}
        >
          <img src={addCircle} alt="" />
          <Typography
            style={{
              display: 'inline',
              color: 'var(--Zupotso-Primary, #E20B18)',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '140%',
            }}
          >
            Add More
          </Typography>
        </div>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        // style={{
        //   top: deviceType === 'mobile' ? '0' : '-130px',
        //   left: deviceType === 'mobile' ? '0' : '-380px',
        // }}
        PaperProps={{
          style: {
            width: '340px', // Set your desired height here
            padding: '10px 10px 20px 20px',
          },
        }}
        sx={{ top: -topDistance, left: 0 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {/* {menuItems.map((data: any) => (
          <MenuItem
            key={data.id}
            onClick={(event) => handleClose(event, data.value)}
          >
            {data.name}
          </MenuItem>
        ))} */}
        <Typography
          style={{
            color: 'var(--Gray-1, #333)',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '140%',
            marginBottom: '16px',
          }}
        >
          Add Social Handles
        </Typography>
        <div
          className="add-more-items-scroll"
          style={{ maxHeight: '204px', overflow: 'auto' }}
        >
          {socialMediaItems.map((item: any, index: any) => (
            <div key={item.value}>
              <MenuItem
                onClick={() => !item.showDefault && handleClose(item)}
                style={{ paddingLeft: '0' }}
              >
                <div
                  className="item"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <img
                      style={{ width: '20px', height: '20px' }}
                      src={item.img}
                      alt=""
                    />

                    <Typography
                      style={{
                        color: 'var(--Gray-1, #333)',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        lineHeight: '140%' /* 22.4px */,
                        letterSpacing: '0.16px',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {item.showDefault || item?.showInputView ? (
                      <img src={tickCircle} alt="" />
                    ) : (
                      <img src={untickCircle} alt="" />
                    )}
                  </div>
                </div>
              </MenuItem>
              {index < socialMediaItems.length - 1 && <Divider />}{' '}
              {/* Add Divider for all items except the last one */}
            </div>
          ))}
        </div>
      </Menu>
    </div>
  );
}

export default ZupotsuAddMore;
