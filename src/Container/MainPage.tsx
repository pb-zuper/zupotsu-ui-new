import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import {
    CatelogueManagementIcon,
    PropsalManagementIcon,
    UserMangementIcon,
    managetray,
    managecategories,
    settings,
    engagementrate,
    campaignW
} from '../assets';
import useDeviceType from '../utils/DeviceType';
import Sidebar from '../Components/Sidebar';
import FormListing from '../Components/Settings/FormListing';
import { Header } from '../Components/Header/Header';
import PreviewForm from '../Components/Settings/PreviewForm';
import CreateNewForm from '../Components/Settings/CreateNewForm';
import Catalogue from '../Components/Catalouge/Catalogue';
import AssetCreation from '../Components/ListAsset/AssetCreation';
import ZupotsuUsers from '../Components/UserManagement/ZupotsuUsers';
import ZupotsuSellers from '../Components/UserManagement/ZupotsuSellers';
import ZupotsuBuyer from '../Components/UserManagement/ZupotsuBuyer';
import ManageTray from '../Components/ManageTray/ManageTray';
import ManageBanner from '../Components/ManageTray/ManageBanner';
import CreateBanner from '../Components/ManageTray/CreateBanner';
import EventScreen from './EventScreen';
import CatalogueIframe from './catalogueIframe';
import { useLocation } from 'react-router-dom';
import AssetDetails from '../Components/ListAsset/assetDetails';
import CreateTray from '../Components/ManageTray/CreateTray';
import LoginAndRegister from './LoginFlow/LoginAndRegister';
import AllAssetScreen from './allAssets';
import ForgotPassword from './LoginFlow/ForgotPassword';
import ResetAndConfirmPassword from './LoginFlow/ResetAndConfirmPassword';
import Sidebar2 from '../Components/Sidebar2';
import ZupotsuUnregistered from '../Components/UserManagement/ZupotsuUnregistered';
import Popup from '../Atoms/popup/popup';
import Newrequests from '../Components/ProposalManagement/Newrequests';
import Allleads from '../Components/ProposalManagement/Allleads';
import Allleadproposaldetails from '../Components/ProposalManagement/Allleadproposaldetails';
import Allforms from '../Components/ProposalManagement/Allforms';
import Profile from '../Components/Profile/Profile';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Contactus from './contactus';
import Form from '../Components/ProposalManagement/Form';
import AlertandNotification from '../Components/Settings/AlertandNotifications/AlertandNotification';
import CompleteRegister from './CompleteRegister';
import ZupotsuQuickRegistered from '../Components/UserManagement/ZupotsuQuickRegistered';
import SiteSettings from '../Components/Settings/SiteSettings/siteSettings';
import Termsandservices from './Termsandservices';
import ManageCampaigns from '../Components/MyCampaigns/ManageCampaigns';
import CreateReport from '../Components/MyCampaigns/CreateReport';
import Brandanalysis from '../Components/MyCampaigns/Brandanalysis';
import TagsAnalysis from '../Components/MyCampaigns/TagsAnalysis';


