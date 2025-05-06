import {
  Divider,
  Typography,
  Dialog,
  DialogContent,
  AlertColor,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import ZupotsuConfirmationDialog from '../../Molecules/zupotsu-confirmation-dialog/zupotsu-confirmation-dialog';
import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import './assetPreview.css';
import {
  addCircle,
  collapse,
  deleteIcon,
  expand,
  infoCircle,
} from '../../assets';
import ZupotsuImgUpload from '../../Molecules/zupotsu-img-upload/zupotsu-img-upload';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import DynamicFields from './DynamicFields';
import SocialHandle from './SocialHandle';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import { useDispatch } from 'react-redux';
import ZupotsuTooltip from '../../Atoms/zupotsu-tooltip/zupotsu-tooltip';
import AssetPreview from './AssetPreview';
import tcToggleStyle, { FieldsData, assetPrevAddMoreParentStyle, assetPrevAddMoreStyle, imgUploadParentElStyle, investmentFieldParentStyle, oppAccordionTitleStyle } from '../../utils/constants';
import Meta from '../../utils/Meta';
import SnackbarWrapper from '../Header/CustomSnackbar';
interface iAssetPreview {
  open: boolean;
  handleToggleDrawer: () => void;
  handleInputChange: (_: string) => void;
  metaDataDetail: any;
  formData: any;
  fileData: any;
  deviceType: string;
  errors: any;
  handleFileChange: any;
  previewMode: boolean;
  setaAddOpportunities: Function;
  addOpportunities: boolean;
  fields: FieldsData;
  onEditSave: (accordionData: any) => void;
  onDelete: (id: string) => void;
  socialLinks: any;
  onChangeSocial?: any;
  duration?: any;
  setEdit?: any;
  oppurtunityData?: any;
  sellerData?: any;
}

const AssetUpdate = ({

  handleToggleDrawer,
  handleInputChange,
  deviceType,
  formData,
  errors = {},
  handleFileChange,
  previewMode,
  setaAddOpportunities,
  addOpportunities,
  metaDataDetail,
  onChangeSocial,
  fields,
  onEditSave,
  socialLinks,
  fileData,

  oppurtunityData,
  sellerData,
}: iAssetPreview) => {
  const dynamicStyle: CSSProperties = tcToggleStyle();
  const imgUploadParElStyle: CSSProperties = imgUploadParentElStyle();
  const investmentFieldParentStyles: CSSProperties =
    investmentFieldParentStyle();

  const [openPreview, setOpenPreview] = useState(false);
  const [isSelected, setSelected] = useState<any>('details');
  const [activeItems, setActiveItems] = useState<any>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [setOppIndex, selectedOppIndex] = useState<any>(null);
  const dispatch = useDispatch();
  const [accordionData, setAccordionData] = useState([
    {
      title: 'opportunity 1',
      id: null,
      step2FormData: [
        {
          type: 'text',
          name: 'opportunityName',
          errorMessage: {},
          opportunityName: '',
          placeholder: 'Give us the name of the opportunity',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'text',
          name: 'investment',
          errorMessage: {},
          investment: '',
          placeholder: 'investment',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'text',
          name: 'deliverables',
          errorMessage: {},
          deliverables: '',
          placeholder: 'Deliverables*',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'text',
          name: 'termsConditions',
          errorMessage: {},
          termsConditions: '',
          placeholder: 'termsConditions',
          handleChange: (e: any) => handleInputChange(e),
        },

        {
          name: 'opportunityImage1',
          errorMessage: {},
          opportunityImage1: '',
          imageUrl: '',
        },

        {
          name: 'opportunityImage2',
          errorMessage: {},
          opportunityImage2: '',
          imageUrl: '',
        },
        {
          name: 'selectedOption',
          errorMessage: {},
          selectedOption: 'availableOnRequest',
        },
        {
          type: 'dropdown',
          name: 'currency',
          errorMessage: {},
          currency: '',
          placeholder: 'currency',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'text',
          name: 'usp',
          errorMessage: {},
          usp: '',
          placeholder: 'Anything else to note',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'text',
          name: 'deliverableSpecs',
          errorMessage: {},
          deliverableSpecs: '',
          placeholder: 'Specs of Deliverables',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          name: 'termsAndConditionFilesToggle',
          errorMessage: {},
          termsAndConditionFilesToggle: false,
          type: 'checkbox',
        },
        {
          type: 'text',
          name: 'termsConditionsFile',
          errorMessage: {},
          termsConditionsFile: null,
          placeholder: 'termsConditions',
          handleChange: (e: any) => handleInputChange(e),
        },
      ],
    },
  ]);
  
  const [showDeleteFileConfirmationPopup, setShowDeleteFileConfirmationPopup] =
    useState<boolean>(false);
  const [fileToBeDeletedData, setFileToBeDeletedData] = useState<any>(null);
  const [selectedOpportunityIndex, seSelectedOpportunityIndex] =
    useState<number>(-1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    autoHideDuration: 5000,
  });
  const [deleteOpportunityFileKey, setDeleteOpportunityFileKey] = useState<string>('');
  const [saveDialog, setSaveDialog] = useState(false);
  const [prevfileData, setPrevFileData] = React.useState<any>({});
  const [openDelOppDialog, setOpenDelOppDialog] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep(0);
  }, []);

 

  useEffect(() => {
    setPrevFileData(formData.files);
  }, [formData]);

  useEffect(() => {
    if (oppurtunityData) {
      const newOpp: any = [];
      oppurtunityData.forEach((item: any, index: number) => {
        newOpp.push({
          title: `opportunity ${index + 1}`,
          id: item._id,
          step2FormData: [
            {
              type: 'text',
              name: 'opportunityName',
              errorMessage: {},
              opportunityName: item.name || '',
              placeholder: 'Give us the name of the opportunity',
              handleChange: (e: any) => handleInputChange(e),
            },
            {
              type: 'text',
              name: 'investment',
              errorMessage: {},
              investment: item?.investment?.slice(0, -3) || '',
              placeholder: 'investment',
              handleChange: (e: any) => handleInputChange(e),
            },
            {
              type: 'text',
              name: 'deliverables',
              errorMessage: {},
              deliverables: item.deliverables || '',
              placeholder: 'Deliverables*',
              handleChange: (e: any) => handleInputChange(e),
            },
            {
              type: 'text',
              name: 'termsConditions',
              errorMessage: {},
              termsConditions: !item.termsAndConditionFilesToggle
                ? item.termsAndCondition
                : '',
              placeholder: 'termsConditions',
              handleChange: (e: any) => handleInputChange(e),
            },

            {
              name: 'opportunityImage1',
              errorMessage: {},
              opportunityImage1: item?.coverImages?.[0]?.pathUrl,
              imageUrl: item?.coverImages?.[0]?.pathUrl,
            },

            {
              name: 'opportunityImage2',
              errorMessage: {},
              opportunityImage2: item?.coverImages?.[1]?.pathUrl,
              imageUrl: item?.coverImages?.[1]?.pathUrl,
            },
            {
              name: 'selectedOption',
              errorMessage: {},
              selectedOption:
                item.investmentVisibility === true
                  ? 'displayOnProfile'
                  : 'availableOnRequest',
            },
            {
              type: 'dropdown',
              name: 'currency',
              errorMessage: {},
              currency: item?.investment?.slice(-3),
              placeholder: 'currency',
              handleChange: (e: any) => handleInputChange(e),
            },
            // {
            //   name: 'id',
            //   id: item?._id,
            // },
            {
              type: 'text',
              name: 'usp',
              errorMessage: {},
              usp: item?.usp || '',
              placeholder: 'Anything else to note',
              handleChange: (e: any) => handleInputChange(e),
            },
            {
              type: 'text',
              name: 'deliverableSpecs',
              errorMessage: {},
              deliverableSpecs: item.deliverableSpecs || '',
              placeholder: 'Specs of Deliverables',
              handleChange: (e: any) => handleInputChange(e),
            },
            {
              name: 'termsAndConditionFilesToggle',
              errorMessage: {},
              termsAndConditionFilesToggle: item.termsAndConditionFilesToggle,
              type: 'checkbox',
            },
            {
              type: 'text',
              name: 'termsConditionsFile',
              errorMessage: {},
              termsConditionsFile: item.termsAndConditionFilesToggle
                ? item.termsAndCondition.trim().length
                  ? {
                    name: decodeURIComponent(
                      item.termsAndCondition?.substring(
                        item.termsAndCondition?.lastIndexOf('/') + 1
                      )
                    ),
                    pathUrl: item.termsAndCondition,
                  }
                  : null
                : null,
              placeholder: 'termsConditions',
              handleChange: (e: any) => handleInputChange(e),
            },
          ],
        });
      });
      setAccordionData(newOpp);
    }
  }, [oppurtunityData]);

  // const handleDelete = (e: any) => {
  //   onDelete(formData?._id);
  //   setOpenDialog(false);
  //   setEdit(false);
  // };

  const toggleAccordion = (index: any) => {
    const updatedItems = [...activeItems];
    updatedItems[index] = !updatedItems[index];
    setActiveItems(updatedItems);
  };
  const isButtonDisabled = () => {
    // Check if any of the required fields are empty
    // alert('callled');
    for (const accordion of accordionData) {
      for (const formData of accordion.step2FormData) {
        if (
          formData.deliverables?.trim().length === 0 ||
          formData.opportunityName?.trim().length === 0 ||
          formData.deliverableSpecs?.trim().length === 0 ||
          formData.investment?.trim().length === 0 ||
          formData.currency?.trim().length === 0
          // formData.opportunityImage1 === '' ||
          // formData.opportunityImage2 === ''
        ) {
          return true; // Disable the button
        }
      }
      if (
        getDataFromArray(
          accordion.step2FormData,
          'termsAndConditionFilesToggle'
        ) &&
        !getDataFromArray(accordion.step2FormData, 'termsConditionsFile')
      ) {
        return true;
      } else if (
        !getDataFromArray(
          accordion.step2FormData,
          'termsAndConditionFilesToggle'
        ) &&
        getDataFromArray(accordion.step2FormData, 'termsConditions')?.trim()
          .length === 0
      ) {
        return true;
      }
    }
    return false; // Enable the button
  };

  // function getMonthNumber(monthString: string) {
  //   const months = [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec',
  //   ];
  //   return months.indexOf(monthString) + 1;
  // }

  // function isDateInThePast(year: number, month: string, day: number) {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(year, getMonthNumber(month) - 1, day);
  //   return selectedDate < currentDate;
  // }

  const isFormEmpty = useMemo(() => {
    // if (
    //   formData.type !== 'Team' &&
    //   (!startMonth || !endMonth || !startYear || !endYear) // Check if "from" date is earlier than current date
    // ) {
    //   return true;
    // }
    // if (
    //   // First handle cases where all date components are present:
    //   (startDate &&
    //     endDate &&
    //     startMonth &&
    //     endMonth &&
    //     startYear &&
    //     endYear &&
    //     // Case 1: "From" date is later than "To" date (invalid):
    //     (new Date(`${startYear}-${getMonthNumber(startMonth)}-${startDate}`) >
    //       new Date(`${endYear}-${getMonthNumber(endMonth)}-${endDate}`) ||
    //       // Case 2: "From" year is later than "To" year (invalid):
    //       parseInt(startYear) > parseInt(endYear) ||
    //       // Case 3: "From" year is the same as "To" year, but "From" month is later than "To" month (invalid):
    //       (parseInt(startYear) === parseInt(endYear) &&
    //         getMonthNumber(startMonth) > getMonthNumber(endMonth)) ||
    //       // Case 4: "From" year is the same as "To" year, "From" month is the same as "To" month, but "From" day is later than "To" day (invalid):
    //       (parseInt(startYear) === parseInt(endYear) &&
    //         getMonthNumber(startMonth) === getMonthNumber(endMonth) &&
    //         parseInt(startDate) > parseInt(endDate)))) ||
    //   // Next handle cases where some date components are missing:
    //   // Ensure at least year and month are available for comparison:
    //   (startYear &&
    //     endYear &&
    //     // Case 1: "From" year is later than "To" year (invalid):
    //     (parseInt(startYear) > parseInt(endYear) ||
    //       // Case 2: "From" year is the same as "To" year, but "From" month is later than "To" month (invalid):
    //       (parseInt(startYear) === parseInt(endYear) &&
    //         getMonthNumber(startMonth) > getMonthNumber(endMonth)))) ||
    //   // Check if the selected "from" date is not in the past:
    //   (startDate &&
    //     startMonth &&
    //     startYear &&
    //     isDateInThePast(
    //       parseInt(startYear),
    //       startMonth,
    //       parseInt(startDate)
    //     )) ||
    //   // Check if the selected "to" date is not in the past:
    //   (endDate &&
    //     endMonth &&
    //     endYear &&
    //     isDateInThePast(parseInt(endYear), endMonth, parseInt(endDate))) ||
    //   // Check if the selected "from" month and year are not in the past:
    //   (startYear &&
    //     !isNaN(parseInt(startYear, 10)) &&
    //     (parseInt(startYear, 10) < new Date().getFullYear() ||
    //       (parseInt(startYear, 10) === new Date().getFullYear() &&
    //         getMonthNumber(startMonth) < new Date().getMonth() + 1))) ||
    //   // Check if the selected "to" month and year are not in the past:
    //   (endYear &&
    //     !isNaN(parseInt(endYear, 10)) &&
    //     parseInt(endYear, 10) === new Date().getFullYear() &&
    //     getMonthNumber(endMonth) < new Date().getMonth() + 1)
    // ) {
    //   setErrorMessage(
    //     'Invalid date range: "From" date cannot be later than "To" date and should be later than or equal to today.'
    //   );
    //   return true;
    // } else {
    //   setErrorMessage('');
    // }

    // let isFormEmp = fields.some(
    //   (data) =>
    //     data.isRequired &&
    //     (data.type !== 'date-picker'
    //       ? data.field === 'country'
    //         ? !formData[data.field].length
    //         : data.field === 'sport' &&
    //           formData['sport'] === 'Others' &&
    //           formData['otherSport'] === ''
    //         ? true
    //         : data.field === 'liveContent' &&
    //           (formData['liveContent'] === 'Yes' ||
    //             formData['liveContent'] === true) &&
    //           formData['platform'].length === 0
    //         ? true
    //         : data.field === 'liveContent' &&
    //           (formData['liveContent'] === 'Yes' ||
    //             formData['liveContent'] === true) &&
    //           formData['platform']?.includes('Others') &&
    //           formData['otherPlatform'] === ''
    //         ? true
    //         : !formData[data.field]
    //       : !formData[data.field][0] && !formData[data.field][1])
    // );

    // return isFormEmp;
    if (
      formData?.audienceProfile === '' ||
      formData?.audienceProfile === undefined ||
      formData?.highlights === '' ||
      formData?.highlights === undefined ||
      (!formData?.files?.['thumbnail']?.pathUrl &&
        !fileData?.thumbnail?.imageUrl) ||
      fields.some(
        (field: any) =>
          field.isRequired &&
          !([undefined, null].includes(formData[field?.field])
            ? formData[field?.field]
            : formData[field?.field] + '')
      ) ||
      (formData['sport'] === 'Others' && formData['otherSport'] === '') ||
      ((formData['liveContent'] === 'Yes' ||
        formData['liveContent'] === true) &&
        !formData['platform'].length) ||
      ((formData['liveContent'] === 'Yes' ||
        formData['liveContent'] === true) &&
        formData['platform']?.includes('Others') &&
        !formData['otherPlatform'])
    ) {
      return true;
    }
    return false;
  }, [
    formData,
    fileData?.thumbnail?.imageUrl,
    // , startMonth, endMonth, startYear, endYear, startDate, endDate
  ]);

  // useEffect(() => {
  //   dispatch(fetchMetaData());
  // }, []);

  // const fetchCountryData = async () => {
  //   const response: any = await dispatch(getMetaDataCountry()());
  //   return response?.payload?.data?.result;
  // };

  // useEffect(() => {
  //   // let isMounted = true;

  //   const fetchData = async () => {
  //     try {
  //       let updatedMetaData;

  //       if (metaDataDetail?.data?.data?.result) {
  //         const countryData = await fetchCountryData();

  //         if (countryData) {
  //           updatedMetaData = {
  //             ...metaDataDetail?.data?.data?.result,
  //             countries: countryData,
  //           };
  //         }

  //         if (updatedMetaData) {
  //           setMetaData(updatedMetaData);
  //         }
  //       }
  //     } catch (error) {
  //       // Handle errors if needed
  //     }
  //   };

  //   fetchData();

  //   // Cleanup function to cancel any ongoing asynchronous tasks
  //   // return () => {
  //   //   isMounted = false;
  //   // };
  // }, [metaDataDetail]);

  // const fetchCityData = async () => {
  //   const response: any = await dispatch(getMetaDataCity(formData?.country)());

  //   return response?.payload?.data?.result;
  // };

  // useEffect(() => {
  //   (async () => {
  //     if (formData.country) {
  //       // setFormData((prev: any) => ({ ...prev, city: '' }));
  //       const cityData = await fetchCityData();
  //       let newMetaData = { ...metaData };
  //       if (newMetaData) {
  //         newMetaData = {
  //           ...newMetaData,
  //           cities: cityData,
  //         };
  //       }

  //       setMetaData(newMetaData);
  //     }
  //   })();
  // }, [formData.country]);

  useEffect(() => {
    toggleAccordion(0);
  }, []);

  const handleDeleteOpp = (e: any, index: any) => {
    e.stopPropagation();
    e.preventDefault();
    selectedOppIndex(index);
    setOpenDelOppDialog(true);
  };

  const handleDeleteOppDialog = (action: any) => {
    setOpenDelOppDialog(false);
    if (action === 'yes') {
      if (accordionData?.[setOppIndex]?.id) {
        deleteOpportunity(accordionData[setOppIndex].id + '');
      } else {
        setAccordionData((prevData) => {
          const newData = [...prevData];
          newData.splice(setOppIndex, 1);
          return newData.map((opportunity, i) => ({
            ...opportunity,
            title: `Opportunity ${i + 1}`,
          }));
        });
        setOpenDelOppDialog(false);
      }
    } else {
      setOpenDelOppDialog(false);
    }
  };

  const radioButtonTextStyle = {
    color: 'var(--Gray-1, #333)',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '140%' /* 19.6px */,
    letterSpacing: '0.14px',
    marginLeft: '12px',
  };
  const addOpportunity = (index: any) => {
    const newOpportunity = {
      title: `Opportunity ${accordionData.length + 1}`,
      id: null,
      step2FormData: [
        {
          type: 'text',
          name: `opportunityName`,
          errorMessage: {},
          opportunityName: '',
          placeholder: 'Give us the name of the opportunity',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'number',
          name: `investment`,
          errorMessage: {},
          investment: '',
          placeholder: 'Investment',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'text',
          name: `deliverables`,
          errorMessage: {},
          deliverables: '',
          placeholder: 'Deliverables',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'text',
          name: 'termsConditions',
          errorMessage: {},
          termsConditions: '',
          placeholder: 'termsConditions',
          handleChange: (e: any) => handleInputChange(e),
        },

        {
          name: 'opportunityImage1',
          errorMessage: {},
          opportunityImage1: '',
          imageUrl: '',
        },

        {
          name: 'opportunityImage2',
          errorMessage: {},
          opportunityImage2: '',
          imageUrl: '',
        },
        {
          name: 'selectedOption',
          errorMessage: {},
          selectedOption: 'availableOnRequest',
        },
        {
          type: 'dropdown',
          name: 'currency',
          errorMessage: {},
          currency: '',
          placeholder: 'currency',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'text',
          name: 'usp',
          errorMessage: {},
          usp: '',
          placeholder: 'Anything else to note',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          type: 'text',
          name: 'deliverableSpecs',
          errorMessage: {},
          deliverableSpecs: '',
          placeholder: 'Specs of Deliverables',
          handleChange: (e: any) => handleInputChange(e),
        },
        {
          name: 'termsAndConditionFilesToggle',
          errorMessage: {},
          termsAndConditionFilesToggle: false,
          type: 'checkbox',
        },
        {
          type: 'text',
          name: 'termsConditionsFile',
          errorMessage: {},
          termsConditionsFile: null,
          placeholder: 'termsConditions',
          handleChange: (e: any) => handleInputChange(e),
        },
      ],
    };
    const updatedItems = [...activeItems];
    updatedItems.push(true); // Set the newly added opportunity to be toggled open
    setActiveItems(updatedItems);

    setAccordionData((prevData) => [...prevData, newOpportunity]);
  };
  useEffect(() => {
    // Your code to handle component update
    // This code will execute whenever formData changes
  }, [formData]);

  // const steps = [
  //   {
  //     label: 'Details',
  //     step: '1',
  //     completedStepIcon: verifyIcon,
  //   },
  //   {
  //     label: 'List of Opportunities',
  //     step: '2',
  //     completedStepIcon: verifyIcon,
  //   },
  // ];


  const handleAccordionItemChange = (
    index: number,
    fieldName: any,
    e: any,
    type?: any,
    imageUrl?: string | any
  ) => {
    const updatedAccordionData: any = accordionData.map((item, i) => {
      if (i !== index) {
        return item; // Return unchanged item if index does not match
      }

      // Update step2FormData for the matching item
      const updatedStep2FormData = item.step2FormData.map((formItem) => {
        if (formItem.name !== fieldName) {
          return formItem; // Return unchanged formItem if name does not match
        }
        // Update specific formItem based on field name and type
        const updatedValue =
          type === 'checkbox'
            ? e.target.value === 'true'
            : type === 'file'
              ? e
              : e.target.value;
        return {
          ...formItem,
          [fieldName]: updatedValue,
          ...(type === 'file' ? { imageUrl } : {}),
        };
      });

      return {
        ...item,
        step2FormData: updatedStep2FormData,
      };
    });
    // Update state with the modified accordionData
    setAccordionData(updatedAccordionData);
  };

  useEffect(() => { }, [activeStep]);
  useEffect(() => {
    setOpenPreview(openPreview);
  }, [openPreview]);

  const linkDetails = useMemo(() =>
    sellerData ?
      [
        {
          label: 'User Management',
          url: '/sellers',
        },
        {
          label: 'Sellers',
          url: '/sellers',
        },
        {
          label: 'Seller Details',
          url: `/sellers/${sellerData['sellerID']}?email=${sellerData['sellerEmail']}`
        },
        {
          label: 'Asset Details',
          url: '',
        },
      ] :
      [
        {
          label: 'Catalogue Management',
          url: '/',
        },
        {
          label: 'Asset Details',
          url: '',
        },
      ]
    , [sellerData]);

  const deleteFileApi = async (fileId: any) => {
    if (fileId) {
      try {
        const payload = {
          filePath: fileId?.pathUrl || fileId?.url || fileId || '',
        };
        // const response: any = await deleteFile(payload);
        // return response;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }
  };

  const uploadFile = async (file: any) => {
    try {
      const form = new FormData();
      form.append('file', file);
      // const response = await fileUploader(form);
      // return response;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const uploadOpportunityTCFiles = async (
    filedata: any,
    opportunityIndex: number,
    name: any
  ) => {
    if (!filedata) {
      setDeleteOpportunityFileKey('termsConditionsFile');
      setFileToBeDeletedData(
        getDataFromArray(
          accordionData[opportunityIndex].step2FormData,
          'termsConditionsFile'
        )
      );
      seSelectedOpportunityIndex(opportunityIndex);
      setShowDeleteFileConfirmationPopup(true);
      return;
    }
    const fileData = await uploadFile(filedata);
    // if (fileData?.data?.statusCode === 200) {
    //   handleAccordionItemChange(
    //     opportunityIndex,
    //     'termsConditionsFile',
    //     {
    //       ...fileData.data?.result,
    //       name: fileData.data?.result.name.replace(
    //         /(.*)\.pdf(?!.*\.pdf)/,
    //         '$1'
    //       ),
    //     },
    //     'file',
    //     {
    //       ...fileData.data?.result,
    //       name: fileData.data?.result.name.replace(
    //         /(.*)\.pdf(?!.*\.pdf)/,
    //         '$1'
    //       ),
    //     }
    //   );
    //   handleOpenSnackbar('File uploaded successfully', 'success');
    // }
  };

  const getDataFromArray = (array: any[], key: string) => {
    return array.find((item: any) => Object.keys(item)?.includes(key))?.[key];
  };

  const editOpportunity = () => {
    setSaveDialog(false);
    const accordianDataCopy = [...accordionData];
    accordianDataCopy.forEach((accordian: any) => {
      if (accordian.step2FormData.length) {
        accordian.step2FormData[3].termsConditions = getDataFromArray(
          accordian.step2FormData,
          'termsAndConditionFilesToggle'
        )
          ? getDataFromArray(accordian.step2FormData, 'termsConditionsFile')?.[
          'url'
          ] ||
          getDataFromArray(accordian.step2FormData, 'termsConditionsFile')?.[
          'pathUrl'
          ]
          : accordian.step2FormData[3].termsConditions;
      }
    });
    onEditSave(accordianDataCopy);
  };

  const handleFileDeleteConfirmationClick = async (action: any, keyName: string) => {
    setShowDeleteFileConfirmationPopup(false);
    setDeleteOpportunityFileKey('');
    if (action === 'yes') {
      const respose: any = await deleteFileApi(
        getDataFromArray(
          accordionData[selectedOpportunityIndex].step2FormData,
          keyName
        )
      );
      if (respose?.data?.statusCode === 200) {
        handleAccordionItemChange(
          selectedOpportunityIndex,
          keyName,
          null,
          'file',
          null
        );
        handleOpenSnackbar('File Delete Successfully', 'success');
      } else {
        seSelectedOpportunityIndex(-1);
        setFileToBeDeletedData(null);
        handleOpenSnackbar('Error in deleting file', 'error');
      }
    } else {
      seSelectedOpportunityIndex(-1);
      setFileToBeDeletedData(null);
    }
  };


  const handleOpenSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => {
    setSnackbar({ open: true, message, severity, autoHideDuration: 5000 });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const deleteOpportunity = async (id: string) => {
    const param: { id: string } = {
      id: id,
    };
    // const response: any = await dispatch(deleteOpportunityWithId(param)());
    // if (response?.data?.statusCode === 200) {
    //   setAccordionData((prevData) => {
    //     const newData = [...prevData];
    //     newData.splice(setOppIndex, 1);
    //     return newData.map((opportunity, i) => ({
    //       ...opportunity,
    //       title: `Opportunity ${i + 1}`,
    //     }));
    //   });
    //   setOpenDelOppDialog(false);
    // } else {
    //   handleOpenSnackbar('error in deleting opportunity', 'error');
    //   setOpenDelOppDialog(false);
    // }
  };


  const uploadOpportunityFiles = async (
    filedata: any,
    opportunityIndex: number,
    name: any
  ) => {
    if (filedata) {
      const fileData = await uploadFile(filedata);
      // if (fileData?.data?.statusCode === 200) {
      //   handleAccordionItemChange(
      //     opportunityIndex,
      //     name,
      //     { ...fileData.data?.result, name: fileData.data?.result.name },
      //     'file',
      //     fileData.data?.result.url
      //   );
      // }
    } else {
      setDeleteOpportunityFileKey(name);
      seSelectedOpportunityIndex(opportunityIndex);
      setFileToBeDeletedData(
        getDataFromArray(
          accordionData[opportunityIndex].step2FormData,
          name
        )
      );
      setShowDeleteFileConfirmationPopup(true);
    }
  };

  return (
    <>
      <Meta title={'Zuper | Edit Assets'} />
      <div
        style={{
          width: '80%',
          padding: '20px',
          overflow: 'hidden',
        }}
      >
        <Breadcrumb
          linkDetails={linkDetails}
          underline="always"
          maxItems={4}
          itemBeforeCollapse={4}
          itemAfterCollapse={4}
          iconName="arrow_forward_ios_black_24dp"
          iconSize={20}
          iconLabel="Breadcrumb-Arrow-Right"
          iconStyle="regular"
          color="#333"
          textColor="#333"
        />
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              marginBottom: '20px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                padding: '8px 12px 8px 12px',
                borderRadius: '5px',
                gap: '8px',
                background: isSelected === 'details' ? '#E20B18' : '#F2F2F2',
                cursor: 'pointer',
              }}
              onClick={() => {
                setActiveStep(0);
                setSelected('details');
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '600',
                  lineHeight: '20px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                  color: isSelected === 'details' ? '#FFFFFF' : '#828282',
                }}
              >
                Details
              </Typography>
            </div>
            <div
              style={{
                padding: '8px 12px 8px 12px',
                borderRadius: '5px',
                gap: '8px',
                background:
                  isSelected === 'opportunities' ? '#E20B18' : '#F2F2F2',
                cursor: 'pointer',
              }}
              onClick={() => {
                setActiveStep(1); setSelected('opportunities');
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '600',
                  lineHeight: '20px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                  color: isSelected === 'opportunities' ? '#FFFFFF' : '#828282',
                }}
              >
                Opportunities
              </Typography>
            </div>
          </div>
          <div
            className="asset-preview-scroll"
            style={{
              overflow: 'scroll',
              paddingBottom: '80px',
            }}
          >
            {activeStep === 0 && (
              <div
                style={{ height: '100%', overflow: 'auto' }}
                className="team-listing-scroll"
              >
                <DynamicFields
                  deviceType={deviceType}
                  fields={fields}
                  handleInputChange={handleInputChange}
                  metaData={metaDataDetail}
                  formData={formData}
                  errors={errors}
                  previewMode={previewMode}
                  onChangeSocial = {()=>{}}
                  socialLinks = {[]}
                />
                {/* DURATION DROPDOWN */}
                {/* {formData.type !== 'Team' && (
                  <>
                    <Typography
                      style={{
                        marginBottom: '10px',
                        color: 'var(--Gray-1, #333)',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '140%',
                        marginTop: '20px',
                      }}
                    >
                      Duration
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <ZupotsuDropdown
                          isRequired={false}
                          title="Date"
                          placeholder="Date"
                          previewMode={false}
                          name="startDate"
                          dropdownData={dateValue}
                          value={startDate}
                          presentOnDialog={true}
                          handleChange={(e) => {
                            setStartDate(e.target.value);
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <ZupotsuDropdown
                          isRequired={true}
                          title="Month"
                          previewMode={false}
                          placeholder="Month"
                          name="startMonth"
                          dropdownData={Month}
                          value={startMonth}
                          presentOnDialog={true}
                          handleChange={(e) => {
                            setStartMonth(e.target.value);
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <ZupotsuDropdown
                          isRequired={true}
                          title="Year"
                          previewMode={false}
                          placeholder="Year"
                          name="startYear"
                          dropdownData={Year}
                          value={startYear}
                          presentOnDialog={true}
                          handleChange={(e) => {
                            setStartYear(e.target.value);
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: '50px',
                        }}
                      >
                        {' '}
                        -{' '}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <ZupotsuDropdown
                          isRequired={false}
                          title="Date"
                          previewMode={false}
                          placeholder="Date"
                          name="endDate"
                          dropdownData={dateValue}
                          value={endDate}
                          presentOnDialog={true}
                          handleChange={(e) => {
                            setEndDate(e.target.value);
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <ZupotsuDropdown
                          isRequired={true}
                          title="Month"
                          previewMode={false}
                          placeholder="Month"
                          name="endMonth"
                          dropdownData={Month}
                          value={endMonth}
                          presentOnDialog={true}
                          handleChange={(e) => {
                            setEndMonth(e.target.value);
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <ZupotsuDropdown
                          isRequired={true}
                          title="Year"
                          previewMode={false}
                          placeholder="Year"
                          name="endYear"
                          dropdownData={Year}
                          value={endYear}
                          presentOnDialog={true}
                          handleChange={(e) => {
                            setEndYear(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {errorMessage && (
                      <div style={{ color: 'red', marginTop: '5px' }}>
                        {errorMessage}
                      </div>
                    )}
                  </>
                )} */}
                <SocialHandle
                  deviceType={deviceType}
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  socialLinks={socialLinks}
                  onChangeSocial={onChangeSocial}
                  previewMode={previewMode}
                  isEditView={true}
                />

                <div
                  style={{
                    paddingTop: deviceType === 'mobile' ? '16px' : '20px',
                  }}
                >
                  <ZupotsuTextfield
                    title="Anything else to note"
                    name="usp"
                    value={formData.usp}
                    placeholder={'Anything else to note'}
                    errorMessage={errors.usp && errors.usp}
                    handleChange={(e) => handleInputChange(e)}
                  />
                </div>

                <div
                  style={{
                    paddingTop: deviceType === 'mobile' ? '16px' : '20px',
                  }}
                >
                  <ZupotsuTextfield
                    multiline={true}
                    bracketText={'(If Any)'}
                    rows={4}
                    title="Do's & Dont's "
                    name="doDonts"
                    value={formData.doDonts || formData?.dosAndDonts || ''}
                    placeholder={"Mention the do's & dont's if any"}
                    errorMessage={errors.doDonts && errors.doDonts}
                    handleChange={(e) => handleInputChange(e)}
                  />
                </div>

                <div style={imgUploadParElStyle}>
                  <div
                    style={{
                      display: 'flex',
                      gap: deviceType === 'mobile' ? '14px' : '30px',
                    }}
                  >
                    <ZupotsuImgUpload
                      uploadedImage={
                        fileData?.logo?.imageUrl || prevfileData?.logo?.pathUrl
                      }
                      fileSize={'Max Size 5 MB'}
                      fileType={'jpg'}
                      name={'logo'}
                      imgCardLabel={
                        deviceType === 'mobile' ? 'Upload Logo' : 'Upload Logo'
                      }
                      uploadTitle={
                        'Click to upload or Drag & Drop png/jpg here'
                      }
                      setUploadedImage={handleFileChange}
                    />
                    <ZupotsuImgUpload
                      fileSize={'Max Size 10 MB'}
                      uploadedImage={
                        fileData?.pitchDeckFile?.imageUrl ||
                        (prevfileData?.pitchDeckFile?.pathUrl
                          ? { name: 'Untitled' }
                          : '')
                      }
                      fileType={'pdf'}
                      name={'pitchDeckFile'}
                      imgCardLabel={'Upload Pitch Deck'}
                      uploadTitle={'Click to upload or Drag & Drop pdf here'}
                      setUploadedImage={handleFileChange}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: deviceType === 'mobile' ? '16px' : '30px',
                      marginTop: '0px',
                      // flexWrap: 'wrap',
                      justifyContent: 'start',
                    }}
                  >
                    <ZupotsuImgUpload
                      fileSize={'Max Size 5 MB'}
                      uploadedImage={
                        fileData?.thumbnail?.imageUrl ||
                        prevfileData?.thumbnail?.pathUrl
                      }
                      fileType={'jpg'}
                      name={'thumbnail'}
                      isRequired={true}
                      imgCardLabel={'Upload Thumbnail'}
                      uploadTitle={
                        'Click to upload or Drag & Drop png/jpg here'
                      }
                      setUploadedImage={(name, imageUrl, file) => {
                        handleFileChange(name, imageUrl, file);
                      }}
                    />
                    {deviceType === 'mobile' && (
                      <div style={{ visibility: 'hidden' }}>
                        <ZupotsuImgUpload
                          fileSize={'Max Size 5 MB'}
                          uploadedImage={
                            fileData?.thumbnail?.imageUrl ||
                            prevfileData?.thumbnail?.pathUrl
                          }
                          fileType={'jpg'}
                          name={'thumbnail'}
                          imgCardLabel={'Upload Thumbnail'}
                          uploadTitle={
                            'Click to upload or Drag & Drop png/jpg here'
                          }
                          setUploadedImage={(name, imageUrl, file) => {
                            // handleFileChange(name, imageUrl, file);
                            handleFileChange(name, imageUrl, file);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Typography
                      style={{
                        marginBottom: '2px',
                        color: 'var(--Gray-1, #333)',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '140%',
                      }}
                    >
                      Upload Cover Pictures
                    </Typography>

                    <div
                      style={{
                        display: 'flex',
                        gap: deviceType === 'mobile' ? '14px' : '20px',
                      }}
                    >
                      <ZupotsuImgUpload
                        fileSize={'Max Size 5 MB'}
                        uploadedImage={
                          fileData.coverPicture0?.imageUrl ||
                          prevfileData?.coverImages?.[0]?.pathUrl
                        }
                        fileType={'jpg'}
                        name={'coverPicture0'}
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
                          marginTop: '28px',
                        }}
                      >
                        <ZupotsuImgUpload
                          // fileSize={'MaxSize 500 KB'}
                          uploadedImage={
                            fileData.coverPicture1?.imageUrl ||
                            prevfileData?.coverImages?.[1]?.pathUrl
                          }
                          fileType={'jgp'}
                          name={'coverPicture1'}
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
                          marginTop: '28px',
                        }}
                      >
                        <ZupotsuImgUpload
                          // fileSize={'MaxSize 500 KB'}
                          uploadedImage={
                            fileData.coverPicture2?.imageUrl ||
                            prevfileData?.coverImages?.[2]?.pathUrl
                          }
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
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <>
                {/* {addOpportunities && ( */}
                <>
                  <div
                    style={{
                      marginBottom: '40px',
                    }}
                  >
                    <div className="opportunity-accordion">
                      {accordionData?.map((data, index) => (
                        <div className="opportunity-accordion-item" key={index}>
                          <div>
                            <div
                              className="opportunity-accordion-title"
                              style={{ padding: '20px 0' }}
                              // onClick={() => setIsActive(!isActive)}
                              onClick={() => toggleAccordion(index)}
                            >
                              <Typography style={oppAccordionTitleStyle}>
                                {data.title}
                              </Typography>
                              {/* <div style={{ marginRight: '20px' }}>
                              {activeItems[index] ? (
                                <img src={collapse} alt="" />
                              ) : (
                                <img src={expand} alt="" />
                              )}
                            </div> */}
                              {/* {!previewMode && ( */}
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '12px',
                                  alignItems: 'center',
                                }}
                              >
                                {index !== 0 && (
                                  <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={(e) => handleDeleteOpp(e, index)}
                                  >
                                    <img src={deleteIcon} alt="" />
                                  </div>
                                )}

                                <div>
                                  {activeItems[index] ? (
                                    <img src={collapse} alt="" />
                                  ) : (
                                    <img src={expand} alt="" />
                                  )}
                                </div>
                              </div>
                              {/* )} */}
                            </div>
                            <Divider />
                          </div>
                          {activeItems[index] && (
                            <div
                              className="team-listing-scroll"
                              style={{
                                margin: '24px 0',
                                height: '1',
                                overflow: 'auto',
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                      deviceType === 'mobile'
                                        ? 'auto'
                                        : '1fr 1fr',
                                    gridColumnGap: '28px',
                                    gridRowGap:
                                      deviceType === 'mobile' ? '16px' : '',
                                  }}
                                >
                                  {data.step2FormData[0] && (
                                    <div>
                                      <ZupotsuTextfield
                                        title="Opportunity Name"
                                        value={
                                          data.step2FormData[0].opportunityName
                                        }
                                        maxLength={30}
                                        placeholder="Give us the name of the opportunity"
                                        name="opportunityName"
                                        toolTipMessage="Tell us the name of opportunity. Is it title sponsorship or Jersey Sponsorship or Meet & Greet etc. 
If you have more opportunities to list use the add more button to add them separately."
                                        isRequired={true}
                                        handleChange={(e) =>
                                          handleAccordionItemChange(
                                            index,
                                            'opportunityName',
                                            e
                                          )
                                        }
                                        previewMode={false}
                                      />
                                    </div>
                                  )}
                                  {data.step2FormData[1] && (
                                    <div>
                                      <Typography
                                        style={{
                                          // marginBottom: '10px',
                                          color: 'var(--Gray-1, #333)',
                                          fontFamily: 'Inter',
                                          fontSize: '16px',
                                          fontStyle: 'normal',
                                          fontWeight: '700',
                                          lineHeight: '140%',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '10px',
                                        }}
                                      >
                                        <div>
                                          {'Investment'}
                                          <span
                                            style={{
                                              color:
                                                'var(--Zupotso-Primary, #E20B18)',
                                              fontFamily: 'Inter',
                                              fontSize: '16px',
                                              fontStyle: 'normal',
                                              fontWeight: '700',
                                              lineHeight: '140%',
                                            }}
                                          >
                                            *
                                          </span>
                                        </div>
                                        <ZupotsuTooltip
                                          tooltipMessage={
                                            'What is the minimum price at which you wish to sell this opportunity ? If you like it to be displayed or made available only on request. Please select the button appropriately.'
                                          }
                                          icon={infoCircle}
                                        />
                                      </Typography>
                                      <div
                                        style={{
                                          width: '100%',
                                          display: 'flex',
                                          gap: '10px',
                                        }}
                                      >
                                        <div
                                          style={{
                                            width:
                                              deviceType === 'mobile'
                                                ? '35%'
                                                : '20%',
                                            paddingTop: '10px',
                                          }}
                                        >
                                          <ZupotsuDropdown
                                            dropdownData={['INR', 'USD']}
                                            placeholder="Currency"
                                            title=""
                                            value={
                                              data.step2FormData[7].currency
                                            }
                                            handleChange={(e) =>
                                              handleAccordionItemChange(
                                                index,
                                                'currency',
                                                e
                                              )
                                            }
                                          />
                                        </div>
                                        <div
                                          style={investmentFieldParentStyles}
                                        >
                                          <ZupotsuTextfield
                                            title=""
                                            toolTipMessage=""
                                            // trailingIcon={rs}
                                            type="text"
                                            maxLength={10}
                                            trailImageHeight={'16px'}
                                            trailImageWidth={'16px'}
                                            value={
                                              data.step2FormData[1].investment
                                            }
                                            placeholder="Investment"
                                            name="investment"
                                            handleChange={(e) =>
                                              handleAccordionItemChange(
                                                index,
                                                'investment',
                                                e
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      {/* <ZupotsuTextfield
                                        title="Investment"
                                        toolTipMessage="What is the minimum price at
                                          which you wish to sell this opportunity ?
                                          If you like it to be displayed or made available only on request. Please select the button appropriately."
                                        trailingIcon={
                                          data.step2FormData[7].currency ===
                                          'USD'
                                            ? dollarCircle1
                                            : data.step2FormData[7].currency ===
                                              'INR'
                                            ? rs
                                            : ''
                                        }
                                        trailImageHeight={
                                          data.step2FormData[7].currency ===
                                          'INR'
                                            ? '16px'
                                            : ''
                                        }
                                        trailImageWidth={
                                          data.step2FormData[7].currency ===
                                          'INR'
                                            ? '16px'
                                            : ''
                                        }
                                        value={data.step2FormData[1].investment}
                                        placeholder="Investment"
                                        name="investment"
                                        handleChange={(e) =>
                                          handleAccordionItemChange(
                                            index,
                                            'investment',
                                            e
                                          )
                                        }
                                        previewMode={false}
                                      /> */}

                                      <div
                                        className="listing-radio-container"
                                        style={{
                                          display: 'flex',
                                          flexDirection:
                                            deviceType === 'mobile'
                                              ? 'column'
                                              : 'row',
                                          gap: '20px',
                                          marginTop: '12px',
                                          justifyContent:
                                            deviceType === 'mobile'
                                              ? 'start'
                                              : '',
                                          alignItems:
                                            deviceType === 'mobile'
                                              ? 'start'
                                              : '',
                                        }}
                                      >
                                        <label
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <input
                                            type="radio"
                                            style={{ accentColor: '#E20B18' }}
                                            value={'displayOnProfile'}
                                            checked={
                                              data.step2FormData[6]
                                                .selectedOption ===
                                              'displayOnProfile'
                                            }
                                            onChange={(e) =>
                                              handleAccordionItemChange(
                                                index,
                                                'selectedOption',
                                                e
                                              )
                                            }
                                          />
                                          <span style={radioButtonTextStyle}>
                                            Display on profile
                                          </span>
                                        </label>

                                        <label
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <input
                                            type="radio"
                                            style={{ accentColor: '#E20B18' }}
                                            value={'availableOnRequest'}
                                            checked={
                                              data.step2FormData[6]
                                                .selectedOption ===
                                              'availableOnRequest'
                                            }
                                            onChange={(e) =>
                                              handleAccordionItemChange(
                                                index,
                                                'selectedOption',
                                                e
                                              )
                                            }
                                          />
                                          <span style={radioButtonTextStyle}>
                                            Available on Request
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {data.step2FormData[2] && (
                                  <div
                                    style={{
                                      marginTop:
                                        deviceType === 'mobile'
                                          ? '16px'
                                          : '20px',
                                    }}
                                  >
                                    <ZupotsuTextfield
                                      title="Deliverables"
                                      value={data.step2FormData[2].deliverables}
                                      placeholder="Tell us about the opportunity"
                                      name="deliverables"
                                      toolTipMessage="Tell us about the minimum reach or number of impressions that this opportunity will generate."
                                      isRequired={true}
                                      multiline={true}
                                      rows={4}
                                      handleChange={(e) =>
                                        handleAccordionItemChange(
                                          index,
                                          'deliverables',
                                          e
                                        )
                                      }
                                      previewMode={false}
                                    />
                                  </div>
                                )}
                                {data.step2FormData[9] && (
                                  <div
                                    style={{
                                      marginTop:
                                        deviceType === 'mobile'
                                          ? '16px'
                                          : '20px',
                                    }}
                                  >
                                    <ZupotsuTextfield
                                      title="Specs of Deliverables"
                                      value={
                                        data.step2FormData[9].deliverableSpecs
                                      }
                                      placeholder="Specs of Deliverables"
                                      name="deliverableSpecs"
                                      toolTipMessage=""
                                      isRequired={true}
                                      multiline={true}
                                      rows={2}
                                      handleChange={(e) =>
                                        handleAccordionItemChange(
                                          index,
                                          'deliverableSpecs',
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                )}
                                <div
                                  style={{
                                    marginTop:
                                      deviceType === 'mobile' ? '16px' : '20px',
                                  }}
                                >
                                  {getDataFromArray(
                                    data.step2FormData,
                                    'termsAndConditionFilesToggle'
                                  ) ? (
                                    <ZupotsuImgUpload
                                      fileSize={'Max Size 5 MB'}
                                      isRequired={true}
                                      uploadedImage={getDataFromArray(
                                        data.step2FormData,
                                        'termsConditionsFile'
                                      )}
                                      fileType={'pdf'}
                                      name={'termsAndConditionFile'}
                                      imgCardLabel={
                                        'Upload Terms and Conditions'
                                      }
                                      uploadTitle={
                                        'Click to upload or Drag & Drop pdf here'
                                      }
                                      setUploadedImage={(
                                        name,
                                        imageUrl,
                                        file
                                      ) => {
                                        uploadOpportunityTCFiles(
                                          file,
                                          index,
                                          name
                                        );
                                      }}
                                      showToastMessage={false}
                                    />
                                  ) : (
                                    <ZupotsuTextfield
                                      title="Terms & Conditions"
                                      value={getDataFromArray(
                                        data.step2FormData,
                                        'termsConditions'
                                      )}
                                      placeholder="Tell us about terms and conditions"
                                      name="termsConditions"
                                      toolTipMessage={
                                        deviceType === 'mobile'
                                          ? ''
                                          : 'Add Info here'
                                      }
                                      multiline={true}
                                      isRequired={true}
                                      rows={2}
                                      handleChange={(e) =>
                                        handleAccordionItemChange(
                                          index,
                                          'termsConditions',
                                          e
                                        )
                                      }
                                    />
                                  )}
                                  <div
                                    className="listing-radio-container"
                                    style={dynamicStyle}
                                  >
                                    <label
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        style={{ accentColor: '#E20B18' }}
                                        value={'true'}
                                        checked={
                                          getDataFromArray(
                                            data.step2FormData,
                                            'termsAndConditionFilesToggle'
                                          ) +
                                          '' ===
                                          'true'
                                        }
                                        name={
                                          'termsAndConditionFilesToggle' + index
                                        }
                                        onChange={(e) =>
                                          handleAccordionItemChange(
                                            index,
                                            'termsAndConditionFilesToggle',
                                            e,
                                            'checkbox'
                                          )
                                        }
                                      />
                                      <span style={radioButtonTextStyle}>
                                        File Upload
                                      </span>
                                    </label>

                                    <label
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        style={{ accentColor: '#E20B18' }}
                                        value={'false'}
                                        name={
                                          'termsAndConditionFilesToggle' + index
                                        }
                                        checked={
                                          getDataFromArray(
                                            data.step2FormData,
                                            'termsAndConditionFilesToggle'
                                          ) +
                                          '' ===
                                          'false'
                                        }
                                        onChange={(e) => {
                                          handleAccordionItemChange(
                                            index,
                                            'termsAndConditionFilesToggle',
                                            e,
                                            'checkbox'
                                          );
                                        }}
                                      />
                                      <span style={radioButtonTextStyle}>
                                        Text
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                {/* {data.step2FormData[3] && (
                                  <div
                                    style={{
                                      marginTop:
                                        deviceType === 'mobile'
                                          ? '16px'
                                          : '20px',
                                    }}
                                  >
                                    <ZupotsuTextfield
                                      title="Terms & Conditions"
                                      value={
                                        data.step2FormData[3]?.termsConditions
                                      }
                                      placeholder="Tell us about terms and conditions"
                                      name="termsConditions"
                                      toolTipMessage="Add Info here"
                                      multiline={true}
                                      rows={2}
                                      handleChange={(e) =>
                                        handleAccordionItemChange(
                                          index,
                                          'termsConditions',
                                          e
                                        )
                                      }
                                      previewMode={false}
                                    />
                                  </div>
                                )} */}

                                <div
                                  style={{
                                    marginTop:
                                      deviceType === 'mobile' ? '16px' : '20px',
                                  }}
                                >
                                  <ZupotsuTextfield
                                    title="Anything else to note"
                                    value={getDataFromArray(
                                      data.step2FormData,
                                      'usp'
                                    )}
                                    placeholder="Anything else to note"
                                    name="usp"
                                    toolTipMessage=""
                                    handleChange={(e) =>
                                      handleAccordionItemChange(index, 'usp', e)
                                    }
                                  />
                                </div>
                                <div
                                  style={{
                                    marginTop:
                                      deviceType === 'mobile' ? '16px' : '20px',
                                  }}
                                >
                                  <Typography
                                    style={{
                                      marginBottom: '5px',
                                      color: 'var(--Gray-1, #333)',
                                      fontFamily: 'Inter',
                                      fontSize: '16px',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                      lineHeight: '140%',
                                    }}
                                  >
                                    Upload Pictures
                                    {/* <span style={{ color: 'red' }}>*</span> */}
                                  </Typography>

                                  <Typography
                                    style={{
                                      marginBottom: '14px',
                                      color: 'var(--Gray-1, #828282)',
                                      fontFamily: 'Inter',
                                      fontSize: '14px',
                                      fontStyle: 'normal',
                                      // fontWeight: '500',
                                      lineHeight: '140%',
                                    }}
                                  >
                                    You can upload max 2 related to the
                                    opportunity (Max Size 5 MB)
                                  </Typography>
                                  <div style={{ display: 'flex', gap: '10px' }}>
                                    <ZupotsuImgUpload
                                      uploadedImage={
                                        data.step2FormData[4].imageUrl
                                      }
                                      // value={data.step2FormData[2].termsConditions}
                                      fileType={'jgp'}
                                      name={'opportunityImage1'}
                                      fileSize=""
                                      uploadTitle={
                                        'Click to upload or Drag & Drop png/jpg here'
                                      }
                                      setUploadedImage={
                                        (name, imageUrl, file) =>
                                          uploadOpportunityFiles(
                                            file,
                                            index,
                                            'opportunityImage1'
                                          )
                                        // handleAccordionItemChange(
                                        //   index,
                                        //   name,
                                        //   file,
                                        //   'file',
                                        //   imageUrl
                                        // )
                                      }
                                      showToastMessage={false}
                                    />
                                    <ZupotsuImgUpload
                                      uploadedImage={
                                        data.step2FormData[5].imageUrl
                                      }
                                      fileType={'jgp'}
                                      name={'opportunityImage2'}
                                      fileSize=""
                                      uploadTitle={
                                        'Click to upload or Drag & Drop png/jpg here'
                                      }
                                      // setUploadedImage={(name, imageUrl, file) => {
                                      //   handleFileChange(name, imageUrl, file);
                                      // }}
                                      setUploadedImage={(
                                        name,
                                        imageUrl,
                                        file
                                      ) => {
                                        uploadOpportunityFiles(
                                          file,
                                          index,
                                          'opportunityImage2'
                                        );
                                      }}
                                      showToastMessage={false}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {!previewMode && (
                      <div style={assetPrevAddMoreParentStyle}>
                        <img src={addCircle} alt="" />
                        <Typography
                          style={assetPrevAddMoreStyle}
                          onClick={addOpportunity}
                        >
                          Add More Opportunities
                        </Typography>
                      </div>
                    )}
                  </div>
                </>
                {/* // )} */}
              </>
            )}

            {!previewMode && (
              <div
                style={{
                  bottom: 10,
                  position: 'absolute',
                  background: 'white',
                  width: '80%',
                }}
              >
                <Divider />
                <div
                  style={{
                    display: 'flex',
                    paddingTop: '16px',
                    paddingBottom: '4px',
                    justifyContent: 'space-between', // This ensures the left, center, and right alignment with equal spacing
                    gap: deviceType === 'mobile' ? '16px' : '20px',
                  }}
                >
                  <div
                    style={{
                      flex: deviceType === 'mobile' ? 1 : 'none', // Use flex 1 for mobile to ensure the button stretches
                      maxWidth: deviceType === 'mobile' ? 'none' : '196.5px', // Remove the fixed width on mobile for flex stretching
                    }}
                  >
                    <ZupotsuButton
                      name="Cancel"
                      handleClick={handleToggleDrawer}
                      isCustomColors={true}
                      variant={'outlined'}
                      customTextColor="#BDBDBD"
                      customBgColor="#fff"
                      customBgColorOnhover="#fff"
                      customTextColorOnHover="#000"
                      customOutlineColor={'1px solid #BDBDBD'}
                      customOutlineColorOnHover={'1px solid #BBB'}
                    />
                  </div>
                  <div
                    style={{
                      flex: deviceType === 'mobile' ? 1 : 'none',
                      maxWidth: deviceType === 'mobile' ? 'none' : '196.5px',
                    }}
                  >
                    <ZupotsuButton
                      name="Verify Details"
                      handleClick={() => setOpenPreview(true)}
                      isCustomColors={true}
                      variant={'outlined'}
                      customTextColor="#fff"
                      customBgColor="#E20B18"
                      customBgColorOnhover="#b3101a"
                      customTextColorOnHover="#fff"
                      customOutlineColor={'1px solid #E20B18'}
                      customOutlineColorOnHover={'1px solid #E20B18'}
                    // disabled={
                    //   activeStep === 1 ? isButtonDisabled() : isFormEmpty
                    // }
                    />
                  </div>
                  <div
                    style={{
                      flex: deviceType === 'mobile' ? 1 : 'none',
                      maxWidth: deviceType === 'mobile' ? 'none' : '196.5px',
                    }}
                  >
                    <ZupotsuButton
                      name="Update"
                      handleClick={() => setSaveDialog(true)}
                      isCustomColors={true}
                      variant={'outlined'}
                      customTextColor="#fff"
                      customBgColor="#E20B18"
                      customBgColorOnhover="#b3101a"
                      customTextColorOnHover="#fff"
                      customOutlineColor={'1px solid #E20B18'}
                      customOutlineColorOnHover={'1px solid #E20B18'}
                      disabled={
                        activeStep === 1 ? isButtonDisabled() : isFormEmpty
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      </div>
      {/* </Drawer> */}
      <AssetPreview
        open={openPreview}
        handleToggleDrawer={() => setOpenPreview(!openPreview)}
        activeStep={activeStep}
        handleInputChange={handleInputChange}
        deviceType={deviceType}
        formData={formData}
        fileData={fileData}
        prevfileData={prevfileData}
        duration={
          {
            // startDate,
            // endDate,
            // startMonth,
            // endMonth,
            // startYear,
            // endYear,
          }
        }
        handleFileChange={handleFileChange}
        previewMode={true}
        addOpportunities={addOpportunities}
        setaAddOpportunities={setaAddOpportunities}
        accordionData={accordionData}
        metaData={metaDataDetail}
        fields={fields}
        socialLinks={socialLinks}
        onEditSave={() => { }}
        onChangeSocial={onChangeSocial}
      />
      <Dialog
        open={saveDialog}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: '4px',
            width: '523px',
            zIndex: 1000,
          },
        }}
        disableScrollLock
      >
        <DialogContent style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <CloseIcon
              style={{ alignSelf: 'end', cursor: 'pointer' }}
              onClick={() => setSaveDialog(false)}
            />

            <Typography
              style={{
                textAlign: 'center',
                paddingTop: '16px',
                color: 'var(--Gray-1, #333)',
                fontFamily: 'Inter',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: '140%',
                marginBottom: '20px',
              }}
            >
              Do you want to update the asset details?
            </Typography>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                width: '85%',
                paddingBottom: '8px',
              }}
            >
              <ZupotsuButton
                name="Cancel"
                variant={'outlined'}
                isCustomColors={true}
                customOutlineColor="1px solid #E0E0E0"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#828282"
                handleClick={() => setSaveDialog(false)}
              />
              <ZupotsuButton
                name="Update"
                variant={'outlined'}
                isCustomColors={true}
                customOutlineColor="1px solid #E20B18"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#E20B18"
                handleClick={() => {
                  editOpportunity();
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ZupotsuConfirmationDialog
        open={showDeleteFileConfirmationPopup}
        showIcon={false}
        handleClose={(action) =>
          handleFileDeleteConfirmationClick(action, deleteOpportunityFileKey)
        }
        showListContent={false}
        buttonName={['Cancel', 'Delete']}
        comfirmationMessage="Are you sure you want to delete this file?"
        handleCloseIcon={() => {
          setShowDeleteFileConfirmationPopup(false);
        }}
      />
      <ZupotsuConfirmationDialog
        open={openDelOppDialog}
        showIcon={false}
        handleClose={(action) => handleDeleteOppDialog(action)}
        showListContent={false}
        buttonName={['Cancel', 'Delete']}
        comfirmationMessage="Are you sure you want to delete this opportunity?"
        handleCloseIcon={() => {
          setOpenDelOppDialog(false);
        }}
      />
      <SnackbarWrapper
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity as AlertColor}
      />
    </>
  );
};

export default AssetUpdate;
