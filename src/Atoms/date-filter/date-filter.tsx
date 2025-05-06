import { useState } from 'react';
import ZupotsuTextfield from '../../Atoms/zupotsu-textfields/zupotsu-textfields';

export interface DateFilterProps{
    value?: any;
    placeholder: string;
    name: string;
    handleInputChange: (_:any)=> void;
};
export function DateFilter({
    value,
    placeholder,
    name,
    handleInputChange
}: DateFilterProps){
    const [validateDateErrorMessage, setValidateDateErrorMessage] = useState<string>('');
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    
    return(
        <div onClick={()=>setShowDatePicker(prev=> !prev)}>
            <ZupotsuTextfield
                title=""
                value={value || ''}
                placeholder={placeholder}
                isRequired={false}
                name={name}
                errorMessage={validateDateErrorMessage}
                handleChange={handleInputChange}
            />
        </div>
    );
};
export default DateFilter;