import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ChangeRole, DisableUser, EditmenuIcon, EnableUser, Sendpasswordlink, TrashUser, WhiteDots } from '../../assets';
import { useNavigate } from 'react-router-dom';

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

export default function MyProposals({ menuOptions, }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigation = useNavigate()
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

    const userFromLocal = localStorage.getItem("role")?.toLowerCase();
    const isSeller = (userFromLocal === "seller") ? true : false;
    const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
    const isBuyer = (userFromLocal === "buyer") ? true : false;
    const arr = 
    isSeller||isSellerAdmin?
    [
        {
            id: 'newrequests',
            label: 'Proposal Requests',
            link: '/newrequests',
        },
        {
            id: 'allforms',
            label: 'All Documents',
            link: '/allforms',
        },
    ]
    :[
        {
            id: 'newrequests',
            label: 'Proposal Requests',
            link: '/newrequests',
        },
        // {
        //     id: 'allleads',
        //     label: 'All Leads',
        //     link: '/allleads',
        // },
        {
            id: 'allforms',
            label: 'All Documents',
            link: '/allforms',
        },

    ]


    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: "center",
        }}>

            <button
                style={{
                    cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000", display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: "center",
                    height: "32px",
                    borderRadius: '8px'
                }}
                onClick={handleClick}

            >
                My Proposals
                {/* <img src={WhiteDots} alt="Delete Icon" color='#FFF' width={20} height={20} /> */}
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
                    arr?.map((item: any, index: any) => (
                        <MenuItem onClick={() => {
                            navigation(item?.link)
                            setAnchorEl(null)
                        }} disableRipple style={{ height: "31px", gap: '10px' }}>

                            <span
                                style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "21px",
                                    color: "rgba(51, 51, 51, 1)",
                                }}
                            >
                                {item?.label}
                            </span>
                        </MenuItem>
                    ))}

            </StyledMenu>
        </div>
    );
}
