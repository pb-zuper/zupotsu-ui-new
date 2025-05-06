import { Box, Button, FormControl, Grid, Typography, MenuItem, Select, styled, Dialog, DialogContent, Snackbar, InputAdornment, TextField, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, } from '@mui/material';
import Tiktok from '../../assets/tiktok.svg'
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import ZupotsuSelectButton from '../../Atoms/zupotsu-select-button/zupotsu-select-button';
import useDeviceType from '../../utils/DeviceType';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { facebookIcon, instagramI, LinearGrid, LinkedIn, List, SearchNormal, twitterx, YoutubeIcon } from '../../assets/index';
import { Global, Calendar, Dollar, GlobalB, CalendarB, PeopleB, NoDataImage, EditIcon, CloseIcon, } from '../../assets/index';
import ClearIcon from '@mui/icons-material/Clear';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import { useNavigate } from 'react-router';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import NoData from '../../error/NoData';
import Loader from '../../loader/Loader';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import Apis from '../../services/apis';
import AssetCard1 from '../../Molecules/cards/AssetCard1';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, VisibilityOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import { useLocation } from 'react-router-dom';


interface RequestActionObject {
  id: number; // Example type, adjust as per your actual type
  asset_detail?: { id: number }[]; // Example type, adjust as per your actual type
  // Other properties as needed
}
const StyledSelectButton = styled('div')(({ }) => {
  const deviceType = useDeviceType();
  return {
    '& .radio-button-border': {
      height: '44px',
      fontSize: deviceType == "mobile" ? "11px" : '16px',

    },
    '& .select-radio-button': {
      padding: '12px',
      'text-align': 'center',
      'justify-content': 'center',
      width: deviceType == "mobile" ? '120px' : "auto",
      fontSize: deviceType == "mobile" ? "11px" : '16px',
    },
    '&': {
      display: 'flex',
      'flex-direction': 'row',
      gap: '16px',
      fontSize: deviceType == "mobile" ? "11px" : '16px',
    },
  };
});

