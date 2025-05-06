import React, { useEffect, useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Athlete, ZopotsuLogo, ZupotsuColuredLogo } from '../assets';
import { useNavigate, useLocation } from 'react-router-dom';
import useDeviceType from '../utils/DeviceType';
import theme from '../theme';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '../Atoms/logout/Logout';

interface SidebarItemData {
    id: string;
    label: string;
    link: string;
    isSelected: boolean;
    children: SidebarItemData[];
    parentId?: string;
    isChild?: boolean;
    icon?: any;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    selectedParent: string;
    setSelectedParent: React.Dispatch<React.SetStateAction<string>>;
    sidebarData: SidebarItemData[];
    setSelectedChild: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedChild: string | undefined;
}

const Sidebar2: React.FC<SidebarProps> = ({
    isOpen,
    onClose,
    selectedParent,
    setSelectedParent,
    sidebarData,
    selectedChild,
    setSelectedChild,
}) => {
    const navigation = useNavigate();
    const location = useLocation();
    const deviceType = useDeviceType();
    const name: any = localStorage.getItem("name") || "";

    useEffect(() => {
        const currentPath = location.pathname.split('/').pop();

        sidebarData.forEach(parentItem => {
            if (parentItem.link.split('/').pop() === currentPath) {
                setSelectedParent(parentItem.id);
                setSelectedChild(undefined);
            }

            parentItem.children.forEach(childItem => {
                if (childItem.link.split('/').pop() === currentPath) {
                    setSelectedParent(parentItem.id);
                    setSelectedChild(childItem.id);
                }
            });
        });
    }, [location, sidebarData, setSelectedParent, setSelectedChild]);

    const handleParentClick = (parentId: string, parentItem: SidebarItemData) => {
        // if(parentId =="catalogue_management"|| parentId =="settings")
        // {
        // if(parentId=="proposal_management")
        // {
        //     alert("Coming Soon!!")
        // }
        // else{
        setSelectedParent(parentId);
        if (parentItem.children?.length === 0) {
            navigation(parentItem.link);
        }
        // }
        // }

    };

    const [logoutpop, setLogoutPopup] = useState(false)
    const logout = () => {
        // const confirmLogout = window.confirm("Are you sure you want to log out?");
        // if (confirmLogout) {
        //     localStorage.clear()
        //     onClose()
        //     navigation('/loginregister')

        // } 
        setLogoutPopup(true);
    }

    return (
        <div
            style={{
                width: (deviceType === 'mobile' && isOpen) ? '60%' : (deviceType == 'mobile' && isOpen == false) ? "0%" : isOpen ? '17%' : '0%', // Adjust width based on sidebar state
                height: '100%',
                backgroundColor: '#F4F4F4',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease-in-out',
                zIndex: deviceType === 'mobile' && isOpen ? 5 : deviceType !== 'mobile' && isOpen ? 5 : -1,
                position: deviceType === 'mobile' && isOpen ? "absolute" : "relative",

            }}
        >
            <Logout logoutpop={logoutpop} setLogoutPopup={setLogoutPopup} />
            <div style={{ width: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            padding: '0px 10px',
                            marginTop: '10%',
                        }}
                    >
                        <img src={ZupotsuColuredLogo} alt='zopotsuLogo' style={{ width: isOpen ? '60%' : '60%', }} />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        marginTop: '25px',
                        padding: '6px',
                        visibility: (deviceType == 'mobile' && isOpen == false) ? "hidden" : 'visible'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '2px solid #E10B17',
                            borderRadius: 100,
                            background: '#F2F2F2',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer'
                        }}
                    >
                        {/* <img
                        src={Athlete}
                        width={25}
                        height={25}
                        onClick={()=>{}}
                    /> */}
                        <span style={{
                            fontFamily: "Inter",
                            fontSize: "25px",
                            marginTop: '-5px',
                            fontWeight: 500,
                            lineHeight: "28px",
                        }}>{name.charAt(0)}</span>
                    </div>
                    <div style={{
                        fontFamily: "Inter",
                        fontSize: "18px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        marginTop: '5px',
                    }}>{(name?.length < 15) ? (name || "") : (
                        name?.slice(0, 15)
                        + "...")}
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: '100%',
                        marginTop: '25px',
                        padding: '6px',
                        visibility: (deviceType == 'mobile' && isOpen == false) ? "hidden" : 'visible'
                    }}
                >
                    {sidebarData?.map(parentItem => (
                        <div key={parentItem.id} style={{ width: '100%', padding: 0 }} className='parent-item'>
                            <div
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    gap: '5px',
                                    width: '100%',
                                    padding: '8px',
                                    borderTopLeftRadius: '5px',
                                    borderTopRightRadius: '5px',
                                    backgroundColor: selectedParent === parentItem.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                                }}
                                onClick={() => { handleParentClick(parentItem.id, parentItem); onClose() }}
                            >
                                <div
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: '5px',
                                        width: '100%',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                    }}
                                >
                                    <div style={{ width: '20px', background: "#e22b16", height: '20px', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                        <img src={parentItem.icon} alt='zopotsuLogo' style={{ width: '16px', height: '16px' }} />
                                    </div>
                                    {parentItem.label && isOpen && (
                                        <div
                                            style={{
                                                fontFamily: 'Inter',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                textAlign: 'left',
                                                // color: '#686868',
                                                marginLeft: '10px'
                                            }}
                                        >
                                            {parentItem.label}
                                        </div>
                                    )}
                                </div>
                                {parentItem.children?.length > 0 && (
                                    <KeyboardArrowDown
                                        sx={{
                                            width: '14px',
                                            height: '14px',
                                            fontWeight: '500',
                                            transform: `rotate(${selectedParent === parentItem.id ? '180deg' : '0deg'})`,
                                        }}
                                    />
                                )}
                            </div>

                            {selectedParent === parentItem.id && parentItem.children?.length > 0 && (
                                <div
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        borderBottomLeftRadius: '5px',
                                        borderBottomRightRadius: '5px',
                                        paddingLeft: '10px',
                                        paddingRight: '10px',
                                        paddingBottom: '10px',
                                    }}
                                >
                                    {parentItem.children.map(childItem => (
                                        <div
                                            onClick={() => {
                                                if (location.pathname !== childItem.link) {
                                                    setSelectedChild(childItem.id);
                                                    navigation(childItem.link);
                                                }
                                            }}
                                            style={{
                                                fontFamily: 'Inter',
                                                fontSize: '13px',
                                                backgroundColor: selectedChild === childItem.id ? 'rgba(255,255,255,0.35)' : 'transparent',
                                                fontWeight: 500,
                                                lineHeight: '22.4px',
                                                textAlign: 'left',
                                                color: 'grey',
                                                padding: '5px',
                                                paddingLeft: '10px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                            }}
                                            key={childItem.id}
                                            className='child-item'
                                        >
                                            {isOpen ? childItem.label : '...'}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '5px',
                    width: '100%',
                    marginTop: '5px',
                    marginBottom: '20px',
                    padding: '20px'
                }}
                onClick={() => { setLogoutPopup(true); logout() }}
            >
                <div style={{ width: '20px', background: "#e22b16", height: '20px', borderRadius: 12, border: '1px solid #e22b16', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><LogoutIcon style={{ fontSize: '14px', color: '#fff' }} /></div>
                <div
                    style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 500,
                        textAlign: 'left',
                        // color: '#686868',
                        marginLeft: '10px'
                    }}
                >
                    Logout
                </div>
            </div>

            {((deviceType == 'mobile' && isOpen !== false)) && (
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        transition: 'width 0.3s ease',
                        left: deviceType == 'mobile' && isOpen ? "100%" : isOpen ? '17%' : '5%',
                        top: '3%',
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            width: '24px',
                            height: '24px',
                            border: '1px solid #FFF',
                            display: 'flex',
                            position: 'absolute',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(226, 11, 24, 1)',
                            zIndex: 1,
                            borderRadius: '100px',
                            cursor: 'pointer',
                        }}
                    >
                        {isOpen ? (
                            <KeyboardArrowLeft style={{ color: '#fff', width: '16px', height: '16px' }} />
                        ) : (
                            <KeyboardArrowRight style={{ color: '#fff', width: '16px', height: '16px' }} />
                        )}
                    </button>
                </div>
            )}
            {
                ((deviceType !== 'mobile' && isOpen == true))
                && (
                    <div
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            // transition: 'width 0.3s ease',
                            left: '100%',
                            top: '3%',
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                width: '24px',
                                height: '24px',
                                border: '1px solid #FFF',
                                display: 'flex',
                                position: 'absolute',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(226, 11, 24, 1)',
                                zIndex: 1,
                                borderRadius: '100px',
                                cursor: 'pointer',
                            }}
                        >
                            {isOpen ? (
                                <KeyboardArrowLeft style={{ color: '#FFF', width: '16px', height: '16px' }} />
                            ) : (
                                <KeyboardArrowRight style={{ color: '#FFF', width: '16px', height: '16px' }} />
                            )}
                        </button>
                    </div>
                )}
        </div>
    );
};

export default Sidebar2;
