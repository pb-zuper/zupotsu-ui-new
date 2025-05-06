import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, InputAdornment, MenuItem, Paper, Select, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Table, FormControl, InputLabel, Modal, Snackbar } from '@mui/material';
import { DotGroup, NoDataImage, RoundedTickMark, SMSTracking, SearchNormal, tickCircle, WhiteDots, ChangeRole, DisableUser, Sendpasswordlink, EditmenuIcon, TrashUser, EditIconn, EnableUser } from '../../assets';
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb';
import { useNavigate } from 'react-router';
import NoData from '../../error/NoData';
import { Close, EmailOutlined, KeyboardArrowDownOutlined, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUpOutlined } from '@mui/icons-material';
import UserManagementTable from '../../Molecules/table-management/UserManagementTable';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import UserActions from './UserActions';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import Apis from '../../services/apis';
import useDeviceType from '../../utils/DeviceType';
import { validateEmail } from '../../utils/validateTextfieldValue';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import ZoptsuUnderlineTitle from '../../Atoms/zoputsu-underline-title-text/zoptsu-underline-title';
type FormAttribute = {
  attribute_priority: number;
};

const ZupotsuUsers: React.FC = () => {
  const headers = ['Name', 'Email', 'Mobile No', 'Role', 'Organisation', "Reg Date", 'Status', 'Actions'];
  const [open, setOpen] = useState(false)
  const [editUser, setEditUser] = useState<any>({})
  const [userEmail, setUserEmail] = useState<any>()
  const [userName, setUserName] = useState<any>()
  const [search, setSearch] = useState<any>("")
  const [isEmailValid, setIsEmailValid] = useState(true);
  const apis = new Apis();
  const [loader, setLoader] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const [roleUser, setRoleUser] = useState<any>({
    currentrole: "",
    newrole: ""

  })
  const [popup, setPopup] = useState(false)
  const [popuptype, setPopuptype] = useState<any>("")
  const [reason, setReason] = useState('')
  const [disableReason, setDisableReason] = useState('')
  const [mailSent, setMailSent] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [callApi, setCallApi] = useState(false)
  const [roles, setRoles] = useState<any>([])
  const [rolesData, setRolesData] = useState<any>([])
  const [selectedRole, setSelectedRole] = useState<any>([])
  const deviceType = useDeviceType()

  const isAdminEmailValid = userEmail && userEmail.endsWith('@zupotsu.com')


  const handleClose = () => {
    setOpen(false)
    setUserName("")
    setUserEmail('')
    setEditUser([])
    setReason("")
    setDisableReason("")
  }

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditUser((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleUser((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const formatDateString = (dateString: any) => {
    if (!dateString) return 'NA';

    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    const formattedMonth = month.slice(0, 3);
    return `${formattedMonth}\n${day} ${year}`;
  };

  const columns: any = [
    {
      field: 'name', cellStyle: {
        height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500",
        '& .MuiTableCell-root': {
          height: "60px",
          padding: '10px'
        }
      }
    },
    {
      field: 'email', cellStyle: {
        height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500",
        '& .MuiTableCell-root': {
          height: "60px",
          padding: '10px'
        }
      }
    },
    {
      field: 'mobile', cellStyle: {
        height: "30px", fontSize: "14px", width: '180px', lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500",
        '& .MuiTableCell-root': {
          height: "60px",
          padding: '10px'
        }
      }
    },
    { field: 'role', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    { field: 'organisaion', cellStyle: { height: "30px", fontSize: "14px", lineHeight: "21px", fontFamily: 'Inter', fontWeight: "500" } },
    {
      field: 'Reg Date', render: (_: any, item: any) => (
        <div style={{
          fontFamily: "Inter",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "21px",
          textAlign: "left",
        }}>
          {item.reg_date?formatDateString(item.reg_date): "NA"}
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

        <div onClick={() => {
          setRoleUser((prevState: any) => ({

            currentrole: item?.role,
          }))
        }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center" }}>
          <UserActions editData={editUser} data={item} setEditData={setEditUser} setEdit={setEdit} menuOptions={menuOptions} setOpen={setOpen} setPopuptype={setPopuptype} onUserActivateDisable={onUserActivateDisable} forgetPwd={forgetPwd} />
        </div>
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

  const linkDetails = useMemo(() => [
    {
      label: 'User Management',
      url: '',
    },
    {
      label: 'Zupotsu Users',
      url: '/zupotsu_users',
    },
  ], []);

  const ErrorData = useMemo(
    () => ({
      img: NoDataImage,
      button: false,
      message: "No Users Found"
    }),
    [
      // selectedCategory
    ]
  )

  const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: (popuptype == "edit" || popuptype == "user") ? 600 : 400,
    backgroundColor: "#FFF",
    border: '0px solid #000',
    borderRadius: '8px',
    divShadow: 24,
    padding: "20px",
    fontFamily: 'Inter'
  };



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
      await onLoadRoles()
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


  const onLoad = async () => {

    setLoader(true)
    apis.getUsers()
      .then((response: any) => {
        let arr: any = []
        response.data.data.map((item: any, index: any) => {
          if (item?.userroles[0]?.role?.name?.toLowerCase() == "admin" || item?.userroles[0]?.role?.name?.toLowerCase() == "publisher" || item?.userroles[0]?.role?.name?.toLowerCase() == "approver") {
            arr.push({
              id: item.id,
              name: item.name,
              email: item.email,
              role: convertKeysToTitleCase(item.userroles[0].role.name),
              organisaion: item.organization.name,
              mobile: item.mobile,
              status: item.is_active ? "Active" : "Disabled",
              userroles: item.userroles,
              reg_date: item.created_at || "NA"
            })
          }


        })
        setTableData(arr)
        setLoader(false)
      })
      .catch((error) => {
        mixpanelEvents.errorHandling({
          name: 'Zupotsu Users Listing Page',
          msg: error?.response?.data?.error || error?.message
        })
        setLoader(false)
      });
  }


  const onUserUpdation = () => {
    setLoader(true);
    if (popuptype === "edit") {
      if (!editUser?.name || !editUser?.mobile || editUser?.mobile?.length < 10) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: "Please fill all the fields",
        });
        setLoader(false);
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

            }
          })
          .catch((error) => {
            // setOpen(false);
            setEdit(false);

          })
          .finally(() => {
            setLoader(false);
          });
      }
    }
    else if (popuptype === "user") {
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
              message: 'Registration link sent',
            })
          }
        })
        .catch((error) => {
          // setOpen(false);
          setEdit(false);
          setSnackbar({
            open: true,
            severity: 'error',
            message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
          })

        })
        .finally(() => {
          setLoader(false);

        });
    }

  };



  const onUserActivateDisable = (
    // id: any, is_active: any
  ) => {

    if (!disableReason) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: "Please fill all the fields",

      });
      setLoader(false);
    } else {
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
            message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),

          });

        })
        .finally(() => {
          setLoader(false);
          setDisableReason("")
        });
    }
  }




  const onLoadRoles = async () => {
    setLoader(true)
    apis.getRoles()
      .then((response: any) => {

        if (response?.data) {

          const arr: any = []
          setRolesData(response?.data?.data)
          response.data.data.map((item: any, index: any) => {
            if (!(item?.name?.toLowerCase() == "seller" || item?.name?.toLowerCase() == "seller-admin" || item?.name?.toLowerCase() == "buyer")) {
              arr.push(convertKeysToTitleCase(item.name))
            }
          })
          setRoles(arr)
        }

      })
      .catch((error) => {
        setLoader(false)

      });
  }


  const forgetPwd = () => {
    setLoader(true)
    let body = {
      "email": editUser?.email,
    }
    apis.resetPassword(body)
      .then((response: any) => {
        navigator.clipboard.writeText(response.data.data).then(() => {
          setSnackbar({
            open: true,
            severity: 'success',
            message: "Reset password link has been sent",
          });
        });
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
        setSnackbar({
          open: true,
          severity: 'error',
          message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
        });
      });
  };



  const deleteUser = () => {
    if (!reason) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: "Please fill required fields",
      });
    }
    else {
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
          setLoader(false)
          setOpen(false)
        })
        .catch((error) => {
          setLoader(false)
          // setOpen(false)
          setReason("")
          setSnackbar({
            open: true,
            severity: 'error',
            message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
          });
        })
        .finally(() => {
          setLoader(false)
          setReason("")
        })
    }

  };
  const userFromlocal = localStorage.getItem("role")
  const isAdmin = userFromlocal?.toLowerCase() == "admin" ? true : false

  const menuOptions = [
    {
      menuname: 'Change Role',
      type: 'changerole',
      menuIcon: ChangeRole
    },
    {
      menuname: editUser?.is_active ? 'Disable User' : "Activate User",
      type: 'disableuser',
      menuIcon: editUser?.is_active ? DisableUser : EnableUser
    },
    {
      menuname: 'Send Password Link',
      type: 'sendpasswordlink',
      menuIcon: Sendpasswordlink
    },
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



  useEffect(() => {
    const newRole = rolesData?.filter((item: any) => item?.name?.toLowerCase() === roleUser["newrole"]?.toLowerCase());
    setSelectedRole(newRole)
  }, [roleUser])




  const onRoleChange = () => {
    if (!roleUser["newrole"] || !reason) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: "Please fill all required fields ",

      });
    } else {
      setLoader(true);
      const body = {
        "id": editUser?.userroles[0]?.id,
        "user_id": editUser?.id,
        "role_id": selectedRole[0]?.id,
        "role_change_reason": reason || ""
      };


      apis.onChangeRole(body)
        .then((response: any) => {
          if (response?.data?.status == "success") {
            setOpen(false);
            setEdit(false);
            setCallApi(!callApi)
            setReason("")
            setSnackbar({
              open: true,
              severity: 'success',
              message: "Role changed successfully",
            });
          }
        })
        .catch((error) => {
          // setOpen(false);
          setEdit(false);
          setSnackbar({
            open: true,
            severity: 'error',
            message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),

          });
        })
        .finally(() => {
          setLoader(false);
          setReason("")
        });
    }
  }



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

          <div style={{ width: '98%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFF", paddingBottom: 10, gap: '10px' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: deviceType == "mobile" ? "column" : 'row', justifyContent: deviceType == "mobile" ? "flex-start" : 'space-between', alignItems: deviceType == "mobile" ? "flex-start" : 'center', padding: '10px', marginTop: '10px', marginBottom: '10px', backgroundColor: '#FFF' }}>

              <ZoptsuUnderlineTitle
                fontSizeOnLargeScreen="35px"
                fontSizeOnMediumScreen="33px"
                fontSizeOnSmallScreen="33px"
                fontSizeOnExtraSmallScreen="33px"
                titleText={'Zupotsu Users'}
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
                    value={search}
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
                    onChange={(e) => { setSearch(e.target.value) }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={SearchNormal}
                            alt="Search"
                            style={{
                              // paddingBottom: '5px',
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
                    onClick={() => { setOpen(true); setPopuptype("user"); setEditUser({}) }}
                    sx={{
                      padding: '6px 8px',
                      color: '#FFF',
                      fontFamily: 'Inter',
                      fontSize: '14px',
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

                  >
                    <span style={{ marginRight: '8px' }}>+</span> Invite User
                  </Button>
                </div>
              </div>
            </div>

            <div style={{ borderColor: '#FFF', borderStyle: 'solid', borderWidth: '0px', width: '98%' }}>

              {(tableData?.length > 0) ? (<>
                <UserManagementTable
                  columns={columns}
                  tableData={tableData}
                  setTableData={setTableData}
                  headers={headers}
                  search={search}
                  handleChange={handleChangeTable}
                />
              </>) : (
                <NoData ErrorData={ErrorData} />
              )}

              <Modal open={open} onClose={handleClose}>
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
                      {popuptype == "user" ? "Invite User" : popuptype == "disableuser" ? (editUser?.is_active ? "Disable User" : "Enable User") : popuptype == "changerole" ? "Change Role" : popuptype == "edit" ? "Edit" : "Delete User"}
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
                      marginLeft: '10px',
                      marginRight: '10px',
                      marginTop: '10px',
                    }}>
                      Are you sure you
                      want to permanent {editUser?.is_active ? "disable" : "enable"} <span style={{ color: "rgba(226, 11, 24, 1)" }}>{editUser?.name}?</span>
                      {(editUser?.is_active) && (<ZupotsuTextfield
                        title="Please enter the disable reason"
                        placeholder={"Enter disable Reason"}
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

                    </Typography>)}

                  {(popuptype == "changerole") && (<Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', marginTop: '25px' }}>
                    <ZupotsuTextfield
                      title={"Current Role"}
                      placeholder={"Current Role"}
                      value={roleUser["currentrole"] as string}
                      isRequired={false}
                      type={"text"}
                      name={"currentrole"}
                      multiline={false}
                      previewMode={true}
                      handleChange={(e: any) => { handleRole(e) }}
                    // maxLength={10}
                    />

                    <ZupotsuDropdown
                      title="Select New Role"
                      placeholder="Select New Role"
                      value={roleUser["newrole"]}
                      isRequired={false}
                      name="newrole"
                      dropdownData={roles?.filter((item: any, index: any) => item?.toLowerCase() !== roleUser["currentrole"]?.toLowerCase())}
                      handleChange={(e: any) => {
                        const { value } = e.target;

                        setRoleUser((prevState: any) => ({
                          ...prevState,
                          newrole: value,
                        }));


                      }}
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


                  {((popuptype == "edit")) && (
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
                            <path d="M10.6933 2.0135L5.43992 7.26684C5.23992 7.46684 5.03992 7.86017 4.99992 8.14684L4.71325 10.1535C4.60659 10.8802 5.11992 11.3868 5.84659 11.2868L7.85325 11.0002C8.13325 10.9602 8.52659 10.7602 8.73325 10.5602L13.9866 5.30684C14.8933 4.40017 15.3199 3.34684 13.9866 2.0135C12.6533 0.680168 11.5999 1.10684 10.6933 2.0135Z" stroke="#E20B18" stroke-width="1.5" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9.93994 2.7666C10.3866 4.35993 11.6333 5.6066 13.2333 6.05993" stroke="#E20B18" stroke-width="1.5" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
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
                      <Box sx={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center', gap: '10px', marginTop: '25px' }}>
                        <div style={{ display: 'flex', width: '50%', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>
                          <ZupotsuTextfield
                            title={"Name"}
                            placeholder={"Enter name"}
                            value={editUser["name"] as string}
                            isRequired={false}
                            type={"text"}
                            name={"name"}
                            multiline={false}
                            previewMode={edit}
                            handleChange={(e: any) => { handleEdit(e) }}
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
                            previewMode={edit}
                            handleChange={(e: any) => { handleEdit(e) }}
                          // maxLength={10}
                          />
                        </div>
                      </Box>
                      <Box sx={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                        <div style={{ display: 'flex', width: '50%', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>
                          <ZupotsuTextfield
                            title={"Email"}
                            placeholder={"Enter email"}
                            value={editUser["email"] as string}
                            isRequired={false}
                            type={"text"}
                            name={"email"}
                            multiline={false}
                            previewMode={popuptype == "edit" ? true : edit}
                            handleChange={(e: any) => { handleEdit(e) }}
                          // maxLength={10}
                          />
                        </div>
                        <div style={{ display: 'flex', width: '50%', flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>

                          <ZupotsuTextfield
                            title={"Role"}
                            placeholder={"Enter role"}
                            value={editUser["role"] as string}
                            isRequired={false}
                            type={"text"}
                            name={"role"}
                            multiline={false}
                            previewMode={popuptype == "edit" ? true : edit}
                            handleChange={(e: any) => { handleEdit(e) }}
                          // maxLength={10}
                          />
                        </div>

                      </Box>
                    </>
                  )}


                  {(popuptype == "user") && (
                    <>

                      <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "flex-start", alignItems: 'center', gap: '10px', marginTop: '25px' }}>
                        <ZupotsuTextfield
                          title={"Name"}
                          placeholder={"Enter name"}
                          value={userName}
                          isRequired={true}
                          type={"text"}
                          name={"name"}
                          // errorMessage={(userName?.length == 0) ? "The name is not valid" : ""}
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
                          errorMessage={(!isAdminEmailValid && userEmail?.trim()?.length > 0) ? "Enter a zupotsu email (example@zupotsu.com)" : ""}
                          multiline={false}
                          previewMode={edit}
                          handleChange={(e: any) => { setUserEmail(e.target.value?.toLowerCase()) }}
                        />

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
                  {(popuptype == "sendpasswordlink") ? (<></>) : (popuptype == "edit" && edit == true) ? (<></>) : (
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
                        handleClick={() => { setOpen(false); setEdit(false);handleClose() }}
                      />
                      <ZupotsuButton
                        name={popuptype == "changerole" ? "Submit" : popuptype == "user" ? "Submit" : popuptype == "disableuser" ? "Submit" : popuptype == "edit" ? "Update" : "Remove"}
                        variant={'contained'}
                        padding={"10px 40px"}
                        isCustomColors={true}
                        disabled={((popuptype == "changerole") && (!roleUser["newrole"] || !reason)) ? true : (popuptype == "deleteuser" && !reason) ? true : (popuptype == "disableuser" && !disableReason && editUser?.is_active == true) ? true : (popuptype == "user" && (!isAdminEmailValid || userName?.length == 0)) ? true : false}
                        customOutlineColor="1px solid transparent"
                        customOutlineColorOnHover="1px solid transparent"
                        customBgColorOnhover="#E20B18"
                        customBgColor={(popuptype == "deleteuser" && !reason) ? "rgba(226, 11, 24, 0.3)" : (popuptype == "user" && (!isAdminEmailValid || userName?.length == 0)) ? "rgba(226, 11, 24, 0.3)" : "#E20B18"}
                        customTextColorOnHover="#FFF"
                        customTextColor="#FFF"
                        handleClick={() => {
                          if (popuptype == "disableuser") {
                            onUserActivateDisable()
                          } else if (popuptype == "changerole") {
                            onRoleChange()
                          }
                          else if (popuptype == "deleteuser") {
                            deleteUser()
                          }
                          else {
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
                </Box>

              </Modal>

            </div>
          </div>
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

export default ZupotsuUsers;
