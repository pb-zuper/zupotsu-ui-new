import { Box, Button, Checkbox, Divider, Grid, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb'
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import useDeviceType from '../../utils/DeviceType';
import { addCircle, arrowLeft, copy, deleteIcon, eastWhiteArrow, infoCircle } from '../../assets';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuImgUpload from '../../Molecules/zupotsu-img-upload/zupotsu-img-upload';
import { useNavigate } from 'react-router-dom';
import Apis from '../../services/apis';
import ZupotsuTextEditor from '../../Atoms/texteditor/ZupotsuTextEditor';

const CreateProposal = ({
    item,
    sidebarOpen,
    formname,
    forms,
    allproposals,
    proposalId,
    setProposalId,
    currency,
    setCurrency,
    existingFormNames,
    id
}: any) => {
    // console.log("forms", forms, "item", item, "proposalId", proposalId)
    const apis = new Apis();
    const [loader, setLoader] = useState(false)
    const deviceType = useDeviceType();
    const navigation = useNavigate()
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const [opportunities, setOpportunities] = useState("");
    const [coverlettermessage, setCoverLetterMessgae] = useState(`Dear Madam/ Sir,\n\nGreetings from Zupotsu!\n\n`);
    const [paymentterm, setPaymentTerm] = useState("Amount payable 100% in advance");
    const [investmentAmount, setInvestmentAmount] = useState("");
    const [othertermsandCondition, setOtherTermsandCondition] = useState("");
    const [aboutzupotsu, setAboutZupotsu] = useState<any>("Zupotsu is a martech platform on a mission to ‘digitise’ sports marketing. Zupotsu enables the discovery, engagement and evaluation (the ‘DEE’ framework) for every sports and esports marketing asset. Run by a bunch of tech and sports enthusiasts, our network and capabilities can fulfil any sports marketing requirement anywhere in the world.")
    const [closingSummary, setClosingSummary] = useState("The Zupotsu team can explore how the above (and more such opportunities) can be tailored to meet your requirements. We look forward to your feedback. Please feel free to contact us at +91 99878 31843 for any queries or clarifications.");
    const [extras, setExtras] = useState("")
    const [scopeandDeliverables, setScopeandDeliverables] = useState<any>([{ scope: '', deliverable: '' }]);
    const [openingline, setOpeningLine] = useState(`Zupotsu proposes a comprehensive ${opportunities || ""} package that includes:`);
    const [indicativeopportunitydetails, setIndicativeOpportunityDetails] = useState<any[]>([{ field: '', description: '' }]);
    const [opportunityOptions, setOpportunityOptions] = useState([]);

    const [generalInformation, setgeneralInformation] = useState<any>([
        { field: 'Dates', value: '', },
        { field: 'Venue', value: '', },
        { field: 'Designation', value: '', },
        { field: 'Live Platforms', value: '', },
    ]);


    const [details, setDetails] = useState([
        { field: 'Client Name', value: item?.buyer?.organization?.name || "" },
        { field: 'Brand', value: '', },
        { field: 'Category', value: '', },
        { field: 'Sports', value: Array.isArray(item?.sports) ? item.sports.join(', ') : item?.sports || '' },
        { field: 'Asset Type', value: item?.asset_type || "" },
        { field: 'Asset Name', value: item?.asset?.asset_detail?.[0]?.name || "" },
        { field: 'Opportunities', value: '', },
    ]);



    const handleAddField = () => {
        setgeneralInformation([...generalInformation, { field: '', value: '' }]);
    };




    useEffect(() => {
        if (item?.opportunities?.length > 0) {
            let arr: any = [];
            let indioppr: any = []
            let oppr: any = [];
            item?.opportunities?.map((item: any, index: any) => {
                arr.push({
                    scope: item?.opportunity,
                    deliverable: null
                })
                indioppr.push({
                    field: item?.opportunity,
                    description: null
                })
                oppr.push(item?.opportunity)
            })
            setIndicativeOpportunityDetails(indioppr)
            setOpeningLine(`Zupotsu proposes a comprehensive ${oppr?.join(',') || ''} package that includes:`)
            setOpportunities(oppr?.join(',') || '')
            setDetails(prevDetails => {
                const existingIndex = prevDetails.findIndex(item => item.field === 'Opportunities');
                if (existingIndex !== -1) {
                    const updatedDetails = [...prevDetails];
                    updatedDetails[existingIndex].value = oppr?.join(',') || '';
                    return updatedDetails;
                } else {
                    return [
                        ...prevDetails,
                        { field: 'Opportunities', value: oppr?.join(',') || '' }
                    ];
                }
            });

            setOpeningLine(`Zupotsu proposes a comprehensive ${oppr?.join(',') || ''} package that includes:`)
            setOpportunityOptions(oppr)
            setScopeandDeliverables(arr)
        } else {
            if (proposalId && allproposals.length > 0) {
                setLoader(true)
                const filteredProposal = allproposals.find((item: any) => item.id === proposalId);
                let oppr: any = [];
                filteredProposal?.opportunities?.map((item: any, index: any) => {
                    oppr.push(item?.opportunity)
                })
                setOpportunityOptions(oppr)
                setLoader(false)
            }
        }


        if (forms && Object.keys(forms).length > 0) {
            setPaymentTerm(forms?.payment_term)
            setExtras(forms?.extras)
            setDetails(forms?.details || [])
            setCoverLetterMessgae(forms?.cover_letter_message)
            setInvestmentAmount(forms?.investment_amount)
            setClosingSummary(forms?.closing_summary)
            setScopeandDeliverables(forms?.scope_and_deliverables || [])
            setAboutZupotsu(forms?.about_zupotsu)
            setOtherTermsandCondition(forms?.other_terms_and_conditions)
            setCurrency(forms?.currency)
            setgeneralInformation(forms?.general_information)
            if (forms?.indicative_opportunity_details?.length > 0) {
                setIndicativeOpportunityDetails(forms?.indicative_opportunity_details)
            }
        }
    }, [])


    const validateFields = () => {
        const newErrors: any = {};
        const detailsMissingValues = details?.some(detail => !detail.field || !detail.value);
        const scopeanddeliverableMissingValues = scopeandDeliverables?.some((item: any) => !item.scope || !item.deliverable);
        const generalInformationMissingValues = generalInformation?.some((item: any) => !item.field || !item.value);
        // Validate each field and add to newErrors if empty
        if (!formname) newErrors.error = "Form name is required";
        else if (!currency) newErrors.error = "Currency is required";
        else if (!coverlettermessage) newErrors.error = "Cover letter message is required";
        else if (!closingSummary) newErrors.error = "Closing summary is required";
        else if (!aboutzupotsu) newErrors.error = "About Zupotsu is required";
        else if (!othertermsandCondition) newErrors.error = "Other terms and conditions are required";
        else if (!paymentterm) newErrors.error = "Payment term is required";
        else if (!investmentAmount) newErrors.error = "Investment amount is required";
        else if (!details) newErrors.error = "Details are required";
        else if (detailsMissingValues) {
            newErrors.error = "All fields in details must be filled";
        }
        else if (generalInformationMissingValues) {
            newErrors.error = "All fields in general Information must be filled";
        }

        else if (scopeanddeliverableMissingValues) {
            newErrors.error = "All fields in scopes and deliverables must be filled";
        }


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


    const createProposalApi = async () => {

        const body = {
            "name": formname,
            "proposal_id": parseInt(item?.id),
            "form_type": "proposal",
            "form": {
                "details": details,
                "cover_letter_message": coverlettermessage,
                "opening_line": openingline,
                "indicative_opportunity_details": indicativeopportunitydetails || [],
                "general_information": generalInformation || [],
                "scope_and_deliverables": scopeandDeliverables || [],
                "extras": extras || null,
                "payment_term": paymentterm,
                "investment_amount": investmentAmount,
                "closing_summary": closingSummary,
                "about_zupotsu": aboutzupotsu,
                "other_terms_and_conditions": othertermsandCondition,
                "currency": currency,
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
        } catch (error: any) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
            });
            setLoader(false)
        }
    }

    const updateProposalApi = async () => {

        const body = {
            "id": parseInt(id),
            "name": formname,
            "proposal_id": parseInt(proposalId),
            "form_type": "proposal",
            "form": {
                "details": details,
                "cover_letter_message": coverlettermessage,
                "opening_line": openingline,
                "indicative_opportunity_details": indicativeopportunitydetails || [],
                "general_information": generalInformation || [],
                "scope_and_deliverables": scopeandDeliverables || [],
                "extras": extras || null,
                "payment_term": paymentterm,
                "investment_amount": investmentAmount,
                "closing_summary": closingSummary,
                "about_zupotsu": aboutzupotsu,
                "other_terms_and_conditions": othertermsandCondition,
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
                    message: 'Proposal Form updated successfully!!'
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

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // console.log("generalInformation", generalInformation)


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
                <Grid xs={12} md={12} lg={12} width={"100%"} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', scrollbarWidth: 'none', height: '100%', alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', gap: '0px', }}>


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
                            Create Proposal
                        </Typography>
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
                                Details
                            </p>

                            {(details?.length < 9) ? (
                                <div
                                    onClick={() => { setDetails([...details, { field: '', value: '' }]) }}
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

                                    >
                                        Add New
                                    </Typography>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        gap: '10px',
                                    }}
                                ></div>
                            )}
                        </div>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "flex-start",
                                backgroundColor: '#FFF',
                                width: '98%',
                                alignItems: 'center',
                                marginTop: '10px'
                            }}
                        >
                            {details?.map((item: any, index: any) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        backgroundColor: '#FFF',
                                        width: '100%',
                                        padding: "10px",
                                        paddingBottom: '0px',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            backgroundColor: '#FFF',
                                            width: '45%',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <ZupotsuTextfield
                                            title={index == 0 ? "Field Name" : ""}
                                            name={"field"}
                                            isRequired={index == 0 ? true : false}
                                            value={item?.field || ""}
                                            placeholder={`Enter ${item?.field || ""}`}
                                            handleChange={(event) => {
                                                const updatedFields = [...details];
                                                updatedFields[index].field = event.target.value;
                                                setDetails(updatedFields);
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            backgroundColor: '#FFF',
                                            width: '45%',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <ZupotsuTextfield
                                            title={index == 0 ? "Value" : ""}
                                            name={"value"}
                                            isRequired={index == 0 ? true : false}
                                            value={item?.value || ""}
                                            placeholder={`Enter ${item?.field || ""}`}
                                            handleChange={(event) => {
                                                const updatedFields = [...details];
                                                updatedFields[index].value = event.target.value;
                                                setDetails(updatedFields);
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            backgroundColor: '#FFF',
                                            width: '5%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                            onClick={() => {
                                                if (index !== 0) {
                                                    setDetails((prevData: any) => {
                                                        return prevData.filter((_: any, i: any) => i !== index);
                                                    });
                                                }
                                            }}
                                        >
                                            <img
                                                src={deleteIcon}
                                                alt="Delete"
                                                style={{
                                                    width: '32px',
                                                    height: "32px",
                                                    filter: index === 0 ? 'grayscale(100%)' : ''
                                                }}
                                            />
                                        </div>
                                    </Box>
                                </Box>
                            ))}


                        </Box>



                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "space-evenly",
                                backgroundColor: '#FFF',
                                padding: "10px",
                                width: '98%',
                                alignItems: 'center',
                                paddingTop: '10px'
                            }}
                        >
                            {/* <ZupotsuTextEditor
                                title="Cover Letter / Message"
                                name="coverletter/message"
                                isRequired={false}
                                value={coverlettermessage}
                                placeholder={"Enter Cover Letter/message"}
                                handleChange={(event:any) => { setCoverLetterMessgae(event.target.value) }}
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
                                title="Cover Letter / Message"
                                name="coverletter/message"
                                value={coverlettermessage}
                                isRequired={true}
                                placeholder={"Enter Cover Letter/message"}
                                handleChange={(event) => { setCoverLetterMessgae(event.target.value) }}
                            />

                        </Box>


                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                backgroundColor: 'rgba(239, 239, 239, 1)',
                                width: '98%',
                                alignItems: 'center',
                                marginTop: '10px',
                                padding: "10px",
                                borderRadius: "5px 5px 0px 0px",
                                border: "0px 1px 0px 0px"

                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    backgroundColor: 'rgba(239, 239, 239, 1)',
                                    alignItems: "flex-start",
                                }}
                            >
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    lineHeight: "21px",
                                    textAlign: "left",
                                    margin: 0,
                                    padding: 0
                                }}>
                                    Indicative Opportunity Details
                                </p>

                            </div>
                            {(indicativeopportunitydetails?.length < 5) ? (<div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    gap: '10px',
                                }}
                                onClick={() => { setIndicativeOpportunityDetails([...indicativeopportunitydetails, { field: '', description: '' }]) }}
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
                                    Add New
                                </Typography>
                            </div>) : (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        gap: '10px',
                                    }}
                                >
                                </div>
                            )}
                        </div>


                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "flex-start",
                                backgroundColor: '#FFF',
                                width: '98%',
                                alignItems: 'center',
                                marginTop: '10px'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: "flex-start",
                                    gap: '20px',
                                    width: '98%',
                                    backgroundColor: '#FFF',
                                    alignItems: 'center',
                                }}
                            >
                                <ZupotsuTextfield
                                    multiline={true}
                                    rows={4}
                                    title="Opening Line"
                                    name="openingline"
                                    value={openingline}
                                    placeholder={'Enter Opening Line'}
                                    handleChange={(event) => {
                                        setOpeningLine(event.target.value)
                                    }}
                                />


                                {indicativeopportunitydetails?.map((item, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: "space-between",
                                                backgroundColor: '#FFF',
                                                width: '100%',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: "column",
                                                    justifyContent: "flex-start",
                                                    backgroundColor: '#FFF',
                                                    width: '93%',
                                                    alignItems: "flex-start",
                                                }}
                                            >

                                                <ZupotsuTextfield
                                                    title=""
                                                    name="field"
                                                    value={item.field}
                                                    placeholder={'Select field'}
                                                    handleChange={(event) => {
                                                        setIndicativeOpportunityDetails((prevData) => {
                                                            const updatedData = [...prevData];
                                                            updatedData[index].field = event.target.value;
                                                            return updatedData;
                                                        });
                                                    }}
                                                />
                                                <ZupotsuTextfield
                                                    multiline={true}
                                                    rows={4}
                                                    title=""
                                                    name="description"
                                                    value={item.description}
                                                    placeholder={'Enter description'}
                                                    handleChange={(event) => {
                                                        setIndicativeOpportunityDetails((prevData) => {
                                                            const updatedData = [...prevData];
                                                            updatedData[index].description = event.target.value;
                                                            return updatedData;
                                                        });
                                                    }}
                                                />
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    width: '5%',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        cursor: 'pointer',
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center'
                                                    }}
                                                    onClick={() => {
                                                        setIndicativeOpportunityDetails((prevData) =>
                                                            prevData.filter((_, i) => i !== index)
                                                        );
                                                    }}
                                                >
                                                    <img src={deleteIcon} alt="" style={{
                                                        width: '32px', height: "32px",
                                                        // filter: index === 0 ? 'grayscale(100%)' : ''
                                                    }} />
                                                </div>
                                            </Box>
                                        </Box>
                                    );
                                })}

                            </Box>

                        </Box>


                        <div
                            style={{
                                display: 'flex',
                                flexDirection: "row",
                                justifyContent: "space-between",
                                backgroundColor: 'rgba(239, 239, 239, 1)',
                                width: '98%',
                                alignItems: 'center',
                                padding: "10px",
                                marginTop: '20px',
                                borderRadius: "5px 5px 0px 0px",
                                border: "0px 1px 0px 0px"

                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    backgroundColor: 'rgba(239, 239, 239, 1)',
                                    alignItems: "flex-start",

                                }}
                            >
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    lineHeight: "21px",
                                    textAlign: "left",
                                    margin: 0,
                                    padding: 0
                                }}>
                                    General information
                                </p>

                            </div>


                            {(generalInformation?.length < 6) ? (<div
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
                                    onClick={() => { handleAddField() }}
                                >
                                    Add New
                                </Typography>
                            </div>) : (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        gap: '10px',
                                    }}
                                ></div>
                            )}

                        </div>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "flex-start",
                                backgroundColor: '#FFF',
                                width: '98%',
                                alignItems: 'center',
                            }}
                        >

                            {generalInformation.map((field: any, index: any) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        backgroundColor: '#FFF',
                                        width: '100%',
                                        padding: '10px',
                                        paddingBottom: '0px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            backgroundColor: '#FFF',
                                            width: '45%',
                                        }}
                                    >
                                        <ZupotsuTextfield
                                            title={index === 0 ? "Field Name" : ""}
                                            type="text"
                                            name={`field-${index}`}
                                            value={field?.field || ''}
                                            placeholder="Enter field"
                                            handleChange={(event) => {
                                                const updatedFields = [...generalInformation];
                                                updatedFields[index] = {
                                                    ...updatedFields[index],
                                                    field: event.target.value
                                                };
                                                setgeneralInformation(updatedFields);
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            backgroundColor: '#FFF',
                                            width: '45%',
                                        }}
                                    >
                                        <ZupotsuTextfield
                                            title={index === 0 ? "Description" : ""}
                                            type="text"
                                            name={`description-${index}`}
                                            value={field.value || ''}
                                            placeholder="Enter Description"
                                            handleChange={(event) => {
                                                const updatedFields = [...generalInformation];
                                                updatedFields[index] = {
                                                    ...updatedFields[index],
                                                    value: event.target.value
                                                };
                                                setgeneralInformation(updatedFields);
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            backgroundColor: '#FFF',
                                            width: '5%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                            onClick={() => {
                                                if (index !== 0) {
                                                    setgeneralInformation((prevData: any) => {
                                                        return prevData.filter((_: any, i: any) => i !== index);
                                                    });
                                                }
                                            }}
                                        >
                                            <img
                                                src={deleteIcon}
                                                alt="Delete"
                                                style={{
                                                    width: '32px',
                                                    height: "32px",
                                                    filter: index === 0 ? 'grayscale(100%)' : ''
                                                }}
                                            />
                                        </div>
                                    </Box>
                                </Box>
                            ))}

                        </Box>




                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "flex-start",
                                backgroundColor: '#FFF',
                                width: '100%',
                                alignItems: 'center',
                                marginTop: '10px'
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
                                    border: "0px 1px 0px 0px",
                                    marginTop: '10px'
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
                                    Scope and Deliverables
                                </p>

                                {(scopeandDeliverables?.length < 8) ? (<div
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
                                        onClick={() => { setScopeandDeliverables([...scopeandDeliverables, { scope: '', deliverable: '' }]) }}
                                    >
                                        Add New
                                    </Typography>
                                </div>) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            gap: '10px',
                                        }}
                                    >
                                    </div>
                                )}
                            </div>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "flex-start",
                                    flexWrap: 'wrap',
                                    backgroundColor: '#FFF',
                                    width: '98%',
                                    alignItems: 'center',
                                }}
                            >
                                {scopeandDeliverables?.map((item: any, index: any) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: "space-between",
                                            backgroundColor: '#FFF',
                                            width: '100%',
                                            padding: "10px",
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                backgroundColor: '#FFF',
                                                width: '45%',
                                                alignItems: 'flex-start',
                                            }}
                                        >
                                            <ZupotsuTextfield
                                                title={index == 0 ? "Scope Name" : ""}
                                                name={item?.scope || ""}
                                                isRequired={index == 0 ? true : false}
                                                value={item?.scope || ""}
                                                placeholder={`Enter ${item?.scope || ""}`}
                                                handleChange={(event) => {
                                                    const updatedFields = [...scopeandDeliverables];
                                                    updatedFields[index].scope = event.target.value;
                                                    setScopeandDeliverables(updatedFields);
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                backgroundColor: '#FFF',
                                                width: '45%',
                                                alignItems: 'flex-start',
                                            }}
                                        >
                                            <ZupotsuTextfield
                                                title={index == 0 ? "Deliverable" : ""}
                                                name={"description"}
                                                isRequired={index == 0 ? true : false}
                                                value={item?.deliverable || ""}
                                                placeholder={`Enter ${item?.scope || ""}`}
                                                handleChange={(event) => {
                                                    const updatedFields = [...scopeandDeliverables];
                                                    updatedFields[index].deliverable = event.target.value;
                                                    setScopeandDeliverables(updatedFields);
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                backgroundColor: '#FFF',
                                                width: '5%',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    cursor: 'pointer',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center'
                                                }}
                                                onClick={() => {
                                                    if (index !== 0) {
                                                        setScopeandDeliverables((prevData: any) => {
                                                            return prevData.filter((_: any, i: any) => i !== index);
                                                        });
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={deleteIcon}
                                                    alt="Delete"
                                                    style={{
                                                        width: '32px',
                                                        height: "32px",
                                                        filter: index === 0 ? 'grayscale(100%)' : ''
                                                    }}
                                                />
                                            </div>
                                        </Box>
                                    </Box>
                                ))}


                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-evenly",
                                    backgroundColor: '#FFF',
                                    width: '98%',
                                    padding: "10px",
                                    alignItems: 'center',
                                }}
                            >
                                <ZupotsuTextfield
                                    multiline={true}
                                    rows={4}
                                    title="Extras (if applicable)"
                                    name="extras"
                                    value={extras}
                                    placeholder={"Extras"}
                                    handleChange={(event) => { setExtras(event.target.value) }}
                                />
                            </Box>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "flex-start",
                                    backgroundColor: 'rgba(239, 239, 239, 1)',
                                    width: '98%',
                                    height: "40px",
                                    alignItems: 'center',
                                    padding: "16px",
                                    borderRadius: "5px 5px 0px 0px",
                                    border: "0px 1px 0px 0px",
                                    marginTop: '10px'
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
                                    Commercials
                                </p>
                            </div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-between",
                                    backgroundColor: '#FFF',
                                    width: '98%',
                                    padding: "10px",
                                    alignItems: 'center',
                                }}
                            >

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        backgroundColor: '#FFF',
                                        width: '48%',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <ZupotsuTextfield
                                        title="Investment Amount"
                                        name="investmentamount"
                                        value={investmentAmount}
                                        type='text'
                                        isRequired={true}
                                        placeholder={"Enter Investment Amount"}
                                        handleChange={(event) => { setInvestmentAmount(event.target.value) }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        backgroundColor: '#FFF',
                                        width: '48%',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <ZupotsuTextfield
                                        title="Payment Terms"
                                        name="paymentterms"
                                        isRequired={true}
                                        value={paymentterm}
                                        placeholder={"Enter Payment Terms"}
                                        handleChange={(event) => { setPaymentTerm(event.target.value) }}
                                    />
                                </Box>

                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-evenly",
                                    backgroundColor: '#FFF',
                                    width: '98%',
                                    padding: "10px",
                                    alignItems: 'center',
                                }}
                            >
                                {/* <ZupotsuTextEditor
                                    title="Terms and conditions"
                                    isRequired={true}
                                    name="termsandCondition"
                                    value={termsandCondition}
                                    placeholder="Enter terms Condition"
                                    handleChange={(event: any) => { setTermsandCondition(event.target.value); }}
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
                                    title="Other Terms and conditions"
                                    name="othertermsandconditions"
                                    value={othertermsandCondition}
                                    placeholder="Enter other terms Condition"
                                    handleChange={(event: any) => { setOtherTermsandCondition(event.target.value); }}
                                />


                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-evenly",
                                    backgroundColor: '#FFF',
                                    width: '98%',
                                    alignItems: 'center',
                                    padding: "10px",
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
                                    width: '98%',
                                    alignItems: 'center',
                                    padding: "10px",
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
                                    updateProposalApi()
                                } else {
                                    if (!existingFormNames) {
                                        createProposalApi()
                                    }
                                }
                            } else {

                            }
                        }}
                    />
                </div>

            </div >
        )
    }
}

export default CreateProposal
