import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, Grid, Snackbar, Typography } from '@mui/material';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';

import { useNavigate } from 'react-router';
import useDeviceType from '../../utils/DeviceType';
import ZupotsuImgUpload from '../../Molecules/zupotsu-img-upload/zupotsu-img-upload';
import Apis from '../../services/apis';
import DynamicFields from '../ListAsset/DynamicFields';
import { imgUploadParentElStyle } from '../../utils/constants';
import { GlobalContext } from '../../context/GlobalContext';
import { useSearchParams } from 'react-router-dom';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Loader from '../../loader/Loader';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
const PreviewForm: React.FC = () => {
  const [formState, setFormState] = React.useState<{ [key: string]: any }>({});
  const navigation = useNavigate();
  const deviceType = useDeviceType();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [selectSport, setSelectSport] = useState<any>("Cricket");
  const [description, setDescription] = useState<any>();
  const apis = new Apis()
  const [fileData, setFileData] = React.useState<any>({});
  const [fields, setFields] = useState([]);
  const [formData2, setFormData2] = useState<any>([]);
  const [formData, setFormData] = useState<any>([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [errors, setErrors] = useState<any>({});
  const [load, setLoad] = useState<any>(false)
  const [metaData, setMetaData] = useState<any>({});
  const imgUploadParElStyle: CSSProperties = imgUploadParentElStyle();
  const globalContext = useContext(GlobalContext);
  const [selectedValue, setSelectedValue] = useState<any>(1)
  const [selectSportMul, setSelectSportMul] = useState<any>(["Cricket", "Golf"])
  const [sportType, setSelectSportType] = useState('Single Sport');
  const [sellerId, setSellerId] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });


  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };






  const handleStep0 = async (
  ) => {
    setLoad(true)
    if (selectedValue && sportType && (selectSport || selectSportMul) && sellerId) {
      setFormData({})
      setSocialLinks([])
      apis.getFormByID(id)
        .then((response: any) => {
          let activeArr = response?.data?.data

          let arr: any = []
          activeArr?.template_details?.map((item: any) => {
            let asset: any = {};
            if (item.primary_attribute_id) {
              asset = {
                "priority": item.priority,
                "isPrimary": true,
                "type": item.primary_attribute.attribute_type || "",
                "info": item.primary_attribute.tooltip ? item.primary_attribute.tooltip : "",
                "label": item.primary_attribute.attribute_name ? item.primary_attribute.attribute_name : "",
                "field": 'typeField',
                "placeholder": item.primary_attribute.placeholder || "",
                "metaDataField": '',
                "isRequired": item.primary_attribute.is_mandatory || false,
                "maxLength": item.primary_attribute.max_length,
                "value": "",
                "attr_for": item.primary_attribute.primary_attr_for || ""
              }
              if (item.primary_attribute.attribute_type == "multipleDropdown" || item.primary_attribute.attribute_type == "dropdown") {
                asset["dropdownData"] = item.primary_attribute.option_values
              }
              if (item.primary_attribute.attribute_type == "checkBox" || item.primary_attribute.attribute_type == "radioButton") {
                let arr: any = []
                item.primary_attribute.map((item: any) => {
                  arr.push({
                    id: item,
                    label: item,
                  },)
                })
                asset["dropdownData"] = arr
              }
              arr.push(asset)

            }
            else {
              asset = {
                "priority": item.priority ,
                "isPrimary": false,
                "type": item.attribute_type || "",
                "info": item.tooltip,
                "label": item.attribute_name || "",
                "field": 'typeField',
                "placeholder": item.placeholder || "",
                "metaDataField": '',
                "isRequired": item.is_mandatory,
                "maxLength": item.max_length,
                "value": "",
                "attr_for": "asset_custom_attributes"
              }
              if (item.attribute_type == "multipleDropdown" || item.attribute_type == "dropdown") {
                asset["dropdownData"] = item.option_values
              }
              // || item.attribute_type == "radioButton"
              if (item.attribute_type == "checkBox" || item.attribute_type == "radioButton") {
                let arr: any = []
                item.option_values.map((item: any) => {
                  arr.push({
                    id: item,
                    label: item,
                  },)
                })
                asset["dropdownData"] = arr
              }
              arr.push(asset)
            }
          })

          arr.sort((a: any, b: any) => a.priority - b.priority);
          setFields(arr)
          setLoad(false)
          // setBackdrop(true);
          // setFormStatus(status);
          // tabControl(isTabControl);
          // if (activeStep == 0) {

          if (selectedValue && sportType && (selectSport || selectSportMul) && sellerId) {
            // setActiveStep((prevActiveStep) => prevActiveStep + 2);
          } else {
            setSnackbar({
              open: true,
              severity: 'error',
              message: 'Fill all values',
            });
          }

          // } else {
          // setActiveStep((prevActiveStep) => prevActiveStep + 1);
          // }
          globalContext?.onFormSubmitted();
          // setBackdrop(false);
          return true;
        }
          //   else {
          //     alert("No Form Found for the selected Combination!!")
          //   }

          // }

        )
        .catch((error) => {
          mixpanelEvents.errorHandling({
            name: 'Preview Form Page',
            msg: error?.response?.data?.error || error?.message
          })
          setSnackbar({
            open: true,
            severity: 'error',
            message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
          });
          setLoad(false)

        });
    }

  };


  useEffect(() => {
    const startTime = performance.now();

    const fetchAndTrack = async () => {
      await handleStep0()
      const loadTime = performance.now() - startTime;
      mixpanelEvents.onLoad(loadTime, 'Preview Form Page');
    };
    fetchAndTrack();
    return () => {
      const timeSpent = performance.now() - startTime;
      mixpanelEvents.onUnload('Preview Form Page', timeSpent);
    };
  }, [])






  const onChangeSocial = useCallback((param: any, isValidationError: any) => {
    // setUrlLinksError(isValidationError);
    setSocialLinks(param);
  }, []);


  const linkDetails = useMemo(() => [
    {
      label: 'Settings',
      url: '/settings',
    },
    {
      label: 'Forms',
      url: '/form_listing',
    },
    {
      label: 'Preview Form',
      url: '/previewform',
    },
  ], []);


  const handleFileChange = useCallback(
    (name: string, imageUrl: string, file: File | null) => {
      if (file) {
        setFormState((prevData) => ({
          ...prevData,
          [name]: { file, imageUrl },
        }));
      } else {
        setFormState((prev) => {
          const newFormState = { ...prev };
          delete newFormState[name];
          return newFormState;
        });
        console.error('No file selected');
      }
    },
    []
  );





  if (load) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: '45vh',
          left: '50%',
          position: 'absolute',
        }}
      >
        <Loader status={load} size={50} />
      </div>
    )
  }
  else {

    return (
      <Grid item xs={12} md={12} lg={12} style={{ height: '90vh', overflowY: "scroll", overflowX: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
            backgroundColor: 'rgb(250,250,250)',
            // marginBottom: "80px"
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

          <Grid xs={12} md={12} lg={12} width={"95%"} spacing={2} marginTop={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                backgroundColor: '#FFF',
                padding: "15px",
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Breadcrumb
                linkDetails={linkDetails}
                underline="always"
                maxItems={3}
                itemBeforeCollapse={1}
                itemAfterCollapse={1}
                iconName="arrow_forward_ios_black_24dp"
                iconSize={20}
                iconLabel="Breadcrumb-Arrow-Right"
                iconStyle="regular"
                color="#333"
                textColor="#333"
              />
            </Box>
          </Grid>
          <div style={{ marginTop: '10px', width: "95%", backgroundColor: '#FFF' }}>



            <div style={{ overflow: 'auto', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', padding: "2.5%", width: "100%", marginBottom: '40px', }} className="team-listing-scroll">
              <div style={{ width: '100%', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', paddingTop: "10px", paddingBottom: '15px', marginBottom: '20px', borderBottom: "1px solid #80808029" }}>
                <Typography
                  sx={{
                    fontFamily: "Bebas Neue",
                    fontWeight: '400',
                    fontSize: '20px',
                    lineHeight: '30px',
                    textAlign: "left"
                  }}
                >
                  FORM PREVIEW
                </Typography>
              </div>
              {(load) ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '45vh',
                    left: '50%',
                    position: 'absolute',
                  }}
                >
                  <Loader status={load} size={50} />
                </div>
              ) : (
                <DynamicFields
                  deviceType={deviceType}
                  fields={fields}
                  // handleInputChange={handleInputChange}
                  // handleInputChange2={handleInputChange2}
                  // handleInputChange3={handleInputChange3}
                  handleInputChange={() => { }}
                  handleInputChange2={() => { }}
                  handleInputChange3={() => { }}
                  handleInputChangeDatePicker={() => { }}
                  metaData={metaData}
                  formData={formData}
                  errors={errors}
                  previewMode={false}
                  onChangeSocial={onChangeSocial}
                  socialLinks={socialLinks}
                />
              )}



              <div style={{ ...imgUploadParElStyle, marginTop: '10px', marginBottom: '100px' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: deviceType === 'mobile' ? '14px' : '30px',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <ZupotsuImgUpload
                    uploadedImage={fileData?.logo?.imageUrl}
                    fileSize={'Max Size 5 MB'}
                    fileType={'jpg'}
                    name={'logo'}
                    imgCardLabel={
                      deviceType === 'mobile'
                        ? 'Upload Logo'
                        : 'Upload Logo'
                    }
                    uploadTitle={'Click to upload or Drag & Drop png/jpg here'}
                    setUploadedImage={handleFileChange}
                  />
                  <ZupotsuImgUpload
                    fileSize={'Max Size 10 MB'}
                    uploadedImage={fileData?.pitchDeckFile?.imageUrl}
                    fileType={'pdf'}
                    name={'pitchDeckFile'}
                    imgCardLabel={'Upload Pitch Deck'}
                    uploadTitle={'Click to upload or Drag & Drop pdf here'}
                    setUploadedImage={handleFileChange}
                  />
                  <ZupotsuImgUpload
                    fileSize={'Max Size 5 MB'}
                    uploadedImage={fileData?.thumbnail?.imageUrl}
                    fileType={'jpg'}
                    name={'thumbnail'}
                    isRequired={true}
                    imgCardLabel={'Upload Thumbnail'}
                    uploadTitle={'Click to upload or Drag & Drop png/jpg here'}
                    setUploadedImage={(name, imageUrl, file) => {
                      handleFileChange(name, imageUrl, file);
                    }}
                  />
                </div>

                <div style={{
                  width: '100%',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: 'flex-start',
                }}>
                  <Typography
                    style={{
                      marginBottom: '2px',
                      color: 'var(--Gray-1, #333)',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      lineHeight: '140%',
                    }}
                  >
                    Upload Cover Pictures
                  </Typography>

                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ZupotsuImgUpload
                      fileSize={'Max Size 5 MB'}
                      uploadedImage={fileData?.coverPicture1?.imageUrl}
                      fileType={'jpg'}
                      name={'coverPicture1'}
                      imgCardLabel={''}
                      uploadTitle={
                        'Click to upload or Drag & Drop png/jpg here'
                      }
                      setUploadedImage={(name, imageUrl, file) => {
                        handleFileChange(name, imageUrl, file);
                      }}
                    />
                    <div
                      style={{
                        marginTop: '0px',
                      }}
                    >
                      <ZupotsuImgUpload
                        fileSize={'MaxSize 500 KB'}
                        uploadedImage={fileData?.coverPicture2?.imageUrl}
                        fileType={'jgp'}
                        name={'coverPicture2'}
                        imgCardLabel={''}
                        uploadTitle={
                          'Click to upload or Drag & Drop png/jpg here'
                        }
                        setUploadedImage={(name, imageUrl, file) => {
                          handleFileChange(name, imageUrl, file);
                        }}
                      />
                    </div>

                    <div
                      style={{
                        marginTop: '0px',
                      }}
                    >
                      <ZupotsuImgUpload
                        fileSize={'MaxSize 500 KB'}
                        uploadedImage={fileData?.coverPicture3?.imageUrl}
                        fileType={'jgp'}
                        name={'coverPicture3'}
                        imgCardLabel={''}
                        uploadTitle={
                          'Click to upload or Drag & Drop png/jpg here'
                        }
                        setUploadedImage={(name, imageUrl, file) => {
                          handleFileChange(name, imageUrl, file);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Box>


      </Grid>
    );
  }

}

export default PreviewForm;


