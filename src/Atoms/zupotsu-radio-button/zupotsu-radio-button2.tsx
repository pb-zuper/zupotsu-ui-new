import { infoCircle } from '../../assets';
import './zupotsu-radio-button.css';
import useDeviceType from '../../utils/DeviceType';
import ZupotsuTooltip from '../zupotsu-tooltip/zupotsu-tooltip';
import { useEffect } from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export interface ZupotsuRadioButtonProps {
  data: any;
  selected: string;
  isHintAvailable: boolean;
  handleChange: (data: any,index:any) => void;
  disabled?: boolean;
  opindex:any;
  key2?:any;
}

const ZupotsuRadioButton2 = ({
  key2,
  data,
  isHintAvailable,
  selected,
  handleChange,
  disabled = false,
  opindex
}: ZupotsuRadioButtonProps) => {
  const deviceType = useDeviceType();

  const radioLabelStyle = {
    width:'100%',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '140%' /* 22.4px */,
    letterSpacing: '0.16px',
    padding: '13px 8px',
    gap: deviceType === 'mobile' ? '6px' : '',
    color:selected === data.id?'#E22B16':'',
    border:selected === data.id?'none':'',
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.id,opindex);
  };
  useEffect(()=>{
  },[data])

  return (
    <div>
      <div
        // className={`radio-button-border ${disabled ? 'disabled' : ''}`}
        style={{
          opacity: disabled ? 0.6 : 1,
          width:'200px',
          margin:'10px',
          border:selected === data.id?'2px solid #e20b18':'2px solid #ddd',
          borderRadius:"4px",
          display:'flex'
        }}
      >
       
        <input
          type="radio"
          name="payment"
          id={data.id}
          value={data.id}
          checked={selected === data.id}
          onChange={handleRadioChange}
          disabled={disabled}
        />
        <label
          // className={`user-radio-label`}
          htmlFor={data.id}
          style={radioLabelStyle}
        >
        {selected === data.id&&(<RadioButtonCheckedIcon  style={{marginRight:'15px'}}/>)}
        {selected != data.id&&(<RadioButtonUncheckedIcon  style={{marginRight:'15px'}}/>)}
          {data.label}
          {isHintAvailable && (
            <div
              style={{
                position: 'absolute',
                right: deviceType === 'mobile' ? '8px' : '12px',
              }}
            >
              {/* <ZupotsuTooltip
                tooltipTitle={data.label === 'Seller' ? 'Seller' : 'Buyer'}
                tooltipMessage={
                  data.label === 'Seller'
                    ? 'Anyone (institution or individual) managing sporting activities, teams or players, and seeking monetization opportunities'
                    : 'Any Brand, Agency or Individual who are looking to associate with anything related to sports for their business'
                }
                icon={infoCircle}
              /> */}
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default ZupotsuRadioButton2;

