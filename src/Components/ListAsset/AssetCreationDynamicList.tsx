import {
  Backdrop, Box, CircularProgress, Divider, Drawer, Modal, Stack, Typography, IconButton, Button,
} from '@mui/material';
import Fab from '@mui/material/Fab';
import ZupotsuStepper from '../../Molecules/zupotsu-stepper/zupotsu-stepper';
import ZupotsuConfirmationDialog from '../../Molecules/zupotsu-confirmation-dialog/zupotsu-confirmation-dialog';
import ZupotsuImgUpload from '../../Molecules/zupotsu-img-upload/zupotsu-img-upload';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import {
  addCircle, arrowLeft, CloseIcon, collapse, copy, deleteIcon, eastWhiteArrow, expand, infoCircle, verifyIcon,
} from '../../assets';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import useDeviceType from '../../utils/DeviceType';
import React, {
  CSSProperties, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router';
import './GlobalListing.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import DynamicFields from './DynamicFields';
import { GlobalContext } from '../../context/GlobalContext';
import { getLocalStorage } from '../../utils/LocalStorageService';
import tcToggleStyle, { dynamicDropdownFieldStyle, dynamicFieldStyle2, FieldsData, imgUploadParentElStyle, investmentFieldParentStyle } from '../../utils/constants';
import Meta from '../../utils/Meta';
import ZupotsuAutocomplete, { ZupotsuAutoComplete } from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete';
import Apis from '../../services/apis';
import ZupotsuMultiSelect from '../../Atoms/zupotsu-multiselect/zupotsu-multiselect';
import DynamicFields2 from './DynamicFields2';
import { DynamicTextFieldUtilMulti } from '../../utils/constantComponents';
import ZupotsuRadioButton2 from '../../Atoms/zupotsu-radio-button/zupotsu-radio-button2';
import { useSearchParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChooseCard from '../../Molecules/choose-card/ChooseCard';
import { Close } from '@mui/icons-material';
import AssetPreview from './AssetPreview';
import ZupotsuTooltip from '../../Atoms/zupotsu-tooltip/zupotsu-tooltip';
import { validateFacebookUrl, validateInstagramUrl, validateTikTokUrl, validateTwitterUrl, validateUrl, validateXUrl, validateYouTubeUrl } from '../../utils/validateTextfieldValue';
import SupportAgentSharpIcon from '@mui/icons-material/SupportAgentSharp';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';

interface Step2FormData {
  longinput: boolean;
  tableview: boolean;
  deliverables?: string;
}

interface Data {
  step2FormData: Step2FormData[];
}

interface DeliverableItem {
  deliverables: string;
  specs_of_deliverables: string;
}

interface DeliverablesTableProps {
  deliverablesTable: DeliverableItem[];
}

const AssetCreationDynamicList = ({
  onDataPresent = (isDataPresent: boolean) => { },
  assetType = 'Team',
  seePreviewClicked = false,
  dynamicListRef,
  sidebarOpen,
  tabControl = (disable: boolean) => { },
  setDisabledPreviewButton = (e: boolean) => { },
  ...props
}: any) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [assetTypes, setAssetTypes] = useState<any>([])
  const [selectedValue, setSelectedValue] = useState("");
  const [allSports, setAllSports] = useState<any>([])
  const [load, setLoad] = useState<any>(false)
  const [selectSport, setSelectSport] = useState<string>('');
  const [selectSportMul, setSelectSportMul] = useState<string[]>([]);
  const [selectMul, setSelectMul] = useState<string[]>([]);
  const [isTabDisable, setTabDisable] = useState(false);
  const [sellerId, setSellerId] = useState<any>();
  const [fields, setFields] = useState([]);
  const [metaData, setMetaData] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [formData2, setFormData2] = useState<any>([]);
  const [errors, setErrors] = useState<any>({});
  const userInfo = getLocalStorage('userInfoAdmin');
  const [isDraftDisable, setDraftDisable] = useState(true);
  const [thumbnailpreview, setThumbnailPreview] = useState<any>(false)
  const [openBackdrop, setBackdrop] = useState(false);
  const dynamicStyle: CSSProperties = tcToggleStyle();
  const imgUploadParElStyle: CSSProperties = imgUploadParentElStyle();
  const investmentFieldParentStyles: CSSProperties = investmentFieldParentStyle();
  const [fileData, setFileData] = React.useState<any>([]);
  const [addOpportunities, setaAddOpportunities] = useState(false);
  const [selectedOpportunityIndex, seSelectedOpportunityIndex] = useState<number>(-1);
  const [showOpportunityReviewConf, setShowOpportunityConf] = useState(false);
  const [activeItems, setActiveItems] = useState<any>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(seePreviewClicked);
  const [previewMode, setPreviewMode] = useState<any>(true);
  const [otype, setOtype] = useState<any>({})
  const [oppr, setOppr] = useState<any>([])
  const [unit, setunit] = useState<any>([])
  const [assetStatus, setAssetStatus] = useState("")
  const [name, setName] = useState("")
  const [choooseTemplate, setChooseTemplate] = useState("")
  const [templateId, setTemplateId] = useState(`${name}0`)
  const [deliverablesTable, setDeliverablesTable] = useState<DeliverableItem[]>([
    { deliverables: '', specs_of_deliverables: '' },
  ]);
  const [sellersList, setSellersList] = useState<any>([])
  const [sellersuserList, setSellersuserList] = useState<any>([])
  const [currencylist, setcurrencylist] = useState<any>([])
  const [searchParams] = useSearchParams();
  const [id, setid] = useState<any>(searchParams.get('id'));
  const [sportsMedia, setSportsMedia] = useState([])
  const cid = searchParams.get('cid');
  const emailFetched = localStorage.getItem("email")
  const fetchAssets = async () => {
    try {
      setLoad(true);
      const mediaResponse = await apis.getSportsMedia();
      const arrmedia = mediaResponse?.data?.data || [];
      setSportsMedia(arrmedia)
    } catch (error) {
      console.log("Error fetching assets or media:", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [])

  const [filteredSports, setFilteredSports] = useState([])

  useEffect(() => {
    if (sportType == "Single Sport") {
      const filterSportsMedia = sportsMedia?.filter((item: any) => item?.name == selectSport);
      setFilteredSports(filterSportsMedia)
    }
  }, [selectSport])


  const addDeliverable = (index: number) => {
    setFormData2((prevData: any) => {
      const updatedData = [...prevData];
      if (!updatedData[index].deliverables) {
        updatedData[index].deliverables = [];
      }
      updatedData[index].deliverables.push({ deliverables: '', specs_of_deliverables: '' });

      return updatedData;
    });
  };

  const addOppr = () => {
    setFormData2((prevData: any) => {
      const updatedData = [...prevData];
      updatedData.push({
        deliverables: [
          // { deliverables: '', specs_of_deliverables: '' }
        ], "tc_type": "Text", "Opportunity Media": [], PCB: "No", "Display Rate On Catalogue": "No"
      });
      return updatedData;
    });
  };
  const [opNum, setopNum] = useState([
    {
      title: `Opportunity 1`
    }])
  const [socialLinks, setSocialLinks] = useState<any>([]);
  const apis = new Apis();
  const globalContext = useContext(GlobalContext);
  const [formStatus, setFormStatus] = useState('');
  const [sportType, setSelectSportType] = useState('Single Sport');
  const [tempId, settempId] = useState('');
  const [fixedoppAttr, setfixedOppAttr] = useState([])
  const [oppAttr, setOppAttr] = useState([]);
  const [assetData, setAssetData] = useState<any>({})
  const [allSportsFormat, setallSportsFormat] = useState([])
  const [sportsFormat, setsportsFormat] = useState([])
  const [org_id, setOrg_id] = useState<any>(localStorage.getItem("orgID"));
  const isAdmin = (localStorage.getItem("role")?.toLowerCase() === "admin") ? true : false;
  const isPublisher = (localStorage.getItem("role")?.toLowerCase() === "publisher") ? true : false;
  const isApprover = (localStorage.getItem("role")?.toLowerCase() === "approver") ? true : false;
  const isSeller = (localStorage.getItem("role")?.toLowerCase() === "seller") ? true : false;
  const isSellerAdmin = (localStorage.getItem("role")?.toLowerCase() === "seller-admin") ? true : false;
  const [seller_id, setseller_id] = useState<any>(emailFetched == "marketing@zupotsu.com" ? '' : (isSeller || isSellerAdmin) ? localStorage.getItem("userID") : '')
  const [attemptsTaken, setAttemptsTaken] = useState(0);


  const handleChangefun = useCallback((e: any, value: any, opindex: any, index: any) => {
    setFormData2((prevData: any) => {
      const updatedData = [...prevData];

      // Ensure the parent object exists and create the 'deliverables' array if it doesn't
      if (!updatedData[opindex]) {
        updatedData[opindex] = {};
      }
      if (!updatedData[opindex].deliverables) {
        updatedData[opindex].deliverables = [];
      }

      const updatedDeliverables = [...updatedData[opindex].deliverables];

      // Ensure the specific deliverable object exists or create it if it doesn't
      if (!updatedDeliverables[index]) {
        updatedDeliverables[index] = {};
      }

      // Update the specific field in the deliverable object
      updatedDeliverables[index][e] = value; // Update or add the new value based on e and value

      // Update the 'deliverables' array in the main data structure
      updatedData[opindex] = {
        ...updatedData[opindex],
        deliverables: updatedDeliverables
      };

      return updatedData;
    });
  }, []);

  const handleOpprChangefun = useCallback((fieldName: string, mediaUrl: string, parentIndex: number, mediaIndex: number) => {
    setFormData2((prevData: any) => {

      const updatedData = [...prevData];
      if (!updatedData[parentIndex]) {
        updatedData[parentIndex] = {};
      }

      if (!updatedData[parentIndex]["Opportunity Media"]) {
        updatedData[parentIndex]["Opportunity Media"] = [];
      }

      const updatedMedia = [...updatedData[parentIndex]["Opportunity Media"]];

      if (!updatedMedia[mediaIndex]) {
        updatedMedia[mediaIndex] = {
          "media_type": "",
          "media_url": "",
          "tags": ""
        }
      }

      updatedMedia[mediaIndex] = {
        "media_type": "image",
        "media_url": mediaUrl,
        "tags": [fieldName]
      }

      updatedData[parentIndex] = {
        ...updatedData[parentIndex],
        ["Opportunity Media"]: updatedMedia
      };
      return updatedData;
    });
  }, []);

  const onChangeSocial = useCallback((param: any, isValidationError: any) => {
    setSocialLinks(param);
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const deviceType = useDeviceType();

  const steps =
    // id ? ([
    //   {
    //     label: 'Edit Asset Details',
    //     step: '1',
    //     completedStepIcon: verifyIcon,
    //   },
    //   {
    //     label: 'List of Opportunities',
    //     step: '2',
    //     completedStepIcon: verifyIcon,
    //   }
    // ]) : 
    [
      {
        label: "Choose Asset Type",
        step: '1',
        completedStepIcon: verifyIcon,
      },
      {
        label: 'Asset Details',
        step: '2',
        completedStepIcon: verifyIcon,
      },
      {
        label: 'List of Opportunities',
        step: '3',
        completedStepIcon: verifyIcon,
      }
    ];

  const stepperCirclesWidthHeightProps = {
    width: '36px',
    height: '36px',
  };

  const handleInputChange = useCallback((e: any) => {
    const { name, label, type, value } = e.target;
    const newValue = Array.isArray(value) ? value : [value];
    setFormData((prevData: any) => ({ ...prevData, [name]: newValue }));
  }, []);

  const handleInputChange2 = useCallback((e: any, d: any) => {
    setFormData((prevData: any) => ({ ...prevData, [d.label]: e.target.value }));
  }, []);

  const handleInputChangeDatePicker = useCallback((e: any, d: any) => {
    setFormData((prevData: any) => ({ ...prevData, [d.label]: e }));
  }, [setFormData]);

  const handleInputChange3 = useCallback((e: any, d: any) => {
    if (d.label?.toLowerCase() == "country") {
      setFormData((prevData: any) => ({ ...prevData, [d.label]: e, ['City']: [], ['State']: [] }));
    }
    else {
      setFormData((prevData: any) => ({ ...prevData, [d.label]: e }));
    }

  }, []);

  const handleInputChange4 = useCallback((e: any, d: any, opindex: any) => {
    setLoad(true)

    setFormData2((prevData: any) => {
      const updatedData = [...prevData];
      updatedData[opindex] = {
        ...updatedData[opindex],
        [d.label]: e
      };
      return updatedData;
    });
    setLoad(false)
  }, []);

  const handleFileChange = (name: string, imageUrl: string, file: any, mediaType: any) => {
    let updatedFileData = fileData.filter((item: any) => item.tags[0] !== name.trim())
    updatedFileData.push({
      "media_type": mediaType,
      "media_url": imageUrl,
      "tags": [name]
    });

    setFileData(updatedFileData);
  }

  const toggleAccordion = (index: any) => {
    const updatedItems = [...activeItems];
    updatedItems[index] = !updatedItems[index];
    setActiveItems(updatedItems);
  };

  const listOpportunitySkipConf = async (type: number) => {
    setShowOpportunityConf(false);
    navigate('/catalogue-management/auth');
  };

  const handleBack = () => {
    // if (id) {
    //   if (activeStep === 1) {
    //     navigate(-1)
    //   } else {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //   }
    // }
    // else {
    if (activeStep === 0) {
      navigate(-1)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    // }

  };

  function convertKeysToTitleCase(obj: any) {
    const newObj: any = {};
    for (const key in obj) {
      if (!(cid && key?.toLowerCase() == "id" && key?.toLowerCase() == "is_deleted")) {
        if (obj.hasOwnProperty(key)) {
          let titleCaseKey = key
            .replace(/_/g, ' ')
            .replace("/", "_")
            // .replace("(", "_")
            // .replace(")", "_")
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(' ')?.map(word => word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase())
            .join(' ');
          if (titleCaseKey == "Platform S ") {
            titleCaseKey = "Platform(s)"
          }
          if (titleCaseKey == "Opportunity Deliverables") {
            newObj["deliverables"] = obj[key];
          }
          // else if (titleCaseKey == "Opportunity Media") {
          //   newObj["opportunity_media"] = obj[key];
          // }
          if (titleCaseKey == "Unit Of Measurement" && obj[key] == "Custom Pricing") {
            newObj["PCB"] = "Yes";
            newObj[titleCaseKey] = obj[key]
          }
          if (titleCaseKey == "Unit Of Measurement" && obj[key] != "Custom Pricing") {
            newObj["PCB"] = "No";
            newObj[titleCaseKey] = obj[key]
          }

          else {
            newObj[titleCaseKey] = obj[key] ? obj[key] : "";
          }
        }
      }
    }
    return newObj;
  }



  useEffect(() => {
    const startTime = performance.now();

    const fetchAndTrack = async () => {
      await AssetCreation();
      const loadTime = performance.now() - startTime;
      mixpanelEvents.onLoad(loadTime, 'Asset Creation');
    };
    fetchAndTrack();

    return () => {
      const timeSpent = performance.now() - startTime;
      mixpanelEvents.onUnload('Asset Creation', timeSpent);
    };
  }, []);


  const AssetCreation = () => {
    setLoad(true)
    if (id) {
      getSellers()
      setActiveStep(0)
      apis.getAssetTypes()
        .then((res: any) => {
          res.data.data.sort((a: any, b: any) => a.id - b.id);
          setAssetTypes(res.data?.data)
          // setSelectedValue(res.data?.data[0].id)
          apis.getAllPrimaryAttributes()
            .then((res2: any) => {
              const sports = res2.data?.data?.filter((item: any) => item?.attribute_name?.toLowerCase() == "sport")
              setAllSports(sports[0].option_values)
              // setAllSports(res2.data?.data?.option_values)
              const sfArr = res2.data?.data?.filter((item: any) => item?.attribute_name == "Sports Format")
              setallSportsFormat(sfArr)

              apis.getAssetByID(id)
                .then((response: any) => {
                  const oppurtunites = res2.data?.data?.filter((item: any) => item?.primary_attr_for == "opportunities")
                  setName(response?.data?.data?.asset_type.name)
                  setAssetData(response?.data?.data)
                  setseller_id(response.data?.data?.seller_id)
                  setOrg_id(response.data?.data?.organization_id)
                  let arr: any = []
                  response?.data?.data?.template.template_details?.map((item: any) => {
                    let asset: any = {};
                    if (item.primary_attribute_id) {
                      asset = {
                        "priority": item?.priority,
                        "isPrimary": true,
                        "type": item?.primary_attribute?.attribute_type,
                        "info": item?.tooltip,
                        // || item?.primary_attribute?.tooltip,
                        "label": item.primary_attribute.attribute_name,
                        "field": 'typeField',
                        "placeholder": item?.placeholder,
                        //  || item?.primary_attribute?.placeholder,
                        "metaDataField": '',
                        "isRequired": item?.primary_attribute?.is_mandatory,
                        "maxLength": item?.primary_attribute?.max_length,
                        "value": "",
                        "attr_for": item?.primary_attribute?.primary_attr_for,
                        "is_hidden": item?.is_hidden
                      }
                      if (item.primary_attribute.attribute_type == "multipleDropdown" || item.primary_attribute.attribute_type == "dropdown") {
                        if (item.primary_attribute.attribute_name == "Sports Format") {
                          let arr = sfArr.filter((item: any) => {
                            if (response?.data?.data?.sport_type == "single") {
                              return item.attribute_subgroup === response?.data?.data?.sport[0];
                            }
                            else if (sportType === "multi") {
                              return response?.data?.data?.sport.some((sport: any) => item.attribute_subgroup === sport);
                            }
                          });
                          let arr2: any = []
                          arr?.map((item: any) => {
                            arr2 = [...arr2, ...item.option_values]
                          })
                          asset["dropdownData"] = arr2
                        }
                        else {
                          asset["dropdownData"] = item.primary_attribute.option_values
                        }
                      }
                      if (item.primary_attribute.attribute_type == "checkBox" || item.primary_attribute.attribute_type == "radioButton") {
                        let arr: any = []
                        item.primary_attribute.option_values?.map((item: any) => {
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
                        "priority": item.priority,
                        "isPrimary": false,
                        "type": item.attribute_type,
                        "info": item.tooltip,
                        "label": item.attribute_name,
                        "field": 'typeField',
                        "placeholder": item.placeholder,
                        "metaDataField": '',
                        "isRequired": item.is_mandatory,
                        "maxLength": item.max_length,
                        "value": "",
                        "attr_for": "asset_custom_attributes",
                        "is_hidden": item.is_hidden
                      }
                      if (item.attribute_type == "multipleDropdown" || item.attribute_type == "dropdown") {
                        asset["dropdownData"] = item.option_values

                      }
                      // || item.attribute_type == "radioButton"
                      if (item.attribute_type == "checkBox" || item.attribute_type == "radioButton") {
                        let arr: any = []
                        item.option_values?.map((item: any) => {
                          arr.push({
                            id: item,
                            label: item,
                          },)
                        })
                        asset["dropdownData"] = arr
                      }
                      arr.push(asset)
                    }
                    setAssetStatus(response?.data?.data?.asset_detail[0].asset_status)

                    if (response?.data?.data?.asset_detail[0].ui_asset_listing_id) {
                      setTemplateId(response?.data?.data?.asset_detail[0].ui_asset_listing_id)
                    }
                    else {
                      setTemplateId(`${response?.data?.data?.asset_type.name}0`)
                    }
                    // if (id) {
                    setSelectSportType(response?.data?.data?.sport_type == "single" ? "Single Sport" : "Multi Sport")
                    setSelectMul(response?.data?.data?.sport)
                    setSelectSport(response?.data?.data?.sport_type == "single" ? response?.data?.data?.sport[0] : "")
                    setSelectedValue(response?.data?.data?.asset_type_id)
                    // }
                    if (response?.data?.data?.asset_detail[0].asset_status != "draft") {
                      const convertedData = convertKeysToTitleCase(
                        {
                          ...formData,
                          ...(response?.data?.data?.asset_detail[0] || {}),
                          ...(response?.data?.data[response?.data?.data.asset_type.name?.toLowerCase()?.replaceAll("_", " ").replaceAll("_", "/")][0] || {})
                        }
                      );
                      let ca: any = {}
                      response?.data?.data.asset_custom_attributes?.map((item: any) => {
                        if (item.attribute_type == "dateRangePicker") {
                          ca[item.attribute_name + " From"] = (item.attribute_value_range1);
                          ca[item.attribute_name + " To"] = (item.attribute_value_range2);
                        }
                        else {
                          ca[item.attribute_name] =
                            item.attribute_value_string ? item.attribute_value_string
                              : item.attribute_value_int ? item.attribute_value_int
                                : item.attribute_value_date ? (item.attribute_value_date) :
                                  item.attribute_value_array ? item.attribute_value_array : ""
                        }

                      })
                      setFormData({ ...convertedData, ...ca })
                      let sh: any = {}
                      response?.data?.data.asset_social_media?.map((item: any) => {
                        sh[item.social_media_platform] = item.url
                      })
                      setSocialLinks(sh)
                      setFileData(response?.data?.data?.asset_media)
                      if (response?.data?.data?.opportunities?.length > 0) { setaAddOpportunities(true) }

                      const convertedData2: any = [];
                      response?.data?.data?.opportunities?.map((oppr: any) => {
                        convertedData2.push(convertKeysToTitleCase(oppr))
                      })
                      setFormData2(convertedData2)
                      oppfun(oppurtunites, response?.data?.data?.asset_type.name?.toLowerCase().replaceAll("_", " ").replaceAll("_", "/"), response?.data?.data?.asset_detail[0]?.draft?.formdata2)

                    }
                    else {
                      setFormData((response?.data?.data?.asset_detail[0].draft.formdata) ? (response?.data?.data?.asset_detail[0].draft.formdata) : [])
                      setFileData((response?.data?.data?.asset_detail[0].draft.fileData) ? (response?.data?.data?.asset_detail[0].draft.fileData) : [])
                      setFormData2((response?.data?.data?.asset_detail[0].draft.formdata2) ? (response?.data?.data?.asset_detail[0].draft.formdata2) : [])
                      setSocialLinks((response?.data?.data?.asset_detail[0].draft.socialLinks) ? (response?.data?.data?.asset_detail[0].draft.socialLinks) : [])
                      // setSelectedValue(response?.data?.data?.asset_type_id)
                      // setSelectSportType(response?.data?.data?.sport_type == "single" ? "Single Sport" : "Multi Sport")
                      // setSelectMul(response?.data?.data?.sport)
                      // setSelectSport(response?.data?.data?.sport_type == "single" ? response?.data?.data?.sport[0] : "")
                      settempId(response?.data?.data?.template_id)
                      if (response?.data?.data?.asset_detail[0].draft.formdata2.length > 0) { setaAddOpportunities(true) }
                      oppfun(oppurtunites, response?.data?.data?.asset_type.name?.toLowerCase().replaceAll("_", " ").replaceAll("_", "/"), response?.data?.data?.asset_detail[0]?.draft?.formdata2)
                      // acc["asset_type_id"] = selectedValue;
                      // acc["template_id"] = tempId
                      // acc["sport"] = sportType == "Single Sport" ? [selectSport] : selectMul;
                      // acc["sport_type"] = sportType == "Single Sport" ? "single" : "multi";
                    }


                  })
                  arr.sort((a: any, b: any) => a.priority - b.priority);
                  setFields(arr)
                  getSellersCid(response?.data?.data?.seller_id)
                  // setLoad(false)
                  // setOtype(arr[0])

                })
                .catch((error) => {
                  mixpanelEvents.errorHandling({
                    name: 'Asset Creation',
                    msg: error?.response?.data?.error || error?.message
                  })
                  setLoad(false)
                });

            })
            .catch((error) => {
              setLoad(false)
              mixpanelEvents.errorHandling({
                name: 'Asset Creation',
                msg: error?.response?.data?.error || error?.message
              })
            });
        })
        .catch((error) => {
          setLoad(false)
          mixpanelEvents.errorHandling({
            name: 'Asset Creation',
            msg: error?.response?.data?.error || error?.message
          })
        });
    }
    else if (cid) {
      setActiveStep(0)
      apis.getAssetTypes()
        .then((res: any) => {
          res.data.data.sort((a: any, b: any) => a.id - b.id);
          setAssetTypes(res.data?.data)
          // setSelectedValue(res.data?.data[0].id)
          apis.getAllPrimaryAttributes()
            .then((res2: any) => {
              const sports = res2.data?.data?.filter((item: any) => item?.attribute_name?.toLowerCase() == "sport")
              setAllSports(sports[0].option_values)
              // setAllSports(res2.data?.data?.option_values)
              const sfArr = res2.data?.data?.filter((item: any) => item?.attribute_name == "Sports Format")
              setallSportsFormat(sfArr)

              apis.getAssetByID(cid)
                .then((response: any) => {
                  const oppurtunites = res2.data?.data?.filter((item: any) => item?.primary_attr_for == "opportunities")
                  setName(response?.data?.data?.asset_type.name)
                  setAssetData(response?.data?.data)
                  let arr: any = []
                  response?.data?.data?.template.template_details?.map((item: any) => {
                    let asset: any = {};
                    if (item.primary_attribute_id) {
                      asset = {
                        "priority": item.priority,
                        "isPrimary": true,
                        "type": item.primary_attribute.attribute_type,
                        "info": item?.tooltip,
                        // || item?.primary_attribute?.tooltip,
                        "label": item.primary_attribute.attribute_name,
                        "field": 'typeField',
                        "placeholder": item?.placeholder,
                        // || item?.primary_attribute?.placeholder,
                        "metaDataField": '',
                        "isRequired": item.primary_attribute.is_mandatory,
                        "maxLength": item.primary_attribute.max_length,
                        "value": "",
                        "attr_for": item.primary_attribute.primary_attr_for,
                        "is_hidden": item?.is_hidden
                      }
                      if (item.primary_attribute.attribute_type == "multipleDropdown" || item.primary_attribute.attribute_type == "dropdown") {
                        if (item.primary_attribute.attribute_name == "Sports Format") {
                          let arr = sfArr.filter((item: any) => {
                            if (response?.data?.data?.sport_type == "single") {
                              return item.attribute_subgroup === response?.data?.data?.sport[0];
                            }
                            else if (sportType === "multi") {
                              return response?.data?.data?.sport.some((sport: any) => item.attribute_subgroup === sport);
                            }
                          });
                          let arr2: any = []
                          arr?.map((item: any) => {
                            arr2 = [...arr2, ...item.option_values]
                          })
                          asset["dropdownData"] = arr2
                        }
                        else {
                          asset["dropdownData"] = item.primary_attribute.option_values
                        }
                      }
                      if (item.primary_attribute.attribute_type == "checkBox" || item.primary_attribute.attribute_type == "radioButton") {
                        let arr: any = []
                        item.primary_attribute.option_values?.map((item: any) => {
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
                        "priority": item.priority,
                        "isPrimary": false,
                        "type": item.attribute_type,
                        "info": item.tooltip,
                        "label": item.attribute_name,
                        "field": 'typeField',
                        "placeholder": item.placeholder,
                        "metaDataField": '',
                        "isRequired": item.is_mandatory,
                        "maxLength": item.max_length,
                        "value": "",
                        "attr_for": "asset_custom_attributes",
                        "is_hidden": item?.is_hidden
                      }
                      if (item.attribute_type == "multipleDropdown" || item.attribute_type == "dropdown") {
                        asset["dropdownData"] = item.option_values

                      }
                      // || item.attribute_type == "radioButton"
                      if (item.attribute_type == "checkBox" || item.attribute_type == "radioButton") {
                        let arr: any = []
                        item.option_values?.map((item: any) => {
                          arr.push({
                            id: item,
                            label: item,
                          },)
                        })
                        asset["dropdownData"] = arr
                      }
                      arr.push(asset)
                    }

                    setAssetStatus(response?.data?.data?.asset_detail[0].asset_status)

                    if (response?.data?.data?.asset_detail[0].ui_asset_listing_id) {
                      setTemplateId(response?.data?.data?.asset_detail[0].ui_asset_listing_id)
                    }
                    else {
                      setTemplateId(`${response?.data?.data?.asset_type.name}0`)
                    }

                    if (response?.data?.data?.asset_detail[0].asset_status != "draft") {
                      const convertedData = convertKeysToTitleCase(
                        {
                          ...formData,
                          ...(response?.data?.data?.asset_detail[0] || {}),
                          ...(response?.data?.data[response?.data?.data.asset_type.name?.toLowerCase()?.replaceAll("_", " ").replaceAll("_", "/")][0] || {})
                        }
                      );
                      let ca: any = {}
                      response?.data?.data.asset_custom_attributes?.map((item: any) => {
                        if (item.attribute_type == "dateRangePicker") {
                          ca[item.attribute_name + " From"] = (item.attribute_value_range1);
                          ca[item.attribute_name + " To"] = (item.attribute_value_range2);
                        }
                        else {
                          ca[item.attribute_name] =
                            item.attribute_value_string ? item.attribute_value_string
                              : item.attribute_value_int ? item.attribute_value_int
                                : item.attribute_value_date ? (item.attribute_value_date) :
                                  item.attribute_value_array ? item.attribute_value_array : ""
                        }

                      })
                      setFormData({ ...convertedData, ...ca })
                      let sh: any = {}
                      response?.data?.data.asset_social_media?.map((item: any) => {
                        sh[item.social_media_platform] = item.url
                      })
                      setSocialLinks(sh)
                      if (!cid) {
                        setFileData(response?.data?.data?.asset_media)
                      }
                      else {
                        let arr: any = []
                        response?.data?.data?.asset_media.map((media: any) => {
                          delete media.id;
                          arr.push(media)
                        })
                        setFileData(arr)
                      }
                      if (response?.data?.data?.opportunities?.length > 0) { setaAddOpportunities(true) }
                      const convertedData2: any = [];
                      response?.data?.data?.opportunities?.map((oppr: any) => {
                        convertedData2.push(convertKeysToTitleCase(oppr))
                      })
                      if (cid) {
                        convertedData2.map((oppr: any) => {
                          delete oppr["Is Deleted"];
                          delete oppr["Id"];
                          oppr["Opportunity Media"].map((media: any) => {
                            delete media.id;
                          })
                          oppr.deliverables.map((media: any) => {
                            delete media.id;
                          })
                        })
                      }
                      setFormData2(convertedData2)
                      const attributeGroup = response?.data?.data?.athlete.length > 0
                        ? "athlete"
                        : response?.data?.data?.tournament.length > 0
                          ? "tournament"
                          : response?.data?.data?.team.length > 0
                            ? "team"
                            : "content";
                      oppfun(oppurtunites, response?.data?.data?.asset_type.name?.toLowerCase().replaceAll("_", " ").replaceAll("_", "/"), response?.data?.data?.asset_detail[0]?.draft?.formdata2, attributeGroup)
                      if (cid) {
                        setSelectSportType(response?.data?.data?.sport_type == "single" ? "Single Sport" : "Multi Sport")
                        setSelectMul(response?.data?.data?.sport)
                        setSelectSport(response?.data?.data?.sport_type == "single" ? response?.data?.data?.sport[0] : "")
                        setSelectedValue(response?.data?.data?.asset_type_id)
                      }
                    }
                    else {
                      setFormData((response?.data?.data?.asset_detail[0].draft.formdata) ? (response?.data?.data?.asset_detail[0].draft.formdata) : [])
                      setFileData((response?.data?.data?.asset_detail[0].draft.fileData) ? (response?.data?.data?.asset_detail[0].draft.fileData) : [])
                      setFormData2((response?.data?.data?.asset_detail[0].draft.formdata2) ? (response?.data?.data?.asset_detail[0].draft.formdata2) : [])
                      setSocialLinks((response?.data?.data?.asset_detail[0].draft.socialLinks) ? (response?.data?.data?.asset_detail[0].draft.socialLinks) : [])
                      setSelectedValue(response?.data?.data?.asset_type_id)
                      setSelectSportType(response?.data?.data?.sport_type == "single" ? "Single Sport" : "Multi Sport")
                      setSelectMul(response?.data?.data?.sport)
                      setSelectSport(response?.data?.data?.sport_type == "single" ? response?.data?.data?.sport[0] : "")
                      settempId(response?.data?.data?.template_id)
                      if (response?.data?.data?.asset_detail[0].draft.formdata2.length > 0) { setaAddOpportunities(true) }
                      oppfun(oppurtunites, response?.data?.data?.asset_type.name?.toLowerCase().replaceAll("_", " ").replaceAll("_", "/"), response?.data?.data?.asset_detail[0]?.draft?.formdata2)
                      // acc["asset_type_id"] = selectedValue;
                      // acc["template_id"] = tempId
                      // acc["sport"] = sportType == "Single Sport" ? [selectSport] : selectMul;
                      // acc["sport_type"] = sportType == "Single Sport" ? "single" : "multi";
                    }


                  })
                  arr.sort((a: any, b: any) => a.priority - b.priority);
                  setFields(arr)
                  getSellersCid(response?.data?.data?.seller_id)
                  // setLoad(false)
                  // setOtype(arr[0])

                })
                .catch((error) => {
                  setLoad(false)
                  mixpanelEvents.errorHandling({
                    name: 'Asset Creation',
                    msg: error?.response?.data?.error || error?.message
                  })
                });

            })
            .catch((error) => {
              setLoad(false)
              mixpanelEvents.errorHandling({
                name: 'Asset Creation',
                msg: error?.response?.data?.error || error?.message
              })
            });
        })
        .catch((error) => {
          setLoad(false)
          mixpanelEvents.errorHandling({
            name: 'Asset Creation',
            msg: error?.response?.data?.error || error?.message
          })
        });
    }
    else {
      getSellers()
      apis.getAssetTypes()
        .then((response: any) => {
          response.data.data.sort((a: any, b: any) => a.id - b.id);
          setAssetTypes(response.data?.data)
          // setSelectedValue(response.data?.data[0].id)
          apis.getAllPrimaryAttributes()
            .then((res2: any) => {
              const sports = res2.data?.data?.filter((item: any) => (item?.attribute_name?.toLowerCase() == "sport"))
              setAllSports(sports[0].option_values.filter((item: any) => item?.toLowerCase() != 'all'))
              const oppurtunites = res2.data?.data?.filter((item: any) => item?.primary_attr_for == "opportunities")
              // setOppAttr(oppurtunites)
              oppfun(oppurtunites)
              const sfArr = res2.data?.data?.filter((item: any) => item?.attribute_name == "Sports Format")
              setallSportsFormat(sfArr)
              // setAllSports(res2.data?.data?.option_values)
              setLoad(false)
            })
            .catch((error) => {
              setLoad(false)
              mixpanelEvents.errorHandling({
                name: 'Asset Creation',
                msg: error?.response?.data?.error || error?.message
              })
            });
        })
        .catch((error) => {
          setLoad(false)
          mixpanelEvents.errorHandling({
            name: 'Asset Creation',
            msg: error?.response?.data?.error || error?.message
          })
        });
    }

  }

  const getSellers = () => {
    apis.getUsers()
      .then((response: any) => {

        if (response?.data) {
          const arr: any = []
          response.data.data.map((item: any, index: any) => {
            if (item?.userroles[0]?.role?.name?.toLowerCase() == "seller-admin" || item?.userroles[0]?.role?.name?.toLowerCase() == "seller") {
              arr.push(item)
            }
          })
          setSellersList(arr)
          let arr2: any = []
          arr.map((item: any) => {
            arr2.push(item.name + " - (" + item.email + ")")
          })
          setSellersuserList(arr2)
        }
      })
      .catch((error) => {
      });
  }

  const getSellersCid = (sid: any) => {
    apis.getUsers()
      .then((response: any) => {

        if (response?.data) {
          const arr: any = []
          response.data.data.map((item: any, index: any) => {
            if (item?.userroles[0]?.role?.name?.toLowerCase() == "seller-admin" || item?.userroles[0]?.role?.name?.toLowerCase() == "seller") {
              arr.push(item)
            }
          })
          setSellersList(arr)
          let seller = arr.filter((item: any) => item.id == sid);
          setSellerId(seller[0].name + " - (" + seller[0].email + ")");
          setOrg_id(seller[0].organization.id)
          setseller_id(seller[0].id)
          let arr2: any = []
          arr.map((item: any) => {
            arr2.push(item.name + " - (" + item.email + ")")
          })
          setSellersuserList(arr2)
        }
        setLoad(false)
      })
      .catch((error) => {
        setLoad(false)
      });
  }

  const oppfun = (oppurtunites: any, type?: any, data?: any, attributeGroup?: any) => {
    let arr: any = []
    oppurtunites.sort((a: any, b: any) => a.id - b.id);
    oppurtunites?.map((item: any) => {
      const asset: any = {
        "type": item.attribute_type,
        "info": item.tooltip,
        "label": item.attribute_name,
        "field": 'typeField',
        "placeholder": item.placeholder,
        "metaDataField": '',
        "isRequired": item.is_mandatory,
        "maxLength": item.max_length,
        "value": "",
        "attr_for": item.primary_attr_for,
        "attribute_group": item.attribute_group,
        "attribute_subgroup": item.attribute_subgroup,
        "attribute_tertiary_group": item.attribute_tertiary_group,
        "is_hidden": item?.is_hidden
      }
      if (item.attribute_type == "multipleDropdown" || item.attribute_type == "dropdown") {
        asset["dropdownData"] = item.option_values
      }
      if (item.attribute_type == "checkBox" || item.attribute_type == "radioButton") {
        let arr: any = []
        item.option_values?.map((item2: any) => {
          arr.push({
            id: item2,
            label: item2,
          },)
        })
        asset["dropdownData"] = arr
      }
      arr.push(asset)
    })
    let arr1 = arr.filter((item: any) => { return item.label == "Opportunity Type" || item.label == "Opportunities" || item.label == "Unit Of Measurement" || item.label == "Currency" || item.label == "Rate" })
    let arr2 = arr.filter((item: any) => { return !(item.label == "Opportunity Type" || item.label == "Opportunities" || item.label == "Unit Of Measurement" || item.label == "Currency" || item.label == "Rate") })
    let arr3 = arr.filter((item: any) => { return (item.label == "Currency") })
    setcurrencylist(arr3[0].dropdownData)
    setOppAttr(arr2)
    setfixedOppAttr(arr1)
    if (cid) {
      // const attributeGroup = response?.data?.data?.athlete.length > 0
      // ? "athlete"
      // : response?.data?.data?.tournament.length > 0
      // ? "tournament"
      // : response?.data?.data?.team.length > 0
      // ? "team"
      // : "content";

      const arrrrrr = arr1.filter(
        (item: any) =>
          item.label === "Opportunity Type" && item.attribute_group === attributeGroup
      );
      setOtype(arrrrrr[0])
    }

    if (id) {
      let op: any = arr1.filter((item: any) => { return item.label == "Opportunity Type" && item.attribute_group == type })[0];
      setOtype(op)
      let a1: any = []
      let a2: any = []
      data?.map((item: any, index: any) => {
        let arr = arr1.filter((item: any) => {
          return item.label == "Opportunities" && item.attribute_group == type && item.attribute_subgroup == data[index]["Opportunity Type"];
        });

        let arr2 = arr1.filter((item: any) => {
          return item.label == "Unit Of Measurement" && item.attribute_group == type && item.attribute_subgroup == data[index]["Opportunity Type"];
        });
        a1.push(arr[0]);
        a2.push(arr2[0]);
      });
      setOppr(a1)
      setunit(a2)


    }
    // setOppAttr(arr)
  }

  const onEditSave = useCallback(() => { }, []);

  const handleStep0 = async (status: any, proceed = false, isTabControl = true) => {

    if (selectedValue && sportType && (sportType === "Multi Sport" ? selectMul.length > 0 : selectSport) && seller_id) {
      setLoad(true)
      if (!(cid || id)) {
        setFormData({})
        setSocialLinks([])
      }

      let body = {}
      if (sportType == "Single Sport") {
        body = {
          asset_type_id: selectedValue, sport: selectSport, sportType: "single"
        }
      }
      else if (sportType == "Multi Sport") {
        body = {
          asset_type_id: selectedValue, sportType: "multi"
        }
      }
      apis.getFormByAssetTypeSport(body)
        .then((response: any) => {
          let activeArr = response?.data?.data?.filter((item: any) => item.is_active)
          if (activeArr.length > 0) {
            settempId(activeArr[0].id)
            if (!(id || cid)) { setTemplateId(`${response?.data?.data[0]?.asset_type?.name}0`) }

            let arr: any = []
            activeArr[0]?.template_details?.map((item: any) => {
              let asset: any = {};
              if (item.primary_attribute_id) {
                asset = {
                  "priority": item.priority,
                  "isPrimary": true,
                  "type": item.primary_attribute.attribute_type,
                  "info": item?.tooltip,
                  "label": item.primary_attribute.attribute_name,
                  "field": 'typeField',
                  "placeholder": item?.placeholder,
                  "metaDataField": '',
                  "isRequired": item.primary_attribute.is_mandatory,
                  "maxLength": item.primary_attribute.max_length,
                  "value": "",
                  "attr_for": item.primary_attribute.primary_attr_for,
                  "is_hidden": item.is_hidden
                }
                if (item.primary_attribute.attribute_type == "multipleDropdown" || item.primary_attribute.attribute_type == "dropdown") {
                  if (item.primary_attribute.attribute_name == "Sports Format") {
                    let arr = allSportsFormat.filter((item: any) => {
                      if (sportType === "Single Sport") {
                        return item.attribute_subgroup === selectSport;
                      } else if (sportType === "Multi Sport") {
                        return selectMul.some((sport: any) => item.attribute_subgroup === sport);
                      }
                    });
                    let arr2: any = []
                    arr.map((item: any) => {
                      arr2 = [...arr2, ...item.option_values]
                    })
                    asset["dropdownData"] = arr2
                  }
                  else {
                    asset["dropdownData"] = item.primary_attribute.option_values
                  }
                }
                if (item.primary_attribute.attribute_type == "checkBox" || item.primary_attribute.attribute_type == "radioButton") {
                  let arr: any = []
                  item.primary_attribute.option_values?.map((item: any) => {
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
                  "priority": item.priority,
                  "isPrimary": false,
                  "type": item.attribute_type,
                  "info": item.tooltip,
                  "label": item.attribute_name,
                  "field": 'typeField',
                  "placeholder": item.placeholder,
                  "metaDataField": '',
                  "isRequired": item.is_mandatory,
                  "maxLength": item.max_length,
                  "value": "",
                  "attr_for": "asset_custom_attributes",
                  "is_hidden": item?.is_hidden
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
            setBackdrop(true);
            setFormStatus(status);
            tabControl(isTabControl);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            globalContext?.onFormSubmitted();
            setBackdrop(false);
            setLoad(false)
            // return true;
          }
          else {
            // alert("No Form Found for the selected Combination!!")
            setSnackbar({
              open: true,
              severity: 'error',
              message: 'No Form Found for the selected Combination!!',
            })
            setLoad(false)
          }

        })
        .catch((error) => {
          setLoad(false)
        });
    }
    else {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please fill all the mandatory fields!!',
      })
    }

  };

  const splitFormData = (data: any) => {
    let acc: any = {}
    data.map((item: any) => {
      let key = item.attr_for;
      if (!acc[key]) {
        acc[key] = (key == "asset_custom_attributes" ? [] : {});
      }
      if (!acc["asset_social_media"]) { acc["asset_social_media"] = []; }

      if (key === "asset_custom_attributes") {
        if (item?.type == "dateRangePicker") {
          acc[key].push({
            "attribute_name": item?.label,
            "attribute_type": item?.type,
            "attribute_value_range1": new Date(item.value[0]),
            "attribute_value_range2": new Date(item.value[1])
          });
        }
        else if (item.type == "datePicker") {
          acc[key].push({
            "attribute_name": item.label,
            "attribute_type": item.type,
            "attribute_value_date": new Date(item.value)
          });
        }
        else if (item.type == "number") {
          acc[key].push({
            "attribute_name": item.label,
            "attribute_type": item.type,
            "attribute_value_int": +item.value
          });
        }
        else if (item?.type == "multipleDropdown" || item?.type == "checkBox") {
          acc[key].push({
            "attribute_name": item.label,
            "attribute_type": item.type,
            "attribute_value_array": item.value
          });
        }
        else if (item.type == "section") {
          acc[key].push({
            "attribute_name": item.label,
            "attribute_type": item.type,
            "attribute_value_string": null
          });
        }
        else if (item.type == "textarea") {
          acc[key].push({
            "attribute_name": item.label,
            "attribute_type": item.type,
            "attribute_value_string": item.value
          });
        }
        else {
          acc[key].push({
            "attribute_name": item.label,
            "attribute_type": item.type,
            "attribute_value_string": item.value
          });
        }

      }
      else {
        if (item.type == "socialHandles") {
          const output = item.value ? (Object.keys(item.value).map(key => (
            {
              social_media_platform: key?.toLowerCase(),
              url: item.value[key] ? item.value[key] : null
            }
          ))) : [];
          acc["asset_social_media"] = output;
        }
        else {
          let label = item.isPrimary ? (item.label?.toLowerCase().trim().replace(/\s+/g, "_").replace("/", "_").replace("(", "_").replace(")", "_")) : item.label;
          if (item.type == "dateRangePicker") {
            acc[key][label + "_from"] = new Date(item.value[0]);
            acc[key][label + "_to"] = new Date(item.value[1]);
          }
          else {
            acc[key][label] = (item.type == "datePicker") ? new Date(item.value) : (item.type == "number") ? parseInt(item.value) : item.value
          }
        }
      }
    })

    acc['asset_detail']["asset_status"] = "created"
    acc['asset_detail']["ui_asset_listing_id"] = templateId
    acc["asset_type_id"] = selectedValue;
    acc["template_id"] = tempId
    acc["sport"] = sportType == "Single Sport" ? [selectSport] : selectMul;
    acc["sport_type"] = sportType == "Single Sport" ? "single" : "multi";
    acc["seller_id"] = parseInt(seller_id)
    acc["organization_id"] = parseInt(org_id)
    return acc;
  };

  const handleStep1 = (status: any, proceed = false, isTabControl = true) => {
    let check = fileData.filter((item: any) => { return (item.tags.includes('Cover Picture 3') || item.tags.includes('Cover Picture 2') || item.tags.includes('Cover Picture 1')) });
    let Tcheck = fileData.filter((item: any) => { return (item.tags.includes('Thumbnail')) });

    if (check.length > 0 && Tcheck.length > 0) {
      fields.map((item1: any) => {
        if (item1.type == "dateRangePicker") {
          item1.value = [formData[item1.label + " From"], formData[item1.label + " To"]]
        }
        else {
          item1.value = formData[item1.label]
        }
      })

      let arr: any = fields.filter((item: any) => {
        if (item.isRequired && (!item.value || item.value === "")) {
          return true;
        }
        if (item.isRequired && item.type === "multipleDropdown" && Array.isArray(item.value) && item.value.length === 0) {
          return true;
        }

        return false;
      });

      if ((arr.length > 0)) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: arr[0].label + ' is missing',
        })
      }
      else {
        setBackdrop(true);
        setFormStatus(status);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setBackdrop(false);
        // return true; 
      }
    } else {
      if (Tcheck.length == 0) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Thumbnail is required',
        })
      } else if (check?.length == 0) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Atleast one Cover Picture is required',
        })
      }

    }

  };

  type AnyObject = { [key: string]: any };

  function oppFun(obj: AnyObject): AnyObject {
    if (typeof obj !== 'object' || obj === null) {
      throw new Error('Input must be a non-null object');
    }

    return Object.entries(obj).reduce((acc: AnyObject, [key, value]) => {
      let newKey = key.trim().replace(/\s+/g, "_").replace("/", "_").replace("(", "_").replace(")", "_")?.toLowerCase(); // Replace spaces and convert to lowercase
      if (newKey == "deliverables") { newKey = "opportunity_deliverables" }
      acc[newKey] = (newKey == "rate" || newKey == "minimum_commitment_value" || newKey == "minimum_commitment_period") ? parseInt(value) : value;
      return acc;

    }, {});
  }

  function isvalidFun(json: any) {
    let arr = [];
    // let arr: any = oppAttr.filter((item: any) => { return (item.isRequired == true && !json[item.label] && json[item.label] != " ") })
    if (!json["Opportunity Type"] && json["Opportunity Type"] != " ") {
      arr.push({ label: "Opportunity Type" })
    }

    if (!json["Opportunities"] && json["Opportunities"] != " ") {
      arr.push({ label: "Opportunities" })
    }

    if (json["PCB"] != "Yes" && !json["Currency"] && json["Currency"] != " ") {
      arr.push({ label: "Currency" })
    }

    if (json["PCB"] != "Yes" && !json["Rate"] && json["Rate"] != " ") {
      arr.push({ label: "Rate" })
    }

    if (json["PCB"] != "Yes" && !json["Unit Of Measurement"] && json["Unit Of Measurement"] != " ") {
      arr.push({ label: "Unit Of Measurement" })
    }


    if (json["PCB"] != "Yes" && !json["Display Rate On Catalogue"] && json["Display Rate On Catalogue"] != " ") {
      arr.push({ label: "Display Rate On Catalogue" })
    }

    if (json["deliverables"].length == 0) {
      // arr.push({ label: "Deliverables" })
    }

    if (json["deliverables"].length > 0) {
      for (let i = 0; i < json["deliverables"].length; i++) {
        if (!json["deliverables"][i].deliverables) {
          arr.push({ label: "Deliverables" })
          break;
        }
        // else if (!json["deliverables"][i]["specs_of_deliverables"]) {
        //   arr.push({ label: "Specs of Deliverables" })
        //   break;
        // }
      }
    }

    if (json["Tc Type"] == "File") {
      if (!json["Tc File"]) {
        arr.push({ label: "Terms and Conditions File" })
      }
    }

    if (json["Tc Type"] == "Text") {
      if (!json["Tc Text"]) {
        arr.push({ label: "Terms and Conditions Content" })
      }
    }

    return arr;
  }


  const handleFinal = (status: string) => {
    setLoad(true)
    let aTaken = attemptsTaken + 1
    setAttemptsTaken((prev) => prev + 1);
    let body2: any = []
    formData2.map((item: any) => {
      body2.push(oppFun(item))
    })
    if (!id) {
      setLoad(true)
      const body = splitFormData(fields);
      body["asset_media"] = fileData;
      const filteredSocialMedia = body.asset_social_media.filter((scl: any) => scl.url != null);
      body.asset_social_media = filteredSocialMedia
      let valid = true
      for (let i = 0; i < formData2.length; i++) {
        let varr = isvalidFun(formData2[i])
        if ((varr.length > 0)) {
          setLoad(false)
          setSnackbar({
            open: true,
            severity: 'error',
            message: "Opportunity " + (i + 1) + " " + varr[0].label + ' is missing',
          })
          valid = false
          break;
        }
      }
      if (valid) {
        apis.addAsset(body)
          .then((res2: any) => {
            if (formData2.length > 0) {
              body2.map((opp: any) => {
                opp["asset_id"] = res2.data.data.id
                opp["rate"] = opp["pcb"] == "Yes" ? 0 : opp["rate"];
                opp["unit_of_measurement"] = opp["pcb"] == "Yes" ? "Custom Pricing" : opp["unit_of_measurement"];
                opp["currency"] = opp["pcb"] == "Yes" ? "INR" : opp["currency"];
                opp["custom_pricing"] = opp["pcb"] == "Yes" ? true : false
                delete opp["pcb"];
              })
              setid(res2.data.data.id)
              apis.addOppurtunity(body2)
                .then((res2: any) => {
                  const assetData = {
                    AssetStatus: "Created",
                    AssetType: name,
                    NumberOfAttempts: aTaken,
                    PreviousStatus: null,
                    // LastField: null, 
                    OpportunitiesListed: true,
                    OpportunityCount: formData2.length,
                  };

                  mixpanelEvents.onAssetFormUsed(assetData);
                  setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Asset Created successfully!',
                  });
                  setTimeout(() => {
                    navigate('/catalogue-management');
                    setLoad(false)
                  }, 1000);

                })
                .catch((error) => {
                  setLoad(false)
                  mixpanelEvents.errorHandling({
                    name: 'OpportunityAdded',
                    msg: error?.response?.data?.error || error?.message
                  })
                  setSnackbar({
                    open: true,
                    severity: 'error',
                    message: error?.response?.data?.error || 'something went wrong!!',
                  })
                });
            }
            else {
              const assetData = {
                AssetStatus: "Created",
                AssetType: name,
                NumberOfAttempts: aTaken,
                PreviousStatus: null,
                // LastField: null, 
                OpportunitiesListed: false,
                OpportunityCount: formData2.length,
              };

              mixpanelEvents.onAssetFormUsed(assetData);
              setSnackbar({
                open: true,
                severity: 'success',
                message: ' Asset Created successfully!',
              });
              setTimeout(() => {
                navigate('/catalogue-management');
                setLoad(false)
              }, 1000);
            }
          })
          .catch((error) => {
            mixpanelEvents.errorHandling({
              name: 'AssetFormUsed',
              msg: error?.response?.data?.error || error?.message
            })
            setSnackbar({
              open: true,
              severity: 'error',
              message: error?.response?.data?.error || 'something went wrong!!',
            })
            setLoad(false)
          });
      }
    }
    else if (assetData.asset_detail[0].asset_status == "draft") {
      const body = splitFormData(fields);
      body["id"] = assetData.id;
      body["asset_media"] = fileData;
      body["asset_type_id"] = selectedValue;
      body["template_id"] = tempId;
      body["asset_media"] = fileData;
      body["sport"] = sportType === "Single Sport" ? [selectSport] : selectMul;
      body["sport_type"] = sportType === "Single Sport" ? "single" : "multi";
      body["seller_id"] = parseInt(seller_id);
      body["organization_id"] = parseInt(org_id);
      body.asset_detail["id"] = assetData.asset_detail[0].id;
      body["from_draft"] = true;

      const filteredSocialMedia = body.asset_social_media.filter((scl: any) => scl.url != null);
      body.asset_social_media = filteredSocialMedia

      apis.updateAsset(body)
        .then((res2: any) => {
          body2.map((opp: any) => {
            opp["asset_id"] = res2.data.data.id
            opp["rate"] = opp["pcb"] == "Yes" ? 0 : opp["rate"];
            opp["unit_of_measurement"] = opp["pcb"] == "Yes" ? "Custom Pricing" : opp["unit_of_measurement"];
            opp["currency"] = opp["pcb"] == "Yes" ? "INR" : opp["currency"];
            opp["custom_pricing"] = opp["pcb"] == "Yes" ? true : false
            delete opp["pcb"];
          })
          if (body2.length) {
            apis.updateOpportunity(body2, id)
              .then((res2: any) => {
                const assetData = {
                  AssetStatus: "Draft",
                  AssetType: name,
                  NumberOfAttempts: aTaken,
                  PreviousStatus: "Draft",
                  // LastField: null, 
                  OpportunitiesListed: true,
                  OpportunityCount: body2.length,
                };

                mixpanelEvents.onAssetFormUsed(assetData);

                setSnackbar({
                  open: true,
                  severity: 'success',
                  message: ' Asset Updated successfully!',
                });

                setTimeout(() => {
                  navigate('/catalogue-management');
                  setLoad(false)
                }, 1000);
              })
              .catch((error) => {
                mixpanelEvents.errorHandling({
                  name: 'OpportunityAdded',
                  msg: error?.response?.data?.error || error?.message
                })
                setSnackbar({
                  open: true,
                  severity: 'error',
                  message: error?.response?.data?.error || 'something went wrong!!',
                })
                setLoad(false)
              });
          }
          else {
            const assetData = {
              AssetStatus: "Draft",
              AssetType: name,
              NumberOfAttempts: aTaken,
              PreviousStatus: "Draft",
              // LastField: null, 
              OpportunitiesListed: false,
              OpportunityCount: formData2.length,
            };

            mixpanelEvents.onAssetFormUsed(assetData);
            setSnackbar({
              open: true,
              severity: 'success',
              message: ' Asset Updated successfully!',
            });
            setTimeout(() => {
              navigate('/catalogue-management');
              setLoad(false)
            }, 1000);
          }
        })
        .catch((error) => {
          setSnackbar({
            open: true,
            severity: 'error',
            message: error?.response?.data?.error || 'something went wrong!!',
          })
          mixpanelEvents.errorHandling({
            name: 'AssetFormUsed',
            msg: error?.response?.data?.error || error?.message
          })
          setLoad(false)
        });

    }
    else {
      const body = splitFormData(fields);
      body["asset_media"] = fileData;
      body.asset_detail['id'] = assetData.asset_detail[0].id
      body[assetData?.asset_type?.name?.toLowerCase().replaceAll("_", " ").replaceAll("_", "/")]['id'] = assetData[assetData?.asset_type?.name?.toLowerCase().replaceAll("_", " ").replaceAll("_", "/")][0].id
      body["id"] = assetData.id
      body['asset_detail']["asset_status"] = assetData.asset_detail[0].asset_status
      body["asset_type_id"] = assetData.asset_type_id;
      body["template_id"] = assetData.template_id
      // body["sport"] = assetData.sport
      // body["sport_type"] = assetData.sport_type
      body["sport"] = sportType === "Single Sport" ? [selectSport] : selectMul;
      body["sport_type"] = sportType === "Single Sport" ? "single" : "multi";
      body["seller_id"] = parseInt(seller_id);
      body["organization_id"] = parseInt(assetData.organization_id);
      body.asset_custom_attributes?.map((bca: any, index: any) => {
        assetData.asset_custom_attributes?.map((ca: any, index: any) => {
          if (bca.attribute_name == ca.attribute_name) {
            bca["id"] = ca.id
          }
        })
      })
      body.asset_social_media?.map((bca: any, index: any) => {
        assetData.asset_social_media?.map((ca: any, index: any) => {
          if (bca.social_media_platform == ca.social_media_platform) {
            bca["id"] = ca.id
          }
        })
      })
      const filteredSocialMedia = body.asset_social_media.filter((scl: any) => scl.url != null);
      body.asset_social_media = filteredSocialMedia
      let valid = true
      for (let i = 0; i < formData2.length; i++) {
        let varr = isvalidFun(formData2[i])
        if ((varr.length > 0)) {
          setLoad(false)
          setSnackbar({
            open: true,
            severity: 'error',
            message: "Opportunity " + (i + 1) + " " + varr[0].label + ' is missing',
          })
          valid = false
          break;
        }
      }
      if (valid) {
        body2.map((opp: any) => {
          opp["asset_id"] = parseInt(id);
          opp["is_deleted"] = false;
          opp["rate"] = opp["pcb"] == "Yes" ? 0 : opp["rate"];
          opp["unit_of_measurement"] = opp["pcb"] == "Yes" ? "Custom Pricing" : opp["unit_of_measurement"];
          opp["currency"] = opp["pcb"] == "Yes" ? "INR" : opp["currency"];
          opp["custom_pricing"] = opp["pcb"] == "Yes" ? true : false
          delete opp["pcb"];
        })
        apis.updateAsset(body)
          .then((res2: any) => {
            if (formData2.length > 0) {
              apis.updateOpportunity(body2, id)
                .then((res2: any) => {

                  const assetItemData = {
                    AssetStatus: "Edited",
                    AssetType: name,
                    NumberOfAttempts: aTaken,
                    PreviousStatus: assetData?.asset_detail[0]?.asset_status,
                    // LastField: null, 
                    OpportunitiesListed: true,
                    OpportunityCount: formData2.length,
                  };

                  mixpanelEvents.onAssetFormUsed(assetItemData);

                  if (assetData?.asset_detail[0]?.asset_status?.toLowerCase() == "published") {
                    const editBody: any = {
                      "id": id,
                      "asset_detail": {
                        "id": assetData?.asset_detail[0]?.id,
                        "asset_status": "edited",
                      }
                    }
                    handleActions(editBody)

                  } else {

                    setLoad(false)
                    setSnackbar({
                      open: true,
                      severity: 'success',
                      message: ' Asset Updated successfully!',
                    });
                    setTimeout(() => {
                      navigate('/catalogue-management');
                    }, 1000);
                  }


                })
                .catch((error) => {
                  setSnackbar({
                    open: true,
                    severity: 'error',
                    message: error?.response?.data?.error || 'something went wrong!!',
                  })
                  mixpanelEvents.errorHandling({
                    name: 'OpportunityAdded',
                    msg: error?.response?.data?.error || error?.message
                  })
                  setLoad(false)
                })
            } else {
              const assetItemData = {
                AssetStatus: "Edited",
                AssetType: name,
                NumberOfAttempts: aTaken,
                PreviousStatus: assetData?.asset_detail[0]?.asset_status,
                // LastField: null, 
                OpportunitiesListed: false,
                OpportunityCount: formData2.length,
              };

              mixpanelEvents.onAssetFormUsed(assetItemData);
              if (assetData?.asset_detail[0]?.asset_status?.toLowerCase() == "published") {

                const editBody: any = {
                  "id": id,
                  "asset_detail": {
                    "id": assetData?.asset_detail[0]?.id,
                    "asset_status": "edited",
                  }
                }
                handleActions(editBody)
              } else {

                setSnackbar({
                  open: true,
                  severity: 'success',
                  message: ' Asset Updated successfully!',
                });
                setTimeout(() => {
                  navigate('/catalogue-management');
                  setLoad(false)
                }, 1000);
              }
            }
          })
          .catch((error) => {
            setSnackbar({
              open: true,
              severity: 'error',
              message: error?.response?.data?.error || 'something went wrong!!',
            })
            setLoad(false)
            mixpanelEvents.errorHandling({
              name: 'AssetFormUsed',
              msg: error?.response?.data?.error || error?.message
            })
          });
      }
    }
  };

  const handleMediaDel = (e: any) => {

    setLoad(true)
    let arr = fileData.filter((item: any) => { return item.tags[0] != e })
    setFileData(arr.length > 0 ? arr : [])
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Deleted successfully',
    });
    setLoad(false)

  }

  const handleOpprMediaDel = (e: any, opindex: any) => {
    setLoad(true)
    const updatedFormData = [...formData2];
    const filteredMedia = updatedFormData[opindex]?.["Opportunity Media"]?.filter((item: any) => item.tags[0] !== e);
    updatedFormData[opindex]["Opportunity Media"] = filteredMedia;
    setFormData2(updatedFormData);
    setLoad(false)
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Deleted successfully',
    });
  };

  const deleteoppr = (opindex: any) => {
    if (formData2[opindex].Id) {
      setLoad(true)
      apis.deleteOpportunity(formData2[opindex].Id)
        .then((res2: any) => {
          setFormData2((prevData: any) => {
            const updatedData = [...prevData];
            updatedData.splice(opindex, 1);
            return updatedData;
          });
          const assetItemData = {
            AssetStatus: assetData?.asset_detail[0]?.asset_status,
            AssetType: name,
            NumberOfAttempts: 1,
            PreviousStatus: assetData?.asset_detail[0]?.asset_status,
            // LastField: null, 
            OpportunitiesListed: true,
            OpportunityCount: formData2.length - 1,
          };

          mixpanelEvents.onAssetFormUsed(assetItemData);
          setLoad(false)
        })
        .catch((error) => {
          setLoad(false)
        });
    }
    else {
      setFormData2((prevData: any) => {
        const updatedData = [...prevData];
        updatedData.splice(opindex, 1);
        return updatedData;
      });
    }
  }

  const constructDraft = () => {
    let acc = {
      asset_detail: {
        asset_status: "draft",
        draft: {
          formdata: formData,
          formdata2: formData2,
          fileData: fileData,
          socialLinks: socialLinks
        }
      },
      asset_type_id: selectedValue,
      template_id: tempId,
      asset_media: fileData,
      sport: sportType === "Single Sport" ? [selectSport] : selectMul,
      sport_type: sportType === "Single Sport" ? "single" : "multi",
      seller_id: parseInt(seller_id),
      organization_id: parseInt(org_id)
    };
    return acc;
  };
  const fabStyle: any = {
    position: 'fixed',
    bottom: '100px',
    right: deviceType == "mobile" ? '20px' : '50px',
  };


  function draftFun() {

    if (formData.Name) {
      setLoad(true)
      const body: any = constructDraft()
      if (!id) {
        apis.addAsset(body)
          .then((res2: any) => {
            const assetData = {
              AssetStatus: "Draft",
              AssetType: name,
              NumberOfAttempts: 1,
              PreviousStatus: "Draft",
              // LastField: null, 
              OpportunitiesListed: (body.asset_detail?.draft?.formdata2?.length) ? true : false || false,
              OpportunityCount: body.asset_detail?.draft?.formdata2?.length || null,
            };

            mixpanelEvents.onAssetFormUsed(assetData);
            setSnackbar({
              open: true,
              severity: 'success',
              message: ' Asset Drafted successfully!',
            });
            setTimeout(() => {
              navigate('/catalogue-management');
            }, 1000);
            setLoad(false)
          })
          .catch((error) => {
            setSnackbar({
              open: true,
              severity: 'error',
              message: error?.response?.data?.error || 'something went wrong!!',
            })
            setLoad(false)
          });
      }
      if (id) {
        setLoad(true)
        body["id"] = assetData.id;
        body.asset_detail["id"] = assetData.asset_detail[0].id;
        apis.updateAsset(body)
          .then((res2: any) => {
            const assetData = {
              AssetStatus: "Draft",
              AssetType: name,
              NumberOfAttempts: 1,
              PreviousStatus: "Draft",
              // LastField: null, 
              OpportunitiesListed: (body.asset_detail?.draft?.formdata2?.length) ? true : false || false,
              OpportunityCount: body.asset_detail?.draft?.formdata2?.length || null,
            };

            mixpanelEvents.onAssetFormUsed(assetData);
            setSnackbar({
              open: true,
              severity: 'success',
              message: 'Draft Asset updated successfully!',
            });
            setTimeout(() => {
              navigate('/catalogue-management');
            }, 1000);
            setLoad(false)
          })
          .catch((error) => {
            setLoad(false)
            setSnackbar({
              open: true,
              severity: 'error',
              message: error?.response?.data?.error || 'something went wrong!!',
            })
          });
      }

    }
    else {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Asset Name is missing',
      })
    }
  }


  const handleToggleDrawer = () => {
    setOpen(!open)
  }

  const delDeliverables = (index: any, opindex: any) => {
    setFormData2((prevData: any) => {
      const updatedData = [...prevData];
      updatedData[opindex].deliverables = updatedData[opindex].deliverables.filter((item: any, i: any) => i !== index);
      return updatedData;
    });

  }

  const handleActions = (editBody: any) => {
    setLoad(true)
    apis.updateAsset(editBody)
      .then((res2: any) => {
        if (res2?.data?.status == "success") {
          setLoad(false)
          setSnackbar({
            open: true,
            severity: 'success',
            message: "Asset Updated successfully!",
          });
          setTimeout(() => {
            navigate('/catalogue-management');
          }, 1000);

        }
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          severity: 'error',
          message: (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
        });
        setLoad(false)
      });
  }


  if (load) {
    return (
      <div className="centered-container">
        <div className="loader"></div>
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
      </div>
    )
  }
  else {
    return (
      <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", paddingBottom: 10 }}>
        <Meta title={'Zuper | List Assets'} />
        <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", paddingBottom: 10 }}>
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
          <>
            <Stack
              sx={{
                width: deviceType === 'mobile' ? '100%' : '100%',
                display: 'flex',
                justifyContent: deviceType === 'mobile' ? 'center' : 'start',
                textAlign: 'start',
                alignItems: deviceType === 'mobile' ? 'center' : 'start',
                margin: '24px 0 24px 0',
                paddingLeft: '5%',
                paddingRight: "5%",
                '& .MuiStack-root': {
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center'
                }
              }}
              spacing={1}
            >
              <ZupotsuStepper
                steps={steps}
                alternativeLabelPresent={deviceType === 'mobile' ? false : false}
                showLabel={true}
                myActiveStep={
                  // id ? activeStep : 
                  activeStep + 1}
                stepperCirclesWidthHeightProps={stepperCirclesWidthHeightProps}
                stepNumberFontSize={'16px'}
                onStepClick={(index) => {
                  // if (id) {

                  //   if (index < activeStep) { setActiveStep(index + 1); }

                  // }
                  // else {
                  // if (index != 0) { setActiveStep(index - 1); }
                  if (index < activeStep) {
                    setActiveStep(index)
                  }
                  // }

                }}
              />
            </Stack>
            {activeStep === 0 && (
              <div style={{ overflow: 'auto', width: '100%', marginBottom: '40px', }} className="team-listing-scroll">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    gap: '27px'
                  }}
                >

                  <div
                    style={{
                      width: '80%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontWeight: '700',
                        fontSize: '24px',
                        lineHeight: '36px',
                        textAlign: 'center'
                      }}
                    >
                      What is the type of the asset you would like to list?
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        // padding: '10px',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: "center",
                        gap: "15px",
                        width: "100%",
                        // overflow: 'scroll',
                        // flexWrap: "wrap"

                      }}
                    >

                      {assetTypes && (
                        assetTypes.map((iterator: any, index: any) => {
                          return (
                            <div
                              onClick={() => {
                                if (!(cid || id)) {
                                  setSelectedValue(iterator.id)
                                  let arr = fixedoppAttr.filter((item: any) => { return item.label == "Opportunity Type" && item.attribute_group == iterator.name?.toLowerCase() })
                                  setOtype(arr[0])
                                  setName(iterator.name)
                                  if (iterator.name == "Team" || iterator.name == "Athlete") { setSelectSportType("Single Sport") }
                                }
                              }}
                              key={index}
                              style={{
                                display: "flex",
                                width: '243px',
                                height: '180px',
                                padding: '20px',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                borderRadius: '16px',
                                backgroundColor: 'rgb(255,253,253)',
                                border: "1px solid rgba(224, 224, 224, 1)",
                                opacity: (cid || id) ? '0.6' : '1'
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: '100%',
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center'
                                }}
                              >
                                <div
                                  style={{
                                    width: selectedValue == iterator.id ? "20px" : '20px',
                                    height: selectedValue == iterator.id ? "20px" : '20px',
                                    borderRadius: '30px',
                                    marginLeft: '-5px',
                                    marginTop: '-5px',
                                    border: selectedValue == iterator.id ? "4px solid rgba(226, 11, 24, 1)" : '1.5px solid rgba(231, 231, 231, 1)'
                                  }}>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  width: '100%',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginBottom: "12px"
                                }}
                              >
                                <img width={80} height={80} src={iterator.logo} style={{ objectFit: 'contain' }} />
                              </div>
                              <Typography
                                sx={{
                                  fontFamily: 'Inter',
                                  fontWeight: '500',
                                  fontSize: '16px',
                                  // lineHeight: '30px',
                                  textAlign: 'center',
                                  marginTop: "5px",
                                  marginBottom: "5px"
                                }}
                              >
                                {iterator.name}
                              </Typography>
                            </div>
                          );
                        }))
                      }
                    </div>
                  </div>
                  <div
                    style={{
                      width: '80%',
                    }}
                  >
                    <ZupotsuAutocomplete
                      title="Sport Type"
                      placeholder="Select Sport Type"
                      isRequired={true}
                      name="sportType"
                      dropdownData={(name == "Team" || name == "Athlete") ? ["Single Sport"] : ["Single Sport", "Multi Sport"]}
                      value={sportType || ''}
                      handleChange={(event: any) => {
                        // setSellerId(event?.target?.value);
                        setSelectSportType(event.target.value)
                      }}
                      previewMode={isTabDisable}
                      freeSolo={true}
                    />
                  </div>
                  {sportType == "Single Sport" && (<div
                    style={{
                      width: '80%',
                    }}
                  >
                    <ZupotsuAutocomplete
                      title="Select Sport"
                      placeholder="Select Sport"
                      isRequired={true}
                      name="sport"
                      dropdownData={allSports}
                      value={selectSport || ''}
                      handleChange={(event: any) => {
                        // setSellerId(event?.target?.value);
                        setSelectSport(event.target.value)
                      }}
                      previewMode={isTabDisable}
                      freeSolo={true}
                    />
                  </div>)}

                  {sportType == "Multi Sport" && (
                    <div
                      style={{
                        width: '80%',

                      }}
                    >

                      <ZupotsuMultiSelect
                        title="Select Sport"
                        dropdownData={allSports}
                        name="sport"
                        isRequired={true}
                        placeholder="Select Sport"
                        value={selectMul || []}
                        handleChange={(e) => {
                          setSelectMul(e);
                        }}
                        previewMode={false}
                      />
                    </div>)}
                  {(isAdmin || isPublisher || isApprover || emailFetched == "marketing@zupotsu.com") && (<div
                    style={{
                      width: '80%',
                    }}
                  >
                    <ZupotsuAutoComplete
                      title="Select Seller"
                      placeholder="Select Seller"
                      isRequired={true}
                      name="selectedAssetType"
                      dropdownData={sellersuserList}
                      value={sellerId || ''}
                      handleChange={(event: any) => {
                        // let semail = event?.target?.value?.split("(")[1]?.split(")")[0];
                        const input = event?.target?.value || "";
                        // Regex to extract the email inside parentheses
                        const emailMatch = input.match(/\(([^)]+)\)/); // Matches content inside parentheses
                        const semail = emailMatch ? emailMatch[1] : null;
                        setSellerId(event?.target?.value);
                        let seller = sellersList.find((item: any) => item?.email === semail);
                        if (seller) {
                          setOrg_id(seller.organization?.id || "");
                          setseller_id(seller.id);
                        } else {
                          setOrg_id("");
                          setseller_id("");
                        }
                      }}
                      previewMode={false}
                      freeSolo={true}
                    />
                  </div>)}

                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div style={{ overflow: 'auto', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', border: "1px solid #80808029", padding: "2.5%", width: "95%", marginBottom: '40px', }} className="team-listing-scroll">
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
                    FILL ASSET DETAILS
                  </Typography>
                </div>
                {(formData && metaData && fields && socialLinks) ? (
                  <DynamicFields
                    deviceType={deviceType}
                    fields={fields}
                    handleInputChange={handleInputChange}
                    handleInputChange2={handleInputChange2}
                    handleInputChangeDatePicker={handleInputChangeDatePicker}
                    handleInputChange3={handleInputChange3}
                    metaData={metaData}
                    formData={formData}
                    errors={errors}
                    previewMode={false}
                    onChangeSocial={onChangeSocial}
                    socialLinks={socialLinks}
                  />) : (
                  <div className="centered-container">
                    <div className="loader"></div>
                  </div>
                )
                }



                <div style={{ ...imgUploadParElStyle, marginTop: '30px', marginBottom: '100px' }}>


                  <Row xs={12} md={12} lg={12} style={{ width: '100%' }}>

                    <Col xs={12} md={4} lg={4} style={{
                      marginTop: deviceType == "mobile" ? "60px" : '0px',
                    }}>
                      <ZupotsuImgUpload
                        fileSize={'Max Size  10 MB'}
                        handleDelete={handleMediaDel}
                        // uploadedImage={fileData?.thumbnail}
                        uploadedImage={
                          fileData.find((item: any) => item.tags[0] === 'Thumbnail')?.media_url || ''
                        }
                        fileType={'jpg'}
                        name={'Thumbnail'}
                        isTooltip={
                          (assetData?.asset_type?.name || name) === "Athlete" ? (
                            <>
                              Image recommendations:<br />
                              1. Size: 260 x 150 Px (&lt;10 MB)<br />
                              2. Front facing, Upper Torso<br />
                              3. Remove background, use only cutout
                            </>
                          ) : (assetData?.asset_type?.name || name) === "Team" ? (
                            <>
                              Image recommendations:<br />
                              1. Size: 260 x 150 Px (&lt;10 MB)<br />
                              2. Preferably Logo of the team<br />
                              3. Remove background, use only cutout
                            </>
                          ) : (assetData?.asset_type?.name || name) === "Tournament" ? (
                            <>
                              Image recommendations:<br />
                              1. Size: 260 x 150 Px (&lt;10 MB)<br />
                              2. Preferably Logo of the tournament<br />
                              3. Remove background, use only cutout
                            </>
                          ) : (assetData?.asset_type?.name || name) === "Content" ? (
                            <>
                              Image recommendations:<br />
                              1. Size: 260 x 150 Px (&lt;10 MB)<br />
                              2. Preferably Logo or popular face of the content<br />
                              3. Remove background, use only cutout
                            </>
                          ) : assetData.assetType
                        }

                        isRequired={true}
                        imgCardLabel={'Upload Thumbnail'}
                        uploadTitle={'Click to upload or Drag & Drop png/jpg here'}
                        setUploadedImage={handleFileChange}
                      />
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                      <ZupotsuImgUpload
                        uploadedImage={
                          fileData.find((item: any) => item.tags[0] === 'Logo')?.media_url || ''
                        }
                        handleDelete={handleMediaDel}
                        fileSize={'Max Size 10 MB'}
                        fileType={'jpg'}
                        name={'Logo'}
                        imgCardLabel={
                          deviceType === 'mobile'
                            ? 'Upload Logo'
                            : 'Upload Logo'
                        }
                        uploadTitle={'Click to upload or Drag & Drop png/jpg here'}
                        setUploadedImage={handleFileChange}
                      />
                    </Col>
                    {/* </div> */}
                    {/* <div
                      style={{
                        marginTop: '0px',
                         width:'33%'
                      }}
                    > */}
                    <Col xs={12} md={4} lg={4} style={{
                      marginTop: deviceType == "mobile" ? "60px" : '0px',
                    }}>
                      <ZupotsuImgUpload
                        fileSize={'Max Size 10 MB'}
                        // uploadedImage={fileData?.pitchDeckFile}
                        uploadedImage={
                          fileData.find((item: any) => item.tags[0] === 'Pitch Deck')?.media_url || ''
                        }
                        handleDelete={handleMediaDel}
                        fileType={'pdf'}
                        name={'Pitch Deck'}
                        imgCardLabel={'Upload Pitch Deck'}
                        uploadTitle={'Click to upload or Drag & Drop the pdf here   '}
                        setUploadedImage={handleFileChange}
                      />
                    </Col>
                    {/* </div>
                    <div
                      style={{
                        marginTop: '0px',
                         width:'33%'
                      }}
                    > */}
                    {/* </div>
                  </div> */}

                  </Row>

                  <div style={{
                    width: '100%',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'flex-start',
                    marginTop: deviceType == "mobile" ? "50px" : '50px',
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

                      <span
                        style={{
                          color: 'var(--Zupotso-Primary, #E20B18)',
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '600',
                          lineHeight: '140%',
                        }}
                      >
                        *
                      </span>

                      <ZupotsuTooltip
                        tooltipMessage={
                          (assetData?.asset_type?.name || name) === "Athlete" ? (
                            <>
                              Image recommendations:
                              <br />1. Size: Min Height 350 Px, Image ratio 4:3 (&lt;10 MB)
                              <br />2. Use an action image of the athlete
                              <br />3. Preferably, keep the athlete at the center of the image
                            </>
                          ) : (assetData?.asset_type?.name || name) === "Team" ? (
                            <>
                              Image recommendations:
                              <br />1. Size: Min Height 350 Px, Image ratio 4:3 (&lt;10 MB)
                              <br />2. Use an action image of the team
                              <br />3. Preferably, keep the team at the center of the image
                            </>
                          ) : (assetData?.asset_type?.name || name) === "Tournament" ? (
                            <>
                              Image recommendations:
                              <br />1. Size: Min Height 350 Px, Image ratio 4:3 (&lt;10 MB)
                              <br />2. Use an action image of the tournament
                              <br />3. Preferably, keep the logo at the center of the image
                            </>
                          ) : (assetData?.asset_type?.name || name) === "Content" ? (
                            <>
                              Image recommendations:
                              <br />1. Size: Min Height 350 Px, Image ratio 4:3 (&lt;10 MB)
                              <br />2. Use an action image of the content
                              <br />3. Preferably, keep the logo at the center of the image
                            </>
                          ) : (
                            ""
                          )
                        }
                        icon={infoCircle}
                      />


                    </Typography>

                    <div
                      style={{
                        display: 'flex',
                        // gap: deviceType === 'mobile' ? '14px' : '30px',
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Row xs={12} md={12} lg={12} style={{ width: '100%' }}>
                        <Col xs={12} md={4} lg={4}
                          style={{
                            marginTop: deviceType == "mobile" ? "20px" : '0px',
                          }}
                        >
                          <ZupotsuImgUpload
                            fileSize={'Max Size 10 MB'}
                            // uploadedImage={fileData?.coverPicture1} 
                            handleDelete={handleMediaDel}
                            uploadedImage={
                              // Filter the fileData array to find items with 'logo' in tags
                              fileData.filter((item: any) => item.tags.includes('Cover Picture 1')).length > 0
                                ? fileData.filter((item: any) => item.tags.includes('Cover Picture 1'))[0].media_url
                                : ''
                            }
                            fileType={'jpg'}
                            name={'Cover Picture 1'}
                            imgCardLabel={''}
                            uploadTitle={
                              'Click to upload or Drag & Drop png/jpg here'
                            }
                            setUploadedImage={handleFileChange}
                          />
                        </Col>
                        <Col xs={12} md={4} lg={4}
                          style={{
                            marginTop: deviceType == "mobile" ? "20px" : '0px',
                          }}
                        >
                          <div
                            style={{
                              marginTop: '0px',
                            }}
                          >
                            <ZupotsuImgUpload
                              fileSize={'MaxSize  10 MB'}
                              handleDelete={handleMediaDel}
                              // uploadedImage={fileData?.coverPicture2}
                              uploadedImage={
                                // Filter the fileData array to find items with 'logo' in tags
                                fileData.filter((item: any) => item.tags.includes('Cover Picture 2')).length > 0
                                  ? fileData.filter((item: any) => item.tags.includes('Cover Picture 2'))[0].media_url
                                  : ''
                              }
                              fileType={'jgp'}
                              name={'Cover Picture 2'}
                              imgCardLabel={''}
                              uploadTitle={
                                'Click to upload or Drag & Drop png/jpg here'
                              }
                              setUploadedImage={handleFileChange}
                            />
                          </div>
                        </Col>
                        <Col xs={12} md={4} lg={4} style={{
                          marginTop: deviceType == "mobile" ? "20px" : '0px',
                        }}>
                          <div
                            style={{
                              marginTop: '0px',
                            }}
                          >
                            <ZupotsuImgUpload
                              fileSize={'MaxSize  10 MB'}
                              // uploadedImage={fileData?.coverPicture3}
                              handleDelete={handleMediaDel}
                              uploadedImage={
                                // Filter the fileData array to find items with 'logo' in tags
                                fileData.filter((item: any) => item.tags.includes('Cover Picture 3')).length > 0
                                  ? fileData.filter((item: any) => item.tags.includes('Cover Picture 3'))[0].media_url
                                  : ''
                              }
                              fileType={'jgp'}
                              name={'Cover Picture 3'}
                              imgCardLabel={''}
                              uploadTitle={
                                'Click to upload or Drag & Drop png/jpg here'
                              }
                              setUploadedImage={handleFileChange}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <>
                {!addOpportunities && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      background: '#F8F7F7',
                      gap: '23px',
                      width: '100%',
                      height: deviceType === 'mobile' ? '200px' : '348px',
                      padding: deviceType === 'mobile' ? '0 12px' : '',
                      marginTop: deviceType === 'mobile' ? '24px' : '',
                      marginBottom: '40px',
                    }}
                  >
                    <Typography
                      style={{
                        color: 'var(--Gray-1, #333)',
                        textAlign: 'center',
                        fontFamily: 'Inter',
                        fontSize: deviceType === 'mobile' ? '16px' : '20px',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        lineHeight: '140%',
                        padding: deviceType === 'mobile' ? '0 30px' : '',
                      }}
                    >
                      Do you wish to list Opportunities Now ?
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: deviceType === 'mobile' ? '100%' : '196.5px',
                        }}
                      >
                        <ZupotsuButton
                          name="Skip for now"
                          handleClick={() => handleFinal('published')}
                          isCustomColors={true}
                          variant={'outlined'}
                          customTextColor="#828282"
                          customBgColorOnhover="#fff"
                          customBgColor="#fff"
                          customTextColorOnHover="#E20B18"
                          customOutlineColor={'1px solid #E0E0E0'}
                          customOutlineColorOnHover={'1px solid #E20B18'}
                          padding="13px 12px"
                        />
                      </div>
                      <div
                        style={{
                          width: deviceType === 'mobile' ? '100%' : '196.5px',
                        }}
                      >
                        <ZupotsuButton
                          name="Yes"
                          handleClick={() => {
                            setaAddOpportunities(true);
                            toggleAccordion(0);
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
                    <ZupotsuConfirmationDialog
                      open={showOpportunityReviewConf}
                      handleClose={() => setShowOpportunityConf(false)}
                      handleCloseIcon={() => setShowOpportunityConf(false)}
                      showListContent={false}
                      buttonName={['Cancel', 'List']}
                      comfirmationMessage="Are you sure you want to list the asset without opportunities?"
                      handleAction={() => listOpportunitySkipConf(2)}
                    />
                  </div>
                )}
                {addOpportunities && (
                  <div style={{ width: '100%', flexDirection: "column", alignItems: 'center', justifyContent: 'flex-start', marginBottom: '40px', }}>
                    <div className="opportunity-accordion">
                      {formData2?.map((data: any, opindex: any) => (
                        <div className="opportunity-accordion-item" key={opindex} style={{ border: "1px solid #80808029", padding: '20px', borderRadius: '5px', }}>
                          <div>
                            <div
                              className="opportunity-accordion-title"
                              style={{ padding: '20px 0' }}
                            >
                              <Typography
                                style={{
                                  color: 'var(--dark-gray, #484949)',
                                  fontFamily: 'Bebas Neue',
                                  fontSize: '32px',
                                  fontStyle: 'normal',
                                  fontWeight: '400',
                                  lineHeight: 'normal',
                                  letterSpacing: '1.28px',
                                }}
                              >
                                {"OPPORTUNITY " + (opindex + 1) + (data["Opportunity Type"] ? " - " + data["Opportunity Type"] : "")}
                              </Typography>
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '12px',
                                  alignItems: 'center',
                                }}
                              >

                                <div>
                                  <img
                                    style={{ height: "27px" }}
                                    src={copy}
                                    alt=""
                                    onClick={() => {
                                      let copiedOppr = { ...data };
                                      delete copiedOppr.Id;
                                      delete copiedOppr.id;
                                      copiedOppr?.["Opportunity Deliverables"].map((item: any) => {
                                        delete item.id
                                        delete item.Id
                                        delete item.opportunity_id
                                      })
                                      copiedOppr?.["Opportunity Media"].map((item: any) => {
                                        delete item.id
                                        delete item.Id
                                        delete item.opportunity_id
                                      })
                                      setFormData2([...formData2, copiedOppr])
                                    }}
                                  />
                                </div>
                                <div
                                  style={{ cursor: 'pointer' }}
                                  onClick={(e: any) => {
                                    deleteoppr(opindex)
                                  }}
                                >
                                  <img style={{ height: "30px" }} src={deleteIcon} alt="" />
                                </div>
                                <div>
                                  <img
                                    style={{ height: "27px" }}
                                    src={activeItems[opindex] ? collapse : expand}
                                    alt=""
                                    onClick={() => toggleAccordion(opindex)}
                                  />
                                </div>
                              </div>
                            </div>
                            <Divider />
                          </div>

                          {activeItems[opindex] && (
                            <div
                              className="team-listing-scroll"
                              style={{
                                margin: '24px 0',
                                // height: '242px',
                                overflow: 'auto',
                              }}
                            >
                              <div>
                                {/* {JSON.stringify(otype, null, 2)}   */}
                                <div>
                                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px', width: '100%', justifyContent: 'space-between', }}>
                                    <div style={{ width: '49%', marginBottom: '20px' }}>
                                      <ZupotsuAutoComplete
                                        title="Opportunity Type"
                                        placeholder="Select Opportunity Type"
                                        isRequired={true}
                                        name={"Opportunity Type"}
                                        toolTipMessage={"Select the opportunity type that the asset is available for (Single Select for one type)"}
                                        dropdownData={otype?.dropdownData}
                                        handleChange={(e) => {
                                          let arr = fixedoppAttr.filter((item: any) => { return item.label == "Opportunities" && item.attribute_group == otype.attribute_group && item.attribute_subgroup == e.target.value })
                                          if (e.target.value == "Anything Else") {
                                            let arr2 = fixedoppAttr.filter((item: any) => { return item.label == "Unit Of Measurement" && item.attribute_group == otype.attribute_group && item.attribute_subgroup == e.target.value })
                                            const updatedUnits = [...unit];
                                            updatedUnits[opindex] = arr2[0];
                                            setunit(updatedUnits);
                                          }
                                          else {
                                            setunit([]);
                                          }

                                          const updatedItems = [...oppr];
                                          updatedItems[opindex] = arr[0];
                                          setOppr(updatedItems);

                                          // setOppr(arr[0])
                                          // setunit(arr2[0])
                                          handleInputChange4(e.target.value, otype, opindex)
                                          formData2[opindex]["Unit Of Measurement"] = ""
                                          formData2[opindex]["Opportunities"] = ""
                                        }}
                                        previewMode={false}
                                        freeSolo={false}
                                        value={data["Opportunity Type"] || ""}
                                      />
                                    </div>
                                    <div style={{ width: '49%', marginBottom: '20px' }}>
                                      {/* <ZupotsuMultiSelect
                                        title="Opportunities"
                                        placeholder="Select Opportunities"
                                        isRequired={false}
                                        name={oppr[opindex]?.field}
                                        dropdownData={oppr[opindex]?.dropdownData}
                                        handleChange={(e) => handleInputChange4(e, oppr[opindex], opindex)}
                                        previewMode={false}
                                        // value={formData2[opindex]?formData2[opindex]?.[oppr.label]:[]}
                                        value={data["Opportunities"]}
                                      /> */}
                                      <ZupotsuAutoComplete
                                        title="Opportunities"
                                        placeholder="Select Opportunities"
                                        isRequired={true}
                                        name={oppr[opindex]?.field}
                                        toolTipMessage={"Out of the opportunities type, select the opportunities the asset is available for"}
                                        dropdownData={oppr[opindex]?.dropdownData}
                                        handleChange={(e) => {
                                          handleInputChange4(e.target.value, { label: "Opportunities" }, opindex)
                                          let arr2 = fixedoppAttr.filter((item: any) => { return item.label == "Unit Of Measurement" && item.attribute_group == otype.attribute_group && item.attribute_subgroup == data["Opportunity Type"] && item.attribute_tertiary_group == e.target.value })
                                          const updatedUnits = [...unit];
                                          updatedUnits[opindex] = arr2[0];
                                          setunit(updatedUnits);
                                        }}
                                        previewMode={false}
                                        freeSolo={false}
                                        value={data["Opportunities"] || ""}
                                      />
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <div style={{ width: '49%', marginBottom: '20px' }}>
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'start',
                                          alignItems: 'center',
                                          fontStyle: 'Inter',
                                          fontWeight: '600',
                                          margin: 0,
                                          marginBottom: '0px',
                                          marginTop: '0px'
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
                                        > Custom Pricing</span>
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
                                      </div>

                                      <div key={opindex} style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>

                                        {[{ label: `Yes`, id: `Yes${opindex}` }, { label: `No`, id: `No${opindex}` }].map((items: any, index: any) => (
                                          <ZupotsuRadioButton2
                                            key={index}
                                            data={items}
                                            opindex={opindex}
                                            selected={formData2[opindex]["PCB"] + opindex}
                                            isHintAvailable={false}
                                            handleChange={(e: any, hindex: any) => {
                                              let x = e?.includes("Yes") ? "Yes" : "No"
                                              handleInputChange4(x, { label: "PCB" }, opindex)
                                            }}
                                            disabled={false}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    {(formData2[opindex]["Opportunity Type"] == "Anything Else" || formData2[opindex]["Opportunities"] == "Anything Else") && (<div
                                      style={{
                                        marginTop:
                                          deviceType === 'mobile' ? '16px' : '20px',
                                        width: '49%'
                                      }}
                                    >
                                      <ZupotsuTextfield
                                        title="Specify Opportunity"
                                        // value={
                                        //   data.step2FormData[9].specs_of_deliverables
                                        // }
                                        value={data["Specify Opportunity"]}
                                        placeholder="Specify Opportunity"
                                        name={`Specify Opportunity`}
                                        toolTipMessage=""
                                        isRequired={true}
                                        multiline={false}
                                        rows={2}
                                        handleChange={
                                          (e: any) =>
                                            handleInputChange4(e.target.value, { label: "Specify Opportunity" }, opindex)
                                        }
                                      />
                                    </div>)}
                                  </div>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <div style={{ width: '32%', marginBottom: '20px' }}>
                                      <ZupotsuAutoComplete
                                        title="Currency"
                                        placeholder="Select Currency"
                                        isRequired={true}
                                        name={"Currency"}
                                        toolTipMessage={''}
                                        dropdownData={currencylist}
                                        handleChange={(e) => handleInputChange4(e.target.value, { label: "Currency" }, opindex)}
                                        previewMode={formData2[opindex]["PCB"]?.includes("No") ? false : true}
                                        freeSolo={false}
                                        value={formData2[opindex]["Currency"] || ""}
                                      />
                                    </div>
                                    <div style={{ width: '32%', marginBottom: '20px' }}>
                                      <ZupotsuTextfield
                                        title="Rate"
                                        name={"Rate"}
                                        toolTipMessage={'Price of the above selected opportunity type'}
                                        value={formData2[opindex]["Rate"] ? formData2[opindex]["Rate"] : ""}
                                        isRequired={true}
                                        placeholder={"Enter Rate"}
                                        handleChange={(e) => handleInputChange4(e.target.value, { label: "Rate" }, opindex)}
                                        previewMode={formData2[opindex]["PCB"]?.includes("No") ? false : true}
                                        type={"tel"}
                                      />
                                    </div>
                                    <div style={{ width: '32%', marginBottom: '20px' }}>
                                      <ZupotsuAutoComplete
                                        title="Unit Of Measurement"
                                        placeholder="Select Unit Of Measurement"
                                        isRequired={true}
                                        name={unit[opindex]?.field}
                                        toolTipMessage={"Unit of measurement for the opportunities selected above"}
                                        dropdownData={unit[opindex]?.dropdownData}
                                        handleChange={(e) => handleInputChange4(e.target.value, unit[opindex], opindex)}
                                        previewMode={formData2[opindex]["PCB"]?.includes("No") ? false : true}
                                        freeSolo={false}
                                        value={data["Unit Of Measurement"] == "Custom Pricing" ? '' : data["Unit Of Measurement"] || ""}
                                      />
                                    </div>
                                  </div>
                                  <DynamicFields2
                                    deviceType={deviceType}
                                    fields={oppAttr}
                                    handleInputChange={handleInputChange}
                                    handleInputChange2={handleInputChange2}
                                    handleInputChange3={handleInputChange3}
                                    handleInputChange4={handleInputChange4}
                                    metaData={metaData}
                                    formData={formData}
                                    formData2={formData2}
                                    errors={errors}
                                    previewMode={false}
                                    onChangeSocial={onChangeSocial}
                                    socialLinks={socialLinks}
                                    opindex={opindex}
                                  />
                                </div>

                                {formData2[opindex].deliverables?.map((item: any, index: any) => (<div key={index} style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: '10px'
                                }}>
                                  <div
                                    style={{
                                      marginTop:
                                        deviceType === 'mobile' ? '16px' : '20px',
                                      width: '50%'
                                    }}
                                  >
                                    <ZupotsuTextfield
                                      title={index == 0 ? "Deliverables" : ""}
                                      // value={data.step2FormData[2].deliverables}
                                      value={item.deliverables}
                                      placeholder="Tell us about the opportunity"
                                      name={`deliverables`}
                                      toolTipMessage={index == 0 ? "Mention the deliverable of the opportunity selected" : ""}
                                      isRequired={false}
                                      // multiline={true}
                                      multiline={false}
                                      rows={4}
                                      handleChange={
                                        (e: any) =>
                                          handleChangefun(e.target.name, e.target.value, opindex, index)
                                      }
                                    />
                                  </div>
                                  <div
                                    style={{
                                      marginTop:
                                        deviceType === 'mobile' ? '16px' : '20px',
                                      width: '50%'
                                    }}
                                  >
                                    <ZupotsuTextfield
                                      title={index == 0 ? "Specs of Deliverables" : ""}
                                      // value={
                                      //   data.step2FormData[9].specs_of_deliverables
                                      // }
                                      value={item.specs_of_deliverables}
                                      placeholder="Specs of Deliverables"
                                      // name="specs_of_deliverables"
                                      name={`specs_of_deliverables`}
                                      toolTipMessage={index == 0 ? "Mention the Quantity/Size of the deliverables" : ''}
                                      isRequired={false}
                                      // multiline={true}
                                      multiline={false}
                                      rows={2}
                                      handleChange={
                                        (e: any) =>
                                          // handleAccordionItemChange(
                                          //   index,
                                          //   'specs_of_deliverables',
                                          //   e
                                          // )
                                          handleChangefun(e.target.name, e.target.value, opindex, index)
                                      }
                                    />
                                  </div>
                                  {/* {index != 0 && ( */}
                                  <div

                                    style={{
                                      cursor: 'pointer', marginTop:
                                        deviceType === 'mobile' ? '16px' : '20px',
                                      height: '100%',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'flex-end'
                                    }}
                                    onClick={(e: any) => {
                                      delDeliverables(index, opindex)
                                    }}


                                  >
                                    <img src={deleteIcon} alt="" style={{ width: '20px', height: "20px" }} />
                                  </div>
                                  {/* )} */}
                                  {/* {index == 0 && (<div
                                    style={{
                                      cursor: 'pointer', marginTop:
                                        deviceType === 'mobile' ? '16px' : '20px',
                                      height: '100%',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'flex-end',
                                      width: '15px'
                                    }}
                                  >
                                  </div>)} */}

                                </div>))}
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    cursor: 'pointer',
                                    gap: '10px',
                                    marginTop: '30px',
                                    marginBottom: '40px'
                                  }}
                                >
                                  <img src={addCircle} alt="" onClick={() => addDeliverable(opindex)} />
                                  <Typography
                                    style={{
                                      color: 'var(--Zupotso-Primary, #E20B18)',
                                      textAlign: 'center',
                                      fontFamily: 'Inter',
                                      fontSize: '16px',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                      lineHeight: '140%',
                                    }}
                                    onClick={() => addDeliverable(opindex)}
                                  >
                                    {formData2[opindex].deliverables == 0 ? "Add New Deliverables" : "Add More Deliverables"}
                                  </Typography>
                                </div>
                                <div style={{ width: '49%', marginBottom: '20px' }}>
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
                                    > Terms and Conditions</span>
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
                                  </div>

                                  <div key={opindex} style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>

                                    {[{ label: `Text`, id: `Text${opindex}` }, { label: `File`, id: `File${opindex}` }].map((items: any, index: any) => (
                                      <ZupotsuRadioButton2
                                        key={index}
                                        data={items}
                                        opindex={opindex}
                                        selected={formData2[opindex] ? formData2[opindex]["Tc Type"] + opindex : []}
                                        isHintAvailable={false}
                                        handleChange={(e: any, hindex: any) => {
                                          let x = e?.includes("Text") ? "Text" : "File"
                                          handleInputChange4(x, { label: "Tc Type" }, opindex)
                                          // setFormData2((prevData: any) => ({ ...prevData, ["tc"]: e}))
                                        }}
                                        disabled={false}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div style={{ width: '100%', marginBottom: '20px' }}>
                                  {(formData2[opindex] && formData2[opindex]["Tc Type"] && formData2[opindex]["Tc Type"].includes("Text")) && (<div>
                                    <DynamicTextFieldUtilMulti
                                      data={{ label: "Tc Text", placeholder: "Enter Terms and Conditions" }}
                                      hideLabel={true}
                                      errors={errors}
                                      formData={formData2[opindex]}
                                      previewMode={false}
                                      handleInputChange={(e) => handleInputChange4(e.target.value, { label: "Tc Text" }, opindex)}
                                      type={"text"}
                                    />
                                  </div>)}

                                  {(formData2[opindex] && formData2[opindex]["Tc Type"] && formData2[opindex]["Tc Type"].includes("File")) && (<div>
                                    <ZupotsuImgUpload
                                      fileSize={'Max Size 10 MB'}
                                      handleDelete={(e: any) => {
                                        // handleOpprMediaDel(e, opindex)
                                      }}
                                      // uploadedImage={fileData?.termsandconditions}
                                      uploadedImage={formData2[opindex]['Tc File']}

                                      index={opindex}
                                      fileType={'pdf'}
                                      name={'Terms and Conditions'}
                                      imgCardLabel={''}
                                      uploadTitle={'Click to upload or Drag & Drop pdf here'}
                                      setUploadedImage={(e, url) => handleInputChange4(url, { label: "Tc File" }, opindex)}
                                    />
                                  </div>)}
                                </div>
                                <div style={{
                                  width: '100%',
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: 'flex-start',
                                  marginTop: '100px'
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
                                    Upload Pictures
                                  </Typography>
                                  <Typography
                                    style={{
                                      marginBottom: '20px',
                                      color: '#828282',
                                      fontFamily: 'Inter',
                                      fontSize: '14px',
                                      fontStyle: 'normal',
                                      fontWeight: '400',
                                      lineHeight: '140%',
                                    }}
                                  >
                                    You can upload max 2 Pictures related to the opportunity
                                  </Typography>
                                  <div
                                    style={{
                                      display: 'flex',
                                      // gap: deviceType === 'mobile' ? '14px' : '30px',
                                      width: '100%',
                                      flexDirection: 'row',
                                      justifyContent: 'start',
                                    }}
                                  >

                                    <div
                                      style={{
                                        marginTop: '0px',
                                        marginRight: '30px',
                                        width: '33%'
                                      }}
                                    >
                                      <ZupotsuImgUpload
                                        fileSize={'MaxSize 500 KB'}
                                        handleDelete={(e: any) => {
                                          handleOpprMediaDel(e, opindex)
                                        }}
                                        // uploadedImage={fileData?.oppor1} 
                                        // uploadedImage={
                                        //   // Filter the fileData array to find items with 'logo' in tags
                                        //   formData2[opindex]?.opportunity_media?.filter((item: any) => item.tags?.includes('Opportunity Image')).length > 0 
                                        //     ? formData2[opindex]?.opportunity_media?.filter((item: any) => item.tags?.includes('Opportunity Image'))[0].media_url 
                                        //     : ''
                                        // }
                                        uploadedImage={(formData2[opindex]?.["Opportunity Media"]?.filter((item: any) => item.tags.includes('Opportunity Image 1')) || [])[0]?.media_url || ''}
                                        index={0}
                                        fileType={'jgp'}
                                        name={'Opportunity Image 1'}
                                        imgCardLabel={''}
                                        uploadTitle={
                                          'Click to upload or Drag & Drop png/jpg here'
                                        }
                                        setUploadedImage={(name, imageUrl, file) => {
                                          // handleFileChange(name, imageUrl, file,"");
                                          // handleInputChange4(imageUrl,{label:"tc_text"},opindex)
                                          handleOpprChangefun(name, imageUrl, opindex, 0)
                                        }}
                                      />
                                    </div>

                                    <div
                                      style={{
                                        marginTop: '0px',
                                        width: '33%'
                                      }}
                                    >
                                      <ZupotsuImgUpload
                                        fileSize={'MaxSize 500 KB'}
                                        handleDelete={(e: any) => {
                                          handleOpprMediaDel(e, opindex)
                                        }}
                                        // uploadedImage={fileData?.oppor2}
                                        // uploadedImage={
                                        //   formData2[opindex]?.opportunity_media?.filter((item: any) => item.tags.includes('Opportunity Image')).length > 1
                                        //     ? formData2[opindex]?.opportunity_media?.filter((item: any) => item.tags.includes('Opportunity Image'))[1].media_url 
                                        //     : ''
                                        // }
                                        uploadedImage={(formData2[opindex]?.["Opportunity Media"]?.filter((item: any) => item.tags.includes('Opportunity Image 2')) || [])[0]?.media_url || ''}

                                        index={1}
                                        fileType={'jgp'}
                                        name={'Opportunity Image 2'}
                                        imgCardLabel={''}
                                        uploadTitle={
                                          'Click to upload or Drag & Drop png/jpg here'
                                        }
                                        setUploadedImage={(name, imageUrl, file) => {
                                          // handleFileChange(name, imageUrl, file,"");
                                          handleOpprChangefun(name, imageUrl, opindex, 1)
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          )}

                        </div>
                      ))}

                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        gap: '10px',
                        margin: '20px',
                        marginTop: '40px'
                      }}
                    >
                      <img src={addCircle} alt="" onClick={() => { }} />
                      <Typography
                        style={{
                          color: 'var(--Zupotso-Primary, #E20B18)',
                          textAlign: 'center',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: '700',
                          lineHeight: '140%',
                        }}
                        onClick={() => {
                          setopNum([...opNum, {
                            title: `Opportunity`
                          }])
                          addOppr()
                        }}
                      >
                        {formData2.length > 0 ? "Add More Opportunities" : "Add New Opportunity"}
                      </Typography>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
          <Divider style={{ marginTop: activeStep === 0 ? '40px' : '' }} />
          <div
            style={{
              // padding: '10px 0',
              padding: deviceType == "mobile" ? "0px" : '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent:
                deviceType === 'mobile' ? 'center' : 'space-between',
              flexWrap: 'wrap',
              gap: deviceType === 'mobile' ? '20px' : '0',
              width: (sidebarOpen == false || isSeller || isSellerAdmin) ? "100%" : deviceType === 'mobile' ? '100%' : '83%',
              border: deviceType === 'mobile' ? "" : "1px solid #ff00000d",
              boxShadow: deviceType === 'mobile' ? "" : "3px 0px 6px #91919b54",
              position: deviceType === "mobile" ? "relative" : "absolute",
              bottom: "0px",
              right: "0px",
              zIndex: 5,
              backgroundColor: '#FFF',
              // paddingLeft: deviceType === ("small-tablet" || 'tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%',
              // paddingRight: deviceType === ("small-tablet" || 'tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%'
              paddingLeft: (deviceType === "small-tablet" || deviceType === 'tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%',
              paddingRight: (deviceType === "small-tablet" || deviceType === 'tablet') ? "4%" : deviceType === 'mobile' ? "" : '4%',
            }}
          >
            {(activeStep === 0 || activeStep === 1 || activeStep === 2) && (
              <ZupotsuButton
                name={id ? activeStep === 1 ? "  Cancel  " : "Previous step" : activeStep === 0 ? "  Cancel  " : "Previous step"}
                // padding="12px, 16px, 12px, 16px"
                handleClick={handleBack}
                leadingIcon={arrowLeft}
                isCustomColors={true}
                variant={'outlined'}
                customTextColor="rgba(189, 189, 189, 1)"
                customBgColor="#fff"
                customBgColorOnhover="white"
                customTextColorOnHover="#828282"
                customOutlineColor={'1px solid rgba(189, 189, 189, 1)'}
                customOutlineColorOnHover={'1px solid rgba(189, 189, 189, 1)'}
              />

            )
            }
            {(activeStep === 1 || activeStep === 2) && (<div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
              }}
            >


              {(!id || (id && assetStatus == "draft")) && (<ZupotsuButton
                leadingIcon={isDraftDisable ? '' : copy}
                name="Save as Draft"
                handleClick={draftFun}
                isCustomColors={true}
                customBgColor={'rgba(226, 11, 24, 0.05)'}
                customTextColor={'red'}
                customBgColorOnhover={'#ffd7d7'}
                customTextColorOnHover={'red'}
                variant={'outlined'}
                // disabled={isDraftDisable}
                disabled={false}

              />)}


            </div>)}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {(activeStep === 1 || activeStep === 2) && (
                <div>
                  <ZupotsuButton
                    leadingIcon={copy}
                    name="Select Thumbnail"
                    handleClick={() => { setThumbnailPreview(!thumbnailpreview) }}
                    isCustomColors={true}
                    customBgColor={'rgba(226, 11, 24, 0.05)'}
                    customTextColor={'red'}
                    customBgColorOnhover={'#ffd7d7'}
                    customTextColorOnHover={'red'}
                    variant={'outlined'}
                    // disabled={isDraftDisable}
                    disabled={false}
                  />
                </div>
              )}
            </div>
            {(activeStep === 1 || activeStep === 2) && (<div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
              }}
            >


              <ZupotsuButton
                leadingIcon={copy}
                name="View Preview"
                handleClick={() => { handleToggleDrawer() }}
                isCustomColors={true}
                customBgColor={'rgba(226, 11, 24, 0.05)'}
                customTextColor={'red'}
                customBgColorOnhover={'#ffd7d7'}
                customTextColorOnHover={'red'}
                variant={'outlined'}
                disabled={false}
              />


            </div>)}
            <ZupotsuButton
              trailingIcon={eastWhiteArrow}
              customBgColor={"rgba(226, 11, 24, 1)"}
              name={activeStep === 2 ? "Submit" : 'Submit & Proceed'}
              customOutlineColor={'0px solid transparent'}
              handleClick={
                activeStep === 2
                  ? () => handleFinal('published')
                  : activeStep === 1
                    ? () => {
                      const invalidLink = ((socialLinks?.instagram && !validateInstagramUrl(socialLinks?.instagram)) ||
                        (socialLinks?.tiktok && !validateTikTokUrl(socialLinks?.tiktok)) ||
                        (socialLinks?.facebook && !validateFacebookUrl(socialLinks?.facebook)) ||
                        (socialLinks?.website && !validateUrl(socialLinks?.website)) ||
                        (socialLinks?.x && !validateXUrl(socialLinks?.x)) ||
                        (socialLinks?.youtube && !validateYouTubeUrl(socialLinks?.youtube)));

                      if (invalidLink) {
                        setSnackbar({
                          open: true,
                          severity: 'error',
                          message: 'Please fill valid social media links!!',
                        });
                      } else {
                        if (new Date(formData["Dates From"]) > new Date(formData["Dates To"])) {
                          setSnackbar({
                            open: true,
                            severity: 'error',
                            message: 'Date from is greater then Date to , Please check it!!',
                          });
                        } else if ((!formData["Dates From"]) && formData["Dates To"]) {
                          setSnackbar({
                            open: true,
                            severity: 'error',
                            message: 'Date from is empty , Please check it!!',
                          });
                        } else if (formData["Dates From"] && (!formData["Dates To"])) {
                          setSnackbar({
                            open: true,
                            severity: 'error',
                            message: 'Date to is empty , Please check it!!',
                          });
                        } else {
                          handleStep1('published', true);
                        }
                      }
                    }
                    : () => handleStep0('published', true)
              }
              // disabled={(activeStep === 0 && (selectedValue && sportType && (selectSport || selectSportMul) && sellerId) ? false : true)
              // isButtonDisabled() 
              // : isFormEmpty
              // }
              disabled={false}
            />

          </div>
          {deviceType != 'mobile' && <Divider />}

          {open && (<AssetPreview
            open={open}
            handleToggleDrawer={() => { handleToggleDrawer() }}
            activeStep={activeStep}
            handleInputChange={handleInputChange}
            deviceType={deviceType}
            formData={{ ...formData, "assetType": name, "Sport": selectSport, "sportType": (sportType) && (sportType == "Single Sport" ? "single" : "multi") }}
            formData2={formData2}
            fileData={fileData}
            handleFileChange={handleFileChange}
            previewMode={previewMode}
            addOpportunities={addOpportunities}
            setaAddOpportunities={setaAddOpportunities}
            accordionData={[]}
            metaData={metaData}
            fields={fields}
            socialLinks={socialLinks}
            onEditSave={onEditSave}
            onChangeSocial={onChangeSocial}
            assetData={assetData}
            selectSport={selectSport}
            name={name}
          />)}

          <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={openBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>


        <Modal
          open={thumbnailpreview}
          onClose={() => setThumbnailPreview(false)}
          aria-labelledby="modal-modal-title"
          sx={{
            flexDirection: 'column',
            display: 'flex',
            overflowY: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            '& .MuiBox-root': {
              display: 'flex',
              border: "0px solid #FFF",
              borderRadius: '10px',
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              overflowY: 'hidden',

            },
          }}
        >
          <div
            style={{
              width: deviceType === 'mobile' ? '75%' : '75%',
              height: "550px",
              border: "0px solid #FFF",
              backgroundColor: '#FFF',
              borderRadius: '24px',
              position: 'absolute',
              transition: 'all 0.3s ease-in-out',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              padding: '15px',
              flexDirection: 'column',
              justifyContent: 'center',
              overflowY: 'hidden',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center',
                padding: '10px',
                paddingLeft: '40px',
                paddingRight: '20px',
                backgroundColor: '#FFF',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
              }}
            >
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "19.36px",
                  letterSpacing: "0.02em",
                  margin: 0

                }}
              >Select Thumbnail</p>

              <Close
                style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                onClick={() => { setThumbnailPreview(!thumbnailpreview) }}
              />
            </div>



            <div
              style={{
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFF',
                borderBottomLeftRadius: '24px',
                borderBottomRightRadius: '24px',
                overflowY: 'hidden',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                marginTop: '10px'
              }}
            >

              <div
                style={{
                  width: "100%",
                  height: 400,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderRadius: '0px',
                  backgroundColor: '#FFF',
                  gap: "10px",
                  overflowX: "scroll",
                  overflowY: 'hidden',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  paddingLeft: '20px',
                  paddingRight: '20px'
                }}
              >
                {
                  [
                    {
                      buttonname: "Default",
                      templatename: `Basic (Default)`,
                      tooltip: {
                        team: (
                          <>
                            <b>Front View:</b> Name, Headline, Country, State, and City of origin
                            <br />
                            <b>Flip View:</b> About the team and tournament participation details
                          </>
                        ),
                        tournament: (
                          <>
                            <b>Front View:</b> Name, Headline, Tournament Dates, Host Countries and Cities
                            <br />
                            <b>Flip View:</b> About the team and broadcast/streaming platforms
                          </>
                        ),
                        athlete: (
                          <>
                            <b>Front View:</b> Name, Headline, Instagram, and X follower count
                            <br />
                            <b>Flip View:</b> About the athlete
                          </>
                        ),
                        content: (
                          <>
                            <b>Front View:</b> Name, Headline, Content Start Date, and Produced By
                            <br />
                            <b>Flip View:</b> About the content, primary content language, and broadcast/streaming platforms
                          </>
                        ),
                      },
                    },
                    ...(name?.toLowerCase() === "team"
                      ? [
                        {
                          buttonname: "Use Template",
                          templatename: `Performance Focused`,
                          tooltip: {
                            team: (
                              <>
                                <b>Front View:</b> Name, Headline, Country, State, and City of origin
                                <br />
                                <b>Flip View:</b> Highlights
                              </>
                            ),
                            tournament: null,
                            athlete: (
                              <>
                                <b>Front View:</b> Name, Headline, Instagram, and X Follower Count
                                <br />
                                <b>Flip View:</b> Highlights
                              </>
                            ),
                            content: null,
                          },
                        },
                      ]
                      : name?.toLowerCase() === "tournament" || name?.toLowerCase() === "content"
                        ? [
                          {
                            buttonname: "Use Template",
                            templatename: `Basic`,
                            tooltip: {
                              team: null,
                              tournament: (
                                <>
                                  <b>Front View:</b> Name, Headline, Tournament Dates, Host Countries and Cities
                                  <br />
                                  <b>Flip View:</b> Organisation and Affiliation details
                                </>
                              ),
                              athlete: (
                                <>
                                  <b>Front View:</b> Name, Headline, Instagram follower count
                                  <br />
                                  <b>Flip View:</b> About the athlete
                                </>
                              ),
                              content: (
                                <>
                                  <b>Front View:</b> Name, Headline, and Content Start Date
                                  <br />
                                  <b>Flip View:</b> Highlights and broadcast/streaming platforms
                                </>
                              ),
                            },
                          },
                        ]
                        : [
                          {
                            buttonname: "Use Template",
                            templatename: `Career Focused`,
                            tooltip: {
                              team: (
                                <>
                                  <b>Front View:</b>
                                  <br />
                                  <b>Flip View:</b>
                                </>
                              ),
                              tournament: (
                                <>
                                  <b>Front View:</b> Name, Headline, Tournament Dates, Host Countries and Cities
                                  <br />
                                  <b>Flip View:</b> Organisation and Affiliation details
                                </>
                              ),
                              athlete: (
                                <>
                                  <b>Front View:</b> Name, Headline, Instagram follower count
                                  <br />
                                  <b>Flip View:</b> Highlights
                                </>
                              ),
                              content: (
                                <>
                                  <b>Front View:</b> Name, Headline, and Content Start Date
                                  <br />
                                  <b>Flip View:</b> Highlights and broadcast/streaming platforms
                                </>
                              ),
                            },
                          },
                        ]),
                    {
                      buttonname: "Use Template",
                      templatename: `Reach Focused`,
                      tooltip: {
                        team: (
                          <>
                            <b>Front View:</b> Name, Headline, Instagram, and X Follower Count
                            <br />
                            <b>Flip View:</b> Audience Insights such as age, gender, class, and geographical span
                          </>
                        ),
                        tournament: (
                          <>
                            <b>Front View:</b> Name, Headline, Tournament Dates, Host Countries, and Cities
                            <br />
                            <b>Flip View:</b> Audience Insights such as age, gender, class, and geographical span
                          </>
                        ),
                        athlete: (
                          <>
                            <b>Front View:</b> Name, Headline, Instagram, and X Follower Count
                            <br />
                            <b>Flip View:</b> Audience Insights such as age, gender, class, and geographical span
                          </>
                        ),
                        content: (
                          <>
                            <b>Front View:</b> Name, Headline, Instagram, X, and YouTube Follower Count, Content Start Date
                            <br />
                            <b>Flip View:</b> Audience Insights such as age, gender, class, and geographical span
                          </>
                        ),
                      },
                    },
                    ...(name?.toLowerCase() === "content"
                      ? [
                        {
                          buttonname: "Use Template",
                          templatename: "Content Focused",
                          tooltip: {
                            team: null,
                            tournament: null,
                            athlete: null,
                            content: (
                              <>
                                <b>Front View:</b> Name, Headline, Instagram, X, and YouTube Follower Count, Content Start Date
                                <br />
                                <b>Flip View:</b> Broadcast/Streaming platforms and the live content plan details (if applicable)
                              </>
                            ),
                          },
                        },
                      ]
                      : []),
                    ...(name?.toLowerCase() === "athlete"
                      ? [
                        {
                          buttonname: "Use Template",
                          templatename: "Basic",
                          tooltip: {
                            team: null,
                            tournament: (
                              <>
                                <b>Front View:</b> Name, Headline, Tournament Dates, Host Countries, and Cities
                                <br />
                                <b>Flip View:</b> Organisation and Affiliation details
                              </>
                            ),
                            athlete: (
                              <>
                                <b>Front View:</b> Name, Headline, Instagram follower count
                                <br />
                                <b>Flip View:</b> About the athlete
                              </>
                            ),
                            content: (
                              <>
                                <b>Front View:</b> Name, Headline, and Content Start Date
                                <br />
                                <b>Flip View:</b> Highlights and broadcast/streaming platforms
                              </>
                            ),
                          },
                        },
                      ]
                      : []),
                  ].map((iterator: any, index: any) => (
                    <div
                      onClick={() => {
                        setChooseTemplate(index);
                        setTemplateId(`${name}${index}`);
                      }}
                      style={{
                        width: "304px",
                        backgroundColor: "#FFF",
                      }}
                      key={index}
                    >
                      <ChooseCard
                        flipable={true}
                        index={index}
                        selected={name}
                        sportType={sportType}
                        filteredSports={filteredSports}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          marginTop: "15px",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "30px",
                            marginLeft: "-5px",
                            border:
                              `${name}${index}` === templateId
                                ? "4px solid rgba(226, 11, 24, 1)"
                                : "1.5px solid rgba(231, 231, 231, 1)",
                          }}
                        ></div>
                        <button
                          style={{
                            width: "200px",
                            height: "44px",
                            padding: "12px 16px",
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: "8px",
                            borderRadius: "5px",
                            backgroundColor: "rgba(48, 184, 0, 0.1)",
                            color: "rgba(33, 150, 83, 1)",
                            border: "0px solid transparent",
                          }}
                        >
                          {iterator.templatename}
                          <ZupotsuTooltip
                            tooltipMessage={
                              iterator.tooltip[name?.toLowerCase()] || "No tooltip available"
                            }
                            icon={infoCircle}
                          />
                        </button>

                      </div>
                    </div>
                  ))
                }

              </div>
              <div style={{ width: '100%', justifyContent: 'center', alignItems: "center", display: 'flex', flexDirection: "row", marginTop: '15px' }}>

                <Button
                  variant={'contained'}
                  fullWidth
                  color="error"
                  disabled={false}
                  style={{
                    width: "200px",
                    height: "44px",
                    gap: "8px",
                    borderRadius: "5px",
                    padding: deviceType != 'mobile' ? '12px, 16px, 12px, 16px' : '12px, 16px, 12px, 16px',
                    textTransform: 'none',
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: deviceType == 'mobile' ? '14px' : '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '140%',
                    background: " rgba(226, 11, 24, 1)",

                  }}
                  onClick={() => setThumbnailPreview(!thumbnailpreview)}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >

                    <span style={{
                      color: "#FFF",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "21px",



                    }}>Submit</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </Modal >
        <Fab onClick={() => { window.open("https://wa.me/919987831843?text=", "_blank") }} style={{ ...fabStyle, bottom: '180px', width: '60px', height: '60px', borderRadius: '50px', padding: '10px' }} color="primary" aria-label="add">
          <SupportAgentSharpIcon sx={{ width: '40px', }} />
        </Fab>
        <Fab onClick={() => { window.open("https://www.zupotsu.com/how-to", "_blank") }} style={{ ...fabStyle, width: 'auto', borderRadius: '8px', padding: '10px' }} color="primary" aria-label="add">
            <PsychologyAltIcon sx={{ width: '40px', paddingRight: '5px',marginTop:'-5px' }} /><span style={{ fontSize: '12px' }}>Watch Our How-To Videos</span>
        </Fab>

      </div >
    );
  }
};

export default AssetCreationDynamicList;