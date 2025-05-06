import React, { useCallback, useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { CallIcon, CricBall, CricketBall, EditIconn, Facebook, LocationIcon, SmsIcon, briefcaseIcon, editAsset, editIcon, fb1, instagramI } from '../../assets';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import useDeviceType from '../../utils/DeviceType';
import SocialHandle from '../ListAsset/SocialHandle';
import { Button } from '@mui/material';
const ZupotsuSellerDetails = () => {
    const [isEdit, setIsedit] = useState(false)
    const [editingObject, setEditingObject] = useState([])
    const [formData, setFormData] = useState([])
    const [socialLinks, setSocialLinks] = useState()
    const deviceType = useDeviceType()
    const handleEdit = (e) => {
        const { name, value } = e.target;
        setEditingObject((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const onChangeSocial = useCallback((param, isValidationError) => {
        // setUrlLinksError(isValidationError);
        setSocialLinks(param);
    }, []);
    const sellerDetails = [
        {
            name: 'email',
            value: 'prateek@gmail.com',
            icon: SmsIcon
        },
        {
            name: 'mobileno',
            value: '9499485921',
            icon: CallIcon
        },
        {
            name: 'work',
            value: 'Deloitte',
            icon: briefcaseIcon
        },
        {
            name: 'location',
            value: 'Bangalore',
            icon: LocationIcon
        },
        {
            name: 'sport',
            value: 'Cricket',
            icon: CricBall
        },
        {
            name: 'facebook',
            value: 'prverma',
            icon: Facebook
        }, {
            name: 'instagram',
            value: 'prverma',
            icon: instagramI
        }
    ]
    return (
        <>
            {(!isEdit) ? (<div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '15px', padding: '20px' }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(224, 224, 224, 1)',
                    borderRadius: '264.29px',
                    position: 'relative'
                }}>
                    <h1 style={{
                        fontFamily: 'Inter',
                        fontSize: '60px',
                        fontWeight: 600,
                        lineHeight: '72.61px',
                        letterSpacing: '0.04em',
                        textAlign: 'left',
                        color: 'rgba(130, 130, 130, 1)',
                        position: 'absolute'
                    }}>P</h1>
                </div>
                <div style={{ width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-start", }}>
                        <p
                            style={{
                                fontFamily: "Inter",
                                fontSize: "20px",
                                fontWeight: 700,
                                lineHeight: "30px",
                                textAlign: "left",
                                margin: 0
                            }}
                        >PRATEEK VERMA</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-start", flexWrap: 'wrap', }}>
                        {
                            sellerDetails.map((item, index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: '10px', marginRight: '40px' }}>
                                    <img src={item?.icon} style={{ color: 'rgba(130, 130, 130, 1)', backgroundColor: "transparent" }} />
                                    <p style={{
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "21px",
                                        textAlign: "center",
                                        textTransform: 'capitalize'
                                    }}>{item.name}</p>
                                </div>
                            ))
                        }
                    </div>





                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: "flex-start", }}>
                    <button
                        onClick={() => { setIsedit(true) }}
                        style={{
                            width: "130px",
                            height: "44px",
                            // padding: "12px 16px 12px 16px",
                            gap: "8px",
                            borderRadius: "5px",
                            border: "0.5px solid rgba(189, 189, 189, 1)",
                            opacity: "0px",
                            borderColor: 'rgba(189, 189, 189, 1)',
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',
                        }}>
                        <img src={EditIconn} style={{
                            color: 'rgba(130, 130, 130, 1)', width: " 16px",
                            height: "16px",
                            gap: "0px"

                        }} />
                        <p
                            style={{
                                fontFamily: "Inter",
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "21px",
                                textAlign: "left",
                                color: "rgba(130,130,130,0.9)",
                                margin: 0
                            }}
                        >Edit Profile</p>
                    </button>
                </div>
            </div >) : (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '15px', padding: '20px' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '15px', padding: '20px' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(224, 224, 224, 1)',
                            borderRadius: '264.29px',
                            position: 'relative'
                        }}>
                            <h1 style={{
                                fontFamily: 'Inter',
                                fontSize: '60px',
                                fontWeight: 600,
                                lineHeight: '72.61px',
                                letterSpacing: '0.04em',
                                textAlign: 'left',
                                color: 'rgba(130, 130, 130, 1)',
                                position: 'absolute'
                            }}>P</h1>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', gap: '15px' }}>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', }}>

                            <div style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", flexWrap: 'wrap', }}>
                                <ZupotsuTextfield
                                    title={"Name"}
                                    placeholder={"Enter name"}
                                    value={editingObject["name"]}
                                    isRequired={true}
                                    type={"text"}
                                    name={"name"}
                                    multiline={false}
                                    toolTipMessage={"Enter the name"}
                                    handleChange={(e) => { handleEdit(e) }}
                                />
                            </div>
                            <div style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", flexWrap: 'wrap', }}>
                                <ZupotsuTextfield
                                    title={"Mobile No"}
                                    placeholder={"Enter Mobile No"}
                                    value={editingObject["mobileno"]}
                                    isRequired={true}
                                    type={"text"}
                                    name={"mobileno"}
                                    multiline={false}
                                    toolTipMessage={"Enter the Mobile No"}
                                    handleChange={(e) => { handleEdit(e) }}
                                />
                            </div>
                            <div style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", flexWrap: 'wrap', }}>
                                <ZupotsuTextfield
                                    title={"Email"}
                                    placeholder={"Enter Email"}
                                    value={editingObject["email"]}
                                    isRequired={true}
                                    type={"text"}
                                    name={"email"}
                                    multiline={false}
                                    toolTipMessage={"Enter the email"}
                                    handleChange={(e) => { handleEdit(e) }}
                                />
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', }}>

                            <div style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", flexWrap: 'wrap', }}>
                                <ZupotsuTextfield
                                    title={"Organisation"}
                                    placeholder={"Enter organisation"}
                                    value={editingObject["organisation"]}
                                    isRequired={true}
                                    type={"text"}
                                    name={"organisation"}
                                    multiline={false}
                                    toolTipMessage={"Enter the organisation"}
                                    handleChange={(e) => { handleEdit(e) }}
                                />
                            </div>
                            <div style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", flexWrap: 'wrap', }}>
                                <ZupotsuTextfield
                                    title={"Sports"}
                                    placeholder={"Enter sports"}
                                    value={editingObject["sports"]}
                                    isRequired={true}
                                    type={"text"}
                                    name={"sports"}
                                    multiline={false}
                                    toolTipMessage={"Enter the sports"}
                                    handleChange={(e) => { handleEdit(e) }}
                                />
                            </div>
                            <div style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", flexWrap: 'wrap', }}>
                                <ZupotsuTextfield
                                    title={"Location"}
                                    placeholder={"Enter location"}
                                    value={editingObject["location"]}
                                    isRequired={true}
                                    type={"text"}
                                    name={"location"}
                                    multiline={false}
                                    toolTipMessage={"Enter the location"}
                                    handleChange={(e) => { handleEdit(e) }}
                                />
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', }}>
                            <SocialHandle
                                deviceType={deviceType}
                                formData={formData}
                                errors={[]}
                                handleInputChange={() => { }}
                                socialLinks={socialLinks}
                                onChangeSocial={onChangeSocial}
                                previewMode={false}
                            />

                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', }}>
                            <div style={{
                                padding: 0, margin: 0,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: deviceType === "mobile" ? "center" : 'flex-end',
                                alignItems: 'center',
                                gap: "8px",
                                flexWrap: "wrap",
                                width:'100%'
                            }}>

                                

                                <Button
                                    sx={{
                                        padding: '6px 8px',
                                        color: 'rgba(130, 130, 130, 1)',
                                        fontFamily: 'Inter',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: '400',
                                        background: '#FFF',
                                        border:'0.5px solid rgba(130, 130, 130, 1)',
                                        width: '144px',
                                        height: '40px',
                                        textTransform: 'capitalize',
                                        '&:hover': {
                                            backgroundColor: '#FFF',
                                            color: 'rgba(130, 130, 130, 0.5)',
                                        },
                                    }}
                               
                                >
                                    Cancel
                                </Button>
                                <Button
                                    sx={{
                                        padding: '6px 8px',
                                        color: '#FFF',
                                        fontFamily: 'Inter',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: '400',
                                        background: '#E20B18',
                                        width: '144px',
                                        border: "none",
                                        height: '40px',
                                        textTransform: 'capitalize',
                                        '&:hover': {
                                            backgroundColor: '#a9141d',
                                            color: '#fff',
                                        },
                                    }}
                               
                                >
                                    Save
                                </Button>
                            </div>

                        </div>





                    </div>

                </div >
            )}
        </>
    )
}

export default ZupotsuSellerDetails
