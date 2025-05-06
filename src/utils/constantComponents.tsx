import ZupotsuTextfield from '../Components/Settings/ZupotsuTextfield';
import ZoptsuUnderlineTitle from '../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
import useDeviceType from './DeviceType';
import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import './datepicker.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export const OppTextUnderlineUtil = () => {
  const deviceType = useDeviceType();
  return (
    <ZoptsuUnderlineTitle
      fontSizeOnLargeScreen="48px"
      fontSizeOnMediumScreen="46px"
      fontSizeOnSmallScreen="44px"
      fontSizeOnExtraSmallScreen="32px"
      titleText="Opportunities"
      letterSpacing="1.92px"
      lineHeight="67.2px"
      textAlign="start"
      underlineWidthForDesktop="258px"
      underlineWidthForSmallTablet="240px"
      underlineWidthForMobile="182px"
      underlineBottomForDesktop="18%"
      underlineBottomForSmallTablet="21%"
      underlineBottomForMobile="31%"
      linearGradientPresent={true}
      paddingLeft={deviceType === 'mobile' ? '2px' : '3px'}
      underlineHeight="9px"
    />
  );
}


export const ConditionalSponsorshipDetail = ({ isClicked, oppurtunityData }: any) => {
  const selectedItem = oppurtunityData.find((item: any) => item._id === isClicked);

  if (isClicked && selectedItem) {
    return (
      // <SponsorshipDetail
      //   isAdmin={true}
      //   {...selectedItem}
      //   isTermsAndConditionFile={
      //     selectedItem.termsAndConditionFilesToggle || false
      //   }
      //   getInTouchButtonClicked={() => {}}
      // />
      <></>
    );
  }

  return null; // Render nothing if no item is clicked or item not found
};

interface DynamicTextFieldUtilProps {
  data: any;
  formData: any;
  previewMode: boolean;
  errors: any;
  type: any;
  hideLabel?: any
  handleInputChange: (_: any) => void;
}

export const DynamicTextFieldUtil = ({
  data,
  formData,
  previewMode,
  errors,
  handleInputChange,
  type
}: DynamicTextFieldUtilProps) => {

  return (
    <ZupotsuTextfield
      title={data.label}
      name={data.label}
      toolTipMessage={data.info}
      value={formData[data.label]?formData[data.label]:""}
      isRequired={data.isRequired}
      placeholder={data.placeholder || ''}
      errorMessage={errors[data.label] && errors[data.label]}
      handleChange={handleInputChange}
      previewMode={previewMode}
      maxLength={data.maxLength}
      type={type}
    />
  );
};

export const DynamicDateFieldUtil = ({
  data,
  formData,
  previewMode,
  errors,
  handleInputChange,
  type
}: DynamicTextFieldUtilProps) => {

  return (
    <>
      <Typography
        sx={{
          color: 'var(--Gray-1, #333)',
          fontFamily: 'Inter',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: "21px",
          fontStyle: 'Inter',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div>
          {data?.label}
          {data?.is_mandatory && (
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
          )}
        </div>
      </Typography>
      {/* <ZupotsuTextfield
        title={data.label}
        name={data.label}
        toolTipMessage={data.info}
        value={formData[data.label]}
        isRequired={data.isRequired}
        placeholder={data.placeholder || ''}
        errorMessage={errors[data.label] && errors[data.label]}
        handleChange={handleInputChange}
        previewMode={previewMode}
        maxLength={data.maxLength}
        type={type}
      /> */}
      {/* <DatePicker
        disabled={previewMode}
        selected={formData[data.label]}
        onChange={handleInputChange}
        placeholderText={data?.placeholder || ''}
        onKeyDown={(e: any) => { e.preventDefault() }}
        className="form-control"
        id="fecha1"
        name={data.label}
        title={data.label}
      /> */}
      <div style={{ width: "100%", marginTop: '10px', display: 'flex', flexDirection: "column", alignItems: 'flex-start', justifyContent: "flex-start", }}>
        <DatePicker
          selected={formData[data?.label]}
          onChange={handleInputChange}
          placeholderText={data?.placeholder || ''}
          onKeyDown={(e: any) => { e.preventDefault() }}
          className="form-control"
          id="fecha1"

        />
      </div>
    </>
  );
};

export const DynamicTextFieldUtilMulti = ({
  data,
  formData,
  previewMode,
  errors,
  handleInputChange,
  type,
  hideLabel
}: DynamicTextFieldUtilProps) => {
  return (
    <ZupotsuTextfield
      multiline
      rows={4}
      title={data.label}
      hideLabel={hideLabel}
      name={data.label}
      toolTipMessage={data.info}
      value={formData[data.label]?formData[data.label]:""}
      isRequired={data.isRequired}
      placeholder={data.placeholder || ''}
      errorMessage={errors[data.label] && errors[data.label]}
      handleChange={handleInputChange}
      previewMode={previewMode}
      // maxLength={data.maxLength || 400}
      // maxLength={data.maxLength || 400}
      type={type}
    />
  );
};

// export  oppTextUnderlineUtil;
