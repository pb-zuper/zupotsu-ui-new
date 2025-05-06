import React, { useEffect, useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { ZopotsuLogo } from '../assets';
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
    disabled?: boolean;
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

const Sidebar: React.FC<SidebarProps> = ({
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
    const userFromLocal = localStorage.getItem("role")?.toLowerCase();
    const isItAdmin = (userFromLocal === "admin") ? true : false;
    const isApprover = (userFromLocal === "approver") ? true : false;
    const isPublisher = (userFromLocal === "publisher") ? true : false;
    const [expandedParents, setExpandedParents] = useState<string[]>([selectedParent]);
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
        if (currentPath == "brandanalysis" || currentPath == "createreport") {
            setSelectedParent("campaigns");
            setSelectedChild("campaigns");
        }
        console.log("currentPath", currentPath)
    }, [location, sidebarData, setSelectedParent, setSelectedChild]);

    const handleParentClick = (parentId: string, parentItem: SidebarItemData) => {
        // if(parentId =="catalogue_management"|| parentId =="settings")
        // {
        setSelectedParent(parentId);
        if (parentItem.children?.length === 0) {
            navigation(parentItem.link);
        }
        // }

    };
    const [logoutpop, setLogoutPopup] = useState(false)

    const logout = () => {
        setLogoutPopup(true)
    }

    const toggleParent = (parentId: string) => {
        setExpandedParents((prevExpanded: any) =>
            prevExpanded.includes(parentId) ? [] : [parentId]
        )
    };

    return (
        <div
            style={{
                width: (deviceType === 'mobile' && isOpen) ? '60%' : (deviceType == 'mobile' && isOpen == false) ? "0%" : isOpen ? '17%' : '0%',
                height: '100%',
                backgroundColor: theme.palette.primary.main,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                // transition: 'width 0.5s ease',
                // transition: 'transform 0.3s ease-in-out',
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease-in-out',
                // transform: "none",
                // transition: 'transform 500ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                zIndex: deviceType === 'mobile' && isOpen ? 1 : deviceType !== 'mobile' && isOpen ? 1 : -1,
                position: deviceType === 'mobile' && isOpen ? "absolute" : "relative"
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
                        <img src={ZopotsuLogo} alt='zopotsuLogo' style={{ width: isOpen ? '60%' : '60%', }} />
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
                                    color: '#FFF',
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
                                    backgroundColor: selectedParent === parentItem.id ? 'rgba(255,255,255,0.35)' : 'transparent',
                                }}
                                onClick={() => {
                                    // if (!parentItem?.disabled) {
                                    handleParentClick(parentItem.id, parentItem)
                                    toggleParent(parentItem.id);
                                    // }

                                }}
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
                                    <img src={parentItem.icon} alt='zopotsuLogo' style={{ width: '16px', height: '16px', }} />
                                    {parentItem.label && isOpen && (
                                        <div
                                            style={{
                                                fontFamily: 'Inter',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                textAlign: 'left',
                                                color: parentItem?.disabled ? "rgba(255,255,255,0.6)" : '#FFF',
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
                                            transform: `rotate(${(expandedParents.includes(parentItem.id) && selectedParent === parentItem.id) ? '180deg' : '0deg'})`,
                                        }}
                                    // onClick={(e) => {
                                    //     e.stopPropagation(); // Prevent triggering parent click event
                                    //     toggleParent(parentItem.id);
                                    // }}
                                    />
                                )}
                            </div>

                            {expandedParents.includes(parentItem.id) && selectedParent === parentItem.id && parentItem.children?.length > 0 && (
                                <div
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.35)',
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
                                                if (!childItem?.disabled && location.pathname !== childItem.link) {
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
                                                color: childItem?.disabled ? 'rgba(255,255,255,0.35)' : '#FFF',
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
                    padding: '20px',
                    cursor: 'pointer'
                }}
                onClick={() => { setLogoutPopup(true); logout() }}
            >
                <div style={{ width: '20px', background: "#e22b16", height: '20px', borderRadius: '100%', border: '1px solid #e22b16', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><LogoutIcon style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold' }} /></div>
                <div
                    style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 500,
                        textAlign: 'left',
                        color: '#fff',
                        marginLeft: '5px'
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
                            <KeyboardArrowLeft style={{ color: '#FFF', width: '16px', height: '16px' }} />
                        ) : (
                            <KeyboardArrowRight style={{ color: '#FFF', width: '16px', height: '16px' }} />
                        )}
                    </button>
                </div>
            )}
            {((deviceType !== 'mobile' && isOpen == true))
                && (
                    <div
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            transition: 'width 0.3s ease',
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

export default Sidebar;