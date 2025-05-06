import ZupotsuDatePicker from '../../Atoms/zupotsu-date-picker/zupotsu-date-picker';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import { memo, useState } from 'react';
import AssetPreview from './AssetPreview';
import ZupotsuMultiSelect from '../../Atoms/zupotsu-multiselect/zupotsu-multiselect';
import { DatePickerFieldsUtils, DropdownFieldsUtils, LiveContentPlatformUtils, MultiSelectFieldUtils, OthersSportUtils, TextBoxFieldUtils, dynamicDropdownFieldStyle, dynamicFieldParentStyle, dynamicFieldStyle, iDynamicFieldsUtils, dynamicFieldStyle2 } from '../../utils/constants';
import { DynamicTextFieldUtil, DynamicTextFieldUtilMulti } from '../../utils/constantComponents';
import { ZupotsuAutoComplete } from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete';
import SocialHandle from './SocialHandle';
import React from 'react';
import { Checkbox, TextField } from '@mui/material';
import ZupotsuRadioButton from '../../Atoms/zupotsu-radio-button/zupotsu-radio-button';
import CheckboxList from '../../Atoms/zupotsu-checkbox';
import { ZupotsuAutoCompleteMulti } from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete-multi';
import ZupotsuRadioButton2 from '../../Atoms/zupotsu-radio-button/zupotsu-radio-button2';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// type TextBoxField = TextBoxFieldUtils;
// type OthersSport = OthersSportUtils;
// type LiveContentPlatform = LiveContentPlatformUtils;
// type DropdownFields = DropdownFieldsUtils;
// type DatePickerFields = DatePickerFieldsUtils;
// type MultiSelectField = MultiSelectFieldUtils;

const isFullWidthComponent = (type: string) => {
  return type === 'socialHandles' || type === 'textarea' || type == "dateRangePicker"
  // || type === 'checkBox';
};

