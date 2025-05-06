import { useEffect, useState } from 'react';
import ZopotsuDialog from '../../Atoms/zopotsu-dialog/zopotsu-dialog';
import AssetPopupView from './asset-popup-view';
import { styled } from '@mui/material';

export interface ZopotsuAssetRejectPopupProps {
  assetTitle: string;
  buttonClicked: (
    type: string,
    data?: any,
    assetTitle?: string,
    assetId?: string
  ) => void;
  displayPopup?: boolean;
  closePopup?: () => void;
  dialogTitle?: string;
  assetId?: string;
}

export function ZopotsuAssetRejectPopup({
  assetTitle,
  buttonClicked,
  displayPopup,
  closePopup,
  dialogTitle,
}: ZopotsuAssetRejectPopupProps) {
  const [showPopup, setShowPopup] = useState<boolean>(displayPopup || false);

  useEffect(() => {
    setShowPopup(displayPopup || false);
  }, [displayPopup]);
  return (
    <ZopotsuDialog
      showPopup={showPopup}
      dialogContent={
        <AssetPopupView assetTitle={assetTitle} buttonClicked={buttonClicked} />
      }
      handleClosePopup={() => {
        closePopup && closePopup();
      }}
      dialogTitle={dialogTitle}
      dialogPadding="16px 16px 12px"
      dialogWidth="620px"
    ></ZopotsuDialog>
  );
}
export default ZopotsuAssetRejectPopup;
