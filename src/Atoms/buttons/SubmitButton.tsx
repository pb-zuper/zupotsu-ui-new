import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
interface SubmitButtonProps {
    onSubmit: () => void;
    buttonText: string;
    disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit, buttonText, disabled }) => {
    return (
        <button type="submit" onClick={onSubmit} style={{ width: 'auto', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', border: "0px solid grey", alignItems: 'center', backgroundColor: disabled ? "rgb(255,172,170)" : 'var(--Zupotso-Primary, #E20B18)', cursor: 'pointer', borderRadius: '5px', paddingLeft: '20px', paddingRight: '20px' }}>

            <p style={{ margin: 0, fontSize: '16px', lineHeight: '21px', color: '#FFF', fontWeight: '500', fontFamily: 'Inter', }}>{buttonText}</p>
            <ChevronRightIcon style={{ color: '#FFF' }} />

        </button>
    );
};

export default SubmitButton;
