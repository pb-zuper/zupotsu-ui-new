import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, InputAdornment, MenuItem, Paper, Select, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Table, FormControl, InputLabel, Modal, Snackbar } from '@mui/material';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { ChangeRole, DeleteIcon, DisableUser, EditIcon, EditIconn, EditmenuIcon, EnableUser, FileImage, NoDataImage, RoundedTickMark, SearchNormal, Sendpasswordlink, TrashUser, VisibilityEye, fb1, instagramI } from '../../assets';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import NoData from '../../error/NoData';
import { Close } from '@mui/icons-material';
import UserManagementTable from '../../Molecules/table-management/UserManagementTable';
import UserActions from './UserActions';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import Apis from '../../services/apis';
import useDeviceType from '../../utils/DeviceType';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';

const ZupotsuQuickRegistered: React.FC = () => {
    const headers = ['Name', 'Email', "Reg Date", "status", 'Actions'];
    const [open, setOpen] = useState(false)
    const [popup, setPopup] = useState<any>(false)
    const [editUser, seteditUser] = useState<any>({})
    const [popuptype, setPopuptype] = useState<any>("")
    const [reason, setReason] = useState('')
    const [disableReason, setDisableReason] = useState('')
    const [currentUser, setCurrentUser] = useState<any>("Buyer")
    const [newUser, setnewUser] = useState<any>("")
    const [edit, setEdit] = useState(false);
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState<any>("")
    const [callApi, setCallApi] = useState(false)
    const [userEmail, setUserEmail] = useState<any>()
    const [userName, setUserName] = useState<any>()
    const [roles, setRoles] = useState<any>([])
    const apis = new Apis();
    const [rolesData, setRolesData] = useState<any>([])
    const deviceType = useDeviceType()
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const [roleUser, setRoleUser] = useState<any>({
        currentrole: "",
        newrole: ""

    })

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleClose = () => {
        setOpen(false)
        setUserName("")
        setUserEmail('')
        seteditUser([])
        setnewUser("")
        setReason("")
        setDisableReason("")
    }

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        seteditUser((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };
    const userFromlocal = localStorage.getItem("role")
    const isAdmin = userFromlocal?.toLowerCase() == "admin" ? true : false
    const isSellerAdmin: any = userFromlocal?.toLowerCase() == "seller-admin" ? true : false
    const menuOptions = [
        {
            menuname: editUser?.is_active ? 'Disable Seller' : "Activate Seller",
            type: 'disableuser',
            menuIcon: editUser?.is_active ? DisableUser : EnableUser
        },
        ...((isAdmin || isSellerAdmin) ? [{
            menuname: 'Send Password Link',
            type: 'sendpasswordlink',
            menuIcon: Sendpasswordlink
        }] : []),
        {
            menuname: 'Edit',
            type: 'edit',
            menuIcon: EditmenuIcon
        },
        ...(isAdmin ? [{
            menuname: 'Delete',
            type: 'deleteuser',
            menuIcon: TrashUser
        }] : []),
    ]



    function convertKeysToTitleCase(key: any) {
        const titleCaseKey = key
            .replace(/_/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(' ')?.map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase())
            .join(' ');
        return titleCaseKey;
    }

    useEffect(() => {
        const startTime = performance.now();
        const fetchAndTrack = async () => {
            await onLoad()
            const loadTime = performance.now() - startTime;
            mixpanelEvents.onLoad(loadTime, 'Zupotsu Users Listing Page');
        };
        fetchAndTrack();
        return () => {
            const timeSpent = performance.now() - startTime;
            mixpanelEvents.onUnload('Zupotsu Users Listing Page', timeSpent);
        };
    }, [callApi])


    const onLoad = () => {
        setLoader(true)
        apis.getUsers()
            .then((response: any) => {
                let arr: any = []
                response.data.data.map((item: any, index: any) => {
                    if (item?.userroles[0]?.role?.name == "quick-reg") {
                        arr.push({
                            id: item.id,
                            name: item.name,
                            email: item.email,
                            mobile: item.mobile,
                            organisation: item.organization,
                            reg_date: item.created_at,
                            status: item.is_active ? "Active" : "Disabled",
                        })
                    }
                })
                setTableData(arr)
                setLoader(false)

            })
            .catch((error) => {
                // setLoad(false)
                mixpanelEvents.errorHandling({
                    name: 'Zupotsu Users Listing Page',
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


    const onUserActivateDisable = () => {
        setLoader(true);

        const body = {
            "id": editUser?.id,
            "is_active": editUser?.is_active ? false : true,
            ...(editUser?.is_active ? { "disable_reason": disableReason } : {})
        };



        apis.updateUsers(editUser?.id, body)
            .then((response: any) => {
                if (response?.data?.status == "success") {
                    setOpen(false);
                    setEdit(false);
                    setCallApi(!callApi)
                }
            })
            .catch((error) => {
                // setOpen(false);
                setEdit(false);

            })
            .finally(() => {
                setLoader(false);
                setDisableReason("")
            });
    }

    const columns: any = [

        { field: 'name', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
        { field: 'email', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
        {
            field: 'Reg Date', render: (_: any, item: any) => (
                <div style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "21px",
                    textAlign: "left",
                }}>
                    {item.reg_date ? formatDateString(item.reg_date) : "NA"}
                </div>
            ), cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" }
        },
        {
            field: 'status',

            render: (_: any, item: any) => (
                <div style={{
                    width: "92px",
                    height: "37px",
                    padding: "8px 12px 8px 12px",
                    gap: "10px",
                    borderRadius: "50px",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "21px",
                    textAlign: "center",
                    backgroundColor: item?.status?.toLowerCase() == "active" ? "rgba(225, 255, 238, 1)" : "rgba(242, 242, 242, 1)",
                    color: item?.status?.toLowerCase() == "active" ? "rgba(33, 150, 83, 1)" : ""
                }}>
                    {item.status}
                </div>
            ),
            cellStyle: {
                height: "30px", width: '80px', fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500",
                '& .MuiTableCell-root': {
                    height: "60px",
                    padding: '10px'
                }
            }
        },
        {
            field: 'actions',
            render: (_: any, item: any) => (
                <div
                    onClick={() => {
                        setRoleUser((prevState: any) => ({
                            currentrole: item?.role,
                        }))
                    }}
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                    <UserActions editData={editUser} setEditData={seteditUser} data={item} setOpen={setOpen} setEdit={setEdit} setPopuptype={setPopuptype} menuOptions={menuOptions} onUserActivateDisable={onUserActivateDisable} />
                </div >
            ),
            cellStyle: {
                padding: 0, width: '120px', height: "30px", border: "0px solid transparent",
                flexDirection: 'row', alignItems: 'center', justifyContent: "center",
                '& .MuiTableCell-root': {
                    height: "60px",
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'row', alignItems: 'center', justifyContent: "center",
                }
            }
        }

    ];

    const handleChangeTable = (event: any, item: any) => {
        const newRole = event.target.value;
        const newData: any = tableData.map((dataItem: any) =>
            dataItem.name === item.name ? { ...dataItem, role: newRole } : dataItem
        );
        setTableData(newData);
    };
    const [tableData, setTableData] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });;
    const linkDetails = useMemo(() => [
        {
            label: 'User Management',
            url: '/user_management',
        },
        {
            label: 'Zupotsu Quick Reg',
            url: '/quickregistered',
        },
    ], []);



    const ErrorData = useMemo(
        () => ({
            img: NoDataImage,
            button: false,
            message: "No Users Found"
        }),
        []
    )


    const style = {

        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: (popuptype == "edit" || popuptype == "user") ? 600 : 500,
        backgroundColor: "#FFF",
        border: '0px solid #000',
        borderRadius: '8px',
        divShadow: 24,
        padding: "20px",
        fontFamily: 'Inter'
    };


    const deleteUser = () => {
        if (!reason) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: "Please fill all the fields",
            });
        } else {

            setLoader(true)
            const body = {
                "deleted_reason": reason
            }
            apis.userDelete(editUser?.id, body)
                .then((response: any) => {
                    if (response?.data?.status == "success") {
                        setCallApi(!callApi)
                        setSnackbar({
                            open: true,
                            severity: 'success',
                            message: "User deleted successfully",
                        });

                    }
                    setReason("")
                    setLoader(false)
                    setLoader(false)
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoader(false)
                    setReason("")
                    setSnackbar({
                        open: true,
                        severity: 'error',
                        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
                    });
                    setOpen(false)
                });
        }

    };





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



    function validateEmail(email: any) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }



    const onUserUpdation = () => {

        setLoader(true);

        if (popuptype === "edit") {
            if (!editUser?.name || !editUser?.mobile || editUser?.mobile?.length < 10) {
                setLoader(false);
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: "Please fill all the fields",
                });
            } else {
                const body = {
                    "name": editUser?.name,
                    "mobile": editUser?.mobile,
                    "id": editUser?.id,
                };
                const id = editUser?.id;

                apis.updateUsers(id, body)
                    .then((response: any) => {
                        if (response?.data?.status == "success") {
                            setOpen(false);
                            setEdit(false);
                            setCallApi(!callApi)
                            setSnackbar({
                                open: true,
                                severity: 'success',
                                message: "Updation successfull",
                            });
                        }
                    })
                    .catch((error) => {
                        // setOpen(false);
                        setEdit(false);
                        setSnackbar({
                            open: true,
                            severity: 'error',
                            message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),

                        });

                    })
                    .finally(() => {
                        setLoader(false);
                    });
            }
        }
        else {
            const body = {
                "name": userName,
                "email": userEmail?.trim()?.toLowerCase(),
            };

            apis.userRegisterLink(body)
                .then((response: any) => {
                    if (response?.data?.status == "success") {
                        setOpen(false);
                        setEdit(false);
                        setCallApi(!callApi)
                        setUserEmail("")
                        setSnackbar({
                            open: true,
                            severity: 'success',
                            message: "Registration link sent successfully",
                        });
                    }
                })
                .catch((error) => {
                    // setOpen(false);
                    setEdit(false);
                    setSnackbar({
                        open: true,
                        severity: 'error',
                        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),

                    });

                })
                .finally(() => {
                    setLoader(false);
                    // setUserEmail("")
                });
        }
    };

    const [selectedRole, setSelectedRole] = useState<any>([])

    useEffect(() => {
        const newRole = rolesData?.filter((item: any) => item?.name?.toLowerCase() === newUser?.toLowerCase());
        setSelectedRole(newRole)
    }, [roleUser, newUser])



    if (!loader) {
        return (
            <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: 'rgb(250,250,250)', height: '90vh', overflowY: "scroll", overflowX: 'hidden' }}>
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
                        <div style={{ width: '100%', display: 'flex', flexDirection: deviceType == "mobile" ? "column" : 'row', justifyContent: deviceType == "mobile" ? "flex-start" : 'space-between', alignItems: deviceType == "mobile" ? "flex-start" : 'center', padding: '10px', marginTop: '10px', marginBottom: '10px', backgroundColor: '#FFF' }}>
                            <ZoptsuUnderlineTitle
                                fontSizeOnLargeScreen="35px"
                                fontSizeOnMediumScreen="33px"
                                fontSizeOnSmallScreen="33px"
                                fontSizeOnExtraSmallScreen="33px"
                                titleText={'Quick Registered List'}
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
                                        value={search}
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
                                        onChange={(e) => { setSearch(e.target.value) }}
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
                                    search={search}
                                />
                            </>



                            ) : (
                                <NoData ErrorData={ErrorData} />
                            )}

                        </div>
                    </div>


                    <Modal
                        open={open}
                        onClose={handleClose}

                    >


                        <Box sx={style}>

                            {(popuptype !== "sendpasswordlink") && (<div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                paddingBottom: '10px'
                            }}>
                                <Typography
                                    sx={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        lineHeight: '22.4px',
                                        textAlign: 'left',
                                    }}
                                >
                                    {popuptype == "user" ? "Invite Buyer" : popuptype == "disableuser" ? (editUser?.is_active ? "Disable User" : "Activate User") : popuptype == "changerole" ? "Change Role" : popuptype == "edit" ? "Edit" : "Remove User"}
                                </Typography>
                                <Close
                                    style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                                    onClick={handleClose}
                                />
                            </div>)}

                            {(popuptype == "disableuser") && (
                                <Typography sx={{
                                    fontFamily: "Inter",
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    lineHeight: "22.4px",
                                    textAlign: "center",
                                    margin: '30px',
                                    marginTop: '40px',
                                }}>
                                    Are you sure you
                                    want to permanent {editUser?.is_active ? "disable" : "enable"} <span style={{ color: "rgba(226, 11, 24, 1)" }}>{editUser?.name}?</span>
                                </Typography>)}
                            {(editUser?.is_active && popuptype == "disableuser") && (<ZupotsuTextfield
                                title="Please enter the reason"
                                placeholder={"Enter  Reason"}
                                value={disableReason}
                                isRequired={true}
                                type={"text"}
                                name={"reason"}
                                multiline={true}
                                handleChange={(event: any) => {
                                    setDisableReason(event.target.value)
                                }}
                                rows={3}
                                maxLength={400}
                            />)}

                            {(popuptype == "changerole") && (<Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', marginTop: '25px' }}>
                                <ZupotsuTextfield
                                    title={"Current Role"}
                                    placeholder={"Current Role"}
                                    value={currentUser as string}
                                    previewMode={true}
                                    isRequired={false}
                                    type={"text"}
                                    name={"currentrole"}
                                    multiline={false}
                                    handleChange={(e: any) => { setCurrentUser(e.target.value) }}
                                />
                                <ZupotsuDropdown
                                    title={"New Role"}
                                    placeholder={"New Role"}
                                    value={newUser as string}
                                    isRequired={false}
                                    name={"newrole"}
                                    dropdownData={roles?.filter((item: any, index: any) => item?.toLowerCase() !== currentUser?.toLowerCase())}
                                    handleChange={(e: any) => { setnewUser(e.target.value) }}
                                />
                                <ZupotsuTextfield
                                    title="Please enter the reason"
                                    placeholder={"Enter Reason"}
                                    value={reason}
                                    isRequired={true}
                                    type={"text"}
                                    name={"reason"}
                                    multiline={true}
                                    handleChange={(event: any) => {
                                        setReason(event.target.value)
                                    }}
                                    rows={3}
                                    maxLength={400}
                                />
                            </Box>)}

                            {((popuptype == "user")) && (
                                <>
                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <ZupotsuTextfield
                                            title={"Name"}
                                            placeholder={"Enter name"}
                                            value={userName}
                                            isRequired={true}
                                            type={"text"}
                                            name={"name"}
                                            multiline={false}
                                            previewMode={edit}
                                            handleChange={(e: any) => { setUserName(e.target.value) }}
                                        />


                                        <ZupotsuTextfield
                                            title={"Email"}
                                            placeholder={"Enter email"}
                                            value={userEmail}
                                            isRequired={true}
                                            type={"text"}
                                            name={"email"}
                                            multiline={false}
                                            errorMessage={(userEmail?.trim() && !validateEmail(userEmail?.trim())) ? "Email is not valid" : ""}
                                            previewMode={popuptype == "edit" ? true : edit}
                                            handleChange={(e: any) => { setUserEmail(e.target.value?.toLowerCase()) }}
                                        // maxLength={10}
                                        />
                                    </Box>
                                </>
                            )}


                            {(popuptype == "edit") && (
                                <>
                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginTop: '0px' }}>
                                        <Typography
                                            sx={{
                                                fontFamily: "Inter",
                                                fontSize: "16px",
                                                fontWeight: 700,
                                                lineHeight: "22.4px",
                                                textAlign: "left",
                                                margin: '10px',
                                                marginLeft: "0px",
                                                marginBottom: '5px'
                                            }}
                                        >
                                            User Details
                                        </Typography>
                                        {(popuptype == "edit") ? (<button
                                            onClick={() => { setEdit(!edit) }}
                                            style={{
                                                gap: "8px",
                                                borderRadius: "5px",
                                                border: "0px solid rgba(189, 189, 189, 1)",
                                                backgroundColor: "rgba(255, 255, 255, 1)",
                                                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',
                                            }}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.33325 1.3335H5.99992C2.66659 1.3335 1.33325 2.66683 1.33325 6.00016V10.0002C1.33325 13.3335 2.66659 14.6668 5.99992 14.6668H9.99992C13.3333 14.6668 14.6666 13.3335 14.6666 10.0002V8.66683" stroke="#E20B18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M10.6933 2.0135L5.43992 7.26684C5.23992 7.46684 5.03992 7.86017 4.99992 8.14684L4.71325 10.1535C4.60659 10.8802 5.11992 11.3868 5.84659 11.2868L7.85325 11.0002C8.13325 10.9602 8.52659 10.7602 8.73325 10.5602L13.9866 5.30684C14.8933 4.40017 15.3199 3.34684 13.9866 2.0135C12.6533 0.680168 11.5999 1.10684 10.6933 2.0135Z" stroke="#E20B18" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M9.93994 2.7666C10.3866 4.35993 11.6333 5.6066 13.2333 6.05993" stroke="#E20B18" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <p
                                                style={{
                                                    fontFamily: "Inter",
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                    lineHeight: "21px",
                                                    textAlign: "left",
                                                    color: "rgba(226, 11, 24, 1)",
                                                    margin: 0
                                                }}
                                            >Edit Details</p>
                                        </button>) : (<></>)}
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                                        <div style={{ display: 'flex', width: '50%', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <ZupotsuTextfield
                                                title={"Name"}
                                                placeholder={"Enter name"}
                                                value={editUser["name"] as string}
                                                isRequired={false}
                                                type={"text"}
                                                name={"name"}
                                                multiline={false}
                                                handleChange={(e: any) => { handleEdit(e) }}
                                                previewMode={edit}
                                            // maxLength={10}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', width: '50%', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <ZupotsuTextfield
                                                title={"Mobile No"}
                                                placeholder={"Enter mobile no"}
                                                value={editUser["mobile"] as string}
                                                isRequired={false}
                                                type={"text"}
                                                name={"mobile"}
                                                multiline={false}
                                                handleChange={(e: any) => { handleEdit(e) }}
                                                previewMode={edit}
                                                maxLength={10}
                                            />
                                        </div>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <div style={{ display: 'flex', width: '50%', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <ZupotsuTextfield
                                                title={"Email"}
                                                placeholder={"Enter email"}
                                                value={editUser["email"] as string}
                                                isRequired={false}
                                                type={"text"}
                                                name={"email"}
                                                multiline={false}
                                                errorMessage={(editUser["email"] && !validateEmail(editUser["email"])) ? "Email is not valid" : ""}
                                                previewMode={popuptype == "edit" ? true : edit}
                                                handleChange={(e: any) => { handleEdit(e) }}
                                            // maxLength={10}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', width: '50%', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>


                                        </div>

                                    </Box>
                                </>
                            )}



                            {(popuptype == "deleteuser") && (
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', marginTop: '25px' }}>
                                    <Typography sx={{
                                        fontFamily: "Inter",
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        lineHeight: "22.4px",
                                        textAlign: "center",
                                        marginBottom: '10px'

                                    }}>
                                        Are you sure you
                                        want to permanent delete  <span style={{ color: "rgba(226, 11, 24, 1)" }}>{editUser?.name}?</span>
                                    </Typography>
                                    <ZupotsuTextfield
                                        title="Please enter the reason"
                                        placeholder={"Enter Reason"}
                                        value={reason}
                                        isRequired={true}
                                        type={"text"}
                                        name={"reason"}
                                        multiline={true}
                                        handleChange={(event: any) => {
                                            setReason(event.target.value)
                                        }}
                                        rows={3}
                                        maxLength={400}
                                    />
                                </Box>
                            )}
                            {(popuptype == "sendpasswordlink") ? (<></>) : (popuptype == "edit" && edit == true) ? (<></>) : (<div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: '16px',
                                    marginTop: '20px',
                                    width: '100%',
                                    paddingTop: '10px',
                                    borderTop: '1px solid rgba(224, 224, 224, 1)',

                                }}
                            >

                                <ZupotsuButton
                                    name="Cancel"
                                    variant={'outlined'}
                                    padding={"10px 40px"}
                                    isCustomColors={true}
                                    customOutlineColor="0px solid #E0E0E0"
                                    customOutlineColorOnHover="0px solid #E20B18"
                                    customBgColorOnhover="rgba(226, 11, 24, 0.05)"
                                    customBgColor="rgba(226, 11, 24, 0.05)"
                                    customTextColorOnHover="rgba(226, 11, 24, 1)"
                                    customTextColor="rgba(226, 11, 24, 1)"
                                    handleClick={() => { setOpen(false); handleClose() }}
                                />
                              
                                <ZupotsuButton
                                    name={popuptype == "changerole" ? "Submit" : popuptype == "user" ? "Submit" : popuptype == "disableuser" ? "Submit" : popuptype == "edit" ? "Update" : "Remove"}
                                    variant={'contained'}
                                    padding={"10px 40px"}
                                    isCustomColors={true}
                                    customOutlineColor="1px solid transparent"
                                    customOutlineColorOnHover="1px solid transparent"
                                    disabled={(popuptype == "changerole" && (!reason || !newUser)) ? true : (popuptype == "disableuser" && !disableReason && editUser?.is_active == true) ? true : (popuptype == "user" && (!userEmail?.trim() || !validateEmail(userEmail?.trim()) || !userName)) ? true : false}
                                    customBgColor={(popuptype == "deleteuser" && !reason) ? "rgba(226, 11, 24, 0.3)" : (popuptype == "user" && (!userName || !userEmail?.trim() || !validateEmail(userEmail?.trim()))) ? "rgba(226, 11, 24, 0.3)" : "#E20B18"}
                                    customBgColorOnhover="#E20B18"
                                    customTextColorOnHover="#FFF"
                                    customTextColor="#FFF"
                                    handleClick={() => {
                                        if (popuptype == "disableuser") {
                                            onUserActivateDisable()
                                        }
                                        else if (popuptype == "deleteuser") {
                                            deleteUser()
                                        }
                                        else if (popuptype == "edit" || popuptype == "user") {
                                            onUserUpdation()
                                        }
                                    }}
                                />
                            </div>)}


                            {(popuptype == "sendpasswordlink") && (
                                <Box sx={{

                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    width: "100%",
                                    gap: '15px',
                                    borderRadius: '8px'
                                }}>
                                    <img src={RoundedTickMark} style={{ width: "80px", height: '80px' }} />

                                    <Typography sx={{
                                        fontFamily: "Inter",
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        lineHeight: "30px",
                                        textAlign: "center"
                                    }}>
                                        Password Reset link has been sent successfully
                                    </Typography>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            gap: '16px',
                                            marginTop: '20px',
                                            width: '100%',
                                            paddingTop: '10px',
                                            borderTop: '1px solid rgba(224, 224, 224, 1)'

                                        }}
                                    >
                                        <ZupotsuButton
                                            name="Okay"
                                            variant={'contained'}
                                            padding={"12px, 40px, 12px, 40px"}
                                            isCustomColors={true}
                                            customOutlineColor="1px solid #E20B18"
                                            customOutlineColorOnHover="1px solid #E20B18"
                                            customBgColorOnhover="#E20B18"
                                            customBgColor="#E20B18"
                                            customTextColorOnHover="#FFF"
                                            customTextColor="#FFF"
                                            handleClick={() => {
                                                setOpen(false)
                                            }}
                                        />
                                    </div>
                                </Box>
                            )}




                        </Box>


                    </Modal>
                    <Modal
                        open={popup}
                        onClose={() => { setPopup(false) }}

                    >

                        <Box sx={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", width: 300, gap: '15px', borderRadius: '8px', }}>
                            <img src={RoundedTickMark} style={{ width: "80px", height: '80px' }} />

                            {popuptype == "editinguser" ? <Typography sx={{
                                fontFamily: "Inter",
                                fontSize: "20px",
                                fontWeight: 700,
                                lineHeight: "30px",
                                textAlign: "center",

                            }}>User Details have been successfully edited</Typography>
                                : <Typography sx={{
                                    fontFamily: "Inter",
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    lineHeight: "30px",
                                    textAlign: "center",

                                }}><span style={{ color: "rgba(226, 11, 24, 1)" }}>{editUser?.name}</span> has been successfully removed!</Typography>}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: '16px',
                                    marginTop: '20px',
                                    width: '100%',
                                    paddingTop: '10px',
                                    borderTop: '1px solid rgba(224, 224, 224, 1)'

                                }}
                            >
                                <ZupotsuButton
                                    name="Okay"
                                    variant={'contained'}
                                    padding={"12px, 40px, 12px, 40px"}
                                    isCustomColors={true}
                                    customOutlineColor="1px solid #E20B18"
                                    customOutlineColorOnHover="1px solid #E20B18"
                                    customBgColorOnhover="rgba(226, 11, 24, 1)"
                                    customBgColor="rgba(226, 11, 24, 1)"
                                    customTextColorOnHover="#FFF"
                                    customTextColor="#FFF"
                                    handleClick={() => {
                                        setPopup(false)
                                    }}
                                />
                            </div>
                        </Box>

                    </Modal>
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

export default ZupotsuQuickRegistered;
