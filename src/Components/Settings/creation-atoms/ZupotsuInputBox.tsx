import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const ZupotsuInputBox: React.FC = () => {
    const [fieldName, setFieldName] = useState("");
    const [fieldValue, setFieldValue] = useState("");

    const handleFieldNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldName(e.target.value);
    };

    const handleFieldValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(e.target.value);
    };

    return (
        <Grid  spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
                <TextField
                    size="small"
                    placeholder="Define field name"
                    fullWidth
                    disabled={false}
                    name="fieldName"
                    id="fieldName"
                    type="text"
                    value={fieldName}
                    onChange={handleFieldNameChange}
                    inputProps={{ maxLength: 50 }} // example max length of 50 characters
                />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <TextField
                    size="small"
                    placeholder="Enter value"
                    fullWidth
                    disabled={false}
                    name="fieldValue"
                    id="fieldValue"
                    type="text"
                    value={fieldValue}
                    onChange={handleFieldValueChange}
                    inputProps={{ maxLength: 100 }} // example max length of 100 characters
                />
            </Grid>
        </Grid>
    );
};

export default ZupotsuInputBox;


// import React, { useState } from 'react';
// import { TextField } from '@mui/material';

// const ZupotsuInputBox: React.FC = () => {
//     const [fieldName, setFieldName] = useState("");
//     const [fieldValue, setFieldValue] = useState("");

//     const handleFieldNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFieldName(e.target.value);
//     };

//     const handleFieldValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFieldValue(e.target.value);
//     };

//     return (
//         <div style={{ display: 'flex',flexDirection:"row", justifyContent: 'space-evenly', alignItems: 'center',  }}>
//             {/* <div style={{ width: '100%',  }}> */}
              
//                     <TextField
//                         size="small"
//                         placeholder="Define field name"
//                         fullWidth
//                         disabled={false}
//                         name="fieldName"
//                         id="fieldName"
//                         type="text"
//                         value={fieldName}
//                         onChange={handleFieldNameChange}
//                         inputProps={{ maxLength: 50 }} // example max length of 50 characters
//                     />
            
//                     <TextField
//                         size="small"
//                         placeholder="Enter value"
//                         fullWidth
//                         disabled={false}
//                         name="fieldValue"
//                         id="fieldValue"
//                         type="text"
//                         value={fieldValue}
//                         onChange={handleFieldValueChange}
//                         inputProps={{ maxLength: 100 }} // example max length of 100 characters
//                     />
//             {/* </div> */}
//         </div>
//     );
// };

// export default ZupotsuInputBox;
