import useDeviceType from './DeviceType';
import React, { CSSProperties } from 'react';

export const oppAccordionTitleStyle = {
  color: 'var(--dark-gray, #484949)',
  fontFamily: 'Bebas Neue',
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
  letterSpacing: '1.28px',
};

export const assetPrevAddMoreParentStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '10px',
  margin: '20px',
};

export const assetPrevAddMoreStyle: any = {
  color: 'var(--Zupotso-Primary, #E20B18)',
  textAlign: 'center',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '140%',
};

export const marginTop18px = {
  marginTop: '18px'
}

export const searchAndDatePickerParentStyle: any = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  alignItems: 'center',
  gap: '16px',
};

const tcToggleStyle = (): CSSProperties => {
  // const deviceType = useDeviceType();

  const dynamicStyle: CSSProperties = {
    display: 'flex',
    flexDirection:
      // deviceType === 'mobile' ? 'column' : 
      'row',
    gap: '20px',
    marginTop: '12px',
    justifyContent:
      // deviceType === 'mobile' ? 'start' :
      '',
    alignItems:
      // deviceType === 'mobile' ? 'start' :
      '',
  };

  return dynamicStyle;
};

export default tcToggleStyle;


export const imgUploadParentElStyle = (): CSSProperties => {
  // const deviceType = useDeviceType();

  const dynamicStyle: CSSProperties = {
    display: 'flex',
    gap: 
    // deviceType === 'mobile' ? '16px' :
     '30px',
    marginTop:
    //  deviceType === 'mobile' ? '16px' :
      '20px',
    flexWrap: 'wrap',
    justifyContent: 'start',
  };

  return dynamicStyle;
};

export const investmentFieldParentStyle = (): CSSProperties => {
  // const deviceType = useDeviceType();

  const dynamicStyle: CSSProperties = {
    width:
    //  deviceType === 'mobile' ? '65%' : 
     '80%',
  };

  return dynamicStyle;
};

export const oppUnderlineParentStyle = (path: any): CSSProperties => {
  // const deviceType = useDeviceType();

  const dynamicStyle: CSSProperties = {
    padding:
      // deviceType === 'mobile'
        // ? '30px 20px':
         '0px 80px 60px 80px',

    paddingTop: !path ? '20px' : '',
  };

  return dynamicStyle;
};

interface LinkItem {
  linkTitle: string;
  imgIcon: any; // Assuming icon is a URL or import path
  action: string; // Action associated with the link
}


export const linksArray = (icon: any) => {

  const dynamicStyle: LinkItem[] = [
    // {
    //   linkTitle: 'Audience Profile',
    //   imgIcon: audienceIcon,
    //   action: 'audience_profile',
    // },
    {
      linkTitle: 'Sales Pitch Deck',
      imgIcon: icon,
      action: 'presentation_deck',
    },
  ];

  return dynamicStyle;
};

export const sponsorshipParentStyle = (): CSSProperties => {

  const dynamicStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    borderRadius: '0px 8px 8px 8px',
    border: '2px solid #DEDEDE',
    padding: '14px',
  };

  return dynamicStyle;
};

// Dynamic fields

export type TextBoxFieldUtils = {
  type: 'text'|'textarea'|'phone number';
  info?: string;
  label: string;
  placeholder: string;
  field: string;
  isRequired: boolean;
  maxLength?: number;
};


export type OthersSportUtils = {
  type: 'othersForSport';
  info?: string;
  label: string;
  placeholder: string;
  field: string;
  isRequired: boolean;
  maxLength?: number;
};

export type LiveContentPlatformUtils = {
  type: 'platformForLiveContent';
  info?: string;
  label: string;
  field: string;
  placeholder: string;
  dropdownData?: any[];
  metaDataField: string;
  isRequired: boolean;
};

export type DropdownFieldsUtils = {
  type: 'dropdown' | 'freeSolo-dropdown' | 'drop down';
  info?: string;
  label: string;
  field: string;
  placeholder: string;
  dropdownData?: any[];
  metaDataField: string;
  isRequired: boolean;
  otherOptionPresent?: boolean;
  liveContentPlan?: boolean;
};

export type DatePickerFieldsUtils = {
  type: 'date-picker';
  label: string;
  field: string;
  isRequired: boolean;
};

export type MultiSelectFieldUtils = {
  type: 'multiSelectDropdown'|'multiple drop down';
  info?: string;
  label: string;
  field: string;
  placeholder: string;
  dropdownData?: any;
  metaDataField: any;
  isRequired: boolean;
};

export type FieldsData = Array<
  | TextBoxFieldUtils
  | DropdownFieldsUtils
  | DatePickerFieldsUtils
  | MultiSelectFieldUtils
  | OthersSportUtils
  | LiveContentPlatformUtils
>;

export interface iDynamicFieldsUtils {
  deviceType: string;
  fields: FieldsData;
  handleInputChange: (_: any) => void;
  metaData: any;
  formData: any;
  errors: any;
  previewMode: boolean;
  socialLinks:any;
  handleInputChange2:any;
  onChangeSocial?: (param: any, isValidationError: any) => void; 
}

export const dynamicFieldStyle = (): CSSProperties => {
  // const deviceType = useDeviceType();

  const dynamicStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 
    // deviceType === 'mobile' ? 'auto' :
     '1fr 1fr',
    gridColumnGap: '28px',
    gridRowGap:
    //  deviceType === 'mobile' ? '16px' : 
     '20px',
    // gridColumn: true? '1 / -1' : 'span 1',
    // display: true?'grid':'block',
  };

  return dynamicStyle;
};


export const dynamicFieldStyle2 = (data: any, isFullWidth: boolean): CSSProperties => {
  return {
    display: 'grid',
    // gridTemplateColumns: isFullWidth ? '1fr' : '1fr 1fr',
    gridColumn: isFullWidth ? '1 / -1' : 'auto',
    gridGap: '20px',
    gridColumnGap: '28px',
  };
};

export const dynamicDropdownFieldStyle = (
  previewMode: boolean,
  formData: any,
  data:
    | TextBoxFieldUtils
    | DropdownFieldsUtils
    | DatePickerFieldsUtils
    | MultiSelectFieldUtils
    | LiveContentPlatformUtils
    | OthersSportUtils
): CSSProperties => {
  // const deviceType = useDeviceType();

  const dynamicStyle: CSSProperties = {
    display:
      previewMode && !formData[data.field]
        ? 'none'
        // : deviceType === 'mobile'
          // ? 'block'
          : 'grid',
    gridTemplateColumns: formData[data.field] === 'Others' ? '1fr 1fr' : 'auto',
    gridGap: formData[data.field] === 'Others' ? '12px' : '',
    // gridColumn: true? '1 / -1' : 'span 1',
    // display: true?'grid':'block',
  };

  return dynamicStyle;
};





export const dynamicFieldParentStyle = (
  previewMode: boolean,
  formData: any,
  data:
    | TextBoxFieldUtils
    | DropdownFieldsUtils
    | DatePickerFieldsUtils
    | MultiSelectFieldUtils
    | LiveContentPlatformUtils
    | OthersSportUtils
): CSSProperties => {
  const dynamicStyle: CSSProperties = {
    display: previewMode && !formData[data.field] ? 'none' : '',
  };

  return dynamicStyle;
};

