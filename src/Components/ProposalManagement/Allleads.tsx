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
  Modal,
} from '@mui/material';
import React, { useMemo, useState } from 'react'
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
import { Close, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
const Allleads = () => {

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const [loader, setLoader] = useState(false);
  const headers = ["Name", "Email", "Organisation", "Phone", "Asset", "Sport", "View"];
  const [sortAssets, setSelectedSport] = useState('All');
  const [assetFiltering, setAssetFiltering] = useState('All');
  const [hoveredRow, setHoveredRow] = useState(null);
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const [searchValue, setSearchValue] = useState('');
  const deviceType = useDeviceType();
  const ErrorData = useMemo(
    () => ({
      img: NoDataImage,
      button: false,
      message: 'No assets found',
    }),
    []
  );


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
      // color: 'rgba(130, 130, 130, 1)',
      color: 'rgba(226, 11, 24, 1)',
      fontSize: deviceType == "mobile" ? "15px" : '16px',
      fontFamily: 'Inter',
      fontWeight: 500,
      cursor: "pointer"
    }
  };

  const filteredAssets: any = []

  const StyledSelectButton = styled('div')(({ }) => {

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
  const headStyles = {
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
  const linkDetails = useMemo(() => {
    return [
      {
        label: 'Proposal Management',
        url: '',
      },
      {
        label: 'RFP',
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
  const currentItems: any[] = [
    {
      id: 1,
      name: "Alex",
      email: "alex@gmailcom",
      org: "XYZ PVT LIMITED",
      phone: "9632587410",
      assetType: 'Athlete',
      sport: 'Cricket',
      action: true,
      req: "Alex Johnson is an aspiring competitive swimmer currently training for the national championships. To achieve their goal of qualifying for the upcoming international meet, several key requirements must be fulfilled.Firstly, Alex requires a comprehensive training program that includes rigorous swimming sessions focusing on stroke technique, speed, and endurance. This program should be complemented by strength conditioning and flexibility exercises to enhance overall performance. Access to a state-of-the-art swimming pool and gym facilities is essential, along with specialized swim coaching to refine technique and strategy.",
      doc: "http://example/assets/sample.pdf"
    },
    {
      id: 2,
      name: "Arun",
      email: "arun@gmailcom",
      org: "QWERTY PVT LIMITED",
      phone: "9632587410",
      assetType: 'Team',
      sport: 'Tennis',
      action: true,
      req: "Alex Johnson is an aspiring competitive swimmer currently training for the national championships. To achieve their goal of qualifying for the upcoming international meet, several key requirements must be fulfilled.Firstly, Alex requires a comprehensive training program that includes rigorous swimming sessions focusing on stroke technique, speed, and endurance. This program should be complemented by strength conditioning and flexibility exercises to enhance overall performance. Access to a state-of-the-art swimming pool and gym facilities is essential, along with specialized swim coaching to refine technique and strategy.",
      doc: "http://example/assets/sample.pdf"
    },
    {
      id: 3,
      name: "Xavier",
      email: "xavier@gmailcom",
      org: "ABC PVT LIMITED",
      phone: "9632587410",
      assetType: 'Athlete',
      sport: 'Cricket',
      action: true,
      req: "Alex Johnson is an aspiring competitive swimmer currently training for the national championships. To achieve their goal of qualifying for the upcoming international meet, several key requirements must be fulfilled.Firstly, Alex requires a comprehensive training program that includes rigorous swimming sessions focusing on stroke technique, speed, and endurance. This program should be complemented by strength conditioning and flexibility exercises to enhance overall performance. Access to a state-of-the-art swimming pool and gym facilities is essential, along with specialized swim coaching to refine technique and strategy.",
      doc: "http://example/assets/sample.pdf"
    },
  ];
  const [tableData, setTableData] = useState(currentItems || []);
  const [isDialog, setisDialog] = useState(false);
  const [sellead, setsellead] = useState<any>('');



  const handleInputChangeFun = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
  };
  const navigation = useNavigate()

  const columns: any = [

    { field: 'name', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'email', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'org', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'phone', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'assetType', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'sport', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    {
      field: 'action',
      render: (_: any, item: any) => (

        <div onClick={() => { setisDialog(true); setsellead(item); }}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", padding: 0, border: "0px solid transparent", backgroundColor: "rgba(226, 11, 24, 1)", width: '32px', height: '32px', borderRadius: '8px' }}>
          <VisibilityOutlined sx={{ color: '#FFF' }} />
        </div>
      ),
      cellStyle: { padding: 0, border: "0px solid transparent", width: '50px', paddingLeft: '10px' }
    }

  ];


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
            <Typography
              sx={{
                color: '#333',
                fontFamily: 'Inter',
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: '22px',
              }}
            >
              All Leads
            </Typography>



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



            </div>


          </div>



          <div style={{ width: deviceType == "mobile" ? "100%" : "auto", flexDirection: 'row', display: 'flex', justifyContent: deviceType == "mobile" ? 'flex-start' : "flex-start", scrollbarWidth: 'none', borderBottom: '2px solid rgba(224, 224, 224, 1)', gap: '10px', marginTop: '10px', marginBottom: '20px', overflowX: "scroll", overflowY: 'hidden', }}>
            <div style={sortAssets == "All" ?
              sortingStyles.tabButton : sortingStyles.tabButtonInactive
            } onClick={() => {
              setSelectedSport('All');
              setAssetFiltering("")
            }}>All</div>
            <div style={sortAssets == "Assets" ?
              sortingStyles.tabButton : sortingStyles.tabButtonInactive
            } onClick={() => {
              setSelectedSport('Assets');
              setAssetFiltering("Assets")
            }}>Assets</div>

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
                currentItems?.length > 0 ? (
                  <>

                    <ReusableTable
                      columns={columns}
                      tableData={tableData}
                      setTableData={setTableData}
                      headers={headers}
                      search={''}
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

      <Modal
        open={isDialog}
        onClose={() => { setisDialog(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "40%",
          bgcolor: 'background.paper',
          border: '0px solid #000',
          boxShadow: 8,
          borderRadius: 5,
          p: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
          paddingBottom: '50px'
        }}>
          <Box sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            padding: '10px'
          }} >
            <Box sx={{
              width: "100%",
              height: "auto",
              display: 'flex',
              flexDirection: "row",
              padding: "16px",
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
              justifyContent: "space-between",
            }} >
              <p style={{
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: "21px",
                textAlign: "left",
                padding: 0,
                margin: 0,
                color: "rgba(51, 51, 51, 1)"
              }}>
                Lead Details
              </p>

              <Close
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => { setisDialog(false) }}
              />
            </Box>





          </Box>

          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: '10px',
            padding: "8px 16px 8px 16px",
          }} >
            <div style={{ marginTop: '10px', display: 'flex' }}>
              <div>
                <Typography
                  sx={{
                    color: '#333',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '22px',
                  }}
                >
                  Name
                </Typography>
                <Typography
                  sx={{
                    color: '#333',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    marginTop: '10px'
                  }}
                >
                  {sellead?.name}
                </Typography>
              </div>
              <div style={{ marginLeft: '100px' }}>
                <Typography
                  sx={{
                    color: '#333',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '22px',
                  }}
                >
                  Organisation
                </Typography>
                <Typography
                  sx={{
                    color: '#333',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    marginTop: '10px'
                  }}
                >
                  {sellead?.org}
                </Typography>
              </div>
            </div>

            <div style={{ marginTop: '10px', display: 'flex' }}>
              <div>
                <Typography
                  sx={{
                    color: '#333',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '22px',
                  }}
                >
                  Phone
                </Typography>
                <Typography
                  sx={{
                    color: '#333',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    marginTop: '10px'
                  }}
                >
                  {sellead?.phone}
                </Typography>
              </div>
              <div style={{ marginLeft: '70px' }}>
                <Typography
                  sx={{
                    color: '#333',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '22px',
                  }}
                >
                  Asset Type
                </Typography>
                <Typography
                  sx={{
                    color: '#333',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    marginTop: '10px'
                  }}
                >
                  {sellead?.assetType}
                </Typography>
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <Typography
                sx={{
                  color: '#333',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: '22px',
                }}
              >
                Requirement
              </Typography>
              <Typography
                sx={{
                  color: '#333',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  marginTop: '10px'
                }}
              >
                {sellead?.req}
              </Typography>
            </div>
            <div style={{ marginTop: '10px' }}>
              <Typography
                sx={{
                  color: '#333',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: '22px',
                }}
              >
                Attached Document
              </Typography>
              <Typography
                sx={{
                  color: '#333',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  marginTop: '10px'
                }}
              >
                Download
              </Typography>
            </div>
          </Box>


        </Box>
      </Modal>

    </div>
  )
}

export default Allleads
