// import { infoCircle } from 'libs/component-lib/src/Assets';
import { infoCircle } from '../../assets';
import './zupotsu-select-oppo-filter.css';
// import useDeviceType from 'libs/component-lib/src/utils/DeviceType';
import useDeviceType from '../../utils/DeviceType';
import { useState } from 'react';

export interface ZupotsuSelectOppFilterProps {
  data: any;
  selected: string;
  handleChange: (data: any) => void;
  onClick?: any;
  isClicked?: any;
  id?: any;
  investmentVisibility?: any;
}

const ZupotsuSelectOppFilter = ({
  data,
  selected,
  handleChange,
  onClick,
  isClicked,
  id,
  investmentVisibility,
}: ZupotsuSelectOppFilterProps) => {
  const [elementClicked, setElementClicked] = useState('');
  const handleOnClickAction = () => {
    setElementClicked(id);
    onClick(id);
  };
  const deviceType = useDeviceType();

  const radioLabelStyle = {
    width: 'max-content',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    letterSpacing: '0.16px',
    padding: deviceType === 'mobile' ? '6px 8px' : '',
    color: 'var(--Gray-1, #333)',
  };

  const handleRadioChange = (event: any) => {
    handleChange(event.target.id);
  };

  return (
    <>
      <div
        key={id}
        className="oppo-select-filter-border"
        style={{
          // width: '10%',
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
        }}
        onClick={handleOnClickAction}
      >
        <input
          className={`opp-filter-visually-hidden`}
          type="radio"
          name="payment"
          id={id}
          value={id}
          checked={isClicked}
          onChange={handleRadioChange}
        />

        <label
          className="opp-select-filter-button"
          htmlFor={id}
          style={radioLabelStyle}
        >
          {data.name}
          {investmentVisibility && (
            <>
              {data?.investment?.slice(-3) && (
                <span
                  style={{
                    paddingLeft: '12px',
                    color: '#E20B18',
                  }}
                >
                  {data.investment.endsWith('INR')
                    ? '₹'
                    : data.investment.endsWith('USD')
                    ? '$'
                    : ''}
                  {/* {data.investment.match(/\d+/)[0]} */}
                  {data?.investment?.slice(0, -3)}
                </span>
              )}
            </>
          )}
        </label>
      </div>
    </>
  );
};
export default ZupotsuSelectOppFilter;
