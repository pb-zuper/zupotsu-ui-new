import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Modal,
  TextField,
  Typography,
  InputAdornment,
  Snackbar
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Close, ArrowBack, } from '@mui/icons-material';
import ZupotsuTextfield from '../../Components/Settings/ZupotsuTextfield';
import ZupotsuDropdown from '../zupotsu-dropdown/zupotsu-dropdown';
import { addCircle, deleteIcon, documentUpload, TickCircleGreen } from '../../assets';
import ZupotsuButton from '../zupotsu-button/zupotsu-button';
import Apis from '../../services/apis';
import ZupotsuAutocomplete from '../zupotsu-textfields/zupotsu-autocomplete';
import useDeviceType from '../../utils/DeviceType';
import ZupotsuImgUpload from '../zupotsu-img-upload/zupotsu-img-upload';
import { useSearchParams } from 'react-router-dom';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';


export function ZoputsuGetInTouch3({ showZoputsuGetInTouchPopup, closePopup, oppr }: any) {

  const [uploadDocument, setUploadDocument] = React.useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [assetType, setAssetType] = useState("")
  const [organisationName, setOrganisationName] = useState('')
  const [firstName, setFirstName] = useState(localStorage.getItem("name") || "")
  const [emailAddress, setEmailAddress] = useState(localStorage.getItem("email") || "")
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("mobile") || "")
  const [sports, setSports] = useState('')
  const [aboutYourself, setAboutYourSelf] = useState('')
  const [selectedbuyer, setSelectedBuyer] = useState("")
  const [selectedbuyerdata, setSelectedBuyerData] = useState<any>([])
  const [allBuyers, setAllBuyers] = useState([])
  const [allBuyerData, setAllBuyerData] = useState([])
  const [data, setData] = useState([])
  const [assetname, setAssetName] = useState()
  const [opportunities, setOpportunities] = useState('')
  const [opportunityData, setOpportunityData] = useState('')
  const [allopportunities, setallOpportunities] = useState([])
  const [allopportunityData, setallOpportunityData] = useState<any>()
  const [scope, setScope] = useState("")
  const [allsports, setAllSports] = useState([])
  const [load, setLoad] = useState<any>(false)
  const [fileData, setFileData] = React.useState<any>([]);
  const userFromLocal = localStorage.getItem("role")?.toLowerCase();
  const isItAdmin = (userFromLocal === "admin") ? true : false;
  const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
  const isApprover = (userFromLocal === "approver") ? true : false;
  const isPublisher = (userFromLocal === "publisher") ? true : false;
  const isSeller = (userFromLocal === "seller") ? true : false;
  const isBuyer = (userFromLocal === "buyer") ? true : false;
  const [loader, setLoader] = useState(false);
  const [getAssetData, setAssetData] = useState<any>([]);
  const [allAssetNames, setAllAssetNames] = useState<any>([]);
  const [assetId, setAssetId] = useState("")
  const [showpopup, setshowPopup] = useState<any>(false)
  const [sellerId, setSellerId] = useState('');
  const [sellerOrgId, setSellerOrgId] = useState('');
  const [assetZohoId, setAssetZohoId] = useState('');
  const [sellerObj, setSellerObj] = useState<any>();
  const [buyerZohoId, setbuyerZohoId] = useState('')
  const [buyerZohoOrgId, setbuyerZohoOrgId] = useState('')

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const [opprTable, setopprTable] = useState<any[]>([
    { id: '', opportunity: '', scope: '' }
  ]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const apis = new Apis();
  const deviceType = useDeviceType()
  // useEffect(() => {
  // setLoad(true)
  // setAssetType(assettype)
  // apis.getAllPrimaryAttributesSports()
  //   .then((response: any) => {
  //     if (response?.data?.status === "success") {
  //       const fetchedArray = response.data.data || [];
  //       const sports = fetchedArray.filter((item: any) => item?.toLowerCase() !== "all")
  //       setAllSports(sports || [])
  //     }
  //     setLoad(false)

  //   })
  //   .catch((error: any) => {
  //     setLoad(false)
  //   });

  // let arr: any = [];
  // let opprarr: any = [];
  // opportunity?.map((item: any) => {
  //   if (item["Opportunity Type"] != "Anything Else") { arr?.push(item["Opportunity Type"] + " - " + item["Opportunities"]) }
  //   else {
  //     arr?.push(item["Opportunity Type"] + " - " + item["Specify Opportunity"])
  //   }
  // })
  // arr.push("Unlisted")
  // setallOpportunityData(arr)
  // setallOpportunities(opprarr)
  // if (oppr) {
  //   setopprTable((prevData: any) => {
  //     let updatedData = [...prevData];
  //     updatedData[0].opportunity = oppr["Opportunity Type"] != "Anything Else" ? (oppr["Opportunity Type"] + " - " + oppr["Opportunities"]) : (oppr["Opportunity Type"] + " - " + oppr["Specify Opportunity"])
  //     return updatedData;
  //   });
  // }
  // setLoad(false)
  // }, []);


  const handleFileChange = async (e: any) => {
    setLoad(true)
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      const file = e.target.files[0]
      // if (file.type === 'application/pdf') {
      const fileSizeInMB = file.size / 1024 / 1024;
      if (fileSizeInMB <= 5) {
        try {
          const res = await apis.getS3URL(file);
          setFileData(res.data.data[0])
          setSnackbar({
            open: true,
            severity: 'success',
            message: 'File uploaded successfully',
          });
          setLoad(false)
        } catch (error: any) {
          setSnackbar({
            open: true,
            severity: 'error',
            message: (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
          });
          setLoad(false)
        }
        setUploadDocument(fileName);
      } else {
        setUploadDocument('');
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Please upload file less then 5 MB',
        });
      }

    }
  };

  const formatDate = (dateString: string): string => {
    const monthMap: { [key: string]: string } = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec"
    };

    const [month, year] = dateString.split('/');
    const formattedMonth = monthMap[month];

    return `${formattedMonth} ${year}`;
  };

  function convertKeysToTitleCase(obj: any) {
    const newObj: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Replace underscores with spaces and convert to Title Case
        const titleCaseKey = key == "availability_timeline" ? 'Availability/Timeline'
          : key == "platform_s_" ? "Platform(s)"
            : key
              .replace(/_/g, ' ')
              .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before camelCase words
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase())
              .join(' ');
        if (titleCaseKey === "Opportunity Deliverables") {
          newObj["deliverables"] = obj[key];
        } else if (titleCaseKey === "Opportunity Media") {
          newObj["opportunity_media"] = obj[key];
        } else {
          if (key == "availability_timeline") {

            newObj[titleCaseKey] = obj[key]?.map(formatDate) || "";
          } else {
            newObj[titleCaseKey] = obj[key] || "";
          }

        }
      }
    }

    return newObj;
  }

  useEffect(() => {
    setLoad(true);
    if (assetId) {
      apis.getAssetByID(assetId)
        .then((response: any) => {
          if (response?.data?.data?.asset_detail[0].asset_status !== "draft") {

            const convertedData2 = response?.data?.data?.opportunities?.map((oppr: any) => convertKeysToTitleCase(oppr)) || [];
            const anythingElse = convertedData2.filter((op: any) => op?.["Opportunity Type"] === 'Anything Else');
            const others = convertedData2.filter((op: any) => op?.["Opportunity Type"] !== 'Anything Else');
            const result = others.concat(anythingElse);
            setOpportunityData(result);

            let arr: any = [];
            let opprarr: any = [];
            const ids: any = [];
            result?.map((item: any) => {
              if (item["Opportunity Type"] != "Anything Else") {
                arr.push(item["Opportunity Type"] + " - " + item["Opportunities"])
                ids.push(item.Id)
              }
              else {
                arr.push(item["Opportunity Type"] + " - " + item["Specify Opportunity"])
                ids.push(item.Id)
              }
            })
            arr.push("Unlisted")
            setallOpportunityData({ oppr: arr, opprids: ids })
            setallOpportunities(opprarr)
            if (oppr) {
              setopprTable((prevData: any) => {
                let updatedData = [...prevData];


                updatedData[0] = {
                  ...updatedData[0],
                  id: oppr["Id"],
                  opportunity: oppr["Opportunity Type"] !== "Anything Else"
                    ? (oppr["Opportunity Type"] + " - " + oppr["Opportunities"])
                    : (oppr["Opportunity Type"] + " - " + oppr["Specify Opportunity"]),
                };



                // updatedData[0].opportunity = oppr["Opportunity Type"] != "Anything Else" ? (oppr["Opportunity Type"] + " - " + oppr["Opportunities"]) : (oppr["Opportunity Type"] + " - " + oppr["Specify Opportunity"])
                return updatedData;
              });
            }
          }
          else {
            let coverImages: any = [];
            let socialHandles: any = Object.entries(response?.data?.data.asset_detail[0].draft.socialLinks).map(([social_media_platform, url]) => ({
              social_media_platform,
              url
            }));

            response?.data?.data.asset_detail[0].draft.fileData?.forEach((item: any) => {
              if (item.tags[0]?.toLowerCase().includes("cover"))
                coverImages.push(item);
            });
            setAssetData(
              {
                ...response?.data?.data.asset_detail[0].draft.formdata,
                Media: response?.data?.data.asset_detail[0].draft.fileData,
                Sport: response?.data?.data.sport[0],
                AssetType: response?.data?.data.asset_type.name,
                CoverImages: coverImages,
                SocialHandles: socialHandles
              }
            );
            const anythingElse = response?.data?.data.asset_detail[0].draft.formdata2.filter((op: any) => op?.["Opportunity Type"] === 'Anything Else');
            const others = response?.data?.data.asset_detail[0].draft.formdata2.filter((op: any) => op?.["Opportunity Type"] !== 'Anything Else');
            const result = others.concat(anythingElse);
            setOpportunityData(result);


            let arr: any = [];
            let opprarr: any = [];
            let ids: any = [];
            result?.map((item: any) => {
              // if (item["Opportunity Type"] != "Anything Else") { arr?.push(item["Opportunity Type"] + " - " + item["Opportunities"]) }
              // else {
              //   arr?.push(item["Opportunity Type"] + " - " + item["Specify Opportunity"])
              // }

              if (item["Opportunity Type"] != "Anything Else") {
                arr.push(item["Opportunity Type"] + " - " + item["Opportunities"])
                ids.push(item.Id)
              }
              else {
                arr.push(item["Opportunity Type"] + " - " + item["Specify Opportunity"])
                ids.push(item.Id)
              }
            })
            arr.push("Unlisted")
            setallOpportunityData({ oppr: arr, opprids: ids })
            setallOpportunities(opprarr)
            if (oppr) {
              setopprTable((prevData: any) => {
                let updatedData = [...prevData];
                // updatedData[0].opportunity = oppr["Opportunity Type"] != "Anything Else" ? (oppr["Opportunity Type"] + " - " + oppr["Opportunities"]) : (oppr["Opportunity Type"] + " - " + oppr["Specify Opportunity"])
                updatedData[0] = {
                  ...updatedData[0],
                  id: oppr["Id"], // Assuming the id comes from the oppr object
                  opportunity: oppr["Opportunity Type"] !== "Anything Else"
                    ? (oppr["Opportunity Type"] + " - " + oppr["Opportunities"])
                    : (oppr["Opportunity Type"] + " - " + oppr["Specify Opportunity"]),
                };
                return updatedData;
              });
            }
            if (arr.length == 1) {
              setopprTable((prevData: any) => {
                let updatedData = [...prevData];
                // updatedData[0].opportunity = "Unlisted"
                updatedData[0] = {
                  ...updatedData[0],
                  id: null,
                  opportunity: "Unlisted"
                };

                return updatedData;
              });
            }
          }
          setSellerObj(response?.data?.data?.seller)
          setSellerId(response?.data?.data?.seller_id)
          setSellerOrgId(response?.data?.data?.seller?.organization?.id)
          setAssetZohoId(response?.data?.data?.zoho_id)
          setLoad(false);
        })
        .catch((error) => {
          setLoad(false);
        })
        .finally(() => {
          setLoad(false);
        })
    }
  }, [assetId]);

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: deviceType == "mobile" ? "80%" : "60%",
    height: "80%",
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 8,
    borderRadius: "8px",
    p: 0,
  };

  const onLoad = () => {
    setLoad(true);
    apis.getUsers()
      .then((response: any) => {
        let arr: any = []
        let buyer: any = []
        response.data.data.map((item: any, index: any) => {
          if (item?.userroles[0]?.role?.name?.toLowerCase() == "buyer") {
            arr.push({
              id: item.id,
              name: item.name,
              email: item.email,
              // role: convertKeysToTitleCase(item.userroles[0].role.name),
              organisaion: item.organization.name,
              orgId: item.organization_id,
              mobile: item.mobile,
              buyerZohoId: item.zoho_id,
              buyerZohoOrgId: item.organization.zoho_id
            })
            buyer.push(item.name || "")
          }
        })
        setAllBuyers(buyer)
        setAllBuyerData(arr)
        setLoad(false);

      })
      .catch((error) => {
        // setLoad(false)
        setLoad(false);
      });
  }


  const fetchAssets = async () => {
    try {
      setLoad(true);

      // Fetch all assets
      const assetsResponse = await apis.getAllAssets();
      const assets = assetsResponse?.data?.data || [];

      // Filter assets based on status
      const filtered = assets?.filter((assetDetail: any) => {
        return assetDetail?.asset_detail[0]?.asset_status?.toLowerCase() === "published";
      });

      // Extract asset names from filtered assets
      const assetNames = filtered?.map((item: any) => {
        return item?.asset_detail[0]?.name || "";
      });

      setAllAssetNames(assetNames);
      setAssetData(filtered);
    } catch (error) {
      console.log("Error fetching assets or media:", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchAssets();
    onLoad()
  }, []);


  const addOppr = () => {
    setopprTable([...opprTable, { id: '', opportunity: '', scope: '' }])
  };

  const delOppr = (index: any) => {
    setopprTable((prevData: any) => {
      let updatedData = [...prevData];
      updatedData = updatedData.filter((item: any, i: any) => i !== index);
      return updatedData;
    });
  }

  // console.log("selectedbuyerdata", selectedbuyerdata, "sellerId", sellerId, sellerOrgId)

  const handleAddProposal = async () => {
    setLoad(true);
    const updatedOpprTable = opprTable.map(obj => {
      if (obj.opportunity?.toLowerCase() == "unlisted") {
        return { ...obj, id: null };
      }
      return obj;
    });
    const body: any = {
      asset_type: assetType || null,
      sports: [sports],
      asset_id: parseInt(assetId),
      opportunities: updatedOpprTable,
      buyer_id: parseInt(selectedbuyerdata[0]?.id),
      buyer_org_id: parseInt(selectedbuyerdata[0]?.orgId),
      seller_id: parseInt(sellerId),
      seller_org_id: parseInt(sellerOrgId),
      requirement: aboutYourself,
      requirement_doc: fileData?.length > 0 ? fileData : null,
      proposal_status: "ongoing",
      source: "website",
      asset_name: assetname,
      organization: organisationName,
      name: firstName,
      email: emailAddress,
      mobile: phoneNumber,
      asset_zoho_id: assetZohoId,
      buyer_zoho_id: buyerZohoId,
      buyer_org_zoho_id: buyerZohoOrgId,
      // terminate_remark: null,
      // terminate_doc: null
    };

    let oppr: any = [];

    opprTable.map((item: any) => {
      oppr.push(item.opportunity?.split("-")[0])
    })

    try {
      const response = await apis.addProposal(body);
      if (response.data?.status === "success") {
        const rfpSubmittedData = {
          SellerName: sellerObj.name,
          RFPID: response.data.data.id,
          BuyerName: localStorage.getItem("name"),
          AssetName: assetname,
          OpportunityName: oppr,
          AssetType: assetType,
          DateSubmitted: new Date(),
          FirstRFP: null
        };

        mixpanelEvents.onRFPSubmitted(rfpSubmittedData);
        setAboutYourSelf('');
        setFileData([]);
        setFirstName('');
        setEmailAddress('');
        setPhoneNumber('');
        setOrganisationName('');
        setshowPopup(true);

      }

    } catch (error: any) {
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        severity: 'error',
      });
      // mixpanelEvents.errorHandling({
      //   name: 'Catalogue Management',
      //   msg: error.response.data.message
      // })



    } finally {
      setLoad(false);

    }
  };


  return (
    <Modal
      open={showZoputsuGetInTouchPopup}
      onClose={() => { setshowPopup(false); closePopup() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...style, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
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

        <Box sx={{
          width: "100%",
          height: "auto",
          display: 'flex',
          flexDirection: "row",
          padding: "8px 16px 8px 16px",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
          justifyContent: "space-between",
        }} >
          <p style={{
            fontFamily: "Inter",
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: "21px",
            textAlign: "left",
            padding: "10px 0px",
            margin: 0,
            color: "rgba(51, 51, 51, 1)"
          }}>
            Request for Proposal
          </p>

          <Close
            sx={{
              cursor: 'pointer',
              marginTop: '5px'
            }}
            onClick={() => { setshowPopup(false); closePopup() }}
          />
        </Box>

        {(!showpopup) ? (<Box sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
          width: '100%',
          height: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
          padding: '10px'
        }} >


          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: deviceType == "mobile" ? "column" : "row",
            justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
            gap: '10px',
            padding: "8px 16px 8px 16px",
          }} >
            <ZupotsuDropdown
              title="Select Buyer"
              placeholder={"Select Buyer"}
              value={selectedbuyer}
              name={"buyer"}
              isRequired={true}
              dropdownData={allBuyers || []}
              handleChange={(event: any) => {
                setSelectedBuyer(event.target.value)
                const data: any = allBuyerData?.filter((item: any) => {
                  const buyerName = item?.name?.toLowerCase() || "";
                  const searchValue = event?.target?.value?.toLowerCase() || "";
                  return buyerName === searchValue;
                });
                // console.log("data[0]data[0]",data[0])
                setFirstName(data[0]?.name)
                setPhoneNumber(data[0]?.mobile)
                setOrganisationName(data[0]?.organisaion)
                setEmailAddress(data[0]?.email)
                setbuyerZohoId(data[0]?.buyerZohoId)
                setbuyerZohoOrgId(data[0]?.buyerZohoOrgId)
                setSelectedBuyerData(data)
              }}
            />


          </Box>



          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: deviceType == "mobile" ? "column" : "row",
            justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
            gap: '10px',
            padding: "8px 16px 8px 16px",
            marginTop: '0px'
          }} >
            <ZupotsuDropdown
              title="Select Asset "
              placeholder={"Select Asset Name"}
              value={assetname}
              name={"assetname"}
              isRequired={true}
              dropdownData={allAssetNames || []}
              handleChange={(event: any) => {
                setAssetName(event.target.value)
                const data = getAssetData?.filter((item: any) => {
                  const assetName = item?.asset_detail?.[0]?.name?.toLowerCase() || "";
                  const searchValue = event?.target?.value?.toLowerCase() || "";
                  return assetName === searchValue;
                });
                setAssetType(data[0]?.asset_type?.name)
                setSports(data[0]?.sport[0])
                setAssetId(data[0]?.id)
                setData(data);

              }}
            />
          </Box>
          {(assetname) && (<Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: deviceType == "mobile" ? "column" : "row",
            justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
            gap: '10px',
            padding: "8px 16px 8px 16px",
            marginTop: '0px'
          }} >

            <ZupotsuTextfield
              title="Asset Type"
              placeholder={"Enter Asset Type"}
              isRequired={true}
              value={assetType}
              type={"text"}
              name={"assettype"}
              handleChange={(event: any) => {
                setAssetType(event.target.value?.toLowerCase())
              }}
              previewMode={true}
            />
            <ZupotsuTextfield
              title="Sports"
              placeholder={"Select Sports"}
              isRequired={true}
              value={sports}
              type={"text"}
              name={"sports"}
              handleChange={(event: any) => {
                setSports(event.target.value)
              }}
              previewMode={true}
            />
          </Box>)}


          {opprTable?.map((item: any, index: any) => (<div key={index} style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            // gap: '10px',
            width: '100%',
            marginTop: index == 0 ? '10px' : '15px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: deviceType == "mobile" ? "column" : 'row',
              alignItems: 'center',
              justifyContent: deviceType == "mobile" ? "flex-start" : 'space-between',
              gap: '10px',
              width: deviceType == "mobile" ? "90%" : '90%',
            }}>
              <ZupotsuAutocomplete
                title="Select Opportunity"
                placeholder="Select Opportunity"
                isRequired={index == 0 ? true : false}
                name="Opportunity"
                dropdownData={allopportunityData?.oppr}
                value={opprTable[index].opportunity || ""}
                // handleChange={(event: any) => {
                //   setopprTable((prevData: any) => {
                //     console.log("opprTable[index].opportunity",opprTable[index],"prevData",allopportunityData)
                //     let updatedData = [...prevData];
                //     updatedData[index].opportunity = event.target.value
                //     // updatedData[index].id = Id
                //     return updatedData;
                //   });
                // }}
                handleChange={(event: any, indexi: any) => {
                  // console.log(allopportunityData?.opprids[indexi])
                  setopprTable((prevData: any) => {
                    let updatedData = [...prevData];
                    updatedData[index].opportunity = event.target.value
                    updatedData[index].id = allopportunityData?.opprids[indexi]
                    return updatedData;
                  });
                }}
                previewMode={false}
                freeSolo={true}
              />

              <ZupotsuTextfield
                title="Scope"
                placeholder={"Enter scope"}
                value={opprTable[index].scope}
                type={"text"}
                name={"scope"}
                handleChange={(event: any) => {
                  setopprTable((prevData: any) => {
                    let updatedData = [...prevData];
                    updatedData[index].scope = event.target.value
                    return updatedData;
                  });
                }}
              />
            </div>
            <div
              style={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
              onClick={(e: any) => {
                if (index != 0) { delOppr(index) }
              }}
            >
              <img src={deleteIcon} alt="" style={{ width: '20px', height: "20px", filter: index == 0 ? 'grayscale(100%)' : '' }} />
            </div>

          </div>))}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              cursor: 'pointer',
              gap: '10px',
              marginTop: '20px',
              marginBottom: '20px',
              marginLeft: '20px'
            }}
          >
            <img src={addCircle} alt="" onClick={() => {
              addOppr()
            }} />
            <Typography
              style={{
                color: 'var(--Zupotso-Primary, #E20B18)',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '140%',
              }}
              onClick={() => addOppr()}
            >
              {opprTable.length == 0 ? "Select New Opportunity" : "Select More Opportunity"}
            </Typography>
          </div>




          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: "row",
            justifyContent: "space-between",
            gap: '10px',
            padding: "8px 16px 8px 16px",
            marginTop: '0px'
          }} >
            <ZupotsuTextfield
              title="Tell us about your requirement"
              placeholder={"Enter your requirement"}
              value={aboutYourself}
              type={"text"}
              name={"Tell us about your requirement"}
              multiline={true}
              rows={3}
              handleChange={(event: any) => {
                setAboutYourSelf(event.target.value)
              }}
            />
          </Box>

          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: '10px',
            padding: "8px 16px 8px 16px",
            marginTop: '0px'
          }} >

            <Typography
              style={{
                marginBottom: '0px',
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
                  >{"Upload Document"}</span>


                </div>

              </div>

            </Typography>

            <TextField
              rows={1}
              size="small"
              placeholder={"Browse"}
              fullWidth
              value={uploadDocument}
              disabled={false}
              name={'uploaddocument'}
              id="fullWidth"
              onClick={handleBrowseClick}
              sx={{
                color: "#000",
                background: 'transparent',
                cursor: 'pointer',
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      src={documentUpload}
                      alt=""
                      style={{
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                      }}
                    />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none', cursor: 'pointer', }}
              onChange={handleFileChange}
            />



          </Box>
        </Box>) : (
          <Box sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px', gap: '20px', width: '100%',
            height: '90%',
          }}>
            <img src={TickCircleGreen} style={{ width: '50px', height: '50px', color: "green" }} />

            <p style={{
              fontSize: '18px',
              lineHeight: "21px",
              fontStyle: 'Inter',
              fontWeight: '700',
              textAlign: "center"
            }}>Thank you for reaching out. You will hear back from us within the next two working days.</p>
          </Box>
        )}


        <Box sx={{
          width: "100%",
          height: "auto",
          display: 'flex',
          flexDirection: "row",
          alignItems: 'center',
          padding: "8px 16px 8px 16px",
          borderTop: "1px solid rgba(224, 224, 224, 1)",
          justifyContent: "center",
          marginTop: '0px',
          boxShadow: " 0px 0px 14px 0px rgba(0, 0, 0, 0.07)"
        }} >
          {(!showpopup) ? (
            <ZupotsuButton
              name={"Submit"}
              load={load}
              variant={'contained'}
              padding={"10px 40px"}
              isCustomColors={true}
              customOutlineColor="1px solid transparent"
              customOutlineColorOnHover="1px solid transparent"
              customBgColorOnhover="#E20B18"
              customBgColor={(assetType && assetname && organisationName && sellerOrgId && sellerId && selectedbuyerdata[0]?.id && selectedbuyerdata[0]?.orgId && opprTable?.length > 0 && opprTable.every(item => item.opportunity !== '') && assetId && sports) ? "#E20B18" : "rgba(255,1,1,0.4)"}
              customTextColorOnHover="#FFF"
              customTextColor="#FFF"
              handleClick={
                () => {
                  if (assetType && assetname && organisationName && sellerOrgId && sellerId && selectedbuyerdata[0]?.id && selectedbuyerdata[0]?.orgId && opprTable?.length > 0 && opprTable.every(item => item.opportunity !== '') && assetId && sports) {
                    handleAddProposal()
                  } else {
                    setSnackbar({
                      open: true,
                      message: 'Please fill all the fields',
                      severity: 'error',
                    });
                  }
                }
              }
            />
          ) : (
            <ZupotsuButton
              name={"Okay"}
              load={load}
              variant={'contained'}
              padding={"10px 40px"}
              isCustomColors={true}
              customOutlineColor="1px solid transparent"
              customOutlineColorOnHover="1px solid transparent"
              customBgColorOnhover="#E20B18"
              customBgColor={"#E20B18"}
              customTextColorOnHover="#FFF"
              customTextColor="#FFF"
              handleClick={
                () => {
                  setshowPopup(false);
                  closePopup()
                }
              }
            />
          )}
        </Box>
        {/* {(load) && (<div className="centered-container" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}>
          <div className="loader"></div>
        </div>)} */}
      </Box>
    </Modal>

  );
};
export default ZoputsuGetInTouch3;
