import useDeviceType from '../../utils/DeviceType';
import { rightRedCircularIcon } from '../../assets';

export interface ZupotsuPrevNextCircularButtonsProps {
  isAtStart?: boolean;
  isAtEnd?: boolean;
  left?: string;
  right?: string;
  marginLeftRightForMobile?: string;
  marginLeftRightForDesktop?: string;
  handlePrevClick?: () => void;
  handleNextClick?: () => void;
}

const ZupotsuPrevNextCircularButtons = ({
  isAtStart,
  isAtEnd,
  left,
  right,
  marginLeftRightForMobile,
  marginLeftRightForDesktop,
  handleNextClick,
  handlePrevClick,
}: ZupotsuPrevNextCircularButtonsProps) => {
  const deviceType = useDeviceType();
  return (
    <>
      <img
        style={{
          position: 'absolute',
          top: '50%',
          left: left || '0',
          cursor: 'pointer',
          marginLeft:
            deviceType === 'mobile'
              ? marginLeftRightForMobile || '2px'
              : marginLeftRightForDesktop || '60px',
          opacity: isAtStart ? '0' : '1',
        }}
        onClick={handlePrevClick}
        src={rightRedCircularIcon}
        alt=""
      />

      <img
        style={{
          position: 'absolute',
          cursor: 'pointer',
          top: '50%',
          right: right || '0',
          marginRight:
            deviceType === 'mobile'
              ? marginLeftRightForMobile || '2px'
              : marginLeftRightForDesktop || '60px',
          opacity: isAtEnd ? '0' : '1',
        }}
        onClick={handleNextClick}
        src={rightRedCircularIcon}
        alt=""
      />
    </>
  );
};

export default ZupotsuPrevNextCircularButtons;
