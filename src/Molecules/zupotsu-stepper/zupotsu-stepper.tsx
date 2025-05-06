import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { verifyIcon } from '../../assets';
import useDeviceType from '../../utils/DeviceType';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: "6px",
    borderRadius: '3px',
    border: 0,
    // backgroundColor:'#eaeaf0'
    //   theme.palette.mode === 'dark' ? "rgba(224, 224, 224, 1)" : '#eaeaf0',
    // borderRadius: 1,
    background:'#eaeaf0'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'linear-gradient(to right, #E20B18 50%, #eaeaf0 50%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: '#E20B18',
      // background: 'rgba(79, 79, 79, 1)',
      height: '6px',
      borderRadius: '3px',
    },
  },
 

  
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
  height: any;
  width: any;
}>(({ theme, ownerState, height, width }) => ({
  zIndex: 1,
  border: '1px solid #ccc',
  color: '#828282',
  width: width ? width : 50,
  height: height ? height : 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    color: 'white',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : 'red',

    border: '1px solid red',
  }),
  ...(ownerState.completed && {
    backgroundColor: 'red',
    border: '1px solid red',
  }),
}));

function ColorlibStepIcon(props: any) {
  const { active, completed, className } = props;

  // const icons: { [index: string]: React.ReactElement } = {
  //   1: <SettingsIcon />,
  //   2: <GroupAddIcon />,
  //   3: <VideoLabelIcon />,
  // };

  return (
    <ColorlibStepIconRoot
      height={props?.height}
      width={props?.width}
      ownerState={{ completed, active }}
      className={className}
      sx={{ color: completed ? "#FFF" : active ? "#FFF" : "#828282" }}
    >
      {
        // completed ? <img src={verifyIcon} alt="" /> :
        props.step}
    </ColorlibStepIconRoot>
  );
}

export interface ZupotsuStepperProps {
  steps: any;
  alternativeLabelPresent?: boolean;
  myActiveStep: number;
  showLabel: boolean;
  stepperCirclesWidthHeightProps?: {
    width?: string | number;
    height?: string | number;
  };
  stepNumberFontSize?: string;
  isEdit?: boolean;
  onStepClick?: (step: number) => void;
}


export function ZupotsuStepper({
  steps,
  myActiveStep,
  alternativeLabelPresent,
  showLabel,
  stepperCirclesWidthHeightProps,
  stepNumberFontSize,
  isEdit = false,
  onStepClick,
}: ZupotsuStepperProps) {
  const deviceType = useDeviceType()
  return (
    <Stack sx={{
      width: '100%', display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: 'center',
      '& .MuiStack-root': {
        // width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
      },
      '& .MuiStepper-root': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: deviceType === "mobile" ? 'flex-start' : "center",
        flexDirection: deviceType === "mobile" ? "column" : "row"
      },
    }}
      spacing={4}>
      <Stepper
        alternativeLabel={alternativeLabelPresent || false}
        activeStep={myActiveStep}
        connector={<ColorlibConnector />}
        sx={{ width: '100%', }}
      >
        {steps.map((data: any, index: any) => (
          <Step key={data.label}>
            <StepLabel
              onClick={() => {
                if (!isEdit) {
                  if (index !== steps.length - 1) {
                    onStepClick && onStepClick(index);
                  }
                } else {
                  onStepClick && onStepClick(index);
                }
              }}
              style={{
                cursor: !isEdit
                  ? index !== steps.length - 1 && myActiveStep != index
                    ? 'pointer'
                    : 'initial'
                  : 'pointer',
                color: 'var(--Zupotso-Primary, #E20B18)',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: stepNumberFontSize ? stepNumberFontSize : '20px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
              }}
              StepIconComponent={(props) => (
                (data.step) && (<ColorlibStepIcon
                  key={index}
                  {...props}
                  step={data.step}
                  height={stepperCirclesWidthHeightProps?.height}
                  width={stepperCirclesWidthHeightProps?.width}
                  completedStepIcon={data.completedStepIcon}
                  completed={(myActiveStep-1) === index || index < (myActiveStep-1)?true:false}
                  active={(myActiveStep-1) === index || index < (myActiveStep-1)?true:false}
                />)
              )}
            >
              <span
                style={{
                  color:
                    (myActiveStep-1) === index || index < (myActiveStep-1)
                      ? 'var(--Zupotso-Primary, #E20B18)'
                      : '#BDBDBD',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: '140%',
                }}
              >
                {showLabel && data.label}
              </span>
            </StepLabel>

          </Step>
        ))}

      </Stepper>
      {/* <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 0,
        padding: 0
      }}>
        <div className={`ColorlibStepIcon`} style={{
          margin: 0,
          padding: 0, color: 'red', backgroundColor: "#eaeaf0", height: '6px', width: 'auto', borderRadius: "6px"
        }}>

        </div>
      </div> */}




    </Stack>
  );
}

export default ZupotsuStepper;
