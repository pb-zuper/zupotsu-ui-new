import { Button, CircularProgress } from '@mui/material';
import './zupotsu-button.css';
import useDeviceType from '../../utils/DeviceType';

export interface ZupotsuButtonProps {
  name?: string;
  disabled?: boolean;
  trailingIcon?: any;
  leadingIcon?: any;
  isCustomColors?: boolean;
  customBgColor?: string;
  customTextColor?: string;
  customBgColorOnhover?: string;
  customTextColorOnHover?: string;
  variant?: any;
  customOutlineColor?: string;
  padding?: string;
  imageWidth?: string;
  imageHeight?: string;
  load?: boolean;
  customOutlineColorOnHover?: string;
  handleClick: (action: any) => void;
}

const ZupotsuButton = ({
  name,
  disabled,
  variant = 'contained',
  trailingIcon,
  leadingIcon,
  isCustomColors = false,
  customBgColor,
  customTextColor,
  customBgColorOnhover,
  customTextColorOnHover,
  customOutlineColor,
  load,
  customOutlineColorOnHover,
  padding,
  imageHeight,
  imageWidth,
  handleClick,
}: ZupotsuButtonProps) => {
  const deviceType = useDeviceType();

  const classes: any = {
    button: {
      background: customBgColor || 'rgba(226, 11, 24, 0.05)',
      color: customTextColor || 'red',
      border: customOutlineColor || "1px solid rgba(189, 189, 189, 1)",
      '&:hover': {
        backgroundColor: customBgColorOnhover || '#ffd7d7',
        color: customTextColorOnHover || 'red',
      },
    }
  };

  return (
    <>
      {deviceType !== 'mobile' ? (
        <div>
          <Button
            variant={variant}
            fullWidth
            color="error"
            disabled={disabled || load}
            style={{
              padding: padding || '12px 16px',
              textTransform: 'none',
              color: !isCustomColors ? '#FFF' : '',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '140%',
              background: disabled ? "rgb(255,172,170)" : customBgColor || 'rgba(226, 11, 24, 0.05)',
              border: customOutlineColor || "1px solid rgba(189, 189, 189, 1)"
            }}
            onClick={(event) => handleClick(event)}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {load ? (
                <CircularProgress size={24} style={{ color: '#E20B18' }} />
              ) : (
                <>
                  {leadingIcon && (
                    <img
                      src={leadingIcon}
                      style={{
                        marginRight: '8px',
                        width: imageWidth || '',
                        height: imageHeight || '',
                        opacity: disabled ? 0.4 : 1
                      }}
                      alt="leading-icon"
                    />
                  )}
                  <span style={{
                    color: customTextColor || "#FFF",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                  }}>{name}</span>
                  {trailingIcon && (
                    <div style={{ marginLeft: '8px' }}>
                      <img
                        src={trailingIcon}
                        style={{
                          display: 'flex',
                          alignItems: 'end',
                          width: imageWidth || '',
                          height: imageHeight || '',
                        }}
                        alt="trailing-icon"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </Button>
        </div>
      ) : (
        <Button
          variant={variant}
          fullWidth
          color="error"
          disabled={disabled || load}
          style={{
            padding: padding || '12px 16px',
            textTransform: 'none',
            color: !isCustomColors ? '#FFF' : '',
            fontFamily: 'Inter',
            fontSize: deviceType === 'mobile' ? '14px' : '16px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '140%',
            background: customBgColor || 'rgba(226, 11, 24, 0.05)',
          }}
          onClick={() => handleClick(name)}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {load ? (
              <CircularProgress size={24} />
            ) : (
              <>
                {leadingIcon && (
                  <img
                    src={leadingIcon}
                    style={{
                      marginRight: '8px',
                      width: imageWidth || '',
                      height: imageHeight || '',
                      opacity: disabled ? 0.4 : 1
                    }}
                    alt="leading-icon"
                  />
                )}
                <span style={{
                  color: customTextColor || "#FFF",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "21px",
                }}>{name}</span>
                {trailingIcon && (
                  <div style={{ marginLeft: '8px' }}>
                    <img
                      src={trailingIcon}
                      style={{
                        display: 'flex',
                        alignItems: 'end',
                        width: imageWidth || '',
                        height: imageHeight || '',
                      }}
                      alt="trailing-icon"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </Button>
      )}
    </>
  );
};

export default ZupotsuButton;
