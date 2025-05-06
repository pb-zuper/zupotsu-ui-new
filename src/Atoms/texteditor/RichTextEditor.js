import React, { useRef, useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const RichTextEditor = ({ readOnly, onChange, content }) => {
    const editorRef = useRef(null);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        justifyLeft: false,
        justifyCenter: false,
        justifyRight: false,
        unorderedList: false,
        orderedList: false,
    });
    const [fontSize, setFontSize] = useState('16');
    const [fontFamily, setFontFamily] = useState('Inter');

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.contentEditable = !readOnly;
        }
    }, [readOnly]);

    const updateActiveFormats = () => {
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            justifyLeft: document.queryCommandState('justifyLeft'),
            justifyCenter: document.queryCommandState('justifyCenter'),
            justifyRight: document.queryCommandState('justifyRight'),
            unorderedList: document.queryCommandState('insertUnorderedList'),
            orderedList: document.queryCommandState('insertOrderedList'),
        });
    };

    const applyFormat = (command) => {
        document.execCommand(command, false, null);
        updateActiveFormats();
        if (onChange) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const applyStyle = (styleType, value) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.style[styleType] = value;
            range.surroundContents(span);
            updateActiveFormats();
            if (onChange) {
                onChange(editorRef.current.innerHTML);
            }
        }
    };

    const handleFontSizeChange = (e) => {
        const value = e.target.value;
        setFontSize(value);
        applyStyle('fontSize', `${value}px`);
    };

    const handleFontFamilyChange = (e) => {
        const value = e.target.value;
        setFontFamily(value);
        applyStyle('fontFamily', value);
    };

    useEffect(() => {
        document.addEventListener('selectionchange', updateActiveFormats);
        return () => {
            document.removeEventListener('selectionchange', updateActiveFormats);
        };
    }, []);

    const handleFocus = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const currentFontSize = range.startContainer.parentElement.style.fontSize;
            const currentFontFamily = range.startContainer.parentElement.style.fontFamily;
            if (currentFontSize) {
                setFontSize(parseInt(currentFontSize));
            }
            if (currentFontFamily) {
                setFontFamily(currentFontFamily);
            }
        }
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: "wrap", gap: '8px', marginBottom: '10px', width: '100%', }}>
                <Button sx={{ height: '30px', }}  variant={"outlined"} onClick={() => applyFormat('bold')}>
                {/* activeFormats.bold ? "contained" :  */}
                    <FormatBoldIcon sx={{ width: '15px' }} />
                </Button>
                <Button sx={{ height: '30px', }}  variant={"outlined"} onClick={() => applyFormat('italic')}>
                {/* activeFormats.italic ? "contained" :  */}
                    <FormatItalicIcon sx={{ width: '15px' }} />
                </Button>
                <Button sx={{ height: '30px', }}  variant={"outlined"} onClick={() => applyFormat('underline')}>
                {/* activeFormats.underline ? "contained" :  */}
                    <FormatUnderlinedIcon sx={{ width: '15px' }} />
                </Button>
                <Button sx={{ height: '30px', }}  variant={"outlined"} onClick={() => applyFormat('justifyLeft')}>
                {/* activeFormats.justifyLeft ? "contained" :  */}
                    <FormatAlignLeftIcon sx={{ width: '15px' }} />
                </Button>
                <Button sx={{ height: '30px', }} variant={"outlined"} onClick={() => applyFormat('justifyCenter')}>
                {/* activeFormats.justifyCenter ? "contained" :  */}
                    <FormatAlignCenterIcon sx={{ width: '15px' }} />
                </Button>
                <Button sx={{ height: '30px', }}  variant={"outlined"} onClick={() => applyFormat('justifyRight')}>
                {/* activeFormats.justifyRight ? "contained" :  */}
                    <FormatAlignRightIcon sx={{ width: '15px' }} />
                </Button>
                <Button sx={{ height: '30px', }}  variant={"outlined"} onClick={() => applyFormat('insertUnorderedList')}>
                {/* activeFormats.unorderedList ? "contained" :  */}
                    <FormatListBulletedIcon sx={{ width: '15px' }} />
                </Button>
                <Button sx={{ height: '30px', }} variant={"outlined"} onClick={() => applyFormat('insertOrderedList')}>
                {/* activeFormats.orderedList ? "contained" :  */}
                    <FormatListNumberedIcon sx={{ width: '15px' }} />
                </Button>

                <Select value={fontSize} onChange={handleFontSizeChange} sx={{ width: '80px', height: '30px', fontSize: '15px' }}>
                    {['10', '12', '14', '16', '18'].map(size => (
                        <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                </Select>
                <Select value={fontFamily} onChange={handleFontFamilyChange} sx={{ width: '100px', height: '30px', fontSize: '15px' }}>
                    {['Inter', 'Arial', 'Courier New', 'Georgia', 'Times New Roman'].map(family => (
                        <MenuItem key={family} value={family}>{family}</MenuItem>
                    ))}
                </Select>
            </div>

            <div
                ref={editorRef}
                contentEditable={!readOnly}
                dangerouslySetInnerHTML={{ __html: content || '' }}
                onInput={() => onChange && onChange(editorRef.current.innerHTML)}
                onFocus={handleFocus}
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    minHeight: '200px',
                    outline: 'none',
                    fontSize: `${fontSize}px`,
                    fontFamily,
                }}
            />
        </div>
    );
};

export default RichTextEditor;