export function MainPage() {
    const userFromLocal = localStorage.getItem("role")?.toLowerCase();
    const isItAdmin = (userFromLocal === "admin") ? true : false;
    const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
    const isApprover = (userFromLocal === "approver") ? true : false;
    const isPublisher = (userFromLocal === "publisher") ? true : false;
    const isSeller = (userFromLocal === "seller") ? true : false;
    const isBuyer = (userFromLocal === "buyer") ? true : false;
    const isQuickUser = (userFromLocal === "quick-reg") ? true : false;

    const [loader, setLoader] = useState<any>(false)
    const [sidebarData, setSidebarData] = useState<any>([]);
    const [profileShow, setShowProfile] = useState<any>(false)
    const [sidebarData2, setSidebarData2] = useState<any>(
        (localStorage.getItem("role")?.toLowerCase() === "buyer") ? ([
            {
                id: 'proposal_management',
                label: 'My Proposals',
                link: '/newrequests',
                isSelected: false,
                children: [],
                icon: PropsalManagementIcon,
            },
            {
                id: 'settings',
                label: 'Settings',
                link: '/settings',
                isSelected: false,
                children: [],
                icon: settings,
            },
        ]) :
            ([
                {
                    id: 'catalogue_management',
                    label: 'My Assets',
                    link: '/catalogue-management',
                    isSelected: false,
                    children: [],
                    icon: CatelogueManagementIcon,
                },
                {
                    id: 'proposal_management',
                    label: 'My Proposals',
                    link: '/newrequests',
                    isSelected: false,
                    children: [],
                    icon: PropsalManagementIcon,
                },
                {
                    id: 'settings',
                    label: 'Settings',
                    link: '/settings',
                    isSelected: false,
                    children: [],
                    icon: settings,
                },
            ])
    );
    const [searchParams] = useSearchParams();
    const isCatalogue = searchParams.get('screen') == "catalogue" ? true : false;
    const location = useLocation();

    useEffect(() => {
        setLoader(true);
        const sidebarItems = [
            ...((
                // isApprover !== true && isPublisher !== true &&
                isSeller !== true) ? [{
                    id: 'user_management',
                    label: 'User Management',
                    link: '/user_management',
                    isSelected: false,
                    // disabled: (isApprover || isPublisher) ? true : false,
                    children: [
                        ...((isItAdmin || isApprover || isPublisher) ? [{
                            id: 'zupotsu_users',
                            label: 'Zupotsu Users',
                            link: '/zupotsu_users',
                            isSelected: false,
                            children: [],
                            disabled: (isApprover || isPublisher) ? true : false,
                            parentId: 'user_management',
                            isChild: true,
                        }] : []),
                        ...((isSellerAdmin || isItAdmin || isApprover || isPublisher) ? [{
                            id: 'sellers',
                            label: 'Sellers',
                            link: '/sellers',
                            isSelected: false,
                            children: [],
                            disabled: (isApprover || isPublisher) ? true : false,
                            parentId: 'user_management',
                            isChild: true,
                        }] : []),
                        ...((isBuyer || isItAdmin || isApprover || isPublisher) ? [{
                            id: 'buyers',
                            label: 'Buyers',
                            link: '/buyers',
                            isSelected: false,
                            children: [],
                            disabled: (isApprover || isPublisher) ? true : false,
                            parentId: 'user_management',
                            isChild: true,
                        }] : []),
                        ...((isBuyer || isItAdmin || isApprover || isPublisher) ? [{
                            id: 'unregistered',
                            label: 'Unregistered',
                            link: '/unregistered',
                            isSelected: false,
                            children: [],
                            disabled: (isApprover || isPublisher) ? true : false,
                            parentId: 'user_management',
                            isChild: true,
                        }] : []),
                        ...((isItAdmin || isApprover || isPublisher) ? [{
                            id: 'quickregistered',
                            label: 'QuickRegistered',
                            link: '/quickregistered',
                            isSelected: false,
                            children: [],
                            disabled: (isApprover || isPublisher) ? true : false,
                            parentId: 'user_management',
                            isChild: true,
                        }] : []),
                    ],
                    icon: UserMangementIcon,
                }] : []),




            // ...(isItAdmin ? [
            {
                id: 'catalogue_management',
                label: 'Catalogue Management',
                link: '/catalogue-management',
                isSelected: false,
                children: [
                    ...((isItAdmin || isSellerAdmin || isApprover || isPublisher) ? [{
                        id: 'catalogue',
                        label: 'Catalogue',
                        link: '/catalogue-management',
                        isSelected: false,
                        children: [],
                        disabled: false,
                        parentId: 'catalogue_management',
                        isChild: true,
                    }] : []),
                    ...((isItAdmin || isApprover || isPublisher) ? [{
                        id: 'manage_tray',
                        label: 'Manage Tray',
                        link: '/manage_tray',
                        isSelected: false,
                        children: [],
                        disabled: false,
                        parentId: 'catalogue_management',
                        isChild: true,
                    }] : []),
                    ...((isItAdmin || isApprover || isPublisher) ? [{
                        id: 'manage_banner',
                        label: 'Manage Banner',
                        link: '/manage_banner',
                        isSelected: false,
                        children: [],
                        disabled: false,
                        parentId: 'catalogue_management',
                        isChild: true,
                    }] : []),
                    ...((isItAdmin || isApprover || isPublisher) ? [{
                        id: 'manage_forms',
                        label: 'Manage Onbording Forms',
                        link: '/manage_forms',
                        isSelected: false,
                        children: [],
                        disabled: (isApprover || isPublisher) ? true : false,
                        parentId: 'catalogue_management',
                        isChild: true,
                    }] : []),
                ],
                icon: CatelogueManagementIcon,
            },
            // ] : []),
            {
                id: 'proposal_management',
                label: 'Proposal Management',
                link: '/newrequests',
                isSelected: false,
                children: [
                    {
                        id: 'newrequests',
                        label: 'Proposal Requests',
                        link: '/newrequests',
                        isSelected: false,
                        children: [],
                        parentId: 'proposal_management',
                        isChild: true,
                    },
                    // {
                    //     id: 'allleads',
                    //     label: 'All Leads',
                    //     link: '/allleads',
                    //     isSelected: false,
                    //     children: [],
                    //     parentId: 'proposal_management',
                    //     isChild: true,
                    // },
                    {
                        id: 'allforms',
                        label: 'All Documents',
                        link: '/allforms',
                        isSelected: false,
                        children: [],
                        parentId: 'proposal_management',
                        isChild: true,
                    },
                ],
                icon: PropsalManagementIcon,
            },
            ...(isItAdmin || isSellerAdmin || isApprover || isPublisher
                ? [
                    {
                        id: 'campaigns',
                        label: 'Campaigns',
                        link: '/campaigns',
                        isSelected: false,
                        children: [

                            {
                                id: 'campaigns',
                                label: 'Campaigns',
                                link: '/campaigns',
                                isSelected: false,
                                children: [],
                                disabled: false,
                                parentId: 'campaigns',
                                isChild: true,
                            },

                        ],
                        icon: campaignW,
                    },
                ]
                : []),
            {
                id: 'settings',
                label: 'Settings',
                link: '/settings',
                isSelected: false,
                children: [
                    {
                        id: 'alert_notification',
                        label: 'Alert & Notification Settings',
                        link: '/alert_notification',
                        isSelected: false,
                        children: [],
                        parentId: 'settings',
                        isChild: true,
                    },
                    {
                        id: 'site_settings',
                        label: 'Site Settings',
                        link: '/SiteSettings',
                        isSelected: false,
                        children: [],
                        parentId: 'settings',
                        isChild: true,
                    },
                ],
                icon: settings,
            },
        ];
        setSidebarData(sidebarItems);
        setLoader(false);

    }, [isItAdmin, isSellerAdmin, isSeller, isBuyer, isApprover, isPublisher]);

    const [selectedParent, setSelectedParent] = useState<any>("catalogue_management");
    const [selectedChild, setSelectedChild] = useState<string | undefined>(undefined);
    const deviceType = useDeviceType();
    const [sidebarOpen, setSidebarOpen] = useState<any>(deviceType == "mobile" ? false : true);
    const [sidebar2Open, setSidebar2Open] = useState<any>(deviceType == "mobile" ? false : false);


    const toggleSidebar = () => {
        if ((location.pathname == "/catalogue" || location.pathname.includes("/catalogue/tray") || isSeller || isSellerAdmin || isBuyer)) {
            setSidebar2Open(!sidebar2Open);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };
    const navigate = useNavigate();
    const isAdmin = () => {
        const userRole = localStorage.getItem('role');
        return userRole === 'admin';
    };

    const isAuthenticated = () => {
        const userId = localStorage.getItem('userID');
        const token = localStorage.getItem('accessToken');
        return !!userId && !!token;
    };

    if (!loader) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection:
                        //  deviceType === 'mobile' ? 
                        'column'
                    //   : 'row'
                    ,
                    margin: 0
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '100vh',
                        width: '100%',
                    }}
                >

                    {(isSeller !== true && isBuyer !== true && isSellerAdmin != true && isQuickUser != true) && (!(location.pathname == ("/catalogue") || location.pathname.includes("/catalogue/tray") || location.pathname.includes("loginregister") || location.pathname.includes("forgotpassword") || location.pathname.includes("reset-password") || location.pathname.toLowerCase() == "/cataloguescreen" || location.pathname.toLowerCase() == "/contactus")) && !isCatalogue && (
                        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} selectedParent={selectedParent} setSelectedParent={setSelectedParent} sidebarData={sidebarData} setSelectedChild={setSelectedChild} selectedChild={selectedChild} />
                    )}
                    {((location.pathname == ("/catalogue") || location.pathname.includes("/catalogue/tray") || isSeller || isSellerAdmin || isBuyer || isQuickUser) && deviceType == "mobile") && (
                        <Sidebar2 isOpen={sidebar2Open} onClose={toggleSidebar} selectedParent={selectedParent} setSelectedParent={setSelectedParent} sidebarData={sidebarData2} setSelectedChild={setSelectedChild} selectedChild={selectedChild} />
                    )}
                    <div style={{
                        filter: (deviceType === 'mobile' && (sidebarOpen || sidebar2Open)) ? 'blur(4px)' : 'none',
                        width: (isSeller || isBuyer || isSellerAdmin || isQuickUser) ? "100%" :
                            deviceType === 'mobile' ||
                                location.pathname.includes("forgotpassword") ||
                                location.pathname.includes("reset-password") ||
                                !sidebarOpen ||
                                location.pathname == "/catalogue" ||
                                location.pathname.includes("/catalogue/tray") ||
                                location.pathname.includes("loginregister") ||
                                location.pathname.toLowerCase() == "/cataloguescreen" ||
                                location.pathname.toLowerCase() == "/contactus" ||
                                isCatalogue
                                ? "100%"
                                : "83%"
                        , overflowY: 'auto', backgroundColor: '#FFF',
                    }}
                        onClick={() => {
                            if (deviceType === 'mobile' && (sidebarOpen || sidebar2Open)) {
                                setSidebarOpen(false)
                                setSidebar2Open(false)
                            }
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                backgroundColor: '#FFF',
                            }}
                        >
                            <div
                                style={{
                                    width: deviceType == "mobile" ? "100%" : (sidebarOpen && !location.pathname.includes("catalogue")) ? '100%' : '100%',
                                    backgroundColor: '#FFF',
                                }}
                            >


                                {!(location.pathname.includes("loginregister") || location.pathname.includes("forgotpassword") || location.pathname.includes("reset-password") || location.pathname.toLowerCase() == "/cataloguescreen" || location.pathname.toLowerCase() == "/contactus" || location.pathname.toLowerCase() == "/download") && (

                                    <Header
                                        sidebarOpen={sidebarOpen}
                                        toggleSidebar={toggleSidebar}
                                        isUserLogin={true}
                                        loginButtonClicked={() => { }}
                                        showNotificationIcon={true}
                                        onNotificationIconClicked={() => { }}
                                        profileShow={profileShow}
                                        setShowProfile={setShowProfile}
                                    />
                                )}
                            </div>
                        </div>

                        <div style={{ width: (isSeller === true || isBuyer == true || isQuickUser) ? "100%" : (deviceType === 'mobile' && sidebarOpen) ? "100%" : (deviceType === 'mobile') ? "100%" : (sidebarOpen && !location.pathname.includes("catalogue")) ? '100%' : (!location.pathname.includes("forgotpassword")) ? '100%' : (!location.pathname.includes("reset-password")) ? "100%" : '100%', overflowY: 'auto', backgroundColor: '#FFF' }}>
                            <TransitionGroup>
                                <CSSTransition
                                    key={location.key}
                                    timeout={500}
                                    classNames="fade"
                                >
                                    <Routes>
                                        <Route path="/" element={<Navigate to={isAuthenticated() ? ((isAdmin() || isSeller || isSellerAdmin) ? "/catalogue-management" : "/catalogue") : "/loginregister"} />} />
                                        <Route path="*" element={<Navigate to={isAuthenticated() ? ((isAdmin() || isSeller || isSellerAdmin) ? "/catalogue-management" : "/catalogue") : "/loginregister"} />} />
                                        <Route path="eula" element={<Termsandservices shown={true} setShown={""} isFull={true} />} />
                                        <Route path="/loginregister" >
                                            <Route path="" element={<Navigate to="login" />} />
                                            <Route path="login" element={<LoginAndRegister />} />
                                            <Route path="register" element={<LoginAndRegister />} />
                                            <Route path="quickregister" element={<LoginAndRegister />} />
                                        </Route>
                                        <Route path="/cataloguescreen" element={<CatalogueIframe sidebarOpen={sidebar2Open} />} />
                                        <Route path="/reset-password" element={<ResetAndConfirmPassword />} />
                                        <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/loginregister" />} />
                                        <Route path="/catalogue-management" element={<Catalogue sellerData={[]} />} />
                                        <Route path="/assetcreation" element={isAuthenticated() ? <AssetCreation sidebarOpen={sidebarOpen} /> : <Navigate to="/loginregister" />} />
                                        <Route path="/general-enquires" element={isAuthenticated() ? <></> : <Navigate to="/loginregister" />} />
                                        <Route path="/manage_forms" element={isAuthenticated() ? <FormListing /> : <Navigate to="/loginregister" />} />
                                        <Route path="/form_creation" element={isAuthenticated() ? <CreateNewForm sidebarOpen={sidebarOpen} /> : <Navigate to="/loginregister" />} />
                                        <Route path="/previewform" element={isAuthenticated() ? <PreviewForm /> : <Navigate to="/loginregister" />} />
                                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                                        <Route path="/editform" element={isAuthenticated() ? <></> : <Navigate to="/loginregister" />} />
                                        <Route path="/zupotsu_users" element={isAuthenticated() ? <ZupotsuUsers /> : <Navigate to="/loginregister" />} />
                                        <Route path="/sellers" element={isAuthenticated() ? <ZupotsuSellers /> : <Navigate to="/loginregister" />} />
                                        <Route path="/buyers" element={isAuthenticated() ? <ZupotsuBuyer /> : <Navigate to="/loginregister" />} />
                                        {/* <Route path="/quickregistered" element={isAuthenticated() ? <ZupotsuQuickReg /> : <Navigate to="/loginregister" />} /> */}
                                        <Route path="/quickregistered" element={isAuthenticated() ? <ZupotsuQuickRegistered /> : <Navigate to="/loginregister" />} />
                                        <Route path="/unregistered" element={isAuthenticated() ? <ZupotsuUnregistered /> : <Navigate to="/unregistered" />} />
                                        <Route path="/manage_tray" element={isAuthenticated() ? <ManageTray /> : <Navigate to="/loginregister" />} />
                                        <Route path="/manage_banner" element={isAuthenticated() ? <ManageBanner /> : <Navigate to="/loginregister" />} />
                                        <Route path="/createBanner" element={isAuthenticated() ? <CreateBanner sidebarOpen={sidebarOpen} /> : <Navigate to="/loginregister" />} />
                                        <Route path="/createTray" element={isAuthenticated() ? <CreateTray /> : <Navigate to="/loginregister" />} />
                                        <Route path="/catalogue" element={<EventScreen sidebarOpen={sidebar2Open} />} />
                                        <Route path="/catalogue/tray" element={isAuthenticated() ? <AllAssetScreen /> : <Navigate to="/loginregister" />} />
                                        <Route path="/assetDetails" element={isAuthenticated() ? <AssetDetails /> : <Navigate to="/loginregister" />} />
                                        <Route path="/newrequests" element={isAuthenticated() ? <Newrequests /> : <Navigate to="/loginregister" />} />
                                        <Route path="/allleads" element={isAuthenticated() ? <Allleads /> : <Navigate to="/loginregister" />} />
                                        <Route path="/allforms" element={isAuthenticated() ? <Allforms /> : <Navigate to="/loginregister" />} />
                                        <Route path="/allleadsproposaldetails" element={isAuthenticated() ? <Allleadproposaldetails /> : <Navigate to="/loginregister" />} />
                                        <Route path="/form" element={isAuthenticated() ? <Form sidebarOpen={sidebarOpen} /> : <Navigate to="/loginregister" />} />
                                        <Route path="/contactus" element={<Contactus sidebarOpen={sidebar2Open} />} />
                                        <Route path='/alert_notification' element={<AlertandNotification />} />
                                        <Route path='/completeregistration' element={<CompleteRegister />} />
                                        <Route path='/completeregister' element={<CompleteRegister />} />
                                        <Route path="/SiteSettings" element={isAuthenticated() ? <SiteSettings /> : <Navigate to="/loginregister" />} />

                                        <Route path="/campaigns" element={isAuthenticated() ? <ManageCampaigns /> : <Navigate to="/loginregister" />} />
                                        <Route path="/createreport" element={isAuthenticated() ? <CreateReport /> : <Navigate to="/loginregister" />} />
                                        <Route path="/brandanalysis" element={isAuthenticated() ? <Brandanalysis /> : <Navigate to="/loginregister" />} />
                                        <Route path="/taganalysis" element={isAuthenticated() ? <TagsAnalysis /> : <Navigate to="/loginregister" />} />
                                    </Routes>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>

            </div >
        );
    } else {
        return (
            <div className="centered-container">
                <div className="loader"></div>
            </div>
        )
    }
}

function popupFun() {
    return <Popup open={true} setOpen={() => { }} text={"Session Timeout!!"} heading={"Timeout!!"} handleYesAction={() => { }} handleClose={() => { }} />

}

export default { MainPage, popupFun };



