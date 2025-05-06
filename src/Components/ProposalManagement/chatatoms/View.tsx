import { Box, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Edit, forward } from '../../../assets';
import pdfIcon from '../../../assets/pdf.svg'

const View = ({ type, item }: any) => {

    return (
        <div style={{
            width: "100%",
            maxHeight: '150px',
            gap: "5px",
            backgroundColor: "#f7f7f7",
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
               
                maxHeight: '150px',
            }}>

                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: '10px',
                    padding: "1px",
                    paddingTop: '2px'
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
                            transform: "scaleX(-1)"
                        }} />
                        <span style={{
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "19.6px",
                            letterSpacing: "0.01em"
                        }}>{type}</span>
                    </Box>

                </Box>
                {/* <Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: '10px',
                    padding: "2px 10px 0px 8px",
                    marginTop: '5px'
                }} > */}
                    {/* <span style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "19.6px",
                        letterSpacing: "0.01em"
                    }}>{item?.sent_by_user?.name}</span> */}
                    {/* <span style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "19.6px",
                        letterSpacing: "0.01em"
                    }}>
                        {item?.sent_at && new Date(item.sent_at).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        }).replace(' ', '').toUpperCase()}
                    </span> */}

                {/* </Box> */}



                <div style={{
                    width: "100%",
                    maxHeight: '130px',
                    padding: '10px',
                    paddingTop: '5px',
                    marginTop:"5px",
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
                        }}>
                            <p style={{
                                fontFamily: "Inter",
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "16.94px",
                                textAlign: "left",
                                padding: '10px',
                                margin: 0
                            }}>
                                {item?.text}
                            </p>

                        </div>
                    ) : (
                        <div style={{
                            borderRadius: '10px',
                            background: 'rgba(242, 242, 242, 1)',
                            height: "auto",
                            width: "100%",
                            padding: '10px'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "flex-start",
                                alignItems: 'center',
                                maxWidth: '70%',
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
                                            minWidth: '150px'
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
                        </div>
                    )}

                </div>


            </div>

        </div>
    )
}

export default View
