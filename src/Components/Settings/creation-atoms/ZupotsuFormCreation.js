import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Modal, Box, Checkbox, FormControl, FormControlLabel, Radio, OutlinedInput, InputAdornment } from '@mui/material';
import ZupotsuCustomTextfield from './ZupotsuCustomTextfield';
import { EditIconn, DotGroup, AddButton, infoCircle, DeleteIcon, facebookIcon, instagramIcon, LinkedIn, GlobalB, instagramI } from '../../../assets';
import ZupotsuDropdown from '../../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import ZupotsuTextfield from '../ZupotsuTextfield';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ZupotsuDynamicButton from './ZupotsuDynamicButton';
import './style.css'
import ZupotsuTooltip from '../../../Atoms/zupotsu-tooltip/zupotsu-tooltip';
import MultiMonthPicker from '../../../Atoms/MultimonthPicker/MultiMonthPicker';
import { Close, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import useDeviceType from '../../../utils/DeviceType';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        overFlow: "hidden"
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        overFlow: "hidden"
    },
}));

const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
};


const ZupotsuFormCreation = ({
    customArray,
    setCustomArray,
    addingObject,
    setAddingObject,
    isEditing
}) => {


    const [selectedValue, setSelectedValue] = useState('');
    const [duplicated, setDuplicated] = useState(false)
    const [newFeildInput, setNewFeildInput] = useState('')
    const [primaryAttributeNames, setPrimaryAttributeNames] = useState([]);
    const [isCheckedToolTip, setIsCheckedToolTip] = useState(false);
    const [tooltip, settooltip] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [isEditingIndex, setIsEditingIndex] = useState(0);
    const deviceType = useDeviceType()

    useEffect(() => {
        const handleScroll = (event) => {
            const { clientY } = event;
            const threshold = 100;
            const scrollSpeed = 5;

            if (clientY < threshold) {
                window.scrollBy(0, -scrollSpeed);
            } else if (window.innerHeight - clientY < threshold) {
                window.scrollBy(0, scrollSpeed);
            }
        };

        document.addEventListener('dragover', handleScroll);

        return () => {
            document.removeEventListener('dragover', handleScroll);
        };
    }, []);


    const handleNumberChange = (e) => {
        const num = parseInt(e.target.value, 10);
        if (!isNaN(num)) {
            const newValue = Array(num).fill("");
            setAddingObject((prevObject) => ({
                ...prevObject,
                option_values: newValue,
            }));
        }
    };


    const checkDuplicationPrimaryAttributes = (customArray) => {
        let newAttributeNames = [];
        for (let i = 0; i < customArray.length; i++) {
            newAttributeNames.push(
                // { attribute_name: customArray[i]?.attribute_name?.toLowerCase().replace(/\s+/g, '') }
                customArray[i]?.attribute_name?.toLowerCase().replace(/\s+/g, '')
            );
        }
        setPrimaryAttributeNames(newAttributeNames);
    };

    useEffect(() => {
        checkDuplicationPrimaryAttributes(customArray);
    }, [customArray]);

    useEffect(() => {
        const duplicated = primaryAttributeNames.includes(newFeildInput?.toLowerCase().replace(/\s+/g, ''))
        setDuplicated(duplicated)
    }, [newFeildInput])



    // Handle checkbox change
    const handletoolTipNeeded = (event) => {
        setIsCheckedToolTip(event.target.checked);
        if (event.target.checked === false) {
            setAddingObject({
                ...addingObject,
                "tooltip": ""
            });
        }
    };

    const handletoolTipNeededTrue = (event) => {
        setIsCheckedToolTip(true);

    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectToolTip, setselectToolTip] = useState(false);
    const [numberofOptions, setNumberofOptions] = useState(
        (Array.isArray(addingObject?.option_values)) ? addingObject?.option_values?.length : 2
    );
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setAddingObject({
            ...addingObject,
            [name]: checked ? true : false
        });
    };
    const handleValueChange = (index, subIndex, event) => {
        const newArray = [...customArray];
        if (Array.isArray(newArray[index].value)) {
            newArray[index].value[subIndex] = event.target.value;
        } else {
            newArray[index].value = event.target.value;
        }
        setCustomArray(newArray);
    };



    const handleSelectionChange = (event) => {
        const { value } = event.target;

        setSelectedValue(value);
        setAddingObject(prevObject => ({
            ...prevObject,
            attribute_type: value,
            option_values: value === 'radioButton' || value === 'dropdown' || value === 'multipleDropdown' || value === 'checkBox' ? ["", ""] : []

        }));
    };



    const handleCloseModal = () => {
        setIsModalOpen(false);
        setselectToolTip(false)
        setAddingObject(
            {
                attribute_name: "",
                option_values: [],
                attribute_type: selectedValue,
                priority: 1,
                placeholder: '',
                tooltip: '',
                attribute_length: "",
                is_mandatory: false,
            }
        )
        setSelectedValue('')
    };

    const handleSubmitTextField = () => {

        if (isEdit) {
            if (isEditingIndex !== -1) {
                const updatedArray = [...customArray];

                updatedArray[isEditingIndex] = addingObject;
                setCustomArray(updatedArray);
            }
        } else {
            const priority = customArray.length - 1;
            const addingObject1 = { ...addingObject, "priority": priority, "is_existing": false }
            setCustomArray(prevArray => [...prevArray, addingObject1]);
        }
        setIsModalOpen(false);
        setAddingObject(
            {
                attribute_name: "",
                option_values: ["", ""],
                attribute_type: selectedValue,
                priority: 1,
                placeholder: '',
                tooltip: '',
                is_hidden: false,
                attribute_length: "",
                is_mandatory: false
            }
        )
        setSelectedValue('')
    };

    const handleDelete = (id) => {
        setCustomArray(customArray.filter((_, i) => i !== id));
    };




    const style = {
        width: "550px",
        bgcolor: 'background.paper',
        border: '0px solid #FFF',
        display: "flex",
        flexDirection: "row",
        gap: '6px',
        justifyContent: 'space-between',
        alignItems: "left",
        overFlowX: "hidden"
    };

    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

    const onDragStart = (event) => {
        const initialPosition = Number(event.currentTarget.dataset.position);

        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: customArray
        });

        event.dataTransfer.setData("text/html", '');
    };

    const onDragOver = (event) => {
        event.preventDefault();

        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom;
        const draggedTo = Number(event.currentTarget.dataset.position);

        if (draggedTo === draggedFrom) return;

        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter((item, index) => index !== draggedFrom);

        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ];

        setDragAndDrop({
            ...dragAndDrop,
            updatedOrder: newList,
            draggedTo: draggedTo
        });
    };

    // const onDrop = (event) => {
    //     setCustomArray(dragAndDrop.updatedOrder);

    //     setDragAndDrop({
    //         ...dragAndDrop,
    //         draggedFrom: null,
    //         draggedTo: null,
    //         isDragging: false
    //     });
    // };

    const onDrop = (event) => {
        const dropPosition = event.target.closest('div')?.getAttribute('data-position');
        if (!dropPosition || dropPosition < 0 || dropPosition >= customArray.length) 
        {
            setDragAndDrop({
                ...dragAndDrop,
                draggedFrom: null,
                draggedTo: null,
                isDragging: false
            });
            return;
        }    
        setCustomArray(dragAndDrop.updatedOrder);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false
        });
    };


    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
        });
    };

  




    const handleChangeValues = (e, index) => {
        const newValues = [...addingObject.option_values];
        newValues[index] = e.target.value;
        setAddingObject(prevState => ({
            ...prevState,
            option_values: newValues
        }));
    };


    function validateOptionValues(addingObject) {
        if (!Array.isArray(addingObject?.option_values)) {
            return false;
        }


        return addingObject.option_values.every(value => value !== "" && value !== null);
    }


    return (
        <div style={{ display: 'flex', width: "100%", flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', padding: 5, marginTop: '10px', paddingLeft: "5px" }}>

            {customArray.map((item, index) => (

                <div
                    key={index}
                    data-position={index}
                    draggable
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    className={dragAndDrop.draggedFrom === index ? "dragging" : dragAndDrop.draggedTo === index ? "dropArea" : dragAndDrop.dragging ? "dragging" : ""}
                    style={{
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: '100%',
                        borderRadius: '10px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            width: '100%',
                            gap:'20px'
                        }}>

                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginBottom: '20px',
                            textDecorationLine: item.is_hidden ? 'line-through' : "none",
                        }}>

                            {(item?.attribute_type?.toLowerCase() === "text") && (
                                <div style={{ width: "100%", marginTop: '8px' }}>
                                    <ZupotsuCustomTextfield
                                        title={item?.attribute_name}
                                        placeholder={`${item?.placeholder || "" || ""}`}
                                        value={item?.value || ""}
                                        isRequired={item?.is_mandatory}
                                        toolTipMessage={item?.tooltip}
                                        multiline={false}
                                        type="text"
                                        name={item?.attribute_name}
                                        previewMode={true}
                                        handleChange={(event) => handleValueChange(index, null, event)}
                                    />
                                </div>
                            )}
                            {(item.attribute_type?.toLowerCase() === "textarea") && (
                                <div style={{ width: "100%", marginTop: '8px' }}>
                                    <ZupotsuCustomTextfield
                                        title={item?.attribute_name}
                                        placeholder={`${item?.placeholder || ""}`}
                                        value={item?.value || ""}
                                        toolTipMessage={item?.tooltip}
                                        isRequired={item?.is_mandatory}
                                        type="text"
                                        multiline={true}
                                        name={item?.attribute_name}
                                        previewMode={true}
                                        handleChange={(event) => handleValueChange(index, null, event)}
                                    />
                                </div>
                            )}
                            {item.attribute_type === "email" && (
                                <div style={{ width: "100%", marginTop: '8px' }}>
                                    <ZupotsuCustomTextfield
                                        title={item?.attribute_name}
                                        placeholder={`${item?.placeholder || ""}`}
                                        value={item?.value}
                                        isRequired={item?.is_mandatory}
                                        type="text"
                                        name={item?.attribute_name}
                                        toolTipMessage={item?.tooltip}
                                        multiline={false}
                                        rows={4}
                                        previewMode={true}
                                        handleChange={(event) => handleValueChange(index, null, event)}
                                    />
                                </div>
                            )}
                            {item.attribute_type === "number" && (
                                <div style={{ width: "100%", marginTop: '8px' }}>
                                    <ZupotsuCustomTextfield
                                        title={item?.attribute_name}
                                        placeholder={`${item?.placeholder || ""}`}
                                        value={item?.value}
                                        isRequired={item?.is_mandatory}
                                        type="tel"
                                        toolTipMessage={item?.tooltip}
                                        name={item?.attribute_name}
                                        multiline={false}
                                        rows={4}
                                        previewMode={true}
                                        handleChange={(event) => handleValueChange(index, null, event)}
                                    />
                                </div>
                            )}
                            {item.attribute_type === "phoneNumber" && (
                                <div style={{ width: "100%", marginTop: '8px' }}>
                                    <ZupotsuCustomTextfield
                                        title={item?.attribute_name}
                                        placeholder={`${item?.placeholder || ""}`}
                                        value={item?.value || ""}
                                        isRequired={item?.is_mandatory}
                                        type="tel"
                                        toolTipMessage={item?.tooltip}
                                        name={item?.attribute_name}
                                        multiline={false}
                                        rows={4}
                                        previewMode={true}
                                        handleChange={(event) => handleValueChange(index, null, event)}
                                    />
                                </div>
                            )}
                            {(item?.attribute_type === "datePicker") && (
                                <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start" }}>

                                    <ZupotsuTextfield
                                        title={item?.attribute_name}
                                        placeholder={`${item?.placeholder || ""}`}
                                        value={item?.date_from}
                                        isRequired={item?.is_mandatory}
                                        type="date"
                                        toolTipMessage={item?.tooltip}
                                        name={item?.attribute_name}
                                        multiline={false}
                                        // previewMode={true}
                                        handleChange={() => { }}

                                    />


                                </div>
                            )}
                            {(item?.attribute_type === "dateRangePicker") && (
                                <div style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: "flex-start", width: "100%", }}>

                                    <div style={{ width: "100%", marginTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '15px' }}>

                                        <ZupotsuTextfield
                                            title={`${item?.attribute_name} from`}
                                            placeholder={`${item?.placeholder || ""}`}
                                            value={item?.date_from}
                                            isRequired={item?.is_mandatory}
                                            // isRequired={false}
                                            type="date"
                                            toolTipMessage={
                                                item?.tooltip ? (
                                                    <>
                                                        <span>{item.tooltip.split('/')[0].trim()}</span>
                                                    </>
                                                ) : ""
                                            }
                                            name="date_from"
                                            multiline={false}
                                            // previewMode={true}
                                            handleChange={(event) => handleValueChange(index, null, event)}

                                        />
                                        <ZupotsuTextfield
                                            title={`${item?.attribute_name} to`}
                                            placeholder={`${item?.placeholder || ""}`}
                                            value={item?.date_from}
                                            isRequired={item?.is_mandatory}
                                            // isRequired={false}
                                            type="date"
                                            toolTipMessage={
                                                item?.tooltip ? (
                                                    <>
                                                        <span>{item.tooltip.split('/')[1]?.trim()}</span>
                                                    </>
                                                ) : ""
                                            }
                                            name="date_to"
                                            multiline={false}
                                            // previewMode={true}
                                            handleChange={(event) => handleValueChange(index, null, event)}
                                        />
                                    </div>
                                </div>
                            )}
                            {(item?.attribute_type === "dropdown" || item?.attribute_type === "Drop Down") && (
                                <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start" }}>

                                    <ZupotsuDropdown
                                        title={item?.attribute_name}
                                        dropdownData={item?.value}
                                        value={''}
                                        name={item?.attribute_name}
                                        toolTipMessage={item?.tooltip}
                                        placeholder={`${item?.placeholder || ""}`}
                                        isRequired={item?.is_mandatory}
                                        handleChange={() => { }}
                                        previewMode={true}
                                        item={item}
                                    />

                                </div>
                            )}
                            {/* timePicker */}
                            {(item?.attribute_type === "timePicker") && (
                                <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start" }}>

                                    <ZupotsuTextfield
                                        title={item?.attribute_name}
                                        dropdownData={item?.value}
                                        value={''}
                                        type='time'
                                        name={item?.attribute_name}
                                        toolTipMessage={item?.tooltip}
                                        placeholder={`${item?.placeholder || "HH:MM:SS"}`}
                                        isRequired={item?.is_mandatory}
                                        handleChange={() => { }}
                                    // previewMode={true}
                                    />


                                </div>
                            )}
                            {(item.attribute_type === 'multipleDropdown') && (
                                <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start" }}>

                                    <ZupotsuDropdown
                                        title={item?.attribute_name}
                                        dropdownData={item?.value}
                                        value={''}
                                        name={item?.attribute_name}
                                        toolTipMessage={item?.tooltip}
                                        placeholder={`${item?.placeholder || ""}`}
                                        isRequired={item?.is_mandatory}
                                        handleChange={() => { }}
                                        previewMode={true}
                                    />

                                </div>
                            )}
                            {(item?.attribute_type === 'socialHandles') && (
                                <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start" }}>

                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        width: '100%',

                                    }}>
                                        <Typography
                                            sx={{
                                                color: 'var(--Gray-1, #333)',
                                                fontFamily: 'Inter',
                                                fontSize: '15px',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                marginBottom: deviceType === 'mobile' ? '10px' : '10px',
                                                marginTop: deviceType === 'mobile' ? '16px' : '20px',
                                            }}
                                        >
                                            Social Handles
                                        </Typography>
                                        <Box
                                            sx={{ minWidth: '100%', display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center', gap: '15px' }}

                                        >
                                            <FormControl fullWidth variant="outlined">
                                                <OutlinedInput
                                                    size="small"
                                                    fullWidth
                                                    name={"facebook"}
                                                    value={''}
                                                    placeholder={"Enter facebook"}
                                                    onChange={() => { }}
                                                    id="outlined-adornment-weight"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <img src={facebookIcon} alt="facebook" />
                                                        </InputAdornment>
                                                    }
                                                    disabled={true}
                                                    aria-describedby="outlined-weight-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'weight',
                                                    }}
                                                />

                                            </FormControl>
                                            <FormControl fullWidth variant="outlined">
                                                <OutlinedInput
                                                    size="small"
                                                    fullWidth
                                                    name={"Instagram"}
                                                    value={''}
                                                    placeholder={"Enter instagram"}
                                                    onChange={() => { }}
                                                    id="outlined-adornment-weight"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <img src={instagramI} alt="instagram" />
                                                        </InputAdornment>
                                                    }
                                                    disabled={true}
                                                    aria-describedby="outlined-weight-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'weight',
                                                    }}
                                                />

                                            </FormControl>
                                        </Box>
                                    </div>

                                </div>
                            )}
                            {(item?.attribute_type === 'section') && (
                                <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start" }}>
                                    <Typography
                                        style={{
                                            color: 'var(--Gray-1, #333)',
                                            fontFamily: 'Inter',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            lineHeight: '21px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            fontWeight: '600',
                                            margin: '10px',
                                            marginTop: '20px',
                                        }}
                                    >

                                        <span
                                            style={{
                                                margin: 0,
                                                fontStyle: 'Inter',
                                                fontFamily: "Bebas Neue",
                                                fontWeight: '400',
                                                fontSize: '20px',
                                                lineHeight: '30px',
                                                color: 'red'
                                            }}
                                        > {item?.attribute_name}</span>

                                    </Typography>
                                    <div
                                        style={{
                                            backgroundColor: 'rgba(0,0,0,0.2)',
                                            width: '100%',
                                            height: "1px",
                                            marginBottom: '20px'
                                        }}
                                    />



                                </div>
                            )}
                            {(item.attribute_type === "checkBox") && (
                                <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start", justifyContent: "flex-start" }}>
                                    <Typography
                                        style={{

                                            color: 'var(--Gray-1, #333)',
                                            fontFamily: 'Inter',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            lineHeight: '21px',
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
                                                    margin: 0
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '14px',
                                                        lineHeight: "21px",
                                                        fontStyle: 'Inter',
                                                        fontWeight: '600',
                                                    }}
                                                > {item?.attribute_name}</span>
                                                {item?.is_mandatory && (
                                                    <span
                                                        style={{
                                                            color: 'var(--Zupotso-Primary, #E20B18)',
                                                            fontFamily: 'Inter',
                                                            fontSize: '16px',
                                                            fontStyle: 'normal',
                                                            fontWeight: '700',
                                                            lineHeight: '140%',
                                                            margin: 0
                                                        }}
                                                    >
                                                        *
                                                    </span>
                                                )}
                                                <span
                                                    style={{
                                                        paddingLeft: '8px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {item?.tooltip && (
                                                        <ZupotsuTooltip
                                                            tooltipMessage={item?.tooltip}
                                                            icon={infoCircle}
                                                        />
                                                    )}
                                                </span>


                                            </div>

                                        </div>

                                    </Typography>
                                    <div style={{ width: "100%", display: "flex", flexDirection: 'row', alignItems: "flex-start" }}>

                                        {item?.option_values?.map((val, subIndex) => (
                                            <div
                                                key={subIndex}
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    margin: '8px 0'
                                                }}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    // flexBasis: '23%',
                                                    marginBottom: '8px'
                                                }}>
                                                    <Checkbox
                                                        checked={val.checked}
                                                        onChange={(event) => handleValueChange(index, subIndex, event)}
                                                        name={val}
                                                        color="primary"
                                                        disabled
                                                        sx={{
                                                            borderRadius: '5px'
                                                        }}
                                                    />
                                                    <label style={{ marginLeft: '8px', fontFamily: "Inter", fontSize: '14px' }}>
                                                        {val}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )}
                            {(item?.attribute_type === "multiMonthPicker") && (
                                <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start", justifyContent: "flex-start" }}>
                                    <Typography
                                        style={{

                                            color: 'var(--Gray-1, #333)',
                                            fontFamily: 'Inter',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            lineHeight: '21px',
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
                                                    margin: 0
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '14px',
                                                        lineHeight: "21px",
                                                        fontStyle: 'Inter',
                                                        fontWeight: '600',
                                                    }}
                                                > {item?.attribute_name}</span>
                                                {item?.is_mandatory && (
                                                    <span
                                                        style={{
                                                            color: 'var(--Zupotso-Primary, #E20B18)',
                                                            fontFamily: 'Inter',
                                                            fontSize: '16px',
                                                            fontStyle: 'normal',
                                                            fontWeight: '700',
                                                            lineHeight: '140%',
                                                            margin: 0
                                                        }}
                                                    >
                                                        *
                                                    </span>
                                                )}
                                                <span
                                                    style={{
                                                        paddingLeft: '8px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {item?.tooltip && (
                                                        <ZupotsuTooltip
                                                            tooltipMessage={item?.tooltip}
                                                            icon={infoCircle}
                                                        />
                                                    )}
                                                </span>


                                            </div>

                                        </div>

                                    </Typography>
                                    <div style={{ width: "100%", display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>

                                        <MultiMonthPicker
                                            placeholder={""}
                                            tooltip={item.tooltip}
                                            preview={true}
                                            name={item?.attribute_name}
                                            is_mandatory={item.is_mandatory}
                                        />

                                    </div>
                                </div>
                            )}
                            {(item.attribute_type === 'radioButton') && (
                                <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: "flex-start", justifyContent: "flex-start" }}>
                                    <Typography
                                        style={{

                                            color: 'var(--Gray-1, #333)',
                                            fontFamily: 'Inter',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            lineHeight: '21px',
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
                                                    margin: 0
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '14px',
                                                        lineHeight: "21px",
                                                        fontStyle: 'Inter',
                                                        fontWeight: '600',
                                                    }}
                                                > {item?.attribute_name}</span>
                                                {item?.is_mandatory && (
                                                    <span
                                                        style={{
                                                            color: 'var(--Zupotso-Primary, #E20B18)',
                                                            fontFamily: 'Inter',
                                                            fontSize: '16px',
                                                            fontStyle: 'normal',
                                                            fontWeight: '700',
                                                            lineHeight: '140%',
                                                            margin: 0
                                                        }}
                                                    >
                                                        *
                                                    </span>
                                                )}
                                                <span
                                                    style={{
                                                        paddingLeft: '8px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {item?.tooltip && (
                                                        <ZupotsuTooltip
                                                            tooltipMessage={item?.tooltip}
                                                            icon={infoCircle}
                                                        />
                                                    )}
                                                </span>


                                            </div>

                                        </div>

                                    </Typography>
                                    <div style={{ width: "100%", display: "flex", flexDirection: 'row', alignItems: "flex-start", justifyContent: "flex-start" }}>
                                        {item?.option_values?.map((val, subIndex) => (
                                            <div
                                                key={subIndex}
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    margin: '8px 0'
                                                }}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexBasis: '23%', // Adjust this value to fit 4 options per row
                                                    marginBottom: '8px'
                                                }}>
                                                    <Radio
                                                        checked={val.checked}
                                                        onChange={(event) => handleValueChange(index, subIndex, event)}
                                                        name={`value-${index}`} // All radio buttons in the same group should have the same name
                                                        color="primary"
                                                        disabled
                                                        sx={{
                                                            borderRadius: '5px'
                                                        }}
                                                    />
                                                    <label style={{ marginLeft: '8px', fontFamily: "Inter", fontSize: '14px' }}>
                                                        {val}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>



                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: '5px' }}>

                            <div style={{

                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                                <img onClick={() => {
                                    // setIsCheckedToolTip(item?.tootip ? true : false)
                                    if (item?.tooltip) {
                                        setIsCheckedToolTip(true);
                                    } else {
                                        setIsCheckedToolTip(false);
                                    }
                                    setSelectedValue(item?.attribute_type);
                                    settooltip(item?.tootip || "")
                                    setIsEditingIndex(index);
                                    setIsModalOpen(true);
                                    setIsEdit(true);
                                    setAddingObject(item)
                                }} src={EditIconn} style={{
                                    cursor:
                                        // item?.is_primary &&  isEditing === false ?'not-allowed' :
                                        "pointer", opacity:
                                        // item?.is_primary &&  isEditing === false ? 0.5 : 
                                        1
                                }} alt="Upload Icon" width={32} height={32} />
                            </div>
                            <div style={{

                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                                <img
                                    onClick={() => {
                                        if (item?.is_primary !== true && item?.is_existing == false) {
                                            handleDelete(index);
                                        }
                                    }}
                                    src={DeleteIcon}
                                    style={{
                                        cursor: item?.is_existing == true ? 'not-allowed' : item?.is_primary === true ? 'not-allowed' : "pointer", opacity: item?.is_existing == true ? 0.4 : item?.is_primary === true ? 0.4 : 1
                                    }} alt="Delete Icon" width={32} height={32} />
                            </div>
                            <div
                                onClick={() => {
                                    if (!(item?.is_primary && item?.is_mandatory)) {
                                        const updatedItem = { ...item, is_hidden: !item.is_hidden };
                                        const updatedItems = customArray.map(i =>
                                            i.id === item.id ? updatedItem : i
                                        );
                                        setCustomArray(updatedItems);
                                    }
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#E22B16',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    padding: '5px',
                                    opacity: (item?.is_primary && item?.is_mandatory) ? 0.4 : 1,
                                    cursor: item?.is_primary && item?.is_mandatory ? "not-allowed" : 'pointer'
                                }}>
                                {(!item?.is_hidden) ? <VisibilityOutlined sx={{ color: (item?.is_primary && item?.is_mandatory) ? "rgb(235,235,228,0.5)" : '#FFF', }} /> : <VisibilityOffOutlined sx={{ color: (item?.is_primary && item?.is_mandatory) ? "rgb(235,235,228,0.5)" : '#FFF' }} />}
                            </div>
                            <div style={{

                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img src={DotGroup} alt="Upload Icon" width={24} height={24} />
                            </div>
                        </div>

                    </div>
                </div>

            ))
            }


            <div style={{ width: '100%', justifyContent: 'flex-start', display: 'flex', alignItems: 'center', padding: 2, marginTop: 5, paddingLeft: '3%' }}>
                <Button onClick={() => {
                    setSelectedValue('');
                    setIsModalOpen(true);
                    setIsEdit(false);
                    setIsCheckedToolTip(false);
                    setAddingObject({
                        attribute_name: "",
                        option_values: ["", ""],
                        attribute_type: selectedValue,
                        priority: 1,
                        placeholder: '',
                        is_hidden: false,
                        // string_type: '',
                        tooltip: isCheckedToolTip ? tooltip : '',
                        attribute_length: "",
                        is_mandatory: false
                    })
                }} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', color: 'red', fontSize: '16px', backgroundColor: 'transparent', fontWeight: '24px', fontWeight: '700', fontFamily: 'Inter', border: '0px solid transparent', textAlign: "center", textTransform: 'capitalize', lineHeight: '24px', }}>
                    <img src={AddButton} width={15} height={15} style={{ marginRight: "8px", color: 'rgba(226, 11, 24, 1)' }} /> Add New Field
                </Button>
                <Button onClick={() => {
                    setSelectedValue("section");
                    setIsModalOpen(true);
                    setIsEdit(false);
                    setIsCheckedToolTip(false);
                    setAddingObject(prevObject => ({
                        ...prevObject,
                        attribute_type: "section",
                    }));
                }} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', color: 'red', fontSize: '16px', backgroundColor: 'transparent', fontWeight: '24px', fontWeight: '700', fontFamily: 'Inter', border: '0px solid transparent', textAlign: "center", textTransform: 'capitalize', lineHeight: '24px', }}>
                    <img src={AddButton} width={15} height={15} style={{ marginRight: "8px", color: 'rgba(226, 11, 24, 1)' }} /> Add Section
                </Button>
            </div>

            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                // aria-labelledby="customized-dialog-title"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    overflow: 'hidden',
                    padding: '10px',
                    '& .MuiPaper-root': {
                        display: "flex",
                        justifyContent: 'flex-start',
                        alignItems: "center",
                        width: "100%",
                        margin: "auto",
                        padding: '10px'
                    },
                }}
            >
                <Box sx={{
                    bgcolor: 'background.paper',
                    height: '500px',
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    overflow: "scroll",
                    scrollbarWidth: 0,
                    padding: '15px',
                    borderRadius: '8px',
                    width: 'auto',
                    '& .MuiPaper-root': {
                        padding: "0px",
                        width: 'auto'
                    },
                    '& .MuiDialogContent-root': {
                        width: 'auto'
                    }
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: "10px"
                    }}>

                        <Typography id="modal-title"
                            style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                fontFamily: "Inter",
                                lineHeight: "30px",
                                textAlign: "left",

                            }}>
                            Add New Field
                        </Typography>
                        <button
                            onClick={() => { handleCloseModal() }}
                            style={{
                                fontSize: "20px",
                                fontWeight: "400",
                                fontFamily: "Inter",
                                backgroundColor: 'transparent',
                                border: '0px solid transparent',
                                color: (theme) => theme.palette.grey[500]
                            }}
                        >
                            <Close style={{ fontSize: "20px", }} />
                        </button>

                    </Box>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            height: '500px',
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: 'center',
                            justifyContent: "flex-start",
                            overflow: "scroll",
                            scrollbarWidth: 0,
                            borderRadius: '8px',
                            width: 'auto',
                            '& .MuiPaper-root': {
                                padding: "0px",
                                // overflow: "hidden",
                                width: 'auto'
                            },
                            '& .MuiDialogContent-root': {
                                width: 'auto'
                            }
                        }}>

                        <Box sx={{
                            ...style, flexDirection: "column", alignItems: "flex-start",
                            "& .MuiBox-root": {
                                padding: 0,
                                margin: 0
                            }
                        }}>
                            <ZupotsuDropdown
                                title="Choose Field Type"
                                dropdownData={[
                                    "textarea",
                                    "text",
                                    "email",
                                    "phoneNumber",
                                    "number",
                                    "dropdown",
                                    "multipleDropdown",
                                    "datePicker",
                                    "dateRangePicker",
                                    "timePicker",
                                    "checkBox",
                                    "radioButton",
                                    "section",
                                    // "multiMonthPicker"
                                ]}
                                value={addingObject?.attribute_type}
                                previewMode={addingObject?.is_primary || addingObject?.id}
                                // || addingObject?.attribute_type == "section"
                                name="attribute_type"
                                placeholder="Choose Field Type"
                                isRequired={true}
                                handleChange={handleSelectionChange}
                            />
                        </Box>

                        <Box sx={{ ...style, marginTop: '10px', visibility: selectedValue ? 'visible' : 'hidden' }}>
                            <div style={{ width: addingObject?.attribute_type == "section" ? "100%" : '50%', }}>
                                <ZupotsuTextfield
                                    title={`${addingObject?.attribute_type !== "section" ? "Field name" : "Section"}`}
                                    placeholder={`Enter ${addingObject?.attribute_name !== "section" ? "Attribute" : "Section"} Name`}
                                    value={addingObject?.attribute_name}
                                    type="text"
                                    isRequired={true}
                                    previewMode={addingObject?.is_primary || addingObject?.id}
                                    name="attribute_name"
                                    errorMessage={(addingObject?.attribute_name) && (duplicated && isEdit == false ? "The field already exist" : "")}
                                    handleChange={(e) => {
                                        const { name, value } = e.target;
                                        setAddingObject((prevObject) => ({
                                            ...prevObject,
                                            [name]: value,
                                        }));
                                        setNewFeildInput(e.target.value)
                                    }}
                                />
                            </div>


                            {(addingObject?.attribute_type !== "section") && (<div style={{ width: '50%', visibility: selectedValue ? 'visible' : 'hidden' }}>

                                <ZupotsuTextfield
                                    title="Placeholder Text"
                                    placeholder="Enter Placeholder"
                                    value={addingObject.placeholder}
                                    type="text"
                                    name="placeholder"
                                    handleChange={(e) => {
                                        const { name, value } = e.target;
                                        setAddingObject((prevObject) => ({
                                            ...prevObject,
                                            [name]: value,
                                        }));
                                    }}
                                />
                            </div>)}





                        </Box>

                        {([
                            "dropdown",
                            "multipleDropdown",
                            "checkBox",
                            "radioButton",
                        ].includes(selectedValue)) && (<Box sx={{ ...style, marginTop: '10px', flexWrap: 'wrap' }}>
                            {[
                                "dropdown",
                                "multipleDropdown",
                                "checkBox",
                                "radioButton",
                            ].includes(selectedValue) && (
                                    <div style={{ width: '50%' }}>

                                        <ZupotsuDropdown
                                            title="Number of Options"
                                            placeholder="Enter Number of Options"
                                            value={numberofOptions}
                                            dropdownData={[
                                                2,
                                                3,
                                                4,
                                                5,
                                                6,
                                                7,
                                                8,
                                                9
                                            ]}
                                            name="number_of_options"
                                            isRequired={true}
                                            handleChange={(e) => {
                                                handleNumberChange(e);
                                                setNumberofOptions(e.target.value);
                                            }}
                                        />
                                    </div>
                                )}
                            {([
                                "dropdown",
                                "multipleDropdown",
                                "checkBox",
                                "radioButton",
                            ].includes(selectedValue)) && (
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                        <Box sx={{ ...style, marginTop: '0px', display: 'flex', justifyContent: "flex-start", flexWrap: 'wrap', }}>
                                            {Array.isArray(addingObject?.option_values) && addingObject?.option_values.map((val, index) => (
                                                <div key={index} style={{ width: '49.3%' }}>
                                                    <ZupotsuTextfield
                                                        title={selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1) + ` value ${index + 1}`}
                                                        placeholder={selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1) + ` value ${index + 1}`}
                                                        value={val}
                                                        type="text"
                                                        isRequired={true}
                                                        name={`value_${index}`}
                                                        handleChange={(e) => handleChangeValues(e, index)}
                                                    />
                                                </div>
                                            ))}
                                        </Box>
                                    </div>
                                )}
                        </Box>)}

                        {(selectedValue !== "section") && (<div style={{
                            ...style, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: ((addingObject?.attribute_type == "dropdown") ||
                                (addingObject?.attribute_type == "multipleDropdown") ||
                                (addingObject?.attribute_type == "checkBox") ||
                                (addingObject?.attribute_type == "radioButton")) ? "0px" : '10px', visibility: selectedValue ? 'visible' : 'hidden'
                        }}>
                            <div style={{ width: '50%', visibility: ['textarea', 'text'].includes(selectedValue) ? 'visible' : 'hidden' }}>
                                <ZupotsuTextfield
                                    title="Character Limit"
                                    placeholder="Enter Character Limit"
                                    value={addingObject?.attribute_length ? parseInt(addingObject.attribute_length, 10) : ''}
                                    type="tel"
                                    isRequired={false}
                                    name="attribute_length"
                                    handleChange={(e) => {
                                        const { name, value } = e.target;
                                        setAddingObject((prevObject) => ({
                                            ...prevObject,
                                            [name]: value === '' ? '' : parseInt(value, 10) || ''
                                        }));
                                    }}
                                />

                            </div>
                            <div style={{ width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <FormControlLabel
                                    disabled={addingObject?.is_primary}
                                    sx={{
                                        '& .MuiTypography-root': {
                                            margin: 0,
                                        },
                                        '& .MuiFormControlLabel-asterisk': {
                                            color: 'red',
                                            fill: 'red',
                                            fontSize: "13px",
                                            fontWeight: '600',
                                            margin: 0,
                                        },
                                        '.css-1x2jons-MuiFormControlLabel-asterisk': {
                                            color: 'red',
                                            fill: 'red',
                                            fontSize: "13px",
                                            fontWeight: '600',
                                            margin: 0,
                                        },
                                        '& .css-1x2jons-MuiFormControlLabel-asterisk': {
                                            color: 'red',
                                            fill: 'red',
                                            fontSize: "13px",
                                            fontWeight: '600',
                                            margin: 0,
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fill: 'red',
                                            fontSize: "13px",
                                            margin: 0,
                                        },
                                        '& .MuiCheckbox-root': {
                                            fill: 'red',
                                            fontSize: "13px",
                                            margin: 0,
                                        },
                                        '& .MuiFormControlLabel-root': {
                                            margin: 0
                                        }
                                    }}
                                    control={
                                        <Checkbox
                                            disabled={addingObject?.is_primary}
                                            sx={{
                                                backgroundColor: "#FFF",
                                                color: 'red',
                                                '& .Mui-checked': {
                                                    fill: "red",
                                                    margin: 0,
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fill: "red",
                                                    margin: 0,
                                                }
                                            }}
                                            checked={addingObject.is_mandatory}
                                            onChange={handleCheckboxChange}
                                            name="is_mandatory"
                                            color="primary"
                                            required={true}
                                        />
                                    }
                                    label="Is Mandatory"
                                />

                                <FormControlLabel
                                    sx={{
                                        '& .MuiTypography-root': {
                                            margin: 0,
                                        },
                                        '& .MuiFormControlLabel-asterisk': {
                                            color: 'red',
                                            fill: 'red',
                                            fontSize: "13px",
                                            fontWeight: '600',
                                            margin: 0,
                                        },
                                        '.css-1x2jons-MuiFormControlLabel-asterisk': {
                                            color: 'red',
                                            fill: 'red',
                                            fontSize: "13px",
                                            fontWeight: '600',
                                            margin: 0,
                                        },
                                        '& .css-1x2jons-MuiFormControlLabel-asterisk': {
                                            color: 'red',
                                            fill: 'red',
                                            fontSize: "13px",
                                            fontWeight: '600',
                                            margin: 0,
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fill: 'red',
                                            fontSize: "13px",
                                            margin: 0,
                                        },
                                        '& .MuiCheckbox-root': {
                                            fill: 'red',
                                            fontSize: "13px",
                                            margin: 0,
                                        },
                                        '& .MuiFormControlLabel-root': {
                                            margin: 0
                                        }
                                    }}
                                    control={
                                        <Checkbox
                                            sx={{
                                                backgroundColor: "#FFF",
                                                color: 'red',
                                                '& .Mui-checked': {
                                                    fill: "red",
                                                    margin: 0,
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fill: "red",
                                                    margin: 0,
                                                }
                                            }}
                                            checked={isCheckedToolTip}
                                            onChange={handletoolTipNeeded}
                                            name="tooltip"
                                            color="primary"
                                            required={true}
                                        />
                                    }
                                    label="Tooltip"
                                />

                            </div>
                        </div>)}
                        {(isCheckedToolTip && selectedValue !== "section") && (<Box sx={{
                            ...style, justifyContent: 'center', alignItems: 'center', marginTop:
                                ((addingObject?.attribute_type == "dropdown") ||
                                    (addingObject?.attribute_type == "multipleDropdown") ||
                                    (addingObject?.attribute_type == "checkBox") ||
                                    (addingObject?.attribute_type == "radioButton")) ? "0px" : '10px', marginBottom: '20px'
                        }}>
                            <ZupotsuTextfield
                                title="ToolTip value"
                                placeholder="Enter ToolTip value"
                                value={addingObject.tooltip}
                                type="text"
                                isRequired={false}
                                name="tooltip"
                                handleChange={(e) => {
                                    const { name, value } = e.target;
                                    setAddingObject((prevObject) => ({
                                        ...prevObject,
                                        [name]: value,
                                    }));
                                }}
                            />
                        </Box>)}

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '10px', }}>

                        <ZupotsuDynamicButton
                            onClick={handleSubmitTextField}
                            disabled={((duplicated && (isEdit == false)) || (!addingObject?.attribute_name) || ((addingObject?.attribute_type == "dropdown") ||
                                (addingObject?.attribute_type == "multipleDropdown") ||
                                (addingObject?.attribute_type == "checkBox") ||
                                (addingObject?.attribute_type == "radioButton")) && (!validateOptionValues(addingObject))) ? true : false
                                // !selectedValue
                            }
                            fullWidth={true}
                            backgroundColor={((duplicated && (isEdit == false)) || (!addingObject?.attribute_name) || ((addingObject?.attribute_type == "dropdown") ||
                                (addingObject?.attribute_type == "multipleDropdown") ||
                                (addingObject?.attribute_type == "checkBox") ||
                                (addingObject?.attribute_type == "radioButton")) && (!validateOptionValues(addingObject)))
                                ? "rgba(226, 11, 24, 0.3)"
                                : "rgba(226, 11, 24, 1)"}

                            color='#FFF'
                            fontFamily='Inter'
                            fontSize='14px'
                            border='1px solid #FFF'
                            width='200px'
                            height='45px'
                            text={"Submit"}
                        />
                    </Box>
                </Box>

            </Modal>




        </div >
    );
};

export default ZupotsuFormCreation;
