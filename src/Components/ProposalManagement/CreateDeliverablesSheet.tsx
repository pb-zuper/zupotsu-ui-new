import { Box, Checkbox, Divider, Grid, InputAdornment, TextField, Typography, IconButton, Snackbar } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import useDeviceType from '../../utils/DeviceType';
import { addCircle, arrowLeft, copy, deleteIcon, eastWhiteArrow, infoCircle, rearrange, UploadIcon } from '../../assets';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuImgUpload from '../../Molecules/zupotsu-img-upload/zupotsu-img-upload';
import { useNavigate } from 'react-router-dom';
import Apis from '../../services/apis';
import ZupotsuPhotoUpload from '../../Molecules/zupotsuphotoupload/zupotsu-photo-upload';


const CreateDeliverablesSheet = ({ item, sidebarOpen, forms, proposalId, setProposalId, formname, id, allproposals, currency, setCurrency, existingFormNames }: any) => {
    const [deliverables, setDeliverables] = useState<any>([]);
    const [assetname, setAssetName] = useState<any>(item?.asset?.asset_detail?.[0]?.name)
    const [opportunity, setopportunity] = useState<any>(item?.opportunities)
    const [aboutzupotsu, setAboutZupotsu] = useState('Zupotsu is a martech platform on a mission to ‘digitise’ sports marketing. Zupotsu enables the discovery, engagement and evaluation (the ‘DEE’ framework) for every sports and esports marketing asset. Run by a bunch of tech and sports enthusiasts, our network and capabilities can fulfil any sports marketing requirement anywhere in the world.');
    const [closingsummary, setClosingSummary] = useState('The Zupotsu team can explore how the above (and more such opportunities) can be tailored to meet your requirements.');
    const [loader, setLoader] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const apis = new Apis();
    const fileInputRef = useRef<any>(null);
    const [fileName, setFileName] = useState('');
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const deviceType = useDeviceType();
    const navigation = useNavigate()

    useEffect(() => {
        if (forms && Object.keys(forms).length > 0) {
            setAssetName(forms?.asset_name)
            setDeliverables(forms?.deliverables)
            setopportunity(forms?.opportunities)
            setAboutZupotsu(forms?.about_zupotsu)
            setClosingSummary(forms?.closing_summary)
            setCurrency(forms?.currency)
        } else {
            setDeliverables([{ description: '', specification: '', quantity: 0, price: 0, img_link: null, img_code: null }])
            if (proposalId && allproposals.length > 0) {
                setLoader(true)
                const filteredProposal = allproposals.find((item: any) => item.id === proposalId);
                let oppr: any = [];
                filteredProposal?.opportunities?.map((item: any, index: any) => {
                    oppr.push(item?.opportunity)
                })
                setopportunity(oppr?.join(',') || '')
                setLoader(false)
            }
        }
    }, [forms])

    const proposal_id = item?.id;

    const validateFields = () => {
        const newErrors: any = {};
        const deliverablesMissingValues = deliverables?.some((item: any) => !item.description || !item.specification || !item.quantity);
        if (!formname) newErrors.error = "Form name is required";
        else if (!currency) newErrors.error = "Currency is required";
        else if (!assetname) newErrors.error = "Asset Name is required";
        else if (!closingsummary) newErrors.error = "Closing summary is required";
        else if (!aboutzupotsu) newErrors.error = "About Zupotsu is required";
        else if (!opportunity) newErrors.error = "Opportunity is required";
        else if (deliverablesMissingValues) {
            newErrors.error = "All fields in Deliverables must be filled";
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


    const createDeliverySheet = async () => {

        const body = {
            "name": formname,
            "proposal_id": parseInt(item?.id),
            "form_type": "deliverable_sheet",
            "form": {
                "deliverables": deliverables,
                "asset_name": assetname,
                "opportunities": opportunity,
                "about_zupotsu": aboutzupotsu,
                "closing_summary": closingsummary,
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
                    message: 'Deliverable Sheet created successfully!!'
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

    const updateDeliverySheet = async () => {

        const body = {
            "id": parseInt(id),
            "name": formname,
            "proposal_id": parseInt(proposalId),
            "form_type": "deliverable_sheet",
            "form": {
                "deliverables": deliverables,
                "asset_name": assetname,
                "opportunities": opportunity,
                "about_zupotsu": aboutzupotsu,
                "closing_summary": closingsummary,
                "currency": currency,
            }
        }

        setLoader(true)
        try {
            const response = await apis.updateForms(body, id);
            if (response?.data?.status == "success") {
                navigation("/allforms")
                setLoader(false)
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
                <Grid xs={12} md={12} lg={12} width={"100%"} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', overflowY: "scroll", scrollbarWidth: 'none', alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', gap: '0px', }}>
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
                            Create Deliverables Sheet
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "space-evenly",
                                backgroundColor: '#FFF',
                                padding: "10px",
                                width: '98%',
                                alignItems: 'center',
                                paddingTop: '0px'
                            }}
                        >
                            <ZupotsuTextfield
                                title="Asset Name"
                                name="assetname"
                                isRequired={true}
                                value={assetname}
                                placeholder={"Enter Asset Name"}
                                handleChange={(event: any) => { setAssetName(event.target.value) }}
                            />
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
                                paddingTop: '0px'
                            }}
                        >
                            <ZupotsuTextfield
                                title="Opportunities"
                                name="opportunities"
                                isRequired={true}
                                value={opportunity}
                                placeholder={"Enter Opportunities"}
                                handleChange={(event) => { setopportunity(event.target.value) }}
                            />
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
                                    justifyContent: "flex-start",
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
                                    List Deliverables
                                </p>
                            </div>
                            {Array.isArray(deliverables) && deliverables?.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        width: '96%',
                                        marginTop: '10px',
                                        alignItems: 'center',
                                    }}
                                >

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: deviceType == "mobile" ? "column" : 'row',
                                            justifyContent: deviceType == "mobile" ? "flex-start" : "space-between",
                                            gap: "2%",
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: "space-between",
                                                width: deviceType == "mobile" ? "100%" : '50%',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    gap: '0px',
                                                    width: deviceType == "mobile" ? "48%" : '48%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >
                                                <ZupotsuTextfield
                                                    title={index == 0 ? "Description" : ""}
                                                    name="description"
                                                    value={item?.description}
                                                    isRequired={index == 0 ? true : false}
                                                    placeholder={"Enter description"}
                                                    handleChange={(event: any) => {
                                                        setDeliverables((prevData: any) => {
                                                            let updatedData = [...prevData];
                                                            updatedData[index].description = event.target.value
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
                                                    width: deviceType == "mobile" ? "48%" : '48%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >
                                                <ZupotsuTextfield
                                                    title={index == 0 ? "Specifications" : ""}
                                                    name="specifications"
                                                    value={item?.specification}
                                                    isRequired={index == 0 ? true : false}
                                                    placeholder={"Enter Specifications"}
                                                    handleChange={(event: any) => {
                                                        setDeliverables((prevData: any) => {
                                                            let updatedData = [...prevData];
                                                            updatedData[index].specification = event.target.value
                                                            return updatedData;
                                                        });
                                                    }}
                                                />
                                            </div>


                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: "space-between",
                                                width: deviceType == "mobile" ? "100%" : '50%',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: "center",
                                                    backgroundColor: '#FFF',
                                                    width: deviceType == "mobile" ? "30%" : '30%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >
                                                <ZupotsuTextfield
                                                    title={index == 0 ? "Quantity" : ""}
                                                    name="quantity"
                                                    value={item?.quantity}
                                                    isRequired={index == 0 ? true : false}
                                                    type='number'
                                                    placeholder={"Enter Quantity"}
                                                    handleChange={(event: any) => {
                                                        setDeliverables((prevData: any) => {
                                                            let updatedData = [...prevData];
                                                            updatedData[index].quantity = parseInt(event.target.value)
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
                                                    width: deviceType == "mobile" ? "30%" : '30%',
                                                    alignItems: 'center',
                                                    padding: '0px'
                                                }}
                                            >
                                                <ZupotsuTextfield
                                                    title={index == 0 ? "Price (optional)" : ""}
                                                    name="price"
                                                    value={item?.price}
                                                    type='number'
                                                    placeholder={"Enter price"}
                                                    handleChange={(event: any) => {
                                                        setDeliverables((prevData: any) => {
                                                            let updatedData = [...prevData];
                                                            updatedData[index].price = parseInt(event.target.value)
                                                            return updatedData;
                                                        });
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: "flex-end",
                                                    backgroundColor: '#FFF',
                                                    width: deviceType == "mobile" ? "30%" : '30%',
                                                    alignItems: "space-between",
                                                    padding: '0px',
                                                    marginTop: index == 0 ? "0px" : "10px"
                                                }}
                                            >

                                                <ZupotsuPhotoUpload
                                                    uploadedImage={item?.img_link}
                                                    imgCardLabel={index == 0 ? "Upload Photo" : ""}
                                                    name="photoupload"
                                                    fileType={'jpg'}
                                                    onDelete={(name, imageUrl, file) => {
                                                        setDeliverables((prevData: any) => {
                                                            let updatedData = [...prevData];
                                                            updatedData[index].img_link = null
                                                            updatedData[index].img_code = null
                                                            return updatedData;
                                                        });
                                                    }}
                                                    placeholder={"Upload Photo "}
                                                    setUploadedImage={(name, imageUrl, file) => {
                                                        setDeliverables((prevData: any) => {
                                                            let updatedData = [...prevData];
                                                            updatedData[index].img_link = imageUrl
                                                            updatedData[index].img_code = `ZUPPR${proposal_id}${index + 1}`
                                                            return updatedData;
                                                        });
                                                    }}

                                                    showToastMessage={false}
                                                />


                                            </div>


                                        </div>

                                    </div>




                                    <div
                                        style={{

                                            width: '4%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            padding: 0,
                                            margin: 0
                                        }}

                                    >
                                        <button
                                            onClick={(e: any) => {
                                                if (index != 0) {
                                                    setDeliverables((prevData: any) => {
                                                        let updatedData = [...prevData];
                                                        updatedData = updatedData.filter((item: any, i: any) => i !== index);
                                                        return updatedData;
                                                    });
                                                }
                                            }}
                                            style={{
                                                cursor: 'pointer', width: '30px', height: "30px", backgroundColor: "transparent", border: "0px solid transparent",
                                                padding: 0,
                                                margin: 0,
                                                marginBottom: "10px"
                                            }}>
                                            <img src={deleteIcon} alt="" style={{
                                                width: '30px', height: "30px", filter: index == 0 ? 'grayscale(100%)' : '', padding: 0,
                                                margin: 0
                                            }} />
                                        </button>
                                    </div>
                                </div>

                            ))}

                            {(deliverables?.length < 10) && (<div
                                onClick={() => {
                                    setDeliverables([
                                        ...deliverables,
                                        { description: '', specification: '', quantity: 0, price: 0, img_link: null, img_code: null }
                                    ]);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    gap: '10px',
                                    marginTop: '20px'
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
                                    Add New Row
                                </Typography>
                            </div>)}
                        </div>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "space-evenly",
                                backgroundColor: '#FFF',
                                width: '98%',
                                alignItems: 'center',
                                padding: '10px'
                            }}
                        >

                            <ZupotsuTextfield
                                multiline={true}
                                rows={4}
                                title="Closing Summary"
                                isRequired={true}
                                name="closingsummary"
                                value={closingsummary}
                                placeholder="Enter Closing Summary"
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
                                padding: '10px'
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



                    <ZupotsuButton
                        trailingIcon={eastWhiteArrow}
                        customBgColor={"rgba(226, 11, 24, 1)"}
                        padding="20px, 16px, 20px, 16px"
                        name={id ? "Update" : 'Submit & Proceed'}
                        customOutlineColor={'0px solid transparent'}
                        handleClick={() => {
                            if (validateFields()) {
                                if (id) {
                                    updateDeliverySheet()
                                } else {
                                    if (!existingFormNames) {
                                        createDeliverySheet()
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

export default CreateDeliverablesSheet
