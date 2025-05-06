import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Typography,
  MenuItem,
  InputAdornment,
  TextField,
  Modal,
  Snackbar,
  Menu,
} from '@mui/material';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import useDeviceType from '../../utils/DeviceType';
import { DeleteIcon, NoDataImage, SearchNormal } from '../../assets';
import ReusableTable from '../../Molecules/table-management/ReusableTable';
import { Close, VisibilityOutlined } from '@mui/icons-material';
import NoData from '../../error/NoData';
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router-dom';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import Apis from '../../services/apis';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
import PreviewIcon from '@mui/icons-material/Preview';

const Allforms = () => {
  const [loader, setLoader] = useState(false);
  const [sortAssets, setSortedAssets] = useState('All');
  const [search, setSearch] = useState('');
  const [assetFiltering, setAssetFiltering] = useState('All');
  const [selectedType, setSelectedType] = useState<any>();
  const [openPopup, setOpenPopup] = useState(false);


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const apis = new Apis();
  const navigation = useNavigate()
  const headers1 = [
    "Document Name",
    ...(sortAssets === "All" ? ["Document Type"] : []),
    "Asset Name",
    ...(sortAssets !== "Invoices" ? ["Opportunities"] : []),
    "Updated By",
    "Last Updated",
    "Actions"
  ];

  const [tableData, setTableData] = useState([]);
  const linkDetails = useMemo(() => {
    return [
      {
        label: 'Proposal Management',
        url: '',
      },
      {
        label: 'Forms',
        url: '',
      }
    ];
  }, []);

  const formatTimestamp = (dateString: any) => {
    if (!dateString) return 'NA';

    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    const formattedMonth = month.slice(0, 3);
    return `${formattedMonth}\n${day} ${year}`;
  };

  const columns: any = [
    {
      field: 'documentname', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
      render: (_: any, item: any) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: 'capitalize' }}>
          {item?.documentname || 'N/A'}
        </div>
      )
    },
    ...(sortAssets == "All" ? [{
      field: 'documenttype', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
      render: (_: any, item: any) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: 'capitalize' }}>
          {(item?.documenttype?.replace(/_/g, ' ') || 'N/A')}
        </div>
      )
    }] : []),
    {
      field: 'assetname', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
      render: (_: any, item: any) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: 'capitalize' }}>
          {item?.assetname || 'N/A'}
        </div>
      )
    },
    ...(sortAssets !== "Invoices" ? [{
      field: 'opportunities', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
      render: (_: any, item: any) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', textTransform: 'capitalize' }}>
          {item?.opportunities || 'N/A'}
        </div>
      )
    }] : []),

    {
      field: 'updatedby', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
      render: (_: any, item: any) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', }}>
          {item?.updatedby || 'N/A'}
        </div>
      )
    },
    {
      field: 'lastupdated',
      cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" },
      render: (_: any, item: any) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px' }}>
          {formatTimestamp(item?.lastupdated)}
        </div>
      )
    }
    ,
    {
      field: 'actions',
      render: (_: any, item: any) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", padding: 0, border: "0px solid transparent", borderRadius: '8px', gap: '10px', paddingRight: "10px" }}>
          <div onClick={() => {
            window.open(item?.doc_url)
          }}
            style={{
              width: '32px', height: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "rgba(226, 11, 24, 1)",
              borderRadius: '8px',
            }}>
            <PreviewIcon sx={{ color: '#FFF', cursor: "pointer", }} />
          </div>
          {(item?.documenttype?.toLowerCase() !== "proposal") ? (<div
            onClick={() => {
              downloadForm(item?.id, (item.documenttype + "_" + item.assetname)?.toLowerCase().replaceAll(" ", "_"), "pdf")
              // downloadForm(item?.id, (item.formtype + "_" + item.name)?.toLowerCase()?.replaceAll(" ", "_"))
            }}
            style={{
              width: '32px', height: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "rgba(226, 11, 24, 1)",
              borderRadius: '8px',
            }}>
            <CloudDownloadIcon sx={{ color: '#FFF', cursor: "pointer", }} />
          </div>) : (
            <React.Fragment>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>


                <div
                  onClick={handleClick}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  style={{
                    width: '32px', height: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "rgba(226, 11, 24, 1)",
                    borderRadius: '8px',
                  }}>
                  <CloudDownloadIcon sx={{ color: '#FFF', cursor: "pointer", }} />
                </div>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => {
                  downloadForm(item?.id, (item.documenttype + "_" + item.assetname)?.toLowerCase().replaceAll(" ", "_"), "pdf")
                }}>
                  <div style={{
                    width: '20px', height: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "rgba(226, 11, 24, 1)",
                    borderRadius: '8px',
                  }} >
                    <PictureAsPdfIcon sx={{ color: '#FFF', cursor: "pointer", width: '15px', height: '15px', }} />
                  </div>
                  <Typography id="modal-title" variant="h6" component="h2" sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "24px",
                    paddingLeft: '5px'
                  }}>
                    PDF
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  downloadForm(item?.id, (item.documenttype + "_" + item.assetname)?.toLowerCase().replaceAll(" ", "_"), "docx")
                }}>
                  <div style={{
                    width: '20px', height: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "rgba(226, 11, 24, 1)",
                    borderRadius: '8px',
                  }} >
                    <DescriptionIcon sx={{ color: '#FFF', cursor: "pointer", width: '15px', height: '15px', }} />
                  </div>
                  <Typography id="modal-title" variant="h6" component="h2" sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "24px",
                    paddingLeft: '5px'
                  }}>
                    DOCX
                  </Typography>
                </MenuItem>

              </Menu>
            </React.Fragment>
          )}
          <div
            onClick={() => { navigation(`/form?id=${item?.id}`) }}
            style={{
              width: '32px', height: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "rgba(226, 11, 24, 1)",
              borderRadius: '8px',
            }}>
            <VisibilityOutlined sx={{ color: '#FFF', cursor: "pointer", }} />
          </div>


          <div style={{
            width: '32px', height: '32px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            <img
              onClick={() => { setOpenPopup(true); setSelectedType(item) }}
              src={DeleteIcon}
              style={{
                cursor: "pointer", opacity: 1
              }} alt="Delete Icon" width={32} height={32} />
          </div>

        </div>
      ),
      cellStyle: { padding: 0, border: "0px solid transparent", width: '50px', paddingLeft: '10px' }
    }

  ];
  const deviceType = useDeviceType();
  const ErrorData = useMemo(
    () => ({
      img: NoDataImage,
      button: false,
      message: 'No assets found',
    }),
    []
  );



  useEffect(() => {
    const startTime = performance.now();
    const fetchAndTrack = async () => {
      await fetchProposalForms()
      const loadTime = performance.now() - startTime;
      mixpanelEvents.onLoad(loadTime, 'Forms');
    };
    fetchAndTrack();
    return () => {
      const timeSpent = performance.now() - startTime;
      mixpanelEvents.onUnload('Forms', timeSpent);
    };
  }, [])



  const fetchProposalForms = async () => {
    setLoader(true)
    try {
      const response = await apis.getForms();
      let arr: any = [];

      response?.data?.data.map((item: any, index: any) => {
        arr.push(
          {
            "id": item?.id,
            "documenttype": item?.form_type,
            "assetname": item?.form_type?.toLowerCase() == "proposal" ? item?.form?.details?.find((detail: any) => detail.field === 'Asset Name')?.value : item?.form?.asset_name,
            "opportunities": item?.form_type?.toLowerCase() == "proposal" ? item?.form?.indicative_opportunity_details[0]?.field : item?.form_type == "invoice" ? item?.form?.opportunities[0]?.opportunity_details : item?.form?.opportunities || "N/A",
            "updatedby": item?.updated_by_user?.name,
            "lastupdated": item?.updated_at,
            "doc_url": item?.file_url,
            "documentname": item?.name
          }
        )
      })
      arr.sort((a: any, b: any) => new Date(b.lastupdated).getTime() - new Date(a.lastupdated).getTime());
      setTableData(arr);
      setLoader(false)
    } catch (error: any) {
      console.error("Error fetching proposals:", error);
      mixpanelEvents.errorHandling({
        name: 'Forms',
        msg: error?.response?.data?.error || error?.message
      })
      setLoader(false)
    }
  };


  const deleteForms = async (id: any) => {
    setLoader(true)
    try {
      const response = await apis.deleteForms(id);
      if (response?.data?.status?.toLowerCase() == "success") {
        setOpenPopup(false)
        fetchProposalForms()
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'Successfully Deleted',
        })
      }

      setLoader(false)
    } catch (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Something went wrong..!',
      })
      setLoader(false)
    }
  };



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
      color: '#828282',
      fontSize: deviceType == "mobile" ? "15px" : '16px',
      fontFamily: 'Inter',
      fontWeight: 600,
      cursor: "pointer"
    }
  };

  const handleChangeTable = (event: any, item: any) => {
    const newRole = event.target.value;
    const newData: any = tableData.map((dataItem: any) =>
      dataItem.name === item.name ? { ...dataItem, role: newRole } : dataItem
    );
    setTableData(newData);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: "#FFF",
    border: '0px solid #000',
    borderRadius: '8px',
    divShadow: 24,
    padding: "0px",
    fontFamily: 'Inter'
  };

  const downloadForm = async (id: any, name: any, type: any) => {
    setLoader(true);
    handleClose()
    await apis.downloadForms(id, type)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = name || "file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setSnackbar({
          open: true,
          severity: 'success',
          message: "Downloded Successfully"
        });
        setLoader(false);
      })
      .catch(error => {
        console.error('Error downloading file:', error)
        setLoader(false);
        setSnackbar({
          open: true,
          severity: 'error',
          message: error
        });
      });
  };

  if (loader) {
    return (
      <div className="centered-container">
        <div className="loader"></div>
      </div>
    )
  } else {
    return (
      <div style={{ height: '100%', width: '100%' }}>
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
        {/* <img src="https://www.nopcommerce.com/images/thumbs/0005720_coming-soon-page_550.jpeg" style={{width:'200px'}}/> */}
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

          <div
            style={{
              width: '100%',
              padding: "10px",

              marginBottom: '10px'
            }}
          >

            <div
              style={{
                padding: '14px 10px 14px 10px',
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
                  flexWrap: "wrap"
                }}
              >
                <ZoptsuUnderlineTitle
                  fontSizeOnLargeScreen="35px"
                  fontSizeOnMediumScreen="33px"
                  fontSizeOnSmallScreen="33px"
                  fontSizeOnExtraSmallScreen="33px"
                  titleText={'All Documents'}
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



                {(deviceType == "mobile") && (<div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

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
                    onChange={(event: any) => { setSearch(event?.target.value) }}
                    value={search}
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
                      '& .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input': {

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

                  <Button
                    sx={{
                      padding: '6px 8px',
                      color: '#FFF',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      background: '#E20B18',
                      width: '180px',
                      border: "none",
                      height: '40px',

                      '&:hover': {
                        backgroundColor: '#a9141d',
                        color: '#fff',
                      },
                    }}
                    onClick={() => { navigation(`/form`) }}
                  >
                    <span style={{ marginRight: '8px' }}>+</span>Create Document
                  </Button>



                </div>


              </div>



              <div style={{ width: deviceType == "mobile" ? "100%" : "auto", flexDirection: 'row', display: 'flex', justifyContent: deviceType == "mobile" ? 'flex-start' : "flex-start", scrollbarWidth: 'none', borderBottom: '2px solid rgba(224, 224, 224, 1)', gap: '10px', marginTop: '10px', marginBottom: '20px', overflowX: "scroll", overflowY: 'hidden', }}>
                <div style={sortAssets == "All" ?
                  sortingStyles.tabButton : sortingStyles.tabButtonInactive
                } onClick={() => {
                  setSortedAssets("All")
                  setAssetFiltering("")
                }}>All</div>
                <div style={sortAssets == "Proposals" ?
                  sortingStyles.tabButton : sortingStyles.tabButtonInactive
                } onClick={() => {
                  setSortedAssets("Proposals")
                  setAssetFiltering("proposal")

                }}>Proposals</div>
                <div style={sortAssets == "Invoices" ?
                  sortingStyles.tabButton : sortingStyles.tabButtonInactive
                } onClick={() => {
                  setSortedAssets("Invoices")
                  setAssetFiltering("invoice")
                }}>Invoices</div>
                <div style={sortAssets == "Deliverables Sheet" ?
                  sortingStyles.tabButton : sortingStyles.tabButtonInactive
                } onClick={() => {
                  setSortedAssets("Deliverables Sheet")
                  setAssetFiltering("deliverable_sheet")
                }}>Deliverables Sheet</div>



              </div>

              {loader && (
                <div className="centered-container">
                  <div className="loader"></div>
                </div>
              )}

            </div>
            {
              !loader && (
                <>
                  {
                    tableData?.length > 0 ? (
                      <>

                        <ReusableTable
                          columns={columns}
                          tableData={sortAssets == "All" ? tableData : tableData?.filter((item: any, index) => item?.documenttype?.toLowerCase() == assetFiltering?.toLowerCase())}
                          setTableData={setTableData}
                          headers={headers1}
                          search={search}
                          sortingColumn={0}
                          handleChange={handleChangeTable}
                        />
                      </>
                    ) : (
                      <NoData ErrorData={ErrorData} />

                    )}
                </>
              )}
          </div>
        </div>
        <Modal
          open={openPopup}
          onClose={() => { setOpenPopup(false) }}
        >
          <Box sx={style}>
            <Box
              sx={{
                width: "100%",
                height: '56px',
                padding: "16px ",
                gap: "0px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                borderColor: "rgba(224, 224, 224, 1)",
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Typography id="modal-title" variant="h6" component="h2" sx={{
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
                textAlign: "left",
              }}>


                Delete
              </Typography>

              <button style={{ backgroundColor: 'transparent', border: '0px solid transparent', fontSize: '16px', cursor: 'pointer' }} onClick={() => setOpenPopup(false)}>X</button>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: '100px',
                padding: "16px ",
                gap: "0px",
                border: "0px 0px 1px 0px",
                borderColor: "rgba(224, 224, 224, 1)",
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >

              <Typography id="modal-description" sx={{
                mt: 1,
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: "30px",
                textAlign: "center",
                wordBreak: "break-word",
                maxWidth: "300px",
              }}>
                Are you sure you want delete <span style={{ textTransform: 'capitalize' }}>{selectedType?.documenttype?.replace(/_/g, ' ')}</span> ?
              </Typography>

            </Box>

            <Box
              sx={{
                width: "100%",
                padding: "16px ",
                gap: "0px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                borderColor: "rgba(224, 224, 224, 1)",
                justifyContent: 'space-evenly',
                alignItems: 'flex-start',
                display: 'flex',
                flexDirection: 'row',
                boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.07)",

              }}
            >
              <Button onClick={() => { setOpenPopup(false) }} sx={{
                mr: 1,
                padding: '12px, 16px, 12px, 16px',
                width: '200px',
                border: "1px solid rgba(189, 189, 189, 1)",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "21px",
                color: 'rgba(130, 130, 130, 1)'
              }}>
                No
              </Button>
              <Button onClick={() => { deleteForms(selectedType?.id) }} sx={{
                color: "#FFF",
                padding: '12px, 16px, 12px, 16px', width: '200px', backgroundColor: "rgba(226, 11, 24, 1)",
                border: "0px solid rgba(189, 189, 189, 1)",
                fontSize: "14px",
                fontWeight: 600,
                ':hover': {
                  backgroundColor: "rgba(226, 11, 24, 0.6)",
                }
              }}>
                Yes, I Want
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    )
  }
}

export default Allforms
