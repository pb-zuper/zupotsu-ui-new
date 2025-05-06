import ZupotsuDatePicker from '../../Atoms/zupotsu-date-picker/zupotsu-date-picker';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import { memo, useEffect, useRef, useState } from 'react';
import AssetPreview from './AssetPreview';
import ZupotsuMultiSelect from '../../Atoms/zupotsu-multiselect/zupotsu-multiselect';
import { DatePickerFieldsUtils, DropdownFieldsUtils, LiveContentPlatformUtils, MultiSelectFieldUtils, OthersSportUtils, TextBoxFieldUtils, dynamicDropdownFieldStyle, dynamicFieldParentStyle, dynamicFieldStyle, iDynamicFieldsUtils, dynamicFieldStyle2 } from '../../utils/constants';
import { DynamicDateFieldUtil, DynamicTextFieldUtil, DynamicTextFieldUtilMulti } from '../../utils/constantComponents';
import { ZupotsuAutoComplete } from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete';
import SocialHandle from './SocialHandle';
import React from 'react';
import { Checkbox, TextField, Typography } from '@mui/material';
import ZupotsuRadioButton from '../../Atoms/zupotsu-radio-button/zupotsu-radio-button';
import CheckboxList from '../../Atoms/zupotsu-checkbox';
import { ZupotsuAutoCompleteMulti } from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete-multi';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import './datepicker.css'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ZupotsuTooltip from '../../Atoms/zupotsu-tooltip/zupotsu-tooltip';
import MultiMonthPicker from '../../Atoms/MultimonthPicker/MultiMonthPicker';
import { infoCircle } from '../../assets';
import MobileDatePicker from '@mui/lab/MobileDatePicker';


import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Apis from '../../services/apis';

const isFullWidthComponent = (type: string) => {
  return type === 'socialHandles' || type === 'textarea' || type == "dateRangePicker" || type == "section"
  // || type === 'checkBox';
};

