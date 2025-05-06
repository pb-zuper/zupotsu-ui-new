import { Box, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Edit, forward, Pinned, pin, DocumentDownloadIcon } from '../../../assets';
import pdfIcon from '../../../assets/pdf.svg'
import { useNavigate } from 'react-router-dom';

const PinnedChat = ({ type, item, scrollToChat }: any) => {
    const deviceType: any = useNavigate()

    const formatDateString = (dateString: any) => {
        if (!dateString) return 'NA';
    
        const date = new Date(dateString);
    
        const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
        const formattedDate = date.toLocaleDateString('en-US', options);
        const [month, day, year] = formattedDate.split(' ');
        const formattedMonth = month.slice(0, 3);
        return `${formattedMonth}\n${day} ${year}`;
      };
    return (
        <div
            onClick={() => { scrollToChat(item?.id) }}
            style={{
                width: "100%",
                height: "auto",
                gap: "5px",
                background: '#FFF',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center',
                borderRadius: '8px',
            }}
        >
            <div style={{ width: deviceType == "mobile" ? "15%" : 'auto', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'flex-end', }}>
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
                        {item?.sent_by_user?.name?.charAt(0)}
                    </span>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "flex-start",
                alignItems: 'center',
                width: '100%',
                height: "auto",
            }}>


                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: '10px',
                    padding: "2px 10px 0px 8px",
                    marginTop: '5px'
                }} >
                    <span style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "19.6px",
                        letterSpacing: "0.01em"
                    }}>{item?.sent_by_user?.name}</span>
                    <span style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "19.6px",
                        letterSpacing: "0.01em"
                    }}>
                        {item?.sent_at && 
                        new Date(item.sent_at).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        }).replace(' ', '').toUpperCase()
                        // formatDateString(item.sent_at)
                        }
                    </span>

                </Box>



                <div style={{
                    width: "100%",
                    padding: '10px',
                    paddingTop: '5px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'scroll',
                    scrollbarWidth:"none",
                    gap: "10px"
                }}>
                    {(!item?.doc) ? (
                        <div style={{
                            borderRadius: '10px',
                            borderTopRightRadius: "10px",
                            borderTopLeftRadius: "0px",
                            background: 'rgba(242, 242, 242, 1)',
                            height: "auto",
                            width: "100%",
                            minWidth:'200px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center',
                        }}>
                            <div style={{
                                width: '90%',
                                background: 'transparent',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "flex-start",
                                alignItems: 'center',
                            }}>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    lineHeight: "16.94px",
                                    textAlign: "left",
                                    padding: '10px',
                                    margin: 0,
                                }}>
                                    {item?.text}
                                </p>
                            </div>
                            <div style={{
                                width: '10%',
                                background: 'transparent',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                            }}>
                                <img src={pin} alt="Pinned" style={{ width: '18px', height: '18px' }} />
                            </div>

                        </div>
                    ) : (
                        <div style={{
                            borderRadius: '10px',
                            background: 'rgba(242, 242, 242, 1)',
                            height: "auto",
                            width: "100%",
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center',
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "flex-start",
                                alignItems: 'center',
                                maxWidth: '85%',
                                minWidth: '20%',
                                gap: '15px'
                            }}>
                                <img
                                    src={pdfIcon}
                                    style={{
                                        width: "32px",
                                        height: '32px'
                                    }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                                    <p
                                        style={{
                                            fontFamily: 'Inter',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            lineHeight: '16.94px',
                                            margin: 0,
                                            padding: 0,
                                            textAlign: 'left',
                                            minWidth: '150px',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 1 ,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {item?.doc_name}
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: 'Inter',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            lineHeight: '16.94px',
                                            margin: 0,
                                            padding: 0
                                        }}
                                    >
                                        {item?.doc_size}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();   
                                    window.open(item?.doc, '_blank');
                                }}
                                style={{
                                    width: "24px",
                                    height: '24px',
                                    color: 'rgba(41, 45, 50, 1)',
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent',
                                    border: '0px solid transparent',
                                    padding: 0,
                                    margin: 0
                                }}>
                                <img
                                    src={DocumentDownloadIcon}
                                    style={{
                                        width: "24px",
                                        height: '24px',
                                        color: 'rgba(41, 45, 50, 1)',
                                        cursor: 'pointer'
                                    }}
                                />
                            </button>
                            <div style={{
                                width: '5%',
                                background: 'transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                            }}>
                                <img src={pin} alt="Pinned" style={{ width: '18px', height: '18px' }} />
                            </div>
                        </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        {(item?.doc_type) ? (<p style={{ margin: 0, padding: 0, fontFamily: 'Inter', fontSize: '12px', textAlign: "left" }}>{item?.doc_type}</p>) : (<div></div>)}
                        <p style={{ margin: 0, padding: 0, fontFamily: 'Inter', fontSize: '12px', textAlign: "right" }}><img src={pin} alt="Pinned" style={{ width: '10px', height: '10px', marginRight: "5px" }} />{item?.pinned_by_user?.name}</p>
                    </div>
                </div>


            </div>


        </div>
    )
}

export default PinnedChat
