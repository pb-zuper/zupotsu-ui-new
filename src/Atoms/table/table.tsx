import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import useDeviceType from '../../utils/DeviceType';
import { useCallback, useEffect, useRef, useState } from 'react';
import './table.css';
import { useNavigate } from 'react-router';
import ZupotsuDropdown from '../zupotsu-dropdown/zupotsu-dropdown';
import TablePagination from './table-pagination';
// import {
//   AddIcon,
//   EditIcon,
//   PdfDownload,
//   editAsset,
// } from 'libs/component-lib/src/Assets';
import {
  EditIconn,
  AddIcon,
  DeleteIcon,

} from '../../assets';
import IOSSwitch from '../buttons/IOSSwitch';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#F9F8F8 ',
  },
  // height: '40px',
}));

const GreyTableHead = styled(TableHead)({
  backgroundColor: '#EFEFEF', // Set the header background color to grey
});

export interface TableProps {
  title: string;
  content: string;
  image: string;
  createdAt: any;
  description: any;
}
function Table({
  tableRowData,
  tableHeader,
  onTableCellClicked,
  paginationData,
  handleIconClicked,
  onPageChange,
}: any) {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const visibleData = showMore ? tableRowData : tableRowData?.slice(0, 3);
  const toCamelCase = (str: any) => {
    return str
      .replace(/\s+/g, '')
      .replace(/([A-Z])/g, (match: any, group1: any) => group1.toLowerCase());
  };

  const navigation = useNavigate()




  return (
    <div>
      <TableContainer
        component={Paper}
        className='table-scroll'
        sx={{
          border: 'none',
          boxShadow: 'none !important',
        }}
      >
        <MuiTable
          sx={{
            border: 'none',
            boxShadow: 'none !important',
          }}
        >
          <TableHead
            sx={{
              backgroundColor: '#EFEFEF',
            }}
          >
            <TableRow>
              {tableHeader?.map((header: any, index: number) => (
                <TableCell
                  key={index}
                  sx={{
                    // borderBottom: '0px solid transparent',
                    backgroundColor: '#EFEFEF',
                    color: '#111',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    borderRight:
                      index !== tableHeader.length - 1
                        ? '1px solid #E0E0E0'
                        : 'none',
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {(deviceType === 'mobile' ? visibleData : tableRowData)?.map(
              (data: any, rowIndex: any) => (
                <CustomTableRow key={rowIndex}>
                  {tableHeader.map((header: any, colIndex: any) =>
                    data[header.replace(/\s+/g, '').toLowerCase()]?.type ? (
                      <TableCell
                        key={colIndex}
                        className={`deliverables-table-cell-style`}
                        style={{
                          fontFamily: 'Inter',
                          fontSize: deviceType === 'mobile' ? '14px' : '16px',
                          minWidth: deviceType === 'mobile' ? '250px' : '',
                          fontWeight: '500',
                          cursor:
                            data[header.replace(/\s+/g, '').toLowerCase()]
                              .type === 'icon'
                              ? 'pointer'
                              : '',
                        }}
                        onClick={() => {
                          onTableCellClicked(
                            colIndex,
                            rowIndex,
                            header.replace(/\s+/g, '').toLowerCase()
                          );
                        }}
                      >
                        {}
                      </TableCell>
                    ) : (
                      <TableCell
                        key={colIndex}
                        className={`deliverables-table-cell-style${header === 'Action' ? ' clickable' : ''
                          }`}
                        style={{
                          fontFamily: 'Inter',
                          color: header === 'Action' ? '#2F80ED' : undefined,
                          cursor: header === 'Action' ? 'pointer' : '',
                          fontSize: deviceType === 'mobile' ? '14px' : '16px',
                          minWidth: deviceType === 'mobile' ? '250px' : '',
                          fontWeight: '500',
                        }}
                        onClick={() => {
                        
                              navigate('/previewform')
                        }}
                      >
                        {header === 'Job Title'
                          ? data['jobTitle']
                          : header === 'Unique Users'
                            ? data['uniqueUsers']
                            : header === 'Impressions per User'
                              ? data['impressionUsers']
                              : data[header.replace(/\s+/g, '').toLowerCase()]}
                      </TableCell>
                    )
                  )}
                </CustomTableRow>
              )
            )} */}

            {/* {(deviceType === 'mobile' ? visibleData : tableRowData)?.map((data, rowIndex) => (
              <CustomTableRow key={rowIndex}> */}
            {tableRowData.map((item: any, rowIndex: any) => (
              <CustomTableRow key={rowIndex}>
                {Object.keys(item).map((key, colIndex) => (
                  (key === 'Actions') ? (
                    <TableCell
                      key={colIndex}
                      // className={`deliverables-table-cell-style${key === '' ? ' clickable' : ''}`}
                      style={{
                        fontFamily: 'Inter',
                        fontSize: deviceType === 'mobile' ? '14px' : '14px',
                        minWidth: deviceType === 'mobile' ? '250px' : '',
                        fontWeight: '500',
                        gap:'10px',
                        display:'flex'
                      }}

                    >
                      <button onClick={() => { navigation("/form_creation") }} style={{ width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000" }}>
                        <img src={EditIconn} alt="Edit Icon" width={32} height={32} />
                      </button>
                      <button onClick={() => { alert("Delete form") }} style={{ width: "32px", cursor: 'pointer', padding: 0, margin: 0, backgroundColor: "transparent", border: "0px solid #000" }}>
                        <img src={DeleteIcon} alt="Delete Icon" width={32} height={32} />
                      </button>

                    </TableCell>
                  ) :
                    (key === 'Publish') ? (
                      <TableCell
                        key={colIndex}
                        className={`deliverables-table-cell-style${key === 'Publish' ? ' clickable' : ''}`}
                        style={{
                          fontFamily: 'Inter',
                          // color: key === 'Publish' ? '#2F80ED' : undefined,
                          // cursor: key === 'Publish' ? 'pointer' : '',
                          fontSize: deviceType === 'mobile' ? '14px' : '14px',
                          minWidth: deviceType === 'mobile' ? '250px' : '',
                          fontWeight: '500',
                        }}
                      >
                        <IOSSwitch checkstatus={false} />
                      </TableCell>
                    ) :
                      (<TableCell
                        key={colIndex}
                        className={`deliverables-table-cell-style${key === 'Publish' ? ' clickable' : ''}`}
                        style={{
                          fontFamily: 'Inter',
                          // color: key === 'Publish' ? '#2F80ED' : undefined,
                          // cursor: key === 'Publish' ? 'pointer' : '',
                          fontSize: deviceType === 'mobile' ? '14px' : '14px',
                          minWidth: deviceType === 'mobile' ? '250px' : '',
                          fontWeight: '500',
                   
                        }}
                        onClick={() => {
                          if (key === 'Publish') {
                            navigate('/previewform');
                          }
                        }}
                      >
                        {item[key]}
                      </TableCell>)
                ))}
              </CustomTableRow>
            ))}



        
          </TableBody>
        </MuiTable>
      </TableContainer>
      {
        paginationData && (
          <TablePagination {...paginationData} onPageChange={onPageChange} />
        )
      }
      {
        deviceType === 'mobile' && (
          <div style={{ position: 'relative' }}>
            {tableRowData?.length > 3 && (
              <Typography
                className={showMore ? '' : 'see-more-gradient'}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#E20B18',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '21px',
                  letterSpacing: '0.32px',
                  cursor: 'pointer',
                }}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'See Less' : 'See More'}
              </Typography>
            )}
          </div>
        )
      }
    </div >
  );
}

export default Table;
