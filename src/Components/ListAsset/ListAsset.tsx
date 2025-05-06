import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
import ZupotsuRadioButton from '../../Atoms/zupotsu-radio-button/zupotsu-radio-button';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useDeviceType from '../../utils/DeviceType';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import DynamicListAsset from './DynamicListAsset';
// import withAuth from '../../withAuth';
// import keycloak from 'apps/container/src/keycloak/keycloak';
import { Close } from '@mui/icons-material';
import { GlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
// import { useDispatch } from 'react-redux';
// import { getMetaDataCity } from '../../store/Slices/metaData';
// import { getSeller } from '../../store/Slices/listAssetSlice';

import { getLocalStorage, setLocalStorage } from '../../utils/LocalStorageService';
import { useSearchParams } from 'react-router-dom';
import ZupotsuAutocomplete from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete';
// import { PreviewClickContext } from '../../../context/unsavedChangesContext';

function ListAsset() {
  const [tempTab, setTempTab] = useState('Team');
  const [selectedValue, setSelectedValue] = useState('Team');
  const [seePreviewClick, setSeePreviewClick] = useState(false);
  const [disablePreviewButton, setDisabledPreviewButton] = useState(true);
  const [sellerId, setSellerId] = useState('');
  const [sellerData, setSellerData] = useState([]);
  // const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sellerEmail, setSellerEmail] = useState<string>('');
  const [seller, setSeller] = useState<string>('');
  const [sellerID, setSellerID] = useState<string>('');

  const linkDetails = useMemo(() =>
    sellerID?.length && sellerEmail?.length ?
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
          url: `/sellers/${sellerID}?email=${sellerEmail}`
        },
        {
          label: 'List Asset',
          url: '',
        },
      ]
      :
      [
        {
          label: 'Catalogue Management',
          url: '/catalogue-management',
        },
        {
          label: 'List Asset',
          url: '',
        },
      ]
    , [sellerID, sellerEmail]);

  const radioButtonsData = [
    {
      id: 'team',
      label: 'Team',
    },
    {
      id: 'tournament',
      label: 'Tournament',
    },
    {
      id: 'athlete',
      label: 'Athlete',
    },
    {
      id: 'content_owner',
      label: 'Content',
    },
  ];

  const globalContext = useContext(GlobalContext);

  const optionTitle = useMemo(() => {
    return radioButtonsData.find((data) => data.id === selectedValue)?.label;
  }, [selectedValue]);

  const handleToggleDrawer = () => {
    // setHasUnsavedChanges(true);
    setSeePreviewClick(!seePreviewClick);
  };

  const [isTabDisable, setTabDisable] = useState(false);
  const tabControl = (isDisable: boolean) => {
    //TODO : commented code
    setTabDisable(isDisable);
  };

  const [isDataPresent, setDataPresent] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const onDataPresent = useCallback((_isDataPresent: boolean) => {
    setDataPresent(_isDataPresent);
  }, []);

  useEffect(() => {
    if (globalContext?.globalState.wantsToLeave) {
      setShowConfirmation(true);
    }
  }, [globalContext?.globalState.wantsToLeave]);

  const dynamicListRef = useRef<any>({});

  const onConfirmChangeTab = useCallback(
    async (save = true) => {
      setShowConfirmation(false);
      if (save) {
        await dynamicListRef.current.onSaveDraft();
      } else {
        globalContext?.resetWantToLeave();
        globalContext?.onFormSubmitted();
      }

      setSelectedValue(tempTab);
      setDataPresent(false);
    },
    [tempTab, dynamicListRef.current.onSaveDraft]
  );

  const onChangeTab = useCallback(
    (event: any, data: any) => {
      // if (data.id != 'content_owner') {
      if (isDataPresent) {
        setShowConfirmation(true);
        setTempTab(event);
      } else {
        setSelectedValue(event);
      }
      // }
    },
    [isDataPresent]
  );

  // if (!isAuth) {
  //   return (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         height: '81.6vh',
  //         width: '90vw',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}
  //     >
  //       <CircularProgress size={50} />
  //     </Box>
  //   );
  // }

  useEffect(() => {
    setSelectedValue(selectedValue);
  }, [selectedValue]);

  // const fetchSellerData = async () => {
  //   const params = {
  //     page: 0,
  //     size: 100,
  //   };
  //   const response: any = await dispatch(getSeller(params)());
  //   const abc: any = response?.payload?.data?.result.map((item: any) => {
  //     return `${item.name}(${item?.email})`;
  //   });
  //   setSellerData(abc);
  // };
  // useEffect(() => {
  //   fetchSellerData();
  // }, []);

  useEffect(() => {
    if (!sellerEmail && searchParams.has('sellerID')) {
      setSellerEmail(searchParams.get('sellerEmail') + '');
      setSeller(searchParams.get('seller') + '');
      setSellerId(searchParams.get('seller') + '');
      setSellerID(searchParams.get('sellerID') + '')
      // setTabDisable(true);
    }
  }, [searchParams]);

  return (
    <div
      style={{
        // marginTop: deviceType === 'mobile' ? '57px' : '98px',
        padding: '10px 30px 60px 30px',
      }}
    >
      <Breadcrumb
        linkDetails={linkDetails}
        color="var(--Gray-1, #333)"
        underline="always"
        maxItems={5}
        itemBeforeCollapse={1}
        itemAfterCollapse={1}
        iconName="arrow_forward_ios_black_24dp"
        iconSize={20}
        iconLabel="Breadcrumb-Arrow-Right"
        iconStyle="regular"
        textColor="#333333"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          // display: 'grid',
          // gridTemplateColumns:
          //   deviceType === 'mobile' ? 'auto auto' : 'auto auto auto auto',
          width: '100%',
          gap: '27px',
          marginBottom: '20px',
          marginTop: '20px',
        }}
      >
        {/* {radioButtonsData.map((data) => (
          <ZupotsuDropdown
            key={data.id}
            data={data}
            selected={selectedValue}
            isHintAvailable={false}
            handleChange={(e) => onChangeTab(e, data)}
            disabled={selectedValue === data.id ? false : isTabDisable}
          />
      
        ))} */}
        <div
          style={{
            width: '50%',
          }}
        >
          <ZupotsuAutocomplete
            title="What is the type of the asset you would like to list?"
            placeholder=""
            isRequired={true}
            name="selectedAssetType"
            dropdownData={['Team', 'Tournament', 'Athlete', 'Content']}
            value={selectedValue || ''}
            handleChange={(event: any) => {
              setSelectedValue(event?.target?.value);
            }}
            previewMode={isTabDisable}
            freeSolo={false}
          />
        </div>
        <div
          style={{
            width: '50%',
          }}
        >
          <ZupotsuAutocomplete
            title="Select Seller"
            placeholder=""
            isRequired={true}
            name="selectedAssetType"
            dropdownData={sellerData}
            value={sellerId || ''}
            handleChange={(event: any) => {
              setSellerId(event?.target?.value);
            }}
            previewMode={isTabDisable || sellerID?.trim().length > 0}
            freeSolo={true}
          />
        </div>
      </div>
      {selectedValue ? (
        // <PreviewClickContext.Provider value={{ seePreviewClick, setSeePreviewClick }}>
        <DynamicListAsset
          assetType={selectedValue}
          seePreviewClicked={seePreviewClick}
          setPreviewClickEvent={() => setSeePreviewClick(seePreviewClick)}
          setDisabledPreviewButton={(e: any) => setDisabledPreviewButton(e)}
          tabControl={tabControl}
          onDataPresent={onDataPresent}
          dynamicListRef={dynamicListRef}
          sellerId={sellerId}
        />
      ) : //  </PreviewClickContext.Provider>
        null}

      <Dialog
        open={showConfirmation}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: '4px',
            width: '523px',
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
            <Close
              style={{ alignSelf: 'end', cursor: 'pointer' }}
              onClick={() => setShowConfirmation(false)}
            />
            {/* {showIcon && <img src={successTikIcon} alt="" />} */}
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
              }}
            >
              Do you want to save the changes?
            </Typography>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                width: '85%',
                paddingBottom: '8px',
                marginTop: '20px',
              }}
            >
              <ZupotsuButton
                name={'Cancel'}
                variant={'outlined'}
                isCustomColors={true}
                customOutlineColor="1px solid #E0E0E0"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#828282"
                handleClick={() => onConfirmChangeTab(false)}
              />
              <ZupotsuButton
                name={'Yes'}
                variant={'outlined'}
                isCustomColors={true}
                customOutlineColor="1px solid #E20B18"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#E20B18"
                handleClick={() => onConfirmChangeTab()}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ListAsset;
// export default withAuth(ListAsset);
