

// import { Box, Typography } from '@mui/material';
// import React, { useRef } from 'react';
// import ZupotsuTooltip from '../zupotsu-tooltip/zupotsu-tooltip';
// import { infoCircle } from '../../assets';
// export interface ZupotsuTextfieldProps {
//     title: string;
//     placeholder: string;
//     value?: string;
//     isRequired?: boolean;
//     errorMessage?: string;
//     type?: string;
//     name?: string;
//     multiline?: boolean;
//     rows?: any;
//     trailingIcon?: any;
//     toolTipMessage?: string;
//     bracketText?: any;
//     trailImageHeight?: string;
//     trailImageWidth?: string;
//     handleChange?: (e: any) => void;
//     previewMode?: boolean;
//     description?: string;
//     currencyFormat?: boolean;
//     maxLength?: number;
//     hideLabel?: any;
//     isPassword?: any;
//     onKeyDown?: any
// }
// const Texteditor: React.FC<ZupotsuTextfieldProps> = ({
//     title,
//     placeholder,
//     value,
//     isRequired,
//     errorMessage,
//     type,
//     name,
//     multiline,
//     rows,
//     trailingIcon,
//     toolTipMessage,
//     bracketText,
//     trailImageHeight,
//     trailImageWidth,
//     handleChange,
//     previewMode,
//     description,
//     currencyFormat = false,
//     maxLength,
//     hideLabel,
//     isPassword,
//     onKeyDown
// }) => {
//     const editorRef = useRef<HTMLDivElement>(null);
//     const handleFormat = (command: string) => {
//         // const isActive:any = document.queryCommandState(command);
//         document.execCommand(command, false, undefined);
//     };
//     return (
//         <Box sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%' }}>
//             <Typography
//                 style={{
//                     marginBottom: '10px',
//                     color: 'var(--Gray-1, #333)',
//                     fontFamily: 'Inter',
//                     fontSize: '14px',
//                     fontStyle: 'normal',
//                     lineHeight: '140%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     fontWeight: '600'
//                 }}
//             >
//                 <div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <div
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'start',
//                             alignItems: 'center',
//                             fontStyle: 'Inter',
//                             fontWeight: '600',
//                         }}
//                     >
//                         <span
//                             style={{
//                                 fontSize: '14px',
//                                 lineHeight: "21px",
//                                 fontStyle: 'Inter',
//                                 fontWeight: '700',
//                             }}
//                         >{hideLabel ? "" : title}</span>
//                         {isRequired && (
//                             <span
//                                 style={{
//                                     color: 'var(--Zupotso-Primary, #E20B18)',
//                                     fontFamily: 'Inter',
//                                     fontSize: '16px',
//                                     fontStyle: 'normal',
//                                     fontWeight: '700',
//                                     lineHeight: '140%',
//                                 }}
//                             >
//                                 *
//                             </span>
//                         )}
//                         {bracketText && (
//                             <span style={{ fontWeight: '400' }}>
//                                 <i>{bracketText}</i>
//                             </span>
//                         )}
//                         <span
//                             style={{
//                                 paddingLeft: '8px',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             {toolTipMessage && (
//                                 <ZupotsuTooltip
//                                     tooltipMessage={toolTipMessage}
//                                     icon={infoCircle}
//                                 />
//                             )}
//                         </span>
//                     </div>
                   
//                 </div>
//                 {description && (
//                     <div
//                         style={{
//                             color: 'var(--Gray-1, #828282)',
//                             fontFamily: 'Inter',
//                             fontSize: '14px',
//                             fontStyle: 'normal',
//                             fontWeight: '400',
//                             display: 'flex',
//                             flexDirection: 'column',
//                         }}
//                     >
//                         {description}
//                     </div>
//                 )}
//             </Typography>
//             <div style={{
//                 padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%', border: '1px solid #ccc',
//                 borderRadius: '5px',
//             }}>
//                 <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "flex-start", }}>
//                     <button style={{ backgroundColor: 'transparent', border: "1px solid transparent", borderRadius: '3px', fontFamily: 'Inter', fontWeight: '400', fontSize: "14px" }} onClick={() => handleFormat('bold')}>Bold</button>
//                     <button style={{ backgroundColor: 'transparent', border: "1px solid transparent", borderRadius: '3px', fontFamily: 'Inter', fontWeight: '400', fontSize: "14px" }} onClick={() => handleFormat('italic')}>Italic</button>
//                     <button style={{ backgroundColor: 'transparent', border: "1px solid transparent", borderRadius: '3px', fontFamily: 'Inter', fontWeight: '400', fontSize: "14px" }} onClick={() => handleFormat('underline')}>Underline</button>
//                 </div>

