import { Button, Typography } from '@mui/material';
import './prev-next-buttons.css';
// import useDeviceType from 'libs/component-lib/src/utils/DeviceType';
import useDeviceType from '../../utils/DeviceType';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface ZupotsuPrevNextButtonsProps {
  isAtStart?: boolean;
  isAtEnd?: boolean;
  handlePrevClick?: () => void;
  handleNextClick?: () => void;
}

const ZupotsuPrevNextButtons = ({
  isAtStart,
  isAtEnd,
  handleNextClick,
  handlePrevClick,
}: ZupotsuPrevNextButtonsProps) => {
  return (
    <>
      <div
        className="whats-hot-prev-next-buttons"
        style={{
          paddingRight: '0px',
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          paddingTop: '24px',
        }}
      >
        <Button
          color="error"
          style={{ maxWidth: '36px', minWidth: '36px' }}
          variant="contained"
          startIcon={<NavigateBeforeIcon />}
          disabled={isAtStart}
          onClick={handlePrevClick}
        ></Button>
        <Button
          color="error"
          style={{ maxWidth: '36px', minWidth: '36px' }}
          variant="contained"
          startIcon={<NavigateNextIcon />}
          disabled={isAtEnd}
          onClick={handleNextClick}
        ></Button>
      </div>
    </>
  );
};

export default ZupotsuPrevNextButtons;
