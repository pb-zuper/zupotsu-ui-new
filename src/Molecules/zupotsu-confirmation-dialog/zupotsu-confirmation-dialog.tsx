import { Dialog, DialogContent, Typography, useTheme } from '@mui/material';
import './zupotsu-confirmation-dialog.css';
import { successTikIcon } from '../../assets';
import Close from '@mui/icons-material/Close';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import useDeviceType from '../../utils/DeviceType';

export interface ZupotsuConfirmationDialogProps {
  open: boolean;
  handleClose: (action: any, assetId?: any) => void;
  handleCloseIcon?: (action: any) => void;
  handleAction?: (action: any) => void;
  showListContent: boolean;
  buttonName: any;
  comfirmationMessage: any;
  showIcon?: boolean;
  dialogWidth?: string;
  style?: any;
  dialogMargin?: any;
  assetId?: any;
  closedreason?:any;
  setClosedReason?:any;
}

export function ZupotsuConfirmationDialog({
  open,
  handleClose,
  handleCloseIcon,
  showListContent,
  buttonName,
  comfirmationMessage,
  showIcon = true,
  dialogWidth,
  style,
  dialogMargin,
  handleAction,
  assetId = '',
  closedreason,
  setClosedReason,
}: ZupotsuConfirmationDialogProps) {
  const theme = useTheme();
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: '4px',
            width: dialogWidth ? dialogWidth : '523px',
            maxWidth: dialogWidth ? dialogWidth : 'auto',
            margin: dialogMargin ? dialogMargin : '',
          },
        }}
        disableScrollLock
      >
        <DialogContent style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Close
              style={{ alignSelf: 'end', cursor: 'pointer' }}
              onClick={handleCloseIcon}
            />
            {showIcon && <img src={successTikIcon} alt="" />}
            <Typography
              style={
                style
                  ? style
                  : {
                      textAlign: 'center',
                      paddingTop: '16px',
                      color: 'var(--Gray-1, #333)',
                      fontFamily: 'Inter',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      lineHeight: '140%',
                    }
              }
            >
              {comfirmationMessage}
            </Typography>
            {showListContent && (
              <>
                <Typography
                  style={{
                    textAlign: 'center',
                    paddingBottom: '16px',
                    color: 'var(--Gray-1, #333)',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '140%;',
                  }}
                >
                  Your listing will become active once its verified.
                </Typography>
                <Typography
                  style={{
                    paddingBottom: '16px',
                    color: 'var(--Gray-1, #333)',
                    textAlign: 'center',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '140%',
                  }}
                >
                  Do you wish to list an another asset ?
                </Typography>
              </>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                width: '85%',
                paddingBottom: '8px',
                marginTop: buttonName ? '20px' : '0px',
              }}
            >
              <ZupotsuButton
                name={buttonName[0]}
                variant={'outlined'}
                isCustomColors={true}
                customOutlineColor="1px solid #E0E0E0"
                customOutlineColorOnHover="1px solid #E20B18"
                customBgColorOnhover="#fff"
                customBgColor="#fff"
                customTextColorOnHover="#E20B18"
                customTextColor="#828282"
                handleClick={() => handleClose('later')}
                // handleClick={() => handleClose('later')}
              />
              {buttonName?.[1] &&
              <ZupotsuButton
              name={buttonName[1]}
              variant={'outlined'}
              isCustomColors={true}
              customOutlineColor="1px solid #E20B18"
              customOutlineColorOnHover="1px solid #E20B18"
              customBgColorOnhover="#fff"
              customBgColor="#fff"
              customTextColorOnHover="#E20B18"
              customTextColor="#E20B18"
              handleClick={() =>
                handleAction ? handleAction('') : handleClose('yes', assetId)
              }
            />
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ZupotsuConfirmationDialog;
