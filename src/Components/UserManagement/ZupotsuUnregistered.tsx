import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Grid, InputAdornment, TextField, Typography, Table, FormControl, InputLabel, Modal } from '@mui/material';
import { ChangeRole, DisableUser, EditmenuIcon, EnableUser, FileImage, NoDataImage, RoundedTickMark, SearchNormal, TrashUser, VisibilityEye, fb1, instagramI } from '../../assets';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import { useNavigate } from 'react-router';
import NoData from '../../error/NoData';
import UserManagementTable from '../../Molecules/table-management/UserManagementTable';
import Apis from '../../services/apis';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
const ZupotsuUnregistered: React.FC = () => {
  const headers = ['Name', 'Email', 'Mobile No', 'Organisation',"Received Date"];
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [callApi, setCallApi] = useState(false)
  const apis = new Apis();


  useEffect(() => {
    const startTime = performance.now();
    const fetchAndTrack = async () => {
      await onLoad()
      const loadTime = performance.now() - startTime;
      mixpanelEvents.onLoad(loadTime, 'Unregistered Users Listing Page');
    };
    fetchAndTrack();
    return () => {
      const timeSpent = performance.now() - startTime;
      mixpanelEvents.onUnload('Unregistered Users Listing Page', timeSpent);
    };
  }, [callApi])


  const onLoad = () => {
    setLoader(true)
    apis.getEnquiry()
      .then((response: any) => {
        let arr: any = []
        response.data.data.map((item: any, index: any) => {
          if (!item?.user_id) {
            arr.push({
              id: item.id,
              name: item.name,
              email: item.email,
              mobile: item.mobile,
              organisation: item.organization,
              reg_date: item.created_at
            })
          }
        })
        setTableData(arr)
        setLoader(false)

      })
      .catch((error) => {
        mixpanelEvents.errorHandling({
          name: 'Unregistered Users Listing Page',
          msg: error?.response?.data?.error || error?.message
        })
        setLoader(false)
      });
  }


  const formatDateString = (dateString: any) => {
    if (!dateString) return 'NA';

    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    const formattedMonth = month.slice(0, 3);
    return `${formattedMonth}\n${day} ${year}`;
  };

  const columns: any = [

    { field: 'name', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'email', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'mobile', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'organisation', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    {
      field: 'Reg Date', render: (_: any, item: any) => (
        <div style={{
          fontFamily: "Inter",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "21px",
          textAlign: "left",
        }}>
          {item.reg_date?formatDateString(item.reg_date): "NA"}
        </div>
      ), cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" }
    },
  ];



  const handleChangeTable = (event: any, item: any) => {
    const newRole = event.target.value;
    const newData: any = tableData.map((dataItem: any) =>
      dataItem.name === item.name ? { ...dataItem, role: newRole } : dataItem
    );
    setTableData(newData);
  };
  const [tableData, setTableData] = useState([]);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });;



  const navigation = useNavigate();


  const linkDetails = useMemo(() => [
    {
      label: 'User Management',
      url: '/user_management',
    },
    {
      label: 'Zupotsu Unregistered',
      url: '/zupotsu_unregistered',
    },
  ], []);



  const ErrorData = useMemo(
    () => ({
      img: NoDataImage,
      button: false,
      message: "No Users Found"
    }),
    [
      // selectedCategory
    ]
  )


  const handleSort = (key: any) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setTableData(sortedData);
  };



   if (!loader) {
    return (
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: 'rgb(250,250,250)', height: '90vh', overflowY: "scroll", overflowX: 'hidden' }}>
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

          <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", paddingBottom: 10 }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginTop: '10px', marginBottom: '10px', backgroundColor: '#FFF' }}>
              {/* <div style={{ width: '20%' }}> */}
             
              <ZoptsuUnderlineTitle
                  fontSizeOnLargeScreen="35px"
                  fontSizeOnMediumScreen="33px"
                  fontSizeOnSmallScreen="33px"
                  fontSizeOnExtraSmallScreen="33px"
                  titleText={'Unregistered List'}
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
              {/* </div> */}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '20px',
                  // width: '70%',
                }}
              >
                <div style={{
                  padding: 0, margin: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: "8px"
                }}>

                  <TextField
                    placeholder="Search..."
                    sx={{
                      height: '40px',
                      '& .MuiFormControl-root': {
                        height: '40px',
                      },
                      '& .MuiTextField-root': {
                        height: '40px',
                      },
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                      '& .MuiOutlinedInput-root': {
                        height: '40px',
                        border: "0px solid none"
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: "0px solid none"
                      },

                      '& .MuiOutlinedInput': {
                        border: "0px solid none"
                      },
                      width: '200px',
                      backgroundColor: 'rgba(242, 242, 242, 1)',
                      border: "0px solid none",
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
                </div>


              </div>
            </div>




            <div style={{ borderColor: '#FFF', borderStyle: 'solid', borderWidth: '0px', width: '98%' }}>




              {tableData?.length > 0 ? (<>



                <UserManagementTable
                  columns={columns}
                  tableData={tableData}
                  setTableData={setTableData}
                  headers={headers}
                  handleChange={handleChangeTable}
                  search={""}
                />
              </>



              ) : (
                <NoData ErrorData={ErrorData} />
              )}

            </div>
          </div>
        </Box>

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

export default ZupotsuUnregistered;
