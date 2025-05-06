import { Typography } from '@mui/material';
import './zupotsu-links.css';
import useDeviceType from '../../utils/DeviceType';

export interface ZupotsuLinksObjectData {
  linkTitle: string;
  imgIcon: string;
  action: string;

}

export interface ZupotsuLinksProps {
  links: ZupotsuLinksObjectData[];
  handleLinkClick: (value: string) => void;
  disabled?: boolean;
}

const ZupotsuLinks = ({
  links,
  handleLinkClick,
  disabled,
}: ZupotsuLinksProps) => {
  const deviceType = useDeviceType();

  return (
    <>
      <div
        style={{
          display: deviceType === 'mobile' ? 'grid' : 'flex',
          gridTemplateColumns: deviceType === 'mobile' ? 'auto auto' : '',
          justifyContent: deviceType === 'mobile' ? 'center' : 'end',
          gap: '1.5em',
          marginTop: '26px',
          marginRight: deviceType === 'mobile' ? '' : '4.427vw',
        }}
      >
        {links &&
          links.map((data: any) => (
            <div
              key={data.linkTitle} // add a unique key for each link
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
              }}
              onClick={() => !disabled && handleLinkClick(data.action)}
            >
              <img src={data.imgIcon} alt="" style={{ width: '24px' }} />
              <Typography
                sx={{
                  color: 'var(--Blue-1, #2F80ED)',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: {
                    xs: '12px',
                    sm: '14px',
                    md: '16px',
                    lg: '16px',
                  },
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '26px',
                }}
              >
                {data.linkTitle}
              </Typography>
            </div>
          ))}
      </div>
    </>
  );
};
export default ZupotsuLinks;
