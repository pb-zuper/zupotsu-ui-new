import { Box, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Edit, forward } from '../../../assets';
import { Close } from '@mui/icons-material';
import pdfIcon from '../../../assets/pdf.svg'

const Reply = ({ replyOpen, setReplyClose, forwardingChat }: any) => {

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
        <div style={{
            width: "100%",
            height: "auto",
            padding: "16px",
            paddingBottom: '5px',
            gap: "5px",
            background: '#FFF',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            borderRadius: '8px',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "flex-start",
                alignItems: 'center',
                width: '100%',
                height: "auto",
                maxHeight: forwardingChat?.doc ? "130px" : '100px',
                boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.1)",
                borderRadius: '8px',
            }}>

                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: '10px',
                    padding: "4px 8px 0px 8px",
                }} >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: '10px',
                        padding: "0",
                    }} >
                        <img src={forward} alt='zopotsuLogo' style={{
                            width: "18px",
                            height: "14px",
                        }} />
                        <span style={{
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "19.6px",
                            letterSpacing: "0.01em"
                        }}>Replying</span>
                    </Box>
                    <Close
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={() => { setReplyClose(false) }}
                    />

                </Box>
                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: '10px',
                    padding: "2px 10px 0px 8px",
                }} >
                    <span style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "19.6px",
                        letterSpacing: "0.01em"
                    }}>{forwardingChat?.sent_by_user?.name}</span>
                    <span style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "19.6px",
                        letterSpacing: "0.01em"
                    }}>
                        Today
                        {forwardingChat?.sent_at && 
                        new Date(forwardingChat.sent_at).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        }).replace(' ', '').toUpperCase()
                        // formatDateString(forwardingChat.sent_at)
                        }
                    </span>

                </Box>



                {(forwardingChat?.doc) ? (
                    <div style={{
                        height: "62px",
                        width: "100%",
                        padding: '10px',
                        paddingTop: '1px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            background: 'rgba(242, 242, 242, 1)',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            maxWidth: '100%',
                            minWidth: '20%',
                            padding: '10px',
                            gap: '15px',
                            borderRadius: '10px',
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
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        lineHeight: '16.94px',
                                        margin: 0,
                                        padding: 0,
                                        textAlign: 'left',
                                        minWidth: '150px'
                                    }}
                                >
                                    {forwardingChat?.doc_name}
                                </p>
                                <p
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        lineHeight: '16.94px',
                                        margin: 0,
                                        padding: 0
                                    }}
                                >
                                    {forwardingChat?.doc_size}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (<div style={{
                    width: "100%",
                    height: "62px",
                    padding: '10px',
                    paddingTop: '1px'
                }}>
                    <div style={{
                        borderRadius: '10px',
                        borderTopRightRadius: "10px",
                        borderTopLeftRadius: "0px",
                        background: 'rgba(242, 242, 242, 1)',
                        height: "42px",
                        width: "100%",
                    }}>
                        <p style={{
                            fontFamily: "Inter",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "16.94px",
                            height: "40px",
                            textAlign: "left",
                            padding: '5px',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>

                            {forwardingChat?.text}
                        </p>
                    </div>

                </div>)}


            </div>

        </div>
    )
}

export default Reply
