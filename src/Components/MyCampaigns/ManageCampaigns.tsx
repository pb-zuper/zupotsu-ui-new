import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, InputAdornment, MenuItem, Paper, Select, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Table, FormControl, InputLabel, Modal, Dialog } from '@mui/material';
import { DeleteIcon, DotGroup, EditIconn, NoDataImage, SearchNormal, VisibilityEye, deleteIcon, editIcon, rearrange, rearrangeWhite } from '../../assets';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import { useNavigate } from 'react-router';
import NoData from '../../error/NoData';
import ReorderableReusableTable from '../../Molecules/table-management/ReorderablereusableTable';
import useDeviceType from '../../utils/DeviceType';
import Apis from '../../services/apis';
import Popup from '../../Atoms/popup/popup';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
import { VisibilityOutlined } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import CustomSwitch from '../../Atoms/customSwitch';
const ManageCampaigns: React.FC = () => {
  const headers = ['Name',"Campaign Id", 'Proposal Id', 'Platform', "Asset",
    // "Date", 
     "Publish", 'Action'];
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const [currentItems, setCurrentItems] = useState([])
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState('');
  const navigation = useNavigate();
  const [hoveredRow, setHoveredRow] = useState<any>(null);
  const [popup, setpopup] = useState(false);
  const [ischecked, setischecked] = useState<any>({});

  const userFromLocal = localStorage.getItem("role")?.toLowerCase();
  const isItAdmin = (userFromLocal === "admin") ? true : false;
  const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
  const isSeller = (userFromLocal === "seller") ? true : false;
  const isBuyer = (userFromLocal === "buyer") ? true : false;
  const isApprover = (userFromLocal === "approver") ? true : false;
  const isPublisher = (userFromLocal === "publisher") ? true : false;
  
  const campaign = isItAdmin  || isApprover || isPublisher
  const deviceType = useDeviceType();

  const [loader, setLoader] = useState(false);
  const apis = new Apis();

  const onDelete = () => {
    setLoader(true)
    apis.deleteCampaign(ischecked.id)
      .then((response: any) => {
        if (response?.data?.status == "success") {
          setpopup(false)
          setSnackbar({
            open: true,
            severity: 'success',
            message: response?.data?.data?.message || "CAMPAIGN DELETED SUCCESSFULLY",
          });
        }
        onLoad()
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
        setSnackbar({
          open: true,
          severity: 'error',
          message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : (error?.response?.data?.error || 'something went wrong!!')),
        });
        // mixpanelEvents.errorHandling({
        //   name: 'Manage Tray',
        //   msg: error?.response?.data?.error || error?.message
        // })
      });
  }

  const onPublish = () => {
    setLoader(true)
    apis.publishCampaign(ischecked.id)
      .then((response: any) => {
        if (response?.data?.status == "success") {
          setpopup(false)
          setSnackbar({
            open: true,
            severity: 'success',
            message: response?.data?.data?.message || "CAMPAIGN DELETED SUCCESSFULLY",
          });
        }
        onLoad()
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
        setSnackbar({
          open: true,
          severity: 'error',
          message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : (error?.response?.data?.error || 'something went wrong!!')),
        });
        // mixpanelEvents.errorHandling({
        //   name: 'Manage Tray',
        //   msg: error?.response?.data?.error || error?.message
        // })
      });
  }

  const columns: any = [
    {
      field: 'name',
      render: (_: any, item: any) => (
        <div style={{

          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '15px',
          margin: 0,
          padding: '15px',
        }}>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "21px",
              padding: 0,
              margin: 0,
              textAlign: "left",
              whiteSpace: 'wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              // whiteSpace: 'normal' 
            }}
          >{item?.campaign_name || "N/A"}</p>
        </div >
      ),
      cellStyle: { padding: 0, border: "0px solid transparent" }
    }
    ,
    {
      field: 'campaignid',
      render: (_: any, item: any) => (
        <div style={{

          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '15px',
          margin: 0,
          padding: '15px',
          maxWidth: '200px'
        }}>

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              padding: 0,
              margin: 0,
              fontWeight: 400,
              lineHeight: "21px",
              textAlign: "left",
              whiteSpace: 'wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,

            }}
          >{item?.id || "N/A"}</p>
        </div >
      ),

      cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
    },

    {
      field: 'proposalid',
      render: (_: any, item: any) => (
        <div style={{

          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '15px',
          margin: 0,
          padding: '15px',
          maxWidth: '200px'
        }}>

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              padding: 0,
              margin: 0,
              fontWeight: 400,
              lineHeight: "21px",
              textAlign: "left",
              whiteSpace: 'wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,

            }}
          >{item?.proposal_id || "N/A"}</p>
        </div >
      ),

      cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
    },
    {
      field: 'platform',
      render: (_: any, item: any) => (
        <div style={{

          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: "flex-start",
          gap: '15px',
          margin: 0,
          padding: '15px',
        }}>

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              padding: 0,
              margin: 0,
              fontWeight: 400,
              lineHeight: "21px",
              textAlign: "left",

            }}
          >{item?.platform || "N/A"}</p>
        </div >
      ),
      cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
    },

    {
      field: 'asset',
      render: (_: any, item: any) => (
        <div style={{

          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: "flex-start",
          gap: '15px',
          margin: 0,
          padding: '15px',
        }}>

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              padding: 0,
              margin: 0,
              fontWeight: 400,
              lineHeight: "21px",
              textAlign: "left",

            }}
          >{item?.asset_acc || "N/A"}</p>
        </div >
      ),
      cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
    },

    // {
    //   field: 'date',
    //   render: (_: any, item: any) => (
    //     <div style={{
    //       display: 'flex',
    //       flexDirection: 'row',
    //       alignItems: 'center',
    //       justifyContent: "flex-start",
    //       gap: '15px',
    //       margin: 0,
    //       padding: '15px',
    //     }}>

    //       <p
    //         style={{
    //           fontFamily: "Inter",
    //           fontSize: "14px",
    //           padding: 0,
    //           margin: 0,
    //           fontWeight: 400,
    //           lineHeight: "21px",
    //           textAlign: "left",

    //         }}
    //       >{(item?.created_at) || "N/A"}</p>
    //     </div >
    //   ), cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
    // },
   
    {
      field: 'publish',
      render: (_: any, item: any) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", padding: 0, border: "0px solid transparent", width: '100%', height: '60px', borderRadius: '8px' }}>
          <CustomSwitch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            checked={item.is_active}
            onChange={() => {
              setischecked({ id: item.id, value: item.is_active, type: "publish", status: item.status })
              setpopup(true)
            }}
          />
        </div>),
      cellStyle: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", gap: '10px', padding: 0, }
    },

    {
      field: 'action',
      render: (_: any, item: any) => (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center", gap: '20px' }}>
          <button onClick={() => { navigation(`/createreport?id=${item?.id}`); }} style={{
            width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000", display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <img src={EditIconn} alt="Edit Icon" width={32} height={32} />
          </button>
          <button onClick={() => {
            setischecked({ id: item.id, value: '', type: "delete" })
            setpopup(true)
          }} style={{
            width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000", display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <img src={deleteIcon} alt="Delete Icon" width={32} height={32} />
          </button>
          <button onClick={() => { navigation(`/brandanalysis?id=${item?.id}`); }}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", padding: 0, border: "0px solid transparent", backgroundColor: "rgba(226, 11, 24, 1)", width: '32px', height: '32px', borderRadius: '8px' }}>
            <VisibilityOutlined sx={{ color: '#FFF' }} />
          </button>
        </div>
      ),
      cellStyle: { padding: 0, border: "0px solid transparent", width: '50px', paddingLeft: '10px' }
    }

  ];

  const linkDetails = useMemo(() => [
    {
      label: 'Campaigns',
      url: '/campaigns',
    },

  ], []);

  const ErrorData = useMemo(
    () => ({
      img: NoDataImage,
      button: false,
      message: "No Campaigns listed"
    }),
    [
      // selectedCategory
    ]
  )

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };


  useEffect(() => {
    const startTime = performance.now();

    const fetchAndTrack = async () => {
      await onLoad()
      // const loadTime = performance.now() - startTime;
      // mixpanelEvents.onLoad(loadTime, 'Manage Tray');
    };
    fetchAndTrack();
    return () => {
      // const timeSpent = performance.now() - startTime;
      // mixpanelEvents.onUnload('Manage Tray', timeSpent);
    };
  }, [])

  const onLoad = () => {
    setLoader(true)
    apis.getMyCampaign()
      .then((response: any) => {
        setCurrentItems(response.data.data);
        setTableData(response.data.data);
        setLoader(false)
      })
      .catch((error: any) => {
        setLoader(false)
        setSnackbar({
          open: true,
          severity: 'error',
          message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : (error?.response?.data?.error || 'something went wrong!!')),
        });
        // mixpanelEvents.errorHandling({
        //   name: 'Manage Tray',
        //   msg: error?.response?.data?.error || error?.message
        // })
      });
  }

  if (!loader) {
    return (
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: 'rgb(250,250,250)', height: '90vh', overflowY: "scroll", overflowX: 'hidden' }}>
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
            alignItems: 'center',
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

          <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", paddingBottom: 10 }}>
            <div style={{ width: '98%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginTop: '10px', marginBottom: '10px', backgroundColor: '#FFF' }}>

              <ZoptsuUnderlineTitle
                fontSizeOnLargeScreen="35px"
                fontSizeOnMediumScreen="33px"
                fontSizeOnSmallScreen="33px"
                fontSizeOnExtraSmallScreen="33px"
                titleText={campaign ? 'Campaigns':"My Campaigns"}
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
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >

                <Button
                  sx={{
                    padding: '6px 8px',
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    background: '#E20B18',
                    width: '126px',
                    border: "none",
                    height: '40px',

                    '&:hover': {
                      backgroundColor: '#a9141d',
                      color: '#fff',
                    },
                  }}
                  onClick={() => { navigation("/createreport") }}
                >
                  <span style={{ marginRight: '8px' }}>+</span>Add Report
                </Button>

              </div>
            </div>
            <div style={{ borderColor: '#FFF', borderStyle: 'solid', borderWidth: '0px', width: '98%' }}>
              {currentItems?.length > 0 ? (<>
                <ReorderableReusableTable
                  columns={columns}
                  tableData={tableData
                    ?.filter((search: any) => (
                      search?.campaign_name?.toLowerCase().includes(query?.toLowerCase()))
                    )
                  }
                  setTableData={setTableData}
                  headers={headers}
                  handleChange={() => { }}
                />
              </>) : (
                <NoData ErrorData={ErrorData} />
              )}

            </div>
          </div>
        </Box>

        <Popup open={popup}
          setOpen={setpopup}
          text={"Are you sure you want to " + (ischecked.type == "publish" ? ischecked.value ? "UnPublish ?" : "Publish ?" : "") + (ischecked.type == "delete" ? "Delete?" : "")}
          heading={ischecked.type == "publish" ? "Publish" : ischecked.type == "delete" ? "Delete" : ""}
          handleYesAction={() => {
            if (ischecked.type === "publish") {
              onPublish();
            } else if (ischecked.type === "delete") {
              onDelete();
            }
          }}
          handleClose={() => { setpopup(false) }}
        />

      </Grid >
    );
  }
  else {
    return (
      <div className="centered-container">
        <div className="loader"></div>
      </div>
    )
  }
};

export default ManageCampaigns;
