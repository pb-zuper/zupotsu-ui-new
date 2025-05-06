import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ZupotsuTextfield from './ZupotsuTextfield';
import { Box, Grid, Typography } from '@mui/material';
import ZupotsuFormCreation from './creation-atoms/ZupotsuFormCreation';
import { useNavigate } from 'react-router';
import useDeviceType from '../../utils/DeviceType';
import ZupotsuAutocomplete from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import CancelButton from '../../Atoms/buttons/CancelButton';
import SubmitButton from '../../Atoms/buttons/SubmitButton';
import Apis from '../../services/apis';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../loader/Loader';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';

interface DataItem {
  id: number;
  name: string;
}
const CreateNewForm = ({ sidebarOpen }: any) => {

  const apis = new Apis();
  const [formState, setFormState] = React.useState<{ [key: string]: string | { file: File, imageUrl: string } }>({});
  const [formData, setFormData] = React.useState<{ [key: string]: string }>({});
  const [load, setLoad] = useState(false)
  const navigation = useNavigate();
  const deviceType = useDeviceType();
  const [allSports, setAllSports] = useState<any>([])
  const [assetTypes, setAssetTypes] = useState<DataItem[]>([]);
  const [customArray, setCustomArray] = useState<any>([]);
  const [allAttributes, setallAttributes] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [isEditing, setIsEditing] = useState<any>(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  useEffect(() => {
    setIsEditing(id ? true : false)
  }, [])

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  useEffect(() => {
    const startTime = performance.now();

    const fetchAndTrack = async () => {
      await getAllPrimaryAttri();
      const loadTime = performance.now() - startTime;
      mixpanelEvents.onLoad(loadTime, 'Create New Form Page');
    };
    fetchAndTrack();

    return () => {
      const timeSpent = performance.now() - startTime;
      mixpanelEvents.onUnload('Create New Form Page', timeSpent);
    };
  }, []);

  const getAllPrimaryAttri = () => {
    setLoad(true);
    apis.getAllPrimaryAttributes()
      .then((response: any) => {
        if (response?.data?.status === "success") {
          const fetchedArray = response.data.data || [];
          const sortedArray = [...fetchedArray].sort((a, b) => a.priority - b.priority);
          setallAttributes(sortedArray)
          const sports = sortedArray.filter(item => item?.attribute_name?.toLowerCase() == "sport")
          setAllSports(sports[0].option_values)
          apis.getAssetTypes()
            .then((response) => {
              response.data.data.sort((a: any, b: any) => a.id - b.id);
              setAssetTypes(response.data?.data)
              if (id) {
                setLoad(true);
                apis.getFormByID(id)
                  .then((response: any) => {
                    if (response?.data?.status === "success") {
                      setFormData({
                        formname: response?.data?.data.name,
                        description: response?.data?.data.description,
                        sport: response?.data?.data?.sport,
                        assettype: response?.data?.data?.asset_type?.name,
                        sportType: response?.data?.data?.sport_type?.toLowerCase() == "single" ? "Single Sport" : "Multi Sport"
                      })

                      let arr: any = []
                      response?.data?.data.template_details.map((item: any) => {
                        if (item.primary_attribute_id) {
                          arr.push({ ...item.primary_attribute, "primary_attribute_id": item.primary_attribute_id, "priority": item.priority, "id": item.id, is_existing: true, "is_hidden": item?.is_hidden ? true : false, "tooltip": item?.tooltip, "placeholder": item?.placeholder })
                        }
                        else {
                          arr.push({ ...item, "id": item.id, is_existing: true, "is_hidden": item?.is_hidden ? true : false })
                        }
                      })
                      // setCustomArray(arr)
                      onchangeData(response?.data?.data.asset_type.name, sortedArray, arr)
                      setLoad(false);
                    }
                  })
                  .catch((error: any) => {
                    setLoad(false);
                    mixpanelEvents.errorHandling({
                      name: 'Create New Form Page',
                      msg: error?.response?.data?.error || error?.message
                    })
                    setSnackbar({
                      open: true,
                      severity: 'error',
                      message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
                    });
                  });

              }
              else {
                setLoad(false);
              }
            })
            .catch((error) => {
              setLoad(false)
              mixpanelEvents.errorHandling({
                name: 'Create New Form Page',
                msg: error?.response?.data?.error || error?.message
              })
            });
        }
      })
      .catch((error: any) => {
        setLoad(false);
        mixpanelEvents.errorHandling({
          name: 'Create New Form Page',
          msg: error?.response?.data?.error || error?.message
        })
        setSnackbar({
          open: true,
          severity: 'error',
          message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
        });
      });
  }


  const [addingObject, setAddingObject] = useState<any>({
    attribute_name: "",
    option_values: ['', ''],
    attribute_type: "",
    attribute_priority: 1,
    placeholder: '',
    tooltip: '',
    created_at: "",
    attribute_length: "",
    is_mandatory: false,
    is_hidden: false,
  });


  const dropdownData = assetTypes.map(item => ({
    id: item.id,
    name: item.name
  }));

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fData = {
      ...formData,
      [e.target.name]: e.target.value,
    }
    setFormData(fData);
  };

  const onchangeData = (e: any, allAttr: any, arr2?: any) => {
    if (e) {
      let fData = e
      let arr = allAttr.filter((item: any) => {
        return !item.attribute_subgroup;
      });
      const assetCommonAttributes = arr.filter((item: any) => item?.primary_attr_for?.includes("asset_detail"))
      const assetPrimaryAttributes = arr.filter((item: any) => item?.primary_attr_for?.includes(fData?.trim().toLowerCase()))
      if (id) {
        arr2.sort((a: any, b: any) => a.priority - b.priority);
        let newAttr = [...assetCommonAttributes, ...assetPrimaryAttributes].filter((obj1: any) => !arr2.some((obj2: any) => obj1.id === obj2.primary_attribute_id));
        newAttr.map((item: any, index: any) => {
          item["primary_attribute_id"] = item.id
          item["priority"] = arr2.length + (index + 1)
          delete item.id
        })
        let filArray = [...arr2, ...newAttr].filter((item: any) => {
          return item.attribute_name && item.attribute_type;
        });
        setCustomArray(filArray)
      }
      else { setCustomArray([...assetCommonAttributes, ...assetPrimaryAttributes]) }
    }
  };



  const linkDetails = useMemo(() => [
    {
      label: 'catalogue',
      url: '/',
    },
    {
      label: 'Forms',
      url: '/manage_forms',
    },
    {
      label: id ? 'Edit Onboarding Form' : 'Create Onboarding Form',
      url: '',
    },
  ], []);


  const handleFileChange = useCallback(
    (name: string, imageUrl: string, file: File | null) => {
      name = name?.toLowerCase().replace(/\s+/g, '');
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

  const handleSubmit = () => {
    // Handle form submission here
    let transformedPriorityArray: any = {};
    let body: any = {}

    if (id) {
      if (!formData.formname || formData.formname.trim() === "") {
        setSnackbar({
          open: true,
          severity: 'error',
          message: "Name is required.",
        })
      }
      else if (!formData.description || formData.description.trim() === "") {
        setSnackbar({
          open: true,
          severity: 'error',
          message: "Description is required."
        })

      }
      else {
        setLoad(true)
        transformedPriorityArray = customArray?.map((item: any) => {
          if (item.primary_attribute_id) {
            return {
              primary_attribute_id: item.primary_attribute_id,
              priority: item.priority,
              id: item.id,
              is_hidden: item.is_hidden ? true : false,
              tooltip: item?.tooltip ? item?.tooltip : null,
              placeholder: item?.placeholder || null,
            };
          } else {
            return {
              attribute_name: item.attribute_name,
              attribute_type: item.attribute_type,
              priority: item.priority,
              is_mandatory: item.is_mandatory,
              option_values: item.option_values ? item.option_values : item.value ? item.value : [],
              tooltip: item.tooltip ? item.tooltip : null,
              placeholder: item.placeholder ? item.placeholder : null,
              max_length: item.attribute_length ? item.attribute_length : item.max_length ? item.max_length : null,
              default_value: item.default_value ? item.default_value : null,
              id: item.id,
              is_hidden: item.is_hidden ? true : false
            }
          }
        });
        const updatedPriorityArray = transformedPriorityArray.map((item: any, index: any) => ({
          ...item,
          priority: index + 1
        }));

        const selAsset = dropdownData.filter(item => item.name == formData.assettype)

        body = {
          "name": formData.formname,
          "description": formData.description,
          "asset_type_id": selAsset[0].id,
          "sport": formData.sport,
          "updated_by": 1,
          "template_details": updatedPriorityArray,
          "id": +id
        }

        apis.updateForm(body)
          .then((response) => {
            setSnackbar({
              open: true,
              severity: 'success',
              message: id ? 'Form Updated successfully!' : 'Form Created successfully!',
            });
            setTimeout(() => {
              navigation("/manage_forms");
            }, 1000);
            setLoad(false)
          })
          .catch((error) => {
            setSnackbar({
              open: true,
              severity: 'error',
              message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
            });
            setLoad(false)
          });
      }
    }
    else {
      if (!formData.name || formData.name.trim() === "") {

        setSnackbar({
          open: true,
          severity: 'error',
          message: "Name is required.",
        })
      }
      else if (!formData.description || formData.description.trim() === "") {

        setSnackbar({
          open: true,
          severity: 'error',
          message: "Description is required."
        })

      }
      else if (!formData.assettype || formData.assettype.trim() === "") {

        setSnackbar({
          open: true,
          severity: 'error',
          message: "Please select a valid asset type."
        })
      }
      else if (formData["sportType"] !== "Single Sport" && formData["sportType"] !== "Multi Sport") {

        setSnackbar({
          open: true,
          severity: 'error',
          message: "Please select a sport type."
        });
      }
      else if (formData["sportType"] == "Single Sport" && (!formData.sport || formData.sport.trim() === "")) {

        setSnackbar({
          open: true,
          severity: 'error',
          message: "Sport is required."
        });
      }
      else {
        setLoad(true)
        transformedPriorityArray = customArray.map((item: any) => {
          if (item?.id !== undefined) {

            return {
              primary_attribute_id: item.id,
              priority: item.priority,
              is_hidden: !!item.is_hidden,
              tooltip: item?.tooltip ? item?.tooltip : item?.primary_attribute?.tooltip ? item?.primary_attribute?.tooltip : null,
              placeholder: item?.placeholder ? item?.placeholder : item?.primary_attribute?.placeholder ? item?.primary_attribute?.placeholder : null
            };
          } else {
            return {
              attribute_name: item.attribute_name,
              attribute_type: item.attribute_type,
              priority: item.priority,
              is_mandatory: item.is_mandatory,
              option_values: item.option_values ? item.option_values : item.value ? item.value : [],
              tooltip: item.tooltip ? item.tooltip : item.toolTipMessage ? item.toolTipMessage : null,
              placeholder: item.placeholder ? item.placeholder : null,
              max_length: item.max_length ? item.max_length : null,
              default_value: item.default_value ? item.default_value : null,
              is_hidden: item.is_hidden ? true : false
            };
          }
        });
        const updatedPriorityArray = transformedPriorityArray.map((item: any, index: any) => ({
          ...item,
          priority: index + 1,

        }));

        const selAsset = dropdownData.filter(item => item.name == formData.assettype)

        body = {
          "name": formData.name,
          "description": formData.description,
          "asset_type_id": selAsset[0].id,
          "sport": formData.sport,
          "template_details": updatedPriorityArray,
          "sport_type": formData["sportType"] == "Single Sport" ? "single" : "multi"
        }

        apis.addForm(body)
          .then((response) => {
            setSnackbar({
              open: true,
              severity: 'success',
              message: id ? 'Form Updated successfully!' : 'Form Created successfully!',
            });
            setTimeout(() => {
              navigation("/manage_forms");
            }, 1000);
            setLoad(false)

          })
          .catch((error) => {
            setSnackbar({
              open: true,
              severity: 'error',
              message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
            });
            setLoad(false)
          });
      }
    }


  };

  const handleCancel = () => {
    navigation(-1)
  };



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
  } else {


    return (
      <Grid xs={12} md={12} lg={12} style={{ height: '90vh', overflowY: "scroll", overflowX: 'hidden' }}>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-start',
            padding: '0px',
            marginBottom: "80px",
            backgroundColor: 'rgb(250,250,250)',

          }}
        >
          <Grid xs={12} md={12} lg={12} width={"95%"} marginTop={2}>
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

          <div style={{margin:'20px',}}>
              <ZoptsuUnderlineTitle
                  fontSizeOnLargeScreen="35px"
                  fontSizeOnMediumScreen="33px"
                  fontSizeOnSmallScreen="33px"
                  fontSizeOnExtraSmallScreen="33px"
                  titleText={!id?'Create Onboarding Form':'Edit Onboarding Form'}
                  letterSpacing="1.92px"
                  lineHeight="40.2px"
                  textAlign="start"
                  underlineWidthForDesktop="100%"
                  underlineWidthForSmallTablet="100%"
                  underlineWidthForMobile="100%"
                  underlineBottomForDesktop="18%"
                  underlineBottomForSmallTablet="21%"
                  underlineBottomForMobile="24%"
                  // linearGradientPresent={true}
                  paddingLeft="0px"
                  underlineHeight="9px"
                />
            </div>
          <form style={{ margin: 10,marginTop:-10, width: "95%", padding: "15px", backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Grid item xs={12} md={12} lg={6} flexDirection={'row'} width={"100%"} justifyContent={'flex-start'} >

              <Grid container spacing={2} sx={{}}>
                <Grid item xs={12} md={6} lg={6}>
                  <ZupotsuTextfield
                    title={"Form Name"}
                    placeholder={"Enter form name"}
                    value={formData["formname"] as string}
                    isRequired={true}
                    type={"text"}
                    name={"name"}
                    multiline={false}
                    handleChange={handleChangeData}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>

                  <ZupotsuAutocomplete
                    title={"Asset Type"}
                    placeholder="Select Asset Type"
                    isRequired={true}
                    name={"assettype"}
                    dropdownData={dropdownData.map(item => item.name)}
                    value={formData["assettype"] as string || ''}
                    handleChange={handleChangeData}
                    onChangefun={(e: any) => onchangeData(e.target.value, allAttributes)}
                    freeSolo={true}
                    previewMode={id ? true : false}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                <Grid item xs={12} md={6} lg={6}>
                  <ZupotsuAutocomplete
                    title="Select Sport Type"
                    placeholder="Select Sport Type"
                    isRequired={true}
                    name="sportType"
                    dropdownData={[
                      "Single Sport",
                      "Multi Sport"
                    ]}
                    value={formData["sportType"] as string}
                    handleChange={handleChangeData}
                    freeSolo={true}
                    previewMode={id ? true : false}
                  />
                </Grid>
                {formData["sportType"] == "Single Sport" && (
                  <Grid item xs={12} md={6} lg={6}>
                    <ZupotsuAutocomplete
                      title="Select Sport"
                      placeholder="Select Sport"
                      isRequired={true}
                      name="sport"
                      dropdownData={allSports}
                      value={formData["sport"] as string || ""}
                      handleChange={handleChangeData}
                      freeSolo={true}
                      previewMode={id ? true : false}
                    />
                  </Grid>)}
                <Grid item xs={12} md={formData["sportType"] == "Single Sport" ? 12 : 6} lg={formData["sportType"] == "Single Sport" ? 12 : 6}>
                  <ZupotsuTextfield
                    title={"Description"}
                    placeholder="Enter Description"
                    rows={1}
                    value={formData["description"] as string}
                    isRequired={true}
                    type={"textarea"}
                    name={"description"}
                    multiline={true}
                    // toolTipMessage={"Enter the description"}
                    handleChange={handleChangeData}
                  // maxLength={100}
                  />
                </Grid>
              </Grid>

            </Grid>

            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(0,0,0,0.2)',
                marginTop: '20px',
              }}
            />
            <Grid container width={"100%"}>
              {customArray.length > 0 && (<Typography
                sx={{
                  fontFamily: "Bebas Neue",
                  fontWeight: '400',
                  fontSize: '20px',
                  lineHeight: '30px',
                  margin: "10px",
                  marginTop: '20px',
                  marginBottom: '0px'
                }}
              >
                Form Fields
              </Typography>)}
              {customArray.length > 0 && (<div
                style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  marginTop: '20px',
                }}
              />)}
              {customArray.length > 0 && (
                <ZupotsuFormCreation
                  customArray={customArray}
                  setCustomArray={setCustomArray}
                  isEditing={isEditing}
                  addingObject={addingObject}
                  setAddingObject={setAddingObject}
                />
              )}
            </Grid>
          </form>
        </Box>
        <Grid item xs={12} md={12} lg={6} sx={{ display: 'flex', backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: "fixed", bottom: 0, zIndex: '1', width: deviceType == "mobile" ? "100%" : (sidebarOpen ? "83%" : "100%"), paddingTop: '15px', paddingBottom: '15px', paddingLeft: "20px", paddingRight: "5%" }}>
          <CancelButton onSubmit={handleCancel} buttonText="Cancel" />
          <SubmitButton
           disabled={(() => {
            if (id) {
              return (
                !formData.formname || 
                formData.formname.trim() === "" ||
                !formData.description || 
                formData.description.trim() === ""
              );
            } else {
              return (
                !formData.name || 
                formData.name.trim() === "" ||
                !formData.description || 
                formData.description.trim() === "" ||
                !formData.assettype || 
                formData.assettype.trim() === "" ||
                (formData.sportType !== "Single Sport" && formData.sportType !== "Multi Sport") ||
                (formData.sportType === "Single Sport" && (!formData.sport || formData.sport.trim() === ""))
              );
            }
          })()}
          onSubmit={handleSubmit} buttonText="Submit" />
        </Grid>
      </Grid>
    );
  }
};

export default CreateNewForm;
