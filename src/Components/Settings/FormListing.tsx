import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, InputAdornment, MenuItem, Paper, Select, Snackbar, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { EditIconn, NoDataImage, SearchNormal } from '../../assets';
import { FormIcon } from '../../assets';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import { useNavigate } from 'react-router';
import ZupotsuTable from '../../Atoms/zupotsu-table/zupotsuTable';
import { TablePaginationProps } from '../../Atoms/table/table-pagination';
import NoData from '../../error/NoData';
import Apis from '../../services/apis';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Loader from '../../loader/Loader';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';

type FormAttribute = {
  attribute_priority: number;
};

const FormListing: React.FC = () => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
    navigation("/form_listing");
  };
  const [searchValue, setSearchValue] = useState<string>('');
  const isSearched = useRef<boolean>(false);
  const headers = ['Form Name', 'Asset Type', 'Sport Type', 'Sport', 'Created By', 'Created on', 'Publish', 'Actions'];
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({
    key: headers[0].replace(/ /g, ''), // Default sorting key
    direction: 'asc', // Default sorting direction
  });
  const [paginationData, setPaginationData] = useState<TablePaginationProps>({
    page: 1,
    size: 10,
    pageOptions: [10, 20, 50, 100],
    selectedPageOption: 10,
    totalCount: 0,
    onChangeRowsPerPage: () => { },
  });
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const navigation = useNavigate()
  const handleSearchValue = async (value: string) => {
    isSearched.current = true;
    setSearchValue(value);
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const [isChecked, setIsChecked] = useState<boolean>(true); // Initial state matches defaultChecked

  const handleChangeSwitch = (event: any) => {
    setIsChecked(event.target.checked);
    // Perform any other actions you need when the switch is toggled
  };


  const onChangeRowsPerPage = (event: any) => {
    setPaginationData(prevData => ({ ...prevData, selectedPageOption: event?.target?.value, size: event?.target?.value, page: 1 }));
  };

  const onPageChange = (pageNo: number) => {
    setPaginationData(prevData => ({ ...prevData, page: pageNo }));
  };

  const handleIconClicked = (key: string, tableData: any) => {

  };




  const headStyles: React.CSSProperties = {
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

  const inputStyles: React.CSSProperties = {
    flexDirection: 'row',
    margin: 'auto',
    padding: '15px',
    borderStyle: 'solid',
    fontFamily: 'Inter',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '14px',
    letterSpacing: '-0.3333333432674408px',
    textAlign: 'center',
    justifyContent: 'center',
  };

  // const sortedAttributes = [...formAttributes].sort((a: FormAttribute, b: FormAttribute) => a.attribute_priority - b.attribute_priority);

  const linkDetails = useMemo(() => [
    {
      label: 'Settings',
      url: '/settings',
    },
    {
      label: 'Forms',
      url: '/form_listing',
    },
  ], []);

  const handleMouseLeave = () => setIsHovered(null);

  const ErrorData = useMemo(
    () => ({
      img: NoDataImage,
      button: false,
      message: "No form listed"
    }),
    [
      // selectedCategory
    ]
  )

  const apis = new Apis();

  const [currentItems, setcurrentItems] = useState([])
  const [allForms, setallForms] = useState([])
  const [load, setLoad] = useState(false)
  const navigateToListAnAsset = () => { navigation("/form_creation") };


  const sortedItems = useMemo(() => {
    let sortedArray = [...currentItems];
    if (sortConfig !== null) {
      sortedArray.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedArray;
  }, [currentItems, sortConfig]);

  // const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  // const paginatedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  const [hoveredRow, setHoveredRow] = useState(null);


  useEffect(() => {
    const startTime = performance.now();

    const fetchAndTrack = async () => {
      await onload()
      const loadTime = performance.now() - startTime;
      mixpanelEvents.onLoad(loadTime, 'All Form Page');
    };
    fetchAndTrack();
    return () => {
      const timeSpent = performance.now() - startTime;
      mixpanelEvents.onUnload('All Form Page', timeSpent);
    };
  }, [])


  function onload() {
    setLoad(true)
    apis.getAllForms()
      .then((response) => {
        response.data.data.sort((a: any, b: any) => a.id - b.id);
        setcurrentItems(response?.data?.data)
        setallForms(response?.data?.data)
        setLoad(false)
      })
      .catch((error) => {
        setLoad(false)
        mixpanelEvents.errorHandling({
          name: 'All Form Page',
          msg: error?.response?.data?.error || error?.message
        })
      });
  }


  const onRowDoubleClick = () => {
    navigation("/previewform")
  };

  const [query, setQuery] = useState('');

  const handleSearch = (event: any) => {
    setLoad(true)
    const value = event.target.value;
    setQuery(value);
    // if (value) {
    //   let arr = allForms.filter((item: any) => { return (item.name.toLowerCase().includes(value.toLowerCase())) })
    //   setcurrentItems(arr)
    // }
    // else {
    //   setcurrentItems(allForms)
    // }
    setLoad(false)
  };

  if (load) {
    return (
      <div className="centered-container">
          <div className="loader"></div>
      </div>
  )
  }
  else {
    return (
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: 'rgb(250,250,250)',height:'90vh',overflowY:"scroll",overflowX:'hidden' }}>
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
              {/* <div style={{ width: '20%' }}> */}
              <ZoptsuUnderlineTitle
                  fontSizeOnLargeScreen="35px"
                  fontSizeOnMediumScreen="33px"
                  fontSizeOnSmallScreen="33px"
                  fontSizeOnExtraSmallScreen="33px"
                  titleText={'Onboarding Forms'}
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
                    variant="outlined"
                    placeholder="Search..."
                    value={query}
                    onChange={handleSearch} 
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
                      maxWidth: '200px',
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
                    style={{ width: '300px' }} // Adjust width as needed
                  />


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
                      width: '180px',
                      border: "none",
                      height: '40px',

                      '&:hover': {
                        backgroundColor: '#a9141d', // Replace this with the hover color code
                        color: '#fff',
                      },

                    }}
                    // className={classes.button}
                    onClick={navigateToListAnAsset}
                  >
                    <span style={{ marginRight: '8px' }}>+</span>Add New Form
                  </Button>
                </div>


              </div>
            </div>




            <div style={{ borderColor: '#FFF', borderStyle: 'solid', borderWidth: '0px', width: '98%' }}>



              {currentItems?.length > 0 ? (
                <ZupotsuTable
                  formIcon={FormIcon}
                  headers={headers}
                  data={currentItems}
                  query={query}
                  onRowDoubleClick={onRowDoubleClick}
                  hoveredRow={hoveredRow}
                  setHoveredRow={setHoveredRow}
                  handleMouseLeave={handleMouseLeave}
                  onRefresh={onload}
                />
              ) : (
                <NoData ErrorData={ErrorData} />
              )}

            </div>
          </div>
        </Box>
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
      </Grid>
    );
  }

};

export default FormListing;
