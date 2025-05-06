import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, InputAdornment, MenuItem, Paper, Select, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Table, FormControl, InputLabel, Modal, Dialog } from '@mui/material';
import { DeleteIcon, DotGroup, EditIcon, EditIconn, NoDataImage, SearchNormal, VisibilityEye, rearrange, rearrangeWhite } from '../../assets';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import { useNavigate } from 'react-router';
import NoData from '../../error/NoData';
import IOSSwitch from '../../Atoms/buttons/IOSSwitch';
import { KeyboardArrowDownOutlined, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUpOutlined, VisibilityOff } from '@mui/icons-material';
import ReusableTable from '../../Molecules/table-management/ReusableTable';
import ActionButton from '../../Molecules/table-management/ActionButton';
import VisibilityButton from '../../Atoms/Visibility/VisibilityButton';
import ReorderableReusableTable from '../../Molecules/table-management/ReorderablereusableTable';
import { height, padding } from '@mui/system';
import useDeviceType from '../../utils/DeviceType';
import Close from '@mui/icons-material/Close';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import Apis from '../../services/apis';
import CustomSwitch from '../../Atoms/customSwitch';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import Popup from '../../Atoms/popup/popup';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';

type FormAttribute = {
    attribute_priority: number;
};

const ManageTray: React.FC = () => {
    const headers = ['Tray Name', 'Sub Heading', 'Position', "No. of Assets", "Asset Limit", "Created by/on", "Publish", 'Actions'];
    const headers2 = ['Tray Name', "Position"]
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([])
    const [tableData, setTableData] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [query, setQuery] = useState('');
    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const paginatedData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });;
    const [visibility, setVisibility] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const navigation = useNavigate();
    const [hoveredRow, setHoveredRow] = useState<any>(null);
    const [rearrangeUI, setrearrangeUI] = useState(false);
    const [popup, setpopup] = useState(false);
    const [ischecked, setischecked] = useState<any>({});

    const userFromLocal = localStorage.getItem("role")?.toLowerCase();
    const isItAdmin = (userFromLocal === "admin") ? true : false;
    const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
    const isApprover = (userFromLocal === "approver") ? true : false;
    const isPublisher = (userFromLocal === "publisher") ? true : false;

    const deviceType = useDeviceType();
    const initialDnDState: any = {
        draggedFrom: null,
        draggedTo: null,
        isDragging: false,
        originalOrder: [],
        updatedOrder: []
    };

    const [dragAndDrop, setDragAndDrop] = useState<any>(initialDnDState);
    const [loader, setLoader] = useState(false);
    const apis = new Apis();

    const columns: any = [
        {
            field: 'trayname',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '15px',
                    padding: 0,
                    margin: 0,
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    // maxWidth: '200px'
                }}>
                    <p
                        style={{
                            fontFamily: "Inter",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "21px",
                            padding: 0,
                            margin: 0,
                            textAlign: "left",
                            whiteSpace: 'wrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                            // whiteSpace: 'normal' 
                        }}
                    >{item?.title || "N/A"}</p>
                </div >
            ),
            cellStyle: { padding: 0, border: "0px solid transparent" }
        }
        ,

        {
            field: 'subheading',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '15px',
                    padding: 0,
                    margin: 0,
                    paddingLeft: '20px',
                    paddingRight: '15px',
                    maxWidth: '200px'
                }}>

                    <p
                        style={{
                            fontFamily: "Inter",
                            fontSize: "14px",
                            padding: 0,
                            margin: 0,
                            fontWeight: 400,
                            lineHeight: "21px",
                            textAlign: "left",
                            whiteSpace: 'wrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,

                        }}
                    >{item?.subheading || "N/A"}</p>
                </div >
            ),

            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
        },
        {
            field: 'sqposition',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    padding: 0,
                    margin: 0,
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}>

                    <p
                        style={{
                            fontFamily: "Inter",
                            fontSize: "14px",
                            padding: 0,
                            margin: 0,
                            fontWeight: 400,
                            lineHeight: "21px",
                            textAlign: "left",

                        }}
                    >{item?.sqposition || "N/A"}</p>
                </div >
            ),
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
        },
        {
            field: 'numberofassets',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    padding: 0,
                    margin: 0,
                    paddingLeft: '15px',
                    paddingRight: '15px'
                }}>

                    <p
                        style={{
                            fontFamily: "Inter",
                            fontSize: "14px",
                            padding: 0,
                            margin: 0,
                            fontWeight: 400,
                            lineHeight: "21px",
                            textAlign: "left",

                        }}
                    >{item?.numberofassets || "N/A"}</p>
                </div >
            ), cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
        },
        {
            field: 'assetLimit',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    gap: '15px',
                    padding: 0,
                    margin: 0,
                    paddingLeft: '15px',
                    paddingRight: '15px'
                }}>

                    <p
                        style={{
                            fontFamily: "Inter",
                            fontSize: "14px",
                            padding: 0,
                            margin: 0,
                            fontWeight: 400,
                            lineHeight: "21px",
                            textAlign: "left",

                        }}
                    >{item?.limit_assets || "N/A"}</p>
                </div >
            ), cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0 }
        },
        {
            field: 'createdby/on',
            render: (_: any, item: any) => (
                <div style={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: "flex-start",
                    justifyContent: 'flex-start',
                    gap: '5px',
                    padding: 0,
                    margin: 0,
                    paddingLeft: '15px',
                    paddingRight: '15px'
                }}>

                    <p
                        style={{
                            fontFamily: "Inter",
                            fontSize: "14px",
                            padding: 0,
                            margin: 0,
                            fontWeight: 500,
                            lineHeight: "21px",
                            textAlign: "left",
                            textTransform: "capitalize",
                            color: "rgba(51, 51, 51, 1)"
                        }}
                    >{item?.createdbyon || "N/A"}</p>
                    <p
                        style={{
                            fontFamily: "Inter",
                            fontSize: "14px",
                            padding: 0,
                            margin: 0,
                            fontWeight: 400,
                            lineHeight: "21px",
                            textAlign: "left",
                            color: "rgba(51, 51, 51, 1)"
                        }}
                    >{item?.createdon}</p>

                </div >
            ),
            cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500", padding: 0, }
        },
      
        {
            field: 'publish',
            render: (_: any, item: any) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", padding: 0, border: "0px solid transparent", width: '100%', height: '60px', borderRadius: '8px' }}>
                    <CustomSwitch
                        focusVisibleClassName=".Mui-focusVisible"
                        disableRipple
                        checked={item.publish}
                        onChange={() => {
                            setischecked({ id: item.id, value: item.publish, type: "publish", item: item.fullItem })
                            setpopup(true)
                        }}
                    />
                </div>),
            cellStyle: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", gap: '10px', padding: 0, }
        },
        {
            field: 'actions',
            render: (_: any, item: any) => (
                <ActionButton
                    onEdit={() => { navigation(`/createTray?id=${item.id}`) }}
                    onDelete={() => {
                        setischecked({ id: item.id, value: '', type: "delete" })
                        setpopup(true)
                    }}
                    editIcon={EditIconn}
                    deleteIcon={DeleteIcon}
                    isReq={(isPublisher ? true : item?.title == "Teams" || item?.title == "Tournaments" || item?.title == "Contents" || item?.title == "Athletes" || item?.title == "All Assets") ? false : true}
                />
            ),
            cellStyle: { padding: 0, border: "0px solid transparent" }
        }

    ];

    const linkDetails = useMemo(() => [
        {
            label: 'Tray Management',
            url: '',
        },
        {
            label: 'Manage Tray',
            url: '/manage_tray',
        },
    ], []);

    const ErrorData = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message: "No Tray listed"
        }),
        [
            // selectedCategory
        ]
    )


    const onDragStart = (event: React.DragEvent<HTMLTableRowElement>) => {
        const initialPosition = Number(event.currentTarget.dataset.position);

        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: tableData2
        });

        event.dataTransfer.setData("text/html", '');
    };

    const onDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();

        const draggedFrom = dragAndDrop.draggedFrom!;
        const draggedTo = Number(event.currentTarget.dataset.position);
        if (draggedTo === draggedFrom) return;
        const newList = [...dragAndDrop.originalOrder];
        const itemDragged = newList[draggedFrom];
        newList.splice(draggedFrom, 1);
        newList.splice(draggedTo, 0, itemDragged);

        setDragAndDrop({
            ...dragAndDrop,
            updatedOrder: newList,
            draggedTo: draggedTo
        });
    };

    // const onDrop = () => {
    //     setTableData2(dragAndDrop.updatedOrder);
    //     setDragAndDrop({
    //         ...dragAndDrop,
    //         draggedFrom: null,
    //         draggedTo: null,
    //         isDragging: false
    //     });
    // };

    const onDrop = (event: any) => {
        const dropPosition = event.target.closest('tr')?.getAttribute('data-position');
        if (!dropPosition || dropPosition < 0 || dropPosition >= tableData2.length) {
            setDragAndDrop({
                ...dragAndDrop,
                draggedFrom: null,
                draggedTo: null,
                isDragging: false
            });
            return;
        }
        setTableData2(dragAndDrop.updatedOrder);
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

    const handleMouseLeave = () => {
        setHoveredRow(null);
    };


    useEffect(() => {
        const startTime = performance.now();

        const fetchAndTrack = async () => {
            await onLoad()
            const loadTime = performance.now() - startTime;
            mixpanelEvents.onLoad(loadTime, 'Manage Tray');
        };
        fetchAndTrack();
        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Manage Tray', timeSpent);
        };
    }, [])

    const onLoad = () => {
        setLoader(true)
        apis.getAllTrays()
            .then((response: any) => {
                let arr: any = [];
                response.data.data.sort((a: any, b: any) => a.priority - b.priority);
                response.data.data.map((item: any, index: any) => {
                    arr.push(
                        {
                            "id": item.id,
                            "title": item.name,
                            "subheading": item.description,
                            "sqposition": index + 1,
                            "numberofassets": item.tray_assets.length,
                            "limit_assets": item.limit_assets,
                            "createdbyon": item.created_by_user.name,
                            "publish": item.is_active,
                            "createdon": item.created_at.split("T")[0],
                            "action": "Edit",
                            "fullItem": item
                        }
                    )
                })
                setCurrentItems(arr);
                setTableData(arr);
                setTableData2(arr);
                setLoader(false)
            })
            .catch((error) => {
                // setLoad(false)
                setLoader(false)
                mixpanelEvents.errorHandling({
                    name: 'Manage Tray',
                    msg: error?.response?.data?.error || error?.message
                })
            });
    }

    const publishFun = () => {
        setLoader(true)
        apis.publishTray(ischecked.id)
            .then((response: any) => {
                let anames: any = []

                ischecked.item.tray_assets.map((item: any) => {
                    anames.push(item.asset.asset_detail[0].name);
                })
                const trayUpdateData = {
                    TrayName: ischecked.item.name,
                    NumberOfAssets: ischecked.item.tray_assets.length,
                    IsNew: false,
                    AssetNames: anames,
                    CreatedBy: ischecked.item.created_by_user.name,
                    PublishedBy: ischecked.item.published_by_user.name,
                    PublishedAt: ischecked.item.published_at,
                    PagePosition: ischecked.item.priority,
                    TrayStatus: !ischecked.item.is_active
                };

                mixpanelEvents.onTrayUpdated(trayUpdateData);
                // console.log("Reload called===")
                onLoad()
                setpopup(false)
            })
            .catch((error) => {
                setpopup(false)
                setLoader(false)
            });
    }

    const deleteFun = () => {
        setLoader(true)
        apis.deleteTray(ischecked.id)
            .then((response: any) => {
                onLoad()
                setpopup(false)
            })
            .catch((error) => {
                setpopup(false)
                setLoader(false)
            });
    }

    const priotrizeFun = () => {
        setLoader(true)
        let body: any = []
        tableData2.map((item: any, index: any) => {
            body.push({
                "id": item.id,
                "priority": index + 1
            })
        })
        apis.prioritizeTray(body)
            .then((response: any) => {
                onLoad()
                setrearrangeUI(false)
            })
            .catch((error) => {
                setrearrangeUI(false)
                setLoader(false)
            });
    }

    if (!loader) {
        return (
            <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: 'rgb(250,250,250)', height: '90vh', overflowY: "scroll", overflowX: 'hidden' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'center',
                        // padding: '5px',
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

                            <ZoptsuUnderlineTitle
                                fontSizeOnLargeScreen="35px"
                                fontSizeOnMediumScreen="33px"
                                fontSizeOnSmallScreen="33px"
                                fontSizeOnExtraSmallScreen="33px"
                                titleText={'Tray Management'}
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
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    gap: '20px',
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
                                        onChange={(event) => { setQuery(event.target.value) }}
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
                                            width: '126px',
                                            border: "none",
                                            height: '40px',

                                            '&:hover': {
                                                backgroundColor: '#a9141d',
                                                color: '#fff',
                                            },
                                        }}
                                        onClick={() => { navigation("/createTray") }}
                                    >
                                        <span style={{ marginRight: '8px' }}>+</span>Add Tray
                                    </Button>

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
                                            width: '126px',
                                            border: "none",
                                            height: '40px',

                                            '&:hover': {
                                                backgroundColor: '#a9141d',
                                                color: '#fff',
                                            },
                                        }}
                                        onClick={() => { setrearrangeUI(true) }}
                                    >
                                        <img style={{ marginRight: '8px' }} src={rearrangeWhite} />ReArrange
                                    </Button>



                                </div>


                            </div>
                        </div>
                        <div style={{ borderColor: '#FFF', borderStyle: 'solid', borderWidth: '0px', width: '98%' }}>
                            {currentItems?.length > 0 ? (<>
                                <ReorderableReusableTable
                                    columns={columns}
                                    tableData={tableData?.filter((search: any) =>(
                                        search?.title?.toLowerCase().includes(query?.toLowerCase()) || (search?.subheading?.toLowerCase().includes(query?.toLowerCase() ))
                                    ))}
                                    setTableData={setTableData}
                                    headers={headers}
                                    handleChange={() => { }}
                                />
                            </>) : (
                                <NoData ErrorData={ErrorData} />
                            )}

                        </div>
                    </div>
                </Box>
                <Modal
                    open={rearrangeUI}
                    onClose={() => setrearrangeUI(false)}
                    aria-labelledby="modal-modal-title"
                    sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center', '& .MuiBox-root': { width: deviceType === 'mobile' ? '70%' : '85%', height: '70%', display: 'flex', border: "0px solid #FFF", borderRadius: '10px', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' } }}
                >
                    <div style={{ width: deviceType === 'mobile' ? '70%' : '50%', height: '60%', border: "0px solid #FFF", backgroundColor: '#FFF', borderRadius: '24px', position: 'absolute', transition: 'all 0.3s ease-in-out', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>

                        <div style={{ padding: "10px", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: "#FFF", border: '0px solid #FFF', width: "100%", borderRadius: '24px' }} >
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', padding: '10px', paddingLeft: '40px', paddingRight: '20px', backgroundColor: '#FFF', borderRadius: '24px', }} >
                                <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "19.36px", letterSpacing: "0.02em", margin: 0 }}>Rearrange Tray's</p>
                                <Close
                                    style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                                    onClick={() => { setrearrangeUI(!rearrangeUI) }}
                                />
                            </div>
                            <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10px', borderRadius: '20px' }}>
                                <div style={{ width: "100%", height: 400, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: '0px', gap: "20px" }}>
                                    <TableContainer style={{ borderStyle: 'none', boxShadow: "none" }}>
                                        <Table style={{ borderStyle: 'none' }}>
                                            <TableHead style={{ backgroundColor: 'rgba(240, 239, 239, 0.6)', padding: '10px', paddingTop: '5px', paddingBottom: '5px' }}>
                                                <TableRow>
                                                    {headers2.map((header, index) => (
                                                        <TableCell key={index} style={{ textAlign: 'left', border: "0px solid transparent", fontWeight: 'bold' }}>
                                                            {header}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {tableData2.map((item, index) => (
                                                    <TableRow
                                                        key={index}
                                                        data-position={index}
                                                        style={{
                                                            background: hoveredRow === index ? '#F7F9FF' : index % 2 === 1 ? "rgba(249, 248, 248, 1)" : 'transparent',
                                                            height: "30px",
                                                            border: "0px solid transparent",
                                                            fontSize: "14px",
                                                            lineHeight: "21px",
                                                            fontFamily: 'Inter',
                                                            fontWeight: "500"
                                                        }}
                                                        draggable
                                                        onDragStart={onDragStart}
                                                        onDragOver={onDragOver}
                                                        onDrop={onDrop}
                                                        onDragLeave={onDragLeave}
                                                        onMouseEnter={() => setHoveredRow(index)}
                                                        onMouseLeave={handleMouseLeave}
                                                    >
                                                        <TableCell style={{ textAlign: 'left', border: "0px solid transparent", display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                                            <img src={rearrange} alt="rearrange" /><p style={{ margin: 0, marginLeft: '20px', textAlign: 'left' }}>{item["title"]}</p>
                                                        </TableCell>
                                                        <TableCell style={{ textAlign: 'left', border: "0px solid transparent" }}>
                                                            {index + 1}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div style={{ width: '100%', justifyContent: 'center', alignItems: "center", display: 'flex', flexDirection: "row", marginTop: '10px' }}>
                                    {/* <ZupotsuButton
                                name="Confirm"
                                handleClick={() => {
                                    setrearrangeUI(!rearrangeUI)
                                }}
                                customOutlineColor={"0px solid transparent"}
                                isCustomColors={true}
                                customTextColor="#fff"
                                customBgColor={"rgba(226, 11, 24, 1)"}
                                customBgColorOnhover={'#a9141d'}
                                customTextColorOnHover={'white'}
                                padding={deviceType != 'mobile' ? '12px, 16px, 12px, 16px' : '12px, 16px, 12px, 16px'}
                            /> */}
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
                                            width: '126px',
                                            border: "none",
                                            height: '40px',

                                            '&:hover': {
                                                backgroundColor: '#a9141d',
                                                color: '#fff',
                                            },
                                        }}
                                        onClick={() => { priotrizeFun() }}
                                    >
                                        Confirm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal >
                <Popup open={popup}
                    setOpen={setpopup}
                    text={"Are you sure you want to " + (ischecked.type == "publish" ? ischecked.value ? "UnPublish ?" : "Publish ?" : "") + (ischecked.type == "delete" ? "Delete?" : "")}
                    heading={ischecked.type == "publish" ? "Publish" : ischecked.type == "delete" ? "Delete" : ""}
                    handleYesAction={ischecked.type == "publish" ? publishFun : ischecked.type == "delete" ? deleteFun : ""}
                    handleClose={() => { setpopup(false) }}
                />

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

export default ManageTray;
