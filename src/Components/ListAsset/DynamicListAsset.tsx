import {
  Backdrop,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import ZupotsuConfirmationDialog from '../../Molecules/zupotsu-confirmation-dialog/zupotsu-confirmation-dialog';
import ZupotsuImgUpload from '../../Molecules/zupotsu-img-upload/zupotsu-img-upload';
import ZupotsuStepper from '../../Molecules/zupotsu-stepper/zupotsu-stepper';

import {
  addCircle, arrowLeft,
  collapse,
  copy,
  deleteIcon,
  eastWhiteArrow,
  expand,
  infoCircle,
  verifyIcon,
} from '../../assets';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
// import ZupotsuTextfield from 'libs/component-lib/src/lib/Atoms/zupotsu-textfields/zupotsu-textfields';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import useDeviceType from '../../utils/DeviceType';
import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import './GlobalListing.css';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   createAsset,
//   createOpportunity,
//   deleteFile,
//   fileUploader,
//   getAsset,
//   updateAsset,
// } from '../../store/Slices/listAssetSlice';
// import { RootState } from '../../store/store';
// import { fetchMetaData, getMetaDataCountry } from '../../store/Slices/metaData';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import AssetPreview from './AssetPreview';
import DynamicFields from './DynamicFields';
import SocialHandle from './SocialHandle';
import { GlobalContext } from '../../context/GlobalContext';
import ZupotsuTooltip from '../../Atoms/zupotsu-tooltip/zupotsu-tooltip';
import { getLocalStorage } from '../../utils/LocalStorageService';
import tcToggleStyle, { FieldsData, imgUploadParentElStyle, investmentFieldParentStyle } from '../../utils/constants';
import Meta from '../../utils/Meta';

const DynamicListAsset = ({
  onDataPresent = (isDataPresent: boolean) => { },
  assetType = 'Team',
  seePreviewClicked = false,
  dynamicListRef,
  tabControl = (disable: boolean) => { },
  setDisabledPreviewButton = (e: boolean) => { },
  ...props
}: any) => {
  const userInfo = getLocalStorage('userInfoAdmin');
  const deviceType = useDeviceType();
  const [isDraftDisable, setDraftDisable] = useState(true);
  const [openBackdrop, setBackdrop] = useState(false);
  const dynamicStyle: CSSProperties = tcToggleStyle();
  const imgUploadParElStyle: CSSProperties = imgUploadParentElStyle();
  const investmentFieldParentStyles: CSSProperties =
    investmentFieldParentStyle();

  // const [startDate, setStartDate] = useState('');
  // const [startMonth, setStartMonth] = useState('');
  // const [startYear, setStartYear] = useState('');
  // const [endDate, setEndDate] = useState('');
  // const [endMonth, setEndMonth] = useState('');
  // const [endYear, setEndYear] = useState('');

  // const handleInputChange = (event) => {
  //   // Update form state and set hasUnsavedChanges to true
  //   setHasUnsavedChanges(true);
  // };
  const TeamFields: FieldsData = [
    {
      type: 'text',
      info: '',
      label: 'Name',
      placeholder: 'Name',
      field: 'name',
      isRequired: true,
      maxLength: 32,
    },
    {
      type: 'text',
      info:
        deviceType === 'mobile'
          ? ''
          : 'Give us one line that defines what your game is and what is the differentiating feature.',
      label: 'Headline',
      placeholder:
        deviceType === 'mobile'
          ? 'Headline'
          : 'Tell us about your team in few words',
      field: 'headline',
      isRequired: true,
      maxLength: 45,
    },
    {
      type: 'dropdown',
      info: '',
      label: 'Sport',
      field: 'selectedSport',
      placeholder: 'Sport',
      dropdownData: [
        'Esports',
        'Cricket',
        'Football',
        'Chess',
        'Kabaddi',
        'Others',
      ],
      metaDataField: '',
      isRequired: true,
      otherOptionPresent: true,
    },
    {
      type: 'text',
      info: '',
      label: 'Sub-sports',
      field: 'subSport',
      placeholder: 'Sub sport',
      isRequired: false,
    },
    {
      type: 'text',
      info: '',
      label: 'Geographical Span',
      placeholder: 'Geographical Span',
      field: 'geographicalSpan',
      isRequired: true,
    },
    {
      type: 'multiSelectDropdown',
      info: '',
      label: 'Country of Operations',
      field: 'country',
      placeholder: 'Country',
      metaDataField: 'countries',
      isRequired: true,
    },
    {
      type: 'text',
      info: '',
      label: 'State/City of Operations',
      placeholder: 'City',
      field: 'city',
      isRequired: false,
    },
    {
      type: 'dropdown',
      info: '',
      label: 'Type',
      field: 'typeField',
      placeholder: 'Type',
      dropdownData: ['Physical', 'Digital', 'Phygital'],
      metaDataField: '',
      isRequired: true,
    },
    {
      type: 'dropdown',
      info: 'Will there be any live content?',
      label: 'Live Content Plan',
      field: 'liveContentPlan',
      placeholder: 'Live Content Plan',
      dropdownData: ['Yes', 'No'],
      metaDataField: '',
      isRequired: true,
      liveContentPlan: true,
    },
    {
      type: 'platformForLiveContent',
      info: '',
      label: 'Platform',
      field: 'platform',
      placeholder: 'Platform',
      dropdownData: ['Yes', 'No'],
      metaDataField: '',
      isRequired: false,
    },
    {
      type: 'text',
      info: '',
      label: 'Content Plan',
      placeholder: 'Content Plan',
      field: 'contentPlan',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Multimedia promotional plan (if any)',
      label: 'Marketing Plan',
      placeholder: 'Marketing Plan',
      field: 'marketingPlan',
      isRequired: false,
      maxLength: 140,
    },
    {
      type: 'text',
      info: 'Media coverage',
      label: 'PR Activity',
      placeholder: 'PR Activity',
      field: 'pRActivity',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Social media platforms like Youtube, Instagram, X, etc.',
      label: 'Social Media Activity',
      placeholder: 'Social Media Activity',
      field: 'socialMediaActivity',
      isRequired: false,
    },

    {
      type: 'text',
      info: 'Are you part of any popular club or big sports league, or recognised by a major sports governing body or organisation? Being affiliated with any of these will really boost your credibility and make you stand out in the catalog.',
      label: 'Affiliation',
      field: 'affiliation',
      placeholder: 'Affiliation',
      isRequired: false,
    },
    {
      type: 'othersForSport',
      info: '',
      label: 'Others',
      field: 'otherSport',
      placeholder: 'Others',
      isRequired: false,
    },
    {
      type: 'othersForSport',
      info: '',
      label: 'Other Platforms',
      field: 'otherPlatform',
      placeholder: 'Other Platforms',
      isRequired: false,
    },
  ];

  const TournamentFields: FieldsData = [
    {
      type: 'text',
      info: '',
      label: 'Name',
      placeholder: 'Name',
      field: 'name',
      isRequired: true,
      maxLength: 32,
    },
    {
      type: 'text',
      info:
        deviceType === 'mobile'
          ? ''
          : 'Give us one line that defines what your game is and what is the differentiating feature.',
      label: 'Headline',
      placeholder:
        deviceType === 'mobile'
          ? 'Headline'
          : 'Tell us about your tournament in few words',
      field: 'headline',
      isRequired: true,
      maxLength: 45,
    },

    {
      type: 'dropdown',
      info: '',
      label: 'Sport',
      field: 'selectedSport',
      placeholder: 'Sport',
      dropdownData: [
        'Esports',
        'Cricket',
        'Football',
        'Chess',
        'Kabaddi',
        'Others',
      ],
      metaDataField: '',
      isRequired: true,
      otherOptionPresent: true,
    },
    {
      type: 'text',
      info: '',
      label: 'Sub-sports',
      field: 'subSport',
      placeholder: 'Sub sport',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Enter the availability dates',
      label: 'Dates',
      field: 'duration',
      placeholder: '',
      isRequired: false,
    },
    {
      type: 'text',
      info: '',
      label: 'Geographical Span',
      placeholder: 'Geographical Span',
      field: 'geographicalSpan',
      isRequired: true,
    },
    {
      type: 'multiSelectDropdown',
      info: '',
      label: 'Country of Operations',
      field: 'country',
      placeholder: 'Country',
      metaDataField: 'countries',
      isRequired: true,
    },
    {
      type: 'text',
      info: '',
      label: 'State/City of Operations',
      placeholder: 'City',
      field: 'city',
      isRequired: false,
    },
    {
      type: 'dropdown',
      info: '',
      label: 'Type',
      field: 'typeField',
      placeholder: 'Type',
      dropdownData: ['Physical', 'Digital', 'Phygital'],
      metaDataField: '',
      isRequired: true,
    },
    {
      type: 'dropdown',
      info: 'Will there be any live content?',
      label: 'Live Content Plan',
      field: 'liveContentPlan',
      placeholder: 'Live Content Plan',
      dropdownData: ['Yes', 'No'],
      metaDataField: '',
      isRequired: true,
      liveContentPlan: true,
    },
    {
      type: 'platformForLiveContent',
      info: '',
      label: 'Platform',
      field: 'platform',
      placeholder: 'Platform',
      dropdownData: ['Yes', 'No'],
      metaDataField: '',
      isRequired: false,
    },
    {
      type: 'text',
      info: '',
      label: 'Content Plan',
      placeholder: 'Content Plan',
      field: 'contentPlan',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Multimedia promotional plan (if any)',
      label: 'Marketing Plan',
      placeholder: 'Marketing Plan',
      field: 'marketingPlan',
      isRequired: false,
      maxLength: 140,
    },
    {
      type: 'text',
      info: 'Media coverage',
      label: 'PR Activity',
      placeholder: 'PR Activity',
      field: 'pRActivity',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Social media platforms like Youtube, Instagram, X, etc.',
      label: 'Social Media Activity',
      placeholder: 'Social Media Activity',
      field: 'socialMediaActivity',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Are you part of any popular club or big sports league, or recognised by a major sports governing body or organisation? Being affiliated with any of these will really boost your credibility and make you stand out in the catalog. ',
      label: 'Affiliation',
      field: 'affiliation',
      placeholder: 'Affiliation',
      isRequired: false,
    },
    {
      type: 'othersForSport',
      info: '',
      label: 'Others',
      field: 'otherSport',
      placeholder: 'Others',
      isRequired: false,
    },
    {
      type: 'othersForSport',
      info: '',
      label: 'Other Platforms',
      field: 'otherPlatform',
      placeholder: 'Other Platforms',
      isRequired: false,
    },
  ];
  const AthleteFields: FieldsData = [
    {
      type: 'text',
      info: '',
      label: 'Name',
      placeholder: 'Name',
      field: 'name',
      isRequired: true,
      maxLength: 32,
    },
    {
      type: 'text',
      info:
        deviceType === 'mobile'
          ? ''
          : 'Give us one line that defines what your game is and what is the differentiating feature.',
      label: 'Headline',
      placeholder:
        deviceType === 'mobile'
          ? 'Headline'
          : 'Tell us about your Athlete in few words',
      field: 'headline',
      isRequired: true,
      maxLength: 45,
    },
    {
      type: 'dropdown',
      info: '',
      label: 'Sport',
      field: 'selectedSport',
      placeholder: 'Sport',
      dropdownData: [
        'Esports',
        'Cricket',
        'Football',
        'Chess',
        'Kabaddi',
        'Others',
      ],
      metaDataField: '',
      isRequired: true,
      otherOptionPresent: true,
    },
    {
      type: 'text',
      info: '',
      label: 'Sub-sports',
      field: 'subSport',
      placeholder: 'Sub sport',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Enter the availability dates',
      label: 'Dates',
      field: 'duration',
      placeholder: '',
      isRequired: false,
    },
    {
      type: 'text',
      info: '',
      label: 'Geographical Span',
      placeholder: 'Geographical Span',
      field: 'geographicalSpan',
      isRequired: true,
    },
    {
      type: 'multiSelectDropdown',
      info: '',
      label: 'Country of Operations',
      field: 'country',
      placeholder: 'Country',
      metaDataField: 'countries',
      isRequired: true,
    },
    {
      type: 'text',
      info: '',
      label: 'State/City of Operations',
      placeholder: 'City',
      field: 'city',
      isRequired: false,
    },
    {
      type: 'dropdown',
      info: '',
      label: 'Type',
      field: 'typeField',
      placeholder: 'Type',
      dropdownData: ['Physical', 'Digital', 'Phygital'],
      metaDataField: '',
      isRequired: true,
    },
    {
      type: 'dropdown',
      info: 'Will there be any live content?',
      label: 'Live Content Plan',
      field: 'liveContentPlan',
      placeholder: 'Live Content Plan',
      dropdownData: ['Yes', 'No'],
      metaDataField: '',
      isRequired: true,
      liveContentPlan: true,
    },
    {
      type: 'platformForLiveContent',
      info: '',
      label: 'Platform',
      field: 'platform',
      placeholder: 'Platform',
      dropdownData: ['Yes', 'No'],
      metaDataField: '',
      isRequired: false,
    },
    {
      type: 'text',
      info: '',
      label: 'Content Plan',
      placeholder: 'Content Plan',
      field: 'contentPlan',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Multimedia promotional plan (if any)',
      label: 'Marketing Plan',
      placeholder: 'Marketing Plan',
      field: 'marketingPlan',
      isRequired: false,
      maxLength: 140,
    },
    {
      type: 'text',
      info: 'Media coverage',
      label: 'PR Activity',
      placeholder: 'PR Activity',
      field: 'pRActivity',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Social media platforms like Youtube, Instagram, X, etc.',
      label: 'Social Media Activity',
      placeholder: 'Social Media Activity',
      field: 'socialMediaActivity',
      isRequired: false,
    },
    // {
    //   type: 'date-picker',
    //   label: 'Timeline Availability',
    //   isRequired: false,
    //   field: 'duration',
    // },
    {
      type: 'text',
      info: 'Are you part of any popular club or big sports league, or recognised by a major sports governing body or organisation? Being affiliated with any of these will really boost your credibility and make you stand out in the catalog. ',
      label: 'Affiliation',
      field: 'affiliation',
      placeholder: 'Affiliation',
      isRequired: false,
    },
    {
      type: 'othersForSport',
      info: '',
      label: 'Others',
      field: 'otherSport',
      placeholder: 'Others',
      isRequired: false,
    },
    {
      type: 'othersForSport',
      info: '',
      label: 'Other Platforms',
      field: 'otherPlatform',
      placeholder: 'Other Platforms',
      isRequired: false,
    },
  ];
  const ContentOwner: FieldsData = [
    {
      type: 'text',
      info: '',
      label: 'Name',
      placeholder: 'Name',
      field: 'name',
      isRequired: true,
      maxLength: 32,
    },
    {
      type: 'text',
      info:
        deviceType === 'mobile'
          ? ''
          : 'Give us one line that defines what your game is and what is the differentiating feature.',
      label: 'Headline',
      placeholder:
        deviceType === 'mobile'
          ? 'Headline'
          : 'Tell us about your Content in few words',
      field: 'headline',
      isRequired: true,
      maxLength: 45,
    },
    {
      type: 'dropdown',
      info: '',
      label: 'Sport',
      field: 'selectedSport',
      placeholder: 'Sport',
      dropdownData: [
        'Esports',
        'Cricket',
        'Football',
        'Chess',
        'Kabaddi',
        'Others',
      ],
      metaDataField: '',
      isRequired: true,
      otherOptionPresent: true,
    },
    {
      type: 'text',
      info: '',
      label: 'Sub-sports',
      field: 'subSport',
      placeholder: 'Sub-sport',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Enter the availability dates',
      label: 'Dates',
      field: 'duration',
      placeholder: '',
      isRequired: false,
    },
    {
      type: 'text',
      info: '',
      label: 'Geographical Span',
      placeholder: 'Geographical Span',
      field: 'geographicalSpan',
      isRequired: true,
    },
    {
      type: 'multiSelectDropdown',
      info: '',
      label: 'Country of Operations',
      field: 'country',
      placeholder: 'Country',
      metaDataField: 'countries',
      isRequired: true,
    },
    {
      type: 'text',
      info: '',
      label: 'State/City of Operations',
      placeholder: 'City',
      field: 'city',
      isRequired: false,
    },
    {
      type: 'dropdown',
      info: '',
      label: 'Type',
      field: 'typeField',
      placeholder: 'Type',
      dropdownData: ['Physical', 'Digital', 'Phygital'],
      metaDataField: '',
      isRequired: true,
    },
    {
      type: 'dropdown',
      info: 'Will there be any live content?',
      label: 'Live Content Plan',
      field: 'liveContentPlan',
      placeholder: 'Live Content Plan',
      dropdownData: ['Yes', 'No'],
      metaDataField: '',
      isRequired: true,
      liveContentPlan: true,
    },
    {
      type: 'platformForLiveContent',
      info: '',
      label: 'Platform',
      field: 'platform',
      placeholder: 'Platform',
      dropdownData: ['Yes', 'No'],
      metaDataField: '',
      isRequired: false,
    },
    {
      type: 'text',
      info: '',
      label: 'Content Plan',
      placeholder: 'Content Plan',
      field: 'contentPlan',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Multimedia promotional plan (if any)',
      label: 'Marketing Plan',
      placeholder: 'Marketing Plan',
      field: 'marketingPlan',
      isRequired: false,
      maxLength: 140,
    },
    {
      type: 'text',
      info: 'Media coverage',
      label: 'PR Activity',
      placeholder: 'PR Activity',
      field: 'pRActivity',
      isRequired: false,
    },
    {
      type: 'text',
      info: 'Social media platforms like Youtube, Instagram, X, etc.',
      label: 'Social Media Activity',
      placeholder: 'Social Media Activity',
      field: 'socialMediaActivity',
      isRequired: false,
    },
    // {
    // type: 'date-picker',
    // label: 'Timeline Availability',
    // isRequired: false,
    // field: 'duration',
    // },
    {
      type: 'text',
      info: 'Are you part of any popular club or big sports league, or recognised by a major sports governing body or organisation? Being affiliated with any of these will really boost your credibility and make you stand out in the catalog. ',
      label: 'Affiliation',
      field: 'affiliation',
      placeholder: 'Affiliation',
      isRequired: false,
    },
    {
      type: 'othersForSport',
      info: '',
      label: 'Others',
      field: 'otherSport',
      placeholder: 'Others',
      isRequired: false,
    },
    {
      type: 'othersForSport',
      info: '',
      label: 'Other Platforms',
      field: 'otherPlatform',
      placeholder: 'Other Platforms',
      isRequired: false,
    },
  ];
  const [activeItems, setActiveItems] = useState<any>([]);
  const globalContext = useContext(GlobalContext);
  const [listIdState, setListIdState] = useState<any>('');
  const [currentAssetType, setCurrentAsset] = useState<any>('');
  const [previewMode, setPreviewMode] = useState<any>(true);
  const [addOpportunities, setaAddOpportunities] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDelOppDialog, setOpenDelOppDialog] = React.useState(false);
  const [setOppIndex, selectedOppIndex] = useState<any>(null);
  const [openDraft, setOpenDraft] = React.useState(false);
  const [fileData, setFileData] = React.useState<any>({});

  const [socialLinks, setSocialLinks] = useState<any>();
  const [urlLinksError, setUrlLinksError] = useState<any>('');
  const [showDeleteFileConfirmationPopup, setShowDeleteFileConfirmationPopup] =
    useState<boolean>(false);

  /**
   * TODO - It should be fetched through API
   */

  // useEffect(() => {
  //   // Logic to fetch or update data based on assetType
  //   setCurrentAsset(assetType);
  //   setFileData((prev: any) => {
  //     for (const key in prev) {
  //       prev[key] = '';
  //     }
  //     return { ...prev };
  //   });
  //   setFormData(() => {
  //     const obj: any = {};
  //     fields.forEach((field: any) => {
  //       obj[field.field] = field.type !== 'date-picker' ? '' : [null, null];
  //     });
  //     return obj;
  //   });
  //   // setFormData({});
  //   setActiveStep(0);
  //   setSocialLinks((prev: any) => {
  //     for (const key in prev) {
  //       prev[key] = '';
  //     }
  //     return { ...prev };
  //   });
  //   onDataPresent(false);
  //   setDraftDisable(true);
  //   setDisabledPreviewButton(true);
  //   // Make sure to handle the changes accordingly
  // }, [assetType, globalContext?.globalState.formSubmitted]);

  // TODO : commented code

  // useEffect(() => {
  //   globalContext?.onFormChanges(!isDraftDisable);

  //   return () => {
  //     globalContext?.onFormChanges(false);
  //   };
  // }, [isDraftDisable]);

  const fields = useMemo(() => {
    if (assetType === 'Team') {
      return TeamFields;
    } else if (assetType === 'Tournament') {
      return TournamentFields;
    } else if (assetType === 'Athlete') {
      return AthleteFields;
    } else {
      return ContentOwner;
    }
  }, [assetType]);

  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
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
          type: 'checkbox',
          termsAndConditionFilesToggle: false,
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
  const [metaData, setMetaData] = useState<any>({});
  const [step1FormData, setStep1FormData] = useState<any>({});
  const [step2FormData, setStep2FormData] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const [getAssetData, setAssetData] = useState<any>([]);
  const [open, setOpen] = useState(seePreviewClicked);
  const [fileToBeDeletedData, setFileToBeDeletedData] = useState<any>(null);
  const [selectedOpportunityIndex, seSelectedOpportunityIndex] =
    useState<number>(-1);

  useEffect(() => {
    setOpen(seePreviewClicked);
  }, [seePreviewClicked]);

  const steps = [
    {
      label: 'Details',
      step: '1',
      completedStepIcon: verifyIcon,
    },
    {
      label: 'List of Opportunities',
      step: '2',
      completedStepIcon: verifyIcon,
    },
  ];
  const listId = useRef();
  const stepperCirclesWidthHeightProps = {
    width: '36px', // Customize the width
    height: '36px', // Customize the height
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
    cursor: 'pointer',
  };

  const isButtonDisabled = () => {
    // Check if any of the required fields are empty
    for (const accordion of accordionData) {
      for (const formData of accordion.step2FormData) {
        if (
          formData.deliverables?.trim().length === 0 ||
          formData.opportunityName?.trim().length === 0 ||
          formData.investment?.trim().length === 0 ||
          formData.deliverableSpecs?.trim().length === 0 ||
          formData.currency?.trim().length === 0
          // ||
          // formData.opportunityImage1 === '' ||
          // formData.opportunityImage2 === ''
        ) {
          return true; // Disable the button
        }
      }
      if (
        accordion.step2FormData[10].termsAndConditionFilesToggle &&
        !accordion.step2FormData[11].termsConditionsFile
      ) {
        return true;
      } else if (
        !accordion.step2FormData[10].termsAndConditionFilesToggle &&
        accordion.step2FormData[3].termsConditions?.trim().length === 0
      ) {
        return true;
      }
    }
    return false; // Enable the button
  };

  const handleInputChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors: any) => ({ ...prevErrors, [name]: '' }));
  }, []);

  // const metaDataDetail: any = useSelector((state: RootState) => state.metaData);
  const fileDetails: any = useSelector((state: any) => state.file);

  useEffect(() => {
  }, [fileDetails]);

  // CITY METADATA REMOVE
  // const fetchCityData = async () => {
  //   const response: any = await dispatch(getMetaDataCity(formData?.country)());

  //   return response?.payload?.data?.result;
  // };
  const fetchCountryData = async () => {
    // const response: any = await dispatch(getMetaDataCountry()());
    // return response?.payload?.data?.result;
  };

  // useEffect(() => {
  //   dispatch(fetchMetaData());
  // }, []);

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
  // }, [metaDataDetail]);

  useEffect(() => {
    (async () => {
      if (formData.country) {
        setFormData((prev: any) => ({ ...prev, city: '' }));
        // CITY METADATA REMOVE
        // const cityData = await fetchCityData();
        let newMetaData = { ...metaData };
        if (newMetaData) {
          newMetaData = {
            ...newMetaData,
            // cities: cityData,
          };
        }

        setMetaData(newMetaData);
      }
    })();
  }, [formData.country]);

  useEffect(() => {
    if (formData && socialLinks) {
      const socialHandlesArray = Object.entries(socialLinks).map(
        ([key, value]) => {
          return {
            key: key,
            value: value,
          };
        }
      );
      let extractedValue;
      if (props.sellerId) {
        const pattern = /\((.*?)\)/;
        const matches = props.sellerId.match(pattern);
        extractedValue = matches ? matches[1] : null;
      }
      const transformedData = {
        pitchDeckFile: {
          fileName: formData.pitchDeckFile?.path || '',
          pathUrl: 'string',
          uploadedAt: 'string',
        },
        thumbnail: {
          fileName: formData.thumbnail?.path || '',
          pathUrl: 'string',
          uploadedAt: 'string',
        },
        logo: {
          fileName: formData.logo?.path || '',
          pathUrl: 'string',
          uploadedAt: new Date(),
        },
        coverImages: [
          {
            fileName: formData.coverPicture1?.path || '',
            pathUrl: 'string',
            uploadedAt: 'string',
          },
          {
            fileName: formData.coverPicture2?.path || '',
            pathUrl: 'string',
            uploadedAt: 'string',
          },
          {
            fileName: formData.coverPicture3?.path || '',
            pathUrl: 'string',
            uploadedAt: 'string',
          },
        ],
      };

      setStep1FormData({
        type: assetType,
        name: formData.name || '',
        headline: formData.headline || '',
        duration: formData.duration || '',
        // duration: startMonth && [
        //   `${startDate} ${startMonth} ${startYear}`,
        //   `${endDate} ${endMonth} ${endYear}`,
        // ],
        sport: formData.selectedSport || '',
        otherSport: formData.otherSport || '',
        geographicalSpan: formData.geographicalSpan || '',
        country: formData.country || [],
        city: formData.city || '',
        sportType: formData.typeField || '',
        liveContent: formData.liveContentPlan === 'Yes' ? true : false,
        otherPlatform: formData.otherPlatform || '',
        platform: formData.platform || '',
        contentPlan: formData.contentPlan || '',
        marketingPlan: formData.marketingPlan || '',
        mediaCoverage: formData.pRActivity || '',
        usp: formData.anythingElseStep1 || '',
        socialMediaPlan: formData.socialMediaActivity || '',
        subSport: formData.subSport || '',
        affiliation: formData?.affiliation || '',
        highlights: formData.highlights || '',
        audienceProfile: formData.audienceProfile || '',
        dosAndDonts: formData.doDonts || '',
        files: transformedData || [],
        socialHandles: socialHandlesArray,
        assetCustomDetails: [
          {
            key: '',
            value: '',
          },
        ],
        clonnedAssetId: '',
        approvedBy: userInfo?.email || '',
        status: formStatus,
      });
    }
    // Your code herel
  }, [formData, socialLinks, currentAssetType]);

  useEffect(() => {
    if (accordionData) {
      const transformedData = accordionData.map((content: any) => {
        const keysToPick = [
          'opportunityName',
          'investment',
          'deliverables',
          'termsConditions',
          'opportunityImage1',
          'opportunityImage2',
          'deliverableSpecs',
          'selectedOption',
          'currency',
          'usp',
          'termsAndConditionFilesToggle',
          'termsConditionsFile',
        ];

        const result: any = {};

        content.step2FormData.forEach((item: any) => {
          keysToPick.forEach((key: any) => {
            if (key in item) {
              // If the key exists in the item, add it to the result object
              result[key] = item[key];
            } else if (
              item[key] &&
              typeof item[key] === 'object' &&
              ('path' in item[key] || 'url' in item[key])
            ) {
              // Handle nested objects with "path" property
              result[key] = item[key]?.path;
            }
          });
        });

        const resultArray = Object.keys(result)
          .filter((key) => key.startsWith('opportunityImage'))
          .map((key) => {
            const entry = {
              file: result[key] || '',
            };

            return entry;
          });

        return {
          assetId: listId?.current,
          name: result?.opportunityName || '',
          investment: result?.investment + result?.currency || '',
          investmentVisibility:
            result?.selectedOption === 'availableOnRequest' ? false : true,
          // once json parse while consuming textfield data, uncomment this line and comment below line
          // deliverables: JSON.stringify(result.deliverables) || '',
          deliverables: result?.deliverables || '',
          termsAndCondition: result?.termsAndConditionFilesToggle
            ? result?.termsConditionsFile?.url ||
            result?.termsConditionsFile?.pathUrl ||
            ''
            : result?.termsConditions || '',
          deliverableSpecs: result?.deliverableSpecs || '',
          coverImages: resultArray,
          termsAndConditionFilesToggle:
            result?.termsAndConditionFilesToggle || false,
          // termsAndConditionFile: result?.termsAndConditionFilesToggle
          //   ? result.termsAndConditionFile
          //   : result.termsConditions,
          usp: result?.usp || '',
          opportunityCustomDetails: [
            {
              key: '',
              value: '',
            },
          ],

          status: formStatus || 'draft',
          id: content?.id || null,
        };
      });
      setStep2FormData({
        opportunities: transformedData,
      });
    }
    // Your code here
  }, [accordionData]);

  // TODO:

  // const handleGetAsset = async () => {
  //   const response: any = await dispatch(
  //     getAsset({
  //       page: 0,
  //       size: 100,
  //     })()
  //   );
  //   setAssetData(response?.payload?.data);
  // };
  // useEffect(() => {
  //   handleGetAsset();
  // }, []);
  const handleGetAsset = async (dispatch: any) => {
    // const response: any = await dispatch(
    //   getAsset({
    //     page: 0,
    //     size: 100,
    //   })
    // );
    // setAssetData(response?.payload?.data);
  };

  useEffect(() => {
    // handleGetAsset(dispatch);
  }, []);

  const handleStep1Submit = async (
    status: any,
    proceed = false,
    isTabControl = true
  ): Promise<boolean> => {
    setBackdrop(true);
    setFormStatus(status);
    // TODO : commented code
    tabControl(isTabControl);
    let assetId = '';
    // const dispatch = useDispatch<any>();
    await uploadAllFiles();

    let response: any;
    (step1FormData as any)['status'] = 'published';

    try {
      if (status === 'published') {
        if (listId.current) {
          const params = {
            id: listId.current,
            data: step1FormData,
          };
          // response = await dispatch(updateAsset(params)());
          // assetId = response.payload.data.result._id;
        } else {
          // response = await dispatch(createAsset(step1FormData)());
          // listId.current = response.payload.data.result._id;
          // assetId = response.payload.data.result._id;
        }

        setListIdState(response.payload.data.result._id);
      } else {
        const params: any = {
          id: listId.current,
          data: step1FormData,
        };
        // if (listId.current) {
        //   response = await dispatch(updateAsset(params)());
        //   // assetId = response.payload.data.result._id;
        // } else {
        //   response = await dispatch(createAsset(step1FormData)());
        //   listId.current = response.payload.data.result._id;
        //   // assetId = response.payload.data.result._id;
        // }
      }

      if (response?.payload?.data?.statusCode === 200) {
        setOpenDraft(false);
        if (status === 'published') {
          setSnackbar({
            open: true,
            severity: 'success',
            message: 'Asset published successfully!',
          });
        } else {
          setSnackbar({
            open: true,
            severity: 'info',
            message: 'Asset updated successfully!',
          });
        }
        // Show success snackbar
      } else {
        // Show error snackbar
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'Error creating asset. Please try again.',
        });
        tabControl(false);
        setBackdrop(false);
        return false;
      }
    } catch (error) {
      tabControl(false);
      setBackdrop(false);
      // Show error snackbar on promise rejection
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Error creating asset. Please try again.',
      });
      return false;
    }

    if (!urlLinksError) {
      if (proceed) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }

      setUrlLinksError('');
    } else {
      setUrlLinksError('Please Enter Valid URLS');
    }
    //TODO : commented code
    globalContext?.onFormSubmitted();
    setBackdrop(false);
    return true;
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
  const uploadAllFiles = async () => {
    try {
      const filePromises = [];

      const transformedData: any = {
        pitchDeckFile: {
          fileName: '',
          pathUrl: '',
          uploadedAt: new Date(),
        },
        thumbnail: {
          fileName: '',
          pathUrl: '',
          uploadedAt: new Date(),
        },
        logo: {
          fileName: '',
          pathUrl: '',
          uploadedAt: new Date(),
        },
        coverImages: [
          {
            fileName: '',
            pathUrl: '',
            uploadedAt: new Date(),
          },
          {
            fileName: '',
            pathUrl: '',
            uploadedAt: new Date(),
          },
          {
            fileName: '',
            pathUrl: '',
            uploadedAt: new Date(),
          },
        ],
      };

      // Iterate over properties of step1FormData
      // for (const key in fileData) {
      //   filePromises.push(
      //     new Promise((resolve) => {
      //       uploadFile(fileData[key].file).then((response: any) => {
      //         try {
      //           function updateTransformedData(key: string, response: any) {
      //             const filePath = response.data?.result?.filePath;
      //             const fileName = response.data.result.fileName;

      //             if (key in transformedData) {
      //               (transformedData[key] as any).pathUrl = filePath;
      //               (transformedData[key] as any).fileName = fileName;
      //             } else if (key.startsWith('coverPicture')) {
      //               const index = +key.slice(-1) - 1; // Extract index from key
      //               transformedData.coverImages[index].pathUrl = filePath;
      //               transformedData.coverImages[index].fileName = fileName;
      //             } else {
      //               // Adjust this part based on your requirements
      //             }
      //           }

      //           // Usage:
      //           updateTransformedData(key, response); // No need to check activeStep
      //         } catch (error) {
      //           console.error('Unable to get the file data', error);
      //         }
      //         resolve(true);
      //       });
      //     })
      //   );
      // }
      for (const key in fileData) {
        filePromises.push(
          new Promise((resolve, reject) => {
            uploadFile(fileData[key].file).then((response: any) => {
              try {
                const updateTransformedData = (key: string, response: any) => {
                  const filePath = response.data?.result?.filePath;
                  const fileName = response.data?.result?.fileName;

                  if (!filePath || !fileName) {
                    throw new Error('Invalid response structure');
                  }

                  if (key in transformedData) {
                    (transformedData[key] as any).pathUrl = filePath;
                    (transformedData[key] as any).fileName = fileName;
                  } else if (key.startsWith('coverPicture')) {
                    const index = +key.slice(-1) - 1; // Extract index from key
                    if (index >= 0 && index < transformedData.coverImages.length) {
                      transformedData.coverImages[index].pathUrl = filePath;
                      transformedData.coverImages[index].fileName = fileName;
                    } else {
                      console.warn(`Index ${index} is out of bounds for coverImages`);
                    }
                  } else {
                    console.warn(`Unhandled key: ${key}`);
                    // Adjust this part based on your requirements
                  }
                };

                // Usage:
                updateTransformedData(key, response);
                resolve(true);
              } catch (error) {               
                reject(error); // Reject the promise in case of error
              }
            }).catch((error) => {
              // console.error('File upload failed', error);
              setSnackbar({
                open: true,
                message: 'File upload failed',
                severity: 'error',
              });
              reject(error); // Reject the promise if uploadFile fails
            });
          })
        );
      }


      const response = await Promise.all(filePromises);

      step1FormData.files = transformedData;
      // if (Array.isArray(step1FormData.files)) {
      //   // If the property is an array, push promises for file uploads
      //   const responses = await Promise.all(
      //     step1FormData.files.map(uploadFile)
      //   );
      // }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'File upload failed',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFinalSubmit = async (status: any) => {
    setBackdrop(true);
    let response: any;
    //OPPORTUNITY PRESENT OR NOT CONDITION
    if (
      (step2FormData as any)?.opportunities &&
      (step2FormData as any)?.opportunities.length
    ) {
      (step2FormData as any).opportunities.forEach((data: any) => {
        data.status = status;
      });

      const promise = (step2FormData as any).opportunities.map((data: any) => {
        return data.coverImages.map(async (subData: any) => {
          if (subData.file) {
            // const response = await uploadFile(subData.file);
            // delete subData.file;
            // delete subData?.imageUrl;
            // if (response.data) {
            //   subData.pathUrl = response.data.result.filePath;
            //   subData.fileName = response.data.result.fileName;
            //   subData.uploadedAt = new Date();
            // }
          }
        });
      });
      await Promise.all([...promise.flat(Infinity)]);

      (step2FormData as any).opportunities.forEach((data: any) => {
        const indexes: number[] = [];

        data.coverImages.forEach((subData: any, index: number) => {
          if (!subData.pathUrl) {
            indexes.push(index);
          }
        });

        indexes.sort((a, b) => b - a); // Sort in descending order

        for (const index of indexes) {
          data.coverImages.splice(index, 1);
        }
      });
    }

    try {
      // TODO - need to add the update logic
      // if (oppIDRef.current) {
      //   response = await dispatch(
      //     updateOpportunityWithId(listId.current,step2FormData )()
      //   );
      // } else {
      // const dispatch = useDispatch<any>();
      if (status === 'published') {
        step1FormData.status = status;
        const params = {
          id: listId.current,
          data: step1FormData,
        };
        // response = await dispatch(updateAsset(params)());
        // if (response?.payload?.data?.statusCode !== 200) {
        //   setSnackbar({
        //     open: true,
        //     severity: 'error',
        //     message: 'Error update asset. Please try again.',
        //   });
        //   setBackdrop(false);
        //   return;
        // }
      }
      //OPPORTUNITY PRESENT OR NOT CONDITION
      if (
        (step2FormData as any).opportunities &&
        (step2FormData as any).opportunities.length
      ) {
        // response = await dispatch(createOpportunity(step2FormData)());
        // oppIDRef.current = true;
        // }

        // if (response?.payload?.data?.statusCode === 200) {
        //   if (status === 'published') {
        //     setSnackbar({
        //       open: true,
        //       severity: 'success',
        //       message: 'Asset created successfully!',
        //     });
        //   } else {
        //     setSnackbar({
        //       open: true,
        //       severity: 'info',
        //       message: 'Asset saved successfully!',
        //     });
        //   }
        //   // Show success snackbar
        // } else {
        // Show error snackbar
        //   setSnackbar({
        //     open: true,
        //     severity: 'error',
        //     message: 'Error creating asset. Please try again.',
        //   });
        // }
      } else {
        if (status === 'published') {
          setSnackbar({
            open: true,
            severity: 'success',
            message: 'Asset created successfully!',
          });
        } else {
          setSnackbar({
            open: true,
            severity: 'info',
            message: 'Asset saved successfully!',
          });
        }
        // Show success snackbar
      }
    } catch (error) {
      // Show error snackbar on promise rejection
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Error creating asset. Please try again.',
      });
    }
    setBackdrop(false);
    // TODO - disabled the update logic currently
    if (status !== 'draft') {
      setOpenDialog(true);
    } else {
      localStorage.setItem('authTab', 'draft');
      navigate('/myAssets/auth');
    }

    // OBJECT CONVERSION
    // const accordionDataObject = accordionData.reduce(
    //   (result: any, item: any) => {
    //     result[item.title] = item.step2FormData.reduce(
    //       (formDataResult: any, formDataItem: any) => {
    //         formDataResult[formDataItem.name] = formDataItem;
    //         return formDataResult;
    //       },
    //       {}
    //     );
    //     return result;
    //   },
    //   {}
    // );
  };

  function getMonthNumber(monthString: string) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months.indexOf(monthString) + 1;
  }

  const isFormEmpty = useMemo(() => {
    if (!props.sellerId) {
      return true; // Return true if props.dellerDI does not have any value
    }
    // if (
    //   assetType !== 'Team' &&
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

    // if (
    //   formData?.audienceProfile === '' ||
    //   formData?.audienceProfile === undefined ||
    //   formData?.highlights === '' ||
    //   formData?.highlights === undefined ||
    //   fileData.thumbnail?.imageUrl === undefined ||
    //   fileData.thumbnail?.imageUrl === ''
    // ) {
    //   return true;
    // }

    // let isFormEmp = fields.some(
    //   (data) =>
    //     data.isRequired &&
    //     (data.type !== 'date-picker'
    //       ? data.field === 'country'
    //         ? !formData[data.field].length
    //         : data.field === 'selectedSport' &&
    //           formData['selectedSport'] === 'Others' &&
    //           formData['otherSport'] === ''
    //         ? true
    //         : data.field === 'liveContentPlan' &&
    //           formData['liveContentPlan'] === 'Yes' &&
    //           formData['platform'].length === 0
    //         ? true
    //         : data.field === 'liveContentPlan' &&
    //           formData['liveContentPlan'] === 'Yes' &&
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
      (formData['selectedSport'] === 'Others' &&
        formData['otherSport'] === '') ||
      (formData['liveContentPlan'] === 'Yes' && !formData['platform'].length) ||
      (formData['liveContentPlan'] === 'Yes' &&
        formData['platform']?.includes('Others') &&
        !formData['otherPlatform'])
    ) {
      return true;
    }
    return false;
  }, [
    formData,
    // startMonth,
    // endMonth,
    // startYear,
    // endYear,
    // startDate,
    // endDate,
    props.sellerId,
    fileData?.thumbnail?.imageUrl,
  ]);

  const handleFileChange = useCallback(
    (name: string, imageUrl: string, file: any) => {
      if (file) {
        setFileData((prevData: any) => ({
          ...prevData,
          [name]: { file: file, imageUrl },
        }));
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: '' }));
      } else {
        setFileData((prev: any) => {
          delete prev[name];
          return prev;
        });
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: '' }));
        console.error('No file selected');
      }
    },
    []
  );

  const toggleAccordion = (index: any) => {
    const updatedItems = [...activeItems];
    updatedItems[index] = !updatedItems[index];
    setActiveItems(updatedItems);
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
          imageUrl: '',
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
          termsConditionsFile: '',
          placeholder: 'termsConditions',
          handleChange: (e: any) => handleInputChange(e),
        },
      ],
    };
    const updatedItems = [...activeItems];
    updatedItems.push(true); // Set the newly added opportunity to be toggled open
    setActiveItems(updatedItems);

    setAccordionData((prevData: any) => [...prevData, newOpportunity]);
  };

  const handleDeleteOpp = (e: any, index: any) => {
    e.stopPropagation();
    e.preventDefault();
    selectedOppIndex(index);
    setOpenDelOppDialog(true);
  };

  const handleDeleteOppDialog = (action: any) => {
    if (action === 'yes') {
      setAccordionData((prevData) => {
        const newData = [...prevData];
        newData.splice(setOppIndex, 1);
        return newData.map((opportunity, i) => ({
          ...opportunity,
          title: `Opportunity ${i + 1}`,
        }));
      });
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Opportunity deleted',
      });

      setOpenDelOppDialog(false);
    } else {
      setOpenDelOppDialog(false);
    }
  };

  const handleAccordionItemChange = (
    index: number,
    fieldName: any,
    e: any,
    type?: any,
    imageUrl?: string
  ) => {
    const updatedAccordionData: any = accordionData.map((item, i) => {
      if (i === index) {
        const updatedStep2FormData = item.step2FormData.map((formItem) => {
          if (formItem.name === fieldName) {
            return {
              ...formItem,
              [fieldName]:
                type === 'checkbox'
                  ? e.target.value === 'true'
                  : type === 'file'
                    ? e
                    : e.target.value,
              ...(type === 'file' ? { imageUrl } : {}),
            };
          }
          return formItem;
        });

        return {
          ...item,
          step2FormData: updatedStep2FormData,
        };
      }
      return item;
    });

    setAccordionData(updatedAccordionData);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleToggleDrawer = useCallback(() => {
    if (deviceType !== 'mobile') {
      setOpen((prevOpen: any) => !prevOpen);
    } else {
      (props as any).setPreviewClickEvent(
        (prevSeePreviewClicked: any) => !prevSeePreviewClicked
      );
    }
  }, [deviceType]);

  const onEditSave = useCallback(() => { }, []);

  const onChangeSocial = useCallback((param: any, isValidationError: any) => {
    setUrlLinksError(isValidationError);
    setSocialLinks(param);
  }, []);

  useEffect(() => {
    if (activeStep === 0) {
      // Check if any field in socialLinks has a value
      if (socialLinks && Object.values(socialLinks).some((value) => !!value)) {
        onDataPresent(true);
        setDraftDisable(false);
        setDisabledPreviewButton(false);
        return;
      }

      // Check if any field in fileData has a value
      if (Object.values(fileData).some((value) => !!value)) {
        onDataPresent(true);
        setDraftDisable(false);
        setDisabledPreviewButton(false);
        return;
      }

      // Check if any field in formData has a value
      if (
        Object.values(formData).some((value: any) =>
          typeof value === 'string' ? !!value : value.some((val: any) => !!val)
        )
      ) {
        onDataPresent(true);
        setDraftDisable(false);
        setDisabledPreviewButton(false);
        return;
      }
      onDataPresent(false);
      // If none of the fields have a value, set the button as disabled
      setDraftDisable(true);
      setDisabledPreviewButton(true);
    } else {
      const hasTruthyValue = (step2FormData as any).opportunities.some(
        (obj: any) =>
          [
            obj.name,
            obj.deliverables,
            obj.termsAndCondition,
            obj.deliverableSpecs,
            obj.investment,
            obj.usp,
            ...obj.coverImages.map((data: any) => data.file),
          ].some((value) => !!value)
      );
      // return hasTruthyValue;
      if (hasTruthyValue) {
        onDataPresent(true);
        setDraftDisable(false);
        setDisabledPreviewButton(false);
      } else {
        onDataPresent(false);
        setDraftDisable(true);
        setDisabledPreviewButton(true);
      }
    }
  }, [socialLinks, fileData, formData, activeStep, step2FormData, assetType]);

  const [showOpportunityReviewConf, setShowOpportunityConf] = useState(false);

  const listOpportunitySkip = () => {
    // () => {
    //   navigate('/myAssets/auth');
    //   tabControl(true);
    //   // navigate('/auth');
    // }
    setShowOpportunityConf(true);
  };

  const listOpportunitySkipConf = async (type: number) => {
    setShowOpportunityConf(false);
    tabControl(true);
    //  TODO COmmented code
    if (type === 2) {
      const response = await handleStep1Submit('published');

      if (!response) {
        return;
      }
    }

    localStorage.setItem('authTab', type === 1 ? 'draft' : 'published');
    navigate('/catalogue-management/auth');
  };

  const onSubmitAddMore = (buttonName: any) => {
    window.location.reload();
    localStorage.setItem(
      'authTab',
      activeStep === 1
        ? (step2FormData as any)?.opportunities &&
          (step2FormData as any).opportunities.length
          ? (step2FormData as any).opportunities[0].status
          : 'published'
        : 'published'
    );
    // navigate('/catalogue-management/auth');
    // localStorage.setItem('authTab', 'published');
    // navigate('/catalogue-management/auth');
  };
  const onSubmitCancel = () => {
    localStorage.setItem(
      'authTab',
      activeStep === 1
        ? (step2FormData as any)?.opportunities &&
          (step2FormData as any).opportunities.length
          ? (step2FormData as any).opportunities[0].status
          : 'published'
        : 'published'
    );
    navigate('/catalogue-management/auth');
    // localStorage.setItem('authTab', 'published');
    // navigate('/catalogue-management/auth');
  };

  useEffect(() => {
    if (dynamicListRef.current.onSaveDraft) {
      dynamicListRef.current.onSaveDraft = async () => handleStep1Submit('published', false, false);
    }

  });

  const deleteFileApi = async (fileId: any) => {
    if (fileId) {
      try {
        const payload = {
          filePath: decodeURIComponent(fileId?.pathUrl || fileId?.url),
        };
        // const response: any = await deleteFile(payload);
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }
  };

  const uploadOpportunityTCFiles = async (
    filedata: any,
    opportunityIndex: number,
    name: any
  ) => {
    if (filedata) {
      if (!name) {
        handleAccordionItemChange(
          opportunityIndex,
          'termsConditionsFile',
          null,
          'file',
          ''
        );
      } else {
        // const fileData = await uploadFile(filedata);
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
        // }
      }
    } else {
      handleAccordionItemChange(
        opportunityIndex,
        'termsConditionsFile',
        null,
        'file',
        ''
      );
    }
  };

  const getDataFromArray = (array: any[], key: string) => {
    return array.find((item: any) => Object.keys(item)?.includes(key))?.[key];
  };

  const handleFileDeleteConfirmationClick = async (action: any) => {
    setShowDeleteFileConfirmationPopup(false);
    if (action === 'yes') {
      const respose: any = await deleteFileApi(
        getDataFromArray(
          accordionData[selectedOpportunityIndex].step2FormData,
          'termsConditionsFile'
        )
      );
      if (respose?.payload?.data?.statusCode === 200) {
        handleAccordionItemChange(
          selectedOpportunityIndex,
          'termsConditionsFile',
          null,
          'file'
        );
        setSnackbar({
          message: 'File Deleted Successfully',
          severity: 'success',
          open: true,
        });
      } else {
        seSelectedOpportunityIndex(-1);
        setFileToBeDeletedData(null);
        setSnackbar({
          message: 'Error in deleting file',
          severity: 'error',
          open: true,
        });
      }
    } else {
      seSelectedOpportunityIndex(-1);
      setFileToBeDeletedData(null);
    }
  };

  return (
    <>
      <Meta title={'Zuper | List Assets'} />
      <div>
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
              width: deviceType === 'mobile' ? '100%' : '40%',
              display: 'flex',
              justifyContent: deviceType === 'mobile' ? 'center' : 'start',
              textAlign: 'start',
              alignItems: deviceType === 'mobile' ? 'center' : 'start',
              margin: '24px 0 24px 0',
            }}
            spacing={1}
          >
            <ZupotsuStepper
              steps={steps}
              alternativeLabelPresent={deviceType === 'mobile' ? false : false}
              showLabel={true}
              myActiveStep={activeStep}
              stepperCirclesWidthHeightProps={stepperCirclesWidthHeightProps}
              stepNumberFontSize={'16px'}
              onStepClick={(index) => {
                setActiveStep(index);
              }}
            />
          </Stack>
          {activeStep === 0 && (
            <div style={{ overflow: 'auto' }} className="team-listing-scroll">
              <DynamicFields
                deviceType={deviceType}
                fields={fields}
                handleInputChange={handleInputChange}
                metaData={metaData}
                formData={formData}
                errors={errors}
                previewMode={false}
                onChangeSocial={() => { }}
                socialLinks={[]}
              />

              {/* DURATION IN DROPDDOWN */}
              {/* {assetType !== 'Team' && (
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
                  Duration (From - To)
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
                      name="startDate"
                      dropdownData={[
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10',
                        '11',
                        '12',
                        '13',
                        '14',
                        '15',
                        '16',
                        '17',
                        '18',
                        '19',
                        '20',
                        '21',
                        '22',
                        '23',
                        '24',
                        '25',
                        '26',
                        '27',
                        '28',
                        '29',
                        '30',
                        '31',
                      ]}
                      value={startDate}
                      presentOnDialog={false}
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
                      placeholder="Month"
                      name="startMonth"
                      dropdownData={[
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ]}
                      value={startMonth}
                      presentOnDialog={false}
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
                      placeholder="Year"
                      name="startYear"
                      dropdownData={[
                        '2024',
                        '2025',
                        '2026',
                        '2027',
                        '2028',
                        '2029',
                        '2030',
                      ]}
                      value={startYear}
                      presentOnDialog={false}
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
                      placeholder="Date"
                      name="endDate"
                      dropdownData={[
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10',
                        '11',
                        '12',
                        '13',
                        '14',
                        '15',
                        '16',
                        '17',
                        '18',
                        '19',
                        '20',
                        '21',
                        '22',
                        '23',
                        '24',
                        '25',
                        '26',
                        '27',
                        '28',
                        '29',
                        '30',
                        '31',
                      ]}
                      value={endDate}
                      presentOnDialog={false}
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
                      placeholder="Month"
                      name="endMonth"
                      dropdownData={[
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ]}
                      value={endMonth}
                      presentOnDialog={false}
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
                      placeholder="Year"
                      name="endYear"
                      dropdownData={[
                        '2024',
                        '2025',
                        '2026',
                        '2027',
                        '2028',
                        '2029',
                        '2030',
                      ]}
                      value={endYear}
                      presentOnDialog={false}
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
                onChangeSocial={onChangeSocial}
                socialLinks={socialLinks}
                previewMode={false}
              />

              <div
                style={{
                  paddingTop: deviceType === 'mobile' ? '16px' : '20px',
                }}
              >
                <ZupotsuTextfield
                  title="Anything else to note"
                  name="anythingElseStep1"
                  value={formData.anythingElseStep1}
                  placeholder={'Anything else to note'}
                  errorMessage={
                    errors.anythingElseStep1 && errors.anythingElseStep1
                  }
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
                  value={formData.doDonts}
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
                    uploadedImage={fileData?.logo?.imageUrl}
                    fileSize={'Max Size 5 MB'}
                    fileType={'jpg'}
                    name={'logo'}
                    imgCardLabel={
                      deviceType === 'mobile'
                        ? 'Upload Logo'
                        : 'Upload Team Logo'
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
                  {deviceType === 'mobile' && (
                    <div style={{ visibility: 'hidden' }}>
                      <ZupotsuImgUpload
                        fileSize={'Max Size 5 MB'}
                        uploadedImage=""
                        fileType={'jpg'}
                        name={'thumbnail'}
                        imgCardLabel={'Upload Thumbnail'}
                        uploadTitle={
                          'Click to upload or Drag & Drop png/jpg here'
                        }
                        setUploadedImage={(name, imageUrl, file) => {
                          // handleFileChange(name, imageUrl, file);
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
                        marginTop: '28px',
                      }}
                    >
                      <ZupotsuImgUpload
                        // fileSize={'MaxSize 500 KB'}
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
                        marginTop: '28px',
                      }}
                    >
                      <ZupotsuImgUpload
                        // fileSize={'MaxSize 500 KB'}
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
          )}
          {activeStep === 1 && (
            <>
              {!addOpportunities && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: '#F8F7F7',
                    gap: '23px',
                    height: deviceType === 'mobile' ? '200px' : '348px',
                    padding: deviceType === 'mobile' ? '0 12px' : '',
                    marginTop: deviceType === 'mobile' ? '24px' : '',
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
                        handleClick={listOpportunitySkip}
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
                <>
                  <div>
                    <div className="opportunity-accordion">
                      {accordionData.map((data, index) => (
                        <div className="opportunity-accordion-item" key={index}>
                          <div>
                            <div
                              className="opportunity-accordion-title"
                              style={{ padding: '20px 0' }}
                              // onClick={() => setIsActive(!isActive)}
                              onClick={() => toggleAccordion(index)}
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
                                {data.title}
                              </Typography>
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '12px',
                                  alignItems: 'center',
                                }}
                              >
                                {/* WE SHOULD NOT DELETE FIRST OPPORTUNITIES */}
                                {/* {index !== 0 && (
                                <div
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => deleteOpportunity(index)}
                                >
                                  <img src={deleteIcon} alt="" />
                                </div>
                              )} */}
                                {/* WE ARE DELETING ALL OPPORTUNITIES */}

                                <div
                                  style={{ cursor: 'pointer' }}
                                  onClick={(e) => handleDeleteOpp(e, index)}
                                >
                                  <img src={deleteIcon} alt="" />
                                </div>

                                <div>
                                  <img
                                    src={activeItems[index] ? collapse : expand}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <Divider />
                          </div>

                          {activeItems[index] && (
                            <div
                              className="team-listing-scroll"
                              style={{
                                margin: '24px 0',
                                height: '242px',
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
                                        : 'auto auto',
                                    gridColumnGap: '28px',
                                    gridRowGap:
                                      deviceType === 'mobile' ? '16px' : '',
                                  }}
                                >
                                  <div>
                                    <ZupotsuTextfield
                                      title="Name"
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
                                    />
                                  </div>
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
                                        {'Investment'}{' '}
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
                                          paddingTop: '10px',
                                          width:
                                            deviceType === 'mobile'
                                              ? '35%'
                                              : '20%',
                                        }}
                                      >
                                        <ZupotsuDropdown
                                          dropdownData={['INR', 'USD']}
                                          placeholder="Currency"
                                          title=""
                                          value={data.step2FormData[7].currency}
                                          handleChange={(e: any) =>
                                            handleAccordionItemChange(
                                              index,
                                              'currency',
                                              e
                                            )
                                          }
                                        />
                                      </div>
                                      <div style={investmentFieldParentStyles}>
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

                                    <div
                                      className="listing-radio-container"
                                      style={{
                                        display: 'flex',
                                        flexDirection:
                                          deviceType === 'mobile'
                                            ? 'column'
                                            : 'row',
                                        gap:
                                          deviceType === 'mobile'
                                            ? '12px'
                                            : '20px',
                                        marginTop: '12px',
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
                                          Display on catalogue
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
                                </div>

                                <div
                                  style={{
                                    marginTop:
                                      deviceType === 'mobile' ? '16px' : '20px',
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
                                  />
                                </div>
                                <div
                                  style={{
                                    marginTop:
                                      deviceType === 'mobile' ? '16px' : '20px',
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
                                <div
                                  style={{
                                    marginTop:
                                      deviceType === 'mobile' ? '16px' : '20px',
                                  }}
                                >
                                  {data.step2FormData[10]
                                    .termsAndConditionFilesToggle ? (
                                    <ZupotsuImgUpload
                                      fileSize={'Max Size 5 MB'}
                                      isRequired={true}
                                      uploadedImage={
                                        data.step2FormData[11]
                                          ?.termsConditionsFile
                                      }
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
                                    />
                                  ) : (
                                    <ZupotsuTextfield
                                      title="Terms & Conditions"
                                      value={
                                        data.step2FormData[3]?.termsConditions
                                      }
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
                                          data.step2FormData[10]
                                            .termsAndConditionFilesToggle +
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
                                          data.step2FormData[10]
                                            ?.termsAndConditionFilesToggle +
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
                                <div
                                  style={{
                                    marginTop:
                                      deviceType === 'mobile' ? '16px' : '20px',
                                  }}
                                >
                                  <ZupotsuTextfield
                                    title="Anything else to note"
                                    value={data.step2FormData[8].usp}
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
                                        data?.step2FormData[4]?.imageUrl
                                      }
                                      // value={data.step2FormData[2].termsConditions}
                                      fileType={'jgp'}
                                      name={'opportunityImage1'}
                                      fileSize=""
                                      uploadTitle={
                                        'Click to upload or Drag & Drop png/jpg here'
                                      }
                                      setUploadedImage={(
                                        name,
                                        imageUrl,
                                        file
                                      ) =>
                                        handleAccordionItemChange(
                                          index,
                                          name,
                                          file,
                                          'file',
                                          imageUrl
                                        )
                                      }
                                    />
                                    <ZupotsuImgUpload
                                      uploadedImage={
                                        data?.step2FormData[5]?.imageUrl
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
                                      ) =>
                                        handleAccordionItemChange(
                                          index,
                                          name,
                                          file,
                                          'file',
                                          imageUrl
                                        )
                                      }
                                    />
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
                      }}
                    >
                      <img src={addCircle} alt="" onClick={addOpportunity} />
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
                        onClick={addOpportunity}
                      >
                        Add More Opportunities
                      </Typography>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
        <Divider style={{ marginTop: activeStep === 0 ? '40px' : '' }} />
        <div
          style={{
            padding: '18px 0',
            display: 'flex',
            justifyContent:
              deviceType === 'mobile' ? 'center' : 'space-between',
            flexWrap: 'wrap',
            gap: deviceType === 'mobile' ? '20px' : '0',
          }}
        >
          <div>
            {activeStep === 1 ? (
              <ZupotsuButton
                name="Back"
                padding="11px 16px"
                handleClick={handleBack}
                leadingIcon={arrowLeft}
                isCustomColors={true}
                variant={'outlined'}
                customTextColor="#828282"
                customBgColor="#fff"
                customBgColorOnhover="white"
                customTextColorOnHover="#828282"
                customOutlineColor={'1px solid #BDBDBD'}
                customOutlineColorOnHover={'1px solid #BDBDBD'}
              />
            ) : (
              <>
                {deviceType != 'mobile' && (
                  <div style={{ visibility: 'hidden' }}>Verify details</div>
                )}
              </>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {(addOpportunities || activeStep === 0) && (
              <div>
                <ZupotsuButton
                  leadingIcon={isDraftDisable ? '' : copy}
                  name="Verify details"
                  handleClick={handleToggleDrawer}
                  isCustomColors={true}
                  customBgColor={'rgba(226, 11, 24, 0.05)'}
                  customTextColor={'red'}
                  customBgColorOnhover={'#ffd7d7'}
                  customTextColorOnHover={'red'}
                  variant={'outlined'}
                  disabled={isDraftDisable}
                />
              </div>
            )}
          </div>
          <div>
            <ZupotsuButton
              trailingIcon={eastWhiteArrow}
              name={'Submit & Proceed'}
              handleClick={() =>
                activeStep === 1
                  ? handleFinalSubmit('published')
                  : handleStep1Submit('published', true)
              }
              disabled={activeStep === 1 ? isButtonDisabled() : isFormEmpty}
            />
          </div>
        </div>
        {deviceType != 'mobile' && <Divider />}
        <ZupotsuConfirmationDialog
          open={openDialog}
          handleClose={onSubmitCancel}
          showListContent={false}
          buttonName={['Cancel', 'List']}
          comfirmationMessage="Are you sure you want to list the asset?"
          handleAction={onSubmitAddMore}
          handleCloseIcon={() => setOpenDialog(false)}
        />
        {/* <ZupotsuConfirmationDialog
        open={openDraft}
        handleClose={(action) => handleDraftAction(action)}
        showListContent={false}
        handleAction={handleOpenDialog}
        buttonName={['Cancel', 'Save as Draft']}
        comfirmationMessage="Do you want to save this asset as draft?"
      /> */}
        <ZupotsuConfirmationDialog
          showIcon={false}
          open={openDelOppDialog}
          handleCloseIcon={() => {
            setOpenDelOppDialog(false);
          }}
          showListContent={false}
          handleClose={(e) => handleDeleteOppDialog(e)}
          buttonName={['Cancel', 'Delete']}
          comfirmationMessage="Are you sure you want to delete this opportunity?"
        />
        <AssetPreview
          open={open}
          handleToggleDrawer={handleToggleDrawer}
          activeStep={activeStep}
          handleInputChange={handleInputChange}
          deviceType={deviceType}
          formData={formData}
          fileData={fileData}
          // duration={{
          //   startDate,
          //   endDate,
          //   startMonth,
          //   endMonth,
          //   startYear,
          //   endYear,
          // }}
          handleFileChange={handleFileChange}
          previewMode={previewMode}
          addOpportunities={addOpportunities}
          setaAddOpportunities={setaAddOpportunities}
          accordionData={accordionData}
          metaData={metaData}
          fields={fields}
          socialLinks={socialLinks}
          onEditSave={onEditSave}
          onChangeSocial={onChangeSocial}
        />

        <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <ZupotsuConfirmationDialog
        open={showDeleteFileConfirmationPopup}
        showIcon={false}
        handleClose={(action) => handleFileDeleteConfirmationClick(action)}
        showListContent={false}
        buttonName={['Cancel', 'Delete']}
        comfirmationMessage="Are you sure you want to delete this file?"
        handleCloseIcon={() => {
          setShowDeleteFileConfirmationPopup(false);
        }}
      />
    </>
  );
};

export default DynamicListAsset;
