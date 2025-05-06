import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
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
import AssetCreationDynamicList from './AssetCreationDynamicList';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import zupotsuAutocomplete from '../../Atoms/zupotsu-textfields/zupotsu-autocomplete';
import { useSearchParams } from 'react-router-dom';

function AssetCreation({ sidebarOpen }: { sidebarOpen: boolean }) {
  const [tempTab, setTempTab] = useState('Team');
  const [selectedValue, setSelectedValue] = useState('Team');
  const [seePreviewClick, setSeePreviewClick] = useState(false);
  const [disablePreviewButton, setDisabledPreviewButton] = useState(true);
  const [sellerId, setSellerId] = useState('');
  const [sellerData, setSellerData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sellerEmail, setSellerEmail] = useState<string>('');
  const [seller, setSeller] = useState<string>('');
  const [sellerID, setSellerID] = useState<string>('');
  const deviceType = useDeviceType()

  const linkDetails = useMemo(() =>
    [
      {
        label: 'Catalogue Management',
        url: '/catalogue-management',
      },
      {
        label: 'Create New Asset',
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

  const optionTitle = useMemo(() => {
    return radioButtonsData.find((data) => data.id === selectedValue)?.label;
  }, [selectedValue]);

  const handleToggleDrawer = () => {
    setSeePreviewClick(!seePreviewClick);
  };

  const [isTabDisable, setTabDisable] = useState(false);
  const tabControl = (isDisable: boolean) => {
    setTabDisable(isDisable);
  };

  const [isDataPresent, setDataPresent] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const onDataPresent = useCallback((_isDataPresent: boolean) => {
    setDataPresent(_isDataPresent);
  }, []);
  const dynamicListRef = useRef<any>({});

  const onConfirmChangeTab = useCallback(() => {
    setShowConfirmation(false);
    setSelectedValue(tempTab);
    setDataPresent(false);
  }, [setShowConfirmation, setSelectedValue, setDataPresent, tempTab]);

  useEffect(() => {
    setSelectedValue(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (!sellerEmail && searchParams.has('sellerID')) {
      setSellerEmail(searchParams.get('sellerEmail') + '');
      setSeller(searchParams.get('seller') + '');
      setSellerId(searchParams.get('seller') + '');
      setSellerID(searchParams.get('sellerID') + '')
    }
  }, [searchParams]);

  return (
    <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: 'rgb(250,250,250)',height:'90vh',overflowY:"scroll",overflowX:'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          padding: '5px',
          backgroundColor: 'rgb(250,250,250)',
        }}
      >
        <Grid xs={12} md={12} lg={12} width={"98%"} spacing={2} marginTop={"10px"}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              backgroundColor: '#FFF',
              paddingTop: "15px",
              paddingBottom: "15px",
              padding: "15px",
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

        <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", paddingBottom: deviceType === 'mobile' ? 0 : 10, }}>
          <AssetCreationDynamicList
            sidebarOpen={sidebarOpen}
            assetType={selectedValue}
            seePreviewClicked={seePreviewClick}
            setPreviewClickEvent={() => setSeePreviewClick(seePreviewClick)}
            setDisabledPreviewButton={(e: any) => setDisabledPreviewButton(e)}
            tabControl={tabControl}
            onDataPresent={onDataPresent}
            dynamicListRef={dynamicListRef}
            sellerId={sellerId}
          />
        </div>

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
                  // handleClick={() => onConfirmChangeTab(false)}
                  handleClick={() => { }}
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
        {/* </div>
       */}
      </Box>
    </Grid>
  );
}
export default AssetCreation;
// export default withAuth(ListAsset);