//                 <div
//                     ref={editorRef}
//                     contentEditable={true}
//                     style={{
//                         border: '1px solid #ccc',
//                         padding: '10px',
//                         minHeight: '150px',
//                         borderRadius: '5px',
//                         borderTopLeftRadius: '0px',
//                         borderTopRightRadius: '0px',
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'flex-start',
//                         textAlign: "left",
//                         verticalAlign: "top",
//                     }}
//                 >

//                 </div>
//             </div>
//         </Box>
//     );
// };

// export default Texteditor;


import { Box, Typography } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import ZupotsuTooltip from '../zupotsu-tooltip/zupotsu-tooltip';
import { infoCircle } from '../../assets';

export interface ZupotsuTextfieldProps {
    title: string;
    placeholder: string;
    value?: string;
    isRequired?: boolean;
    errorMessage?: string;
    type?: string;
    name?: string;
    multiline?: boolean;
    rows?: any;
    trailingIcon?: any;
    toolTipMessage?: string;
    bracketText?: any;
    trailImageHeight?: string;
    trailImageWidth?: string;
    handleChange?: (e: any) => void;
    previewMode?: boolean;
    description?: string;
    currencyFormat?: boolean;
    maxLength?: number;
    hideLabel?: any;
    isPassword?: any;
    onKeyDown?: any;
}

const Texteditor: React.FC<ZupotsuTextfieldProps> = ({
    title,
    placeholder,
    value,
    isRequired,
    errorMessage,
    type,
    name,
    multiline,
    rows,
    trailingIcon,
    toolTipMessage,
    bracketText,
    trailImageHeight,
    trailImageWidth,
    handleChange,
    previewMode,
    description,
    currencyFormat = false,
    maxLength,
    hideLabel,
    isPassword,
    onKeyDown
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<string>(value || '');

    const handleInput = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerText);
            if (handleChange) handleChange(editorRef.current.innerText);
        }
    };

    const handleFormat = (command: string) => {
        document.execCommand(command, false, undefined);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.execCommand('insertHTML', false, '<br><br>');
        }
    };

    
    useEffect(() => {
        // This will sync the initial value with the editor content
        if (editorRef.current) {
            editorRef.current.innerText = value || '';
        }
    }, [value]);

    return (
        <Box sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%' }}>
            <Typography
                style={{
                    marginBottom: '10px',
                    color: 'var(--Gray-1, #333)',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    lineHeight: '140%',
                    display: 'flex',
                    flexDirection: 'column',
                    fontWeight: '600'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            fontStyle: 'Inter',
                            fontWeight: '600',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '14px',
                                lineHeight: "21px",
                                fontStyle: 'Inter',
                                fontWeight: '700',
                            }}
                        >{hideLabel ? "" : title}</span>
                        {isRequired && (
                            <span
                                style={{
                                    color: 'var(--Zupotso-Primary, #E20B18)',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: '140%',
                                }}
                            >
                                *
                            </span>
                        )}
                        {bracketText && (
                            <span style={{ fontWeight: '400' }}>
                                <i>{bracketText}</i>
                            </span>
                        )}
                        <span
                            style={{
                                paddingLeft: '8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {toolTipMessage && (
                                <ZupotsuTooltip
                                    tooltipMessage={toolTipMessage}
                                    icon={infoCircle}
                                />
                            )}
                        </span>
                    </div>
                </div>
                {description && (
                    <div
                        style={{
                            color: 'var(--Gray-1, #828282)',
                            fontFamily: 'Inter',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {description}
                    </div>
                )}
            </Typography>
            <div style={{
                padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: "left", justifyContent: "flex-start", width: '100%', border: '1px solid #ccc',
                borderRadius: '5px',
            }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "flex-start", }}>
                    <button style={{ backgroundColor: 'transparent', border: "1px solid transparent", borderRadius: '3px', fontFamily: 'Inter', fontWeight: '400', fontSize: "14px" }} onClick={() => handleFormat('bold')}>Bold</button>
                    <button style={{ backgroundColor: 'transparent', border: "1px solid transparent", borderRadius: '3px', fontFamily: 'Inter', fontWeight: '400', fontSize: "14px" }} onClick={() => handleFormat('italic')}>Italic</button>
                    <button style={{ backgroundColor: 'transparent', border: "1px solid transparent", borderRadius: '3px', fontFamily: 'Inter', fontWeight: '400', fontSize: "14px" }} onClick={() => handleFormat('underline')}>Underline</button>
                </div>

                <div
                    ref={editorRef}
                    contentEditable={true}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        minHeight: '150px',
                        borderRadius: '5px',
                        borderTopLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        textAlign: "left",
                        verticalAlign: "top",
                    }}
                >
                </div>
            </div>
        </Box>
    );
};

export default Texteditor;

