import { ZopotsuAssetRejectPopupProps } from './zopotsu-asset-reject-popup';
import { Divider, Typography } from '@mui/material';
import { ZupotsuTextfieldProps } from '../../Atoms/zupotsu-textfields/zupotsu-textfields';
// import ZupotsuTextfield from 'libs/component-lib/src/lib/Atoms/zupotsu-textfields/zupotsu-textfields';
import ZupotsuTextfield from '../../Components/Settings/ZupotsuTextfield';
import { useEffect, useState } from 'react';
// import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
// import useDeviceType from 'libs/component-lib/src/utils/DeviceType';
import useDeviceType from '../../utils/DeviceType';

export function AssetPopupView({
  assetTitle,
  assetId,
  buttonClicked,
}: ZopotsuAssetRejectPopupProps) {
  const [reason, setReason] = useState<string>('');
  const [reasonError, setReasonError] = useState<string>('');
  const deviceType = useDeviceType();
  // useEffect(()=>{
  //     const reasonErrorMessage = (reason.trim().length) ? '' : 'Enter reason';
  //     setReasonError(reasonErrorMessage);
  // },[reason]);

  const isSaveButtonEnabled = reason.trim().length > 0;

  const handleChange = (event:any) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 3000) {
      // Check if input doesn't exceed 3000 characters
      setReason(inputValue);
      setReasonError('');
    } else {
      setReasonError('Cannot exceed 3000 characters');
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '27px',
        flexDirection: 'column',
        zIndex:2
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          paddingBottom: '27px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '19.5px',
            textAlign: 'left',
            width: '100%',
            color: '#333',
          }}
        >
          Are you sure you want to reject  {' '}
          <span style={{ color: '#E20B18', textTransform: 'capitalize'}}>
            {assetTitle}
          </span>{' '}
          ?
        </Typography>
        <div>
          <ZupotsuTextfield
            handleChange={handleChange}
            value={reason}
            name="reason"
            errorMessage={reasonError}
            title={'Please enter the reason'}
            placeholder={'Enter Reason'}
            isRequired={true}
            multiline={true}
            rows={4}
            description='3000 character limit'
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '10px',
          justifyContent: 'center',
          gap: '16px',
          flexDirection: 'row',
          borderTop: '1px solid  #E0E0E0',
          width: '100%',
        }}
      >
        <div>
          <ZupotsuButton
            name="Cancel"
            handleClick={() => {
              buttonClicked('cancel');
            }}
            isCustomColors={true}
            variant={'outlined'}
            customTextColor="#828282"
            customBgColorOnhover="#fff"
            customBgColor="#fff"
            customTextColorOnHover="#E20B18"
            customOutlineColor={'1px solid #E0E0E0'}
            customOutlineColorOnHover={'1px solid #E20B18'}
            padding={deviceType != 'mobile' ? '12px 53px' : '12px 16px'}
          />
        </div>
        <div>
          <ZupotsuButton
            name="Reject"
            handleClick={() => {
              buttonClicked('reject', { reason: reason }, assetTitle, assetId);
            }}
            isCustomColors={true}
            customTextColor="#fff"
            customBgColor="#E20B18"
            customBgColorOnhover={'#a9141d'}
            customTextColorOnHover={'white'}
            padding={deviceType != 'mobile' ? '12px 60px' : '12px 16px'}
            disabled={!isSaveButtonEnabled}
          />
        </div>
      </div>
    </div>
  );
}
export default AssetPopupView;