const DynamicFields2 = ({
  deviceType,
  fields,
  handleInputChange,
  handleInputChange2,
  metaData,
  formData,
  errors,
  previewMode,
  onChangeSocial,
  socialLinks,
  handleInputChange3,
  handleInputChange4,
  opindex,
  formData2
}: any) => {

  // iDynamicFieldsUtils

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
  const [selectedTime, setSelectedTime] = useState<string>('12:00');
  const [selectSportMul, setSelectSportMul] = useState<string[]>([]);

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time || '');
  };

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleAutoCompleteChange = (event: { target: { name: string; value: string[] } }) => {
    setSelectedValues(event.target.value);
  };


  return (
    <div
      style={dynamicFieldStyle()}
    >
      {fields.map(
        (data: any, index: any) => {

          const isFullWidth = deviceType === 'mobile' ? true : isFullWidthComponent(data.type);

          return (
            <div key={index} style={dynamicFieldStyle2(data, isFullWidth)}>
              {
                  data.type === 'text' ? (
                <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                  {
                    <DynamicTextFieldUtil
                      data={data}
                      errors={errors}
                      formData={formData2[opindex]}
                      previewMode={previewMode}
                      handleInputChange={(e) => handleInputChange4(e.target.value, data, opindex)}
                      type={"text"}
                    />
                  }
                </div>
              ) : data.type === 'email' ? (
                <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                  {
                    <DynamicTextFieldUtil
                      data={data}
                      errors={errors}
                      formData={formData2[opindex]}
                      previewMode={previewMode}
                      handleInputChange={(e) => handleInputChange4(e.target.value, data, opindex)}
                      type={"email"}
                    />
                  }
                </div>
              ) : data.type === 'phoneNumber' ? (
                <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                  {
                    <DynamicTextFieldUtil
                      data={data}
                      errors={errors}
                      formData={formData2[opindex]}
                      previewMode={previewMode}
                      handleInputChange={(e) => handleInputChange4(e.target.value, data, opindex)}
                      type={"phone"}
                    />
                  }
                </div>
              ) : data.type === 'number' ? (
                <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                  {
                    <DynamicTextFieldUtil
                      data={data}
                      errors={errors}
                      formData={formData2[opindex]}
                      previewMode={previewMode}
                      handleInputChange={(e) => handleInputChange4(e.target.value, data, opindex)}
                      type={"tel"}
                    />
                  }
                </div>
              ) : data.type === 'textarea' ? (
                <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                  {
                    <DynamicTextFieldUtilMulti
                      data={data}
                      errors={errors}
                      formData={formData2[opindex]}
                      previewMode={previewMode}
                      handleInputChange={(e) => handleInputChange4(e.target.value, data, opindex)}
                      type={"text"}
                    />
                  }
                </div>
              ) : (data.type === 'dropdown') ? (
                <div style={dynamicDropdownFieldStyle(previewMode, formData, data)}>
                  {/* {data?.label=="Display Rate On Catalogue"&&( */}
                  <ZupotsuAutoComplete
                    title={data?.label}
                    placeholder={data?.placeholder || ''}
                    isRequired={(data?.label == "Display Rate On Catalogue" ? 
                    formData2[opindex].PCB=="Yes" ? false : true 
                    : data?.isRequired)}                    
                    name={data?.field}
                    toolTipMessage={data?.info}
                    dropdownData={data?.dropdownData}
                    handleChange={(e) => handleInputChange4(e.target.value, data, opindex)}
                    previewMode={(data?.label == "Display Rate On Catalogue" ? 
                    formData2[opindex].PCB=="Yes" ? true : false 
                    : previewMode)}      
                    freeSolo={false}
                    value={formData2[opindex][data.label] || ''}
                  />
                  {/* )} */}
                </div>
              ) : data.type === 'datePicker' ? (
                <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['SingleInputDateRangeField']}>
                      <MobileDatePicker defaultValue={dayjs('2022-04-17')} disabled={previewMode} />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              ) : data.type === 'timePicker' ? (
                <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                  <DynamicTextFieldUtil
                    data={data}
                    errors={errors}
                    formData={formData2[opindex]}
                    previewMode={previewMode}
                    handleInputChange={(e) => handleInputChange4(e.target.value, data, opindex)}
                    type={"time"}
                  />
                </div>
              ) : data.type === 'dateRangePicker' ? (
                <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '49%' }}>
                      <DynamicTextFieldUtil
                        data={{ ...data, label: data.label + " From" }}
                        errors={errors}
                        formData={formData2[opindex]}
                        previewMode={previewMode}
                        handleInputChange={(e) => handleInputChange4(e.target.value, { ...data, label: data.label + " From" }, opindex)}
                        type={"date"}
                      />
                    </div>
                    <div style={{ marginLeft: '30px', width: '49%' }}>
                      <DynamicTextFieldUtil
                        data={{ ...data, label: data.label + " To" }}
                        errors={errors}
                        formData={formData2[opindex]}
                        previewMode={previewMode}
                        handleInputChange={(e) => handleInputChange4(e.target.value, { ...data, label: data.label + " To" }, opindex)}
                        type={"date"}
                      />
                    </div>
                  </div>
                </div>
              ) :  data.type === 'multipleDropdown' ? (
                    <div style={{
                      ...dynamicFieldParentStyle(previewMode, formData, data),
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      width: '100%'
                    }}>
                      {/* <ZupotsuMultiSelect
                title={data?.label}
                dropdownData={
                  metaData?.[data?.metaDataField] || data?.dropdownData
                }
                name={data?.field}
                isRequired={data.isRequired}
                placeholder={data?.placeholder || ''}
                value={formData?.[data.field] || []}
                handleChange={(e)=>handleInputChange4(e.target.value,data,index)}
                previewMode={previewMode}
              /> */}
                      {/* <ZupotsuAutoCompleteMulti
                title={data.label}
                isRequired={data.isRequired}
                name={data.label}
                placeholder={data?.placeholder || ''}
                dropdownData={data?.dropdownData} 
                value={selectSportMul || []}
                handleChange={(e)=>{
                  handleInputChange4(e,data,index)
                }}
                previewMode={false}
                freeSolo={true}
              /> */}

                      <ZupotsuMultiSelect
                        title={data.label}
                        isRequired={data.isRequired}
                        name={data.label}
                        placeholder={data?.placeholder || ''}
                        dropdownData={data?.dropdownData}
                        value={formData[data.label]}
                        handleChange={(e) => {
                          handleInputChange4(e, data, opindex)
                        }}
                        previewMode={false}
                      />
                    </div>
              ) : data.type === 'socialHandles' ? (
                <SocialHandle
                  deviceType={deviceType}
                  formData={formData2[opindex]}
                  errors={errors}
                  handleInputChange={(e: any) => {
                    handleInputChange4(e, data, opindex)
                  }}
                  onChangeSocial={onChangeSocial}
                  socialLinks={socialLinks}
                  previewMode={false}
                />
              ) : data.type === 'radioButton' ? (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      fontStyle: 'Inter',
                      fontWeight: '600',
                      margin: 0,
                      marginBottom: '0px',
                      marginTop: '-5px'
                    }}
                  >
                    <span
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: "21px",
                        fontStyle: 'Inter',
                        fontWeight: '600',
                      }}
                    > {data?.label}</span>
                    {data?.isRequired && (
                      <span
                        style={{
                          color: 'var(--Zupotso-Primary, #E20B18)',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: '700',
                          lineHeight: '140%',
                          margin: 0
                        }}
                      >
                        *
                      </span>
                    )}
                  </div>

                  <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
                    {data?.dropdownData.map((items: any, index: any) => (
                      <ZupotsuRadioButton2
                        key={index}
                        data={items}
                        opindex={opindex}
                        selected={formData2[opindex] ? formData2[opindex][data.label] : []}
                        isHintAvailable={false}
                        handleChange={(e: any) => handleInputChange4(e, data, opindex)}
                        disabled={false}
                      />
                    ))}
                  </div>
                </div>
              ) : data.type === 'checkBox' ? (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      fontStyle: 'Inter',
                      fontWeight: '600',
                      margin: 0,
                    }}
                  >
                    <span
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: "21px",
                        fontStyle: 'Inter',
                        fontWeight: '600',
                      }}
                    > {data?.label}</span>
                    {data?.isRequired && (
                      <span
                        style={{
                          color: 'var(--Zupotso-Primary, #E20B18)',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: '700',
                          lineHeight: '140%',
                          margin: 0
                        }}
                      >
                        *
                      </span>
                    )}
                  </div>
                  {/* <CheckboxList  data={data.dropdownData} label={data.label} handleInputChange={(e:any)=>handleInputChange4(e.target.value,data,index)} /> */}
                  <CheckboxList
                    data={data.dropdownData}
                    label={data.label}
                    handleInputChange={(e) => handleInputChange4(e, data, opindex)}
                    checked={formData2[opindex] ? formData2[opindex][data.label] : []}
                  />
                </div>
              ) :
              (
                <></>
              )}
            </div>
          )
        }
      )}
    </div>
  );
};

export default memo(DynamicFields2);
