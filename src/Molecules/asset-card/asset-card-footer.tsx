import { CloseCircle, DocumentIcon, EditIcon, greenEdit, TickCircleGreen } from '../../assets';
import ZupotsuButton from '../../Atoms/zupotsu-button/zupotsu-button';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, styled } from '@mui/material';
import { useState } from 'react';

export interface AssetCardFooterProps {
  rejectionReasonDescription?: string;
  rejectionReasonDate?: string;
  showButtonView: boolean;
  onFooterButtonClicked?: (buttonKey: string) => void;
  uploadedBriefs?: string;
  statusFilter: any;
  setShowRejectAssetData:any
}
const StyledButton = styled('div')(({ }) => {
  return {
    '& .MuiButton-root': {
      'box-shadow': 'none',
      // width: '220px',
    },
  };
});

export const ExpandableText = ({ text }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expansion state
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine if the text should be truncated
  const shouldTruncate = text?.length > 200;
  const displayText =
    isExpanded || !shouldTruncate ? text : `${text?.substring(0, 200)}...`;

  return (
    <Typography
      sx={{
        color: '#828282',
        fontFamily: 'Inter',
        fontSize: '14px',
        lineHeight: '21px',
      }}
    >
      <span
        style={{
          fontWeight: 600,
          color: '#333333',
        }}
      >
        Rejection Reason:{' '}
      </span>
      {displayText}
      {shouldTruncate && (
        <span
          style={{ fontWeight: 600, color: '#E20B18', cursor: 'pointer' }}
          onClick={toggleExpansion}
        >
          {isExpanded ? ' See Less' : ' See More'}
        </span>
      )}
    </Typography>
  );
};

export function AssetCardFooter(
  {
    rejectionReasonDescription,
    rejectionReasonDate,
    showButtonView = true,
    onFooterButtonClicked,
    uploadedBriefs = '',
    statusFilter,
    
  }: AssetCardFooterProps
) {
  return (
    <>
      {
        // showButtonView
        // selectedCategory == "underReview"
        // true 
        // selectedCategory == {}
        // true ?

        statusFilter == "created" ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // gap: '13px',
              padding: '16px 6.67px',
            }}
          >
            <div
              style={{
                width: '30%',
              }}
            >


              <StyledButton>
                <ZupotsuButton
                  name="Reject"
                  customOutlineColor={"0px solid transparent"}
                  handleClick={() => {
                    onFooterButtonClicked && onFooterButtonClicked('reject');
                  }}
                  isCustomColors={true}
                  customTextColor="#E20B18"
                  customBgColor="rgba(226, 11, 24, 0.05)"
                  padding='12px, 16px, 12px, 16px'
                  leadingIcon={CloseCircle}
                />
              </StyledButton>
            </div>
            <div
              style={{
                width: '30%',
              }}
            >
              <StyledButton>
                <ZupotsuButton
                  name="Accept"
                  handleClick={() => {
                    onFooterButtonClicked && onFooterButtonClicked('accept');
                  }}
                  customOutlineColor={"0px solid transparent"}
                  isCustomColors={true}
                  customTextColor="#219653"
                  customBgColor="rgba(48, 184, 0, 0.1)"
                  customBgColorOnhover="rgba(48, 184, 0, 0.4)"
                  customTextColorOnHover="#219653"
                  // padding="14px 40px"
                  padding='12px, 16px, 12px, 16px'
                  leadingIcon={TickCircleGreen}
                />
              </StyledButton>
            </div>
            <div
              style={{
                width: '30%',
              }}
            >
              <StyledButton>
                <ZupotsuButton
                  name="Edit"
                  handleClick={() => {
                    // onFooterButtonClicked && onFooterButtonClicked('accept');
                  }}
                  customOutlineColor={"0px solid transparent"}
                  isCustomColors={true}
                  customTextColor="#219653"
                  customBgColor="rgba(48, 184, 0, 0.1)"
                  customBgColorOnhover="rgba(48, 184, 0, 0.4)"
                  customTextColorOnHover="#219653"
                  // padding="14px 40px"
                  padding='12px, 16px, 12px, 16px'
                  leadingIcon={greenEdit}
                />
              </StyledButton>
            </div>
          </div>
        ) : statusFilter === "closed" ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingTop: '12px',
          }}
            onClick={() => onFooterButtonClicked && onFooterButtonClicked(uploadedBriefs || '')}
          >
            <Typography
              sx={{
                color: '#333333',
                fontFamily: 'Inter',
                fontSize: '16px',
                lineHeight: '19.36px',
                fontWeight: 600
              }}
            >
              Uploaded Briefs :
            </Typography>
            <Typography
              sx={{
                color: '#E20B18',
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '16.94px',
                fontWeight: 500,
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <img src={DocumentIcon} alt='document' width={20} height={20} />
              <div>{uploadedBriefs}</div>
            </Typography>
          </div>
        ) : statusFilter == "rejected" ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '16px',
            }}
          >
            <ExpandableText text={
              rejectionReasonDescription
            } />

            <Typography
              sx={{
                color: '#BDBDBD',
                fontFamily: 'Inter',
                fontSize: '12px',
                lineHeight: '18px',
                fontWeight: 500,
              }}
            >
              {rejectionReasonDate}
            </Typography>
          </div>
        ) : (<></>)}
    </>
  );
}
export default AssetCardFooter;
