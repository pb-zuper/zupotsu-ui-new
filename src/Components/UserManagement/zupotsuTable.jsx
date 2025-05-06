import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import IOSSwitch from '../buttons/IOSSwitch';
import { EditIconn, DeleteIcon } from '../../assets';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
const ZupotsuTable = ({ formIcon, headers, data, onRowDoubleClick, hoveredRow, setHoveredRow, handleMouseLeave }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });;
  const [tableData, setTableData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigation = useNavigate();

  const headStyles = {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '21px',
    letterSpacing: '-0.3333333432674408px',
    textAlign: 'left',
    borderStyle: 'none',
    justifyContent: 'center',
    marginLeft: 0,
    paddingLeft: '18px',
    textTransform: 'capitalize',
    backgroundColor: 'rgba(224, 224, 224, 1)',
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setTableData(sortedData);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newData = Array.from(tableData);
    const [movedItem] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, movedItem);
    setTableData(newData);
  };

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Paper style={{ borderStyle: 'none', boxShadow: "none", fontFamily: "Inter" }}>
      <TableContainer style={{ borderStyle: 'none', boxShadow: "none" }}>
        <Table style={{ borderStyle: 'none' }}>
          <TableHead style={{ backgroundColor: 'rgba(240, 239, 239, 0.6)', padding: '10px' }}>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  style={{
                    ...headStyles,
                    borderTopRightRadius: index === headers.length - 1 ? "3px" : "0px",
                    borderTopLeftRadius: index === 0 ? "3px" : "0px",
                    backgroundColor: '#EFEFEF',
                    cursor: index < 4 ? 'pointer' : 'default',
                    color: '#111',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    borderRight: index !== headers.length - 1 ? '1px solid #E0E0E0' : 'none',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onClick={index < 4 ? () => handleSort(header.replace(/ /g, '')) : undefined}
                >
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', cursor: index < 4 ? 'pointer' : 'default',
                      backgroundColor: '#EFEFEF',
                      color: '#111',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      // borderRight: index !== headers.length - 1 ? '1px solid #E0E0E0' : 'none',
                    }}
                  >
                    {header}
                    {index < 4 && (
                      sortConfig.key === header.replace(/ /g, '') ? (
                        sortConfig.direction === 'asc' ?
                          <KeyboardArrowUpOutlined style={{ marginLeft: '8px' }} /> :
                          <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                      ) : (
                        // <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                        <UnfoldMoreIcon style={{ marginLeft: '8px' }} />
                      )
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="data">
              {(provided) => (
                <TableBody
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {paginatedData.map((item, index) => (
                    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                      {(provided, snapshot) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onDoubleClick={() => { onRowDoubleClick(item) }}
                          onMouseEnter={() => setHoveredRow(index)}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            background: hoveredRow === index ? '#F7F9FF' : index % 2 === 1 ? "rgba(249, 248, 248, 1)" : 'transparent',
                            height: "30px",
                            border: "0px solid transparent",
                            fontSize: "14px",
                            lineHeight: "21px",
                            opacity: snapshot.isDragging ? 0.5 : 1,
                          }}
                        >
                          <TableCell style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", gap: '10px', fontSize: "14px", lineHeight: "21px", border: "0px solid transparent" }}>
                            <img src={formIcon} alt="Icon" width={32} height={32} />{item.FormName}
                          </TableCell>
                          <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: "14px", lineHeight: "21px" }}>{item.AssetType}</TableCell>
                          <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: "14px", lineHeight: "21px" }}>{item.CreatedBy}</TableCell>
                          <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: "14px", lineHeight: "21px" }}>{item.Createdon}</TableCell>
                          <TableCell style={{ height: "30px", border: "0px solid transparent" }}>
                            <IOSSwitch checked={item.active} />
                          </TableCell>
                          <TableCell style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly", padding: 0, border: "0px solid transparent" }}>
                            <button onClick={() => { navigation("/form_creation") }} style={{ width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000" }}>
                              <img src={EditIconn} alt="Edit Icon" width={32} height={32} />
                            </button>
                            <button onClick={() => { alert("Delete form") }} style={{ width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000" }}>
                              <img src={DeleteIcon} alt="Delete Icon" width={32} height={32} />
                            </button>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#FFF', border: "0px solid #000", borderTop: "1px solid rgba(224, 224, 224, 1)", borderBottom: "1px solid rgba(224, 224, 224, 1)", marginTop: "10px" }}>
        <p style={{
          fontFamily: 'Inter',
          fontSize: '14px',
          lineHeight: "21px",
          fontStyle: 'normal',
          fontWeight: '400',
        }}>{itemsPerPage * (currentPage - 1) + 1} to {Math.min(itemsPerPage * currentPage, tableData.length)} of {tableData.length} items</p>
        <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-evenly', alignItems: "center", gap: "10px" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => { setCurrentPage(currentPage - 1) }}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "center",
              backgroundColor: '#FFF',
              color: 'grey',
              cursor: "pointer",
              border: "1px solid rgba(243, 243, 243, 1)",
            }}
          >
            <KeyboardArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: '#FFF',
                color: currentPage === index + 1 ? '#000' : 'grey',
                border: "0px solid #000"
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => { setCurrentPage(currentPage + 1) }}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: '6px',
              backgroundColor: '#FFF',
              color: 'grey',
              display: 'flex',
              cursor: "pointer",
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "center",
              border: "1px solid rgba(243, 243, 243, 1)"
            }}
          >
            <KeyboardArrowRight />
          </button>
          <Select
            style={{
              display: 'flex',
              border: "0.5px solid rgba(243, 243, 243, 1)",
              alignItems: 'center',
              justifyContent: 'center',
              width: '70px',
              height: '30px',
              borderRadius: '6px',
              fontSize: '14px',
              color: 'grey',
              // paddingLeft: "10px"
            }}
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20].map((option, index) => (
              <MenuItem
                key={index}
                value={option}
                style={{
                  // backgroundColor: 'rgba(243, 243, 243, 1)', // Background color of options
                  color: 'black' // Text color of options
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </Paper>
  );
};

export default ZupotsuTable;
