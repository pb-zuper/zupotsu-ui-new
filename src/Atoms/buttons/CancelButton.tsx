import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface CancelButtonProps {
    onSubmit: () => void;
    buttonText: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onSubmit, buttonText }) => {
    return (
        <button type="submit" onClick={onSubmit} style={{ width: '150px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: "1px solid grey",cursor:'pointer',backgroundColor:"#FFF",borderRadius:'5px' }}>
            <ChevronLeftIcon style={{ color: 'grey' }} />
            <p style={{ margin:0, fontSize: '16px',color:'grey', lineHeight: '21px', fontWeight: '500', fontFamily: 'Inter' }}>{buttonText}</p>

        </button>
    );
};

export default CancelButton;
