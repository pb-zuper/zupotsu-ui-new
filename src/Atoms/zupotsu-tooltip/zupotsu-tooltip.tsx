import { Tooltip, Typography } from '@mui/material';
import './zupotsu-tooltip.css';

export interface ZupotsuTooltipProps {
  tooltipTitle?: any;
  tooltipMessage: any;
  icon: any;
}

const ZupotsuTooltip = ({
  tooltipMessage,
  icon,
  tooltipTitle,
}: ZupotsuTooltipProps) => {
  return (
    <>
      <Tooltip
        enterTouchDelay={0}
        title={
          <>
            {tooltipTitle && (
              <Typography
                style={{
                  color: 'var(--Gray-1, #333)',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: '17px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: '140%',
                }}
              >
                {tooltipTitle}
              </Typography>
            )}
            <div
              style={{
                color: 'var(--Gray-2, #4F4F4F)',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '140%' /* 19.6px */,
                letterSpacing: '0.28px',
                marginTop:'5px'
              }}
            >
              {tooltipMessage}
            </div>
          </>
        }
        arrow
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              // bgcolor: 'white',

              color: 'var(--Gray-2, #4F4F4F)',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '140%' /* 19.6px */,
              letterSpacing: '0.28px',
              // maxWidth: '273px',
              width: '273px',
              padding: '10px 12px',
              borderRadius: '4px',
              background: '#FFF',
              boxShadow: '0px 8px 10px 0px rgba(0, 0, 0, 0.15)',
              '& .MuiTooltip-arrow': {
                color: '#FFF',
                // width: '39px',
                // height: '39px',

                // boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
              },
            },
          },
        }}
      >
        <img src={icon} alt="" />
      </Tooltip>
    </>
  );
};

export default ZupotsuTooltip;
