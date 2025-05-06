import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import './editor.css'
import { Box, Typography } from '@mui/material';
import ZupotsuTooltip from '../zupotsu-tooltip/zupotsu-tooltip';
import { infoCircle } from '../../assets';
const ZupotsuTextEditor = ({
  isRequired,
  errorMessage,
  type,
  name,
  trailingIcon,
  toolTipMessage,
  bracketText,
  trailImageHeight,
  trailImageWidth,
  title,
  value,
  placeholder,
  handleChange
}) => {
  const [content, setContent] = useState(value);
  const [readOnly, setReadOnly] = useState(false);


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
            >{title}</span>
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

      </Typography>
      <Box sx={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: "left",
        justifyContent: "flex-start",
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
      }}>
        <RichTextEditor
          content={content}
          readOnly={readOnly}
          onChange={(updatedContent) => {
            setContent(updatedContent)
            // handleChange(updatedContent)
          }}
        />
        {/* <div className="controls">
        <label>
          Read Only:{' '}
          <input
            type="checkbox"
            checked={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
      </div> */}
        {/* <div className="output">
        <h3>Editor Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div> */}
      </Box>
    </Box>
  );
};

export default ZupotsuTextEditor;
