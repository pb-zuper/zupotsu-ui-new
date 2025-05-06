import { Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export interface ListItemProps {
  title: string;
  content: string;
  id: string;
  onClick: any;
  isClicked: any;
  investmentVisibility?: boolean;
}

export function ListItem({
  title,
  content,
  onClick,
  id,
  isClicked,
  investmentVisibility,
}: ListItemProps) {
  const navigate = useNavigate();
  const [elementClicked, setElementClicked] = useState('');
  const clickedId = '';
  const handleOnClickAction = () => {
    setElementClicked(id);
    onClick(id);
  };

  return (
    <div
      key={id}
      style={{
        width: isClicked ? '100%' : '90%',
        padding: '12px',
        height: 'fit-content',
        borderRadius: '5px',
        border: '1px solid var(--Gray-5, #E0E0E0)',
        borderRight: isClicked
          ? '1px solid var(--Gray-5, white)'
          : '1px solid var(--Gray-5, #E0E0E0)',
        background: '#FFF',
        marginBottom: '24px',
        cursor: 'pointer',
        zIndex: 1,
      }}
      onClick={handleOnClickAction}
    >
      <Typography
        sx={{
          color: 'var(--Gray-1, #333)',
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal',
          marginBottom: '8px',
        }}
      >
        {title}
      </Typography>
      {investmentVisibility && (
        <>
          {content?.slice(-3) && (
            <Typography
              sx={{
                color: 'var(--Zupotso-Primary, #E20B18)',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '140%', // You can adjust this value as needed
              }}
            >
              {content.endsWith('INR')
                ? '₹'
                : content.endsWith('USD')
                ? '$'
                : ''}
              {content?.slice(0, -3)}
            </Typography>
          )}
        </>
      )}
    </div>
  );
}

export default ListItem;
