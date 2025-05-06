import { Box, Checkbox, Divider, Grid, InputAdornment, Snackbar, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb'
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import CheckBox from './CheckBox';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import useDeviceType from '../../utils/DeviceType';
import { addCircle, arrowLeft, copy, deleteIcon, eastWhiteArrow, infoCircle } from '../../assets';
import ZupotsuTooltip from '../../Atoms/zupotsu-tooltip/zupotsu-tooltip';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuImgUpload from '../../Molecules/zupotsu-img-upload/zupotsu-img-upload';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Texteditor from '../../Atoms/texteditor/Texteditor';
import ZupotsuTextEditor from '../../Atoms/texteditor/ZupotsuTextEditor';
import Apis from '../../services/apis';
import ZupotsuImg from '../../Molecules/zupotsuimg/zupotsuimg';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

const CreateInvoice = ({ item, sidebarOpen, forms, formname, proposalId, setProposalId, id, currency, setCurrency, existingFormNames }: any) => {
    const [opprTable, setopprTable] = useState<any[]>([{ opportunity_details: '', quantity: null, rate: null, discount: null, taxtype: '', taxpercent: null, amount: null }]);
    const [loader, setLoader] = useState(false);
    const [buyerName, setBuyerName] = useState<any>(item?.buyer?.name);
    const [representedBy, setRepresentedBy] = useState<any>(item?.seller?.name);
    const [assetName, setAssetName] = useState<any>(item?.asset?.asset_detail?.[0]?.name)
    const [termsandCondition, setTermsandCondition] = useState<any>("")
    const [closingSummary, setClosingSummary] = useState<any>("The Zupotsu team can explore how the above (and more such opportunities) can be tailored to meet your requirements. We look forward to your feedback. Please feel free to contact us at +91 99878 31843 for any queries or clarifications.")
    const [aboutzupotsu, setAboutZupotsu] = useState<any>("Zupotsu is a martech platform on a mission to ‘digitise’ sports marketing. Zupotsu enables the discovery, engagement and evaluation (the ‘DEE’ framework) for every sports and esports marketing asset. Run by a bunch of tech and sports enthusiasts, our network and capabilities can fulfil any sports marketing requirement anywhere in the world.")
    const [displayBuyer, setdisplayBuyer] = useState<any>(true)
    const [sport, setSport] = useState<any>("")
    const [displayRepresentedBy, setdisplayRepresentedBy] = useState<any>(true)
    const [adjustment, setAdjustment] = useState<any>()
    const [additionalCharges, setAddtionalCharges] = useState<any>()
    const [supportingDocument, setSupportingDocument] = useState<{ type: any, document: any }[]>([{ type: null, document: null }]);


    const [searchParams] = useSearchParams();
    const proposal_id = searchParams.get('id');


    // Handler for adding a new document upload field
    const addDocument = () => {
        setSupportingDocument((prevDocuments: any) => [
            ...prevDocuments,
            { type: null, document: null },
        ]);
    };


    // Handler for file change for a specific document
    const handleFileChangeMul = (id: string, imageUrl: string, file: File, type: any) => {
        setSupportingDocument((prevDocuments: any) =>
            prevDocuments.map((doc: any, index: any) =>
                index === id ? { ...doc, document: imageUrl, type } : doc
            )
        );
    };

    // Handler for deleting a specific document
    const handleMediaDelMul = (id: string) => {
        setSupportingDocument((prevDocuments: any) => prevDocuments.filter((doc: any, index: any) => index !== id));
    };



    const subAmount = opprTable?.reduce((accumulator, current) => {
        return accumulator + (current.amount || 0);
    }, 0);

    var RoundOff = Math.round(parseInt(subAmount) + (parseInt(additionalCharges) || 0) - (parseInt(adjustment) || 0));


    useEffect(() => {
        setLoader(true)
        if (Object.keys(forms).length == 0) {
            const arr: any = []
            item?.opportunities?.forEach((opportunityItem: any) => {
                arr.push({
                    opportunity_details: opportunityItem.opportunity,
                    quantity: null,
                    rate: null,
                    discount: null,
                    taxtype: '',
                    taxpercent: null,
                    amount: null
                });
            });
            setSport(item?.sports)
            // if (item?.opportunities?.length > 0) {
            setopprTable(arr);
            // }
            setLoader(false)
        }
        else if (forms && Object.keys(forms).length > 0) {
            setSupportingDocument(forms?.supporting_documents)
            setdisplayRepresentedBy(forms?.display_represented_by)
            setdisplayBuyer(forms?.display_buyer)
            setTermsandCondition(forms?.terms_and_condition)
            setAssetName(forms?.asset_name)
            setRepresentedBy(forms?.represented_by)
            setBuyerName(forms?.buyer_name)
            setAddtionalCharges(forms?.additional_charges)
            setAdjustment(forms?.adjustment)
            setClosingSummary(forms?.closing_summary)
            setSport(forms?.sport)
            if (forms?.opportunities?.length > 0) {
                setopprTable(forms?.opportunities)
            }
            RoundOff = (forms?.roundoff)
            setAboutZupotsu(forms?.about_zupotsu)
            setCurrency(forms?.currency)
            setLoader(false)
        } else {
            setLoader(false)
        }
    }, [])



    const deviceType = useDeviceType();
    const navigation = useNavigate()
    const apis = new Apis();
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const createInvoice = async () => {
        const filteredSupportingDocuments = supportingDocument?.filter(doc => doc.document !== null);
        const body = {
            "name": formname,
            "proposal_id": parseInt(item?.id),
            "form_type": "invoice",
            "form": {
                "opportunities": opprTable,
                "buyer_name": item?.buyer?.name,
                "represented_by": item?.seller?.name,
                "asset_name": item?.asset?.asset_detail?.[0]?.name,
                "terms_and_condition": termsandCondition,
                "display_buyer": displayBuyer || false,
                "display_represented_by": displayRepresentedBy || false,
                "closing_summary": closingSummary,
                "additional_charges": parseInt(additionalCharges),
                "adjustment": parseInt(adjustment),
                "subtotal": parseInt(subAmount),
                "roundoff": RoundOff,
                "total": RoundOff,
                "about_zupotsu": aboutzupotsu,
                "sport": sport,
                "currency": currency,
                ...(filteredSupportingDocuments && filteredSupportingDocuments.length > 0
                    ? { "supporting_documents": filteredSupportingDocuments }
                    : {}),
            }
        }
        setLoader(true)
        try {
            const response = await apis.postForms(body);
            if (response?.data?.status == "success") {
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Proposal Form created successfully!!'
                });
                setLoader(false)
                setTimeout(() => {
                    navigation("/allforms")
                }, 1000)
            }
            // console.log("body", body)
            setLoader(false)
        } catch (error: any) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
            });
            setLoader(false)
        }
    }


    const updateInvoice = async () => {

        const body = {
            "id": parseInt(id),
            "name": formname,
            "proposal_id": parseInt(proposalId),
            "form_type": "invoice",
            "form": {
                "opportunities": opprTable,
                "buyer_name": buyerName,
                "represented_by": representedBy,
                "asset_name": assetName,
                "terms_and_condition": termsandCondition,
                "display_buyer": displayBuyer || false,
                "display_represented_by": displayRepresentedBy || false,
                'supporting_documents': supportingDocument,
                "closing_summary": closingSummary,
                "additional_charges": additionalCharges,
                "adjustment": adjustment,
                "subtotal": subAmount,
                "roundoff": RoundOff,
                "total": RoundOff,
                "about_zupotsu": aboutzupotsu,
                "sport": sport,
                "currency": currency,
            }
        }

        setLoader(true)
        try {
            const response = await apis.updateForms(body, id);
            if (response?.data?.status == "success") {
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Invoice Form updated successfully!!'
                });
                setLoader(false)
                setTimeout(() => {
                    navigation("/allforms")
                }, 1000)
            }
        } catch (error: any) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
            });
            setLoader(false)
        }
    }

    const validateFields = () => {
        const newErrors: any = {};
        const opportunityMissingValues = opprTable?.some(item =>
            (item.opportunity_details == null || item.opportunity_details == '') ||
            (item.quantity == null || item.quantity == '') ||
            (item.rate == null || item.rate == '') ||
            (item.discount == null || item.discount == '') ||
            (item.taxtype == null || item.taxtype == '') ||
            // (item.taxpercent == null || item.taxpercent == '') ||
            (item.amount == null || item.amount == '')
        );

        // Validate each field and add to newErrors if empty
        if (!formname) newErrors.error = "Form name is required";
        else if (!currency) newErrors.error = "Currency is required";
        else if (!closingSummary) newErrors.error = "Closing summary is required";
        else if (!aboutzupotsu) newErrors.error = "About Zupotsu is required";
        else if (!termsandCondition) newErrors.error = "Terms and conditions are required";
        else if (!buyerName) newErrors.error = "Buyer Name is required";
        else if (!representedBy) newErrors.error = "Represented By is required";
        else if (!assetName) newErrors.error = "Asset Name is required";
        else if (!sport) newErrors.error = "Sport are required";
        else if (!additionalCharges) newErrors.error = "Additional Charges are required";
        else if (!adjustment) newErrors.error = "Adjustment are required";
        else if (opportunityMissingValues) {
            newErrors.error = "All fields in Opportunity must be filled";
        }

        // console.log("opportunityMissingValues", opportunityMissingValues, opprTable)


        // Check if there are any errors
        if (Object.keys(newErrors).length > 0) {
            // Show an error snackbar if there are validation errors
            setSnackbar({
                open: true,
                severity: 'error',
                message: newErrors?.error || 'Please fill in all required fields.'
            });
        } else {
            // Show a success snackbar if all fields are valid
            setSnackbar({
                open: true,
                severity: 'success',
                message: 'All fields are valid!'
            });
        }
        // Return whether validation was successful
        return Object.keys(newErrors).length === 0;
    };


    const calculateAmount = (item: any) => {
        const quantity = parseFloat(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        const discount = parseFloat(item.discount) || 0;
        const taxPercent = parseFloat(item.taxpercent) || 0;

        // Subtotal before tax
        const subtotal = (quantity * rate) - discount;

        // Tax amount as a percentage of subtotal
        const taxAmount = (subtotal * taxPercent) / 100;

        // Final amount after adding tax
        return subtotal + taxAmount;
    };


    // Function to update the opprTable and recalculate amount
    const updateOpprTable = (index: any, newValues: any) => {
        setopprTable((prevTable) => {
            const updatedItem = { ...prevTable[index], ...newValues };
            updatedItem.amount = calculateAmount(updatedItem);

            const newTable = [...prevTable];
            newTable[index] = updatedItem;
            return newTable;
        });
    };

    // Example usage in a form input
    const handleInputChange = (index: any, field: any, value: any) => {
        updateOpprTable(index, { [field]: value });
    };


    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loader) {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    } else {

        return (
            <div style={{ display: "flex", flexDirection: 'column', gap: '10px', justifyContent: 'flex-start', alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', width: '100%', overflowX: 'hidden' }}>
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
                <Grid xs={12} md={12} lg={12} width={"100%"} sx={{
                    display: "flex", flexDirection: 'column', justifyContent: 'flex-start',
                    alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', gap: '0px',
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            backgroundColor: '#FFF',
                            width: '98%',
                            alignItems: 'center',
                            paddingBottom: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        <Typography sx={{
                            textAlign: "center", width: '100%', height: '100%', fontFamily: "Bebas Neue",
                            fontSize: "20px",
                            fontWeight: 400,
                            lineHeight: "28px",
                            letterSpacing: "0.04em",
                            padding: 0,
                            margin: '20px'
                        }}>
                            Create Invoice
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "space-evenly",
                                backgroundColor: '#FFF',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    backgroundColor: '#FFF',
                                    margin: "10px",
                                    marginTop: '5px',
                                    width: '50%',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <ZupotsuTextfield
                                    title="Buyer Name"
                                    name="buyername"
                                    value={buyerName}
                                    isRequired={true}
                                    placeholder={"Enter Buyer Name"}
                                    handleChange={(event: any) => { setBuyerName(event?.target.value) }}
                                />
                                <CheckBox title={"Display Buyer"} isChecked={displayBuyer} setIsChecked={setdisplayBuyer} />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    backgroundColor: '#FFF',
                                    margin: "10px",
                                    marginTop: '5px',
                                    width: '50%',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <ZupotsuTextfield
                                    title="Represented By"
                                    name="representedby"
                                    value={representedBy}
                                    isRequired={true}
                                    placeholder={"Enter Represented By"}
                                    handleChange={(event: any) => { setRepresentedBy(event?.target.value) }}
                                />
                                <CheckBox title={"Display Represented By"} isChecked={displayRepresentedBy} setIsChecked={setdisplayRepresentedBy} />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "space-evenly",
                                backgroundColor: '#FFF',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    backgroundColor: '#FFF',
                                    marginTop: '5px',
                                    margin: "10px",
                                    width: '48%',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <ZupotsuTextfield
                                    title="Asset Name"
                                    name="assetname"
                                    value={assetName}
                                    isRequired={true}
                                    placeholder={"Enter Asset Name"}
                                    handleChange={(event: any) => { setAssetName(event.target.value) }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    backgroundColor: '#FFF',
                                    marginTop: '5px',
                                    margin: "10px",
                                    width: '48%',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <ZupotsuTextfield
                                    title="Sport"
                                    name="sport"
                                    value={sport}
                                    isRequired={true}
                                    placeholder={"Enter Sport"}
                                    handleChange={(event: any) => { setSport(event.target.value) }}
                                />
                            </Box>
                        </Box>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "flex-start",
                                width: '100%',
                                margin: "10px",
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-between",
                                    backgroundColor: 'rgba(239, 239, 239, 1)',
                                    width: '98%',
                                    height: "40px",
                                    alignItems: 'center',
                                    padding: "16px",
                                    borderRadius: "5px 5px 0px 0px",
                                    border: "0px 1px 0px 0px"

                                }}
                            >
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    lineHeight: "21px",
                                    textAlign: "left",
                                    margin: 0
                                }}>
                                    Opportunities
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
                                </p>

                                {(
                                    opprTable?.length < 10
                                ) ? (<div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        gap: '10px',
                                    }}
                                >
                                    <img src={addCircle} alt="" style={{ width: '20px', height: '20px' }} />
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
                                        onClick={() => {
                                            setopprTable(prevTable =>
                                                Array.isArray(prevTable)
                                                    ? [
                                                        ...prevTable,
                                                        { opportunity_details: '', quantity: null, rate: null, discount: null, taxtype: '', taxpercent: null, amount: null }
                                                    ]
                                                    : [{ opportunity_details: '', quantity: null, rate: null, discount: null, taxtype: '', taxpercent: null, amount: null }]
                                            )
                                        }
                                        }
                                    >
                                        Add New Row
                                    </Typography>
                                </div>) : (<div></div>)}
                            </div>
                            {opprTable?.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        width: '96%',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: deviceType == "mobile" ? "column" : 'row',
                                            justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
                                            gap: "2%",
                                            width: '96%',
                                            marginTop: '10px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: "space-between",
                                                width: deviceType == "mobile" ? "100%" : '40%',
                                                marginTop: '10px',
                                                alignItems: 'center',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    gap: '0px',
                                                    width: deviceType == "mobile" ? "100%" : '50%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >
                                                <ZupotsuTextfield
                                                    title={index !== 0 ? "" : "Opportunity Details"}
                                                    name="opportunity_details"
                                                    value={opprTable[index]?.opportunity_details}
                                                    placeholder={"Enter Item Details"}
                                                    handleChange={(event: any) => {
                                                        setopprTable((prevData: any) => {
                                                            let updatedData = [...prevData];
                                                            updatedData[index].opportunity_details = event.target.value
                                                            return updatedData;
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    width: deviceType == "mobile" ? "48%" : '20%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >
                                                <ZupotsuTextfield
                                                    title={index !== 0 ? "" : "Quantity"}
                                                    name="Quantity"
                                                    value={opprTable[index]?.quantity}
                                                    type='number'
                                                    placeholder={"Enter Quantity"}
                                                    handleChange={(event: any) => {
                                                        handleInputChange(index, 'quantity', Math.abs(parseInt(event.target.value)))
                                                    }}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    width: deviceType == "mobile" ? "48%" : '20%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >
                                                <ZupotsuTextfield
                                                    title={index !== 0 ? "" : "Rate"}
                                                    name="rate"
                                                    type='number'
                                                    value={opprTable[index]?.rate}
                                                    placeholder={"Enter Rate"}
                                                    handleChange={(event: any) => {
                                                        handleInputChange(index, 'rate', Math.abs(parseInt(event.target.value)))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: "space-between",
                                                width: deviceType == "mobile" ? "100%" : '60%',
                                                marginTop: '10px',
                                                alignItems: 'center',
                                                flexWrap: "wrap"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    width: deviceType == "mobile" ? "48%" : '23%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >
                                                <ZupotsuTextfield
                                                    title={index !== 0 ? "" : "Discount"}
                                                    name="discount"
                                                    type='number'
                                                    value={opprTable[index]?.discount}
                                                    placeholder={"Enter Discount"}
                                                    handleChange={(event: any) => {
                                                        handleInputChange(index, 'discount', Math.abs(parseInt(event.target.value)))
                                                    }}
                                                />
                                            </div>


                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    width: deviceType == "mobile" ? "48%" : '23%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >
                                                <ZupotsuDropdown
                                                    title={index !== 0 ? "" : "Tax Type"}
                                                    name="taxtype"
                                                    dropdownData={["Non taxable", "GST", "IGST"]}
                                                    value={opprTable[index]?.taxtype}
                                                    placeholder={"Select taxtype"}
                                                    handleChange={(event: any) => {
                                                        setopprTable((prevData: any) => {
                                                            let updatedData = [...prevData];
                                                            updatedData[index].taxtype = event.target.value
                                                            return updatedData;
                                                        });
                                                        if (event.target.value == "Non taxable") {
                                                            handleInputChange(index, 'taxpercent', 0);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    width: deviceType == "mobile" ? "48%" : '23%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >

                                                <Box sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%' }}>
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
                                                                >{index !== 0 ? "" : "Tax Percent"}</span>

                                                            </div>

                                                        </div>

                                                    </Typography>

                                                    <TextField
                                                        size="small"
                                                        placeholder={"Enter Tax Percent in "}
                                                        fullWidth
                                                        disabled={opprTable[index]?.taxtype == "Non taxable" ? true : false}
                                                        value={opprTable[index]?.taxpercent}
                                                        name={'taxpercent'}
                                                        id="fullWidth"
                                                        type='number'
                                                        sx={{
                                                            color: "#000",
                                                            background: '',
                                                            padding: 0,
                                                            margin: 0,
                                                        }}
                                                        onChange={(event: any) => {
                                                            const value = Math.min(Number(event.target.value), 100);
                                                            handleInputChange(index, 'taxpercent', value);
                                                        }}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <span>%</span>
                                                                </InputAdornment>
                                                            ),
                                                            inputProps: {
                                                                min: 0,
                                                                max: 100,
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    width: deviceType == "mobile" ? "48%" : '23%',
                                                    alignItems: "flex-end",
                                                    padding: '0px',
                                                    height: "100%",
                                                }}
                                            >
                                                <Box sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%' }}>
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
                                                                >{index !== 0 ? "" : "Amount"}</span>

                                                            </div>

                                                        </div>

                                                    </Typography>

                                                    <TextField
                                                        size="small"
                                                        placeholder={"Enter Amount"}
                                                        fullWidth
                                                        value={opprTable[index]?.amount}
                                                        name={'amount'}
                                                        disabled
                                                        id="fullWidth"
                                                        type={""}
                                                        sx={{
                                                            color: "#000",
                                                            background: 'rgba(241,241,241,0)',
                                                            padding: 0,
                                                            margin: 0,
                                                        }}

                                                    />
                                                </Box>

                                            </div>
                                        </div>

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
                                            if (index != 0) {
                                                setopprTable((prevData: any) => {
                                                    let updatedData = [...prevData];
                                                    updatedData = updatedData.filter((item: any, i: any) => i !== index);
                                                    return updatedData;
                                                });
                                            }
                                        }}
                                    >
                                        <img src={deleteIcon} alt="" style={{ width: '30px', height: "30px", filter: index == 0 ? 'grayscale(100%)' : '' }} />
                                    </div>
                                </div>

                            ))}




                        </div>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "flex-start",
                                backgroundColor: '#FFF',
                                width: '98%',
                                alignItems: 'center',
                                padding: "16px",
                                borderRadius: "16px",
                                border: "1px solid rgba(242, 242, 242, 1)",
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: deviceType == "mobile" ? "space-between" : "flex-start",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    alignItems: 'center',
                                    height: "40px"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "35%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >
                                    <p style={{
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: "19.6px",
                                        textAlign: "left",
                                        margin: 0,
                                        padding: 0
                                    }}>
                                        Sub Total
                                    </p>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "25%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >
                                    <TextField
                                        size="small"
                                        placeholder={""}
                                        fullWidth
                                        value={subAmount}
                                        name={'subtotal'}
                                        disabled
                                        id="fullWidth"
                                        type={"text"}
                                        sx={{
                                            color: "#000",
                                            background: 'rgba(241,241,241,0)',
                                            padding: 0,
                                            margin: 0,
                                        }}

                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: deviceType == "mobile" ? "space-between" : "flex-start",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    alignItems: 'center',
                                    height: "40px",
                                    marginTop: '10px'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "35%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >

                                    <p style={{
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        lineHeight: "19.6px",
                                        textAlign: "left",
                                        margin: 0,
                                        padding: 0
                                    }}>
                                        Additional Charges
                                    </p>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "25%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >
                                    <ZupotsuTextfield
                                        multiline={false}
                                        title=""
                                        type='number'
                                        name="additionalCharges"
                                        value={additionalCharges}
                                        placeholder={'Enter additional Charges'}
                                        handleChange={(event) => { setAddtionalCharges(event.target.value) }}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: deviceType == "mobile" ? "space-between" : "flex-start",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    alignItems: 'center',
                                    height: "40px",
                                    marginTop: '10px'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "35%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >
                                    <p style={{
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        lineHeight: "19.6px",
                                        textAlign: "left",
                                        margin: 0,
                                        padding: 0
                                    }}>
                                        Adjustment
                                    </p>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "25%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >
                                    <ZupotsuTextfield
                                        multiline={false}
                                        title=""
                                        name="adjustment"
                                        value={adjustment}
                                        placeholder={'Enter adjustment'}
                                        handleChange={(event) => { setAdjustment(event.target.value) }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: deviceType == "mobile" ? "space-between" : "flex-start",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    alignItems: 'center',
                                    height: "40px",
                                    marginTop: '10px'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "35%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >
                                    <p style={{
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        lineHeight: "19.6px",
                                        textAlign: "left",
                                        margin: 0,
                                        padding: 0
                                    }}>
                                        Round Off
                                    </p>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "25%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >
                                    <ZupotsuTextfield
                                        multiline={false}
                                        title=""
                                        name=""
                                        type='text'
                                        previewMode={true}
                                        value={RoundOff?.toString()}
                                        placeholder={''}
                                        handleChange={() => { }}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: deviceType == "mobile" ? "space-between" : "flex-start",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    alignItems: 'center',
                                    height: "40px",
                                    marginTop: '15px',
                                    borderTop: "1px solid rgba(224, 224, 224, 1)"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "35%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >
                                    <p style={{
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: "19.6px",
                                        textAlign: "left",
                                        margin: 0,
                                        padding: 0
                                    }}>
                                        Total (₹)
                                    </p>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: deviceType == "mobile" ? "25%" : '20%',
                                        alignItems: 'center',
                                        height: "40px"
                                    }}
                                >
                                    <p style={{
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        lineHeight: "19.6px",
                                        textAlign: "left",
                                        margin: 0,
                                        padding: 0
                                    }}>
                                        {RoundOff}
                                    </p>
                                </Box>
                            </Box>

                        </Box>




                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "flex-start",
                                backgroundColor: '#FFF',
                                width: '98%',
                                alignItems: 'center',
                                padding: "16px",
                                borderRadius: "16px",
                                marginTop: '10px',
                                border: "1px solid rgba(242, 242, 242, 1)",
                            }}
                        >

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-evenly",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    alignItems: 'center',
                                }}
                            >
                                <ZupotsuTextfield
                                    multiline={true}
                                    rows={4}
                                    title="Terms & Conditions"
                                    isRequired={true}
                                    name="termsandcondition"
                                    value={termsandCondition}
                                    placeholder={"Write Terms & Conditions"}
                                    handleChange={(event: any) => { setTermsandCondition(event?.target.value) }}
                                />
                                {/* <ZupotsuTextEditor
                                    title="Terms & Conditions"
                                    isRequired={true}
                                    name="termsandcondition"
                                    value={termsandCondition}
                                    placeholder="Enter terms and conditions"
                                    handleChange={(event: any) => { setTermsandCondition(event.target.value); }}
                                    errorMessage=""
                                    type="text"
                                    trailingIcon={null}
                                    toolTipMessage=""
                                    bracketText=""
                                    trailImageHeight={0}
                                    trailImageWidth={0}
                                /> */}
                            </Box>


                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-evenly",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                }}
                            >

                                {/* <ZupotsuTextEditor
                                    title="Closing summary"
                                    isRequired={true}
                                    name="closingsummary"
                                    value={closingSummary}
                                    placeholder="Enter closing summary"
                                    handleChange={(event: any) => { setClosingSummary(event.target.value); }}
                                    errorMessage=""
                                    type="text"
                                    trailingIcon={null}
                                    toolTipMessage=""
                                    bracketText=""
                                    trailImageHeight={0}
                                    trailImageWidth={0}
                                /> */}
                                <ZupotsuTextfield
                                    multiline={true}
                                    rows={4}
                                    isRequired={true}
                                    title="Closing summary"
                                    name="closingsummary"
                                    value={closingSummary}
                                    placeholder="Enter closing summary"
                                    handleChange={(event: any) => { setClosingSummary(event.target.value); }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-evenly",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                }}
                            >

                                <ZupotsuTextfield
                                    multiline={true}
                                    rows={4}
                                    title="About Zupotsu"
                                    isRequired={true}
                                    name="aboutzupotsu"
                                    value={aboutzupotsu}
                                    placeholder="Enter About Zupotsu"
                                    handleChange={(event: any) => { setAboutZupotsu(event.target.value); }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-between",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                }}
                            >

                                <Typography
                                    style={{

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
                                            >{"Supporting Documents Upload"}</span>

                                        </div>

                                    </div>

                                </Typography>
                                <div
                                    onClick={() => {
                                        addDocument()
                                    }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        gap: '10px',
                                        marginTop: '10px',
                                        marginBottom: '10px'
                                    }}
                                >
                                    <img src={addCircle} alt="" style={{ width: '20px', height: '20px' }} />
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

                                    >
                                        Add New Doc
                                    </Typography>
                                </div>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "flex-start",
                                    backgroundColor: '#FFF',
                                    width: '100%',
                                    gap: '2%',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                    flexWrap: 'wrap'
                                }}
                            >
                                {supportingDocument?.map((document: any, index: any) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: "flex-start",
                                            backgroundColor: '#FFF',
                                            width: deviceType == "mobile" ? "45%" : "30%",
                                            alignItems: "flex-start",
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: "flex-start",
                                                backgroundColor: '#FFF',
                                                width: '100%',
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <ZupotsuImg
                                                fileSize={'You can upload a maximum 5MB file'}
                                                handleDelete={() => {
                                                    if (index !== 0) {
                                                        handleMediaDelMul(index);
                                                    } else {
                                                        setSupportingDocument((prevDocuments: any) => {
                                                            if (prevDocuments?.length === 1) {
                                                                // If it's the last document, reset it instead of deleting
                                                                return [{ type: null, document: null }];
                                                            } else {
                                                                // Otherwise, remove the document at the specified index
                                                                return prevDocuments?.filter((_: any, docIndex: any) => docIndex !== index);
                                                            }
                                                        });
                                                    }
                                                }}
                                                uploadedImage={document?.document}
                                                fileType={'pdf'}
                                                name={index}
                                                imgCardLabel={''}
                                                uploadTitle={'Click to upload or Drag & Drop pdf / png / jpeg / jpg here'}
                                                setUploadedImage={(name, imageUrl, file, type) => {
                                                    handleFileChangeMul(index, imageUrl, file, type);
                                                }}
                                            />
                                            <div
                                                style={{
                                                    cursor: 'pointer',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: "flex-start",
                                                    alignItems: 'flex-end',
                                                }}

                                            >
                                                <img
                                                    src={deleteIcon}
                                                    onClick={(e: any) => {
                                                        if (index !== 0) {
                                                            handleMediaDelMul(index);
                                                        } else {
                                                            setSupportingDocument((prevDocuments: any) => {
                                                                if (prevDocuments.length === 1) {
                                                                    // If it's the last document, reset it instead of deleting
                                                                    return [{ type: null, document: null }];
                                                                } else {
                                                                    // Otherwise, remove the document at the specified index
                                                                    return prevDocuments.filter((_: any, docIndex: any) => docIndex !== index);
                                                                }
                                                            });
                                                        }
                                                    }}
                                                    alt=""
                                                    style={{ width: '25px', height: "25px", filter: ((index == 0 && document?.document) || index > 0) ? '' : 'grayscale(100%)' }} />
                                            </div>

                                        </Box>
                                    </Box>
                                ))}
                            </Box>



                        </Box>
                    </Box>

                </Grid>

                <Divider style={{ margin: '0px' }} />
                <div
                    style={{
                        height: '10%',
                        padding: "10px",
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent:
                            deviceType === 'mobile' ? 'center' :
                                'space-between',
                        flexWrap: 'wrap',
                        gap: deviceType === 'mobile' ? '10px' : '0',
                        width: sidebarOpen == false ? "100%" : deviceType === 'mobile' ? '100%' : '83%',
                        border: deviceType === 'mobile' ? "" : "1px solid #ff00000d",
                        boxShadow: deviceType === 'mobile' ? "" : "3px 0px 6px #91919b54",
                        zIndex: 5,
                        backgroundColor: '#FFF',
                        bottom: 0,
                        position: 'absolute'
                    }}
                >

                    <ZupotsuButton
                        name={"Cancel"}
                        padding="20px, 20px, 20px, 20px"
                        handleClick={() => { navigation(-1) }}
                        leadingIcon={arrowLeft}
                        isCustomColors={true}
                        variant={'outlined'}
                        customTextColor="rgba(189, 189, 189, 1)"
                        customBgColor="#fff"
                        customBgColorOnhover="white"
                        customTextColorOnHover="#828282"
                        customOutlineColor={'1px solid rgba(189, 189, 189, 1)'}
                        customOutlineColorOnHover={'1px solid rgba(189, 189, 189, 1)'}
                    />

                    {/* <ZupotsuButton
                        leadingIcon={copy}
                        name="Save as Draft"
                        padding="20px, 16px, 20px, 16px"
                        handleClick={() => { }}
                        isCustomColors={true}
                        customBgColor={'rgba(226, 11, 24, 0.05)'}
                        customTextColor={'red'}
                        customBgColorOnhover={'#ffd7d7'}
                        customTextColorOnHover={'red'}
                        variant={'outlined'}
                        customOutlineColor={'0px solid rgba(189, 189, 189, 1)'}
                        customOutlineColorOnHover={'0px solid rgba(189, 189, 189, 1)'}
                        disabled={false}

                    /> */}

                    <ZupotsuButton
                        trailingIcon={eastWhiteArrow}
                        customBgColor={"rgba(226, 11, 24, 1)"}
                        padding="20px, 16px, 20px, 16px"
                        name={id ? "Update" : 'Submit & Proceed'}
                        customOutlineColor={'0px solid transparent'}
                        handleClick={() => {
                            if (validateFields()) {
                                if (id) {
                                    updateInvoice()
                                } else {
                                    if (!existingFormNames) {
                                        createInvoice()
                                    }
                                }
                            } else {

                            }

                        }}
                        disabled={false}
                    />
                </div>


            </div >
        )
    }
}

export default CreateInvoice
