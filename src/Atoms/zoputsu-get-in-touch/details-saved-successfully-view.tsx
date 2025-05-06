import { Typography } from "@mui/material";
import { successTikIcon } from "../../assets";
import useDeviceType from "../../utils/DeviceType";

export function DetailsSavedSuccessfullyView(){
    const deviceType = useDeviceType();
    return(
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            gap:'16px',
            marginBottom:'33px',
            minWidth: deviceType !== 'mobile'?'400px': ''
          }}>
            <img src={successTikIcon} alt="success" width={80} height={80}/>
            <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                gap: '5px'
            }}>
                <Typography  
                    sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        lineHeight: '28px',
                        textAlign: 'center',
                        color:'#333333'
                    }}>
                    Details Applied Successfully 
                </Typography>
                <Typography  
                    sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '22.4px',
                        textAlign: 'center',
                        color:'#333333',
                        textWrap: 'balance'
                    }}>
                    We have received your details. We will get in touch with you shortly.
                </Typography>
            </div>
        </div>
    );
};
export default DetailsSavedSuccessfullyView;