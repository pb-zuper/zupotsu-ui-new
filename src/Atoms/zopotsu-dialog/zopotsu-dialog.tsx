import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Close } from "@mui/icons-material";
import { CircularProgress, Dialog, DialogContent, Typography, styled } from "@mui/material";
import useDeviceType from "../../utils/DeviceType";
import { memo, useMemo, useState } from "react";

export interface ZopotsuDialogProps{
    showPopup: boolean;
    dialogContent: ReactJSXElement;
    handleClosePopup: () => void;
    dialogTitle?: string;
    dialogPadding?:string;
    dialogWidth?: string;
    showLoader?: boolean;
};

export function ZopotsuDialog(props:ZopotsuDialogProps){
    const deviceType = useDeviceType();
    const maxWidth = useMemo(()=>{
        switch(deviceType){
            case 'desktop':
                return 'md';
            case 'extra-large-desktop':
            case 'large-desktop':
                return 'lg'
            case 'mobile':
                return 'xs'
            case 'small-tablet':
            case 'tablet':
                return 'sm';
        }
    },[]);
    return (
        <Dialog
            open={props.showPopup}
            maxWidth={maxWidth}
            fullWidth
            PaperProps={{
                sx: {
                  borderRadius: '4px',
                  width: props.dialogWidth || '620px',
                },
            }}
            disableScrollLock
         >
           {
            props.showPopup &&  
            <DialogContent
            sx={{
                padding: props?.dialogPadding || '16px',
                pointerEvents: props?.showLoader ? 'none': 'auto'
            }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display:'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography
                            sx={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '20px',
                                fontWeight: 700,
                                lineHeight: '28px',
                                textAlign: 'left',
                                width:'100%'
                            }}
                            >
                                {props.dialogTitle || ''}
                        </Typography>
                        <Close
                            style={{ cursor: 'pointer', width:'24px', height:'24px' }}
                            onClick={props.handleClosePopup}
                        />
                    </div>
                    <div>
                        {props.dialogContent}
                    </div>
                </div>
                {props?.showLoader &&  
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            left: '50%',
                            top: '50%',
                            zIndex: 1000,
                            position: 'absolute'
                        }}
                    >
                        <CircularProgress />
                    </div>
                }
            </DialogContent>
           }
         </Dialog>
    )
};
export default memo(ZopotsuDialog);