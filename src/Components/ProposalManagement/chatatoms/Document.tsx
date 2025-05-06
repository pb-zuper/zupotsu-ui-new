import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import React, { useState } from 'react';
import { Closed, editIcon, FlipView } from '../../../assets';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Text = () => {
    const [menuanchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(menuanchorEl);
    const [isSent, setIsSent] = useState(false)

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const menuOptions = [
        { key: 1, name: 'Edit', icon: editIcon },
        { key: 2, name: 'Close', icon: Closed },
        { key: 3, name: 'Enable Flip View', icon: FlipView },
    ];

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: isSent ? 'row-reverse' : "row", justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: isSent ? 'row-reverse' : "row", justifyContent: 'space-between', width: '70%', alignItems: 'flex-start' }}>
                <div style={{ width: '10%', display: 'flex', flexDirection: 'row', justifyContent:isSent ? "flex-end":"flex-start", alignItems: 'flex-end', }}>
                    <div
                        onClick={() => { }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            border: '2px solid var(--Theme-colors-border-2, rgba(229, 229, 229, 1))',
                            backgroundColor: '#D2EAF4',
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'Inter',
                                fontSize: '20px',
                                fontWeight: 500,
                                lineHeight: '28px',
                            }}
                        >
                            P
                        </span>
                    </div>
                </div>

                <div style={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <p
                            style={{
                                fontFamily: 'Inter',
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '16.94px',
                                margin: 0,
                            }}
                        >
                            Ava Williams
                        </p>
                        <p
                            style={{
                                fontFamily: 'Inter',
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '16.94px',
                                margin: 0,
                            }}
                        >
                            Monday 4:23pm
                        </p>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            borderTopRightRadius:'0px',
                            background: 'rgba(242, 242, 242, 1)',
                            padding: '10px',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'Inter',
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '16.94px',
                                margin: 0,
                                textAlign: 'left',
                            }}
                        >
                            Hey, the sale team left some comments on the report, can you please have a look and let me know if we need to change anything?
                        </p>
                    </div>
                </div>
            </div>

            <div
                style={{
                    background: '#FFF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onClick={handleMenuClick}
            >
                <MoreVertIcon style={{ color: '#333', width: '24px', height: '24px' }} />
            </div>

            <Menu
                anchorEl={menuanchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                sx={{
                    boxShadow: '4px 4px 12px 0px rgba(0, 0, 0, 0.07)',
                    borderRadius: '10px',
                    padding: '10px',
                }}
            >
                <MenuList sx={{ outline: 'none', borderRadius: '10px' }}>
                    {menuOptions.map((menudata) => (
                        <MenuItem
                            key={menudata.key}
                            onClick={() => {
                                // Add functionality for menu option clicks here
                            }}
                            sx={{
                                display: 'flex',
                                gap: '10px',
                                '&:hover': {
                                    background: 'rgba(226, 11, 24, 0.2)',
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    minHeight: '20px',
                                    minWidth: '20px !important',
                                }}
                            >
                                <img src={menudata.icon} alt={menudata.name} />
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#333',
                                    fontFamily: 'Inter',
                                    lineHeight: '21px',
                                    textAlign: 'left',
                                }}
                            >
                                {menudata.name}
                            </ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </div>
    );
};

export default Text;