const DynamicFields = ({
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
  handleInputChangeDatePicker
}: any) => {

  // iDynamicFieldsUtils

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
  const [selectedTime, setSelectedTime] = useState<string>('12:00');
  const [selectSportMul, setSelectSportMul] = useState<string[]>([]);
  const [allData,SetallData] = useState<any>([])
  const [allOrgs,SetallOrgs] = useState<any>([])
  const [allcountry,SetallCountry] = useState<any>([])
  const [allState,SetallState] = useState<any>([])
  const [allcities,Setallcities] = useState<any>([])
  const [hostcities,Sethostcities] = useState<any>([])
  const [hostCountries,SethostCountries] = useState<any>([])
  const isSeller = (localStorage.getItem("role")?.toLowerCase() === "seller") ? true : false;
  const isSellerAdmin = (localStorage.getItem("role")?.toLowerCase() === "seller-admin") ? true : false;

  const dateInputRef = useRef<HTMLInputElement>(null);
  const apis = new Apis();
  const [load, setLoad] = useState<any>(false)

  const handleClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.click();
    }
  };

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time || '');
  };

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleAutoCompleteChange = (event: { target: { name: string; value: string[] } }) => {
    setSelectedValues(event.target.value);
  };

  const containerStyle = {
    backgroundColor: 'transparent',
    borderRadius: '8px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const datePickerStyle = {
    width: '100%',
    borderRadius: '4px',
  };

  

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoad(true);
        const response = await apis.getCountries();
        const data = response.data.data || [];
        SetallData(data);
        const countryNames = data.map((item: any) => item.country);
        SethostCountries(countryNames)
        SetallCountry(countryNames);
        setLoad(false);
      } catch (error) {
        // console.error("Error fetching countries:", error);
        setLoad(false);
      }
    };

    const getOrgs = async () => {
      if(isSeller || isSellerAdmin)
      {
        SetallOrgs([localStorage.getItem("org")])
      }
      else{ 
          try {
            setLoad(true);
            const response = await apis.getAllOrgs();
            const data = response.data.data || [];
            let arr:any = []
            data.map((item:any)=>{
              arr.push(item.name)
            })
            SetallOrgs(Array.from(new Set(arr)))
            setLoad(false);
          } catch (error) {
            // console.error("Error fetching countries:", error);
            setLoad(false);
          }
       }
    };

    fetchCountries();
    getOrgs()
  }, []);

  useEffect(() => {
    setLoad(true);
    if (Array.isArray(formData['Country']) && formData['Country'].length > 0) {
      let selectedStates: any[] = [];
      let selectedCities: any[] = [];

      formData['Country'].forEach((selectedCountry: string) => {
        const selectedCountryData = allData.find(
          (ctry: any) => ctry.country?.toLowerCase() === selectedCountry?.toLowerCase()
        );

        if (selectedCountryData) {
          selectedStates = [...selectedStates, ...selectedCountryData.states];
          selectedCities = [...selectedCities, ...selectedCountryData.cities];
        }
      });

      SetallState(Array.from(new Set(selectedStates)));
      Setallcities(Array.from(new Set(selectedCities)));
    } else {
      SetallState([]);
      Setallcities([]);
    }
    setLoad(false);
  }, [formData['Country'], allData]);


  useEffect(() => {
    setLoad(true);
  
    if (Array.isArray(formData['Host Countries']) && formData['Host Countries'].length > 0) {
      let selectedHostCities: any[] = [];
  
      formData['Host Countries'].forEach((selectedCountry: string) => {
        const selectedCountryData = allData.find(
          (ctry: any) => ctry.country?.toLowerCase() === selectedCountry?.toLowerCase()
        );
  
        if (selectedCountryData) {
          selectedHostCities = [...selectedHostCities, ...selectedCountryData.cities];
        }
      });
  
      Sethostcities(Array.from(new Set(selectedHostCities)));
    } else {
      Sethostcities([]);
    }
  
    setLoad(false);
  }, [formData['Host Countries'], allData]);




  


  if (load) {
    return (
      <div className="centered-container">
        <div className="loader"></div>
      </div>
    )
  }
  else{
    return (
      <div
        style={dynamicFieldStyle()}
      >

        {fields.map(
          (data: any, index: any) => {

            const isFullWidth = deviceType === 'mobile' ? true : isFullWidthComponent(data.type);
            // if(data.type === "multiMonthPicker"){
            //   console.log("data.type === multiMonthPicker", data.label,"",formData[data.label.replace(/[^a-zA-Z0-9]/g, ' ')])
            //   console.log("formData",formData)
            //   console.log("console.log",formData[data.label])
            // }
            
            if(data.is_hidden)
            {
              return
            }
            else{ 
              return (
                <div key={index} style={dynamicFieldStyle2(data, isFullWidth)}>

                  {
                    (data?.type === 'section') ? (
                      <div
                        //  style={{ width: "95%", display: "flex", flexDirection: 'column', alignItems: "flex-start" }}
                        style={dynamicFieldParentStyle(previewMode, formData, data)}
                      >

                        <Typography
                          style={{
                            color: 'var(--Gray-1, #333)',
                            fontFamily: 'Inter',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            lineHeight: '21px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            fontWeight: '600',
                            margin: '10px',
                            marginTop: '20px',
                          }}
                        >

                          <span
                            style={{
                              margin: 0,
                              // fontSize: '21px',
                              // lineHeight: "21px",
                              // fontStyle: 'Inter',
                              // fontWeight: '600',
                              fontFamily: "Bebas Neue",
                              fontWeight: '400',
                              fontSize: '20px',
                              lineHeight: '30px',
                              color: 'red'
                              // margin: "10px",
                            }}
                          > {data.label}</span>

                        </Typography>
                        <div
                          style={{
                            width: '100%',
                            marginBottom: '20px',
                            height: '1px',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                          }}
                        />

                      </div>
                    ) : data.type === "multiMonthPicker" ? (
                      <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start", justifyContent: "flex-start" }}>
                        <Typography
                          style={{

                            color: 'var(--Gray-1, #333)',
                            fontFamily: 'Inter',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            lineHeight: '21px',
                            display: 'flex',
                            flexDirection: 'column',
                            fontWeight: '600'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',

                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                fontStyle: 'Inter',
                                fontWeight: '600',
                                margin: 0
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
                              > {data.label}</span>
                              {data.isRequired && (
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
                              <span
                                style={{
                                  paddingLeft: '8px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                {data?.info && (
                                  <ZupotsuTooltip
                                    tooltipMessage={data?.info}
                                    icon={infoCircle}
                                  />
                                )}
                              </span>


                            </div>

                          </div>

                        </Typography>
                        <div style={{ width: "100%", display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
                          <MultiMonthPicker
                            placeholder={data?.placeholder}
                            tooltip={data?.tooltip}
                            value={formData[data.label.replace(/[^a-zA-Z0-9]/g, ' ')]}
                            preview={false}
                            name={data?.attribute_name}
                            handleInputChange={(e: any) => {
                              let str = ""
                              e.map((item: any) => {
                                str = str + item + ","
                              })
                              handleInputChange3(e, data)
                            }}
                            is_mandatory={data?.isRequired}
                          />

                        </div>
                      </div>
                    ) : data.type === 'text' ? (
                      <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                        {
                          <DynamicTextFieldUtil
                            data={data}
                            errors={errors}
                            formData={formData}
                            previewMode={previewMode}
                            handleInputChange={(e) => handleInputChange2(e, data)}
                            type={"text"}
                          />
                        }
                      </div>
                    ) :
                      data.type === 'email' ? (
                        <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                          {
                            <DynamicTextFieldUtil
                              data={data}
                              errors={errors}
                              formData={formData}
                              previewMode={previewMode}
                              handleInputChange={(e) => handleInputChange2(e, data)}
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
                              formData={formData}
                              previewMode={previewMode}
                              handleInputChange={(e) => handleInputChange2(e, data)}
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
                              formData={formData}
                              previewMode={previewMode}
                              handleInputChange={(e) => handleInputChange2(e, data)}
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
                              formData={formData}
                              previewMode={previewMode}
                              handleInputChange={(e) => handleInputChange2(e, data)}
                              type={"text"}
                            />
                          }
                        </div>
                      ) : (data.type === 'dropdown') ? (
                        <div style={dynamicDropdownFieldStyle(previewMode, formData, data)}>
                          <ZupotsuAutoComplete
                            title={data?.label}
                            placeholder={data?.placeholder || ''}
                            isRequired={data?.isRequired}
                            name={data?.field}
                            toolTipMessage={data?.info}
                            value={formData[data.label.trim()] || ""}
                            dropdownData=
                            {
                              // (data?.label?.toLowerCase()=="country")?
                              //   allcountry?allcountry:[]
                              // :
                              // (data?.label?.toLowerCase()=="state")?
                              //   allState?allState:[]
                              // :
                              // (data?.label?.toLowerCase()=="city")?
                              //   allcities?allcities:[]
                              // :
                              (data?.label?.toLowerCase()=="represented by")?
                                allOrgs?allOrgs:[]
                              :
                                data?.dropdownData
                            }
                            handleChange={(e) => {
                              handleInputChange3(e.target.value, data);
                              let sel = allData.filter((ctry:any)=>ctry.country==e.target.value)
                              if(sel.length)
                              {
                                  SetallState(sel[0].states);
                                  Setallcities(sel[0].cities);
                              }
                            }}
                            previewMode={previewMode}
                            freeSolo={true}
                          />
                        </div>
                      ) : data.type === 'datePicker' ? (
                        <div style={{ ...dynamicFieldParentStyle(previewMode, formData, data), display: 'flex', flexDirection: "column", alignItems: 'flex-start', border: "0px solid transparent" }} >
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
                              marginBottom:'10px'
                            }}
                          >
                            <div>
                              {data?.label}
                              {data?.isRequired && (
                                <span
                                  style={{
                                    color: 'var(--Zupotso-Primary, #E20B18)',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: '140%',
                                    gap:'5px'
                                  }}
                                >
                                  *
                                </span>
                              )}
                              {data?.info && (
                                <ZupotsuTooltip
                                  tooltipMessage={data?.info}
                                  icon={infoCircle}
                                />
                              )}
                            </div>
                          </Typography>


                          
                          {/* <TextField
                            multiline={false}
                            size="small"
                            fullWidth
                            name={data?.field}
                            sx={{
                              width: '100%',
                              height: '40px',
                              '& .MuiInputBase-root': {
                                height: '40px',
                              },
                              marginTop: '10px',
                            }}
                            placeholder={data?.placeholder || ''}
                            value={formData[data?.label]?.split("T")[0]}
                            onKeyDown={(e) => { e.preventDefault() }}
                            disabled={previewMode}
                            id="fullWidth"
                            type={"date"}
                            onChange={(e: any) => handleInputChange2(e, data)}
                          /> */}

                          <DatePicker
                            selected={formData[data?.label]}
                            onChange={(e: any) => handleInputChangeDatePicker(e, { ...data, label: data.label})}
                            placeholderText={data?.placeholder || ''}
                            className="form-control"
                            id="fecha1"
                            name={data.label}
                            title={data.label}
                            dateFormat="dd-MM-yyyy"
                            isClearable
                          />

                        </div>
                      ) : data.type === 'timePicker' ? (
                        <div style={dynamicFieldParentStyle(previewMode, formData, data)}>
                          <DynamicTextFieldUtil
                            data={data}
                            errors={errors}
                            formData={formData}
                            previewMode={previewMode}
                            handleInputChange={(e) => handleInputChange2(e, data)}
                            type={"time"}
                          />
                        </div>
                      ) :
                        data.type === 'dateRangePicker' ? (
                          <div style={{ ...dynamicFieldParentStyle(previewMode, formData, data), display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start' }}>

                            <div style={{ width: '48%', marginTop: '10px', display: 'flex', flexDirection: "column", alignItems: 'flex-start', justifyContent: "flex-start" }}>




                              {/* <DatePicker
                                disabled={previewMode}
                                selected={formData[data.label + " From"]}
                                // onChange={(e: any) => handleInputChangeDatePicker(e, data)}
                                onChange={(e: any) => handleInputChangeDatePicker(e, { ...data, label: data.label + " From" })}
                                placeholderText={data?.placeholder || ''}
                                onKeyDown={(e: any) => { e.preventDefault() }}
                                className="form-control"
                                id="fecha1"
                                name={data.label + " From"}
                                title={data.label + " From"}
                              />  */}
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
                                  {data.label + " From"}
                                  {data?.isRequired && (
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
                                   {data?.info && (
                                      <ZupotsuTooltip
                                        tooltipMessage={data?.info}
                                        icon={infoCircle}
                                      />
                                    )}
                                </div>
                              </Typography>



                              <div style={{ width: "100%", marginTop: '10px', display: 'flex', flexDirection: "column", alignItems: 'flex-start', justifyContent: "flex-start", }}>

                                <DatePicker
                                  selected={formData[data?.label + " From"]}
                                  onChange={(e: any) => handleInputChangeDatePicker(e, { ...data, label: data.label + " From" })}
                                  placeholderText={data?.placeholder || ''}
                                  // onKeyDown={(e: any) => { e.preventDefault() }}
                                  className="form-control"
                                  id="fecha1"
                                  name={data.label + " From"}
                                  title={data.label + " From"}
                                  dateFormat="dd-MM-yyyy"
                                  isClearable
                                />
                                
                              </div>
                            </div>
                            <div style={{ width: '48%', marginTop: '10px', display: 'flex', flexDirection: "column", alignItems: 'flex-start', justifyContent: "flex-start" }}>

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
                                  {data.label + " To"}
                                  {data?.isRequired && (
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



                              <div style={{ width: "100%", marginTop: '10px', display: 'flex', flexDirection: "column", alignItems: 'flex-start', justifyContent: "flex-start", }}>

                                <DatePicker
                                  // selected={formData[data?.label + " To"]}
                                  selected={formData[data?.label + " To"]}
                                  onChange={(e: any) => handleInputChangeDatePicker(e, { ...data, label: data.label + " To" })}
                                  placeholderText={data?.placeholder || ''}
                                  // onKeyDown={(e: any) => { e.preventDefault() }}
                                  className="form-control"
                                  id="fecha1"
                                  name={data.label + " To"}
                                  title={data.label + " To"}
                                  dateFormat="dd-MM-yyyy"
                                  isClearable
                                />
                              </div>

                            </div>

                          </div>
                      ) :
                      data.type === 'multipleDropdown' ? (
                        <div style={{
                          ...dynamicFieldParentStyle(previewMode, formData, data),
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          width: '100%'
                        }}>
                        <ZupotsuMultiSelect
                            toolTipMessage={data?.info}
                            title={data.label}
                            isRequired={data.isRequired}
                            name={data.label}
                            placeholder={data?.placeholder || ''}

                            dropdownData={
                              (data?.label?.toLowerCase()=="country")?
                                allcountry?allcountry:[]
                              :
                              (data?.label?.toLowerCase()=="state")?
                                allState?allState:[]
                              :
                              (data?.label?.toLowerCase()=="city")?
                                allcities?allcities:[]
                              :
                              (data?.label?.toLowerCase()=="host countries")?
                                hostCountries?hostCountries:[]
                              :
                              (data?.label?.toLowerCase()=="host cities")?
                                hostcities?hostcities:[]
                              :
                                data?.dropdownData
                            }
                            value={formData[data.label]}
                            handleChange={(e) => {
                              handleInputChange3(e, data)
                            }}
                            previewMode={false}
                          />
                        </div>
                      ) : data.type === 'socialHandles' ? (
                        <SocialHandle
                          deviceType={deviceType}
                          formData={formData}
                          errors={errors}
                          handleInputChange={(e: any) => {
                            handleInputChange3(e, data)
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
                              {data?.info && (
                              <ZupotsuTooltip
                                tooltipMessage={data?.info}
                                icon={infoCircle}
                              />
                            )}
                          </div>

                          <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap', }}>
                            {data?.dropdownData.map((items: any, index: any) => (
                              <ZupotsuRadioButton
                                key={index}
                                data={items}
                                selected={formData[data.label]}
                                isHintAvailable={false}
                                handleChange={(e: any) => handleInputChange3(e, data)}
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
                            {data?.info && (
                              <ZupotsuTooltip
                                tooltipMessage={data?.info}
                                icon={infoCircle}
                              />
                            )}
                          </div>
                          {/* <CheckboxList  data={data.dropdownData} label={data.label} handleInputChange={(e:any)=>handleInputChange2(e,data)} /> */}
                          <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
                            <CheckboxList
                              data={data.dropdownData}
                              label={data.label}
                              handleInputChange={(e) => handleInputChange3(e, data)}
                              checked={formData[data.label]}
                            />
                          </div>
                        </div>
                      ) :
                        (
                          <></>
                        )}
                </div>
              )
            }
          }
        )}
      </div>
    );
  }
};

export default memo(DynamicFields);
