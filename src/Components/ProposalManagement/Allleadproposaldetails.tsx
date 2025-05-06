import {
  Box, Button, FormControl, Grid, Typography, MenuItem, Select, styled, Dialog, DialogContent, Snackbar, InputAdornment, TextField, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, ListItemText, Menu, MenuList, Modal
} from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import documentupload from './../../assets/documentupload.svg'
import Breadcrumb from '../../Atoms/breadcrumb/breadcrumb'
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Loader from '../../loader/Loader';
import useDeviceType from '../../utils/DeviceType';
import { arrowUp, collapse, DeleteIcon, DocumentDownloadIcon, documentUpload, inprogress, download, Edit, EditIconn, expand, forward, LinearGrid, List, NoDataImage, Pinned, Search, SearchNormal, tickCircle, TickCircleGreen, touch2, PAcc, invoiceFinal, invoiceAdv, PDoc, PPen, PRej, PSub, Report, sowSub, sowS, sowB, sowSubB, BinvoiceAdv, BinvoiceFinal } from '../../assets';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import { Row, Col } from 'react-bootstrap';
import Stepper from '@mui/material/Stepper';
import Close from '@mui/icons-material/Close';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import ZupotsuDropdown from '../../Atoms/zupotsu-dropdown/zupotsu-dropdown';
import VisibilityButton from '../../Atoms/Visibility/VisibilityButton';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import addSquare from './../../assets/addSquare.svg'
import menubase from './../../assets/menubase.svg'
import smile from './../../assets/smile.svg'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import Apis from '../../services/apis';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ForwardPopup from './chatatoms/ForwardPopup';
import Reply from './chatatoms/Reply';
import Chat from './chatatoms/Chat';
import PinnedChat from './chatatoms/PinnedChat';
import { notstarted } from '../../assets';
import InvoiceCompletion from './chatatoms/InvoiceCompletion';
import Popover from '@material-ui/core/Popover';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import mixpanelEvents from '../../mixpanel/mixpanelEvents';
import RefreshIcon from '@mui/icons-material/Refresh';
const Allleadproposaldetails = () => {
  const userFromLocal = localStorage.getItem("role")?.toLowerCase();
  const isItAdmin = (userFromLocal === "admin") ? true : false;
  const isSellerAdmin = (userFromLocal === "seller-admin") ? true : false;
  const isApprover = (userFromLocal === "approver") ? true : false;
  const isPublisher = (userFromLocal === "publisher") ? true : false;
  const isSeller = (userFromLocal === "seller") ? true : false;
  const isBuyer = (userFromLocal === "buyer") ? true : false;
  const userId: any = localStorage.getItem("userID")
  const name = localStorage.getItem("name")
  const [snackbar, setSnackbar] = useState<any>({
    open: false,
    severity: 'success',
    message: '',
  });
  const [buyerchats, setBuyerChats] = useState<any>({})
  const [sellerchats, setSellerChats] = useState<any>({})
  const [sellerName, setSellerName] = React.useState<string>('');
  const [buyerName, setBuyerName] = React.useState<string>('');
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);
  const [clickDownload, setClickDownload] = useState(false)
  const [documentpopupOpen, setDocumentpopupOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState((isSeller || isSellerAdmin) ? 'Seller' : isBuyer ? 'Buyer' : 'Buyer');
  const [uploadDocument, setUploadDocument] = React.useState<string>('');
  const [documentSize, setDocumentSize] = React.useState<any>("");
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const [searchValue, setSearchValue] = useState('');
  const [buyersearchValue, setBuyerSearchValue] = useState('');
  const [sellersearchValue, setSellerSearchValue] = useState('');
  const [isSearchPresent, setSearchPresent] = useState(false);
  const [isBuyerChatExist, setBuyerChatExist] = useState(false)
  const [isSellerChatExist, setSellerChatExist] = useState(false)
  const [proposalDetails, setproposalDetails] = useState<any>()
  const [proposalDocs, setproposalDocs] = useState<any>([])
  const deviceType = useDeviceType();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => { setAnchorEl(null); };
  const handleClick = (event: any) => { setAnchorEl(event.currentTarget) };
  const [buyerid, setBuyerid] = useState("")
  const [buyerorgid, setBuyerorgid] = useState("")
  const [buyerloading, setBuyerLoading] = useState(false)
  const [sellerid, setSellerid] = useState("")
  const [sellerorgid, setSellerorgid] = useState("")
  const [sellerloading, setSellerLoading] = useState(false)
  const [buyerChatBoxId, setBuyerChatBoxId] = useState("")
  const [sellerChatBoxId, setSellerChatBoxId] = useState("")
  const apis = new Apis();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const [fileData, setFileData] = React.useState<any>();
  const [documentType, setDocumentType] = React.useState<any>();
  const [activeStep, setActiveStep] = React.useState(1);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [popupopen, setpopupOpen] = React.useState(false);
  const [closepopupopen, setClosepopupOpen] = React.useState(false);
  const [popupTitle, setpopupTitle] = React.useState("");
  const [proposalPopup, setproposalPopup] = React.useState(false);
  const handleOpenpopup = () => setpopupOpen(true);
  const handleClosepopup = () => setpopupOpen(false);
  const [buyerforwardpopup, setBuyerForwardPopup] = React.useState(false);
  const [isInvoiceCompletion, setIsInvoiceCompletion] = React.useState(false);
  const handleOpenBuyerForwardpopup = () => setBuyerForwardPopup(true);
  const handleCloseBuyerForwardpopup = () => setBuyerForwardPopup(false);
  const [sellerforwardpopup, setSellerForwardPopup] = React.useState(false);
  const handleOpenSellerForwardpopup = () => setSellerForwardPopup(true);
  const handleCloseSellerForwardpopup = () => setSellerForwardPopup(false);
  const [buyerReplyPopup, setBuyerReplyPopup] = React.useState(false);
  const [sellerReplyPopup, setSellerReplyPopup] = React.useState(false);
  const [forwardingChat, setForwardingChat] = React.useState<any>({});
  const [buyerPinnedChats, setBuyerPinnedChats] = React.useState<any>([]);
  const [sellerPinnedChats, setSellerPinnedChats] = React.useState<any>([]);
  const [pinnedBuyerOpen, setPinnedBuyerOpen] = React.useState(null);
  const [closeObj, setCloseObj] = React.useState<any>({});
  const navigate = useNavigate()
  const [steps, setSteps] = useState([
    {
      label: 'Enquiry Initiated',
    },
    {
      label: 'Scope/Quotation',
    }, {
      label: 'Proposal',
    },
    {
      label: 'SOW/Agreement Signed',
    }, {
      label: 'Reporting',
    },
    {
      label: 'Invoicing',
    },
  ])
  const [proposalstatus, setProposalStatus] = useState("Enquiry Stage")
  const [buyersearchResults, setBuyerSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [sellersearchResults, setSellerSearchResults] = useState([]);
  const [sellercurrentSearchIndex, setSellerCurrentSearchIndex] = useState(0);
  const [remark, setRemark] = useState("")
  const [closeremark, setCloseRemark] = useState("")
  const [allpforms, setallpforms] = useState([])
  const [forms, setforms] = useState([])
  const [selform, setSelform] = useState([])
  const [docName, setdocName] = useState("")

  // const documentTypes: any = [
  //   "Scope Document",
  //   "Proposal Document",
  //   selectedRole == "Buyer" ? "Buyer SOW Document" : "Seller SOW Document",
  //   "Tripartriate Agreement",
  //   "Report Document",
  //   selectedRole == "Buyer" ? "Buyer Invoice Document (Interim)" : "Seller Invoice Document (Interim)",
  //   selectedRole == "Buyer" ? "Buyer Invoice Document (Final)" : "Seller Invoice Document (Final)",
  //   "Others"
  // ]

  const documentTypes: any = [
    activeStep === 1 && isItAdmin && "Scope Document",
    activeStep === 2 && isItAdmin && "Proposal Document",
    activeStep === 3 && (isItAdmin && (selectedRole === "Buyer" ? "Buyer SOW Document" : "Seller SOW Document")),
    (activeStep === 3 && isItAdmin) && "Tripartriate Agreement",
    activeStep === 4 && (isItAdmin || isSeller || isSellerAdmin) && "Report Document",
    (isItAdmin && selectedRole === "Buyer" && activeStep < 6) && "Buyer Invoice Document (Interim)",
    ((isSeller || isSellerAdmin) && activeStep < 6) && "Seller Invoice Document (Interim)",
    ((isItAdmin && selectedRole === "Buyer") && activeStep === 5) && "Buyer Invoice Document (Final)",
    ((isSeller || isSellerAdmin || isItAdmin) && selectedRole != "Buyer" && activeStep === 5) && "Seller Invoice Document (Final)",
    "Others"
  ].filter(Boolean);

  const formatDateString = (dateString: any) => {
    if (!dateString) return 'NA';

    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    const formattedMonth = month.slice(0, 3);
    return `${formattedMonth}\n${day} ${year}`;
  };

  function updateSteps(arr: any) {
    let hasSellerSOW = false;
    let hasBuyerSOW = false;
    let hasSellerSOWDoc = false;
    let hasBuyerSOWDoc = false;

    arr.map((doc: any) => {
      if (doc.name === "Enquiry Initiated" || doc.name === "Scope/Quotation" || doc.name === "Proposal" || doc.name === "SOW/Agreement Signed" || doc.name === "Reporting" || doc.name === "Invoicing") {
        const formattedDate =
          new Date(doc.updated_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
        // formatDateString(doc.updated_at)


        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === doc.name ? { ...step, date: formattedDate, updatedBy: doc?.updated_by_user?.name, document: doc.document } : step,
          )
        );
      }
      if (doc.name === "Scope Document") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Scope/Quotation' ? { ...step, status: "submitted", document: doc.document } : step
          )
        );
      }
      else if (doc.name === "Report Document") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Reporting' ? { ...step, status: "submitted", document: doc.document } : step
          )
        );
      }
      else if (doc.name === "Proposal Document") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Proposal' ? { ...step, status: "submitted", document: doc.document } : step
          )
        );
      }
      else if (doc.name === "Proposal Accepted") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Proposal' ? { ...step, status: "accepted", document: doc.document } : step
          )
        );
      }
      else if (doc.name === "Proposal Pending") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Proposal' ? { ...step, status: "pending", document: doc.document } : step
          )
        );
      }
      else if (doc.name === "Proposal Dormant") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Proposal' ? { ...step, status: "dormant", document: doc.document } : step
          )
        );
      }
      else if (doc.name === "Proposal Rejected") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Proposal' ? { ...step, status: "rejected", document: doc.document } : step
          )
        );
      }
      else if (doc.name === "Seller SOW Document") {
        hasSellerSOW = true
        hasSellerSOWDoc = doc.document
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'SOW/Agreement Signed' ? { ...step, status1: "sowSubmitted", document1: doc.document } : step
          )
        );
      }
      else if (doc.name === "Buyer SOW Document") {
        hasBuyerSOW = true
        hasBuyerSOWDoc = doc.document
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'SOW/Agreement Signed' ? { ...step, status2: "sowSubB", document2: doc.document } : step
          )
        );
      }
      else if (doc.name === "Buyer Invoice Document (Interim)") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Invoicing' ? { ...step, status1: "BinvoiceAdv", document1: doc.document } : step
          )
        );
      }
      else if (doc.name === "Buyer Invoice Document (Final)") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Invoicing' ? { ...step, status2: "BinvoiceFinal", document2: doc.document } : step
          )
        );
      }
      else if (doc.name === "Seller Invoice Document (Interim)") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Invoicing' ? { ...step, status3: "invoiceAdv", document3: doc.document } : step
          )
        );
      }
      else if (doc.name === "Seller Invoice Document (Final)") {
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'Invoicing' ? { ...step, status4: "invoiceFinal", document4: doc.document } : step
          )
        );
      }
      else if (doc.name === "Tripartriate Agreement") {
        hasSellerSOW = true
        hasBuyerSOW = true
        hasSellerSOWDoc = doc.document
        hasBuyerSOWDoc = doc.document
        setSteps((prevSteps: any) =>
          prevSteps.map((step: any) =>
            step.label === 'SOW/Agreement Signed' ? { ...step, status1: "sowSubmitted", status2: "sowSubB", document1: doc.document, document2: doc.document, } : step
          )
        );
      }
    })
    if (hasSellerSOW && hasBuyerSOW) {
      setSteps((prevSteps: any) =>
        prevSteps.map((step: any) =>
          step.label === 'SOW/Agreement Signed' ? { ...step, isBoth: true, status1: "sowSubmitted", status2: "sowSubB", document1: hasSellerSOWDoc, document2: hasBuyerSOWDoc, } : step
        )
      );
    }
  }

  const handleClickPinnedBuyer = (event: any) => {
    setPinnedBuyerOpen(pinnedBuyerOpen ? null : event.currentTarget);
  };

  const pinbuyeropen = Boolean(pinnedBuyerOpen);
  const pinbuyerid = pinbuyeropen ? 'simple-popup' : undefined;

  const [pinnedSellerOpen, setPinnedSellerOpen] = React.useState(null);

  const handleClickPinnedSeller = (event: any) => {
    setPinnedSellerOpen(pinnedSellerOpen ? null : event.currentTarget);
  };

  const pinselleropen = Boolean(pinnedSellerOpen);
  const pinsellerid = pinselleropen ? 'simple-popup' : undefined;

  const [PCS, setPCS] = useState("")


  useEffect(() => {
    buyerscrollToBottom()
    sellerscrollToBottom()
  }, [buyerchats, sellerchats])

  const buyerchatRefs = useRef<Array<HTMLDivElement | null>>([]);

  const buyerscrollToChat = (index: number) => {
    if (buyerchatRefs.current[index]) {
      buyerchatRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      handleClickPinnedBuyer(null)
    }
  };

  const sellerchatRefs = useRef<Array<HTMLDivElement | null>>([]);

  const sellerscrollToChat = (index: number) => {
    if (sellerchatRefs.current[index]) {
      sellerchatRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      handleClickPinnedSeller(null)
    }
  };


  useEffect(() => {
    const handleBuyerSearch = () => {
      const results: any = [];
      Object.keys(buyerchats || {})?.forEach((day) => {
        buyerchats[day]?.forEach((message: any) => {
          if (!message?.doc && message?.text?.toLowerCase().includes(buyersearchValue?.toLowerCase())) {
            results.push(message.id);
          } else if (message?.doc && (message?.doc_name?.toLowerCase().includes(buyersearchValue?.toLowerCase()) || message?.doc_type?.toLowerCase().includes(buyersearchValue?.toLowerCase()))) {
            results.push(message.id);
          }
        });
      });
      setBuyerSearchResults(results);
      setCurrentSearchIndex(0);
    };
    handleBuyerSearch()
  }, [buyersearchValue])


  // Function to scroll to a specific message
  const scrollToMessage = (id: any) => {
    buyerchatRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Scroll to the next or previous search result
  const handleScroll = (direction: any) => {
    let newIndex = currentSearchIndex;
    if (direction === 'up' && currentSearchIndex > 0) {
      newIndex -= 1;
    } else if (direction === 'down' && currentSearchIndex < buyersearchResults.length - 1) {
      newIndex += 1;
    }
    setCurrentSearchIndex(newIndex);
    scrollToMessage(buyersearchResults[newIndex]);
  };



  useEffect(() => {
    const handleSellerSearch = () => {
      const results: any = [];
      Object.keys(sellerchats || {})?.forEach((day) => {
        sellerchats[day]?.forEach((message: any) => {
          if (!message?.doc && message?.text?.toLowerCase().includes(sellersearchValue?.toLowerCase())) {
            results.push(message.id);
          } else if (message?.doc && message?.doc_name?.toLowerCase().includes(sellersearchValue?.toLowerCase())) {
            results.push(message.id);
          }
        });
      });
      setSellerSearchResults(results);
      setSellerCurrentSearchIndex(0);
    };
    handleSellerSearch()
  }, [sellersearchValue])


  // Function to scroll to a specific message
  const scrollToMessageSeller = (id: any) => {
    sellerchatRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Scroll to the next or previous search result
  const handleScrollSeller = (direction: any) => {
    let newIndex = sellercurrentSearchIndex;
    if (direction === 'up' && sellercurrentSearchIndex > 0) {
      newIndex -= 1;
    } else if (direction === 'down' && sellercurrentSearchIndex < sellersearchResults.length - 1) {
      newIndex += 1;
    }
    setSellerCurrentSearchIndex(newIndex);
    scrollToMessageSeller(sellersearchResults[newIndex]);
  };




  // const divRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   if (divRef.current) {
  //     divRef.current.scrollTop = divRef.current.scrollHeight;
  //   }
  // };

  const buyerdivRef = useRef<HTMLDivElement>(null);

  const buyerscrollToBottom = () => {
    if (buyerdivRef.current) {
      buyerdivRef.current.scrollTop = buyerdivRef.current.scrollHeight;
    }
  };

  const sellerdivRef = useRef<HTMLDivElement>(null);

  const sellerscrollToBottom = () => {
    if (sellerdivRef.current) {
      sellerdivRef.current.scrollTop = sellerdivRef.current.scrollHeight;
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleFileChange = async (e: any) => {
    setLoad(true);

    const upload = async (file: any, fileSize: any, fileName: any) => {
      try {
        const res = await apis.getS3URL(file);
        setFileData(res.data.data[0]);
        setdocName("")
        setDocumentSize(fileSize);
        setUploadDocument(fileName);
        setSnackbar({
          open: true,
          severity: "success",
          message: "File uploaded successfully",
        });
      } catch (error: any) {
        setSnackbar({
          open: true,
          severity: "error",
          message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
        });
      } finally {
        setLoad(false);
      }
    };

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileName = file.name;
      const fileSizeInKB = file.size / 1024;
      const fileSizeInMB = file.size / 1024 / 1024;
      const fileSize =
        fileSizeInMB > 1
          ? `${fileSizeInMB.toFixed(2)} MB`
          : `${fileSizeInKB.toFixed(2)} KB`;

      // console.log(fileSizeInMB)

      try {
        if (
          documentType === "Buyer Invoice Document (Interim)" ||
          documentType === "Seller Invoice Document (Interim)" ||
          documentType === "Buyer Invoice Document (Final)" ||
          documentType === "Seller Invoice Document (Final)" ||
          documentType === "Buyer SOW Document" ||
          documentType === "Seller SOW Document" ||
          documentType === "Proposal Document"
        ) {

          if (file.type === "application/pdf") {
            if (fileSizeInMB <= 5) { // Limit set to 5 MB
              await upload(file, fileSize, fileName);
            } else {
              setSnackbar({
                open: true,
                severity: "error",
                message: "File size should be less than or equal to 5 MB!",
              });
            }
          } else {
            setSnackbar({
              open: true,
              severity: "error",
              message: "Please upload a PDF document!",
            });
          }
        } else if (documentType === "Report Document") {
          if (
            file.type === "application/pdf" ||
            file.type ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            if (fileSizeInMB <= 5) { // Limit set to 5 MB
              await upload(file, fileSize, fileName);
            } else {
              setSnackbar({
                open: true,
                severity: "error",
                message: "File size should be less than or equal to 5 MB!",
              });
            }
          } else {
            setSnackbar({
              open: true,
              severity: "error",
              message: "Please upload a valid document (PDF, PPTX, XLSX)!",
            });
          }
        } else {
          if (fileSizeInMB <= 5) { // Limit set to 5 MB
            await upload(file, fileSize, fileName);
          } else {
            setSnackbar({
              open: true,
              severity: "error",
              message: "File size should be less than or equal to 5 MB!",
            });
          }
        }
      } catch (error) {
        setSnackbar({
          open: true,
          severity: "error",
          message: "Unexpected error occurred while handling the file.",
        });
      } finally {
        setLoad(false);
      }
    } else {
      setLoad(false); // Reset loading state if no file is selected
    }
  };




  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };



  useEffect(() => {
    const startTime = performance.now();
    fetchProposalForms()
    const fetchAndTrackProposals = async () => {
      setLoader(true);
      await fetchProposals();
      const loadTime = performance.now() - startTime;
      mixpanelEvents.onLoad(loadTime, 'Proposals Page');
    };

    fetchAndTrackProposals();

    const intervalId = setInterval(() => {
      const intervalStartTime = performance.now();
      fetchProposals().then(() => {
        const intervalLoadTime = performance.now() - intervalStartTime;
        mixpanelEvents.onLoad(intervalLoadTime, 'Proposals Page');
      });
    }, 300000);

    return () => {
      const timeSpent = performance.now() - startTime;
      mixpanelEvents.onUnload('Proposals Page', timeSpent);
      clearInterval(intervalId);
      proposalLastSeen()
    };
  }, []);

  const proposalLastSeen = async () => {
    setLoader(true)
    try {
      const body = {
        "proposal_id": parseInt(id),
        "user_id": parseInt(userId),
        "last_seen": new Date
      }
      const response = await apis.proposalLastSeen(body);
      const proposals = response?.data?.data;

    } catch (error: any) {
      console.error("Error adding chat box:", error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
      });
      setLoader(false)
    }
  }


  const [prop, setProp] = useState<any>()

  const fetchProposals = async () => {
    try {
      const response = await apis.getAllProposalById(id);
      const proposals = response?.data?.data;
      setProp(proposals)
      setproposalDetails(proposals)
      setproposalDocs(proposals.proposal_lead_status)
      updateSteps(response?.data?.data.proposal_lead_status)
      setPCS(proposals?.pls_current_status)
      setBuyerid(proposals?.buyer_id)
      setBuyerorgid(proposals?.buyer_org_id)
      setSellerorgid(proposals?.seller_org_id)
      setSellerid(proposals?.seller_id)
      const index = steps.findIndex(step => step.label === proposals?.pls_current_status);
      setActiveStep(index + 1)
      updateStatus(proposals.proposal_lead_status, index + 1)

      if (proposals) {
        try {
          const response = await apis.getAllChatsByProposalId(id);
          if (response?.data?.status) {
            setSellerChats(response?.data?.data?.seller_chats[0]?.chats || {})
            setBuyerChats(response?.data?.data?.buyer_chats[0]?.chats || {})
            setSellerPinnedChats(response?.data?.data?.seller_chats[0]?.pinned_chats || [])
            setBuyerPinnedChats(response?.data?.data?.buyer_chats[0]?.pinned_chats || [])
            if (response?.data?.data?.buyer_chats[0]?.chat_participants[0]?.participant?.name || "") {
              setBuyerName(response?.data?.data?.buyer_chats[0]?.chat_participants[0]?.participant?.name)
            }
            if (response?.data?.data?.seller_chats[0]?.chat_participants[0]?.participant?.name || "") {
              setSellerName(response?.data?.data?.seller_chats[0]?.chat_participants[0]?.participant?.name)
            }
            setSellerChatBoxId(response?.data?.data?.seller_chats[0]?.chat_participants[0]?.chat_box_id)
            setBuyerChatBoxId(response?.data?.data?.buyer_chats[0]?.chat_participants[0]?.chat_box_id)
            if (response?.data?.data?.buyer_chats?.length > 0) {
              setBuyerChatExist(true)
            }
            if (response?.data?.data?.seller_chats?.length > 0) {
              setSellerChatExist(true)
            }
            setLoader(false)
          }
        } catch (addChatError: any) {
          mixpanelEvents.errorHandling({
            name: 'Proposals Page',
            msg: addChatError?.response?.data?.error || addChatError?.message
          })
          setSnackbar({
            open: true,
            severity: 'error',
            message: addChatError?.response?.data?.error || addChatError?.message || 'something went wrong!!'
          });
          setLoader(false)
        }
      }
      setproposalPopup(false)
    } catch (error: any) {
      mixpanelEvents.errorHandling({
        name: 'Proposals Page',
        msg: error?.response?.data?.error || error?.message
      })
      setSnackbar({
        open: true,
        severity: 'error',
        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
      });
      setLoader(false)
    }
  };


  const sortingStyles = {
    button: {
      background: '#E20B18',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#a9141d',
        color: '#fff',
      },
      cursor: "pointer"
    },
    tabButton: {
      padding: deviceType == "mobile" ? "5px" : '10px',
      color: 'rgba(226, 11, 24, 1)',

      fontSize: deviceType == "mobile" ? "15px" : '16px',
      borderBottom: ' 2px solid rgba(226, 11, 24, 1)',
      fontFamily: 'Inter',
      fontWeight: 600,
      cursor: "pointer"
    },
    tabButtonInactive: {
      padding: deviceType == "mobile" ? "5px" : '10px',
      color: 'rgba(226, 11, 24, 1)',
      fontSize: deviceType == "mobile" ? "15px" : '16px',
      fontFamily: 'Inter',
      fontWeight: 500,
      cursor: "pointer"
    }
  };


  const linkDetails = useMemo(() => {
    return [
      {
        label: 'Proposal Management',
        url: '/newrequests',
      },
      {
        label: 'Proposal Requests',
        url: '/newrequests',
      },
      {
        label: 'RFP',
        url: '',
      }
    ];
  }, []);


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 8,
    borderRadius: 5,
    p: 0,
  };

  const AddChatBoxApi = async (individualid: any, individualorgid: any) => {
    setLoader(false)
    try {
      const body = {
        "proposal_id": parseInt(id),
        "chat_type": "individual",
        "chat_name": "individual",
        "chat_participants": [
          {
            "participant_id": individualid,
            "participant_org_id": individualorgid
          }
        ]
      }
      const response = await apis.addChatBox(body);
      if (response?.data?.status == "success") {

        setBuyerLoading(false)
        setSellerLoading(false)

        setLoader(false)
      }

      chatUpdations()
    } catch (error: any) {
      console.error("Error fetching proposals:", error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
      });
      setLoader(false)
    }
  };

  const AddChatBoxApiReinitiate = async (individualid: any, individualorgid: any) => {
    setLoader(false)
    try {
      const body = {
        "proposal_id": parseInt(id),
        "chat_type": "individual",
        "chat_name": "individual",
        "chat_participants": [
          {
            "participant_id": individualid,
            "participant_org_id": individualorgid
          }
        ]
      }
      const response = await apis.addChatBox(body);
      if (response?.data?.status == "success") {

        setBuyerLoading(false)
        setSellerLoading(false)

        setLoader(false)
      }

      chatUpdations()

      return response
    } catch (error: any) {
      console.error("Error fetching proposals:", error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
      });
      setLoader(false)
    }
  };


  const AddProposalLeadStatus = async (label: string, status: string, index?: any) => {
    if (label == status) {
      if (activeStep == 2) {
        const filteredProposals = proposalDocs.filter((doc: any) => doc.name.includes("Proposal"));

        const isLastProposalAccepted = filteredProposals[filteredProposals.length - 1]?.name === "Proposal Accepted";
        if (filteredProposals.length == 0) {
          setSnackbar({
            open: true,
            severity: 'error',
            message: 'Please upload Proposal Document to proceed further!!'
          });
        }
        else if (isLastProposalAccepted) {
          updateLeadStatus(label, status, index)
        }
        else {
          setproposalPopup(true)
        }
      }
      else if (activeStep == 3) {
        let hasTripartriate = proposalDocs.find((doc: any) => (doc.name.includes("Tripartriate")));
        let hasSellerSOW = proposalDocs.some((doc: any) => doc.name.includes("Seller SOW Document"));
        let hasBuyerSOW = proposalDocs.some((doc: any) => doc.name.includes("Buyer SOW Document"));

        if ((hasSellerSOW && hasBuyerSOW) || hasTripartriate) {
          updateLeadStatus(label, status, index)
        }
        else {
          setSnackbar({
            open: true,
            severity: 'error',
            message: 'Please upload Buyer & Seller SOW to mark complete!!'
          });
        }
      }
      else if (activeStep == 5) {
        let hasSellerInvoice = proposalDocs.some((doc: any) => doc.name.includes("Seller Invoice Document (Final)"));
        let hasBuyerInvoice = proposalDocs.some((doc: any) => doc.name.includes("Buyer Invoice Document (Final)"));

        if ((hasSellerInvoice && hasBuyerInvoice)) {
          updateLeadStatus(label, status, index)
        }
        else if ((!hasSellerInvoice && !hasBuyerInvoice)) {
          setSnackbar({
            open: true,
            severity: 'error',
            message: 'Buyer & Seller Invoice need to be uploaded to mark complete!!'
          });
        }
        else if ((!hasBuyerInvoice)) {
          setSnackbar({
            open: true,
            severity: 'error',
            message: 'Please upload Buyer Invoice to mark complete!!'
          });
        }
        else if ((!hasSellerInvoice)) {
          setSnackbar({
            open: true,
            severity: 'error',
            message: 'Seller Invoice need to be uploaded to mark complete!!'
          });
        }
      }
      else {
        updateLeadStatus(label, status, index)
      }
    }
    else {
      updateLeadStatus(label, status, index)
    }
  };

  const updateStatus = async (propDocs: any, activeStep: any) => {

    let latestStatus = ""
    if (activeStep == 0) {
      setProposalStatus("Enquiry Stage")
      latestStatus = "Enquiry Stage"
    }
    if (activeStep == 1) {
      setProposalStatus("Scoping Stage")
      latestStatus = "Scoping Stage"
    }
    if (activeStep == 2) {
      let prop = propDocs.find((doc: any) => (doc.name.includes("Proposal Document")))
      let prop1 = propDocs.find((doc: any) => (doc.name.includes("Proposal Dormant")))
      let prop2 = propDocs.find((doc: any) => (doc.name.includes("Proposal Pending")))
      let prop3 = propDocs.find((doc: any) => (doc.name.includes("Proposal Rejected")))
      let prop4 = propDocs.find((doc: any) => (doc.name.includes("Proposal Accepted")))

      if (!prop) {
        setProposalStatus("Proposal - Not Submitted")
        latestStatus = "Proposal - Not Submitted"
      }
      else if (prop3) {
        setProposalStatus("Proposal Rejected")
        latestStatus = "Proposal Rejected"
      }
      else if (prop4) {
        setProposalStatus("Proposal Accepted")
        latestStatus = "Proposal Accepted"
      }
      else {
        setProposalStatus("Proposal - Response Pending")
        latestStatus = "Proposal - Response Pending"
      }

      if (prop1) {
        setProposalStatus("Proposal - Dormant")
        latestStatus = "Proposal - Dormant"
      }

      if (prop2) {
        setProposalStatus("Proposal - Pending")
        latestStatus = "Proposal - Pending"
      }
    }
    if (activeStep == 3) {
      let hasTripartriate = propDocs.find((doc: any) => (doc.name.includes("Tripartriate")));
      let hasSellerSOW = propDocs.some((doc: any) => doc.name.includes("Seller SOW Document"));
      let hasBuyerSOW = propDocs.some((doc: any) => doc.name.includes("Buyer SOW Document"));

      if ((hasSellerSOW && hasBuyerSOW) || hasTripartriate) {
        setProposalStatus("SOW/Agreement Sent")
        latestStatus = "SOW/Agreement Sent"
        // updateLeadStatus("SOW/Agreement Signed", "SOW/Agreement Signed")
      }
      else {
        setProposalStatus("SOW Pending")
        latestStatus = "SOW Pending"
      }
    }
    else if (activeStep == 4) {
      setProposalStatus("Report Pending")
      latestStatus = "Report Pending"
    }
    else if (activeStep == 5) {
      let hasSellerInvoice = propDocs.some((doc: any) => doc.name.includes("Seller Invoice Document (Final)"));
      let hasBuyerInvoice = propDocs.some((doc: any) => doc.name.includes("Buyer Invoice Document (Final)"));

      if ((hasSellerInvoice && hasBuyerInvoice)) {
        // updateLeadStatus("Invoicing", "Invoicing")
        setProposalStatus("Invoice Sent")
        latestStatus = "Invoice Sent"
      } else {
        setProposalStatus("Invoice Pending")
        latestStatus = "Invoice Pending"
      }
    }

    else if (activeStep > 5) {
      setProposalStatus("Completed")
      latestStatus = "Completed"
    }

  }

  const updateLeadStatus = async (label: string, status: string, index?: any) => {
    setLoader(true);
    try {
      const body = {
        proposal_id: parseInt(id),
        name: label,
        pls_current_status: status,
        document: fileData,
        currentStage: label == status ? (steps[activeStep + 1] ? (steps[activeStep + 1].label) : "Completed") : (steps[activeStep].label),
        previousStage: label == status ? (steps[activeStep].label) : (steps[activeStep - 1].label),
      };
      const response = await apis.addProposalLeadStatus(body);
      // await apis.sendProposalLeadStatus(body);
      let oppr: any = [];
      prop.opportunities.map((item: any) => {
        oppr.push(item.opportunity)
      })
      // setPstate(label == status ? (steps[activeStep].label):(steps[activeStep-1].label))

      const rfpUpdatedData = {
        SellerName: prop.seller.name,
        RFPID: prop.id,
        BuyerName: prop.buyer.name,
        AssetName: prop.asset.asset_detail[0].name,
        OpportunityName: oppr,
        AssetType: prop.asset_type,
        DateInitiated: prop.created_at,
        CurrentStage: label == status ? (steps[activeStep + 1] ? (steps[activeStep + 1].label) : "Completed") : (steps[activeStep].label),
        PreviousStage: label == status ? (steps[activeStep].label) : (steps[activeStep - 1].label),
        ZupotsuUserName: localStorage.getItem("name"),
        DocumentStatus: null,
        LastUpdated: prop.updated_at
      };
      mixpanelEvents.onRFPUpdated(rfpUpdatedData);
      fetchProposals()
    } catch (error) {
      console.error("Error adding proposal lead status:", error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Something went wrong while adding proposal lead status!!'
      });
      setLoader(false);
    }
    setLoad(false)
  };

  const chatUpdations = async () => {
    setLoader(true)
    try {
      const response: any = await apis.getAllChatsByProposalId(id);
      if (response?.data?.status) {
        setSellerChats(response?.data?.data?.seller_chats[0]?.chats);
        setBuyerChats(response?.data?.data?.buyer_chats[0]?.chats);
        setSellerPinnedChats(response?.data?.data?.seller_chats[0]?.pinned_chats || [])
        setBuyerPinnedChats(response?.data?.data?.buyer_chats[0]?.pinned_chats || [])
        setSellerChatBoxId(response?.data?.data?.seller_chats[0]?.chat_participants[0]?.chat_box_id)
        setBuyerChatBoxId(response?.data?.data?.buyer_chats[0]?.chat_participants[0]?.chat_box_id)
        if (response?.data?.data?.buyer_chats?.length > 0) {
          setBuyerChatExist(true)
        }
        if (response?.data?.data?.seller_chats?.length > 0) {
          setSellerChatExist(true)
        }
        if (response?.data?.data?.buyer_chats[0]?.chat_participants[0]?.participant?.name || "") {
          setBuyerName(response?.data?.data?.buyer_chats[0]?.chat_participants[0]?.participant?.name)
        }
        if (response?.data?.data?.seller_chats[0]?.chat_participants[0]?.participant?.name || "") {
          setSellerName(response?.data?.data?.seller_chats[0]?.chat_participants[0]?.participant?.name)
        }
      }
      setLoad(false)
      setLoader(false)
    } catch (error: any) {
      console.error("Error adding chat box:", error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
      });
      setLoader(false)
    }
  };

  const ChatBody: any = {
    "chat_box_id": selectedRole == "Buyer" ? buyerChatBoxId : selectedRole == "Seller" ? sellerChatBoxId : "",
    "text": searchValue,
    "doc": null,
    "doc_name": null,
    "doc_size": null,
    "caption": null,
    "accepted_by": null,
    "forwarded": false,
    "forwarded_from": null,
    "pinned_by": null,
    "reply_message_id": forwardingChat?.id ? forwardingChat?.id : null
  }

  const chatAdding = async () => {
    setLoader(true)
    try {
      const response = await apis.addChat(ChatBody);
      if (response?.data?.status == "success") {
        setLoader(false)
        chatUpdations()
        setBuyerReplyPopup(false)
        setSellerReplyPopup(false)
        setForwardingChat({})
      }
    } catch (error: any) {
      console.error("Error adding chat box:", error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
      });
      setLoader(false)
    }
  };

  const docAdding = async () => {
    const DocBody: any = {
      "chat_box_id": selectedRole == "Buyer" ? buyerChatBoxId : selectedRole == "Seller" ? sellerChatBoxId : "",
      "text": null,
      "doc": fileData,
      "doc_name": uploadDocument ? uploadDocument : docName,
      "doc_size": documentSize,
      "doc_type": documentType,
      "caption": null,
      "accepted_by": null,
      "forwarded": false,
      "forwarded_from": null,
      "pinned_by": null,
      "reply_message_id": forwardingChat?.id ? forwardingChat?.id : null
    };
    setLoader(true)
    setLoad(true)
    try {
      const response = await apis.addChat(DocBody);
      if (response?.data?.status == "success") {
        setLoader(false)
        setDocumentpopupOpen(false)
        if (documentType?.toLowerCase() !== "others") {
          AddProposalLeadStatus(documentType, PCS);
        }
        else {
          fetchProposals()
        }
        setBuyerReplyPopup(false)
        setSellerReplyPopup(false)
        setForwardingChat({})
      }
    } catch (error: any) {
      console.error("Error adding chat box:", error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
      });
      setLoader(false)
    }
    setLoad(false)
  };

  const docPosting = async (body: any) => {
    setLoader(true)
    try {
      const response = await apis.addChat(body);
      if (response?.data?.status == "success") {

        setDocumentpopupOpen(false)
        if (documentType?.toLowerCase() !== "others") {
          AddProposalLeadStatus(documentType, PCS);
        }
        setForwardingChat({})
        setBuyerReplyPopup(false)
        setSellerReplyPopup(false)
        chatUpdations()
      }
    } catch (error: any) {
      console.error("Error adding chat box:", error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
      });
      setLoader(false)
    }
  };

  const handleTripartriDocAdding = async () => {
    setLoad(true)
    try {
      setLoader(true);
      const buyerbody: any = {
        "chat_box_id": buyerChatBoxId,
        "text": null,
        "doc": fileData,
        "doc_name": uploadDocument ? uploadDocument : docName,
        "doc_size": documentSize,
        "doc_type": documentType,
        "caption": null,
        "accepted_by": null,
        "forwarded": false,
        "forwarded_from": null,
        "pinned_by": null,
        "reply_message_id": ((selectedRole == "Buyer") && (forwardingChat?.id)) ? forwardingChat?.id : null
      }
      const sellerbody: any = {
        "chat_box_id": sellerChatBoxId,
        "text": null,
        "doc": fileData,
        "doc_name": uploadDocument ? uploadDocument : docName,
        "doc_size": documentSize,
        "doc_type": documentType,
        "caption": null,
        "accepted_by": null,
        "forwarded": false,
        "forwarded_from": null,
        "pinned_by": null,
        "reply_message_id": ((selectedRole == "Seller") && (forwardingChat?.id)) ? forwardingChat?.id : null
      }
      const promises = [];
      if (isBuyerChatExist) { docPosting({ ...buyerbody }) }
      else {
        const buyerPromise = AddChatBoxApiReinitiate(buyerid, buyerorgid).then((buyerResponse: any) => {
          if (buyerResponse?.data?.status === "success") {
            docPosting({ ...buyerbody, "chat_box_id": buyerResponse?.data?.data?.chat_participants[0]?.chat_box_id });
          }
        });
        promises.push(buyerPromise);
      }


      if (isSellerChatExist) { docPosting(sellerbody) }
      else {
        const sellerPromise = AddChatBoxApiReinitiate(sellerid, sellerorgid).then((sellerResponse: any) => {
          if (sellerResponse?.data?.status === "success") {
            docPosting({ ...sellerbody, "chat_box_id": sellerResponse?.data?.data?.chat_participants[0]?.chat_box_id });
          }
        });
        promises.push(sellerPromise);
      }
      chatUpdations()
      await Promise.all(promises);
    } catch (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Error adding Tripartri Doc!!'
      });
    } finally {
      chatUpdations()
      setLoader(false);
      setLoad(false)
    }

  };

  const updateProposal = async () => {

    const closebody = {
      "id": parseInt(id),
      "proposal_status": "completed",
      "zoho_status": "Completed",
      "closed_reason": remark,
      "closed_by": parseInt(userId),
      "closed_by_name": name || "",
      "closed_at": new Date,
    }
    const terminatebody = {
      "id": parseInt(id),
      "terminate_remark": remark,
      "terminated_by": parseInt(userId),
      "terminated_by_name": name || "",
      "proposal_status": "terminated",
      "zoho_status": "Terminated",
      "terminated_at": new Date,
    }
    setLoader(true)
    try {
      const response = await apis.updateProposal(id, popupTitle?.toLowerCase() == "completed" ? closebody : terminatebody);
      if (response?.data?.status == "success") {
        setpopupOpen(false)
        fetchProposals()
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
      });
      setLoader(false)
    }
  };

  const closeupdateProposal = async (isClose: any) => {
    const closebody = {
      id: parseInt(id),
      proposal_status: "completed",
      zoho_status: "Completed",
      closed_reason: closeremark,
      closed_by: parseInt(userId),
      closed_by_name: name || "",
      closed_at: new Date,
    };

    setLoader(true);
    const leadProp = proposalDocs.find((prop: any) => prop.name === closeObj?.label);
    if (!isClose) {
      AddProposalLeadStatus(closeObj?.label, closeObj?.label);
    }
    else {
      try {
        const response = await apis.updateProposal(id, closebody);
        if (response?.data?.status === "success") {
          AddProposalLeadStatus(closeObj?.label, closeObj?.label);
          fetchProposals();
          setClosepopupOpen(false)
        }
      } catch (error: any) {
        console.error("Error updating proposal:", error);
        setSnackbar({
          open: true,
          severity: 'error',
          message: ((error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'something went wrong!!'),
        });
      } finally {
        setClosepopupOpen(false)
        setLoader(false);
      }
    }
  };

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year} : ${hours}:${minutes}`;
  };

  function toTitleCase(str: any) {
    if (!str) return '';
    return str
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const fetchProposalForms = async () => {
    try {
      const response = await apis.getFormsByProposol(id);
      let arr: any = [];
      let arr2: any = [];
      response?.data?.data.map((item: any, index: any) => {
        arr.push(
          {
            "id": item?.id,
            "formtype": item?.form_type,
            "assetname": item?.form_type?.toLowerCase() == "proposal" ? item?.form?.details?.find((detail: any) => detail.field === 'Asset Name')?.value : item?.form?.asset_name,
            "opportunities": item?.form_type?.toLowerCase() == "proposal" ? item?.form?.indicative_opportunity_details[0]?.field : item?.form_type == "invoice" ? item?.form?.opportunities[0]?.opportunity_details : item?.form?.opportunities || "N/A",
            "updatedby": item?.updated_by_user?.name,
            "lastupdated": item?.updated_at,
            "doc_url": item?.file_url,
            "name": item.name,
            "file_size": item.file_size
          }
        )
      })
      arr.sort((a: any, b: any) => new Date(b.lastupdated).getTime() - new Date(a.lastupdated).getTime());
      arr.map((selform: any) => {
        arr2.push((toTitleCase(selform.formtype)) + " - " + selform.name)
      })
      setforms(arr2)
      setallpforms(arr);
      setLoader(false)
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };



  if (loader) {
    return (
      <div className="centered-container">
        <div className="loader"></div>
      </div>
    )
  } else {
    return (
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", backgroundColor: 'rgba(250,250,250,1)', height: '90vh', overflow: "hidden", scrollbarWidth: 'none', overflowX: 'hidden' }}>
        <Grid xs={12} md={12} lg={12} width={"99%"} height={'10%'} spacing={2} sx={{ backgroundColor: 'rgba(242,242,242,0.2)' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              backgroundColor: '#FFF',
              margin: "10px",
              marginLeft: 0,
              marginRight: 0,
              padding: "15px",
              width: '100%',
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
        <div
          style={{
            width: '100%',
            padding: "10px",
            paddingTop: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "flex-start",
            // marginBottom: '10px',
            height: '90%',
            backgroundColor: 'rgba(242,242,242,0.2)',
            overflowY: "scroll"
          }}
        >

          {/* <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(250,250,250,1)'
            }}
          > */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px',
                flexWrap: "wrap",
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                borderRadius: '8px',
                padding: '5px',
                margin: 0,
                backgroundColor: '#FFF'
              }}
            >
              <Typography
                sx={{
                  color: '#333',
                  fontFamily: 'Inter',
                  fontSize: deviceType == "mobile" ? "14px" : '19px',
                  fontWeight: 700,
                  lineHeight: '22px',
                  padding: "0px",
                  margin: '5px 0px'
                }}
              >
                Proposal Details
                <button style={{ border: '0px solid transparent', backgroundColor: "transparent" }} onClick={() => { setClickDownload(!clickDownload) }}>
                  <img
                    style={{ height: "20px" }}
                    src={clickDownload ? collapse : expand}
                    alt=""
                  />
                </button>
              </Typography>



              <div
                style={{
                  padding: 5, margin: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: deviceType === "mobile" ? "center" : 'flex-end',
                  alignItems: 'center',
                  gap: "5px",
                  flexWrap: "wrap",
                  border: '0px solid transparent',
                  backgroundColor: 'transparent'
                }}>
                {((isItAdmin || isBuyer) && proposalDetails?.requirement_doc) && (<>
                  <a href={proposalDetails?.requirement_doc} target='_blank' download={"proposalDetails"} style={{
                    textDecoration: "none", display: 'flex',
                    flexDirection: 'row',
                    gap: "5px",
                    justifyContent: deviceType === "mobile" ? "center" : 'flex-end',
                    cursor: 'pointer'
                  }}>
                    <img src={download} style={{
                      color: 'red',
                      width: "24px",
                      height: "24px",
                      border: "2px 0px 0px 0px",
                    }} />
                    <p style={{
                      margin: 0,
                      padding: 0,
                      color: "rgba(47, 128, 237, 1)",
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "26px",
                      textAlign: "center",
                    }}>Requirement Document</p>
                  </a>
                </>)}
              </div>


            </div>
            {clickDownload && (<div style={{ width: '100%', margin: 0, padding: 0, paddingTop: '10px', backgroundColor: '#FFF', }}>
              {(isItAdmin || isBuyer) && (<Row style={{
                width: '100%',
                margin: 0, padding: 0,
              }}>

                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.buyer?.name}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Buyer Name'}
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.buyer?.mobile}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Phone Number'}
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.buyer?.email}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Email Address'}
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.buyer?.organization?.name}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Organisation Name'}
                    </div>
                  </div>
                </Col>
              </Row>)}
              {(isItAdmin) && (<hr />)}
              <Row style={{
                width: '100%',
                margin: 0, padding: 0,
              }}>


                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.asset_type}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Asset Type'}
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.sports[0]}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Sports'}
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div onClick={() => { navigate(`/assetDetails?id=${proposalDetails?.asset_id}`) }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.asset?.asset_detail[0].name}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Asset Name'}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{
                width: '100%',
                margin: 0, padding: 0,
              }}>
                <Col xs={12} md={12} lg={12} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {"Requirement Details"}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {proposalDetails?.requirement || "N/A"}
                    </div>
                  </div>
                </Col>
              </Row>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}>
                <TableContainer style={{ borderStyle: 'none', boxShadow: "none", padding: 0, width: '100%', border: '1px solid #ddd' }}>
                  <Table style={{ borderStyle: 'none', padding: 0, }}>
                    <TableHead style={{ backgroundColor: 'rgba(240, 239, 239, 0.6)', padding: '10px' }}>
                      <TableRow>
                        {["Opportunities", "Scope"].map((header, index) => (
                          <TableCell
                            key={index}
                            style={{
                              fontFamily: 'Inter',
                              fontSize: deviceType == 'mobile' ? '14px' : '16px',
                              fontWeight: 700,
                              lineHeight: '21px',
                              letterSpacing: '-0.3333333432674408px',
                              textAlign: 'left',
                              borderStyle: 'none',
                              justifyContent: 'center',
                              marginLeft: 0,
                              textTransform: 'capitalize',
                              backgroundColor: 'rgba(224, 224, 224, 1)',
                              borderTopRightRadius: "3px",
                              borderTopLeftRadius: "3px",
                            }}
                          >
                            <div
                              style={{
                                display: 'flex', alignItems: 'center',
                                color: '#111',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                              }}
                            >
                              {header}

                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {proposalDetails?.opportunities?.map((item: any, index: any) => (
                        <TableRow
                          key={index}
                          style={{
                            background: index % 2 == 0 ? "#fff" : "#f9f9f9",
                            height: "30px",
                            border: "0px solid transparent",
                            fontSize: deviceType == 'mobile' ? '14px' : '16px',
                            lineHeight: "21px",
                            paddingLeft: '18px',
                          }}
                        >
                          <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: deviceType == 'mobile' ? '14px' : '16px', lineHeight: "21px" }}>
                            {item?.opportunity}
                          </TableCell>
                          <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: deviceType == 'mobile' ? '14px' : '16px', lineHeight: "21px" }}>
                            {item?.scope || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {(isItAdmin) && (<hr />)}
              {(isItAdmin) && (<Row style={{
                width: '100%',
                margin: 0, padding: 0,
                paddingBottom: '10px'
              }}>
                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.seller?.name}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Seller Name'}
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.seller?.mobile}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Phone Number'}
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.seller?.email}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Email Address'}
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.seller?.organization?.name}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Organisation Name'}
                    </div>
                  </div>
                </Col>
              </Row>)}
              {(isItAdmin) && (<hr />)}
              {(isItAdmin) && (<Row style={{
                width: '100%',
                margin: 0, padding: 0,
                paddingBottom: '10px'
              }}>
                {(proposalDetails?.proposal_status?.toLowerCase() == "completed") && (<Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.closed_by_user?.name}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      Closer By
                    </div>
                  </div>
                </Col>)}

                {(proposalDetails?.proposal_status?.toLowerCase() == "completed") && (<Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.closed_reason || 'N/A'}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Closed Reason'}
                    </div>
                  </div>
                </Col>)}

                {(proposalDetails?.proposal_status?.toLowerCase() == "completed") && (<Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {(proposalDetails?.closed_at) && (formatTimestamp(proposalDetails?.closed_at)) || 'N/A'}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Closed At'}
                    </div>
                  </div>
                </Col>)}

                {(proposalDetails?.proposal_status?.toLowerCase() == "terminated") && (<Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.terminated_by_user?.name || 'N/A'}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Terminated By'}
                    </div>
                  </div>
                </Col>)}

                {(proposalDetails?.proposal_status?.toLowerCase() == "terminated") && (<Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {proposalDetails?.terminate_remark || 'N/A'}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Termination Reason'}
                    </div>
                  </div>
                </Col>)}

                {(proposalDetails?.proposal_status?.toLowerCase() == "terminated") && (<Col xs={12} md={3} lg={3} style={{ marginBottom: '20px', padding: '0px', paddingTop: '10px', paddingLeft: '15px', }}>
                  <div style={{}}>
                    <div style={{ fontSize: '16px', fontWeight: '600', textAlign: 'start', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                      {(proposalDetails?.terminated_at) && (formatTimestamp(proposalDetails?.terminated_at)) || 'N/A'}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', textAlign: 'start', color: '#4F4F4F', paddingTop: '5px', paddingRight: '10px' }}>
                      {'Terminated At'}
                    </div>
                  </div>
                </Col>)}
              </Row>)}
            </div>)}
          </div>




          {(!isSeller && !isSellerAdmin && !isBuyer) && (<div style={{
            width: deviceType == "mobile" ? "100%" : "auto", flexDirection: 'row', display: 'flex', justifyContent: deviceType == "mobile" ? 'flex-start' : "flex-start", scrollbarWidth: 'none', borderBottom: '1px solid rgba(224, 224, 224, 1)', gap: '10px', marginTop: '10px', marginBottom: '10px', overflowX: "scroll", overflowY: 'hidden',
            borderRadius: '8px',
            padding: '0px',
            height: (deviceType == "large-desktop" || deviceType == "desktop" || deviceType == "extra-large-desktop") ? "6%" : '7%',
            backgroundColor: '#FFF'
          }}>
            <div style={selectedRole == "Buyer" ?
              sortingStyles.tabButton : sortingStyles.tabButtonInactive
            } onClick={() => {
              setSelectedRole('Buyer');
              buyerscrollToBottom()
              sellerscrollToBottom()
              // scrollToBottom()
            }}>Buyer</div>
            <div style={selectedRole == "Seller" ?
              sortingStyles.tabButton : sortingStyles.tabButtonInactive
            } onClick={() => {
              setSelectedRole('Seller');
              // scrollToBottom()
              buyerscrollToBottom()
              sellerscrollToBottom()
            }}>Seller</div>

          </div>)}




          {/* </div> */}
          {/* {load && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: '45vh',
                left: '50%',
                position: 'absolute',
              }}
            >
              <Loader status={load} size={50} />
            </div>
          )} */}
          {!loader && (
            <div style={{ width: '100%', height: '80%', display: 'flex', flexDirection: deviceType == "mobile" ? "column" : 'row', justifyContent: deviceType == "mobile" ? "flex-start" : 'space-evenly', alignItems: 'flex-start', gap: '10px', marginTop: (isSeller || isBuyer) ? '10px' : "0px", overflowY: deviceType == "mobile" ? "scroll" : "scroll", scrollbarWidth: "none" }}>
              <div style={{ width: deviceType == "mobile" ? "100%" : isItAdmin ? '55%' : '65%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: 'flex-start', backgroundColor: '#FFF', borderRadius: '8px' }}>
                {(selectedRole == "Buyer") ? (
                  <>
                    {(isBuyerChatExist) ? (
                      <>
                        <div style={{
                          width: "100%",
                          // height: "50px",
                          height: '12%',
                          padding: "16px",
                          gap: "5px",
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          background: '#FFF',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: "space-between",
                          alignItems: 'center',
                          borderRadius: '8px',
                          borderBottomLeftRadius: "0px",
                          borderBottomRightRadius: '0px',
                          marginBottom: '2px'
                        }}>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: deviceType == "mobile" ? "space-between" : "flex-start",
                            alignItems: 'center',
                            gap: '10px',
                            padding: '20px 0px'
                          }}>
                            <div
                              onClick={() => { }}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 100,
                                margin: 0,
                                width: '32px',
                                height: '32px',
                                cursor: 'pointer',
                                backgroundColor: '#D2EAF4',
                              }}
                            >
                              <span style={{
                                fontFamily: "Inter",
                                fontSize: "20px",
                                fontWeight: 500,
                                lineHeight: "28px",
                              }}>{buyerName?.charAt(0)}</span>
                            </div>
                            <p style={{
                              fontFamily: "Inter",
                              fontSize: deviceType == "mobile" ? "14px" : "16px",
                              fontWeight: 500,
                              lineHeight: "19.36px",
                              textAlign: "left",
                              padding: 0,
                              margin: 0
                            }}>
                              {buyerName}
                            </p>
                            <button
                              onClick={() => { chatUpdations() }}
                              style={{
                                width: '20px',
                                backgroundColor: "transparent",
                                border: "0px solid transparent",
                                margin: 0,
                                padding: 0
                              }}>
                              <RefreshIcon
                                sx={{
                                  width: '20px',
                                  height: '20px',
                                  color: "#E12619",
                                  margin: 0,
                                  padding: 0
                                }}
                              />
                            </button>

                            {(deviceType == "mobile") && (<p style={{
                              height: 'auto',
                              padding: "4px 10px 4px 10px",
                              borderRadius: "100px",
                              backgroundColor: 'rgba(195, 248, 231, 1)',
                              fontFamily: "Inter",
                              fontSize: "12px",
                              fontWeight: 700,
                              lineHeight: "21px",
                              textAlign: "left",
                              color: 'rgba(0, 132, 90, 1)',
                              margin: 0,
                            }}>
                              {proposalstatus}
                            </p>)}
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            gap: deviceType == "mobile" ? "0px" : '10px'
                          }}>
                            {(deviceType !== "mobile") && (
                              <p style={{
                                height: 'auto',
                                padding: "4px 10px 4px 10px",
                                borderRadius: "100px",
                                backgroundColor: 'rgba(195, 248, 231, 1)',
                                fontFamily: "Inter",
                                fontSize: "14px",
                                fontWeight: 700,
                                lineHeight: "21px",
                                textAlign: "left",
                                color: 'rgba(0, 132, 90, 1)',
                                margin: 0,
                              }}>
                                {proposalstatus}
                              </p>
                            )}
                            <button
                              onClick={() => { setSearchPresent(!isSearchPresent) }}
                              style={{
                                width: "24px",
                                height: "24px",
                                padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent', cursor: 'pointer'
                              }}>
                              <img src={Search} style={{
                                width: "24px",
                                height: "24px",
                              }} />
                            </button>
                            <>
                              <button
                                aria-describedby={pinbuyerid}
                                onClick={handleClickPinnedBuyer}
                                disabled={buyerPinnedChats?.length == 0}
                                style={{
                                  height: "24px",
                                  opacity: buyerPinnedChats?.length == 0 ? 0.5 : 1,
                                  padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  gap: '5px'
                                }}>
                                <img src={Pinned} style={{
                                  width: "24px",
                                  height: "24px",
                                }} />
                                <p
                                  style={{
                                    fontFamily: "Inter",
                                    fontSize: deviceType == "mobile" ? "13px" : "16px",
                                    fontWeight: 500,
                                    lineHeight: "19.36px",
                                    textAlign: "left",
                                    padding: 0,
                                    margin: 0
                                  }}>
                                  {buyerPinnedChats?.length} Items Pinned
                                </p>
                              </button>

                            </>
                          </div>
                        </div>

                        <div style={{
                          width: "100%",
                          height: '88%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          borderRadius: '8px'
                        }}>

                          {(isSearchPresent) && (<div style={{
                            width: "100%",
                            height: "44px",
                            padding: "16px",
                            gap: "5px",
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                            background: " rgba(242, 242, 242, 1)",
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            borderRadius: '0px'
                          }}>
                            <img
                              src={SearchNormal}
                              style={{
                                width: "20px",
                                height: "20px",

                              }}
                            />
                            <input
                              type="text"
                              style={{
                                backgroundColor: 'transparent',
                                border: '0px solid transparent',
                                outline: 'none',
                                fontSize: "14px",
                                width: '80%',
                                color: buyersearchValue ? "#000" : 'rgba(130, 130, 130, 1)',
                              }}
                              placeholder='Find messages in current conversation'
                              value={buyersearchValue}
                              onChange={(e) => {
                                setBuyerSearchValue(e.target.value)
                              }}
                            />
                            {(buyersearchValue) && (<Close
                              sx={{
                                cursor: 'pointer',
                              }}
                              onClick={() => { setBuyerSearchValue("") }}
                            />)}
                            {(buyersearchValue) && (<p style={{
                              fontFamily: "Inter",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "16.94px",
                              textAlign: "left",
                              margin: 0,
                              padding: 0,
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center'
                            }}>
                              <span>{(buyersearchResults?.length >= 1) ? (currentSearchIndex + 1) : 0}</span> / <span>{buyersearchResults?.length}</span>
                            </p>)}
                            {(buyersearchValue) && (<button
                              onClick={() => { handleScroll("up") }}
                              style={{
                                width: "5%",
                                height: "24px",
                                padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent',
                                cursor: 'pointer'
                              }}>
                              <KeyboardArrowUpOutlined style={{
                                height: "24px",
                                color: '#000'
                              }} />

                            </button>)}
                            {(buyersearchValue) && (<button
                              onClick={() => { handleScroll("down") }}
                              style={{
                                width: "5%",
                                height: "24px",
                                padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent',
                                cursor: 'pointer'
                              }}>
                              <KeyboardArrowDownOutlined style={{
                                height: "24px",
                                color: '#000'
                              }} />

                            </button>)}
                            <button
                              onClick={() => { setSearchPresent(!isSearchPresent); setBuyerSearchValue("") }}
                              style={{
                                width: "10%",
                                height: "24px",
                                // color: "rgba(130, 130, 130, 1)",
                                color: '#000',
                                fontFamily: "Inter",
                                fontSize: "14px",
                                fontWeight: 500,
                                padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent',
                                cursor: 'pointer'
                              }}>
                              Cancel
                            </button>

                          </div>)}
                          <Popover
                            id={pinbuyerid}
                            open={pinbuyeropen}
                            anchorEl={pinnedBuyerOpen}
                            onClose={() => { setPinnedBuyerOpen(null) }}
                            style={{ width: '60%', zIndex: 9999, borderRadius: '10px' }}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}
                          >
                            <PopupBody style={{
                              width: '100%',
                              minHeight: "100px",
                              maxHeight: "300px",
                              overflowY: 'scroll',
                              scrollbarWidth: 'none',
                              gap: "5px",
                              margin: 0,
                              backgroundColor: "transparent",
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: "flex-start",
                              alignItems: 'center',
                              borderRadius: '10px'
                            }}>
                              {buyerPinnedChats?.map((item: any, index: any) => (
                                <PinnedChat item={item} key={index} scrollToChat={buyerscrollToChat} />
                              ))}
                            </PopupBody>
                          </Popover>

                          <div
                            ref={buyerdivRef}
                            style={{
                              width: "100%",
                              height: "80vh",
                              padding: "16px",
                              gap: "20px",
                              backgroundColor: '#FFF',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              borderRadius: '8px',
                              zIndex: 2,
                              overflowX: 'hidden',
                              overflowY: 'scroll',
                            }}>

                            {Object.keys(buyerchats || {})?.map((day: any, index: any) => (
                              <div key={day}
                                ref={buyerdivRef}
                                style={{
                                  display: 'flex',
                                  width: "100%",
                                  flexDirection: 'column',
                                  gap: "10px",
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <p style={{
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  lineHeight: "16.94px",
                                  fontFamily: 'Inter',
                                  margin: 0,
                                  padding: 0,
                                  textAlign: 'center',
                                  position: 'relative',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '10px',
                                  width: '100%'
                                }}>
                                  <span style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--Theme-colors-border-2, rgba(229, 229, 229, 1))' }}></span>
                                  {day}
                                  <span style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--Theme-colors-border-2, rgba(229, 229, 229, 1))' }}></span>
                                </p>


                                {buyerchats[day]?.map((message: any, index: any) => (
                                  <div
                                    key={message?.id}
                                    ref={(el) => (buyerchatRefs.current[message?.id] = el)}
                                    style={{ width: '100%' }}
                                  >
                                    <Chat pre={steps[activeStep - 1].label} prop={prop} item={message} key={message?.id} setForwardOpen={setBuyerForwardPopup} setReplyOpen={setBuyerReplyPopup} setForwardingChat={setForwardingChat} chatUpdations={() => chatUpdations()} />
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                          {(buyerReplyPopup) && (<Reply replyOpen={buyerReplyPopup} setReplyClose={setBuyerReplyPopup} forwardingChat={forwardingChat} />)}
                          <div style={{
                            width: "100%",
                            height: "20%",
                            gap: "5px",
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                            background: (proposalDetails?.proposal_status?.toLowerCase() == "terminated" || proposalDetails?.proposal_status?.toLowerCase() == "completed") ? "rgba(0,0,0,0.2)" : '#FFF',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            borderRadius: (proposalDetails?.proposal_status?.toLowerCase() == "terminated" || proposalDetails?.proposal_status?.toLowerCase() == "completed") ? "0px 0px 8px 8px" : '8px',
                            padding: "18px",
                            paddingTop: "8px",
                            paddingBottom: '8px'
                          }}>
                            {(proposalDetails?.proposal_status?.toLowerCase() !== "terminated" && proposalDetails?.proposal_status?.toLowerCase() !== "completed") ? (<div style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: "space-between",
                              alignItems: 'center',
                              width: '100%',
                              height: "48px",
                              borderRadius: '18px',
                              border: "1px solid var(--Theme-colors-border-2, rgba(229, 229, 229, 1))"
                            }}>
                              <Button
                                onClick={() => {
                                  setDocumentpopupOpen(true);
                                  setdocName("")
                                  setFileData('');
                                  setDocumentSize("");
                                  setUploadDocument("");
                                  setDocumentType("")
                                }}
                                sx={{
                                  width: "50px",
                                  height: "48px",
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: "center",
                                  alignItems: 'center',
                                  border: '0px solid transparent',
                                  backgroundColor: 'transparent',
                                  padding: 0,
                                  margin: 0,
                                  '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.015)'
                                  }
                                }}>
                                <img src={menubase} style={{
                                  width: "30px",
                                  height: "30px",
                                }} />
                              </Button>
                              <div style={{
                                width: "75%",
                                height: "48px"
                              }}>
                                <input
                                  type="text"
                                  style={{
                                    backgroundColor: 'transparent',
                                    border: '0px solid transparent',
                                    outline: 'none',
                                    width: '100%',
                                    height: "48px",
                                    paddingLeft: '10px',
                                    color: '#000',
                                    margin: 0,
                                    padding: 0
                                  }}
                                  placeholder='Type here...'
                                  value={searchValue}
                                  onChange={(e) => { setSearchValue(e.target.value) }}
                                  onKeyDown={(e: any) => {
                                    if (e.key == "Enter") {
                                      chatAdding()
                                      setSearchValue("")
                                    }
                                  }}
                                />
                              </div>
                              <div style={{
                                width: 'auto',
                                height: "48px",
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: '20px'
                              }}>

                                <button
                                  disabled={!searchValue}
                                  onClick={() => {
                                    chatAdding()
                                    setSearchValue("")
                                  }}
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    padding: 0,
                                    margin: 0,
                                    border: '0px solid transparent',
                                    backgroundColor: 'transparent'
                                  }}
                                >
                                  <SendIcon sx={{
                                    width: "24px",
                                    height: "24px",
                                    color: "grey"
                                  }} />
                                </button>
                              </div>

                            </div>) : (
                              <p style={{
                                fontSize: '14px',
                                fontWeight: 400,
                                lineHeight: "16.94px",
                                fontFamily: 'Inter',
                                margin: 0,
                                padding: 0,
                                textAlign: 'center',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                width: '100%'
                              }}>
                                <span><SentimentDissatisfiedIcon
                                  sx={{
                                    width: "20px",
                                    height: "20px",
                                    color: '#000'
                                  }}
                                /></span>
                                You cannot send messages in this chat as the Proposal has been {proposalDetails?.proposal_status?.toLowerCase()}.
                              </p>
                            )}

                          </div>

                        </div>
                      </>
                    ) : (
                      <div style={{
                        width: deviceType == "mobile" ? "100%" : '100%', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", alignSelf: "center", borderRadius: '8px', height: '100%',
                      }}>
                        {/* {(buyerloading) ? (
                          <div className="loader"></div>
                        )
                          : (<Button sx={{ border: '1px solid #e22b16', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: "center", gap: '5px' }} onClick={() => { setBuyerLoading(true); AddChatBoxApi(buyerid, buyerorgid) }}>
                            <MarkUnreadChatAltIcon sx={{ color: '#e22b16', width: '20px', height: '20px' }} /> <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500' }}>Initiate Chat</span>
                          </Button>)} */}
                        <div className="centered-container">
                          <div className="loader"></div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {(isSellerChatExist) ? (<>
                      <div style={{
                        width: "100%",
                        // height: "50px",
                        height: '12%',
                        padding: "16px",
                        gap: "5px",
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        background: '#FFF',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        alignItems: 'center',
                        borderRadius: '8px',
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: '0px',
                        marginBottom: '2px'
                      }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: deviceType == "mobile" ? "space-between" : "flex-start",
                          alignItems: 'center',
                          gap: '10px',
                          padding: '20px 0px',

                        }}>
                          <div
                            onClick={() => { }}
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 100,
                              margin: 0,
                              width: '32px',
                              height: '32px',
                              cursor: 'pointer',
                              backgroundColor: '#D2EAF4',
                            }}
                          >
                            <span style={{
                              fontFamily: "Inter",
                              fontSize: "20px",
                              fontWeight: 500,
                              lineHeight: "28px",
                            }}>{sellerName.charAt(0)}</span>
                          </div>
                          <p style={{
                            fontFamily: "Inter",
                            fontSize: deviceType == "mobile" ? "14px" : "16px",
                            fontWeight: 500,
                            lineHeight: "19.36px",
                            textAlign: "left",
                            padding: 0,
                            margin: 0
                          }}>

                            {sellerName}
                          </p>
                          <button
                            onClick={() => { chatUpdations() }}
                            style={{
                              width: '20px',
                              backgroundColor: "transparent",
                              border: "0px solid transparent",
                              margin: 0,
                              padding: 0
                            }}>
                            <RefreshIcon sx={{
                              width: '20px',
                              height: '20px',
                              color: "#E12619",
                              margin: 0,
                              padding: 0
                            }} />
                          </button>
                          {(deviceType == "mobile") && (<p style={{
                            height: 'auto',
                            padding: "4px 10px 4px 10px",
                            borderRadius: "100px",
                            backgroundColor: 'rgba(195, 248, 231, 1)',
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontWeight: 700,
                            lineHeight: "21px",
                            textAlign: "left",
                            color: 'rgba(0, 132, 90, 1)',
                            margin: 0,
                          }}>

                            {proposalstatus}
                          </p>)}
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: "flex-start",
                          alignItems: 'center',
                          gap: deviceType == "mobile" ? "0px" : '10px'
                        }}>
                          {(deviceType !== "mobile") && (<p style={{
                            height: 'auto',
                            padding: "4px 10px 4px 10px",
                            borderRadius: "100px",
                            backgroundColor: 'rgba(195, 248, 231, 1)',
                            fontFamily: "Inter",
                            fontSize: "14px",
                            fontWeight: 700,
                            lineHeight: "21px",
                            textAlign: "left",
                            color: 'rgba(0, 132, 90, 1)',
                            margin: 0,
                          }}>
                            {proposalstatus}
                          </p>)}
                          <button
                            onClick={() => { setSearchPresent(!isSearchPresent) }}
                            style={{
                              width: "24px",
                              height: "24px",
                              padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent', cursor: 'pointer'
                            }}>
                            <img src={Search} style={{
                              width: "24px",
                              height: "24px",
                            }} />
                          </button>
                          <>
                            <button
                              aria-describedby={pinsellerid}
                              onClick={handleClickPinnedSeller}
                              disabled={sellerPinnedChats?.length == 0}
                              style={{
                                height: "24px",
                                padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent',
                                cursor: 'pointer',
                                opacity: sellerPinnedChats?.length == 0 ? 0.3 : 1,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: '5px'
                              }}>
                              <img src={Pinned} style={{
                                width: "24px",
                                height: "24px",
                              }} />

                              <p
                                style={{
                                  fontFamily: "Inter",
                                  fontSize: deviceType == "mobile" ? "13px" : "16px",
                                  fontWeight: 500,
                                  lineHeight: "19.36px",
                                  textAlign: "left",
                                  padding: 0,
                                  margin: 0
                                }}>
                                {sellerPinnedChats?.length} Items Pinned
                              </p>
                            </button>
                          </>
                        </div>
                      </div>

                      <div style={{
                        width: "100%",
                        height: '88%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: '8px'
                      }}>
                        {(isSearchPresent) && (
                          <div style={{
                            width: "100%",
                            height: "44px",
                            padding: "16px",
                            gap: "5px",
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                            background: " rgba(242, 242, 242, 1)",
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-evenly",
                            alignItems: 'center',
                            borderRadius: '0px'
                          }}>
                            <img
                              src={SearchNormal}
                              style={{
                                width: "5%",
                                height: "20px",

                              }}
                            />
                            <input
                              type="text"
                              style={{
                                backgroundColor: 'transparent',
                                border: '0px solid transparent',
                                outline: 'none',
                                fontSize: "14px",
                                width: '60%',
                                color: 'rgba(130, 130, 130, 1)',
                              }}
                              placeholder='Find messages in current conversation'
                              value={sellersearchValue}
                              onChange={(e) => { setSellerSearchValue(e.target.value) }}
                            />
                            {(sellersearchValue) && (<Close
                              sx={{
                                cursor: 'pointer',
                              }}
                              onClick={() => { setSellerSearchValue("") }}
                            />)}
                            {(sellersearchValue) && (<p style={{
                              fontFamily: "Inter",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "16.94px",
                              textAlign: "left",
                              margin: 0,
                              padding: 0,
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center'
                            }}>
                              <span>{(sellersearchResults?.length >= 1) ? (sellercurrentSearchIndex + 1) : 0}</span> / <span>{sellersearchResults?.length}</span>
                            </p>)}
                            {(sellersearchValue) && (
                              <button
                                onClick={() => { handleScrollSeller("up") }}
                                style={{
                                  width: "5%",
                                  height: "24px",
                                  padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent',
                                  cursor: 'pointer'
                                }}>
                                <KeyboardArrowUpOutlined style={{
                                  height: "24px",
                                  color: '#000'
                                }} />

                              </button>)}
                            {(sellersearchValue) && (
                              <button
                                onClick={() => { handleScrollSeller("down") }}
                                style={{
                                  width: "5%",
                                  height: "24px",
                                  padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent',
                                  cursor: 'pointer'
                                }}>
                                <KeyboardArrowDownOutlined style={{
                                  height: "24px",
                                  color: '#000'
                                }} />

                              </button>)}
                            <button
                              onClick={() => { setSearchPresent(!isSearchPresent) }}
                              style={{
                                width: "10%",
                                height: "24px",
                                color: "rgba(130, 130, 130, 1)",
                                fontFamily: "Inter",
                                fontSize: "14px",
                                fontWeight: 500,
                                padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent',
                                cursor: 'pointer'
                              }}>
                              Cancel
                            </button>

                          </div>
                        )}

                        <div
                          ref={sellerdivRef}
                          style={{
                            width: "100%",
                            height: "80vh",
                            padding: "16px",
                            gap: "20px",
                            backgroundColor: '#FFF',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderRadius: '8px',
                            zIndex: 2,
                            overflowX: 'hidden',
                            overflowY: 'scroll',
                          }}>
                          {/* <BasePopup id={pinsellerid} open={pinselleropen} anchor={pinnedSellerOpen} style={{ zIndex: 9999, width: '60%', }}> */}
                          <Popover
                            id={pinsellerid}
                            open={pinselleropen}
                            anchorEl={pinnedSellerOpen}
                            onClose={() => { setPinnedSellerOpen(null) }}
                            style={{ zIndex: 9999, width: '60%', borderRadius: '10px' }}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}
                          >
                            <PopupBody style={{
                              width: '100%',
                              minHeight: "100px",
                              maxHeight: "300px",
                              overflowY: 'scroll',
                              scrollbarWidth: 'none',
                              gap: "5px",
                              margin: 0,
                              backgroundColor: "rgba(255,255,255, 1)",
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: "flex-start",
                              alignItems: 'center',
                              borderRadius: '10px'
                            }}>
                              {sellerPinnedChats?.map((item: any, index: any) => (
                                <PinnedChat item={item} key={index} scrollToChat={sellerscrollToChat} />
                              ))}

                            </PopupBody>
                            {/* </BasePopup> */}
                          </Popover>

                          {Object.keys(sellerchats || {})?.map((day: any, index: any) => (
                            <div key={day}
                              ref={sellerdivRef}
                              style={{
                                display: 'flex',
                                width: "100%",
                                flexDirection: 'column',
                                gap: "10px",
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                              }}>
                              <p style={{
                                fontSize: '14px',
                                fontWeight: 400,
                                lineHeight: "16.94px",
                                fontFamily: 'Inter',
                                margin: 0,
                                padding: 0,
                                textAlign: 'center',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                width: '100%'
                              }}>
                                <span style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--Theme-colors-border-2, rgba(229, 229, 229, 1))' }}></span>
                                {day}
                                <span style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--Theme-colors-border-2, rgba(229, 229, 229, 1))' }}></span>
                              </p>


                              {sellerchats[day]?.map((message: any, index: any) => (
                                <div
                                  key={message?.id}
                                  ref={(el) => (sellerchatRefs.current[message?.id] = el)}
                                  style={{ width: '100%' }}
                                >
                                  <Chat pre={steps[activeStep - 1].label} prop={prop} item={message} key={message?.id} setForwardOpen={setSellerForwardPopup} setReplyOpen={setSellerReplyPopup} setForwardingChat={setForwardingChat} chatUpdations={() => chatUpdations()} />
                                </div>
                              ))}
                            </div>
                          ))}

                        </div>
                        {(sellerReplyPopup) && (<Reply replyOpen={sellerReplyPopup} setReplyClose={setSellerReplyPopup} forwardingChat={forwardingChat} />)}
                        <div style={{
                          width: "100%",
                          height: "20%",
                          gap: "5px",
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          background: (proposalDetails?.proposal_status?.toLowerCase() == "terminated" || proposalDetails?.proposal_status?.toLowerCase() == "completed") ? "rgba(0,0,0,0.2)" : '#FFF',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: "space-between",
                          alignItems: 'center',
                          borderRadius: (proposalDetails?.proposal_status?.toLowerCase() == "terminated" || proposalDetails?.proposal_status?.toLowerCase() == "completed") ? "0px 0px 8px 8px" : '8px',
                          padding: "18px",
                          paddingTop: "8px",
                          paddingBottom: '8px'
                        }}>
                          {(proposalDetails?.proposal_status?.toLowerCase() !== "terminated" && proposalDetails?.proposal_status?.toLowerCase() !== "completed") ? (<div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            width: '100%',
                            height: "48px",
                            borderRadius: '18px',
                            border: "1px solid var(--Theme-colors-border-2, rgba(229, 229, 229, 1))"
                          }}>
                            <Button
                              onClick={() => {
                                setDocumentpopupOpen(true);
                                setdocName("")
                                setFileData('');
                                setDocumentSize("");
                                setUploadDocument("");
                                setDocumentType("")
                              }}
                              sx={{
                                width: "50px",
                                height: "48px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "none",
                                backgroundColor: "transparent",
                                padding: 0,
                                margin: 0,
                                "&:hover": {
                                  backgroundColor: "rgba(0, 0, 0, 0.015)",
                                },
                              }}
                            >
                              <img
                                src={menubase}
                                alt="menu icon"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                }}
                              />
                            </Button>

                            <div style={{
                              width: "75%",
                              height: "48px"
                            }}>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '0px solid transparent',
                                  outline: 'none',
                                  width: '100%',
                                  height: "48px",
                                  paddingLeft: '10px',
                                  color: '#000',
                                  margin: 0,
                                  padding: 0
                                }}
                                placeholder='Type here...'
                                value={searchValue}
                                onChange={(e) => { setSearchValue(e.target.value) }}
                                onKeyDown={(e: any) => {
                                  if (e.key == "Enter") {

                                    chatAdding()
                                    setSearchValue("")
                                  }
                                }}
                              />
                            </div>
                            <div style={{
                              width: 'auto',
                              height: "48px",
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: '20px'
                            }}>

                              <button
                                disabled={!searchValue}
                                onClick={() => {

                                  chatAdding()
                                  setSearchValue("")
                                }}
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  padding: 0,
                                  margin: 0,
                                  border: '0px solid transparent',
                                  backgroundColor: 'transparent'
                                }}
                              >

                                <SendIcon sx={{
                                  width: "24px",
                                  height: "24px",
                                  color: "grey"
                                }} />
                              </button>
                            </div>

                          </div>) : (
                            <p style={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: "16.94px",
                              fontFamily: 'Inter',
                              margin: 0,
                              padding: 0,
                              textAlign: 'center',
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '10px',
                              width: '100%'
                            }}>
                              <span><SentimentDissatisfiedIcon
                                sx={{
                                  width: "20px",
                                  height: "20px",
                                  color: '#000'
                                }}
                              /></span>
                              You cannot send messages in this chat as the Proposal has been {proposalDetails?.proposal_status?.toLowerCase()}.

                            </p>
                          )}

                        </div>

                      </div>
                    </>) : (
                      <div style={{
                        width: deviceType == "mobile" ? "100%" : '100%', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", alignSelf: "center", borderRadius: '8px', height: '100%',
                      }}>
                        {/* {
                          (sellerloading) ? (
                            <div className="loader"></div>
                          )
                            : (
                              <Button sx={{ border: '1px solid #e22b16', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: "center", gap: '5px' }} onClick={() => { setSellerLoading(true); AddChatBoxApi(sellerid, sellerorgid) }}>
                                <MarkUnreadChatAltIcon sx={{ color: '#e22b16', width: '20px', height: '20px' }} /> <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500' }}>Initiate Chat</span>
                              </Button>
                            )} */}
                        <div className="centered-container">
                          <div className="loader"></div>
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>
              <div style={{ width: deviceType == "mobile" ? "100%" : isItAdmin ? '45%' : '35%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: 'flex-start', backgroundColor: '#FFF', borderRadius: '8px', borderBottom: "1px solid rgba(224, 224, 224, 1)", }}>
                <div style={{
                  width: "100%",
                  height: '12%',
                  padding: "16px",
                  border: "0px 0px 1px 0px",
                  gap: "5px",
                  background: '#FFF',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: "space-between",
                  alignItems: 'center',
                  borderRadius: '8px',
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: '0px',
                  borderBottom: "1px solid rgba(224, 224, 224, 1)",

                }}>
                  <p style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "19.36px",
                    textAlign: "left",
                    padding: 0,
                    margin: 0
                  }}>
                    Proposal Status
                  </p>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      height: "29px",
                      padding: "4px 10px 4px 10px",
                      gap: "10px",
                      borderRadius: "100px",
                      backgroundColor: proposalDetails?.proposal_status?.toLowerCase() == "terminated" ? "rgba(255,0,0,0.2)" : proposalDetails?.proposal_status?.toLowerCase() == "completed" ? "rgba(0,0,0,0.2)" : 'rgba(195, 248, 231, 1)',
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "21px",
                      textAlign: "left",
                      color: proposalDetails?.proposal_status?.toLowerCase() == "terminated" ? "red" : proposalDetails?.proposal_status?.toLowerCase() == "completed" ? "grey" : 'rgba(0, 132, 90, 1)',
                      textTransform: 'capitalize'
                    }}>
                      {proposalDetails?.proposal_status == "completed" ? "Chat Closed" : proposalDetails?.proposal_status}
                    </div>
                    {(proposalDetails?.proposal_status?.toLowerCase() !== "terminated" && proposalDetails?.proposal_status?.toLowerCase() !== "completed") && (<button
                      onClick={handleClick}
                      style={{
                        width: "24px",
                        height: "24px",
                        padding: 0, margin: 0, backgroundColor: 'transparent', border: '0px solid transparent',
                        cursor: 'pointer'
                      }}>
                      <img src={Edit} style={{
                        width: "24px",
                        height: "24px",
                      }} />
                    </button>)}
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      sx={{
                        boxShadow: "4px 4px 12px 0px rgba(0, 0, 0, 0.07)",
                        borderRadius: '10px',

                      }}
                    >
                      <MenuList
                        sx={{
                          outline: 'none',
                          borderRadius: '10px',
                          marginTop: 0,
                          marginBottom: 0,
                          padding: 0,
                          '& .MuiList-root MuiList-padding css-18bys5e-MuiList-root': {
                            marginTop: 0,
                            marginBottom: 0
                          },
                          '& .MuiList-root.MuiList-padding': {
                            marginTop: 0,
                            marginBottom: 0
                          },
                          '& .css-6hp17o-MuiList-root-MuiMenu-list': {
                            paddingTop: 0,
                            paddingBottom: 0,
                          }
                        }}
                      >
                        {
                          [
                            {
                              key: 1,
                              title: "Terminate Deal",
                              name: "Terminate Deal",
                              disabled: false,
                            },
                            // {
                            //   key: 2,
                            //   name: "Mark Lead as Cold",
                            //   disabled: false,
                            // },
                            // {
                            //   key: 3,
                            //   name: "Mark Lead as Warm",
                            //   disabled: false,
                            // },
                            {
                              key: 4,
                              // name: "Closed",
                              title: "Close Chat",
                              name: "Completed",
                              disabled: false,
                            }
                          ].map((menudata) => !menudata.disabled && (
                            <MenuItem
                              key={menudata.key}
                              onClick={() => {
                                if (menudata.key == 1) {
                                  setpopupOpen(true)
                                  setpopupTitle(menudata?.name)
                                }
                                else if (menudata.key == 4) {
                                  setpopupOpen(true)
                                  setpopupTitle(menudata?.name)
                                }
                                setRemark('')
                                handleClose()
                              }}
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                margin: 0,
                                '&:hover': {
                                  background: 'rgba(0,0,0,0.01)',
                                },
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >

                                <ListItemText
                                  sx={{
                                    fontSize: '10px',
                                    fontWeight: 500,
                                    color: '#333',
                                    fontFamily: "Inter",
                                    lineHeight: "21px",
                                    textAlign: "left",
                                  }}
                                >
                                  {menudata.title}
                                </ListItemText>
                              </div>
                            </MenuItem>
                          ))
                        }
                      </MenuList>
                    </Menu>
                  </div>

                </div>
                <div style={{
                  width: "100%",
                  height: '88%',

                }}>
                  <Box sx={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'scroll', padding: '10px'
                  }}>
                    <Stepper orientation="vertical" activeStep={activeStep}>
                      {steps.map((item: any, index: any) => (
                        <Step key={index} completed={completed[index]} sx={{

                          padding: 0, margin: 0,
                          '.MuiStepConnector-line': {
                            maxHeight: '5px',
                          },
                          '& .MuiStepConnector-line, & .MuiStepConnector-lineVertical, & .css-8t49rw-MuiStepConnector-line': {
                            borderStyle: 'dashed',
                            borderColor: '#000',
                          },
                          '& .css-8t49rw-MuiStepConnector-line': {
                            borderStyle: 'dashed',
                            borderColor: '#000',

                          },
                          '& .MuiStepConnector-root, & .MuiStepConnector-root': {
                            maxHeight: '5px',
                            padding: 0, margin: 0
                          }
                        }}>
                          <StepButton color="inherit"
                            sx={{
                              padding: 0,
                              margin: 0,
                              display: "block",
                              '& .css-14sza3e-MuiStepLabel-root': {
                                padding: 0, margin: 0
                              },
                              '& .Mui-active': {
                                color: 'rgba(39, 174, 96, 1)'
                              },
                              '& .Mui-active, & .Mui-completed': {
                                color: 'rgba(39, 174, 96, 1)'
                              },
                              '& .css-qeoe7e-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed, & .css-1rjpq7n.Mui-completed': {
                                color: 'rgba(39, 174, 96, 1)',
                                background: '#fff'
                              },
                              '& .css-qeoe7e-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, & .css-1rjpq7n.Mui-active': {
                                color: 'transparent',
                                backgroundImage: `url(${inprogress})`,
                                height: '30px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',

                              },
                              '& .css-qeoe7e-MuiSvgIcon-root-MuiStepIcon-root & .css-1rjpq7n': {
                                color: 'transparent',
                                backgroundImage: `url(${notstarted})`,
                                height: '28px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',

                              },
                              '& .css-t3kumv-MuiStepIcon-text': {
                                display: 'none'
                              }

                            }}>
                            <Row style={{
                              width: '100%', padding: 0, margin: 0,
                              // marginTop: '10px',
                              display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                              <Col md={isItAdmin ? 6 : 6} style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: "flex-start", color: "rgba(51, 51, 51, 1)", }}>
                                <p style={{
                                  fontFamily: "Inter",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  lineHeight: "16px",
                                  textAlign: "left",
                                  padding: 0,
                                  margin: 0
                                }}>{item?.label}</p>
                                {(index < activeStep) && (
                                  <>
                                    <p style={{
                                      fontFamily: "Inter",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                      // lineHeight: "16px",
                                      textAlign: "left",
                                      margin: '0px',
                                      // marginTop: '5px'
                                    }}>{item?.date} </p>
                                    <p style={{
                                      fontFamily: "Inter",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                      // lineHeight: "16px",
                                      textAlign: "left",
                                      margin: '0px',
                                    }}>
                                      {item?.updatedBy}
                                    </p>
                                  </>
                                )}

                              </Col>

                              {(
                                // isItAdmin && 
                                (item?.status || item?.status1 || item?.status2 || item?.status3 || item?.status4)) && (
                                  <Col md={2} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                    {(item?.label != "SOW/Agreement Signed" && item?.label != "Invoicing" && item?.label != "Proposal") && (
                                      <img
                                        title={"Submitted Document"}
                                        onClick={() => { window.open(item.document) }}
                                        src={
                                          item?.status === "submitted" ? PSub :
                                            ''
                                        }
                                        style={{ width: '30px', height: '30px', marginBottom: '10px' }}
                                      />
                                    )}

                                    {(isItAdmin || isBuyer) && (item?.label == "Proposal") && (
                                      <img
                                        title={"Proposal " + item?.status + " Document"}
                                        onClick={() => { window.open(item.document) }}
                                        src={
                                          item?.status === "submitted" ? PSub :
                                            item?.status === "rejected" ? PRej :
                                              item?.status === "accepted" ? PAcc :
                                                item?.status === "pending" ? PPen :
                                                  item?.status === "dormant" ? PDoc :
                                                    ''
                                        }
                                        style={{ width: '30px', height: '30px', marginBottom: '10px' }}
                                      />
                                    )}

                                    {(isItAdmin || isSeller || isSellerAdmin) && (item?.label == "SOW/Agreement Signed" && item?.status1) && (
                                      <img title={"Seller SOW signed Document"}
                                        onClick={() => { window.open(item.document1) }}
                                        src={
                                          item?.status1 === "sowSubmitted" ? sowSub : ''
                                        }
                                        style={{ width: '30px', height: '30px', marginBottom: '10px' }}
                                      />)}
                                    {(isItAdmin || isBuyer) && (item?.label == "SOW/Agreement Signed" && item?.status2) && (<img
                                      title={"Buyer SOW signed Document"}
                                      onClick={() => { window.open(item.document2) }}
                                      src={
                                        item?.status2 === "sowSubB" ? sowSubB : ''
                                      }
                                      style={{ width: '30px', height: '30px', marginBottom: '10px', marginLeft: '10px' }}
                                    />)}

                                    {(isItAdmin || isBuyer) && (item?.label == "Invoicing" && item?.status1) && (
                                      <img title={"Buyer Invoice Document (Interim)"}
                                        onClick={() => { window.open(item.document1) }}
                                        src={
                                          item?.status1 === "BinvoiceAdv" ? BinvoiceAdv : ''
                                        }
                                        style={{ width: '30px', height: '30px', marginBottom: '10px' }}
                                      />)}
                                    {(isItAdmin || isSeller || isSellerAdmin) && (item?.label == "Invoicing" && item?.status3) && (<img
                                      title={"Seller Invoice Document (Interim)"}
                                      onClick={() => { window.open(item.document3) }}
                                      src={
                                        item?.status3 === "invoiceAdv" ? invoiceAdv : ''
                                      }
                                      style={{ width: '30px', height: '30px', marginBottom: '10px', marginLeft: '10px' }}
                                    />)}
                                    {(isItAdmin || isBuyer) && (item?.label == "Invoicing" && item?.status2) && (
                                      <img title={"Buyer Invoice Document (Final)"}
                                        onClick={() => { window.open(item.document2) }}
                                        src={
                                          item?.status2 === "BinvoiceFinal" ? BinvoiceFinal : ''
                                        }
                                        style={{ width: '30px', height: '30px', marginBottom: '10px', marginLeft: '10px' }}
                                      />)}
                                    {(isItAdmin || isSeller || isSellerAdmin) && (item?.label == "Invoicing" && item?.status4) && (<img
                                      title={"Seller Invoice Document (Final)"}
                                      onClick={() => { window.open(item.document4) }}
                                      src={
                                        item?.status4 === "invoiceFinal" ? invoiceFinal : ''
                                      }
                                      style={{ width: '30px', height: '30px', marginBottom: '10px', marginLeft: '10px' }}
                                    />)}

                                  </Col>)}

                              {(isItAdmin && index > activeStep - 2 && index != 0 && (proposalDetails?.proposal_status == "ongoing")) && (
                                <Col md={3} style={{
                                  padding: 0,
                                  margin: 0,
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                  alignItems: 'flex-end',
                                  gap: '10px'
                                }}>
                                  <button
                                    onClick={
                                      async () => {
                                        // console.log("proposalstatusproposalstatus",proposalstatus,proposalDocs)
                                        if (index >= activeStep) {
                                          const body = {
                                            proposal_id: parseInt(id),
                                            currentStage: steps[activeStep + 1] ? (steps[activeStep + 1].label) : "Completed",
                                            previousStage: steps[activeStep].label
                                          };
                                          await apis.sendProposalLeadStatus(body);
                                        }

                                        if (proposalstatus?.toLowerCase() == "invoice sent" && index >= activeStep) {
                                          // setpopupOpen(true)
                                          setCloseRemark('')
                                          setClosepopupOpen(true)
                                          setCloseObj({
                                            "label": item.label,
                                            "index": index
                                          })
                                          setpopupTitle("Completed")
                                        } else {
                                          if (index == activeStep) {
                                            AddProposalLeadStatus(item.label, item.label, index);
                                            // if(index >= activeStep)
                                            // {
                                            //   const body = {
                                            //     proposal_id: parseInt(id),
                                            //     name: item.label,
                                            //     pls_current_status: status,
                                            //     document: fileData,
                                            //     currentStage: item.label == status ? (steps[activeStep + 1] ? (steps[activeStep + 1].label) : "Completed") : (steps[activeStep].label),
                                            //     previousStage: item.label == status ? (steps[activeStep].label) : (steps[activeStep - 1].label),
                                            //   };
                                            //   const response2 = await apis.sendProposalLeadStatus(body);

                                            // }
                                          }
                                          else if (index == activeStep - 1) {
                                            let leadProp = proposalDocs.find((prop: any) => prop.name == item?.label)
                                            if (leadProp) {
                                              setLoader(true);
                                              try {
                                                const body = {
                                                  proposal_id: parseInt(id),
                                                  id: leadProp.id,
                                                  pls_current_status: steps[index - 1].label,
                                                  currentStage: steps[index].label,
                                                  previousStage: index >= activeStep ? (steps[index - 1].label) : (steps[index + 1] ? (steps[index + 1].label) : "Completed"),
                                                  is_deleted: true,
                                                };
                                                const response = await apis.updateProposalLeadStatus(leadProp.id, body);

                                                let oppr: any = [];
                                                prop.opportunities.map((item: any) => {
                                                  oppr.push(item.opportunity)
                                                })
                                                // setPstate(index >= activeStep ?(steps[index - 1].label):(steps[index + 1]?(steps[index + 1].label)  :"Completed"))
                                                const rfpUpdatedData = {
                                                  SellerName: prop.seller.name,
                                                  RFPID: prop.id,
                                                  BuyerName: prop.buyer.name,
                                                  AssetName: prop.asset.asset_detail[0].name,
                                                  OpportunityName: oppr,
                                                  AssetType: prop.asset_type,
                                                  DateInitiated: prop.created_at,
                                                  CurrentStage: steps[index].label,
                                                  PreviousStage: index >= activeStep ? (steps[index - 1].label) : (steps[index + 1] ? (steps[index + 1].label) : "Completed"),
                                                  ZupotsuUserName: localStorage.getItem("name"),
                                                  DocumentStatus: null,
                                                  LastUpdated: prop.updated_at
                                                };
                                                mixpanelEvents.onRFPUpdated(rfpUpdatedData);

                                                fetchProposals()
                                              } catch (error) {
                                                console.error("Error adding proposal lead status:", error);
                                                setSnackbar({
                                                  open: true,
                                                  severity: 'error',
                                                  message: 'Something went wrong while adding proposal lead status!!'
                                                });
                                                setLoader(false);
                                              }
                                              setLoad(false)
                                            }

                                          }
                                        }
                                      }}
                                    style={{
                                      width: "110px",
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: "5px",
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      color: index == activeStep ? "#fff" : index == activeStep - 1 ? '#e22b16' : 'rgba(130, 130, 130, 1)',
                                      backgroundColor: index == activeStep ? "#E22B16" : 'transparent',
                                      border: index == activeStep ? "#fff" : index == activeStep - 1 ? "1px solid #e22b16" : "1px solid rgba(189, 189, 189, 1)",
                                      padding: '10px 5px'

                                    }}>
                                    {index >= activeStep ? (
                                      "Mark Complete"
                                    ) : (
                                      <span style={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}>
                                        <HistoryIcon
                                          sx={{
                                            width: "20px",
                                            height: "20px",
                                          }}
                                        />
                                        <span style={{ marginLeft: '3px' }}>Revert</span>
                                      </span>
                                    )
                                    }
                                  </button>
                                </Col>)}
                            </Row>
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                    <hr style={{ color: '#ddd', marginTop: '10px' }} />
                    <div style={{ display: 'flex', gap: "20px", flexWrap: 'wrap', marginTop: '30px' }}>
                      <div>
                        <img src={PSub} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Submitted</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Document</div>
                      </div>

                      {(isItAdmin || isBuyer) && (<div>
                        <img src={PRej} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Rejected</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Document</div>
                      </div>)}

                      {(isItAdmin || isBuyer) && (<div>
                        <img src={PAcc} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Accepted</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Document</div>
                      </div>)}

                      {(isItAdmin || isBuyer) && (<div>
                        <img src={PPen} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Pending</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Document</div>
                      </div>)}

                      {(isItAdmin || isBuyer) && (<div>
                        <img src={PDoc} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Dormant</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Document</div>
                      </div>)}

                      {(isItAdmin || isSeller || isSellerAdmin) && (<div>
                        <img src={sowSub} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>SOW</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Signed</div>
                      </div>)}

                      {(isItAdmin || isBuyer) && (<div>
                        <img src={sowSubB} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>SOW</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Signed</div>
                      </div>)}

                      {(isItAdmin || isSeller || isSellerAdmin) && (<div>
                        <img src={invoiceAdv} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Advance</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Invoice</div>
                      </div>)}

                      {(isItAdmin || isSeller || isSellerAdmin) && (<div>
                        <img src={invoiceFinal} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Final</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Invoice</div>
                      </div>)}

                      {(isItAdmin || isBuyer) && (<div>
                        <img src={BinvoiceAdv} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Advance</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Invoice</div>
                      </div>)}

                      {(isItAdmin || isBuyer) && (<div>
                        <img src={BinvoiceFinal} style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Final</div>
                        <div style={{ fontSize: '10px', fontWeight: 400, color: '#828282', }}>Invoice</div>
                      </div>)}
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          )}

          <Modal
            open={popupopen}
            onClose={handleClosepopup}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, width: "50%", borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
              <Box sx={{
                width: "100%",
                height: "auto",
                display: 'flex',
                flexDirection: "row",
                padding: "10px 16px 10px 16px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                justifyContent: "space-between",
              }} >
                <p style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "21px",
                  textAlign: "left",
                  padding: 0,
                  margin: 0,
                  color: "rgba(51, 51, 51, 1)"
                }}>
                  Confirmation
                </p>

                <Close
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => { setpopupOpen(false) }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '10px', }}>


                <Box sx={{
                  width: "100%",
                  display: 'flex',
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: '10px',
                  padding: "16px",
                  marginTop: '0px'
                }} >

                  <p style={{
                    fontFamily: "Inter",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "21px",
                    textAlign: "left",
                    padding: 0,
                    margin: 0,
                    color: "rgba(51, 51, 51, 1)"
                  }}>
                    {`Are you sure you want to ${popupTitle?.toLowerCase() !== "completed" ? "Terminate" : "Close"} the proposal?`}
                  </p>
                </Box>
                <Box sx={{
                  width: "100%",
                  display: 'flex',
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: '10px',
                  padding: "16px",
                  paddingTop: '3px',
                  paddingBottom: "3px"
                }}>
                  <ZupotsuTextfield
                    title={`Enter Remark`}
                    placeholder={`Enter  Remark`}
                    value={remark}
                    isRequired={popupTitle?.toLowerCase() == "completed" ? false : true}
                    type={"text"}
                    name={"remark"}
                    multiline={true}
                    rows={3}
                    handleChange={(event: any) => {
                      setRemark(event.target.value)
                    }}
                  />
                </Box>


              </Box>

              <Box sx={{
                width: "100%",
                height: "auto",
                display: 'flex',
                flexDirection: "row",
                alignItems: 'center',
                padding: "8px 16px 8px 16px",
                gap: '10px',
                borderTop: "0px solid rgba(224, 224, 224, 1)",
                justifyContent: "center",
                marginTop: '0px',
                paddingBottom: '25px',
                boxShadow: " 0px 0px 14px 0px rgba(0, 0, 0, 0.07)"
              }} >
                <ZupotsuButton
                  name={"Cancel"}
                  variant={'outlined'}
                  padding={"10px 25px"}
                  isCustomColors={true}
                  customOutlineColor="1px solid #E20B18"
                  customOutlineColorOnHover="1px solid #E20B18"
                  customBgColorOnhover="#FFF"
                  customBgColor={"#FFF"}
                  customTextColorOnHover="#E20B18"
                  customTextColor="#E20B18"
                  handleClick={
                    () => { setpopupOpen(false) }
                  }
                />
                <ZupotsuButton
                  name={popupTitle?.toLowerCase() !== "completed" ? "Yes, Terminate" : "Yes, Close"}
                  variant={'contained'}
                  padding={"10px 25px"}
                  isCustomColors={true}
                  disabled={(popupTitle?.toLowerCase() == "completed") ? false : remark ? false : true}
                  customOutlineColor="1px solid transparent"
                  customOutlineColorOnHover="1px solid transparent"
                  customBgColorOnhover="#E20B18"
                  customBgColor={(popupTitle?.toLowerCase() == "completed") ? "#E20B18" : remark ? "#E20B18" : "rgba(255,1,1,0.4)"}
                  customTextColorOnHover="#FFF"
                  customTextColor="#FFF"
                  handleClick={
                    () => { updateProposal() }
                  }
                />
              </Box>
            </Box>
          </Modal>


          <Modal
            open={closepopupopen}
            onClose={() => { setClosepopupOpen(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, width: "50%", borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
              <Box sx={{
                width: "100%",
                height: "auto",
                display: 'flex',
                flexDirection: "row",
                padding: "10px 16px 10px 16px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                justifyContent: "space-between",
              }} >
                <p style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "21px",
                  textAlign: "left",
                  padding: 0,
                  margin: 0,
                  color: "rgba(51, 51, 51, 1)"
                }}>
                  Confirmation
                </p>

                <Close
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => { setClosepopupOpen(false) }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '10px', }}>


                <Box sx={{
                  width: "100%",
                  display: 'flex',
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: '10px',
                  padding: "16px",
                  marginTop: '0px'
                }} >

                  <p style={{
                    fontFamily: "Inter",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "21px",
                    textAlign: "left",
                    padding: 0,
                    margin: 0,
                    color: "rgba(51, 51, 51, 1)"
                  }}>
                    {`Are you sure you want to Close the proposal?`}
                  </p>
                </Box>
                <Box sx={{
                  width: "100%",
                  display: 'flex',
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: '10px',
                  padding: "16px",
                  paddingTop: '5px',
                  paddingBottom: "3px"
                }}>
                  <ZupotsuTextfield
                    title={`Enter Close remark`}
                    placeholder={`Enter Close remark`}
                    value={closeremark}
                    type={"text"}
                    name={"closeremark"}
                    multiline={true}
                    rows={3}
                    handleChange={(event: any) => {
                      setCloseRemark(event.target.value)
                    }}
                  />
                </Box>


              </Box>

              <Box sx={{
                width: "100%",
                height: "auto",
                display: 'flex',
                flexDirection: "row",
                alignItems: 'center',
                padding: "8px 16px 8px 16px",
                gap: '10px',
                borderTop: "0px solid rgba(224, 224, 224, 1)",
                justifyContent: "center",
                marginTop: '0px',
                paddingBottom: '25px',
                boxShadow: " 0px 0px 14px 0px rgba(0, 0, 0, 0.07)"
              }} >
                <ZupotsuButton
                  name={"Continue Chat"}
                  variant={'outlined'}
                  padding={"10px 25px"}
                  isCustomColors={true}
                  customOutlineColor="1px solid #E20B18"
                  customOutlineColorOnHover="1px solid #E20B18"
                  customBgColorOnhover="#FFF"
                  customBgColor={"#FFF"}
                  customTextColorOnHover="#E20B18"
                  customTextColor="#E20B18"
                  handleClick={
                    () => {
                      closeupdateProposal(false)
                      setClosepopupOpen(false)
                    }
                  }
                />
                <ZupotsuButton
                  name={"Yes, Close"}
                  variant={'contained'}
                  padding={"10px 25px"}
                  isCustomColors={true}
                  customOutlineColor="1px solid transparent"
                  customOutlineColorOnHover="1px solid transparent"
                  customBgColorOnhover="#E20B18"
                  customBgColor={"#E20B18"}
                  customTextColorOnHover="#FFF"
                  customTextColor="#FFF"
                  handleClick={
                    () => {
                      closeupdateProposal(true)
                    }
                  }
                />
              </Box>
            </Box>
          </Modal>

          <Modal
            open={proposalPopup}
            onClose={handleClosepopup}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
              <Box sx={{
                width: "100%",
                height: "auto",
                display: 'flex',
                flexDirection: "row",
                padding: "10px 16px 10px 16px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                justifyContent: "space-between",
              }} >
                <p style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "21px",
                  textAlign: "left",
                  padding: 0,
                  margin: 0,
                  color: "rgba(51, 51, 51, 1)"
                }}>
                  Confirmation
                </p>

                <Close
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => { setproposalPopup(false) }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '10px' }}>
                <p style={{
                  fontFamily: "Inter",
                  fontSize: "20px",
                  fontWeight: 700,
                  lineHeight: "30px",
                  textAlign: "center",
                  padding: '30px 20px',
                  margin: 0,
                  color: "rgba(51, 51, 51, 1)",

                }}>
                  Proposal isn't accepted from Buyer<br /> Are you sure you want to mark complete?
                </p>
              </Box>

              <Box sx={{
                width: "100%",
                height: "auto",
                display: 'flex',
                flexDirection: "row",
                alignItems: 'center',
                padding: "12px 16px 12px 16px",
                borderTop: "0px solid rgba(224, 224, 224, 1)",
                justifyContent: "space-evenly",
                marginTop: '0px',
                boxShadow: " 0px 0px 14px 0px rgba(0, 0, 0, 0.07)"
              }} >
                <ZupotsuButton
                  name={"No, Cancel"}
                  variant={'contained'}
                  padding={"10px 40px"}
                  isCustomColors={true}
                  customOutlineColor="1px solid transparent"
                  customOutlineColorOnHover="1px solid transparent"
                  customBgColorOnhover="#fff"
                  customBgColor={"#fff"}
                  customTextColorOnHover="#E20B18"
                  customTextColor="#E20B18"
                  handleClick={
                    () => {
                      setproposalPopup(false)
                    }
                  }
                />
                <ZupotsuButton
                  name={"Yes, Mark Complete!!"}
                  variant={'contained'}
                  padding={"10px 40px"}
                  isCustomColors={true}
                  customOutlineColor="1px solid transparent"
                  customOutlineColorOnHover="1px solid transparent"
                  customBgColorOnhover="#E20B18"
                  customBgColor={"#E20B18"}
                  customTextColorOnHover="#FFF"
                  customTextColor="#FFF"
                  handleClick={
                    () => {
                      updateLeadStatus("Proposal", "Proposal")
                    }
                  }
                />
              </Box>
            </Box>
          </Modal>

          <Modal
            open={documentpopupOpen}
            onClose={() => { setDocumentpopupOpen(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: deviceType == "mobile" ? "80%" : "40%",
              bgcolor: 'background.paper',
              border: '0px solid #000',
              boxShadow: 8,
              borderRadius: 5,
              p: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'
            }}>
              <Box sx={{
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                width: '100%',
                height: '100%',
                padding: '10px'
              }} >
                <Box sx={{
                  width: "100%",
                  height: "auto",
                  display: 'flex',
                  flexDirection: "row",
                  padding: "8px 16px 8px 16px",
                  borderBottom: "1px solid rgba(224, 224, 224, 1)",
                  justifyContent: "space-between",
                }} >
                  <p style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "21px",
                    textAlign: "left",
                    padding: 0,
                    margin: 0,
                    color: "rgba(51, 51, 51, 1)"
                  }}>
                    Select Document
                  </p>

                  <Close
                    sx={{
                      cursor: 'pointer',
                    }}
                    onClick={() => { setDocumentpopupOpen(false) }}
                  />
                </Box>


                <Box sx={{
                  width: "100%",
                  display: 'flex',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "8px",
                  marginTop: '5px'
                }} >
                  <ZupotsuDropdown
                    title="Document Type"
                    placeholder={"Document Type"}
                    isRequired={true}
                    value={documentType}
                    dropdownData={documentTypes}
                    name={"documenttype"}
                    handleChange={(event: any) => {
                      setDocumentType(event.target.value)
                    }}
                  />

                </Box>


                <Box sx={{
                  width: "100%",
                  display: 'flex',
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  padding: "8px",
                  cursor: 'pointer',
                }} >

                  <Typography
                    style={{
                      marginBottom: '0px',
                      color: 'var(--Gray-1, #333)',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      lineHeight: '140%',
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
                          marginBottom: '10px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '14px',
                            lineHeight: "21px",
                            fontStyle: 'Inter',
                            fontWeight: '700',
                          }}
                        >{"Upload Document"}</span>
                        <span
                          style={{
                            color: 'var(--Zupotso-Primary, #E20B18)',
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: '140%',

                          }}
                        >
                          *
                        </span>
                      </div>

                    </div>

                  </Typography>

                  <TextField
                    rows={1}
                    size="small"
                    placeholder={"Browse"}
                    fullWidth
                    value={uploadDocument}
                    disabled={false}
                    name={'uploaddocument'}
                    id="fullWidth"
                    onClick={handleBrowseClick}
                    sx={{
                      color: "#000",
                      background: 'transparent',
                      cursor: "pointer"
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <img
                            src={documentUpload}
                            alt=""
                            style={{
                              width: '24px',
                              height: '24px',
                              cursor: 'pointer',
                            }}
                          />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none', cursor: 'pointer', }}
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />

                </Box>

                <div style={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', gap: '10px', marginTop: '5px' }}>
                  <hr style={{ margin: 0, padding: 0, flexGrow: 1, width: '30px' }} />
                  <span style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                  }}>or</span>
                  <hr style={{ margin: 0, padding: 0, flexGrow: 1, width: '30px' }} />
                </div>

                <Box sx={{
                  width: "100%",
                  display: 'flex',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "8px",
                  marginTop: '5px'
                }} >
                  <ZupotsuDropdown
                    title="Select Document"
                    placeholder={"Select Document"}
                    value={docName}
                    isRequired={true}
                    dropdownData={forms}
                    name={"form"}
                    handleChange={(event: any) => {
                      let doc: any = allpforms.filter((selPform: any) => {
                        return selPform.name.trim() == event.target.value?.split("-")?.[1].trim()
                      })
                      setFileData(doc[0]?.doc_url)
                      setdocName(event.target.value?.split("-")?.[1].trim().replaceAll(" ", "_") + ".pdf")
                      setUploadDocument("");
                      const fileSizeInKB = (+doc[0]?.file_size) / 1024;
                      const fileSizeInMB = (+doc[0]?.file_size) / (1024 * 1024);
                      const fileSize = fileSizeInMB > 1
                        ? `${fileSizeInMB.toFixed(2)} MB`
                        : `${fileSizeInKB.toFixed(2)} KB`;
                      setDocumentSize(fileSize);

                    }}
                  />
                </Box>
              </Box>

              <Box sx={{
                width: "100%",
                height: "auto",
                display: 'flex',
                flexDirection: "row",
                alignItems: 'center',
                padding: "8px 16px 8px 16px",
                borderTop: "1px solid rgba(224, 224, 224, 1)",
                justifyContent: "center",
                marginTop: '0px',
                boxShadow: " 0px 0px 14px 0px rgba(0, 0, 0, 0.07)"
              }} >
                <ZupotsuButton
                  name={"Submit"}
                  variant={'contained'}
                  padding={"10px 40px"}
                  isCustomColors={true}
                  disabled={documentType && (uploadDocument || docName) ? false : true}
                  customOutlineColor="1px solid transparent"
                  customOutlineColorOnHover="1px solid transparent"
                  customBgColorOnhover="#E20B18"
                  customBgColor={documentType && (uploadDocument || docName) ? "#E20B18" : "rgba(255,1,1,0.4)"}
                  customTextColorOnHover="#FFF"
                  customTextColor="#FFF"
                  load={load}
                  handleClick={
                    () => {
                      setLoad(true)
                      if (documentType && (uploadDocument || docName)) {
                        if (documentType == "Tripartriate Agreement") {
                          handleTripartriDocAdding()
                        } else {
                          docAdding()
                        }
                      } else {
                        setLoad(false)
                        setSnackbar({
                          open: true,
                          severity: 'error',
                          message: 'Please fill all the required details',
                        });
                      }
                    }
                  }
                />
              </Box>
            </Box>
          </Modal>


          <ForwardPopup forwardOpen={buyerforwardpopup} setforwardClose={setBuyerForwardPopup} selectedRole={selectedRole} id={sellerid} name={sellerName} forwardingChat={forwardingChat} sellerChatBoxId={sellerChatBoxId} buyerChatBoxId={buyerChatBoxId} isBuyerChatExist={isBuyerChatExist} isSellerChatExist={isSellerChatExist} chatUpdations={() => chatUpdations()} buyerid={buyerid} buyerorgid={buyerorgid} sellerid={sellerid} sellerorgid={sellerorgid} setForwardingChat={setForwardingChat} />

          <ForwardPopup forwardOpen={sellerforwardpopup} setforwardClose={setSellerForwardPopup} selectedRole={selectedRole} id={buyerid} name={buyerName} forwardingChat={forwardingChat} sellerChatBoxId={sellerChatBoxId} buyerChatBoxId={buyerChatBoxId} isBuyerChatExist={isBuyerChatExist} isSellerChatExist={isSellerChatExist} chatUpdations={() => chatUpdations()} buyerid={buyerid} buyerorgid={buyerorgid} sellerid={sellerid} sellerorgid={sellerorgid} setForwardingChat={setForwardingChat} />

          <InvoiceCompletion open={isInvoiceCompletion} close={() => setIsInvoiceCompletion(false)} />


        </div>

      </div >
    )
  }
}

export default Allleadproposaldetails

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
);

