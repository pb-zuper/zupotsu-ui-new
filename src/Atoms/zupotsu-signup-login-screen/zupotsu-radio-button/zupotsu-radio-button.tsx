import { infoCircle } from '../../../assets';
import './zupotsu-radio-button.css';
import useDeviceType from '../../../utils/DeviceType';
import ZupotsuTooltip from '../../zupotsu-tooltip/zupotsu-tooltip';


export interface ZupotsuRadioButtonProps {
  data: any;
  selected: string;
  isHintAvailable: boolean;
  handleChange: (data: any) => void;
  disabled?: boolean;
  isfullwidth?:boolean
}

const ZupotsuRadioButton = ({
  data,
  isHintAvailable,
  selected,
  handleChange,
  disabled = false,
  isfullwidth
}: ZupotsuRadioButtonProps) => {
  const deviceType = useDeviceType();

  const radioLabelStyle = {
    width: '100%',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '140%' /* 22.4px */,
    letterSpacing: '0.16px',
    padding: deviceType === 'mobile' ? '13px 8px' : '',
    gap: deviceType === 'mobile' ? '6px' : '',
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.id);
  };

  return (

    <div
      className={`radio-button-border ${disabled ? 'disabled' : ''}`}
      style={{
        opacity: disabled ? 0.6 : 1,
        width: isfullwidth?'100%':deviceType == "mobile" ? "50%" : '50%',
        // margin: '10px',

      }}
    >
      <input
        style={{
          width:"20px",
          height:"20px"
        }}
        type="radio"
        name="payment"
        id={data.id}
        value={data.id}
        checked={selected === data.id}
        onChange={handleRadioChange}
        disabled={disabled}
      />
      <label
        className={`user-radio-label ${disabled ? 'disabled' : ''}`}
        htmlFor={data.id}
        style={radioLabelStyle}
      >
        {data.label}
        {isHintAvailable && (
          <div
            style={{
              position: 'absolute',
              right: deviceType === 'mobile' ? '8px' : '12px',
            }}
          >
            <ZupotsuTooltip
              tooltipTitle={data.label === 'Seller' ? 'Seller' : 'Buyer'}
              tooltipMessage={
                data.label === 'Seller'
                  ? 'Anyone (institution or individual) managing sporting activities, teams or players, and seeking monetization opportunities'
                  : 'Any Brand, Agency or Individual who are looking to associate with anything related to sports for their business'
              }
              icon={infoCircle}
            />
          </div>
        )}
      </label>
    </div>

  );
};

export default ZupotsuRadioButton;

