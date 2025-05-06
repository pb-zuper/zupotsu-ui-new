import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ChangeRole, DisableUser, EditmenuIcon, EnableUser, Sendpasswordlink, TrashUser, WhiteDots } from '../../assets';
import Apis from '../../services/apis';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function UserActions({ setOpen, setPopuptype, menuOptions, setEdit, editData, setEditData, data, onUserActivateDisable }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {

        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const apis = new Apis();
    const forgetPwd = (email: any) => {
        // setLoader(true)

        let body = {
            "email": email,
        }
        apis.resetPassword(body)
            .then((response: any) => {
                setEdit(true)
                if (response?.data?.status == "success") {
                    setSnackbar({
                        open: true,
                        severity: 'success',
                        message: "Reset password link has been sent",
                    });
                }
            })
            .catch((error) => {
                // setLoader(false)
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!' ),
                });
            });
    };



    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: "center",
        }}>
            <button
                style={{
                    width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "rgba(226, 11, 24, 1)", border: "0px solid #000", display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: "center",
                    height: "32px",
                    borderRadius: '8px'
                }}
                onClick={handleClick}

            >
                <img src={WhiteDots} alt="Delete Icon" color='#FFF' width={20} height={20} />
            </button>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "21px",
                    color: "rgba(51, 51, 51, 1)",
                    padding: '5px'
                }}
                onClose={handleClose}
            >

                {
                    menuOptions?.map((item: any, index: any) => (
                        <MenuItem
                            key={index}
                            onClick={() => {
                                setEditData({
                                    "name": data?.name,
                                    "mobile": data?.mobile,
                                    "email": data?.email,
                                    "id": data?.id,
                                    "role": data?.role,
                                    "is_active": data?.status?.toLowerCase() == "active" ? true : false,
                                    "userroles": data?.userroles
                                })
                                if (item?.type == "edit") {
                                    setEdit(true)
                                } else if (item?.type == "disableuser") {
                                    setEdit(true)
                                }
                                else if (item?.type == "sendpasswordlink") {
                                    forgetPwd(data?.email)
                                }
                                handleClose();
                                setOpen(true);
                                setPopuptype(item.type)
                            }} disableRipple style={{ height: "31px", gap: '10px' }}>
                            <img
                                src={
                                    item?.type === "disableuser"
                                        ? data?.status?.toLowerCase() === "active"
                                            ? DisableUser
                                            : EnableUser
                                        : item.menuIcon
                                } style={{ width: '20px', height: '20px' }} />
                            <span
                                style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "21px",
                                    color: "rgba(51, 51, 51, 1)",
                                }}
                            >
                                {item?.type === "disableuser"
                                    ? data?.status?.toLowerCase() === "active"
                                        ? "Disable User"
                                        : "Activate User"
                                    : item?.menuname}
                            </span>
                        </MenuItem>
                    ))}

            </StyledMenu>
        </div>
    );
}