const Catalogue = ({
  sellerData = null,
  updateEditStatus = (editStatus: boolean) => { }
}: {
  sellerData: any;
  updateEditStatus?: (editStatus: boolean) => void
}) => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();

  const userFromLocal = localStorage.getItem("role")?.toLowerCase();
  const isApprover = (userFromLocal === "approver") ? true : false;
  const isPublisher = (userFromLocal === "publisher") ? true : false;
  const isBuyer = (userFromLocal === "buyer") ? true : false;
  const isAdmin = (userFromLocal === "admin") ? true : false;
  const [searchValue, setSearchValue] = useState('');
  const [sortAssets, setSelectedSport] = useState('All');
  const location: any = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  const [selectedCategory, setSelectedCategory] = useState<string>(
    type?.toLowerCase() == "public"
      ? "activeAssets"
      : type?.toLowerCase() == "private"
        ? "private"
        : type?.toLowerCase() == "draft"
          ? "draft"
          : type?.toLowerCase() == "rejected"
            ? "rejected"
            : type?.toLowerCase() == "edited"
              ? "edited"
              : type?.toLowerCase() == "closed"
                ? "closed"
                : (type?.toLowerCase() == "under_review" || type?.toLowerCase() == "underreview")
                  ? "underReview"
                  : "activeAssets"
  );

  const [getAssetData, setAssetData] = useState<any>([]);
  const [selectedAsset, setSelctedAsset] = useState<any>([]);
  const [pageSize, setPageSize] = useState<any>(10);
  const [loader, setLoader] = useState(true);
  const [acceptDialog, setAcceptDialog] = useState(false);
  const [closeDialog, setCloseDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    assetId: '',
  });
  const [flipDialog, setFlipDialog] = useState<any>(false);
  const [privateDialogOpen, setPrivateDialogOpen] = useState<any>(false);
  const [privateObject, setprivateObject] = useState<any>();
  const [requestActionObject, setRequestActionObject] = useState<any>({});
  const [openAssetDetailDialog, setOpenAssetDetailsDialog] = useState(false);
  const [assetDetailsData, setAssetDetailsData] = useState<any>(null);
  const [closeAssetDialog, setCloseAssetDialog] = useState({
    isOpen: false,
  });
  const [typeofSort, setTypeofSort] = useState<boolean>(true)
  const [assetFiltering, setAssetFiltering] = useState('All');
  const [statusFilter, setStatusFiltering] = useState("published")
  const [closedreason, setClosedReason] = useState<any>("");
  const [reason, setReason] = useState<string>('');
  const [reasonError, setReasonError] = useState<string>('');

  useEffect(() => {
    const startTime = performance.now();

    const fetchAndTrack = async () => {
      await fetchAssets();
      const loadTime = performance.now() - startTime;
      mixpanelEvents.onLoad(loadTime, 'Catalogue Management');
    };
    fetchAndTrack();

    return () => {
      const timeSpent = performance.now() - startTime;
      mixpanelEvents.onUnload('Catalogue Management', timeSpent);
    };
  }, []);

  const headers = ['Image', 'Asset Type', 'Name', "Headline", "Sport", 'Followers', "Created By", "View"];
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });


  const sortingStyles = {
    button: {
      background: '#E20B18',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#a9141d',
        color: '#fff',
      },
      cursor: "pointer"
    },
    tabButton: {
      padding: deviceType == "mobile" ? "5px" : '10px',
      color: 'rgba(226, 11, 24, 1)',
      fontSize: deviceType == "mobile" ? "15px" : '16px',
      borderBottom: ' 2px solid rgba(226, 11, 24, 1)',
      fontFamily: 'Inter',
      fontWeight: 600,
      cursor: "pointer"
    },
    tabButtonInactive: {
      padding: deviceType == "mobile" ? "5px" : '10px',
      color: 'rgba(130, 130, 130, 1)',
      fontSize: deviceType == "mobile" ? "15px" : '16px',
      fontFamily: 'Inter',
      fontWeight: 600,
      cursor: "pointer"
    }
  };

  const radioButtonsData: any = [
    {
      id: 'activeAssets',
      label: 'Active Assets',
      status: "published",
    },
    {
      id: 'underReview',
      label: 'Under Review',
      status: "created",
    },
    {
      id: 'edited',
      label: 'Edited',
      status: "edited",
    },
    {
      id: 'draft',
      label: 'Draft',
      status: "draft",
    },
    {
      id: 'rejected',
      label: 'Rejected',
      status: "rejected",
    },
    {
      id: 'closed',
      label: 'Closed',
      status: "closed",
    },
    {
      id: 'private',
      label: 'Private',
      status: "private",
    }
  ];

  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize || 10);
  const [page, setPage] = React.useState(1);
  const handleChangePage = (newPage: any) => { };
  const uniqueDataRequest = useRef<any>(null);
  const [showZoputsuGetInTouchPopup, setShowZoputsuGetInTouchPopup] =
    useState<boolean>(false);

  const ErrorData = useMemo(
    () => ({
      img: NoDataImage,
      button: false,
      message:
        'No assets found',
    }),
    [selectedCategory]
  );
  const [rejectedAssetData, setRejectAssetData] = useState<{
    assetId: string;
    assetTitle: string;
  }>({ assetId: '', assetTitle: '' });
  const [showRejectedAssetData, setShowRejectAssetData] =
    useState<boolean>(false);
  const [buttonType, setButtonType] = useState<string>("");
  const [allFiltered, setallFiltered] = useState<any>([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [filteredAssets, setfilteredAssets] = useState<any>([]);
  const [flipObject, setflipObject] = useState<any>();
  const [sortCriteria, setSortCriteria] = useState("Updated");
  const isSaveButtonEnabled = reason.trim().length > 0;
  const isCloseButtonEnabled = closedreason.trim().length > 0;
  const isSeller = (localStorage.getItem("role")?.toLowerCase() === "seller") ? true : false;
  const isSellerAdmin = (localStorage.getItem("role")?.toLowerCase() === "seller-admin") ? true : false;
  const [sportsMedia, setSportsMedia] = useState([])
  const apis = new Apis();

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formatDate = useCallback((date: Date | string) => {
    if (date)
      return new Date(date).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    return '';
  }, []);

  const getAssetFooterDataClicked = useCallback(
    (
      buttonKey: string,
      assetId: string,
      assetTitle: string,
      assetType?: any
    ) => {
      switch (buttonKey) {
        case 'reject':
          setShowRejectAssetData(true);
          setSelctedAsset({ assetId, assetTitle, assetType });
          setRejectAssetData({ assetId, assetTitle });
          break;
        case 'accept':
          setAcceptDialog(true);
          // approveAsset();
          setSelctedAsset({ assetId, assetTitle, assetType });
      }
    },
    []
  );

  const getAssetFooterData = (item: any) => {

    switch (selectedCategory) {

      case 'underReview':
        return {
          showButtonView: true,
          onFooterButtonClicked: (buttonKey: string) => {
            getAssetFooterDataClicked(
              buttonKey,
              item?._id,
              `${item?.type} - ${item?.name?.toUpperCase()}`
            );
          },
        };
      case 'rejected':
        return {
          showButtonView: false,
          rejectionReasonDescription: item?.rejectedReason || '',
          rejectionReasonDate: formatDate(item?.rejectedAt || ''),
        };
      default:
        return null;
    }
  };

  const onEditCard = async (index: number, label: string, id: any) => {
    navigate(`/assetcreation?id=${id}`)
  };

  const onCopyCard = async (index: number, label: string, id: any) => {
    navigate(`/assetcreation?cid=${id}`)
  };

  const openAssetDetailsDialog = (isOpen: boolean, data: any) => {
    setOpenAssetDetailsDialog(true);
    setAssetDetailsData(data);
  };

  const navigateToListAnAsset = () => {
    if (sellerData) {
      navigate({
        pathname: `/assetcreation`,

      });
    } else {
      navigate({
        pathname: `/assetcreation`,
      });
    }
  };

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' })
  const getIcon = (assetTypeName: any) => {
    switch (assetTypeName?.toLowerCase()) {
      case "facebook":
        return facebookIcon;
      case "instagram":
        return instagramI;
      case "linkedin":
        return LinkedIn;
      case "website":
        return GlobalB;
      case "youtube":
        return YoutubeIcon;
      case "blog":
        return GlobalB;
      case "x":
        return twitterx;
      case "tiktok":
        return Tiktok;
      default:
        return "";
    }
  };

  const handleSortChange = (event: any) => {
    if (event.target.value) {
      // setLoader(true)
      const criteria = event.target.value;
      setSortCriteria(criteria);


      if (criteria === 'Name') {
        if (statusFilter === "draft") {
          const sorted = filteredAssets.sort((a: any, b: any) => a?.asset_detail[0]?.draft?.formdata?.Name?.replace(/\s+/g, "")?.localeCompare(b?.asset_detail[0]?.draft?.formdata?.Name?.replace(/\s+/g, "")));
          setfilteredAssets(sorted)
        } else {
          const sorted = filteredAssets.sort((a: any, b: any) => a.asset_detail[0]?.name?.replace(/\s+/g, "")?.localeCompare(b?.asset_detail[0]?.name?.replace(/\s+/g, "")));
          setfilteredAssets(sorted)
        }
        // setLoader(false)
      } else if (criteria === 'Updated') {
        const sorted = filteredAssets?.sort((a: any, b: any) => new Date(a.asset_detail[0].updated_at).getTime() - new Date(b.asset_detail[0].updated_at).getTime())
        setfilteredAssets(sorted?.reverse())
        // console.log("sorted",sorted)
        // setLoader(false)
      } else if (criteria === 'Created') {
        const sorted = filteredAssets?.sort((a: any, b: any) => new Date(a.asset_detail[0].created_at).getTime() - new Date(b.asset_detail[0].created_at).getTime())
        setfilteredAssets(sorted)
        // console.log("sorted",sorted)
        // setLoader(false)
      }

    }
  };

  const handleCriteria = (criteria: any) => {
    if (criteria === 'Name') {
      if (statusFilter === "draft") {
        const sorted = filteredAssets.sort((a: any, b: any) => a?.asset_detail[0]?.draft?.formdata?.Name?.replace(/\s+/g, "")?.localeCompare(b?.asset_detail[0]?.draft?.formdata?.Name?.replace(/\s+/g, "")));
        setfilteredAssets(sorted)
      } else {
        const sorted = filteredAssets.sort((a: any, b: any) => a.asset_detail[0]?.name?.replace(/\s+/g, "")?.localeCompare(b?.asset_detail[0]?.name?.replace(/\s+/g, "")));
        setfilteredAssets(sorted)
      }
    } else if (criteria === 'Updated') {
      const sorted = filteredAssets?.sort((a: any, b: any) => new Date(a.asset_detail[0].updated_at).getTime() - new Date(b.asset_detail[0].updated_at).getTime())
      setfilteredAssets(sorted?.reverse())
    } else if (criteria === 'Created') {
      const sorted = filteredAssets?.sort((a: any, b: any) => new Date(a.asset_detail[0].created_at).getTime() - new Date(b.asset_detail[0].created_at).getTime())
      setfilteredAssets(sorted)
    }

  };

  const handleSort = (key: any) => {
    setLoader(true);
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    let sortedData = [...filteredAssets].sort((a, b) => {
      let aValue = statusFilter === "draft" ? a?.itemDetails?.asset_detail[0]?.draft?.formdata?.Name : a?.asset_detail[0]?.name;
      let bValue = statusFilter === "draft" ? b?.itemDetails?.asset_detail[0]?.draft?.formdata?.Name : b?.asset_detail[0]?.name;

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
      }
      if (typeof bValue === 'string') {
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setfilteredAssets(sortedData)
    setLoader(false);
  };

  const handleSortAssetClassCategory = (key: any) => {
    setLoader(true);
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    let sortedData = [...filteredAssets].sort((a, b) => {
      let aValue = a?.asset_type?.name;
      let bValue = b?.asset_type?.name;

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
      }
      if (typeof bValue === 'string') {
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setfilteredAssets(sortedData)
    setLoader(false);
  };

  const handleSortSports = (key: any) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    let sortedData = [...filteredAssets].sort((a, b) => {
      let aValue = statusFilter === "draft" ? a?.sport[0] : a?.sport;
      let bValue = statusFilter === "draft" ? b?.sport[0] : b?.sport;

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
      }
      if (typeof bValue === 'string') {
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setfilteredAssets(sortedData)
  };

  const handleSortFollowers = (key: any) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });

    let sortedData = [...filteredAssets].sort((a, b) => {
      let aValue = a?.asset_social_media?.find((entry: any) => entry?.social_media_platform === "instagram")?.asset_social_media_details?.slice(-1)[0]?.followers_count;
      let bValue = b?.asset_social_media?.find((entry: any) => entry?.social_media_platform === "instagram")?.asset_social_media_details?.slice(-1)[0]?.followers_count;

      // Handle string comparison in case of non-numeric data
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
      }
      if (typeof bValue === 'string') {
        bValue = bValue?.toLowerCase();
      }

      // Sort `null`, `undefined`, or `NaN` values to the bottom
      if (aValue == null || isNaN(aValue as number)) return 1; // Push aValue to the bottom
      if (bValue == null || isNaN(bValue as number)) return -1; // Push bValue to the bottom

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setfilteredAssets(sortedData);
  };

  const fetchAssets = async () => {
    setLoader(true);
    try {
      // Fetch all assets
      const assetsResponse = await apis.getAllAssets();
      const assets = assetsResponse?.data?.data || [];

      // Fetch sports media
      const mediaResponse = await apis.getSportsMedia();
      const arrmedia = mediaResponse?.data?.data || [];

      // Map through the assets and add sport media
      const updatedAssets = assets?.map((item: any) => {
        const media = arrmedia?.filter((item1: any) => {
          return item?.sport[0]?.trim()?.toLowerCase() === item1?.name?.trim()?.toLowerCase();
        });
        return {
          ...item,
          sportmedia: media[0] || {},
        };
      });

      setAssetData(updatedAssets);
      let type = (selectedCategory === "activeAssets"
        ? "published"
        : selectedCategory === "private"
          ? "private"
          : selectedCategory === "draft"
            ? "draft"
            : selectedCategory === "rejected"
              ? "rejected"
              : selectedCategory === "closed"
                ? "closed"
                : selectedCategory === "edited"
                  ? "edited"
                  : selectedCategory === "underReview"
                    ? "created"
                    : "published")
      filterFun(updatedAssets, type, assetFiltering,searchValue);
      setAssetFiltering('All');
      setStatusFiltering(type);

    } catch (error: any) {
      console.log("Error fetching assets or media:", error);
      mixpanelEvents.errorHandling({
        name: 'Catalogue Management',
        msg: error.response.data.message || error?.message
      })
    } finally {
      setLoader(false);
    }
  };

  const refreshAssets = () => {
    setLoader(true);

    apis.getAllAssets()
      .then((assetsResponse: any) => {
        const assets: any = assetsResponse?.data?.data || [];

        return apis.getSportsMedia().then((mediaResponse: any) => {
          const arrmedia: any = mediaResponse?.data?.data || [];

          const updatedAssets = assets.map((item: any) => {
            const media = arrmedia.filter((item1: any) => {
              return item?.sport[0]?.trim()?.toLowerCase() === item1?.name?.trim()?.toLowerCase();
            });
            return {
              ...item,
              sportmedia: media[0] || {},
            };
          });
          filterFun(updatedAssets, statusFilter, assetFiltering,searchValue);
          setAssetData(updatedAssets);

        });
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoader(false);
      })

  };

  const filterFun = (data: any, status?: any, type?: any,svalue?:any) => {
    let filtered = []
    if (type == "All") {
      filtered = data?.filter((assetDetail: any) =>
        assetDetail?.asset_detail[0]?.asset_status?.toLowerCase() === status?.toLowerCase()
      );
    }
    else {
      filtered = data?.filter((assetDetail: any) =>
        assetDetail?.asset_type?.name?.toLowerCase()?.includes(type?.toLowerCase()) && assetDetail?.asset_detail[0]?.asset_status?.toLowerCase() === status?.toLowerCase()
      );
    }
    let filtered1 = filtered.filter((item: any) => {
      return item.asset_detail[0]?.name?.toLowerCase().includes(svalue?.toLowerCase());
    })
    setallFiltered(filtered1)
    setfilteredAssets(filtered1)
  }

  const rejectBody = {
    "id": (requestActionObject as RequestActionObject)?.id,
    "asset_detail": {
      "id": (requestActionObject as RequestActionObject)?.asset_detail?.[0]?.id,
      "asset_status": "rejected",
      "rejected_by": parseInt(localStorage.getItem('userID')!),
      "rejection_reason": reason,
    },
  }

  const activateBody = {
    "id": (requestActionObject as RequestActionObject)?.id,
    "asset_detail": {
      "id": (requestActionObject as RequestActionObject)?.asset_detail?.[0]?.id,
      "asset_status": "published",
      "published_by": parseInt(localStorage.getItem('userID')!)
    }
  }

  const privateBody = {
    "id": (requestActionObject as RequestActionObject)?.id,
    "asset_detail": {
      "id": (requestActionObject as RequestActionObject)?.asset_detail?.[0]?.id,
      "asset_status": "private",
    }
  }

  const closeBody = {
    "id": (requestActionObject as RequestActionObject)?.id,
    "asset_detail": {
      "id": (requestActionObject as RequestActionObject)?.asset_detail?.[0]?.id,
      "asset_status": "closed",
      "closed_reason": closedreason
    }
  }

  const handleActions = (type?: any) => {
    setLoader(true)
    const startTime = performance.now();

    apis.updateAsset(
      buttonType == "flip" ? flipObject : buttonType == "reject" ? rejectBody : buttonType == "accept" ? (type == "Public" ? activateBody : type == "Private" ? privateBody : "") : buttonType == "close" ? closeBody : {}
    )
      .then((res2: any) => {
        setSnackbar({
          open: true,
          severity: 'success',
          message: buttonType == "flip" ? "Asset flipped successfully" : buttonType == "reject" ? "Asset rejected successfully!" : buttonType == "accept" ? "Asset accepted successfully!" : buttonType == "close" ? "Asset closed successfully!" : "Asset Updated successfully!",
        });
        if (buttonType == "accept") {
          const loadTime = performance.now() - startTime;
          let opportunityarr: any = []
          requestActionObject.opportunities.map((item: any) => {
            opportunityarr.push(item.opportunity_type)
          })
          const assetItemData = {
            AssetName: requestActionObject.asset_detail[0]?.name,
            AssetStatus: requestActionObject.asset_detail[0]?.asset_status,
            AssetStatusType: type,
            AssetType: requestActionObject.asset_type.name || null,
            AssetID: requestActionObject.id,
            CreatedBy: requestActionObject.created_by_user.name,
            EditedBy: requestActionObject.updated_by_user.name,
            SellerName: requestActionObject.seller.name,
            FlipView: requestActionObject.asset_detail[0]?.is_flip,
            TimeTaken: loadTime,
            OpportunitiesListed: requestActionObject.opportunities?.length ? true : false,
            OpportunityCount: requestActionObject.opportunities?.length,
            OpportunityNames: opportunityarr
          };

          mixpanelEvents.onAssetPublished(assetItemData);
        }

        if (buttonType == "reject") {
          const rejectBody = {
            "AssetName": requestActionObject?.asset_detail?.[0]?.name,
            "AssetId": (requestActionObject as RequestActionObject)?.id,
            "RejectedBy": localStorage.getItem('name'),
            "RejectionReason": reason,
          }
          mixpanelEvents.onAssetRejected(rejectBody);
        }
        // setReCall(!recall)
        setShowRejectAssetData(false)
        setReason('')
        setClosedReason('')
        setCloseDialog(false)
        setFlipDialog(false)
        refreshAssets()
        setLoader(false)
      })
      .catch((error) => {
        setCloseDialog(false)
        setSnackbar({
          open: true,
          severity: 'error',
          message: (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
        });
        // mixpanelEvents.errorHandling({
        //   name:'Catalogue Management',
        //   msg:error.response.data.message
        // })
        setFlipDialog(false)
        setLoader(false)
      });
  }

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 3000) {
      setReason(inputValue);
      setReasonError('');
    } else {
      setReasonError('Cannot exceed 3000 characters');
    }
  };


  const handleInputChangeFun = (event: any) => {
    const value = event.target.value;
    console.log("called===",value)
    setSearchValue(value);
    handleSearch(value);
  };

  const handleSearch = (value: any) => {
    const fdata = getAssetData.filter((item: any) => {
      return item.asset_detail[0]?.name?.toLowerCase().includes(value?.toLowerCase());
    });
    console.log(fdata.length)
    // setfilteredAssets(fdata);
    filterFun(fdata, statusFilter, sortAssets,value)

  };

  const DelAsset = (id: any) => {
    setLoader(true)
    apis.deleteAsset(id)
      .then((res2: any) => {
        setSnackbar({
          open: true,
          severity: 'success',
          message: "Asset deleted successfully!",
        });
        // onload()
        fetchAssets();

      })
      .catch((error) => {
        setSnackbar({
          open: true,
          severity: 'error',
          message: (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
        });
        setLoader(false)
      });
  };

  const privateFun = () => {
    setLoader(true)
    apis.updateAsset(privateObject)
      .then((res2: any) => {
        setSnackbar({
          open: true,
          severity: 'success',
          message: "Asset Updated successfully!"
        });
        setPrivateDialogOpen(false)
        setCloseDialog(false)
        setFlipDialog(false)
        refreshAssets()
      })
      .catch((error) => {
        setCloseDialog(false)
        setSnackbar({
          open: true,
          severity: 'error',
          message: (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
        });
        setFlipDialog(false)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  const headStyles: any = {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '21px',
    letterSpacing: '-0.3333333432674408px',
    textAlign: 'left',
    borderStyle: 'none',
    justifyContent: 'center',
    marginLeft: 0,
    paddingLeft: '18px',
    textTransform: 'capitalize',
    backgroundColor: 'rgba(224, 224, 224, 1)',
  };


  function formatCurrency2(value: any) {
    if (value) {
      let currencyCode = localStorage.getItem("preferred_currency") || 'INR';
      let locale = 'en-US';

      if (currencyCode === 'INR') {
        locale = 'en-IN';
      }
      const formatWithNoTrailingZeros = (num: any) => {
        return parseFloat(num.toFixed(1));
      };
      if (value >= 1_000_000) {
        return formatWithNoTrailingZeros(value / 1_000_000) + 'M';
      } else if (value >= 1_000) {
        return formatWithNoTrailingZeros(value / 1_000) + 'K';
      }

      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true
      }).format(value);
    } else {
      return "NA";
    }
  }

  useEffect(() => {
    if (!(localStorage.getItem('userID') && localStorage.getItem('accessToken'))) {
      navigate("/loginregister")
    }
    else if (isBuyer) { navigate("/catalogue") }
   

  }, [])


  // if (!loader) {
  return (
    <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', height: '90vh', overflowY: "scroll", scrollbarWidth: 'none', overflowX: 'hidden' }}>

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
      <div
        style={{
          width: '98%',
          padding: "15px",
          backgroundColor: "#FFF"
        }}
      >

        <>
          <div
            style={{
              padding: sellerData ? '0' : '14px 33px 14px 35px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >


            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px',
                flexWrap: "wrap",
                marginTop: '20px'
                // width: '70%',
              }}
            >
              {!isSeller && (

                <ZoptsuUnderlineTitle
                  fontSizeOnLargeScreen="40px"
                  fontSizeOnMediumScreen="38px"
                  fontSizeOnSmallScreen="36px"
                  fontSizeOnExtraSmallScreen="37px"
                  titleText={sellerData ? 'Assets Listed' : 'Catalogue Management'}
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
              )}

              {isSeller && (<ZoptsuUnderlineTitle
                fontSizeOnLargeScreen="40px"
                fontSizeOnMediumScreen="38px"
                fontSizeOnSmallScreen="36px"
                fontSizeOnExtraSmallScreen="37px"
                titleText={"My Assets"}
                letterSpacing="1.92px"
                lineHeight="40.2px"
                textAlign="start"
                underlineWidthForDesktop="100%"
                underlineWidthForSmallTablet="100%"
                underlineWidthForMobile="100%"
                underlineBottomForDesktop="18%"
                underlineBottomForSmallTablet="21%"
                underlineBottomForMobile="24%"
                paddingLeft="0px"
                underlineHeight="9px"
              />)}

              {(deviceType == "mobile") && (<div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ width: '150px', height: "30px", }}>
                  <ZupotsuDropdown
                    title=""
                    dropdownData={[
                      "Name",
                      "Updated",
                      "Created",
                    ]}
                    previewMode={false}
                    name="attribute_type"
                    placeholder="Sort By"
                    isRequired={false}
                    value={sortCriteria}
                    handleChange={handleSortChange}
                  />
                </div>
                {(isBuyer == true) ? (<></>) : (<Button
                  sx={{
                    padding: '6px 8px',
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    background: '#E20B18',
                    width: '150px',
                    border: "none",
                    height: '40px',

                    '&:hover': {
                      backgroundColor: '#a9141d',
                      color: '#fff',
                    },
                  }}
                  onClick={navigateToListAnAsset}
                >
                  <span style={{ marginRight: '8px' }}>+</span>List an Asset
                </Button>)}
              </div>)}

              <div style={{
                padding: 0, margin: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: deviceType === "mobile" ? "center" : 'flex-end',
                alignItems: 'center',
                gap: "8px",
                flexWrap: "wrap",
                width: deviceType == "mobile" ? "100%" : '',
              }}>

                <TextField
                  placeholder="Search..."
                  onChange={handleInputChangeFun}
                  sx={{
                    height: '40px',
                    '& .MuiFormControl-root': {
                      height: '40px',
                      border: "0px solid transparent",
                    },
                    '& .MuiTextField-root': {
                      height: '40px',
                      border: "0px solid transparent",
                    },
                    '& .MuiInputBase-root': {
                      height: '40px',
                      border: "0px solid transparent",
                    },
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                      border: "0px solid transparent"
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: "0px solid transparent"
                    },

                    '& .MuiOutlinedInput': {
                      border: "0px solid transparent"
                    },
                    width: deviceType == "mobile" ? "100%" : '200px',
                    backgroundColor: 'rgba(242, 242, 242, 1)',
                    border: "0px solid transparent",
                    borderRadius: '4px'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={SearchNormal}
                          alt="Search"
                          style={{
                            marginRight: '10px',
                            height: '20px',
                            cursor: 'pointer',
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                {(deviceType !== "mobile" && isBuyer !== true) && (<Button
                  sx={{
                    padding: '6px 8px',
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    background: '#E20B18',
                    width: '180px',
                    border: "none",
                    height: '40px',

                    '&:hover': {
                      backgroundColor: '#a9141d', // Replace this with the hover color code
                      color: '#fff',
                    },
                  }}
                  onClick={navigateToListAnAsset}
                >
                  <span style={{ marginRight: '8px' }}>+</span>List an Asset
                </Button>)}

              </div>


            </div>



            <div style={{ width: deviceType == "mobile" ? "100%" : "auto", flexDirection: 'row', display: 'flex', justifyContent: deviceType == "mobile" ? 'flex-start' : "flex-start", scrollbarWidth: 'none', borderBottom: '2px solid rgba(224, 224, 224, 1)', gap: '10px', marginTop: '10px', overflowX: "scroll", overflowY: 'hidden', }}>
              <div style={sortAssets == "All" ?
                sortingStyles.tabButton : sortingStyles.tabButtonInactive
              } onClick={() => {
                setSelectedSport('All');
                setAssetFiltering("")
                filterFun(getAssetData, statusFilter, "All",searchValue)
              }}>All</div>
              <div style={sortAssets == "Team" ?
                sortingStyles.tabButton : sortingStyles.tabButtonInactive
              } onClick={() => {
                setSelectedSport('Team');
                setAssetFiltering("Team")
                filterFun(getAssetData, statusFilter, "Team",searchValue)
              }}>Team</div>
              <div style={sortAssets == "Tournament" ?
                sortingStyles.tabButton : sortingStyles.tabButtonInactive
              } onClick={() => {
                setSelectedSport('Tournament');
                setAssetFiltering("Tournament")
                filterFun(getAssetData, statusFilter, 'Tournament',searchValue)
              }}>Tournament</div>
              <div style={sortAssets == "Athlete" ?
                sortingStyles.tabButton : sortingStyles.tabButtonInactive
              } onClick={() => {
                setSelectedSport('Athlete');
                setAssetFiltering("Athlete")
                filterFun(getAssetData, statusFilter, 'Athlete',searchValue)
              }}>Athlete</div>
              <div style={sortAssets == "Content" ?
                sortingStyles.tabButton : sortingStyles.tabButtonInactive
              } onClick={() => {
                setSelectedSport('Content');
                setAssetFiltering("Content")
                filterFun(getAssetData, statusFilter, 'Content',searchValue)
              }}>Content</div>
            </div>



            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                width: '100%',
                margin: deviceType === 'mobile' ? '20px 0px' : '35px 0px',
                marginBottom: "10px",
                flexWrap: "nowrap"
              }}
            >

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: deviceType == "mobile" ? '6px' : "12px",
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: "wrap",
                  width: deviceType == "mobile" ? '100%' : '78%',
                  overflowX: "scroll",
                  scrollbarWidth: 'none',
                  height: '44px',
                }}
              >
                <StyledSelectButton style={{

                  display: 'flex',
                  fontSize: '12px',
                  flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', fontWeight: '500',
                }}>
                  {radioButtonsData?.map((data: any, index: any) => (
                    <ZupotsuSelectButton
                      key={index}
                      data={data}
                      handleChange={(value) => {
                        // setLoader(true)
                        setSelectedCategory(value);
                        setStatusFiltering(data?.status)
                        getAssetFooterData(value)
                        // setSearchValue('');
                        filterFun(getAssetData, data?.status, assetFiltering,searchValue)
                        const searchParams = new URLSearchParams(location.search);
                        searchParams.set('type', value);
                        // navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
                        window.history.pushState({}, '', `${location.pathname}?${searchParams.toString()}`);
                      }}
                      selected={selectedCategory}
                    />
                  ))}
                </StyledSelectButton>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: deviceType == "mobile" ? '0%' : '20%',
                  gap: deviceType == "mobile" ? '6px' : "12px",
                }}
              >
                {(deviceType !== "mobile") && (<Button
                  sx={{
                    padding: '6px 8px',
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    background: '#E20B18',
                    width: '40px',
                    border: "none",
                    height: '40px',
                    '&:hover': {
                      backgroundColor: '#a9141d',
                      color: '#fff',
                    },
                  }}
                  onClick={() => {
                    const assetItemData = {
                      ViewChange: 'Yes',
                      ViewName: typeofSort ? 'Table' : 'Tile',
                      SortUsed: 'Yes',
                    };
                    // mixpanelEvents.onViewChange(assetItemData);
                    setTypeofSort(!typeofSort)
                  }}
                >
                  {typeofSort && (<MenuIcon sx={{ color: "white", fontSize: "25px" }} />)}
                  {!typeofSort && (<img src={LinearGrid} style={{ width: '20px', height: '20px' }} />)}
                </Button>)}
                {(deviceType !== "mobile") && (<div style={{
                  width: '150px', height: "20px", maxHeight: "30px",
                  marginTop: '-20px'
                }}>
                  <ZupotsuDropdown
                    title=""
                    dropdownData={[
                      "Name",
                      "Updated",
                      "Created",
                    ]}
                    previewMode={false}
                    name="attribute_type"
                    placeholder="Sort By"
                    value={sortCriteria}
                    handleChange={handleSortChange}
                  />
                </div>)}

              </div>
            </div>
            {loader && (

              <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: "center", padding: '20%',paddingTop:'10%',backgroundColor:"#FFF" }}>
                <div className="loader"></div>
              </div>
            )}

            {
              !loader && (
                <>
                  {
                    filteredAssets?.length > 0 ? (
                      <div>
                        {(typeofSort == true) && (<div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: deviceType === 'mobile' ? 'center' : "flex-start",
                            alignItems: "center",
                            gap: '0px',
                            padding: '0px',
                            overflowX: 'scroll',
                            scrollbarWidth: 'none',
                            margin: 0,
                            marginTop: deviceType === 'mobile' ? '5px' : '0px',
                            width: '100%'
                          }}
                        >
                          {filteredAssets?.map((assetDetail: any, index: any) => (
                            <div key={index} style={{ padding: '10px' }}>
                              <Grid
                                sx={{
                                  marginLeft: deviceType == "mobile" ? '10px' : "0px"
                                }}
                                item
                              >
                                <AssetCard1
                                  key={index}
                                  eventscreen={true}
                                  statusFilter={statusFilter}
                                  comesFrom={'admin'}
                                  {...assetDetail}
                                  index={index}
                                  isAdmin={true}
                                  onEdit={onEditCard}
                                  onCopy={onCopyCard}
                                  isEdit={true}
                                  isFlipView={assetDetail?.asset_detail[0]?.is_flip}
                                  getInTouchButtonClicked={() => setShowZoputsuGetInTouchPopup(true)}
                                  setRequestActionObject={setRequestActionObject}
                                  reason={reason}
                                  id={assetDetail.id}
                                  buttonType={buttonType}
                                  flipObject={flipObject}
                                  setflipObject={setflipObject}
                                  setButtonType={setButtonType}
                                  setShowRejectAssetData={setShowRejectAssetData}
                                  setAcceptDialog={setAcceptDialog}
                                  setCloseDialog={setCloseDialog}
                                  closeDialog={closeDialog}
                                  selectedCategory={selectedCategory}
                                  assetDetail={assetDetail}
                                  rejectionData={rejectedAssetData?.assetTitle}
                                  openAssetDetailsDialog={(isOpen, data) => {
                                    openAssetDetailsDialog(isOpen, data);
                                  }}
                                  flipDialog={flipDialog}
                                  setFlipDialog={setFlipDialog}
                                  closeAssetDialog={closeAssetDialog}
                                  setCloseAssetDialog={setCloseAssetDialog}
                                  privateDialogOpen={privateDialogOpen}
                                  setPrivateDialogOpen={setPrivateDialogOpen}
                                  privateObject={privateObject}
                                  setprivateObject={setprivateObject}
                                  sportsMedia={sportsMedia}
                                  onDelete={(id: any) => { DelAsset(id) }}
                                  onPrivate={(id: any) => {
                                    //  privateFun(id)
                                  }}
                                />
                              </Grid>
                            </div>
                          ))}
                        </div>)}

                        {(typeofSort == false) && (
                          <div style={{ gap: '10px', overflowX: 'scroll', marginTop: '15px', marginLeft: "0px", width: '100%' }} >
                            <Paper elevation={3} sx={{ border: '2px solid rgba(0,0,0,0.001)', fontFamily: "Inter", padding: "10px", boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(255, 255, 255, 1)", width: '100%', }}>

                              <TableContainer style={{ borderStyle: 'none', boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)", backgroundColor: '#FFF', width: '100%', borderRadius: "10px", }}>
                                <Table style={{ borderStyle: 'none', width: '100%', boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)", }}>

                                  <TableHead style={{
                                    backgroundColor: 'rgba(240, 239, 239, 0.6)', paddingTop: '5px', paddingBottom: '5px',
                                    boxShadow: "0px 0px 28px 0px rgba(0, 0, 0, 0.1)",

                                  }}>
                                    <TableRow
                                      sx={{
                                        borderRadius: "10px",
                                      }}
                                    >
                                      {headers.map((header, index) => (
                                        <TableCell
                                          key={index}
                                          style={{
                                            ...headStyles,
                                            letterSpacing: '-0.3333333432674408px',
                                            textAlign: 'left',
                                            borderStyle: 'none',
                                            justifyContent: 'center',
                                            marginLeft: 0,
                                            paddingLeft: '15px',
                                            textTransform: 'capitalize',
                                            borderTopRightRadius: index === headers.length - 1 ? "10px" : "0px",
                                            borderTopLeftRadius: index === 0 ? "10px" : "0px",
                                            borderBottomRightRadius: index === headers.length - 1 ? "10px" : "0px",
                                            borderBottomLeftRadius: index === 0 ? "10px" : "0px",
                                            backgroundColor: '#EFEFEF',
                                            color: '#111',
                                            fontFamily: 'Inter',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: 'normal',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                          }}
                                          onClick={() => {
                                            if (index == 2) {
                                              handleSort("name")
                                            } else if (index == 1) {
                                              handleSortAssetClassCategory("assetclasscategory")
                                            } else if (index == 4) {
                                              handleSortSports("sports")
                                            } else if (index == 5) {
                                              handleSortFollowers("followers")
                                            }
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: 'flex', alignItems: 'center',
                                              cursor: (index == 4 || index == 1 || index == 5 || index == 2) ? 'pointer' : 'default',
                                              backgroundColor: '#EFEFEF',
                                              color: '#111',
                                              fontFamily: 'Inter',
                                              fontSize: '14px',
                                              fontStyle: 'normal',
                                              fontWeight: 700,
                                              lineHeight: 'normal',
                                            }}
                                          >
                                            {header}
                                            {(index == 2) && (
                                              sortConfig.key === "name" ? (
                                                sortConfig.direction === 'asc' ?
                                                  <KeyboardArrowUpOutlined style={{ cursor: 'pointer', marginLeft: '8px' }} /> :
                                                  <KeyboardArrowDownOutlined style={{ cursor: 'pointer', marginLeft: '8px' }} />
                                              ) : (

                                                <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                              )
                                            )}
                                            {(index == 1) && (
                                              sortConfig.key === "assetclasscategory" ? (
                                                sortConfig.direction === 'asc' ?
                                                  <KeyboardArrowUpOutlined style={{ cursor: 'pointer', marginLeft: '8px' }} /> :
                                                  <KeyboardArrowDownOutlined style={{ cursor: 'pointer', marginLeft: '8px' }} />
                                              ) : (
                                                <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                              )
                                            )}
                                            {(index == 4) && (
                                              sortConfig.key === "sports" ? (
                                                sortConfig.direction === 'asc' ?
                                                  <KeyboardArrowUpOutlined style={{ cursor: 'pointer', marginLeft: '8px' }} /> :
                                                  <KeyboardArrowDownOutlined style={{ cursor: 'pointer', marginLeft: '8px' }} />
                                              ) : (
                                                <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                              )
                                            )}
                                            {(index == 5) && (
                                              sortConfig.key === "followers" ? (
                                                sortConfig.direction === 'asc' ?
                                                  <KeyboardArrowUpOutlined style={{ cursor: 'pointer', marginLeft: '8px' }} /> :
                                                  <KeyboardArrowDownOutlined style={{ cursor: 'pointer', marginLeft: '8px' }} />
                                              ) : (
                                                <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                                              )
                                            )}

                                          </div>
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableHead>

                                  <TableBody style={{ gap: '10px', width: '100%' }}>


                                    {filteredAssets
                                      ?.map((item: any, index: any) => {
                                        const itemDetails = item
                                        return (
                                          <TableRow
                                            key={index}
                                            onMouseEnter={() => setHoveredRow(index)}
                                            onMouseLeave={() => { }}
                                            style={{
                                              background: hoveredRow === index ? '#F7F9FF' : index % 2 === 1 ? "rgba(249, 248, 248, 1)" : 'transparent',
                                              border: "0px solid transparent",
                                              fontSize: "14px",
                                              lineHeight: "21px",
                                              fontFamily: 'Inter',
                                              fontWeight: "500",
                                              marginTop: '15px',
                                              padding: "10px",
                                              height: "50px",
                                              boxShadow: index % 2 === 1 ? "rgb(0 0 0 / 15%) 0px 0px 28px 0px" : ""

                                            }}
                                          >

                                            <TableCell sx={{
                                              border: "0px solid transparent",
                                              padding: '5px',
                                              height: "50px",
                                              display: 'flex',
                                              flexDirection: 'column',
                                              justifyContent: 'center',
                                              alignItems: "flex-start"
                                            }}>
                                              <img
                                                src={
                                                  (() => {
                                                    const thumbnail = statusFilter === "draft" ? (itemDetails?.asset_detail[0]?.draft?.fileData?.find((asset: any) => asset?.tags?.includes("Thumbnail"))) : itemDetails?.asset_media?.find((asset: any) => asset?.tags?.includes("Thumbnail"));
                                                    return (thumbnail && (thumbnail?.media_url)) || NoDataImage;

                                                  })()
                                                }
                                                style={{
                                                  width: "80px",
                                                  height: "40px",
                                                  padding: "0px",
                                                  gap: "10.11px",
                                                  border: "0.51px 0px 0px 0px",
                                                  objectFit: 'contain'
                                                }}
                                              />

                                            </TableCell>
                                            <TableCell sx={{

                                              border: "0px solid transparent",
                                              padding: '5px',
                                              height: "50px",

                                            }}>
                                              <p
                                                style={{

                                                  padding: 0,
                                                  margin: 0,
                                                  textAlign: 'left',
                                                  paddingLeft: '10px',
                                                }}
                                              >
                                                {itemDetails?.asset_type?.name?.slice(0, 20) || "NA"}
                                              </p>
                                            </TableCell>
                                            <TableCell sx={{

                                              border: "0px solid transparent",
                                              padding: '5px',
                                              height: "50px",

                                            }}>
                                              <p
                                                style={{

                                                  padding: 0,
                                                  margin: 0,
                                                  textAlign: 'left',
                                                  paddingLeft: '10px',
                                                }}
                                              >
                                                {statusFilter === "draft" ? (itemDetails?.asset_detail[0]?.draft?.formdata?.Name?.slice(0, 20) || "NA") : itemDetails?.asset_detail[0]?.name?.slice(0, 20) || "NA"}
                                              </p>

                                            </TableCell>
                                            <TableCell sx={{
                                              height: "50px",
                                              border: "0px solid transparent",
                                              padding: '5px',
                                            }}>
                                              <p
                                                style={{

                                                  padding: 0,
                                                  margin: 0,
                                                  textAlign: 'left',
                                                  paddingLeft: '10px'

                                                }}
                                              >
                                                {statusFilter === "draft" ? (itemDetails?.asset_detail[0]?.draft?.formdata?.Headline?.slice(0, 30) || "NA") : (itemDetails?.asset_detail[0]?.headline?.slice(0, 30) || "NA")}
                                              </p>

                                            </TableCell>
                                            <TableCell sx={{
                                              height: "50px",
                                              border: "0px solid transparent",
                                              padding: '5px',
                                              textAlign: 'left',
                                              paddingLeft: '20px'
                                            }}>
                                              {statusFilter === "draft" ? itemDetails?.sport[0] : itemDetails?.sport || "NA"}

                                            </TableCell>
                                            {/* <TableCell sx={{
                                                  height: "50px",
                                                  border: "0px solid transparent",
                                                  textAlign: 'left',
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                                  justifyContent: "flex-start",
                                                  alignItems: "flex-start",
                                                 
                                                }}>
                                                  <div style={{ width: '100%', display: 'flex', gap: "4px", flexDirection: "row", alignItems: 'flex-start', justifyContent: "flex-start", flexWrap: 'wrap', }}>
                                                    {
                                                      <div style={{
                                                        gap: "2px",
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                      }}>
                                                        <img src={getIcon("instagram")} style={{
                                                          width: "18px",
                                                          height: "18px",
                                                        }} />
                                                        {formatCurrency2((itemDetails?.asset_social_media?.find((entry: any) => entry.social_media_platform === "instagram")?.asset_social_media_details?.[0]?.followers_count))}
                                                      </div>
                                                    }

                                                  </div >

                                                </TableCell> */}
                                            <TableCell sx={{
                                              height: "50px",
                                              border: "0px solid transparent",
                                              padding: '5px',
                                            }}>
                                              <div style={{ width: '100%', display: 'flex', gap: "4px", flexDirection: "row", alignItems: 'flex-start', justifyContent: "flex-start", flexWrap: 'wrap', paddingLeft: '20px' }}>
                                                {
                                                  <div style={{
                                                    gap: "2px",
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: "flex-start",
                                                  }}>
                                                    <img src={getIcon("instagram")} style={{
                                                      width: "18px",
                                                      height: "18px",
                                                    }} />

                                                    {formatCurrency2((itemDetails?.asset_social_media?.find((entry: any) => entry.social_media_platform === "instagram")?.asset_social_media_details?.slice(-1)[0]?.followers_count))}
                                                  </div>
                                                }

                                              </div >

                                            </TableCell>
                                            <TableCell sx={{
                                              border: "0px solid transparent",
                                              padding: '5px',
                                              height: "50px",
                                            }}>
                                              <p
                                                style={{

                                                  padding: 0,
                                                  margin: 0,
                                                  textAlign: 'left',
                                                  paddingLeft: '10px'

                                                }}
                                              >
                                                {statusFilter === "draft" ? (
                                                  itemDetails?.created_by_user?.name
                                                  || "NA") :
                                                  itemDetails?.created_by_user?.name
                                                  || "NA"}
                                              </p>

                                            </TableCell>

                                            <TableCell sx={{
                                              padding: '5px',
                                              border: "0px solid transparent",
                                              borderTopRightRadius: "10px",
                                              display: 'flex',
                                              flexDirection: 'column',
                                              alignItems: 'center',
                                              justifyContent: "center",
                                              borderBottomRightRadius: "10px",
                                              height: "50px",

                                            }}>
                                              <div onClick={() => { navigate(`/assetDetails?id=${item.id}`) }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", padding: 0, border: "0px solid transparent", backgroundColor: "rgba(226, 11, 24, 1)", width: '32px', height: '32px', borderRadius: '8px' }}>
                                                <VisibilityOutlined sx={{ color: '#FFF' }} />
                                              </div>
                                            </TableCell>


                                          </TableRow>
                                        )
                                      })}
                                  </TableBody>

                                </Table>
                              </TableContainer>
                            </Paper>
                          </div>
                        )}
                      </div>
                    ) : (
                      <NoData ErrorData={ErrorData} />
                    )}
                </>
              )}
          </div>

        </>

      </div>
      <Dialog
        open={showRejectedAssetData}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: '4px',
            width: '523px',
            zIndex: 1000,
            padding: "10px"
          },
        }}
        disableScrollLock
      >

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '27px',
            flexDirection: 'column',
            zIndex: 2
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              paddingBottom: '27px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '19.5px',
                  textAlign: 'left',
                  width: '100%',
                  color: '#333',
                }}
              >
                Are you sure you want to reject ?
                {/* {' '}
                  <span style={{ color: '#E20B18', textTransform: 'capitalize' }}>
                    {reason}
                  </span>{' '}
                  */}
              </Typography>
              <ClearIcon
                sx={{ alignSelf: 'end', cursor: 'pointer' }}
                onClick={() => setShowRejectAssetData(false)}
              />
            </div>
            <div>
              <ZupotsuTextfield
                handleChange={handleChange}
                value={reason}
                name="reason"
                errorMessage={reasonError}
                title={'Please enter the reason'}
                placeholder={'Enter Reason'}
                isRequired={true}
                multiline={true}
                rows={4}
                description='3000 character limit'
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '10px',
              justifyContent: 'center',
              gap: '16px',
              flexDirection: 'row',
              borderTop: '1px solid  #E0E0E0',
              width: '100%',
            }}
          >
            <div>
              <ZupotsuButton
                name="Cancel"
                handleClick={() => {
                  setShowRejectAssetData(false)
                  setReason('')
                  setClosedReason('')
                }}
                isCustomColors={true}
                variant={'outlined'}
                customTextColor="#828282"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customOutlineColor={'1px solid #E0E0E0'}
                customOutlineColorOnHover={'1px solid #E20B18'}
                padding={deviceType != 'mobile' ? '12px 53px' : '12px 16px'}
              />
            </div>
            <div>
              <ZupotsuButton
                name="Reject"
                handleClick={() => {
                  handleActions()
                }}
                isCustomColors={true}
                load={loader}
                customOutlineColor="rgba(226, 11, 24, 0.3)"
                customTextColor="#fff"
                customBgColor={!isSaveButtonEnabled ? "rgba(226, 11, 24, 0.3)" : "#E20B18"}
                customBgColorOnhover={'#a9141d'}
                customTextColorOnHover={'white'}
                padding={deviceType != 'mobile' ? '12px 60px' : '12px 16px'}
                disabled={!isSaveButtonEnabled}
              />
            </div>
          </div>
        </div>

      </Dialog>

      <Dialog
        open={acceptDialog}
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
            <ClearIcon
              sx={{ alignSelf: 'end', cursor: 'pointer' }}
              onClick={() => setAcceptDialog(false)}
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
              Select mode of publishing
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
              {/* <ZupotsuButton
                  name="Cancel"
                  variant={'outlined'}
                  isCustomColors={true}
                  customOutlineColor="1px solid #E0E0E0"
                  customOutlineColorOnHover="1px solid #E20B18"
                  customBgColorOnhover="#fff"
                  customBgColor="#fff"
                  customTextColorOnHover="#E20B18"
                  customTextColor="#828282"
                  handleClick={() => setAcceptDialog(false)}
                /> */}
              <ZupotsuButton
                name="Private"
                variant={'outlined'}
                isCustomColors={true}
                load={loader}
                customOutlineColor="1px solid #E20B18"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#E20B18"
                handleClick={() => {
                  setAcceptDialog(false);
                  // approveAsset();
                  handleActions("Private")
                  // onEditSave(accordionData);
                }}
              />
              <ZupotsuButton
                name="Public"
                variant={'outlined'}
                isCustomColors={true}
                load={loader}
                customOutlineColor="1px solid #E20B18"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#E20B18"
                handleClick={() => {
                  setAcceptDialog(false);
                  // approveAsset();
                  handleActions("Public")
                  // onEditSave(accordionData);
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog
        open={closeDialog}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: '4px',
            width: '523px',
            zIndex: 1000,
            padding: "10px"
          },
        }}
        disableScrollLock
      >

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '27px',
            flexDirection: 'column',
            zIndex: 2
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              paddingBottom: '27px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '19.5px',
                  textAlign: 'left',
                  width: '100%',
                  color: '#333',
                }}
              >
                Are you sure you want to close this asset? It will no longer be listed on the platform?
                {/* {' '} */}
                {/* <span style={{ color: '#E20B18', textTransform: 'capitalize' }}>
                    {closedreason}
                  </span>{' '} */}
                {/* ? */}
              </Typography>
              <ClearIcon
                sx={{ alignSelf: 'end', cursor: 'pointer' }}
                onClick={() => { setCloseDialog(false) }}
              />
            </div>
            <div>
              <ZupotsuTextfield
                handleChange={(e) => { setClosedReason(e.target.value) }}
                value={closedreason}
                name="reason"
                errorMessage={""}
                title={'Please enter the reason'}
                placeholder={'Enter closed reason'}
                isRequired={true}
                multiline={true}
                rows={4}
                description='3000 character limit'
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '10px',
              justifyContent: 'center',
              gap: '16px',
              flexDirection: 'row',
              borderTop: '1px solid  #E0E0E0',
              width: '100%',
            }}
          >
            <div>
              <ZupotsuButton
                name="Cancel"
                handleClick={() => {
                  setCloseDialog(false)
                  setReason('')
                  setClosedReason('')
                }}
                isCustomColors={true}
                variant={'outlined'}
                customTextColor="#828282"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customOutlineColor={'1px solid #E0E0E0'}
                customOutlineColorOnHover={'1px solid #E20B18'}
                padding={deviceType != 'mobile' ? '12px 53px' : '12px 16px'}
              />
            </div>
            <div>
              <ZupotsuButton
                name="Close"
                handleClick={() => {
                  handleActions()
                }}
                isCustomColors={true}
                customTextColor="#fff"
                load={loader}
                customBgColor={!isCloseButtonEnabled ? "rgba(226, 11, 24, 0.3)" : "#E20B18"}
                customOutlineColor={"rgba(226, 11, 24, 0.3)"}
                customBgColorOnhover={'#a9141d'}
                customTextColorOnHover={'white'}
                padding={deviceType != 'mobile' ? '12px 60px' : '12px 16px'}
                disabled={!isCloseButtonEnabled}
              />
            </div>
          </div>
        </div>

      </Dialog>

      <Dialog
        open={deleteDialog?.isOpen}
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
            <ClearIcon
              sx={{ alignSelf: 'end', cursor: 'pointer' }}
              onClick={() =>
                setDeleteDialog({
                  isOpen: false,
                  assetId: '',
                })
              }
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
              Are you sure you want to delete this asset?. It will no longer
              available on platform.
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
                handleClick={() =>
                  setDeleteDialog({
                    isOpen: false,
                    assetId: '',
                  })
                }
              />
              <ZupotsuButton
                name="Delete"
                variant={'outlined'}
                isCustomColors={true}
                load={loader}
                customOutlineColor="1px solid #E20B18"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#E20B18"
                handleClick={() => {
                  setDeleteDialog({
                    isOpen: false,
                    assetId: '',
                  });

                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog
        open={flipDialog}
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
            <ClearIcon
              sx={{ alignSelf: 'end', cursor: 'pointer' }}
              onClick={() =>
                setFlipDialog(false)
              }
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
              Are you sure you want to {!flipObject?.asset_detail?.is_flip ? 'disable' : 'enable'} flip for this asset?
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
                handleClick={() =>
                  setDeleteDialog({
                    isOpen: false,
                    assetId: '',
                  })
                }
              />
              <ZupotsuButton
                name="Proceed"
                variant={'outlined'}
                load={loader}
                isCustomColors={true}
                customOutlineColor="1px solid #E20B18"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#E20B18"
                handleClick={() => {

                  handleActions()
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog
        open={privateDialogOpen}
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
            <ClearIcon
              sx={{ alignSelf: 'end', cursor: 'pointer' }}
              onClick={() =>
                setPrivateDialogOpen(false)
              }
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
              Are you sure you want to {privateObject?.asset_detail?.asset_status?.toLowerCase() == "private" ? "Private" : privateObject?.asset_detail?.asset_status?.toLowerCase() == "published" ? "Publish" : ""
                //  ? 'disable' : 'enable'
              } this asset?
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
                handleClick={() => { setPrivateDialogOpen(false) }}
              />
              <ZupotsuButton
                name="Proceed"
                variant={'outlined'}
                isCustomColors={true}
                load={loader}
                customOutlineColor="1px solid #E20B18"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#E20B18"
                handleClick={() => {

                  privateFun()
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div >
  );
  // }
  // else {
  //   return (
  //     <div className="centered-container-catalouge">
  //       <div className="loader"></div>
  //     </div>
  //   )
  // }
};

export default Catalogue;