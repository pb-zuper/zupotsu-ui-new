

import { Dialog, DialogContent, Typography } from '@mui/material';
import useDeviceType from '../../utils/DeviceType';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Close } from '@mui/icons-material';

export interface EventHighlightProps {
    image: string;
    value: string;
    customKey: string;
    isCheck:any
}
const EventHighlight = ({ image, value, customKey,isCheck }: EventHighlightProps) => {
    const deviceType = useDeviceType();
    const [showAllAudProfile, setAllAudProfile] = useState(false);
    const [openDialog, setOpenDialog] = useState<boolean>(isCheck);

    const handleDialogActionClick = (action: any) => {
        setOpenDialog(false);
    };

 

    return (
        <>
            {/* {value && value !== 'Invalid Date - Invalid Date' && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '12px',
                        alignItems: 'center',
                        padding: '10px 0',
                        width:
                            customKey === 'Audience Profile'
                                ? deviceType === 'mobile'
                                    ? '245px'
                                    : '400px'
                                : '',
                    }}
                >
                    <div>
                        <img src={image} alt="" />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            alignItems: 'flex-start',
                            textAlign: 'left',
                            alignSelf: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'var(--Gray-1, #333)',
                                textAlign: 'left',
                                fontFamily: 'Inter',
                                fontSize: deviceType === 'mobile' ? '12px' : '16px',
                                fontWeight: 700,
                                lineHeight: '110%',
                                textTransform: 'capitalize',
                            }}
                        >
                            {customKey === 'Audience Profile' ||
                                customKey === 'Anything else to note' ? (
                                // <div style={{ display: 'flex' }}>

                                <div style={{ whiteSpace: 'pre-wrap' }}>
                                    {highlightTabData}
                                    {highlightTabData.length > 9 && (
                                        <Typography
                                            sx={{
                                                display: 'inline',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#2F80ED',
                                                fontFamily: 'Inter',
                                                fontSize: deviceType === 'mobile' ? '12px' : '16px',
                                                fontStyle: 'normal',
                                                fontWeight: 500,
                                                lineHeight: '21px',
                                                letterSpacing: '0.32px',
                                                cursor: 'pointer',
                                            }}
                                            // onClick={() => handleSeeMoreClick('highlights')}
                                            onClick={() => setOpenDialog(true)}
                                        >
                                            <span style={{ color: 'var(--Gray-1, #333)' }}>...</span>
                                            {'See More'}
                                        </Typography>
                                    )}
                                </div>
                            ) : (
                                // </div>
                                value
                            )}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'var(--Gray-3, #828282)',
                                textAlign: 'left',
                                fontFamily: 'Inter',
                                fontSize: deviceType === 'mobile' ? '10px' : '14px',
                                fontWeight: 600,
                                lineHeight: '160%',
                                textTransform: 'capitalize',
                            }}
                        >
                            {customKey}
                        </Typography>
                    </div>
                </div>
            )} */}
            <Dialog
                open={openDialog}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    sx: {
                        borderRadius: '8px',
                        width: '100%',
                    },
                }}
            >
                <DialogContent style={{ padding: '0px 15px 15px 15px' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            // alignItems: 'center',
                            // textAlign: 'center',
                            // padding: '5px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                // alignItems: 'center',
                                // textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography
                                style={{
                                    textAlign: 'left',
                                    paddingTop: '16px',
                                    color: 'var(--Gray-1, #333)',
                                    fontFamily: 'Inter',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    lineHeight: '140%',
                                }}
                            >
                                {customKey 
                                   }
                            </Typography>
                            <Close
                                style={{ alignSelf: 'end', cursor: 'pointer' }}
                                onClick={handleDialogActionClick}
                            />
                        </div>
                        <Typography
                            style={{
                                textAlign: 'left',
                                paddingTop: '16px',
                                color: 'var(--Gray-1, #333)',
                                fontFamily: 'Inter',
                                fontSize: '15px',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                lineHeight: '140%',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {value}
                        </Typography>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EventHighlight;
