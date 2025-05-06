import { Breadcrumbs as MuiBreadCrumb, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
// import IconComponent, {
//   IconType,
// } from '../../POC/icon-component/icon-component';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import useDeviceType from 'libs/component-lib/src/utils/DeviceType';
import useDeviceType from '../../utils/DeviceType';
import { useState } from 'react';

// export interface BreadcrumbProps {
//   linkDetails: Array<{
//     label: string;
//     url?: string;
//   }>;
//   itemBeforeCollapse?: number;
//   itemAfterCollapse?: number;
//   maxItems?: number;
//   color?: 'primary' | 'secondary' | 'error';
//   underline?: 'always' | 'hover' | 'none';
//   variant?:
//     | 'body1'
//     | 'body2'
//     | 'button'
//     | 'caption'
//     | 'h1'
//     | 'h2'
//     | 'h3'
//     | 'h4'
//     | 'h5'
//     | 'h6'
//     | 'inherit'
//     | 'overline'
//     | 'subtitle1'
//     | 'subtitle2';
//   iconName: any;
//   iconSize: number;
//   iconLabel?: string;
//   iconColor?: string;
//   iconStyle?: IconType;
// }

export function Breadcrumb(props: any) {
  const deviceType = useDeviceType();
  const dslTheme = useTheme();
  const navigate = useNavigate();
  // State to track the hovered index
  const [hoveredIndex, setHoveredIndex] = useState<any>(null);

  // const [isHovered, setIsHovered] = useState(false);

  const handleHover = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const StyledBreadcrumb = styled('div')(({ theme }) => {
    return {
      '& .MuiSvgIcon-root': {
        backgroundColor: dslTheme.palette.background.default,
      },
    };
  });
  return (
    <StyledBreadcrumb
      style={{
        // margin: '6px 0px',
        display: 'flex',
        alignItems: 'center',
        // border: '1px solid red',
      }}
    >
      <MuiBreadCrumb
        sx={{ lineHeight: 'initial' }}
        separator={
          // <IconComponent
          //   name={props?.iconName}
          //   size={props?.iconSize}
          //   color={props?.iconColor || dslTheme.palette.text.primary}
          //   label={props?.iconLabel}
          //   style={props?.iconStyle}
          // />
          <KeyboardArrowRightIcon
            style={{
              background: 'transparent',
              color: props.textColor || '#FFFFFF',
              height: deviceType === 'mobile' ? '12px' : '',
              width: deviceType === 'mobile' ? '12px' : '',
              marginTop: deviceType === 'mobile' ? '3px' : '',
            }}
          />
        }
        maxItems={props.maxItems}
        aria-label="breadcrumb"
        itemsAfterCollapse={props.itemAfterCollapse}
        itemsBeforeCollapse={props.itemBeforeCollapse}
      >
        {props?.linkDetails?.map((breadcrumbItem: any, index: any) => {
          return index < props.linkDetails.length - 1 ? (
            <div key={index}   onClick={() => { navigate(breadcrumbItem.url) }}>
              <Link
                key={index}
                color={'#B7B7B7'}
                to={breadcrumbItem.url}
                onClick={() => { navigate(breadcrumbItem.url) }}
                onMouseEnter={() =>
                  handleHover(index)
                } 
                onMouseLeave={handleMouseLeave}
                style={{
                  fontFamily: 'Inter',
                  // color: isHovered ? props.hoverColor || '#6b6464' : '#B7B7B7',
                  color: '#B7B7B7',
                  fontSize: deviceType === 'mobile' ? '12px' : '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  // lineHeight: 'unset',
                }}
              >
                {breadcrumbItem.label}
              </Link>
            </div>
          ) : (
            <div>
              <Link
                key={index}
                color={props.color || '#FFFFFF'}
                to={''}
                onClick={(e) => { e.preventDefault(); }}
                style={{
                  fontSize: deviceType === 'mobile' ? '12px' : '14px',
                  fontWeight: '500',
                  fontFamily: 'Inter',
                  color: props.color,
                  textDecoration: 'none',
                  // lineHeight: 'unset',
                }}
              >
                {breadcrumbItem.label}
              </Link>
            </div>
          );
        })}
      </MuiBreadCrumb>
    </StyledBreadcrumb>
  );
}

export default Breadcrumb;
