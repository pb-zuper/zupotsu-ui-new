import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { EditIconn, DeleteIcon, VisibilityEye } from '../../assets';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, KeyboardArrowLeft, KeyboardArrowRight, PreviewRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';
import Apis from '../../services/apis';
import CustomSwitch from '../customSwitch';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Popup from '../popup/popup';
const ZupotsuTable = ({ formIcon, headers, data, onRowDoubleClick, hoveredRow, setHoveredRow, handleMouseLeave, onRefresh,query }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });;
  const [tableData, setTableData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalText, setModalText] = useState("")
  const [modalHeading, setModalHeading] = useState('')
  const [deleteItem, setDeleteItem] = useState()
  const [checkItem, setCheckItem] = useState()
  const [whichFunction, setWhichFunction] = useState()

  const handleYesAction = () => {
    // setModalOpen(true);
    if (whichFunction == "delete") {
      delForm(deleteItem)
    }
    else if (whichFunction == "publish") {
      handleChange(checkItem)
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  const navigation = useNavigate();
  const apis = new Apis();
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

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
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleChange = (checkItem) => {

    let body = {
      id: checkItem.id
    }

    apis.publishForm(body)
      .then((response) => {
        onRefresh()

      })
      .catch((error) => {
        // setLoad(false)
      });
  };

  const delForm = (item) => {

    let body = {
      id: item.id
    }

    apis.deleteForm(body)
      .then((response) => {
        onRefresh()
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'Deleted successfully',
        });

      })
      .catch((error) => {
        setSnackbar({
          open: true,
          severity: 'Error',
          message: (error?.response?.data?.error?.includes('prisma')) ? error?.response?.data?.error : 'Something went wrong!',
        });
      });
  };

  const formatDateString = (dateString) => {
    if (!dateString) return 'NA';

    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    const formattedMonth = month.slice(0, 3);
    return `${formattedMonth}\n${day} ${year}`;
  };

  return (
    <Paper style={{ borderStyle: 'none', boxShadow: "none", fontFamily: "Inter", padding: 0, }}>

      <TableContainer style={{ borderStyle: 'none', boxShadow: "none", padding: 0, }}>
        <Table style={{ borderStyle: 'none', padding: 0, }}>
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
                      display: 'flex', alignItems: 'center',
                      backgroundColor: '#EFEFEF',
                      color: '#111',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 'normal',
                    }}
                  >
                    {header}
                    {/* {index < 4 && (
                      sortConfig.key === header.replace(/ /g, '') ? (
                        sortConfig.direction === 'asc' ?
                          <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} /> :
                          <KeyboardArrowUpOutlined style={{ marginLeft: '8px' }} />
                      ) : (
                        <KeyboardArrowDownOutlined style={{ marginLeft: '8px' }} />
                      )
                    )} */}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody

          >
            {paginatedData?.filter(search => 
              search?.name?.toLowerCase().includes(query?.toLowerCase())
            )
            ?.map((item, index) => (

              <TableRow
                key={item.id}

                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  background: hoveredRow === index ? '#F7F9FF' : index % 2 === 1 ? "rgba(249, 248, 248, 1)" : 'transparent',
                  height: "30px",
                  border: "0px solid transparent",
                  fontSize: "14px",
                  lineHeight: "21px",
                }}
              >
                <TableCell style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", gap: '10px', fontSize: "14px", lineHeight: "21px", border: "0px solid transparent" }}>
                  <img src={formIcon} alt="Icon" width={32} height={32} />{item?.name}
                </TableCell>
                <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: "14px", lineHeight: "21px" }}>{item?.asset_type.name}</TableCell>
                <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: "14px", lineHeight: "21px" }}>{item?.sport_type == "single" ? "Single" : "Multi"}</TableCell>
                <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: "14px", lineHeight: "21px" }}>{item?.sport ? item.sport : "NA"}</TableCell>
                <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: "14px", lineHeight: "21px" }}>{item?.created_by_user.name}</TableCell>
                <TableCell style={{ height: "30px", border: "0px solid transparent", fontSize: "14px", lineHeight: "21px" }}>{formatDateString(item?.created_at)}</TableCell>
                <TableCell style={{ height: "30px", border: "0px solid transparent" }}>
                  <CustomSwitch
                    focusVisibleClassName=".Mui-focusVisible"
                    disableRipple
                    checked={item.is_active}
                    onChange={() => {
                      setModalOpen(true)
                      setCheckItem(item)
                      setModalText(`Do you want to ${item.is_active ? "unpublish" : "publish"} the form ?`)
                      setModalHeading(item.is_active ? "Unpublish" : "Publish")
                      setWhichFunction("publish")
                    }}
                  />
                </TableCell>
                <TableCell style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: "space-evenly", padding: 0, border: "0px solid transparent", gap: '5px', width: '120px' }}>
                  <button onClick={() => { navigation(`/previewform?id=${item.id}`) }} style={{ width: "32px", height: '32px', borderRadius: '5px', cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "#FFF", border: "1.3px solid #BDBDBD", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                    <img src={VisibilityEye} alt="Preview Icon" width={20} height={20} />
                  </button>
                  <button onClick={() => { navigation(`/form_creation?id=${item.id}`) }} style={{ width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000" }}>
                    <img src={EditIconn} alt="Edit Icon" width={32} height={32} />
                  </button>
                  <button onClick={() => {
                    setModalText("Are you sure you want to delete?")
                    setModalHeading("Delete")
                    setWhichFunction("delete")
                    setDeleteItem(item)
                    setModalOpen(true)
                  }} style={{ width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000" }}>
                    <img src={DeleteIcon} alt="Delete Icon" width={32} height={32} />
                  </button>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>

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
                  color: 'black'
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </div>
      <Popup open={modalOpen} setOpen={setModalOpen} text={modalText} heading={modalHeading} handleYesAction={handleYesAction} handleClose={handleClose} />
    </Paper>
  );
};

export default ZupotsuTable;
