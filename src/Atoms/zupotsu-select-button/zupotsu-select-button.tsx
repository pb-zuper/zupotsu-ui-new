// import { infoCircle } from 'libs/component-lib/src/Assets';
import { infoCircle } from '../../assets';
import './zupotsu-select-button.css';
// import useDeviceType from 'libs/component-lib/src/utils/DeviceType';
import useDeviceType from '../../utils/DeviceType';
import { Tooltip } from '@mui/material';

export interface ZupotsuSelectButtonProps {
  data: any;
  selected: string;
  handleChange: (data: any) => void;
}

const ZupotsuSelectButton = ({
  data,
  selected,
  handleChange,
}: ZupotsuSelectButtonProps) => {
  const deviceType = useDeviceType();

  const radioLabelStyle = {
    // width:
    //   deviceType === 'mobile'
    //     ? '90%'
    //     : deviceType === 'small-tablet'
    //     ? '98%'
    //     : deviceType === 'tablet'
    //     ? '95%'
    //     : '100%',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',   
    fontFamily: 'Inter',
    fontSize: deviceType == "mobile" ? "14px" : '14px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '140%' /* 22.4px */,
    letterSpacing: '0.16px',
    padding: deviceType === 'mobile' ? '13px 10px' : '',
    gap: deviceType === 'mobile' ? '6px' : '',
    borderRadius: '100px',
  };

  const handleRadioChange = (event: any) => {
    handleChange(event.target.id);
  };

  return (
    <>
      <div
        className="radio-button-border"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <input
          className={`visually-hidden`}
          type="radio"
          name="payment"
          id={data.id}
          value={data.id}
          checked={selected === data.id}
          onChange={handleRadioChange}
        />

        <label
          className="select-radio-button"
          htmlFor={data.id}
          style={radioLabelStyle}
        >
          {data.label}
        </label>
      </div>
    </>
  );
};

export default ZupotsuSelectButton;
