import { Typography } from '@mui/material';
import './zoptsu-underline-title.css';
import useDeviceType from '../../utils/DeviceType';

export interface ZoptsuUnderlineTitleProps {
  letterSpacing?: string;
  titleText?: string;
  fontSizeOnLargeScreen?: string;
  fontSizeOnMediumScreen?: string;
  fontSizeOnSmallScreen?: string;
  fontSizeOnExtraSmallScreen?: string;
  underlineWidthForDesktop?: string;
  underlineWidthForSmallTablet?: string;
  underlineWidthForMobile?: string;
  underlineBottomForDesktop?: string;
  underlineBottomForSmallTablet?: string;
  underlineBottomForMobile?: string;
  linearGradientPresent?: boolean;
  paddingLeft?: string;
  lineHeight?: string;
  underlineHeight?: string;
  underlineHeightForMobile?: string;
  underlineColor?: string;
  textAlign?: string;
  textColor?: string;
}

const ZoptsuUnderlineTitle = (props: ZoptsuUnderlineTitleProps) => {
  const deviceType = useDeviceType();
  return (
    <div
      className="underline-title-decoration"
      style={{
        position: 'relative',
        width:
          props.textAlign === 'center'
            ? deviceType === 'desktop' || deviceType === 'tablet'
              ? props.underlineWidthForDesktop
              : deviceType === 'small-tablet'
              ? props.underlineWidthForSmallTablet
              : deviceType === 'mobile'
              ? props.underlineWidthForMobile
              : '340px'
            : '',
        // margin: 'auto',
        display: 'flex',
        justifyContent: props.textAlign || 'center',
      }}
    >
      <Typography
        // variant="h3"
        sx={{
          fontSize: {
            xs: props.fontSizeOnExtraSmallScreen || '40px',
            sm: props.fontSizeOnSmallScreen || '50px',
            md: props.fontSizeOnMediumScreen || '50px',
            lg: props.fontSizeOnLargeScreen || '60px',
          },
          paddingLeft: props.paddingLeft ? props.paddingLeft : '11px',
          // display: 'inline',
          color: props.textColor ? props.textColor : 'var(--Gray-1, #333)',
          fontFamily: 'Bebas Neue',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: props.lineHeight ? props.lineHeight : '65px',
          // letterSpacing: '9px',
          letterSpacing: props.letterSpacing || '9px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
          textOverflow: 'ellipsis',
          textAlign:'left',
          marginBottom:'15px'
        }}
      >
        {props.titleText ? props.titleText : ""}
      </Typography>
      <span
        className={`bold underline-striked ${
          props.linearGradientPresent && 'linear-gradient'
        } ${props.underlineColor && 'white-underline-color'}`}
        style={{
          height:
            deviceType === 'desktop' ||
            deviceType === 'tablet' ||
            deviceType === 'small-tablet'
              ? props?.underlineHeight
              : deviceType === 'mobile'
              ? props?.underlineHeightForMobile
              : props.underlineHeight,

          width:
            deviceType === 'desktop' || deviceType === 'tablet'
              ? props.underlineWidthForDesktop
              : deviceType === 'small-tablet'
              ? props.underlineWidthForSmallTablet
              : deviceType === 'mobile'
              ? props.underlineWidthForMobile
              : props.underlineWidthForDesktop,
          bottom:
            deviceType === 'desktop' || deviceType === 'tablet'
              ? props.underlineBottomForDesktop
              : deviceType === 'small-tablet'
              ? props.underlineBottomForSmallTablet
              : deviceType === 'mobile'
              ? props.underlineBottomForMobile
              : props.underlineBottomForDesktop,
        }}
      ></span>
    </div>
  );
};

export default ZoptsuUnderlineTitle;
