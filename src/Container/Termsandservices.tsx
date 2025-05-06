import { Modal, Fade, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import { CloseIcon } from '../assets';
import CloseIcon from '@mui/icons-material/Close';
import { Close } from '@mui/icons-material';

type TermsandservicesProps = {
    shown: boolean;
    setShown: any;
    isFull?: boolean; // Optional
  };
  
  const Termsandservices: React.FC<TermsandservicesProps> = ({ shown, setShown, isFull }) => {
    // const [shown, setShown] = useState(false);

    const closeModal = () => setShown(false);

    const modalBody = () => (
        <div
            style={{
                backgroundColor: '#fff',
                position: 'fixed',
                width:isFull?"100%": 1200,
                maxWidth: '100%',
                padding: '20px',
                maxHeight: isFull?"100%":'80%',
                overflow: "hidden",
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "flex-start",
                fontFamily: 'Inter'
            }}
        >
            <div
                style={{
                    width: 1200,
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {' '}
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontFamily: 'Bebas Neue',
                    }}
                >
                    TERMS AND CONDITIONS
                </Typography>
               {!isFull&&( <Close
                    sx={{
                        cursor: 'pointer',
                    }}
                    onClick={closeModal}
                />)}
            </div>
            <div style={{ overflow: 'auto', }}>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>4a1bc911-9d56-4d64-a3f8-f4380ace3b09</title>
                <meta name="author" content="Sheena Khan" />
                <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                        __html:
                            '\n        * {margin:0; padding:0; text-indent:0;  font-family:"Inter"}\n  b { fontFamily :"14px"}       h1 { color: black; font-family:"Inter"; font-style: normal; font-weight: bold; text-decoration: none; font-size: 12pt; }\n         .p, p { color: black;  font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; margin:0pt; }\n         .a, a { color: black; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         .s2 { color: black; font-style: normal; font-weight: bold; text-decoration: none; font-size: 12pt; }\n         li {display: block; }\n         #l1 {padding-left: 0pt;counter-reset: c1 1; }\n         #l1> li>*:first-child:before {counter-increment: c1; content: counter(c1, decimal)". "; color: #050816; font-style: normal; font-weight: bold; text-decoration: none; font-size: 12pt; }\n         #l1> li:first-child>*:first-child:before {counter-increment: c1 0;  }\n         #l2 {padding-left: 0pt; }\n         #l2> li>*:first-child:before {content: "•     "; padding-left:"10px" color: black; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l3 {padding-left: 0pt; }\n         #l3> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l4 {padding-left: 0pt; }\n         #l4> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l5 {padding-left: 0pt; }\n         #l5> li>*:first-child:before {content: "o "; color: black; font-family:"Courier New", monospace; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l6 {padding-left: 0pt; }\n         #l6> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l7 {padding-left: 0pt; }\n         #l7> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l8 {padding-left: 0pt; }\n         #l8> li>*:first-child:before {content: "o "; color: black; font-family:"Courier New", monospace; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l9 {padding-left: 0pt; }\n         #l9> li>*:first-child:before {content: " "; color: black; font-family:Wingdings; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l10 {padding-left: 0pt; }\n         #l10> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l11 {padding-left: 0pt; }\n         #l11> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l12 {padding-left: 0pt; }\n         #l12> li>*:first-child:before {content: "o "; color: black; font-family:"Courier New", monospace; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l13 {padding-left: 0pt; }\n         #l13> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l14 {padding-left: 0pt; }\n         #l14> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l15 {padding-left: 0pt; }\n         #l15> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l16 {padding-left: 0pt; }\n         #l16> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l17 {padding-left: 0pt; }\n         #l17> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l18 {padding-left: 0pt; }\n         #l18> li>*:first-child:before {content: "•     "; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l19 {padding-left: 0pt; }\n         #l19> li>*:first-child:before {content: "•"; color: black; font-family:Symbol, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n         #l20 {padding-left: 0pt; }\n         #l20> li>*:first-child:before {content: "o "; color: black;  font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }\n    '
                    }}
                />
                <h1
                    style={{
                        paddingTop: "3pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        textAlign: "center"
                    }}
                >
                    END USER LICENSE AGREEMENT
                </h1>
                <h1
                    style={{
                        paddingTop: "7pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        textAlign: "center"
                    }}
                >
                    &amp;
                </h1>
                <h1
                    style={{
                        paddingTop: "7pt",
                        paddingLeft: "7pt",
                        textIndent: "0pt",
                        textAlign: "center"
                    }}
                >
                    GENERAL TERMS &amp; CONDITIONS
                </h1>
                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                    <br />
                </p>
                <h1 style={{ paddingLeft: "14pt", textIndent: "0pt", textAlign: "justify" }}>
                    Last Updated on September 11, 2024
                </h1>
                <p
                    style={{
                        paddingTop: "7pt",
                        paddingLeft: "14pt",
                        textIndent: "0pt",
                        textAlign: "justify"
                    }}
                >
                    This document is an electronic record in terms of the Information Technology
                    Act, 2000 (as may be amended, modified, re-enacted, consolidated or replaced
                    from time to time) and rules thereunder pertaining to electronic records as
                    applicable and amended from time to time, and is published in accordance
                    with the provisions of Rule 3 of the Information Technology (Intermediaries
                    guidelines and Digital Media Ethics Code) Rules, 2021 which mandates ZUPOTSU
                    (as defined below) as an intermediary to publish the terms and conditions
                    and other rules and regulations, for access or usage of the Platform (as
                    defined below). This document is generated by a computer system and does not
                    require any physical or electronic signature.
                </p>
                <ul id="l1">
                    <li data-list-text={1}>
                        <h1
                            style={{
                                paddingTop: "7pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            INTRODUCTION
                        </h1>
                        <p
                            style={{
                                paddingTop: "7pt",
                                paddingLeft: "14pt",
                                textIndent: "0pt",
                                textAlign: "justify"
                            }}
                        >
                            Welcome to the ZUPOTSU platform. The use of the terms ‘<b>ZUPOTSU</b>’,
                            ‘<b>We</b>’, ‘<b>Us</b>’, ‘<b>Our</b>’ in these Terms and Conditions of
                            Use (‘<b>Terms</b>
                            <a href="http://www.zupotsu.com/" className="a" target="_blank">
                                ’) shall refer to Amaltas Haat Private Limited, a company duly
                                organized under the laws in India, which is engaged in operating the
                                website located at{" "}
                            </a>
                            <span
                                style={{
                                    color: "black",
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    textDecoration: "underline",
                                    fontSize: "12pt"
                                }}
                            >
                                www.zupotsu.com
                            </span>{" "}
                            (‘<b>Website</b>’).
                        </p>
                        <p
                            style={{
                                paddingTop: "7pt",
                                paddingLeft: "14pt",
                                textIndent: "0pt",
                                textAlign: "justify"
                            }}
                        >
                            For the purpose of these Terms, wherever the context so requires, ‘
                            <b>You</b>’, ‘<b>Your</b>’, ‘<b>Yourself</b>’ and/or ‘<b>User(s)</b>’
                            (as further defined below) shall mean any natural or legal person(s) who
                            accesses or visits the Platform, uses, or avails the Services offered on
                            the Platform and registers or provides any information on the Platform,
                            irrespective of whether such person constitutes an individual, company
                            or other entity. Any titles or headings inserted in these Terms are for
                            convenience only and shall not affect the interpretation of the
                            provisions of the Terms.
                        </p>
                        <p
                            style={{
                                paddingTop: "8pt",
                                paddingLeft: "14pt",
                                textIndent: "0pt",
                                textAlign: "justify"
                            }}
                        >
                            Users acknowledge and understand that ZUPOTSU™ is the sole owner of the
                            Platform, and these Terms govern Your access and use of all features,
                            content, and other services that ZUPOTSU owns, controls and makes
                            available to User(s) through ZUPOTSU’s online Platform and any other
                            applications, tools, products, and services that ZUPOTSU may provide
                            from time to time on the Platform (collectively, ‘<b>Services</b>’ as
                            elaborated hereunder). By visiting or accessing the Platform,
                            registering and creating an Account on the Platform, using and availing
                            the Services available on the Platform, providing any information on the
                            Platform, and otherwise making use of the Platform, whether impliedly or
                            expressly, You acknowledge and accept these Terms and enter into a
                            binding contract with ZUPOTSU.
                        </p>
                        <p
                            style={{
                                paddingTop: "8pt",
                                paddingLeft: "14pt",
                                textIndent: "0pt",
                                textAlign: "justify"
                            }}
                        >
                            ZUPOTSU encourages and advises all Users to read and understand these
                            Terms prior to making use of the Platform and the Services. Your use of,
                            and access to, the Platform and Services is subject to these Terms. Any
                            usage of the Platform or Services in any manner whatsoever shall be
                            governed by these Terms read with the privacy policy published on the
                            Platform (‘<b>Privacy Policy</b>’) along with any other applicable terms
                            or policy which may be published on the Platform or any applicable
                            agreement which may be concluded between ZUPOTSU and User (collectively
                            ‘<b>Policies</b>’) which shall together make up the collective agreement
                            between the User and the Company.
                        </p>
                        <p
                            style={{
                                paddingTop: "3pt",
                                paddingLeft: "14pt",
                                textIndent: "0pt",
                                textAlign: "justify"
                            }}
                        >
                            User(s) acknowledge and accept that the User(s) shall be subject to and
                            bound by the same, regardless of how the Users, or anyone on the User’s
                            behalf, has accessed or used the Platform or Services. If the User does
                            not want to be bound by the Terms, they must not retain, access and/or
                            use the Platform or Services in any manner whatsoever. Anything done,
                            caused to be done, whether expressly or impliedly, in contravention of
                            these Terms, may render the User liable for legal action.
                        </p>
                    </li>
                    <li data-list-text={2}>
                        <h1
                            style={{
                                paddingTop: "7pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            DEFINITIONS
                        </h1>
                        <p
                            style={{
                                paddingTop: "7pt",
                                paddingLeft: "14pt",
                                textIndent: "0pt",
                                textAlign: "justify"
                            }}
                        >
                            For the purposes of these Terms, in addition to any words, expressions
                            or terms expressly defined in the introduction and in the text of these
                            Terms, any references to the following terms, words and expressions,
                            wherever used in these Terms, unless repugnant to the meaning or context
                            thereof, shall have the following meanings:
                        </p>
                        <ul id="l2">
                            <li >
                                <p
                                    style={{
                                        paddingTop: "8pt",
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    {" "}
                                    ‘<b>Applicable Law(s)</b>’ shall mean the applicable laws, statute,
                                    rule, regulation, ordinance, guideline, by-law, or subordinate
                                    legislation of India as well as all amendments to the same which
                                    come into force from time to time;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>Asset(s)</b>’ shall mean the sports marketing assets including
                                    sports athletes, sports personalities, sports teams, tournaments,
                                    organizations and/or other sports related entities, content,
                                    properties or technology solutions that are owned, managed or
                                    controlled by Seller(s) which may be listed on the Catalogue by
                                    Seller(s) in accordance with these Terms;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>Business Partner(s)</b>’ shall mean any natural and legal
                                    person(s) with which ZUPOTSU has a business arrangement or
                                    collaboration with under a definitive agreement, in relation to the
                                    functioning of the Platform and its Services, such as for
                                    facilitating, providing and/or delivering certain functionalities on
                                    the Platform including any features or aspects of any Services
                                    provided to User(s) on the Platform;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>Buyer(s)’ </b>shall mean any User(s) registered on the Platform
                                    which accesses or uses the Platform to browse, review, select, and
                                    purchase Opportunities (as defined below) listed by Seller(s) on the
                                    Platform, including by engaging with Seller(s) to leverage the
                                    Assets (as defined below) made available by Seller for various
                                    promotional and marketing purposes and/or to transact on the
                                    Platform to acquire services, rights, or any other Opportunities
                                    related to any such Assets for their brand or business or any other
                                    purpose. It is clarified that reference to the term “Buyer” in these
                                    Terms shall include reference to an Agent (as defined below)
                                    representing or acting on behalf of any Buyer(s);
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘Catalogue’{" "}
                                    <span className="p">
                                        shall mean the virtual catalogue hosted on the Platform, which
                                        displays the Asset(s) listed by Seller(s) along with the
                                        corresponding Content (as defined below) concerning Opportunities
                                        associated with each such Asset(s) for the Buyer(s) to review,
                                        select and purchase in accordance with these Terms;
                                    </span>
                                </h1>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>Content</b>’ shall mean any information, materials and content,
                                    including but not limited to information and content in the form of
                                    images, videos, text, or any other media (as may be applicable)
                                    which is provided by User to ZUPOTSU for display and use in
                                    connection with the Opportunities/Assets listed on the Platform in
                                    accordance with these Terms, including Content submitted for upload
                                    on the Catalogue;
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘Opportunities’{" "}
                                    <span className="p">
                                        shall mean any marketing services, sponsorships, endorsements,
                                        advertising rights, promotional collaborations, or other
                                        commercial engagements listed and offered by the Sellers (as
                                        defined below) in the Catalogue on the Platform in relation to
                                        specific Asset(s);
                                    </span>
                                </h1>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>Minor</b>’ shall mean a child or person below the age of
                                    majority in the legal jurisdiction in which he/she is based, who is
                                    not eligible to create or register an Account (as defined below) on
                                    the Platform and/or avail any of the Services;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>Platform</b>’ shall mean the Website defined herein above and
                                    include any other digital platforms of ZUPOTSU on or through which
                                    the Services are made available by ZUPOTSU;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>Seller(s)’ </b>shall mean any User(s) registered on the Platform
                                    which lists the Asset(s) in the Catalogue in the manner detailed
                                    herein and offers Opportunities in relation thereto on ZUPOTSU’s
                                    Platform for purchase to Buyers. It is clarified that reference to
                                    the term “Seller” in these Terms shall also include reference to an
                                    Agent (as defined below) representing or acting on behalf of any
                                    Seller(s) or the Asset(s);
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>Services</b>’ shall refer to the services including resources,
                                    tools, functionalities, and other facilities which are made
                                    available to User(s) through the Platform by ZUPOTSU upon
                                    registration of an Account on the Platform by a User. These include
                                    the services elaborated in these Terms as well as any other tools,
                                    functionalities, and services that ZUPOTSU may provide or make
                                    available on the Platform from time to time;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    “<b>User(s)</b>’,‘<b>You</b>’, ‘<b>Your</b>’, ‘<b>Yourself</b>’
                                    shall mean a person, who has validly signed up/registered on the
                                    Platform as either a Buyer or Seller (as may be applicable)
                                    themselves or via a Zupotsu designated representative and/or avails
                                    the Services provided by the Platform and/or has access to/uses the
                                    features and functionalities of the Platform and who in connection
                                    with the Platform and the Services may access or avail, share,
                                    transact, view, display, download or upload any information on the
                                    Platform and include the person(s) referred to under clause 1 above;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>User Information</b>’ shall mean information relating to a User
                                    and the User’s Account, including the personal information and/or
                                    other data and information mentioned in Our Privacy Policy. User
                                    Information may be required to be provided by User(s) to ZUPOTSU at
                                    the time of registering an Account (such as under the registration
                                    form required to be filled out by the User) and/or subsequent to the
                                    time of registration (such as at the time the User avails any
                                    Services on the Platform). User Information includes any
                                    User-related information for which a written request may be
                                    communicated to the User by ZUPOTSU at any time in relation to the
                                    User(s) use of the Platform;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ‘<b>Agent(s)</b>’ shall mean any agent(s) who are authorized to
                                    represent any Buyer(s) or Seller(s) (as the case may be) which may
                                    access the Platform on behalf of such Buyer and Seller;
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={3}>
                        <h1
                            style={{
                                paddingTop: "12pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            ACCEPTANCE OF TERMS AND GENERAL CONDITIONS
                        </h1>
                        <ul id="l3">
                            <li >
                                <p
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    {" "}
                                    By using the Platform in any manner (such as through registering an
                                    Account, accessing the Website and/or using or accessing any of the
                                    Services), You declare that You have read, understood, and accepted
                                    the provisions of these Terms in full and hereby agree to comply
                                    with, and be bound by, the Terms. You hereby agree to be bound by
                                    these Terms in respect of such use of the Platform and to be liable
                                    for all activities conducted through Your Account on the Platform.
                                    If You do not agree to the provisions of these Terms, You must not
                                    register an account, access, use the Platform in any manner such as
                                    by receiving any of the Services.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    To be eligible for registration on the Platform, Users must be of
                                    legal age to form a binding contract and should not be barred from
                                    receiving Services under the laws of the applicable jurisdictions in
                                    which the User resides. By registering, You represent that you are a
                                    person of legal age to form a binding contract in India and are thus
                                    not a person barred from receiving Services. For avoidance of doubt,
                                    Minors (being persons less than eighteen years of age in India) are
                                    not eligible to register on the Platform and avail the Services.
                                    Your agreement to these Terms shall indicate that You have the
                                    right, authority, and legal capacity to agree to the Terms and that
                                    You have read, understood, and agree to be bound by the same.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    We reserve the right, at Our sole discretion, to change, modify,
                                    add, or remove portions of these Terms and applicable Policies, at
                                    any time without any prior written notice to You. You acknowledge
                                    and accept that these Terms and Policies may be amended from time to
                                    time and such amendments will become effective and binding on You,
                                    from the date of announcement or communication of the amendment on
                                    the Platform. Your continued use of the Platform (and its Services)
                                    after such notice confirms Your consent to and acceptance of such
                                    amendments. It is Your responsibility to review these Terms and any
                                    Platform Policies periodically for updates/changes, therefore, You
                                    are encouraged to revisit the Platform to be updated as regards any
                                    amendments.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Feedback.{" "}
                                    <a href="mailto:legal@zupotsu.com" className="a" target="_blank">
                                        Please contact ZUPOTSU at{" "}
                                    </a>
                                    <span className="p">
                                        legal@zupotsu.com in case You have any questions or doubts
                                        pertaining to the ZUPOTSU’s Services and/or the Platform, or if
                                        You wish to share Your suggestions/improvements, experience,
                                        comments and requests as regards the same (collectively “
                                    </span>
                                    Feedback<span className="p">”).</span>
                                </h1>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ZUPOTSU welcomes any Feedback the User(s) might have on the Platform
                                    and Services provided, You acknowledge and accept that; the Feedback
                                    You may provide regarding ZUPOTSU, and/or the Services is entirely
                                    voluntary and ZUPOTSU will be free to use such Feedback as ZUPOTSU
                                    see fit and without any obligation to You; ZUPOTSU shall not be
                                    subject to any obligation of confidentiality in relation to any
                                    submitted Feedback; and ZUPOTSU shall not be liable in any way for
                                    any delay in responding to any Feedback forwarded by You. If You
                                    provide Feedback, You represent to ZUPOTSU that Your Feedback does
                                    not violate the rights of any person and/or third party. Further,
                                    You grant ZUPOTSU a worldwide, non-exclusive, royalty-free,
                                    perpetual, irrevocable, transferable, and fully sub-licensable right
                                    to use, reproduce, publish, distribute, publicly display, publicly
                                    perform, translate, adapt, modify, telecommunicate, rent out,
                                    commercialize, monetize, and create derivative works from the
                                    Feedback in any way and for any purpose without providing any
                                    compensation to You or any other person. You also grant ZUPOTSU
                                </p>
                                <p
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "0pt",
                                        textAlign: "left"
                                    }}
                                >
                                    the right to use the Credentials (as defined hereinafter) and other
                                    details You submit with the Feedback (if any) in connection with
                                    ZUPOTSU’s rights hereunder.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    In case You have any complaint or grievances in respect of any
                                    content or Services provided on the Platform or any breach of Our
                                    Terms, Privacy Policy or any other policy published on the Platform
                                    (‘<b>Grievance</b>’), please contact ZUPOTSU’s Grievance Officer (as
                                    defined below) in accordance with these Terms.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={4}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            REGISTRATION AND USE OF SERVICES
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l4">
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Registration and Verification of Account
                                    <span className="p">
                                        . To enable Your access and use of the Services available on the
                                        Platform, You are obligated to register on the Platform using Your
                                        contact information (including Your name, name of Your
                                        organization, Your e-mail address and mobile number) (the ‘
                                    </span>
                                    User ID<span className="p">’ or ‘</span>Credentials
                                    <span className="p">
                                        ’) by providing ZUPOTSU with the User Information and following
                                        the registration process enabled on the Platform, as also
                                        mentioned herein. Users may opt to register on the Platform as
                                        either Buyer(s) or Seller(s). Upon successful registration of a
                                        User on the Platform, the User becomes entitled to an exclusive
                                        virtual account with which the User can browse and avail the
                                        Services that may be offered or made available to the Users of the
                                        Platform by ZUPOTSU and/or through its Business Partners (‘
                                    </span>
                                    Account
                                    <span className="p">
                                        ’). You may only register and use a single Account with Us and may
                                        not use or access multiple Accounts on the Platform.
                                    </span>
                                </h1>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Subscription Fee
                                    <span className="p">
                                        : ZUPOTSU may from time-to-time review and revise the commercial
                                        and subscription terms for User(s) to access its Platform,
                                        including by offering free-tier access as well as subscription fee
                                        based paid plans at its discretion. Users are obligated to accept
                                        any changes in the packages and plans offered by ZUPOTSU and can
                                        select relevant tier from packages and plans made available.
                                    </span>
                                </h1>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Following the completion of the registration process, subject to
                                    appropriate verification process(es) undertaken by ZUPOTSU in its
                                    sole discretion, an acknowledgement of the activation of Your
                                    Account shall be communicated from ZUPOTSU to one or more of the
                                    contact details (e-mail address or mobile number) provided by You on
                                    the Platform. ZUPOTSU is not obliged to verify the User Information,
                                    the identity or authority of a person using your account or User
                                    Credentials, but ZUPOTSU may, in its sole and absolute discretion,
                                    at any time request Users for any information as it may require for
                                    verification of the identity of the User or to verify that the User
                                    is using the Platform / availing the Services in conformity with
                                    these Terms. If ZUPOTSU has reason to suspect that any Minor or any
                                    other User is making use of the Platform in a manner not permitted
                                    in these Terms, ZUPOTSU reserves the right to request further
                                    information from the relevant Account User under suspicion for the
                                    purpose of verification that such User and the User’s Account is
                                    compliant with the Terms, in the manner mentioned herein at its sole
                                    discretion. If ZUPOTSU finds that a relevant User / User Account is
                                    not in compliance with the Terms in any way, ZUPOTSU further
                                    reserves the right to take suitable action against such User in the
                                    manner mentioned herein as it may deem fit at its sole discretion.
                                    ZUPOTSU takes no responsibility in case any User does not provide
                                    their accurate Credentials or User Information for accessing the
                                    Platform. It is clarified that ZUPOTSU may from time-to- time review
                                    and revise the account opening process (including pre-verification
                                    of accounts
                                </p>
                                <p
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "0pt",
                                        textAlign: "left"
                                    }}
                                >
                                    before activation as well as a periodic review of account activity)
                                    and has full rights to reject an account opening request with or
                                    without cause in accordance with these Terms.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    User Information.{" "}
                                    <span className="p">
                                        Your User Information, including Your User ID, as made available
                                        to Us, is treated as Your primary identification on the Platform.
                                        It is re-iterated that it is Your responsibility to ensure that
                                        the User Information provided on the Platform is valid and remains
                                        updated at all times. ZUPOTSU is not liable for non-rendering of
                                        requested Services or any other default arising owing to any
                                        incorrect or invalid information that is reflected/uploaded on
                                        Your Account in any way. You acknowledge and agree that We may
                                        share User Information or any other information in Our control or
                                        possession with (i) appropriate authorities for the purpose of
                                        verification of identity or for the prevention, detection,
                                        investigation or prosecution of offences under any law for the
                                        time being or for cyber security incidents; (ii) with Business
                                        Partners and third parties for the purposes and in the manner
                                        elaborated in Our Privacy Policy. Further, We may preserve such
                                        information and associated records as maybe required for
                                        evidentiary and investigation purposes for a statutorily
                                        prescribed period.
                                    </span>
                                </h1>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Services
                                    <span className="p">
                                        . Our Platform and Services facilitate and enable Buyers to
                                        enquire about, discuss, and finalize transactions with Sellers in
                                        relation to several Opportunities associated with the various
                                        Assets. Content and relevant details associated with particular
                                        Opportunities and Assets listed and made available through the
                                        Platform's Catalogue facility. Seller(s) and their Agent(s) may
                                        add new listings (Assets &amp; Opportunities), however ZUPOTSU
                                        owns the final description on the publishing of these Assets &amp;
                                        Opportunities in the Catalogue in accordance with terms in clause
                                        8 of the Terms. ZUPOTSU may from time to time review the Catalogue
                                        and remove any listing with or without cause in accordance with
                                        these Terms.
                                    </span>
                                </h1>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Upon registration, Users are eligible to avail Services on the
                                    Platform subject to these Terms and the Policies. Subject to whether
                                    the User has registered on the Platform as a Buyer or Seller, the
                                    Services offered to Users on the Platform shall differ in the manner
                                    elaborated herein.
                                </p>
                                <ul id="l5">
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "13pt",
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            In the event a User has registered as a Seller, the relevant
                                            User may list, promote and offer Opportunities in relation to
                                            applicable Assets in the Catalogue hosted on the Platform and
                                            may interact with potential Buyers (who are interested in
                                            availing any Opportunities) subject to these Terms and the
                                            Policies. Sellers may share Content for upload on the Platform
                                            in connection with the Opportunities with ZUPOTSU strictly in
                                            accordance with the Policies, including the specific obligations
                                            for Sellers set out herein below.
                                        </p>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "13pt",
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            In the event the User has registered as Buyer, the User may
                                            peruse and discover listed Opportunities therein in relation to
                                            Assets in the Catalogue hosted on the Platform, connect with
                                            Sellers and enter into transactions with Sellers to avail the
                                            Opportunities subject to these Terms and the Policies. Buyers
                                            may access the Catalogue (including the Content featured in the
                                            Catalogue) strictly in accordance with the Policies, including
                                            the specific obligations for Buyers set out herein below.
                                        </p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={5}>
                        <h1
                            style={{
                                paddingTop: "12pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            TRANSACTION TERMS
                        </h1>
                        <ul id="l6">
                            <li >
                                <h1
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Purchase
                                    <span className="p">
                                        . Buyers and Sellers shall have discretion to enter into and
                                        conclude transactions for purchase of Opportunities listed on the
                                        Catalogue available on the Platform on terms mutually agreeable to
                                        them. To this end, the engagement fee towards the Opportunities
                                        may be made available by Seller(s). If the Seller opts to make the
                                        fee available, this will be displayed on the Platform for the
                                        Buyer(s) to view. It is clarified that any prices displayed on Our
                                        Platform shall be based on information provided by Seller(s). We
                                        shall not be liable in relation to any errors or changes in the
                                        sale prices displayed on the Platform. The final engagement fee
                                        charged by the Seller from the Buyer shall be agreed solely by
                                        both parties and ZUPOTSU shall only be responsible for the
                                        communication of such fee during this process. Users (both Buyers
                                        and Sellers) shall intimate ZUPOTSU in writing as regards any
                                        purchase agreed between them in connection with the Opportunities.
                                        Further, Users (both Buyers and Sellers) shall document the terms
                                        of any transaction (for purchase of Opportunities) as may be
                                        agreed between them under a written agreement. To suitably
                                        document the agreed terms of their transaction, Buyers and Sellers
                                        may opt to use the (customizable) master agreement template (‘
                                    </span>
                                    Template
                                    <span className="p">
                                        ’) made available on the Platform by ZUPOTSU. The written
                                        agreement signed between the Buyer and Seller (documenting the
                                        terms of their transaction) (‘
                                    </span>
                                    Purchase Agreement
                                    <span className="p">
                                        ’) shall be promptly submitted to ZUPOTSU in the manner enabled on
                                        the Platform or otherwise communicated by ZUPOTSU. For the
                                        avoidance of doubt, ZUPOTSU shall not be liable in any manner
                                        whatsoever to any User (either Buyer or Seller) for any claims,
                                        defaults or disputes arising in relation to any purchase agreed
                                        between Users in connection with the Opportunities. You shall be
                                        solely liable in the event any claims, disputes or defaults should
                                        arise in relation to the purchase concluded (or proposed to be
                                        concluded) by You with another User (in the capacity of a
                                        Buyer/Seller, as may be applicable), including any default in
                                        obligations documented under Your Purchase Agreement.
                                    </span>
                                </h1>
                                <p
                                    style={{ paddingTop: "1pt", textIndent: "0pt", textAlign: "left" }}
                                >
                                    <br />
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Transaction Fee
                                    <span className="p">
                                        . You acknowledge and accept that ZUPOTSU may charge a transaction
                                        fee for each particular purchase/transaction (in relation to the
                                        Opportunities listed on the Platform) successfully concluded
                                        between Buyer(s) and Seller(s) by making use of the Platform’s
                                        Services in accordance with these Terms. Further, ZUPOTSU shall be
                                        entitled to determine the applicable rate of transaction fee
                                        levied for a particular purchase/transaction in line with the
                                        Policies (including these Terms and any other agreement concluded
                                        between the User and ZUPOTSU). The applicable transaction fee
                                        shall be communicated clearly by ZUPOTSU to the Seller prior to
                                        the conclusion of the Purchase Agreement between Buyer and Seller
                                        in accordance with these Terms.
                                    </span>
                                </h1>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Invoicing &amp; Payment
                                    <span className="p">
                                        . The invoicing approach with respect to any such transaction
                                        shall be using the Gross Merchandise Value (GMV) approach unless
                                        We expressly specify otherwise. The use of Net Transaction Fee
                                        method shall be agreed by ZUPOTSU, Buyer &amp; Seller only on a
                                        case to case basis. Once a purchase/transaction (for any of the
                                        Opportunities) is finalized between relevant Users, the Buyer
                                        shall be liable to pay the due sale price (as may be indicated) to
                                        the Seller or ZUPOTSU as per the agreed schedule and terms for the
                                        same. Unless specifically agreed otherwise, ZUPOTSU shall bill the
                                        Buyer for the due amount of the purchase/transaction (on behalf of
                                        the Seller) as well as for the due transaction fee. Upon billing
                                        and collecting the due amounts from the Buyer, ZUPOTSU shall
                                        deduct and retain the transaction fee, and transfer the balance
                                        amount to the Seller. For the avoidance of doubt, it is
                                        re-iterated that the relevant sale price (as may
                                    </span>
                                </h1>
                                <p
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "0pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    be applicable) is payable by Buyer(s) to Seller(s), and ZUPOTSU only
                                    acts as a limited collection agent on behalf of the Seller to
                                    collect and transfer the amounts due to them. It is further
                                    re-iterated that ZUPOTSU shall determine and communicate the details
                                    of the applicable payments and payment terms/methods to the Buyer in
                                    line with the Policies (including these Terms and any other
                                    agreement concluded between the User and ZUPOTSU). You acknowledge
                                    and accept that such payments and payment methods may be subject to
                                    additional terms, conditions, or processing fees as specified in the
                                    Policies or communicated to You by ZUPOTSU.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    It is re-iterated that You are solely responsible for all charges
                                    and usage associated with your Account concerning the purchases made
                                    by you or anyone that uses your Account, including applicable taxes.
                                    ZUPOTSU shall not be liable for any costs incurred by the User for
                                    any third-party expenses or other expenditures arising out of or in
                                    connection with any purchase/transaction on the Platform. When you
                                    provide any User Information to ZUPOTSU or share any details for the
                                    purpose of payment, You represent and warrant that You are the
                                    legally authorized user of the relevant payment method and are
                                    providing current, complete, and accurate information.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Refund.{" "}
                                    <span className="p">
                                        Users are advised to review these Terms and the Policies prior to
                                        availing the Services and making purchases on the Platform. All
                                        monies paid to ZUPOTSU by the User(s) as or subscription fee or
                                        transaction fee on consummated transactions are final and
                                        non-refundable. Unless specifically agreed by ZUPOTSU in writing,
                                        ZUPOTSU shall not be liable to process the refund of any paid
                                        amount to any User in the event of any unsatisfactory Services. We
                                        may, at our sole and absolute discretion, issue refunds to the
                                        User in certain exceptional circumstances involving Our gross
                                        technical failure in rendering the Services. For avoidance of
                                        doubt, it is re-iterated that We are not liable for any
                                        purchases/transactions consummated by You with other Users using
                                        Our Services. Any claims/disputes regarding refunds in relation to
                                        such purchases/transactions shall be resolved directly between the
                                        parties involved.
                                    </span>
                                </h1>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={6}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            USER CONDUCT, REPRESENTATIONS AND RESPONSIBILITIES
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l7">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    By using the Platform in any manner (such as through registering an
                                    Account, accessing the Website and/or using or accessing any of the
                                    Services), You represent and warrant to ZUPOTSU that You:
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    are not a Minor and are of legal age under the Applicable Law and
                                    have the legal right, capacity, and power to accept the provisions
                                    of these Terms with ZUPOTSU in accordance with the Applicable Law;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    have read, understood, and agree at all times to abide by the
                                    provisions of these Terms as well as any other Policies published on
                                    the Platform which are binding and enforceable against You and will
                                    revisit the Platform, from time to time, to review any updates and
                                    amendments to such policies, these Terms and any other Policies as
                                    may be published or updated on the Platform from time;
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    are solely and entirely responsible for any activity, including any
                                    act or omission, that occurs on or through Your Account. This
                                    includes the responsibility of providing correct,
                                </p>
                                <p
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "0pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    valid, complete, accurate and up-to-date User Information at the
                                    time of registering an Account and at any time required thereafter
                                    and ensuring that the User Information is provided, maintained, and
                                    updated regularly as and when necessary, in accordance with the
                                    Terms. This further includes the responsibility to maintain control
                                    over, and security of, Your Account, such as by not disclosing Your
                                    User ID, not sharing Your Account, or allowing anyone other than
                                    Yourself to access Your Account and avail Services accessible under
                                    Your Account; and
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    are qualified to register an Account, access, and use the Platform
                                    and Services and meet all requirements under these Terms read
                                    together with the applicable Policies published on the Platform (as
                                    may be updated from time to time).
                                </p>
                                <ul id="l8">
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "13pt",
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            Each User acknowledges and accepts that if the relevant User
                                            provides any information that is untrue, inaccurate, not current
                                            or incomplete as part of the User Information, and/or We have
                                            reasonable grounds to suspect that any information provided by
                                            the relevant User is untrue, inaccurate, not current or
                                            incomplete, or not in accordance with these Terms, We have the
                                            right, at Our sole discretion, to (i) request You to promptly
                                            update or correct such User Information; and/or
                                        </p>
                                        <p
                                            style={{
                                                paddingLeft: "86pt",
                                                textIndent: "0pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            (ii) immediately and indefinitely suspend Your Account, block
                                            Your access to the Platform, terminate and/or delete Your
                                            Account and/or refuse to provide any current or future Services
                                            to You, as may be offered on the Platform. If ZUPOTSU is not
                                            satisfied with such verification or discovers any non-compliance
                                            by a User, ZUPOTSU reserves the right to take suitable action
                                            against the User in accordance with these Terms, including but
                                            not limited to refusing the registration of an Account by such
                                            User, or cancelling such User’s Account, or taking suitable
                                            legal action under the Applicable Law, in its sole discretion.
                                        </p>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "13pt",
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            You are solely responsible for security of Your Account, and
                                            ensuring that Your Credentials are not compromised, shared with
                                            anyone, or mishandled. Any loss resulting from the unauthorized
                                            use of Your Credentials is Your responsibility alone. If You
                                            suspect that an unauthorized person has become aware of Your
                                            User Credentials, You must change Your User Credentials
                                            forthwith, and immediately contact ZUPOTSU for assistance. You
                                            are further responsible for ensuring Your compliance under the
                                            Terms or any other applicable Policies of the Platform,
                                            including maintaining the security and confidentiality of Your
                                            Account and User Information, and Your activity on the Platform,
                                            including all and any activities that take place in, or occur
                                            under, or are associated with Your Account, and any consequences
                                            thereof. User(s) acknowledge and accept that the
                                            Account/Services shall not be used for any purposes which are
                                            prohibited under the Applicable Law, the Terms, or any other
                                            applicable Policies of the Platform. ZUPOTSU shall not be liable
                                            for any repercussions, legal or otherwise, including loss or
                                            damage arising from a User(s) failure to comply with the same.
                                            ZUPOTSU shall not be responsible for any unauthorized use of
                                            Your Account in any manner whatsoever.
                                        </p>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "13pt",
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                lineHeight: "91%",
                                                textAlign: "justify"
                                            }}
                                        >
                                            You agree that You shall not upload or share any information or
                                            content (including the Content) on the Platform and/or through
                                            use of Our Services that:
                                        </p>
                                        <ul id="l9">
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "4pt",
                                                        paddingLeft: "122pt",
                                                        textIndent: "-18pt",
                                                        textAlign: "justify"
                                                    }}
                                                >
                                                    belongs to another person and to which the User does not
                                                    have any right to under the Applicable Law;
                                                </p>
                                            </li>
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "13pt",
                                                        paddingLeft: "122pt",
                                                        textIndent: "-18pt",
                                                        textAlign: "justify"
                                                    }}
                                                >
                                                    is false, misleading, fraudulent, defamatory, obscene,
                                                    pornographic, pedophilic, invasive of another's privacy,
                                                    including bodily privacy, insulting or harassing on the
                                                    basis of gender, libelous, racially or ethnically
                                                    objectionable, relating or encouraging money laundering or
                                                    gambling or an online game that causes user harm, or
                                                    promoting enmity between different groups on the grounds of
                                                    religion or caste with the intent to incite violence, or
                                                    otherwise inconsistent with or contrary to the laws in
                                                    force;
                                                </p>
                                            </li>
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "13pt",
                                                        paddingLeft: "125pt",
                                                        textIndent: "-20pt",
                                                        textAlign: "left"
                                                    }}
                                                >
                                                    is harmful or has a detrimental effect upon children /
                                                    Minors in any way;
                                                </p>
                                            </li>
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "13pt",
                                                        paddingLeft: "122pt",
                                                        textIndent: "-18pt",
                                                        textAlign: "justify"
                                                    }}
                                                >
                                                    infringes any patent, trademark, copyright or other
                                                    intellectual property and proprietary rights of any natural
                                                    or legal person under the Applicable Law;
                                                </p>
                                            </li>
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "13pt",
                                                        paddingLeft: "122pt",
                                                        textIndent: "-18pt",
                                                        textAlign: "justify"
                                                    }}
                                                >
                                                    deceives or misleads the addressee about the origin of the
                                                    message or knowingly and intentionally communicates any
                                                    misinformation or information which is patently false and
                                                    untrue or misleading in nature, or, which in respect of any
                                                    business of the Indian Government, is identified as fake or
                                                    false or misleading by the
                                                </p>
                                            </li>
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "13pt",
                                                        paddingLeft: "122pt",
                                                        textIndent: "-17pt",
                                                        textAlign: "left"
                                                    }}
                                                >
                                                    impersonate another person or use an anonymous proxy;
                                                </p>
                                            </li>
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "13pt",
                                                        paddingLeft: "122pt",
                                                        textIndent: "-18pt",
                                                        textAlign: "justify"
                                                    }}
                                                >
                                                    threatens the unity, integrity, defense, security or
                                                    sovereignty of India, friendly relations with foreign
                                                    nations, or public order, or causes incitement to the
                                                    commission of any cognizable offence or prevents
                                                    investigation of any offence or is insulting other nations;
                                                </p>
                                            </li>
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "13pt",
                                                        paddingLeft: "122pt",
                                                        textIndent: "-18pt",
                                                        textAlign: "justify"
                                                    }}
                                                >
                                                    contains software viruses or any other computer code, files
                                                    or programs designed to interrupt, destroy or limit the
                                                    functionality of any computer resource;
                                                </p>
                                            </li>
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "13pt",
                                                        paddingLeft: "122pt",
                                                        textIndent: "-18pt",
                                                        textAlign: "justify"
                                                    }}
                                                >
                                                    is in the nature of an online game which is subject to
                                                    prohibition under prevailing Applicable Law or order of any
                                                    competent authorities in India or is in the nature of
                                                    advertisement or surrogate advertisement or promotion of
                                                    such an online game or of any online gaming platform
                                                    offering such an online game; and/or
                                                </p>
                                            </li>
                                            <li data-list-text="">
                                                <p
                                                    style={{
                                                        paddingTop: "13pt",
                                                        paddingLeft: "122pt",
                                                        textIndent: "-18pt",
                                                        textAlign: "justify"
                                                    }}
                                                >
                                                    {" "}
                                                    violates any law for the time being in force or may give
                                                    rise to any liability on part of ZUPOTSU or cause ZUPOTSU
                                                    any hindrance (in whole or in part).
                                                </p>
                                            </li>
                                        </ul>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "13pt",
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            We do not publish and We do not permit Our Users to publish any
                                            unlawful content or information (including the Content) which is
                                            prohibited under these Terms or Policies or any law for the time
                                            being in force, including any information which is or is likely
                                            to be perceived as being harmful to interest of sovereignty and
                                            integrity of any country, security of India, friendly relations
                                            with foreign states, public order,
                                        </p>
                                        <p
                                            style={{
                                                paddingTop: "4pt",
                                                paddingLeft: "86pt",
                                                textIndent: "0pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            decency or morality, amounts to contempt of court, defamation,
                                            incitement to an offence etc. Upon actual knowledge that any
                                            such information or content has been provided on the Platform,
                                            We shall have the right to promptly remove the same. Further, in
                                            such case and in any other case of any violation of these Terms,
                                            We have the right to take appropriate action against the User at
                                            Our discretion in accordance with the law.
                                        </p>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "13pt",
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                lineHeight: "94%",
                                                textAlign: "justify"
                                            }}
                                        >
                                            Your access and use of Our Platform and Services shall be
                                            strictly undertaken in compliance with these Terms and Policies.
                                            Any violation of Applicable Laws or these Terms and Policies by
                                            User(s) may result in immediate suspension or termination of the
                                            Your Account by ZUPOTSU in accordance with these Terms.
                                        </p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={7}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            TERMS AND OBLIGATIONS FOR BUYERS
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l10">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    The Opportunities/Assets listed on the Platform by Sellers are
                                    owned, controlled and facilitated by the concerned Seller(s). Save
                                    and except for the limited consents and permissions granted to
                                    ZUPOTSU under these Terms and Policies, all rights (including
                                    intellectual property rights) in and to the Content made available
                                    in connection with such Opportunities/Assets are owned and
                                    controlled by the relevant Seller(s).
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ZUPOTSU shall not be liable for any claims, liabilities, damages,
                                    losses, and expenses arising out of or related to any Buyers
                                    transaction with a Seller. The Buyer shall be solely liable for any
                                    purchase/transaction concluded between the concerned Buyer and a
                                    Seller using the Platform’s Services, including for acquisition of
                                    appropriate rights and permissions in respect of any
                                    Opportunities/Assets (and associated Content) which are the subject
                                    matter of the purchase/transaction from the Seller and for making
                                    payment to the Seller.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Buyers are advised to ensure the terms of the Purchase Agreement
                                    signed between the Buyer and Seller appropriately document the
                                    understanding as regards the rights acquired by Buyer from Seller
                                    pursuant to any purchase/transaction. We will not be responsible for
                                    the consequences of any default in the transactions made or entered
                                    into by Buyers with Sellers and the Buyer shall look to the Seller
                                    for any remedy in this respect.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    These Terms and Our Policies shall govern Your relationship with
                                    ZUPOTSU in connection with Our Platform and Services. However, the
                                    relevant purchase/transactions You conclude using Our Services
                                    represent independent transactions between Buyers and Sellers
                                    governed under Your Purchase Agreement. The termination of Your
                                    Account and relationship with Us shall not affect Your
                                    purchase/transaction or Purchase Agreement with a Seller and vice
                                    versa.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Buyers shall indemnify, defend, and hold harmless ZUPOTSU and
                                    ZUPOTSU Entities (as defined below) from and against any claims,
                                    liabilities, damages, losses, and expenses, including legal fees,
                                    arising out of or in connection with (i) the Buyers’s violation or
                                    breach or alleged violation or breach of its representations,
                                    warranties and obligations given under these Terms and Policies;
                                    (ii) any violation of Applicable Laws by the Buyer; or (iii) any
                                    infringement of third-party rights (including intellectual property
                                    rights).
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={8}>
                        <h1
                            style={{
                                paddingTop: "3pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            TERMS AND OBLIGATIONS FOR SELLERS
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l11">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ZUPOTSU’s Services enables Sellers to share proprietary Content for
                                    display and upload on the Platform to promote and offer
                                    Opportunities in relation to applicable Assets listed in the
                                    Catalogue. Content must be provided by Sellers in compliance with
                                    the standards and requirements set out under these Terms and
                                    Policies and/or communicated to Sellers by ZUPOTSU from time to
                                    time. ZUPOTSU reserves the right to review and reject or refuse to
                                    publish Content provided by Seller for the Platform in the event the
                                    Content provided is not in compliance with these Terms and Policies.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Sellers are strictly required to provide high quality and original
                                    images and other Content to ZUPOTSU for use and display in the
                                    Catalogue and to appropriately facilitate the sale process with
                                    Buyers on the Platform. In the event the Seller is unable to provide
                                    Content in compliance with this clause, Seller agrees and
                                    acknowledges that ZUPOTSU shall have the right to make use of any
                                    images associated with the Seller which the Seller has made
                                    available in the public domain (such as through the Seller’s website
                                    or social media accounts). Seller permits and grants ZUPOTSU a
                                    non-exclusive royalty-free worldwide license to make use of any such
                                    publicly available images (as may be required) for the purpose of
                                    rendering the Services, and for conducting marketing and promotional
                                    activity in relation to the Platform and Services. If Seller fails
                                    to provide ZUPOTSU with adequate images subject to this clause, and
                                    such image has to be procured at a cost to ZUPOTSU, ZUPOTSU shall be
                                    entitled to charge the Seller for any costs so incurred by ZUPOTSU
                                    at its discretion.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    To appropriately promote, advertise and list Opportunities on the
                                    Platform as part of the Services, ZUPOTSU at its discretion may also
                                    require the Seller to prepare, provide or submit specific Content in
                                    connection with the Assets or Opportunities listed by Seller from
                                    time to time. Sellers agree to promptly comply with any requirement
                                    communicated by ZUPOTSU subject to this clause.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    By listing Opportunities in connection with any Assets on the
                                    Platform or by submitting or providing us with any Content, Seller
                                    agrees to the following:
                                </p>
                                <ul id="l12">
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "12pt",
                                                paddingLeft: "81pt",
                                                textIndent: "-13pt",
                                                textAlign: "left"
                                            }}
                                        >
                                            Seller is free and able to enter into and fully comply with
                                            these Terms and Policies;
                                        </p>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "12pt",
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                lineHeight: "94%",
                                                textAlign: "justify"
                                            }}
                                        >
                                            Seller owns and holds all necessary rights, permissions and
                                            authorization required under Applicable Laws to list
                                            Opportunities (in connection with the Assets) on the Platform,
                                            to offer the Opportunities to Buyers, to transact with Buyers
                                            and/or to provide any Content in accordance with these Terms and
                                            Policies;
                                        </p>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingTop: "13pt",
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                lineHeight: "94%",
                                                textAlign: "justify"
                                            }}
                                        >
                                            the Content submitted by Seller does not infringe any copyright,
                                            common law right, or any rights of any party or any provision of
                                            these Terms, Policies and Applicable Law;
                                        </p>
                                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                            <br />
                                        </p>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                lineHeight: "89%",
                                                textAlign: "justify"
                                            }}
                                        >
                                            Seller is sole absolute unencumbered legal and beneficial owner
                                            of all rights granted herein; and
                                        </p>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                lineHeight: "89%",
                                                textAlign: "justify"
                                            }}
                                        >
                                            Seller permits and grants ZUPOTSU a non-exclusive royalty-free
                                            worldwide license to make use of Seller’s corporate and/or trade
                                            name, the Content and any identifying
                                        </p>
                                        <p
                                            style={{
                                                paddingTop: "4pt",
                                                paddingLeft: "86pt",
                                                textIndent: "0pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            marks, signage and logos or other intellectual property (in any
                                            form) of the Seller, which is associated with the Content
                                            provided by Seller or comprised in such Content (collectively “
                                            <b>Seller IP</b>”) and reasonably required by ZUPOTSU for the
                                            purpose of rendering the Services and for conducting marketing
                                            and promotional activity in relation to the Platform and
                                            Services. For the aforesaid purposes, Seller shall provide and
                                            allow ZUPOTSU to publicly display the Seller IP (such as on the
                                            Platform) or affix the same on any documents or materials or use
                                            the same in any other manner as may be deemed fit and necessary
                                            by Us.
                                        </p>
                                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                            <br />
                                        </p>
                                    </li>
                                </ul>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ZUPOTSU shall not be liable for any claims, liabilities, damages,
                                    losses, and expenses arising out of or related to any Sellers
                                    transaction with a Buyer. The Seller shall be solely liable for any
                                    purchase/transaction concluded between the concerned Seller and a
                                    Buyer using the Platform’s Services, including for granting of
                                    appropriate rights and permissions in respect of any
                                    Opportunities/Assets (and associated Content) which are the subject
                                    matter of the purchase/transaction to Buyer.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Sellers are advised to ensure the terms of the Purchase Agreement
                                    signed between the Buyer and Seller appropriately document the
                                    understanding as regards the rights to be transferred to Buyer from
                                    Seller pursuant to any purchase/transaction. We will not be
                                    responsible for the consequences of any acts or omissions of a
                                    Seller concerning any transactions made or entered into by concerned
                                    Seller with any Buyers and Sellers shall look to the Buyer for any
                                    remedy in this respect.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    These Terms and Our Policies shall govern Your relationship with
                                    ZUPOTSU in connection with Our Platform and Services. However, it is
                                    re-iterated that the relevant purchase/transactions You conclude
                                    using Our Services represent independent transactions between Buyers
                                    and Sellers governed under Your Purchase Agreement. The termination
                                    of Your Account and relationship with Us shall not affect Your
                                    purchase/transaction or Purchase Agreement with a Buyer and vice
                                    versa.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Sellers shall indemnify, defend, and hold harmless ZUPOTSU and
                                    ZUPOTSU Entities from and against any claims, liabilities, damages,
                                    losses, and expenses, including legal fees, arising out of or in
                                    connection with (i) the Seller’s breach or alleged breach of its
                                    representations, warranties and obligations given under these Terms
                                    and Policies; (ii) any violation of Applicable Laws by the Seller;
                                    or (iii) any infringement of third-party rights (including
                                    intellectual property rights) by the Seller, including in respect of
                                    the Content.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={9}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            GENERAL DISCLAIMERS
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l13">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ZUPOTSU reserves the right to add, amend or discontinue, temporarily
                                    or permanently, any of its Services (or any part thereof) offered
                                    through the Platform or the design and functionality of the
                                    Platform, at any time, with or without notice and/or reason(s) in
                                    its sole and absolute discretion. User agrees that ZUPOTSU shall not
                                    be liable either to User or to any third party for any modification,
                                    suspension or discontinuance of any of the Services including
                                    without limitation any failure of performance, error, omission,
                                    interruption, deletion, loss of information, defect, delay in
                                    operation or transmission, communications line failure, theft or
                                    destruction or unauthorized access to, alteration of, or use of
                                    records,
                                </p>
                                <p
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "0pt",
                                        textAlign: "left"
                                    }}
                                >
                                    whether for breach of contract, tortuous actions, negligence, or
                                    under any other cause or action.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    You acknowledge and accept that despite ZUPOTSUs efforts, the
                                    Platform may be unavailable from time to time for any reason
                                    including, without limitation, routine maintenance. In addition,
                                    various portions of the Platform and/or Services may operate slowly
                                    from time to time. You further acknowledge and accept that due to
                                    circumstances, within and outside the control of ZUPOTSU, access to
                                    the Platform and/or Services. may be interrupted, suspended, or
                                    terminated from time to time. In particular, and not in limitation
                                    of the foregoing, ZUPOTSU shall not be liable for the effects any
                                    delay or unavailability of the Platform and/or Services may have on
                                    You and/or Your Account, or for any damages arising from any such
                                    interruption, suspension, or termination of the Platform/ Services.
                                    ZUPOTSU shall not bear any liability for any damage or interruptions
                                    caused by any computer viruses, spyware, or other malware that may
                                    affect Your computer or other equipment, or any phishing, spoofing,
                                    or other attack and We advise You to make regular use of a reliable
                                    virus and malware screening and prevention software to guard against
                                    the same.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    You agree and acknowledge that the Platform and Services is licensed
                                    and/or provided hereunder on an “as is” and “as available” basis,
                                    without any warranties of any kind, either express or implied
                                    including, but not limited to, the implied conditions and warranties
                                    of fitness for a particular purpose to the extent permitted by the
                                    Applicable Law. Except as explicitly set forth herein, neither
                                    ZUPOTSU and its affiliates, directors, officers, employees, agents,
                                    permitted successors and assigns and authorized representatives (‘
                                    <b>ZUPOTSU Entities</b>’), make any warranties of any kind, either
                                    expressed or implied, including, without limitation: warranties of
                                    merchantability or fitness for a particular purpose related to the
                                    use of Platform and/or Services; or that the same accurate,
                                    error-free, reliable, uninterrupted, that defects will be corrected;
                                    or the completeness, accuracy, availability, timeliness, security or
                                    reliability of the Platform and/or Services or the functionality of
                                    thereof, or other use or consequence of the use of Platform and/or
                                    Services.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={10}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-18pt",
                                textAlign: "left"
                            }}
                        >
                            LIMITATION OF LIABILITY
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l14">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Except for limited license rights and permissions granted to ZUPOTSU
                                    under these Terms and Policies, the title and rights in Your Content
                                    remain with You. We do not have any ownership over any of the
                                    Content shared by You. You remain solely responsible for the Content
                                    You submit for upload on Our Platform or provide to ZUPOTSU. We do
                                    not endorse and are not responsible for any Content shared or posted
                                    on or through Our Platform, and for the consequence of such sharing
                                    or posting. The use or presence of Our logo or any trademark or
                                    other intellectual property (in any form) in relation to any Content
                                    shared by You does not mean that We have endorsed or sponsored Your
                                    Content. You will always have ownership and/or responsibilities for
                                    the Content You share or provide. ZUPOTSU is entitled to remove any
                                    Content from the Platform that it deems, in its sole discretion, to
                                    be in violation of these Terms or any applicable law, or that may
                                    expose ZUPOTSU or its Users to liability at any time.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    We shall not be liable for the consequences of any transactions made
                                    or entered into by You with other Users of the Platform. ZUPOTSU is
                                    not responsible for Your actions or
                                </p>
                                <p
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "0pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    omissions (whether online or offline) in relation to the Platform
                                    and Services and/or ZUPOTSU. We are not responsible for services and
                                    features offered by others, even if You access them through the
                                    Services. Our responsibility for anything that happens on Our
                                    Platform is strictly governed by the Applicable Law and is limited
                                    to that extent. You agree that We will not be responsible for any
                                    loss of profits, revenues, information, or data, or consequential,
                                    special, indirect, exemplary, punitive, or incidental damages
                                    arising out of or related to these Terms, even if We know they are
                                    possible. This includes when We delete Your Content, information, or
                                    Account.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={11}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-22pt",
                                textAlign: "left"
                            }}
                        >
                            SUSPENSION AND CANCELLATION OF USER ACCOUNT
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l15">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ZUPOTSU reserves the right to immediately disable or terminate or
                                    cancel Your Account, or suspend Your access to the Platform and/or
                                    Services at any time, with or without notice to You, in its sole and
                                    absolute discretion, in case of Your contravention or violation of
                                    these Terms and applicable Policies; or Your illegal acts or
                                    omissions; or misuse of the Services or Platform; or to protect You
                                    and others from identity theft or other fraudulent or illegal
                                    activity under the Applicable Law, or if ZUPOTSU is unable to
                                    continue providing the Services to You due to technical or
                                    legitimate business reasons. In the event, Your Account is disabled
                                    or deleted by ZUPOTSU due to a violation of the Terms, applicable
                                    Policies, and/or the Applicable Law, ZUPOTSU reserves the tight to
                                    take action against You and any other remedies it may have under the
                                    Terms, Policies and Applicable Law.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    <a href="mailto:care@zupotsu.com" className="a" target="_blank">
                                        You may opt to de-activate, cancel, or terminate Your Account and
                                        use of any Services by providing written notice to ZUPOTSU at{" "}
                                    </a>
                                    <a href="mailto:care@zupotsu.com" className="s2" target="_blank">
                                        care@zupotsu.com
                                    </a>
                                    <a href="mailto:care@zupotsu.com" target="_blank">
                                        .
                                    </a>
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    You acknowledge and accept that upon termination of Your Account for
                                    any reason, Your agreement with Us shall be terminated, and You
                                    shall no longer be entitled to access Your Account or avail
                                    Services. You agree and acknowledge that Your rights in respect of
                                    the Services, and other benefits, associated with the Account may be
                                    irrevocably lost and agree that You will release ZUPOTSU of any
                                    liability of any nature in respect to the loss of the same. You
                                    further acknowledge and accept that in the event of termination of
                                    these Terms in any manner or suspension or termination of Your
                                    access to the Platform and/or the Services, or deactivation or
                                    cancellation of Your Account, You shall remain liable for all
                                    activity conducted with or in connection with Your Account and for
                                    all amounts due/charges incurred by Your Account while it was in
                                    operation at all times. The obligations and liabilities incurred by
                                    You prior to the termination, shall survive termination of Your
                                    Account and agreement with ZUPOTSU.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={12}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-22pt",
                                textAlign: "left"
                            }}
                        >
                            MARKETING AND PROMOTION
                        </h1>
                        <p
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "0pt",
                                textAlign: "justify"
                            }}
                        >
                            <a href="mailto:care@zupotsu.com" className="a" target="_blank">
                                ZUPOTSU may send You promotional or marketing information from time to
                                time, or any new Services and additional features added to the
                                Platform, special offers for User(s), and other information which may
                                be of interest to You. By agreeing to these Terms and by registering
                                an Account on the Platform, You hereby give Your consent to being sent
                                such information by ZUPOTSU, including by push notifications, post,
                                email, telephone, text message (via SMS or other apps), or automated
                                call. If, however, You do not wish to receive such information, You
                                can request to opt-out of such marketing communication sent by ZUPOTSU
                                by sharing written communication with us at{" "}
                            </a>
                            <a href="mailto:care@zupotsu.com" className="s2" target="_blank">
                                care@zupotsu.com
                            </a>
                            <a href="mailto:care@zupotsu.com" target="_blank">
                                .
                            </a>
                        </p>
                    </li>
                    <li data-list-text={13}>
                        <h1
                            style={{
                                paddingTop: "3pt",
                                paddingLeft: "32pt",
                                textIndent: "-22pt",
                                textAlign: "left"
                            }}
                        >
                            INTELLECTUAL PROPERTY
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l16">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Unless expressly provided or disclaimed otherwise in these Terms or
                                    any applicable Policies or under any other disclaimer published on
                                    the Platform, all material and content on the Platform including
                                    without limitation, texts, software, code, scripts, graphics, rights
                                    in get-ups, typographic typefaces, graphic user interface, photos,
                                    collages, sounds, music, audio, videos, interactive content, and the
                                    like, online databases, copyright, patents, related rights and moral
                                    rights, trademarks, trade names, product names, service marks,
                                    logos, rights in domain names, social media handles, rights in the
                                    design, rights in the information and all other or equivalent rights
                                    subsisting now or in future in any part of the world in each case,
                                    whether registered or unregistered, and all applications for the
                                    same (collectively ‘<b>Intellectual Property</b>’), are owned by or
                                    licensed to ZUPOTSU and are provided to You on an “as is” basis for
                                    Your information and use only for the purpose of rendering Services
                                    mentioned herein. Nothing in the Terms assigns, transfers or grants
                                    You ownership in ZUPOTSU’s Intellectual Property and nothing in
                                    these Terms shall be deemed to confer ownership or other rights in
                                    the Intellectual Property to the User.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    You shall not use any device, program, algorithm or methodology, or
                                    any manual or digital process, to access, acquire, copy or monitor
                                    any portion of the Platform or any content, such as the Intellectual
                                    Property on the Platform to which You have no rights, or in any way
                                    reproduce or circumvent the navigational structure or presentation
                                    of the Platform or any such content, to obtain or attempt to obtain
                                    any materials, documents or information through any means not
                                    purposely made available through the Platform. You shall not
                                    directly or indirectly copy, reproduce, sell, distribute, exploit,
                                    or use all or any part of the Platform and/or Services whether
                                    electronically, mechanically, or otherwise, in any form for any
                                    purpose not expressly permitted by the provisions of these Terms,
                                    including any attempt to violate the security thereof. You shall not
                                    reverse engineer, decompile, disassemble or otherwise attempt to
                                    derive source code or other trade secrets from the Platform /
                                    Services, including any of the software comprising or in any way
                                    making up a part of the same.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    All rights and interest in Intellectual Property comprised in
                                    Platform and Services (excluding intellectual property in the
                                    Content provided by the User) are and will remain the exclusive
                                    property of ZUPOTSU and its licensors (as may be applicable). You
                                    acknowledge and agree that all worldwide rights, title, and interest
                                    in any third-party software, products, and/or services (and any
                                    Intellectual Property Rights therein) accessible on the Platform or
                                    through the Services, subject to third party licenses, if any, are
                                    owned by such third parties. Any copying or reproduction of these
                                    materials for commercial purposes without Our consent is prohibited.
                                    Any use for which You receive any remuneration, whether monetarily
                                    or otherwise, is construed as commercial use for the purpose of this
                                    clause and ZUPOTSU shall hold You accountable for the infringement
                                    of intellectual property rights under Applicable Law.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={14}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-22pt",
                                textAlign: "left"
                            }}
                        >
                            INDEMNIFICATION
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l17">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    To the extent permitted by the Applicable Law, ZUPOTSU shall not be
                                    liable to You for any manner of damages or losses to You, and in
                                    relation, to any person(s) or property
                                </p>
                                <p
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "0pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    (including special, incidental, indirect, punitive, or consequential
                                    damages or losses) including, but not limited to, lost profits or
                                    data, whether based in contract, negligence, tort, Applicable Law,
                                    arising directly or indirectly in relation to the Terms, Policies,
                                    the Platform and Services (and any related activities, omissions,
                                    interruptions, deletions or defects in the same including any action
                                    in connection with an investigation by ZUPOTSU or law enforcement
                                    authorities in relation to the use of the Platform and/or Services)
                                    and the Content in accordance with these Terms, even if advised of
                                    the possibility of such damages. In no event shall ZUPOTSU be held
                                    liable for damages, loss, or cause of action that exceeds the total
                                    value of the monetary amount paid by You to ZUPOTSU for access and
                                    use of the Platform and/or Services.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    You agree to indemnify, defend and hold harmless ZUPOTSU from and
                                    against any claims (including any claims based on publicity rights,
                                    defamation, or invasion of privacy), proceeding, loss, damage,
                                    liability, cost, demand or expense (including but not limited to
                                    attorney's fees) of any kind arising out of: (i) Your access to or
                                    use of the Platform and Services; (ii) any breach by You of Your
                                    obligations, representations, and/or warranties outlined in these
                                    Terms, Policies (iii) Your violation of the rights of any third
                                    party, including any infringement of intellectual property, or of
                                    any privacy or consumer protection right; (iv) any violation of law
                                    or contractual obligation and any claims, demands, notices pursuant
                                    to such violation; (v) Your negligence or willful misconduct or any
                                    of Your actions and omissions including Your use or attempted use of
                                    the Platform and its Services, or failure to take appropriate action
                                    where relevant while using the Services and Platform. It is
                                    clarified that Your obligation to indemnify ZUPOTSU will survive
                                    termination of the Terms, Policies and Your Account for any reason,
                                    in the manner mentioned in these Terms.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    You hereby agree and acknowledge that ZUPOTSU shall not be
                                    responsible for any actions taken by any third party using the
                                    Platform including but not limited to, actions, omissions, or
                                    conduct of such third-parties (including the Business Partners and
                                    other Users), online or offline. You acknowledge and agree that any
                                    disputes, complaints or grievances regarding the actions and
                                    omissions of such third-parties and/or any other aspect of any
                                    transaction or other commercial dealings between You and such third
                                    party will be solely and entirely between You and the relevant
                                    third-party.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={15}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-27pt",
                                textAlign: "left"
                            }}
                        >
                            DISPUTE RESOLUTION
                        </h1>
                        <p
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "0pt",
                                textAlign: "justify"
                            }}
                        >
                            The courts of competent jurisdiction at Delhi, India (‘<b>Court(s)</b>’)
                            shall have exclusive jurisdiction to determine any and all matter(s),
                            claim(s) or dispute(s), whether contractual or non-contractual arising
                            out of, or in connection with Our Platform, the Terms and Services
                            published on the Platform and the Services provided by Us (‘
                            <b>Dispute(s)</b>’). All Disputes shall be governed and construed by the
                            Courts in accordance with the Applicable Law and any order, decree,
                            direction, or award of the Courts shall be final and binding in relation
                            to any Dispute concerning ZUPOTSU. Any dispute that may arise between
                            You and any third party arising from Your use of the Services (including
                            any purchases/transactions consummated or concluded by You through the
                            use of the Services) shall be only between You and the third party. You
                            release ZUPOTSU and ZUPOTSU Entities from any such claims and damages
                            connected with such disputes. Nothing contained in these terms shall
                            prevent ZUPOTSU from seeking and obtaining interim or permanent
                            equitable or injunctive relief, or any other relief
                        </p>
                        <p
                            style={{
                                paddingTop: "4pt",
                                paddingLeft: "32pt",
                                textIndent: "0pt",
                                textAlign: "justify"
                            }}
                        >
                            available to safeguard Our interest prior to, during or following the
                            filing of any proceedings. The pursuit of equitable or injunctive relief
                            shall not constitute a waiver on Our part to pursue any remedy for
                            monetary damages through the arbitration described herein. You consent
                            to the exclusive jurisdiction of the Courts and waive any objection as
                            to inconvenient forum.
                        </p>
                    </li>
                    <li data-list-text={16}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-22pt",
                                textAlign: "left"
                            }}
                        >
                            MISCELLANEOUS
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l18">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    The Terms read along with applicable Policies (including the Privacy
                                    Policy) constitute the entire agreement between You and ZUPOTSU in
                                    respect of the subject matter herein and supersedes all previous
                                    written or oral representations, agreements, and understandings
                                    between You and ZUPOTSU, whether expressed or implied, with respect
                                    to such subject matter.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Each of the provisions of the Terms is severable. If any provision
                                    herein is found by a governmental authority or court to be invalid,
                                    unenforceable, or illegal, that provision will be enforced to the
                                    maximum extent permissible under by the Applicable Law and the other
                                    provisions of the Terms will remain in full force and effect. If any
                                    invalid, unenforceable or illegal provision would be valid,
                                    enforceable, or legal if some part of it were deleted or modified,
                                    the provision will apply with whatever modification is necessary to
                                    give effect to the intention of provisions in these Terms.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    You shall not, without the prior written consent of ZUPOTSU, assign
                                    the provisions of these Terms, in whole or in part, either
                                    voluntarily or by operation of Applicable Law, and any attempt to do
                                    so will be a material default of these Terms and such assignment
                                    will be void. ZUPOTSU may assign the provisions of these Terms in
                                    part or in their entirety, including Our rights, interests, and
                                    obligations hereunder, without notice to You or Your consent. The
                                    provisions of these Terms are solely for the benefit of You and
                                    ZUPOTSU, ZUPOTSU’s successors and permitted assigns, and does not
                                    confer any rights or remedies on any other person or entity.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    No failure or delay by ZUPOTSU in exercising any right, power or
                                    remedy under these Terms shall operate as a waiver thereof, nor
                                    shall any single or partial exercise of the same preclude any
                                    further exercise thereof or the exercise of any other right, power
                                    or remedy. Without limiting the foregoing, no waiver by ZUPOTSU of
                                    any breach of any provision of this Agreement shall be deemed to be
                                    a waiver of any subsequent breach of that or any other provision of
                                    this Agreement. If We fail to enforce any aspect of these Terms,
                                    including reporting any illegal or impermissible actions to
                                    appropriate law enforcement authorities or blocking or suspending
                                    Your Account, such failure to enforce Our rights will not be a
                                    waiver by Us.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    ZUPOTSU shall not be liable for damages for any delay or failure to
                                    perform its obligations hereunder, if such delay or failure is due
                                    to causes which are unforeseen or beyond its control, including,
                                    without limitation, internet attacks, emergencies, internet
                                    unavailability, any law, proclamation, regulation, ordinance, or
                                    other act or order of any court, government or governmental agency,
                                    acts or omissions of carriers, transmitters, providers, or acts of
                                    vandals, or hackers. etc. The time for performance of such
                                    obligations Of ZUPOTSU will be extended for the period of the delay
                                    or failure to perform due to such occurrence. ZUPOTSU shall use
                                    reasonable endeavors to overcome the effects of any such causes and
                                </p>
                                <p
                                    style={{
                                        paddingTop: "4pt",
                                        paddingLeft: "50pt",
                                        textIndent: "0pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    to ensure resumption of normal performance of obligations as soon as
                                    reasonably practicable, however, it is clarified that ZUPOTSU is not
                                    responsible for losses that were not foreseeable to You and ZUPOTSU
                                    when these Terms were entered into.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Any provisions in the Terms or Policies which are expressly referred
                                    to as surviving or intended to survive by their nature will survive
                                    the termination of Your Account and relationship with ZUPOTSU for
                                    any reason.
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    You shall be responsible for payment of all fees/costs/charges
                                    associated with availing of Services from Us and You agree to bear
                                    any and all applicable taxes including but not limited to applicable
                                    duties, cess, etc. You agree to provide such further information,
                                    documents or instruments, and take such further actions, reasonably
                                    requested by ZUPOTSU, to effect the purposes of these Terms and
                                    carry out its provisions.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li data-list-text={17}>
                        <h1
                            style={{
                                paddingTop: "13pt",
                                paddingLeft: "32pt",
                                textIndent: "-22pt",
                                textAlign: "left"
                            }}
                        >
                            GRIEVANCE REDRESSAL
                        </h1>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ul id="l19">
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    Any User or aggrieved person (including persons acting on their
                                    behalf) wishing to raise a Grievance may contact Our designated
                                    grievance officer (‘<b>Grievance Officer</b>’) in writing using the
                                    contact details set out below:
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingTop: "8pt",
                                        paddingLeft: "50pt",
                                        textIndent: "-17pt",
                                        textAlign: "left"
                                    }}
                                >
                                    Name: <span className="p">ABHIGYAN SHEKHAR</span>
                                </h1>
                                <p
                                    style={{ paddingTop: "1pt", textIndent: "0pt", textAlign: "left" }}
                                >
                                    <br />
                                </p>
                            </li>
                            <li >
                                <h1
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-17pt",
                                        textAlign: "left"
                                    }}
                                >
                                    Contact: <span className="p">+91 99878 31843</span>
                                </h1>
                                <p
                                    style={{ paddingTop: "1pt", textIndent: "0pt", textAlign: "left" }}
                                >
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-17pt",
                                        textAlign: "left"
                                    }}
                                >
                                    <a href="mailto:care@zupotsu.com" className="s2" target="_blank">
                                        Email:{" "}
                                    </a>
                                    <a href="mailto:care@zupotsu.com" target="_blank">
                                        care@zupotsu.com
                                    </a>
                                </p>
                                <p
                                    style={{ paddingTop: "1pt", textIndent: "0pt", textAlign: "left" }}
                                >
                                    <br />
                                </p>
                            </li>
                            <li >
                                <p
                                    style={{
                                        paddingLeft: "50pt",
                                        textIndent: "-18pt",
                                        textAlign: "justify"
                                    }}
                                >
                                    A Grievance may also be shared to the Grievance Officer in writing
                                    at the following address:
                                </p>
                                <p style={{ textIndent: "0pt", textAlign: "left" }}></p>
                                <ul id="l20">
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingLeft: "86pt",
                                                textIndent: "-17pt",
                                                lineHeight: "14pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            HD-207, WeWork DLF Two Horizon Centre, 5th Floor, DLF Phase 5,
                                            Sector 43,
                                        </p>
                                        <p
                                            style={{
                                                paddingLeft: "86pt",
                                                textIndent: "0pt",
                                                lineHeight: "13pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            Golf Course Road, Gurugram, Haryana 122002
                                        </p>
                                    </li>
                                    <li data-list-text="o">
                                        <p
                                            style={{
                                                paddingLeft: "86pt",
                                                textIndent: "-18pt",
                                                textAlign: "justify"
                                            }}
                                        >
                                            Our Grievance Officer is the nodal contact to receive and
                                            acknowledge all Grievances. You will receive an acknowledgement
                                            e-mail within 24 (twenty-four) hours upon receipt of Your
                                            Grievance by Our Grievance Officer. Our Grievance Officer shall
                                            dispose of such complaint within a period of 15 (fifteen) days
                                            from the date of its receipt, provided that the Grievance
                                            Officer may request the complainant to furnish additional
                                            information for evidentiary and investigative purposes during
                                            this time. Any Feedback and/or Grievance shall be deemed to be
                                            non-compensatory in nature. ZUPOTSU reserves the right, at its
                                            sole discretion, to use such information in any manner as may be
                                            deemed appropriate by ZUPOTSU and such use shall be entirely
                                            unrestricted. You represent and warrant that while sharing any
                                            Feedback or Grievance for the Platforms, You shall not use any
                                            offensive, libelous, derogatory, hateful or racially or
                                            ethnically objectionable language in respect of such Feedback
                                            and / or Grievance and that any Feedback / Grievance will be
                                            shared by You in accordance with these Terms and the Applicable
                                            Law.
                                        </p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
    );

    return (
        <div>
            <Modal
                open={shown}
                onClose={closeModal}
                closeAfterTransition
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter',
                    overflow: 'hidden',
                }}
            >
                <Fade in={shown}>
                    {modalBody()}
                </Fade>

            </Modal>
        </div>
    );
};

export default Termsandservices;
