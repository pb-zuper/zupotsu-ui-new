import {
  Box,
  Button,
  FormControl,
  Grid,
  Typography,
  MenuItem,
  Select,
  styled,
  Dialog,
  DialogContent,
  Snackbar,
  InputAdornment,
  TextField,
  Paper,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Table,
  Badge,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import React, { useEffect, useMemo, useState } from 'react'
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb'
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Loader from '../../loader/Loader';
import useDeviceType from '../../utils/DeviceType';
import { DeleteIcon, EditIconn, LinearGrid, List, NoDataImage, SearchNormal } from '../../assets';
import NoData from '../../error/NoData';
import ReusableTable from '../../Molecules/table-management/ReusableTable';
import ActionButton from '../../Molecules/table-management/ActionButton';
import VisibilityButton from '../../Atoms/Visibility/VisibilityButton';
import { useNavigate } from 'react-router-dom';
import Apis from '../../services/apis';
import ZoputsuGetInTouch3 from '../../Atoms/zoputsugetintouch/zoputsugetintouch3';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import RefreshIcon from '@mui/icons-material/Refresh';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';

const Newrequests = () => {
  const apis = new Apis();
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const userFromLocal = localStorage.getItem("role")?.toLowerCase();
  const isItAdmin = (userFromLocal === "admin") ? true : false;
  const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
  const isApprover = (userFromLocal === "approver") ? true : false;
  const isPublisher = (userFromLocal === "publisher") ? true : false;
  const isSeller = (userFromLocal === "seller") ? true : false;
  const isBuyer = (userFromLocal === "buyer") ? true : false;
  const [tableData, setTableData] = useState<any[]>([]);
  const [assetFiltering, setAssetFiltering] = useState('All');
  const [filteredAssets, setFilteredAssets] = useState<any[]>([]);
  const [allBuyersName, setAllBuyersName] = useState<any[]>([]);
  const [allAssetName, setAllAssetName] = useState<any[]>([]);
  const [allSourceName, setAllSourceName] = useState<any[]>([]);
  const [allSellerName, setAllSellerName] = useState<any[]>([]);
  const [searchBuyersName, setSearchBuyersName] = useState<any>("");
  const [searchSellersName, setSearchSellersName] = useState<any>("");
  const [searchAssetName, setSearchAssetName] = useState<any>("");
  const [searchSourceName, setSearchSourceName] = useState<any>("");
  const [refdate, setrefdate] = useState<any>("")
  const [loader, setLoader] = useState(false);
  const headers = isItAdmin ? ["Chats", , "Id", "Requested Date", "Asset Type", "Sport", "Asset Name",
    // "Opportunities",
    "Source", "Buyer Name", 'Status', "View"] : ["Chats", "Id", "Requested Date", "Asset Type", "Sport", "Asset Name", "Source", 'Status', "View"];
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const [searchValue, setSearchValue] = useState('');
  const [isNewProposal, setIsNewProposal] = useState(false);
  const deviceType = useDeviceType();
  const navigate = useNavigate()
  const ErrorData = useMemo(
    () => ({
      img: NoDataImage,
      button: false,
      message: 'No assets found',
    }),
    []
  );

  useEffect(() => {
    let date = formatDateTimeString(new Date());
    setrefdate(date)
    const startTime = performance.now();
    const fetchAndTrack = async () => {
      await fetchProposals()
      const loadTime = performance.now() - startTime;
      mixpanelEvents.onLoad(loadTime, 'Proposal Requests');
    };
    fetchAndTrack();
    return () => {
      const timeSpent = performance.now() - startTime;
      mixpanelEvents.onUnload('Proposal Requests', timeSpent);
    };
  }, [isNewProposal == false])


  const fetchProposals = async () => {
    setLoader(true)
    try {
      const response = await apis.getAllProposals();
      let arr: any = [];
      let buyer: any = [];
      let seller: any = [];
      let assets: any = [];
      let websites: any = [];
      response?.data?.data.map((item: any, index: any) => {
        arr.push(
          {
            "id": item.id,
            "requesteddate": item?.created_at,
            "buyername": item?.buyer?.name || "",
            "sellername": item?.seller?.name || "",
            "assettype": item?.asset_type,
            "sport": item?.sports[0],
            "assetname": item?.asset?.asset_detail[0]?.name || "",
            "opportunities": item?.opportunities[0]?.opportunity,
            "source": item?.source,
            "pls_current_status": item?.pls_current_status,
            "proposal_status": item?.proposal_status,
            "status": item?.proposal_status?.toLowerCase() == "completed" ? "Completed" : item?.proposal_status?.toLowerCase() == "terminated" ? "Terminated" : steps[steps.findIndex(item1 => item1 === item?.pls_current_status) + 1],
            "buyer_unread_chats": item?.buyer_unread_chats,
            "seller_unread_chats": item?.seller_unread_chats,
            "chats": parseInt(item?.buyer_unread_chats) + parseInt(item?.seller_unread_chats),
            "action": "Edit",
            "asset_id":item?.asset_id
          }
        )

        if (item?.buyer?.name && !buyer.includes(item?.buyer?.name)) {
          buyer.push(item?.buyer?.name);
        }
        if (item?.seller?.name && !seller.includes(item?.seller?.name)) {
          seller.push(item?.seller?.name);
        }
        if ((item?.asset?.asset_detail[0]?.name) && !assets.includes(item?.asset?.asset_detail[0]?.name)) {
          assets.push(item?.asset?.asset_detail[0]?.name);
        }
        if ((item?.source) && !websites.includes(item?.source)) {
          websites.push(item?.source);
        }
      })
      arr.sort((a: any, b: any) => new Date(b.requesteddate).getTime() - new Date(a.requesteddate).getTime());
      setTableData(arr);
      setAllBuyersName(buyer)
      setAllSellerName(seller)
      setAllAssetName(assets)
      setAllSourceName(websites)
      setLoader(false)
    } catch (error: any) {
      console.error("Error fetching proposals:", error);
      mixpanelEvents.errorHandling({
        name: 'Proposal Requests',
        msg: error?.response?.data?.error || error?.message
      })
      setLoader(false)
    }
  };

  const linkDetails = useMemo(() => {
    return [
      {
        label: 'Proposal Management',
        url: '',
      },
      {
        label: 'Proposal Requests',
        url: '',
      }
    ];
  }, []);

  const handleChangeTable = (event: any, item: any) => {
    const newRole = event.target.value;
    const newData: any = tableData.map((dataItem: any) =>
      dataItem.name === item.name ? { ...dataItem, role: newRole } : dataItem
    );
    setTableData(newData);
  };

  const formatDateString = (dateString: any) => {
    if (!dateString) return 'NA';

    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    const formattedMonth = month.slice(0, 3);
    return `${formattedMonth}\n${day} ${year}`;
  };

  const formatDateTimeString = (dateString: any) => {
    if (!dateString) return 'NA';

    const date = new Date(dateString);

    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const [month, day, year] = formattedDate.split(' ');
    const formattedMonth = month.slice(0, 3);

    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true } as const;
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

    return `${formattedMonth}\n${day} ${year} ${formattedTime}`;
  };

  const handleInputChangeFun = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
  };
  const navigation = useNavigate()

  const columns: any = [
    {
      field: 'chats',
      render: (_: any, item: any) => (
        <div style={{ width: "25px", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", padding: 0, border: "0px solid transparent", backgroundColor: "transparent", borderRadius: '8px' }}>
          {((item?.chats) > 0) ? (
            <Badge color="secondary" badgeContent={item?.chats} sx={{
              width: "20px", fontSize: "10px", padding: 0, margin: 0,
              '& .MuiBadge-badge': {
                backgroundColor: '#E12619',
                borderRadius: "6px",
                color: '#FFF',
                padding: "6px",
                top: '-10px',
                left: '10px'
              },
            }}>
              <MailIcon sx={{ width: "20px", height: '20px', padding: 0, margin: 0 }} />
            </Badge>
          ) : (
            <MarkEmailReadIcon sx={{ width: "20px", height: '20px', padding: 0, margin: 0 }} />
          )}
        </div>
      ),
      cellStyle: { height: "30px", fontSize: "13px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" }
    },
    { field: 'id', cellStyle: { height: "30px", fontSize: "13px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    {
      field: 'requesteddate',
      render: (_: any, item: any) => (

        <div style={{ display: 'flex', fontSize: "13px", flexDirection: 'row', alignItems: 'flex-start', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", backgroundColor: "transparent", borderRadius: '8px' }}>
          {formatDateString(item?.requesteddate)}
        </div>
      ),
      cellStyle: { height: "30px", fontSize: "13px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" }
    },
    { field: 'assettype', cellStyle: { height: "30px", fontSize: "13px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    {
      field: 'sport', cellStyle: { height: "30px", fontSize: "13px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
      render: (_: any, item: any) => (
        <div style={{ display: 'flex', flexDirection: 'row', fontSize: "13px", alignItems: 'center', justifyContent: "space-between", padding: 0, margin: 0, border: "0px solid transparent", cursor: 'pointer', gap: '10px' }}>
          {item?.sport}

        </div>
      )
    },
    {
      field: 'assetname', cellStyle: { height: "30px", fontSize: "13px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
      render: (_: any, item: any) => (
        <div onClick={() => { navigate(`/assetDetails?id=${item?.asset_id}`) }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, margin: 0, border: "0px solid transparent", cursor: 'pointer' }}>
          {item?.assetname}
        </div>
      )
    },
    // { field: 'opportunities', cellStyle: { height: "30px", fontSize: "13px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'source', cellStyle: { height: "30px", fontSize: "13px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    ...(isItAdmin ? [{ field: 'buyername', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } }] : []),
    {
      field: 'status', cellStyle: { height: "30px", fontSize: "13px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
      render: (_: any, item: any) => (

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", }}>
          {/* {item?.proposal_status?.toLowerCase() == "completed" ? "Completed" : item?.proposal_status?.toLowerCase() == "terminated" ? "Terminated" : steps[steps.findIndex(item1 => item1 === item?.pls_current_status) + 1]} */}
          {item?.status}
        </div>
      )
    },
    {
      field: 'actions',
      render: (_: any, item: any) => (

        <div onClick={() => { navigation(`/allleadsproposaldetails?id=${item?.id}`) }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", padding: 0, border: "0px solid transparent", backgroundColor: "rgba(226, 11, 24, 1)", width: '32px', height: '32px', borderRadius: '8px' }}>
          <VisibilityButton onVisibility={false} />
        </div>
      ),
      cellStyle: { padding: 0, border: "0px solid transparent", width: '50px', paddingLeft: '10px' }
    }

  ];

  const steps = [
    'Enquiry Initiated',
    'Scope/Quotation',
    'Proposal',
    'SOW/Agreement Signed',
    'Reporting',
    'Invoicing',
    'Completed',
  ]

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



  return (
    <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', height: '90vh', overflowY: "scroll", scrollbarWidth: 'none', overflowX: 'hidden' }}>
      <Grid xs={12} md={12} lg={12} width={"100%"} spacing={2} sx={{ backgroundColor: 'rgba(250,250,250,1)' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            backgroundColor: '#FFF',
            margin: "10px",
            padding: "15px",
            width: '98%',
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
          width: '100%',
          padding: "10px",
          marginBottom: '10px'
        }}
      >

        <div
          style={{
            padding: '10px 10px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: "#FFF",
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
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center' }}>

              <ZoptsuUnderlineTitle
                fontSizeOnLargeScreen="35px"
                fontSizeOnMediumScreen="33px"
                fontSizeOnSmallScreen="33px"
                fontSizeOnExtraSmallScreen="33px"
                titleText={'Proposal Requests'}
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
              <button
                onClick={() => { fetchProposals() }}
                style={{
                  width: '20px',
                  backgroundColor: "transparent",
                  border: "0px solid transparent",
                  margin: 0,
                  padding: 0,
                  paddingLeft: '20px',
                  marginTop: '-15px'
                }}>
                <RefreshIcon sx={{
                  width: '20px',
                  height: '20px',
                  color: "#E12619",
                  margin: 0,
                  padding: 0,

                }} />
              </button>
              <div
                onClick={() => { fetchProposals() }}
                style={{
                  color: '#e22b16',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  marginLeft: '20px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '-15px',
                  paddingLeft: '5px',
                  lineHeight: '22px',
                }}>{refdate}</div>
            </div>



            <div style={{
              padding: 0, margin: 0,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: deviceType === "mobile" ? "center" : 'flex-end',
              alignItems: 'center',
              gap: "8px",
              // flexWrap: "wrap",
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
                          // paddingBottom: '5px',
                          marginRight: '10px',
                          height: '20px',
                          cursor: 'pointer',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              {(isItAdmin) && (<Button
                sx={{
                  padding: '6px 8px',
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  background: '#E20B18',
                  width: '136px',
                  border: "none",
                  height: '40px',

                  '&:hover': {
                    backgroundColor: '#a9141d',
                    color: '#fff',
                  },
                }}
                onClick={() => { setIsNewProposal(true) }}
              >
                <span style={{ marginRight: '8px' }}>+</span>Add New
              </Button>)}



            </div>


          </div>

          {loader && (

            <div className="centered-container">
              <div className="loader"></div>
            </div>
          )}

        </div>
        {
          !loader && (
            <div style={{ marginTop: '20px', backgroundColor: '#FFF', padding: '15px' }}>

              <div style={{ width: deviceType == "mobile" ? "100%" : "auto", flexDirection: 'row', display: 'flex', justifyContent: deviceType == "mobile" ? 'flex-start' : "flex-start", scrollbarWidth: 'none', borderBottom: '2px solid rgba(224, 224, 224, 1)', gap: '10px', marginBottom: '15px', overflowX: "scroll", overflowY: 'hidden', }}>
                <div style={assetFiltering == "All" ?
                  sortingStyles.tabButton : sortingStyles.tabButtonInactive
                } onClick={() => {
                  setAssetFiltering('All');
                }}>All</div>
                <div style={assetFiltering == "Ongoing" ?
                  sortingStyles.tabButton : sortingStyles.tabButtonInactive
                } onClick={() => {
                  setAssetFiltering("Ongoing")
                }}>Ongoing</div>
                <div style={assetFiltering == "Completed" ?
                  sortingStyles.tabButton : sortingStyles.tabButtonInactive
                } onClick={() => {
                  setAssetFiltering("Completed")
                }}>Completed</div>
                <div style={assetFiltering == "Terminated" ?
                  sortingStyles.tabButton : sortingStyles.tabButtonInactive
                } onClick={() => {
                  setAssetFiltering("Terminated")
                }}>Terminated</div>

              </div>

              {(isItAdmin) && (
                <div style={{ width: deviceType == "mobile" ? "100%" : "auto", flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', scrollbarWidth: 'none', gap: '20px', marginBottom: '15px', overflowX: "scroll", overflowY: 'hidden', marginTop: '15px', paddingBottom: '5px', }}>

                  <div style={{ width: deviceType == "mobile" ? "50%" : "20%", flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                    <ZupotsuDropdown
                      title="Asset Name"
                      dropdownData={allAssetName || []}
                      previewMode={false}
                      name="asset_name"
                      placeholder="Asset Name"
                      value={searchAssetName}
                      handleChange={(event) => { setSearchAssetName(event.target.value) }}
                    />
                  </div>
                  <div style={{ width: deviceType == "mobile" ? "50%" : "20%", flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                    <ZupotsuDropdown
                      title="Buyer Name"
                      dropdownData={allBuyersName || []}
                      previewMode={false}
                      name="buyer_name"
                      placeholder="Buyer Name"
                      value={searchBuyersName}
                      handleChange={(event) => { setSearchBuyersName(event.target.value) }}
                    />
                  </div>
                  <div style={{ width: deviceType == "mobile" ? "50%" : "20%", flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                    <ZupotsuDropdown
                      title="Seller Name"
                      dropdownData={allSellerName || []}
                      previewMode={false}
                      name="search_name"
                      placeholder="Seller Name"
                      value={searchSellersName}
                      handleChange={(event) => { setSearchSellersName(event.target.value) }}
                    />
                  </div>
                  <div style={{ width: deviceType == "mobile" ? "50%" : "20%", flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                    <ZupotsuDropdown
                      title="Source Name"
                      dropdownData={allSourceName || []}
                      previewMode={false}
                      name="source"
                      placeholder="Source Name"
                      value={searchSourceName}
                      handleChange={(event) => { setSearchSourceName(event.target.value) }}
                    />
                  </div>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '25px'
                  }}>

                    <Button
                      onClick={() => {
                        setSearchAssetName("")
                        setSearchBuyersName("")
                        setSearchSellersName("")
                        setSearchSourceName("")
                      }}
                      sx={{
                        backgroundColor: 'rgba(226, 11, 24, 0.1)',
                        color: 'rgba(226, 11, 24, 1)',
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16.8px",
                        textAlign: "center",
                        borderRadius: '5px',
                        width: "130px",
                        height: '35px',
                        border: '0px solid transparent',
                        padding: "12px, 16px, 12px, 16px",
                        cursor: 'pointer',
                        ':hover': {
                          backgroundColor: 'rgba(226, 11, 24,0.05)',
                        }
                      }}>
                      Clear All
                    </Button>
                  </Box>
                </div>
              )}


              {
                (tableData?.length > 0) ? (
                  <>
                    <ReusableTable
                      columns={columns}
                      tableData={tableData.filter((item: any) => {
                        const isMatchingStatus = assetFiltering?.toLowerCase() === 'all' || item?.proposal_status?.toLowerCase() === assetFiltering?.toLowerCase();
                        const isMatchingBuyerName = !searchBuyersName || item?.buyername?.toLowerCase() === searchBuyersName?.toLowerCase();
                        const isMatchingAssetName = !searchAssetName || item?.assetname?.toLowerCase() === searchAssetName?.toLowerCase();
                        const isMatchingSourceName = !searchSourceName || item?.source?.toLowerCase() === searchSourceName?.toLowerCase();
                        const isMatchingSellerName = !searchSellersName || item?.sellername?.toLowerCase() === searchSellersName?.toLowerCase();

                        return isMatchingStatus && isMatchingBuyerName && isMatchingAssetName && isMatchingSourceName && isMatchingSellerName;
                      })}
                      setTableData={setTableData}
                      headers={headers}
                      search={searchValue}
                      sortingColumn={1}
                      handleChange={handleChangeTable}
                    />

                  </>
                ) : (
                  <NoData ErrorData={ErrorData} />
                )
              }

            </div>
          )}

        {isNewProposal && (<ZoputsuGetInTouch3
          showZoputsuGetInTouchPopup={isNewProposal}
          closePopup={() => {
            setIsNewProposal(false)
          }}
        />)}

      </div>



    </div >
  )
}

export default Newrequests
