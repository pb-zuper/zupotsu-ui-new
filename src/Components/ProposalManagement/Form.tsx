import React, { useEffect, useMemo, useState } from 'react'
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import CreateInvoice from './CreateInvoice';
import CreateProposal from './CreateProposal';
import CreateDeliverablesSheet from './CreateDeliverablesSheet';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import { arrowLeft, copy, eastWhiteArrow } from '../../assets';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useDeviceType from '../../utils/DeviceType';
import Apis from '../../services/apis';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
const Form = ({ sidebarOpen }: any) => {
  const [typeofForm, setTypeofForm] = useState("");
  const [formname, setFormName] = useState("");
  const [allFormNames, setAllFormNames] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any>([]);
  const [allproposals, setAllProposals] = useState<any>([]);
  const [proposals, setProposals] = useState("");
  const [assetNames, setAssetNames] = useState([]);
  const [forms, setForms] = useState({});
  const apis = new Apis();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [proposalId, setProposalId] = useState<any>()
  const [currency, setCurrency] = useState<any>("INR")
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const linkDetails = useMemo(() => {
    return [
      {
        label: 'Proposal Management',
        url: '',
      },
      {
        label: 'All Documents',
        url: '/allforms',
      },
      {
        label: !id?'Create New Document':'Edit Document',
        url: '',
      }
    ];
  }, []);

  useEffect(() => {
    const startTime = performance.now();

    const fetchAndTrack = async () => {
      setLoader(true);
      try {
        if (id) {
          await fetchProposalsById();
        }
        if (!id) {
          await fetchProposalForms();
        }
        await fetchProposals();
        const loadTime = performance.now() - startTime;
        // mixpanelEvents.onLoad(loadTime, 'Proposal Requests');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchAndTrack();

    return () => {
      const timeSpent = performance.now() - startTime;
      // mixpanelEvents.onUnload('Proposal Requests', timeSpent);
    };
  }, [id]);

  const fetchProposals = async () => {
    try {
      const response = await apis.getAllProposals();
      const proposalsData = response?.data?.data || [];

      const assetNames = proposalsData.map((item: any) => item?.asset?.asset_detail[0]?.name || "");
      setAssetNames(assetNames);
      proposalsData.sort(function(a:any, b:any) {
        return b.id - a.id;
    });
      setAllProposals(proposalsData);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };

  const fetchProposalsById = async () => {
    try {
      const response = await apis.getFormsById(id);
      const data = response?.data?.data;

      if (data) {
        setTypeofForm(data.form_type);
        setFormName(data.name);
        setForms(data.form);
        setProposalId(data.proposal_id);
      }
    } catch (error) {
      console.error("Error fetching proposals by ID:", error);
    }
  };

  const fetchProposalForms = async () => {
    setLoader(true)
    try {
      const response = await apis.getForms();
      let arr: any = [];
      response?.data?.data.map((item: any, index: any) => {
        arr.push(
          item?.name
        )
      })
      setAllFormNames(arr)
      setLoader(false)
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setLoader(false)
    }
  };

  useEffect(() => {
    if (proposalId && allproposals.length > 0) {
      setLoader(true)
      const filteredProposal = allproposals.find((item: any) => item.id === proposalId);
      const assetName = filteredProposal?.asset?.asset_detail?.[0]?.name || "";
      setProposals(assetName);
      setSelectedProposal(filteredProposal)
      setLoader(false)
    }

  }, [proposalId, allproposals]);

  // console.log("selectedProposal:", selectedProposal);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    },
  };


  const existingFormNames = allFormNames?.some(
    (name: any) => name.replace(/\s+/g, '') === formname.replace(/\s+/g, '')
  );


  if (loader) {
    return (
      <div className="centered-container">
        <div className="loader"></div>
      </div>
    )
  }
  else {
    return (
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', width: '100%', overflow: 'hidden', height: "90vh", }}>
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

        <Grid xs={12} md={12} lg={12} width={"100%"} height={'100%'} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: "flex-start", backgroundColor: 'rgba(250,250,250,1)', gap: '0px', overflowY: "scroll", scrollbarWidth: 'none', }}>

          <div style={{ margin: '20px' }}>
            <ZoptsuUnderlineTitle
              fontSizeOnLargeScreen="35px"
              fontSizeOnMediumScreen="33px"
              fontSizeOnSmallScreen="33px"
              fontSizeOnExtraSmallScreen="33px"
              titleText={!id ? 'Create New Document' : 'Edit Document'}
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
          </div>

          <Grid xs={12} md={12} lg={12} width={"100%"} spacing={2} sx={{ display: "flex", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center", width: '98%', backgroundColor: '#FFF', marginLeft: '10px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                backgroundColor: '#FFF',
                margin: "10px",
                width: '50%',
                alignItems: 'center',
              }}
            >
              <ZupotsuDropdown
                title="Document Type"
                placeholder={"Select Document Type"}
                value={typeofForm}
                dropdownData={[
                  "Invoice",
                  "Deliverable_sheet",
                  "Proposal"
                ]}
                isRequired={true}
                previewMode={id ? true : false}
                name={"typeofform"}
                handleChange={(event: any) => {
                  setTypeofForm(event.target.value)
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                backgroundColor: '#FFF',
                margin: "10px",
                width: '50%',
                alignItems: 'flex-start',
              }}
            >


              <Typography
                style={{
                  marginBottom: '10px',
                  color: 'var(--Gray-1, #333)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  lineHeight: '140%',
                  display: 'flex',
                  flexDirection: 'column',
                  fontWeight: '600'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      fontStyle: 'Inter',
                      fontWeight: '600',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        lineHeight: "21px",
                        fontStyle: 'Inter',
                        fontWeight: '700',
                      }}
                    >{"Select Deal"}</span>

                    <span
                      style={{
                        color: 'var(--Zupotso-Primary, #E20B18)',
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

                </div>

              </Typography>

              <FormControl fullWidth>
                <Select
                  sx={{
                    borderRadius: '5px',
                    width: 'auto',
                    textAlign: 'left',
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={proposalId || ""}
                  disabled={!!id}
                  MenuProps={MenuProps}
                  displayEmpty
                  inputProps={{
                    'aria-label': 'Without label',
                  }}
                  size="small"
                  onChange={(event) => {
                    setLoader(true);
                    // setProposals("");
                    setProposalId(event.target.value)
                    // setTimeout(() => {
                    //   const selectedValue: any = event.target.value;
                    //   setProposals(selectedValue);
                    //   setLoader(false);
                    // }, 1000);
                  }}
                  IconComponent={() => (
                    <KeyboardArrowDownIcon
                      sx={{
                        cursor: 'pointer',
                        color: '#333',
                        pointerEvents: 'none',
                        position: 'absolute',
                        right: '10px',
                      }}
                    />
                  )}
                >
                  <MenuItem value=""
                    onClick={() => {
                      setTimeout(() => {
                        setLoader(false);
                      }, 1000);

                    }}
                  >
                    <span
                      style={{
                        color: 'var(--Gray-3, #828282)',
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '140%',
                      }}
                    >
                      {"Select Deal"}
                    </span>
                  </MenuItem>
                  {allproposals?.map((data: any) => (
                    <MenuItem
                      onClick={() => {
                        setLoader(true);
                        setTimeout(() => {
                          setSelectedProposal(data);
                          setLoader(false);
                        }, 1000);

                      }}
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        whiteSpace: 'normal',
                        width: '90%',
                        '&:hover': {
                          background: "pink",
                          color: '#E20B18',
                        },
                      }}
                      key={data?.id}
                      value={data?.id}
                    >
                      {data?.id} - {data.asset.asset_detail[0].name} - {data.buyer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Box>
          </Grid>
          <Grid xs={12} md={12} lg={12} width={"100%"} spacing={2} sx={{ display: "flex", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center", width: '98%', backgroundColor: '#FFF', marginLeft: '10px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                backgroundColor: '#FFF',
                margin: "10px",
                width: '50%',
                alignItems: 'center',
              }}
            >
              <ZupotsuTextfield
                title="Document Name"
                placeholder={"Enter Document name"}
                value={formname}
                previewMode={id ? true : false}
                name={"name"}
                isRequired={true}
                handleChange={(event: any) => {
                  setFormName(event.target.value)
                }}
                errorMessage={existingFormNames ? "Document name already exist" : ""}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                backgroundColor: '#FFF',
                margin: "10px",
                width: '50%',
                alignItems: 'center',
              }}
            >
              <ZupotsuDropdown
                title="Select Currency"
                placeholder={"Select Currency"}
                value={currency}
                dropdownData={[
                  "EUR",
                  "USD",
                  "INR"
                ]}
                isRequired={true}
                previewMode={id ? true : false}
                name={"currency"}
                handleChange={(event: any) => {
                  setCurrency(event.target.value)
                }}
              />
            </Box>
          </Grid>
          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: '10px',
            paddingTop: '5px',
            paddingBottom: '7%'
          }}>
            {((typeofForm?.trim()?.toLowerCase() == "invoice" && (id || proposals))) ? (
              <CreateInvoice
                item={selectedProposal}
                forms={forms}
                formname={formname}
                sidebarOpen={sidebarOpen}
                allproposals={allproposals}
                proposalId={proposalId}
                currency={currency}
                setCurrency={setCurrency}
                setProposalId={setProposalId}
                existingFormNames={existingFormNames}
                id={id}
              />) : (typeofForm?.trim()?.toLowerCase() == "proposal" && (id || proposals)) ? (
                <CreateProposal
                  item={selectedProposal}
                  forms={forms}
                  formname={formname}
                  sidebarOpen={sidebarOpen}
                  allproposals={allproposals}
                  proposalId={proposalId}
                  currency={currency}
                  setCurrency={setCurrency}
                  setProposalId={setProposalId}
                  existingFormNames={existingFormNames}
                  id={id}
                />) : (typeofForm?.trim()?.toLowerCase() == "deliverable_sheet" && (id || proposals)) ? (
                  <CreateDeliverablesSheet
                    item={selectedProposal}
                    forms={forms}
                    formname={formname}
                    sidebarOpen={sidebarOpen}
                    allproposals={allproposals}
                    proposalId={proposalId}
                    currency={currency}
                    setCurrency={setCurrency}
                    setProposalId={setProposalId}
                    existingFormNames={existingFormNames}
                    id={id}
                  />
                ) :
              (
                <div >

                </div>
              )}
          </Box>


        </Grid>


      </div>
    )
  }
}

export default Form
